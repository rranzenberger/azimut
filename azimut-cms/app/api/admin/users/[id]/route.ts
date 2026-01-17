/**
 * API de Usuário Individual - Admin
 * Atualizar, deletar e trocar senha
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// GET - Buscar usuário por ID
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

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('User GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuário', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário
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

    // Verificar permissões
    const currentUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Apenas SUPER_ADMIN pode alterar outros usuários
    // Usuário pode alterar seu próprio nome/email
    const canEdit = currentUser.role === 'SUPER_ADMIN' || session.userId === id;

    if (!canEdit) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    // Validar campos permitidos
    const updateData: any = {};
    
    if ('name' in body) {
      updateData.name = body.name || null;
    }

    if ('email' in body && body.email) {
      updateData.email = body.email;
    }

    // Apenas SUPER_ADMIN pode alterar role
    if ('role' in body && currentUser.role === 'SUPER_ADMIN') {
      if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER'].includes(body.role)) {
        return NextResponse.json(
          { error: 'Role inválido' },
          { status: 400 }
        );
      }
      updateData.role = body.role;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user, message: 'Usuário atualizado com sucesso' });
  } catch (error: any) {
    console.error('User PUT error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email já existe' }, { status: 409 });
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar usuário', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Deletar usuário
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

    const { id } = params;

    // Verificar permissões
    const currentUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPER_ADMIN pode deletar usuários' },
        { status: 403 }
      );
    }

    // Não permitir deletar a si mesmo
    if (session.userId === id) {
      return NextResponse.json(
        { error: 'Não é possível deletar seu próprio usuário' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    console.error('User DELETE error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Erro ao deletar usuário', details: error.message },
      { status: 500 }
    );
  }
}

