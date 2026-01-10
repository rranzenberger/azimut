import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ════════════════════════════════════════════════════════════
// SISTEMA INTELIGENTE DE SELEÇÃO DE MODELO
// ════════════════════════════════════════════════════════════

interface ModelConfig {
  name: string
  version: string
  maxTokens: number
  useCase: string[]
  costMultiplier: number
}

const AVAILABLE_MODELS: Record<string, ModelConfig> = {
  // Claude Sonnet 4.5 - Melhor para análise visual complexa
  'claude-3-5-sonnet-20241022': {
    name: 'Claude Sonnet 4.5',
    version: '20241022',
    maxTokens: 8192,
    useCase: ['image_analysis', 'complex_vision', 'detailed_analysis'],
    costMultiplier: 1.5 // ~R$ 0.022 por imagem
  },
  
  // Claude Sonnet 3.5 - Balanceado (custo/performance)
  'claude-3-5-sonnet-20240620': {
    name: 'Claude Sonnet 3.5',
    version: '20240620',
    maxTokens: 8192,
    useCase: ['image_analysis', 'standard_vision'],
    costMultiplier: 1.0 // ~R$ 0.015 por imagem
  },
  
  // Claude Sonnet 3 - Economia
  'claude-3-sonnet-20240229': {
    name: 'Claude Sonnet 3',
    version: '20240229',
    maxTokens: 4096,
    useCase: ['simple_analysis', 'fallback'],
    costMultiplier: 0.7 // ~R$ 0.010 por imagem
  },
  
  // Claude Opus - Para análise super complexa (se disponível)
  'claude-3-opus-20240229': {
    name: 'Claude Opus',
    version: '20240229',
    maxTokens: 4096,
    useCase: ['premium_analysis', 'complex_reasoning'],
    costMultiplier: 3.0 // ~R$ 0.045 por imagem
  }
}

// Seleção automática de modelo baseado na tarefa
function selectModel(useCase: string, preferCostEffective: boolean = false): string {
  // Se preferir economia, usar Sonnet 3.5 (balanceado)
  if (preferCostEffective) {
    return 'claude-3-5-sonnet-20240620'
  }
  
  // Para análise de imagem complexa, sempre usar Sonnet 4.5 (melhor qualidade)
  if (useCase === 'image_analysis' || useCase === 'complex_vision') {
    return 'claude-3-5-sonnet-20241022' // Sonnet 4.5
  }
  
  // Default: Sonnet 4.5 para qualidade máxima
  return 'claude-3-5-sonnet-20241022'
}

