/**
 * API PÚBLICA - Past Events (slots da seção Workshops) - sem autenticação
 * O site consome aqui para exibir a galeria de imagens.
 * GET /api/public/academy/past-events
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slots = await prisma.academyPastEvent.findMany({
      orderBy: { order: 'asc' },
      include: {
        media: {
          select: {
            id: true,
            originalUrl: true,
            mediumUrl: true,
            thumbnailUrl: true,
          },
        },
      },
    });
    return NextResponse.json({ slots });
  } catch (e) {
    console.error('Public academy past-events GET:', e);
    return NextResponse.json({ error: 'Erro ao listar past events' }, { status: 500 });
  }
}
