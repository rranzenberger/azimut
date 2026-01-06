import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Buscar todas as sessões com scores
    const sessions = await prisma.visitorSession.findMany({
      include: {
        interestScore: true,
        pageViews: {
          include: {
            project: true,
          },
        },
        projectInteractions: {
          include: {
            project: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Últimas 100 sessões
    });

    // Calcular métricas agregadas
    const totalSessions = sessions.length;
    const sessionsWithScores = sessions.filter(s => s.interestScore);
    
    // Visitantes por tipo
    const visitorTypes: Record<string, number> = {};
    sessionsWithScores.forEach(session => {
      const type = session.interestScore?.visitorType || 'UNKNOWN';
      visitorTypes[type] = (visitorTypes[type] || 0) + 1;
    });

    // Leads quentes (conversion score > 75)
    const hotLeads = sessionsWithScores.filter(
      s => (s.interestScore?.conversionScore || 0) > 75
    );

    // Leads mornos (50-75)
    const warmLeads = sessionsWithScores.filter(
      s => {
        const score = s.interestScore?.conversionScore || 0;
        return score >= 50 && score <= 75;
      }
    );

    // Visitantes por país
    const visitorsByCountry: Record<string, number> = {};
    sessions.forEach(session => {
      const country = session.country || 'Unknown';
      visitorsByCountry[country] = (visitorsByCountry[country] || 0) + 1;
    });

    // Visitantes por idioma
    const visitorsByLanguage: Record<string, number> = {};
    sessions.forEach(session => {
      const lang = session.language || 'unknown';
      visitorsByLanguage[lang] = (visitorsByLanguage[lang] || 0) + 1;
    });

    // Projetos mais visualizados
    const projectViews: Record<string, { count: number; title: string; slug: string }> = {};
    sessions.forEach(session => {
      session.pageViews.forEach(view => {
        if (view.project) {
          const projectId = view.project.id;
          if (!projectViews[projectId]) {
            projectViews[projectId] = {
              count: 0,
              title: view.project.title,
              slug: view.project.slug,
            };
          }
          projectViews[projectId].count += 1;
        }
      });
    });

    const topProjects = Object.entries(projectViews)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calcular score médio
    const avgConversionScore = sessionsWithScores.length > 0
      ? sessionsWithScores.reduce((sum, s) => sum + (s.interestScore?.conversionScore || 0), 0) / sessionsWithScores.length
      : 0;

    // Sessões recentes com detalhes
    const recentSessions = sessions.slice(0, 20).map(session => ({
      sessionId: session.sessionId,
      country: session.country,
      language: session.language,
      visitorType: session.interestScore?.visitorType || 'Unknown',
      conversionScore: session.interestScore?.conversionScore || 0,
      pagesViewed: session.pageViews.length,
      duration: session.duration,
      createdAt: session.createdAt,
      lastActivityAt: session.lastActivityAt,
    }));

    // Distribuição de scores
    const scoreDistribution = {
      hot: hotLeads.length,      // > 75
      warm: warmLeads.length,     // 50-75
      cold: sessionsWithScores.length - hotLeads.length - warmLeads.length, // < 50
    };

    return NextResponse.json({
      overview: {
        totalSessions,
        sessionsWithAI: sessionsWithScores.length,
        hotLeads: hotLeads.length,
        warmLeads: warmLeads.length,
        avgConversionScore: Math.round(avgConversionScore),
      },
      visitorTypes,
      visitorsByCountry,
      visitorsByLanguage,
      topProjects,
      recentSessions,
      scoreDistribution,
    });

  } catch (error: any) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar analytics', details: error.message },
      { status: 500 }
    );
  }
}

