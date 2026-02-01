import React, { useState, useEffect } from 'react'
import { t, type Lang } from '../i18n'

/**
 * 🍪 COOKIE BANNER - LGPD/GDPR COMPLIANCE
 * 
 * Implementação SEGURA que:
 * ✅ Não quebra o layout existente
 * ✅ Aparece apenas 1x (salva preferência)
 * ✅ Permite opt-out de tracking
 * ✅ Mantém analytics essenciais
 */

interface CookieBannerProps {
  lang: Lang
}

const CookieBannerComponent: React.FC<CookieBannerProps> = ({ lang }) => {
  const [show, setShow] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Verificar se usuário já fez escolha
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    
    // Se não tem escolha salva, mostrar banner após 2s
    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true)
      }, 2000) // 2s delay para não irritar
      
      return () => clearTimeout(timer)
    }
  }, [])

  // Handler para aceitar todos os cookies
  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    closeBanner()
    
    // Recarregar analytics se estavam desabilitados
    if (!window.plausible) {
      window.location.reload()
    }
  }

  // Handler para aceitar apenas essenciais
  const handleEssentialOnly = () => {
    localStorage.setItem('cookie-consent', 'essential')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    closeBanner()
    
    // Remover scripts de analytics se existirem
    disableAnalytics()
  }

  // Função para fechar banner com animação
  const closeBanner = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShow(false)
    }, 300) // Tempo da animação
  }

  // Desabilitar analytics (se usuário recusar)
  const disableAnalytics = () => {
    // Desabilitar Plausible
    if (window.plausible) {
      window.plausible = undefined
    }
    
    // Limpar cookies de tracking (se houver)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
  }

  // Não mostrar se não deve aparecer
  if (!show) return null

  // Textos por idioma
  const texts = {
    pt: {
      title: 'Este site usa cookies',
      message: 'Usamos cookies essenciais para o funcionamento do site e cookies de análise para melhorar sua experiência. Você pode escolher quais aceitar.',
      acceptAll: 'Aceitar tudo',
      essentialOnly: 'Apenas essenciais',
      learnMore: 'Saiba mais'
    },
    en: {
      title: 'This site uses cookies',
      message: 'We use essential cookies for site functionality and analytics cookies to improve your experience. You can choose which to accept.',
      acceptAll: 'Accept all',
      essentialOnly: 'Essential only',
      learnMore: 'Learn more'
    },
    fr: {
      title: 'Ce site utilise des cookies',
      message: 'Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies d\'analyse pour améliorer votre expérience. Vous pouvez choisir lesquels accepter.',
      acceptAll: 'Tout accepter',
      essentialOnly: 'Essentiels uniquement',
      learnMore: 'En savoir plus'
    },
    es: {
      title: 'Este sitio usa cookies',
      message: 'Usamos cookies esenciales para el funcionamiento del sitio y cookies de análisis para mejorar su experiencia. Puede elegir cuáles aceptar.',
      acceptAll: 'Aceptar todo',
      essentialOnly: 'Solo esenciales',
      learnMore: 'Más información'
    }
  }

  const text = texts[lang]

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[9999]
        bg-dark-900/95 backdrop-blur-md
        border-t border-white/10
        px-4 py-4 sm:px-6 sm:py-5
        transform transition-all duration-300
        ${isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
      `}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Texto */}
          <div className="flex-1">
            <h2 
              id="cookie-banner-title"
              className="text-sm font-semibold text-white mb-1"
            >
              🍪 {text.title}
            </h2>
            <p 
              id="cookie-banner-desc"
              className="text-xs text-gray-400 max-w-2xl"
            >
              {text.message}{' '}
              <a 
                href={`/${lang}/privacy`}
                className="hover:underline"
                style={{ color: '#e84d5c' }}
              >
                {text.learnMore}
              </a>
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Botão: Apenas essenciais */}
            <button
              onClick={handleEssentialOnly}
              className="
                px-4 py-2 
                text-xs font-medium
                text-gray-300
                bg-transparent
                border border-white/20
                rounded-lg
                hover:bg-white/10
                transition-all duration-200
                whitespace-nowrap
              "
            >
              {text.essentialOnly}
            </button>

            {/* Botão: Aceitar tudo */}
            <button
              onClick={handleAcceptAll}
              className="
                px-4 py-2 
                text-xs font-semibold
                text-white
                bg-azimut-red
                rounded-lg
                hover:bg-azimut-red/90
                transition-all duration-200
                whitespace-nowrap
              "
            >
              {text.acceptAll}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CookieBannerComponent

