/**
 * API para Otimizar Todos os Projetos com SEO
 * POST /api/admin/seo/optimize-all
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { skipOptimized = true } = await request.json().catch(() => ({ skipOptimized: true }))

    // Buscar projetos sem SEO
    const whereClause: any = {
      status: 'PUBLISHED',
    }

    if (skipOptimized) {
      whereClause.OR = [
        { seoTitlePt: null },
        { seoDescPt: null },
      ]
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      take: 50,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      message: `Encontrados ${projects.length} projetos para otimizar`,
      projects: projects.length,
      note: 'Use o botão "🤖 Otimizar com IA" em cada projeto individualmente, ou execute o script otimizar-projetos-seo.ts',
    })
  } catch (error: any) {
    console.error('[Optimize SEO All] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao buscar projetos',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
