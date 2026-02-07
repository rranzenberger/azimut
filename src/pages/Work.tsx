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
// 🆕 FASE 2: Site Inteligente - Detecção de Intenção
import { useIntentionDetection } from '../hooks/useIntentionDetection'
import { useBehaviorTracking } from '../hooks/useBehaviorTracking'
import DynamicSuggestionBanner from '../components/DynamicSuggestionBanner'
import IntentionDebugPanel from '../components/IntentionDebugPanel'
import BannerTest from '../components/BannerTest'
import OportunidadesAtivas from '../components/OportunidadesAtivas'
import CredibilidadeEditais from '../components/CredibilidadeEditais'
import CuradoriaFestivais from '../components/CuradoriaFestivais'
import StarBackground from '../components/StarBackground'
import OptimizedImage from '../components/OptimizedImage'
import { useTheme } from '../contexts/ThemeContext'
import { MAIN_CATEGORIES, getCategoryFilters, getCategoryLabel } from '../utils/categoryMapping'
import { PageFooterNavigation } from '../components/PageFooterNavigation'
import LangLink from '../components/LangLink'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useLoadingSkeleton } from '../hooks/useLoadingSkeleton'
import { ItemListSchema, ProjectSchema } from '../components/StructuredData'

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
    alt?: string
  } | null
  thumbnailUrl?: string  // URL alternativa para thumbnail (fallback quando heroImage não existe)
  hasDetailPage?: boolean // Se true, mostra link para página de detalhes
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
  // Tracking de interações
  const { trackInteraction } = useUserTracking()
  const navigate = useNavigate()
  const location = useLocation()
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
  
  // 🆕 FASE 2: Site Inteligente - Detecção de Intenção
  const { intention, loading: intentionLoading } = useIntentionDetection(lang)
  const { trackCategoryClick, trackProjectView } = useBehaviorTracking()
  
  // Auto-aplicar filtro baseado em intenção detectada (apenas uma vez)
  const [intentionApplied, setIntentionApplied] = useState(false)
  useEffect(() => {
    if (intention?.recommendedCategory && !intentionApplied && !selectedCategory.length && !selectedType) {
      // Mapear categoria recomendada para filtros
      const categoryMap: Record<string, { category?: string[], type?: string }> = {
        'museus': { category: ['museum', 'museus', 'exposição'] },
        'vr': { category: ['vr-360', 'vr', 'ar', 'xr'] },
        'cinema': { category: ['video', 'cinema', 'audiovisual'] }
      }
      
      const mapping = categoryMap[intention.recommendedCategory]
      if (mapping) {
        if (mapping.category) {
          setSelectedCategory(mapping.category)
        }
        if (mapping.type) {
          setSelectedType(mapping.type)
        }
        setIntentionApplied(true) // Marcar como aplicado
      }
    }
  }, [intention?.recommendedCategory, intentionApplied, selectedCategory.length, selectedType])

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
  
  // Fallback: Projetos reais quando backoffice está vazio ou falha
  const defaultCases = useMemo(() => [
    {
      slug: 'museu-olimpico-rio',
      title: lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum',
      shortTitle: lang === 'pt' ? 'Projeto Expográfico e Museográfico Digital' : lang === 'es' ? 'Proyecto Expográfico y Museográfico Digital' : lang === 'fr' ? 'Projet Expographique et Muséographique Numérique' : 'Digital Expographic and Museographic Project',
      summary: lang === 'pt' ? 'Direção geral, direção de tecnologia e direção audiovisual. Projeto expográfico completo com recursos interativos digitais, instalações audiovisuais interativas, narrativas cinematográficas e experiência multissensorial.' : lang === 'es' ? 'Dirección general, dirección de tecnología y dirección audiovisual. Proyecto expográfico completo con recursos interactivos digitales.' : lang === 'fr' ? 'Direction générale, direction de la technologie et direction audiovisuelle. Projet expographique complet avec ressources interactives numériques.' : 'General direction, technology direction and audiovisual direction. Complete expographic project with digital interactive resources.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2016,
      tags: [lang === 'pt' ? 'Museografia Digital' : 'Digital Museography', lang === 'pt' ? 'Projeto Expográfico' : 'Expographic Project', lang === 'pt' ? 'Recursos Interativos' : 'Interactive Resources'],
      type: 'MUSEUM',
      projectCategory: ['museum', 'exhibition'],
      technologies: ['Interactive', '360'],
      heroImage: { type: 'VIDEO', original: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI', thumbnail: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg', alt: 'Museu Olímpico Rio' },
      hasDetailPage: true,
    },
    {
      slug: 'exposicao-itinerante-tmnt',
      title: lang === 'pt' ? 'TMNT - Tartarugas Ninjas - Exposição Itinerante' : lang === 'es' ? 'TMNT - Tortugas Ninja - Exposición Itinerante' : lang === 'fr' ? 'TMNT - Tortues Ninja - Exposition Itinérante' : 'TMNT - Ninja Turtles - Itinerant Exhibition',
      shortTitle: lang === 'pt' ? 'Exposição Itinerante em Cartaz' : 'Itinerant Exhibition on Display',
      summary: lang === 'pt' ? 'Projeto expográfico para exposição itinerante interativa sobre as Tartarugas Ninjas. Animação, motion design e edição de vídeo com recursos interativos digitais.' : 'Expographic project for interactive itinerant exhibition about Ninja Turtles. Animation, motion design and video editing.',
      city: lang === 'pt' ? 'Fortaleza' : 'Fortaleza',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [lang === 'pt' ? 'Exposição Itinerante' : 'Itinerant Exhibition', lang === 'pt' ? 'Em Cartaz' : 'On Display', lang === 'pt' ? 'Animação' : 'Animation'],
      type: 'EXHIBITION',
      projectCategory: ['museum', 'exhibition', 'animation'],
      technologies: ['Interactive', 'Animation'],
      heroImage: null,
      hasDetailPage: true,
    },
    {
      slug: 'curadoria-festival-gramado-vr',
      title: lang === 'pt' ? 'Curadoria Festival de Cinema de Gramado - Mostra VR' : lang === 'es' ? 'Curaduría Festival de Cine de Gramado' : lang === 'fr' ? 'Curation Festival de Cinéma de Gramado' : 'Gramado Film Festival - VR Showcase',
      shortTitle: lang === 'pt' ? 'Curadoria de Conteúdo VR' : 'VR Content Curation',
      summary: lang === 'pt' ? 'Curadoria e programação de mostra de filmes em realidade virtual para Festival de Cinema de Gramado desde 2017. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.' : 'Curation and programming of virtual reality film showcase for Gramado Film Festival since 2017.',
      city: 'Gramado',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [lang === 'pt' ? 'Curadoria' : 'Curation', lang === 'pt' ? 'Festival' : 'Festival', lang === 'pt' ? 'Realidade Virtual' : 'Virtual Reality'],
      type: 'FESTIVAL',
      projectCategory: ['curadoria', 'festival', 'vr-360'],
      technologies: ['VR', '360'],
      heroImage: null,
      hasDetailPage: true,
    },
    {
      slug: 'filme-vr-360-zen',
      title: lang === 'pt' ? 'VR ZEN - Filme em Realidade Virtual 360°' : lang === 'es' ? 'VR ZEN - Película VR 360°' : lang === 'fr' ? 'VR ZEN - Film VR 360°' : 'VR ZEN - 360° Virtual Reality Film',
      shortTitle: lang === 'pt' ? 'Documentário 360° Autoral' : '360° Documentary',
      summary: lang === 'pt' ? 'Coprodução de filme autoral em realidade virtual 360° com Caixote Virtual. Narrativa transmidiática interativa com artes digitais imersivas.' : 'Co-production of authorial 360° virtual reality film. Interactive transmedia narrative with immersive digital arts.',
      city: null,
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2023,
      tags: [lang === 'pt' ? 'Realidade Virtual' : 'Virtual Reality', '360°', lang === 'pt' ? 'Documentário' : 'Documentary'],
      type: 'VR_FILM',
      projectCategory: ['vr-360', 'vr', 'cinema', 'video'],
      technologies: ['VR', '360'],
      heroImage: null,
      hasDetailPage: true,
    },
    {
      slug: 'curso-producao-cinematicvr-ufrj',
      title: lang === 'pt' ? 'Produção CinematicVR - UFRJ' : lang === 'es' ? 'Producción CinematicVR - UFRJ' : lang === 'fr' ? 'Production CinematicVR - UFRJ' : 'CinematicVR Production - UFRJ',
      shortTitle: lang === 'pt' ? 'Formação Profissional em VR' : 'Professional VR Training',
      summary: lang === 'pt' ? 'Curso de extensão universitária em Produção CinematicVR na UFRJ. Direção audiovisual e pedagógica, formação profissional em realidade virtual e cinema imersivo.' : 'University extension course in CinematicVR Production at UFRJ. Audiovisual and pedagogical direction.',
      city: lang === 'pt' ? 'Rio de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2023,
      tags: [lang === 'pt' ? 'Educação' : 'Education', 'VR', lang === 'pt' ? 'Universidade' : 'University'],
      type: 'EDUCATION',
      projectCategory: ['education', 'vr-360'],
      technologies: ['VR', 'Interactive'],
      heroImage: null,
      hasDetailPage: true,
    },
    {
      slug: 'animacao-3d-personagens',
      title: lang === 'pt' ? 'Animação 3D e Personagens' : lang === 'es' ? 'Animación 3D y Personajes' : lang === 'fr' ? 'Animation 3D et Personnages' : '3D Animation & Characters',
      shortTitle: lang === 'pt' ? 'Motion Design e Animação' : 'Motion Design & Animation',
      summary: lang === 'pt' ? 'Criação de personagens 3D, animações e motion design para projetos expográficos, corporativos e educacionais. Integração com ambientes interativos e realidade aumentada.' : '3D character creation, animations and motion design for exhibitions, corporate and educational projects.',
      city: lang === 'pt' ? 'São Paulo' : 'São Paulo',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: ['3D', lang === 'pt' ? 'Animação' : 'Animation', 'Motion Design'],
      type: 'ANIMATION',
      projectCategory: ['design', 'animation', 'vfx'],
      technologies: ['3D', 'Animation', 'Motion Graphics'],
      heroImage: null,
      hasDetailPage: true,
    },
    {
      slug: 'maquete-virtual-arquitetura',
      title: lang === 'pt' ? 'Maquete Virtual e Renders 3D' : lang === 'es' ? 'Maqueta Virtual y Renders 3D' : lang === 'fr' ? 'Maquette Virtuelle et Rendus 3D' : 'Virtual Model & 3D Renders',
      shortTitle: lang === 'pt' ? 'Visualização Arquitetônica' : 'Architectural Visualization',
      summary: lang === 'pt' ? 'Maquetes virtuais interativas e renders 3D de alta qualidade para projetos arquitetônicos, expográficos e culturais. Navegação em tempo real com visualização imersiva.' : 'Interactive virtual models and high-quality 3D renders for architectural, exhibition and cultural projects.',
      city: lang === 'pt' ? 'Rio de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: ['3D', lang === 'pt' ? 'Maquete Virtual' : 'Virtual Model', lang === 'pt' ? 'Renders' : 'Renders'],
      type: 'ARCHITECTURE',
      projectCategory: ['design', 'vfx'],
      technologies: ['3D', 'Interactive'],
      heroImage: null,
      hasDetailPage: true,
    },
  ], [lang])
  
  // MIGRAÇÃO GRADUAL: Backoffice → Estático (sempre funciona)
  const allCases = useMemo(() => {
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      return cmsContent.highlightProjects;
    }
    return defaultCases;
  }, [cmsContent?.highlightProjects, defaultCases, cmsLoading, cmsError])
  
  // SEO dinâmico baseado nos projetos disponíveis
  const baseSeo = seoData.work[lang]
  const seo = useMemo(() => {
    // Se temos projetos, enriquecer description
    if (allCases.length > 0 && !cmsLoading) {
      const projectsCount = allCases.length
      const featuredTypes = new Set<string>()
      allCases.slice(0, 10).forEach((p: WorkProject) => {
        if (p.type) featuredTypes.add(p.type)
        if (p.tags) p.tags.forEach((tag: string) => featuredTypes.add(tag))
      })
      const typesList = Array.from(featuredTypes).slice(0, 5).join(', ')
      
      return {
        ...baseSeo,
        description: lang === 'pt'
          ? `${baseSeo.description} Explore ${projectsCount} projetos em ${typesList || 'VR, AR, exposições e experiências imersivas'}.`
          : lang === 'es'
          ? `${baseSeo.description} Explora ${projectsCount} proyectos en ${typesList || 'VR, AR, exposiciones y experiencias inmersivas'}.`
          : lang === 'fr'
          ? `${baseSeo.description} Explorez ${projectsCount} projets en ${typesList || 'VR, AR, expositions et expériences immersives'}.`
          : `${baseSeo.description} Explore ${projectsCount} projects in ${typesList || 'VR, AR, exhibitions and immersive experiences'}.`
      }
    }
    return baseSeo
  }, [allCases.length, cmsLoading, lang, baseSeo])
  
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
  
  // Helper: Obter URL da imagem (prioriza heroImage, depois thumbnailUrl)
  const getProjectImageUrl = (project: WorkProject, size: 'large' | 'medium' | 'thumbnail' = 'large'): string | null => {
    if (project.heroImage) {
      return project.heroImage[size] || project.heroImage.large || project.heroImage.medium || project.heroImage.original || null
    }
    if (project.thumbnailUrl) {
      return project.thumbnailUrl
    }
    return null
  }

  // Helper: Gerar alt text descritivo para imagens de projetos
  const getProjectImageAlt = (project: WorkProject): string => {
    // Se já tem alt text do backoffice, usar
    if (project.heroImage?.alt) {
      return project.heroImage.alt
    }
    
    // Construir alt text descritivo
    const parts: string[] = [project.title]
    
    if (project.summary) {
      const summaryShort = project.summary.length > 80 
        ? project.summary.substring(0, 80) + '...'
        : project.summary
      parts.push(summaryShort)
    }
    
    if (project.city || project.country) {
      parts.push([project.city, project.country].filter(Boolean).join(', '))
    }
    
    if (project.year) {
      parts.push(`(${project.year})`)
    }
    
    // Adicionar tags principais se disponíveis
    if (project.tags && project.tags.length > 0) {
      const mainTags = project.tags.slice(0, 2).join(', ')
      parts.push(`Tags: ${mainTags}`)
    }
    
    return `${parts.join(' - ')} | Azimut Portfolio`
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

  // Imagem OG dinâmica: usar primeira imagem do primeiro projeto se disponível
  const ogImage = useMemo(() => {
    if (cases.length > 0 && cases[0]) {
      const firstProjectImage = getProjectImageUrl(cases[0], 'large')
      if (firstProjectImage) return firstProjectImage
    }
    return seo.image || 'https://azmt.com.br/og-work.png'
  }, [cases, seo.image])

  // Schema.org: ItemList para lista de projetos (SEO)
  const projectListSchema = useMemo(() => {
    if (cases.length === 0) return null
    
    return {
      name: lang === 'pt' 
        ? 'Portfolio de Projetos Azimut' 
        : lang === 'es'
        ? 'Portafolio de Proyectos Azimut'
        : lang === 'fr'
        ? 'Portfolio de Projets Azimut'
        : 'Azimut Project Portfolio',
      description: seo.description,
      items: cases.slice(0, 20).map((project: WorkProject, index: number) => ({
        name: project.title,
        url: `https://azmt.com.br/${lang}/work/${project.slug}`,
        image: getProjectImageUrl(project, 'medium'),
        position: index + 1
      }))
    }
  }, [cases, lang, seo.description])

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        image={ogImage}
        url={seo.url}
        type="website"
      />
      
      {/* Schema.org: ItemList para SEO */}
      {projectListSchema && (
        <ItemListSchema
          name={projectListSchema.name}
          description={projectListSchema.description}
          items={projectListSchema.items}
          lang={lang}
        />
      )}
      
      {/* 🧪 TESTE: Banner de Teste - Apenas em desenvolvimento */}
      {import.meta.env.DEV && <BannerTest />}
      
      {/* 🆕 FASE 2: Banner de Sugestão Dinâmica */}
      <DynamicSuggestionBanner 
        lang={lang} 
        theme={theme}
        minConfidence={0.3}
        autoHideDelay={20000}
      />
      
      {/* 🐛 DEBUG: Painel de Debug (apenas em desenvolvimento) */}
      {import.meta.env.DEV && <IntentionDebugPanel />}
      
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
            top: '52px'
          }}
        >
          <div className="mx-auto max-w-7xl w-full sm:px-4 min-[768px]:px-6 py-3 flex justify-center">
            <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {/* + TODOS → subpágina com todos os projetos */}
              <button
                onClick={() => navigate(`/${lang}/work/projects`)}
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-colors ${
                  !hasActiveFilters
                    ? 'text-azimut-red border-b-2 border-azimut-red'
                    : 'text-slate-400 hover:text-azimut-red'
                }`}
              >
                <span>+</span>
                <span>{lang === 'pt' ? 'TODOS' : lang === 'es' ? 'TODOS' : lang === 'fr' ? 'TOUS' : 'ALL'}</span>
              </button>
              
              {/* 6 Categorias Principais */}
              {MAIN_CATEGORIES.map((category) => {
                const filters = getCategoryFilters(category.id)
                const isActive = filters.projectCategory?.some(cat => selectedCategory.includes(cat)) || 
                                (filters.type && selectedType === filters.type)
                
                // 🆕 Destacar categoria baseada em intenção detectada
                const isRecommended = intention?.recommendedCategory && 
                  (category.id === 'museums-exhibitions' && intention.recommendedCategory === 'museus' ||
                   category.id === 'vr-xr' && intention.recommendedCategory === 'vr' ||
                   category.id === 'video-cinema' && intention.recommendedCategory === 'cinema')
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      // Tracking de categoria clicada
                      trackCategoryClick(category.id, 'menu')
                      
                      // Limpar outros filtros primeiro
                      clearFilters()
                      
                      // Ir para subpágina de todos os projetos com filtro
                      if (filters.type) {
                        navigate(`/${lang}/work/projects?type=${filters.type}`)
                      } else if (filters.projectCategory?.length) {
                        navigate(`/${lang}/work/projects?type=${filters.type || ''}`)
                      } else {
                        navigate(`/${lang}/work/projects`)
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-azimut-red border-b-2 border-azimut-red scale-105'
                        : isRecommended
                        ? 'text-azimut-red/80 hover:text-azimut-red hover:scale-105 relative'
                        : 'text-slate-400 hover:text-azimut-red hover:scale-105'
                    }`}
                    style={{
                      transform: isRecommended ? 'scale(1.05)' : undefined
                    }}
                  >
                    {isRecommended && (
                      <span 
                        className="absolute -top-1 -right-1 text-[0.6rem] animate-pulse"
                        style={{ color: '#c92337' }}
                        title={lang === 'pt' ? 'Recomendado para você' : lang === 'es' ? 'Recomendado para ti' : lang === 'fr' ? 'Recommandé pour vous' : 'Recommended for you'}
                      >
                        ⭐
                      </span>
                    )}
                    <span>{category.icon}</span>
                    <span>{category.label[lang]}</span>
                  </button>
                )
              })}
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
              {lang === 'pt' ? (
                <>Projetos que transformam espaços, marcas e experiências. De museus olímpicos a curadoria de festivais internacionais, cada trabalho é uma oportunidade de criar narrativas imersivas que conectam pessoas e histórias de forma única. <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">Conheça nossos serviços</LangLink> ou <LangLink to="/contact" className="text-azimut-red hover:text-azimut-red/80 underline">inicie seu projeto</LangLink>.</>
              ) : lang === 'es' ? (
                <>Proyectos que transforman espacios, marcas y experiencias. Desde museos olímpicos hasta curaduría de festivales internacionales, cada trabajo es una oportunidad de crear narrativas inmersivas que conectan personas e historias de forma única. <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">Conoce nuestras soluciones</LangLink> o <LangLink to="/contact" className="text-azimut-red hover:text-azimut-red/80 underline">inicia tu proyecto</LangLink>.</>
              ) : lang === 'fr' ? (
                <>Des projets qui transforment les espaces, les marques et les expériences. Des musées olympiques à la curation de festivals internationaux, chaque travail est une opportunité de créer des narrations immersives qui connectent les personnes et les histoires de manière unique. <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">Découvrez nos solutions</LangLink> ou <LangLink to="/contact" className="text-azimut-red hover:text-azimut-red/80 underline">lancez votre projet</LangLink>.</>
              ) : (
                <>Projects that transform spaces, brands and experiences. From Olympic museums to international festival curation, each work is an opportunity to create immersive narratives that uniquely connect people and stories. <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">Explore our solutions</LangLink> or <LangLink to="/contact" className="text-azimut-red hover:text-azimut-red/80 underline">start your project</LangLink>.</>
              )}
            </p>
            {/* CTA: Projetos realizados / Veja todo nosso portfólio */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to={`/${lang}/work/projects`}
                className="inline-flex items-center gap-2 rounded-xl border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-azimut-red hover:bg-azimut-red/20 transition-all"
              >
                {lang === 'pt' ? 'Veja todo nosso portfólio' : lang === 'es' ? 'Ver todo nuestro portafolio' : lang === 'fr' ? 'Voir tout notre portfolio' : 'View full portfolio'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {lang === 'pt' ? 'Projetos realizados com filtros por área.' : lang === 'es' ? 'Proyectos realizados con filtros por área.' : lang === 'fr' ? 'Projets réalisés avec filtres par domaine.' : 'Completed projects with filters by area.'}
              </span>
            </div>
          </div>
          {/* ═══ Barra de ações: contador + limpar filtros ═══ */}
          <div id="filters-section" className="mb-6 flex items-center justify-between">
            <div id="results-counter" className="font-sora text-sm text-slate-500 dark:text-slate-400">
              {cases.length} {lang === 'pt' ? (cases.length === 1 ? 'projeto' : 'projetos') : lang === 'es' ? (cases.length === 1 ? 'proyecto' : 'proyectos') : (cases.length === 1 ? 'project' : 'projects')}
              {hasActiveFilters && (
                <span className="ml-2 text-azimut-red">
                  ({lang === 'pt' ? 'filtrado' : lang === 'es' ? 'filtrado' : 'filtered'})
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 rounded-lg border border-azimut-red/40 bg-azimut-red/10 px-4 py-2 text-xs font-sora font-semibold uppercase tracking-wide text-azimut-red hover:bg-azimut-red/20 transition-all"
              >
                {lang === 'pt' ? '✕ Limpar filtros' : lang === 'es' ? '✕ Limpiar' : '✕ Clear'}
              </button>
            )}
          </div>

          {/* ═══ CARD DESTAQUE: Curadoria (editável via backoffice) ═══ */}
          {!hasActiveFilters && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-azimut-red/30 bg-gradient-to-r from-azimut-red/10 via-transparent to-transparent backdrop-blur-sm transition-all hover:border-azimut-red/50 hover:shadow-lg hover:shadow-azimut-red/10">
              <div className="flex items-center gap-5 p-5 sm:p-6">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-azimut-red/15 text-3xl">
                  🎪
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 font-handel text-lg uppercase tracking-[0.1em] text-azimut-red">
                    {cmsContent?.curationTitle || (lang === 'pt' ? 'Curadoria Gramado' : lang === 'es' ? 'Curaduría Gramado' : lang === 'fr' ? 'Curation Gramado' : 'Gramado Curation')}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400 line-clamp-2">
                    {cmsContent?.curationDescription || (lang === 'pt' 
                      ? 'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil com expertise em curadoria cinematográfica.'
                      : lang === 'es'
                      ? 'Nuestro mayor diferencial: curaduría de nivel internacional para festivales.'
                      : lang === 'fr'
                      ? 'Notre plus grand atout: curation de niveau international pour festivals.'
                      : 'Our biggest differentiator: international-level curation for festivals.')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const filterCat = cmsContent?.curationFilterCategory || 'curadoria'
                    setSelectedCategory([filterCat])
                  }}
                  className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/15 px-5 py-2.5 font-sora text-xs font-semibold uppercase tracking-[0.1em] text-azimut-red hover:bg-azimut-red/25 transition-all"
                >
                  <span className="hidden sm:inline">{cmsContent?.curationButtonText || (lang === 'pt' ? 'Ver Curadoria' : lang === 'es' ? 'Ver Curaduría' : lang === 'fr' ? 'Voir Curation' : 'View Curation')}</span>
                  <span className="sm:hidden">{lang === 'pt' ? 'Ver' : 'View'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Featured Project - Full Width - SEMPRE MOSTRA, mesmo sem dados */}
          {cases.length > 0 && (
              <article
                id={cases.length === 1 ? 'projects-grid' : undefined}
                className={`mb-8 overflow-hidden rounded-3xl border card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)] cursor-pointer ${
                  theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  try {
                    trackInteraction('project_view', cases[0].slug)
                    trackProjectInteraction(cases[0].slug, 'CLICK')
                  } catch (err) {
                    console.warn('Tracking error:', err)
                  }
                  
                  // Navegação
                  navigate(`/${lang}/work/${cases[0].slug}`)
                }}
              >
              <div className="grid md:grid-cols-2">
                {/* Image Area - BACKOFFICE: cases[0].heroImage ou thumbnailUrl */}
                <div className="relative aspect-video md:aspect-auto md:min-h-[400px] bg-gradient-to-br from-slate-800/80 to-slate-950 overflow-hidden group">
                  {/* Renderizar imagem se disponível (heroImage ou thumbnailUrl) */}
                  {getProjectImageUrl(cases[0], 'large') ? (
                    <>
                      <img
                        src={getProjectImageUrl(cases[0], 'large')!}
                        alt={getProjectImageAlt(cases[0])}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain transition-transform group-hover:scale-105"
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
                  <h2 
                    className="mb-3 font-handel text-3xl uppercase tracking-[0.12em] line-clamp-2"
                    style={{ 
                      color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                      textShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {cases[0].title}
                  </h2>
                  <p 
                    className="mb-4 text-base leading-relaxed line-clamp-4"
                    style={{ 
                      color: theme === 'dark' ? '#cbd5e1' : '#e8e5df',
                      textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {cases[0].summary || cases[0].shortTitle}
                  </p>
                  {(cases[0].city || cases[0].country) && (
                    <p 
                      className="mb-4 text-sm"
                      style={{ 
                        color: theme === 'dark' ? '#94a3b8' : '#d3cec3',
                        textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5)' : 'none'
                      }}
                    >
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
                    to={`/${lang}/work/${cases[0].slug}`}
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
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  // Tracking existente
                  try {
                    trackInteraction('project_view', item.slug)
                    trackProjectInteraction(item.slug, 'CLICK')
                    
                    // 🆕 FASE 2: Tracking comportamental avançado
                    trackProjectView(item.id || item.slug, item.slug)
                  } catch (err) {
                    console.warn('Tracking error:', err)
                  }
                  
                  // Navegação
                  navigate(`/${lang}/work/${item.slug}`)
                }}
                onMouseEnter={() => trackProjectInteraction(item.slug, 'HOVER')}
              >
                {/* Image - BACKOFFICE: item.heroImage ou thumbnailUrl */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800/80 to-slate-950 overflow-hidden">
                  {/* Renderizar imagem se disponível (heroImage ou thumbnailUrl) */}
                  {getProjectImageUrl(item, 'medium') ? (
                    <>
                      <OptimizedImage
                        src={getProjectImageUrl(item, 'medium')!}
                        alt={getProjectImageAlt(item)}
                        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                        objectFit="contain"
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
                  <h3 
                    className="mb-2 font-sora text-[1.05rem] group-hover:text-azimut-red transition-colors duration-300 line-clamp-2"
                    style={{ 
                      color: theme === 'dark' ? '#cbd5e1' : '#f5f1e8',
                      textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed mb-3 group-hover:text-slate-300 transition-colors duration-300 line-clamp-3"
                    style={{ 
                      color: theme === 'dark' ? '#94a3b8' : '#e8e5df',
                      textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)' : '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {item.summary || item.shortTitle}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-[0.68rem]">
                        {((item?.tags && Array.isArray(item.tags)) ? item.tags : []).slice(0, 3).map((tag: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="rounded-full border px-2 py-0.5 transition-all duration-300 group-hover:border-azimut-red/50 group-hover:bg-azimut-red/10 group-hover:text-azimut-red"
                            style={{ 
                              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
                              color: theme === 'dark' ? '#94a3b8' : '#f5f1e8',
                              textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5)' : 'none'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.year && (
                      <span 
                        className="text-xs font-medium"
                        style={{ 
                          color: theme === 'dark' ? '#94a3b8' : '#d3cec3',
                          textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5)' : 'none'
                        }}
                      >
                        {item.year}
                      </span>
                    )}
                  </div>
                  {/* CTA */}
                  <Link
                    to={`/${lang}/work/${item.slug}`}
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

          </section>
        </div>

        {/* Navegação Final - Curada e Organizada */}
        <PageFooterNavigation
          lang={lang}
          mainCta={{
            title: intention?.personalizedCTA && intention.confidence > 0.7
              ? intention.personalizedCTA
              : (lang === 'pt' 
                ? 'Queremos Revisar Seu Projeto/Edital'
                : lang === 'es'
                ? 'Queremos Revisar Tu Proyecto/Edital'
                : lang === 'fr'
                ? 'Nous Voulons Examiner Votre Projet/Financement'
                : 'We Want to Review Your Project/Grant'),
            description: lang === 'pt' 
              ? 'Tem um projeto em mente? Vamos conversar sobre como podemos trabalhar juntos.'
              : lang === 'es'
              ? '¿Tienes un proyecto en mente? Hablemos sobre cómo podemos trabajar juntos.'
              : lang === 'fr'
              ? 'Vous avez un projet en tête? Parlons de la façon dont nous pouvons travailler ensemble.'
              : 'Have a project in mind? Let\'s talk about how we can work together.',
            buttonText: intention?.personalizedCTA && intention.confidence > 0.7
              ? intention.personalizedCTA
              : (lang === 'pt' ? 'Iniciar Conversa' : lang === 'es' ? 'Iniciar Conversación' : lang === 'fr' ? 'Démarrer la Conversation' : 'Start Conversation'),
            buttonHref: intention?.suggestedAction === 'contact-form'
              ? '/contact'
              : intention?.suggestedAction
              ? `/${intention.suggestedAction}`
              : '/contact'
          }}
          navigation={{
            previous: {
              label: lang === 'pt' ? 'Conhecer Estúdio' : lang === 'es' ? 'Conocer Estudio' : lang === 'fr' ? 'Découvrir Studio' : 'Meet Studio',
              href: '/studio',
              icon: '🏛️'
            },
            next: {
              label: lang === 'pt' ? 'Ver Serviços' : lang === 'es' ? 'Ver Soluciones' : lang === 'fr' ? 'Voir Solutions' : 'View Solutions',
              href: '/what',
              icon: '✨'
            }
          }}
        />
      </main>
    </>
  )
}

export default Work
