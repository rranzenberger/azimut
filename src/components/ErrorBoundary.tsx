import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  routeName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (desenvolvimento)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Error caught:', error, {
        componentStack: errorInfo.componentStack
      })
    }

    // ⚠️ Enviar para backoffice (não bloqueia renderização)
    try {
      const apiUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
      
      // Usar sendBeacon para não bloquear navegação
      if ('sendBeacon' in navigator) {
        const body = JSON.stringify({
          error: error.message,
          stack: error.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          componentStack: errorInfo.componentStack,
        })

        navigator.sendBeacon(`${apiUrl}/api/errors/report`, body)
      } else {
        // Fallback: fetch (não bloqueia se falhar)
        fetch(`${apiUrl}/api/errors/report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: error.message,
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            componentStack: errorInfo.componentStack,
          }),
        }).catch(() => {
          // Ignorar erros silenciosamente
        })
      }
    } catch (reportError) {
      // ⚠️ NUNCA quebrar se report falhar
      console.warn('[ErrorBoundary] Erro ao reportar (ignorado):', reportError)
    }
  }

  public render() {
    if (this.state.hasError) {
      const routeLabel = this.props.routeName ? ` (${this.props.routeName})` : ''
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-bg)' }}>
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
              Algo deu errado
            </h1>
            <p className="mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
              Ocorreu um erro ao carregar a página{routeLabel}.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.history.back()
                }}
                className="px-6 py-3 rounded border"
                style={{
                  borderColor: 'var(--theme-text-secondary)',
                  color: 'var(--theme-text)',
                }}
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.href = '/'
                }}
                className="px-6 py-3 rounded"
                style={{
                  background: '#c92337',
                  color: '#ffffff',
                }}
              >
                Ir ao início
              </button>
            </div>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer" style={{ color: 'var(--theme-text-secondary)' }}>
                  Detalhes do erro
                </summary>
                <pre className="mt-2 p-4 rounded text-xs overflow-auto" style={{ 
                  background: 'var(--theme-bg-secondary)',
                  color: 'var(--theme-text)',
                  maxHeight: '200px'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

























