/**
 * API para Análise Inteligente de Leads com IA
 * POST /api/ai/analyze-lead
 * 
 * Analisa um lead usando Claude/DeepSeek e retorna:
 * - Score de qualidade (0-100)
 * - Tipo de cliente
 * - Prioridade
 * - Insights e recomendações
 * - Próximas ações sugeridas
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

// Tentar Claude primeiro, se falhar usa DeepSeek
async function analyzeWithAI(prompt: string) {
  // Tentar Claude primeiro (melhor qualidade)
  if (ANTHROPIC_API_KEY) {
    try {
      const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
      
      const models = [
        'claude-3-5-sonnet-20241022',
        'claude-3-5-sonnet-20240620',
        'claude-3-5-haiku-20241022',
        'claude-3-haiku-20240307'
      ]
      
      for (const model of models) {
        try {
          const message = await anthropic.messages.create({
            model: model,
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
          })
          
          const responseText = message.content[0].type === 'text' 
            ? message.content[0].text 
            : JSON.stringify(message.content[0])
          
          return responseText
        } catch (error: any) {
          if (!error.message?.includes('not_found') && !error.message?.includes('404')) {
            throw error
          }
          continue
        }
      }
    } catch (error) {
      console.warn('Claude falhou, tentando DeepSeek...', error)
    }
  }
  
  // Fallback para DeepSeek
  if (DEEPSEEK_API_KEY) {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000,
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        return data.choices[0]?.message?.content || ''
      }
    } catch (error) {
      console.error('DeepSeek também falhou:', error)
    }
  }
  
  throw new Error('Nenhuma IA disponível')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      position,
      projectType,
      budget,
      timeline,
      description,
      // Dados comportamentais
      pagesVisited = [],
      projectsViewed = [],
      timeOnSite = 0,
      source = 'website',
      country,
      city,
    } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Preparar contexto completo do lead
    const leadContext = `
LEAD INFORMATION:
- Nome: ${name}
- Email: ${email}
- Telefone: ${phone || 'Não informado'}
- Empresa: ${company || 'Não informado'}
- Cargo: ${position || 'Não informado'}
- Tipo de Projeto: ${projectType || 'Não especificado'}
- Orçamento: ${budget || 'Não informado'}
- Timeline: ${timeline || 'Não informado'}
- Descrição: ${description || 'Não informado'}
- Localização: ${city || ''} ${country || ''}
- Fonte: ${source}

COMPORTAMENTO NO SITE:
- Páginas visitadas: ${pagesVisited.join(', ') || 'Nenhuma'}
- Projetos visualizados: ${projectsViewed.join(', ') || 'Nenhum'}
- Tempo no site: ${timeOnSite} segundos
`

    const prompt = `Você é um especialista em análise de leads B2B para uma produtora audiovisual que cria experiências imersivas (VR, AR, museus, exposições).

Analise o seguinte lead e forneça uma análise completa em JSON:

${leadContext}

Forneça uma análise JSON com:
1. leadScore: Número de 0-100 (qualidade do lead)
   - 80-100: Lead quente (URGENT) - Orçamento definido, timeline curto, decisor
   - 60-79: Lead bom (HIGH) - Interesse claro, orçamento médio
   - 40-59: Lead médio (MEDIUM) - Interesse, mas sem orçamento/timeline
   - 0-39: Lead frio (LOW) - Pouco interesse ou sem informações

2. priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW"

3. visitorType: Tipo de cliente mais provável:
   - "MUSEUM_CURATOR" - Curador de museu
   - "CITY_OFFICIAL" - Funcionário público/governo
   - "BRAND_MANAGER" - Gerente de marca/corporativo
   - "FESTIVAL_ORGANIZER" - Organizador de festival
   - "EDUCATION_LEADER" - Líder educacional
   - "TECH_ENTHUSIAST" - Entusiasta de tecnologia
   - "GENERAL_PUBLIC" - Público geral

4. organizationType: Tipo de organização:
   - "governo" - Governo/público
   - "museu" - Museu/instituição cultural
   - "corporativo" - Empresa privada
   - "educacao" - Instituição educacional
   - "festival" - Festival/evento
   - "outro" - Outro

5. estimatedValue: Valor estimado do projeto em R$ (número ou null)

6. likelihood: Probabilidade de fechar ("HIGH" | "MEDIUM" | "LOW")

7. insights: Array de insights sobre o lead (máximo 5)

8. recommendedActions: Array de ações recomendadas (máximo 3)

9. riskFactors: Array de fatores de risco (se houver)

10. nextBestAction: Próxima melhor ação (string)

IMPORTANTE:
- Seja realista e conservador no score
- Considere: orçamento, timeline, tipo de organização, cargo, comportamento
- Priorize leads com orçamento definido e timeline curto
- Identifique decisores vs pesquisadores

Retorne APENAS JSON válido, sem markdown, sem explicações adicionais.`

    // Analisar com IA
    const aiResponse = await analyzeWithAI(prompt)
    
    // Parsear resposta
    let analysis
    try {
      const cleaned = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      analysis = JSON.parse(cleaned)
    } catch (parseError) {
      // Se não conseguir parsear, criar análise básica
      analysis = {
        leadScore: 50,
        priority: 'MEDIUM',
        visitorType: 'GENERAL_PUBLIC',
        organizationType: 'outro',
        estimatedValue: null,
        likelihood: 'MEDIUM',
        insights: ['Análise automática não disponível'],
        recommendedActions: ['Entrar em contato para qualificar'],
        riskFactors: [],
        nextBestAction: 'Contatar via email ou telefone',
      }
    }

    // Garantir valores padrão
    const finalAnalysis = {
      leadScore: Math.min(100, Math.max(0, analysis.leadScore || 50)),
      priority: analysis.priority || 'MEDIUM',
      visitorType: analysis.visitorType || 'GENERAL_PUBLIC',
      organizationType: analysis.organizationType || 'outro',
      estimatedValue: analysis.estimatedValue || null,
      likelihood: analysis.likelihood || 'MEDIUM',
      insights: Array.isArray(analysis.insights) ? analysis.insights : [],
      recommendedActions: Array.isArray(analysis.recommendedActions) ? analysis.recommendedActions : [],
      riskFactors: Array.isArray(analysis.riskFactors) ? analysis.riskFactors : [],
      nextBestAction: analysis.nextBestAction || 'Contatar para qualificar',
      analyzedAt: new Date().toISOString(),
      aiProvider: ANTHROPIC_API_KEY ? 'claude' : 'deepseek',
    }

    return NextResponse.json({
      success: true,
      analysis: finalAnalysis,
    })
  } catch (error: any) {
    console.error('[Analyze Lead] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao analisar lead',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
