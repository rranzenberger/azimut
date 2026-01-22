import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PUT /api/admin/history/[id] - Atualizar evento
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
    if (!body.year || !body.type || !body.titlePt || !body.titleEn) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: year, type, titlePt, titleEn' },
        { status: 400 }
      );
    }

    const history = await prisma.companyHistory.update({
      where: { id: params.id },
      data: {
        year: parseInt(body.year),
        yearEnd: body.yearEnd ? parseInt(body.yearEnd) : null,
        type: body.type,
        displayOrder: body.displayOrder || 0,
        titlePt: body.titlePt,
        titleEn: body.titleEn,
        titleEs: body.titleEs || null,
        titleFr: body.titleFr || null,
        descriptionPt: body.descriptionPt || null,
        descriptionEn: body.descriptionEn || null,
        descriptionEs: body.descriptionEs || null,
        descriptionFr: body.descriptionFr || null,
        bulletsPt: body.bulletsPt || [],
        bulletsEn: body.bulletsEn || [],
        bulletsEs: body.bulletsEs || [],
        bulletsFr: body.bulletsFr || [],
        icon: body.icon || null,
        logoUrl: body.logoUrl || null,
        externalLink: body.externalLink || null,
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
        isFeatured: body.isFeatured || false,
      },
    });

    return NextResponse.json({ success: true, data: history });
  } catch (error: any) {
    console.error('[API /admin/history/[id] PUT] Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar evento' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/history/[id] - Deletar evento
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

    await prisma.companyHistory.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API /admin/history/[id] DELETE] Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao deletar evento' },
      { status: 500 }
    );
  }
}
