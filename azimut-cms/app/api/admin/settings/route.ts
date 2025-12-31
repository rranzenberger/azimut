/**
 * API de Configurações - Admin
 * GET e PUT de configurações globais
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// GET - Buscar configurações
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Buscar ou criar configurações padrão
    let settings = await prisma.settings.findUnique({
      where: { id: 'singleton' },
    });

    // Se não existir, criar com valores padrão
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'singleton',
          siteName: 'Azimut',
          siteUrl: 'https://azmt.com.br',
          defaultLanguage: 'pt',
          defaultCountry: 'BR',
          timezone: 'America/Sao_Paulo',
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error('Settings GET error:', error);
    
    // Verificar se é erro de tabela não existente
    if (error.code === 'P2021' || error.message?.includes('does not exist') || error.message?.includes('relation') || error.message?.includes('table')) {
      return NextResponse.json(
        { 
          error: 'Tabela Settings não encontrada',
          details: 'A migration precisa ser aplicada no banco de dados. Execute: npx prisma migrate deploy',
          code: 'MIGRATION_REQUIRED'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro ao buscar configurações', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Atualizar configurações
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();

    // Validar campos permitidos
    const allowedFields = [
      'siteName',
      'siteUrl',
      'contactEmail',
      'contactPhone',
      'defaultMetaDescription',
      'defaultKeywords',
      'ogImageUrl',
      'facebookUrl',
      'instagramUrl',
      'linkedinUrl',
      'twitterUrl',
      'youtubeUrl',
      'kabbamApiKey',
      'kabbamApiUrl',
      'smtpHost',
      'smtpPort',
      'smtpUser',
      'smtpPassword',
      'smtpFromEmail',
      'deepseekApiKey',
      'notificationEmail',
      'defaultLanguage',
      'defaultCountry',
      'timezone',
    ];

    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (field in body) {
        // Converter string vazia para null
        updateData[field] = body[field] === '' ? null : body[field];
      }
    }

    // Validar tipos
    if (updateData.smtpPort !== undefined && updateData.smtpPort !== null) {
      const port = parseInt(updateData.smtpPort);
      if (isNaN(port) || port < 1 || port > 65535) {
        return NextResponse.json(
          { error: 'Porta SMTP inválida (1-65535)' },
          { status: 400 }
        );
      }
      updateData.smtpPort = port;
    }

    // Atualizar ou criar
    const settings = await prisma.settings.upsert({
      where: { id: 'singleton' },
      update: updateData,
      create: {
        id: 'singleton',
        ...updateData,
        siteName: updateData.siteName || 'Azimut',
        siteUrl: updateData.siteUrl || 'https://azmt.com.br',
        defaultLanguage: updateData.defaultLanguage || 'pt',
        defaultCountry: updateData.defaultCountry || 'BR',
        timezone: updateData.timezone || 'America/Sao_Paulo',
      },
    });

    return NextResponse.json({ settings, message: 'Configurações atualizadas com sucesso' });
  } catch (error: any) {
    console.error('Settings PUT error:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar configurações', details: error.message },
      { status: 500 }
    );
  }
}

