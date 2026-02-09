/**
 * API Admin: atualizar um Academy Course (card)
 * PATCH = atualizar (incluindo imageId)
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
    if (body.titlePt !== undefined) data.titlePt = body.titlePt;
    if (body.titleEn !== undefined) data.titleEn = body.titleEn;
    if (body.titleEs !== undefined) data.titleEs = body.titleEs;
    if (body.titleFr !== undefined) data.titleFr = body.titleFr;
    if (body.descriptionPt !== undefined) data.descriptionPt = body.descriptionPt;
    if (body.descriptionEn !== undefined) data.descriptionEn = body.descriptionEn;
    if (body.descriptionEs !== undefined) data.descriptionEs = body.descriptionEs;
    if (body.descriptionFr !== undefined) data.descriptionFr = body.descriptionFr;
    if (body.pricePt !== undefined) data.pricePt = body.pricePt;
    if (body.priceEn !== undefined) data.priceEn = body.priceEn;
    if (body.durationPt !== undefined) data.durationPt = body.durationPt;
    if (body.durationEn !== undefined) data.durationEn = body.durationEn;
    if (body.levelPt !== undefined) data.levelPt = body.levelPt;
    if (body.levelEn !== undefined) data.levelEn = body.levelEn;
    if (body.category !== undefined) data.category = body.category;
    if (Array.isArray(body.tags)) data.tags = body.tags;
    if (typeof body.featured === 'boolean') data.featured = body.featured;
    if (body.imageId !== undefined) data.imageId = body.imageId;
    if (typeof body.order === 'number') data.order = body.order;

    const course = await prisma.academyCourse.update({
      where: { id },
      data: data as any,
      include: { image: true },
    });
    return NextResponse.json({ course });
  } catch (e) {
    console.error('Academy course PATCH:', e);
    return NextResponse.json({ error: 'Erro ao atualizar curso' }, { status: 500 });
  }
}
