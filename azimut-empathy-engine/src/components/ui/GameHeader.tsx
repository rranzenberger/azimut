import type { ReactNode } from 'react'

const LANGS = ['pt', 'en', 'fr', 'es'] as const
type Lang = (typeof LANGS)[number]

function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  try {
    const path = window.top?.location?.pathname ?? window.location.pathname
    const m = path.match(/^\/(pt|en|fr|es)\b/)
    if (m) return m[1] as Lang
  } catch {
    // cross-origin iframe: use localStorage
  }
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('azimut-game-lang') : null
  if (stored && LANGS.includes(stored as Lang)) return stored as Lang
  return 'pt'
}

export function changeGameLang(newLang: Lang) {
  if (typeof localStorage !== 'undefined') localStorage.setItem('azimut-game-lang', newLang)
  const origin = window.top?.location?.origin ?? window.location.origin
  const pathname = window.top?.location?.pathname ?? window.location.pathname
  const hasLangPrefix = /^\/(pt|en|fr|es)(\/|$)/.test(pathname)
  const newPath = hasLangPrefix ? pathname.replace(/^\/(pt|en|fr|es)/, `/${newLang}`) : `/${newLang}/game`
  window.top!.location.href = `${origin}${newPath}`
}

const BASE = import.meta.env.BASE_URL

/** Logo do jogo: estrela + texto "azimut". Sem alt nas imagens para não mostrar "A" ou texto vermelho se a imagem falhar; acessibilidade no container. */
export function AzimutLogo({ className = 'h-8 md:h-10 w-auto' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Azimut"
      className={`inline-flex items-center gap-1 sm:gap-1.5 shrink-0 ${className}`}
    >
      <img
        src={`${BASE}SVG/logo-estrela-meno.svg`}
        alt=""
        aria-hidden
        className="h-full w-auto object-contain block"
        loading="eager"
      />
      <img
        src={`${BASE}SVG/azimut-menu-white.svg`}
        alt=""
        aria-hidden
        className="h-[68%] w-auto object-contain block self-center"
        loading="eager"
      />
    </span>
  )
}

export interface GameHeaderProps {
  /** Conteúdo à esquerda (após o logo). Ex.: botão Voltar */
  leftAction?: ReactNode
  /** Título ou conteúdo central. Ex.: "EMPATHY ENGINE" ou "Como jogar" */
  title?: ReactNode
  /** Conteúdo à direita. Ex.: botão Menu */
  rightAction?: ReactNode
  /** Mostrar seletor de idiomas PT | EN | FR | ES à direita (padrão true) */
  showLangSwitcher?: boolean
  /** Estilo do header (borda/glow por tópico) */
  accentColor?: string
  className?: string
}

/** Header padrão de todas as telas do jogo: logo Azimut à esquerda + slots opcionais + idiomas */
export default function GameHeader({ leftAction, title, rightAction, showLangSwitcher = true, accentColor = 'rgba(255,255,255,0.04)', className = '' }: GameHeaderProps) {
  const currentLang = getCurrentLang()
  const activeColor = '#E84858'
  const inactiveColor = '#9CA3AF'

  return (
    <header
      className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 flex-shrink-0 ${className}`}
      style={{
        background: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${accentColor}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-shrink-0">
        <AzimutLogo className="h-6 sm:h-8 md:h-9 w-auto flex-shrink-0" />
        {leftAction != null && <div className="flex-shrink-0">{leftAction}</div>}
      </div>
      {title != null && (
        <div className="flex-1 min-w-0 flex justify-center overflow-hidden">
          {title}
        </div>
      )}
      {!title && <div className="flex-1 min-w-0" />}
      <div className="flex items-center gap-2 flex-shrink-0">
        {showLangSwitcher && (
          <div className="flex items-center shrink-0 gap-0.5 sm:gap-1" style={{ alignItems: 'center' }}>
            <div className="hidden sm:block h-4 w-px shrink-0 mr-1 sm:mr-2 opacity-40" style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
            <span className="flex items-center shrink-0 gap-0.5 sm:gap-1">
              <img src={`${import.meta.env.BASE_URL}flag-ca.svg`} alt="Canada" className="hidden sm:block h-3 w-auto sm:h-3.5 rounded-[2px] opacity-90 shrink-0" style={{ maxHeight: 14, maxWidth: 20 }} />
              <button type="button" onClick={() => changeGameLang('en')} className="touch-manipulation shrink-0 min-w-[28px] sm:min-w-[20px] py-1 px-0.5 text-[10px] sm:text-[0.6rem] font-semibold uppercase transition-colors rounded" style={{ color: currentLang === 'en' ? activeColor : inactiveColor, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em' }}>EN</button>
              <span className="shrink-0 hidden sm:inline" style={{ lineHeight: 1, fontSize: '0.5rem', color: activeColor }}>●</span>
              <button type="button" onClick={() => changeGameLang('fr')} className="touch-manipulation shrink-0 min-w-[28px] sm:min-w-[20px] py-1 px-0.5 text-[10px] sm:text-[0.6rem] font-semibold uppercase transition-colors rounded" style={{ color: currentLang === 'fr' ? activeColor : inactiveColor, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em' }}>FR</button>
            </span>
            <span className="opacity-40 shrink-0 mx-0.5 sm:mx-1 text-[0.5rem] sm:text-[0.55rem]">|</span>
            <span className="flex items-center shrink-0 gap-0.5 sm:gap-1">
              <img src={`${import.meta.env.BASE_URL}flag-br.svg`} alt="Brasil" className="hidden sm:block h-3 w-auto sm:h-3.5 rounded-[2px] opacity-90 shrink-0" style={{ maxHeight: 14, maxWidth: 20 }} />
              <button type="button" onClick={() => changeGameLang('pt')} className="touch-manipulation shrink-0 min-w-[28px] sm:min-w-[20px] py-1 px-0.5 text-[10px] sm:text-[0.6rem] font-semibold uppercase transition-colors rounded" style={{ color: currentLang === 'pt' ? activeColor : inactiveColor, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em' }}>PT</button>
            </span>
            <span className="shrink-0 hidden sm:inline" style={{ lineHeight: 1, fontSize: '0.5rem', color: activeColor }}>●</span>
            <span className="flex items-center shrink-0 gap-0.5 sm:gap-1">
              <img src={`${import.meta.env.BASE_URL}flag-es.svg`} alt="España" className="hidden sm:block h-3 w-auto sm:h-3.5 rounded-[2px] opacity-90 shrink-0" style={{ maxHeight: 14, maxWidth: 20 }} />
              <button type="button" onClick={() => changeGameLang('es')} className="touch-manipulation shrink-0 min-w-[28px] sm:min-w-[20px] py-1 px-0.5 text-[10px] sm:text-[0.6rem] font-semibold uppercase transition-colors rounded" style={{ color: currentLang === 'es' ? activeColor : inactiveColor, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em' }}>ES</button>
            </span>
          </div>
        )}
        {rightAction}
      </div>
    </header>
  )
}
