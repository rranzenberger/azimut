// ════════════════════════════════════════════════════════════
// API: Analytics Overview - Métricas Gerais
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parâmetros de filtro (date range)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Métricas principais
    const [
      totalSessions,
      uniqueVisitors,
      returningVisitors,
      pwaInstalls,
      totalPageViews,
      sessionsData,
      pageViewsData,
      countryData,
      deviceData,
    ] = await Promise.all([
      // Total de sessões
      prisma.visitorSession.count({
        where: { createdAt: { gte: startDate } },
      }),

      // Visitantes únicos (por fingerprint)
      prisma.visitorSession.groupBy({
        by: ['visitorFingerprint'],
        where: {
          createdAt: { gte: startDate },
          visitorFingerprint: { not: null },
        },
        _count: true,
      }),

      // Visitantes retornantes
      prisma.visitorSession.count({
        where: {
          createdAt: { gte: startDate },
          isReturning: true,
        },
      }),

      // PWA Installs
      prisma.pWAInstall.count({
        where: {
          createdAt: { gte: startDate },
          type: 'installed',
        },
      }),

      // Total page views
      prisma.pageView.count({
        where: { viewedAt: { gte: startDate } },
      }),

      // Sessões por dia (para gráfico de linha)
      prisma.visitorSession.groupBy({
        by: ['createdAt'],
        where: { createdAt: { gte: startDate } },
        _count: true,
      }),

      // Top páginas
      prisma.pageView.groupBy({
        by: ['pageSlug'],
        where: { viewedAt: { gte: startDate }, pageSlug: { not: null } },
        _count: true,
        _avg: { timeSpent: true, scrollDepth: true },
      }),

      // Por país
      prisma.visitorSession.groupBy({
        by: ['country'],
        where: {
          createdAt: { gte: startDate },
          country: { not: null },
        },
        _count: true,
      }),

      // Por device type
      prisma.visitorSession.groupBy({
        by: ['deviceType'],
        where: {
          createdAt: { gte: startDate },
          deviceType: { not: null },
        },
        _count: true,
      }),
    ]);

    // Calcular bounce rate
    const bounceCount = await prisma.visitorSession.count({
      where: {
        createdAt: { gte: startDate },
        bounceRate: true,
      },
    });
    const bounceRate = totalSessions > 0 ? (bounceCount / totalSessions) * 100 : 0;

    // Processar dados para gráficos
    const timelineData = sessionsData.map((item) => ({
      date: item.createdAt.toISOString().split('T')[0],
      count: item._count,
    }));

    const topPages = pageViewsData
      .map((item) => ({
        page: item.pageSlug || 'Unknown',
        views: item._count,
        avgTime: Math.round(item._avg.timeSpent || 0),
        avgScroll: Math.round(item._avg.scrollDepth || 0),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const countries = countryData
      .map((item) => ({
        country: item.country || 'Unknown',
        count: item._count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const devices = deviceData.map((item) => ({
      type: item.deviceType || 'Unknown',
      count: item._count,
    }));

    return NextResponse.json({
      success: true,
      metrics: {
        totalSessions,
        uniqueVisitors: uniqueVisitors.length,
        returningVisitors,
        pwaInstalls,
        totalPageViews,
        bounceRate: Math.round(bounceRate * 100) / 100,
        avgSessionDuration: totalSessions > 0 ? Math.round(totalPageViews / totalSessions) : 0,
      },
      charts: {
        timeline: timelineData,
        topPages,
        countries,
        devices,
      },
    });
  } catch (error: unknown) {
    console.error('Analytics overview error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
