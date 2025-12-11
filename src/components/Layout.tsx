import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import ThemeToggle from './ThemeToggle'
import BudgetWizardModal from './BudgetWizardModal'
import SkipLink from './SkipLink'
import { type UserProfile } from './BudgetWizard'
import { trackCTA, trackLanguageChange } from '../utils/analytics'
import { useUserTracking } from '../hooks/useUserTracking'

// ═══════════════════════════════════════════════════════════════
// 🔒 AVISO: ESTE ARQUIVO CONTÉM CÓDIGO TRAVADO
// ═══════════════════════════════════════════════════════════════
// 
// SEÇÕES PROTEGIDAS - NÃO MODIFICAR:
// 1. Logo (linhas ~162-187): height: 56px, alinhamento esquerda
// 2. Seletor de idiomas (linhas ~330-440): estrutura ultra compacta
//    - Bolinhas: fontSize: 0.65rem, translateY(-2px)
//    - Separador |: marginLeft: 5px, marginRight: 9px
//    - Botões: minWidth: 20px, gap: 1px
// 3. Botão CTA (linhas ~441-476): 130x48px, fontSize: 0.54rem
// 4. Detecção hamburger (linhas ~46-70): cálculo por largura janela
//    - rightSideWidth: 220px (FIXO)
//    - Larguras menu: PT:460, EN:420, FR:480, ES:450
// 
// ⚠️ QUALQUER MODIFICAÇÃO QUEBRARÁ O ALINHAMENTO PERFEITO
// ═══════════════════════════════════════════════════════════════

// Função para dividir o texto do botão CTA em 2 linhas
const getCtaLines = (lang: Lang): [string, string] => {
  switch (lang) {
    case 'en':
      return ['START', 'A PROJECT']
    case 'fr':
      return ['COMMENCER', 'UN PROJET']
    case 'pt':
      return ['INICIAR', 'UM PROJETO']
    case 'es':
      return ['INICIAR', 'UN PROYECTO']
    default:
      return ['INICIAR', 'UM PROJETO']
  }
}

