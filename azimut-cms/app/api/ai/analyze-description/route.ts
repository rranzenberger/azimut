import { NextResponse } from 'next/server'
import { analyzeWithAI } from '@/src/lib/ai-provider'

/**
 * API de Análise de Descrição em Tempo Real
 * Analisa o que o usuário digita e sugere melhorias/complementos
 */

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { description, language = 'pt' } = data

    // Se descrição muito curta, não analisar ainda
    if (!description || description.length < 20) {
      return NextResponse.json({
        analyzed: false,
        reason: 'too-short'
      })
    }

    const prompt = `
Analise a descrição de projeto abaixo e forneça insights úteis.

DESCRIÇÃO DO USUÁRIO:
"${description}"

IDIOMA: ${language}

TAREFA:
1. Detectar tipo de projeto (museu, educação, corporativo, evento, VR/AR, etc)
2. Identificar elementos mencionados (tecnologias, objetivos, público-alvo)
3. Sugerir 3-5 complementos que o usuário poderia adicionar
4. Detectar nível de detalhamento (baixo/médio/alto)
5. Identificar possíveis ambiguidades ou falta de informação

RESPONDA EM JSON:
{
  "detectedType": "tipo detectado",
  "detectedElements": ["elemento1", "elemento2"],
  "suggestions": [
    "Considere mencionar o público-alvo esperado",
    "Seria útil especificar o prazo desejado"
  ],
  "detailLevel": "baixo|médio|alto",
  "estimatedBudgetRange": "faixa estimada se possível",
  "questions": [
    "Qual o tamanho do espaço disponível?",
    "Há preferência por alguma tecnologia específica?"
  ]
}

Responda no idioma ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : language === 'fr' ? 'francês' : 'inglês'}.
`

    const aiResponse = await analyzeWithAI(prompt, {
      temperature: 0.5,
      maxTokens: 800
    })

    // Parse resposta da IA
    let analysis
    try {
      analysis = JSON.parse(aiResponse)
    } catch {
      return NextResponse.json({
        analyzed: false,
        reason: 'parse-error'
      })
    }

    return NextResponse.json({
      analyzed: true,
      ...analysis
    })

  } catch (error: any) {
    console.error('Error in description analysis:', error)
    
    return NextResponse.json({
      analyzed: false,
      reason: 'error',
      error: error.message
    }, { status: 500 })
  }
}
