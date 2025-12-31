/**
 * API de Projeto Individual
 * GET, PUT, DELETE de um projeto específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
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

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Project delete error:', error);
    return NextResponse.json({ error: 'Erro ao deletar projeto' }, { status: 500 });
  }
}

