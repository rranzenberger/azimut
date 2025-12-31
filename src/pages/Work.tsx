import React, { useEffect } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView, trackProjectInteraction } from '../utils/analytics'
import { useAzimutContent } from '../hooks/useAzimutContent'
import OportunidadesAtivas from '../components/OportunidadesAtivas'
import CredibilidadeEditais from '../components/CredibilidadeEditais'
import CuradoriaFestivais from '../components/CuradoriaFestivais'

interface WorkProps {
  lang: Lang
}

const Work: React.FC<WorkProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const seo = seoData.work[lang]
  
  // Buscar projetos do backoffice (100% backoffice)
  const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'work' })
  const cases = cmsContent?.highlightProjects || []
  
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
  // Dados já vêm traduzidos do backoffice

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
          <p className="mb-12 max-w-3xl text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' 
              ? 'Projetos que transformam espaços, marcas e experiências. De museus olímpicos a curadoria de festivais internacionais, cada trabalho é uma oportunidade de criar narrativas imersivas que conectam pessoas e histórias de forma única.'
              : lang === 'es'
              ? 'Proyectos que transforman espacios, marcas y experiencias. De museos olímpicos a curaduría de festivales internacionales, cada trabajo es una oportunidad de crear narrativas inmersivas que conectan personas e historias de forma única.'
              : lang === 'fr'
              ? 'Projets qui transforment espaces, marques et expériences. De musées olympiques à la curation de festivals internationaux, chaque travail est une opportunité de créer des narrations immersives qui connectent personnes et histoires de manière unique.'
              : 'Projects that transform spaces, brands and experiences. From Olympic museums to international festival curation, each work is an opportunity to create immersive narratives that uniquely connect people and stories.'}
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
                {/* Image Area - BACKOFFICE: cases[0].heroImage */}
                <div className="relative aspect-video md:aspect-auto md:min-h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group">
                  {/* Renderizar imagem se disponível */}
                  {cases[0].heroImage?.large ? (
                    <>
                      <img
                        src={cases[0].heroImage.large}
                        alt={cases[0].heroImage.alt || cases[0].title}
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
                    {cases[0].title}
                  </h2>
                  <p className="mb-4 text-base leading-relaxed text-slate-200">
                    {cases[0].summary || cases[0].shortTitle}
                  </p>
                  {(cases[0].city || cases[0].country) && (
                    <p className="mb-4 text-sm text-slate-300">
                      📍 {[cases[0].city, cases[0].country].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {cases[0].tags && cases[0].tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cases[0].tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Other Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {cases.slice(1).map((item: any) => (
              <article
                key={item.slug}
                className="group rounded-2xl border border-white/10 card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                onClick={() => {
                  trackInteraction('project_view', item.slug)
                  trackProjectInteraction(item.slug, 'CLICK')
                }}
                onMouseEnter={() => trackProjectInteraction(item.slug, 'HOVER')}
              >
                {/* Image - BACKOFFICE: item.heroImage */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {/* Renderizar imagem se disponível */}
                  {item.heroImage?.medium || item.heroImage?.large ? (
                    <>
                      <img
                        src={item.heroImage.large || item.heroImage.medium}
                        alt={item.heroImage.alt || item.title}
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
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="mb-2 font-sora text-[1.05rem] text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200 mb-3">
                    {item.summary || item.shortTitle}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-[0.68rem] text-slate-400">
                      {item.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="rounded-full border border-white/10 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

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
                className="inline-flex items-center gap-2 rounded-xl border border-azimut-red/80 bg-azimut-red/20 px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.14em] transition-all hover:bg-azimut-red/30 hover:shadow-[0_0_30px_rgba(201,35,55,0.4)]"
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