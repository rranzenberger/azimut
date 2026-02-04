import { useState, useEffect } from 'react'
import { createTimeoutSignal } from '../utils/fetchWithTimeout'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export interface Credential {
  id: string
  icon?: string
  text: string
  order: number
}

interface UseCredentialsReturn {
  credentials: Credential[]
  loading: boolean
  error: Error | null
}

export function useCredentials(lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'): UseCredentialsReturn {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchCredentials() {
      try {
        setLoading(true)
        setError(null)

        const url = `${BACKOFFICE_URL}/api/public/credentials?lang=${lang}`
        const response = await fetch(url, {
          signal: createTimeoutSignal(8000),
          headers: { 'Accept': 'application/json' }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const json = await response.json()

        if (!cancelled && json.success && Array.isArray(json.data)) {
          setCredentials(json.data)
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useCredentials] Fetch failed, using fallback:', err)
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setCredentials([]) // Fallback vazio - componente pode usar dados estáticos
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchCredentials()

    return () => {
      cancelled = true
    }
  }, [lang])

  return { credentials, loading, error }
}
