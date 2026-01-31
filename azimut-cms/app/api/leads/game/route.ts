/**
 * API de Leads do Empathy Engine (jogo)
 * POST /api/leads/game
 * Recebe nome, email e tipo (save | nft | consulting) com origem empathy_engine.
 * Cria lead com leadType EMPATHY_ENGINE, dispara n8n e notificação.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

const GAME_LEAD_TYPE_LABELS: Record<string, string> = {
  save: 'Salvar Progresso',
  nft: 'Receber NFT',
  consulting: 'Consultoria Grátis',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400, headers: corsHeaders }
      )
    }

    if (!body.email || !body.email.trim()) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400, headers: corsHeaders }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400, headers: corsHeaders }
      )
    }

    const gameLeadType = ['save', 'nft', 'consulting'].includes(body.type) ? body.type : 'save'
    const typeLabel = GAME_LEAD_TYPE_LABELS[gameLeadType] || gameLeadType
    const description = `Empathy Engine — ${typeLabel}`

    // Score base para leads do jogo (engajamento = interesse)
    const leadScore = gameLeadType === 'nft' ? 65 : gameLeadType === 'consulting' ? 70 : 55
    const priority = leadScore >= 70 ? 'HIGH' : leadScore >= 55 ? 'MEDIUM' : 'LOW'

    const lead = await prisma.lead.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim(),
        phone: null,
        company: null,
        position: null,
        leadType: 'EMPATHY_ENGINE',
        projectType: null,
        budget: null,
        timeline: null,
        description,
        status: 'NEW',
        priority: priority as any,
        leadScore,
        sourceUrl: body.sourceUrl || request.headers.get('referer') || null,
        country: body.country || null,
        city: body.city || null,
        leadIntelligence: {
          origin: 'empathy_engine',
          gameLeadType,
          lang: body.lang || 'pt',
          userAgent: request.headers.get('user-agent') || undefined,
        },
      },
    })

    // N8N webhook (mesmo fluxo de lead-intelligence)
    const N8N_WEBHOOK_URL = process.env.N8N_LEAD_INTELLIGENCE_WEBHOOK ||
      'https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence'
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'

    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: lead.id,
        name: lead.name,
        email: lead.email,
        formType: 'empathy_engine',
        origin: 'empathy_engine',
        gameLeadType,
        description,
        leadScore,
        lang: body.lang || 'pt',
        ip,
        userAgent: request.headers.get('user-agent') || 'unknown',
        sourceUrl: body.sourceUrl || request.headers.get('referer') || null,
      }),
    }).catch((err) => {
      console.warn('N8N webhook (game lead) failed (non-critical):', err)
    })

    // Notificação por email (mesmo host do backoffice)
    const origin = request.headers.get('x-forwarded-host')
      ? `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('x-forwarded-host')}`
      : new URL(request.url).origin
    fetch(`${origin}/api/notify-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        formType: 'empathy_engine_game',
        message: description,
        score: leadScore,
        lang: body.lang || 'pt',
      }),
    }).catch((err) => {
      console.warn('Notify-form (game lead) failed (non-critical):', err)
    })

    if (leadScore >= 65) {
      console.log(`🔥 Lead Empathy Engine (${gameLeadType}): ${lead.email} — Score: ${leadScore}`)
    }

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        score: leadScore,
        message: 'Lead recebido com sucesso',
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    )
  } catch (error: any) {
    console.error('Error creating game lead:', error)
    return NextResponse.json(
      {
        error: 'Falha ao salvar lead',
        message: error?.message || 'Erro interno',
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    )
  }
}
