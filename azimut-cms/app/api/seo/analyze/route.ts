/**
 * API de Análise SEO com IA
 * Usa Claude/DeepSeek para analisar e otimizar conteúdo para buscadores
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, type, targetSearchEngines } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Conteúdo é obrigatório' },
        { status: 400 }
      )
    }

    // Buscadores alvo (padrão: Google + Bing)
    const searchEngines = targetSearchEngines || ['google', 'bing']
    const searchEnginesList = searchEngines.join(', ')

    // Prompt otimizado para análise SEO multi-buscadores
    const prompt = `Você é um especialista em SEO para múltiplos buscadores: ${searchEnginesList}.

Analise o seguinte conteúdo e forneça recomendações de otimização:

CONTEÚDO:
${content}

TIPO: ${type || 'página web'}

Forneça uma análise JSON com:
1. keywords: Array de 10-15 palavras-chave principais relevantes
2. metaTitle: Título otimizado (50-60 caracteres)
3. metaDescription: Descrição otimizada (150-160 caracteres)
4. headings: Sugestões de H1, H2, H3 otimizados
5. altTexts: Sugestões de alt texts descritivos para imagens
6. schemaOrg: Tipos de Schema.org recomendados (array)
7. improvements: Array de melhorias específicas
8. competitorAnalysis: Sugestões baseadas em melhores práticas
9. searchEngines: Otimizações específicas para cada buscador mencionado

IMPORTANTE:
- Otimize para ${searchEnginesList}
- Considere diferenças entre buscadores
- Foque em palavras-chave relevantes e naturais
- Priorize experiência do usuário
- Sugira Schema.org apropriado

Retorne APENAS JSON válido, sem markdown, sem explicações adicionais.`

    // Chamar Claude - tentar modelos disponíveis
    const models = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-sonnet-20240620', 
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307'
    ]
    
    let message
    let lastError
    
    for (const model of models) {
      try {
        message = await anthropic.messages.create({
          model: model,
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        })
        
        // Se chegou aqui, funcionou!
        break
      } catch (error: any) {
        lastError = error
        const errorMsg = error.message || JSON.stringify(error)
        // Se não for erro de modelo não encontrado, parar
        if (!errorMsg.includes('not_found') && !errorMsg.includes('404')) {
          throw error
        }
        // Caso contrário, tentar próximo modelo
        continue
      }
    }
    
    if (!message) {
      throw lastError || new Error('Nenhum modelo disponível')
    }

    // Extrair resposta
    const responseText =
      message.content[0].type === 'text'
        ? message.content[0].text
        : JSON.stringify(message.content[0])

    // Tentar parsear JSON (pode estar dentro de markdown)
    let analysis
    try {
      // Remover markdown code blocks se houver
      const cleaned = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      analysis = JSON.parse(cleaned)
    } catch (parseError) {
      // Se não for JSON válido, retornar como texto
      analysis = {
        raw: responseText,
        error: 'Resposta não é JSON válido',
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
      searchEngines,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[SEO Analyze] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao analisar conteúdo',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
