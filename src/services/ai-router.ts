// ════════════════════════════════════════════════════════════
// AI SMART ROUTER - Roteamento Inteligente
// ════════════════════════════════════════════════════════════
// Decide automaticamente qual IA usar para MAXIMIZAR ROI:
// - DeepSeek: 80% das conversas (perguntas simples) = ECONOMIA
// - Claude: 20% das conversas (alta intenção) = QUALIDADE
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
}

export async function routeToAI(request: AIRouterRequest): Promise<AIRouterResponse> {
  // Decidir qual IA usar baseado em REGRAS INTELIGENTES
  const shouldUseClaude = shouldRouteToClaudeimport { callClaude } from './claude-api'
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
  // REGRAS DE ROTEAMENTO INTELIGENTE
  // ═══════════════════════════════════════════════════════════
  
  const shouldUseClaude = shouldRouteToClaude(request)
  
  if (shouldUseClaude) {
    // 💎 CLAUDE: Alta qualidade para conversões críticas
    console.log('🔥 Routing to CLAUDE (high priority)')
    
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
  } else {
    // 💰 DEEPSEEK: Economia para conversas simples
    console.log('⚡ Routing to DEEPSEEK (standard)')
    
    const deepseekResponse = await callDeepSeek({
      message: request.message,
      lang: request.lang,
      userProfile: request.userProfile,
      context: request.context
    })
    
    // Se DeepSeek sugere upgrade, fazer upgrade transparente para Claude
    if (deepseekResponse.shouldUpgradeToClaude && request.context.messageCount >= 2) {
      console.log('⬆️ Upgrading to CLAUDE (DeepSeek suggestion)')
      
      const claudeResponse = await callClaude({
        message: request.message,
        lang: request.lang,
        userProfile: request.userProfile,
        context: request.context
      })
      
      return {
        ...claudeResponse,
        aiUsed: 'claude',
        shouldFollowUp: true,
        costSaved: 0.004 // Economia estimada por não ter usado Claude desde o início
      }
    }
    
    return {
      response: deepseekResponse.response,
      aiUsed: 'deepseek',
      shouldFollowUp: deepseekResponse.shouldUpgradeToClaude,
      costSaved: 0.005 // Economia por usar DeepSeek ao invés de Claude
    }
  }
}

// ═══════════════════════════════════════════════════════════
// LÓGICA DE DECISÃO: CLAUDE vs DEEPSEEK
// ═══════════════════════════════════════════════════════════

function shouldRouteToClaude(request: AIRouterRequest): boolean {
  // 🔥 PRIORIDADE MÁXIMA → CLAUDE
  
  // 1. Exit Intent (momento crítico!)
  if (request.context.isExitIntent) {
    return true
  }
  
  // 2. Conversa avançada (3+ mensagens)
  if (request.context.messageCount >= 3) {
    return true
  }
  
  // 3. Email corporativo detectado
  if (request.context.emailDomain && !isFreeEmail(request.context.emailDomain)) {
    return true
  }
  
  // 4. Páginas de alta intenção
  const highIntentPages = [
    '/start-project',
    '/budget-wizard',
    '/contact',
    '/academy/courses' // Página de cursos = alta intenção
  ]
  if (highIntentPages.some(page => request.context.page.includes(page))) {
    return true
  }
  
  // 5. Keywords de alta intenção na mensagem
  if (containsHighIntentKeywords(request.message)) {
    return true
  }
  
  // 6. Horário comercial (9h-18h) + usuário business
  if (isBusinessHours() && request.userProfile === 'business') {
    return true
  }
  
  // 7. Mensagens longas (>100 caracteres) = pergunta complexa
  if (request.message.length > 100) {
    return true
  }
  
  // ⚡ CASO CONTRÁRIO → DEEPSEEK
  return false
}

function containsHighIntentKeywords(message: string): boolean {
  const highIntentKeywords = [
    // Orçamento
    'orçamento', 'budget', 'quanto custa', 'price', 'preço', 'valor',
    'investimento', 'investment',
    
    // Contratação
    'contratar', 'hire', 'fechar', 'close', 'comprar', 'buy',
    
    // Reunião
    'agendar', 'schedule', 'reunião', 'meeting', 'call', 'ligação',
    
    // Proposta
    'proposta', 'proposal', 'cotação', 'quote',
    
    // Urgência
    'urgente', 'urgent', 'rápido', 'fast', 'asap', 'já', 'now',
    
    // Decisão
    'decidir', 'decide', 'escolher', 'choose', 'comparar', 'compare'
  ]
  
  const messageLower = message.toLowerCase()
  return highIntentKeywords.some(kw => messageLower.includes(kw))
}

function isFreeEmail(domain: string): boolean {
  const freeEmailDomains = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'live.com',
    'msn.com',
    'aol.com'
  ]
  
  return freeEmailDomains.some(free => domain.toLowerCase().includes(free))
}

function isBusinessHours(): boolean {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  
  // Segunda a Sexta, 9h-18h
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS & MONITORING
// ═══════════════════════════════════════════════════════════

export function logAIUsage(response: AIRouterResponse) {
  // Log para analytics
  console.log(`AI Usage: ${response.aiUsed}`, {
    costSaved: response.costSaved,
    shouldFollowUp: response.shouldFollowUp,
    timestamp: new Date().toISOString()
  })
  
  // TODO: Enviar para analytics service (PostHog, Mixpanel, etc)
  // trackEvent('ai_usage', {
  //   ai: response.aiUsed,
  //   cost_saved: response.costSaved,
  //   ...
  // })
}
