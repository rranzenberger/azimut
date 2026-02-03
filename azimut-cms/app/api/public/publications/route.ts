// API: /api/public/publications - Publicações (Research & Lab)
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const LANG_MAP = { pt: 'Pt', en: 'En', es: 'Es', fr: 'Fr' } as const

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = (searchParams.get('lang') || 'pt') as 'pt' | 'en' | 'es' | 'fr'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : undefined

    const items = await prisma.publication.findMany({
      where: {
        isPublished: true,
        ...(year != null && { year })
      },
      orderBy: [{ displayOrder: 'asc' }, { year: 'desc' }, { createdAt: 'desc' }],
      take: Math.min(limit, 100),
      skip: offset
    })

    const suffix = LANG_MAP[lang] || 'Pt'
    const titleKey = `title${suffix}` as keyof (typeof items)[0]

    const data = items.map((item) => ({
      id: item.id,
      title: (item[titleKey] as string) || item.titlePt || item.titleEn,
      authors: item.authors,
      url: item.url,
      year: item.year,
      displayOrder: item.displayOrder
    }))

    return NextResponse.json({ success: true, data, total: data.length })
  } catch (error) {
    console.error('[API /public/publications] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch publications' },
      { status: 500 }
    )
  }
}
