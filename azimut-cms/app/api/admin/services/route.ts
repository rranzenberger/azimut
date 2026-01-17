/**
 * API de Serviços - Admin
 * CRUD de serviços
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar serviços
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (status && ['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
      where.status = status;
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { priority: 'desc' },
        include: {
          projects: {
            select: {
              id: true,
              slug: true,
              title: true,
            },
            take: 5,
          },
        },
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      services,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Services GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao listar serviços', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Criar serviço
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
      titlePt,
      titleEn,
      titleEs,
      titleFr,
      descriptionPt,
      descriptionEn,
      descriptionEs,
      descriptionFr,
      icon,
      status,
      priority,
      segments,
    } = body;

    // Validação
    if (!slug || !titlePt || !titleEn) {
      return NextResponse.json(
        { error: 'Slug, título PT e título EN são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar status
    if (status && !['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido. Use: DRAFT, PUBLISHED, ARCHIVED' },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        slug,
        titlePt,
        titleEn,
        titleEs: titleEs || null,
        titleFr: titleFr || null,
        descriptionPt: descriptionPt || null,
        descriptionEn: descriptionEn || null,
        descriptionEs: descriptionEs || null,
        descriptionFr: descriptionFr || null,
        icon: icon || null,
        status: status || 'PUBLISHED',
        priority: priority || 0,
        segments: segments || [],
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error: any) {
    console.error('Services POST error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 409 });
    }

    return NextResponse.json(
      { error: 'Erro ao criar serviço', details: error.message },
      { status: 500 }
    );
  }
}

