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
import { useTheme } from '../contexts/ThemeContext'

interface WorkProps {
  lang: Lang
}

// Interface TypeScript para projetos
interface WorkProject {
  id?: string
  slug: string
  title: string
  summary?: string
  description?: string
  type?: string
  tags?: string[]
  year?: number
  city?: string
  country?: string
  heroImage?: {
    original?: string
    thumbnail?: string
    medium?: string
    large?: string
  } | null
  // ═══════════════════════════════════════════════════════════════
  // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
  // ═══════════════════════════════════════════════════════════════
  projectCategory?: string[]  // ['curadoria', 'vr-360', 'museum', 'education', ...]
  workType?: string[]         // ['filme', 'exposicao', 'curso', 'palestra', ...]
  technologies?: string[]     // ['VR', '360', 'IA', '3D', ...]
  industry?: string          // 'cultural', 'entertainment', 'education', ...
  azimutRole?: string[]      // ['direcao', 'curadoria', 'producao', ...]
  duration?: string
  awards?: any
  metrics?: any
  videoUrl?: string
  videoShowreel?: string
  externalLinks?: any
  partnerLogos?: string[]
  beforeAfterImages?: any
}

const Work: React.FC<WorkProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  const navigate = useNavigate()
  const location = useLocation()
  const seo = seoData.work[lang]
  const { theme } = useTheme()
  
  // Animação automática de seções
  useScrollAnimation()
  
  // ═══════════════════════════════════════════════════════════════
  // 🎯 FILTROS AVANÇADOS - Portfolio Premium 2026
  // ═══════════════════════════════════════════════════════════════
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedWorkType, setSelectedWorkType] = useState<string[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filtros legados (mantidos para compatibilidade)
  const [selectedTag, setSelectedTag] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('tag')
  })
  const [selectedType, setSelectedType] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('type')
  })

  // Atualizar filtros quando a URL mudar (navegação via dropdown)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tag = params.get('tag')
    const type = params.get('type')
    
    setSelectedTag(tag)
    setSelectedType(type)
    
    // Scroll para área de PROJETOS quando um filtro é aplicado (não para filtros)
    if (tag || type) {
      setTimeout(() => {
        // Tentar scrollar para a seção de projetos filtrados
        const projectsElement = document.getElementById('projects-grid')
        if (projectsElement) {
          const headerHeight = 80
          const navHeight = 60
          const elementTop = projectsElement.getBoundingClientRect().top + window.scrollY
          const targetScroll = elementTop - headerHeight - navHeight - 40
          
          window.scrollTo({ 
            top: targetScroll > 0 ? targetScroll : 0, 
            behavior: 'smooth' 
          })
        } else {
          // Fallback: scrollar para contador de resultados (logo antes dos projetos)
          const resultsElement = document.getElementById('results-counter')
          if (resultsElement) {
            const headerHeight = 80
            const navHeight = 60
            const elementTop = resultsElement.getBoundingClientRect().top + window.scrollY
            const targetScroll = elementTop - headerHeight - navHeight - 20
            
            window.scrollTo({ 
              top: targetScroll > 0 ? targetScroll : 0, 
              behavior: 'smooth' 
            })
          }
        }
      }, 150) // Aumentar delay para garantir que o DOM foi atualizado
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
  
  // Filtrar projetos com filtros avançados
  const cases = useMemo(() => {
    if (!Array.isArray(allCases)) return []
    
    return allCases.filter((project: WorkProject) => {
      // ═══════════════════════════════════════════════════════════════
      // 🎯 FILTROS AVANÇADOS (multi-select)
      // ═══════════════════════════════════════════════════════════════
      
      // Filtro por categoria (multi-select)
      if (selectedCategory.length > 0) {
        const hasCategory = project.projectCategory?.some(cat => selectedCategory.includes(cat))
        if (!hasCategory) return false
      }
      
      // Filtro por tipo de trabalho (multi-select)
      if (selectedWorkType.length > 0) {
        const hasWorkType = project.workType?.some(wt => selectedWorkType.includes(wt))
        if (!hasWorkType) return false
      }
      
      // Filtro por tecnologias (multi-select)
      if (selectedTechnologies.length > 0) {
        const hasTech = project.technologies?.some(tech => selectedTechnologies.includes(tech))
        if (!hasTech) return false
      }
      
      // Filtro por indústria (single-select)
      if (selectedIndustry && project.industry !== selectedIndustry) {
        return false
      }
      
      // ═══════════════════════════════════════════════════════════════
      // FILTROS LEGADOS (compatibilidade)
      // ═══════════════════════════════════════════════════════════════
      
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
  }, [allCases, selectedCategory, selectedWorkType, selectedTechnologies, selectedIndustry, selectedTag, selectedType, selectedYear, searchQuery])
  
  // Extrair valores únicos para filtros
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    if (Array.isArray(allCases)) {
      allCases.forEach((project: WorkProject) => {
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
      allCases.forEach((project: WorkProject) => {
        if (project?.type) types.add(project.type)
      })
    }
    return Array.from(types).sort()
  }, [allCases])
  
  const allYears = useMemo(() => {
    const years = new Set<number>()
    if (Array.isArray(allCases)) {
      allCases.forEach((project: WorkProject) => {
        if (project?.year) years.add(project.year)
      })
    }
    return Array.from(years).sort((a, b) => b - a) // Mais recente primeiro
  }, [allCases])
  
  const clearFilters = () => {
    setSelectedCategory([])
    setSelectedWorkType([])
    setSelectedTechnologies([])
    setSelectedIndustry(null)
    setSelectedTag(null)
    setSelectedType(null)
    setSelectedYear(null)
    setSearchQuery('')
  }
  
  const hasActiveFilters = 
    selectedCategory.length > 0 ||
    selectedWorkType.length > 0 ||
    selectedTechnologies.length > 0 ||
    selectedIndustry !== null ||
    selectedTag !== null ||
    selectedType !== null ||
    selectedYear !== null ||
    searchQuery !== ''
  
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
              <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {lang === 'pt' ? 'NOSSO TRABALHO' : 'OUR WORK'}
              </span>
            </div>
            <h1 className="mb-4 font-handel uppercase tracking-[0.12em] text-white" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1' }}>
              {t(lang, 'navWork')}
            </h1>
            <p className="max-w-3xl leading-relaxed text-slate-400 dark:text-slate-300" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {lang === 'pt' 
                ? 'Projetos que transformam espaços, marcas e experiências. De museus olímpicos a curadoria de festivais internacionais, cada trabalho é uma oportunidade de criar narrativas imersivas que conectam pessoas e histórias de forma única.'
                : 'Projects that transform spaces, brands and experiences. From Olympic museums to international festival curation, each work is an opportunity to create immersive narratives that uniquely connect people and stories.'}
            </p>
          </div>
          {/* ═══════════════════════════════════════════════════════════════
              🎯 FILTROS VISUAIS PREMIUM - Portfolio 2026
              ═══════════════════════════════════════════════════════════ */}
          <div id="filters-section" className="mb-12">
            {/* Busca */}
            <div className="mb-6">
              <input
                type="text"
                placeholder={lang === 'pt' ? '🔍 Buscar projetos...' : lang === 'es' ? '🔍 Buscar proyectos...' : lang === 'fr' ? '🔍 Rechercher...' : '🔍 Search projects...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full max-w-md rounded-xl border bg-subtle px-5 py-3.5 text-sm focus:border-azimut-red/60 focus:outline-none focus:ring-2 focus:ring-azimut-red/30 transition-all ${
                  theme === 'dark' ? 'border-white/20' : 'border-slate-300/40'
                }`}
                style={{ 
                  color: 'var(--theme-text)',
                }}
              />
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                DESTAQUE: CUADORIA GRAMADO (ÚNICO NO BRASIL)
                Ocultar quando há filtros ativos para não confundir o usuário
                ═══════════════════════════════════════════════════════════ */}
            {!hasActiveFilters && (
            <div className="mb-8 rounded-2xl border-2 border-azimut-red/60 bg-gradient-to-br from-azimut-red/15 via-azimut-red/5 to-transparent p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-4xl">🎪</div>
                <div className="flex-1">
                  <h3 className="mb-2 font-handel text-xl uppercase tracking-[0.12em] text-azimut-red">
                    {lang === 'pt' ? 'Curadoria Gramado' : lang === 'es' ? 'Curaduría Gramado' : lang === 'fr' ? 'Curation Gramado' : 'Gramado Curation'}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-400 dark:text-slate-300">
                    {lang === 'pt' 
                      ? 'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.'
                      : lang === 'es'
                      ? 'Nuestro mayor diferencial: curaduría de nivel internacional para festivales. Único estudio en Brasil que combina producción técnica premium con experiencia en curaduría cinematográfica.'
                      : lang === 'fr'
                      ? 'Notre plus grand atout: curation de niveau international pour festivals. Le seul studio au Brésil qui combine production technique premium avec expertise en curation cinématographique.'
                      : 'Our biggest differentiator: international-level curation for festivals. The only studio in Brazil that combines premium technical production with expertise in film curation.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(['curadoria'])
                      setSelectedWorkType(['festival'])
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/60 bg-azimut-red/20 px-5 py-2.5 font-sora text-xs font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/30 transition-all"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    {lang === 'pt' ? 'Ver Projetos de Curadoria' : lang === 'es' ? 'Ver Proyectos de Curaduría' : lang === 'fr' ? 'Voir Projets de Curation' : 'View Curation Projects'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* Categorias Principais - Pills Visuais */}
            <div className="mb-6">
              <label className="mb-3 block font-sora text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {lang === 'pt' ? 'Categorias' : lang === 'es' ? 'Categorías' : lang === 'fr' ? 'Catégories' : 'Categories'}
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'curadoria', label: lang === 'pt' ? '🎪 Curadoria & Festivais' : '🎪 Curation & Festivals', color: 'from-azimut-red/30 to-azimut-red/10' },
                  { id: 'vr-360', label: '🥽 VR & 360°', color: 'from-blue-500/30 to-blue-500/10' },
                  { id: 'museum', label: lang === 'pt' ? '🏛️ Museus & Exposições' : '🏛️ Museums & Exhibitions', color: 'from-purple-500/30 to-purple-500/10' },
                  { id: 'education', label: lang === 'pt' ? '🎓 Educação' : '🎓 Education', color: 'from-green-500/30 to-green-500/10' },
                  { id: 'motion', label: '🎬 Motion Graphics', color: 'from-orange-500/30 to-orange-500/10' },
                  { id: 'games', label: '🎮 Games', color: 'from-pink-500/30 to-pink-500/10' },
                  { id: 'corporate', label: lang === 'pt' ? '💼 Corporativo' : '💼 Corporate', color: 'from-slate-500/30 to-slate-500/10' },
                  { id: 'festival', label: '🎭 Festival', color: 'from-yellow-500/30 to-yellow-500/10' },
                  { id: 'animacao', label: lang === 'pt' ? '🎨 Animação' : '🎨 Animation', color: 'from-cyan-500/30 to-cyan-500/10' },
                  { id: 'personagens-3d', label: lang === 'pt' ? '👤 Personagens 3D' : '👤 3D Characters', color: 'from-indigo-500/30 to-indigo-500/10' },
                  { id: 'projetos-3d', label: lang === 'pt' ? '🎯 Projetos 3D' : '🎯 3D Projects', color: 'from-violet-500/30 to-violet-500/10' },
                  { id: 'ambientes-virtuais', label: lang === 'pt' ? '🌐 Ambientes Virtuais' : '🌐 Virtual Environments', color: 'from-teal-500/30 to-teal-500/10' },
                  { id: 'maquete-virtual', label: lang === 'pt' ? '🏗️ Maquete Virtual' : '🏗️ Virtual Mockup', color: 'from-emerald-500/30 to-emerald-500/10' },
                  { id: 'renders-3d', label: lang === 'pt' ? '✨ Renders 3D' : '✨ 3D Renders', color: 'from-rose-500/30 to-rose-500/10' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (selectedCategory.includes(cat.id)) {
                        setSelectedCategory(selectedCategory.filter(c => c !== cat.id))
                      } else {
                        setSelectedCategory([...selectedCategory, cat.id])
                      }
                    }}
                    className={`group relative rounded-xl border px-4 py-2.5 font-sora text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                      selectedCategory.includes(cat.id)
                        ? 'border-azimut-red/60 bg-gradient-to-br from-azimut-red/30 to-azimut-red/10 text-azimut-red shadow-lg shadow-azimut-red/20'
                        : theme === 'dark' 
                          ? 'border-white/20 bg-subtle text-slate-400 hover:border-white/40 hover:text-slate-300'
                          : 'border-slate-300/40 bg-white/60 text-slate-700 hover:border-slate-400/60 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                    {selectedCategory.includes(cat.id) && (
                      <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-azimut-red text-[10px]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de Trabalho - Pills Visuais */}
            <div className="mb-6">
              <label className="mb-3 block font-sora text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {lang === 'pt' ? 'Tipo de Trabalho' : lang === 'es' ? 'Tipo de Trabajo' : lang === 'fr' ? 'Type de Travail' : 'Work Type'}
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'filme', label: '🎬 Filme' },
                  { id: 'exposicao', label: lang === 'pt' ? '🖼️ Exposição' : '🖼️ Exhibition' },
                  { id: 'curso', label: lang === 'pt' ? '📚 Curso' : '📚 Course' },
                  { id: 'palestra', label: lang === 'pt' ? '🎤 Palestra' : '🎤 Lecture' },
                  { id: 'workshop', label: '🔧 Workshop' },
                  { id: 'instalacao', label: lang === 'pt' ? '⚡ Instalação' : '⚡ Installation' },
                  { id: 'making-of', label: '🎥 Making-of' },
                  { id: 'evento', label: lang === 'pt' ? '🎉 Evento' : '🎉 Event' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      if (selectedWorkType.includes(type.id)) {
                        setSelectedWorkType(selectedWorkType.filter(t => t !== type.id))
                      } else {
                        setSelectedWorkType([...selectedWorkType, type.id])
                      }
                    }}
                    className={`rounded-xl border px-4 py-2.5 font-sora text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                      selectedWorkType.includes(type.id)
                        ? 'border-azimut-red/60 bg-gradient-to-br from-azimut-red/30 to-azimut-red/10 text-azimut-red shadow-lg shadow-azimut-red/20'
                        : theme === 'dark' 
                          ? 'border-white/20 bg-subtle text-slate-400 hover:border-white/40 hover:text-slate-300'
                          : 'border-slate-300/40 bg-white/60 text-slate-700 hover:border-slate-400/60 hover:text-slate-900'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tecnologias - Pills Visuais */}
            <div className="mb-6">
              <label className="mb-3 block font-sora text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {lang === 'pt' ? 'Tecnologias' : lang === 'es' ? 'Tecnologías' : lang === 'fr' ? 'Technologies' : 'Technologies'}
              </label>
              <div className="flex flex-wrap gap-3">
                {['VR', '360', 'IA', '3D', 'Motion Graphics', 'Interactive', 'AR', 'XR', 'Animation', '3D Characters', '3D Renders', 'Virtual Environments', 'Virtual Mockup', 'Renders 3D'].map((tech) => (
                  <button
                    key={tech}
                    onClick={() => {
                      if (selectedTechnologies.includes(tech)) {
                        setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech))
                      } else {
                        setSelectedTechnologies([...selectedTechnologies, tech])
                      }
                    }}
                    className={`rounded-xl border px-4 py-2.5 font-sora text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                      selectedTechnologies.includes(tech)
                        ? 'border-azimut-red/60 bg-gradient-to-br from-azimut-red/30 to-azimut-red/10 text-azimut-red shadow-lg shadow-azimut-red/20'
                        : theme === 'dark' 
                          ? 'border-white/20 bg-subtle text-slate-400 hover:border-white/40 hover:text-slate-300'
                          : 'border-slate-300/40 bg-white/60 text-slate-700 hover:border-slate-400/60 hover:text-slate-900'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtros Adicionais (Ano, Indústria) */}
            <div className="mb-4 flex flex-wrap gap-4">
              {/* Filtro por Ano */}
              {allYears.length > 0 && (
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                  className={`rounded-xl border bg-subtle px-4 py-2.5 text-sm focus:border-azimut-red/60 focus:outline-none focus:ring-2 focus:ring-azimut-red/30 transition-all ${
                    theme === 'dark' ? 'border-white/20' : 'border-slate-300/40'
                  }`}
                  style={{ 
                    appearance: 'none', 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: 'right 12px center', 
                    paddingRight: '32px',
                    color: 'var(--theme-text)'
                  }}
                >
                  <option value="">{lang === 'pt' ? '📅 Todos os anos' : lang === 'es' ? '📅 Todos los años' : lang === 'fr' ? '📅 Toutes les années' : '📅 All years'}</option>
                  {allYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}

              {/* Filtro por Indústria */}
              <select
                value={selectedIndustry || ''}
                onChange={(e) => setSelectedIndustry(e.target.value || null)}
                className="rounded-xl border border-white/20 bg-subtle px-4 py-2.5 text-sm focus:border-azimut-red/60 focus:outline-none focus:ring-2 focus:ring-azimut-red/30 transition-all"
                style={{ 
                  appearance: 'none', 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'right 12px center', 
                  paddingRight: '32px',
                  color: 'var(--theme-text)'
                }}
              >
                <option value="">{lang === 'pt' ? '🏢 Todos os setores' : lang === 'es' ? '🏢 Todos los sectores' : lang === 'fr' ? '🏢 Tous les secteurs' : '🏢 All industries'}</option>
                <option value="cultural">{lang === 'pt' ? 'Cultural' : 'Cultural'}</option>
                <option value="entertainment">{lang === 'pt' ? 'Entretenimento' : 'Entertainment'}</option>
                <option value="education">{lang === 'pt' ? 'Educação' : 'Education'}</option>
                <option value="corporate">{lang === 'pt' ? 'Corporativo' : 'Corporate'}</option>
                <option value="government">{lang === 'pt' ? 'Governo' : 'Government'}</option>
                <option value="research">{lang === 'pt' ? 'Pesquisa' : 'Research'}</option>
              </select>
            </div>
            
            {/* Limpar filtros */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="rounded-xl border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 text-sm font-sora font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/20 transition-all"
                style={{ color: 'var(--theme-text)' }}
              >
                {lang === 'pt' ? '🗑️ Limpar Filtros' : lang === 'es' ? '🗑️ Limpiar Filtros' : lang === 'fr' ? '🗑️ Effacer les Filtres' : '🗑️ Clear Filters'}
              </button>
            )}
          </div>
          
          {/* Contador de resultados */}
          <div className="mb-6 text-sm text-slate-600 dark:text-slate-500">
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
                id={cases.length === 1 ? 'projects-grid' : undefined}
                className={`mb-8 overflow-hidden rounded-3xl border card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)] cursor-pointer ${
                  theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
                }`}
                onClick={() => {
                  trackInteraction('project_view', cases[0].slug)
                  trackProjectInteraction(cases[0].slug, 'CLICK')
                  navigate(`/${lang}/work/${cases[0].slug}`)
                }}
              >
              <div className="grid md:grid-cols-2">
                {/* Image Area - BACKOFFICE: cases[0].heroImage */}
                <div className="relative aspect-video md:aspect-auto md:min-h-[400px] bg-gradient-to-br from-slate-800/80 to-slate-950 overflow-hidden group">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none"></div>
                    </>
                  ) : (
                    /* Placeholder quando não há mídia */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azimut-red/10 via-slate-900/80 to-slate-950 transition-all group-hover:from-azimut-red/15 group-hover:via-slate-900">
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
                  <h2 className="mb-3 font-handel text-3xl uppercase tracking-[0.12em] line-clamp-2 text-white">
                    {cases[0].title}
                  </h2>
                  <p className="mb-4 text-base leading-relaxed line-clamp-4 text-slate-400 dark:text-slate-300">
                    {cases[0].summary || cases[0].shortTitle}
                  </p>
                  {(cases[0].city || cases[0].country) && (
                    <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
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
                    className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-[0.75rem] font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/20 transition-all mt-4"
                    style={{ color: 'var(--theme-text)' }}
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
                  className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/20 transition-all"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {lang === 'pt' ? 'Limpar Filtros' : lang === 'es' ? 'Limpiar Filtros' : lang === 'fr' ? 'Effacer les filtres' : 'Clear Filters'}
                </button>
              )}
            </div>
          )}

          {/* Other Projects Grid */}
          {cases.length > 1 && (
            <div id="projects-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {cases.slice(1).map((item: WorkProject, index: number) => (
              <article
                key={item.slug}
                className={`group rounded-2xl border card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)] ${
                  theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
                }`}
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
                <div className="relative aspect-video bg-gradient-to-br from-slate-800/80 to-slate-950 overflow-hidden">
                  {/* Renderizar imagem se disponível */}
                  {item.heroImage?.medium || item.heroImage?.large ? (
                    <>
                      <OptimizedImage
                        src={item.heroImage.large || item.heroImage.medium}
                        alt={item.heroImage.alt || item.title}
                        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none opacity-100 group-hover:from-azimut-red/20 group-hover:via-slate-950/40 transition-all duration-300"></div>
                    </>
                  ) : (
                    /* Placeholder quando não há imagem */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800/60 to-slate-950 transition-all duration-300 group-hover:from-azimut-red/20 group-hover:to-slate-950">
                      <div className="text-center p-4">
                        <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-subtle backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:border-azimut-red/50 ${
                          theme === 'dark' ? 'border-white/20' : 'border-slate-300/40'
                        }`}>
                          <svg className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-azimut-red transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 relative z-10 overflow-hidden">
                  <h3 className="mb-2 font-sora text-[1.05rem] text-slate-300 dark:text-slate-200 group-hover:text-azimut-red transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-300 transition-colors duration-300 line-clamp-3">
                    {item.summary || item.shortTitle}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-[0.68rem] text-slate-600 dark:text-slate-500">
                        {((item?.tags && Array.isArray(item.tags)) ? item.tags : []).slice(0, 3).map((tag: string, idx: number) => (
                          <span 
                            key={idx} 
                            className={`rounded-full border px-2 py-0.5 transition-all duration-300 group-hover:border-azimut-red/50 group-hover:bg-azimut-red/10 group-hover:text-azimut-red ${
                              theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.year && (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-500">
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
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-4 py-2 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/20 transition-all w-full justify-center"
                    style={{ color: 'var(--theme-text)' }}
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
