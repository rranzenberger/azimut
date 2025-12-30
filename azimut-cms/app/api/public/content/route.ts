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
    
    // 6. Buscar slogan e subtitle do hero da página (todas as páginas)
    let heroSlogan = null;
    let heroSubtitle = null;
    if (pageData) {
      const langSuffix = lang === 'pt' ? 'Pt' : lang === 'es' ? 'Es' : lang === 'fr' ? 'Fr' : 'En';
      const sloganField = `heroSlogan${langSuffix}`;
      const subtitleField = `heroSubtitle${langSuffix}`;
      
      heroSlogan = (pageData as any)[sloganField] || null;
      heroSubtitle = (pageData as any)[subtitleField] || null;
      
      // Fallback: se não tiver no idioma, tenta EN
      if (!heroSlogan && lang !== 'en') {
        heroSlogan = (pageData as any).heroSloganEn || null;
      }
      if (!heroSubtitle && lang !== 'en') {
        heroSubtitle = (pageData as any).heroSubtitleEn || null;
      }
    }
    
    // 7. Formatar resposta com tradução
    const response = {
      lang,
      heroSlogan,
      heroSubtitle,
      market: market ? {
        code: market.code,
        label: lang === 'pt' ? market.labelPt 
              : lang === 'es' ? (market.labelEs || market.labelEn)
              : lang === 'fr' ? (market.labelFr || market.labelEn)
              : market.labelEn,
        heroMessage: lang === 'pt' ? market.heroMessagePt 
                    : lang === 'es' ? (market.heroMessageEs || market.heroMessageEn)
                    : lang === 'fr' ? (market.heroMessageFr || market.heroMessageEn)
                    : market.heroMessageEn,
      } : null,
      
      page: pageData ? {
        name: pageData.name,
        slug: pageData.slug,
        seo: {
          title: lang === 'pt' ? pageData.seoTitlePt 
                : lang === 'es' ? pageData.seoTitleEs 
                : lang === 'fr' ? pageData.seoTitleFr 
                : pageData.seoTitleEn,
          description: lang === 'pt' ? pageData.seoDescPt 
                      : lang === 'es' ? pageData.seoDescEs 
                      : lang === 'fr' ? pageData.seoDescFr 
                      : pageData.seoDescEn,
        },
        heroSlogan: heroSlogan || null,
        heroSubtitle: heroSubtitle || null,
        sections: pageData.sections.map(section => ({
          type: section.type,
          title: lang === 'pt' ? section.titlePt 
                : lang === 'es' ? (section.titleEs || section.titleEn)
                : lang === 'fr' ? (section.titleFr || section.titleEn)
                : section.titleEn,
          body: lang === 'pt' ? section.bodyPt 
               : lang === 'es' ? (section.bodyEs || section.bodyEn)
               : lang === 'fr' ? (section.bodyFr || section.bodyEn)
               : section.bodyEn,
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
    
    // 7. Cache header e CORS (1 hora)
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        // CORS - Permitir site principal acessar
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
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
      lang === 'pt' ? t.labelPt 
      : lang === 'es' ? (t.labelEs || t.labelEn)
      : lang === 'fr' ? (t.labelFr || t.labelEn)
      : t.labelEn
    ) || [],
    heroImage: project.heroImage ? {
      original: project.heroImage.originalUrl,
      thumbnail: project.heroImage.thumbnailUrl,
      medium: project.heroImage.mediumUrl,
      large: project.heroImage.largeUrl,
      webp: project.heroImage.webpUrl,
      avif: project.heroImage.avifUrl,
      alt: lang === 'pt' ? project.heroImage.altPt 
           : lang === 'es' ? (project.heroImage.altEs || project.heroImage.altEn)
           : lang === 'fr' ? (project.heroImage.altFr || project.heroImage.altEn)
           : project.heroImage.altEn,
    } : null,
    cta: {
      label: lang === 'pt' ? project.ctaLabelPt : project.ctaLabelEn,
      url: project.ctaUrl,
    },
  };
}

// Opções CORS para preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}



















