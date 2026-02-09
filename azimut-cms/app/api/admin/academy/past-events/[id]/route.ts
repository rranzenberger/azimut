/**
 * API Admin: atualizar um slot de Past Event (mediaId, caption)
 * PATCH = atualizar
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
  if (!session) return null;
  return session;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const data: Record<string, unknown> = { updatedAt: new Date() };
    if (body.mediaId !== undefined) data.mediaId = body.mediaId;
    if (body.captionPt !== undefined) data.captionPt = body.captionPt;
    if (body.captionEn !== undefined) data.captionEn = body.captionEn;

    const slot = await prisma.academyPastEvent.update({
      where: { id },
      data: data as any,
      include: { media: true },
    });
    return NextResponse.json({ slot });
  } catch (e) {
    console.error('Academy past-event PATCH:', e);
    return NextResponse.json({ error: 'Erro ao atualizar slot' }, { status: 500 });
  }
}
