/**
 * API de Tracking Comportamental
 * Rastreia navegação do usuário e calcula scores de interesse com IA
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateInterestScores, isQualifiedLead } from '@/lib/ai-scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      event,
      data,
    } = body;

    if (!sessionId || !event) {
      return NextResponse.json(
        { error: 'sessionId e event são obrigatórios' },
        { status: 400 }
      );
    }

    // Obter dados de geo
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                request.headers.get('x-real-ip') ||
                'unknown';
    
    const userAgent = request.headers.get('user-agent') || '';
    const language = request.headers.get('accept-language')?.split(',')[0] || '';

    // Criar ou atualizar sessão
    const session = await prisma.visitorSession.upsert({
      where: { sessionId },
      create: {
        sessionId,
        ipAddress: ip,
        userAgent,
        language,
        lastActivityAt: new Date(),
      },
      update: {
        lastActivityAt: new Date(),
        duration: {
          increment: data.timeSpent || 0,
        },
      },
    });

    // Processar eventos
    switch (event) {
      case 'page_view':
        await handlePageView(sessionId, data);
        break;
      
      case 'project_interaction':
        await handleProjectInteraction(sessionId, data);
        break;
      
      case 'scroll':
        await handleScroll(sessionId, data);
        break;
    }

    // Calcular scores de interesse com IA (assíncrono)
    if (Math.random() < 0.3) { // 30% das vezes para não sobrecarregar
      calculateScoresAsync(sessionId);
    }

    return NextResponse.json({ 
      success: true,
      sessionId,
    });

  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar tracking' },
      { status: 500 }
    );
  }
}

async function handlePageView(sessionId: string, data: any) {
  await prisma.pageView.create({
    data: {
      sessionId,
      pageSlug: data.pageSlug,
      projectSlug: data.projectSlug,
      timeSpent: data.timeSpent || 0,
      scrollDepth: data.scrollDepth || 0,
    },
  });
}

async function handleProjectInteraction(sessionId: string, data: any) {
  const project = await prisma.project.findUnique({
    where: { slug: data.projectSlug },
  });

  if (project) {
    await prisma.projectInteraction.create({
      data: {
        sessionId,
        projectId: project.id,
        type: data.type || 'VIEW',
        metadata: data.metadata || {},
      },
    });
  }
}

async function handleScroll(sessionId: string, data: any) {
  // Atualizar último pageView com scroll depth
  const lastPageView = await prisma.pageView.findFirst({
    where: {
      sessionId,
      pageSlug: data.pageSlug,
    },
    orderBy: {
      viewedAt: 'desc',
    },
  });

  if (lastPageView) {
    await prisma.pageView.update({
      where: { id: lastPageView.id },
      data: {
        scrollDepth: Math.max(lastPageView.scrollDepth, data.scrollDepth || 0),
      },
    });
  }
}

async function calculateScoresAsync(sessionId: string) {
  try {
    // Buscar dados da sessão
    const session = await prisma.visitorSession.findUnique({
      where: { sessionId },
      include: {
        pageViews: {
          include: {
            project: {
              include: {
                tags: true,
              },
            },
          },
        },
        projectInteractions: {
          include: {
            project: {
              include: {
                tags: true,
              },
            },
          },
        },
      },
    });

    if (!session) return;

    // Preparar dados para scoring
    const sessionData = {
      sessionId: session.sessionId,
      country: session.country || undefined,
      language: session.language || undefined,
      pagesVisited: session.pageViews.map(pv => ({
        slug: pv.pageSlug || '',
        timeSpent: pv.timeSpent,
        scrollDepth: pv.scrollDepth,
      })),
      projectsViewed: session.pageViews
        .filter(pv => pv.project)
        .map(pv => ({
          projectId: pv.project!.id,
          type: pv.project!.type,
          tags: pv.project!.tags.map(t => t.labelEn),
          timeSpent: pv.timeSpent,
        })),
      interactions: session.projectInteractions.map(pi => ({
        type: pi.type,
        projectId: pi.projectId,
      })),
    };

    // Calcular scores com IA
    const scores = await calculateInterestScores(sessionData);

    // Se é lead qualificado, notificar
    if (isQualifiedLead(scores)) {
      console.log(`🎯 Lead qualificado detectado: ${sessionId}`, {
        type: scores.visitorType,
        conversionScore: scores.conversionScore,
      });

      // Aqui você pode enviar email, notificação, etc.
    }

  } catch (error) {
    console.error('Failed to calculate scores:', error);
  }
}












