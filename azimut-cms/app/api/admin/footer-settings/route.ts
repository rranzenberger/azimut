/**
 * API Admin – Rodapé (FooterSettings)
 * GET: retorna dados do rodapé
 * PUT: atualiza dados do rodapé
 * Requer autenticação.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/src/lib/prisma';
import { verifyAuthToken } from '@/src/lib/auth';

export const runtime = 'nodejs';

const ALLOWED_FIELDS = [
  'contactEmail',
  'contactPhone',
  'whatsappNumber',
  'instagramUrl',
  'youtubeUrl',
  'linkedinUrl',
  'vimeoUrl',
  'behanceUrl',
  'facebookUrl',
  'twitterUrl',
] as const;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    let footer = await prisma.footerSettings.findUnique({
      where: { id: 'singleton' },
    });

    if (!footer) {
      // Tentar copiar dados existentes de Settings (migração automática)
      try {
        const settings = await prisma.settings.findUnique({
          where: { id: 'singleton' },
        });
        footer = await prisma.footerSettings.create({
          data: {
            id: 'singleton',
            contactEmail: settings?.contactEmail || null,
            contactPhone: settings?.contactPhone || null,
            whatsappNumber: settings?.whatsappNumber || null,
            instagramUrl: settings?.instagramUrl || null,
            youtubeUrl: settings?.youtubeUrl || null,
            linkedinUrl: settings?.linkedinUrl || null,
            vimeoUrl: settings?.vimeoUrl || null,
            behanceUrl: settings?.behanceUrl || null,
            facebookUrl: settings?.facebookUrl || null,
            twitterUrl: settings?.twitterUrl || null,
          },
        });
      } catch {
        footer = await prisma.footerSettings.create({
          data: { id: 'singleton' },
        });
      }
    }

    return NextResponse.json(footer);
  } catch (error: any) {
    console.error('[FooterSettings GET]', error.message);
    return NextResponse.json({ error: 'Erro ao buscar rodapé' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();

    // Filtrar apenas campos permitidos
    const data: Record<string, string | null> = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in body) {
        const val = body[field];
        data[field] = typeof val === 'string' && val.trim() ? val.trim() : null;
      }
    }

    const footer = await prisma.footerSettings.upsert({
      where: { id: 'singleton' },
      update: data,
      create: { id: 'singleton', ...data },
    });

    return NextResponse.json(footer);
  } catch (error: any) {
    console.error('[FooterSettings PUT]', error.message);
    return NextResponse.json({ error: 'Erro ao salvar rodapé' }, { status: 500 });
  }
}
