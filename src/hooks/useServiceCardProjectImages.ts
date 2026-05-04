import { useState, useEffect, useMemo } from 'react'
import { createTimeoutSignal } from '../utils/fetchWithTimeout'
import { SERVICE_CARD_PROJECT_SLUGS } from '../data/serviceCardProjectSlugs'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

function pickHeroUrl(payload: {
  heroImage?: {
    large?: string | null
    medium?: string | null
    original?: string | null
    thumbnail?: string | null
  } | null
  thumbnailUrl?: string | null
}): string | null {
  const h = payload?.heroImage
  if (h) {
    const u = h.large || h.medium || h.original || h.thumbnail
    if (u) return u
  }
  if (payload?.thumbnailUrl) return payload.thumbnailUrl
  return null
}

/**
 * Para cada slug de serviço, obtém a URL da hero do projeto associado (CMS público).
 * Falhas silenciosas: o caller usa getDefaultServiceCardImage.
 */
export function useServiceCardProjectImages(serviceSlugs: string[]): {
  projectImagesByService: Record<string, string>
  loading: boolean
} {
  const [projectImagesByService, setProjectImagesByService] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  const uniqueProjectSlugs = useMemo(() => {
    const seen = new Set<string>()
    const out: string[] = []
    for (const svc of serviceSlugs) {
      const p = SERVICE_CARD_PROJECT_SLUGS[svc]
      if (p && !seen.has(p)) {
        seen.add(p)
        out.push(p)
      }
    }
    return out
  }, [serviceSlugs])

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (uniqueProjectSlugs.length === 0) {
        setProjectImagesByService({})
        setLoading(false)
        return
      }

      setLoading(true)
      const urlByProjectSlug: Record<string, string> = {}

      await Promise.all(
        uniqueProjectSlugs.map(async (projectSlug) => {
          try {
            const res = await fetch(
              `${BACKOFFICE_URL}/api/public/project/${encodeURIComponent(projectSlug)}?lang=pt`,
              {
                signal: createTimeoutSignal(10000),
                headers: { Accept: 'application/json' },
              }
            )
            if (!res.ok) return
            const data = await res.json()
            const url = pickHeroUrl(data)
            if (url) urlByProjectSlug[projectSlug] = url
          } catch {
            /* ignorar — fallback local */
          }
        })
      )

      if (cancelled) return

      const byService: Record<string, string> = {}
      for (const svc of serviceSlugs) {
        const proj = SERVICE_CARD_PROJECT_SLUGS[svc]
        if (proj && urlByProjectSlug[proj]) {
          byService[svc] = urlByProjectSlug[proj]
        }
      }

      setProjectImagesByService(byService)
      setLoading(false)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [uniqueProjectSlugs.join('|'), serviceSlugs.join('|')])

  return { projectImagesByService, loading }
}
