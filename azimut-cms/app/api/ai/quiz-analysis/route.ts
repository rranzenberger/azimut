import { NextResponse } from 'next/server'
import { analyzeWithAI } from '@/src/lib/ai-provider'

/**
 * API de Análise de Quiz Interativo
 * Analisa respostas do quiz e sugere solução ideal + preenche formulário
 */

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { answers, language = 'pt' } = data

    const prompt = `
Analise as respostas do quiz de descoberta de projeto e forneça recomendação personalizada.

RESPOSTAS DO USUÁRIO:
${JSON.stringify(answers, null, 2)}

TAREFA:
1. Identificar necessidades e objetivos do projeto
2. Detectar tipo de organização e contexto
3. Sugerir solução ideal (tipo de projeto)
4. Estimar complexidade e orçamento
5. Preencher automaticamente campos do formulário

RESPONDA EM JSON:
{
  "analysis": {
    "mainNeed": "necessidade principal identificada",
    "audience": "público-alvo detectado",
    "context": "contexto do projeto",
    "complexity": "baixa|média|alta"
  },
  "recommendation": {
    "title": "Título da solução recomendada",
    "description": "Descrição detalhada da solução ideal para este caso",
    "projectType": "museu|instalacao|vr|app|evento|treinamento",
    "estimatedBudget": "50k-100k|100k-300k|300k-500k|500k-1m|1m+",
    "estimatedTimeline": "urgente|6m|12m|18m+",
    "keyFeatures": ["feature1", "feature2", "feature3"]
  },
  "formData": {
    "projectType": "valor para o campo projectType",
    "organizationType": "valor para o campo organizationType",
    "budget": "valor para o campo budget",
    "timeline": "valor para o campo timeline",
    "description": "descrição pré-preenchida baseada nas respostas",
    "interestInGrants": true|false
  },
  "nextSteps": [
    "Passo 1 recomendado",
    "Passo 2 recomendado"
  ],
  "whyThisSolution": "Explicação de por que esta é a solução ideal"
}

Responda no idioma ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : language === 'fr' ? 'francês' : 'inglês'}.
`

    const aiResponse = await analyzeWithAI(prompt, {
      temperature: 0.6,
      maxTokens: 1500
    })

    // Parse resposta da IA
    let result
    try {
      result = JSON.parse(aiResponse)
    } catch {
      return NextResponse.json({
        success: false,
        reason: 'parse-error'
      })
    }

    return NextResponse.json({
      success: true,
      ...result
    })

  } catch (error: any) {
    console.error('Error in quiz analysis:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
