import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
// MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
import { useAzimutContent } from '../hooks/useAzimutContent'
import { usePersonalizedContent } from '../hooks/usePersonalizedContent'
import { VideoPlayer } from '../components/VideoPlayer'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { AnimatedLogo } from '../components/AnimatedLogo'

interface HomeProps {
  lang: Lang
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const starRef = useRef<HTMLDivElement>(null)
  useUserTracking()
  
  // MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
  // Tenta buscar do backoffice, mas sempre tem fallback estático seguro
  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useAzimutContent({ 
    page: 'home',
    lang // Passar idioma para backoffice
  })
  
  // Personalização de IA (opcional - não bloqueia se falhar)
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
      year: 2016,
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
      console.warn('Tracking error:', error)
      return () => {} // Cleanup vazio
    }
  }, [])
  
  // Projetos: Personalizados por IA OU do backoffice OU padrão (fallback)
  // MIGRAÇÃO GRADUAL: Prioridade Backoffice → Personalização IA → Estático
  // SEMPRE tem fallback - nunca quebra!
  const projects = useMemo(() => {
    // 1º: Tentar projetos personalizados por IA (se disponível)
    if (personalizedProjects && Array.isArray(personalizedProjects) && personalizedProjects.length > 0) {
      console.log('✅ Usando projetos personalizados por IA');
      return personalizedProjects;
    } 
    // 2º: Tentar projetos do backoffice (se disponível)
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      console.log('✅ Usando projetos do backoffice');
      return cmsContent.highlightProjects;
    }
    // 3º: Fallback estático (SEMPRE funciona)
    console.log('⚠️ Usando projetos estáticos (fallback) - Preencher no backoffice!');
    return defaultProjects;
  }, [personalizedProjects, cmsContent?.highlightProjects, defaultProjects]);
  
  // Projetos recomendados (primeiros 3) - SEMPRE tem pelo menos os padrões
  // Garantir que sempre seja um array válido com pelo menos 3 itens
  const recommended = useMemo(() => {
    const projs = projects && Array.isArray(projects) && projects.length > 0 
      ? projects 
      : defaultProjects;
    // Garantir que sempre retorna pelo menos 3 itens
    return projs.slice(0, Math.max(3, projs.length));
  }, [projects, defaultProjects]);
  
  useEffect(() => {
    // Detectar tema do documento
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(currentTheme === 'light' ? 'light' : 'dark')
    
    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
      setTheme(newTheme === 'light' ? 'light' : 'dark')
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => observer.disconnect()
  }, [])

  // Parallax sutil na estrela de fundo
  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop
          // Parallax muito sutil (0.3x) - movimento suave
          const parallax = scrolled * 0.3
          
          if (star) {
            star.style.transform = `translateY(${parallax}px)`
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const seo = seoData.home[lang]

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/"
      />
      <main className="relative">
        {/* Star background on the side - Parallax sutil */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75 ease-out" 
          style={{ 
            opacity: 0.3,
            zIndex: -5,
            willChange: 'transform'
          }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* HERO WORLD-CLASS 2026 - 85vh + Stats Cards Flutuantes */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden film-grain">
          {(() => {
            const featured = recommended[0] || defaultProjects[0]
            const hasMedia = featured?.heroImage && (featured.heroImage?.large || featured.heroImage?.medium || featured.heroImage?.thumbnail || featured.heroImage?.original)
            
            return (
              <>
                {/* Background Vídeo/Imagem */}
                <div className="absolute inset-0 w-full h-full">
                  {hasMedia && (featured.heroImage?.large || featured.heroImage?.medium || featured.heroImage?.original) ? (
                    <img 
                      src={featured.heroImage?.large || featured.heroImage?.medium || featured.heroImage?.original || ''} 
                      alt=""
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                  )}
                </div>
                
                {/* Glass Overlay - Gemini Style */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 backdrop-blur-[2px]" />
                
                {/* Logo 3D Animada - Canto Superior Direito */}
                <div className="absolute top-20 right-8 lg:right-20 z-5 hidden md:block">
                  <AnimatedLogo />
                </div>
                
                {/* Conteúdo Hero - World-Class 2026 */}
                <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                  <div className="max-w-4xl space-y-8">
                    {/* Badge AZIMUT compacto */}
                    <div className="inline-flex items-center gap-2 font-sora text-[0.7rem] uppercase tracking-[0.3em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                      <img 
                        src="/estela6-clara.svg" 
                        alt="" 
                        className="w-3 h-3"
                      />
                      <span className="text-azimut-red font-semibold">AZIMUT</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/60 text-[0.65rem]">SINCE 1996</span>
                    </div>
                    
                    {/* Título Monumental (usa tipografia do index.css) */}
                    <h1 className="font-handel uppercase text-white animate-fade-in-up opacity-0" style={{ 
                      fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                      lineHeight: '1.1',
                      letterSpacing: '0.12em',
                      animationDelay: '0.2s'
                    }}>
                      {heroSlogan.split(' ').map((word, i) => (
                        <span key={i}>
                          {i === heroSlogan.split(' ').length - 1 ? (
                            <span className="text-azimut-red">{word}</span>
                          ) : (
                            `${word} `
                          )}
                        </span>
                      ))}
                    </h1>
                    
                    {/* Subtítulo */}
                    <p className="max-w-2xl text-[1rem] sm:text-[1.1rem] leading-relaxed animate-fade-in-up opacity-0 text-white/90" style={{ animationDelay: '0.3s' }}>
                      {heroSubtitle.split('.')[0]}.
                    </p>
                    
                    {/* Stats Cards - AZIMUT IDENTITY (Red) */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
                      <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 p-4 sm:p-6 rounded-xl hover:border-azimut-red hover:bg-black/70 transition-all duration-300 group">
                        <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-azimut-red group-hover:text-red-400 transition-colors">100+</span>
                        <span className="block text-[0.65rem] sm:text-xs text-white/60 uppercase tracking-widest mt-1">
                          {lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : 'Projects'}
                        </span>
                      </div>
                      <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 p-4 sm:p-6 rounded-xl hover:border-azimut-red hover:bg-black/70 transition-all duration-300 group">
                        <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-azimut-red group-hover:text-red-400 transition-colors">15+</span>
                        <span className="block text-[0.65rem] sm:text-xs text-white/60 uppercase tracking-widest mt-1">
                          {lang === 'pt' ? 'Países' : lang === 'es' ? 'Países' : lang === 'fr' ? 'Pays' : 'Countries'}
                        </span>
                      </div>
                      <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 p-4 sm:p-6 rounded-xl hover:border-azimut-red hover:bg-black/70 transition-all duration-300 group">
                        <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-azimut-red group-hover:text-red-400 transition-colors">1996</span>
                        <span className="block text-[0.65rem] sm:text-xs text-white/60 uppercase tracking-widest mt-1">
                          {lang === 'pt' ? 'Desde' : lang === 'es' ? 'Desde' : lang === 'fr' ? 'Depuis' : 'Since'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })()}
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* VÍDEO FEATURED - Integrado ao Flow (sem overlap) */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="py-8 md:py-10 bg-gradient-to-b from-black/40 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {(() => {
              const featured = recommended[0] || defaultProjects[0]
              const hasVideo = featured?.heroImage?.type === 'VIDEO' && featured?.heroImage?.original
              
              return (
                <>
                  {/* Título de transição */}
                  <div className="mb-6 text-center">
                    <h2 className="font-sora text-[0.75rem] uppercase tracking-[0.24em] text-white/50 mb-3">
                      {lang === 'pt' ? 'Assista Nosso Trabalho' : lang === 'es' ? 'Ve Nuestro Trabajo' : lang === 'fr' ? 'Regardez Notre Travail' : 'Watch Our Work'}
                    </h2>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10">
                    {/* Vídeo Player */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      {hasVideo ? (
                        <VideoPlayer
                          videoUrl={featured.heroImage.original}
                          thumbnailUrl={featured.heroImage.thumbnail || featured.heroImage.large}
                          alt={featured.heroImage?.alt || featured.title}
                          className="w-full h-full"
                        />
                      ) : featured?.heroImage?.large || featured?.heroImage?.medium ? (
                        <img
                          src={featured.heroImage?.large || featured.heroImage?.medium}
                          alt={featured.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950 flex items-center justify-center">
                          <div className="text-center p-6">
                            <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-white">
                              {featured.title}
                            </h3>
                            <p className="mt-2 text-slate-400 text-sm">
                              {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Info do Projeto - compacta */}
                    <div className="p-4 md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Tags */}
                        {featured.tags && featured.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {featured.tags.slice(0, 3).map((tag: string, idx: number) => (
                              <span 
                                key={idx} 
                                className="px-2 py-1 rounded-full bg-azimut-red/10 border border-azimut-red/30 font-sora text-[0.65rem] uppercase tracking-wider text-azimut-red"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Localização */}
                        {(featured.city || featured.country) && (
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            📍 {[featured.city, featured.country].filter(Boolean).join(', ')}
                          </p>
                        )}
                      </div>
                      
                      <h3 className="font-handel text-xl md:text-2xl uppercase tracking-[0.08em] text-white mt-3 mb-2">
                        {featured.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {featured.summary || featured.shortTitle}
                      </p>
                      
                      {/* CTAs compactos */}
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/work/${featured.slug}`}
                          className="inline-flex items-center justify-center rounded-lg bg-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90"
                        >
                          {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                        </Link>
                        <Link
                          to="/contact?interest=similar"
                          className="inline-flex items-center justify-center rounded-lg border border-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/10"
                        >
                          {lang === 'pt' ? 'Projeto Similar' : lang === 'es' ? 'Proyecto Similar' : 'Similar Project'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PROJETOS EM DESTAQUE - Interactive Showcase (Estilo Gemini) */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <ProjectShowcase projects={projects} lang={lang} />

        {/* SOBRE - Card Lateral (Conteúdo Preservado) */}
        <section className="py-10 md:py-12">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Texto Esquerdo */}
              <div className="glass-panel backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-white/20 dark:border-slate-700/50">
                <h2 className="mb-4 font-handel text-3xl md:text-4xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {t(lang, 'cardTitle')}
                </h2>
                <p className="mb-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {t(lang, 'cardBody')}
                </p>
                
                {/* Pillars */}
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
                      className="pill-adaptive rounded-full border px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.18em] transition-all duration-300 hover:border-azimut-red/50 hover:bg-azimut-red/10 hover:scale-105"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                  📍 {t(lang, 'cities')}
                </p>
              </div>
              
              {/* Card Direito - Tags */}
              <div 
                className="glass-panel backdrop-blur-xl card-dark-fixed relative rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_32px_80px_rgba(201,35,55,0.3)] transition-all duration-500 hover:scale-[1.02]" 
                style={{ 
                  background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="mb-4 font-sora text-sm uppercase tracking-[0.24em] text-white/70">
                  {lang === 'pt' ? 'Especialidades' : lang === 'es' ? 'Especialidades' : lang === 'fr' ? 'Spécialités' : 'Expertise'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white hover:border-azimut-red hover:bg-azimut-red/10 transition-all duration-300">
                    {t(lang, 'tag1')}
                  </span>
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white hover:border-azimut-red hover:bg-azimut-red/10 transition-all duration-300">
                    {t(lang, 'tag2')}
                  </span>
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white hover:border-azimut-red hover:bg-azimut-red/10 transition-all duration-300">
                    {t(lang, 'tag3')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossas Soluções - Grid Visual COMPACTO */}
        <section className="py-10 md:py-12 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'O que criamos' : lang === 'es' ? 'Qué creamos' : lang === 'fr' ? 'Ce que nous créons' : 'What we create'}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-lg">
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
                    
                    <h3 className="mb-3 font-handel text-xl md:text-2xl uppercase tracking-wide text-white group-hover:text-azimut-red transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-200 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
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
                    
                    <h3 className="mb-3 font-handel text-xl md:text-2xl uppercase tracking-wide text-white group-hover:text-azimut-red transition-colors duration-300 relative z-10">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-200 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300 relative z-10">
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

      </main>
    </>
  )
}

export default Home
