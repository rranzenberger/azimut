/**
 * API PÚBLICA - Cursos da Academy (sem autenticação)
 * O site consome aqui para exibir os cards de cursos.
 * GET /api/public/academy/courses
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await prisma.academyCourse.findMany({
      orderBy: { order: 'asc' },
      include: {
        image: {
          select: {
            id: true,
            originalUrl: true,
            mediumUrl: true,
            thumbnailUrl: true,
          },
        },
      },
    });
    return NextResponse.json({ courses });
  } catch (e) {
    console.error('Public academy courses GET:', e);
    return NextResponse.json({ error: 'Erro ao listar cursos' }, { status: 500 });
  }
}
