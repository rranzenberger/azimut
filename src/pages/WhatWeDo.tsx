import React, { useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { useAzimutContent } from '../hooks/useAzimutContent'

interface WhatWeDoProps {
  lang: Lang
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)
  const seo = seoData.what[lang]
  
  // Buscar serviços do backoffice (100% backoffice)
  const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'what' })
  const services = cmsContent?.services || []

  // Parallax sutil na estrela de fundo
  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop
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

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/what"
      />
      <main className="relative py-16 md:py-20">
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

        <div className="mx-auto max-w-5xl px-6" style={{ opacity: 0, animation: 'fadeInUp 0.8s ease-out 0.1s forwards' }}>
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
            {services.map((service: any, index: number) => (
              <article
                key={service.slug}
                className="group rounded-2xl border border-white/10 card-adaptive p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onClick={() => trackInteraction('service_view', service.slug)}
              >
                <h3 className="mb-2 font-sora text-[1.05rem] text-white group-hover:text-azimut-red transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
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
