/**
 * API Pública de Conteúdo
 * Retorna conteúdo personalizado baseado em geo + idioma + comportamento
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const lang = searchParams.get('lang') || 'pt'; // pt, en, fr, es
  const country = searchParams.get('country') || 'DEFAULT';
  const page = searchParams.get('page') || 'home';
  const sessionId = searchParams.get('sessionId'); // opcional
  
  try {
    // 1. Buscar dados do mercado
    let market = await prisma.market.findUnique({
      where: { code: country },
      include: {
        highlightProjects: {
          where: { status: 'PUBLISHED' },
          include: {
            heroImage: true,
            tags: true,
          },
          orderBy: { priorityHome: 'desc' },
          take: 6,
        },
      },
    });
    
    // Se não encontrou mercado específico, usa DEFAULT
    if (!market) {
      market = await prisma.market.findUnique({
        where: { code: 'DEFAULT' },
        include: {
          highlightProjects: {
            where: { status: 'PUBLISHED' },
            include: {
              heroImage: true,
              tags: true,
            },
            orderBy: { priorityHome: 'desc' },
            take: 6,
          },
        },
      });
    }
    
    // 2. Buscar página solicitada
    const pageData = await prisma.page.findUnique({
      where: { slug: page },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            linkedProjects: {
              where: { status: 'PUBLISHED' },
              include: {
                heroImage: true,
                tags: true,
              },
            },
          },
        },
      },
    });
    
    // 3. Buscar projetos em destaque (se não houver highlightProjects)
    let featuredProjects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
        featured: true,
      },
      include: {
        heroImage: true,
        tags: true,
        services: true,
      },
      orderBy: { priorityHome: 'desc' },
      take: 6,
    });

    // 4. Personalização baseada em comportamento (se temos sessionId)
    let recommendedProjects = null;
    if (sessionId) {
      const interestScore = await prisma.interestScore.findUnique({
        where: { sessionId },
      });

      if (interestScore?.recommendedProjects) {
        const recommended = interestScore.recommendedProjects as any[];
        const projectIds = recommended.map((r: any) => r.projectId);

        recommendedProjects = await prisma.project.findMany({
          where: {
            id: { in: projectIds },
            status: 'PUBLISHED',
          },
          include: {
            heroImage: true,
            tags: true,
          },
        });

        // Ordenar conforme score da IA
        recommendedProjects.sort((a, b) => {
          const scoreA = recommended.find((r: any) => r.projectId === a.id)?.score || 0;
          const scoreB = recommended.find((r: any) => r.projectId === b.id)?.score || 0;
          return scoreB - scoreA;
        });
      }
    }
    
    // 5. Buscar serviços
    const services = await prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { priority: 'desc' },
    });
    
    // 6. Formatar resposta com tradução
    const response = {
      lang,
      market: market ? {
        code: market.code,
        label: lang === 'pt' ? market.labelPt : market.labelEn,
        heroMessage: lang === 'pt' ? market.heroMessagePt : market.heroMessageEn,
      } : null,
      
      page: pageData ? {
        name: pageData.name,
        slug: pageData.slug,
        seo: {
          title: lang === 'pt' ? pageData.seoTitlePt : pageData.seoTitleEn,
          description: lang === 'pt' ? pageData.seoDescPt : pageData.seoDescEn,
        },
        sections: pageData.sections.map(section => ({
          type: section.type,
          title: lang === 'pt' ? section.titlePt : section.titleEn,
          body: lang === 'pt' ? section.bodyPt : section.bodyEn,
          layout: section.layout,
          projects: section.linkedProjects.map(p => formatProject(p, lang)),
        })),
      } : null,
      
      // Projetos priorizados por geo/comportamento
      highlightProjects: (
        recommendedProjects || 
        market?.highlightProjects || 
        featuredProjects
      ).map(p => formatProject(p, lang)),
      
      services: services.map(s => ({
        slug: s.slug,
        title: lang === 'pt' ? s.titlePt : 
               lang === 'en' ? s.titleEn :
               lang === 'fr' ? (s.titleFr || s.titleEn) :
               (s.titleEs || s.titleEn),
        description: lang === 'pt' ? s.descriptionPt :
                     lang === 'en' ? s.descriptionEn :
                     lang === 'fr' ? (s.descriptionFr || s.descriptionEn) :
                     (s.descriptionEs || s.descriptionEn),
        icon: s.icon,
      })),
    };
    
    // 7. Cache header (1 hora)
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
    
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// Helper para formatar projeto
function formatProject(project: any, lang: string) {
  return {
    slug: project.slug,
    title: project.title,
    shortTitle: project.shortTitle,
    summary: lang === 'pt' ? project.summaryPt :
             lang === 'en' ? project.summaryEn :
             lang === 'fr' ? (project.summaryFr || project.summaryEn) :
             (project.summaryEs || project.summaryEn),
    city: project.city,
    stateProvince: project.stateProvince,
    country: project.country,
    year: project.year,
    client: project.client,
    tags: project.tags?.map((t: any) => 
      lang === 'pt' ? t.labelPt : t.labelEn
    ) || [],
    heroImage: project.heroImage ? {
      original: project.heroImage.originalUrl,
      thumbnail: project.heroImage.thumbnailUrl,
      medium: project.heroImage.mediumUrl,
      large: project.heroImage.largeUrl,
      webp: project.heroImage.webpUrl,
      avif: project.heroImage.avifUrl,
      alt: lang === 'pt' ? project.heroImage.altPt : project.heroImage.altEn,
    } : null,
    cta: {
      label: lang === 'pt' ? project.ctaLabelPt : project.ctaLabelEn,
      url: project.ctaUrl,
    },
  };
}












