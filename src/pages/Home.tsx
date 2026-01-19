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

interface HomeProps {
  lang: Lang
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
  
  // ESTRATÉGIA CORRIGIDA: i18n.ts → Personalizado → Backoffice
  // Priorizar i18n.ts (sempre correto por idioma) sobre backoffice (que pode estar desatualizado)
  const heroSlogan = t(lang, 'heroTitle') || personalizedHeroMessage || cmsContent?.page?.heroSlogan
  const heroSubtitle = t(lang, 'heroSubtitle') || personalizedHeroSubtitle || cmsContent?.page?.heroSubtitle
  
  // Fallback: Projetos padrão quando backoffice está vazio
  const defaultProjects = useMemo(() => [
    {
      slug: 'museu-olimpico-rio',
      title: lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum',
      shortTitle: lang === 'pt' ? 'Experiência Imersiva Olímpica' : lang === 'es' ? 'Experiencia Inmersiva Olímpica' : lang === 'fr' ? 'Expérience Immersive Olympique' : 'Olympic Immersive Experience',
      summary: lang === 'pt' ? 'Direção geral e curadoria de conteúdo para o Museu Olímpico do Rio. Uma experiência imersiva que celebra a história olímpica através de instalações audiovisuais interativas e narrativas cinematográficas.' : lang === 'es' ? 'Dirección general y curaduría de contenido para el Museo Olímpico de Río. Una experiencia inmersiva que celebra la historia olímpica a través de instalaciones audiovisuales interactivas y narrativas cinematográficas.' : lang === 'fr' ? 'Direction générale et curation de contenu pour le Musée Olympique de Rio. Une expérience immersive qui célèbre l\'histoire olympique à travers des installations audiovisuelles interactives et des récits cinématographiques.' : 'General direction and content curation for the Rio Olympic Museum. An immersive experience that celebrates Olympic history through interactive audiovisual installations and cinematic narratives.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2025,
      tags: [lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive', lang === 'pt' ? 'Institucional' : lang === 'es' ? 'Institucional' : lang === 'fr' ? 'Institutionnel' : 'Institutional', lang === 'pt' ? 'Museu' : lang === 'es' ? 'Museo' : lang === 'fr' ? 'Musée' : 'Museum'],
      heroImage: {
        type: 'VIDEO',
        // VÍDEO OFICIAL: Museu Olímpico do Rio (YouTube)
        original: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        thumbnail: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
        alt: lang === 'pt' ? 'Vídeo Museu Olímpico Rio' : lang === 'es' ? 'Video Museo Olímpico Río' : 'Rio Olympic Museum Video'
      },
    },
    {
      slug: 'projeto-sugestao-1',
      title: lang === 'pt' ? 'Exposição Digital' : lang === 'es' ? 'Exposición Digital' : lang === 'fr' ? 'Exposition Numérique' : 'Digital Exhibition',
      shortTitle: lang === 'pt' ? 'Narrativa Espacial' : lang === 'es' ? 'Narrativa Espacial' : lang === 'fr' ? 'Narration Spatiale' : 'Spatial Narrative',
      summary: lang === 'pt' ? 'Uma exposição que utiliza realidade aumentada e projeções mapeadas para contar histórias através do espaço físico.' : lang === 'es' ? 'Una exposición que utiliza realidad aumentada y proyecciones mapeadas para contar historias a través del espacio físico.' : lang === 'fr' ? 'Une exposition qui utilise la réalité augmentée et les projections mappées pour raconter des histoires à travers l\'espace physique.' : 'An exhibition that uses augmented reality and mapped projections to tell stories through physical space.',
      city: lang === 'pt' ? 'Montreal' : 'Montreal',
      country: lang === 'pt' ? 'Canadá' : lang === 'es' ? 'Canadá' : lang === 'fr' ? 'Canada' : 'Canada',
      tags: [lang === 'pt' ? 'AR' : 'AR', lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education'],
      heroImage: null,
    },
    {
      slug: 'projeto-sugestao-2',
      title: lang === 'pt' ? 'Filme VR 360°' : lang === 'es' ? 'Película VR 360°' : lang === 'fr' ? 'Film VR 360°' : '360° VR Film',
      shortTitle: lang === 'pt' ? 'Experiência Virtual' : lang === 'es' ? 'Experiencia Virtual' : lang === 'fr' ? 'Expérience Virtuelle' : 'Virtual Experience',
      summary: lang === 'pt' ? 'Um filme de realidade virtual que transporta o espectador para diferentes locais e momentos históricos.' : lang === 'es' ? 'Una película de realidad virtual que transporta al espectador a diferentes lugares y momentos históricos.' : lang === 'fr' ? 'Un film de réalité virtuelle qui transporte le spectateur vers différents lieux et moments historiques.' : 'A virtual reality film that transports the viewer to different locations and historical moments.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : lang === 'fr' ? 'Rio de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      tags: [lang === 'pt' ? 'VR' : 'VR', lang === 'pt' ? '360°' : '360°', lang === 'pt' ? 'Cinema' : lang === 'es' ? 'Cine' : lang === 'fr' ? 'Cinéma' : 'Cinema'],
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
      console.warn('IntersectionObserver não disponível:', error)
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
  
  // Projetos: Personalizados por IA OU do backoffice OU padrão (fallback)
  // MIGRAÇÃO GRADUAL: Prioridade Backoffice → Personalização IA → Estático
  // SEMPRE tem fallback - nunca quebra!
  const projects = useMemo(() => {
    // 1º: Tentar projetos personalizados por IA (se disponível)
    if (personalizedProjects && Array.isArray(personalizedProjects) && personalizedProjects.length > 0) {
      return personalizedProjects;
    } 
    // 2º: Tentar projetos do backoffice (se disponível)
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      return cmsContent.highlightProjects;
    }
    // 3º: Fallback estático (SEMPRE funciona)
    return defaultProjects;
  }, [personalizedProjects, cmsContent?.highlightProjects, defaultProjects]);
  
  // Projetos recomendados - SEMPRE tem pelo menos 4 itens (1 featured + 3 grid)
  // Garantir que sempre seja um array válido com pelo menos 4 itens
  const recommended = useMemo(() => {
    const projs = projects && Array.isArray(projects) && projects.length > 0 
      ? projects 
      : defaultProjects;
    // Garantir que sempre retorna pelo menos 4 itens para featured + grid
    const minRequired = 4;
    if (projs.length < minRequired) {
      // Se não tem 4, preenche com projetos default
      return [...projs, ...defaultProjects.slice(0, minRequired - projs.length)];
    }
    return projs.slice(0, minRequired);
  }, [projects, defaultProjects]);

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
          className="relative flex flex-col lg:flex-row lg:items-start overflow-x-hidden overflow-y-auto film-grain py-4 sm:py-6 md:py-8"
          style={{ marginTop: '-80px', paddingTop: '100px', minHeight: 'auto' }}
        >
          {/* Background: Imagem do Backoffice (heroBackgroundImage) ou Featured Project */}
          {/* APENAS NO TEMA ESCURO - Tema claro usa gradiente bege sem imagem */}
          {theme === 'dark' && (() => {
            // PRIORIDADE 1: Imagem do backoffice (page.heroBackgroundImage)
            const heroBackgroundImage = cmsContent?.page?.heroBackgroundImage
            
            // PRIORIDADE 2: Projeto Featured
            const featured = recommended[0] || defaultProjects[0]
            const featuredImage = featured?.heroImage?.large || featured?.heroImage?.medium || featured?.heroImage?.original
            
            // FALLBACK 3: Placeholder
            const backgroundImage = heroBackgroundImage || featuredImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
            
            return (
              <div className="absolute inset-0 w-full h-full hidden lg:block">
                <OptimizedImage
                  src={backgroundImage}
                  alt=""
                  className="w-full h-full opacity-20"
                  objectFit="cover"
                  priority={true}
                />
              </div>
            )
          })()}
          
          {/* ═══════════════════════════════════════════════════════════════
              GRADIENTES POR TEMA - APENAS DESKTOP (lg:)
              Usando classes CSS separadas em index.css
              ═══════════════════════════════════════════════════════════ */}
          
          {/* 🌙 TEMA ESCURO - Gradientes AZUL/PRETO */}
          <div className="hero-gradient-dark" style={{ zIndex: -1 }} />
          
          {/* ☀️ TEMA CLARO - Gradiente MARROM/BEGE */}
          <div className="hero-gradient-light" style={{ zIndex: -1 }} />
          
          {/* MOBILE ONLY: Fundo sólido SEM gradientes */}
          <div 
            className="lg:hidden absolute inset-0"
            style={{
              background: theme === 'dark' ? '#050814' : '#d3cec3',
              zIndex: 1
            }}
          />
          
          {/* ═══════════════════════════════════════════════════════════════
              HERO REORGANIZADO: Texto | Logo (linha 1), 5 Cards (linha 2), 3 Cards (linha 3)
              ══════════════════════════════════════════════════════════════ */}
          
          {/* DESKTOP: Container único com TODAS as seções - ESPAÇAMENTO COMPACTO */}
          <div className="relative z-10 hidden lg:block px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px] w-full space-y-3">
            
            {/* LINHA 1: Hero - Texto + Logo Lado a Lado */}
            {/* Grid ajustado: mais espaço para texto, logo mais à esquerda */}
            <div className="grid grid-cols-[62%_38%] gap-4 items-start">
              {/* Coluna Esquerda: Conteúdo Texto */}
              <div className="space-y-4">
              {/* Badge AZIMUT */}
              <div className="inline-flex items-center gap-2 font-sora text-[0.75rem] uppercase tracking-[0.3em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <img 
                  src="/estela6-clara.svg"
                  alt="" 
                  className="w-4 h-4"
                />
                <span className="text-azimut-red font-semibold">AZIMUT</span>
                <span className="text-white/40">•</span>
                <span className="text-[0.7rem] azimut-since-year">SINCE 1996</span>
              </div>
                
                {/* Título em 3 LINHAS - MULTILÍNGUE */}
                {/* ESCURO: branco | CLARO: branco (fundo marrom escuro) */}
                <h1 className="font-handel uppercase animate-fade-in-up opacity-0 hero-title" style={{ 
                  fontSize: 'clamp(3rem, 5.5vw, 5.8rem)',
                  lineHeight: '1.1',
                  letterSpacing: '0.08em',
                  animationDelay: '0.2s'
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
                  
                {/* Subtítulo COMPACTO */}
                <p className="max-w-xl text-[0.95rem] leading-relaxed animate-fade-in-up opacity-0 hero-subtitle" style={{ animationDelay: '0.3s' }}>
                  {heroSubtitle.split('.')[0]}.
                </p>
              </div>
              
              {/* Coluna Direita: Logo 3D Animada (movida para esquerda) */}
              <div className="flex justify-start" style={{ alignItems: 'flex-start', zIndex: 10, position: 'relative', marginLeft: '-140px', isolation: 'isolate' }}>
                <div className="w-full max-w-[600px] aspect-square -mt-28" style={{ zIndex: 10, position: 'relative', isolation: 'isolate' }}>
                  <AnimatedLogo />
                </div>
              </div>
            </div>
            
            {/* LINHA 2: 5 Cards Horizontais (SUBIDOS - SEM GAP VAZIO) */}
            <div className="grid grid-cols-5 gap-4 -mt-24">
              {/* Cinema & AV */}
              <div className={`glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3`} style={{ background: theme === 'dark' ? 'rgba(26, 31, 46, 0.85)' : 'rgba(255, 255, 255, 0.9)' }}>
                <span className="block text-3xl flex-shrink-0">🎬</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#1e1c1a]'}`}>
                    {lang === 'pt' ? 'Cinema & AV' : lang === 'es' ? 'Cine & AV' : lang === 'fr' ? 'Cinéma & AV' : 'Cinema & AV'}
                  </span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'pt' ? 'Audiovisual' : lang === 'es' ? 'Audiovisual' : lang === 'fr' ? 'Audiovisuel' : 'Audiovisual'}
                  </span>
                </div>
              </div>

              {/* XR/VR/AR */}
              <div className={`glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3`} style={{ background: theme === 'dark' ? 'rgba(26, 31, 46, 0.85)' : 'rgba(255, 255, 255, 0.9)' }}>
                <span className="block text-3xl flex-shrink-0">🥽</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#1e1c1a]'}`}>XR/VR/AR</span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive'}
                  </span>
                </div>
              </div>

              {/* Exposições & Museus */}
              <div className={`glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3`} style={{ background: theme === 'dark' ? 'rgba(26, 31, 46, 0.85)' : 'rgba(255, 255, 255, 0.9)' }}>
                <span className="block text-3xl flex-shrink-0">🏛️</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#1e1c1a]'}`}>
                    {lang === 'pt' ? 'Exposições' : lang === 'es' ? 'Exposiciones' : lang === 'fr' ? 'Expositions' : 'Exhibitions'}
                  </span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'pt' ? '& Museus' : lang === 'es' ? '& Museos' : lang === 'fr' ? '& Musées' : '& Museums'}
                  </span>
                </div>
              </div>

              {/* IA & Tech */}
              <div className={`glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3`} style={{ background: theme === 'dark' ? 'rgba(26, 31, 46, 0.85)' : 'rgba(255, 255, 255, 0.9)' }}>
                <span className="block text-3xl flex-shrink-0">🧠</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#1e1c1a]'}`}>IA & Tech</span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'pt' ? 'Interativo' : lang === 'es' ? 'Interactivo' : lang === 'fr' ? 'Interactif' : 'Interactive'}
                  </span>
                </div>
              </div>

              {/* Educação */}
              <div className={`glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3`} style={{ background: theme === 'dark' ? 'rgba(26, 31, 46, 0.85)' : 'rgba(255, 255, 255, 0.9)' }}>
                <span className="block text-3xl flex-shrink-0">🎓</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-bold group-hover:text-azimut-red transition-colors leading-tight break-words ${theme === 'dark' ? 'text-slate-100' : 'text-[#1e1c1a]'}`}>
                    {lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education'}
                  </span>
                  <span className={`block text-[0.55rem] uppercase tracking-wide mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'pt' ? 'Academia' : lang === 'es' ? 'Academia' : lang === 'fr' ? 'Académie' : 'Academy'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* LINHA 3: 3 Cards de Credibilidade VERMELHOS */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {/* Rio Museu Olímpico */}
              <div className="card-red-adaptive p-4 rounded-lg group">
                <span className="block text-sm font-semibold card-red-title break-words">Rio Museum</span>
                <span className="block text-[0.55rem] uppercase tracking-wider mt-1 leading-tight card-red-subtitle">
                  {lang === 'pt' ? 'Direção Geral · Tecnologia · Arte Audiovisual' : lang === 'es' ? 'Dirección General · Tecnología · Arte Audiovisual' : lang === 'fr' ? 'Direction Générale · Technologie · Art Audiovisuel' : 'General Direction · Technology · Audiovisual Art'}
                </span>
              </div>

              {/* Gramado VR */}
              <div className="card-red-adaptive p-4 rounded-lg group">
                <span className="block text-sm font-semibold card-red-title break-words">
                  {lang === 'pt' ? 'Festival de Gramado' : lang === 'es' ? 'Festival de Gramado' : lang === 'fr' ? 'Festival de Gramado' : 'Gramado Festival'}
                </span>
                <span className="block text-[0.55rem] uppercase tracking-wider mt-1 card-red-subtitle">
                  {lang === 'pt' ? 'VR desde 2017' : lang === 'es' ? 'VR desde 2017' : lang === 'fr' ? 'VR depuis 2017' : 'VR since 2017'}
                </span>
              </div>

              {/* BR ↔ CA */}
              <div className="card-red-adaptive p-4 rounded-lg group">
                <span className="block text-sm font-semibold card-red-title break-words">Brasil ↔ Canadá</span>
                <span className="block text-[0.55rem] uppercase tracking-wider mt-1 card-red-subtitle">
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
                
                {/* Badge AZIMUT - NO TOPO */}
                <div className="inline-flex items-center gap-1.5 font-sora text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.05s' }}>
                  <img 
                    src="/estela6-clara.svg"
                    alt="" 
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                    style={{
                      filter: theme === 'light' ? 'brightness(0) invert(0.2)' : 'none' // Escurece no tema claro
                    }}
                  />
                  <span className="text-azimut-red font-semibold">AZIMUT</span>
                  <span className={theme === 'dark' ? 'text-white/40' : 'text-slate-600'}>•</span>
                  <span className={`text-[0.55rem] sm:text-[0.6rem] ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>SINCE 1996</span>
                </div>
                
                {/* Título - COMPACTO */}
                <h1 className={`font-handel uppercase animate-fade-in-up opacity-0 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`} style={{ 
                  fontSize: 'clamp(1.5rem, 5.5vw, 2.8rem)',
                  lineHeight: '1.1',
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
                
                {/* Subtítulo */}
                <p className={`text-[0.75rem] sm:text-[0.85rem] leading-relaxed animate-fade-in-up opacity-0 ${theme === 'dark' ? 'text-white/90' : 'text-[#4a4543]'}`} style={{ animationDelay: '0.15s' }}>
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
              <div className="relative w-full h-full">
                <AnimatedLogo />
              </div>
            </div>
            
            {/* Borda inferior vermelha SÓLIDA */}
            <div className="h-[3px] w-full bg-azimut-red" style={{ boxShadow: '0 0 8px rgba(201, 35, 55, 0.5)' }} />
            
            </div>
            
            {/* Tagline IMMERSIVE - DESTAQUE MÁXIMO abaixo da logo */}
            <div className="relative py-10 text-center px-4" style={{ order: 3 }}>
              <p className={`font-sora uppercase tracking-[0.25em] leading-relaxed font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`} style={{ 
                fontSize: 'clamp(1.2rem, 5vw, 1.8rem)',
                textShadow: theme === 'dark' 
                  ? '0 2px 15px rgba(255, 255, 255, 0.4)' 
                  : '0 2px 15px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.25em'
              }}>
                <span className="block">IMMERSIVE • INTERACTIVE</span>
                <span className="block mt-4">CINEMATIC EXPERIENCES</span>
              </p>
            </div>
            
            {/* 3️⃣ CARDS - TERCEIRO (APÓS vídeo) - GRID 2x2 */}
            <div className="relative z-10 flex flex-col justify-start w-full px-4 sm:px-6 mx-auto max-w-full overflow-x-hidden mt-6" style={{ order: 4 }}>
              
              {/* Grid 2x2 para os 4 cards */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {/* Cinema & AV */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${
                  theme === 'dark' ? 'bg-black/60' : 'bg-white/80'
                }`}>
                  <span className="text-lg">🎬</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>Cinema & AV</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>AUDIOVISUAL</span>
                  </div>
                </div>
                
                {/* XR/VR/AR */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${
                  theme === 'dark' ? 'bg-black/60' : 'bg-white/80'
                }`}>
                  <span className="text-lg">🥽</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>XR/VR/AR</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>IMERSIVO</span>
                  </div>
                </div>
                
                {/* Exposições */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${
                  theme === 'dark' ? 'bg-black/60' : 'bg-white/80'
                }`}>
                  <span className="text-lg">🏛️</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>Exposições</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>& MUSEUS</span>
                  </div>
                </div>
                
                {/* Educação */}
                <div className={`flex items-center gap-1.5 p-2.5 rounded-lg border border-azimut-red/30 ${
                  theme === 'dark' ? 'bg-black/60' : 'bg-white/80'
                }`}>
                  <span className="text-lg">🎓</span>
                  <div>
                    <span className={`block text-[0.65rem] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>Educação</span>
                    <span className={`block text-[0.48rem] uppercase tracking-wider ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>ACADEMIA</span>
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
          theme === 'dark' 
            ? 'bg-gradient-to-b from-slate-950 to-black' 
            : 'bg-[#d3cec3]'
        }`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`font-handel text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.15em] font-bold mb-5 animate-fade-in-up ${theme === 'dark' ? 'text-white/90' : 'text-[#1e1a16]/90'}`}>
              {lang === 'pt' ? 'Assista Nossos Trabalhos' : lang === 'es' ? 'Ve Nuestros Trabajos' : lang === 'fr' ? 'Regardez Nos Travaux' : 'Watch Our Work'}
            </h2>
            {/* Linha vermelha acompanha largura do texto */}
            <div className="h-[3px] mx-auto" style={{
              background: 'linear-gradient(90deg, transparent 0%, #c92337 2%, #c92337 98%, transparent 100%)',
              width: lang === 'pt' ? '620px' : lang === 'fr' ? '560px' : lang === 'es' ? '580px' : '460px'
            }} />
          </div>
        </div>

        {/* Vídeo Fullscreen */}
        <section ref={demoreelRef} className="relative h-screen w-full overflow-hidden">
          {(() => {
            // ✅ VÍDEO DEMOREEL AZIMUT 2026 (Upscale Topaz) - PRIORIDADE 1
            const demoreelVideoFixed = 'https://www.youtube.com/watch?v=F_kfcfK_v44'
            
            // Buscar do backoffice (se configurado) ou usar o fixo acima
            const demoreelVideoBackoffice = cmsContent?.page?.demoreelVideo
            const featured = recommended[0] || defaultProjects[0]
            const fallbackVideo = featured?.heroImage?.type === 'VIDEO' ? featured.heroImage.original : null
            
            // ORDEM DE PRIORIDADE: 1. Fixo no código, 2. Backoffice, 3. Featured Project, 4. Default
            const videoUrl = demoreelVideoFixed || demoreelVideoBackoffice || fallbackVideo || 'https://www.youtube.com/watch?v=1Pcoi_E9SXI'
            const thumbnailUrl = featured?.heroImage?.thumbnail || 'https://img.youtube.com/vi/F_kfcfK_v44/maxresdefault.jpg' || 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg'
            
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
              <p className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                {lang === 'pt' 
                  ? 'Criamos experiências imersivas, interativas e cinematográficas para cultura, marcas e cidades. Da curadoria e consultoria em festivais à direção técnica de museus, navegamos entre cinema, design, engenharia, educação e pesquisa — buscando formatos que sejam ao mesmo tempo precisos e poéticos.' 
                  : lang === 'es' 
                  ? 'Creamos experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y ciudades. De la curaduría y consultoría en festivales a la dirección técnica de museos, navegamos entre cine, diseño, ingeniería, educación e investigación — buscando formatos que sean al mismo tiempo precisos y poéticos.'
                  : lang === 'fr'
                  ? 'Nous créons des expériences immersives, interactives et cinématographiques pour la culture, les marques et les villes. De la curation et du conseil en festivals à la direction technique de musées, nous naviguons entre cinéma, design, ingénierie, éducation et recherche — cherchant des formats à la fois précis et poétiques.'
                  : 'We create immersive, interactive and cinematic experiences for culture, brands and cities. From curation and consulting in festivals to museum technical direction, we navigate between cinema, design, engineering, education and research — seeking formats that are both precise and poetic.'}
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
        <section className={`py-12 md:py-16 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-black/40' : 'bg-[#d3cec3]'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Título */}
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.12em] mb-3 text-theme-light-main">
                {lang === 'pt' ? 'Projetos em Destaque' : lang === 'es' ? 'Proyectos Destacados' : lang === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
              </h2>
              <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'pt' ? 'Uma seleção dos nossos trabalhos mais emblemáticos' : lang === 'es' ? 'Una selección de nuestros trabajos más emblemáticos' : 'A selection of our most iconic work'}
              </p>
            </div>

            {/* PROJETO PRINCIPAL - Card Grande (Rio Museu Olímpico) */}
            {(() => {
              // ✅ IMPLEMENTADO: Usa projetos recomendados ou fallback estático
              const mainFeatured = recommended[0] || defaultProjects[0]
              const hasVideo = mainFeatured?.heroImage?.type === 'VIDEO' && mainFeatured?.heroImage?.original
              
              return (
                <div className="mb-8 relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10">
                  <div className="relative aspect-video w-full overflow-hidden">
                    {hasVideo ? (
                      <VideoPlayer
                        videoUrl={mainFeatured.heroImage.original}
                        thumbnailUrl={mainFeatured.heroImage.thumbnail || mainFeatured.heroImage.large}
                        alt={mainFeatured.heroImage?.alt || mainFeatured.title}
                        className="w-full h-full"
                      />
                    ) : mainFeatured?.heroImage?.large || mainFeatured?.heroImage?.medium ? (
                      <img
                        src={mainFeatured.heroImage?.large || mainFeatured.heroImage?.medium}
                        alt={mainFeatured.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950 flex items-center justify-center">
                        <div className="text-center p-6">
                          <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-white">{mainFeatured.title}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {mainFeatured.tags && mainFeatured.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {mainFeatured.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 rounded-full bg-azimut-red/10 border border-azimut-red/30 font-sora text-[0.65rem] uppercase tracking-wider text-azimut-red">{tag}</span>
                          ))}
                        </div>
                      )}
                      {(mainFeatured.city || mainFeatured.country) && (
                        <p className="text-xs text-slate-400 flex items-center gap-1">📍 {[mainFeatured.city, mainFeatured.country].filter(Boolean).join(', ')}</p>
                      )}
                    </div>
                    <h3 className="font-handel text-xl md:text-2xl uppercase tracking-[0.08em] text-white mt-3 mb-2">{mainFeatured.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{mainFeatured.summary || mainFeatured.shortTitle}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/work/${mainFeatured.slug}`} className="inline-flex items-center justify-center rounded-lg bg-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90">
                        {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                      </Link>
                      <Link to="/contact?interest=similar" className="inline-flex items-center justify-center rounded-lg border border-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/10">
                        {lang === 'pt' ? 'Projeto Similar' : lang === 'es' ? 'Proyecto Similar' : 'Similar Project'}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* 3 PROJETOS SECUNDÁRIOS - Grid 1x3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommended.slice(1, 4).map((project: any, index: number) => {
                const hasVideo = project?.heroImage?.type === 'VIDEO' && project?.heroImage?.original
                const imageUrl = project?.heroImage?.large || project?.heroImage?.medium || project?.heroImage?.original || project?.image || ''
                
                return (
                  <article
                    key={project.slug || index}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-500 hover:scale-[1.02] hover:border-azimut-red/60 hover:shadow-[0_30px_80px_rgba(201,35,55,0.5)]"
                    onClick={() => { window.location.href = `/${lang}/work/${project.slug}` }}
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`, cursor: 'pointer' }}
                  >
                    {hasVideo ? (
                      <>
                        <div className="absolute inset-0">
                          <VideoPlayer videoUrl={project.heroImage.original} thumbnailUrl={project.heroImage.thumbnail || imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
                      </>
                    ) : imageUrl ? (
                      <>
                        <img src={imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-azimut-red/30 bg-azimut-red/10 backdrop-blur">
                          <svg className="h-6 w-6 text-azimut-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className="mb-2 font-handel text-xl md:text-2xl uppercase tracking-wide !text-white group-hover:!text-azimut-red transition-colors duration-300 line-clamp-2">{project.title}</h3>
                      {(project.city || project.country) && (
                        <p className="text-xs !text-white/70 mb-3">📍 {[project.city, project.country].filter(Boolean).join(', ')}</p>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 text-[0.68rem]">
                            {project.tags.slice(0, 2).map((tag: string, idx: number) => (
                              <span key={idx} className="rounded-full border border-white/20 bg-black/40 backdrop-blur px-2.5 py-1 !text-white/80">{tag}</span>
                            ))}
                          </div>
                        )}
                        {project.year && <span className="text-xs !text-white/60 font-medium bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">{project.year}</span>}
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-azimut-red rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
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

        {/* SOBRE - Layout Assimétrico Premium (60/40) */}
        <section className="py-10 md:py-12">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              {/* Texto Esquerdo - MAIS LARGO (3/5) */}
              <div className="lg:col-span-3 glass-panel card-adaptive rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] group relative">
                {/* PLACEHOLDER: Imagem de fundo sutil */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/20 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 text-8xl opacity-20">🎬</div>
                </div>
                
                {/* Conteúdo */}
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                  <h2 className="mb-4 font-handel text-3xl md:text-4xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-card-text)' }}>
                    {t(lang, 'cardTitle')}
                  </h2>
                  <p className="mb-6 text-base md:text-lg leading-relaxed flex-grow" style={{ color: 'var(--theme-card-text-secondary)' }}>
                    {t(lang, 'cardBody')}
                  </p>
                  
                  {/* Pillars - Estilo OUTLINE BRANCO no card escuro */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {(Array.isArray(cmsContent?.page?.pillars) && cmsContent.page.pillars.length > 0
                      ? cmsContent.page.pillars 
                      : [
                          lang === 'pt' ? 'Museus & Cultura' : lang === 'es' ? 'Museos & Cultura' : lang === 'fr' ? 'Musées & Culture' : 'Museums & Culture',
                          lang === 'pt' ? 'Marcas & Eventos' : lang === 'es' ? 'Marcas & Eventos' : lang === 'fr' ? 'Marques & Événements' : 'Brands & Events',
                          lang === 'pt' ? 'Educação & Pesquisa' : lang === 'es' ? 'Educación & Investigación' : lang === 'fr' ? 'Éducation & Recherche' : 'Education & Research'
                        ]
                    ).filter(Boolean).map((pillar: string, index: number) => (
                      <span 
                        key={index}
                        className="rounded-full border-2 border-white/40 px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.18em] text-white/90 transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm" style={{ color: 'var(--theme-card-text-secondary)' }}>
                    📍 {t(lang, 'cities')}
                  </p>
                </div>
              </div>
              
              {/* Card Direito - Tags VERTICAIS (2/5) */}
              <div 
                className="lg:col-span-2 glass-panel backdrop-blur-xl card-dark-fixed relative rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_32px_80px_rgba(201,35,55,0.3)] transition-all duration-500 hover:scale-[1.02] flex flex-col justify-center" 
                style={{ 
                  background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="mb-5 font-sora text-sm uppercase tracking-[0.24em]" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  {lang === 'pt' ? 'Especialidades' : lang === 'es' ? 'Especialidades' : lang === 'fr' ? 'Spécialités' : 'Expertise'}
                </h3>
                {/* Tags em COLUNA - uma abaixo da outra */}
                <div className="flex flex-col gap-3">
                  <span className="rounded-xl border-2 border-white/30 px-5 py-3 font-sora text-[0.8rem] uppercase tracking-[0.15em] text-white text-center hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-[1.02]">
                    {t(lang, 'tag1')}
                  </span>
                  <span className="rounded-xl border-2 border-white/30 px-5 py-3 font-sora text-[0.8rem] uppercase tracking-[0.15em] text-white text-center hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-[1.02]">
                    {t(lang, 'tag2')}
                  </span>
                  <span className="rounded-xl border-2 border-white/30 px-5 py-3 font-sora text-[0.8rem] uppercase tracking-[0.15em] text-white text-center hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-[1.02]">
                    {t(lang, 'tag3')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossas Soluções - Grid Visual COMPACTO */}
        <section className={`py-10 md:py-12 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-white/5 to-transparent' : 'bg-[#d8d3c8]'}`}>
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em] mb-4 text-theme-light-main">
                {lang === 'pt' ? 'O que criamos' : lang === 'es' ? 'Qué creamos' : lang === 'fr' ? 'Ce que nous créons' : 'What we create'}
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} max-w-2xl mx-auto text-lg`}>
                {lang === 'pt' ? 'Soluções completas para transformar ideias em experiências memoráveis' : lang === 'es' ? 'Soluciones completas para transformar ideas en experiencias memorables' : lang === 'fr' ? 'Solutions complètes pour transformer les idées en expériences mémorables' : 'Complete solutions to transform ideas into memorable experiences'}
              </p>
            </div>
            
            {/* MIGRAÇÃO GRADUAL: Backoffice → Estático */}
            {(Array.isArray(cmsContent?.services) && cmsContent.services.length > 0) ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cmsContent.services.slice(0, 6).map((service: any, index: number) => (
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
                    
                    <h3 className="mb-3 font-handel text-lg md:text-xl uppercase tracking-wide text-white group-hover:text-azimut-red transition-colors duration-300 line-clamp-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-theme-card-text-secondary group-hover:text-theme-card-text transition-colors duration-300">
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
                ].map((service: any, index: number) => (
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
                    
                    <h3 className="mb-3 font-handel text-lg md:text-xl uppercase tracking-wide text-white group-hover:text-azimut-red transition-colors duration-300 relative z-10 line-clamp-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-theme-card-text-secondary group-hover:text-theme-card-text transition-colors duration-300 relative z-10">
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
                <span>{lang === 'pt' ? 'Explorar Todas as Soluções' : lang === 'es' ? 'Explorar Todas las Soluciones' : lang === 'fr' ? 'Explorer Toutes les Solutions' : 'Explore All Solutions'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA PREMIUM FULLSCREEN - START A PROJECT
            Inspiração: Apple, Tesla, Sites Premium 2026
            Glow animado + Destaque vermelho Azimut
        ═══════════════════════════════════════════════════════════ */}
        <section className={`relative py-20 md:py-32 overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-black/60 to-black/90' : 'bg-[#c9c4b9]'}`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201, 35, 55, 0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Título com animação */}
            <h2 
              className={`font-handel text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.08em] mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}
              style={{
                animation: 'fadeInUp 0.8s ease-out both',
                textShadow: theme === 'dark' ? '0 0 40px rgba(201, 35, 55, 0.3)' : 'none'
              }}
            >
              {lang === 'pt' ? "Vamos criar algo incrível juntos?" : 
               lang === 'es' ? "¿Vamos a crear algo increíble juntos?" : 
               lang === 'fr' ? "Créons quelque chose d'incroyable ensemble?" : 
               "Let's create something incredible together?"}
            </h2>

            {/* Subtítulo */}
            <p 
              className={`text-lg md:text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto mb-12`}
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}
            >
              {lang === 'pt' ? "Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade." :
               lang === 'es' ? "Contáctanos para discutir tu proyecto y descubrir cómo podemos transformar tu visión en realidad." :
               lang === 'fr' ? "Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité." :
               "Get in touch to discuss your project and discover how we can transform your vision into reality."}
            </p>

            {/* CTA Button com GLOW ANIMADO */}
            <div 
              className="inline-block"
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.4s both'
              }}
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-azimut-red px-10 py-5 font-handel text-base md:text-lg uppercase tracking-[0.15em] text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(201,35,55,0.8)]"
                style={{
                  boxShadow: '0 0 40px rgba(201, 35, 55, 0.4), 0 0 80px rgba(201, 35, 55, 0.2)',
                  animation: 'glow-pulse 3s ease-in-out infinite'
                }}
              >
                {/* Glow interno animado */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    animation: 'shine 3s ease-in-out infinite'
                  }}
                />
                
                {/* Texto */}
                <span className="relative z-10">
                  {lang === 'pt' ? 'Iniciar um Projeto' :
                   lang === 'es' ? 'Iniciar un Proyecto' :
                   lang === 'fr' ? 'Démarrer un Projet' :
                   'Start a Project'}
                </span>
                
                {/* Ícone com animação */}
                <svg 
                  className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>

                {/* Ripple effect no hover */}
                <span className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
              </Link>

              {/* Texto pequeno abaixo */}
              <p 
                className={`mt-6 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}
                style={{
                  animation: 'fadeInUp 0.8s ease-out 0.6s both'
                }}
              >
                {lang === 'pt' ? '✨ Resposta em até 24 horas' :
                 lang === 'es' ? '✨ Respuesta en hasta 24 horas' :
                 lang === 'fr' ? '✨ Réponse sous 24 heures' :
                 '✨ Response within 24 hours'}
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default Home

