/**
 * API para Otimizar SEO de um Projeto Específico com IA
 * POST /api/admin/projects/[id]/optimize-seo
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { lang = 'pt' } = await request.json().catch(() => ({ lang: 'pt' }))
    const projectId = params.id

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY não configurada' },
        { status: 500 }
      )
    }

    // Buscar projeto
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        slug: true,
        title: true,
        descriptionPt: true,
        descriptionEn: true,
        descriptionEs: true,
        descriptionFr: true,
        summaryPt: true,
        summaryEn: true,
        summaryEs: true,
        summaryFr: true,
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    // Preparar conteúdo
    const descriptionField = `description${lang.charAt(0).toUpperCase() + lang.slice(1)}` as 'descriptionPt' | 'descriptionEn' | 'descriptionEs' | 'descriptionFr'
    const summaryField = `summary${lang.charAt(0).toUpperCase() + lang.slice(1)}` as 'summaryPt' | 'summaryEn' | 'summaryEs' | 'summaryFr'
    
    const description = project[descriptionField] || project[summaryField] || project.title
    
    if (!description || description.length < 20) {
      return NextResponse.json(
        { error: 'Projeto não tem descrição suficiente para otimizar' },
        { status: 400 }
      )
    }

    const content = `${project.title}\n\n${description}`

    // Chamar Claude diretamente
    const anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    })

    const prompt = `Você é um especialista em SEO para múltiplos buscadores: google, bing.

Analise o seguinte conteúdo e forneça recomendações de otimização:

CONTEÚDO:
${content}

TIPO: project

Forneça uma análise JSON com:
1. keywords: Array de 10-15 palavras-chave principais relevantes
2. metaTitle: Título otimizado (50-60 caracteres)
3. metaDescription: Descrição otimizada (150-160 caracteres)

IMPORTANTE:
- Otimize para google, bing
- Foque em palavras-chave relevantes e naturais
- Priorize experiência do usuário

Retorne APENAS JSON válido, sem markdown, sem explicações adicionais.`

    // Tentar modelos disponíveis
    const models = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-haiku-20241022',
      'claude-3-haiku-20240307'
    ]
    
    let message
    let lastError
    
    for (const model of models) {
      try {
        message = await anthropic.messages.create({
          model: model,
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        })
        break
      } catch (error: any) {
        lastError = error
        const errorMsg = error.message || JSON.stringify(error)
        if (!errorMsg.includes('not_found') && !errorMsg.includes('404')) {
          throw error
        }
        continue
      }
    }
    
    if (!message) {
      throw lastError || new Error('Nenhum modelo disponível')
    }

    // Extrair e parsear resposta
    const responseText =
      message.content[0].type === 'text'
        ? message.content[0].text
        : JSON.stringify(message.content[0])

    const cleaned = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    
    const analysis = JSON.parse(cleaned)

    // Salvar no banco de dados
    const updateData: any = {}
    
    if (lang === 'pt') {
      updateData.seoTitlePt = analysis.metaTitle || null
      updateData.seoDescPt = analysis.metaDescription || null
      updateData.seoKeywords = analysis.keywords || []
    } else if (lang === 'en') {
      updateData.seoTitleEn = analysis.metaTitle || null
      updateData.seoDescEn = analysis.metaDescription || null
    } else if (lang === 'es') {
      updateData.seoTitleEs = analysis.metaTitle || null
      updateData.seoDescEs = analysis.metaDescription || null
    } else if (lang === 'fr') {
      updateData.seoTitleFr = analysis.metaTitle || null
      updateData.seoDescFr = analysis.metaDescription || null
    }

    await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        slug: project.slug,
        title: project.title,
      },
      analysis: {
        metaTitle: analysis.metaTitle,
        metaDescription: analysis.metaDescription,
        keywords: analysis.keywords,
      },
      lang,
      saved: true,
    })
  } catch (error: any) {
    console.error('[Optimize SEO] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao otimizar SEO',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
