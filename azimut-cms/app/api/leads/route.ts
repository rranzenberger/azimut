import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// OPTIONS handler para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    },
  })
}

// Função para calcular Lead Score (0-100)
function calculateLeadScore(data: any): number {
  let score = 0

  // ORGANIZAÇÃO (30 pontos)
  if (data.organizationType === 'governo') score += 15
  if (data.organizationType === 'museu') score += 15
  if (data.organizationType === 'fundacao') score += 12
  if (data.organizationType === 'universidade') score += 10
  if (data.organizationType === 'corporativo') score += 8

  if (data.company && data.company.length > 5) score += 10
  if (data.position && data.position.length > 3) score += 5

  // BUDGET (30 pontos)
  if (data.budget === '3m+') score += 30
  if (data.budget === '1m-3m') score += 25
  if (data.budget === '500k-1m') score += 20
  if (data.budget === '300k-500k') score += 15
  if (data.budget === '100k-300k') score += 10
  if (data.budget === 'grant') score += 20 // Alto potencial

  // TIMELINE (10 pontos)
  if (data.timeline === 'urgente') score += 10
  if (data.timeline === '6m') score += 8
  if (data.timeline === '12m') score += 6

  // PROJETO (15 pontos)
  if (data.projectType === 'museu') score += 15
  if (data.projectType === 'instalacao') score += 12
  if (data.projectType === 'vr') score += 10
  if (data.projectType === 'app') score += 8

  // DESCRIÇÃO (5 pontos)
  if (data.description && data.description.length > 50) score += 5

  // INTERESSE EM GRANTS (10 pontos - diferencial!)
  if (data.interestInGrants) score += 10

  // DADOS COMPLETOS (10 pontos)
  let fieldsComplete = 0
  if (data.phone) fieldsComplete++
  if (data.position) fieldsComplete++
  if (data.country) fieldsComplete++
  if (data.city) fieldsComplete++
  if (data.description) fieldsComplete++
  score += fieldsComplete * 2

  return Math.min(score, 100) // Cap at 100
}

// Função para estimar valor do projeto
function estimateValue(budget: string): number | null {
  const estimates: Record<string, number> = {
    '<100k': 50000,
    '100k-300k': 200000,
    '300k-500k': 400000,
    '500k-1m': 750000,
    '1m-3m': 2000000,
    '3m+': 5000000,
    'grant': 500000
  }
  return estimates[budget] || null
}