interface LayoutProps {
  children: React.ReactNode
  lang: Lang
  setLang: (lang: Lang) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, theme, toggleTheme }) => {
  const location = useLocation()
  const { trackInteraction } = useUserTracking()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [menuOverlaps, setMenuOverlaps] = useState(false) // false = menu aparece, true = hamburger
  
  // Refs para medir sobreposição
  const logoRef = React.useRef<HTMLAnchorElement>(null)
  const navRef = React.useRef<HTMLElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // ═══════════════════════════════════════════════════════════════
  // 🔒 DETECÇÃO DE HAMBURGER - NÃO MODIFICAR
  // ═══════════════════════════════════════════════════════════════
  // Detectar se menu trepa - SOLUÇÃO ROBUSTA: calcular baseado na largura da janela
  React.useEffect(() => {
    let rafId: number | null = null
    
    const checkOverlap = () => {
      rafId = requestAnimationFrame(() => {
        // Largura da janela
        const windowWidth = window.innerWidth
        
        // ═══════════════════════════════════════════════════════════════
        // 🔒 VALORES TRAVADOS - NÃO MODIFICAR
        // ═══════════════════════════════════════════════════════════════
        // Larguras estimadas (baseadas nos componentes) - ULTRA COMPACTO
        const logoWidth = 180 // Logo tem ~180px de largura
        const rightSideWidth = 220 // Tema + Idiomas + CTA = ~220px (ultra compacto)
        
        // Larguras do menu por idioma (estimativa conservadora baseada no texto)
        const menuWidths: Record<typeof lang, number> = {
          'pt': 460, // INÍCIO, O QUE FAZEMOS, PROJETOS, ESTÚDIO, P&D, ACADEMIA
          'en': 420, // HOME, SERVICES, PROJECTS, STUDIO, R&D, ACADEMY  
          'fr': 480, // ACCUEIL, SERVICES, PROJETS, STUDIO, R&D, ACADÉMIE
          'es': 450  // INICIO, SERVICIOS, PROYECTOS, ESTUDIO, I+D, ACADEMIA
        }
        // ═══════════════════════════════════════════════════════════════
        
        const currentMenuWidth = menuWidths[lang] || menuWidths['en']
        
        // Espaço necessário total
        const totalNeeded = logoWidth + currentMenuWidth + rightSideWidth + 80 // 80px gaps
        
        // Se espaço necessário > largura disponível = TREPA
        const overlaps = totalNeeded > windowWidth
        
        setMenuOverlaps(overlaps)
      })
    }
    
    // Verificar inicialmente
    setTimeout(checkOverlap, 100)
    
    // Event listeners
    window.addEventListener('resize', checkOverlap)
    window.addEventListener('orientationchange', checkOverlap)
    
    return () => {
      window.removeEventListener('resize', checkOverlap)
      window.removeEventListener('orientationchange', checkOverlap)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [lang, location])

  // Determinar página ativa baseado na rota
  const getActiveRoute = () => {
    const path = location.pathname
    if (path === '/' || path === '/home') return 'home'
    if (path === '/what') return 'what'
    if (path === '/work') return 'work'
    if (path === '/studio') return 'studio'
    if (path === '/research') return 'research'
    if (path === '/academy') return 'academy'
    if (path === '/contact') return null // Contact não é um item do menu principal
    return null // Não retorna 'home' por padrão para evitar linha fixa
  }

  const activeRoute = getActiveRoute()
  
  // Função para determinar qual item deve mostrar a linha
  const shouldShowLine = (route: string) => {
    // Se há hover, mostra APENAS no item hovered (não no ativo)
    if (hoveredRoute !== null) {
      return hoveredRoute === route
    }
    // Se não há hover, mostra APENAS no item ativo
    return activeRoute === route && activeRoute !== null
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ color: 'var(--theme-text)' }}>
      {/* Skip to content - Accessibility */}
      <SkipLink />
      
      {/* HEADER - Glassmorphism 2026 */}
      <header 
        className="glass sticky top-0 z-30 w-full" 
        style={{ 
          backgroundColor: 'var(--theme-overlay)',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)'
        }}
      >
        <div ref={containerRef} className="mx-auto grid min-h-[64px] w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-1 px-6 sm:h-20 sm:gap-2 min-[768px]:gap-3 md:gap-4 lg:gap-5 xl:gap-6" style={{ overflow: 'visible' }}>
          {/* ═══════════════════════════════════════════════════════════════
              🔒 LOGO - NÃO MODIFICAR: height: 56px, alinhada à esquerda
              ═══════════════════════════════════════════════════════════ */}
          {/* Logo topo - GRANDE - ALINHADA À ESQUERDA */}
          <Link 
            ref={logoRef}
            to="/" 
            className="shrink-0 transition-opacity hover:opacity-90 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              flexShrink: 0,
              gridColumn: '1',
              width: 'auto',
              padding: '0'
            }}
          >
            <img
              src={theme === 'dark' ? '/logo-topo-site.svg' : '/logo-topo-preto-site.svg'}
              alt="Azimut – Immersive • Interactive • Cinematic Experiences"
              style={{ 
                height: '56px',
                width: 'auto',
                maxWidth: 'none',
                display: 'block'
              }}
            />
          </Link>

          {/* Nav desktop - aparece em tablets (768px+) - ESCONDE se trepar */}
          <nav 
            ref={navRef}
            className={`items-center justify-center font-sora text-[0.48rem] font-medium uppercase tracking-[0.06em] min-[768px]:gap-2.5 min-[768px]:text-[0.48rem] md:gap-3 md:text-[0.52rem] lg:text-[0.58rem] lg:gap-3.5 xl:gap-4 xl:text-[0.62rem] ${menuOverlaps ? 'hidden' : 'hidden min-[768px]:flex'}`} 
            style={{ color: 'var(--theme-text-secondary)', overflow: 'visible', alignItems: 'center', flexWrap: 'nowrap' }}
          >
            <Link 
              to="/" 
              className="nav-link-glow relative whitespace-nowrap pb-1 touch-manipulation shrink-0"
              onMouseEnter={() => setHoveredRoute('home')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0 6px', 
                position: 'relative',
                color: activeRoute === 'home' ? '#c92337' : undefined,
                textShadow: activeRoute === 'home' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined,
                lineHeight: '1'
              }}
            >
              <span>{t(lang, 'navHome')}</span>
              <span 
                className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  width: shouldShowLine('home') ? '100%' : '0%',
                  opacity: shouldShowLine('home') ? 1 : 0
                }}
              ></span>
            </Link>
            <Link 
              to="/what" 
              className="nav-link-glow relative whitespace-nowrap pb-1 shrink-0"
              onMouseEnter={() => setHoveredRoute('what')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                padding: '0 6px', 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                color: activeRoute === 'what' ? '#c92337' : undefined,
                textShadow: activeRoute === 'what' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined
              }}
            >
              <span>{t(lang, 'navWhat')}</span>
              <span 
                className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  width: shouldShowLine('what') ? '100%' : '0%',
                  opacity: shouldShowLine('what') ? 1 : 0
                }}
              ></span>
            </Link>
            <Link 
              to="/work" 
              className="nav-link-glow relative whitespace-nowrap pb-1 shrink-0"
              onMouseEnter={() => setHoveredRoute('work')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                padding: '0 6px', 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                color: activeRoute === 'work' ? '#c92337' : undefined,
                textShadow: activeRoute === 'work' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined
              }}
            >
              <span>{t(lang, 'navWork')}</span>
              <span 
                className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  width: shouldShowLine('work') ? '100%' : '0%',
                  opacity: shouldShowLine('work') ? 1 : 0
                }}
              ></span>
            </Link>
            <Link 
              to="/studio" 
              className="nav-link-glow relative whitespace-nowrap pb-1 shrink-0"
              onMouseEnter={() => setHoveredRoute('studio')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                padding: '0 6px', 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                color: activeRoute === 'studio' ? '#c92337' : undefined,
                textShadow: activeRoute === 'studio' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined
              }}
            >
              <span>{t(lang, 'navStudio')}</span>
              <span 
                className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  width: shouldShowLine('studio') ? '100%' : '0%',
                  opacity: shouldShowLine('studio') ? 1 : 0
                }}
              ></span>
            </Link>
            <Link 
              to="/research" 
              className="nav-link-glow relative whitespace-nowrap pb-1 shrink-0"
              onMouseEnter={() => setHoveredRoute('research')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                padding: '0 6px', 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                color: activeRoute === 'research' ? '#c92337' : undefined,
                textShadow: activeRoute === 'research' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined
              }}
            >
              <span>{t(lang, 'navResearch')}</span>
              <span 
                className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  width: shouldShowLine('research') ? '100%' : '0%',
                  opacity: shouldShowLine('research') ? 1 : 0
                }}
              ></span>
            </Link>
            <Link 
              to="/academy" 
              className="nav-link-glow relative whitespace-nowrap pb-1 shrink-0"
              onMouseEnter={() => setHoveredRoute('academy')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                padding: '0 6px', 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                color: activeRoute === 'academy' ? '#c92337' : undefined,
                textShadow: activeRoute === 'academy' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined
              }}
            >
              <span>{t(lang, 'navAcademy')}</span>
              <span 
                className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  width: shouldShowLine('academy') ? '100%' : '0%',
                  opacity: shouldShowLine('academy') ? 1 : 0
                }}
              ></span>
            </Link>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════
              🔒 SELETOR DE IDIOMAS - NÃO MODIFICAR
              Ultra compacto, bolinhas alinhadas, separador centralizado
              ═══════════════════════════════════════════════════════════ */}
          {/* CONTAINER FIXO - Tema, Idiomas e CTA - ALINHADO À DIREITA - AGLOMERADO */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0" style={{ flexShrink: 0, justifySelf: 'end', alignItems: 'center', height: '100%', marginLeft: 'auto' }}>
            {/* Toggle de tema - ALINHADO */}
            <div className="touch-manipulation shrink-0" style={{ width: '36px', minWidth: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
            
            {/* Separador visual */}
            <div className="hidden h-4 w-px min-[768px]:block shrink-0" style={{ backgroundColor: 'var(--theme-border)', flexShrink: 0, alignSelf: 'center' }}></div>
            
            {/* Idiomas - ALINHAMENTO PERFEITO */}
            <div className="hidden min-[768px]:flex shrink-0" style={{ alignItems: 'center', height: '100%', display: 'flex', gap: '0' }}>
              {/* Grupo Canadá - EN e FR - ULTRA COMPACTO */}
              <span className="flex items-center shrink-0" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '1px' }}>
                <img src="/flag-ca.svg" alt="Canada" className="h-3.5 w-auto rounded-[2px] opacity-90 shrink-0" style={{ display: 'block' }} />
                <button
                  onClick={() => {
                    trackLanguageChange(lang, 'en')
                    setLang('en')
                  }}
                  className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                  style={{ 
                    color: lang === 'en' ? '#c92337' : 'var(--theme-text-muted)', 
                    opacity: lang === 'en' ? 1 : 0.7,
                    minWidth: '20px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    lineHeight: '1',
                    margin: '0',
                    fontSize: '0.6rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  EN
                </button>
                <span className="opacity-70 shrink-0 font-sora" style={{ display: 'flex', alignItems: 'center', height: '100%', lineHeight: '1', fontSize: '0.65rem', transform: 'translateY(-2px)' }}>●</span>
                <button
                  onClick={() => {
                    trackLanguageChange(lang, 'fr')
                    setLang('fr')
                  }}
                  className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                  style={{ 
                    color: lang === 'fr' ? '#c92337' : 'var(--theme-text-muted)', 
                    opacity: lang === 'fr' ? 1 : 0.7,
                    minWidth: '20px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    lineHeight: '1',
                    margin: '0',
                    fontSize: '0.6rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  FR
                </button>
              </span>
              {/* Separador entre grupos - AJUSTADO 2PX ESQUERDA */}
              <span className="hidden md:inline opacity-40 shrink-0 font-sora" style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: '5px', marginRight: '9px', lineHeight: '1', fontSize: '0.55rem' }}>|</span>
              {/* Grupo Brasil - PT e ES - ULTRA COMPACTO */}
              <span className="flex items-center shrink-0" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '1px' }}>
                <img src="/flag-br.svg" alt="Brasil" className="h-3.5 w-auto rounded-[2px] opacity-90 shrink-0" style={{ display: 'block' }} />
                <button
                  onClick={() => {
                    trackLanguageChange(lang, 'pt')
                    setLang('pt')
                  }}
                  className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                  style={{ 
                    color: lang === 'pt' ? '#c92337' : 'var(--theme-text-muted)', 
                    opacity: lang === 'pt' ? 1 : 0.7,
                    minWidth: '20px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    lineHeight: '1',
                    margin: '0',
                    fontSize: '0.6rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  PT
                </button>
                <span className="opacity-70 shrink-0 font-sora" style={{ display: 'flex', alignItems: 'center', height: '100%', lineHeight: '1', fontSize: '0.65rem', transform: 'translateY(-2px)' }}>●</span>
                <button
                  onClick={() => {
                    trackLanguageChange(lang, 'es')
                    setLang('es')
                  }}
                  className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                  style={{ 
                    color: lang === 'es' ? '#c92337' : 'var(--theme-text-muted)', 
                    opacity: lang === 'es' ? 1 : 0.7,
                    minWidth: '20px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    lineHeight: '1',
                    margin: '0',
                    fontSize: '0.6rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  ES
                </button>
              </span>
            </div>

            {/* Botão CTA - MUITO GRANDE - CABE TUDO */}
                <Link
                  to="/contact"
                  onClick={() => {
                    trackCTA('header', 'Start Project')
                    trackInteraction('cta_click', 'header_start_project')
                  }}
                  className="hidden rounded-lg text-center font-sora font-medium uppercase min-[768px]:inline-flex min-[768px]:flex-col min-[768px]:items-center min-[768px]:justify-center transition-all duration-300 shrink-0 cursor-pointer"
                  style={{ 
                    color: theme === 'light' ? 'var(--theme-text-secondary)' : 'var(--theme-text-secondary)',
                    background: 'rgba(201, 35, 55, 0.08)',
                    border: '1px solid rgba(201, 35, 55, 0.5)',
                    boxShadow: 'none',
                    minWidth: '130px',
                    width: '130px',
                    maxWidth: '130px',
                    height: '48px',
                    minHeight: '48px',
                    padding: '10px 12px',
                    alignSelf: 'center',
                    flexShrink: 0,
                    fontSize: '0.54rem',
                    lineHeight: '1.4',
                    letterSpacing: '0.03em',
                    marginLeft: '12px',
                    gap: '3px'
                  }}
                >
                  <span className="block whitespace-nowrap" style={{ fontSize: 'inherit' }}>{getCtaLines(lang)[0]}</span>
                  <span className="block whitespace-nowrap" style={{ fontSize: 'inherit' }}>{getCtaLines(lang)[1]}</span>
                </Link>

            {/* Botão Hambúrguer - mobile OU quando menu trepa na logo */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex flex-col gap-1.5 p-2 touch-manipulation shrink-0 ${menuOverlaps ? 'min-[768px]:flex' : 'min-[768px]:hidden'}`}
              aria-label="Menu"
              style={{ 
                minWidth: '44px', 
                minHeight: '44px', 
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <span 
                className={`h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#2a2825' : '#d3cec3'
                }}
              ></span>
              <span 
                className={`h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#2a2825' : '#d3cec3'
                }}
              ></span>
              <span 
                className={`h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#2a2825' : '#d3cec3'
                }}
              ></span>
            </button>
          </div>
        </div>
        
        {/* Linha fina de separação */}
        <div className="h-px w-full bg-white/10"></div>

        {/* Menu Mobile - mobile (< 768px) OU quando menu trepa na logo */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${menuOverlaps ? 'min-[768px]:block' : 'min-[768px]:hidden'} ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="border-t backdrop-blur-md" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-overlay)' }}>
            <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'home' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'home' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navHome')}
              </Link>
              <Link
                to="/what"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'what' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'what' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navWhat')}
              </Link>
              <Link
                to="/work"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'work' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'work' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navWork')}
              </Link>
              <Link
                to="/studio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'studio' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'studio' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navStudio')}
              </Link>
              <Link
                to="/research"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'research' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'research' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navResearch')}
              </Link>
              <Link
                to="/academy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'academy' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'academy' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navAcademy')}
              </Link>
              
              {/* Idiomas e CTA no menu mobile */}
              <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t space-y-2 sm:space-y-3" style={{ borderColor: 'var(--theme-border)' }}>
                <div className="flex items-center justify-center font-sora text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.14em]" style={{ color: 'var(--theme-text-secondary)' }}>
                  {/* Grupo Canadá - EN e FR muito juntos */}
                  <span className="inline-flex items-center gap-0" style={{ alignItems: 'center' }}>
                    <img src="/flag-ca.svg" alt="Canada" className="h-3.5 w-auto rounded-[2px] opacity-90 mr-0.5" style={{ display: 'block' }} />
                    <button
                      onClick={() => setLang('en')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'en' ? '#c92337' : 'var(--theme-text-muted)', 
                        opacity: lang === 'en' ? 1 : 0.7,
                        minWidth: '28px',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      EN
                    </button>
                    <span className="mx-[2px] opacity-70 text-[0.6rem] sm:text-[0.65rem] flex items-center" style={{ lineHeight: '1', display: 'inline-flex' }}>●</span>
                    <button
                      onClick={() => setLang('fr')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'fr' ? '#c92337' : 'var(--theme-text-muted)', 
                        opacity: lang === 'fr' ? 1 : 0.7,
                        minWidth: '28px',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      FR
                    </button>
                  </span>
                  {/* Separador entre grupos com espaços proporcionais */}
                  <span className="opacity-50 mx-3.5 text-[0.8rem] font-normal flex items-center" style={{ lineHeight: '1' }}>|</span>
                  {/* Grupo Brasil - PT e ES muito juntos */}
                  <span className="inline-flex items-center gap-0" style={{ alignItems: 'center' }}>
                    <img src="/flag-br.svg" alt="Brasil" className="h-3.5 w-auto rounded-[2px] opacity-90 mr-1" style={{ display: 'block' }} />
                    <button
                      onClick={() => setLang('pt')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'pt' ? '#c92337' : 'var(--theme-text-muted)', 
                        opacity: lang === 'pt' ? 1 : 0.7,
                        minWidth: '28px',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      PT
                    </button>
                    <span className="mx-[2px] opacity-70 text-[0.6rem] sm:text-[0.65rem] flex items-center" style={{ lineHeight: '1', display: 'inline-flex' }}>●</span>
                    <button
                      onClick={() => setLang('es')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'es' ? '#c92337' : 'var(--theme-text-muted)', 
                        opacity: lang === 'es' ? 1 : 0.7,
                        minWidth: '28px',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ES
                    </button>
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsWizardOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center text-[0.65rem] sm:text-[0.7rem] font-sora font-medium uppercase leading-[1.25] tracking-[0.14em] transition-all duration-300 touch-manipulation cursor-pointer"
                  style={{ 
                    color: theme === 'light' ? 'var(--theme-text-secondary)' : 'var(--theme-text-secondary)',
                    background: 'rgba(201, 35, 55, 0.08)',
                    border: '1px solid rgba(201, 35, 55, 0.5)',
                    boxShadow: 'none',
                    minHeight: '44px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="block">{getCtaLines(lang)[0]}</span>
                  <span className="block">{getCtaLines(lang)[1]}</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>

      {/* FOOTER - Escuro em ambos os temas para consistência */}
      <footer 
        className="relative mt-20"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(180deg, #0a0e18 0%, #060a12 100%)'
            : 'linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)'
        }}
      >
        {/* Linha vermelha de separação */}
        {/* Linha divisória superior - Estilo 2025: fina com glow sutil */}
        <div 
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #c92337 20%, #c92337 80%, transparent 100%)',
            boxShadow: '0 0 8px rgba(201, 35, 55, 0.4), 0 0 16px rgba(201, 35, 55, 0.2)'
          }}
        ></div>
        
        <div className="mx-auto max-w-5xl w-full px-3 sm:px-4 min-[768px]:px-6 md:px-8 lg:px-10 py-10 sm:py-12 min-[768px]:py-14 md:py-16 lg:py-20" style={{ overflow: 'visible' }}>
          {/* Grid principal */}
          <div className="grid grid-cols-1 gap-6 sm:gap-7 min-[768px]:grid-cols-12 min-[768px]:gap-3 md:gap-4 lg:gap-8" style={{ width: '100%', maxWidth: '100%' }}>
            
            {/* Logo e descrição - Footer sempre escuro, textos sempre claros */}
            <div className="min-[768px]:col-span-3 md:col-span-3 lg:col-span-4 mb-6 min-[768px]:mb-0" style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}>
              <Link to="/" className="inline-block mb-3 sm:mb-4">
                <img 
                  src="/logo-topo-site.svg"
                  alt="Azimut" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] leading-relaxed max-w-xs text-slate-400">
                {t(lang, 'heroLead').split('–')[0].trim()}
              </p>
            </div>

            {/* Navegação */}
            <div className="min-[768px]:col-span-2 md:col-span-2 mb-6 min-[768px]:mb-0" style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}>
              <h4 className="font-sora text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.2em] mb-2.5 sm:mb-3 md:mb-4 text-white">
                {lang === 'en' ? 'Navigate' : lang === 'fr' ? 'Navigation' : lang === 'es' ? 'Navegar' : 'Navegação'}
              </h4>
              <nav className="flex flex-col gap-1.5 sm:gap-2 min-[768px]:gap-1.5 md:gap-2.5">
                <Link to="/" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'navHome')}</Link>
                <Link to="/what" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'navWhat')}</Link>
                <Link to="/work" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'navWork')}</Link>
                <Link to="/studio" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'navStudio')}</Link>
              </nav>
            </div>

            {/* Mais links */}
            <div className="min-[768px]:col-span-2 md:col-span-2 mb-6 min-[768px]:mb-0" style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}>
              <h4 className="font-sora text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.2em] mb-2.5 sm:mb-3 md:mb-4 text-white">
                {lang === 'en' ? 'Explore' : lang === 'fr' ? 'Explorer' : lang === 'es' ? 'Explorar' : 'Explorar'}
              </h4>
              <nav className="flex flex-col gap-1.5 sm:gap-2 min-[768px]:gap-1.5 md:gap-2.5">
                <Link to="/research" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'navResearch')}</Link>
                <Link to="/academy" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'navAcademy')}</Link>
                <Link to="/contact" className="text-[0.7rem] sm:text-[0.75rem] min-[768px]:text-[0.72rem] md:text-[0.82rem] text-slate-300 transition-colors hover:text-azimut-red">{t(lang, 'ctaLabel')}</Link>
              </nav>
            </div>

            {/* Contato e Social */}
            <div className="min-[768px]:col-span-5 md:col-span-5 lg:col-span-5" style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}>
              <h4 className="font-sora text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.2em] mb-2.5 sm:mb-3 md:mb-4 text-white">
                {lang === 'en' ? 'Connect' : lang === 'fr' ? 'Contact' : lang === 'es' ? 'Contacto' : 'Contato'}
              </h4>
              
              {/* Email */}
              <a 
                href="mailto:contato@azimutimmersive.com" 
                className="inline-flex items-start gap-1.5 sm:gap-2 text-[0.75rem] sm:text-[0.78rem] min-[768px]:text-[0.72rem] md:text-[0.85rem] text-slate-300 hover:text-azimut-red transition-colors mb-2.5 sm:mb-3 md:mb-4"
                style={{ wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'nowrap' }}
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="whitespace-nowrap">contato@azimutimmersive.com</span>
              </a>

              {/* Cidades */}
              <p className="text-[0.75rem] sm:text-[0.76rem] min-[768px]:text-[0.78rem] mb-4 sm:mb-5 text-slate-500" style={{ overflowWrap: 'break-word' }}>
                {t(lang, 'cities')}
              </p>

              {/* Redes Sociais - Sempre cinza escuro no footer escuro */}
              <div className="grid grid-cols-3 min-[768px]:grid-cols-5 gap-2 min-[768px]:gap-2 md:gap-2.5" style={{ overflow: 'visible', maxWidth: 'fit-content' }}>
                {/* YouTube */}
                <a 
                  href="https://youtube.com/@azimutart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all duration-300 hover:bg-[#FF0000]/15 hover:text-[#FF0000]"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 transition-colors duration-300 group-hover:text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com/azimut.art" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all duration-300 hover:bg-[#E4405F]/15 hover:text-[#E4405F]"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 transition-colors duration-300 group-hover:text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/company/azimut-art" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all duration-300 hover:bg-[#0A66C2]/15 hover:text-[#0A66C2]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 transition-colors duration-300 group-hover:text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Vimeo */}
                <a 
                  href="https://vimeo.com/azimutart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all duration-300 hover:bg-[#1AB7EA]/15 hover:text-[#1AB7EA]"
                  aria-label="Vimeo"
                >
                  <svg className="w-4 h-4 transition-colors duration-300 group-hover:text-[#1AB7EA]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                  </svg>
                </a>

                {/* Behance */}
                <a 
                  href="https://behance.net/azimutart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all duration-300 hover:bg-[#1769FF]/15 hover:text-[#1769FF]"
                  aria-label="Behance"
                >
                  <svg className="w-4 h-4 transition-colors duration-300 group-hover:text-[#1769FF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.64c.56 0 1.01-.13 1.36-.397.35-.27.52-.678.52-1.22 0-.3-.06-.55-.165-.76-.115-.21-.27-.378-.465-.503-.2-.128-.42-.22-.665-.275-.25-.057-.51-.085-.785-.085H3.262v3.24h3.283zm.18 5.507c.305 0 .59-.03.876-.092.29-.06.548-.165.763-.3.21-.138.38-.323.507-.56.13-.238.19-.53.19-.9 0-.74-.2-1.27-.61-1.593-.41-.32-.948-.48-1.608-.48H3.262v3.93h3.463v-.005zm10.89-9.143h5.37v1.31h-5.37V6.004zm2.648 11.033c.57.56 1.39.84 2.453.84.75 0 1.397-.19 1.943-.574.545-.39.89-.8 1.017-1.254h3.37c-.545 1.67-1.39 2.9-2.535 3.69-1.145.79-2.527 1.18-4.15 1.18-1.125 0-2.14-.18-3.04-.55-.905-.37-1.68-.89-2.312-1.56-.637-.67-1.125-1.47-1.478-2.4-.35-.93-.522-1.95-.522-3.06 0-1.07.18-2.07.535-2.99.36-.92.86-1.71 1.5-2.39.64-.68 1.4-1.21 2.29-1.59.89-.38 1.87-.57 2.94-.57 1.2 0 2.25.23 3.15.7.9.47 1.64 1.09 2.22 1.87.59.79 1.02 1.69 1.29 2.7.28 1.01.37 2.07.28 3.18H18.49c.05 1.09.435 1.96 1.005 2.52l.18.04zm4.32-7.43c-.468-.47-1.19-.71-2.15-.71-.64 0-1.166.12-1.59.36-.42.24-.755.53-1.003.88-.248.35-.42.72-.518 1.11-.1.39-.158.74-.18 1.04h6.1c-.12-1.18-.47-2.2-1.158-2.68h-.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
              {/* Copyright */}
              <p className="text-[0.7rem] sm:text-[0.75rem] text-slate-500 break-words min-[768px]:break-normal" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {t(lang, 'footer').replace('{year}', String(new Date().getFullYear()))}
              </p>
              
              {/* Links legais */}
              <div className="flex items-center gap-3 sm:gap-4 text-[0.68rem] sm:text-[0.72rem] text-slate-500 shrink-0">
                <a href="#" className="hover:text-azimut-red transition-colors whitespace-nowrap">
                  {lang === 'en' ? 'Privacy' : lang === 'fr' ? 'Confidentialité' : lang === 'es' ? 'Privacidad' : 'Privacidade'}
                </a>
                <span className="opacity-50">•</span>
                <a href="#" className="hover:text-azimut-red transition-colors whitespace-nowrap">
                  {lang === 'en' ? 'Terms' : lang === 'fr' ? 'Conditions' : lang === 'es' ? 'Términos' : 'Termos'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Budget Wizard Modal */}
      <BudgetWizardModal
        lang={lang}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={async (profile) => {
          // Enviar lead para API/Kabbam
          try {
            const { submitLead } = await import('../api/leads')
            const lead = await submitLead(profile)
            
            console.log('📊 LEAD CAPTURADO:', lead)
            
            // TODO: Integrar com Kabbam/CRM
            // await fetch('/api/leads', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ ...lead, integration: 'kabbam' })
            // })
            
            // Feedback ao usuário
            if (lead.priority === 'high') {
              alert(
                lang === 'pt' 
                  ? '✅ Lead de alta prioridade capturado! Entraremos em contato em breve.'
                  : lang === 'es'
                  ? '✅ Lead de alta prioridad capturado! Nos pondremos en contacto pronto.'
                  : '✅ High priority lead captured! We\'ll contact you soon.'
              )
            } else {
              alert(
                lang === 'pt'
                  ? '✅ Obrigado! Recebemos seu brief e entraremos em contato em breve.'
                  : lang === 'es'
                  ? '✅ ¡Gracias! Hemos recibido tu brief y nos pondremos en contacto pronto.'
                  : '✅ Thank you! We received your brief and will contact you soon.'
              )
            }
          } catch (error) {
            console.error('Erro ao enviar lead:', error)
            alert(
              lang === 'pt'
                ? 'Erro ao enviar. Por favor, tente novamente ou entre em contato diretamente.'
                : lang === 'es'
                ? 'Error al enviar. Por favor, inténtalo de nuevo o contáctanos directamente.'
                : 'Error sending. Please try again or contact us directly.'
            )
          }
          setIsWizardOpen(false)
        }}
      />
    </div>
  )
}

export default Layout



