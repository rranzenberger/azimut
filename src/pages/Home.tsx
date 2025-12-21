import React, { useEffect, useState } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import contentModel from '../data/content'
import { getRecommendations } from '../utils/reco'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
import { useAzimutContent } from '../hooks/useAzimutContent'

interface HomeProps {
  lang: Lang
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  useUserTracking()
  
  // Função locale deve ser definida ANTES de ser usada
  const locale = (entry: { pt: string; en: string; es: string }) => {
    if (lang === 'fr') return entry.en // Fallback para francês usar inglês
    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }
  
  // Integração com CMS - conteúdo personalizado
  const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'home' })
  
  // Slogan do hero: CMS ou fallback local
  const heroSlogan = cmsContent?.page?.heroSlogan || locale(contentModel.home.hero.title)
  
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
  
  const [recommended, setRecommended] = useState(() => contentModel.cases.slice(0, 3))
  
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
  const seo = seoData.home[lang]

  // Recomendações simples (client-side) usando geo/tags fictícios
  useEffect(() => {
    // Placeholder geo; ideal: resolver via backend/edge com consentimento
    const geo = { country: 'BR', state: '', city: '' }
    const tagsRecentes: string[] = []
    const recs = getRecommendations({ lang: lang === 'fr' ? 'en' : lang as 'pt' | 'en' | 'es', geo, tagsRecentes, max: 3 })
    setRecommended(recs)
  }, [lang])

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/"
      />
      <main className="relative">
        {/* Star background on the side */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px]" 
          style={{ 
            opacity: 0.3,
            zIndex: -5
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
            <h1 className="mb-3 sm:mb-4 font-handel text-[1.8rem] leading-[1.15] tracking-[0.12em] uppercase sm:text-[2.1rem] sm:tracking-[0.14em] md:text-[2.5rem] md:tracking-[0.16em] lg:text-[2.8rem] animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', color: 'var(--theme-text)' }}>
              {heroSlogan.toUpperCase()}
            </h1>

            <p className="mb-4 sm:mb-6 max-w-xl text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem] leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', color: 'var(--theme-text-muted)' }}>
              {locale(contentModel.home.hero.subtitle)}
            </p>

            <div className="flex flex-wrap gap-2 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              {contentModel.home.pillars.map((pill, idx) => (
                <span key={idx} className="pill-adaptive rounded-full border px-3 py-1.5 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                  {lang === 'fr' ? pill.en : (pill[lang as 'pt' | 'en' | 'es'] || pill.en)}
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

        {/* Featured Project - Hero Visual */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
            {recommended.length > 0 && (() => {
              const featured = recommended[0]
              const hasMedia = featured.mediaPoster || featured.mediaLoop
              return (
                <div className="relative overflow-hidden rounded-3xl card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                  {/* Featured Image/Video Area - BACKOFFICE: mediaPoster ou mediaLoop */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    {/* Renderizar mídia se disponível, senão mostrar placeholder */}
                    {hasMedia ? (
                      <>
                        {featured.mediaLoop ? (
                          <video
                            src={featured.mediaLoop}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : featured.mediaPoster ? (
                          <img
                            src={featured.mediaPoster}
                            alt={locale(featured.title)}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : null}
                        {/* Overlay gradient para legibilidade do texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none"></div>
                        {/* Badge e título sobre a imagem */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-6 z-10">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur">
                              <span className="h-2 w-2 animate-pulse rounded-full bg-azimut-red"></span>
                              <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                                {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                              </span>
                            </div>
                            <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl drop-shadow-lg">
                              {locale(featured.title)}
                            </h3>
                            <p className="mt-2 text-slate-300 drop-shadow-md">
                              {locale(featured.shortDescription)}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Placeholder quando não há mídia */
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950">
                  <div className="text-center p-6">
                    {/* Animated placeholder */}
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-azimut-red/30 bg-azimut-red/10 backdrop-blur">
                      <svg className="h-8 w-8 text-azimut-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-azimut-red"></span>
                      <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                        {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                      </span>
                    </div>
                    <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-slate-100 md:text-4xl">
                      Rio Olympic Museum
                    </h3>
                    <p className="mt-2 text-slate-400">
                      {lang === 'pt' ? 'Direção tecnológica e audiovisual' : lang === 'es' ? 'Dirección tecnológica y audiovisual' : 'Tech & AV direction'}
                    </p>
                        <p className="mt-4 text-xs text-slate-500 uppercase tracking-wider">
                          {lang === 'pt' ? '📹 Vídeo/Imagem do Backoffice' : lang === 'es' ? '📹 Video/Imagen del Backoffice' : '📹 Video/Image from Backoffice'}
                        </p>
                      </div>
                    </div>
                    )}
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {featured.services.slice(0, 3).map(service => (
                        <span key={service} className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {locale(featured.shortDescription)}
                    </p>
                    {featured.location && (
                      <p className="mt-4 text-sm text-slate-400">
                        📍 {featured.location}
                      </p>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        </section>

        {/* Recomendações */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Sugestões para você' : lang === 'es' ? 'Sugerencias para ti' : 'Suggested for you'}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map(item => (
                <article
                  key={item.slug}
                  className="rounded-2xl border border-white/10 card-adaptive p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur"
                >
                  <div className="mb-2 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-slate-400">
                    <span>{item.category}</span>
                    <span className="badge-adaptive rounded-full px-2 py-0.5 text-[0.64rem]">
                      {item.status === 'active'
                        ? lang === 'pt'
                          ? 'Ativo'
                          : lang === 'es'
                          ? 'Activo'
                          : 'Active'
                        : lang === 'pt'
                        ? 'Em desenvolvimento'
                        : lang === 'es'
                        ? 'En desarrollo'
                        : 'In development'}
                    </span>
                  </div>
                  <h3 className="mb-2 font-sora text-[1.05rem] text-white">
                    {locale(item.title)}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {locale(item.shortDescription)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] text-slate-400">
                    {item.services.slice(0, 3).map(service => (
                      <span key={service} className="rounded-full border border-white/10 px-2 py-0.5">
                        {service}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
