import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const market = await prisma.market.findUnique({
      where: { id: params.id },
    });

    if (!market) {
      return NextResponse.json(
        { error: 'Mercado não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(market);
  } catch (error: any) {
    console.error('Market fetch error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar mercado' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const { labelPt, labelEn, labelEs, labelFr, priority } = body;

    if (!labelPt || !labelEn) {
      return NextResponse.json(
        { error: 'labelPt e labelEn são obrigatórios' },
        { status: 400 }
      );
    }

    const market = await prisma.market.update({
      where: { id: params.id },
      data: {
        labelPt,
        labelEn,
        labelEs: labelEs || null,
        labelFr: labelFr || null,
        priority: priority || 0,
      },
    });

    return NextResponse.json(market);
  } catch (error: any) {
    console.error('Market update error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Mercado não encontrado' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao atualizar mercado' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await prisma.market.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Market delete error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Mercado não encontrado' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao deletar mercado' },
      { status: 500 }
    );
  }
}
