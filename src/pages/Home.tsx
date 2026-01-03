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
  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useAzimutContent({ page: 'home' })
  
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
  
  // ESTRATÉGIA: Backoffice → Estático (sempre funciona)
  const heroSlogan = personalizedHeroMessage || cmsContent?.page?.heroSlogan || 'Experiências que Conectam Mundos'
  const heroSubtitle = personalizedHeroSubtitle || cmsContent?.page?.heroSubtitle || 'Criamos experiências imersivas entre Brasil e Canadá.'
  
  // Fallback: Projetos padrão quando backoffice está vazio
  const defaultProjects = useMemo(() => [
    {
      slug: 'projeto-destaque-home',
      title: lang === 'pt' ? 'Instalação Imersiva' : lang === 'es' ? 'Instalación Inmersiva' : lang === 'fr' ? 'Installation Immersive' : 'Immersive Installation',
      shortTitle: lang === 'pt' ? 'Experiência Visual Interativa' : lang === 'es' ? 'Experiencia Visual Interactiva' : lang === 'fr' ? 'Expérience Visuelle Interactive' : 'Interactive Visual Experience',
      summary: lang === 'pt' ? 'Uma instalação interativa que combina narrativa cinematográfica com tecnologia imersiva para criar uma experiência única que conecta audiências de diferentes culturas.' : lang === 'es' ? 'Una instalación interactiva que combina narrativa cinematográfica con tecnología inmersiva para crear una experiencia única que conecta audiencias de diferentes culturas.' : lang === 'fr' ? 'Une installation interactive qui combine narration cinématographique et technologie immersive pour créer une expérience unique qui connecte des audiences de différentes cultures.' : 'An interactive installation that combines cinematic storytelling with immersive technology to create a unique experience that connects audiences from different cultures.',
      city: lang === 'pt' ? 'São Paulo' : 'São Paulo',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive', lang === 'pt' ? 'Interativo' : lang === 'es' ? 'Interactivo' : lang === 'fr' ? 'Interactif' : 'Interactive', lang === 'pt' ? 'Cinema' : lang === 'es' ? 'Cine' : lang === 'fr' ? 'Cinéma' : 'Cinema'],
      heroImage: null,
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

        <section className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-3 sm:gap-8 sm:px-4 md:gap-10 md:px-6 md:grid-cols-[1.3fr,1fr] lg:gap-14 xl:gap-16">
            {/* Texto principal */}
            <div className="pr-0 sm:pr-4">
            <div className="mb-3 inline-flex items-center gap-2 font-sora text-[0.7rem] uppercase tracking-[0.28em] animate-fade-in-up opacity-0 text-adaptive" style={{ animationDelay: '0.1s' }}>
              <img 
                src={theme === 'light' ? '/estrela6-escuara.svg' : '/estela6-clara.svg'} 
                alt="" 
                className="w-3 h-3 md:w-3.5 md:h-3.5"
              />
              <span className="text-azimut-red font-semibold">AZIMUT</span>
            </div>

            {/* Título - slogan complementar ao header (sem redundância) - vem do CMS */}
            <h1 className="mb-3 sm:mb-4 font-handel text-[1.9rem] leading-[1.15] tracking-[0.12em] uppercase sm:text-[2.2rem] sm:tracking-[0.14em] md:text-[2.7rem] md:tracking-[0.16em] lg:text-[3rem] xl:text-[3.2rem] animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', color: 'var(--theme-text)' }}>
              {heroSlogan.toUpperCase()}
            </h1>

            <p className="mb-4 sm:mb-6 max-w-xl text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem] leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', color: 'var(--theme-text-muted)' }}>
              {heroSubtitle}
            </p>

            {/* Pillars - MIGRAÇÃO GRADUAL: Backoffice → Estático */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
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
            </div>

          {/* Card lateral - sempre escuro com texto claro */}
          <aside 
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] animate-fade-in-up opacity-0" 
            style={{ 
              animationDelay: '0.5s',
              background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
              <h2 className="mb-3 font-sora text-[0.72rem] uppercase tracking-[0.24em] text-slate-200">
                {t(lang, 'cardTitle')}
              </h2>
              <p className="mb-4 text-[0.9rem] leading-relaxed text-white">
                {t(lang, 'cardBody')}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                  {t(lang, 'tag1')}
                </span>
                <span className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                  {t(lang, 'tag2')}
                </span>
                <span className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                  {t(lang, 'tag3')}
                </span>
              </div>
              <p className="text-[0.8rem] text-slate-300">{t(lang, 'cities')}</p>
            </aside>
          </div>
        </section>

        {/* Nossas Soluções - Grid de Serviços - SEMPRE MOSTRA */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Nossas Soluções' : lang === 'es' ? 'Nuestras Soluciones' : lang === 'fr' ? 'Nos Solutions' : 'Our Solutions'}
              </h2>
              <Link
                to="/what"
                className="text-sm font-sora uppercase tracking-[0.1em] text-azimut-red hover:text-azimut-red/80 transition-colors"
              >
                {lang === 'pt' ? 'Ver Todos →' : lang === 'es' ? 'Ver Todos →' : lang === 'fr' ? 'Voir Tout →' : 'View All →'}
              </Link>
            </div>
            {/* MIGRAÇÃO GRADUAL: Backoffice → Estático */}
            {(Array.isArray(cmsContent?.services) && cmsContent.services.length > 0) ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cmsContent.services.slice(0, 6).map((service: any, index: number) => (
                  <article
                    key={service.slug}
                    className="group rounded-2xl border border-white/10 card-adaptive p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)] cursor-pointer"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => window.location.href = `/what#${service.slug}`}
                  >
                    {service.icon && (
                      <div className="mb-3 text-3xl">{service.icon}</div>
                    )}
                    <h3 className="mb-2 font-sora text-[1.05rem] font-semibold text-white group-hover:text-azimut-red transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              /* Fallback estático - mostra quando backoffice não tem conteúdo */
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    slug: 'cinema-audiovisual',
                    title: lang === 'pt' ? 'Cinema & Audiovisual' : lang === 'es' ? 'Cine & Audiovisual' : lang === 'fr' ? 'Cinéma & Audiovisuel' : 'Cinema & Audiovisual',
                    description: lang === 'pt' ? 'Narrativas cinematográficas de alta qualidade' : lang === 'es' ? 'Narrativas cinematográficas de alta calidad' : lang === 'fr' ? 'Récits cinématographiques de haute qualité' : 'High-quality cinematic narratives',
                    icon: '🎬'
                  },
                  { 
                    slug: 'animacao-2d-3d',
                    title: lang === 'pt' ? 'Animação 2D/3D' : lang === 'es' ? 'Animación 2D/3D' : lang === 'fr' ? 'Animation 2D/3D' : '2D/3D Animation',
                    description: lang === 'pt' ? 'Personagens e mundos animados' : lang === 'es' ? 'Personajes y mundos animados' : lang === 'fr' ? 'Personnages et mondes animés' : 'Animated characters and worlds',
                    icon: '🎨'
                  },
                  { 
                    slug: 'xr-interatividade',
                    title: lang === 'pt' ? 'XR / Interatividade' : lang === 'es' ? 'XR / Interactivo' : lang === 'fr' ? 'XR / Interactif' : 'XR / Interactive',
                    description: lang === 'pt' ? 'Experiências imersivas VR/AR' : lang === 'es' ? 'Experiencias inmersivas VR/AR' : lang === 'fr' ? 'Expériences immersives VR/AR' : 'Immersive VR/AR experiences',
                    icon: '🥽'
                  },
                  { 
                    slug: 'ia-criativa',
                    title: lang === 'pt' ? 'IA Criativa' : lang === 'es' ? 'IA Creativa' : lang === 'fr' ? 'IA Créative' : 'Creative AI',
                    description: lang === 'pt' ? 'Pipelines com inteligência artificial' : lang === 'es' ? 'Pipelines con inteligencia artificial' : lang === 'fr' ? 'Pipelines avec intelligence artificielle' : 'AI-powered pipelines',
                    icon: '🤖'
                  },
                  { 
                    slug: 'educacao-formacao',
                    title: lang === 'pt' ? 'Educação & Formação' : lang === 'es' ? 'Educación & Formación' : lang === 'fr' ? 'Éducation & Formation' : 'Education & Training',
                    description: lang === 'pt' ? 'Workshops e mentorias especializadas' : lang === 'es' ? 'Workshops y mentorías especializadas' : lang === 'fr' ? 'Ateliers et mentorats spécialisés' : 'Specialized workshops and mentoring',
                    icon: '📚'
                  },
                  { 
                    slug: 'consultoria-estrategia',
                    title: lang === 'pt' ? 'Consultoria & Estratégia' : lang === 'es' ? 'Consultoría & Estrategia' : lang === 'fr' ? 'Conseil & Stratégie' : 'Consulting & Strategy',
                    description: lang === 'pt' ? 'Acompanhamento de projetos end-to-end' : lang === 'es' ? 'Acompañamiento de proyectos end-to-end' : lang === 'fr' ? 'Accompagnement de projets end-to-end' : 'End-to-end project support',
                    icon: '💡'
                  }
                ].map((service: any, index: number) => (
                  <article
                    key={service.slug}
                    className="group rounded-2xl border border-white/10 card-adaptive p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)] cursor-pointer"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => window.location.href = `/what#${service.slug}`}
                  >
                    {service.icon && (
                      <div className="mb-3 text-3xl">{service.icon}</div>
                    )}
                    <h3 className="mb-2 font-sora text-[1.05rem] font-semibold text-white group-hover:text-azimut-red transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Project - Hero Visual - SEMPRE MOSTRA, mesmo sem dados */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
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
                                        <span class="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                                          ${lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                                        </span>
                                      </div>
                                      <h3 class="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl">
                                        ${featured.title}
                                      </h3>
                                      <p class="mt-2 text-slate-400 text-sm">
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
                                <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                                  {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                                </span>
                              </div>
                              <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl drop-shadow-lg">
                                {featured.title}
                              </h3>
                              <p className="mt-2 text-slate-300 drop-shadow-md">
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
                            <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                              {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                            </span>
                          </div>
                          <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl">
                            {featured.title}
                          </h3>
                          <p className="mt-2 text-slate-400">
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
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {featured.summary || featured.shortTitle}
                    </p>
                    {(featured.city || featured.country) && (
                      <p className="mb-4 text-sm text-slate-400">
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
                        className="inline-flex items-center justify-center rounded-lg border border-azimut-red px-6 py-2.5 font-sora text-sm uppercase tracking-[0.1em] text-azimut-red transition-all duration-300 hover:bg-azimut-red/10 hover:scale-105"
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

        {/* Recomendações - SEMPRE MOSTRA, mesmo sem projetos */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Sugestões para você' : lang === 'es' ? 'Sugerencias para ti' : lang === 'fr' ? 'Suggestions pour vous' : 'Suggested for you'}
              </h2>
              <Link
                to="/work"
                className="text-sm font-sora uppercase tracking-[0.1em] text-azimut-red hover:text-azimut-red/80 transition-colors"
              >
                {lang === 'pt' ? 'Ver Todos →' : lang === 'es' ? 'Ver Todos →' : lang === 'fr' ? 'Voir Tout →' : 'View All →'}
              </Link>
            </div>
            {/* Sempre mostra projetos - recommended sempre tem pelo menos 3 itens */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(Array.isArray(recommended) && recommended.length > 1 
                ? recommended.slice(1, 4) 
                : Array.isArray(defaultProjects) ? defaultProjects.slice(1, Math.min(4, defaultProjects.length)) : []
              ).map((item: any, index: number) => (
                <Link
                  key={item.slug}
                  to={`/work/${item.slug}`}
                  className="group rounded-2xl border border-white/10 card-adaptive p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)] block"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {item.heroImage?.thumbnail || item.heroImage?.medium || item.heroImage?.large ? (
                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
                      <img
                        src={item.heroImage?.large || item.heroImage?.medium || item.heroImage?.thumbnail}
                        alt={item.heroImage?.alt || item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          // Se imagem falhar, mostrar placeholder visual
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-full bg-gradient-to-br from-azimut-red/10 via-slate-800 to-slate-900">
                                <div class="text-center p-4">
                                  <svg class="w-16 h-16 mx-auto mb-2 text-azimut-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                  <p class="text-xs text-slate-400 uppercase tracking-wider">${lang === 'pt' ? 'Aguardando Imagem' : lang === 'es' ? 'Esperando Imagen' : lang === 'fr' ? 'En Attente d\'Image' : 'Awaiting Image'}</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-azimut-red/10 via-slate-800 to-slate-900 flex items-center justify-center">
                      <div className="text-center p-4">
                        <svg className="w-16 h-16 mx-auto mb-2 text-azimut-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">{lang === 'pt' ? 'Aguardando Imagem' : lang === 'es' ? 'Esperando Imagen' : lang === 'fr' ? 'En Attente d\'Image' : 'Awaiting Image'}</p>
                      </div>
                    </div>
                  )}
                  <h3 className="mb-2 font-sora text-[1.05rem] font-semibold text-white group-hover:text-azimut-red transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200 group-hover:text-slate-100 transition-colors duration-300 mb-3">
                    {item.summary || item.shortTitle}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] text-slate-400">
                      {((item?.tags && Array.isArray(item.tags)) ? item.tags : []).slice(0, 3).map((tag: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="rounded-full border border-white/10 px-2 py-0.5 transition-all duration-300 group-hover:border-azimut-red/50 group-hover:bg-azimut-red/10 group-hover:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 text-xs font-sora uppercase tracking-[0.1em] text-azimut-red opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {lang === 'pt' ? 'Ver Projeto →' : lang === 'es' ? 'Ver Proyecto →' : lang === 'fr' ? 'Voir Projet →' : 'View Project →'}
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
