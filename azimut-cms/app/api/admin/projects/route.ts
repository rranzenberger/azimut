/**
 * API de Projetos
 * CRUD de projetos do CMS
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
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
      },
      include: {
        heroImage: true,
        market: true,
        tags: true,
        services: true,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 });
  }
}


