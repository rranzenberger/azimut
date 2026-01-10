// ════════════════════════════════════════════════════════════
// API: SALVAR QUIZ VANCOUVER RESPONSE
// ════════════════════════════════════════════════════════════
// Salva respostas do Quiz Vancouver + resultado no CRM
// Permite vincular com Lead se já existir
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      // Session/Lead
      sessionId,
      leadEmail, // Se quiser vincular com lead existente

      // Respostas (10 perguntas)
      experience,
      english,
      goal,
      area,
      budget,
      timeline,
      portfolio,
      software,
      commitment,
      support,

      // Resultado
      score,
      readiness,
      bestSchool,
      estimatedBudget,

      // Metadata
      lang = 'pt'
    } = body

    // Validação básica
    if (!experience || !english || !goal || !area || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Buscar Lead por email (se fornecido)
    let leadId: string | null = null
    if (leadEmail) {
      const lead = await prisma.lead.findFirst({
        where: { email: leadEmail }
      })
      if (lead) {
        leadId = lead.id
      }
    }

    // Salvar resposta do Quiz
    const quizResponse = await prisma.quizVancouverResponse.create({
      data: {
        sessionId: sessionId || null,
        leadId,
        experience,
        english,
        goal,
        area,
        budget,
        timeline,
        portfolio,
        software,
        commitment,
        support,
        score,
        readiness,
        bestSchool,
        estimatedBudget,
        lang
      }
    })

    // Se vinculado a um Lead, atualizar score e campos Vancouver
    if (leadId) {
      await prisma.lead.update({
        where: { id: leadId },
        data: {
          leadScore: Math.max(score, 0), // Usar score do quiz
          targetSchool: bestSchool,
          englishLevel: english,
          hasPortfolio: portfolio,
          budgetRange: budget,
          areaInterest: area
        }
      })
    }

    return NextResponse.json({
      success: true,
      quizResponseId: quizResponse.id,
      message: 'Quiz response saved successfully'
    })
  } catch (error) {
    console.error('Error saving quiz response:', error)
    return NextResponse.json(
      { error: 'Failed to save quiz response' },
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
