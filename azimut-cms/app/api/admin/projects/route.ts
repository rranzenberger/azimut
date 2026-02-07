/**
 * API de Projetos
 * CRUD de projetos do CMS
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar projetos
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const projects = await prisma.project.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        heroImage: true,
        market: true,
        tags: true,
        services: true,
      },
    });

    const total = await prisma.project.count();

    return NextResponse.json({
      projects,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar projetos' }, { status: 500 });
  }
}

// POST - Criar projeto
// 🔄 AUTO-CRIA PÁGINA para SEO/traduções quando projeto é criado
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      shortTitle,
      slug,
      summaryPt,
      summaryEn,
      summaryEs,
      summaryFr,
      descriptionPt,
      descriptionEn,
      descriptionEs,
      descriptionFr,
      city,
      stateProvince,
      country,
      year,
      client,
      type,
      status,
      featured,
      priorityHome,
      ctaLabelPt,
      ctaLabelEn,
      ctaUrl,
      heroImageId,
      marketId,
      // ═══════════════════════════════════════════════════════════════
      // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
      // ═══════════════════════════════════════════════════════════════
      projectCategory,
      workType,
      technologies,
      industry,
      azimutRole,
      duration,
      awards,
      metrics,
      videoUrl,
      videoShowreel,
      externalLinks,
      partnerLogos,
      beforeAfterImages,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Título e slug são obrigatórios' }, { status: 400 });
    }

    // Verificar se slug já existe
    const existing = await prisma.project.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug já existe. Use outro.' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        shortTitle: shortTitle || null,
        slug,
        summaryPt: summaryPt || null,
        summaryEn: summaryEn || null,
        summaryEs: summaryEs || null,
        summaryFr: summaryFr || null,
        descriptionPt: descriptionPt || null,
        descriptionEn: descriptionEn || null,
        descriptionEs: descriptionEs || null,
        descriptionFr: descriptionFr || null,
        city: city || null,
        stateProvince: stateProvince || null,
        country: country || null,
        year: year ? parseInt(year) : null,
        client: client || null,
        type: type || null,
        status: (status as any) || 'DRAFT',
        featured: featured || false,
        priorityHome: priorityHome || 0,
        ctaLabelPt: ctaLabelPt || null,
        ctaLabelEn: ctaLabelEn || null,
        ctaUrl: ctaUrl || null,
        heroImageId: heroImageId || null,
        marketId: marketId || null,
        // ═══════════════════════════════════════════════════════════════
        // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
        // ═══════════════════════════════════════════════════════════════
        projectCategory: Array.isArray(projectCategory) ? projectCategory : [],
        workType: Array.isArray(workType) ? workType : [],
        technologies: Array.isArray(technologies) ? technologies : [],
        industry: industry || null,
        azimutRole: Array.isArray(azimutRole) ? azimutRole : [],
        duration: duration || null,
        awards: awards || null,
        metrics: metrics || null,
        videoUrl: videoUrl || null,
        videoShowreel: videoShowreel || null,
        externalLinks: externalLinks || null,
        partnerLogos: Array.isArray(partnerLogos) ? partnerLogos : [],
        beforeAfterImages: beforeAfterImages || null,
      },
      include: {
        heroImage: true,
        market: true,
        tags: true,
        services: true,
      },
    });

    // ═══════════════════════════════════════════════════════════════
    // 🔄 HOOK: AUTO-CRIAR PÁGINA PARA SEO/TRADUÇÕES
    // ═══════════════════════════════════════════════════════════════
    try {
      const pageSlug = `projetos/${slug}`;
      
      // Verificar se página já existe
      const existingPage = await prisma.page.findUnique({
        where: { slug: pageSlug },
      });

      if (!existingPage) {
        // Criar página automaticamente associada ao projeto
        await prisma.page.create({
          data: {
            name: `Projeto: ${title}`,
            slug: pageSlug,
            status: 'DRAFT', // Sempre como rascunho para revisão
            // SEO Titles - baseados no título do projeto
            seoTitlePt: `${title} | Projetos | Azimut`,
            seoTitleEn: `${title} | Projects | Azimut`,
            seoTitleEs: `${title} | Proyectos | Azimut`,
            seoTitleFr: `${title} | Projets | Azimut`,
            // SEO Descriptions - baseadas no resumo
            seoDescPt: summaryPt || `Conheça o projeto ${title} da Azimut.`,
            seoDescEn: summaryEn || `Discover ${title} project by Azimut.`,
            seoDescEs: summaryEs || `Conoce el proyecto ${title} de Azimut.`,
            seoDescFr: summaryFr || `Découvrez le projet ${title} d'Azimut.`,
            // Hero Slogans - título do projeto
            heroSloganPt: title,
            heroSloganEn: title,
            heroSloganEs: title,
            heroSloganFr: title,
            // Hero Subtitles - resumos
            heroSubtitlePt: summaryPt || null,
            heroSubtitleEn: summaryEn || null,
            heroSubtitleEs: summaryEs || null,
            heroSubtitleFr: summaryFr || null,
          },
        });
        console.log(`✅ Página "${pageSlug}" criada automaticamente para projeto "${title}"`);
      }
    } catch (pageError) {
      // Não falha a criação do projeto se a página der erro
      console.error('⚠️ Erro ao criar página automática (projeto criado normalmente):', pageError);
    }
    // ═══════════════════════════════════════════════════════════════

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 });
  }
}


