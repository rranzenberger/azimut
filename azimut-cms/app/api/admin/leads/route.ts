/**
 * API de Leads - Admin
 * Listar leads com filtros
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar leads com filtros
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Filtros
    const status = searchParams.get('status') as 'NEW' | 'IN_PROGRESS' | 'WON' | 'LOST' | null;
    const priority = searchParams.get('priority') as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | null;
    const leadType = searchParams.get('leadType') as 'CONTACT_FORM' | 'BUDGET_INQUIRY' | null;
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const search = searchParams.get('search'); // Busca em name, email, company
    
    // Paginação
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Construir where clause
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (priority) {
      where.priority = priority;
    }
    
    if (leadType) {
      where.leadType = leadType;
    }
    
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          sessions: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            include: {
              interestScore: {
                select: {
                  conversionScore: true,
                  visitorType: true,
                },
              },
            },
          },
          editalLeads: {
            include: {
              edital: {
                select: {
                  id: true,
                  name: true,
                  status: true,
                },
              },
            },
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Leads GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao listar leads', details: error.message },
      { status: 500 }
    );
  }
}

