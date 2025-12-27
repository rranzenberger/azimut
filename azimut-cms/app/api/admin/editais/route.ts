/**
 * API de Editais
 * CRUD de editais do CMS
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Listar editais
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status'); // ABERTO, FECHADO, etc.
    const country = searchParams.get('country'); // BR, CA, etc.
    const type = searchParams.get('type'); // FEDERAL, ESTADUAL, etc.
    const search = searchParams.get('search'); // Busca por nome

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (country) {
      where.country = country;
    }

    if (type) {
      where.type = type;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const editais = await prisma.edital.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: [
        { relevanceScore: 'desc' },
        { deadline: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    const total = await prisma.edital.count({ where });

    return NextResponse.json({
      editais,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Editais GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar editais' }, { status: 500 });
  }
}

// POST - Criar edital
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      source,
      sourceUrl,
      country,
      type,
      area,
      categories,
      minValue,
      maxValue,
      currency,
      deadline,
      applicationDeadline,
      status,
      eligibility,
      applicationSteps,
      requiredDocs,
      description,
      requirements,
      relevanceScore,
      matchedServices,
      matchedProjects,
      azimutFitNotes,
      contactEmail,
      contactName,
      contactPhone,
      contactLinkedIn,
    } = body;

    // Validações obrigatórias
    if (!name || !source || !sourceUrl || !country || !type || !area) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, source, sourceUrl, country, type, area' },
        { status: 400 }
      );
    }

    const edital = await prisma.edital.create({
      data: {
        name,
        source,
        sourceUrl,
        country,
        type,
        area,
        categories: categories || [],
        minValue: minValue ? parseFloat(minValue) : null,
        maxValue: maxValue ? parseFloat(maxValue) : null,
        currency: currency || 'BRL',
        deadline: deadline ? new Date(deadline) : null,
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
        status: status || 'ABERTO',
        eligibility: eligibility || null,
        applicationSteps: applicationSteps || null,
        requiredDocs: requiredDocs || [],
        description: description || null,
        requirements: requirements || null,
        relevanceScore: relevanceScore || 0,
        matchedServices: matchedServices || [],
        matchedProjects: matchedProjects || [],
        azimutFitNotes: azimutFitNotes || null,
        contactEmail: contactEmail || null,
        contactName: contactName || null,
        contactPhone: contactPhone || null,
        contactLinkedIn: contactLinkedIn || null,
      },
    });

    return NextResponse.json({ edital }, { status: 201 });
  } catch (error: any) {
    console.error('Editais POST error:', error);
    
    // Erro de validação do Prisma
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Edital já existe com esses dados' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar edital', details: error.message },
      { status: 500 }
    );
  }
}

