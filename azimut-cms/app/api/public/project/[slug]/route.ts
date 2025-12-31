/**
 * API Pública - Projeto Individual
 * Retorna detalhes completos de um projeto por slug
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'pt';
  const slug = params.slug;

  try {
    // Buscar projeto com todas as relações
    const project = await prisma.project.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED', // Apenas projetos publicados
      },
      include: {
        heroImage: true,
        market: true,
        tags: true,
        services: true,
        gallery: {
          include: {
            media: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Formatar resposta com tradução
    const formatted = {
      slug: project.slug,
      title: project.title,
      shortTitle: project.shortTitle,
      summary: lang === 'pt' ? project.summaryPt :
               lang === 'en' ? project.summaryEn :
               lang === 'fr' ? (project.summaryFr || project.summaryEn) :
               (project.summaryEs || project.summaryEn),
      description: lang === 'pt' ? project.descriptionPt :
                   lang === 'en' ? project.descriptionEn :
                   lang === 'fr' ? (project.descriptionFr || project.descriptionEn) :
                   (project.descriptionEs || project.descriptionEn),
      city: project.city,
      stateProvince: project.stateProvince,
      country: project.country,
      year: project.year,
      client: project.client,
      type: project.type,
      tags: project.tags?.map((t: any) => 
        lang === 'pt' ? t.labelPt 
        : lang === 'es' ? (t.labelEs || t.labelEn)
        : lang === 'fr' ? (t.labelFr || t.labelEn)
        : t.labelEn
      ) || [],
      services: project.services?.map((s: any) => ({
        slug: s.slug,
        title: lang === 'pt' ? s.titlePt : 
               lang === 'en' ? s.titleEn :
               lang === 'fr' ? (s.titleFr || s.titleEn) :
               (s.titleEs || s.titleEn),
      })) || [],
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
      market: project.market ? {
        code: project.market.code,
        label: lang === 'pt' ? project.market.labelPt 
               : lang === 'es' ? (project.market.labelEs || project.market.labelEn)
               : lang === 'fr' ? (project.market.labelFr || project.market.labelEn)
               : project.market.labelEn,
      } : null,
      cta: {
        label: lang === 'pt' ? project.ctaLabelPt : project.ctaLabelEn,
        url: project.ctaUrl,
      },
      gallery: project.gallery?.map((pm: any) => ({
        id: pm.media.id,
        type: pm.media.type,
        original: pm.media.originalUrl,
        thumbnail: pm.media.thumbnailUrl,
        medium: pm.media.mediumUrl,
        large: pm.media.largeUrl,
        webp: pm.media.webpUrl,
        avif: pm.media.avifUrl,
        width: pm.media.width,
        height: pm.media.height,
        alt: lang === 'pt' ? pm.media.altPt 
             : lang === 'es' ? (pm.media.altEs || pm.media.altEn)
             : lang === 'fr' ? (pm.media.altFr || pm.media.altEn)
             : pm.media.altEn,
        order: pm.order,
      })) || [],
    };

    return NextResponse.json(formatted, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Project API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

