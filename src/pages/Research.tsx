import React from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { useBackofficeContent } from '../hooks/useBackofficeContent'

interface ResearchProps {
  lang: Lang
}

const Research: React.FC<ResearchProps> = ({ lang }) => {
  useUserTracking()
  const seo = seoData.research[lang]
  
  // Buscar conteúdo da página research do backoffice
  const { page: researchPage, loading: pageLoading } = useBackofficeContent('academy/research', lang)
  
  // Lab items não estão no banco ainda - deixar vazio por enquanto
  // TODO: Implementar modelo Lab no banco ou usar seções da página
  const labItems: any[] = []

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/research"
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
            {t(lang, 'navResearch')}
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' 
              ? 'Exploração de novas linguagens, tecnologias emergentes e metodologias experimentais para narrativas imersivas.'
              : lang === 'es'
              ? 'Exploración de nuevos lenguajes, tecnologías emergentes y metodologías experimentales para narrativas inmersivas.'
              : 'Exploring new languages, emerging technologies and experimental methodologies for immersive storytelling.'}
          </p>

          {/* Lab & Experiments */}
          {/* TODO: Lab items não estão no banco ainda - implementar quando necessário */}
          {labItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {labItems.map((item: any) => (
                <article
                  key={item.slug}
                  className="group rounded-2xl border border-white/10 card-adaptive p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="mb-3 inline-block rounded-full border border-azimut-red/30 bg-azimut-red/10 px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.2em]" style={{ color: '#d3cec3' }}>
                    {item.type}
                  </div>
                  <h3 className="mb-3 font-sora text-xl text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">
              {lang === 'pt' ? 'Conteúdo de pesquisa em desenvolvimento.' : 
               lang === 'es' ? 'Contenido de investigación en desarrollo.' :
               lang === 'fr' ? 'Contenu de recherche en développement.' :
               'Research content in development.'}
            </p>
          )}

          {/* Research Areas */}
          <section className="mt-16">
            <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.14em]" style={{ color: 'var(--theme-text)' }}>
              {lang === 'pt' ? 'Áreas de Pesquisa' : lang === 'es' ? 'Áreas de Investigación' : 'Research Areas'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { pt: 'IA Generativa para Narrativa', en: 'Generative AI for Storytelling', es: 'IA Generativa para Narrativa' },
                { pt: 'Cinematic VR & 360', en: 'Cinematic VR & 360', es: 'VR & 360 Cinematográfico' },
                { pt: 'Sistemas Interativos', en: 'Interactive Systems', es: 'Sistemas Interactivos' },
                { pt: 'Pipelines Híbridos (IA+Humano)', en: 'Hybrid Pipelines (AI+Human)', es: 'Pipelines Híbridos (IA+Humano)' },
                { pt: 'Museografia Digital', en: 'Digital Museography', es: 'Museografía Digital' },
                { pt: 'Educação Imersiva', en: 'Immersive Education', es: 'Educación Inmersiva' }
              ].map((area, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl border border-white/10 card-adaptive p-4 text-center backdrop-blur"
                >
                  <span className="font-sora text-sm text-white">
                    {lang === 'pt' ? area.pt : lang === 'es' ? area.es : area.en}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Research
