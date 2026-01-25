import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const { code, labelPt, labelEn, labelEs, labelFr, priority } = body;

    if (!code || !labelPt || !labelEn) {
      return NextResponse.json(
        { error: 'Code, labelPt e labelEn são obrigatórios' },
        { status: 400 }
      );
    }

    const market = await prisma.market.create({
      data: {
        code,
        labelPt,
        labelEn,
        labelEs: labelEs || null,
        labelFr: labelFr || null,
        priority: priority || 0,
      },
    });

    return NextResponse.json(market);
  } catch (error: any) {
    console.error('Market creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Já existe um mercado com este code' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao criar mercado' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const markets = await prisma.market.findMany({
      orderBy: [{ priority: 'asc' }, { labelPt: 'asc' }],
    });

    return NextResponse.json(markets);
  } catch (error: any) {
    console.error('Markets fetch error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar mercados' },
      { status: 500 }
    );
  }
}
