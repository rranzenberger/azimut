/**
 * API PÚBLICA - Sem autenticação
 * Permite que o site principal consuma conteúdo do backoffice
 * 
 * GET /api/public/page/[slug]
 * 
 * Exemplos:
 * - /api/public/page/home
 * - /api/public/page/studio/about
 * - /api/public/page/academy/courses
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

function toAbsoluteImageUrl(url: string | null | undefined, request: NextRequest): string | null {
  if (!url || !url.trim()) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const envBase = process.env.NEXT_PUBLIC_BACKOFFICE_URL
  const base = envBase && (envBase.startsWith('http://') || envBase.startsWith('https://'))
    ? envBase.replace(/\/$/, '')
    : request.nextUrl?.origin || 'https://backoffice.azmt.com.br'
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string | string[] }> | { slug: string | string[] } }
) {
  try {
    // Resolver params (pode ser Promise ou objeto direto)
    const resolvedParams = await Promise.resolve(params)
    
    // Suporta slugs com barras: studio/about -> ['studio', 'about'] -> 'studio/about'
    const slug = Array.isArray(resolvedParams.slug) 
      ? resolvedParams.slug.join('/') 
      : resolvedParams.slug

    console.log('[PUBLIC API] GET /api/public/page/[slug] - slug:', slug)

    // Buscar página no banco (somente campos públicos) + hero image para o site exibir
    const page = await prisma.page.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED' // Apenas páginas publicadas
      },
      select: {
        slug: true,
        name: true,
        heroBackgroundImageId: true,
        heroBackgroundImageUrl: true,
        heroBackgroundImage: {
          select: {
            originalUrl: true,
            mediumUrl: true,
            thumbnailUrl: true,
          },
        },
        // SEO - Todos os idiomas
        seoTitlePt: true,
        seoTitleEn: true,
        seoTitleEs: true,
        seoTitleFr: true,
        seoDescPt: true,
        seoDescEn: true,
        seoDescEs: true,
        seoDescFr: true,
        // Hero - Todos os idiomas
        heroSloganPt: true,
        heroSloganEn: true,
        heroSloganEs: true,
        heroSloganFr: true,
        heroSubtitlePt: true,
        heroSubtitleEn: true,
        heroSubtitleEs: true,
        heroSubtitleFr: true,
        // ═══ Hero Description MOBILE/DESKTOP ═══
        heroDescriptionMobilePt: true,
        heroDescriptionMobileEn: true,
        heroDescriptionMobileEs: true,
        heroDescriptionMobileFr: true,
        heroDescriptionDesktopPt: true,
        heroDescriptionDesktopEn: true,
        heroDescriptionDesktopEs: true,
        heroDescriptionDesktopFr: true,
        status: true,
        updatedAt: true,
      },
    })

    if (!page) {
      return NextResponse.json(
        { error: 'Página não encontrada ou não publicada' },
        { status: 404 }
      )
    }

    // URL da imagem hero (absoluta para o site em outro domínio carregar)
    const rawHeroUrl =
      page.heroBackgroundImage?.originalUrl ||
      page.heroBackgroundImage?.mediumUrl ||
      page.heroBackgroundImage?.thumbnailUrl ||
      page.heroBackgroundImageUrl ||
      null
    const heroImageUrl = toAbsoluteImageUrl(rawHeroUrl, request)

    // Retornar dados públicos
    return NextResponse.json({
      slug: page.slug,
      name: page.name,
      heroImageUrl,
      seo: {
        pt: {
          title: page.seoTitlePt,
          description: page.seoDescPt,
        },
        en: {
          title: page.seoTitleEn,
          description: page.seoDescEn,
        },
        es: {
          title: page.seoTitleEs,
          description: page.seoDescEs,
        },
        fr: {
          title: page.seoTitleFr,
          description: page.seoDescFr,
        },
      },
      hero: {
        pt: {
          slogan: page.heroSloganPt,
          subtitle: page.heroSubtitlePt,
          descriptionMobile: page.heroDescriptionMobilePt,
          descriptionDesktop: page.heroDescriptionDesktopPt,
        },
        en: {
          slogan: page.heroSloganEn,
          subtitle: page.heroSubtitleEn,
          descriptionMobile: page.heroDescriptionMobileEn,
          descriptionDesktop: page.heroDescriptionDesktopEn,
        },
        es: {
          slogan: page.heroSloganEs,
          subtitle: page.heroSubtitleEs,
          descriptionMobile: page.heroDescriptionMobileEs,
          descriptionDesktop: page.heroDescriptionDesktopEs,
        },
        fr: {
          slogan: page.heroSloganFr,
          subtitle: page.heroSubtitleFr,
          descriptionMobile: page.heroDescriptionMobileFr,
          descriptionDesktop: page.heroDescriptionDesktopFr,
        },
      },
      updatedAt: page.updatedAt,
    }, {
      headers: {
        // Cache por 5 minutos (300 segundos)
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        // CORS - Permitir site principal acessar
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('[PUBLIC API] Error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar página' },
      { status: 500 }
    )
  }
}

// Opções CORS para preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

