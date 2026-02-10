/**
 * API Pública de Conteúdo
 * Retorna conteúdo personalizado baseado em geo + idioma + comportamento
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

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
          orderBy: { priorityHome: 'asc' },
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
            orderBy: { priorityHome: 'asc' },
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
    
    // 3. Buscar projetos: home = 7 destaques (priorityHome 1–7); work = 7 destaques + lista completa com marcados primeiro
    const isWork = page === 'work';
    let featuredProjects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
        ...(isWork ? {} : { featured: true, priorityHome: { gte: 1, lte: 7 } }),
      },
      include: {
        heroImage: true,
        tags: true,
        services: true,
      },
      orderBy: [
        // work: marcados primeiro (priorityHome 7→1); home: ordem 1º–7º (asc)
        { priorityHome: isWork ? 'desc' : 'asc' },
        { year: 'desc' },
        { month: 'desc' },
        { title: 'asc' },
      ],
      ...(isWork ? {} : { take: 7 }),
    });

    // 3b. Para page=work: os 7 em destaque (topo da página) = exatamente os marcados no backoffice
    let featuredProjectsWork: typeof featuredProjects | null = null;
    if (isWork) {
      featuredProjectsWork = await prisma.project.findMany({
        where: {
          status: 'PUBLISHED',
          featured: true,
          priorityHome: { gte: 1, lte: 7 },
        },
        include: {
          heroImage: true,
          tags: true,
          services: true,
        },
        orderBy: [
          { priorityHome: 'asc' },
          { year: 'desc' },
          { month: 'desc' },
          { title: 'asc' },
        ],
        take: 7,
      });
      // Lista completa (highlightProjects) já com marcados no topo: featuredProjects acima está orderBy priorityHome desc
    }

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
    
    // 6. Buscar slogan, subtitle e pillars do hero da página (todas as páginas)
    let heroSlogan = null;
    let heroSubtitle = null;
    let pillars = null;
    if (pageData) {
      const langSuffix = lang === 'pt' ? 'Pt' : lang === 'es' ? 'Es' : lang === 'fr' ? 'Fr' : 'En';
      const sloganField = `heroSlogan${langSuffix}`;
      const subtitleField = `heroSubtitle${langSuffix}`;
      
      heroSlogan = (pageData as any)[sloganField] || null;
      heroSubtitle = (pageData as any)[subtitleField] || null;
      
      // Buscar pillars (apenas se existirem)
      const pillar1 = (pageData as any)[`pillar1${langSuffix}`] || (pageData as any).pillar1En || null;
      const pillar2 = (pageData as any)[`pillar2${langSuffix}`] || (pageData as any).pillar2En || null;
      const pillar3 = (pageData as any)[`pillar3${langSuffix}`] || (pageData as any).pillar3En || null;
      
      if (pillar1 || pillar2 || pillar3) {
        pillars = [pillar1, pillar2, pillar3].filter(Boolean);
      }
      
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
      
      // Campos de curadoria/banner destaque (página work)
      curationTitle: pageData ? (
        lang === 'pt' ? (pageData as any).curationTitlePt :
        lang === 'es' ? ((pageData as any).curationTitleEs || (pageData as any).curationTitleEn) :
        lang === 'fr' ? ((pageData as any).curationTitleFr || (pageData as any).curationTitleEn) :
        (pageData as any).curationTitleEn
      ) || null : null,
      curationDescription: pageData ? (
        lang === 'pt' ? (pageData as any).curationDescriptionPt :
        lang === 'es' ? ((pageData as any).curationDescriptionEs || (pageData as any).curationDescriptionEn) :
        lang === 'fr' ? ((pageData as any).curationDescriptionFr || (pageData as any).curationDescriptionEn) :
        (pageData as any).curationDescriptionEn
      ) || null : null,
      curationButtonText: pageData ? (
        lang === 'pt' ? (pageData as any).curationButtonTextPt :
        lang === 'es' ? ((pageData as any).curationButtonTextEs || (pageData as any).curationButtonTextEn) :
        lang === 'fr' ? ((pageData as any).curationButtonTextFr || (pageData as any).curationButtonTextEn) :
        (pageData as any).curationButtonTextEn
      ) || null : null,
      curationFilterCategory: pageData ? (pageData as any).curationFilterCategory || null : null,

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
        pillars: pillars || null, // Array de 3 pillars ou null
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
      
      // Projetos: home = 7 destaques; work = lista com marcados no topo (highlightProjects) + 7 para o topo (featuredProjects)
      highlightProjects: featuredProjects.map(p => formatProject(p, lang)),
      featuredProjects: featuredProjectsWork?.length ? featuredProjectsWork.map(p => formatProject(p, lang)) : undefined,
      
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
    
    // 7. Cache: Home com cache curto para alterações no backoffice aparecerem logo no site
    const cacheMaxAge = page === 'home' ? 300 : 3600; // home: 5 min; outras: 1 h
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': `public, s-maxage=${cacheMaxAge}, stale-while-revalidate=600`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
  } catch (error) {
    console.error('Content API error:', error);
    // Em caso de erro (ex: banco inacessível), retornar estrutura vazia
    // Isso permite que o frontend use fallbacks locais
    return NextResponse.json(
      {
        lang: lang || 'pt',
        heroSlogan: null,
        heroSubtitle: null,
        market: null,
        page: null,
        highlightProjects: [],
        services: [],
      },
      { 
        status: 200, // Retornar 200 com dados vazios para não quebrar frontend
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// Helper para formatar projeto
function formatProject(project: any, lang: string) {
  return {
    id: project.id,
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
    month: project.month,
    client: project.client || null,
    partnership: project.partnership || null,
    coproduction: project.coproduction || null,
    type: project.type,
    tags: project.tags?.map((t: any) => 
      lang === 'pt' ? t.labelPt 
      : lang === 'es' ? (t.labelEs || t.labelEn)
      : lang === 'fr' ? (t.labelFr || t.labelEn)
      : t.labelEn
    ) || [],
    heroImage: project.heroImage ? {
      type: project.heroImage.type, // 'IMAGE' ou 'VIDEO'
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
      format: project.heroImage.format, // 'YOUTUBE', 'VIMEO', etc
    } : null,
    heroImageFit: project.heroImageFit || 'contain',
    heroImagePosition: project.heroImagePosition || 'center',
    // 🆕 Thumbnail alternativo (quando não há heroImage)
    thumbnailUrl: project.thumbnailUrl || null,
    // 🆕 Se projeto tem subpágina própria
    hasDetailPage: project.hasDetailPage || false,
    cta: {
      label: lang === 'pt' ? project.ctaLabelPt : project.ctaLabelEn,
      url: project.ctaUrl,
    },
    // ═══════════════════════════════════════════════════════════════
    // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
    // ═══════════════════════════════════════════════════════════════
    projectCategory: project.projectCategory || [],
    workType: project.workType || [],
    technologies: project.technologies || [],
    industry: project.industry || null,
    azimutRole: project.azimutRole || [],
    duration: project.duration || null,
    awards: project.awards || null,
    metrics: project.metrics || null,
    videoUrl: project.videoUrl || null,
    videoShowreel: project.videoShowreel || null,
    externalLinks: project.externalLinks || null,
    partnerLogos: project.partnerLogos || [],
    beforeAfterImages: project.beforeAfterImages || null,
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



















