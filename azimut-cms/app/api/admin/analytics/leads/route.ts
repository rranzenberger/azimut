// ════════════════════════════════════════════════════════════
// API: Lead Candidates - Visitantes com Alta Probabilidade de Conversão
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
    const minScore = parseInt(searchParams.get('minScore') || '70');
    const limit = parseInt(searchParams.get('limit') || '50');
    const days = parseInt(searchParams.get('days') || '7'); // Últimos 7 dias

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Buscar visitantes com alta engagement score e que ainda não são leads
    const candidates = await prisma.visitorSession.findMany({
      where: {
        createdAt: { gte: startDate },
        engagementScore: { gte: minScore },
        leadId: null, // Ainda não converteram para lead
        visitorFingerprint: { not: null }, // Tem fingerprint (visitante identificável)
      },
      include: {
        pageViews: {
          select: {
            pageSlug: true,
            timeSpent: true,
            viewedAt: true,
          },
          orderBy: { viewedAt: 'desc' },
        },
        visitorBehaviors: {
          select: {
            behaviorType: true,
            element: true,
            pageSlug: true,
            timestamp: true,
          },
          orderBy: { timestamp: 'desc' },
          take: 20,
        },
        interestScore: true,
        _count: {
          select: {
            pageViews: true,
            visitorBehaviors: true,
          },
        },
      },
      orderBy: [
        { engagementScore: 'desc' },
        { conversionProbability: 'desc' },
      ],
      take: limit,
    });

    // Processar e enriquecer com sugestões de ação
    const processedCandidates = candidates.map((visitor) => {
      // Detectar páginas críticas visitadas
      const visitedContact = visitor.pageViews.some((pv) => pv.pageSlug?.includes('contact'));
      const visitedAcademy = visitor.pageViews.some((pv) => pv.pageSlug?.includes('academy'));
      const visitedProjects = visitor.pageViews.some((pv) => pv.pageSlug?.includes('work'));
      const clickedCTA = visitor.visitorBehaviors.some((b) => b.behaviorType === 'cta_click');
      const startedForm = visitor.visitorBehaviors.some((b) => b.behaviorType === 'form_start');

      // Sugerir ação baseada em comportamento
      let suggestedAction = 'Monitorar';
      let priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium';

      if (visitor.engagementScore >= 90) {
        suggestedAction = 'Contatar URGENTE - Alta probabilidade de conversão';
        priority = 'urgent';
      } else if (visitedContact && clickedCTA) {
        suggestedAction = 'Enviar email de follow-up sobre interesse';
        priority = 'high';
      } else if (visitedAcademy && visitor.pageViews.length > 3) {
        suggestedAction = 'Enviar informações sobre Academy/Vancouver';
        priority = 'high';
      } else if (startedForm) {
        suggestedAction = 'Retomar contato - iniciou formulário mas não completou';
        priority = 'high';
      } else if (visitor.isPWAInstalled) {
        suggestedAction = 'Visitante engajado - PWA instalado, enviar conteúdo premium';
        priority = 'high';
      } else if (visitor.engagementScore >= 80) {
        suggestedAction = 'Enviar conteúdo relevante baseado em interesses';
        priority = 'medium';
      }

      return {
        fingerprint: visitor.visitorFingerprint,
        sessionId: visitor.sessionId,
        country: visitor.country,
        city: visitor.city,
        deviceType: visitor.deviceType,
        browser: visitor.browser,
        engagementScore: visitor.engagementScore,
        conversionProbability: visitor.conversionProbability || 0,
        visitCount: visitor.visitCount,
        isReturning: visitor.isReturning,
        isPWAInstalled: visitor.isPWAInstalled,
        pagesVisited: visitor.pageViews.length,
        interactions: visitor._count.visitorBehaviors,
        topPages: visitor.pageViews
          .slice(0, 5)
          .map((pv) => pv.pageSlug)
          .filter(Boolean),
        behaviors: visitor.visitorBehaviors.slice(0, 10),
        visitedContact,
        visitedAcademy,
        visitedProjects,
        clickedCTA,
        startedForm,
        suggestedAction,
        priority,
        lastActivityAt: visitor.lastActivityAt,
        visitorType: visitor.interestScore?.visitorType || null,
      };
    });

    return NextResponse.json({
      success: true,
      candidates: processedCandidates,
      total: processedCandidates.length,
      filters: {
        minScore,
        days,
      },
    });
  } catch (error: unknown) {
    console.error('Analytics leads error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Failed to fetch lead candidates' },
      { status: 500 }
    );
  }
}
