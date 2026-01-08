import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const leadScore = calculateLeadScore(data)
    const priority = determinePriority(leadScore)
    const estimatedValue = estimateValue(data.budget)

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
        priority,
        leadScore,
        organizationType: data.organizationType || null,
        estimatedValue,
        interestInGrants: data.interestInGrants || false,
        country: data.country || null,
        city: data.city || null,
        sourceUrl: request.headers.get('referer') || null,
        utmSource: null, // TODO: Extract from URL
        utmMedium: null,
        utmCampaign: null
      }
    })

    // TODO: Enviar email notification para equipe
    // TODO: Enviar email confirmation para lead
    // TODO: Integrar com CRM/Webhook

    // Se score alto, pode notificar equipe imediatamente
    if (leadScore >= 70) {
      console.log(`🔥 HOT LEAD! Score: ${leadScore}`, {
        name: data.name,
        email: data.email,
        company: data.company,
        budget: data.budget
      })
      // TODO: Enviar SMS/WhatsApp/Slack para equipe
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      score: leadScore,
      priority,
      message: 'Lead received successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
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
