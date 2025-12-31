import React from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { useAzimutContent } from '../hooks/useAzimutContent'

interface WhatWeDoProps {
  lang: Lang
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const seo = seoData.what[lang]
  
  // Buscar serviços do backoffice (100% backoffice)
  const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'what' })
  const services = cmsContent?.services || []

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/what"
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

        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl" style={{ color: 'var(--theme-text)' }}>
            {t(lang, 'navWhat')}
          </h1>
          <p className="mb-8 max-w-3xl text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' 
              ? 'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais. Nossa abordagem única integra pesquisa, produção e educação, permitindo projetos que outros estúdios não conseguem realizar.'
              : lang === 'es'
              ? 'Combinamos cine, diseño interactivo, narrativa espacial y pipelines con IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales. Nuestro enfoque único integra investigación, producción y educación, permitiendo proyectos que otros estudios no pueden realizar.'
              : lang === 'fr'
              ? 'Nous combinons cinéma, design interactif, narration spatiale et pipelines avec IA pour créer des installations narratives, des environnements hybrides et des expériences temporelles. Notre approche unique intègre recherche, production et éducation, permettant des projets que d\'autres studios ne peuvent pas réaliser.'
              : 'We combine cinema, interactive design, spatial storytelling and AI pipelines to create narrative installations, hybrid environments and time-based experiences. Our unique approach integrates research, production and education, enabling projects other studios cannot deliver.'}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service: any) => (
              <article
                key={service.slug}
                className="rounded-2xl border border-white/10 card-adaptive p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur"
                onClick={() => trackInteraction('service_view', service.slug)}
              >
                <h3 className="mb-2 font-sora text-[1.05rem] text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default WhatWeDo
