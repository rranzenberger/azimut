// ════════════════════════════════════════════════════════════
// API: Gerenciar Sugestão Individual
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// GET - Buscar sugestão por ID
export async function GET(
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

    const suggestion = await prisma.blogPostMonitor.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        blogPost: {
          select: {
            id: true,
            slug: true,
            titlePt: true,
            status: true,
          },
        },
      },
    });

    if (!suggestion) {
      return NextResponse.json(
        { error: 'Sugestão não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      suggestion,
    });
  } catch (error: unknown) {
    console.error('Erro ao buscar sugestão:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao buscar sugestão' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar sugestão
export async function PUT(
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

    const body = await request.json();
    const {
      status,
      suggestedTitlePt,
      suggestedTitleEn,
      suggestedExcerptPt,
      suggestedExcerptEn,
      suggestedContentPt,
      suggestedContentEn,
      creditText,
      azimutContributions,
    } = body;

    const suggestion = await prisma.blogPostMonitor.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(suggestedTitlePt && { suggestedTitlePt }),
        ...(suggestedTitleEn && { suggestedTitleEn }),
        ...(suggestedExcerptPt && { suggestedExcerptPt }),
        ...(suggestedExcerptEn && { suggestedExcerptEn }),
        ...(suggestedContentPt && { suggestedContentPt }),
        ...(suggestedContentEn && { suggestedContentEn }),
        ...(creditText && { creditText }),
        ...(azimutContributions && { azimutContributions }),
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      suggestion,
    });
  } catch (error: unknown) {
    console.error('Erro ao atualizar sugestão:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao atualizar sugestão' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar sugestão
export async function DELETE(
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

    await prisma.blogPostMonitor.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Sugestão deletada com sucesso',
    });
  } catch (error: unknown) {
    console.error('Erro ao deletar sugestão:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao deletar sugestão' },
      { status: 500 }
    );
  }
}
