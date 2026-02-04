import { useState, useEffect } from 'react'
import { createTimeoutSignal } from '../utils/fetchWithTimeout'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export interface HistoryItem {
  id: string
  year: number
  yearEnd?: number
  period: string
  type: 'milestone' | 'partnership' | 'project' | 'award' | 'location' | 'other'
  title: string
  description?: string
  bullets?: string[]
  icon?: string
  logoUrl?: string
  externalLink?: string
  isFeatured: boolean
}

interface UseHistoryOptions {
  type?: string
  featured?: boolean
  yearStart?: number
  yearEnd?: number
}

interface UseHistoryReturn {
  items: HistoryItem[]
  loading: boolean
  error: Error | null
  stats: {
    total: number
    featured: number
    types: Record<string, number>
    yearRange: { start: number | null; end: number | null }
  } | null
}

export function useHistory(
  lang: 'pt' | 'en' | 'es' | 'fr' = 'pt',
  options?: UseHistoryOptions
): UseHistoryReturn {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [stats, setStats] = useState<UseHistoryReturn['stats']>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchHistory() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams({ lang })
        if (options?.type) params.set('type', options.type)
        if (options?.featured !== undefined) params.set('featured', String(options.featured))
        if (options?.yearStart) params.set('yearStart', String(options.yearStart))
        if (options?.yearEnd) params.set('yearEnd', String(options.yearEnd))

        const url = `${BACKOFFICE_URL}/api/public/history?${params}`
        const response = await fetch(url, {
          signal: createTimeoutSignal(8000),
          headers: { 'Accept': 'application/json' }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const json = await response.json()

        if (!cancelled && json.success && Array.isArray(json.data)) {
          setItems(json.data)
          if (json.stats) {
            setStats(json.stats)
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useHistory] Fetch failed, using fallback:', err)
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setItems([]) // Fallback vazio - componente pode usar dados estáticos
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchHistory()

    return () => {
      cancelled = true
    }
  }, [lang, options?.type, options?.featured, options?.yearStart, options?.yearEnd])

  return { items, loading, error, stats }
}
