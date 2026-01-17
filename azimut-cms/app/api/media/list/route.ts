import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filtros
    const folder = searchParams.get('folder')
    const type = searchParams.get('type') // IMAGE | VIDEO
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const orderBy = searchParams.get('orderBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'

    // Construir where clause
    const where: any = {}
    
    // Removido: folder não existe no schema
    // if (folder) {
    //   where.folder = folder
    // }
    
    if (type) {
      where.type = type
    }
    
    if (search) {
      where.OR = [
        { altPt: { contains: search, mode: 'insensitive' } },
        { altEn: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Buscar mídia
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { [orderBy as string]: order },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          type: true,
          originalUrl: true,
          thumbnailUrl: true,
          mediumUrl: true,
          largeUrl: true,
          webpUrl: true,
          avifUrl: true,
          width: true,
          height: true,
          sizeBytes: true,
          durationSeconds: true,
          format: true,
          contentType: true,
          altPt: true,
          altEn: true,
          altEs: true,
          altFr: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.media.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: media,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: unknown) {
    console.error('Media list error:', error)
    const err = error as { message?: string }
    return NextResponse.json(
      { error: err.message || 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
