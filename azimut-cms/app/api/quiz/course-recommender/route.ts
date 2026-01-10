// ════════════════════════════════════════════════════════════
// API: SALVAR COURSE RECOMMENDER RESPONSE
// ════════════════════════════════════════════════════════════
// Salva respostas do Recomendador de Cursos + resultado no CRM
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

      // Respostas (5 perguntas)
      experience,
      goal,
      time,
      budget,
      interest,

      // Top 3 Cursos recomendados
      course1Id,
      course1Match,
      course2Id,
      course2Match,
      course3Id,
      course3Match,

      // Metadata
      lang = 'pt'
    } = body

    // Validação básica
    if (!experience || !goal || !time || !budget || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!course1Id || !course2Id || !course3Id) {
      return NextResponse.json(
        { error: 'Missing course recommendations' },
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

    // Salvar resposta do Recomendador
    const recommendationResponse = await prisma.courseRecommendationResponse.create({
      data: {
        sessionId: sessionId || null,
        leadId,
        experience,
        goal,
        time,
        budget,
        interest,
        course1Id,
        course1Match,
        course2Id,
        course2Match,
        course3Id,
        course3Match,
        lang
      }
    })

    // Se vinculado a um Lead, atualizar informações relevantes
    if (leadId) {
      // Calcular score baseado no match médio
      const avgMatch = Math.round((course1Match + course2Match + course3Match) / 3)
      
      await prisma.lead.update({
        where: { id: leadId },
        data: {
          leadScore: Math.max(avgMatch, 0),
          // Salvar interesse principal nos comments
          comments: `Interesse em: ${interest}. Curso recomendado: ${course1Id} (${course1Match}% match)`
        }
      })
    }

    return NextResponse.json({
      success: true,
      recommendationId: recommendationResponse.id,
      message: 'Course recommendation saved successfully'
    })
  } catch (error) {
    console.error('Error saving course recommendation:', error)
    return NextResponse.json(
      { error: 'Failed to save course recommendation' },
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
