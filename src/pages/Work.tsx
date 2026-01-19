import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { usePageSEO } from '../hooks/usePageSEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { trackPageView, trackProjectInteraction } from '../utils/analytics'
import InternalNavigation from '../components/InternalNavigation'
// MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
import { useAzimutContent } from '../hooks/useAzimutContent'
import { usePersonalizedContent } from '../hooks/usePersonalizedContent'
import OportunidadesAtivas from '../components/OportunidadesAtivas'
import CredibilidadeEditais from '../components/CredibilidadeEditais'
import CuradoriaFestivais from '../components/CuradoriaFestivais'
import StarBackground from '../components/StarBackground'
import OptimizedImage from '../components/OptimizedImage'

interface WorkProps {
  lang: Lang
}

const Work: React.FC<WorkProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  const navigate = useNavigate()
  const location = useLocation()
  const seo = seoData.work[lang]
  
  // Animação automática de seções
  useScrollAnimation()
  
  // Filtros - Inicializar com valores da URL
  const [selectedTag, setSelectedTag] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('tag')
  })
  const [selectedType, setSelectedType] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('type')
  })
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Atualizar filtros quando a URL mudar (navegação via dropdown)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tag = params.get('tag')
    const type = params.get('type')
    
    setSelectedTag(tag)
    setSelectedType(type)
    
    // Scroll para área de filtros quando um filtro é aplicado
    if (tag || type) {
      setTimeout(() => {
        const filtersElement = document.getElementById('filters-section')
        if (filtersElement) {
          const headerHeight = 80
          const navHeight = 60
          const elementTop = filtersElement.getBoundingClientRect().top + window.scrollY
          const targetScroll = elementTop - headerHeight - navHeight - 20
          
          window.scrollTo({ 
            top: targetScroll > 0 ? targetScroll : 0, 
            behavior: 'smooth' 
          })
        }
      }, 100)
    }
  }, [location.search])
  
  // MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useAzimutContent({ 
    page: 'work',
    lang // Passar idioma para backoffice
  })
  
  // 🎯 PERSONALIZAÇÃO IA: Filtro automático baseado em visitor type
  const { profile } = usePersonalizedContent()
  
  // Auto-aplicar filtro baseado em visitor type (apenas na primeira visita)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const hasFilters = params.get('tag') || params.get('type')
    
    // Se não tem filtros aplicados E temos um perfil, sugerir filtro
    if (!hasFilters && profile?.visitorType) {
      const typeFilterMap: Record<string, string> = {
        'CURATOR': 'museum',
        'GOVERNMENT': 'city',
        'BRAND': 'brand',
        'FESTIVAL': 'festival',
        'EDUCATION': 'education'
      }
      
      const suggestedType = typeFilterMap[profile.visitorType]
      
      // Aplicar filtro sugerido SUTILMENTE (não forçado, mas sugerido)
      if (suggestedType && !selectedType) {
        // Não navega, apenas sugere visualmente (InternalNavigation vai destacar)
      }
    }
  }, [profile, location.search, selectedType])
  
  // Fallback: Projetos de exemplo quando backoffice está vazio ou falha
  const defaultCases = useMemo(() => [
    {
      slug: 'projeto-exemplo-1',
      title: lang === 'pt' ? 'Instalação Imersiva' : lang === 'es' ? 'Instalación Inmersiva' : lang === 'fr' ? 'Installation Immersive' : 'Immersive Installation',
      shortTitle: lang === 'pt' ? 'Experiência Visual Interativa' : lang === 'es' ? 'Experiencia Visual Interactiva' : lang === 'fr' ? 'Expérience Visuelle Interactive' : 'Interactive Visual Experience',
      summary: lang === 'pt' ? 'Uma instalação interativa que combina narrativa cinematográfica com tecnologia imersiva para criar uma experiência única que conecta audiências de diferentes culturas.' : lang === 'es' ? 'Una instalación interactiva que combina narrativa cinematográfica con tecnología inmersiva para crear una experiencia única que conecta audiencias de diferentes culturas.' : lang === 'fr' ? 'Une installation interactive qui combine narration cinématographique et technologie immersive pour créer une expérience unique qui connecte des audiences de différentes cultures.' : 'An interactive installation that combines cinematic storytelling with immersive technology to create a unique experience that connects audiences from different cultures.',
      city: lang === 'pt' ? 'São Paulo' : 'São Paulo',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive', lang === 'pt' ? 'Interativo' : lang === 'es' ? 'Interactivo' : lang === 'fr' ? 'Interactif' : 'Interactive', lang === 'pt' ? 'Cinema' : lang === 'es' ? 'Cine' : lang === 'fr' ? 'Cinéma' : 'Cinema'],
      type: 'INSTALLATION',
      heroImage: null,
    },
    {
      slug: 'projeto-exemplo-2',
      title: lang === 'pt' ? 'Exposição Digital' : lang === 'es' ? 'Exposición Digital' : lang === 'fr' ? 'Exposition Numérique' : 'Digital Exhibition',
      shortTitle: lang === 'pt' ? 'Narrativa Espacial' : lang === 'es' ? 'Narrativa Espacial' : lang === 'fr' ? 'Narration Spatiale' : 'Spatial Narrative',
      summary: lang === 'pt' ? 'Uma exposição que utiliza realidade aumentada e projeções mapeadas para contar histórias através do espaço físico, criando uma experiência educacional envolvente.' : lang === 'es' ? 'Una exposición que utiliza realidad aumentada y proyecciones mapeadas para contar historias a través del espacio físico, creando una experiencia educativa envolvente.' : lang === 'fr' ? 'Une exposition qui utilise la réalité augmentée et les projections mappées pour raconter des histoires à travers l\'espace physique, créant une expérience éducative engageante.' : 'An exhibition that uses augmented reality and mapped projections to tell stories through physical space, creating an engaging educational experience.',
      city: lang === 'pt' ? 'Montreal' : 'Montreal',
      country: lang === 'pt' ? 'Canadá' : lang === 'es' ? 'Canadá' : lang === 'fr' ? 'Canada' : 'Canada',
      year: 2024,
      tags: [lang === 'pt' ? 'AR' : 'AR', lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education', lang === 'pt' ? 'Museu' : lang === 'es' ? 'Museo' : lang === 'fr' ? 'Musée' : 'Museum'],
      type: 'EXHIBITION',
      heroImage: null,
    },
    {
      slug: 'projeto-exemplo-3',
      title: lang === 'pt' ? 'Filme VR 360°' : lang === 'es' ? 'Película VR 360°' : lang === 'fr' ? 'Film VR 360°' : '360° VR Film',
      shortTitle: lang === 'pt' ? 'Experiência Virtual' : lang === 'es' ? 'Experiencia Virtual' : lang === 'fr' ? 'Expérience Virtuelle' : 'Virtual Experience',
      summary: lang === 'pt' ? 'Um filme de realidade virtual que transporta o espectador para diferentes locais e momentos históricos, criando uma imersão completa através de narrativa cinematográfica.' : lang === 'es' ? 'Una película de realidad virtual que transporta al espectador a diferentes lugares y momentos históricos, creando una inmersión completa a través de narrativa cinematográfica.' : lang === 'fr' ? 'Un film de réalité virtuelle qui transporte le spectateur vers différents lieux et moments historiques, créant une immersion complète grâce à la narration cinématographique.' : 'A virtual reality film that transports the viewer to different locations and historical moments, creating complete immersion through cinematic storytelling.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : lang === 'fr' ? 'Rio de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2023,
      tags: [lang === 'pt' ? 'VR' : 'VR', lang === 'pt' ? '360°' : '360°', lang === 'pt' ? 'Cinema' : lang === 'es' ? 'Cine' : lang === 'fr' ? 'Cinéma' : 'Cinema'],
      type: 'VR_FILM',
      heroImage: null,
    },
  ], [lang])
  
  // MIGRAÇÃO GRADUAL: Backoffice → Estático (sempre funciona)
  const allCases = useMemo(() => {
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      return cmsContent.highlightProjects;
    }
    return defaultCases;
  }, [cmsContent?.highlightProjects, defaultCases])
  
  // Filtrar projetos
  const cases = useMemo(() => {
    if (!Array.isArray(allCases)) return []
    
    return allCases.filter((project: any) => {
      // Filtro por tag
      if (selectedTag && (!project.tags || !project.tags.includes(selectedTag))) {
        return false
      }
      
      // Filtro por tipo
      if (selectedType && project.type !== selectedType) {
        return false
      }
      
      // Filtro por ano
      if (selectedYear && project.year !== selectedYear) {
        return false
      }
      
      // Busca por texto
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = project.title?.toLowerCase().includes(query)
        const matchesSummary = project.summary?.toLowerCase().includes(query)
        const matchesTags = project.tags?.some((tag: string) => tag.toLowerCase().includes(query))
        if (!matchesTitle && !matchesSummary && !matchesTags) {
          return false
        }
      }
      
      return true
    })
  }, [allCases, selectedTag, selectedType, selectedYear, searchQuery])
  
  // Extrair valores únicos para filtros
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    if (Array.isArray(allCases)) {
      allCases.forEach((project: any) => {
        if (project?.tags && Array.isArray(project.tags)) {
          project.tags.forEach((tag: string) => tags.add(tag))
        }
      })
    }
    return Array.from(tags).sort()
  }, [allCases])
  
  const allTypes = useMemo(() => {
    const types = new Set<string>()
    if (Array.isArray(allCases)) {
      allCases.forEach((project: any) => {
        if (project?.type) types.add(project.type)
      })
    }
    return Array.from(types).sort()
  }, [allCases])
  
  const allYears = useMemo(() => {
    const years = new Set<number>()
    if (Array.isArray(allCases)) {
      allCases.forEach((project: any) => {
        if (project?.year) years.add(project.year)
      })
    }
    return Array.from(years).sort((a, b) => b - a) // Mais recente primeiro
  }, [allCases])
  
  const clearFilters = () => {
    setSelectedTag(null)
    setSelectedType(null)
    setSelectedYear(null)
    setSearchQuery('')
  }
  
  const hasActiveFilters = selectedTag || selectedType || selectedYear || searchQuery
  
  // Tracking de página (não bloqueia renderização)
  useEffect(() => {
    try {
      const cleanup = trackPageView('work')
      return cleanup
    } catch (error) {
      // Se tracking falhar, não quebrar renderização
      console.warn('Tracking error:', error)
      return () => {} // Cleanup vazio
    }
  }, [])

  // Estrela FIXA (sem parallax) - Padronizada com Studio e WhatWeDo

  // Dados já vêm traduzidos do backoffice

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        image={seo.image}
        url={seo.url}
        type="website"
      />
      <main className="relative pb-24 film-grain">
        {/* Star background - FIXA (FUNDO - atrás de tudo) */}
        {/* Posição: header + submenu + folga visual = 160px */}
        <StarBackground
          className="fixed top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          zIndex={-10}
          opacity={0.5}
        />

        {/* ═══════════════════════════════════════════════════════════
            NAVEGAÇÃO INTERNA - FIXO colado no header
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className="fixed left-0 right-0 z-40 backdrop-blur-xl submenu-nav"
          style={{
            top: '52px',
            borderBottom: '2px solid rgba(201, 35, 55, 0.5)'
          }}
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-3">
            <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {[
                { id: 'all', label: lang === 'pt' ? 'Todos os Projetos' : 'All Projects', href: '/work', icon: '✦' },
                { id: 'museum', label: lang === 'pt' ? 'Museus & Cultura' : 'Museums & Culture', href: '/work?type=museum', icon: '🏛️' },
                { id: 'festival', label: lang === 'pt' ? 'Festivais' : 'Festivals', href: '/work?type=festival', icon: '🎪' },
                { id: 'brand', label: lang === 'pt' ? 'Marcas & Eventos' : 'Brands & Events', href: '/work?type=brand', icon: '🎯' },
                { id: 'vr-xr', label: 'VR & XR', href: '/work?type=vr-xr', icon: '🥽' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href.startsWith('/') ? `/${lang}${item.href}` : item.href)
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide hover:text-azimut-red transition-colors"
                  style={{ color: 'var(--theme-text-secondary)' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Espaçador para compensar header + submenu fixos */}
        <div style={{ height: '48px' }} />

        {/* Conteúdo - DENTRO do container */}
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="pt-6 md:pt-8 mb-8">
            <div className="mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
                {lang === 'pt' ? 'NOSSO TRABALHO' : 'OUR WORK'}
              </span>
            </div>
            <h1 className="mb-4 font-handel uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1' }}>
              {t(lang, 'navWork')}
            </h1>
            <p className="max-w-3xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {lang === 'pt' 
                ? 'Projetos que transformam espaços, marcas e experiências. De museus olímpicos a curadoria de festivais internacionais, cada trabalho é uma oportunidade de criar narrativas imersivas que conectam pessoas e histórias de forma única.'
                : 'Projects that transform spaces, brands and experiences. From Olympic museums to international festival curation, each work is an opportunity to create immersive narratives that uniquely connect people and stories.'}
            </p>
          </div>
          {/* Filtros */}
          <div id="filters-section" className="mb-8 flex flex-wrap gap-4 items-center">
            {/* Busca */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder={lang === 'pt' ? 'Buscar projetos...' : lang === 'es' ? 'Buscar proyectos...' : lang === 'fr' ? 'Rechercher...' : 'Search projects...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-subtle px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-azimut-red/50 focus:outline-none focus:ring-2 focus:ring-azimut-red/20"
              />
            </div>
            
            {/* Filtro por Tag */}
            {allTags.length > 0 && (
              <select
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="rounded-lg border border-white/10 bg-subtle px-4 py-2 text-sm text-white focus:border-azimut-red/50 focus:outline-none focus:ring-2 focus:ring-azimut-red/20"
                style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '32px' }}
              >
                <option value="">{lang === 'pt' ? 'Todas as tags' : lang === 'es' ? 'Todas las etiquetas' : lang === 'fr' ? 'Tous les tags' : 'All tags'}</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            )}
            
            {/* Filtro por Tipo */}
            {allTypes.length > 0 && (
              <select
                value={selectedType || ''}
                onChange={(e) => setSelectedType(e.target.value || null)}
                className="rounded-lg border border-white/10 bg-subtle px-4 py-2 text-sm text-white focus:border-azimut-red/50 focus:outline-none focus:ring-2 focus:ring-azimut-red/20"
                style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '32px' }}
              >
                <option value="">{lang === 'pt' ? 'Todos os tipos' : lang === 'es' ? 'Todos los tipos' : lang === 'fr' ? 'Tous les types' : 'All types'}</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            )}
            
            {/* Filtro por Ano */}
            {allYears.length > 0 && (
              <select
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                className="rounded-lg border border-white/10 bg-subtle px-4 py-2 text-sm text-white focus:border-azimut-red/50 focus:outline-none focus:ring-2 focus:ring-azimut-red/20"
                style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '32px' }}
              >
                <option value="">{lang === 'pt' ? 'Todos os anos' : lang === 'es' ? 'Todos los años' : lang === 'fr' ? 'Toutes les années' : 'All years'}</option>
                {allYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            )}
            
            {/* Limpar filtros */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-azimut-red/20 transition-colors"
              >
                {lang === 'pt' ? 'Limpar' : lang === 'es' ? 'Limpiar' : lang === 'fr' ? 'Effacer' : 'Clear'}
              </button>
            )}
          </div>
          
          {/* Contador de resultados */}
          <div className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            {lang === 'pt' 
              ? `Mostrando ${cases.length} ${cases.length === 1 ? 'projeto' : 'projetos'}${hasActiveFilters ? ' (filtrado)' : ''}`
              : lang === 'es'
              ? `Mostrando ${cases.length} ${cases.length === 1 ? 'proyecto' : 'proyectos'}${hasActiveFilters ? ' (filtrado)' : ''}`
              : lang === 'fr'
              ? `Affichage de ${cases.length} ${cases.length === 1 ? 'projet' : 'projets'}${hasActiveFilters ? ' (filtré)' : ''}`
              : `Showing ${cases.length} ${cases.length === 1 ? 'project' : 'projects'}${hasActiveFilters ? ' (filtered)' : ''}`}
          </div>

          {/* Featured Project - Full Width - SEMPRE MOSTRA, mesmo sem dados */}
          {cases.length > 0 && (
              <article
                className="mb-8 overflow-hidden rounded-3xl border border-white/10 card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)] cursor-pointer"
                onClick={() => {
                  trackInteraction('project_view', cases[0].slug)
                  trackProjectInteraction(cases[0].slug, 'CLICK')
                  navigate(`/${lang}/work/${cases[0].slug}`)
                }}
              >
              <div className="grid md:grid-cols-2">
                {/* Image Area - BACKOFFICE: cases[0].heroImage */}
                <div className="relative aspect-video md:aspect-auto md:min-h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group">
                  {/* Renderizar imagem se disponível */}
                  {cases[0].heroImage?.large ? (
                    <>
                      <img
                        src={cases[0].heroImage.large}
                        alt={cases[0].heroImage.alt || cases[0].title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      {/* Overlay gradient para legibilidade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>
                    </>
                  ) : (
                    /* Placeholder quando não há mídia */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950 transition-all group-hover:from-azimut-red/15">
                      <div className="text-center p-6">
                        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-azimut-red/30 bg-azimut-red/10 backdrop-blur transition-all group-hover:scale-110">
                          <svg className="h-10 w-10 text-azimut-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-azimut-red/30 bg-azimut-red/10 px-4 py-1.5 backdrop-blur">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-azimut-red"></span>
                          <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200">
                            {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-500 uppercase tracking-wider">
                          {lang === 'pt' ? '🖼️ Imagem/Vídeo do Backoffice' : lang === 'es' ? '🖼️ Imagen/Video del Backoffice' : '🖼️ Image/Video from Backoffice'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-hidden">
                  <h2 className="mb-3 font-handel text-3xl uppercase tracking-[0.12em] text-white line-clamp-2">
                    {cases[0].title}
                  </h2>
                  <p className="mb-4 text-base leading-relaxed text-slate-900 dark:text-slate-200 line-clamp-4">
                    {cases[0].summary || cases[0].shortTitle}
                  </p>
                  {(cases[0].city || cases[0].country) && (
                    <p className="mb-4 text-sm text-slate-900 dark:text-slate-300">
                      📍 {[cases[0].city, cases[0].country].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {cases[0].tags && cases[0].tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {((cases[0]?.tags && Array.isArray(cases[0].tags)) ? cases[0].tags : []).slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* CTA */}
                  <Link
                    to={`/work/${cases[0].slug}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      trackInteraction('project_view', cases[0].slug)
                      trackProjectInteraction(cases[0].slug, 'CLICK')
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-slate-900 dark:text-white hover:bg-azimut-red/20 transition-all mt-4"
                  >
                    {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : lang === 'fr' ? 'Voir le projet' : 'View Project'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          )}
          
          {/* Mensagem quando não há resultados */}
          {cases.length === 0 && !cmsLoading && (
            <div className="py-16 text-center">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                {lang === 'pt' 
                  ? 'Nenhum projeto encontrado com os filtros selecionados.'
                  : lang === 'es'
                  ? 'No se encontraron proyectos con los filtros seleccionados.'
                  : lang === 'fr'
                  ? 'Aucun projet trouvé avec les filtres sélectionnés.'
                  : 'No projects found with the selected filters.'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-slate-900 dark:text-white hover:bg-azimut-red/20 transition-all"
                >
                  {lang === 'pt' ? 'Limpar Filtros' : lang === 'es' ? 'Limpiar Filtros' : lang === 'fr' ? 'Effacer les filtres' : 'Clear Filters'}
                </button>
              )}
            </div>
          )}

          {/* Other Projects Grid */}
          {cases.length > 1 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {cases.slice(1).map((item: any, index: number) => (
              <article
                key={item.slug}
                className="group rounded-2xl border border-white/10 card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onClick={() => {
                  trackInteraction('project_view', item.slug)
                  trackProjectInteraction(item.slug, 'CLICK')
                  navigate(`/${lang}/work/${item.slug}`)
                }}
                onMouseEnter={() => trackProjectInteraction(item.slug, 'HOVER')}
              >
                {/* Image - BACKOFFICE: item.heroImage */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {/* Renderizar imagem se disponível */}
                  {item.heroImage?.medium || item.heroImage?.large ? (
                    <>
                      <OptimizedImage
                        src={item.heroImage.large || item.heroImage.medium}
                        alt={item.heroImage.alt || item.title}
                        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none opacity-100 group-hover:from-azimut-red/20 group-hover:via-slate-950/40 transition-all duration-300"></div>
                    </>
                  ) : (
                    /* Placeholder quando não há imagem */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900 transition-all duration-300 group-hover:from-azimut-red/20 group-hover:to-slate-900/80">
                      <div className="text-center p-4">
                        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-subtle backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:border-azimut-red/50">
                          <svg className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-azimut-red transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 relative z-10 overflow-hidden">
                  <h3 className="mb-2 font-sora text-[1.05rem] text-white group-hover:text-azimut-red transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-200 mb-3 group-hover:text-slate-100 transition-colors duration-300 line-clamp-3">
                    {item.summary || item.shortTitle}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-[0.68rem] text-slate-600 dark:text-slate-400">
                        {((item?.tags && Array.isArray(item.tags)) ? item.tags : []).slice(0, 3).map((tag: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="rounded-full border border-white/10 px-2 py-0.5 transition-all duration-300 group-hover:border-azimut-red/50 group-hover:bg-azimut-red/10 group-hover:text-slate-900 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.year && (
                      <span className="text-xs text-slate-600 dark:text-slate-500 font-medium">
                        {item.year}
                      </span>
                    )}
                  </div>
                  {/* CTA */}
                  <Link
                    to={`/work/${item.slug}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      trackInteraction('project_view', item.slug)
                      trackProjectInteraction(item.slug, 'CLICK')
                    }}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-4 py-2 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-900 dark:text-white hover:bg-azimut-red/20 transition-all w-full justify-center"
                  >
                    {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : lang === 'fr' ? 'Voir' : 'View'}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: CUADORIA & FESTIVAIS
              ═══════════════════════════════════════════════════════════ */}
          <section id="curation" className="mb-16">
            <CuradoriaFestivais lang={lang} />
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: OPORTUNIDADES ATIVAS
              ═══════════════════════════════════════════════════════════ */}
          <section id="opportunities" className="mb-16">
            <div className="mb-8">
              <h2 className="mb-4 font-handel text-3xl uppercase tracking-[0.12em] md:text-4xl" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' 
                  ? 'Quer Trabalhar Conosco?'
                  : lang === 'es'
                  ? '¿Quieres Trabajar Con Nosotros?'
                  : lang === 'fr'
                  ? 'Voulez-vous Travailler Avec Nous?'
                  : 'Want to Work With Us?'}
              </h2>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                {lang === 'pt' 
                  ? 'Veja nossos projetos realizados e descubra oportunidades de editais abertos, coprodução e parcerias.'
                  : lang === 'es'
                  ? 'Ve nuestros proyectos realizados y descubre oportunidades de editais abiertos, coproducción y alianzas.'
                  : lang === 'fr'
                  ? 'Découvrez nos projets réalisés et les opportunités d\'appels ouverts, coproduction et partenariats.'
                  : 'See our completed projects and discover opportunities for open grants, co-production and partnerships.'}
              </p>
            </div>

            {/* Credibilidade (histórico de editais/coprodução) */}
            <div className="mb-8">
              <CredibilidadeEditais lang={lang} />
            </div>

            {/* Oportunidades Ativas (editais abertos) */}
            <div className="mb-8">
              <OportunidadesAtivas lang={lang} limit={10} />
            </div>

            {/* CTA Final */}
            <div className="mt-12 rounded-2xl border border-azimut-red/60 bg-azimut-red/10 p-8 text-center">
              <h3 className="mb-4 font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' 
                  ? 'Queremos Revisar Seu Projeto/Edital'
                  : lang === 'es'
                  ? 'Queremos Revisar Tu Proyecto/Edital'
                  : lang === 'fr'
                  ? 'Nous Voulons Examiner Votre Projet/Financement'
                  : 'We Want to Review Your Project/Grant'}
              </h3>
              <p className="mb-6 text-lg" style={{ color: 'var(--theme-text-secondary)' }}>
                {lang === 'pt' 
                  ? 'Tem um projeto em mente? Vamos conversar sobre como podemos trabalhar juntos.'
                  : lang === 'es'
                  ? '¿Tienes un proyecto en mente? Hablemos sobre cómo podemos trabajar juntos.'
                  : lang === 'fr'
                  ? 'Vous avez un projet en tête? Parlons de la façon dont nous pouvons travailler ensemble.'
                  : 'Have a project in mind? Let\'s talk about how we can work together.'}
              </p>
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-azimut-red/80 bg-azimut-red/20 px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.14em] transition-all hover:bg-azimut-red/30 hover:shadow-[0_0_30px_rgba(var(--theme-accent-red-rgb),0.4)] text-slate-900 dark:text-white"
                style={{ color: 'var(--theme-text)' }}
              >
                {lang === 'pt' ? 'Iniciar Conversa' : lang === 'es' ? 'Iniciar Conversación' : lang === 'fr' ? 'Démarrer la Conversation' : 'Start Conversation'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Work
