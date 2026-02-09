/**
 * API Admin: Academy Past Events (8 slots)
 * GET = listar os 8 slots (para backoffice)
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) return null;
  return session;
}

export async function POST() {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    const max = await prisma.academyPastEvent.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const order = (max?.order ?? -1) + 1;
    const slot = await prisma.academyPastEvent.create({
      data: { order, updatedAt: new Date() },
      include: { media: true },
    });
    return NextResponse.json({ slot }, { status: 201 });
  } catch (e) {
    console.error('Academy past-events POST:', e);
    return NextResponse.json({ error: 'Erro ao adicionar slot' }, { status: 500 });
  }
}

export async function GET() {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    let slots = await prisma.academyPastEvent.findMany({
      orderBy: { order: 'asc' },
      include: { media: true },
    });
    // Garantir 8 slots na primeira vez (depois pode expandir com POST)
    if (slots.length === 0) {
      for (let order = 0; order < 8; order++) {
        await prisma.academyPastEvent.create({
          data: { order, updatedAt: new Date() },
        });
      }
      slots = await prisma.academyPastEvent.findMany({
        orderBy: { order: 'asc' },
        include: { media: true },
      });
    }
    return NextResponse.json({ slots });
  } catch (e) {
    console.error('Academy past-events GET:', e);
    return NextResponse.json({ error: 'Erro ao listar Past Events' }, { status: 500 });
  }
}
