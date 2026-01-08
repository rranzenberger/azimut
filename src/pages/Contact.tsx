import React, { useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import SmartContactForm from '../components/SmartContactForm'
import { trackPageView } from '../utils/analytics'

interface ContactProps {
  lang: Lang
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const seo = seoData.contact[lang]
  
  // Tracking de página (não bloqueia renderização)
  useEffect(() => {
    try {
      const cleanup = trackPageView('contact')
      return cleanup
    } catch (error) {
      // Se tracking falhar, não quebrar renderização
      console.warn('Tracking error:', error)
      return () => {} // Cleanup vazio
    }
  }, [])

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/contact"
        lang={lang}
      />
      
      <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Estrela de fundo */}
        <div className="absolute -right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px] opacity-[0.3] dark:opacity-[0.15] pointer-events-none -z-5">
          <img
            src="/logo-azimut-star.svg"
            alt=""
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Container */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <SmartContactForm />
        </div>
      </main>
    </>
  )
}

export default Contact
