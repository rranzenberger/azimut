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
  }
}

export default logger
