/**
 * Hook para listar itens de imprensa (releases) do backoffice
 * Usado na página /press
 */

import { useState, useEffect } from 'react'
import { createTimeoutSignal } from '../utils/fetchWithTimeout'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export interface PressItem {
  id: string
  title: string
  summary: string | null
  url: string | null
  publishedAt: string | null
  displayOrder: number
}

interface UsePressReturn {
  items: PressItem[]
  loading: boolean
  error: Error | null
}

export function usePress(lang: 'pt' | 'en' | 'es' | 'fr' = 'pt', options?: { limit?: number; offset?: number }): UsePressReturn {
  const [items, setItems] = useState<PressItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const limit = options?.limit ?? 50
  const offset = options?.offset ?? 0

  useEffect(() => {
    let isCancelled = false

    async function fetchPress() {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams({ lang, limit: String(limit), offset: String(offset) })
        const response = await fetch(`${BACKOFFICE_URL}/api/public/press?${params}`, {
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

    fetchPress()
    return () => { isCancelled = true }
  }, [lang, limit, offset])

  return { items, loading, error }
}
