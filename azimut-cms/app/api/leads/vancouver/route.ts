import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateInterestScores } from '@/lib/ai-scoring'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar campos obrigatórios
    const requiredFields = ['name', 'email', 'whatsapp', 'age', 'city', 'currentSituation', 'targetSchool', 'areaInterest', 'intakeYear', 'englishLevel', 'hasPortfolio', 'budgetRange', 'fundingSource', 'howHeard']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos obrigatórios faltando: ${missingFields.join(', ')}` },
        { status: 400, headers: corsHeaders }
      )
    }

    // Calcular score baseado nos dados
    let leadScore = 50 // Base score

    // Score por escola (VFS é mais cara, mas mais prestigiada)
    if (body.targetSchool === 'vfs') leadScore += 15
    if (body.targetSchool === 'vanarts') leadScore += 20 // VanArts é mais acessível, priorizar
    if (body.targetSchool === 'nao-sei') leadScore += 10

    // Score por timeline (mais próximo = mais urgente)
    if (body.intakeYear === '2026') leadScore += 20
    if (body.intakeYear === '2027') leadScore += 15
    if (body.intakeYear === '2028') leadScore += 10
    if (body.intakeYear === 'nao-sei') leadScore += 5

    // Score por inglês (melhor inglês = mais pronto)
    if (body.englishLevel === 'fluente') leadScore += 15
    if (body.englishLevel === 'avancado') leadScore += 12
    if (body.englishLevel === 'intermediario') leadScore += 8
    if (body.englishLevel === 'iniciante') leadScore += 3

    // Score por portfolio
    if (body.hasPortfolio === 'sim-completo') leadScore += 15
    if (body.hasPortfolio === 'sim-precisa-melhorar') leadScore += 10
    if (body.hasPortfolio === 'comecando') leadScore += 5
    if (body.hasPortfolio === 'nao-tenho') leadScore += 2

    // Score por orçamento (maior orçamento = mais pronto)
    if (body.budgetRange === 'acima-300k') leadScore += 15
    if (body.budgetRange === '200k-300k') leadScore += 12
    if (body.budgetRange === '100k-200k') leadScore += 8
    if (body.budgetRange === 'ate-100k') leadScore += 5
    if (body.budgetRange === 'bolsa') leadScore += 3

    // Score por fonte de recursos
    if (body.fundingSource === 'familia') leadScore += 10
    if (body.fundingSource === 'economia-propria') leadScore += 8
    if (body.fundingSource === 'combinacao') leadScore += 7
    if (body.fundingSource === 'financiamento') leadScore += 5
    if (body.fundingSource === 'bolsa') leadScore += 3

    // Normalizar score (máximo 100)
    leadScore = Math.min(leadScore, 100)

    // Determinar prioridade baseada no score
    let priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' = 'MEDIUM'
    if (leadScore >= 80) priority = 'URGENT'
    else if (leadScore >= 65) priority = 'HIGH'
    else if (leadScore >= 45) priority = 'MEDIUM'
    else priority = 'LOW'

    // Criar lead no banco
    const lead = await prisma.lead.create({
      data: {
        // Campos básicos
        name: body.name,
        email: body.email,
        phone: body.whatsapp,
        leadType: 'VANCOUVER',
        status: 'NEW',
        priority,
        leadScore,
        
        // Campos Vancouver específicos
        age: parseInt(body.age),
        city: body.city,
        currentSituation: body.currentSituation,
        targetSchool: body.targetSchool,
        areaInterest: body.areaInterest,
        intakeYear: body.intakeYear,
        englishLevel: body.englishLevel,
        hasPortfolio: body.hasPortfolio,
        budgetRange: body.budgetRange,
        fundingSource: body.fundingSource,
        howHeard: body.howHeard,
        comments: body.comments || null,
        
        // Metadata
        sourceUrl: request.headers.get('referer') || 'https://azmt.com.br/vancouver',
        referrer: request.headers.get('referer') || null,
        country: body.city?.includes(',') ? body.city.split(',').pop()?.trim() : null, // Extrair país da cidade
      },
    })

    // TODO: Enviar email de confirmação para o lead
    // TODO: Enviar notificação para a equipe Azimut

    console.log(`✅ Lead Vancouver criado: ${lead.id} (Score: ${leadScore}, Priority: ${priority})`)

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: 'Interesse recebido com sucesso! Entraremos em contato em breve.',
      },
      { status: 201, headers: corsHeaders }
    )
  } catch (error: any) {
    console.error('❌ Error creating Vancouver lead:', error)
    
    return NextResponse.json(
      {
        error: 'Erro ao processar seu interesse. Por favor, tente novamente.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
