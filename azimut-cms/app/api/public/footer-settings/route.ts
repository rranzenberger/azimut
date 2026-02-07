/**
 * API Pública – Rodapé (contato, WhatsApp, redes sociais)
 * Sem autenticação. Retorna campos seguros para o site.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    let footer = await prisma.footerSettings.findUnique({
      where: { id: 'singleton' },
    });

    // Fallback: se tabela FooterSettings não existir ou estiver vazia,
    // tenta ler de Settings (retrocompatibilidade)
    if (!footer) {
      try {
        const settings = await prisma.settings.findUnique({
          where: { id: 'singleton' },
        });
        if (settings) {
          return NextResponse.json({
            contactEmail: settings.contactEmail ?? null,
            whatsappNumber: settings.whatsappNumber ?? settings.contactPhone ?? null,
            instagramUrl: settings.instagramUrl ?? null,
            youtubeUrl: settings.youtubeUrl ?? null,
            linkedinUrl: settings.linkedinUrl ?? null,
            vimeoUrl: settings.vimeoUrl ?? null,
            behanceUrl: settings.behanceUrl ?? null,
          });
        }
      } catch {
        // Settings também não existe – retornar tudo null
      }

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
      contactEmail: footer.contactEmail ?? null,
      whatsappNumber: footer.whatsappNumber ?? footer.contactPhone ?? null,
      instagramUrl: footer.instagramUrl ?? null,
      youtubeUrl: footer.youtubeUrl ?? null,
      linkedinUrl: footer.linkedinUrl ?? null,
      vimeoUrl: footer.vimeoUrl ?? null,
      behanceUrl: footer.behanceUrl ?? null,
    });
  } catch (error: any) {
    console.error('[PublicFooterSettings]', error.message);
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
