/**
 * API Pública – Configurações gerais do site
 * Sem autenticação. Retorna campos seguros.
 *
 * NOTA: Os dados do rodapé (contato, WhatsApp, redes sociais) agora ficam em
 * /api/public/footer-settings (tabela FooterSettings isolada).
 * Esta rota mantém retrocompatibilidade retornando os mesmos campos de Settings
 * para clientes antigos que ainda usem /api/public/settings.
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

    // Retrocompatibilidade: ainda retorna campos de rodapé do Settings
    // (preferir /api/public/footer-settings para dados atualizados)
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
