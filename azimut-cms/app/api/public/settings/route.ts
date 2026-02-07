/**
 * API Pública – Configurações do rodapé (contato, WhatsApp, redes)
 * Sem autenticação. Retorna só campos seguros para o site.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const row = await prisma.settings.findUnique({
      where: { id: 'singleton' },
    });

    if (!row) {
      return NextResponse.json({
        contactEmail: null,
        whatsappNumber: null,
        instagramUrl: null,
        youtubeUrl: null,
        linkedinUrl: null,
        vimeoUrl: null,
        behanceUrl: null,
      });
    }

    return NextResponse.json({
      contactEmail: row.contactEmail ?? null,
      whatsappNumber: row.whatsappNumber ?? row.contactPhone ?? null,
      instagramUrl: row.instagramUrl ?? null,
      youtubeUrl: row.youtubeUrl ?? null,
      linkedinUrl: row.linkedinUrl ?? null,
      vimeoUrl: row.vimeoUrl ?? null,
      behanceUrl: row.behanceUrl ?? null,
    });
  } catch (e) {
    console.warn('[public/settings]', e);
    return NextResponse.json({
      contactEmail: null,
      whatsappNumber: null,
      instagramUrl: null,
      youtubeUrl: null,
      linkedinUrl: null,
      vimeoUrl: null,
      behanceUrl: null,
    });
  }
}
