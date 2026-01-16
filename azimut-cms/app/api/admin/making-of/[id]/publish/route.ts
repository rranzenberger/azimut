// ════════════════════════════════════════════════════════════
// API: Publicar Making-of Automaticamente
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { publishMakingOf } from '@/lib/services/makingOfPublisher';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const makingOf = await prisma.makingOf.findUnique({
      where: { id },
    });

    if (!makingOf) {
      return NextResponse.json(
        { error: 'Making-of não encontrado' },
        { status: 404 }
      );
    }

    if (makingOf.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Making-of precisa estar aprovado para ser publicado' },
        { status: 400 }
      );
    }

    // Publicar automaticamente
    const result = await publishMakingOf(id);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Erro ao publicar making-of',
          publishedTo: result.publishedTo,
          errors: result.errors,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Making-of publicado com sucesso em: ${result.publishedTo.join(', ')}`,
      publishedTo: result.publishedTo,
      errors: result.errors.length > 0 ? result.errors : undefined,
    });
  } catch (error: unknown) {
    console.error('Erro ao publicar making-of:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao publicar making-of' },
      { status: 500 }
    );
  }
}
