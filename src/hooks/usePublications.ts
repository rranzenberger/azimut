/**
 * Hook para listar publicações (Research & Lab) do backoffice
 * Usado na página /academy/research
 */

import { useState, useEffect } from 'react'
import { createTimeoutSignal } from '../utils/fetchWithTimeout'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export interface PublicationItem {
  id: string
  title: string
  authors: string | null
  url: string | null
  year: number | null
  displayOrder: number
}

interface UsePublicationsReturn {
  items: PublicationItem[]
  loading: boolean
  error: Error | null
}

export function usePublications(
  lang: 'pt' | 'en' | 'es' | 'fr' = 'pt',
  options?: { limit?: number; offset?: number; year?: number }
): UsePublicationsReturn {
  const [items, setItems] = useState<PublicationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const limit = options?.limit ?? 50
  const offset = options?.offset ?? 0
  const year = options?.year

  useEffect(() => {
    let isCancelled = false

    async function fetchPublications() {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams({ lang, limit: String(limit), offset: String(offset) })
        if (year != null) params.set('year', String(year))
        const response = await fetch(`${BACKOFFICE_URL}/api/public/publications?${params}`, {
          signal: createTimeoutSignal(8000),
          headers: { Accept: 'application/json' }
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const json = await response.json()

        if (isCancelled) return
        if (json.success && Array.isArray(json.data)) {
          setItems(json.data)
        } else {
          setItems([])
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err as Error)
          setItems([])
        }
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchPublications()
    return () => { isCancelled = true }
  }, [lang, limit, offset, year])

  return { items, loading, error }
}
