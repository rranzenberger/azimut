import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import SEO from '../components/SEO'
import { usePageSEO } from '../hooks/usePageSEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
// MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
import { useAzimutContent } from '../hooks/useAzimutContent'
import { usePersonalizedContent } from '../hooks/usePersonalizedContent'
import { VideoPlayer } from '../components/VideoPlayer'
import { AnimatedLogo } from '../components/AnimatedLogo'
import StarBackground from '../components/StarBackground'
import OptimizedImage from '../components/OptimizedImage'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTheme } from '../contexts/ThemeContext'
import { getInterestProfile, personalizeProjectOrder } from '../utils/personalizeProjects'
import { logger } from '@/utils/logger'
import { PageFooterNavigation } from '../components/PageFooterNavigation'
import LangLink from '../components/LangLink'
// 🆕 UX PREMIUM - Loading Skeleton (OPCIONAL - pode remover se não funcionar)
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useLoadingSkeleton } from '../hooks/useLoadingSkeleton'

interface HomeProps {
  lang: Lang
}

// Interfaces TypeScript para tipagem correta
interface ProjectHeroImage {
  type?: string
  original?: string
  thumbnail?: string
  medium?: string
  large?: string
  webp?: string
  avif?: string
  alt?: string
  format?: string
}

interface HomeProject {
  slug: string
  title: string
  shortTitle?: string
  summary: string
  city?: string
  country?: string
  year?: number
  tags: string[]
  heroImage?: ProjectHeroImage | null
  thumbnailUrl?: string | null
  image?: string
}

interface HomeService {
  icon: string
  title: string
  description: string
  slug?: string
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  // 🎨 TEMA: Usar hook centralizado (não criar estado local!)
  const { theme } = useTheme()
  const demoreelRef = useRef<HTMLDivElement>(null)
  const [isDemoreelVisible, setIsDemoreelVisible] = useState(false)
  
  // ✅ Hooks ROBUSTOS - Nunca causam erro #310
  // Controlados via flags CMS_ENABLED e PERSONALIZATION_ENABLED
  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useAzimutContent({ 
    page: 'home',
    lang
  })
  
  const {
    profile,
    recommendedProjects: personalizedProjects,
    heroMessage: personalizedHeroMessage,
    heroSubtitle: personalizedHeroSubtitle,
    ctaText: personalizedCtaText,
    ctaLink: personalizedCtaLink,
    shouldShowEditais,
    loading: personalizationLoading,
  } = usePersonalizedContent()
  
  // 🆕 UX PREMIUM - Loading Skeleton (DESABILITADO TEMPORARIAMENTE)
  // Skeleton desabilitado: site carrega direto sem tela de loading (evita tarja azul).
  const showSkeleton = false
  
  // ESTRATÉGIA CORRIGIDA: i18n.ts → Personalizado → Backoffice
  // Priorizar i18n.ts (sempre correto por idioma) sobre backoffice (que pode estar desatualizado)
  const heroSlogan = t(lang, 'heroTitle') || personalizedHeroMessage || cmsContent?.page?.heroSlogan
  const heroSubtitle = t(lang, 'heroSubtitle') || personalizedHeroSubtitle || cmsContent?.page?.heroSubtitle
  
  // Fallback: Projetos padrão quando backoffice está vazio
  // ═══════════════════════════════════════════════════════════════
  // Terminologia profissional baseada em pesquisa:
  // - Museografia digital: "projeto expográfico", "recursos interativos digitais"
  // - Exposições itinerantes: "em cartaz", "percorre diferentes cidades"
  // - Curadoria: "seleção de filmes", "definição de públicos-alvo", "visão conceitual"
  // - Realidade virtual: "narrativas transmidiáticas", "experiência multissensorial"
  // - Educação: "formação profissional", "workshops especializados"
  // ═══════════════════════════════════════════════════════════════
  const defaultProjects = useMemo(() => [
    {
      slug: 'museu-olimpico-rio',
      title: lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum',
      shortTitle: lang === 'pt' ? 'Projeto Expográfico e Museográfico Digital' : lang === 'es' ? 'Proyecto Expográfico y Museográfico Digital' : lang === 'fr' ? 'Projet Expographique et Muséographique Numérique' : 'Digital Expographic and Museographic Project',
      summary: lang === 'pt' 
        ? 'Direção geral, direção de tecnologia e direção audiovisual. Projeto expográfico completo com recursos interativos digitais, instalações audiovisuais interativas, narrativas cinematográficas e experiência multissensorial. Gestão de curadoria de conteúdo, programação de circuitos expositivos, salas imersivas 360° e sistemas de cadastro de visitantes.'
        : lang === 'es'
        ? 'Dirección general, dirección de tecnología y dirección audiovisual. Proyecto expográfico completo con recursos interactivos digitales, instalaciones audiovisuales interactivas, narrativas cinematográficas y experiencia multisensorial. Gestión de curaduría de contenido, programación de circuitos expositivos, salas inmersivas 360° y sistemas de registro de visitantes.'
        : lang === 'fr'
        ? 'Direction générale, direction de la technologie et direction audiovisuelle. Projet expographique complet avec ressources interactives numériques, installations audiovisuelles interactives, récits cinématographiques et expérience multisensorielle. Gestion de curation de contenu, programmation de circuits expositifs, salles immersives 360° et systèmes d\'enregistrement des visiteurs.'
        : 'General direction, technology direction and audiovisual direction. Complete expographic project with digital interactive resources, interactive audiovisual installations, cinematic narratives and multisensory experience. Content curation management, exhibition circuit programming, 360° immersive rooms and visitor registration systems.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2016,
      tags: [
        lang === 'pt' ? 'Museografia Digital' : lang === 'es' ? 'Museografía Digital' : lang === 'fr' ? 'Muséographie Numérique' : 'Digital Museography',
        lang === 'pt' ? 'Projeto Expográfico' : lang === 'es' ? 'Proyecto Expográfico' : lang === 'fr' ? 'Projet Expographique' : 'Expographic Project',
        lang === 'pt' ? 'Recursos Interativos' : lang === 'es' ? 'Recursos Interactivos' : lang === 'fr' ? 'Ressources Interactives' : 'Interactive Resources',
        lang === 'pt' ? 'Curadoria' : lang === 'es' ? 'Curaduría' : lang === 'fr' ? 'Curation' : 'Curation'
      ],
      heroImage: {
        type: 'VIDEO',
        // VÍDEO OFICIAL: Museu Olímpico do Rio (YouTube)
        original: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        thumbnail: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
        alt: lang === 'pt' ? 'Vídeo Museu Olímpico Rio' : lang === 'es' ? 'Video Museo Olímpico Río' : 'Rio Olympic Museum Video'
      },
    },
    {
      slug: 'exposicao-itinerante-tmnt',
      title: lang === 'pt' ? 'TMNT - Tartarugas Ninjas - Exposição Itinerante' : lang === 'es' ? 'TMNT - Tortugas Ninja - Exposición Itinerante' : lang === 'fr' ? 'TMNT - Tortues Ninja - Exposition Itinérante' : 'TMNT - Teenage Mutant Ninja Turtles - Itinerant Exhibition',
      shortTitle: lang === 'pt' ? 'Exposição Itinerante em Cartaz' : lang === 'es' ? 'Exposición Itinerante en Cartel' : lang === 'fr' ? 'Exposition Itinérante à l\'Affiche' : 'Itinerant Exhibition on Display',
      summary: lang === 'pt'
        ? 'Projeto expográfico para exposição itinerante interativa sobre as Tartarugas Ninjas. Animação, motion design e edição de vídeo. Recursos interativos digitais com displays sensíveis ao toque, narrativas cinematográficas e experiência multissensorial. Exposição percorre diferentes cidades ampliando acesso à cultura, atualmente em cartaz em Fortaleza.'
        : lang === 'es'
        ? 'Proyecto expográfico para exposición itinerante interactiva sobre las Tortugas Ninja. Animación, motion design y edición de video. Recursos interactivos digitales con displays sensibles al tacto, narrativas cinematográficas y experiencia multisensorial. Exposición recorre diferentes ciudades ampliando acceso a la cultura, actualmente en cartel en Fortaleza.'
        : lang === 'fr'
        ? 'Projet expographique pour exposition itinérante interactive sur les Tortues Ninja. Animation, motion design et montage vidéo. Ressources interactives numériques avec écrans tactiles, récits cinématographiques et expérience multisensorielle. Exposition parcourt différentes villes élargissant l\'accès à la culture, actuellement à l\'affiche à Fortaleza.'
        : 'Expographic project for interactive itinerant exhibition about Teenage Mutant Ninja Turtles. Animation, motion design and video editing. Digital interactive resources with touch-sensitive displays, cinematic narratives and multisensory experience. Exhibition travels through different cities expanding cultural access, currently on display in Fortaleza.',
      city: lang === 'pt' ? 'Fortaleza' : lang === 'es' ? 'Fortaleza' : 'Fortaleza',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [
        lang === 'pt' ? 'Exposição Itinerante' : lang === 'es' ? 'Exposición Itinerante' : lang === 'fr' ? 'Exposition Itinérante' : 'Itinerant Exhibition',
        lang === 'pt' ? 'Em Cartaz' : lang === 'es' ? 'En Cartel' : lang === 'fr' ? 'À l\'Affiche' : 'On Display',
        lang === 'pt' ? 'Animação' : lang === 'es' ? 'Animación' : lang === 'fr' ? 'Animation' : 'Animation',
        lang === 'pt' ? 'Motion Design' : lang === 'es' ? 'Motion Design' : lang === 'fr' ? 'Motion Design' : 'Motion Design'
      ],
      heroImage: null,
    },
    {
      slug: 'curadoria-festival-gramado-vr',
      title: lang === 'pt' ? 'Curadoria Festival de Cinema de Gramado - Mostra VR' : lang === 'es' ? 'Curaduría Festival de Cine de Gramado - Muestra VR' : lang === 'fr' ? 'Curation Festival de Cinéma de Gramado - Sélection VR' : 'Gramado Film Festival Curation - VR Showcase',
      shortTitle: lang === 'pt' ? 'Curadoria de Conteúdo VR' : lang === 'es' ? 'Curaduría de Contenido VR' : lang === 'fr' ? 'Curation de Contenu VR' : 'VR Content Curation',
      summary: lang === 'pt'
        ? 'Curadoria e programação de mostra de filmes em realidade virtual para Festival de Cinema de Gramado desde 2017. Seleção de filmes por curadoria do festival para competição nacional, definição de públicos-alvo e visão conceitual. Exibições e ativações imersivas com aluguel de equipamentos e equipe especializada. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.'
        : lang === 'es'
        ? 'Curaduría y programación de muestra de películas en realidad virtual para Festival de Cine de Gramado desde 2017. Selección de películas por curaduría del festival para competencia nacional, definición de públicos objetivo y visión conceptual. Exhibiciones y activaciones inmersivas con alquiler de equipos y equipo especializado. Único estudio en Brasil que combina producción técnica premium con experiencia en curaduría cinematográfica.'
        : lang === 'fr'
        ? 'Curation et programmation de sélection de films en réalité virtuelle pour Festival de Cinéma de Gramado depuis 2017. Sélection de films par curation du festival pour compétition nationale, définition de publics cibles et vision conceptuelle. Projections et activations immersives avec location d\'équipements et équipe spécialisée. Le seul studio au Brésil qui combine production technique premium avec expertise en curation cinématographique.'
        : 'Curation and programming of virtual reality film showcase for Gramado Film Festival since 2017. Film selection by festival curation for national competition, target audience definition and conceptual vision. Immersive screenings and activations with equipment rental and specialized team. The only studio in Brazil that combines premium technical production with expertise in film curation.',
      city: lang === 'pt' ? 'Gramado' : 'Gramado',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [
        lang === 'pt' ? 'Curadoria' : lang === 'es' ? 'Curaduría' : lang === 'fr' ? 'Curation' : 'Curation',
        lang === 'pt' ? 'Festival' : lang === 'es' ? 'Festival' : lang === 'fr' ? 'Festival' : 'Festival',
        lang === 'pt' ? 'Realidade Virtual' : lang === 'es' ? 'Realidad Virtual' : lang === 'fr' ? 'Réalité Virtuelle' : 'Virtual Reality',
        lang === 'pt' ? 'Programação' : lang === 'es' ? 'Programación' : lang === 'fr' ? 'Programmation' : 'Programming'
      ],
      heroImage: null,
    },
    {
      slug: 'filme-vr-360-zen',
      title: lang === 'pt' ? 'VR ZEN - Filme em Realidade Virtual 360°' : lang === 'es' ? 'VR ZEN - Película en Realidad Virtual 360°' : lang === 'fr' ? 'VR ZEN - Film en Réalité Virtuelle 360°' : 'VR ZEN - 360° Virtual Reality Film',
      shortTitle: lang === 'pt' ? 'Documentário 360° Autoral' : lang === 'es' ? 'Documental 360° Autoral' : lang === 'fr' ? 'Documentaire 360° Auteur' : 'Authorial 360° Documentary',
      summary: lang === 'pt'
        ? 'Coprodução de filme autoral em realidade virtual 360° com Caixote Virtual. Narrativa transmidiática interativa com artes digitais imersivas que inserem o espectador em experiência multissensorial. Documentário 360° com obras que exploram narrativas cinematográficas em realidade virtual, criando imersão completa através de narrativa cinematográfica.'
        : lang === 'es'
        ? 'Coproducción de película autoral en realidad virtual 360° con Caixote Virtual. Narrativa transmediática interactiva con artes digitales inmersivas que insertan al espectador en experiencia multisensorial. Documental 360° con obras que exploran narrativas cinematográficas en realidad virtual, creando inmersión completa a través de narrativa cinematográfica.'
        : lang === 'fr'
        ? 'Coproduction de film auteur en réalité virtuelle 360° avec Caixote Virtual. Récit transmédiatique interactif avec arts numériques immersifs qui insèrent le spectateur dans une expérience multisensorielle. Documentaire 360° avec œuvres explorant récits cinématographiques en réalité virtuelle, créant immersion complète grâce à narration cinématographique.'
        : 'Co-production of authorial film in 360° virtual reality with Caixote Virtual. Interactive transmedia narrative with immersive digital arts that insert the viewer into a multisensory experience. 360° documentary with works exploring cinematic narratives in virtual reality, creating complete immersion through cinematic storytelling.',
      city: null,
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2023,
      tags: [
        lang === 'pt' ? 'Realidade Virtual' : lang === 'es' ? 'Realidad Virtual' : lang === 'fr' ? 'Réalité Virtuelle' : 'Virtual Reality',
        lang === 'pt' ? '360°' : '360°',
        lang === 'pt' ? 'Documentário' : lang === 'es' ? 'Documental' : lang === 'fr' ? 'Documentaire' : 'Documentary',
        lang === 'pt' ? 'Coprodução' : lang === 'es' ? 'Coproducción' : lang === 'fr' ? 'Coproduction' : 'Co-production'
      ],
      heroImage: null,
    },
    {
      slug: 'curso-producao-cinematicvr-ufrj',
      title: lang === 'pt' ? 'Produção CinematicVR - UFRJ' : lang === 'es' ? 'Producción CinematicVR - UFRJ' : lang === 'fr' ? 'Production CinematicVR - UFRJ' : 'CinematicVR Production - UFRJ',
      shortTitle: lang === 'pt' ? 'Formação Profissional em VR' : lang === 'es' ? 'Formación Profesional en VR' : lang === 'fr' ? 'Formation Professionnelle en VR' : 'Professional VR Training',
      summary: lang === 'pt'
        ? 'Curso de Produção CinematicVR na UFRJ abordando técnicas de produção de conteúdo em realidade virtual e 360 graus. Formação profissional em narrativas cinematográficas imersivas, captação 360°, pós-produção e finalização de projetos VR. Workshops especializados com foco em experiência multissensorial e artes digitais imersivas.'
        : lang === 'es'
        ? 'Curso de Producción CinematicVR en UFRJ abordando técnicas de producción de contenido en realidad virtual y 360 grados. Formación profesional en narrativas cinematográficas inmersivas, captura 360°, posproducción y finalización de proyectos VR. Talleres especializados con enfoque en experiencia multisensorial y artes digitales inmersivas.'
        : lang === 'fr'
        ? 'Cours de Production CinematicVR à UFRJ abordant techniques de production de contenu en réalité virtuelle et 360 degrés. Formation professionnelle en récits cinématographiques immersifs, capture 360°, post-production et finalisation de projets VR. Ateliers spécialisés axés sur expérience multisensorielle et arts numériques immersifs.'
        : 'CinematicVR Production course at UFRJ covering techniques for producing content in virtual reality and 360 degrees. Professional training in immersive cinematic narratives, 360° capture, post-production and VR project finishing. Specialized workshops focused on multisensory experience and immersive digital arts.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2020,
      tags: [
        lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education',
        lang === 'pt' ? 'Formação Profissional' : lang === 'es' ? 'Formación Profesional' : lang === 'fr' ? 'Formation Professionnelle' : 'Professional Training',
        lang === 'pt' ? 'Realidade Virtual' : lang === 'es' ? 'Realidad Virtual' : lang === 'fr' ? 'Réalité Virtuelle' : 'Virtual Reality',
        lang === 'pt' ? 'Workshop' : lang === 'es' ? 'Taller' : lang === 'fr' ? 'Atelier' : 'Workshop'
      ],
      heroImage: null,
    },
  ], [lang])
  
