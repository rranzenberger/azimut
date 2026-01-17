/**
 * API de Perfil do Visitante
 * Retorna perfil personalizado baseado em comportamento e IA
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { calculateInterestScores, SessionData } from '@/src/lib/ai-scoring';

export const runtime = 'nodejs';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId é obrigatório' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Buscar sessão e dados relacionados
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
          orderBy: {
            viewedAt: 'desc',
          },
          take: 20,
        },
        interestScore: true,
        lead: true,
      },
    });

    if (!session) {
      // Criar sessão básica se não existir
      return NextResponse.json({
        profile: null,
        message: 'Sessão não encontrada',
      }, { headers: corsHeaders });
    }

    // Preparar dados para análise
    const sessionData: SessionData = {
      sessionId,
      country: session.country,
      language: session.language,
      pagesVisited: session.pageViews
        .filter(pv => pv.pageSlug !== null) // Filtrar apenas páginas com slug
        .map(pv => ({
          slug: pv.pageSlug!, // Agora sabemos que não é null
          timeSpent: pv.timeSpent || 0,
          scrollDepth: pv.scrollDepth || 0,
        })),
      projectsViewed: session.pageViews
        .filter(pv => pv.project)
        .map(pv => ({
          projectId: pv.project!.id,
          type: pv.project!.type || '',
          tags: pv.project!.tags.map(t => t.labelEn || t.labelPt),
          timeSpent: pv.timeSpent || 0,
        })),
      interactions: [], // Pode ser expandido depois
    };

    // Calcular ou atualizar scores
    let scores;
    if (session.interestScore) {
      // Usar scores existentes se recentes (< 5 minutos)
      const scoreAge = Date.now() - new Date(session.interestScore.updatedAt).getTime();
      if (scoreAge < 5 * 60 * 1000) {
        scores = {
          museumScore: session.interestScore.museumScore,
          brandScore: session.interestScore.brandScore,
          festivalScore: session.interestScore.festivalScore,
          cityScore: session.interestScore.cityScore,
          educationScore: session.interestScore.educationScore,
          researchScore: session.interestScore.researchScore,
          vrScore: session.interestScore.vrScore,
          aiScore: session.interestScore.aiScore,
          installationScore: session.interestScore.installationScore,
          conversionScore: session.interestScore.conversionScore,
          visitorType: session.interestScore.visitorType,
          recommendedProjects: session.interestScore.recommendedProjects as any,
          suggestedAction: session.interestScore.suggestedAction,
          suggestedPage: session.interestScore.suggestedPage,
        };
      } else {
        // Recalcular se antigo
        scores = await calculateInterestScores(sessionData);
      }
    } else {
      // Calcular pela primeira vez
      scores = await calculateInterestScores(sessionData);
    }

    // Buscar projetos recomendados
    const recommendedProjectIds = (scores.recommendedProjects || [])
      .map((p: any) => p.projectId)
      .slice(0, 6);

    const recommendedProjects = recommendedProjectIds.length > 0
      ? await prisma.project.findMany({
          where: {
            id: { in: recommendedProjectIds },
            status: 'PUBLISHED',
          },
          include: {
            tags: true,
            heroImage: true,
          },
          take: 6,
        })
      : [];

    // Determinar perfil do visitante
    const visitorProfile = determineVisitorProfile(scores, session);

    // Buscar serviços recomendados baseado no interesse
    const recommendedServices = await getRecommendedServices(scores);

    // Buscar editais recomendados (se for governo/cultura)
    const recommendedEditais = visitorProfile.type === 'GOVERNMENT' || 
                               visitorProfile.type === 'CURATOR' ||
                               scores.museumScore > 50 ||
                               scores.cityScore > 50
      ? await prisma.edital.findMany({
          where: {
            OR: [
              { country: session.country || 'BR' },
              { country: 'DEFAULT' },
            ],
            status: 'ABERTO', // EditalStatus enum: ABERTO, FECHADO, ENVIADO, GANHO, PERDIDO
          },
          take: 3,
          orderBy: {
            deadline: 'asc',
          },
        })
      : [];

    // Montar resposta completa
    const profile = {
      // Identificação
      sessionId,
      visitorType: visitorProfile.type,
      visitorTypeLabel: visitorProfile.label,
      confidence: visitorProfile.confidence,

      // Scores de interesse
      interestScores: {
        museums: scores.museumScore,
        brands: scores.brandScore,
        festivals: scores.festivalScore,
        cities: scores.cityScore,
        education: scores.educationScore,
        research: scores.researchScore,
        vr: scores.vrScore,
        ai: scores.aiScore,
        installations: scores.installationScore,
      },

      // Score de conversão
      conversionScore: scores.conversionScore,
      isQualifiedLead: scores.conversionScore > 50,
      isHotLead: scores.conversionScore > 75,

      // Recomendações - usar mesmo formato da API pública
      recommendedProjects: recommendedProjects.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        summary: p.summaryPt || p.summaryEn || p.summaryEs || p.summaryFr || '',
        type: p.type || '',
        tags: p.tags.map(t => t.labelPt || t.labelEn || t.labelEs || t.labelFr || ''),
        heroImage: p.heroImage ? {
          original: p.heroImage.originalUrl,
          thumbnail: p.heroImage.thumbnailUrl || null,
          medium: p.heroImage.mediumUrl || null,
          large: p.heroImage.largeUrl || null,
          webp: p.heroImage.webpUrl || null,
          avif: p.heroImage.avifUrl || null,
        } : null,
      })),
      recommendedServices,
      recommendedEditais: recommendedEditais.map(e => ({
        id: e.id,
        name: e.name,
        country: e.country,
        deadline: e.deadline,
      })),

      // Sugestões
      suggestedAction: scores.suggestedAction,
      suggestedPage: scores.suggestedPage,

      // Comportamento
      behavior: {
        pagesVisited: session.pageViews.length,
        projectsViewed: session.pageViews.filter(pv => pv.project).length,
        timeOnSite: session.duration || 0,
        country: session.country,
        language: session.language,
      },

      // Lead info (se existir)
      lead: session.lead ? {
        id: session.lead.id,
        name: session.lead.name,
        email: session.lead.email,
        status: session.lead.status,
      } : null,
    };

    return NextResponse.json({ profile }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Visitor profile API error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar perfil do visitante', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Determina perfil do visitante baseado em scores e sessão
 */
