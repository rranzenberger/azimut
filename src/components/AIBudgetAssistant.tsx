import React, { useState, useEffect } from 'react'
import { useBudgetEstimator } from '../hooks/useBudgetEstimator'
import { type Lang } from '../i18n'

interface AIBudgetAssistantProps {
  projectType?: string
  description?: string
  organizationType?: string
  language: Lang
  className?: string
}

export const AIBudgetAssistant: React.FC<AIBudgetAssistantProps> = ({
  projectType,
  description,
  organizationType,
  language,
  className = ''
}) => {
  const { estimate, loading, getEstimate } = useBudgetEstimator()
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Só estimar se tiver info suficiente
    if (projectType || (description && description.length > 50)) {
      getEstimate({
        projectType,
        description,
        organizationType,
        language
      })
    }
  }, [projectType, description, organizationType])

  if (!estimate || !estimate.success) return null

  const texts: Record<Lang, any> = {
    pt: {
      title: 'Estimativa Inteligente',
      range: 'Faixa de Orçamento',
      confidence: 'Confiança',
      breakdown: 'Distribuição de Custos',
      timeline: 'Prazo Estimado',
      options: 'Opções de Budget',
      additional: 'Custos Adicionais',
      recommendations: 'Recomendações',
      seeMore: 'Ver detalhes',
      seeLess: 'Ocultar',
      note: 'Esta é uma estimativa automática baseada em projetos similares. Preencha o formulário para orçamento preciso.'
    },
    en: {
      title: 'Smart Estimate',
      range: 'Budget Range',
      confidence: 'Confidence',
      breakdown: 'Cost Breakdown',
      timeline: 'Estimated Timeline',
      options: 'Budget Options',
      additional: 'Additional Costs',
      recommendations: 'Recommendations',
      seeMore: 'See details',
      seeLess: 'Hide',
      note: 'This is an automatic estimate based on similar projects. Fill the form for an accurate quote.'
    },
    es: {
      title: 'Estimación Inteligente',
      range: 'Rango de Presupuesto',
      confidence: 'Confianza',
      breakdown: 'Distribución de Costos',
      timeline: 'Plazo Estimado',
      options: 'Opciones de Presupuesto',
      additional: 'Costos Adicionales',
      recommendations: 'Recomendaciones',
      seeMore: 'Ver detalles',
      seeLess: 'Ocultar',
      note: 'Esta es una estimación automática basada en proyectos similares. Complete el formulario para un presupuesto preciso.'
    },
    fr: {
      title: 'Estimation Intelligente',
      range: 'Fourchette de Budget',
      confidence: 'Confiance',
      breakdown: 'Répartition des Coûts',
      timeline: 'Délai Estimé',
      options: 'Options de Budget',
      additional: 'Coûts Supplémentaires',
      recommendations: 'Recommandations',
      seeMore: 'Voir détails',
      seeLess: 'Masquer',
      note: 'Ceci est une estimation automatique basée sur des projets similaires. Remplissez le formulaire pour un devis précis.'
    }
  }

  const t = texts[language]

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className={`mt-6 animate-fade-in ${className}`}>
      <div className="p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-blue-300 mb-1">
                💡 {t.title}
              </h3>
              <p className="text-xs text-blue-200/70">
                {t.note}
              </p>
            </div>
          </div>

          {loading && (
            <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
          )}
        </div>

        {/* Orçamento estimado - Grande destaque */}
        {estimate.estimatedRange && (
          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300/70 uppercase tracking-wider mb-1">
              {t.range}
            </p>
            <p className="text-2xl font-bold text-blue-200">
              {formatCurrency(estimate.estimatedRange.min, estimate.estimatedRange.currency)}
              {' - '}
              {formatCurrency(estimate.estimatedRange.max, estimate.estimatedRange.currency)}
            </p>
            {estimate.confidence && (
              <p className="text-xs text-blue-300/60 mt-1">
                {t.confidence}: <span className="capitalize">{estimate.confidence}</span>
              </p>
            )}
          </div>
        )}

        {/* Timeline */}
        {estimate.timeline && (
          <div className="mt-3 flex items-center gap-2 text-sm text-blue-200/80">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t.timeline}: <strong>{estimate.timeline}</strong></span>
          </div>
        )}

        {/* Botão Ver Mais */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-1"
        >
          {expanded ? t.seeLess : t.seeMore}
          <svg 
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Detalhes expandidos */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-blue-500/20 space-y-4 animate-fade-in">
            {/* Distribuição de custos */}
            {estimate.breakdown && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300/80 mb-2">
                  {t.breakdown}:
                </p>
                <div className="space-y-1">
                  {Object.entries(estimate.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm text-blue-200/80">
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opções de budget */}
            {estimate.options && estimate.options.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300/80 mb-2">
                  {t.options}:
                </p>
                <div className="space-y-2">
                  {estimate.options.map((option, i) => (
                    <div key={i} className="p-3 bg-blue-500/5 rounded border border-blue-500/10">
                      <p className="font-semibold text-sm text-blue-200 capitalize mb-1">
                        {option.tier}: {option.budget}
                      </p>
                      <ul className="text-xs text-blue-200/70 space-y-0.5">
                        {option.includes.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custos adicionais */}
            {estimate.additionalCosts && estimate.additionalCosts.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300/80 mb-2">
                  ⚠️ {t.additional}:
                </p>
                <ul className="space-y-1">
                  {estimate.additionalCosts.map((cost, i) => (
                    <li key={i} className="text-xs text-blue-200/70 flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>{cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recomendações */}
            {estimate.recommendations && estimate.recommendations.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300/80 mb-2">
                  💡 {t.recommendations}:
                </p>
                <ul className="space-y-1">
                  {estimate.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-blue-200/80 flex items-start gap-2">
                      <span className="text-blue-400">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AIBudgetAssistant
