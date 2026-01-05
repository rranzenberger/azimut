import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/visitor/personalization
 * 
 * Retorna dados de personalização para o frontend
 * baseados na análise de IA do visitante
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    // Buscar interest score calculado pela IA
    const interestScore = await prisma.interestScore.findUnique({
      where: { sessionId },
      include: {
        session: {
          include: {
            pageViews: true,
            projectInteractions: true
          }
        }
      }
    })

    // Se não tem score ainda, retornar dados vazios
    if (!interestScore) {
      return NextResponse.json({
        visitorType: null,
        recommendedProjects: [],
        scores: {
          museum: 0,
          brand: 0,
          festival: 0,
          city: 0,
          education: 0,
          vr: 0,
          ai: 0
        },
        suggestedPage: null,
        suggestedAction: null,
        conversionScore: 0
      })
    }

    // Parse de recommendedProjects (JSON string)
    let recommendedProjects = []
    if (interestScore.recommendedProjects) {
      try {
        recommendedProjects = JSON.parse(interestScore.recommendedProjects)
      } catch (e) {
        console.error('Erro ao parsear recommendedProjects:', e)
      }
    }

    // Retornar dados estruturados
    return NextResponse.json({
      visitorType: interestScore.visitorType,
      recommendedProjects,
      scores: {
        museum: interestScore.museumScore || 0,
        brand: interestScore.brandScore || 0,
        festival: interestScore.festivalScore || 0,
        city: interestScore.cityScore || 0,
        education: interestScore.educationScore || 0,
        vr: interestScore.vrScore || 0,
        ai: interestScore.aiScore || 0
      },
      suggestedPage: interestScore.suggestedPage,
      suggestedAction: interestScore.suggestedAction,
      conversionScore: interestScore.conversionScore || 0
    })

  } catch (error) {
    console.error('Erro ao buscar personalização:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// CORS para permitir frontend acessar
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

