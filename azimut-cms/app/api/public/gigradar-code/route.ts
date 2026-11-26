/**
 * DESATIVADO em 26/nov/2026 (Ranz): AziRoad/GigRadar nao usa mais o backoffice da Azimut.
 * Sao dois CMS separados. O que o app do AziRoad precisa mora no CMS do AziRoad
 * (cms-gigradar.azmt.com.br, repo gigradar-admin). Esta rota so responde 410 (sumiu de vez).
 * Os dados antigos ficam no banco, intocados.
 */
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, X-Device-Id',
  'Cache-Control': 'no-store',
}

const gone = () =>
  NextResponse.json({ error: 'gone', message: 'AziRoad mudou para o proprio CMS (cms-gigradar.azmt.com.br).' }, { status: 410, headers })

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers })
}
export const GET = gone
export const POST = gone
