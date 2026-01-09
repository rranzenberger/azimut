import React from 'react'
import { useDescriptionAnalyzer } from '../hooks/useDescriptionAnalyzer'
import { type Lang } from '../i18n'

interface AIDescriptionAnalyzerProps {
  description: string
  language: Lang
  className?: string
}

export const AIDescriptionAnalyzer: React.FC<AIDescriptionAnalyzerProps> = ({
  description,
  language,
  className = ''
}) => {
  const { analysis, loading } = useDescriptionAnalyzer(description, language)

  // Não mostrar nada se não tiver análise ainda
  if (!analysis.analyzed) return null

  const texts: Record<Lang, any> = {
    pt: {
      detected: 'Detectado',
      suggestions: 'Sugestões',
      questions: 'Perguntas úteis',
      budget: 'Orçamento estimado',
      detail: 'Nível de detalhamento'
    },
    en: {
      detected: 'Detected',
      suggestions: 'Suggestions',
      questions: 'Helpful questions',
      budget: 'Estimated budget',
      detail: 'Detail level'
    },
    es: {
      detected: 'Detectado',
      suggestions: 'Sugerencias',
      questions: 'Preguntas útiles',
      budget: 'Presupuesto estimado',
      detail: 'Nivel de detalle'
    },
    fr: {
      detected: 'Détecté',
      suggestions: 'Suggestions',
      questions: 'Questions utiles',
      budget: 'Budget estimé',
      detail: 'Niveau de détail'
    }
  }

  const t = texts[language]

  return (
    <div className={`mt-4 animate-fade-in ${className}`}>
      <div className="p-4 rounded-lg border border-green-500/30 bg-gradient-to-br from-green-900/20 via-green-800/10 to-transparent backdrop-blur-sm">
        {/* Header com ícone de IA */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <div className="flex-1">
            {/* Tipo detectado */}
            {analysis.detectedType && (
              <p className="text-sm font-semibold text-green-300 mb-2">
                ✅ {t.detected}: <span className="text-white">{analysis.detectedType}</span>
              </p>
            )}

            {/* Nível de detalhamento */}
            {analysis.detailLevel && (
              <p className="text-xs text-green-200/70">
                {t.detail}: <span className="capitalize">{analysis.detailLevel}</span>
              </p>
            )}
          </div>
        </div>

        {/* Sugestões */}
        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-green-500/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-2">
              💡 {t.suggestions}:
            </p>
            <ul className="space-y-1.5">
              {analysis.suggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-100/90">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Orçamento estimado */}
        {analysis.estimatedBudgetRange && (
          <div className="mt-3 pt-3 border-t border-green-500/20">
            <p className="text-xs text-green-200/80">
              💰 {t.budget}: <span className="font-semibold text-green-300">{analysis.estimatedBudgetRange}</span>
            </p>
          </div>
        )}

        {/* Perguntas úteis */}
        {analysis.questions && analysis.questions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-green-500/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-2">
              🤔 {t.questions}:
            </p>
            <ul className="space-y-1.5">
              {analysis.questions.slice(0, 3).map((question, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-green-100/80">
                  <span className="text-green-400">→</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {loading && (
          <div className="mt-3 flex items-center gap-2 text-xs text-green-300/60">
            <div className="w-3 h-3 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
            <span>Analisando...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIDescriptionAnalyzer
