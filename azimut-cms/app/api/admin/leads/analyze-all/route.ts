/**
 * API para Analisar Todos os Leads com IA
 * POST /api/admin/leads/analyze-all
 * 
 * Analisa todos os leads sem análise e atualiza com insights da IA
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = cookies()
    const token = cookieStore.get('azimut_admin_token')?.value
    const session = token ? verifyAuthToken(token) : null

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { limit = 50 } = await request.json().catch(() => ({ limit: 50 }))

    // Buscar leads sem análise ou com análise antiga
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { leadIntelligence: null },
          { leadScore: 0 },
        ],
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    console.log(`📊 Analisando ${leads.length} leads com IA...`)

    const results = {
      analyzed: 0,
      errors: 0,
      skipped: 0,
    }

    for (const lead of leads) {
      try {
        // Chamar API de análise
        const analyzeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/api/ai/analyze-lead`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              company: lead.company,
              position: lead.position,
              projectType: lead.projectType,
              budget: lead.budget,
              timeline: lead.timeline,
              description: lead.description,
              source: lead.sourceUrl || 'website',
              country: lead.country,
              city: lead.city,
            }),
          }
        )

        if (!analyzeResponse.ok) {
          console.error(`Erro ao analisar lead ${lead.id}`)
          results.errors++
          continue
        }

        const { analysis } = await analyzeResponse.json()

        // Atualizar lead com análise
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            leadScore: analysis.leadScore,
            priority: analysis.priority as any,
            organizationType: analysis.organizationType,
            estimatedValue: analysis.estimatedValue,
            leadIntelligence: analysis as any,
          },
        })

        results.analyzed++
        
        // Aguardar entre requisições
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error: any) {
        console.error(`Erro ao processar lead ${lead.id}:`, error.message)
        results.errors++
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Analisados ${results.analyzed} leads com sucesso`,
    })
  } catch (error: any) {
    console.error('[Analyze All Leads] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao analisar leads',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
