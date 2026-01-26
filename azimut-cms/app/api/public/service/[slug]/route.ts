/**
 * API PÚBLICA - Sem autenticação
 * Retorna um serviço específico por slug
 * 
 * GET /api/public/service/[slug]
 * 
 * Exemplos:
 * - /api/public/service/cinema-audiovisual
 * - /api/public/service/consultoria-estrategia
 * - /api/public/service/educacao-treinamento
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    // Resolver params (pode ser Promise ou objeto direto)
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug

    console.log('[PUBLIC API] GET /api/public/service/[slug] - slug:', slug)

    // Buscar serviço no banco (somente campos públicos)
    const service = await prisma.service.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED' // Apenas serviços publicados
      },
      select: {
        slug: true,
        titlePt: true,
        titleEn: true,
        titleEs: true,
        titleFr: true,
        descriptionPt: true,
        descriptionEn: true,
        descriptionEs: true,
        descriptionFr: true,
        icon: true,
        segments: true,
        status: true,
        priority: true,
        updatedAt: true,
      },
    })

    if (!service) {
      return NextResponse.json(
        { error: 'Serviço não encontrado ou não publicado' },
        { status: 404 }
      )
    }

    // Retornar dados públicos
    return NextResponse.json(service, {
      headers: {
        // Cache por 10 minutos (600 segundos)
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        // CORS - Permitir site principal acessar
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('[PUBLIC API] Error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar serviço' },
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