const ANALYSIS_PROMPT = `Você é um assistente especializado em organização de mídia para a Azimut, uma produtora audiovisual brasileira com 30 anos de experiência em VR, AR, exposições culturais e Academy (cursos de VFX, Animação, Game Design e preparação para estudar em Vancouver - VFS/VanArts).

Analise esta imagem com EXTREMA PRECISÃO e forneça APENAS um JSON válido (sem markdown, sem explicações, sem texto antes ou depois) com:

{
  "category": "portfolio|academy|studio|team|blog",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "caption": "Descrição profissional em português (1-2 frases, SEO-friendly)",
  "suggestedProjects": [
    {"name": "Nome do projeto específico", "confidence": 0.95, "reason": "Por que esta imagem combina com este projeto"}
  ],
  "suggestedPosition": "hero|gallery|thumbnail|background",
  "quality": {
    "resolution": "baixa|média|alta|ultra",
    "focus": "desfocado|aceitável|nítido|perfeito",
    "lighting": "ruim|aceitável|boa|excelente|profissional",
    "composition": "ruim|aceitável|boa|excelente|perfeita"
  },
  "detectedObjects": ["objeto1", "objeto2"],
  "detectedPeople": true|false,
  "detectedText": "texto detectado na imagem (se houver)",
  "isVancouver": true|false,
  "isAcademy": true|false,
  "isProfessional": true|false,
  "isStudentWork": true|false,
  "colors": {
    "dominant": "#hexcolor",
    "palette": ["#color1", "#color2", "#color3"],
    "vibrant": true|false,
    "mood": "energico|calmo|profissional|artistico"
  },
  "recommendation": "Sugestão específica de uso (1 frase clara)",
  "confidence": 0.95,
  "improvementSuggestions": ["sugestão1", "sugestão2"]
}

Categorias (escolha UMA):
- portfolio: projetos concluídos, VR/AR, exposições, tours virtuais, trabalhos profissionais
- academy: cursos, alunos, VFS, VanArts, Vancouver, aulas, estudantes, educação
- studio: equipamentos, estúdio, produção, bastidores técnicos
- team: equipe, colaboradores, eventos internos, cultura da empresa
- blog: artigos, notícias, press releases, conteúdo editorial

Tags relevantes (5-10 palavras-chave em português):
- VR, AR, realidade-virtual, imersivo, 360
- vancouver, vfs, vanarts, canada, intercambio
- vfx, animacao, game-design, 3d, cgi
- exposicao, museu, tour-virtual, cultura
- studio, equipamentos, producao, tecnologia
- estudante, aluno, curso, educacao
- profissional, portfolio, trabalho

Análise de qualidade:
- Seja rigoroso: "perfeito" só para imagens excepcionais
- "baixa" = <720p, "média" = 720-1080p, "alta" = 1080-4K, "ultra" = 4K+
- Foco: analise nitidez de objetos principais
- Iluminação: avalie exposição, contraste, sombras
- Composição: regra dos terços, balanceamento, enquadramento

Detecção:
- Identifique objetos relevantes (computador, VR headset, câmera, etc)
- Detecte pessoas e sua atividade
- Extraia texto visível (logos, placas, etc)
- Identifique contexto (Vancouver pela arquitetura, placas, etc)

Seja EXTREMAMENTE preciso. Retorne APENAS o JSON, sem formatação markdown.`

