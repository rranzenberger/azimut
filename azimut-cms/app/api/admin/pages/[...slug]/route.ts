/**
 * API de Página Individual
 * GET, PUT, DELETE de uma página específica
 * Suporta slugs com barras usando catch-all route [...slug]
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Buscar página por slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string | string[] } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Suporta slugs com barras: ['studio', 'about'] -> 'studio/about'
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Página não encontrada' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Page GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar página' }, { status: 500 });
  }
}

// PUT - Atualizar página
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string | string[] } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Suporta slugs com barras: ['studio', 'about'] -> 'studio/about'
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

    const body = await request.json();
    const {
      name,
      seoTitlePt,
      seoTitleEn,
      seoDescPt,
      seoDescEn,
      heroSloganPt,
      heroSloganEn,
      heroSloganEs,
      heroSloganFr,
      heroSubtitlePt,
      heroSubtitleEn,
      heroSubtitleEs,
      heroSubtitleFr,
      status,
    } = body;

    const page = await prisma.page.update({
      where: { slug },
      data: {
        ...(name && { name }),
        ...(seoTitlePt !== undefined && { seoTitlePt }),
        ...(seoTitleEn !== undefined && { seoTitleEn }),
        ...(seoDescPt !== undefined && { seoDescPt }),
        ...(seoDescEn !== undefined && { seoDescEn }),
        ...(heroSloganPt !== undefined && { heroSloganPt }),
        ...(heroSloganEn !== undefined && { heroSloganEn }),
        ...(heroSloganEs !== undefined && { heroSloganEs }),
        ...(heroSloganFr !== undefined && { heroSloganFr }),
        ...(heroSubtitlePt !== undefined && { heroSubtitlePt }),
        ...(heroSubtitleEn !== undefined && { heroSubtitleEn }),
        ...(heroSubtitleEs !== undefined && { heroSubtitleEs }),
        ...(heroSubtitleFr !== undefined && { heroSubtitleFr }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(page);
  } catch (error: any) {
    console.error('Page PUT error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Página não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro ao atualizar página' }, { status: 500 });
  }
}

// DELETE - Deletar página (futuro)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string | string[] } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Suporta slugs com barras: ['studio', 'about'] -> 'studio/about'
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

    await prisma.page.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Page DELETE error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Página não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro ao deletar página' }, { status: 500 });
  }
}


