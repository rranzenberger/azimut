import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ANALYSIS_PROMPT = `Você é um assistente especializado em organização de mídia para a Azimut, uma produtora audiovisual brasileira com 30 anos de experiência em VR, AR, exposições culturais e Academy (cursos de VFX, Animação, Game Design e preparação para estudar em Vancouver - VFS/VanArts).

Analise esta imagem e forneça APENAS um JSON válido (sem markdown, sem explicações) com:

{
  "category": "portfolio|academy|studio|team|blog",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "caption": "Descrição em português (1-2 frases, profissional)",
  "suggestedProjects": [
    {"name": "Nome do projeto", "confidence": 0.95, "reason": "Por que combina"}
  ],
  "suggestedPosition": "hero|gallery|thumbnail|background",
  "quality": {
    "resolution": "baixa|média|alta",
    "focus": "desfocado|aceitável|nítido",
    "lighting": "ruim|boa|excelente",
    "composition": "ruim|boa|excelente"
  },
  "detectedObjects": ["objeto1", "objeto2"],
  "detectedPeople": true|false,
  "isVancouver": true|false,
  "isAcademy": true|false,
  "isProfessional": true|false,
  "colors": {
    "dominant": "#hexcolor",
    "palette": ["#color1", "#color2", "#color3"]
  },
  "recommendation": "Sugestão específica de uso (1 frase)",
  "confidence": 0.95
}

Categorias:
- portfolio: projetos concluídos, VR/AR, exposições, tours virtuais
- academy: cursos, alunos, VFS, VanArts, Vancouver, aulas
- studio: equipamentos, estúdio, produção
- team: equipe, bastidores, eventos internos
- blog: artigos, notícias, press releases

Tags relevantes:
- VR, AR, realidade-virtual, imersivo
- vancouver, vfs, vanarts, canada
- vfx, animacao, game-design, 3d
- exposicao, museu, tour-virtual
- studio, equipamentos, producao

Seja preciso e profissional. Retorne APENAS o JSON.`

export async function POST(request: NextRequest) {
  try {
    const { mediaId, imageUrl } = await request.json()

    if (!mediaId || !imageUrl) {
      return NextResponse.json(
        { error: 'mediaId and imageUrl are required' },
        { status: 400 }
      )
    }

    // Verificar se já existe análise
    const existingAnalysis = await prisma.mediaAnalysis.findUnique({
      where: { mediaId }
    })

    if (existingAnalysis) {
      return NextResponse.json({
        success: true,
        cached: true,
        analysis: existingAnalysis.analysis
      })
    }

    // Analisar com Claude Vision
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY
    })

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'url',
              url: imageUrl.startsWith('http') 
                ? imageUrl 
                : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://azmt.com.br'}${imageUrl}`
            }
          },
          {
            type: 'text',
            text: ANALYSIS_PROMPT
          }
        ]
      }]
    })

    // Extrair JSON da resposta
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    let analysisData
    try {
      // Tentar parsear diretamente
      analysisData = JSON.parse(content.text)
    } catch (e) {
      // Se falhar, tentar extrair JSON de markdown
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Could not parse JSON from Claude response')
      }
    }

    // Salvar análise no banco
    const savedAnalysis = await prisma.mediaAnalysis.create({
      data: {
        mediaId,
        analysis: analysisData,
        createdAt: new Date()
      }
    })

    // Atualizar mídia com algumas tags automáticas
    if (analysisData.tags && analysisData.tags.length > 0) {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          tags: analysisData.tags,
          alt: analysisData.caption,
          caption: analysisData.caption
        }
      })
    }

    return NextResponse.json({
      success: true,
      cached: false,
      analysis: analysisData,
      rawResponse: content.text
    })
  } catch (error: any) {
    console.error('AI Analysis error:', error)
    
    // Retornar análise básica em caso de erro
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: {
        category: 'portfolio',
        tags: ['sem-categoria'],
        caption: 'Imagem sem análise automática',
        confidence: 0,
        recommendation: 'Erro ao analisar. Por favor, categorize manualmente.'
      }
    }, { status: error.status || 500 })
  }
}
