import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PUT /api/admin/team/[id] - Atualizar membro
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
    if (!body.slug || !body.name || !body.rolePt || !body.roleEn) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: slug, name, rolePt, roleEn' },
        { status: 400 }
      );
    }

    const member = await prisma.teamMembers.update({
      where: { id: params.id },
      data: {
        slug: body.slug,
        name: body.name,
        rolePt: body.rolePt,
        roleEn: body.roleEn,
        roleEs: body.roleEs || null,
        roleFr: body.roleFr || null,
        credentialPt: body.credentialPt || null,
        credentialEn: body.credentialEn || null,
        credentialEs: body.credentialEs || null,
        credentialFr: body.credentialFr || null,
        bioPt: body.bioPt || null,
        bioEn: body.bioEn || null,
        bioEs: body.bioEs || null,
        bioFr: body.bioFr || null,
        photoUrl: body.photoUrl || null,
        photoMediaId: body.photoMediaId || null,
        cardPhotoUrl: body.cardPhotoUrl || null,
        cardPhotoMediaId: body.cardPhotoMediaId || null,
        displayOrder: body.displayOrder || 0,
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
      },
    });

    return NextResponse.json({ success: true, data: member });
  } catch (error: any) {
    console.error('[API /admin/team/[id] PUT] Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Membro não encontrado' }, { status: 404 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar membro' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/team/[id] - Deletar membro
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

    await prisma.teamMembers.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API /admin/team/[id] DELETE] Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Membro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao deletar membro' },
      { status: 500 }
    );
  }
}
