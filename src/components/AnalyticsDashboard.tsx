// ════════════════════════════════════════════════════════════
// DASHBOARD DE ANALYTICS - Visual Premium para Estagiário
// ════════════════════════════════════════════════════════════
// Permite visualizar, analisar e exportar dados de leads

import React, { useState, useEffect } from 'react'
import { calculateLeadScore, type LeadScore } from '../utils/analytics'

interface AnalyticsDashboardProps {
  visitorFingerprint?: string
  lang?: 'pt' | 'en' | 'es' | 'fr'
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  visitorFingerprint,
  lang = 'pt'
}) => {
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null)
  const [loading, setLoading] = useState(true)
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')

  useEffect(() => {
    if (visitorFingerprint) {
      calculateLeadScore(visitorFingerprint).then((score) => {
        setLeadScore(score)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [visitorFingerprint])

  const exportData = () => {
    if (!leadScore) return

    const data = {
      timestamp: new Date().toISOString(),
      visitorFingerprint,
      leadScore,
    }

    if (exportFormat === 'csv') {
      const csv = [
        'Metric,Value',
        `Score,${leadScore.score}`,
        `Level,${leadScore.level}`,
        `Pages Visited,${leadScore.factors.pagesVisited}`,
        `Time Spent (s),${leadScore.factors.timeSpent}`,
        `Videos Watched,${leadScore.factors.videosWatched}`,
        `Forms Started,${leadScore.factors.formsStarted}`,
        `Forms Completed,${leadScore.factors.formsCompleted}`,
        `Scroll Depth (%),${leadScore.factors.scrollDepth}`,
        `CTA Clicks,${leadScore.factors.ctaClicks}`,
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lead-analytics-${visitorFingerprint || 'unknown'}-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lead-analytics-${visitorFingerprint || 'unknown'}-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  if (loading) {
    return (
      <div className="p-6 card-adaptive rounded-xl">
        <p className="text-theme-card-text-secondary">Carregando dados...</p>
      </div>
    )
  }

  if (!leadScore) {
    return (
      <div className="p-6 card-adaptive rounded-xl">
        <p className="text-theme-card-text-secondary">Nenhum dado disponível</p>
      </div>
    )
  }

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'hot': return 'text-green-400'
      case 'warm': return 'text-yellow-400'
      default: return 'text-blue-400'
    }
  }

  const getScoreBg = (level: string) => {
    switch (level) {
      case 'hot': return 'bg-green-500/20 border-green-500/50'
      case 'warm': return 'bg-yellow-500/20 border-yellow-500/50'
      default: return 'bg-blue-500/20 border-blue-500/50'
    }
  }

  const content = {
    pt: {
      title: 'Análise de Lead',
      score: 'Score',
      level: 'Nível',
      factors: 'Fatores',
      export: 'Exportar Dados',
      pagesVisited: 'Páginas Visitadas',
      timeSpent: 'Tempo Gasto (s)',
      videosWatched: 'Vídeos Assistidos',
      formsStarted: 'Formulários Iniciados',
      formsCompleted: 'Formulários Completos',
      scrollDepth: 'Profundidade de Scroll (%)',
      ctaClicks: 'Cliques em CTAs',
      hot: 'Quente',
      warm: 'Morno',
      cold: 'Frio',
    },
    en: {
      title: 'Lead Analysis',
      score: 'Score',
      level: 'Level',
      factors: 'Factors',
      export: 'Export Data',
      pagesVisited: 'Pages Visited',
      timeSpent: 'Time Spent (s)',
      videosWatched: 'Videos Watched',
      formsStarted: 'Forms Started',
      formsCompleted: 'Forms Completed',
      scrollDepth: 'Scroll Depth (%)',
      ctaClicks: 'CTA Clicks',
      hot: 'Hot',
      warm: 'Warm',
      cold: 'Cold',
    },
    es: {
      title: 'Análisis de Lead',
      score: 'Puntuación',
      level: 'Nivel',
      factors: 'Factores',
      export: 'Exportar Datos',
      pagesVisited: 'Páginas Visitadas',
      timeSpent: 'Tiempo Gastado (s)',
      videosWatched: 'Videos Vistos',
      formsStarted: 'Formularios Iniciados',
      formsCompleted: 'Formularios Completados',
      scrollDepth: 'Profundidad de Scroll (%)',
      ctaClicks: 'Clics en CTAs',
      hot: 'Caliente',
      warm: 'Tibio',
      cold: 'Frío',
    },
    fr: {
      title: 'Analyse de Lead',
      score: 'Score',
      level: 'Niveau',
      factors: 'Facteurs',
      export: 'Exporter les Données',
      pagesVisited: 'Pages Visitées',
      timeSpent: 'Temps Passé (s)',
      videosWatched: 'Vidéos Regardées',
      formsStarted: 'Formulaires Démarrés',
      formsCompleted: 'Formulaires Complétés',
      scrollDepth: 'Profondeur de Scroll (%)',
      ctaClicks: 'Clics sur CTAs',
      hot: 'Chaud',
      warm: 'Tiède',
      cold: 'Froid',
    },
  }

  const t = content[lang]

  return (
    <div className="p-6 card-adaptive rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-handel uppercase text-theme-card-text">{t.title}</h3>
        <div className="flex items-center gap-2">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
            className="dropdown-azimut text-sm"
            style={{ width: '80px' }}
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-azimut-red hover:bg-azimut-red/90 text-white rounded-lg text-sm font-semibold transition-all"
          >
            {t.export}
          </button>
        </div>
      </div>

      {/* Score Principal */}
      <div className={`mb-6 p-6 rounded-xl border-2 ${getScoreBg(leadScore.level)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-theme-card-text-secondary mb-1">{t.score}</p>
            <p className={`text-4xl font-bold ${getScoreColor(leadScore.level)}`}>
              {leadScore.score}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-theme-card-text-secondary mb-1">{t.level}</p>
            <p className={`text-2xl font-bold uppercase ${getScoreColor(leadScore.level)}`}>
              {leadScore.level === 'hot' ? t.hot : leadScore.level === 'warm' ? t.warm : t.cold}
            </p>
          </div>
        </div>
      </div>

      {/* Fatores */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase text-theme-card-text-secondary mb-3">
          {t.factors}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-xs text-theme-card-text-secondary mb-1">{t.pagesVisited}</p>
            <p className="text-lg font-bold text-theme-card-text">{leadScore.factors.pagesVisited}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-xs text-theme-card-text-secondary mb-1">{t.timeSpent}</p>
            <p className="text-lg font-bold text-theme-card-text">{leadScore.factors.timeSpent}s</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-xs text-theme-card-text-secondary mb-1">{t.videosWatched}</p>
            <p className="text-lg font-bold text-theme-card-text">{leadScore.factors.videosWatched}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-xs text-theme-card-text-secondary mb-1">{t.formsStarted}</p>
            <p className="text-lg font-bold text-theme-card-text">{leadScore.factors.formsStarted}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-xs text-theme-card-text-secondary mb-1">{t.formsCompleted}</p>
            <p className="text-lg font-bold text-theme-card-text">{leadScore.factors.formsCompleted}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-xs text-theme-card-text-secondary mb-1">{t.scrollDepth}</p>
            <p className="text-lg font-bold text-theme-card-text">{leadScore.factors.scrollDepth}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
