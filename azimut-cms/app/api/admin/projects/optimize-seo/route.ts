/**
 * API para Otimizar SEO de um Projeto com IA
 * POST /api/admin/projects/optimize-seo
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, lang = 'pt' } = body

    if (!projectId) {
      return NextResponse.json(
        { error: 'projectId é obrigatório' },
        { status: 400 }
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
    const content = `${project.title}\n\n${description}`

    // Chamar API de análise SEO
    const apiUrl = process.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
    const response = await fetch(`${apiUrl}/api/seo/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        type: 'project',
        targetSearchEngines: ['google', 'bing'],
      }),
    })

    if (!response.ok) {
      throw new Error(`Erro na API de SEO: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success || !data.analysis) {
      throw new Error('Resposta inválida da API de SEO')
    }

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        slug: project.slug,
        title: project.title,
      },
      analysis: data.analysis,
      lang,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[Optimize SEO] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao otimizar SEO',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
