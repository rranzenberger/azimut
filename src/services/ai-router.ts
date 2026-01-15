// ════════════════════════════════════════════════════════════
// AI SMART ROUTER - CLAUDE FIRST! 🎯
// ════════════════════════════════════════════════════════════
// NOVA ESTRATÉGIA: Claude para TUDO!
// Por quê? Precisamos de conversa HUMANIZADA, NATURAL, COM RAPPORT
// Claude é MUITO melhor nisso que DeepSeek
// 
// DeepSeek fica como fallback se Claude falhar
// ════════════════════════════════════════════════════════════

import { callClaude } from './claude-api'
import { callDeepSeek } from './deepseek-api'

interface AIRouterRequest {
  message: string
  lang: string
  userProfile: 'student' | 'business' | 'unknown'
  context: {
    page: string
    previousMessages: any[]
    messageCount: number
    isExitIntent: boolean
    emailDomain?: string
  }
}

interface AIRouterResponse {
  response: string
  aiUsed: 'claude' | 'deepseek'
  leadData?: any
  intent?: string
  shouldFollowUp?: boolean
  costSaved?: number
}

export async function routeToAI(request: AIRouterRequest): Promise<AIRouterResponse> {
  // ═══════════════════════════════════════════════════════════
  // 🎯 NOVA ESTRATÉGIA: CLAUDE SEMPRE!
  // ═══════════════════════════════════════════════════════════
  // Claude é MUITO melhor para:
  // - Conversa humanizada e natural
  // - Rapport e quebrar gelo
  // - Adaptar tom ao perfil do usuário
  // - Entender nuances (gênero, humor, emoção)
  // - Ser "humilde mas não modesto" 💪
  // ═══════════════════════════════════════════════════════════
  
  try {
    const claudeResponse = await callClaude({
      message: request.message,
      lang: request.lang,
      userProfile: request.userProfile,
      context: request.context
    })
    
    return {
      ...claudeResponse,
      aiUsed: 'claude',
      shouldFollowUp: true
    }
  } catch (error) {
    // ═══════════════════════════════════════════════════════════
    // 🔄 FALLBACK: DeepSeek se Claude falhar
    // ═══════════════════════════════════════════════════════════
    console.error('❌ Claude failed, falling back to DeepSeek:', error)
    
    try {
      const deepseekResponse = await callDeepSeek({
        message: request.message,
        lang: request.lang,
        userProfile: request.userProfile,
        context: request.context
      })
      
      return {
        response: deepseekResponse.response,
        aiUsed: 'deepseek',
        shouldFollowUp: true
      }
    } catch (fallbackError) {
      console.error('❌ DeepSeek also failed:', fallbackError)
      
      // Resposta de emergência
      const emergencyResponses: Record<string, string> = {
        pt: 'Opa, tô com um probleminha técnico aqui! 😅 Pode me mandar um WhatsApp? +55 11 98765-4321',
        en: 'Hey, having a small technical issue here! 😅 Can you WhatsApp me? +55 11 98765-4321',
        es: '¡Ey, tengo un problemita técnico aquí! 😅 ¿Puedes escribirme por WhatsApp? +55 11 98765-4321',
        fr: 'Hey, j\'ai un petit souci technique! 😅 Tu peux m\'écrire sur WhatsApp? +55 11 98765-4321'
      }
      
      return {
        response: emergencyResponses[request.lang] || emergencyResponses.en,
        aiUsed: 'deepseek',
        shouldFollowUp: true
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS & MONITORING
// ═══════════════════════════════════════════════════════════

export function logAIUsage(response: AIRouterResponse) {
  // AI usage tracking
  void {
    aiUsed: response.aiUsed,
    shouldFollowUp: response.shouldFollowUp,
    timestamp: new Date().toISOString()
  })
}
