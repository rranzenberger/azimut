/**
 * API para Trocar Senha de Usuário
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// PUT - Trocar senha
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
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validação
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Nova senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Nova senha e confirmação não coincidem' },
        { status: 400 }
      );
    }

    // Verificar permissões
    const currentUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { password: true },
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Se não for o próprio usuário, precisa ser SUPER_ADMIN
    if (session.userId !== id && currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPER_ADMIN pode alterar senha de outros usuários' },
        { status: 403 }
      );
    }

    // Se for o próprio usuário, verificar senha atual
    if (session.userId === id) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Senha atual é obrigatória' },
          { status: 400 }
        );
      }

      const isValidPassword = await bcrypt.compare(currentPassword, targetUser.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Senha atual incorreta' },
          { status: 400 }
        );
      }
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Senha alterada com sucesso' });
  } catch (error: any) {
    console.error('Password change error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Erro ao alterar senha', details: error.message },
      { status: 500 }
    );
  }
}