export async function POST(request: NextRequest) {
  try {
    const { mediaId, imageUrl, useModel, preferCostEffective } = await request.json()

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
      const cachedAnalysis = existingAnalysis.analysis as any
      return NextResponse.json({
        success: true,
        cached: true,
        analysis: cachedAnalysis,
        model: cachedAnalysis?._model || 'cached'
      })
    }

    // Seleção inteligente de modelo
    const selectedModel = useModel || selectModel('image_analysis', preferCostEffective || false)
    const modelConfig = AVAILABLE_MODELS[selectedModel] || AVAILABLE_MODELS['claude-3-5-sonnet-20241022']
    
    console.log(`🤖 Using model: ${modelConfig.name} (${selectedModel})`)

    // Analisar com Claude Vision
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY_V2
    })

    if (!anthropic) {
      throw new Error('CLAUDE_API_KEY or ANTHROPIC_API_KEY not configured')
    }

    // Construir URL completa
    const fullImageUrl = imageUrl.startsWith('http') 
      ? imageUrl 
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://azmt.com.br'}${imageUrl}`

    console.log(`📸 Analyzing image: ${fullImageUrl.substring(0, 100)}...`)

    let response
    let attempts = 0
    const maxAttempts = 2
    let lastError: Error | null = null

    // Tentar com modelo selecionado, se falhar, tentar fallback
    while (attempts < maxAttempts) {
      try {
        const modelToUse = attempts === 0 
          ? selectedModel 
          : 'claude-3-5-sonnet-20240620' // Fallback para Sonnet 3.5
        
        response = await anthropic.messages.create({
          model: modelToUse,
          max_tokens: modelConfig.maxTokens,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'url',
                  url: fullImageUrl
                }
              },
              {
                type: 'text',
                text: ANALYSIS_PROMPT
              }
            ]
          }]
        })
        
        console.log(`✅ Analysis successful with ${modelToUse}`)
        break // Sucesso, sair do loop
        
      } catch (error: unknown) {
        attempts++
        const err = error as { status?: number; message?: string }
        lastError = err as Error
        
        // Se erro de modelo não disponível, tentar fallback
        if (err.status === 404 || err.message?.includes('model')) {
          console.warn(`⚠️ Model ${selectedModel} not available, trying fallback...`)
          if (attempts >= maxAttempts) {
            throw new Error(`Model ${selectedModel} not available and fallback failed: ${err.message || 'Unknown error'}`)
          }
          continue
        }
        
        // Outros erros, lançar imediatamente
        throw err
      }
    }

    if (!response) {
      throw lastError || new Error('Failed to get response from Claude')
    }

    // Extrair JSON da resposta
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    let analysisData
    try {
      // Tentar parsear diretamente
      analysisData = JSON.parse(content.text.trim())
    } catch (e) {
      // Se falhar, tentar extrair JSON de markdown ou texto
      const cleaned = content.text.trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim()
      
      try {
        analysisData = JSON.parse(cleaned)
      } catch (e2) {
        // Última tentativa: extrair objeto JSON com regex
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0])
        } else {
          throw new Error(`Could not parse JSON from Claude response: ${e2}`)
        }
      }
    }

    // Validar estrutura mínima
    if (!analysisData.category || !analysisData.tags || !Array.isArray(analysisData.tags)) {
      throw new Error('Invalid analysis structure from Claude')
    }

    // Adicionar metadata do modelo usado
    analysisData._model = selectedModel
    analysisData._modelName = modelConfig.name
    analysisData._analyzedAt = new Date().toISOString()
    analysisData._costEstimate = modelConfig.costMultiplier * 0.015 // R$ base

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
          altPt: analysisData.caption || undefined,
          altEn: analysisData.caption || undefined
        }
      })
    }

    return NextResponse.json({
      success: true,
      cached: false,
      analysis: analysisData,
      model: {
        used: selectedModel,
        name: modelConfig.name,
        costEstimate: analysisData._costEstimate
      },
      rawResponse: content.text.substring(0, 500) // Primeiros 500 chars para debug
    })
  } catch (error: unknown) {
    console.error('❌ AI Analysis error:', error)
    const err = error as { status?: number; message?: string }
    
    // Retornar análise básica em caso de erro
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error',
      errorType: err.status === 404 ? 'model_not_found' : err.status === 401 ? 'unauthorized' : 'processing_error',
      fallback: {
        category: 'portfolio',
        tags: ['sem-categoria'],
        caption: 'Imagem sem análise automática',
        confidence: 0,
        recommendation: 'Erro ao analisar. Por favor, categorize manualmente.',
        _error: err.message || 'Unknown error'
      },
      suggestions: [
        'Verifique se CLAUDE_API_KEY está configurada corretamente',
        'Verifique se o modelo selecionado está disponível',
        'Tente novamente ou use análise manual'
      ]
    }, { status: err.status || 500 })
  }
}

// ════════════════════════════════════════════════════════════
// ENDPOINT ADICIONAL: Listar modelos disponíveis
// ════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    availableModels: Object.entries(AVAILABLE_MODELS).map(([key, config]) => ({
      id: key,
      name: config.name,
      version: config.version,
      maxTokens: config.maxTokens,
      useCase: config.useCase,
      costMultiplier: config.costMultiplier,
      estimatedCostPerImage: (config.costMultiplier * 0.015).toFixed(4) // R$
    })),
    recommended: {
      bestQuality: 'claude-3-5-sonnet-20241022', // Sonnet 4.5
      bestBalance: 'claude-3-5-sonnet-20240620', // Sonnet 3.5
      bestEconomy: 'claude-3-sonnet-20240229' // Sonnet 3
    },
    default: 'claude-3-5-sonnet-20241022'
  })
}
