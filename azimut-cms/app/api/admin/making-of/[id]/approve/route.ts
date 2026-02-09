/**
 * API: Aprovar Making-of (status → APPROVED)
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const makingOf = await prisma.makingOf.findUnique({ where: { id } });

    if (!makingOf) {
      return NextResponse.json(
        { error: 'Making-of não encontrado' },
        { status: 404 }
      );
    }

    await prisma.makingOf.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    return NextResponse.json({ success: true, message: 'Making-of aprovado' });
  } catch (error) {
    console.error('[API] making-of approve error:', error);
    return NextResponse.json(
      { error: 'Erro ao aprovar making-of' },
      { status: 500 }
    );
  }
}
