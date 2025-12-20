import React, { useEffect } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import contentModel, { CaseItem } from '../data/content'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView, trackProjectInteraction } from '../utils/analytics'

interface WorkProps {
  lang: Lang
}

const Work: React.FC<WorkProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const seo = seoData.work[lang]
  const cases = contentModel.cases
  
  // Tracking de página
  useEffect(() => {
    const cleanup = trackPageView('work')
    return cleanup
  }, [])
  const locale = (entry: { pt: string; en: string; es: string }) => {
    if (lang === 'fr') return entry.en // Fallback para francês usar inglês
    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/work"
      />
      <main className="relative py-16 md:py-20">
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

        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl" style={{ color: 'var(--theme-text)' }}>
            {t(lang, 'navWork')}
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' 
              ? 'Projetos que unem narrativa, tecnologia e design para criar experiências memoráveis.'
              : lang === 'es'
              ? 'Proyectos que unen narrativa, tecnología y diseño para crear experiencias memorables.'
              : 'Projects that blend storytelling, technology and design to create memorable experiences.'}
          </p>

          {/* Featured Project - Full Width */}
          {cases.length > 0 && (
              <article
                className="mb-8 overflow-hidden rounded-3xl border border-white/10 card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                onClick={() => {
                  trackInteraction('project_view', cases[0].slug)
                  trackProjectInteraction(cases[0].slug, 'CLICK')
                }}
              >
              <div className="grid md:grid-cols-2">
                {/* Image/Video Area - BACKOFFICE: cases[0].mediaPoster ou mediaLoop */}
                <div className="relative aspect-video md:aspect-auto md:min-h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group">
                  {/* Renderizar mídia se disponível, senão mostrar placeholder */}
                  {cases[0].mediaLoop || cases[0].mediaPoster ? (
                    <>
                      {cases[0].mediaLoop ? (
                        <video
                          src={cases[0].mediaLoop}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : cases[0].mediaPoster ? (
                        <img
                          src={cases[0].mediaPoster}
                          alt={locale(cases[0].title)}
                          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : null}
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
                        <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                          {cases[0].status === 'active' 
                            ? (lang === 'pt' ? 'Ativo' : lang === 'es' ? 'Activo' : 'Active')
                            : (lang === 'pt' ? 'Em Desenvolvimento' : lang === 'es' ? 'En Desarrollo' : 'In Development')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        {lang === 'pt' ? '🖼️ Imagem/Vídeo do Backoffice' : lang === 'es' ? '🖼️ Imagen/Video del Backoffice' : '🖼️ Image/Video from Backoffice'}
                      </p>
                    </div>
                  </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="mb-3 text-[0.72rem] uppercase tracking-[0.14em] text-azimut-red">
                    {cases[0].category}
                  </div>
                  <h2 className="mb-3 font-handel text-3xl uppercase tracking-[0.12em] text-white">
                    {locale(cases[0].title)}
                  </h2>
                  <p className="mb-4 text-base leading-relaxed text-slate-200">
                    {locale(cases[0].shortDescription)}
                  </p>
                  {cases[0].location && (
                    <p className="mb-4 text-sm text-slate-300">
                      📍 {cases[0].location}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {cases[0].services.map(service => (
                      <span key={service} className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Other Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.slice(1).map((item: CaseItem) => (
              <article
                key={item.slug}
                className="group rounded-2xl border border-white/10 card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                onClick={() => {
                  trackInteraction('project_view', item.slug)
                  trackProjectInteraction(item.slug, 'CLICK')
                }}
                onMouseEnter={() => trackProjectInteraction(item.slug, 'HOVER')}
              >
                {/* Image placeholder - BACKOFFICE: item.mediaPoster */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {/* Renderizar imagem se disponível */}
                  {item.mediaPoster ? (
                    <>
                      <img
                        src={item.mediaPoster}
                        alt={locale(item.title)}
                        className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
                    </>
                  ) : (
                    /* Placeholder quando não há imagem */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900 transition-all group-hover:from-azimut-red/10">
                    <div className="text-center p-4">
                      <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur">
                        <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="block font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-slate-400">
                    <span className="badge-adaptive rounded-full px-2 py-0.5 text-[0.64rem]">
                      {item.status === 'active' 
                        ? (lang === 'pt' ? 'Ativo' : lang === 'es' ? 'Activo' : 'Active')
                        : (lang === 'pt' ? 'Em Desenvolvimento' : lang === 'es' ? 'En Desarrollo' : 'In Development')}
                    </span>
                  </div>
                  <h3 className="mb-2 font-sora text-[1.05rem] text-white">
                    {locale(item.title)}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200 mb-3">
                    {locale(item.shortDescription)}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[0.68rem] text-slate-400">
                    {item.services.slice(0, 3).map(service => (
                      <span key={service} className="rounded-full border border-white/10 px-2 py-0.5">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Work