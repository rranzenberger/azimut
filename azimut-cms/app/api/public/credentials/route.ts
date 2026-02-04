// ═══════════════════════════════════════════════════════════════
// API: /api/public/credentials
// ═══════════════════════════════════════════════════════════════
// Retorna as credenciais/certificações publicadas
// Suporta seleção de idioma
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/public/credentials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'pt' // pt, en, es, fr

    // Buscar credenciais publicadas, ordenadas
    const credentials = await prisma.credentials.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        order: 'asc'
      }
    })

    // Mapear para o idioma correto
    const mappedCredentials = credentials.map(cred => {
      const textKey = `text${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof cred

      return {
        id: cred.id,
        icon: cred.icon,
        text: cred[textKey] || cred.textPt || cred.textEn,
        order: cred.order
      }
    })

    return NextResponse.json({
      success: true,
      data: mappedCredentials,
      total: mappedCredentials.length,
      lang
    })

  } catch (error) {
    console.error('[API /public/credentials] Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch credentials',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
