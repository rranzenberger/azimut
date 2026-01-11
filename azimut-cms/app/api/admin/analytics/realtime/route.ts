// ════════════════════════════════════════════════════════════
// API: REAL-TIME ANALYTICS
// Retorna visitantes online (ativos nos últimos 5 minutos)
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyAuthToken } from '@/lib/auth'

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

    // Considerar "online" quem teve atividade nos últimos 5 minutos
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    // Buscar sessões ativas
    const activeSessions = await prisma.visitorSession.findMany({
      where: {
        lastActivityAt: {
          gte: fiveMinutesAgo,
        },
      },
      select: {
        sessionId: true,
        country: true,
        language: true,
        visitorFingerprint: true,
        deviceType: true,
        browser: true,
        lastActivityAt: true,
        pageViews: {
          orderBy: { viewedAt: 'desc' },
          take: 1,
          select: {
            pageSlug: true,
            viewedAt: true,
          },
        },
      },
      orderBy: { lastActivityAt: 'desc' },
      take: 50,
    })

    // Agrupar por página atual
    const pagesCounts: Record<string, number> = {}
    activeSessions.forEach(s => {
      const page = s.pageViews[0]?.pageSlug || 'unknown'
      pagesCounts[page] = (pagesCounts[page] || 0) + 1
    })

    // Top 10 páginas
    const topPages = Object.entries(pagesCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }))

    // Agrupar por país
    const countryCounts: Record<string, number> = {}
    activeSessions.forEach(s => {
      const country = s.country || 'Unknown'
      countryCounts[country] = (countryCounts[country] || 0) + 1
    })

    return NextResponse.json({
      onlineNow: activeSessions.length,
      lastUpdated: new Date().toISOString(),
      activeSessions: activeSessions.map(s => ({
        id: s.sessionId.substring(0, 8),
        country: s.country,
        device: s.deviceType,
        browser: s.browser,
        currentPage: s.pageViews[0]?.pageSlug || 'unknown',
        lastActivity: s.lastActivityAt,
      })),
      topPages,
      byCountry: Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([country, count]) => ({ country, count })),
    })

  } catch (error: any) {
    console.error('Erro ao buscar dados real-time:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados real-time', details: error.message },
      { status: 500 }
    )
  }
}
