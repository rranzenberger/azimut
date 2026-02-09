/**
 * API de Projeto Individual
 * GET, PUT, DELETE de um projeto específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Buscar projeto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
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
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Project GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar projeto' }, { status: 500 });
  }
}

// PUT - Atualizar projeto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      month,
      yearStart,
      monthStart,
      yearEnd,
      monthEnd,
      client,
      partnership,
      coproduction,
      type,
      status,
      featured,
      priorityHome,
      ctaLabelPt,
      ctaLabelEn,
      ctaUrl,
      heroImageId,
      heroImageFit,
      heroImagePosition,
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
      // 🔍 SEO - Campos otimizados pela IA
      seoTitlePt,
      seoTitleEn,
      seoTitleEs,
      seoTitleFr,
      seoDescPt,
      seoDescEn,
      seoDescEs,
      seoDescFr,
      seoKeywords,
    } = body;

    // Verificar se projeto existe (select sem yearStart/monthStart/yearEnd/monthEnd para não quebrar se a migration ainda não rodou no banco)
    const existing = await prisma.project.findUnique({
      where: { id: params.id },
      select: {
        id: true, title: true, shortTitle: true, slug: true, summaryPt: true, summaryEn: true, summaryEs: true, summaryFr: true,
        descriptionPt: true, descriptionEn: true, descriptionEs: true, descriptionFr: true,
        city: true, stateProvince: true, country: true, year: true, month: true,
        client: true, partnership: true, coproduction: true, type: true, status: true, featured: true, priorityHome: true,
        hasDetailPage: true, thumbnailUrl: true, ctaLabelPt: true, ctaLabelEn: true, ctaUrl: true, heroImageId: true, heroImageFit: true, heroImagePosition: true, marketId: true,
        createdAt: true, updatedAt: true,
        seoTitlePt: true, seoTitleEn: true, seoTitleEs: true, seoTitleFr: true,
        seoDescPt: true, seoDescEn: true, seoDescEs: true, seoDescFr: true, seoKeywords: true,
        monitorEnabled: true, monitorKeywords: true, creditType: true, creditText: true, azimutContributions: true,
        projectCategory: true, workType: true, technologies: true, industry: true, azimutRole: true,
        duration: true, awards: true, metrics: true, videoUrl: true, videoShowreel: true,
        externalLinks: true, partnerLogos: true, beforeAfterImages: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Slots da Home: 0 = não exibir, 1 = Principal 1, 2 = Principal 2, 3 = Principal 3, 4 = Principal 4.
    const safePriority =
      priorityHome !== undefined && priorityHome !== null
        ? Math.min(7, Math.max(0, Math.round(Number(priorityHome)) || 0))
        : undefined;
    const finalPriorityHome = safePriority !== undefined ? safePriority : existing.priorityHome;

    const HOME_SLOTS = [1, 2, 3, 4, 5, 6, 7] as const;
    const isSlot = (n: number) => HOME_SLOTS.includes(n as any);

    // Garantia: ao marcar este projeto em um slot, qualquer OUTRO projeto nesse slot é desmarcado (e vice-versa implícito: ao desmarcar este, só este sai da Home).
    if (isSlot(finalPriorityHome)) {
      await prisma.project.updateMany({
        where: {
          id: { not: params.id },
          priorityHome: finalPriorityHome,
        },
        data: { priorityHome: 0, featured: false },
      });
    }

    // Caminho mínimo: quando o body tem só featured + priorityHome (ex.: "Substituir destaque"), atualizar só esses dois campos para evitar 500
    const bodyKeys = Object.keys(body).filter((k) => body[k] !== undefined);
    const isMinimalUpdate =
      bodyKeys.length === 2 && bodyKeys.includes('featured') && bodyKeys.includes('priorityHome');

    if (isMinimalUpdate) {
      // Não incluir gallery para evitar SELECT em ProjectMedia (captionPt pode não existir no banco)
      const project = await prisma.project.update({
        where: { id: params.id },
        data: { featured: featured ?? existing.featured, priorityHome: finalPriorityHome },
        include: {
          heroImage: true,
          market: true,
          tags: true,
          services: true,
        },
      });
      return NextResponse.json({ project });
    }

    // Verificar se slug mudou e se já existe
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json({ error: 'Slug já existe. Use outro.' }, { status: 400 });
      }
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: title !== undefined ? title : existing.title,
        shortTitle: shortTitle !== undefined ? shortTitle : existing.shortTitle,
        slug: slug !== undefined ? slug : existing.slug,
        summaryPt: summaryPt !== undefined ? summaryPt : existing.summaryPt,
        summaryEn: summaryEn !== undefined ? summaryEn : existing.summaryEn,
        summaryEs: summaryEs !== undefined ? summaryEs : existing.summaryEs,
        summaryFr: summaryFr !== undefined ? summaryFr : existing.summaryFr,
        descriptionPt: descriptionPt !== undefined ? descriptionPt : existing.descriptionPt,
        descriptionEn: descriptionEn !== undefined ? descriptionEn : existing.descriptionEn,
        descriptionEs: descriptionEs !== undefined ? descriptionEs : existing.descriptionEs,
        descriptionFr: descriptionFr !== undefined ? descriptionFr : existing.descriptionFr,
        city: city !== undefined ? city : existing.city,
        stateProvince: stateProvince !== undefined ? stateProvince : existing.stateProvince,
        country: country !== undefined ? country : existing.country,
        year: year !== undefined ? (year ? parseInt(year) : null) : existing.year,
        month: month !== undefined ? (month ? parseInt(month) : null) : existing.month,
        // Incluir yearStart/monthStart/yearEnd/monthEnd só quando enviados no body (evita 500 se as colunas ainda não existirem no banco)
        ...(yearStart !== undefined && { yearStart: yearStart ? parseInt(yearStart) : null }),
        ...(monthStart !== undefined && { monthStart: monthStart ? parseInt(monthStart) : null }),
        ...(yearEnd !== undefined && { yearEnd: yearEnd ? parseInt(yearEnd) : null }),
        ...(monthEnd !== undefined && { monthEnd: monthEnd ? parseInt(monthEnd) : null }),
        client: client !== undefined ? client : existing.client,
        partnership: partnership !== undefined ? partnership : existing.partnership,
        coproduction: coproduction !== undefined ? coproduction : existing.coproduction,
        type: type !== undefined ? type : existing.type,
        status: status !== undefined ? (status as any) : existing.status,
        featured: featured !== undefined ? featured : existing.featured,
        priorityHome: finalPriorityHome,
        ctaLabelPt: ctaLabelPt !== undefined ? ctaLabelPt : existing.ctaLabelPt,
        ctaLabelEn: ctaLabelEn !== undefined ? ctaLabelEn : existing.ctaLabelEn,
        ctaUrl: ctaUrl !== undefined ? ctaUrl : existing.ctaUrl,
        heroImageId: heroImageId !== undefined ? heroImageId : existing.heroImageId,
        ...(heroImageFit !== undefined && { heroImageFit: heroImageFit || null }),
        ...(heroImagePosition !== undefined && { heroImagePosition: heroImagePosition || null }),
        marketId: marketId !== undefined ? marketId : existing.marketId,
        // ═══════════════════════════════════════════════════════════════
        // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
        // ═══════════════════════════════════════════════════════════════
        projectCategory: projectCategory !== undefined 
          ? (Array.isArray(projectCategory) ? projectCategory : [])
          : (existing.projectCategory || []),
        workType: workType !== undefined 
          ? (Array.isArray(workType) ? workType : [])
          : (existing.workType || []),
        technologies: technologies !== undefined 
          ? (Array.isArray(technologies) ? technologies : [])
          : (existing.technologies || []),
        industry: industry !== undefined ? industry : existing.industry,
        azimutRole: azimutRole !== undefined 
          ? (Array.isArray(azimutRole) ? azimutRole : [])
          : (existing.azimutRole || []),
        duration: duration !== undefined ? duration : existing.duration,
        awards: awards !== undefined ? awards : existing.awards,
        metrics: metrics !== undefined ? metrics : existing.metrics,
        videoUrl: videoUrl !== undefined ? videoUrl : existing.videoUrl,
        videoShowreel: videoShowreel !== undefined ? videoShowreel : existing.videoShowreel,
        externalLinks: externalLinks !== undefined ? externalLinks : existing.externalLinks,
        partnerLogos: partnerLogos !== undefined 
          ? (Array.isArray(partnerLogos) ? partnerLogos : [])
          : (existing.partnerLogos || []),
        beforeAfterImages: beforeAfterImages !== undefined ? beforeAfterImages : existing.beforeAfterImages,
        // 🔍 SEO - Campos otimizados pela IA
        seoTitlePt: seoTitlePt !== undefined ? seoTitlePt : existing.seoTitlePt,
        seoTitleEn: seoTitleEn !== undefined ? seoTitleEn : existing.seoTitleEn,
        seoTitleEs: seoTitleEs !== undefined ? seoTitleEs : existing.seoTitleEs,
        seoTitleFr: seoTitleFr !== undefined ? seoTitleFr : existing.seoTitleFr,
        seoDescPt: seoDescPt !== undefined ? seoDescPt : existing.seoDescPt,
        seoDescEn: seoDescEn !== undefined ? seoDescEn : existing.seoDescEn,
        seoDescEs: seoDescEs !== undefined ? seoDescEs : existing.seoDescEs,
        seoDescFr: seoDescFr !== undefined ? seoDescFr : existing.seoDescFr,
        seoKeywords: seoKeywords !== undefined 
          ? (Array.isArray(seoKeywords) ? seoKeywords : [])
          : (existing.seoKeywords || []),
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

    // ═══════════════════════════════════════════════════════════════
    // 🔄 HOOK: SINCRONIZAR PÁGINA QUANDO PROJETO É ATUALIZADO
    // ═══════════════════════════════════════════════════════════════
    try {
      const oldPageSlug = `projetos/${existing.slug}`;
      const newPageSlug = `projetos/${project.slug}`;
      
      // Buscar página existente
      const existingPage = await prisma.page.findUnique({
        where: { slug: oldPageSlug },
      });

      if (existingPage) {
        // Atualizar página com novos dados do projeto
        await prisma.page.update({
          where: { slug: oldPageSlug },
          data: {
            name: `Projeto: ${project.title}`,
            slug: newPageSlug, // Atualiza slug se mudou
            // SEO Titles
            seoTitlePt: `${project.title} | Projetos | Azimut`,
            seoTitleEn: `${project.title} | Projects | Azimut`,
            seoTitleEs: `${project.title} | Proyectos | Azimut`,
            seoTitleFr: `${project.title} | Projets | Azimut`,
            // SEO Descriptions
            seoDescPt: project.summaryPt || `Conheça o projeto ${project.title} da Azimut.`,
            seoDescEn: project.summaryEn || `Discover ${project.title} project by Azimut.`,
            seoDescEs: project.summaryEs || `Conoce el proyecto ${project.title} de Azimut.`,
            seoDescFr: project.summaryFr || `Découvrez le projet ${project.title} d'Azimut.`,
            // Hero Slogans
            heroSloganPt: project.title,
            heroSloganEn: project.title,
            heroSloganEs: project.title,
            heroSloganFr: project.title,
            // Hero Subtitles
            heroSubtitlePt: project.summaryPt || null,
            heroSubtitleEn: project.summaryEn || null,
            heroSubtitleEs: project.summaryEs || null,
            heroSubtitleFr: project.summaryFr || null,
          },
        });
        console.log(`✅ Página "${newPageSlug}" sincronizada com projeto "${project.title}"`);
      } else {
        // Criar página se não existe (caso projeto antigo não tinha página)
        await prisma.page.create({
          data: {
            name: `Projeto: ${project.title}`,
            slug: newPageSlug,
            status: 'DRAFT',
            seoTitlePt: `${project.title} | Projetos | Azimut`,
            seoTitleEn: `${project.title} | Projects | Azimut`,
            seoTitleEs: `${project.title} | Proyectos | Azimut`,
            seoTitleFr: `${project.title} | Projets | Azimut`,
            seoDescPt: project.summaryPt || `Conheça o projeto ${project.title} da Azimut.`,
            seoDescEn: project.summaryEn || `Discover ${project.title} project by Azimut.`,
            seoDescEs: project.summaryEs || `Conoce el proyecto ${project.title} de Azimut.`,
            seoDescFr: project.summaryFr || `Découvrez le projet ${project.title} d'Azimut.`,
            heroSloganPt: project.title,
            heroSloganEn: project.title,
            heroSloganEs: project.title,
            heroSloganFr: project.title,
            heroSubtitlePt: project.summaryPt || null,
            heroSubtitleEn: project.summaryEn || null,
            heroSubtitleEs: project.summaryEs || null,
            heroSubtitleFr: project.summaryFr || null,
          },
        });
        console.log(`✅ Página "${newPageSlug}" criada para projeto existente "${project.title}"`);
      }
    } catch (pageError) {
      console.error('⚠️ Erro ao sincronizar página (projeto atualizado normalmente):', pageError);
    }
    // ═══════════════════════════════════════════════════════════════

    return NextResponse.json({ project });
  } catch (error: any) {
    const message = error?.message || error?.meta?.message || String(error);
    const code = error?.code;
    console.error('[PUT Project] Error:', message, code, error?.meta);
    if (code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    // Retornar a mensagem real para debug (ex.: coluna inexistente, constraint)
    return NextResponse.json(
      { error: message || 'Erro ao atualizar projeto', code: code || null },
      { status: 500 }
    );
  }
}

// DELETE - Deletar projeto
// 🔄 AUTO-DELETA PÁGINA associada quando projeto é deletado
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Verificar se projeto existe
    const existing = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // ═══════════════════════════════════════════════════════════════
    // 🔄 HOOK: DELETAR PÁGINA ASSOCIADA ANTES DE DELETAR PROJETO
    // ═══════════════════════════════════════════════════════════════
    try {
      const pageSlug = `projetos/${existing.slug}`;
      
      // Deletar página associada se existir
      const existingPage = await prisma.page.findUnique({
        where: { slug: pageSlug },
      });

      if (existingPage) {
        // Primeiro deletar sections da página (se houver)
        await prisma.section.deleteMany({
          where: { pageId: existingPage.id },
        });
        
        // Depois deletar a página
        await prisma.page.delete({
          where: { slug: pageSlug },
        });
        console.log(`✅ Página "${pageSlug}" deletada junto com projeto "${existing.title}"`);
      }
    } catch (pageError) {
      console.error('⚠️ Erro ao deletar página associada (projeto será deletado):', pageError);
    }
    // ═══════════════════════════════════════════════════════════════

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Project delete error:', error);
    return NextResponse.json({ error: 'Erro ao deletar projeto' }, { status: 500 });
  }
}

