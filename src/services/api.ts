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
  
  // Se está em produção (Vercel ou domínio custom), usar backoffice de produção
  if (isProduction || isVercelProduction) {
    return 'https://backoffice.azmt.com.br'
  }
  
  // Fallback para desenvolvimento local
  return 'http://localhost:3001'
}

const API_URL = getApiUrl()
const API_KEY = import.meta.env.VITE_API_KEY || ''

// Check if features are enabled
const AI_ENABLED = import.meta.env.VITE_ENABLE_AI_SUGGESTIONS !== 'false'
const TRACKING_ENABLED = import.meta.env.VITE_ENABLE_TRACKING !== 'false'

export class ApiService {
  /**
   * Submit lead to CRM
   */
  static async submitLead(data: any) {
    try {
      // Verificar se API_URL está configurada
      if (!API_URL || API_URL === 'undefined' || API_URL.includes('undefined')) {
        console.warn('⚠️ VITE_API_URL não configurada')
        if (isDevelopment) {
          console.warn('💡 Dica: Configure VITE_API_URL no arquivo .env ou use o email direto: contact@azmt.com.br')
        }
        throw new Error('API não configurada')
      }
      
      // Em desenvolvimento, avisar se está tentando localhost mas pode não estar disponível
      if (isDevelopment && API_URL.includes('localhost')) {
        console.log('ℹ️ Tentando conectar ao backoffice local. Se falhar, certifique-se de que está rodando em http://localhost:3001')
      }

      // Log apenas em desenvolvimento
      if (import.meta.env.DEV) {
        console.log('📤 Enviando lead para:', `${API_URL}/api/leads`)
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
    } catch (error: any) {
      console.error('❌ Error submitting lead:', error)
      
      // Mensagens de erro mais específicas
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        throw new Error('Tempo de conexão esgotado. Verifique sua internet e tente novamente.')
      }
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.')
      }
      
      if (error.message?.includes('CORS')) {
        throw new Error('Erro de conexão. Por favor, entre em contato diretamente: contact@azmt.com.br')
      }
      
      // Repassar erro original se tiver mensagem útil
      throw error
    }
  }

  /**
   * Get AI suggestions for form fields (optional)
   */
  static async getAiSuggestions(data: any) {
    if (!AI_ENABLED) {
      console.log('ℹ️ AI suggestions disabled')
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
  static async trackVisitor(data: any) {
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
      console.debug('Tracking failed (non-critical):', error)
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
      console.debug('Recommendations not available:', error)
      return null
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
