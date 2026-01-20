// ════════════════════════════════════════════════════════════
// COMPONENTE: CompanyTimeline
// ════════════════════════════════════════════════════════════
// Timeline completa da empresa usando dados reais da API
// - Busca dados de /api/public/history
// - Usa AnimatedTimeline para renderização
// - Suporta multilíngue
// - Filtros por tipo, featured, período
// ════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'
import { AnimatedTimeline, TimelineStep } from './AnimatedTimeline'
import { Lang } from '../i18n'

interface CompanyHistoryItem {
  id: string
  year: number
  yearEnd: number | null
  period: string
  type: string
  title: string
  description: string | null
  bullets: string[]
  icon: string | null
  logoUrl: string | null
  externalLink: string | null
  isFeatured: boolean
}

interface CompanyTimelineProps {
  lang: Lang
  type?: string // Filtrar por tipo
  featured?: boolean // Mostrar apenas featured
  yearStart?: number
  yearEnd?: number
  layout?: 'vertical' | 'horizontal'
  className?: string
}

export const CompanyTimeline: React.FC<CompanyTimelineProps> = ({
  lang,
  type,
  featured,
  yearStart,
  yearEnd,
  layout = 'vertical',
  className = ''
}) => {
  const [history, setHistory] = useState<CompanyHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHistory()
  }, [lang, type, featured, yearStart, yearEnd])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      
      // Construir URL com query params
      const params = new URLSearchParams()
      params.set('lang', lang)
      if (type) params.set('type', type)
      if (featured !== undefined) params.set('featured', featured.toString())
      if (yearStart) params.set('yearStart', yearStart.toString())
      if (yearEnd) params.set('yearEnd', yearEnd.toString())

      const apiUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
      const response = await fetch(`${apiUrl}/api/public/history?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch company history')
      }

      const data = await response.json()
      
      if (data.success) {
        setHistory(data.data)
      } else {
        throw new Error(data.error || 'Unknown error')
      }
    } catch (err) {
      console.error('[CompanyTimeline] Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load timeline')
    } finally {
      setLoading(false)
    }
  }

  // Converter para formato AnimatedTimeline
  const convertToTimelineSteps = (): TimelineStep[] => {
    return history.map(item => ({
      date: item.period,
      icon: item.icon || '📌',
      title: item.title,
      description: item.description || '',
      badge: item.isFeatured ? (lang === 'pt' ? 'Destaque' : lang === 'en' ? 'Featured' : lang === 'es' ? 'Destacado' : 'En vedette') : undefined,
      image: item.logoUrl || undefined,
      link: item.externalLink ? {
        text: lang === 'pt' ? 'Saiba mais' : lang === 'en' ? 'Learn more' : lang === 'es' ? 'Saber más' : 'En savoir plus',
        url: item.externalLink
      } : undefined
    }))
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-azimut-red border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/60">
            {lang === 'pt' ? 'Carregando timeline...' : 
             lang === 'en' ? 'Loading timeline...' : 
             lang === 'es' ? 'Cargando timeline...' : 
             'Chargement timeline...'}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="card-adaptive rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'pt' ? 'Erro ao carregar timeline' :
           lang === 'en' ? 'Error loading timeline' :
           lang === 'es' ? 'Error al cargar timeline' :
           'Erreur de chargement timeline'}
        </h3>
        <p className="text-white/60 mb-4">{error}</p>
        <button
          onClick={fetchHistory}
          className="px-6 py-2 bg-azimut-red text-white rounded-lg hover:bg-azimut-red/80 transition-colors"
        >
          {lang === 'pt' ? 'Tentar novamente' :
           lang === 'en' ? 'Try again' :
           lang === 'es' ? 'Intentar de nuevo' :
           'Réessayer'}
        </button>
      </div>
    )
  }

  // Empty state
  if (history.length === 0) {
    return (
      <div className="card-adaptive rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'pt' ? 'Nenhum evento encontrado' :
           lang === 'en' ? 'No events found' :
           lang === 'es' ? 'No se encontraron eventos' :
           'Aucun événement trouvé'}
        </h3>
        <p className="text-white/60">
          {lang === 'pt' ? 'Tente ajustar os filtros.' :
           lang === 'en' ? 'Try adjusting the filters.' :
           lang === 'es' ? 'Intente ajustar los filtros.' :
           'Essayez d\'ajuster les filtres.'}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Estatísticas (opcional) */}
      <div className="mb-8 text-center">
        <p className="text-white/60">
          {history.length} {lang === 'pt' ? 'eventos' : lang === 'en' ? 'events' : lang === 'es' ? 'eventos' : 'événements'}
          {' • '}
          {history[0]?.year} - {history[history.length - 1]?.year}
        </p>
      </div>

      {/* Timeline */}
      <AnimatedTimeline
        steps={convertToTimelineSteps()}
        layout={layout}
        className="max-w-4xl mx-auto"
      />

      {/* Expandir com bullets se existirem */}
      {history.some(h => h.bullets && h.bullets.length > 0) && (
        <div className="mt-12 space-y-6">
          {history.filter(h => h.bullets && h.bullets.length > 0).map(item => (
            <div key={item.id} className="card-adaptive rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{item.icon || '📌'}</span>
                <div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <span className="text-sm text-white/60 font-mono">{item.period}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/70">
                    <span className="text-azimut-red mt-1">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CompanyTimeline
