/**
 * Logger Profissional - Sistema de Logging Inteligente
 * 
 * Funcionalidades:
 * - Logs em desenvolvimento sempre ativos
 * - Logs em produção removidos automaticamente (via Vite)
 * - Erros sempre logados (mesmo em produção)
 * - Debug mode via localStorage para emergências
 * - Preparado para integração com Sentry/LogRocket
 */

const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

// Flag para ativar logs em produção (via localStorage)
// Para ativar: localStorage.setItem('azimut_debug', 'true')
// Para desativar: localStorage.removeItem('azimut_debug')
const getDebugMode = (): boolean => {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem('azimut_debug') === 'true'
  } catch {
    return false
  }
}

const DEBUG_MODE = getDebugMode()

// Prefixo para identificar logs do Azimut
const PREFIX = '[AZIMUT]'

/**
 * Logger profissional com diferentes níveis
 */
export const logger = {
  /**
   * Log normal - apenas em desenvolvimento ou se debug ativado
   * Use para informações gerais de debug
   */
  log: (...args: any[]) => {
    if (isDevelopment || DEBUG_MODE) {
      console.log(PREFIX, ...args)
    }
  },

  /**
   * Info - informações importantes (só em dev ou debug)
   * Use para informações que não são erros mas são relevantes
   */
  info: (...args: any[]) => {
    if (isDevelopment || DEBUG_MODE) {
      console.info(`ℹ️ ${PREFIX}`, ...args)
    }
  },

  /**
   * Debug - apenas em desenvolvimento
   * Use para logs detalhados de debug
   */
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(`🔍 ${PREFIX} DEBUG`, ...args)
    }
  },

  /**
   * Warning - avisos importantes
   * Sempre logado, mas formatado
   * Em produção, pode ser enviado para monitoramento
   */
  warn: (...args: any[]) => {
    if (isDevelopment || DEBUG_MODE) {
      console.warn(`⚠️ ${PREFIX}`, ...args)
    }
    // TODO: Em produção, enviar para Sentry (opcional)
    // if (isProduction) {
    //   Sentry.captureMessage(args.join(' '), 'warning')
    // }
  },

  /**
   * Error - erros críticos
   * SEMPRE logado (mesmo em produção)
   * Deve ser enviado para monitoramento em produção
   */
  error: (error: Error | string, context?: Record<string, any>) => {
    const errorMessage = error instanceof Error ? error.message : error
    const errorStack = error instanceof Error ? error.stack : undefined

    // Sempre loga erros (crítico para debug)
    console.error(`❌ ${PREFIX} ERROR`, errorMessage)
    
    if (errorStack && (isDevelopment || DEBUG_MODE)) {
      console.error('Stack trace:', errorStack)
    }

    if (context && (isDevelopment || DEBUG_MODE)) {
      console.error('Context:', context)
    }

    // Em produção, enviar para Sentry/LogRocket
    if (isProduction) {
      // TODO: Integrar com Sentry quando necessário
      // if (error instanceof Error) {
      //   Sentry.captureException(error, { extra: context })
      // } else {
      //   Sentry.captureMessage(errorMessage, { level: 'error', extra: context })
      // }
    }
  },

  /**
   * API - logs específicos para chamadas de API
   * Só em desenvolvimento ou debug
   */
  api: {
    request: (url: string, method: string, data?: any) => {
      if (isDevelopment || DEBUG_MODE) {
        console.log(`🌐 ${PREFIX} API ${method}`, url, data ? '(com dados)' : '')
      }
    },
    response: (url: string, status: number, data?: any) => {
      if (isDevelopment || DEBUG_MODE) {
        const emoji = status >= 200 && status < 300 ? '✅' : '❌'
        console.log(`${emoji} ${PREFIX} API Response`, status, url)
      }
    },
    error: (url: string, error: Error | string, context?: any) => {
      logger.error(`API Error [${url}]`, context)
    }
  },

  /**
   * Performance - logs de performance
   * Só em desenvolvimento
   */
  perf: (label: string, duration: number) => {
    if (isDevelopment) {
      const emoji = duration > 1000 ? '🐌' : duration > 500 ? '⚠️' : '⚡'
      console.log(`${emoji} ${PREFIX} PERF`, `${label}: ${duration}ms`)
    }
  }
}

/**
 * Helper para medir performance
 */
export const measurePerformance = (label: string) => {
  const start = performance.now()
  return () => {
    const duration = performance.now() - start
    logger.perf(label, duration)
    return duration
  }
}

/**
 * Helper para logar dados sensíveis de forma segura
 * Remove campos sensíveis antes de logar
 */
export const logSafe = (data: any, sensitiveFields: string[] = ['password', 'token', 'apiKey', 'secret']) => {
  if (!isDevelopment && !DEBUG_MODE) return

  const safeData = { ...data }
  sensitiveFields.forEach(field => {
    if (safeData[field]) {
      safeData[field] = '***REDACTED***'
    }
  })

  logger.log('Safe data:', safeData)
}

// Exportar também como default para facilitar importação
export default logger
