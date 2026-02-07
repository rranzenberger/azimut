/**
 * API de Login
 * Autentica usuário e retorna token JWT
 * Debug: logs detalhados em produção (ver Vercel Logs) quando falha.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { createAuthToken } from '@/src/lib/auth';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs'; // Necessário para usar crypto

// Diagnóstico: GET retorna info sobre módulos carregados (remover depois)
export async function GET() {
  try {
    const hasCrypto = typeof (await import('crypto')).createHmac === 'function';
    const hasBcrypt = typeof (await import('bcryptjs')).compare === 'function';
    const userCount = await prisma.user.count();
    return NextResponse.json({
      ok: true,
      crypto: hasCrypto,
      bcrypt: hasBcrypt,
      userCount,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!(process.env.JWT_SECRET || process.env.ADMIN_JWT_SECRET || process.env.NEXTAUTH_SECRET),
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message, stack: e.stack?.split('\n').slice(0, 5) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário no banco (case-insensitive)
    const emailNorm = email.toLowerCase().trim();
    let user;
    try {
      user = await prisma.user.findFirst({
        where: {
          email: { equals: emailNorm, mode: 'insensitive' },
        },
      });
    } catch (dbError: any) {
      console.error('[Login] Database error:', dbError?.message || dbError);
      return NextResponse.json(
        { error: 'Erro ao conectar ao banco de dados. Verifique DATABASE_URL e o seed.' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('[Login] 401: usuário não encontrado (email não existe no banco). Rode o seed ou /api/admin/setup.');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('[Login] 401: senha incorreta para o usuário. Use /api/admin/setup (token) ou seed-admin-user.ts para redefinir.');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Criar token JWT
    const token = createAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Criar resposta com cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Definir cookie com token
    response.cookies.set('azimut_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}
