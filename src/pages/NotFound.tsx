import React from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'

interface NotFoundProps {
  lang: Lang
}

const NotFound: React.FC<NotFoundProps> = ({ lang }) => {
  const messages = {
    en: {
      code: '404',
      title: 'Page not found',
      description: 'The page you are looking for doesn\'t exist or has been moved.',
      button: 'Back to Home'
    },
    fr: {
      code: '404',
      title: 'Page non trouvée',
      description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
      button: 'Retour à l\'accueil'
    },
    pt: {
      code: '404',
      title: 'Página não encontrada',
      description: 'A página que você procura não existe ou foi movida.',
      button: 'Voltar ao Início'
    },
    es: {
      code: '404',
      title: 'Página no encontrada',
      description: 'La página que buscas no existe o ha sido movida.',
      button: 'Volver al Inicio'
    }
  }

  const msg = messages[lang]

  return (
    <>
      <SEO 
        lang={lang}
        title={msg.title}
        description={msg.description}
        path="/404"
      />
      <main className="relative min-h-[70vh] flex items-center justify-center">
      {/* Estrela de fundo decorativa */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] md:h-[600px] md:w-[600px]" 
        style={{ 
          opacity: 0.15,
          zIndex: -5
        }}
      >
        <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
      </div>

      <div className="text-center px-6">
        {/* Código 404 grande */}
        <div className="mb-6">
          <span 
            className="font-handel text-[8rem] md:text-[12rem] leading-none tracking-[0.1em] opacity-20"
            style={{ 
              background: 'linear-gradient(180deg, #c92337 0%, #441b44 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {msg.code}
          </span>
        </div>

        {/* Título */}
        <h1 className="mb-4 font-handel text-3xl md:text-4xl uppercase tracking-[0.16em] text-white">
          {msg.title}
        </h1>

        {/* Descrição */}
        <p className="mb-8 max-w-md mx-auto text-base md:text-lg text-slate-400 leading-relaxed">
          {msg.description}
        </p>

        {/* Botão de voltar */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-azimut-red/80 px-6 py-3 font-sora text-sm uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-azimut-red hover:bg-azimut-red/10"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          {msg.button}
        </Link>
      </div>
    </main>
    </>
  )
}

export default NotFound

