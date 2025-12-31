/**
 * API de Usuários - Admin
 * Listar e criar usuários
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// GET - Listar usuários
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Verificar se é SUPER_ADMIN ou ADMIN
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // NÃO retornar password
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Users GET error:', error);
    return NextResponse.json(
      { error: 'Erro ao listar usuários', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Criar usuário
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Verificar se é SUPER_ADMIN
    const currentUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Apenas SUPER_ADMIN pode criar usuários' }, { status: 403 });
    }

    const body = await request.json();
    const { email, name, password, role } = body;

    // Validação
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (!['ADMIN', 'EDITOR', 'VIEWER'].includes(role)) {
      return NextResponse.json(
        { error: 'Role inválido. Use: ADMIN, EDITOR, VIEWER' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        role: role || 'EDITOR',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    console.error('Users POST error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email já existe' }, { status: 409 });
    }

    return NextResponse.json(
      { error: 'Erro ao criar usuário', details: error.message },
      { status: 500 }
    );
  }
}

