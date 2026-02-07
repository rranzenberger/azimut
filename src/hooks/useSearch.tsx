// ════════════════════════════════════════════════════════════
// USE SEARCH - Hook para Sistema de Busca
// ════════════════════════════════════════════════════════════
// Hook isolado - não mexe em rotas ou páginas existentes
// ════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from 'react'
import { type Lang } from '../i18n'

interface SearchResult {
  title: string
  description?: string
  path: string
  category: string
  icon: React.ReactNode
}

export function useSearch(query: string, lang: Lang) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  // Índice de busca (simulado - pode ser expandido com API)
  const searchIndex = useMemo(() => {
    return [
      // Páginas principais
      {
        title: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home',
        description: lang === 'pt' ? 'Página inicial' : lang === 'es' ? 'Página de inicio' : lang === 'fr' ? 'Page d\'accueil' : 'Homepage',
        path: `/${lang}`,
        category: lang === 'pt' ? 'Página' : lang === 'es' ? 'Página' : lang === 'fr' ? 'Page' : 'Page',
        keywords: ['home', 'inicio', 'accueil', 'homepage']
      },
      {
        title: lang === 'pt' ? 'Serviços' : lang === 'es' ? 'Soluciones' : lang === 'fr' ? 'Solutions' : 'Solutions',
        description: lang === 'pt' ? 'Nossos serviços e especialidades' : lang === 'es' ? 'Nuestros servicios y especialidades' : lang === 'fr' ? 'Nos services et spécialités' : 'Our services and specialties',
        path: `/${lang}/what`,
        category: lang === 'pt' ? 'Página' : lang === 'es' ? 'Página' : lang === 'fr' ? 'Page' : 'Page',
        keywords: ['solutions', 'soluciones', 'services', 'servicios', 'what']
      },
      {
        title: lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : lang === 'fr' ? 'Projets' : 'Work',
        description: lang === 'pt' ? 'Nossos projetos e trabalhos' : lang === 'es' ? 'Nuestros proyectos y trabajos' : lang === 'fr' ? 'Nos projets et travaux' : 'Our projects and work',
        path: `/${lang}/work`,
        category: lang === 'pt' ? 'Página' : lang === 'es' ? 'Página' : lang === 'fr' ? 'Page' : 'Page',
        keywords: ['projects', 'proyectos', 'work', 'trabalhos', 'travaux']
      },
      {
        title: lang === 'pt' ? 'Estúdio' : lang === 'es' ? 'Estudio' : lang === 'fr' ? 'Studio' : 'Studio',
        description: lang === 'pt' ? 'Sobre nosso estúdio' : lang === 'es' ? 'Sobre nuestro estudio' : lang === 'fr' ? 'À propos de notre studio' : 'About our studio',
        path: `/${lang}/studio`,
        category: lang === 'pt' ? 'Página' : lang === 'es' ? 'Página' : lang === 'fr' ? 'Page' : 'Page',
        keywords: ['studio', 'estudio', 'about', 'sobre']
      },
      {
        title: lang === 'pt' ? 'Academy' : 'Academy',
        description: lang === 'pt' ? 'Cursos e educação' : lang === 'es' ? 'Cursos y educación' : lang === 'fr' ? 'Cours et éducation' : 'Courses and education',
        path: `/${lang}/academy`,
        category: lang === 'pt' ? 'Página' : lang === 'es' ? 'Página' : lang === 'fr' ? 'Page' : 'Page',
        keywords: ['academy', 'academia', 'courses', 'cursos', 'education', 'educação']
      },
      {
        title: lang === 'pt' ? 'Contato' : lang === 'es' ? 'Contacto' : lang === 'fr' ? 'Contact' : 'Contact',
        description: lang === 'pt' ? 'Entre em contato' : lang === 'es' ? 'Póngase en contacto' : lang === 'fr' ? 'Contactez-nous' : 'Get in touch',
        path: `/${lang}/contact`,
        category: lang === 'pt' ? 'Página' : lang === 'es' ? 'Página' : lang === 'fr' ? 'Page' : 'Page',
        keywords: ['contact', 'contacto', 'contato']
      },
      // Serviços e Especialidades
      {
        title: lang === 'pt' ? 'Curadoria de Arte' : lang === 'es' ? 'Curaduría de Arte' : lang === 'fr' ? 'Curation d\'Art' : 'Art Curation',
        description: lang === 'pt' ? 'Curadoria e produção para museus, festivais e eventos culturais' : lang === 'es' ? 'Curaduría y producción para museos, festivales y eventos culturales' : lang === 'fr' ? 'Curation et production pour musées, festivals et événements culturels' : 'Curation and production for museums, festivals and cultural events',
        path: `/${lang}/what`,
        category: lang === 'pt' ? 'Serviço' : lang === 'es' ? 'Servicio' : lang === 'fr' ? 'Service' : 'Service',
        keywords: ['curadoria', 'curaduría', 'curation', 'arte', 'art', 'museus', 'museos', 'museums', 'festivais', 'festivals', 'cultura', 'culture']
      },
      {
        title: lang === 'pt' ? 'Museus & Exposições' : lang === 'es' ? 'Museos & Exposiciones' : lang === 'fr' ? 'Musées & Expositions' : 'Museums & Exhibitions',
        description: lang === 'pt' ? 'Experiências imersivas para museus e espaços culturais' : lang === 'es' ? 'Experiencias inmersivas para museos y espacios culturales' : lang === 'fr' ? 'Expériences immersives pour musées et espaces culturels' : 'Immersive experiences for museums and cultural spaces',
        path: `/${lang}/what/museus-exposicoes`,
        category: lang === 'pt' ? 'Serviço' : lang === 'es' ? 'Servicio' : lang === 'fr' ? 'Service' : 'Service',
        keywords: ['museus', 'museos', 'museums', 'exposições', 'exposiciones', 'exhibitions', 'cultura', 'culture', 'imersivo', 'immersive']
      },
      {
        title: lang === 'pt' ? 'Realidade Virtual (VR)' : lang === 'es' ? 'Realidad Virtual (VR)' : lang === 'fr' ? 'Réalité Virtuelle (VR)' : 'Virtual Reality (VR)',
        description: lang === 'pt' ? 'Experiências VR imersivas para museus, eventos e marcas' : lang === 'es' ? 'Experiencias VR inmersivas para museos, eventos y marcas' : lang === 'fr' ? 'Expériences VR immersives pour musées, événements et marques' : 'Immersive VR experiences for museums, events and brands',
        path: `/${lang}/what/vr-virtual-reality`,
        category: lang === 'pt' ? 'Serviço' : lang === 'es' ? 'Servicio' : lang === 'fr' ? 'Service' : 'Service',
        keywords: ['vr', 'virtual reality', 'realidade virtual', 'realidad virtual', 'imersivo', 'immersive']
      },
      {
        title: lang === 'pt' ? 'Cinema & Audiovisual' : lang === 'es' ? 'Cine & Audiovisual' : lang === 'fr' ? 'Cinéma & Audiovisuel' : 'Cinema & Audiovisual',
        description: lang === 'pt' ? 'Produção cinematográfica e conteúdo audiovisual' : lang === 'es' ? 'Producción cinematográfica y contenido audiovisual' : lang === 'fr' ? 'Production cinématographique et contenu audiovisuel' : 'Film production and audiovisual content',
        path: `/${lang}/what/cinema-audiovisual`,
        category: lang === 'pt' ? 'Serviço' : lang === 'es' ? 'Servicio' : lang === 'fr' ? 'Service' : 'Service',
        keywords: ['cinema', 'cine', 'audiovisual', 'filme', 'film', 'produção', 'producción', 'production']
      }
    ]
  }, [lang])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)

    // Simular delay de busca (pode ser removido se usar API)
    const timer = setTimeout(() => {
      const searchTerm = query.toLowerCase().trim()
      
      const matched = searchIndex
        .filter(item => {
          const searchableText = [
            item.title,
            item.description,
            ...item.keywords
          ].join(' ').toLowerCase()
          
          return searchableText.includes(searchTerm)
        })
        .map(item => ({
          ...item,
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        }))
        .slice(0, 10) // Limitar a 10 resultados

      setResults(matched)
      setLoading(false)
    }, 150) // Debounce de 150ms

    return () => clearTimeout(timer)
  }, [query, searchIndex])

  return { results, loading }
}
