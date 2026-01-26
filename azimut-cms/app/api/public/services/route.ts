/**
 * API PÚBLICA - Sem autenticação
 * Retorna lista de serviços publicados
 * 
 * GET /api/public/services
 * Query params:
 * - segments: filtrar por categorias (ex: ?segments=education,training)
 * 
 * Exemplos:
 * - /api/public/services
 * - /api/public/services?segments=education,training
 * - /api/public/services?segments=consulting,strategy
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const segmentsParam = searchParams.get('segments')

    console.log('[PUBLIC API] GET /api/public/services - segments:', segmentsParam)

    // Construir filtro de segments se fornecido
    const where: any = {
      status: 'PUBLISHED', // Apenas publicados
    }

    if (segmentsParam) {
      const segmentsArray = segmentsParam.split(',').map(s => s.trim())
      // Filtrar serviços que TÊM PELO MENOS UM dos segments fornecidos
      where.segments = {
        hasSome: segmentsArray,
      }
    }

    // Buscar serviços no banco
    const services = await prisma.service.findMany({
      where,
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
      orderBy: [
        { priority: 'asc' },
        { titlePt: 'asc' },
      ],
    })

    console.log(`[PUBLIC API] Retornando ${services.length} serviços`)

    // Retornar lista
    return NextResponse.json(services, {
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
      { error: 'Erro ao buscar serviços' },
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
