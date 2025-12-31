/**
 * API de Lead Individual - Admin
 * Buscar e atualizar lead específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { LeadStatus, LeadPriority } from '@prisma/client';

export const runtime = 'nodejs';

// GET - Buscar lead por ID
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

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        sessions: {
          orderBy: { createdAt: 'desc' },
          include: {
            pageViews: {
              take: 10,
              orderBy: { viewedAt: 'desc' },
              include: {
                project: {
                  select: {
                    id: true,
                    slug: true,
                    title: true,
                  },
                },
              },
            },
            interestScore: true,
          },
        },
        editalLeads: {
          include: {
            edital: {
              select: {
                id: true,
                name: true,
                source: true,
                sourceUrl: true,
                deadline: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error: any) {
    console.error('Lead GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar lead', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Atualizar lead
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
      'status',
      'priority',
      'name',
      'email',
      'phone',
      'company',
      'position',
      'projectType',
      'budget',
      'timeline',
      'description',
    ];

    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    // Validar enums
    if (updateData.status && !['NEW', 'IN_PROGRESS', 'WON', 'LOST'].includes(updateData.status)) {
      return NextResponse.json(
        { error: 'Status inválido. Use: NEW, IN_PROGRESS, WON, LOST' },
        { status: 400 }
      );
    }

    if (updateData.priority && !['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(updateData.priority)) {
      return NextResponse.json(
        { error: 'Prioridade inválida. Use: LOW, MEDIUM, HIGH, URGENT' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
      include: {
        sessions: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json({ lead, message: 'Lead atualizado com sucesso' });
  } catch (error: any) {
    console.error('Lead PUT error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar lead', details: error.message },
      { status: 500 }
    );
  }
}

