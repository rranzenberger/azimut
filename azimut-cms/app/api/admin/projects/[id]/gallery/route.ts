/**
 * API de Galeria do Projeto
 * Gerenciar mídias da galeria (adicionar, remover, reordenar)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// POST - Adicionar mídia à galeria
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { mediaId } = body;

    if (!mediaId) {
      return NextResponse.json({ error: 'mediaId é obrigatório' }, { status: 400 });
    }

    // Verificar se projeto existe
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Verificar se mídia existe
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      return NextResponse.json({ error: 'Mídia não encontrada' }, { status: 404 });
    }

    // Verificar se já está na galeria
    const existing = await prisma.projectMedia.findUnique({
      where: {
        projectId_mediaId: {
          projectId: params.id,
          mediaId: mediaId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Mídia já está na galeria' }, { status: 400 });
    }

    // Obter a maior ordem atual
    const maxOrder = await prisma.projectMedia.findFirst({
      where: { projectId: params.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = (maxOrder?.order ?? -1) + 1;

    // Adicionar à galeria
    const projectMedia = await prisma.projectMedia.create({
      data: {
        projectId: params.id,
        mediaId: mediaId,
        order: newOrder,
      },
      include: {
        media: true,
      },
    });

    return NextResponse.json({ projectMedia }, { status: 201 });
  } catch (error: any) {
    console.error('Gallery POST error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Mídia já está na galeria' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao adicionar mídia à galeria' }, { status: 500 });
  }
}

// DELETE - Remover mídia da galeria
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get('mediaId');

    if (!mediaId) {
      return NextResponse.json({ error: 'mediaId é obrigatório' }, { status: 400 });
    }

    // Verificar se existe
    const projectMedia = await prisma.projectMedia.findUnique({
      where: {
        projectId_mediaId: {
          projectId: params.id,
          mediaId: mediaId,
        },
      },
    });

    if (!projectMedia) {
      return NextResponse.json({ error: 'Mídia não encontrada na galeria' }, { status: 404 });
    }

    // Remover
    await prisma.projectMedia.delete({
      where: {
        id: projectMedia.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery DELETE error:', error);
    return NextResponse.json({ error: 'Erro ao remover mídia da galeria' }, { status: 500 });
  }
}

// PUT - Reordenar mídias
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { mediaIds } = body; // Array de IDs na ordem desejada

    if (!Array.isArray(mediaIds)) {
      return NextResponse.json({ error: 'mediaIds deve ser um array' }, { status: 400 });
    }

    // Atualizar ordem de cada mídia
    const updates = mediaIds.map((mediaId: string, index: number) =>
      prisma.projectMedia.updateMany({
        where: {
          projectId: params.id,
          mediaId: mediaId,
        },
        data: {
          order: index,
        },
      })
    );

    await Promise.all(updates);

    // Retornar galeria atualizada
    const gallery = await prisma.projectMedia.findMany({
      where: { projectId: params.id },
      include: {
        media: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error('Gallery PUT error:', error);
    return NextResponse.json({ error: 'Erro ao reordenar galeria' }, { status: 500 });
  }
}










