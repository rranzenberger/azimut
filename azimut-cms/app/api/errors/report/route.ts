/**
 * API para Reportar Erros do Frontend
 * Captura erros do ErrorBoundary e loga (preparado para salvar no banco futuramente)
 */

import { NextRequest, NextResponse } from 'next/server'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  // ⚠️ NUNCA quebrar se houver erro - sempre retornar sucesso
  try {
    const body = await request.json()
    const {
      error,
      stack,
      url,
      userAgent,
      timestamp,
      componentStack,
    } = body

    // Validação básica
    if (!error) {
      return NextResponse.json(
        { success: true, ignored: true },
        { headers: corsHeaders }
      )
    }

    // Logar erro (em produção, pode enviar para serviço externo como Sentry)
    const errorData = {
      error: error.substring(0, 500),
      stack: stack ? stack.substring(0, 2000) : null,
      url: url || 'unknown',
      userAgent: userAgent || 'unknown',
      timestamp: timestamp || new Date().toISOString(),
      componentStack: componentStack ? componentStack.substring(0, 1000) : null,
    }

    // Log estruturado (pode ser coletado por serviços de log)
    console.error('[ErrorBoundary Report]', JSON.stringify(errorData, null, 2))

    // ⚠️ FUTURO: Salvar no banco quando modelo ErrorLog for criado
    // Por enquanto, apenas logar

    // SEMPRE retornar sucesso
    return NextResponse.json(
      { success: true },
      { headers: corsHeaders }
    )
  } catch (error) {
    // ⚠️ NUNCA retornar erro - sempre retornar sucesso
    console.error('[Error Report] Erro ao processar (ignorado):', error)
    
    return NextResponse.json(
      { success: true, silent_error: true },
      { headers: corsHeaders }
    )
  }
}