// Função para determinar prioridade
function determinePriority(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' {
  if (score >= 80) return 'URGENT'
  if (score >= 60) return 'HIGH'
  if (score >= 40) return 'MEDIUM'
  return 'LOW'
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Calcular score e prioridade
    let leadScore = calculateLeadScore(data)
    let priority = determinePriority(leadScore)
    let estimatedValue = estimateValue(data.budget)

    // ═══════════════════════════════════════════════════════════
    // 🧠 ANÁLISE INTELIGENTE COM IA (Claude/DeepSeek)
    // ═══════════════════════════════════════════════════════════
    let aiAnalysis = null
    try {
      const analyzeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/api/ai/analyze-lead`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company,
            position: data.position,
            projectType: data.projectType,
            budget: data.budget,
            timeline: data.timeline,
            description: data.description,
            source: request.headers.get('referer') || 'website',
            country: data.country,
            city: data.city,
          }),
        }
      )

      if (analyzeResponse.ok) {
        const analysisData = await analyzeResponse.json()
        aiAnalysis = analysisData.analysis
        
        // Usar análise da IA se disponível (mais precisa)
        if (aiAnalysis) {
          leadScore = aiAnalysis.leadScore || leadScore
          priority = aiAnalysis.priority || priority
          estimatedValue = aiAnalysis.estimatedValue || estimatedValue
        }
      }
    } catch (aiError) {
      console.warn('Análise IA falhou (não crítico):', aiError)
      // Continuar com score calculado manualmente
    }

    // Criar lead no banco
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        position: data.position || null,
        leadType: 'CONTACT_FORM',
        projectType: data.projectType || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        description: data.description || null,
        status: 'NEW',
        priority: priority as any,
        leadScore,
        organizationType: aiAnalysis?.organizationType || data.organizationType || null,
        estimatedValue,
        interestInGrants: data.interestInGrants || false,
        country: data.country || null,
        city: data.city || null,
        sourceUrl: request.headers.get('referer') || null,
        utmSource: null, // TODO: Extract from URL
        utmMedium: null,
        utmCampaign: null,
        // 🧠 Salvar análise completa da IA
        ...(aiAnalysis ? {
          leadIntelligence: {
            score: aiAnalysis.leadScore,
            priority: aiAnalysis.priority,
            visitorType: aiAnalysis.visitorType,
            organizationType: aiAnalysis.organizationType,
            estimatedValue: aiAnalysis.estimatedValue,
            likelihood: aiAnalysis.likelihood,
            insights: aiAnalysis.insights || [],
            recommendedActions: aiAnalysis.recommendedActions || [],
            riskFactors: aiAnalysis.riskFactors || [],
            nextBestAction: aiAnalysis.nextBestAction,
            analyzedAt: aiAnalysis.analyzedAt,
            aiProvider: aiAnalysis.aiProvider,
          }
        } : {}),
      }
    })

    // ═══════════════════════════════════════════════════════════
    // 🕵️ INVESTIGAÇÃO AUTOMÁTICA N8N (Lead Intelligence)
    // ═══════════════════════════════════════════════════════════
    try {
      const N8N_WEBHOOK_URL = process.env.N8N_LEAD_INTELLIGENCE_WEBHOOK || 
        'https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence';

      // Extrair IP do request
      const forwardedFor = request.headers.get('x-forwarded-for');
      const realIp = request.headers.get('x-real-ip');
      const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

      // Chamar N8N para investigação completa (não aguarda resposta)
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          position: data.position || null,
          formType: 'contact_form',
          projectType: data.projectType || null,
          budget: data.budget || null,
          timeline: data.timeline || null,
          description: data.description || null,
          organizationType: data.organizationType || null,
          interestInGrants: data.interestInGrants || false,
          country: data.country || null,
          city: data.city || null,
          ip: ip,
          userAgent: request.headers.get('user-agent') || 'unknown',
          sourceUrl: request.headers.get('referer') || null,
          lang: data.lang || 'pt'
        })
      }).catch(err => {
        // Log mas não interrompe o fluxo
        console.warn('N8N webhook failed (non-critical):', err)
      })
    } catch (n8nError) {
      // N8N falhou mas não é crítico
      console.warn('Failed to call N8N webhook:', n8nError)
    }

    // ═══════════════════════════════════════════════════════════
    // 📧 ENVIAR EMAILS AUTOMÁTICOS
    // ═══════════════════════════════════════════════════════════
    try {
      // Chamar API de notificação (não aguarda para não atrasar resposta)
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/notify-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          position: data.position,
          formType: 'contact_form',
          project: data.projectType,
          interest: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
          message: data.description,
          score: leadScore,
          lang: data.lang || 'pt',
          organizationType: data.organizationType,
          interestInGrants: data.interestInGrants
        })
      }).catch(err => {
        // Log mas não interrompe o fluxo
        console.warn('Email notification failed (non-critical):', err)
      })
    } catch (emailError) {
      // Email falhou mas não é crítico
      console.warn('Failed to send email notification:', emailError)
    }

    // Se score alto, log para debug
    if (leadScore >= 70) {
      console.log(`🔥 HOT LEAD! Score: ${leadScore}`, {
        name: data.name,
        email: data.email,
        company: data.company,
        budget: data.budget
      })
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      score: leadScore,
      priority,
      message: 'Lead received successfully'
    }, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
      }
    })

  } catch (error: any) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create lead',
        message: error?.message || 'Internal server error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
        }
      }
    )
  }
}

// GET - List leads (opcional, para debug)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const leads = await prisma.lead.findMany({
      take: limit,
      orderBy: [
        { leadScore: 'desc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        leadScore: true,
        budget: true,
        status: true,
        priority: true,
        createdAt: true
      }
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
