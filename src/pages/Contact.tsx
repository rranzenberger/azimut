import React, { useEffect, useState, Suspense } from 'react'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { trackPageView } from '../utils/analytics'
import StarBackground from '../components/StarBackground'
import { logger } from '@/utils/logger'

// Lazy load do formulário para evitar erro de renderização
const SmartContactForm = React.lazy(() => import('../components/SmartContactForm'))

interface ContactProps {
  lang: Lang
}

// Loading fallback para o formulário
const FormLoadingFallback = ({ lang }: { lang: Lang }) => (
  <div className="relative space-y-8 rounded-2xl border border-white/10 bg-slate-900/50 p-8 md:p-10 lg:p-12 shadow-lg backdrop-blur animate-pulse">
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 md:h-20 md:w-20 bg-slate-700/50 rounded-full" />
      </div>
      <div className="h-8 w-64 bg-slate-700/50 rounded mx-auto mb-4" />
      <div className="h-4 w-48 bg-slate-700/50 rounded mx-auto" />
    </div>
    <div className="space-y-6">
      <div className="h-12 bg-slate-700/50 rounded" />
      <div className="h-12 bg-slate-700/50 rounded" />
      <div className="h-12 bg-slate-700/50 rounded" />
      <div className="h-24 bg-slate-700/50 rounded" />
    </div>
    <p className="text-center text-sm opacity-70">
      {lang === 'pt' ? 'Carregando formulário...' : 
       lang === 'es' ? 'Cargando formulario...' : 
       lang === 'fr' ? 'Chargement du formulaire...' : 
       'Loading form...'}
    </p>
  </div>
)

// Error boundary simples para capturar erros
class ContactErrorBoundary extends React.Component<
  { children: React.ReactNode; lang: Lang },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; lang: Lang }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Contact form error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const { lang } = this.props
      return (
        <div className="relative space-y-6 rounded-2xl border border-azimut-red/30 bg-slate-900/80 p-8 md:p-10 text-center">
          <h2 className="text-2xl font-handel uppercase text-azimut-red">
            {lang === 'pt' ? 'Ops! Algo deu errado' : 
             lang === 'es' ? '¡Ups! Algo salió mal' : 
             lang === 'fr' ? 'Oups! Quelque chose s\'est mal passé' : 
             'Oops! Something went wrong'}
          </h2>
          <p className="text-slate-300">
            {lang === 'pt' ? 'Por favor, entre em contato diretamente:' : 
             lang === 'es' ? 'Por favor, contáctenos directamente:' : 
             lang === 'fr' ? 'Veuillez nous contacter directement:' : 
             'Please contact us directly:'}
          </p>
          <div className="space-y-3">
            <a href="mailto:contact@azimutimmersive.com" className="block text-azimut-red hover:underline">
              📧 contact@azimutimmersive.com
            </a>
            <a href="https://wa.me/5548999701301" className="block text-green-400 hover:underline">
              📱 WhatsApp: +55 (48) 99970-1301
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const seo = seoData.contact[lang]
  const [mounted, setMounted] = useState(false)
  
  // Garantir montagem no cliente
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Tracking de página (não bloqueia renderização)
  useEffect(() => {
    try {
      const cleanup = trackPageView('contact')
      return cleanup
    } catch (error) {
      logger.warn('Tracking error:', error)
      return () => {}
    }
  }, [])

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        lang={lang}
      />
      
      <main 
        className="relative min-h-screen"
        style={{
          background: 'var(--theme-bg-primary)',
          color: 'var(--theme-text)',
          marginTop: '-80px',
          paddingTop: '120px' // Mais padding para mobile
        }}
      >
        {/* Estrela de fundo - detecta tema automaticamente */}
        <StarBackground
          className="-right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px]"
          position="absolute"
          opacity={0.3}
          zIndex={-5}
        />

        {/* Container */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {mounted ? (
            <ContactErrorBoundary lang={lang}>
              <Suspense fallback={<FormLoadingFallback lang={lang} />}>
                <SmartContactForm lang={lang} />
              </Suspense>
            </ContactErrorBoundary>
          ) : (
            <FormLoadingFallback lang={lang} />
          )}
        </div>
      </main>
    </>
  )
}

export default Contact
