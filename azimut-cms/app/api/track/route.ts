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
      case 'behavior':
        await handleBehaviorEvent(sessionId, event, data);
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
    // Log detalhado do erro para debug
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
    // Retornar erro 500 mas com CORS headers para não quebrar o frontend
    return NextResponse.json(
      { error: 'Erro ao processar tracking', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

async function handlePageView(sessionId: string, data: any) {
  // Atualizar VisitorSession com fingerprinting e device info
  if (data.visitorFingerprint || data.deviceType || data.browser) {
    const updateData: any = {};
    
    if (data.visitorFingerprint) {
      updateData.visitorFingerprint = data.visitorFingerprint;
      
      // Verificar se é visitante retornante (mesmo fingerprint)
      const existingVisitor = await prisma.visitorSession.findUnique({
        where: { visitorFingerprint: data.visitorFingerprint },
      });
      
      if (existingVisitor && existingVisitor.sessionId !== sessionId) {
        // Mesmo visitante, nova sessão - incrementar visitCount
        updateData.visitCount = { increment: 1 };
        updateData.isReturning = true;
      }
    }
    
    if (data.deviceType) updateData.deviceType = data.deviceType;
    if (data.browser) updateData.browser = data.browser;
    if (data.os) updateData.os = data.os;
    if (data.screenResolution) updateData.screenResolution = data.screenResolution;
    
    if (Object.keys(updateData).length > 0) {
      await prisma.visitorSession.update({
        where: { sessionId },
        data: updateData,
      });
    }
  }

  // Salvar page view
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
    const session = await prisma.visitorSession.findUnique({
      where: { sessionId },
    });

    if (!session) {
      console.log(`[PWA] Session not found: ${sessionId}`);
      return;
    }

    // Salvar evento PWA na tabela PWAInstall
    await prisma.pWAInstall.create({
      data: {
        sessionId,
        type: data.type, // 'installed' | 'prompt_shown' | 'prompt_dismissed'
        platform: data.platform || null,
        userAgent: data.userAgent || session.userAgent || null,
        browser: extractBrowser(data.userAgent || session.userAgent || ''),
        deviceType: extractDeviceType(data.userAgent || session.userAgent || ''),
        outcome: data.outcome || null, // 'accepted' | 'dismissed'
        country: session.country || null,
        city: session.city || null,
      },
    });

    // Atualizar flag isPWAInstalled na sessão
    if (data.type === 'installed') {
      await prisma.visitorSession.update({
        where: { sessionId },
        data: { isPWAInstalled: true },
      });
    }

    console.log(`[PWA] Event saved: ${data.type} - Session: ${sessionId}`);
  } catch (error) {
    console.error('[PWA] Error handling PWA event:', error);
    // Não falhar se houver erro - tracking não deve quebrar o site
  }
}

// Helper para extrair browser do userAgent
function extractBrowser(userAgent: string): string | null {
  if (!userAgent) return null;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
}

// Helper para extrair device type
function extractDeviceType(userAgent: string): string | null {
  if (!userAgent) return null;
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return 'mobile';
  if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet';
  return 'desktop';
}

async function handleBehaviorEvent(sessionId: string, eventType: string, data: any) {
  try {
    // Salvar comportamento do visitante
    await prisma.visitorBehavior.create({
      data: {
        sessionId,
        behaviorType: data.behaviorType || eventType,
        element: data.element || null,
        elementType: data.elementType || null,
        pageSlug: data.pageSlug || null,
        value: data.value || null,
        metadata: data.metadata || {},
      },
    });

    // Atualizar engagement score e bounce rate da sessão
    const session = await prisma.visitorSession.findUnique({
      where: { sessionId },
      include: {
        visitorBehaviors: true,
        pageViews: true,
      },
    });

    if (session) {
      // Calcular engagement score baseado em interações
      const interactionCount = session.visitorBehaviors.length;
      const pageViewCount = session.pageViews.length;
      const totalTime = session.pageViews.reduce((sum, pv) => sum + (pv.timeSpent || 0), 0);
      const avgScrollDepth = session.pageViews.reduce((sum, pv) => sum + (pv.scrollDepth || 0), 0) / (pageViewCount || 1);

      // Score: interações (40%) + páginas visitadas (30%) + tempo (20%) + scroll (10%)
      const engagementScore = Math.min(100, Math.round(
        (interactionCount * 5) + // Cada interação = 5 pontos
        (pageViewCount * 10) +   // Cada página = 10 pontos
        (totalTime / 60) +        // Cada minuto = 1 ponto
        (avgScrollDepth / 10)     // Scroll depth = até 10 pontos
      ));

      // Bounce rate: só 1 página, sem interações, tempo < 30s
      const isBounce = pageViewCount <= 1 && interactionCount === 0 && totalTime < 30;

      await prisma.visitorSession.update({
        where: { sessionId },
        data: {
          engagementScore,
          bounceRate: isBounce,
        },
      });
    }
  } catch (error) {
    console.error('[Behavior] Error handling behavior event:', error);
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
    const pageViews = session.pageViews || [];
    const projectInteractions = session.projectInteractions || [];
    
    const sessionData: SessionData = {
      sessionId: session.sessionId,
      country: session.country ?? null,
      language: session.language ?? null,
      pagesVisited: Array.isArray(pageViews) ? pageViews.map(pv => ({
        slug: pv?.pageSlug ?? '',
        timeSpent: pv?.timeSpent ?? 0,
        scrollDepth: pv?.scrollDepth ?? 0,
      })) : [],
      projectsViewed: Array.isArray(pageViews) ? pageViews
        .filter(pv => pv && pv.project)
        .map(pv => {
          const tags = (pv.project?.tags || [])
            .map(t => t?.labelEn)
            .filter((t): t is string => Boolean(t));

          return {
            projectId: pv.project?.id ?? '',
            type: pv.project?.type ?? '',
            tags,
            timeSpent: pv?.timeSpent ?? 0,
          };
        })
        .filter(p => p.projectId !== '') : [],
      interactions: Array.isArray(projectInteractions) ? projectInteractions.map(pi => ({
        type: pi?.type ?? '',
        projectId: pi?.projectId ?? null,
      })) : [],
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












