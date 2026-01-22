import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST /api/admin/history - Criar novo evento
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
    if (!body.year || !body.type || !body.titlePt || !body.titleEn) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: year, type, titlePt, titleEn' },
        { status: 400 }
      );
    }

    const history = await prisma.companyHistory.create({
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
    console.error('[API /admin/history POST] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao criar evento' },
      { status: 500 }
    );
  }
}
