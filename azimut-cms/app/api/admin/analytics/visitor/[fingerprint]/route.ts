// ════════════════════════════════════════════════════════════
// API: Detalhes de um Visitante Específico
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { fingerprint: string } }
) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fingerprint } = params;

    // Buscar todas as sessões deste visitante
    const sessions = await prisma.visitorSession.findMany({
      where: { visitorFingerprint: fingerprint },
      include: {
        pageViews: {
          include: {
            project: {
              select: {
                id: true,
                slug: true,
                title: true,
              },
            },
          },
          orderBy: { viewedAt: 'desc' },
        },
        visitorBehaviors: {
          orderBy: { timestamp: 'desc' },
          take: 100, // Últimas 100 interações
        },
        pwaInstalls: {
          orderBy: { createdAt: 'desc' },
        },
        projectInteractions: {
          include: {
            project: {
              select: {
                id: true,
                slug: true,
                title: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        interestScore: true,
        lead: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (sessions.length === 0) {
      return NextResponse.json({ error: 'Visitor not found' }, { status: 404 });
    }

    // Processar dados
    const firstSession = sessions[0];
    const allPageViews = sessions.flatMap((s) => s.pageViews);
    const allBehaviors = sessions.flatMap((s) => s.visitorBehaviors);
    const totalTime = allPageViews.reduce((sum, pv) => sum + (pv.timeSpent || 0), 0);

    // Timeline de atividades
    const timeline = [
      ...allPageViews.map((pv) => ({
        type: 'page_view',
        timestamp: pv.viewedAt,
        data: {
          page: pv.pageSlug,
          timeSpent: pv.timeSpent,
          scrollDepth: pv.scrollDepth,
        },
      })),
      ...allBehaviors.map((b) => ({
        type: 'behavior',
        timestamp: b.timestamp,
        data: {
          behavior: b.behaviorType,
          element: b.element,
          page: b.pageSlug,
        },
      })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Páginas mais visitadas
    const pageStats = allPageViews.reduce((acc: any, pv) => {
      const slug = pv.pageSlug || 'Unknown';
      if (!acc[slug]) {
        acc[slug] = { views: 0, totalTime: 0, avgScroll: 0 };
      }
      acc[slug].views++;
      acc[slug].totalTime += pv.timeSpent || 0;
      acc[slug].avgScroll += pv.scrollDepth || 0;
      return acc;
    }, {});

    const topPages = Object.entries(pageStats)
      .map(([slug, stats]: [string, any]) => ({
        page: slug,
        views: stats.views,
        avgTime: Math.round(stats.totalTime / stats.views),
        avgScroll: Math.round(stats.avgScroll / stats.views),
      }))
      .sort((a, b) => b.views - a.views);

    return NextResponse.json({
      success: true,
      visitor: {
        fingerprint,
        sessions: sessions.length,
        firstVisit: sessions[sessions.length - 1].createdAt,
        lastVisit: firstSession.lastActivityAt,
        totalTime,
        totalPageViews: allPageViews.length,
        totalInteractions: allBehaviors.length,
        avgEngagementScore: Math.round(
          sessions.reduce((sum, s) => sum + s.engagementScore, 0) / sessions.length
        ),
        isReturning: firstSession.isReturning,
        isPWAInstalled: firstSession.isPWAInstalled,
        conversionProbability: firstSession.conversionProbability,
        deviceType: firstSession.deviceType,
        browser: firstSession.browser,
        os: firstSession.os,
        country: firstSession.country,
        city: firstSession.city,
        ipAddress: firstSession.ipAddress,
        convertedToLead: firstSession.lead ? {
          id: firstSession.lead.id,
          name: firstSession.lead.name,
          email: firstSession.lead.email,
          status: firstSession.lead.status,
        } : null,
      },
      timeline,
      topPages,
      behaviors: allBehaviors.slice(0, 50), // Últimas 50 interações
      projectsViewed: sessions.flatMap((s) =>
        s.projectInteractions.map((pi) => ({
          project: pi.project,
          type: pi.type,
          viewedAt: pi.createdAt,
        }))
      ),
      interestScore: firstSession.interestScore,
    });
  } catch (error: unknown) {
    console.error('Analytics visitor detail error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Failed to fetch visitor details' },
      { status: 500 }
    );
  }
}
