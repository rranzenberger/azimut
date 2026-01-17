// ════════════════════════════════════════════════════════════
// API: ACADEMY VIDEOS
// ════════════════════════════════════════════════════════════
// Lista vídeos da Academy (VFS, VanArts, Azimut)
// Suporta filtros por categoria, seção, escola
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filtros
    const section = searchParams.get('section') // vancouver, courses, workshops, corporate, home
    const category = searchParams.get('category') // institutional, testimonial, student-work, promo
    const school = searchParams.get('school') // VFS, VanArts, Azimut
    const featured = searchParams.get('featured') === 'true'
    const lang = searchParams.get('lang') || 'pt'
    const limit = parseInt(searchParams.get('limit') || '10')

    // Construir where clause
    const where: any = {
      status: 'PUBLISHED'
    }

    if (section) {
      where.section = section.toUpperCase()
    }

    if (category) {
      where.category = category.toUpperCase().replace(/-/g, '_')
    }

    if (school) {
      where.school = school
    }

    if (featured) {
      where.featured = true
    }

    // Buscar vídeos
    const videos = await prisma.academyVideo.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    // Formatar resposta com campos localizados
    const formattedVideos = videos.map(video => ({
      id: video.id,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      type: video.type.toLowerCase(),
      title: (video as any)[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || video.titlePt,
      description: (video as any)[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || video.descriptionPt,
      category: video.category.toLowerCase().replace(/_/g, '-'),
      section: video.section.toLowerCase(),
      school: video.school,
      duration: video.duration,
      views: video.views,
      featured: video.featured,
      priority: video.priority
    }))

    return NextResponse.json({
      success: true,
      videos: formattedVideos,
      count: formattedVideos.length
    })
  } catch (error) {
    console.error('Error fetching academy videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

// Seed initial videos (para desenvolvimento)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verificar autenticação (simplificado)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const video = await prisma.academyVideo.create({
      data: body
    })

    return NextResponse.json({
      success: true,
      video
    })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}

// CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
