import { useState, useEffect } from 'react'
import { createTimeoutSignal } from '../utils/fetchWithTimeout'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export interface TeamMember {
  id: string
  slug: string
  name: string
  role: string
  credential?: string
  bio?: string
  photoUrl?: string
  /** Foto dedicada do card no Overview (/studio), proporção 4:3. Vazia = usa photoUrl. */
  cardPhotoUrl?: string | null
  displayOrder: number
}

interface UseTeamReturn {
  members: TeamMember[]
  loading: boolean
  error: Error | null
}

export function useTeam(lang: 'pt' | 'en' | 'es' | 'fr' = 'pt'): UseTeamReturn {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchTeam() {
      try {
        setLoading(true)
        setError(null)

        const url = `${BACKOFFICE_URL}/api/public/team?lang=${lang}`
        const response = await fetch(url, {
          signal: createTimeoutSignal(8000),
          headers: { 'Accept': 'application/json' }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const json = await response.json()

        if (!cancelled && json.success && Array.isArray(json.data)) {
          setMembers(json.data)
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useTeam] Fetch failed, using fallback:', err)
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setMembers([]) // Fallback vazio - componente pode usar dados estáticos
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchTeam()

    return () => {
      cancelled = true
    }
  }, [lang])

  return { members, loading, error }
}
