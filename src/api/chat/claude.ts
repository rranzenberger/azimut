// ════════════════════════════════════════════════════════════
// CHAT API ROUTE - Smart Routing (Claude + DeepSeek)
// ════════════════════════════════════════════════════════════

import { routeToAI, logAIUsage } from '../../services/ai-router'
import { logger } from '@/utils/logger'

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

    // Detectar email domain se houver email na mensagem
    const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b/)
    const emailDomain = emailMatch ? emailMatch[1] : undefined

    // Enriquecer contexto
    const enrichedContext = {
      ...context,
      messageCount: (context?.previousMessages?.length || 0) + 1,
      isExitIntent: context?.isExitIntent || false,
      emailDomain
    }

    // 🔀 SMART ROUTING: Decide qual IA usar
    const aiResponse = await routeToAI({
      message,
      lang: lang || 'pt',
      userProfile: userProfile || 'unknown',
      context: enrichedContext
    })

    // Log para analytics
    logAIUsage(aiResponse)

    // Retornar resposta com metadata
    return new Response(
      JSON.stringify({
        ...aiResponse,
        metadata: {
          aiUsed: aiResponse.aiUsed,
          costSaved: aiResponse.costSaved,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    logger.api.error('/api/chat/claude', error as Error, { 
      action: 'POST /api/chat/claude'
    })
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        response: 'Desculpe, houve um erro. Por favor, tente novamente.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
