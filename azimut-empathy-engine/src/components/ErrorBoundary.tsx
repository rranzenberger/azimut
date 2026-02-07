/**
 * Error boundary para a view "game": em caso de erro mostra fallback
 * com botão "Voltar ao site" para não deixar tela roxa travada.
 */
import React from 'react'
import { useLangStore } from '../stores/langStore'
import { getCommonTranslations } from '../i18n/common'

interface GameErrorBoundaryProps {
  children: React.ReactNode
}

interface GameErrorBoundaryState {
  hasError: boolean
}

function ErrorFallback() {
  const lang = useLangStore((s) => s.lang)
  const t = getCommonTranslations(lang)
  const goBack = () => {
    try {
      const base = typeof window !== 'undefined' && window.top ? window.top.location.pathname : ''
      const langFromPath = (base.match(/\/(pt|en|fr|es)(?:\/|$)/) || [])[1] || lang
      window.top!.location.href = `/${langFromPath}/experience-preview`
    } catch {
      window.location.href = `/pt/experience-preview`
    }
  }
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-[#0a0a12] p-6"
      role="alert"
    >
      <p className="text-white/90 font-body text-center text-base sm:text-lg">{t.errorTitle}</p>
      <button
        type="button"
        onClick={goBack}
        className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
        style={{ background: '#c92337' }}
      >
        {t.errorBackToSite}
      </button>
    </div>
  )
}

export default class GameErrorBoundary extends React.Component<
  GameErrorBoundaryProps,
  GameErrorBoundaryState
> {
  state: GameErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): GameErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[GameErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) return <ErrorFallback />
    return this.props.children
  }
}
