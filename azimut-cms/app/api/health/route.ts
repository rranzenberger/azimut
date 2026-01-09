import { NextResponse } from 'next/server'

/**
 * Health check endpoint
 * Usado pelo site para verificar se o backoffice está online
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'azimut-backoffice',
    version: '1.0.0'
  })
}

export const runtime = 'edge'
