import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PUT /api/admin/credentials/[id] - Atualizar credencial
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();

    // Validação básica
    if (!body.textPt || !body.textEn) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: textPt, textEn' },
        { status: 400 }
      );
    }

    const credential = await prisma.credentials.update({
      where: { id: params.id },
      data: {
        order: body.order || 0,
        icon: body.icon || null,
        textPt: body.textPt,
        textEn: body.textEn,
        textEs: body.textEs || null,
        textFr: body.textFr || null,
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
      },
    });

    return NextResponse.json({ success: true, data: credential });
  } catch (error: any) {
    console.error('[API /admin/credentials/[id] PUT] Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Credencial não encontrada' }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar credencial' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/credentials/[id] - Deletar credencial
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await prisma.credentials.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API /admin/credentials/[id] DELETE] Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Credencial não encontrada' }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao deletar credencial' },
      { status: 500 }
    );
  }
}
