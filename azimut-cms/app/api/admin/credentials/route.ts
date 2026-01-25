import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST /api/admin/credentials - Criar nova credencial
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
    if (!body.textPt || !body.textEn) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: textPt, textEn' },
        { status: 400 }
      );
    }

    const credential = await prisma.credentials.create({
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
    console.error('[API /admin/credentials POST] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao criar credencial' },
      { status: 500 }
    );
  }
}
