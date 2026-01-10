/**
 * API de Tracking Comportamental
 * Rastreia navegação do usuário e calcula scores de interesse com IA
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateInterestScores, isQualifiedLead, SessionData } from '@/lib/ai-scoring';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// OPTIONS para preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

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
        { 
          status: 400,
          headers: corsHeaders,
        }
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
      
      case 'pwa_event':
        await handlePWAEvent(sessionId, data);
        break;
      
      case 'budget_wizard':
      case 'cta_click':
      case 'language_change':
        // Eventos simples - apenas logar por enquanto
        console.log(`[Track] ${event}:`, data);
        break;
    }

    // Calcular scores de interesse com IA (assíncrono)
    if (Math.random() < 0.3) { // 30% das vezes para não sobrecarregar
      calculateScoresAsync(sessionId);
    }

    return NextResponse.json({ 
      success: true,
      sessionId,
    }, {
      headers: corsHeaders,
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

async function handlePWAEvent(sessionId: string, data: any) {
  try {
    // Salvar evento PWA no banco
    // Verificar se já existe modelo PWAInstall no Prisma
    // Se não existir, criar tabela ou usar VisitorSession
    
    const session = await prisma.visitorSession.findUnique({
      where: { sessionId },
    });

    if (session) {
      // Atualizar sessão com flag de PWA
      await prisma.visitorSession.update({
        where: { sessionId },
        data: {
          metadata: {
            ...(session.metadata as any || {}),
            pwaInstalled: data.type === 'installed',
            pwaEvents: [
              ...((session.metadata as any)?.pwaEvents || []),
              {
                type: data.type,
                timestamp: new Date().toISOString(),
                platform: data.platform,
                isPWA: data.isPWA,
                outcome: data.outcome,
              },
            ],
          },
        },
      });
    }

    // Log para debug
    console.log(`[PWA] Event: ${data.type} - Session: ${sessionId}`);
  } catch (error) {
    console.error('[PWA] Error handling PWA event:', error);
    // Não falhar se houver erro
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

    // Preparar dados para scoring (garantindo tipos compatíveis)
    const sessionData: SessionData = {
      sessionId: session.sessionId,
      country: session.country ?? null,
      language: session.language ?? null,
      pagesVisited: (session.pageViews || []).map(pv => ({
        slug: pv.pageSlug ?? '',
        timeSpent: pv.timeSpent ?? 0,
        scrollDepth: pv.scrollDepth ?? 0,
      })),
      projectsViewed: (session.pageViews || [])
        .filter(pv => pv.project)
        .map(pv => {
          const tags = (pv.project?.tags || [])
            .map(t => t.labelEn)
            .filter((t): t is string => Boolean(t));

          return {
            projectId: pv.project?.id ?? '',
            type: pv.project?.type ?? '',
            tags,
            timeSpent: pv.timeSpent ?? 0,
          };
        })
        .filter(p => p.projectId !== ''),
      interactions: (session.projectInteractions || []).map(pi => ({
        type: pi.type ?? '',
        projectId: pi.projectId ?? null,
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












