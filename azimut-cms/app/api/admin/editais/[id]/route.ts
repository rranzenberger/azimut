/**
 * API de Edital Individual
 * GET, PUT, DELETE de um edital específico
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Buscar edital por ID
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

    const edital = await prisma.edital.findUnique({
      where: { id: params.id },
      include: {
        leads: {
          include: {
            lead: {
              select: {
                id: true,
                name: true,
                email: true,
                company: true,
              },
            },
          },
        },
      },
    });

    if (!edital) {
      return NextResponse.json({ error: 'Edital não encontrado' }, { status: 404 });
    }

    return NextResponse.json(edital);
  } catch (error) {
    console.error('Edital GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar edital' }, { status: 500 });
  }
}

// PUT - Atualizar edital
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
      lastChecked,
    } = body;

    // Verificar se edital existe
    const existingEdital = await prisma.edital.findUnique({
      where: { id: params.id },
    });

    if (!existingEdital) {
      return NextResponse.json({ error: 'Edital não encontrado' }, { status: 404 });
    }

    // Preparar dados para atualização (apenas campos fornecidos)
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (source !== undefined) updateData.source = source;
    if (sourceUrl !== undefined) updateData.sourceUrl = sourceUrl;
    if (country !== undefined) updateData.country = country;
    if (type !== undefined) updateData.type = type;
    if (area !== undefined) updateData.area = area;
    if (categories !== undefined) updateData.categories = categories;
    if (minValue !== undefined) updateData.minValue = minValue ? parseFloat(minValue) : null;
    if (maxValue !== undefined) updateData.maxValue = maxValue ? parseFloat(maxValue) : null;
    if (currency !== undefined) updateData.currency = currency;
    if (deadline !== undefined) updateData.deadline = deadline ? new Date(deadline) : null;
    if (applicationDeadline !== undefined) updateData.applicationDeadline = applicationDeadline ? new Date(applicationDeadline) : null;
    if (status !== undefined) updateData.status = status;
    if (eligibility !== undefined) updateData.eligibility = eligibility;
    if (applicationSteps !== undefined) updateData.applicationSteps = applicationSteps;
    if (requiredDocs !== undefined) updateData.requiredDocs = requiredDocs;
    if (description !== undefined) updateData.description = description;
    if (requirements !== undefined) updateData.requirements = requirements;
    if (relevanceScore !== undefined) updateData.relevanceScore = relevanceScore;
    if (matchedServices !== undefined) updateData.matchedServices = matchedServices;
    if (matchedProjects !== undefined) updateData.matchedProjects = matchedProjects;
    if (azimutFitNotes !== undefined) updateData.azimutFitNotes = azimutFitNotes;
    if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
    if (contactName !== undefined) updateData.contactName = contactName;
    if (contactPhone !== undefined) updateData.contactPhone = contactPhone;
    if (contactLinkedIn !== undefined) updateData.contactLinkedIn = contactLinkedIn;
    if (lastChecked !== undefined) updateData.lastChecked = lastChecked ? new Date(lastChecked) : null;

    const edital = await prisma.edital.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ edital });
  } catch (error: any) {
    console.error('Edital PUT error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Edital não encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar edital', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Deletar edital
export async function DELETE(
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

    // Verificar se edital existe
    const existingEdital = await prisma.edital.findUnique({
      where: { id: params.id },
    });

    if (!existingEdital) {
      return NextResponse.json({ error: 'Edital não encontrado' }, { status: 404 });
    }

    await prisma.edital.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Edital deletado com sucesso' });
  } catch (error: any) {
    console.error('Edital DELETE error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Edital não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Erro ao deletar edital' }, { status: 500 });
  }
}

