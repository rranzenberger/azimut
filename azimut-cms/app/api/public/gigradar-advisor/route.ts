/**
 * POST /api/public/gigradar-advisor
 *
 * Conselheiro IA do GigRadar (camada 3): recebe um RESUMO textual dos números do motorista
 * (ganhos/custos/horários/categorias — sem coordenadas, sem dados de passageiro), consulta o
 * Gemini Flash e devolve um conselho curto e honesto. A chave Gemini nunca sai do servidor.
 * Mesmo modelo de segurança do gigradar-streetview: X-API-Key + X-Device-Id + cota diária.
 */
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/src/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAILY_GLOBAL_LIMIT = 200
const DAILY_DEVICE_LIMIT = 10
const MAX_SUMMARY_CHARS = 4000

class QuotaExceededError extends Error {}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, X-Device-Id',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

function safeEqual(received: string, expected: string) {
  const a = Buffer.from(received)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

async function consumeQuota(deviceId: string): Promise<boolean> {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS gigradar_streetview_quota (
      bucket_key TEXT NOT NULL,
      usage_day DATE NOT NULL DEFAULT CURRENT_DATE,
      request_count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (bucket_key, usage_day)
    )
  `
  const deviceHash = crypto.createHash('sha256').update(deviceId).digest('hex')
  try {
    await prisma.$transaction(async (tx) => {
      const deviceRows = await tx.$queryRaw<Array<{ request_count: number }>>`
        INSERT INTO gigradar_streetview_quota (bucket_key, usage_day, request_count)
        VALUES (${`advisor:device:${deviceHash}`}, CURRENT_DATE, 1)
        ON CONFLICT (bucket_key, usage_day) DO UPDATE
        SET request_count = gigradar_streetview_quota.request_count + 1
        WHERE gigradar_streetview_quota.request_count < ${DAILY_DEVICE_LIMIT}
        RETURNING request_count
      `
      if (deviceRows.length === 0) throw new QuotaExceededError()

      const globalRows = await tx.$queryRaw<Array<{ request_count: number }>>`
        INSERT INTO gigradar_streetview_quota (bucket_key, usage_day, request_count)
        VALUES ('advisor:global', CURRENT_DATE, 1)
        ON CONFLICT (bucket_key, usage_day) DO UPDATE
        SET request_count = gigradar_streetview_quota.request_count + 1
        WHERE gigradar_streetview_quota.request_count < ${DAILY_GLOBAL_LIMIT}
        RETURNING request_count
      `
      if (globalRows.length === 0) throw new QuotaExceededError()
    })
    return true
  } catch (error) {
    if (error instanceof QuotaExceededError) return false
    throw error
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status, headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
  )
}

const SYSTEM_PROMPT = `Você é o Conselheiro do GigRadar, um app que ajuda motoristas de aplicativo
(Uber/99) no Brasil a decidir com os PRÓPRIOS números. Você recebe um resumo REAL dos dados do
motorista. Regras rígidas:
- Responda no idioma pedido, em ATÉ 6 frases curtas, direto e humano (fala de colega, não de banco).
- Use SOMENTE os números do resumo; NUNCA invente valor, nunca estime o que não foi dado.
- Conselho prático: melhores horários dele, categoria que paga melhor, se está cobrindo o custo do
  carro, quando vale parar. Se os dados mostram prejuízo, diga com respeito mas sem dourar.
- NUNCA sugira violar termos das plataformas, automatizar aceite/recusa, ou qualquer trapaça.
- Se o resumo tiver pouco dado, diga o que falta registrar em vez de opinar no vazio.`

export async function POST(request: NextRequest) {
  try {
    // Aceita o nome padrão e o nome que o Ranz criou na Vercel ("Giradar").
    const geminiKey = process.env.GEMINI_API_KEY || process.env.Giradar
    const expectedAppKey = process.env.GIGRADAR_LOG_KEY
    if (!geminiKey || !expectedAppKey) return jsonError('service unavailable', 503)

    const providedAppKey = request.headers.get('x-api-key') || ''
    const deviceId = (request.headers.get('x-device-id') || '').trim()
    if (!providedAppKey || !safeEqual(providedAppKey, expectedAppKey)) {
      return jsonError('unauthorized', 401)
    }
    if (deviceId.length < 6 || deviceId.length > 200) return jsonError('invalid device', 400)

    const body = await request.json().catch(() => null)
    const summary = typeof body?.summary === 'string' ? body.summary.trim() : ''
    const lang = typeof body?.lang === 'string' ? body.lang : 'pt'
    if (!summary || summary.length > MAX_SUMMARY_CHARS) return jsonError('invalid summary', 400)

    if (!(await consumeQuota(deviceId))) return jsonError('daily quota reached', 429)

    const langName = lang === 'en' ? 'inglês' : lang === 'es' ? 'espanhol' : 'português do Brasil'
    // Google renomeia modelos com frequência (o 2.5-flash deu 404 em 18/jul/2026). Cadeia de
    // tentativas do alias estável pro específico; o primeiro que responder fica.
    const MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
    let geminiResponse: Response | null = null
    for (const model of MODELS) {
      const attempt = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{
              role: 'user',
              parts: [{ text: `Idioma da resposta: ${langName}.\n\nRESUMO REAL DO MOTORISTA:\n${summary}` }],
            }],
            // Modelos Gemini atuais "pensam" antes de responder e o raciocínio consome
            // maxOutputTokens — 512 truncava o conselho no meio. 2048 dá folga pros dois.
            generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
          }),
        }
      )
      if (attempt.ok) { geminiResponse = attempt; break }
      console.error(`gigradar-advisor gemini ${model} status:`, attempt.status)
      if (attempt.status !== 404) { geminiResponse = attempt; break }  // erro real ≠ nome de modelo
    }
    if (!geminiResponse || !geminiResponse.ok) return jsonError('advisor unavailable', 502)
    const data = await geminiResponse.json()
    // Modelos com raciocínio devolvem partes de "pensamento" (thought: true) — nunca mostrar.
    const advice: string = data?.candidates?.[0]?.content?.parts
      ?.filter((p: { thought?: boolean }) => !p?.thought)
      .map((p: { text?: string }) => p?.text || '')
      .join('')
      .trim() || ''
    if (!advice) return jsonError('advisor unavailable', 502)

    return NextResponse.json(
      { advice },
      { status: 200, headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('gigradar-advisor failed:', error)
    return jsonError('internal error', 500)
  }
}
