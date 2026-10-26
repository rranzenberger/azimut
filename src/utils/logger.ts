// ════════════════════════════════════════════════════════════
// LOGGER UTILITY
// ════════════════════════════════════════════════════════════
// Simple logger that wraps console methods
// Can be extended for production logging services
// ════════════════════════════════════════════════════════════

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

const isDev = import.meta.env.DEV || process.env.NODE_ENV === 'development'

const formatMessage = (level: LogLevel, message: string, context?: LogContext): string => {
  const timestamp = new Date().toISOString()
  const contextStr = context ? ` ${JSON.stringify(context)}` : ''
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
}

export const logger = {
  debug: (message: string, context?: LogContext) => {
    if (isDev) {
      console.debug(formatMessage('debug', message, context))
    }
  },

  info: (message: string, context?: LogContext) => {
    console.info(formatMessage('info', message, context))
  },

  warn: (message: string, context?: LogContext) => {
    console.warn(formatMessage('warn', message, context))
  },

  error: (error: Error | string, context?: LogContext) => {
    const message = error instanceof Error ? error.message : error
    console.error(formatMessage('error', message, context))
    if (error instanceof Error && error.stack) {
      console.error(error.stack)
    }
  },

  // Alias for backward compatibility
  log: (message: string, context?: LogContext) => {
    console.log(formatMessage('info', message, context))
  },

  // 26/out/2026: services/api.ts chama logger.api.request/response/error em 15 lugares, mas este bloco não
  // existia — cada envio (lead do formulário, contato…) quebrava com "Cannot read properties of undefined
  // (reading 'request')" ANTES de sair, e o catch quebrava de novo em logger.api.error. Medido no aziroad.com.
  api: {
    request: (url: string, method: string, context?: LogContext) => {
      if (isDev) console.debug(formatMessage('debug', `→ ${method} ${url}`, context))
    },
    response: (url: string, status: number, context?: LogContext) => {
      if (isDev) console.debug(formatMessage('debug', `← ${status} ${url}`, context))
    },
    error: (url: string, error: unknown, context?: LogContext) => {
      const message = error instanceof Error ? error.message : String(error)
      console.error(formatMessage('error', `${url}: ${message}`, context))
    }
  }
}

export default logger
