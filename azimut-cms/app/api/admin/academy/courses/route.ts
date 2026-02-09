/**
 * API Admin: Academy Courses (6 cards da página Cursos)
 * GET = listar todos (para backoffice)
 * POST = criar (para seed ou novo card)
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    const courses = await prisma.academyCourse.findMany({
      orderBy: { order: 'asc' },
      include: { image: true },
    });
    return NextResponse.json({ courses });
  } catch (e) {
    console.error('Academy courses GET:', e);
    return NextResponse.json({ error: 'Erro ao listar cursos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const maxOrder = await prisma.academyCourse.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const order = (maxOrder?.order ?? -1) + 1;

    const course = await prisma.academyCourse.create({
      data: {
        order,
        titlePt: body.titlePt ?? null,
        titleEn: body.titleEn ?? null,
        descriptionPt: body.descriptionPt ?? null,
        descriptionEn: body.descriptionEn ?? null,
        pricePt: body.pricePt ?? null,
        priceEn: body.priceEn ?? null,
        durationPt: body.durationPt ?? null,
        durationEn: body.durationEn ?? null,
        levelPt: body.levelPt ?? null,
        levelEn: body.levelEn ?? null,
        category: body.category ?? null,
        tags: Array.isArray(body.tags) ? body.tags : [],
        featured: !!body.featured,
        imageId: body.imageId ?? null,
        updatedAt: new Date(),
      },
      include: { image: true },
    });
    return NextResponse.json({ course }, { status: 201 });
  } catch (e) {
    console.error('Academy courses POST:', e);
    return NextResponse.json({ error: 'Erro ao criar curso' }, { status: 500 });
  }
}
