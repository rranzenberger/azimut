import React from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import contentModel, { ServiceItem } from '../data/content'
import { useUserTracking } from '../hooks/useUserTracking'

interface WhatWeDoProps {
  lang: Lang
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const seo = seoData.what[lang]
  const services = contentModel.services
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
          <h1 className="mb-8 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl" style={{ color: 'var(--theme-text)' }}>
            {t(lang, 'navWhat')}
          </h1>
          <p className="mb-8 text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {t(lang, 'cardBody')}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service: ServiceItem) => (
              <article
                key={service.slug}
                className="rounded-2xl border border-white/10 card-adaptive p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur"
                onClick={() => trackInteraction('service_view', service.slug)}
              >
                <h3 className="mb-2 font-sora text-[1.05rem] text-white">
                  {locale(service.title)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {locale(service.shortDescription)}
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
