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
    } = body;

    // Verificar se projeto existe
    const existing = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
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
        client: client !== undefined ? client : existing.client,
        type: type !== undefined ? type : existing.type,
        status: status !== undefined ? (status as any) : existing.status,
        featured: featured !== undefined ? featured : existing.featured,
        priorityHome: priorityHome !== undefined ? priorityHome : existing.priorityHome,
        ctaLabelPt: ctaLabelPt !== undefined ? ctaLabelPt : existing.ctaLabelPt,
        ctaLabelEn: ctaLabelEn !== undefined ? ctaLabelEn : existing.ctaLabelEn,
        ctaUrl: ctaUrl !== undefined ? ctaUrl : existing.ctaUrl,
        heroImageId: heroImageId !== undefined ? heroImageId : existing.heroImageId,
        marketId: marketId !== undefined ? marketId : existing.marketId,
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
    console.error('Project update error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao atualizar projeto' }, { status: 500 });
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

