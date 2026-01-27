/**
 * API para Gerar Relatório Diário de Leads
 * GET /api/admin/reports/leads-daily
 * 
 * Gera relatório diário com:
 * - Novos leads do dia
 * - Leads quentes (score > 70)
 * - Análise de tendências
 * - Recomendações da IA
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Buscar leads do dia
    const todayLeads = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      orderBy: { leadScore: 'desc' },
    })

    // Buscar leads quentes (score > 70)
    const hotLeads = todayLeads.filter(l => l.leadScore > 70)

    // Estatísticas
    const stats = {
      total: todayLeads.length,
      hot: hotLeads.length,
      high: todayLeads.filter(l => l.leadScore >= 60 && l.leadScore <= 70).length,
      medium: todayLeads.filter(l => l.leadScore >= 40 && l.leadScore < 60).length,
      low: todayLeads.filter(l => l.leadScore < 40).length,
      totalEstimatedValue: todayLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0),
      avgScore: todayLeads.length > 0 
        ? todayLeads.reduce((sum, l) => sum + l.leadScore, 0) / todayLeads.length 
        : 0,
    }

    // Análise de tendências com IA (se houver leads suficientes)
    let aiInsights = null
    if (todayLeads.length > 0 && ANTHROPIC_API_KEY) {
      try {
        const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
        
        const summary = `
LEADS DO DIA: ${stats.total}
- Leads quentes (score > 70): ${stats.hot}
- Leads bons (score 60-70): ${stats.high}
- Leads médios (score 40-59): ${stats.medium}
- Leads frios (score < 40): ${stats.low}
- Valor total estimado: R$ ${stats.totalEstimatedValue.toLocaleString('pt-BR')}
- Score médio: ${stats.avgScore.toFixed(1)}

LEADS QUENTES:
${hotLeads.slice(0, 5).map(l => `- ${l.name} (${l.company || 'Sem empresa'}) - Score: ${l.leadScore} - ${l.projectType || 'Tipo não especificado'}`).join('\n')}
`

        const prompt = `Você é um analista de vendas B2B. Analise os seguintes dados de leads do dia e forneça:

1. insights: Array de 3-5 insights principais sobre os leads
2. trends: Tendências identificadas (ex: aumento de leads de museus, interesse em VR, etc)
3. recommendations: Array de 3 recomendações acionáveis
4. priorityActions: Próximas ações prioritárias (máximo 3)

DADOS:
${summary}

Retorne APENAS JSON válido, sem markdown.`

        const message = await anthropic.messages.create({
          model: 'claude-3-5-haiku-20241022',
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

        aiInsights = JSON.parse(cleaned)
      } catch (error) {
        console.error('Erro ao gerar insights com IA:', error)
      }
    }

    return NextResponse.json({
      success: true,
      date: today.toISOString().split('T')[0],
      stats,
      hotLeads: hotLeads.slice(0, 10).map(l => ({
        id: l.id,
        name: l.name,
        email: l.email,
        company: l.company,
        score: l.leadScore,
        priority: l.priority,
        projectType: l.projectType,
        estimatedValue: l.estimatedValue,
      })),
      aiInsights,
    })
  } catch (error: any) {
    console.error('[Leads Daily Report] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao gerar relatório',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
