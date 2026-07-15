/**
 * API PÚBLICA — self-service do código de liberação do GigRadar (beta)
 * POST /api/public/gigradar-code
 *
 * Fluxo: o testador instala o app → abre a tela 💎 → copia o "ID de aparelho" (deviceId) →
 * volta nesta página do site → cola o deviceId + o e-mail/WhatsApp que usou no cadastro →
 * recebe o código na hora, sem depender de alguém gerar manualmente.
 *
 * SEGURANÇA (2 travas):
 *  1. GATE por cadastro: só gera código pra quem JÁ preencheu o formulário /gigradar
 *     (casa o contato com um lead GIGRADAR_BETA por e-mail ou WhatsApp). Sem isso, um
 *     estranho poderia farmar acesso — mesmo que cada código só destrave 1 aparelho.
 *  2. Segredo NUNCA no código-fonte (este repo é público): o HMAC usa GIGRADAR_CODE_SECRET
 *     (env var no servidor) — precisa ser IGUAL ao CODE_SECRET embutido no app (Entitlement.kt),
 *     senão o código gerado aqui não valida lá. Se a env var não existir, o endpoint recusa.
 *
 * Algoritmo IDÊNTICO ao tools/gr_code.py e ao Entitlement.redeemCode do app:
 *   expiryDay = floor(now_ms / DAY_MS) + days
 *   code = base36(expiryDay).toUpperCase() + "-" + HMAC_SHA256(secret, deviceId|expiryDay).hex[:8].upper()
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import crypto from 'crypto'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

const DAY_MS = 24 * 60 * 60 * 1000
const DEFAULT_DAYS = 30
const MAX_DEVICES_PER_LEAD = 5 // trava suave: 1 cadastro não vira fábrica de acessos

function makeCode(secret: string, deviceId: string, days: number): { code: string; expiryDay: number } {
  const expiryDay = Math.floor(Date.now() / DAY_MS) + days
  const h = crypto.createHmac('sha256', secret).update(`${deviceId}|${expiryDay}`).digest('hex').slice(0, 8).toUpperCase()
  return { code: `${expiryDay.toString(36).toUpperCase()}-${h}`, expiryDay }
}

/** Só dígitos (WhatsApp digitado com/sem DDI, parênteses, traços casa igual). */
const digits = (s: string) => (s || '').replace(/\D/g, '')

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.GIGRADAR_CODE_SECRET
    if (!secret) {
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível.' },
        { status: 503, headers: corsHeaders }
      )
    }

    const body = await request.json()
    const deviceId = String(body.deviceId || '').trim()
    const contact = String(body.contact || '').trim()

    if (!deviceId || deviceId.length < 6) {
      return NextResponse.json(
        { error: 'ID de aparelho inválido. Copie o ID na tela 💎 do app.' },
        { status: 400, headers: corsHeaders }
      )
    }
    if (!contact) {
      return NextResponse.json(
        { error: 'Informe o e-mail ou WhatsApp que você usou no cadastro.' },
        { status: 400, headers: corsHeaders }
      )
    }

    // GATE 1: precisa ter um cadastro GigRadar Beta com esse e-mail OU WhatsApp.
    const contactDigits = digits(contact)
    const isEmail = contact.includes('@')
    const gigWhere = {
      OR: [
        { leadType: 'GIGRADAR_BETA' as any },
        { sourceUrl: { contains: 'gigradar' } },
        { description: { contains: '[GIGRADAR]' } },
      ],
    }
    // Busca os candidatos GigRadar e casa por e-mail (case-insensitive) ou telefone (só dígitos).
    const candidates = await prisma.lead.findMany({
      where: isEmail
        ? { AND: [gigWhere, { email: { equals: contact, mode: 'insensitive' } }] }
        : gigWhere,
      select: { id: true, email: true, phone: true, leadIntelligence: true },
      take: 200,
    })
    const lead = isEmail
      ? candidates[0]
      : candidates.find((c) => contactDigits.length >= 8 && digits(c.phone || '').endsWith(contactDigits.slice(-8)))

    if (!lead) {
      return NextResponse.json(
        {
          error:
            'Não encontramos seu cadastro com esse contato. Preencha o formulário do beta primeiro, ou confira o e-mail/WhatsApp que você usou.',
        },
        { status: 403, headers: corsHeaders }
      )
    }

    // Trava suave por aparelho: guarda os deviceIds já liberados pra esse lead.
    const intel: any = (lead.leadIntelligence as any) || {}
    const devices: any[] = Array.isArray(intel.gigradarDevices) ? intel.gigradarDevices : []
    const known = devices.find((d) => d.deviceId === deviceId)
    if (!known && devices.length >= MAX_DEVICES_PER_LEAD) {
      return NextResponse.json(
        { error: 'Limite de aparelhos deste cadastro atingido. Fale com o suporte.' },
        { status: 429, headers: corsHeaders }
      )
    }

    // Gera o código (mesmo aparelho no mesmo dia = mesmo código, é determinístico).
    const { code, expiryDay } = makeCode(secret, deviceId, DEFAULT_DAYS)

    // Best-effort: vincula o deviceId ao lead (liga o log anônimo à pessoa) + registra a emissão.
    // Se falhar, NÃO bloqueia a entrega do código — o código é o produto, o vínculo é bônus.
    try {
      if (!known) devices.push({ deviceId, firstCodeAt: new Date().toISOString() })
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          leadIntelligence: { ...intel, gigradarDevices: devices, gigradarLastCodeAt: new Date().toISOString() },
        },
      })
    } catch (e) {
      console.warn('gigradar-code: falha ao vincular deviceId ao lead (não crítico):', e)
    }

    return NextResponse.json(
      { success: true, code, days: DEFAULT_DAYS, expiresAt: new Date(expiryDay * DAY_MS).toISOString() },
      { status: 200, headers: corsHeaders }
    )
  } catch (error: any) {
    console.error('Error generating GigRadar code:', error)
    return NextResponse.json(
      { error: 'Falha ao gerar o código. Tente de novo em instantes.' },
      { status: 500, headers: corsHeaders }
    )
  }
}
