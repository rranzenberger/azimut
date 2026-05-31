// ═══════════════════════════════════════════════════════════════
// API: /api/public/team
// ═══════════════════════════════════════════════════════════════
// Retorna os membros da equipe publicados
// Suporta seleção de idioma
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/public/team
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'pt' // pt, en, es, fr

    // Buscar membros publicados, ordenados
    const members = await prisma.teamMembers.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        displayOrder: 'asc'
      }
    })

    // Mapear para o idioma correto
    const mappedMembers = members.map(member => {
      const roleKey = `role${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof member
      const credentialKey = `credential${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof member
      const bioKey = `bio${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof member

      return {
        id: member.id,
        slug: member.slug,
        name: member.name,
        role: member[roleKey] || member.rolePt || member.roleEn,
        credential: member[credentialKey] || member.credentialPt || member.credentialEn,
        bio: member[bioKey] || member.bioPt || member.bioEn,
        photoUrl: member.photoUrl,
        cardPhotoUrl: member.cardPhotoUrl || null,
        displayOrder: member.displayOrder
      }
    })

    return NextResponse.json({
      success: true,
      data: mappedMembers,
      total: mappedMembers.length,
      lang
    })

  } catch (error) {
    console.error('[API /public/team] Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch team members',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
