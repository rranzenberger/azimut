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

    // Buscar página no banco (somente campos públicos)
    const page = await prisma.page.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED' // Apenas páginas publicadas
      },
      select: {
        slug: true,
        name: true,
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

    // Retornar dados públicos
    return NextResponse.json({
      slug: page.slug,
      name: page.name,
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
        },
        en: {
          slogan: page.heroSloganEn,
          subtitle: page.heroSubtitleEn,
        },
        es: {
          slogan: page.heroSloganEs,
          subtitle: page.heroSubtitleEs,
        },
        fr: {
          slogan: page.heroSloganFr,
          subtitle: page.heroSubtitleFr,
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

