/**
 * API de Serviço Individual - Admin
 * Buscar, atualizar e deletar serviço específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Buscar serviço por ID
export async function GET(
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

    const { id } = params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        projects: {
          select: {
            id: true,
            slug: true,
            title: true,
            status: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error: any) {
    console.error('Service GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar serviço', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Atualizar serviço
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

    const { id } = params;
    const body = await request.json();

    // Validar campos permitidos
    const allowedFields = [
      'slug',
      'titlePt',
      'titleEn',
      'titleEs',
      'titleFr',
      'descriptionPt',
      'descriptionEn',
      'descriptionEs',
      'descriptionFr',
      'icon',
      'status',
      'priority',
      'segments',
    ];

    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    // Validação obrigatória
    if (updateData.slug !== undefined && !updateData.slug) {
      return NextResponse.json({ error: 'Slug é obrigatório' }, { status: 400 });
    }

    if (updateData.titlePt !== undefined && !updateData.titlePt) {
      return NextResponse.json({ error: 'Título PT é obrigatório' }, { status: 400 });
    }

    if (updateData.titleEn !== undefined && !updateData.titleEn) {
      return NextResponse.json({ error: 'Título EN é obrigatório' }, { status: 400 });
    }

    // Validar status
    if (updateData.status && !['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(updateData.status)) {
      return NextResponse.json(
        { error: 'Status inválido. Use: DRAFT, PUBLISHED, ARCHIVED' },
        { status: 400 }
      );
    }

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        projects: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ service, message: 'Serviço atualizado com sucesso' });
  } catch (error: any) {
    console.error('Service PUT error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
    }

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 409 });
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar serviço', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Deletar serviço
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

    const { id } = params;

    // Verificar se tem projetos vinculados
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        projects: {
          select: { id: true },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
    }

    if (service.projects.length > 0) {
      return NextResponse.json(
        { error: `Não é possível deletar serviço com ${service.projects.length} projeto(s) vinculado(s). Remova os projetos primeiro.` },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Serviço deletado com sucesso' });
  } catch (error: any) {
    console.error('Service DELETE error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Erro ao deletar serviço', details: error.message },
      { status: 500 }
    );
  }
}

