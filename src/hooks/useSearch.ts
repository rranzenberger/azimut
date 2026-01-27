// ═══════════════════════════════════════════════════════════════
// USE SEARCH - Hook para Busca Global Premium
// ═══════════════════════════════════════════════════════════════
// Busca em projetos, serviços, páginas e blog
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from 'react'
import { type Lang } from '../i18n'
import { useBackofficeProjects } from './useBackofficeProjects'
import { useBackofficeServices } from './useBackofficeServices'
import { useAzimutContent } from './useAzimutContent'
import { servicesData, getServiceTitle, getServiceShortDesc } from '../data/servicesData'

export interface SearchResult {
  path: string
  title: string
  description?: string
  icon: string
  category: string
}

interface UseSearchReturn {
  results: SearchResult[]
  loading: boolean
}

/**
 * Hook para busca global no site
 * Busca em: projetos, serviços, páginas, blog
 */
export function useSearch(query: string, lang: Lang = 'pt'): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  // Buscar dados do backoffice
  const { projects, loading: projectsLoading } = useBackofficeProjects(lang)
  const { services: backofficeServices, loading: servicesLoading } = useBackofficeServices(lang)
  const { content: pagesContent, loading: pagesLoading } = useAzimutContent({ page: 'home', lang })

  // Combinar serviços do backoffice com fallback local
  const allServices = useMemo(() => {
    if (backofficeServices.length > 0) {
      return backofficeServices
    }
    // Fallback para servicesData
    return servicesData.map(service => ({
      slug: service.slug,
      title: getServiceTitle(service, lang),
      description: getServiceShortDesc(service, lang),
      icon: service.icon
    }))
  }, [backofficeServices, lang])

  // Buscar quando query mudar
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)

    // Delay para evitar muitas buscas enquanto digita
    const timeoutId = setTimeout(() => {
      const searchResults: SearchResult[] = []
      const queryLower = query.toLowerCase().trim()

      // 1. Buscar em PROJETOS
      projects.forEach(project => {
        const title = project.title?.toLowerCase() || ''
        const summary = project.summary?.toLowerCase() || ''
        const tags = (project.tags || []).join(' ').toLowerCase()
        const city = project.city?.toLowerCase() || ''
        const country = project.country?.toLowerCase() || ''

        if (
          title.includes(queryLower) ||
          summary.includes(queryLower) ||
          tags.includes(queryLower) ||
          city.includes(queryLower) ||
          country.includes(queryLower)
        ) {
          searchResults.push({
            path: `/${lang === 'pt' ? '' : lang}/work/${project.slug}`,
            title: project.title,
            description: project.summary || project.shortTitle,
            icon: '🎬',
            category: lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : lang === 'fr' ? 'Projets' : 'Projects'
          })
        }
      })

      // 2. Buscar em SERVIÇOS
      allServices.forEach(service => {
        const title = service.title?.toLowerCase() || ''
        const description = service.description?.toLowerCase() || ''
        const slug = service.slug?.toLowerCase() || ''

        if (
          title.includes(queryLower) ||
          description.includes(queryLower) ||
          slug.includes(queryLower)
        ) {
          searchResults.push({
            path: `/${lang === 'pt' ? '' : lang}/what#${service.slug}`,
            title: service.title,
            description: service.description,
            icon: service.icon || '⚡',
            category: lang === 'pt' ? 'Serviços' : lang === 'es' ? 'Servicios' : lang === 'fr' ? 'Services' : 'Services'
          })
        }
      })

      // 3. Buscar em PÁGINAS (do backoffice)
      if (pagesContent?.pages) {
        const pages = Array.isArray(pagesContent.pages) ? pagesContent.pages : []
        pages.forEach((page: any) => {
          const title = (page.title || page.heroSlogan || '').toLowerCase()
          const description = (page.description || page.heroSubtitle || '').toLowerCase()
          const slug = (page.slug || '').toLowerCase()

          if (
            title.includes(queryLower) ||
            description.includes(queryLower) ||
            slug.includes(queryLower)
          ) {
            const pageSlug = page.slug || 'home'
            const pagePath = pageSlug === 'home' 
              ? `/${lang === 'pt' ? '' : lang}`
              : `/${lang === 'pt' ? '' : lang}/${pageSlug}`

            searchResults.push({
              path: pagePath,
              title: page.title || page.heroSlogan || pageSlug,
              description: page.description || page.heroSubtitle,
              icon: '📄',
              category: lang === 'pt' ? 'Páginas' : lang === 'es' ? 'Páginas' : lang === 'fr' ? 'Pages' : 'Pages'
            })
          }
        })
      }

      // 4. Páginas estáticas conhecidas
      const staticPages = [
        {
          slug: 'studio',
          title: lang === 'pt' ? 'Estúdio' : lang === 'es' ? 'Estudio' : lang === 'fr' ? 'Studio' : 'Studio',
          description: lang === 'pt' ? 'Conheça nosso estúdio' : lang === 'es' ? 'Conoce nuestro estudio' : lang === 'fr' ? 'Découvrez notre studio' : 'Meet our studio',
          icon: '🎨'
        },
        {
          slug: 'academy',
          title: lang === 'pt' ? 'Academy' : lang === 'es' ? 'Academy' : lang === 'fr' ? 'Académie' : 'Academy',
          description: lang === 'pt' ? 'Cursos e formação' : lang === 'es' ? 'Cursos y formación' : lang === 'fr' ? 'Cours et formation' : 'Courses and training',
          icon: '🎓'
        },
        {
          slug: 'contact',
          title: lang === 'pt' ? 'Contato' : lang === 'es' ? 'Contacto' : lang === 'fr' ? 'Contact' : 'Contact',
          description: lang === 'pt' ? 'Entre em contato' : lang === 'es' ? 'Contáctanos' : lang === 'fr' ? 'Contactez-nous' : 'Get in touch',
          icon: '📧'
        }
      ]

      staticPages.forEach(page => {
        const title = page.title.toLowerCase()
        const description = page.description.toLowerCase()
        const slug = page.slug.toLowerCase()

        if (
          title.includes(queryLower) ||
          description.includes(queryLower) ||
          slug.includes(queryLower)
        ) {
          searchResults.push({
            path: `/${lang === 'pt' ? '' : lang}/${page.slug}`,
            title: page.title,
            description: page.description,
            icon: page.icon,
            category: lang === 'pt' ? 'Páginas' : lang === 'es' ? 'Páginas' : lang === 'fr' ? 'Pages' : 'Pages'
          })
        }
      })

      // Ordenar por relevância (título primeiro, depois descrição)
      searchResults.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(queryLower)
        const bTitleMatch = b.title.toLowerCase().includes(queryLower)
        
        if (aTitleMatch && !bTitleMatch) return -1
        if (!aTitleMatch && bTitleMatch) return 1
        
        return 0
      })

      setResults(searchResults)
      setLoading(false)
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timeoutId)
  }, [query, projects, allServices, pagesContent, lang])

  // Loading state
  useEffect(() => {
    if (projectsLoading || servicesLoading || pagesLoading) {
      setLoading(true)
    }
  }, [projectsLoading, servicesLoading, pagesLoading])

  return { results, loading }
}