function determineVisitorProfile(scores: any, session: any) {
  const conversionScore = scores.conversionScore || 0;
  const visitorType = scores.visitorType;

  // Mapear tipos do sistema para perfis do frontend
  const profileMap: Record<string, { type: string; label: string; confidence: number }> = {
    'MUSEUM_CURATOR': {
      type: 'CURATOR',
      label: 'Curador / Assistente de Cultura',
      confidence: 85,
    },
    'CITY_OFFICIAL': {
      type: 'GOVERNMENT',
      label: 'Secretaria / Órgão Público',
      confidence: 90,
    },
    'BRAND_MANAGER': {
      type: 'BRAND',
      label: 'Gestor de Marca',
      confidence: 80,
    },
    'FESTIVAL_ORGANIZER': {
      type: 'FESTIVAL',
      label: 'Organizador de Festival',
      confidence: 75,
    },
    'EDUCATOR': {
      type: 'EDUCATION',
      label: 'Educador / Pesquisador',
      confidence: 70,
    },
    'TECH_ENTHUSIAST': {
      type: 'TECH',
      label: 'Entusiasta de Tecnologia',
      confidence: 60,
    },
    'GENERAL_PUBLIC': {
      type: conversionScore > 60 ? 'INTERESTED' : conversionScore > 30 ? 'CURIOUS' : 'CURIOUS',
      label: conversionScore > 60 ? 'Visitante Interessado' : 'Visitante',
      confidence: 50,
    },
  };

  const mapped = profileMap[visitorType || 'GENERAL_PUBLIC'] || profileMap['GENERAL_PUBLIC'];

  // Ajustar baseado em score de conversão
  if (conversionScore > 80) {
    mapped.type = 'HOT_LEAD';
    mapped.label = 'Cliente Potencial';
    mapped.confidence = 95;
  } else if (conversionScore > 60) {
    mapped.type = 'HIGH_POTENTIAL';
    mapped.label = 'Alto Potencial';
    mapped.confidence = 75;
  }

  // Verificar se é IP de governo
  if (isGovernmentIP(session.ipAddress)) {
    mapped.type = 'GOVERNMENT';
    mapped.label = 'Órgão Público';
    mapped.confidence = 95;
  }

  return mapped;
}

/**
 * Verifica se IP é de órgão público
 */
function isGovernmentIP(ip: string | null): boolean {
  if (!ip) return false;
  // Lista de domínios/patterns de IPs governamentais
  // Pode ser expandido com dados reais
  return false; // Placeholder
}

/**
 * Busca serviços recomendados baseado em scores
 */
async function getRecommendedServices(scores: any) {
  const services = await prisma.service.findMany({
    where: { status: 'PUBLISHED' }, // ServiceStatus enum: DRAFT, PUBLISHED, ARCHIVED
  });

  // Ordenar por relevância baseado em scores
  // Como Service não tem relação direta com Tag, vamos usar os segmentos
  const scoredServices = services.map(service => {
    let relevance = 0;

    // Verificar segmentos do serviço
    service.segments.forEach(segment => {
      const segmentLower = segment.toLowerCase();
      if (segmentLower.includes('museum') || segmentLower.includes('museu')) {
        relevance += scores.museumScore || 0;
      }
      if (segmentLower.includes('brand') || segmentLower.includes('marca')) {
        relevance += scores.brandScore || 0;
      }
      if (segmentLower.includes('festival')) {
        relevance += scores.festivalScore || 0;
      }
      if (segmentLower.includes('vr') || segmentLower.includes('xr')) {
        relevance += scores.vrScore || 0;
      }
      if (segmentLower.includes('ai') || segmentLower.includes('ia')) {
        relevance += scores.aiScore || 0;
      }
    });

    return { service, relevance };
  });

  // Ordenar por relevância e retornar top 3
  return scoredServices
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3)
    .map(item => ({
      id: item.service.id,
      slug: item.service.slug,
      title: item.service.titlePt || item.service.titleEn,
      summary: item.service.descriptionPt || item.service.descriptionEn || item.service.descriptionEs || item.service.descriptionFr || '',
      icon: item.service.icon,
    }));
}

