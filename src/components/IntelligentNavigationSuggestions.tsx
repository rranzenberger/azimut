// ════════════════════════════════════════════════════════════
// INTELLIGENT NAVIGATION SUGGESTIONS - "Você pode gostar" / "Próximos passos"
// ════════════════════════════════════════════════════════════
// Conecta useIntelligentNavigation à UI (ORDEM_DE_EXECUCAO §16)
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import LangLink from './LangLink'
import { type Lang } from '../i18n'
import { useIntelligentNavigation, type SmartRecommendation } from '../hooks/useIntelligentNavigation'

interface IntelligentNavigationSuggestionsProps {
  lang: Lang
  theme?: 'dark' | 'light'
  maxItems?: number
  /** Só exibir após N segundos na página (evita flash) */
  delayShowSeconds?: number
}

const titles: Record<Lang, string> = {
  pt: 'Você pode gostar',
  en: 'You might like',
  es: 'Te puede interesar',
  fr: 'Vous aimerez peut-être'
}

const subtitles: Record<Lang, string> = {
  pt: 'Próximos passos sugeridos para você',
  en: 'Suggested next steps for you',
  es: 'Siguientes pasos sugeridos',
  fr: 'Prochaines étapes suggérées'
}

const IntelligentNavigationSuggestions: React.FC<IntelligentNavigationSuggestionsProps> = ({
  lang,
  theme = 'dark',
  maxItems = 3,
  delayShowSeconds = 4
}) => {
  const { recommendations } = useIntelligentNavigation()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Mostrar só após delay e quando houver recomendações
  useEffect(() => {
    if (recommendations.length === 0 || dismissed) {
      setVisible(false)
      return
    }
    const t = setTimeout(() => setVisible(true), delayShowSeconds * 1000)
    return () => clearTimeout(t)
  }, [recommendations.length, delayShowSeconds, dismissed])

  const toShow: SmartRecommendation[] = recommendations.slice(0, maxItems)
  if (!visible || toShow.length === 0) return null

  const isDark = theme === 'dark'
  const bg = isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-100/95 border-slate-200'
  const text = isDark ? 'text-white' : 'text-slate-800'
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600'
  const linkHover = isDark ? 'hover:text-azimut-red hover:border-azimut-red/50' : 'hover:text-azimut-red hover:border-azimut-red/40'

  return (
    <aside
      className={`${bg} border-t border-b py-6 px-4 sm:px-6`}
      aria-label={titles[lang]}
      role="complementary"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`font-sora font-semibold uppercase tracking-wide text-sm ${text}`}>
            {titles[lang]}
          </h3>
          <p className={`text-xs mt-0.5 ${textMuted}`}>
            {subtitles[lang]}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {toShow.map((rec) => (
            <LangLink
              key={`${rec.url}-${rec.title}`}
              to={rec.url}
              lang={lang}
              className={`
                inline-flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2
                px-4 py-2.5 rounded-lg border transition-colors
                ${isDark ? 'border-white/20 bg-white/5' : 'border-slate-300 bg-white/80'}
                ${linkHover}
                ${text} text-sm
              `}
            >
              <span className="font-medium">{rec.title}</span>
              {rec.description && (
                <span className={`text-xs ${textMuted} hidden sm:inline`}>
                  {rec.description}
                </span>
              )}
            </LangLink>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className={`self-start sm:self-center p-1.5 rounded ${textMuted} hover:opacity-80 transition-opacity`}
          aria-label={lang === 'pt' ? 'Fechar sugestões' : lang === 'es' ? 'Cerrar sugerencias' : lang === 'fr' ? 'Fermer' : 'Dismiss'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </aside>
  )
}

export default IntelligentNavigationSuggestions
