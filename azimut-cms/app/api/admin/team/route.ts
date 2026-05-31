import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST /api/admin/team - Criar novo membro
export async function POST(request: NextRequest) {
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

    const member = await prisma.teamMembers.create({
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
    console.error('[API /admin/team POST] Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já existe' }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || 'Erro ao criar membro' },
      { status: 500 }
    );
  }
}
