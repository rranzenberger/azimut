import { NextResponse } from 'next/server'
import { analyzeWithAI } from '@/src/lib/ai-provider'

/**
 * API de Assistente de Orçamento com IA
 * Estima orçamento baseado em requisitos do projeto
 */

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { 
      projectType,
      description,
      features = [],
      size,
      timeline,
      organizationType,
      language = 'pt'
    } = data

    const prompt = `
Você é um especialista em orçamentos para projetos de experiências imersivas, museus e tecnologia.

REQUISITOS DO PROJETO:
- Tipo: ${projectType || 'não especificado'}
- Descrição: ${description || 'não fornecida'}
- Features desejadas: ${features.join(', ') || 'não especificadas'}
- Tamanho/Escala: ${size || 'não especificado'}
- Prazo: ${timeline || 'não especificado'}
- Tipo de organização: ${organizationType || 'não especificado'}

CONTEXTO:
- Projetos de museus pequenos: R$ 50k-150k
- Museus médios: R$ 150k-500k
- Museus grandes: R$ 500k-2M+
- Instalações VR/AR: R$ 100k-300k
- Apps/Plataformas: R$ 50k-200k
- Eventos: R$ 30k-150k
- Treinamento corporativo: R$ 80k-300k

TAREFA:
1. Analisar requisitos e complexidade
2. Estimar faixa de orçamento realista
3. Listar fatores que influenciam o custo
4. Sugerir opções para diferentes budgets
5. Alertar sobre custos adicionais comuns

RESPONDA EM JSON:
{
  "estimatedRange": {
    "min": 100000,
    "max": 300000,
    "currency": "BRL"
  },
  "confidence": "alta|média|baixa",
  "breakdown": {
    "development": "30-40%",
    "hardware": "20-30%",
    "content": "15-25%",
    "installation": "10-15%",
    "other": "5-10%"
  },
  "costFactors": [
    "Número de touchscreens necessários",
    "Complexidade da integração de sistemas"
  ],
  "options": [
    {
      "tier": "básico",
      "budget": "R$ 100k-150k",
      "includes": ["features básicas"]
    },
    {
      "tier": "completo",
      "budget": "R$ 200k-300k",
      "includes": ["todas features + extras"]
    }
  ],
  "additionalCosts": [
    "Manutenção anual (10-15% do valor inicial)",
    "Treinamento da equipe (R$ 5k-10k)"
  ],
  "timeline": "6-9 meses estimados",
  "recommendations": [
    "Recomendamos começar com MVP e expandir",
    "Considere fase piloto de 3 meses"
  ]
}

Responda no idioma ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : language === 'fr' ? 'francês' : 'inglês'}.
`

    const aiResponse = await analyzeWithAI(prompt, {
      temperature: 0.4,
      maxTokens: 1200
    })

    // Parse resposta da IA
    let estimate
    try {
      estimate = JSON.parse(aiResponse)
    } catch {
      // Fallback: estimativa genérica
      return NextResponse.json({
        estimatedRange: {
          min: 100000,
          max: 500000,
          currency: 'BRL'
        },
        confidence: 'baixa',
        message: 'Estimativa genérica - preencha mais detalhes para orçamento preciso',
        fallback: true
      })
    }

    return NextResponse.json({
      success: true,
      ...estimate
    })

  } catch (error: any) {
    console.error('Error in budget estimation:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Não foi possível estimar o orçamento. Por favor, preencha o formulário para uma cotação personalizada.'
    }, { status: 500 })
  }
}
