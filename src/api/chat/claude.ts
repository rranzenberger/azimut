// ════════════════════════════════════════════════════════════
// CLAUDE CHAT API ROUTE - Backend Endpoint
// ════════════════════════════════════════════════════════════

import { callClaude } from '../../services/claude-api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { message, lang, userProfile, context } = body

    // Validação
    if (!message || !message.trim()) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Chamar Claude
    const claudeResponse = await callClaude({
      message,
      lang: lang || 'pt',
      userProfile: userProfile || 'unknown',
      context: context || { page: '/', previousMessages: [] }
    })

    return new Response(
      JSON.stringify(claudeResponse),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        response: 'Desculpe, houve um erro. Por favor, tente novamente.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
