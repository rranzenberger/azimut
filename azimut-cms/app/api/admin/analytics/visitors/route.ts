// ════════════════════════════════════════════════════════════
// API: Lista de Visitantes com Filtros
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const country = searchParams.get('country');
    const deviceType = searchParams.get('deviceType');
    const isReturning = searchParams.get('isReturning');
    const isPWAInstalled = searchParams.get('isPWAInstalled');
    const minEngagement = searchParams.get('minEngagement');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Construir filtros
    const where: any = {
      createdAt: { gte: startDate },
    };

    if (country) where.country = country;
    if (deviceType) where.deviceType = deviceType;
    if (isReturning === 'true') where.isReturning = true;
    if (isPWAInstalled === 'true') where.isPWAInstalled = true;
    if (minEngagement) where.engagementScore = { gte: parseInt(minEngagement) };

    // Buscar visitantes
    const [visitors, total] = await Promise.all([
      prisma.visitorSession.findMany({
        where,
        include: {
          pageViews: {
            select: {
              pageSlug: true,
              timeSpent: true,
              viewedAt: true,
            },
            orderBy: { viewedAt: 'desc' },
            take: 10, // Últimas 10 páginas
          },
          pwaInstalls: {
            select: {
              type: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          _count: {
            select: {
              pageViews: true,
              visitorBehaviors: true,
            },
          },
        },
        orderBy: { lastActivityAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.visitorSession.count({ where }),
    ]);

    // Processar dados
    const processedVisitors = visitors.map((visitor) => ({
      sessionId: visitor.sessionId,
      fingerprint: visitor.visitorFingerprint,
      ipAddress: visitor.ipAddress,
      country: visitor.country,
      city: visitor.city,
      deviceType: visitor.deviceType,
      browser: visitor.browser,
      os: visitor.os,
      visitCount: visitor.visitCount,
      isReturning: visitor.isReturning,
      isPWAInstalled: visitor.isPWAInstalled,
      engagementScore: visitor.engagementScore,
      conversionProbability: visitor.conversionProbability,
      bounceRate: visitor.bounceRate,
      pagesVisited: visitor.pageViews.map((pv) => ({
        slug: pv.pageSlug,
        timeSpent: pv.timeSpent,
        viewedAt: pv.viewedAt,
      })),
      pageViewCount: visitor._count.pageViews,
      interactionCount: visitor._count.visitorBehaviors,
      pwaInstalled: visitor.pwaInstalls.length > 0,
      lastActivityAt: visitor.lastActivityAt,
      createdAt: visitor.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: processedVisitors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error('Analytics visitors error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}
