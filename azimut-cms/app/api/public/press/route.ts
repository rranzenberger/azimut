// API: /api/public/press - Imprensa / releases (área de imprensa)
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

    const items = await prisma.press.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: 'asc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: Math.min(limit, 100),
      skip: offset
    })

    const suffix = LANG_MAP[lang] || 'Pt'
    const titleKey = `title${suffix}` as keyof (typeof items)[0]
    const summaryKey = `summary${suffix}` as keyof (typeof items)[0]

    const data = items.map((item) => ({
      id: item.id,
      title: (item[titleKey] as string) || item.titlePt || item.titleEn,
      summary: (item[summaryKey] as string | null) || item.summaryPt || item.summaryEn,
      url: item.url,
      publishedAt: item.publishedAt,
      displayOrder: item.displayOrder
    }))

    return NextResponse.json({ success: true, data, total: data.length })
  } catch (error) {
    console.error('[API /public/press] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch press' },
      { status: 500 }
    )
  }
}
