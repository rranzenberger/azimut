/**
 * API de Categorias do Blog
 * CRUD completo de categorias
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar categorias
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const categories = await prisma.blogCategory.findMany({
      orderBy: { priority: 'desc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Blog categories GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar categorias' }, { status: 500 });
  }
}

// POST - Criar categoria
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
      slug,
      namePt,
      nameEn,
      nameEs,
      nameFr,
      descPt,
      descEn,
      descEs,
      descFr,
      color,
      icon,
      priority,
    } = body;

    if (!slug || !namePt || !nameEn) {
      return NextResponse.json(
        { error: 'Slug, nome PT e nome EN são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se slug já existe
    const existing = await prisma.blogCategory.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug já existe. Use outro.' }, { status: 400 });
    }

    const category = await prisma.blogCategory.create({
      data: {
        slug,
        namePt,
        nameEn,
        nameEs: nameEs || null,
        nameFr: nameFr || null,
        descPt: descPt || null,
        descEn: descEn || null,
        descEs: descEs || null,
        descFr: descFr || null,
        color: color || '#c92337',
        icon: icon || null,
        priority: priority || 0,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error: any) {
    console.error('Blog category creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 });
  }
}
