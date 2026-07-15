/**
 * API PÚBLICA — recebe o log de diagnóstico do app GigRadar (beta)
 * POST /api/public/gigradar-log
 *
 * O testador aperta "Enviar log" no app; o app manda um JSON já redigido/seguro
 * (sem OCR bruto, sem endereço) direto pra cá em vez de só ir pro WhatsApp.
 *
 * Proteção: header X-API-Key precisa bater com GIGRADAR_LOG_KEY (env). Diferente
 * dos outros endpoints públicos deste backoffice (que não têm trava nenhuma), este
 * grava dado vindo de fora sem ligação a um usuário logado, então mantém uma chave
 * mínima — só pra não virar uma caixa de entrada aberta pra qualquer um.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { analyzeWithAI } from '@/src/lib/ai-provider'

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
    const expectedKey = process.env.GIGRADAR_LOG_KEY
    const providedKey = request.headers.get('x-api-key')
    if (!expectedKey || providedKey !== expectedKey) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: corsHeaders })
    }

    const body = await request.json()

    if (!body.deviceId || !body.deviceId.trim()) {
      return NextResponse.json({ error: 'deviceId é obrigatório' }, { status: 400, headers: corsHeaders })
    }
    if (!body.logText || !body.logText.trim()) {
      return NextResponse.json({ error: 'logText é obrigatório' }, { status: 400, headers: corsHeaders })
    }

    const log = await prisma.gigRadarLog.create({
      data: {
        deviceId: String(body.deviceId).trim().slice(0, 200),
        contact: body.contact ? String(body.contact).trim().slice(0, 200) : null,
        appVersion: body.appVersion ? String(body.appVersion).trim().slice(0, 50) : null,
        logText: String(body.logText).slice(0, 5000),
      },
    })

    // Resumo por IA — mesmo módulo usado nos Leads (getAIProvider: Claude se
    // ANTHROPIC_API_KEY existir, senão DeepSeek/OpenAI/Gemini). Fire-and-forget:
    // não atrasa nem quebra o recebimento do log se a IA falhar.
    analyzeWithAI(
      `Log de diagnóstico do app GigRadar (motorista de app, fase beta). Resuma em até 3 ` +
      `frases em português: (1) o que aconteceu de relevante, (2) se há algum problema/erro ` +
      `visível, (3) se precisa de atenção urgente. Seja direto, sem enrolação.\n\n${log.logText}`,
      { maxTokens: 300 }
    )
      .then((summary) =>
        prisma.gigRadarLog.update({ where: { id: log.id }, data: { aiSummary: summary } })
      )
      .catch((err) => console.warn('AI summary (gigradar log) failed (non-critical):', err))

    return NextResponse.json(
      { success: true, id: log.id },
      { status: 201, headers: corsHeaders }
    )
  } catch (error: any) {
    console.error('Error saving GigRadar log:', error)
    return NextResponse.json(
      { error: 'Falha ao salvar log', message: error?.message || 'Erro interno' },
      { status: 500, headers: corsHeaders }
    )
  }
}
