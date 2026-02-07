/**
 * Página do jogo Empathy Engine
 * Exibe o jogo em iframe em /{lang}/game/
 * Em dev: aponta para localhost:5174 (jogo rodando separado)
 * Em prod: aponta para /{lang}/game/ (build copiado para public/)
 * Mobile: fallback mais rápido + botão Voltar sempre visível para evitar tela roxa travada.
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import ErrorBoundary from '../components/ErrorBoundary'

interface GamePageProps {
  lang: Lang
}

const FALLBACK_TIMEOUT_MS = 12000 // desktop: 12s
const FALLBACK_TIMEOUT_MOBILE_MS = 2000 // mobile: 2s para mostrar "Voltar" mais cedo se travar (evita tela roxa)

export default function GamePage({ lang }: GamePageProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isDev = import.meta.env.DEV
  const gameSrc = isDev ? `http://localhost:5174/?lang=${lang}` : `/${lang}/game/`

  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const timeout = isMobile ? FALLBACK_TIMEOUT_MOBILE_MS : FALLBACK_TIMEOUT_MS
    const t = setTimeout(() => {
      if (!iframeLoaded && !iframeError) setShowFallback(true)
    }, timeout)
    return () => clearTimeout(t)
  }, [iframeLoaded, iframeError, isMobile])

  const backLabel = lang === 'pt' ? 'Voltar ao jogo / Experience' : lang === 'es' ? 'Volver al Experience' : lang === 'fr' ? 'Retour à l\'Experience' : 'Back to Experience'
  const stuckLabel = lang === 'pt' ? 'Se o jogo não carregou ou está travado, toque para voltar:' : lang === 'es' ? 'Si el juego no cargó o está bloqueado, toca para volver:' : lang === 'fr' ? 'Si le jeu ne charge pas ou est bloqué, touchez pour revenir :' : 'If the game didn\'t load or is stuck, tap to go back:'

  return (
    <>
      <SEO
        title={lang === 'pt' ? 'Empathy Engine – Jogue e sinta' : lang === 'en' ? 'Empathy Engine – Play & Feel' : lang === 'es' ? 'Empathy Engine – Juega y siente' : 'Empathy Engine – Jouez et ressentez'}
        description={lang === 'pt' ? 'Ativação de marca no seu evento: estande em feira comercial, centro cultural, lançamento de produto, evento de divulgação, interno ou exposição. Quiosque com game, tecnologia e audiovisual integrados atraem visitantes ao seu estande e à sua página. Jogue: composição por brief (XR/VR, audiovisual, eventos).' : lang === 'en' ? 'Brand activation at your event: trade-fair stand, cultural center, product launch, promotional or in-house event, or exhibition. Kiosk with game, technology and audiovisual in one draws visitors to your stand and your site. Play: brief-based composition (XR/VR, audiovisual, events).' : lang === 'es' ? 'Activación de marca en tu evento: stand en feria comercial, centro cultural, lanzamiento de producto, evento de divulgación, interno o exposición. Quiosco con game, tecnología y audiovisual integrados atrae visitantes a tu stand y a tu web. Juega: composición por brief (XR/VR, audiovisual, eventos).' : 'Activation de marque à votre événement : stand en foire commerciale, centre culturel, lancement de produit, événement de promotion, interne ou exposition. Kiosque avec game, technologie et audiovisuel intégrés attire les visiteurs sur votre stand et votre site. Jouez : composition par brief (XR/VR, audiovisuel, événements).'}
        keywords="Empathy Engine, jogo Azimut, experiência imersiva, VR, XR, produção audiovisual, eventos, jogo de cartas"
        url={`/${lang}/game`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        type="website"
      />
      <ErrorBoundary>
        <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 9999, background: '#0f0f12' }}>
          {!iframeLoaded && !iframeError && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              background: '#0f0f12',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14,
              zIndex: 10000,
              padding: 24,
            }}>
              <div style={{ width: 32, height: 32, border: '3px solid rgba(201,35,55,0.3)', borderTopColor: '#c92337', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span>{lang === 'pt' ? 'Carregando jogo...' : lang === 'en' ? 'Loading game...' : lang === 'es' ? 'Cargando juego...' : 'Chargement du jeu...'}</span>
            </div>
          )}
          {(showFallback || iframeError) && (
            <div style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              right: 24,
              padding: 16,
              background: 'rgba(0,0,0,0.85)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              zIndex: 10001,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: 13 }}>{stuckLabel}</p>
              <Link
                to={`/${lang}/experience-preview`}
                style={{
                  display: 'inline-block',
                  padding: '12px 20px',
                  background: '#c92337',
                  color: '#fff',
                  borderRadius: 8,
                  fontWeight: 600,
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: 14,
                }}
              >
                {backLabel}
              </Link>
            </div>
          )}
          <iframe
            src={gameSrc}
            title="Empathy Engine"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="fullscreen"
            onLoad={() => setIframeLoaded(true)}
            onError={() => setIframeError(true)}
          />
        </div>
      </ErrorBoundary>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
