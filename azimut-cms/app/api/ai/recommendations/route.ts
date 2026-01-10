import { NextResponse } from 'next/server'
import { analyzeWithAI } from '@/lib/ai-provider'
import { prisma } from '@/lib/prisma'

/**
 * API de Recomendações Inteligentes
 * Analisa comportamento do usuário e recomenda projetos personalizados
 */

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { 
      visitedPages = [], 
      timeSpent = {}, 
      interests = [],
      currentPage,
      sessionId 
    } = data

    // Buscar projetos do banco
    const allProjects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        heroImage: true,
        tags: true,
        services: true
      }
    })

    // Se não tiver dados de comportamento, retornar projetos em destaque
    if (visitedPages.length === 0) {
      const featured = allProjects
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .slice(0, 6)
      
      return NextResponse.json({
        projects: featured,
        reason: 'featured',
        score: 50
      })
    }

    // Usar IA para analisar comportamento e recomendar projetos
    const prompt = `
Analise o comportamento do usuário e recomende 6 projetos relevantes.

COMPORTAMENTO DO USUÁRIO:
- Páginas visitadas: ${visitedPages.join(', ')}
- Tempo em cada página: ${JSON.stringify(timeSpent)}
- Interesses detectados: ${interests.join(', ')}
- Página atual: ${currentPage}

PROJETOS DISPONÍVEIS:
${allProjects.map((p, i) => `
${i + 1}. ID: ${p.id}
   Título: ${p.title || p.slug}
   Categoria: ${p.category || 'geral'}
   Tags: ${p.tags?.map(t => t.name).join(', ') || 'N/A'}
   Destaque: ${p.featured ? 'Sim' : 'Não'}
`).join('\n')}

TAREFA:
1. Analise o comportamento do usuário
2. Identifique padrões de interesse (museus, educação, corporativo, etc)
3. Calcule score de relevância para cada projeto (0-100)
4. Retorne os 6 projetos mais relevantes

RESPONDA EM JSON:
{
  "analysis": "análise breve do comportamento",
  "detectedInterest": "tipo de interesse detectado",
  "recommendations": [
    {
      "projectId": "id-do-projeto",
      "score": 95,
      "reason": "motivo da recomendação"
    }
  ]
}
`

    const aiResponse = await analyzeWithAI(prompt, {
      temperature: 0.3,
      maxTokens: 1000
    })

    // Parse resposta da IA
    let aiResult
    try {
      aiResult = JSON.parse(aiResponse)
    } catch {
      // Fallback: retornar projetos em destaque se IA falhar
      const featured = allProjects
        .filter(p => p.featured)
        .slice(0, 6)
      
      return NextResponse.json({
        projects: featured,
        reason: 'fallback',
        score: 50
      })
    }

    // Buscar projetos recomendados pela IA
    const recommendedProjects = aiResult.recommendations
      .slice(0, 6)
      .map((rec: any) => {
        const project = allProjects.find(p => p.id === rec.projectId)
        return project ? { ...project, aiScore: rec.score, aiReason: rec.reason } : null
      })
      .filter(Boolean)

    return NextResponse.json({
      projects: recommendedProjects,
      analysis: aiResult.analysis,
      detectedInterest: aiResult.detectedInterest,
      reason: 'ai-powered',
      score: 100
    })

  } catch (error: any) {
    console.error('Error in AI recommendations:', error)
    
    // Fallback: retornar projetos aleatórios
    const projects = await prisma.project.findMany({
      where: { published: true },
      include: {
        translations: true,
        heroImage: true
      },
      take: 6
    })

    return NextResponse.json({
      projects,
      reason: 'error-fallback',
      score: 30,
      error: error.message
    })
  }
}
