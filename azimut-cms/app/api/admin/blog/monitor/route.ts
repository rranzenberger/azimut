// ════════════════════════════════════════════════════════════
// API: CRUD de Sugestões de Monitoramento
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// GET - Listar sugestões
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const projectId = searchParams.get('projectId') || undefined;
    const sourceType = searchParams.get('sourceType') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;
    if (sourceType) where.sourceType = sourceType;

    const [suggestions, total] = await Promise.all([
      prisma.blogPostMonitor.findMany({
        where,
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
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.blogPostMonitor.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      suggestions,
      total,
      limit,
      offset,
    });
  } catch (error: unknown) {
    console.error('Erro ao listar sugestões:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao listar sugestões' },
      { status: 500 }
    );
  }
}

// POST - Criar sugestão manualmente
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      projectName,
      sourceType,
      sourceUrl,
      sourceTitle,
      sourceContent,
      creditType = 'CLIENTE',
      creditText,
      azimutContributions = [],
    } = body;

    if (!sourceUrl || !sourceType) {
      return NextResponse.json(
        { error: 'sourceUrl e sourceType são obrigatórios' },
        { status: 400 }
      );
    }

    const suggestion = await prisma.blogPostMonitor.create({
      data: {
        projectId: projectId || null,
        projectName: projectName || null,
        creditType,
        creditText: creditText || 'Azimut',
        azimutContributions,
        sourceType,
        sourceUrl,
        sourceTitle: sourceTitle || 'Sem título',
        sourceContent: sourceContent || '',
        status: 'PENDING',
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
    console.error('Erro ao criar sugestão:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro ao criar sugestão' },
      { status: 500 }
    );
  }
}
