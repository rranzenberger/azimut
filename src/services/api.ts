/**
 * API Service - Centralized API calls to backoffice
 * Handles all communication between site and CMS/backoffice
 */

// Detectar ambiente
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

// Detectar se está rodando em produção (Vercel)
const isVercelProduction = typeof window !== 'undefined' && (
  window.location.hostname.includes('vercel.app') || 
  window.location.hostname.includes('azmt.com.br') ||
  window.location.hostname === 'azimut.com.br'
)

// URL da API - usar produção automaticamente se detectado ambiente de produção
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL
  
  // Se tem URL configurada, usar ela
  if (envUrl && envUrl !== 'undefined' && !envUrl.includes('undefined')) {
    return envUrl
  }
  
  // SEMPRE usar backoffice de produção (mesmo em localhost)
  // Isso permite testar o formulário localmente sem rodar o backoffice
  return 'https://backoffice.azmt.com.br'
}

const API_URL = getApiUrl()
const API_KEY = import.meta.env.VITE_API_KEY || ''

// Check if features are enabled
const AI_ENABLED = import.meta.env.VITE_ENABLE_AI_SUGGESTIONS !== 'false'
const TRACKING_ENABLED = import.meta.env.VITE_ENABLE_TRACKING !== 'false'

// ═══════════════════════════════════════════════════════════════
// INTERFACES TYPESCRIPT
// ═══════════════════════════════════════════════════════════════

export interface LeadData {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  leadType?: string
  source?: string
  lang?: string
  interest?: string
  budget?: string
}

export interface AiSuggestionData {
  field: string
  value: string
  context?: Record<string, string>
}

export interface VisitorTrackingData {
  sessionId?: string
  page: string
  event?: string
  metadata?: Record<string, unknown>
}

export interface VancouverLeadData extends LeadData {
  school?: string
  program?: string
  startDate?: string
  hasPassport?: boolean
  englishLevel?: string
}

export interface QuizVancouverData {
  answers: Record<string, string | number>
  score?: number
  recommendation?: string
  email?: string
  name?: string
}

export interface CourseRecommendationData {
  interests: string[]
  experience?: string
  goals?: string[]
  budget?: string
  timeline?: string
}

export class ApiService {
  /**
   * Submit lead to CRM
   */
  static async submitLead(data: LeadData) {
    try {
      // Verificar se API_URL está configurada
      if (!API_URL || API_URL === 'undefined' || API_URL.includes('undefined')) {
        console.warn('⚠️ VITE_API_URL não configurada')
        if (isDevelopment) {
          console.warn('💡 Dica: Configure VITE_API_URL no arquivo .env ou use o email direto: contact@azmt.com.br')
        }
        throw new Error('API não configurada')
      }
      
      // Criar AbortController para timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos

      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = 'Erro ao enviar formulário'
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          const errorText = await response.text()
          if (errorText) {
            errorMessage = errorText
          } else {
            errorMessage = `Erro ${response.status}: ${response.statusText}`
          }
        }
        
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error: unknown) {
      console.error('❌ Error submitting lead:', error)
      
      // Mensagens de erro mais específicas
      const err = error as Error & { name?: string; message?: string }
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        throw new Error('Tempo de conexão esgotado. Verifique sua internet e tente novamente.')
      }
      
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.')
      }
      
      if (err.message?.includes('CORS')) {
        throw new Error('Erro de conexão. Por favor, entre em contato diretamente: contact@azmt.com.br')
      }
      
      // Repassar erro original se tiver mensagem útil
      throw error
    }
  }

  /**
   * Get AI suggestions for form fields (optional)
   */
  static async getAiSuggestions(data: AiSuggestionData) {
    if (!AI_ENABLED) {
      return null
    }

    try {
      const response = await fetch(`${API_URL}/api/ai/form-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        console.warn('⚠️ AI suggestions not available')
        return null
      }

      return await response.json()
    } catch (error) {
      console.warn('⚠️ AI suggestions failed (non-critical):', error)
      return null // Fail silently
    }
  }

  /**
   * Track visitor behavior (optional)
   */
  static async trackVisitor(data: VisitorTrackingData) {
    if (!TRACKING_ENABLED) {
      return
    }

    try {
      await fetch(`${API_URL}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      // Fail silently - tracking is optional
    }
  }

  /**
   * Get personalized content recommendations
   */
  static async getRecommendations(sessionId: string) {
    try {
      const response = await fetch(
        `${API_URL}/api/public/content?sessionId=${sessionId}`,
        {
          headers: {
            ...(API_KEY && { 'X-API-Key': API_KEY })
          }
        }
      )

      if (!response.ok) {
        return null
      }

      return await response.json()
    } catch (error) {
      // Recommendations not available
      return null
    }
  }

  /**
   * Submit Vancouver interest lead
   */
  static async submitVancouverLead(data: any) {
    try {
      if (!API_URL || API_URL === 'undefined' || API_URL.includes('undefined')) {
        console.warn('⚠️ VITE_API_URL não configurada')
        throw new Error('API não configurada')
      }
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(`${API_URL}/api/leads/vancouver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = 'Erro ao enviar interesse Vancouver'
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error: unknown) {
      console.error('❌ Error submitting Vancouver lead:', error)
      const err = error as Error & { name?: string; message?: string }
      
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        throw new Error('Tempo de conexão esgotado. Verifique sua internet e tente novamente.')
      }
      
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.')
      }
      
      throw error
    }
  }

  /**
   * Submit Quiz Vancouver response
   */
  static async submitQuizVancouver(data: QuizVancouverData) {
    try {
      if (!API_URL || API_URL === 'undefined' || API_URL.includes('undefined')) {
        console.warn('⚠️ VITE_API_URL não configurada')
        throw new Error('API não configurada')
      }
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(`${API_URL}/api/quiz/vancouver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = 'Erro ao salvar Quiz Vancouver'
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error: unknown) {
      console.error('❌ Error submitting Quiz Vancouver:', error)
      const err = error as Error & { name?: string; message?: string }
      
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        throw new Error('Tempo de conexão esgotado.')
      }
      
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        throw new Error('Não foi possível conectar ao servidor.')
      }
      
      throw error
    }
  }

  /**
   * Submit Course Recommender response
   */
  static async submitCourseRecommendation(data: CourseRecommendationData) {
    try {
      if (!API_URL || API_URL === 'undefined' || API_URL.includes('undefined')) {
        console.warn('⚠️ VITE_API_URL não configurada')
        throw new Error('API não configurada')
      }
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(`${API_URL}/api/quiz/course-recommender`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = 'Erro ao salvar Recomendação de Curso'
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error: unknown) {
      console.error('❌ Error submitting Course Recommendation:', error)
      const err = error as Error & { name?: string; message?: string }
      
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        throw new Error('Tempo de conexão esgotado.')
      }
      
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        throw new Error('Não foi possível conectar ao servidor.')
      }
      
      throw error
    }
  }

  /**
   * Health check - test if API is reachable
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/health`, {
        method: 'GET',
        headers: {
          ...(API_KEY && { 'X-API-Key': API_KEY })
        }
      })
      return response.ok
    } catch {
      return false
    }
  }
}

// Export singleton instance
export default ApiService