  // Tracking de página (não bloqueia renderização)
  useEffect(() => {
    try {
      const cleanup = trackPageView('home')
      return cleanup
    } catch (error) {
      // Se tracking falhar, não quebrar renderização
      // Tracking error (não crítico, silencioso em produção)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Tracking error:', error)
      }
      return () => {} // Cleanup vazio
    }
  }, [])
  
  // ✅ NOVO: IntersectionObserver para autoplay do demoreel
  // ROBUSTO: try/catch para evitar quebrar a página
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const currentRef = demoreelRef.current
    
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          try {
            setIsDemoreelVisible(entry.isIntersecting)
          } catch (e) {
            // Silencioso
          }
        },
        {
          root: null, // viewport
          rootMargin: '0px',
          threshold: 0.5, // 50% do vídeo visível
        }
      )

      if (currentRef) {
        observer.observe(currentRef)
      }
    } catch (error) {
      // IntersectionObserver pode não estar disponível em alguns navegadores antigos
      logger.warn('IntersectionObserver não disponível:', error)
    }

    return () => {
      try {
        if (observer && currentRef) {
          observer.unobserve(currentRef)
        }
        observer?.disconnect()
      } catch (e) {
        // Silencioso
      }
    }
  }, [])
  
  // Projetos: SEMPRE os mesmos do backoffice (destaques = featured + priorityHome 1–7)
  // Prioridade: backoffice (CMS) → fallback estático. Não usar personalizedProjects para os slots principais, para não divergir do backoffice.
  const projects = useMemo(() => {
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      return cmsContent.highlightProjects;
    }
    return defaultProjects;
  }, [cmsContent?.highlightProjects, defaultProjects]);

  // Perfil de interesse do visitante (localStorage) — mesma lógica da página Work
  const interestProfile = useMemo(() => getInterestProfile(), []);

  // Projetos recomendados: base (prioridade backoffice) + reordenação por comportamento
  // 1 destaque + 6 cards (2 linhas de 3); quando o visitante tem histórico, a ordem pode ser personalizada
  const recommended = useMemo(() => {
    const base = projects && Array.isArray(projects) && projects.length > 0
      ? projects
      : defaultProjects;
    const minRequired = 7;
    const pool = base.length < minRequired
      ? [...base, ...defaultProjects.slice(0, minRequired - base.length)]
      : base;
    // Reordenar por comportamento (destaque fixo; seguintes personalizados)
    const personalized = personalizeProjectOrder(pool, interestProfile);
    return personalized.slice(0, minRequired);
  }, [projects, defaultProjects, interestProfile]);

  // SEO otimizado com backoffice e keywords
  const seo = usePageSEO('home', lang)

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
      <main className="relative film-grain">
        {/* 🆕 UX PREMIUM - Loading Skeleton (DESABILITADO) */}
        {/* ⚠️ DESABILITADO: Skeleton estava causando tarja azul de loading infinito */}
        {/* Site agora carrega direto sem skeleton para melhor performance */}

        {/* Estrela de fundo - HOME: Ambos os temas (DESKTOP ONLY) */}
        <div 
          className="hidden lg:block pointer-events-none fixed top-[120px] -right-28 md:-right-40 h-[520px] w-[520px] md:h-[680px] md:w-[680px]"
          style={{ 
            zIndex: -5,
            opacity: theme === 'dark' ? 0.4 : 0.5,
            maxWidth: '100vw',
            overflow: 'hidden'
          }}
        >
          <img 
            src="/logo-azimut-star.svg" 
            alt="" 
            width={680}
            height={680}
            className="h-full w-full object-contain"
            style={{
              filter: theme === 'light' ? 'brightness(0.3) sepia(0.4)' : 'none'
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* HERO WORLD-CLASS 2026 - 85vh + Stats Cards Flutuantes */}
        {/* margin-top negativo compensa o padding do Layout */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section 
          className="relative flex flex-col lg:flex-row lg:items-start film-grain py-4 sm:py-6 md:py-8"
          style={{ 
            marginTop: '-80px', 
            paddingTop: '100px', 
            minHeight: 'auto',
            isolation: 'isolate', // Isola contexto de stacking
            transform: 'translateZ(0)', // Force GPU layer
            willChange: 'auto',
            overflowX: 'clip', // Evita scroll horizontal / linhas que vazam
            overflowY: 'visible'   // Evita scroll aninhado: só o body rola
          }}
        >
          {/* Granulação cinematográfica no hero (sem imagem de fundo para não conflitar com logo e texto) */}
          <div
            className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none"
            style={{
              zIndex: 0,
              backgroundImage: 'url(/fundo-grao.webp)',
              backgroundSize: '220px 220px',
              backgroundRepeat: 'repeat',
              mixBlendMode: theme === 'dark' ? 'screen' : 'overlay',
              opacity: theme === 'dark' ? 0.22 : 0.12,
              filter: theme === 'dark' ? 'contrast(1.3) brightness(1.2)' : 'contrast(1.2) brightness(0.98)',
            }}
            aria-hidden="true"
          />
          
          {/* ═══════════════════════════════════════════════════════════════
              GRADIENTES POR TEMA - APENAS DESKTOP (lg:)
              Usando classes CSS separadas em index.css
              ═══════════════════════════════════════════════════════════ */}
          
          {/* 🌙 TEMA ESCURO - Gradientes AZUL/PRETO */}
          <div className="hero-gradient-dark" style={{ 
            zIndex: -1,
            transform: 'translateZ(0)', // Force GPU layer
            willChange: 'auto',
            backfaceVisibility: 'hidden' // Previne flickering
          }} />
          
          {/* ☀️ TEMA CLARO - Gradiente MARROM/BEGE */}
          <div className="hero-gradient-light" style={{ 
            zIndex: -1,
            transform: 'translateZ(0)', // Force GPU layer
            willChange: 'auto',
            backfaceVisibility: 'hidden' // Previne flickering
          }} />
          
          {/* MOBILE ONLY: Fundo sólido SEM gradientes */}
          <div 
            className="lg:hidden absolute inset-0"
            style={{
              background: theme === 'dark' ? '#050814' : '#d3cec3',
              zIndex: 1
            }}
            aria-hidden="true"
          />
          
          {/* ═══════════════════════════════════════════════════════════════
              HERO REORGANIZADO: Texto | Logo (linha 1), 5 Cards (linha 2), 3 Cards (linha 3)
              ══════════════════════════════════════════════════════════════ */}
          
          {/* DESKTOP: Container único com TODAS as seções - ESPAÇAMENTO COMPACTO */}
          <div className="relative z-10 hidden lg:block px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px] w-full space-y-3" style={{
            isolation: 'isolate',
            transform: 'translateZ(0)', // Force GPU layer
            willChange: 'auto'
          }}>
            
            {/* LINHA 1: Hero - Texto + Logo Lado a Lado */}
            {/* Grid ajustado: mais espaço para texto, logo mais à esquerda */}
            <div className="grid grid-cols-[62%_38%] gap-4 items-start">
              {/* Coluna Esquerda: Conteúdo Texto */}
              <div className="space-y-4">
              {/* Badge AZIMUT - estrelinha sempre vermelha */}
              <div className="inline-flex items-center gap-2 font-sora text-[0.75rem] uppercase tracking-[0.3em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <img 
                  src="/estrela-vermelha.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 flex-shrink-0"
                />
                <span className={`font-semibold ${theme === 'light' ? 'text-azimut-red' : ''}`} style={theme === 'dark' ? { color: '#e84d5c' } : undefined}>AZIMUT</span>
                <span className="hero-badge-dot text-azimut-red" style={{ color: '#c92337' }}>•</span>
                <span className={`text-[0.7rem] ${theme === 'dark' ? 'azimut-since-year' : ''}`} style={{ color: theme === 'dark' ? undefined : '#475569' }}>SINCE 1996</span>
              </div>

                {/* Tagline: IMMERSIVE • INTERACTIVE • CINEMATIC EXPERIENCE — bolinha sempre vermelha; tema claro: texto escuro para contraste no gradiente */}
                <p
                  className="font-sora text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: '0.15s',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#1e293b'
                  }}
                >
                  IMMERSIVE <span className="text-azimut-red inline-block align-middle" style={{ color: '#c92337', fontSize: '0.85rem' }}>•</span> INTERACTIVE <span className="text-azimut-red inline-block align-middle" style={{ color: '#c92337', fontSize: '0.85rem' }}>•</span> CINEMATIC EXPERIENCE
                </p>
                
                {/* Título em 3 LINHAS - MULTILÍNGUE */}
                {/* ESCURO: branco | CLARO: escuro elegante */}
                <h1 className="font-handel uppercase animate-fade-in-up opacity-0 hero-title" style={{ 
                  fontSize: 'clamp(3rem, 5.5vw, 5.8rem)',
                  lineHeight: '1.15',
                  letterSpacing: '0.08em',
                  animationDelay: '0.2s',
                  color: theme === 'dark' ? '#ffffff' : '#0f172a'
                }}>
                  {(() => {
                    const words = heroSlogan.split(' ');
                    const lastWord = words.pop();
                    return (
                      <>
                        {lang === 'pt' && (
                          <>
                            EXPERIÊNCIAS<br />
                            QUE CONECTAM<br />
                            <span className="text-azimut-red">MUNDOS</span>
                          </>
                        )}
                        {lang === 'en' && (
                          <>
                            EXPERIENCES<br />
                            THAT CONNECT<br />
                            <span className="text-azimut-red">WORLDS</span>
                          </>
                        )}
                        {lang === 'fr' && (
                          <>
                            EXPÉRIENCES<br />
                            QUI CONNECTENT<br />
                            <span className="text-azimut-red">LES MONDES</span>
                          </>
                        )}
                        {lang === 'es' && (
                          <>
                            EXPERIENCIAS<br />
                            QUE CONECTAN<br />
                            <span className="text-azimut-red">MUNDOS</span>
                          </>
                        )}
                      </>
                    );
                  })()}
                </h1>
                  
                {/* Subtítulo COMPACTO - margem para não sobrepor título nem os cards; tema claro: texto escuro para contraste no gradiente */}
                <p className="max-w-xl text-[0.95rem] leading-relaxed animate-fade-in-up opacity-0 hero-subtitle mt-5 mb-2" style={{ 
                  animationDelay: '0.3s',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#1e293b'
                }}>
                  {heroSubtitle.split('.')[0]}.
                </p>
                
              </div>
              
              {/* Coluna Direita: Logo 3D Animada (movida para esquerda) */}
              <div className="flex justify-start" style={{ 
                alignItems: 'flex-start', 
                zIndex: 10, 
                position: 'relative', 
                marginLeft: '-140px', 
                isolation: 'isolate',
                transform: 'translateZ(0)', // Force GPU layer
                willChange: 'transform'
              }}>
                <div className="w-full max-w-[600px] aspect-square -mt-28" style={{ 
                  zIndex: 10, 
                  position: 'relative', 
                  isolation: 'isolate',
                  transform: 'translateZ(0)', // Force GPU layer
                  willChange: 'transform',
                  contain: 'layout style paint', // Otimização de renderização
                  overflow: 'hidden', // Impede linhas de vazar
                  borderRadius: '50%', // Clip circular para conter animação
                  clipPath: 'circle(50% at 50% 50%)' // Garante corte circular
                }}>
                  <AnimatedLogo />
                </div>
              </div>
            </div>
            
            {/* LINHA 2: 5 Cards Horizontais - espaço para não sobrepor o subtítulo do hero */}
            <div className="grid grid-cols-5 gap-4 mt-2" style={{ position: 'relative', zIndex: 20 }}>
              {/* Cinema & AV */}
              <div className={`glass-panel backdrop-blur-xl rounded-xl transition-all duration-300 group flex flex-row items-center gap-2 p-3 hover:scale-[1.02]`} style={{ 
                background: theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.85)' 
                  : 'rgba(255, 255, 255, 0.6)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.3)' 
                  : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)'
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                }
              }}>
                <span className="block text-3xl flex-shrink-0">🎬</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#0f172a]'}`}>
                    {lang === 'pt' ? 'Cinema & AV' : lang === 'es' ? 'Cine & AV' : lang === 'fr' ? 'Cinéma & AV' : 'Cinema & AV'}
                  </span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-[#334155]'}`}>
                    {lang === 'pt' ? 'Audiovisual' : lang === 'es' ? 'Audiovisual' : lang === 'fr' ? 'Audiovisuel' : 'Audiovisual'}
                  </span>
                </div>
              </div>

              {/* XR/VR/AR */}
              <div className={`glass-panel backdrop-blur-xl rounded-xl transition-all duration-300 group flex flex-row items-center gap-2 p-3 hover:scale-[1.02]`} style={{ 
                background: theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.85)' 
                  : 'rgba(255, 255, 255, 0.6)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.3)' 
                  : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)'
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                }
              }}>
                <span className="block text-3xl flex-shrink-0">🥽</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#0f172a]'}`}>XR/VR/AR</span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-[#334155]'}`}>
                    {lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive'}
                  </span>
                </div>
              </div>

              {/* Exposições & Museus */}
              <div className={`glass-panel backdrop-blur-xl rounded-xl transition-all duration-300 group flex flex-row items-center gap-2 p-3 hover:scale-[1.02]`} style={{ 
                background: theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.85)' 
                  : 'rgba(255, 255, 255, 0.6)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.3)' 
                  : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)'
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                }
              }}>
                <span className="block text-3xl flex-shrink-0">🏛️</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#0f172a]'}`}>
                    {lang === 'pt' ? 'Exposições' : lang === 'es' ? 'Exposiciones' : lang === 'fr' ? 'Expositions' : 'Exhibitions'}
                  </span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-[#334155]'}`}>
                    {lang === 'pt' ? '& Museus' : lang === 'es' ? '& Museos' : lang === 'fr' ? '& Musées' : '& Museums'}
                  </span>
                </div>
              </div>

              {/* IA & Tech */}
              <div className={`glass-panel backdrop-blur-xl rounded-xl transition-all duration-300 group flex flex-row items-center gap-2 p-3 hover:scale-[1.02]`} style={{ 
                background: theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.85)' 
                  : 'rgba(255, 255, 255, 0.6)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.3)' 
                  : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)'
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                }
              }}>
                <span className="block text-3xl flex-shrink-0">🧠</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#0f172a]'}`}>IA & Tech</span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-[#334155]'}`}>
                    {lang === 'pt' ? 'Interativo' : lang === 'es' ? 'Interactivo' : lang === 'fr' ? 'Interactif' : 'Interactive'}
                  </span>
                </div>
              </div>

              {/* Educação */}
              <div className={`glass-panel backdrop-blur-xl rounded-xl transition-all duration-300 group flex flex-row items-center gap-2 p-3 hover:scale-[1.02]`} style={{ 
                background: theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.85)' 
                  : 'rgba(255, 255, 255, 0.6)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.3)' 
                  : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (theme === 'light') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)'
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                }
              }}>
                <span className="block text-3xl flex-shrink-0">🎓</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#0f172a]'}`}>
                    {lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education'}
                  </span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-[#334155]'}`}>
                    {lang === 'pt' ? 'Academia' : lang === 'es' ? 'Academia' : lang === 'fr' ? 'Académie' : 'Academy'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* LINHA 3: 3 Cards de Credibilidade VERMELHOS */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {/* Rio Museu Olímpico */}
              <div className="p-4 rounded-lg group transition-all duration-300 hover:scale-[1.02]" style={{
                background: theme === 'dark' 
                  ? 'rgba(201, 35, 55, 0.15)' 
                  : 'linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.5)' 
                  : '1px solid rgba(201, 35, 55, 0.4)',
                backdropFilter: 'blur(16px)',
                boxShadow: theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? '#c92337' : 'rgba(201, 35, 55, 0.6)'
                e.currentTarget.style.boxShadow = theme === 'light' ? '0 6px 20px rgba(201, 35, 55, 0.3)' : '0 4px 12px rgba(201, 35, 55, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.5)' : 'rgba(201, 35, 55, 0.4)'
                e.currentTarget.style.boxShadow = theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
              }}>
                <span className="block text-sm font-semibold break-words transition-colors duration-300" style={{ 
                  color: theme === 'dark' ? '#ffffff' : '#d3cec3' 
                }}>Rio Museum</span>
                <span className="block text-[0.55rem] uppercase tracking-wider mt-1 leading-tight" style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(211, 206, 195, 0.8)' 
                }}>
                  {lang === 'pt' ? 'Direção Geral · Tecnologia · Arte Audiovisual' : lang === 'es' ? 'Dirección General · Tecnología · Arte Audiovisual' : lang === 'fr' ? 'Direction Générale · Technologie · Art Audiovisuel' : 'General Direction · Technology · Audiovisual Art'}
                </span>
              </div>

              {/* Gramado VR */}
              <div className="p-4 rounded-lg group transition-all duration-300 hover:scale-[1.02]" style={{
                background: theme === 'dark' 
                  ? 'rgba(201, 35, 55, 0.15)' 
                  : 'linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.5)' 
                  : '1px solid rgba(201, 35, 55, 0.4)',
                backdropFilter: 'blur(16px)',
                boxShadow: theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? '#c92337' : 'rgba(201, 35, 55, 0.6)'
                e.currentTarget.style.boxShadow = theme === 'light' ? '0 6px 20px rgba(201, 35, 55, 0.3)' : '0 4px 12px rgba(201, 35, 55, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.5)' : 'rgba(201, 35, 55, 0.4)'
                e.currentTarget.style.boxShadow = theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
              }}>
                <span className="block text-sm font-semibold break-words transition-colors duration-300" style={{ 
                  color: theme === 'dark' ? '#ffffff' : '#d3cec3' 
                }}>
                  {lang === 'pt' ? 'Festival de Gramado' : lang === 'es' ? 'Festival de Gramado' : lang === 'fr' ? 'Festival de Gramado' : 'Gramado Festival'}
                </span>
                <span className="block text-[0.55rem] uppercase tracking-wider mt-1" style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(211, 206, 195, 0.8)' 
                }}>
                  {lang === 'pt' ? 'VR desde 2017' : lang === 'es' ? 'VR desde 2017' : lang === 'fr' ? 'VR depuis 2017' : 'VR since 2017'}
                </span>
              </div>

              {/* BR ↔ CA */}
              <div className="p-4 rounded-lg group transition-all duration-300 hover:scale-[1.02]" style={{
                background: theme === 'dark' 
                  ? 'rgba(201, 35, 55, 0.15)' 
                  : 'linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%)',
                border: theme === 'dark' 
                  ? '1px solid rgba(201, 35, 55, 0.5)' 
                  : '1px solid rgba(201, 35, 55, 0.4)',
                backdropFilter: 'blur(16px)',
                boxShadow: theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? '#c92337' : 'rgba(201, 35, 55, 0.6)'
                e.currentTarget.style.boxShadow = theme === 'light' ? '0 6px 20px rgba(201, 35, 55, 0.3)' : '0 4px 12px rgba(201, 35, 55, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.5)' : 'rgba(201, 35, 55, 0.4)'
                e.currentTarget.style.boxShadow = theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
              }}>
                <span className="block text-sm font-semibold break-words transition-colors duration-300" style={{ 
                  color: theme === 'dark' ? '#ffffff' : '#d3cec3' 
                }}>Brasil ↔ Canadá</span>
                <span className="block text-[0.55rem] uppercase tracking-wider mt-1" style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(211, 206, 195, 0.8)' 
                }}>
                  {lang === 'pt' ? 'Binacional' : lang === 'es' ? 'Binacional' : lang === 'fr' ? 'Binational' : 'Binational'}
                </span>
              </div>
            </div>
            
          </div>
          
          {/* ═══════════════════════════════════════════════════════════════════
              MOBILE: ORDEM CORRETA - Badge → Título → Subtítulo → VÍDEO → Cards
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:hidden flex flex-col">
            
            {/* 1️⃣ BADGE + TÍTULO + SUBTÍTULO - PRIMEIRO */}
            <div className="relative z-20 flex flex-col justify-start w-full px-4 sm:px-6 mx-auto max-w-full overflow-x-hidden" style={{ marginTop: '-80px', paddingTop: '80px' }}>
              <div className="relative z-20 w-full text-left space-y-3 px-0">
                
                {/* Badge AZIMUT - NO TOPO - estrelinha sempre vermelha */}
                <div className="inline-flex items-center gap-1.5 font-sora text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.05s' }}>
                  <img 
                    src="/estrela-vermelha.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                  />
                  <span className={`font-semibold ${theme === 'light' ? 'text-azimut-red' : ''}`} style={theme === 'dark' ? { color: '#e84d5c' } : undefined}>AZIMUT</span>
                  <span className="hero-badge-dot text-azimut-red" style={{ color: '#c92337' }}>•</span>
                  <span className={`text-[0.55rem] sm:text-[0.6rem] ${theme === 'dark' ? 'text-white/85' : 'text-slate-600'}`}>SINCE 1996</span>
                </div>

                {/* Tagline (Opção B - entre badge e H1); bolinha sempre vermelha; tema claro: texto escuro para contraste no gradiente */}
                <p
                  className={`font-sora text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] animate-fade-in-up opacity-0 ${theme === 'dark' ? 'text-white/60' : ''}`}
                  style={{ animationDelay: '0.08s', color: theme === 'dark' ? undefined : '#1e293b' }}
                >
                  IMMERSIVE <span className="text-azimut-red inline-block align-middle" style={{ color: '#c92337', fontSize: '0.7rem' }}>•</span> INTERACTIVE <span className="text-azimut-red inline-block align-middle" style={{ color: '#c92337', fontSize: '0.7rem' }}>•</span> CINEMATIC EXPERIENCE
                </p>
                
                {/* Título - COMPACTO */}
                <h1 className={`font-handel uppercase animate-fade-in-up opacity-0 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`} style={{ 
                  fontSize: 'clamp(1.5rem, 5.5vw, 2.8rem)',
                  lineHeight: '1.15',
                  letterSpacing: '0.08em',
                  animationDelay: '0.1s',
                  wordBreak: 'break-word',
                  maxWidth: '100%'
                }}>
                  {(() => {
                    if (lang === 'pt') {
                      return (
                        <>
                          EXPERIÊNCIAS<br />
                          QUE CONECTAM<br />
                          <span className="text-azimut-red">MUNDOS</span>
                        </>
                      )
                    }
                    if (lang === 'en') {
                      return (
                        <>
                          EXPERIENCES<br />
                          THAT CONNECT<br />
                          <span className="text-azimut-red">WORLDS</span>
                        </>
                      )
                    }
                    if (lang === 'fr') {
                      return (
                        <>
                          EXPÉRIENCES<br />
                          QUI CONNECTENT<br />
                          <span className="text-azimut-red">LES MONDES</span>
                        </>
                      )
                    }
                    if (lang === 'es') {
                      return (
                        <>
                          EXPERIENCIAS<br />
                          QUE CONECTAN<br />
                          <span className="text-azimut-red">MUNDOS</span>
                        </>
                      )
                    }
                    return heroSlogan
                  })()}
                </h1>
                
                {/* Subtítulo - margem para não sobrepor o título; tema claro: texto escuro para contraste no gradiente */}
                <p className={`text-[0.75rem] sm:text-[0.85rem] leading-relaxed animate-fade-in-up opacity-0 mt-3 ${theme === 'dark' ? 'text-white/90' : ''}`} style={{ animationDelay: '0.15s', color: theme === 'dark' ? undefined : '#1e293b' }}>
                  {heroSubtitle.split('.')[0]}.
                </p>
                
              </div>
            </div>
            
            {/* 2️⃣ VÍDEO ANIMADO - SEGUNDO (APÓS badge/título/subtítulo) */}
            <div 
              className="relative mt-8" 
              style={{ 
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
                zIndex: 10,
                order: 2
              }}
            >
            {/* Borda superior vermelha SÓLIDA */}
            <div className="h-[3px] w-full bg-azimut-red" style={{ boxShadow: '0 0 8px rgba(201, 35, 55, 0.5)' }} />
            
            {/* Container com fundo escuro - Altura 250px */}
            <div 
              className="relative"
              style={{
                background: theme === 'dark'
                  ? '#0a0e18' // Azul escuro sólido
                  : '#2a2825', // Marrom escuro sólido
                height: '232px', // ✅ Altura REDUZIDA (240px → 232px)
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden'
              }}
            >
              {/* Logo Animada - object-contain para não cropar */}
              <div className="relative w-full h-full" style={{
                overflow: 'hidden',
                clipPath: 'inset(0)' // Garante que nada vaze
              }}>
                <AnimatedLogo />
              </div>
            </div>
            
            {/* Borda inferior vermelha SÓLIDA */}
            <div className="h-[3px] w-full bg-azimut-red" style={{ boxShadow: '0 0 8px rgba(201, 35, 55, 0.5)' }} />
            
            </div>
            
            {/* 3️⃣ CARDS - TERCEIRO (APÓS vídeo) - GRID 2x2 */}
            <div className="relative z-10 flex flex-col justify-start w-full px-4 sm:px-6 mx-auto max-w-full overflow-x-hidden mt-6" style={{ order: 4 }}>
              
              {/* Grid 2x2 para os 4 cards */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {/* Cinema & AV */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${theme === 'dark' ? 'bg-black/60' : ''}`} style={theme === 'light' ? { background: 'rgba(245, 241, 232, 0.92)' } : undefined}>
                  <span className="text-lg">🎬</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>Cinema & AV</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/75' : 'text-[#334155]'}`}>AUDIOVISUAL</span>
                  </div>
                </div>
                
                {/* XR/VR/AR */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${theme === 'dark' ? 'bg-black/60' : ''}`} style={theme === 'light' ? { background: 'rgba(245, 241, 232, 0.92)' } : undefined}>
                  <span className="text-lg">🥽</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>XR/VR/AR</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/75' : 'text-[#334155]'}`}>IMERSIVO</span>
                  </div>
                </div>
                
                {/* Exposições */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${theme === 'dark' ? 'bg-black/60' : ''}`} style={theme === 'light' ? { background: 'rgba(245, 241, 232, 0.92)' } : undefined}>
                  <span className="text-lg">🏛️</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>Exposições</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/75' : 'text-[#334155]'}`}>& MUSEUS</span>
                  </div>
                </div>
                
                {/* Educação */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${theme === 'dark' ? 'bg-black/60' : ''}`} style={theme === 'light' ? { background: 'rgba(245, 241, 232, 0.92)' } : undefined}>
                  <span className="text-lg">🎓</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>Educação</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/75' : 'text-[#334155]'}`}>ACADEMIA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            DEMOREEL FULLSCREEN - Vídeo Institucional HERO
            Inspiração: Apple, Tesla, Sites Premium 2026
            ══════════════════════════════════════════════════════════════ */}
        
        {/* Título da Seção - ACIMA do vídeo */}
        <div className={`relative py-12 md:py-16 ${
          theme === 'dark' ? 'home-assista-dark' : 'home-assista-light'
        }`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`font-handel text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.15em] font-bold mb-5 animate-fade-in-up ${theme === 'dark' ? 'text-white/90' : 'text-[#1e1a16]/90'}`}>
              {lang === 'pt' ? 'Assista Nossos Trabalhos' : lang === 'es' ? 'Ve Nuestros Trabajos' : lang === 'fr' ? 'Regardez Nos Travaux' : 'Watch Our Work'}
            </h2>
            {/* Linha vermelha acompanha largura do texto */}
            <div className="h-[3px] mx-auto" style={{
              background: 'linear-gradient(90deg, transparent 0%, #c92337 5%, #c92337 95%, transparent 100%)',
              width: lang === 'pt' ? '620px' : lang === 'fr' ? '560px' : lang === 'es' ? '550px' : '460px'
            }} />
          </div>
        </div>

        {/* Linha vermelha ACIMA do vídeo - Full width */}
        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-azimut-red to-transparent" />

        {/* Vídeo Fullscreen - Total largura lateral (de fora a fora) */}
        <section ref={demoreelRef} className="relative h-screen w-full overflow-hidden">
          {(() => {
            // Buscar demoreel configurado no backoffice (home > Demoreel Watch Our Work)
            const demoreelVideoBackoffice = cmsContent?.page?.demoreelVideo
            const featured = recommended[0] || defaultProjects[0]
            const fallbackVideo = featured?.heroImage?.type === 'VIDEO' ? featured.heroImage.original : null
            
            // ORDEM DE PRIORIDADE: 1) Backoffice 2) Projeto destaque 3) MP4 local.
            // Evita "vídeo não suportado" quando vier URL de YouTube em formato watch.
            const preferredVideoUrl = demoreelVideoBackoffice || fallbackVideo || '/demo-azimut.mp4'
            const videoUrl = typeof preferredVideoUrl === 'string' && preferredVideoUrl.includes('youtube.com/watch')
              ? '/demo-azimut.mp4'
              : preferredVideoUrl
            const thumbnailUrl =
              cmsContent?.page?.demoreelThumbnailUrl ||
              featured?.heroImage?.thumbnail ||
              undefined
            
            return (
              <>
                {/* Vídeo Fullscreen - AUTOPLAY no scroll */}
                <div className="absolute inset-0 w-full h-full">
                  <VideoPlayer
                    videoUrl={videoUrl}
                    thumbnailUrl={thumbnailUrl}
                    alt={lang === 'pt' ? 'Demoreel Azimut' : lang === 'es' ? 'Demoreel Azimut' : lang === 'fr' ? 'Démoreel Azimut' : 'Azimut Demoreel'}
                    className="w-full h-full object-cover"
                    autoplay={isDemoreelVisible}
                    muted={true}
                    loop={true}
                    playsinline={true}
                  />
                </div>
                
                {/* Overlay escuro sutil */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                  <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="font-sora text-[0.65rem] uppercase tracking-[0.2em]">
                      {lang === 'pt' ? 'Rolar' : lang === 'es' ? 'Desplazar' : lang === 'fr' ? 'Défiler' : 'Scroll'}
                    </span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </>
            )
          })()}
        </section>

        {/* Linha vermelha ABAIXO do vídeo - Full width */}
        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-azimut-red to-transparent" />

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* 🚀 CURADORIA IMERSIVA - Banner Web3 Único com 2 CTAs */}
        {/* Após vídeo = momento de maior engajamento do usuário */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="relative py-10 md:py-14 overflow-hidden">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
            {/* Wrapper com borda gradiente (usando padding + background) */}
            <div 
              className="relative rounded-2xl p-[2px] transition-all duration-300 overflow-hidden"
              style={{
                // Borda gradiente via background do wrapper
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.7) 0%, rgba(59, 130, 246, 0.5) 25%, rgba(34, 197, 94, 0.5) 50%, rgba(236, 72, 153, 0.5) 75%, rgba(139, 92, 246, 0.7) 100%)'
                  : 'linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(201, 35, 55, 0.4) 25%, rgba(59, 130, 246, 0.45) 50%, rgba(34, 197, 94, 0.4) 75%, rgba(139, 92, 246, 0.5) 100%)',
                boxShadow: theme === 'dark'
                  ? '0 8px 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)'
                  : '0 8px 32px rgba(139, 92, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.1)',
              }}
            >
            {/* Card interno com fundo sólido */}
            <div 
              className="relative overflow-hidden rounded-[14px] p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-300"
              style={{
                // TEMA ESCURO: Gradiente roxo/tech premium
                // TEMA CLARO: Glassmorphism elegante
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, rgba(15, 12, 41, 0.95) 0%, rgba(25, 22, 55, 0.92) 30%, rgba(20, 28, 50, 0.9) 60%, rgba(15, 25, 35, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(252, 250, 255, 0.8) 50%, rgba(250, 252, 255, 0.85) 100%)',
                backdropFilter: theme === 'light' ? 'blur(16px) saturate(180%)' : 'none',
                WebkitBackdropFilter: theme === 'light' ? 'blur(16px) saturate(180%)' : 'none',
              }}
            >
              {/* Efeitos de brilho animados nos cantos */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-25"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, transparent 70%)',
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              />
              <div 
                className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-25"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, transparent 70%)',
                  animation: 'pulse 3s ease-in-out infinite',
                  animationDelay: '1.5s',
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite',
                  animationDelay: '0.75s',
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
                {/* Conteúdo Principal - Esquerda */}
                <div className="flex-1 text-center lg:text-left w-full overflow-hidden">
                  {/* Título com ícone */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-3">
                    <span className="text-3xl sm:text-4xl md:text-5xl">🎁</span>
                    <h3 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-handel uppercase tracking-wide"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 30%, #22c55e 60%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {lang === 'pt' ? 'Curadoria Imersiva' : lang === 'es' ? 'Curaduría Inmersiva' : lang === 'fr' ? 'Curation Immersive' : 'Immersive Curation'}
                    </h3>
                    {/* Logo Web3 colorida em destaque */}
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
                        border: '2px solid rgba(139, 92, 246, 0.5)',
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
                      }}
                    >
                      <img
                        src="/web-3-icon.svg"
                        alt="Web3"
                        width={40}
                        height={40}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
                      />
                    </div>
                  </div>
                  
                  {/* Subtítulo com tecnologias - responsivo */}
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 tracking-wide"
                    style={{ 
                      color: theme === 'dark' ? 'rgba(167, 139, 250, 1)' : '#7c3aed' // Roxo
                    }}
                  >
                    {lang === 'pt' ? 'VR • AR • Web3 • Colecionáveis (NFTs)' 
                      : lang === 'es' ? 'VR • AR • Web3 • Coleccionables (NFTs)'
                      : lang === 'fr' ? 'VR • AR • Web3 • Collectibles (NFTs)'
                      : 'VR • AR • Web3 • Collectibles (NFTs)'}
                  </p>
                  
                  {/* Frase empática impactante - tom parceiro */}
                  <p 
                    className="text-base sm:text-lg md:text-xl font-semibold mb-3"
                    style={{ 
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : '#1e293b'
                    }}
                  >
                    {lang === 'pt' ? 'Tem um projeto? A gente desenha e produz com você.' 
                      : lang === 'es' ? '¿Tienes un proyecto? Lo diseñamos y producimos contigo.'
                      : lang === 'fr' ? 'Vous avez un projet? On le conçoit et produit avec vous.'
                      : 'Have a project? Let\'s build it together.'}
                  </p>
                  
                  {/* Descrição premium com benefícios claros */}
                  <p 
                    className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-3"
                    style={{ 
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#475569'
                    }}
                  >
                    {lang === 'pt' 
                      ? 'De campanhas e estandes a projetos culturais e educação: criamos experiências imersivas que param o público, aumentam tempo de permanência e viram conversa — com tecnologia + storytelling, do conceito à entrega.'
                      : lang === 'es'
                      ? 'De campañas y stands a proyectos culturales y educación: creamos experiencias inmersivas que detienen al público, aumentan el tiempo de permanencia y generan conversación — con tecnología + storytelling, del concepto a la entrega.'
                      : lang === 'fr'
                      ? 'Des campagnes et stands aux projets culturels et éducatifs: nous créons des expériences immersives qui captent le public, augmentent le temps de présence et créent la conversation — technologie + storytelling, du concept à la livraison.'
                      : 'From campaigns and expo booths to cultural and educational projects, we craft immersive experiences that stop people in their tracks, increase dwell time, and spark real engagement—where technology meets storytelling, from concept to delivery.'}
                  </p>
                  
                  {/* Linha de prova/credibilidade */}
                  <p 
                    className="text-[0.65rem] sm:text-xs md:text-sm font-medium inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full"
                    style={{ 
                      background: theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(201, 35, 55, 0.1)',
                      color: theme === 'dark' ? 'rgba(196, 181, 253, 1)' : '#c92337',
                      border: theme === 'dark' ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(201, 35, 55, 0.3)',
                    }}
                  >
                    <span>🎯</span>
                    <span>
                      {lang === 'pt' ? 'Museus, festivais e ativações de marca' 
                        : lang === 'es' ? 'Museos, festivales y activaciones de marca'
                        : lang === 'fr' ? 'Musées, festivals et activations de marque'
                        : 'Museums, festivals & brand activations'}
                    </span>
                  </p>
                </div>

                {/* CTAs - Direita - Empilhados (todas as pílulas com mesma largura) */}
                <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:min-w-[320px] lg:max-w-[380px]">
                  {/* CTA Destaque - Jogar EMPATHY ENGINE */}
                  <Link
                    to={`/${lang}/game`}
                    className="group/play inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] w-full flex-wrap"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)'
                        : 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                      color: '#fff',
                      boxShadow: '0 6px 28px rgba(16, 185, 129, 0.45)',
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em',
                      textDecoration: 'none',
                    }}
                  >
                    <span className="text-xl sm:text-2xl" aria-hidden>🎮</span>
                    <span className="uppercase tracking-wide whitespace-nowrap">
                      {lang === 'pt' ? 'Jogar' : lang === 'es' ? 'Jugar' : lang === 'fr' ? 'Jouer' : 'Play'}
                    </span>
                    <img
                      src="/empaty-engine.webp"
                      alt="Empathy Engine"
                      width={180}
                      height={43}
                      className="h-5 sm:h-6 md:h-7 w-auto object-contain flex-shrink-0"
                      style={{ maxWidth: 180 }}
                    />
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/play:translate-x-1 flex-shrink-0 ml-auto sm:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <p className="text-[0.7rem] sm:text-xs text-center mt-1.5 opacity-90" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.75)' : '#64748b' }}>
                    {t(lang, 'gameObjectives')}{' '}
                    <LangLink to={`/${lang}/game`} className="font-semibold underline hover:no-underline" style={{ color: theme === 'dark' ? '#34d399' : '#059669' }}>
                      {t(lang, 'gamePlayCta')} →
                    </LangLink>
                  </p>

                  {/* CTA Secundário - Experimentar Demo Web3 */}
                  <div className="flex flex-col items-stretch w-full gap-2">
                    <Link
                      to={`/${lang}/experience-preview`}
                      className="group/btn inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:gap-4 w-full"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #22c55e 100%)',
                        color: '#fff',
                        boxShadow: '0 6px 30px rgba(139, 92, 246, 0.5)',
                        fontSize: '0.9rem',
                        letterSpacing: '0.02em',
                        textDecoration: 'none',
                      }}
                    >
                      <span className="min-[320px]:whitespace-nowrap text-center">
                        {t(lang, 'ctaTryDemo')}
                      </span>
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '2px solid rgba(255, 255, 255, 1)',
                          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)'
                        }}
                      >
                        <img
                          src="/web-3-icon.svg"
                          alt="Web3"
                          width={28}
                          height={28}
                          className="w-5 h-5 sm:w-7 sm:h-7"
                        />
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                      {/* Microcopy de segurança Web3 - COM DESTAQUE */}
                    <div 
                      className="mt-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center w-full"
                      style={{ 
                        background: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
                        border: theme === 'dark' ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(34, 197, 94, 0.4)',
                      }}
                    >
                      <p 
                        className="text-[0.65rem] sm:text-xs font-medium flex items-center justify-center gap-1.5 sm:gap-2"
                        style={{ 
                          color: theme === 'dark' ? '#4ade80' : '#16a34a'
                        }}
                      >
                        <span>🔒</span>
                        <span className="text-center">
                          {t(lang, 'web3ReadOnly')}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA Secundário - Ver Cases Imersivos (específico para VR/AR/Web3) */}
                  <Link
                    to={`/${lang}/work?filter=immersive`}
                    className="group/btn2 inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 w-full"
                    style={{
                      background: 'linear-gradient(135deg, #c92337 0%, #a01d2d 100%)',
                      color: '#fff',
                      boxShadow: '0 4px 20px rgba(201, 35, 55, 0.4)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.02em',
                      textDecoration: 'none',
                    }}
                  >
                    <span className="min-[320px]:whitespace-nowrap text-center">
                      {t(lang, 'ctaSeeImmersiveCases')}
                    </span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn2:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  {/* Link terciário - Específico para soluções VR/AR/Web3 */}
                  <Link
                    to={`/${lang}/what#immersive`}
                    className="group/btn3 inline-flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3 mt-1 w-full"
                    style={{
                      color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : '#7c3aed',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      fontWeight: '600',
                    }}
                  >
                    <span style={{ borderBottom: '1px solid currentColor' }}>
                      {lang === 'pt' ? 'Serviços VR / AR / Web3' : lang === 'es' ? 'Soluciones VR / AR / Web3' : lang === 'fr' ? 'Solutions VR / AR / Web3' : 'VR / AR / Web3 Solutions'}
                    </span>
                    <svg className="w-4 h-4 transition-transform group-hover/btn3:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            </div> {/* Fecha wrapper da borda gradiente */}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CREDIBILIDADE VISUAL - Timeline + Logos Placeholder
            Inspiração: Sites Premium 2026 (Inversa/Cartier/Omega)
            ══════════════════════════════════════════════════════════════ */}
        <section className="py-8 md:py-10 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className={`font-sora text-xs uppercase tracking-[0.24em] mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {lang === 'pt' ? 'TECNOLOGIA CRIATIVA' : lang === 'es' ? 'TECNOLOGÍA CREATIVA' : lang === 'fr' ? 'TECHNOLOGIE CRÉATIVE' : 'CREATIVE TECHNOLOGY'}
              </h3>
              <p className="text-sm md:text-base max-w-3xl mx-auto leading-[1.7]" style={{ color: 'var(--theme-text-secondary)' }}>
                {lang === 'pt' 
                  ? 'Criamos experiências sensoriais e narrativas para espaços culturais, marcas e eventos. Da curadoria em festivais à direção técnica de instituições, navegamos entre narrativa, tecnologia e formação — formatos que unem precisão e poética. Os blocos abaixo resumem escopo, locais e especialidades.' 
                  : lang === 'es' 
                  ? 'Creamos experiencias sensoriales y narrativas para espacios culturales, marcas y eventos. De la curaduría en festivales a la dirección técnica de instituciones, navegamos entre narrativa, tecnología y formación — formatos que unen precisión y poética. Los bloques abajo presentan ámbito, ubicaciones y especialidades.'
                  : lang === 'fr'
                  ? 'Nous créons des expériences sensorielles et narratives pour espaces culturels, marques et événements. De la curation en festivals à la direction technique d\'institutions, nous naviguons entre récit, technologie et formation — formats précis et poétiques. Les blocs ci‑dessous résument périmètre, lieux et spécialités.'
                  : 'We create sensory, narrative-driven experiences for cultural spaces, brands and events. From festival curation to institutional technical direction, we work across narrative, technology and training — formats that unite precision and poetry. The blocks below outline scope, locations and expertise.'}
              </p>
            </div>
            
            {/* Grid de Soluções COMPLETO - Alinhado com pills abaixo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-6">
              {/* Integração Audiovisual */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">📽️</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Cinema & AV' : lang === 'es' ? 'Cine & AV' : lang === 'fr' ? 'Cinéma & AV' : 'Cinema & AV'}
                  </div>
                </div>
              </div>
              
              {/* VR/XR */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🥽</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🌐</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'VR/XR' : 'VR/XR'}
                  </div>
                </div>
              </div>
              
              {/* IA */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🤖</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🧠</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'IA Criativa' : lang === 'es' ? 'IA Creativa' : lang === 'fr' ? 'IA Créative' : 'Creative AI'}
                  </div>
                </div>
              </div>
              
              {/* Motion Design */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎨</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">✨</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Motion Design' : 'Motion Design'}
                  </div>
                </div>
              </div>
              
              {/* Curadoria & Consultoria - GRAMADO VR desde 2017 */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎭</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Curadoria & Consultoria' : lang === 'es' ? 'Curaduría & Consultoría' : lang === 'fr' ? 'Curation & Conseil' : 'Curation & Consulting'}
                  </div>
                </div>
              </div>
              
              {/* Festivais - Gramado, FAM, Rio2C */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎪</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎫</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Festivais' : lang === 'es' ? 'Festivales' : lang === 'fr' ? 'Festivals' : 'Festivals'}
                  </div>
                </div>
              </div>
              
              {/* Academia & Pesquisa */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">📚</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔬</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Pesquisa' : lang === 'es' ? 'Investigación' : lang === 'fr' ? 'Recherche' : 'Research'}
                  </div>
                </div>
              </div>
              
              {/* Treinamentos - Centenas formados */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎓</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👨‍🏫</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Treinamentos' : lang === 'es' ? 'Formación' : lang === 'fr' ? 'Formation' : 'Training'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pills Expertise - Grid 4x2 com links para páginas relevantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full overflow-visible">
              {/* Filmes 360° & VR → Soluções Cinema */}
              <Link to={`/${lang}/what/cinema-audiovisual`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🎬</span>{lang === 'pt' ? 'Filmes 360° & VR' : lang === 'es' ? 'Películas 360° & VR' : lang === 'fr' ? 'Films 360° & VR' : '360° Films & VR'}
              </Link>
              {/* Exposições Imersivas → Soluções Museus */}
              <Link to={`/${lang}/what/museus-exposicoes`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🏛️</span>{lang === 'pt' ? 'Exposições Imersivas' : lang === 'es' ? 'Exposiciones Inmersivas' : lang === 'fr' ? 'Expositions Immersives' : 'Immersive Exhibitions'}
              </Link>
              {/* Curadoria Gramado → Credenciais */}
              <Link to={`/${lang}/studio/credibilidade`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🎯</span>{lang === 'pt' ? 'Curadoria Gramado VR & IA' : lang === 'es' ? 'Curaduría Gramado VR & IA' : lang === 'fr' ? 'Curation Gramado VR & IA' : 'Gramado VR & AI Curation'}
              </Link>
              {/* Edu Agent VFS & VanArts → Academy Vancouver */}
              <Link to={`/${lang}/academy/vancouver`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🎓</span>{lang === 'pt' ? 'Edu Agent VFS & VanArts' : lang === 'es' ? 'Agente Edu VFS & VanArts' : lang === 'fr' ? 'Agent Édu VFS & VanArts' : 'Edu Agent VFS & VanArts'}
              </Link>
              {/* Brasil ↔ Canadá → Vancouver */}
              <Link to={`/${lang}/academy/vancouver`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🌐</span>{lang === 'pt' ? 'Brasil ↔ Canadá' : lang === 'es' ? 'Brasil ↔ Canadá' : lang === 'fr' ? 'Brésil ↔ Canada' : 'Brazil ↔ Canada'}
              </Link>
              {/* IA Generativa → Soluções IA */}
              <Link to={`/${lang}/what/ia-criativa`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🔬</span>{lang === 'pt' ? 'IA Generativa' : lang === 'es' ? 'IA Generativa' : lang === 'fr' ? 'IA Générative' : 'Generative AI'}
              </Link>
              {/* Autodesk → Credenciais */}
              <Link to={`/${lang}/studio/credibilidade`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">⚡</span>Autodesk (1996-2018)
              </Link>
              {/* Montagem Museu Olímpico → Projeto específico */}
              <Link to={`/${lang}/work/museu-olimpico-rio`} className="credential-pill rounded-xl px-5 py-3 font-sora text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.08em] transition-all duration-300 text-center cursor-pointer no-underline">
                <span className="mr-2">🏆</span>{lang === 'pt' ? 'Montagem Museu Olímpico' : lang === 'es' ? 'Montaje Museo Olímpico' : lang === 'fr' ? 'Montage Musée Olympique' : 'Olympic Museum Setup'}
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PROJETOS EM DESTAQUE - 1 Card Grande + 3 Cards Pequenos */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className={`py-12 md:py-16 ${theme === 'dark' ? 'home-projetos-dark' : 'home-projetos-light'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Título */}
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.12em] mb-3 text-theme-light-main">
                {lang === 'pt' ? 'Projetos em Destaque' : lang === 'es' ? 'Proyectos Destacados' : lang === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
              </h2>
              <p className={`text-sm md:text-base leading-[1.65] max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'pt' ? (
                  <>Uma seleção dos nossos trabalhos mais emblemáticos. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Veja nosso portfólio completo</LangLink> ou <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">conheça nossos serviços</LangLink>.</>
                ) : lang === 'es' ? (
                  <>Una selección de nuestros trabajos más emblemáticos. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Ver nuestro portafolio completo</LangLink> o <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">conocer nuestras soluciones</LangLink>.</>
                ) : lang === 'fr' ? (
                  <>Une sélection de nos travaux les plus emblématiques. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Voir notre portfolio complet</LangLink> ou <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">découvrir nos solutions</LangLink>.</>
                ) : (
                  <>A selection of our most iconic work. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">View our full portfolio</LangLink> or <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">explore our solutions</LangLink>.</>
                )}
              </p>
            </div>

            {/* PROJETO PRINCIPAL - Card Grande (Rio Museu Olímpico) */}
            {(() => {
              // ✅ IMPLEMENTADO: Usa projetos recomendados ou fallback estático
              const mainFeatured = recommended[0] || defaultProjects[0]
              const hasVideo = mainFeatured?.heroImage?.type === 'VIDEO' && mainFeatured?.heroImage?.original
              
              return (
                <div 
                  className="mb-8 relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] border border-white/10"
                  style={{ 
                    background: theme === 'dark' 
                      ? 'linear-gradient(to bottom right, #0f172a, #020617)' 
                      : 'linear-gradient(to bottom right, #1e1c1a, #2a2825)',
                    borderRadius: '1rem'
                  }}
                >
                  <div className={`relative aspect-video w-full overflow-hidden rounded-t-2xl ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-800'}`}>
                    {hasVideo ? (
                      <VideoPlayer
                        videoUrl={mainFeatured.heroImage.original}
                        thumbnailUrl={mainFeatured.heroImage.thumbnail || mainFeatured.heroImage.large}
                        alt={mainFeatured.heroImage?.alt || mainFeatured.title}
                        className="w-full h-full rounded-t-2xl"
                      />
                    ) : (mainFeatured?.heroImage?.large || mainFeatured?.heroImage?.medium || mainFeatured?.heroImage?.original || mainFeatured?.thumbnailUrl) ? (
                      <img
                        src={mainFeatured.heroImage?.large || mainFeatured.heroImage?.medium || mainFeatured.heroImage?.original || mainFeatured.thumbnailUrl || ''}
                        alt={mainFeatured.heroImage?.alt || mainFeatured.title}
                        className="w-full h-full object-contain object-center rounded-t-2xl"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center rounded-t-2xl"
                        style={{
                          background: theme === 'dark'
                            ? 'linear-gradient(to bottom right, rgba(201, 35, 55, 0.1), #0f172a, #020617)'
                            : 'linear-gradient(to bottom right, rgba(201, 35, 55, 0.1), #1e1c1a, #2a2825)'
                        }}
                      >
                        <div className="text-center p-6">
                          <h3 className={`font-handel text-3xl uppercase tracking-[0.12em] ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{mainFeatured.title}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-b-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {mainFeatured.tags && mainFeatured.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {mainFeatured.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 rounded-full bg-azimut-red/10 border border-azimut-red/30 font-sora text-[0.65rem] uppercase tracking-wider text-azimut-red">{tag}</span>
                          ))}
                        </div>
                      )}
                      {(mainFeatured.city || mainFeatured.country) && (
                        <p 
                          className="text-xs flex items-center gap-1"
                          style={{ 
                            color: theme === 'dark' ? '#94a3b8' : '#d3cec3',
                            textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5)' : 'none'
                          }}
                        >
                          📍 {[mainFeatured.city, mainFeatured.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                    <h3 
                      className="font-handel text-xl md:text-2xl uppercase tracking-[0.08em] mt-3 mb-2"
                      style={{ 
                        color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                        textShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {mainFeatured.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed mb-4"
                      style={{ 
                        color: theme === 'dark' ? '#cbd5e1' : '#e8e5df',
                        textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {mainFeatured.summary || mainFeatured.shortTitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/work/${mainFeatured.slug}`} className="inline-flex items-center justify-center rounded-lg bg-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90">
                        {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                      </Link>
                      <Link to="/contact?interest=similar" className="inline-flex items-center justify-center rounded-lg border border-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] transition-all duration-300 hover:bg-azimut-red/10" style={{ color: theme === 'dark' ? '#ffffff' : '#f5f1e8' }}>
                        {lang === 'pt' ? 'Projeto Similar' : lang === 'es' ? 'Proyecto Similar' : 'Similar Project'}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* 3 PROJETOS SECUNDÁRIOS - Grid 1x3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommended.slice(1, 4).map((project: HomeProject, index: number) => {
                const hasVideo = project?.heroImage?.type === 'VIDEO' && project?.heroImage?.original
                const imageUrl = project?.heroImage?.large || project?.heroImage?.medium || project?.heroImage?.original || project?.thumbnailUrl || project?.image || ''
                
                return (
                  <article
                    key={project.slug || index}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(201,35,55,0.5)] bg-slate-950"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      cursor: 'pointer',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(50,42,35,0.4)',
                      boxSizing: 'border-box',
                    }}
                    onClick={() => { window.location.href = `/${lang}/work/${project.slug}` }}
                  >
                    {hasVideo ? (
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <VideoPlayer videoUrl={project.heroImage.original} thumbnailUrl={project.heroImage.thumbnail || imageUrl} alt={project.title} className="w-full h-full" objectFit={(project as any).heroImageFit === 'cover' ? 'cover' : 'contain'} />
                      </div>
                    ) : imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        width={800}
                        height={450}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                        style={{
                          objectFit: (project as any).heroImageFit === 'cover' ? 'cover' : 'contain',
                          objectPosition: (project as any).heroImagePosition || 'center',
                        }}
                        loading="eager"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ 
                        background: theme === 'dark' 
                          ? 'linear-gradient(to bottom right, #000000, #0f172a, #000000)' 
                          : 'linear-gradient(to bottom right, #1e1c1a, #2a2825, #1e1c1a)' 
                      }}>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-azimut-red/30 bg-azimut-red/10 backdrop-blur">
                          <svg className="h-6 w-6 text-azimut-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {/* Tarja igual em todos os 6 cards: tema escuro preto, tema claro marrom; cantos alinhados ao card (sem bicos) */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 z-10 pt-6 pb-4 px-4 overflow-hidden"
                      style={{
                        borderBottomLeftRadius: '1rem',
                        borderBottomRightRadius: '1rem',
                        background: theme === 'dark' 
                          ? 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.88) 100%)'
                          : 'linear-gradient(to top, rgba(58,48,42,0.96) 0%, rgba(55,45,38,0.92) 45%, rgba(50,42,35,0.88) 100%)',
                      }}
                    >
                      <h3 
                        className="font-handel text-base md:text-lg uppercase tracking-wide group-hover:!text-azimut-red transition-colors duration-300 line-clamp-1 mb-2"
                        style={{ color: theme === 'dark' ? '#ffffff' : '#f5f1e8' }}
                      >
                        {project.shortTitle || project.title}
                      </h3>
                      {/* Uma única linha: localização · ano · tags */}
                      <div className="flex flex-nowrap items-center gap-x-2 gap-y-0 text-[0.7rem] min-h-[1.25rem] overflow-hidden">
                        {(project.city || project.country) && (
                          <span className="shrink-0" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#e8e5df' }}>
                            📍 {[project.city, project.country].filter(Boolean).join(', ')}
                          </span>
                        )}
                        {(project.city || project.country) && project.year && <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>}
                        {project.year && (
                          <span className="shrink-0" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#e8e5df' }}>{project.year}</span>
                        )}
                        {project.tags && project.tags.length > 0 && (
                          <>
                            {(project.city || project.country || project.year) && <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>}
                            <span className="flex flex-nowrap items-center gap-1.5 shrink min-w-0">
                              {project.tags.slice(0, 2).map((tag: string, idx: number) => (
                                <span 
                                  key={idx} 
                                  className="rounded-full border shrink-0 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider whitespace-nowrap"
                                  style={{ 
                                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.35)',
                                    color: theme === 'dark' ? 'rgba(255,255,255,0.95)' : '#f5f1e8',
                                    backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.35)',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-azimut-red opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden"></div>
                  </article>
                )
              })}
            </div>

            {/* Segunda linha: 3 cards (slots 5, 6, 7) — quando há perfil, ordem é personalizada; label opcional */}
            {interestProfile.hasEnoughData && (
              <p className={`text-center text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {lang === 'pt' && 'Sugestões para você'}
                {lang === 'es' && 'Sugerencias para ti'}
                {lang === 'fr' && 'Suggestions pour vous'}
                {lang === 'en' && 'Suggestions for you'}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommended.slice(4, 7).map((project: HomeProject, index: number) => {
                const hasVideo = project?.heroImage?.type === 'VIDEO' && project?.heroImage?.original
                const imageUrl = project?.heroImage?.large || project?.heroImage?.medium || project?.heroImage?.original || project?.thumbnailUrl || project?.image || ''
                return (
                  <article
                    key={project.slug || index + 4}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(201,35,55,0.5)] bg-slate-950"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${(4 + index) * 0.1}s both`,
                      cursor: 'pointer',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(50,42,35,0.4)',
                      boxSizing: 'border-box',
                    }}
                    onClick={() => { window.location.href = `/${lang}/work/${project.slug}` }}
                  >
                    {hasVideo ? (
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <VideoPlayer videoUrl={project.heroImage.original} thumbnailUrl={project.heroImage.thumbnail || imageUrl} alt={project.title} className="w-full h-full" objectFit={(project as any).heroImageFit === 'cover' ? 'cover' : 'contain'} />
                      </div>
                    ) : imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        width={800}
                        height={450}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                        style={{
                          objectFit: (project as any).heroImageFit === 'cover' ? 'cover' : 'contain',
                          objectPosition: (project as any).heroImagePosition || 'center',
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ 
                        background: theme === 'dark' 
                          ? 'linear-gradient(to bottom right, #000000, #0f172a, #000000)' 
                          : 'linear-gradient(to bottom right, #1e1c1a, #2a2825, #1e1c1a)' 
                      }}>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-azimut-red/30 bg-azimut-red/10 backdrop-blur">
                          <svg className="h-6 w-6 text-azimut-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {/* Tarja igual em todos os 6 cards: tema escuro preto, tema claro marrom; cantos alinhados ao card (sem bicos) */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 z-10 pt-6 pb-4 px-4 overflow-hidden"
                      style={{
                        borderBottomLeftRadius: '1rem',
                        borderBottomRightRadius: '1rem',
                        background: theme === 'dark' 
                          ? 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.88) 100%)'
                          : 'linear-gradient(to top, rgba(58,48,42,0.96) 0%, rgba(55,45,38,0.92) 45%, rgba(50,42,35,0.88) 100%)',
                      }}
                    >
                      <h3 
                        className="font-handel text-base md:text-lg uppercase tracking-wide group-hover:!text-azimut-red transition-colors duration-300 line-clamp-1 mb-2"
                        style={{ color: theme === 'dark' ? '#ffffff' : '#f5f1e8' }}
                      >
                        {project.shortTitle || project.title}
                      </h3>
                      {/* Uma única linha: localização · ano · tags */}
                      <div className="flex flex-nowrap items-center gap-x-2 gap-y-0 text-[0.7rem] min-h-[1.25rem] overflow-hidden">
                        {(project.city || project.country) && (
                          <span className="shrink-0" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#e8e5df' }}>
                            📍 {[project.city, project.country].filter(Boolean).join(', ')}
                          </span>
                        )}
                        {(project.city || project.country) && project.year && <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>}
                        {project.year && (
                          <span className="shrink-0" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#e8e5df' }}>{project.year}</span>
                        )}
                        {project.tags && project.tags.length > 0 && (
                          <>
                            {(project.city || project.country || project.year) && <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>}
                            <span className="flex flex-nowrap items-center gap-1.5 shrink min-w-0">
                              {project.tags.slice(0, 2).map((tag: string, idx: number) => (
                                <span 
                                  key={idx} 
                                  className="rounded-full border shrink-0 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider whitespace-nowrap"
                                  style={{ 
                                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.35)',
                                    color: theme === 'dark' ? 'rgba(255,255,255,0.95)' : '#f5f1e8',
                                    backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.35)',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-azimut-red opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden"></div>
                  </article>
                )
              })}
            </div>

            {/* CTA - Ver Todos os Projetos */}
            <div className="mt-12 text-center">
              <Link
                to={`/${lang}/work`}
                className="inline-flex items-center gap-3 bg-azimut-red hover:bg-azimut-red/90 text-white font-handel uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(201,35,55,0.4)] text-sm md:text-base"
              >
                <span>{lang === 'pt' ? 'Ver Todos os Projetos' : lang === 'es' ? 'Ver Todos los Proyectos' : lang === 'fr' ? 'Voir Tous les Projets' : 'View All Projects'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* SOBRE - Layout Assimétrico Premium (60/40). Retrato + Especialidades. Altura aumentada, linha vermelha, pills mais largas. */}
        <section className={`py-10 md:py-12 ${theme === 'dark' ? 'home-sobre-dark' : 'home-sobre-light'}`}>
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              {/* Card Esquerdo - Retrato. Min-height, linha vermelha, 4 pills mais largas e próximas. */}
              <div className="lg:col-span-3 glass-panel card-adaptive card-dark-fixed studio-snapshot-card rounded-2xl overflow-hidden group relative min-h-[300px] md:min-h-[340px]">
                <div className="red-line-top" aria-hidden="true" />
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/20 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 text-8xl opacity-20">🎬</div>
                </div>
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                  <h2 className="mb-4 font-handel text-2xl md:text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-card-text)' }}>
                    {t(lang, 'cardTitle')}
                  </h2>
                  <p className="mb-6 text-base md:text-lg leading-[1.65] flex-grow" style={{ color: 'var(--theme-card-text-secondary)' }}>
                    {t(lang, 'cardBody')}
                  </p>
                  {/* 4 pills atravessado: bordas vermelhas (não cinza), hover mais vermelho */}
                  <div className="flex flex-col gap-y-2.5 mb-6">
                    <div className="flex gap-x-2 items-center flex-wrap">
                      <span 
                        className="rounded-full px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.14em] w-fit max-w-[10rem] shrink-0 text-center transition-all duration-300 text-white/95"
                        style={{
                          border: '1.5px solid rgba(201,35,55,0.45)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.8)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,35,55,0.18) 0%, rgba(255,255,255,0.06) 100%)'
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(201,35,55,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.45)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)'
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {t(lang, 'pill1')}
                      </span>
                      <span 
                        className="rounded-full px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.14em] flex-1 min-w-0 text-center transition-all duration-300 text-white/95 whitespace-normal"
                        style={{
                          border: '1.5px solid rgba(201,35,55,0.45)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.8)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,35,55,0.18) 0%, rgba(255,255,255,0.06) 100%)'
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(201,35,55,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.45)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)'
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {t(lang, 'pill2')}
                      </span>
                    </div>
                    <div className="flex gap-x-2 items-center flex-wrap">
                      <span 
                        className="rounded-full px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.14em] flex-1 min-w-0 text-center transition-all duration-300 text-white/95 whitespace-normal"
                        style={{
                          border: '1.5px solid rgba(201,35,55,0.45)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.8)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,35,55,0.18) 0%, rgba(255,255,255,0.06) 100%)'
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(201,35,55,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.45)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)'
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {t(lang, 'pill3')}
                      </span>
                      <span 
                        className="rounded-full px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.14em] w-fit max-w-[10rem] shrink-0 text-center transition-all duration-300 text-white/95"
                        style={{
                          border: '1.5px solid rgba(201,35,55,0.45)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.8)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,35,55,0.18) 0%, rgba(255,255,255,0.06) 100%)'
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(201,35,55,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,35,55,0.45)'
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.04) 100%)'
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {t(lang, 'pillar4')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--theme-card-text-secondary)' }}>
                    📍 {t(lang, 'cities')}
                  </p>
                </div>
              </div>

              {/* Card Direito - Especialidades. Subtítulo Experience, bordas pills vermelhas. */}
              <div className="lg:col-span-2 glass-panel backdrop-blur-xl card-dark-fixed expertise-card-premium relative rounded-2xl sm:rounded-3xl p-6 md:p-8 flex flex-col justify-start overflow-hidden min-h-[300px] md:min-h-[340px]">
                <div className="red-line-top" aria-hidden="true" />
                {/* Wrapper para título + linha com mesma largura */}
                <div className="flex flex-col items-center mt-2 mb-4">
                  <h3 className="expertise-block-title font-sora uppercase tracking-[0.2em] text-center" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {lang === 'pt' ? 'Especialidades' : lang === 'es' ? 'Especialidades' : lang === 'fr' ? 'Spécialités' : 'Expertise'}
                  </h3>
                  <p 
                    className="uppercase tracking-[0.2em] text-center expertise-subtitle" 
                    style={{ 
                      fontSize: '0.65rem', 
                      marginBottom: '1rem', 
                      fontWeight: theme === 'dark' ? 400 : 600,
                      opacity: theme === 'dark' ? 0.8 : 1,
                      letterSpacing: '0.25em'
                    }}
                  >
                    {t(lang, 'expertiseSubtitle')}
                  </p>
                  {/* Linha vermelha com glow - largura igual ao título */}
                  <div 
                    aria-hidden="true" 
                    style={{
                      width: lang === 'pt' || lang === 'es' ? '260px' : lang === 'fr' ? '220px' : '180px',
                      height: '2px',
                      borderRadius: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(201, 35, 55, 0.3) 15%, #c92337 35%, #ff4757 50%, #c92337 65%, rgba(201, 35, 55, 0.3) 85%, transparent 100%)',
                      boxShadow: '0 0 10px rgba(201, 35, 55, 0.5), 0 0 20px rgba(255, 71, 87, 0.2)'
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  {['tag1', 'tag2', 'tag4', 'tag5', 'tag6', 'tag7'].map((key) => (
                    <span 
                      key={key} 
                      className="rounded-xl px-5 py-2.5 font-sora text-[0.8rem] sm:text-[0.85rem] uppercase tracking-[0.12em] text-center transition-all duration-300 hover:bg-azimut-red/10"
                      style={{
                        color: theme === 'dark' ? 'rgba(255,255,255,0.95)' : '#f5f1e8',
                        border: theme === 'dark' ? '1.5px solid rgba(201,35,55,0.45)' : '1.5px solid rgba(201,35,55,0.5)',
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(201,35,55,0.04) 100%)' 
                          : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.06) 100%)',
                        fontWeight: theme === 'dark' ? 400 : 500
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(201,35,55,0.75)'
                        e.currentTarget.style.background = theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(201,35,55,0.12) 0%, rgba(255,255,255,0.05) 100%)'
                          : 'linear-gradient(135deg, rgba(201,35,55,0.15) 0%, rgba(255,255,255,0.1) 100%)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201,35,55,0.45)' : 'rgba(201,35,55,0.5)'
                        e.currentTarget.style.background = theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(201,35,55,0.04) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(201,35,55,0.06) 100%)'
                      }}
                    >
                      {t(lang, key)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossas Soluções - Grid Visual COMPACTO. Tema claro: degradê sutil (evitar marrom massante). */}
        <section className={`py-10 md:py-12 ${theme === 'dark' ? 'home-solucoes-dark' : 'home-solucoes-light'}`}>
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em] mb-4 text-theme-light-main">
                {lang === 'pt' ? 'O que criamos' : lang === 'es' ? 'Qué creamos' : lang === 'fr' ? 'Ce que nous créons' : 'What we create'}
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} max-w-2xl mx-auto text-lg leading-[1.65]`}>
                {lang === 'pt' ? (
                  <>Serviços completos para transformar ideias em experiências memoráveis. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Veja exemplos reais</LangLink> ou <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">conheça nosso estúdio</LangLink>.</>
                ) : lang === 'es' ? (
                  <>Soluciones completas para transformar ideas en experiencias memorables. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Ver ejemplos reales</LangLink> o <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">conocer nuestro estudio</LangLink>.</>
                ) : lang === 'fr' ? (
                  <>Solutions complètes pour transformer les idées en expériences mémorables. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Voir des exemples réels</LangLink> ou <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">découvrir notre studio</LangLink>.</>
                ) : (
                  <>Complete solutions to transform ideas into memorable experiences. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">See real examples</LangLink> or <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">meet our studio</LangLink>.</>
                )}
              </p>
            </div>
            
            {/* MIGRAÇÃO GRADUAL: Backoffice → Estático */}
            {(Array.isArray(cmsContent?.services) && cmsContent.services.length > 0) ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cmsContent.services.slice(0, 6).map((service: HomeService, index: number) => (
                  <article
                    key={service.slug}
                    className="group relative rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.05] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => window.location.href = `/what#${service.slug}`}
                  >
                    {/* Glow Effect no Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Ícone GRANDE */}
                    {service.icon && (
                      <div className="mb-6 text-6xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {service.icon}
                      </div>
                    )}
                    
                    {/* Texto sempre claro: estilo inline para não ser sobrescrito no tema claro */}
                    <h3 className="mb-3 font-handel text-lg md:text-xl uppercase tracking-wide group-hover:text-azimut-red transition-colors duration-300 line-clamp-2 leading-tight" style={{ color: '#ffffff' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-slate-200" style={{ color: '#cbd5e1' }}>
                      {service.description}
                    </p>
                    
                    {/* Indicador "Ver Mais" */}
                    <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-azimut-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>{lang === 'pt' ? 'Saiba Mais' : lang === 'es' ? 'Saber Más' : lang === 'fr' ? 'En Savoir Plus' : 'Learn More'}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Fallback estático - mostra quando backoffice não tem conteúdo */
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    slug: 'cinema-audiovisual',
                    title: lang === 'pt' ? 'Cinema & Audiovisual' : lang === 'es' ? 'Cine & Audiovisual' : lang === 'fr' ? 'Cinéma & Audiovisuel' : 'Cinema & Audiovisual',
                    description: lang === 'pt' ? 'Narrativas cinematográficas de alta qualidade que emocionam e engajam' : lang === 'es' ? 'Narrativas cinematográficas de alta calidad que emocionan y engajan' : lang === 'fr' ? 'Récits cinématographiques de haute qualité qui émeuvent et engagent' : 'High-quality cinematic narratives that move and engage',
                    icon: '🎬'
                  },
                  { 
                    slug: 'animacao-2d-3d',
                    title: lang === 'pt' ? 'Animação 2D/3D' : lang === 'es' ? 'Animación 2D/3D' : lang === 'fr' ? 'Animation 2D/3D' : '2D/3D Animation',
                    description: lang === 'pt' ? 'Personagens e mundos animados que dão vida às suas histórias' : lang === 'es' ? 'Personajes y mundos animados que dan vida a tus historias' : lang === 'fr' ? 'Personnages et mondes animés qui donnent vie à vos histoires' : 'Animated characters and worlds that bring your stories to life',
                    icon: '🎨'
                  },
                  { 
                    slug: 'xr-interatividade',
                    title: lang === 'pt' ? 'XR / Interatividade' : lang === 'es' ? 'XR / Interactivo' : lang === 'fr' ? 'XR / Interactif' : 'XR / Interactive',
                    description: lang === 'pt' ? 'Experiências imersivas VR/AR que transportam o público para novos mundos' : lang === 'es' ? 'Experiencias inmersivas VR/AR que transportan al público a nuevos mundos' : lang === 'fr' ? 'Expériences immersives VR/AR qui transportent le public vers de nouveaux mondes' : 'Immersive VR/AR experiences that transport audiences to new worlds',
                    icon: '🥽'
                  },
                  { 
                    slug: 'ia-criativa',
                    title: lang === 'pt' ? 'IA Criativa' : lang === 'es' ? 'IA Creativa' : lang === 'fr' ? 'IA Créative' : 'Creative AI',
                    description: lang === 'pt' ? 'Pipelines com inteligência artificial para acelerar e potencializar a criação' : lang === 'es' ? 'Pipelines con inteligencia artificial para acelerar y potenciar la creación' : lang === 'fr' ? 'Pipelines avec intelligence artificielle pour accélérer et renforcer la création' : 'AI-powered pipelines to accelerate and enhance creation',
                    icon: '🤖'
                  },
                  { 
                    slug: 'educacao-formacao',
                    title: lang === 'pt' ? 'Educação & Formação' : lang === 'es' ? 'Educación & Formación' : lang === 'fr' ? 'Éducation & Formation' : 'Education & Training',
                    description: lang === 'pt' ? 'Workshops e mentorias especializadas para desenvolver talentos criativos' : lang === 'es' ? 'Workshops y mentorías especializadas para desarrollar talentos creativos' : lang === 'fr' ? 'Ateliers et mentorats spécialisés pour développer les talents créatifs' : 'Specialized workshops and mentoring to develop creative talents',
                    icon: '📚'
                  },
                  { 
                    slug: 'consultoria-estrategia',
                    title: lang === 'pt' ? 'Consultoria & Estratégia' : lang === 'es' ? 'Consultoría & Estrategia' : lang === 'fr' ? 'Conseil & Stratégie' : 'Consulting & Strategy',
                    description: lang === 'pt' ? 'Acompanhamento estratégico de projetos end-to-end com foco em resultados' : lang === 'es' ? 'Acompañamiento estratégico de proyectos end-to-end con foco en resultados' : lang === 'fr' ? 'Accompagnement stratégique de projets end-to-end axé sur les résultats' : 'Strategic end-to-end project support focused on results',
                    icon: '💡'
                  }
                ].map((service: HomeService, index: number) => (
                  <article
                    key={service.slug}
                    className="group relative rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.05] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => window.location.href = `/what#${service.slug}`}
                  >
                    {/* Glow Effect no Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Ícone GRANDE */}
                    {service.icon && (
                      <div className="mb-6 text-6xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                        {service.icon}
                      </div>
                    )}
                    
                    {/* Texto sempre claro: estilo inline para não ser sobrescrito no tema claro */}
                    <h3 className="mb-3 font-handel text-lg md:text-xl uppercase tracking-wide group-hover:text-azimut-red transition-colors duration-300 relative z-10 line-clamp-2 leading-tight" style={{ color: '#ffffff' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed transition-colors duration-300 relative z-10 group-hover:text-slate-200" style={{ color: '#cbd5e1' }}>
                      {service.description}
                    </p>
                    
                    {/* Indicador "Ver Mais" */}
                    <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-azimut-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10">
                      <span>{lang === 'pt' ? 'Saiba Mais' : lang === 'es' ? 'Saber Más' : lang === 'fr' ? 'En Savoir Plus' : 'Learn More'}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {/* CTA Final */}
            <div className="mt-12 text-center">
              <Link
                to="/what"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-azimut-red px-8 py-4 font-sora text-sm uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{lang === 'pt' ? 'Explorar Todos os Serviços' : lang === 'es' ? 'Explorar Todas las Soluciones' : lang === 'fr' ? 'Explorer Toutes les Solutions' : 'Explore All Solutions'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Navegação Final - Curada e Organizada */}
        <PageFooterNavigation
          lang={lang}
          mainCta={{
            title: lang === 'pt' ? 'Vamos criar algo incrível juntos?' : lang === 'es' ? '¿Vamos a crear algo increíble juntos?' : lang === 'fr' ? 'Créons quelque chose d\'incroyable ensemble?' : 'Let\'s create something incredible together?',
            description: lang === 'pt' ? 'Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade.' : lang === 'es' ? 'Contáctanos para discutir tu proyecto y descubrir cómo podemos transformar tu visión en realidad.' : lang === 'fr' ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité.' : 'Get in touch to discuss your project and discover how we can transform your vision into reality.',
            buttonText: lang === 'pt' ? 'Iniciar um Projeto' : lang === 'es' ? 'Iniciar un Proyecto' : lang === 'fr' ? 'Démarrer un Projet' : 'Start a Project',
            buttonHref: '/contact'
          }}
          navigation={{
            previous: {
              label: lang === 'pt' ? 'Ver Projetos' : lang === 'es' ? 'Ver Proyectos' : lang === 'fr' ? 'Voir Projets' : 'View Projects',
              href: '/work',
              icon: '🎬'
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

export default Home

