/**
 * GET /api/public/gigradar-streetview
 *
 * Proxy de fotografia Street View para o app Android. A chave Google nunca sai do servidor:
 * o endpoint consulta disponibilidade, aplica cota e devolve somente os bytes da imagem.
 */
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/src/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAILY_GLOBAL_LIMIT = 300
const DAILY_DEVICE_LIMIT = 30
const ALLOWED_KINDS = new Set(['pickup', 'destination'])

class QuotaExceededError extends Error {}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'X-API-Key, X-Device-Id',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

function safeEqual(received: string, expected: string) {
  const a = Buffer.from(received)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

function numberParam(request: NextRequest, name: string): number | null {
  const raw = request.nextUrl.searchParams.get(name)
  if (!raw || raw.length > 24) return null
  const value = Number(raw)
  return Number.isFinite(value) ? value : null
}

function bearing(fromLat: number, fromLng: number, toLat: number, toLng: number) {
  const rad = Math.PI / 180
  const lat1 = fromLat * rad
  const lat2 = toLat * rad
  const deltaLng = (toLng - fromLng) * rad
  const y = Math.sin(deltaLng) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng)
  return (Math.atan2(y, x) / rad + 360) % 360
}

async function consumeQuota(deviceId: string): Promise<boolean> {
  // Tabela técnica sem coordenadas nem ID bruto. CREATE IF NOT EXISTS permite implantar o endpoint
  // sem uma janela separada de migração e é seguro sob concorrência no PostgreSQL/Neon.
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
        VALUES (${`device:${deviceHash}`}, CURRENT_DATE, 1)
        ON CONFLICT (bucket_key, usage_day) DO UPDATE
        SET request_count = gigradar_streetview_quota.request_count + 1
        WHERE gigradar_streetview_quota.request_count < ${DAILY_DEVICE_LIMIT}
        RETURNING request_count
      `
      if (deviceRows.length === 0) throw new QuotaExceededError()

      const globalRows = await tx.$queryRaw<Array<{ request_count: number }>>`
        INSERT INTO gigradar_streetview_quota (bucket_key, usage_day, request_count)
        VALUES ('global', CURRENT_DATE, 1)
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

export async function GET(request: NextRequest) {
  try {
    const googleKey = process.env.GOOGLE_STREETVIEW_API_KEY
    const expectedAppKey = process.env.GIGRADAR_LOG_KEY
    if (!googleKey || !expectedAppKey) return jsonError('service unavailable', 503)

    const providedAppKey = request.headers.get('x-api-key') || ''
    const deviceId = (request.headers.get('x-device-id') || '').trim()
    if (!providedAppKey || !safeEqual(providedAppKey, expectedAppKey)) {
      return jsonError('unauthorized', 401)
    }
    if (deviceId.length < 6 || deviceId.length > 200) return jsonError('invalid device', 400)

    const lat = numberParam(request, 'lat')
    const lng = numberParam(request, 'lng')
    const kind = request.nextUrl.searchParams.get('kind') || ''
    const width = Math.round(numberParam(request, 'width') || 640)
    const height = Math.round(numberParam(request, 'height') || 360)
    if (lat === null || lng === null || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return jsonError('invalid coordinates', 400)
    }
    if (!ALLOWED_KINDS.has(kind)) return jsonError('invalid kind', 400)
    if (width < 200 || width > 640 || height < 120 || height > 640) {
      return jsonError('invalid size', 400)
    }

    // Metadata não é cobrado e impede gastar uma imagem onde não existe cobertura.
    const metadataUrl = new URL('https://maps.googleapis.com/maps/api/streetview/metadata')
    metadataUrl.searchParams.set('location', `${lat},${lng}`)
    metadataUrl.searchParams.set('source', 'outdoor')
    metadataUrl.searchParams.set('key', googleKey)
    const metadataResponse = await fetch(metadataUrl, { cache: 'no-store' })
    if (!metadataResponse.ok) return jsonError('metadata unavailable', 502)
    const metadata = await metadataResponse.json()
    if (metadata.status === 'ZERO_RESULTS') {
      return jsonError('street view unavailable', 404)
    }
    if (metadata.status !== 'OK' || !metadata.pano_id || !metadata.location) {
      console.error('gigradar-streetview metadata status:', metadata.status)
      return jsonError('metadata unavailable', 502)
    }

    if (!(await consumeQuota(deviceId))) return jsonError('daily quota reached', 429)

    const imageUrl = new URL('https://maps.googleapis.com/maps/api/streetview')
    imageUrl.searchParams.set('size', `${width}x${height}`)
    imageUrl.searchParams.set('pano', String(metadata.pano_id))
    imageUrl.searchParams.set(
      'heading',
      bearing(Number(metadata.location.lat), Number(metadata.location.lng), lat, lng).toFixed(1)
    )
    imageUrl.searchParams.set('pitch', '0')
    imageUrl.searchParams.set('fov', '90')
    imageUrl.searchParams.set('return_error_code', 'true')
    imageUrl.searchParams.set('key', googleKey)

    const imageResponse = await fetch(imageUrl, { cache: 'no-store' })
    if (!imageResponse.ok) return jsonError('image unavailable', imageResponse.status === 404 ? 404 : 502)
    const contentType = imageResponse.headers.get('content-type') || ''
    if (!contentType.startsWith('image/')) return jsonError('invalid upstream response', 502)

    return new NextResponse(await imageResponse.arrayBuffer(), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
        'X-GigRadar-Image-Source': 'street-view',
      },
    })
  } catch (error) {
    console.error('gigradar-streetview failed:', error)
    return jsonError('internal error', 500)
  }
}
