// ════════════════════════════════════════════════════════════
// API: FUNIL DE CONVERSÃO
// Calcula jornada do visitante: Home → Projetos → About → Contato
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/src/lib/prisma'
import { verifyAuthToken } from '@/src/lib/auth'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Período de análise: últimos 30 dias
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    // Buscar todas as sessões com page views
    const sessions = await prisma.visitorSession.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
      select: {
        sessionId: true,
        pageViews: {
          select: { pageSlug: true },
        },
      },
    })

    // Definir etapas do funil
    const funnelSteps = [
      { name: 'Home', patterns: ['/pt', '/en', '/fr', '/es', '/', '/pt/', '/en/', '/fr/', '/es/'] },
      { name: 'Projetos', patterns: ['/projects', '/projetos', '/project/', '/projeto/'] },
      { name: 'About', patterns: ['/about', '/sobre'] },
      { name: 'Serviços', patterns: ['/services', '/servicos'] },
      { name: 'Academy', patterns: ['/academy', '/vancouver'] },
      { name: 'Contato', patterns: ['/contact', '/contato', '/quiz'] },
    ]

    // Calcular quantos visitantes chegaram em cada etapa
    const funnelData = funnelSteps.map(step => {
      const count = sessions.filter(s => 
        s.pageViews.some(pv => 
          pv.pageSlug && step.patterns.some(pattern => 
            pv.pageSlug!.includes(pattern) || pv.pageSlug === pattern
          )
        )
      ).length
      return {
        step: step.name,
        visitors: count,
      }
    })

    // Calcular conversão entre etapas
    const totalSessions = sessions.length
    const funnelWithRates = funnelData.map((step, index) => {
      const previousCount = index === 0 ? totalSessions : funnelData[index - 1].visitors
      const dropOff = previousCount > 0 ? Math.round((1 - step.visitors / previousCount) * 100) : 0
      const conversionRate = totalSessions > 0 ? Math.round((step.visitors / totalSessions) * 100) : 0
      
      return {
        ...step,
        percentage: conversionRate,
        dropOff: index === 0 ? 0 : dropOff,
      }
    })

    // Calcular conversão final (visitantes que chegaram ao contato)
    const contactVisitors = funnelData.find(f => f.step === 'Contato')?.visitors || 0
    const overallConversion = totalSessions > 0 ? ((contactVisitors / totalSessions) * 100).toFixed(1) : '0.0'

    return NextResponse.json({
      totalSessions,
      funnel: funnelWithRates,
      overallConversion: parseFloat(overallConversion),
      period: '30 dias',
    })

  } catch (error: any) {
    console.error('Erro ao calcular funil:', error)
    return NextResponse.json(
      { error: 'Erro ao calcular funil', details: error.message },
      { status: 500 }
    )
  }
}
