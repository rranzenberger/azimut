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
        {/* HERO VISUAL FIRST - Vídeo/Imagem no Topo + Texto Mínimo */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
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
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                  )}
                </div>
                
                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
                
                {/* Conteúdo Hero */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                  {/* Badge Azimut */}
                  <div className="mb-6 inline-flex items-center gap-2 font-sora text-[0.75rem] uppercase tracking-[0.28em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                    <img 
                      src="/estela6-clara.svg" 
                      alt="" 
                      className="w-4 h-4"
                    />
                    <span className="text-azimut-red font-semibold">AZIMUT</span>
                  </div>
                  
                  {/* Título Hero - GRANDE e Impactante */}
                  <h1 className="mb-6 font-handel text-[2.5rem] leading-[1.1] tracking-[0.12em] uppercase sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] animate-fade-in-up opacity-0 text-white max-w-5xl" style={{ animationDelay: '0.2s' }}>
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
                  
                  {/* Subtítulo - Curto */}
                  <p className="mb-8 max-w-2xl text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] leading-relaxed animate-fade-in-up opacity-0 text-white/90" style={{ animationDelay: '0.3s' }}>
                    {heroSubtitle.split('.')[0]}.
                  </p>
                  
                  {/* CTA Scroll Down */}
                  <button 
                    onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
                    className="animate-fade-in-up opacity-0 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group" 
                    style={{ animationDelay: '0.4s' }}
                    aria-label="Scroll down"
                  >
                    <span className="font-sora text-[0.75rem] uppercase tracking-[0.24em]">
                      {lang === 'pt' ? 'Explorar' : lang === 'es' ? 'Explorar' : lang === 'fr' ? 'Explorer' : 'Explore'}
                    </span>
                    <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </>
            )
          })()}
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* STATS - Credibilidade Rápida */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-black/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="stat-item">
                <div className="text-5xl md:text-6xl font-bold text-azimut-red mb-2">
                  100+
                </div>
                <div className="text-sm md:text-base uppercase tracking-wider text-white/70">
                  {lang === 'pt' ? 'Projetos Realizados' : lang === 'es' ? 'Proyectos Realizados' : lang === 'fr' ? 'Projets Réalisés' : 'Projects Delivered'}
                </div>
              </div>
              
              <div className="stat-item">
                <div className="text-5xl md:text-6xl font-bold text-azimut-red mb-2">
                  15+
                </div>
                <div className="text-sm md:text-base uppercase tracking-wider text-white/70">
                  {lang === 'pt' ? 'Países' : lang === 'es' ? 'Países' : lang === 'fr' ? 'Pays' : 'Countries'}
                </div>
              </div>
              
              <div className="stat-item">
                <div className="text-5xl md:text-6xl font-bold text-azimut-red mb-2">
                  20+
                </div>
                <div className="text-sm md:text-base uppercase tracking-wider text-white/70">
                  {lang === 'pt' ? 'Anos de Experiência' : lang === 'es' ? 'Años de Experiencia' : lang === 'fr' ? 'Années d\'Expérience' : 'Years of Experience'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SOBRE - Card Lateral (Conteúdo Preservado) */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Texto Esquerdo */}
              <div>
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
                      className="pill-adaptive rounded-full border px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.18em] transition-all duration-300 hover:border-azimut-red/50 hover:bg-azimut-red/10"
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
                className="card-dark-fixed relative rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.6)]" 
                style={{ 
                  background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="mb-4 font-sora text-sm uppercase tracking-[0.24em] text-white/70">
                  {lang === 'pt' ? 'Especialidades' : lang === 'es' ? 'Especialidades' : lang === 'fr' ? 'Spécialités' : 'Expertise'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white">
                    {t(lang, 'tag1')}
                  </span>
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white">
                    {t(lang, 'tag2')}
                  </span>
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white">
                    {t(lang, 'tag3')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossas Soluções - Grid Visual MELHORADO */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5">
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

        {/* Featured Project - Hero Visual - SEMPRE MOSTRA, mesmo sem dados */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            {(() => {
              // GARANTIR que sempre há pelo menos um projeto
              const featured = recommended[0] || defaultProjects[0]
              const hasMedia = featured?.heroImage && (featured.heroImage?.large || featured.heroImage?.medium || featured.heroImage?.thumbnail || featured.heroImage?.original)
              return (
                <div className="relative overflow-hidden rounded-3xl card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                  {/* Featured Image/Video Area - BACKOFFICE: mediaPoster ou mediaLoop */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    {/* Renderizar mídia se disponível, senão mostrar placeholder */}
                    {hasMedia && (featured.heroImage?.large || featured.heroImage?.medium || featured.heroImage?.original) ? (
                      <>
                        {/* Verificar se é vídeo */}
                        {featured.heroImage?.type === 'VIDEO' && featured.heroImage?.original ? (
                          <VideoPlayer
                            videoUrl={featured.heroImage.original}
                            thumbnailUrl={featured.heroImage.thumbnail || featured.heroImage.large}
                            alt={featured.heroImage?.alt || featured.title}
                            className="absolute inset-0 h-full w-full"
                          />
                        ) : (
                          <img
                            src={featured.heroImage?.large || featured.heroImage?.medium || featured.heroImage?.original}
                            alt={featured.heroImage?.alt || featured.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(e) => {
                              // Se imagem falhar, mostrar placeholder
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950">
                                    <div class="text-center p-6 z-10">
                                      <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur">
                                        <span class="h-2 w-2 animate-pulse rounded-full bg-azimut-red"></span>
                                        <span class="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200">
                                          ${lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                                        </span>
                                      </div>
                                      <h3 class="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl">
                                        ${featured.title}
                                      </h3>
                                      <p class="mt-2 text-slate-800 dark:text-slate-400 text-sm">
                                        ${lang === 'pt' ? 'Aguardando imagem do backoffice' : lang === 'es' ? 'Esperando imagen del backoffice' : lang === 'fr' ? 'En attente d\'image du backoffice' : 'Awaiting backoffice image'}
                                      </p>
                                    </div>
                                  </div>
                                `;
                              }
                            }}
                          />
                        )}
                        {/* Overlay gradient para legibilidade do texto (apenas se não for vídeo) */}
                        {featured.heroImage?.type !== 'VIDEO' && (
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none"></div>
                        )}
                        {/* Badge e título sobre a mídia (apenas se não for vídeo) */}
                        {featured.heroImage?.type !== 'VIDEO' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-6 z-10">
                              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-azimut-red"></span>
                                <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200">
                                  {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                                </span>
                              </div>
                              <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl drop-shadow-lg">
                                {featured.title}
                              </h3>
                              <p className="mt-2 text-slate-900 dark:text-slate-300 drop-shadow-md">
                                {featured.summary || featured.shortTitle}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Placeholder quando não há mídia */
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950">
                        <div className="text-center p-6">
                          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-azimut-red"></span>
                            <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200">
                              {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                            </span>
                          </div>
                          <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl">
                            {featured.title}
                          </h3>
                          <p className="mt-2 text-slate-800 dark:text-slate-400">
                            {featured.summary || featured.shortTitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6 md:p-8">
                    {featured.tags && featured.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {((featured?.tags && Array.isArray(featured.tags)) ? featured.tags : []).slice(0, 3).map((tag: string, idx: number) => (
                          <span key={idx} className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-slate-900 dark:text-slate-300 leading-relaxed mb-4">
                      {featured.summary || featured.shortTitle}
                    </p>
                    {(featured.city || featured.country) && (
                      <p className="mb-4 text-sm text-slate-800 dark:text-slate-400">
                        📍 {[featured.city, featured.country].filter(Boolean).join(', ')}
                      </p>
                    )}
                    {/* CTAs melhorados */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Link
                        to={`/work/${featured.slug}`}
                        className="inline-flex items-center justify-center rounded-lg bg-azimut-red px-6 py-2.5 font-sora text-sm uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90 hover:scale-105"
                      >
                        {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : lang === 'fr' ? 'Voir Projet' : 'View Project'}
                      </Link>
                      <Link
                        to="/contact?interest=similar"
                        className="inline-flex items-center justify-center rounded-lg border border-azimut-red px-6 py-2.5 font-sora text-sm uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/10 hover:scale-105"
                      >
                        {lang === 'pt' ? 'Falar sobre Projeto Similar' : lang === 'es' ? 'Hablar sobre Proyecto Similar' : lang === 'fr' ? 'Parler d\'un Projet Similaire' : 'Discuss Similar Project'}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>

        {/* Recomendações - Grid Visual-First MELHORADO */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Projetos em Destaque' : lang === 'es' ? 'Proyectos Destacados' : lang === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
              </h2>
              <Link
                to="/work"
                className="text-sm font-sora uppercase tracking-[0.1em] text-azimut-red hover:text-azimut-red/80 transition-colors flex items-center gap-2 group"
              >
                <span>{lang === 'pt' ? 'Ver Todos' : lang === 'es' ? 'Ver Todos' : lang === 'fr' ? 'Voir Tout' : 'View All'}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Grid de Projetos - VISUAL FIRST */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {(Array.isArray(recommended) && recommended.length > 1 
                ? recommended.slice(1, 4) 
                : Array.isArray(defaultProjects) ? defaultProjects.slice(1, Math.min(4, defaultProjects.length)) : []
              ).map((item: any, index: number) => (
                <Link
                  key={item.slug}
                  to={`/work/${item.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_24px_60px_rgba(201,35,55,0.4)]"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  {/* Imagem/Vídeo - TAMANHO GRANDE */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    {item.heroImage?.thumbnail || item.heroImage?.medium || item.heroImage?.large ? (
                      <img
                        src={item.heroImage?.large || item.heroImage?.medium || item.heroImage?.thumbnail}
                        alt={item.heroImage?.alt || item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-azimut-red/10 via-slate-800 to-slate-900">
                        <svg className="w-20 h-20 text-azimut-red/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Overlay Gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Tags sobre a imagem */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 font-sora text-[0.65rem] uppercase tracking-wider text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Título e Info sobre a imagem */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-handel text-xl md:text-2xl uppercase tracking-[0.08em] text-white mb-2 line-clamp-2 group-hover:text-azimut-red transition-colors duration-300">
                        {item.title}
                      </h3>
                      {(item.city || item.country) && (
                        <p className="text-sm text-white/80 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {[item.city, item.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                    
                    {/* Ícone "Ver Projeto" no hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <div className="w-16 h-16 rounded-full bg-azimut-red flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default Home
