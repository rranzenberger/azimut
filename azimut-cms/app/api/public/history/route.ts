// ═══════════════════════════════════════════════════════════════
// API: /api/public/history
// ═══════════════════════════════════════════════════════════════
// Retorna a timeline histórica da empresa (CompanyHistory)
// Suporta filtros por tipo, ano, e seleção de idioma
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/public/history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parâmetros de query
    const lang = searchParams.get('lang') || 'pt' // pt, en, es, fr
    const type = searchParams.get('type') // milestone, partnership, project, award, location, other
    const featured = searchParams.get('featured') === 'true'
    const yearStart = searchParams.get('yearStart') ? parseInt(searchParams.get('yearStart')!) : undefined
    const yearEnd = searchParams.get('yearEnd') ? parseInt(searchParams.get('yearEnd')!) : undefined

    // Buscar do banco
    const history = await prisma.companyHistory.findMany({
      where: {
        isPublished: true,
        ...(type && { type: type as any }),
        ...(featured !== undefined && { isFeatured: featured }),
        ...(yearStart && { year: { gte: yearStart } }),
        ...(yearEnd && { year: { lte: yearEnd } })
      },
      orderBy: [
        { year: 'asc' },
        { displayOrder: 'asc' }
      ]
    })

    // Mapear para o idioma correto
    const mappedHistory = history.map(item => {
      const titleKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof item
      const descKey = `description${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof item
      const bulletsKey = `bullets${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof item

      return {
        id: item.id,
        year: item.year,
        yearEnd: item.yearEnd,
        period: item.yearEnd ? `${item.year}-${item.yearEnd}` : `${item.year}`,
        type: item.type,
        title: item[titleKey] || item.titlePt || item.titleEn,
        description: item[descKey] || item.descriptionPt || item.descriptionEn,
        bullets: (item[bulletsKey] as string[] | undefined) || item.bulletsPt || item.bulletsEn || [],
        icon: item.icon,
        logoUrl: item.logoUrl,
        externalLink: item.externalLink,
        isFeatured: item.isFeatured
      }
    })

    // Estatísticas
    const stats = {
      total: mappedHistory.length,
      featured: mappedHistory.filter(h => h.isFeatured).length,
      types: {
        milestone: mappedHistory.filter(h => h.type === 'milestone').length,
        partnership: mappedHistory.filter(h => h.type === 'partnership').length,
        project: mappedHistory.filter(h => h.type === 'project').length,
        award: mappedHistory.filter(h => h.type === 'award').length,
        location: mappedHistory.filter(h => h.type === 'location').length,
        other: mappedHistory.filter(h => h.type === 'other').length
      },
      yearRange: {
        start: history[0]?.year || null,
        end: history[history.length - 1]?.year || null
      }
    }

    return NextResponse.json({
      success: true,
      data: mappedHistory,
      stats,
      filters: {
        lang,
        type,
        featured,
        yearStart,
        yearEnd
      }
    })

  } catch (error) {
    console.error('[API /history] Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch company history',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
