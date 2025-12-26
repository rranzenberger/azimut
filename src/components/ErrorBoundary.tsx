import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
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
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-bg)' }}>
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
              Algo deu errado
            </h1>
            <p className="mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
              Ocorreu um erro ao carregar a página.
            </p>
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
              Recarregar Página
            </button>
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




