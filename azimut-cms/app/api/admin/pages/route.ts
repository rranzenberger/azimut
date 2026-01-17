/**
 * API de Páginas
 * CRUD de páginas do CMS
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar páginas
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

    const pages = await prisma.page.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    const total = await prisma.page.count();

    return NextResponse.json({
      pages,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Pages GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar páginas' }, { status: 500 });
  }
}

// POST - Criar página
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
      name,
      slug,
      seoTitlePt,
      seoTitleEn,
      seoTitleEs,     // NOVO: SEO ES
      seoTitleFr,     // NOVO: SEO FR
      seoDescPt,
      seoDescEn,
      seoDescEs,      // NOVO: SEO ES
      seoDescFr,      // NOVO: SEO FR
      heroSloganPt,
      heroSloganEn,
      heroSloganEs,
      heroSloganFr,
      heroSubtitlePt, // NOVO: Hero Subtitle
      heroSubtitleEn, // NOVO: Hero Subtitle
      heroSubtitleEs, // NOVO: Hero Subtitle
      heroSubtitleFr, // NOVO: Hero Subtitle
      // Pillars
      pillar1Pt,
      pillar1En,
      pillar1Es,
      pillar1Fr,
      pillar2Pt,
      pillar2En,
      pillar2Es,
      pillar2Fr,
      pillar3Pt,
      pillar3En,
      pillar3Es,
      pillar3Fr,
      status,
    } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Nome e slug são obrigatórios' }, { status: 400 });
    }

    const page = await prisma.page.create({
      data: {
        name,
        slug,
        seoTitlePt,
        seoTitleEn,
        seoTitleEs,    // NOVO: SEO ES
        seoTitleFr,    // NOVO: SEO FR
        seoDescPt,
        seoDescEn,
        seoDescEs,     // NOVO: SEO ES
        seoDescFr,     // NOVO: SEO FR
        heroSloganPt,
        heroSloganEn,
        heroSloganEs,
        heroSloganFr,
        heroSubtitlePt, // NOVO: Hero Subtitle
        heroSubtitleEn, // NOVO: Hero Subtitle
        heroSubtitleEs, // NOVO: Hero Subtitle
        heroSubtitleFr, // NOVO: Hero Subtitle
        // Pillars
        pillar1Pt,
        pillar1En,
        pillar1Es,
        pillar1Fr,
        pillar2Pt,
        pillar2En,
        pillar2Es,
        pillar2Fr,
        pillar3Pt,
        pillar3En,
        pillar3Es,
        pillar3Fr,
        status: status || 'PUBLISHED',
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error: any) {
    console.error('Pages POST error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro ao criar página' }, { status: 500 });
  }
}

