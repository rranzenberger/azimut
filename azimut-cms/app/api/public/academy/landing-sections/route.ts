/**
 * API PÚBLICA - 4 seções da página Academy (Vancouver, Cursos, Workshops, Corporate)
 * O site usa para exibir os 4 cards com imagem e textos do backoffice.
 * GET /api/public/academy/landing-sections
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

const SLUGS = ['academy/vancouver', 'academy/courses', 'academy/workshops', 'academy/corporate'] as const;

/** Retorna URL absoluta para o site (outro domínio) poder carregar a imagem do backoffice */
function toAbsoluteImageUrl(url: string | null | undefined, request: NextRequest): string | null {
  if (!url || !url.trim()) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const envBase = process.env.NEXT_PUBLIC_BACKOFFICE_URL;
  const base = envBase && (envBase.startsWith('http://') || envBase.startsWith('https://'))
    ? envBase.replace(/\/$/, '')
    : request.nextUrl?.origin || 'https://backoffice.azmt.com.br';
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`;
}

export async function GET(request: NextRequest) {
  try {
    // Incluir páginas PUBLISHED; se não existir página para um slug, ainda retornamos a seção (heroImageUrl null)
    const pages = await prisma.page.findMany({
      where: {
        slug: { in: [...SLUGS] },
        status: 'PUBLISHED',
      },
      select: {
        slug: true,
        name: true,
        heroBackgroundImageUrl: true,
        heroBackgroundImage: {
          select: {
            originalUrl: true,
            mediumUrl: true,
            thumbnailUrl: true,
          },
        },
        heroSloganPt: true,
        heroSloganEn: true,
        heroSubtitlePt: true,
        heroSubtitleEn: true,
        heroDescriptionDesktopPt: true,
        heroDescriptionDesktopEn: true,
      },
      orderBy: { slug: 'asc' },
    });

    const sections = SLUGS.map((slug) => {
      const page = pages.find((p) => p.slug === slug);
      const rawUrl =
        page?.heroBackgroundImage?.originalUrl ||
        page?.heroBackgroundImage?.mediumUrl ||
        page?.heroBackgroundImage?.thumbnailUrl ||
        page?.heroBackgroundImageUrl ||
        null;
      const heroImageUrl = toAbsoluteImageUrl(rawUrl, request);
      return {
        slug,
        name: page?.name || slug,
        heroImageUrl,
        heroSlogan: { pt: page?.heroSloganPt, en: page?.heroSloganEn },
        heroSubtitle: { pt: page?.heroSubtitlePt, en: page?.heroSubtitleEn },
        heroDescription: { pt: page?.heroDescriptionDesktopPt, en: page?.heroDescriptionDesktopEn },
      };
    });

    return NextResponse.json({ sections }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    console.error('Public academy landing-sections GET:', e);
    return NextResponse.json({ error: 'Erro ao listar seções' }, { status: 500 });
  }
}
