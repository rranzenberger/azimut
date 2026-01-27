/**
 * API do Game Neurolinguístico
 * Analisa respostas e qualifica leads usando neurolinguística + IA
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

interface GameAnswers {
  q1: string // Qual experiência te fascina
  q2: string // Como prefere aprender
  q3: string // O que te motiva
  q4: string // Projeto ideal
  q5: string // Quando começar
  name?: string
  email?: string
}

// Análise neurolinguística básica
function analyzeNeurolinguistic(answers: GameAnswers) {
  let score = 0
  const patterns: string[] = []
  const insights: string[] = []

  // Q1: Sistema de representação
  if (answers.q1.includes('VR imersivo') || answers.q1.includes('AR interativo')) {
    score += 15
    patterns.push('Visual/Cinestésico')
    insights.push('Interesse em experiências práticas')
  } else if (answers.q1.includes('Produção cinematográfica')) {
    score += 10
    patterns.push('Auditivo/Específico')
    insights.push('Interesse em carreira/curso')
  } else if (answers.q1.includes('curiosidade')) {
    score -= 10
    patterns.push('Dissociação')
    insights.push('Apenas explorando, lead frio')
  }

  // Q2: Metaprogramas
  if (answers.q2.includes('Vendo e experimentando')) {
    score += 15
    patterns.push('Visual + Cinestésico')
    insights.push('Prefere curso presencial ou workshop')
  } else if (answers.q2.includes('Fazendo junto')) {
    score += 20
    patterns.push('Associação + Proativo')
    insights.push('Lead quente, quer cooperação')
  } else if (answers.q2.includes('Sozinho')) {
    score -= 5
    patterns.push('Dissociação')
    insights.push('Pode ser lead frio')
  }

  // Q3: Valores
  if (answers.q3.includes('Criar algo único')) {
    score += 25
    patterns.push('Valores: Criatividade + Impacto')
    insights.push('Lead quente, projeto real')
  } else if (answers.q3.includes('Dominar tecnologia')) {
    score += 15
    patterns.push('Valores: Tecnologia')
    insights.push('Interesse em curso avançado')
  } else if (answers.q3.includes('Apenas conhecer')) {
    score -= 15
    patterns.push('Sem valores claros')
    insights.push('Lead frio')
  }

  // Q4: Intenção
  if (answers.q4.includes('cliente real')) {
    score += 30
    patterns.push('Proativo + Específico')
    insights.push('LEAD QUENTE - Projeto real')
  } else if (answers.q4.includes('portfólio')) {
    score += 10
    patterns.push('Reativo')
    insights.push('Lead médio')
  } else if (answers.q4.includes('Apenas aprender') || answers.q4.includes('Não tenho ideia')) {
    score -= 10
    patterns.push('Sem direção')
    insights.push('Lead frio')
  }

  // Q5: Timeline
  if (answers.q5.includes('projeto em andamento')) {
    score += 40
    patterns.push('URGENTE')
    insights.push('LEAD URGENTE - Contatar imediatamente')
  } else if (answers.q5.includes('próximos 3 meses')) {
    score += 20
    patterns.push('Proativo')
    insights.push('Lead alto, timeline definido')
  } else if (answers.q5.includes('Apenas pesquisando')) {
    score -= 15
    patterns.push('Dissociação')
    insights.push('Lead frio')
  }

  // Classificação
  let classification: 'hot' | 'high' | 'medium' | 'cold'
  let priority: 'urgent' | 'high' | 'medium' | 'low'
  let intention: 'serious' | 'exploring' | 'playing'

  if (score >= 80) {
    classification = 'hot'
    priority = 'urgent'
    intention = 'serious'
  } else if (score >= 60) {
    classification = 'high'
    priority = 'high'
    intention = 'serious'
  } else if (score >= 40) {
    classification = 'medium'
    priority = 'medium'
    intention = 'exploring'
  } else {
    classification = 'cold'
    priority = 'low'
    intention = score < 0 ? 'playing' : 'exploring'
  }

  return {
    score,
    classification,
    priority,
    intention,
    patterns,
    insights,
  }
}

// Análise profunda com IA
async function analyzeWithAI(answers: GameAnswers, basicAnalysis: any) {
  if (!ANTHROPIC_API_KEY && !DEEPSEEK_API_KEY) {
    return null
  }

  const prompt = `Você é um especialista em neurolinguística e análise de comportamento.

Analise as respostas deste usuário no game neurolinguístico e forneça insights profundos:

RESPOSTAS:
1. Qual experiência te fascina: ${answers.q1}
2. Como prefere aprender: ${answers.q2}
3. O que te motiva: ${answers.q3}
4. Projeto ideal: ${answers.q4}
5. Quando começar: ${answers.q5}

ANÁLISE BÁSICA:
- Score: ${basicAnalysis.score}
- Classificação: ${basicAnalysis.classification}
- Padrões: ${basicAnalysis.patterns.join(', ')}

Forneça uma análise JSON com:
1. intencaoReal: "seria" | "explorando" | "brincadeira" (avalia se é sério ou não)
2. perfilComportamental: Descrição do perfil (ex: "Decisor visual que age rápido")
3. abordagemEmpatica: Sugestão de como abordar este lead de forma empática e simpática
4. proximoPasso: Próxima ação recomendada
5. tomComunicacao: Tom ideal para comunicação (ex: "Direto, focado em ação, mostrar resultados")
6. sinaisQuente: Array de sinais que indicam lead quente
7. sinaisFrio: Array de sinais que indicam lead frio

Retorne APENAS JSON válido, sem markdown.`

  try {
    // Tentar Claude primeiro
    if (ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
      const models = [
        'claude-3-5-haiku-20241022',
        'claude-3-haiku-20240307',
      ]

      for (const model of models) {
        try {
          const message = await anthropic.messages.create({
            model: model,
            max_tokens: 1500,
            messages: [{ role: 'user', content: prompt }],
          })

          const responseText = message.content[0].type === 'text' 
            ? message.content[0].text 
            : ''

          const cleaned = responseText
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim()

          return JSON.parse(cleaned)
        } catch (error: any) {
          if (!error.message?.includes('not_found')) continue
        }
      }
    }

    // Fallback DeepSeek
    if (DEEPSEEK_API_KEY) {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1500,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const responseText = data.choices[0]?.message?.content || ''
        const cleaned = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim()
        return JSON.parse(cleaned)
      }
    }
  } catch (error) {
    console.error('Erro na análise IA:', error)
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: GameAnswers = await request.json()

    if (!body.q1 || !body.q2 || !body.q3 || !body.q4 || !body.q5) {
      return NextResponse.json(
        { error: 'Todas as perguntas são obrigatórias' },
        { status: 400 }
      )
    }

    // Análise neurolinguística básica
    const basicAnalysis = analyzeNeurolinguistic(body)

    // Análise profunda com IA
    const aiAnalysis = await analyzeWithAI(body, basicAnalysis)

    // Determinar tipo de NFT
    let nftType: 'hot' | 'curious' | 'beginner'
    if (basicAnalysis.score >= 80) {
      nftType = 'hot'
    } else if (basicAnalysis.score >= 40) {
      nftType = 'curious'
    } else {
      nftType = 'beginner'
    }

    // Salvar no banco (se tiver email)
    if (body.email) {
      try {
        const { prisma } = await import('@/src/lib/prisma')
        
        // Criar ou atualizar lead
        await prisma.lead.upsert({
          where: { email: body.email },
          update: {
            leadScore: basicAnalysis.score,
            priority: basicAnalysis.priority as any,
            leadIntelligence: {
              gameScore: basicAnalysis.score,
              classification: basicAnalysis.classification,
              intention: basicAnalysis.intention,
              patterns: basicAnalysis.patterns,
              insights: basicAnalysis.insights,
              aiAnalysis: aiAnalysis,
              nftType: nftType,
            } as any,
          },
          create: {
            name: body.name || 'Usuário do Game',
            email: body.email,
            leadType: 'GAME_NEUROLINGUISTIC',
            status: 'NEW',
            priority: basicAnalysis.priority as any,
            leadScore: basicAnalysis.score,
            leadIntelligence: {
              gameScore: basicAnalysis.score,
              classification: basicAnalysis.classification,
              intention: basicAnalysis.intention,
              patterns: basicAnalysis.patterns,
              insights: basicAnalysis.insights,
              aiAnalysis: aiAnalysis,
              nftType: nftType,
            } as any,
          },
        })
      } catch (dbError) {
        console.error('Erro ao salvar no banco:', dbError)
        // Não falhar se banco der erro
      }
    }

    return NextResponse.json({
      success: true,
      analysis: {
        ...basicAnalysis,
        aiAnalysis,
      },
      nft: {
        type: nftType,
        eligible: true,
        message: nftType === 'hot' 
          ? '🎉 Você desbloqueou um NFT especial! Conecte sua carteira para reivindicar.'
          : '🎁 Você ganhou um NFT de exploração! Conecte sua carteira para reivindicar.',
      },
      recommendation: {
        action: basicAnalysis.classification === 'hot' 
          ? 'contatar_imediatamente'
          : basicAnalysis.classification === 'high'
          ? 'qualificar_mais'
          : 'nutrir_conteudo',
        message: aiAnalysis?.abordagemEmpatica || 'Continue explorando nosso conteúdo!',
      },
    })
  } catch (error: any) {
    console.error('[Game Neurolinguistic] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao processar game',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
