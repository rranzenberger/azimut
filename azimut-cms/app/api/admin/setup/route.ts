/**
 * Endpoint temporário para rodar seed do banco
 * ⚠️ REMOVER após usar em produção!
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Verificação simples de segurança (token básico)
    const body = await request.json();
    const { token } = body;

    // Token temporário - REMOVER após usar!
    const VALID_TOKEN = 'azimut-seed-2025-setup-temp';

    if (token !== VALID_TOKEN) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    console.log('🌱 Running seed via API...');

    // 1. Criar usuário admin
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('Azimut2025!', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@azimut.com.br' },
      update: {},
      create: {
        email: 'admin@azimut.com.br',
        name: 'Admin Azimut',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });
    console.log('✅ Admin created:', admin.email);

    // 2. Verificar se já existem dados (para evitar duplicação)
    const existingMarkets = await prisma.market.count();
    if (existingMarkets === 0) {
      // Criar mercados básicos
      await prisma.market.upsert({
        where: { code: 'BR' },
        update: {},
        create: {
          code: 'BR',
          labelPt: 'Brasil',
          labelEn: 'Brazil',
          heroMessagePt: 'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos no Brasil.',
          heroMessageEn: 'Immersive, interactive and cinematic experiences for culture, brands and hybrid spaces in Brazil.',
          priority: 1,
        },
      });

      await prisma.market.upsert({
        where: { code: 'CA' },
        update: {},
        create: {
          code: 'CA',
          labelPt: 'Canadá',
          labelEn: 'Canada',
          heroMessagePt: 'Pesquisa, VR/XR e IA para museus, marcas e instituições no Canadá.',
          heroMessageEn: 'Research, VR/XR and AI for museums, brands and institutions in Canada.',
          priority: 2,
        },
      });

      await prisma.market.upsert({
        where: { code: 'DEFAULT' },
        update: {},
        create: {
          code: 'DEFAULT',
          labelPt: 'Internacional',
          labelEn: 'International',
          heroMessagePt: 'Estúdio criativo-tecnológico entre Brasil e Canadá.',
          heroMessageEn: 'Creative-tech studio between Brazil and Canada.',
          priority: 0,
        },
      });
      console.log('✅ Markets created');
    }

    return NextResponse.json({
      success: true,
      message: 'Seed executado com sucesso!',
      admin: {
        email: admin.email,
        senha: 'Azimut2025!',
      },
      warning: '⚠️ LEMBRE-SE: Remover este endpoint após usar!',
    });
  } catch (error: any) {
    console.error('❌ Seed error:', error);
    return NextResponse.json(
      {
        error: 'Erro ao executar seed',
        details: error.message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}










