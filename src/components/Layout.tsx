import React, { useState, useMemo, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import { useLanguageRoute } from '../hooks/useLanguageRoute'
import LangLink from './LangLink'
import ThemeToggle from './ThemeToggle'
import BudgetWizardModal from './BudgetWizardModal'
import SkipLink from './SkipLink'
import NavDropdown from './NavDropdown'
import CookieBanner from './CookieBanner'
import DevToolsButton from './DevToolsButton'
import ClaudeAssistant from './ClaudeAssistant'
// Breadcrumbs removido - cada página tem seu próprio breadcrumb
import ScrollToTopButton from './ScrollToTopButton'
// 🆕 UX PREMIUM - Componentes opcionais (podem ser removidos se não funcionar)
import Breadcrumbs from './Breadcrumbs'
import SearchModal from './SearchModal'
import SEOGlobal from './SEOGlobal' // SEO Global Schemas
import SchemaOrganization from './SchemaOrganization'
import SchemaBreadcrumbList from './SchemaBreadcrumbList'
import GoogleSearchConsoleVerification from './GoogleSearchConsoleVerification'
import { type UserProfile } from './BudgetWizard'
import { trackCTA, trackLanguageChange } from '../utils/analytics'
import { useUserTracking } from '../hooks/useUserTracking'
import { logger } from '@/utils/logger'
// throttle removido - usando requestAnimationFrame diretamente

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
  const navigate = useNavigate()
  // ✅ TRACKING ROBUSTO - Nunca causa erro #310
  // Controlado via flag TRACKING_ENABLED no hook
  const { trackInteraction } = useUserTracking()
  const { changeLang } = useLanguageRoute()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  
  // 🆕 UX PREMIUM - Sistema de busca (opcional, pode remover se não funcionar)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  // 🆕 Atalho de teclado Ctrl+K / Cmd+K para busca
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K (Windows/Linux) ou Cmd+K (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      // ESC para fechar
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])
  
  // 🆕 Detectar scroll para compactar header
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Otimizado: throttle no scroll para melhor performance
  // CORREÇÃO: throttle criado uma vez e reutilizado
  React.useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY
          setIsScrolled(scroll > 50) // Compacta após 50px de scroll
          ticking = false
        })
        ticking = true
      }
    }
    
    // Verificar posição inicial
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // 🆕 DETECÇÃO DINÂMICA - 5 ESTADOS DE RESPONSIVIDADE
  // Estado 1: >1400px = Menu desktop com estrela + texto completo + idiomas inline
  // Estado 2: 1100-1400px = Menu desktop compacto com estrela + "azimut" + idiomas inline
  // Estado 3: 800-1100px = Hamburger + estrela + "azimut" + idiomas inline
  // Estado 4: 550-800px = Hamburger + estrela + "azimut" + ÍCONE idiomas
  // Estado 5: <550px = Hamburger + só estrela + ÍCONE idiomas
  
  const [headerState, setHeaderState] = useState<'full' | 'compact' | 'hamburger-langs' | 'hamburger-compact' | 'hamburger-minimal'>(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth
      if (w >= 1400) return 'full'
      if (w >= 1100) return 'compact'
      if (w >= 900) return 'hamburger-langs' // idiomas inline só acima de 900px
      if (w >= 450) return 'hamburger-compact' // estrela + azimut + ícone idiomas
      return 'hamburger-minimal' // estrela + ícone idiomas
    }
    return 'full'
  })
  
  // Estado do dropdown de idiomas (para mobile)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  
  // Compatibilidade com código existente
  const isMobile = headerState === 'hamburger-langs' || headerState === 'hamburger-compact' || headerState === 'hamburger-minimal'
  const isCompactMode = headerState === 'compact'
  
  // Mostrar idiomas inline (bandeiras + texto) ou como ícone?
  const showLanguagesInline = headerState === 'full' || headerState === 'compact' || headerState === 'hamburger-langs'
  const showLanguageIcon = headerState === 'hamburger-compact' || headerState === 'hamburger-minimal'
  
  // Mostrar texto ao lado da estrela?
  const showLogoText = headerState === 'full' || headerState === 'compact' || headerState === 'hamburger-langs' || headerState === 'hamburger-compact'
  
  // Compatibilidade - sempre mostrar área de idiomas (inline ou ícone)
  const showLanguagesInHeader = true
  
  // Detectar estado do header baseado na largura
  React.useEffect(() => {
    const checkHeaderState = () => {
      const w = window.innerWidth
      
      if (w >= 1400) {
        setHeaderState('full')
      } else if (w >= 1100) {
        setHeaderState('compact')
      } else if (w >= 900) {
        setHeaderState('hamburger-langs')
      } else if (w >= 450) {
        setHeaderState('hamburger-compact')
      } else {
        setHeaderState('hamburger-minimal')
      }
    }
    
    checkHeaderState()
    window.addEventListener('resize', checkHeaderState)
    
    return () => window.removeEventListener('resize', checkHeaderState)
  }, [])
  
  // Fechar menu mobile ao mudar para desktop
  React.useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobile])
  
  // Padding dinâmico baseado em grupos de viewport
  const [containerPadding, setContainerPadding] = useState({ left: '4px', right: '4px' })
  
  // Refs para medir sobreposição (mantidos para compatibilidade)
  const logoRef = React.useRef<HTMLAnchorElement>(null)
  const navRef = React.useRef<HTMLElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Atualizar padding baseado no tamanho da tela
  React.useEffect(() => {
    const updatePadding = () => {
      const windowWidth = window.innerWidth
      let paddingValue: string
      
      if (windowWidth < 360) {
        paddingValue = '8px'   // Mínimo seguro para telas muito pequenas
      } else if (windowWidth < 640) {
        paddingValue = '12px'  // Mobile confortável
      } else if (windowWidth < 768) {
        paddingValue = '16px'  // Tablet pequeno
      } else if (windowWidth < 1024) {
        paddingValue = '20px'  // Tablet grande
      } else {
        paddingValue = '24px'  // Desktop
      }
      setContainerPadding({ left: paddingValue, right: paddingValue })
    }
    
    updatePadding()
    window.addEventListener('resize', updatePadding)
    
    return () => window.removeEventListener('resize', updatePadding)
  }, [])

  // Determinar página ativa baseado na rota
  const getActiveRoute = () => {
    // Remover prefixo de idioma (/pt, /en, /fr, /es)
    const path = location.pathname.replace(/^\/(pt|en|fr|es)(\/|$)/, '/')
    
    if (path === '/' || path === '/home') return 'home'
    if (path === '/what') return 'what'
    if (path === '/work' || path.startsWith('/work/') || path.startsWith('/project/')) return 'work'
    if (path === '/press') return 'press'
    if (path === '/studio') return 'studio'
    if (path === '/academy') return 'academy'
    if (path === '/blog' || path.startsWith('/blog/')) return 'blog'
    if (path === '/experience-preview') return 'work' // Marca como ativo no menu "Projetos"
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
      {/* SEO Global - Schema JSON-LD para todas as páginas */}
      <SEOGlobal lang={lang} />
      
      {/* Skip to content - Accessibility */}
      <SkipLink />
      
      {/* HEADER - Glassmorphism 2026 - FIXED (não some ao rolar!) */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out" 
        style={{ 
          backgroundColor: isScrolled 
            ? (theme === 'dark' 
                ? 'rgba(6, 10, 18, 0.98)'      // Dark: mais escuro (#060a12)
                : 'rgba(30, 28, 26, 0.98)')    // Light: COR MAIS ESCURA DO RODAPÉ! (#1e1c1a)
            : (theme === 'dark' 
                ? 'rgba(6, 10, 18, 0.85)'      // Dark: mais escuro transparente
                : 'rgba(30, 28, 26, 0.85)'),   // Light: COR MAIS ESCURA DO RODAPÉ transparente!
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(12px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(12px)',
          boxShadow: isScrolled 
            ? (theme === 'dark' 
                ? '0 2px 20px rgba(0, 0, 0, 0.3)' 
                : '0 2px 20px rgba(0, 0, 0, 0.2)') // Light: sombra mais forte
            : 'none',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)'
        }}
      >
        <div 
          ref={containerRef} 
          className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-0.5 sm:gap-1 sm:px-4 sm:gap-2 min-[768px]:px-6 min-[768px]:gap-3 md:gap-4 lg:gap-5 xl:gap-6 transition-all duration-300 relative" 
          style={{ 
            minHeight: isScrolled ? '52px' : '60px', // Compacto: 60px → 52px
            overflow: 'visible', 
            position: 'relative', 
            minWidth: 0, 
            maxWidth: '100%', 
            paddingLeft: containerPadding.left,
            paddingRight: containerPadding.right,
            boxSizing: 'border-box',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)' // Linha branca fina
          }}
        >
          {/* Linha vermelha SOBRE a linha branca - estilo rodapé */}
          <div 
            className="absolute left-0 right-0"
            style={{
              bottom: '-1px', // Sobrepõe a linha branca!
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #c92337 28%, #c92337 72%, transparent 100%)',
              boxShadow: '0 0 2px rgba(201, 35, 55, 0.2), 0 0 4px rgba(201, 35, 55, 0.1)',
              width: '100%',
              pointerEvents: 'none',
              zIndex: 10
            }}
          ></div>
          {/* ═══════════════════════════════════════════════════════════════
              🔒 LOGO + IDIOMAS - Reorganizado: Logo à esquerda, idiomas logo após
              ═══════════════════════════════════════════════════════════ */}
          {/* Container Logo + Idiomas (ESQUERDA) - ESPAÇAMENTO MELHORADO */}
          <div
            className="shrink-0 flex items-center"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              flexShrink: 0,
              gridColumn: '1',
              width: 'auto',
              padding: '0',
              gap: '0' // Gap controlado manualmente para mais controle
            }}
          >
            {/* Logo COMPOSTA: Estrela fixa + Texto ao lado */}
            {/* 
              Componentes separados:
              - logo-estrela-meno.svg (81x84) - estrela com raios
              - azimut-menu.svg (147x32) - texto "azimut"  
              - azimut-interactive.svg (348x92) - texto completo
              
              A estrela NUNCA muda de posição, só o texto faz transição
            */}
            <div 
              className="hover:opacity-90 touch-manipulation"
              style={{ 
                marginRight: showLanguagesInHeader ? '12px' : '0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LangLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {/* LOGO MOBILE (hamburger-compact e hamburger-minimal) - estrela com nome embaixo */}
                {(headerState === 'hamburger-compact' || headerState === 'hamburger-minimal') && (
                  <img
                    src={theme === 'dark' ? '/logo-mobile-escuro.svg' : '/logo-mobile-escuro.svg'}
                    alt="Azimut"
                    style={{ 
                      height: isScrolled ? '42px' : '50px',
                      width: 'auto',
                      display: 'block',
                      transition: 'height 0.3s ease',
                      flexShrink: 0,
                    }}
                    loading="eager"
                  />
                )}
                
                {/* LOGO DESKTOP - estrela + texto ao lado */}
                {(headerState === 'full' || headerState === 'compact' || headerState === 'hamburger-langs') && (
                  <>
                    {/* ESTRELA */}
                    <img
                      src="/SVG/logo-estrela-meno.svg"
                      alt=""
                      aria-hidden="true"
                      style={{ 
                        height: isScrolled ? '36px' : '42px',
                        width: 'auto',
                        display: 'block',
                        transition: 'height 0.3s ease',
                        flexShrink: 0,
                      }}
                      loading="eager"
                    />
                    
                    {/* TEXTO COMPLETO (>1400px) - "azimut + IMMERSIVE • INTERACTIVE..." */}
                    {headerState === 'full' && (
                      <img
                        src="/SVG/azimut-interactive.svg"
                        alt="Azimut – Immersive • Interactive • Cinematic Experiences"
                        style={{ 
                          height: isScrolled ? '36px' : '42px',
                          width: 'auto',
                          display: 'block',
                          transition: 'height 0.3s ease, opacity 0.3s ease',
                        }}
                        loading="eager"
                      />
                    )}
                    
                    {/* TEXTO MÉDIO - "azimut" */}
                    {(headerState === 'compact' || headerState === 'hamburger-langs') && (
                      <img
                        src="/SVG/azimut-menu.svg"
                        alt="Azimut"
                        style={{ 
                          height: isScrolled ? '20px' : '24px',
                          width: 'auto',
                          display: 'block',
                          transition: 'height 0.3s ease, opacity 0.3s ease',
                        }}
                        loading="eager"
                      />
                    )}
                  </>
                )}
              </LangLink>
            </div>

            {/* Idiomas INLINE - Aparecem em: full, compact, hamburger-langs */}
            {showLanguagesInline && (
              <div className="flex items-center shrink-0" style={{ alignItems: 'center', height: '100%', display: 'flex', gap: '0' }}>
                {/* Separador visual (pílula/linha) - COMPACTO */}
                <div className="h-5 w-px shrink-0" style={{ backgroundColor: 'var(--theme-border)', flexShrink: 0, alignSelf: 'center', marginRight: '10px', opacity: 0.4, borderRadius: '1px' }}></div>
                
                {/* Grupo Canadá - EN e FR */}
                <span className="flex items-center shrink-0" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '1px' }}>
                  <img src="/flag-ca.svg" alt="Canada" className="h-3.5 w-auto rounded-[2px] opacity-90 shrink-0" style={{ display: 'block', height: '14px', width: 'auto', maxHeight: '14px', maxWidth: '20px' }} />
                  <button
                    onClick={() => {
                      trackLanguageChange(lang, 'en')
                      changeLang('en')
                    }}
                    className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                    style={{ 
                      color: lang === 'en' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : '#a8b4c4'), 
                      opacity: 1,
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
                  <span className="shrink-0 font-sora" style={{ display: 'flex', alignItems: 'center', height: '100%', lineHeight: '1', fontSize: '0.5rem', transform: 'translateY(-1px)', color: '#c92337' }}>●</span>
                  <button
                    onClick={() => {
                      trackLanguageChange(lang, 'fr')
                      changeLang('fr')
                    }}
                    className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                    style={{ 
                      color: lang === 'fr' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : '#a8b4c4'), 
                      opacity: 1,
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
                {/* Separador entre grupos */}
                <span className="opacity-40 shrink-0 font-sora" style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: '5px', marginRight: '9px', lineHeight: '1', fontSize: '0.55rem' }}>|</span>
                {/* PT - Brasil */}
                <span className="flex items-center shrink-0" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '1px' }}>
                  <img src="/flag-br.svg" alt="Brasil" className="h-3.5 w-auto rounded-[2px] opacity-90 shrink-0" style={{ display: 'block', height: '14px', width: 'auto', maxHeight: '14px', maxWidth: '20px' }} />
                  <button
                    onClick={() => {
                      trackLanguageChange(lang, 'pt')
                      changeLang('pt')
                    }}
                    className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                    style={{ 
                      color: lang === 'pt' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : '#a8b4c4'), 
                      opacity: 1,
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
                </span>
                {/* Separador */}
                <span className="shrink-0 font-sora" style={{ display: 'flex', alignItems: 'center', height: '100%', lineHeight: '1', fontSize: '0.5rem', transform: 'translateY(-1px)', color: '#c92337', marginLeft: '4px', marginRight: '4px' }}>●</span>
                {/* ES - Espanha */}
                <span className="flex items-center shrink-0" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '1px' }}>
                  <img src="/flag-es.svg" alt="España" className="h-3.5 w-auto rounded-[2px] opacity-90 shrink-0" style={{ display: 'block', height: '14px', width: 'auto', maxHeight: '14px', maxWidth: '20px' }} />
                  <button
                    onClick={() => {
                      trackLanguageChange(lang, 'es')
                      changeLang('es')
                    }}
                    className="transition-all duration-200 touch-manipulation shrink-0 font-sora font-medium uppercase"
                    style={{ 
                      color: lang === 'es' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : '#a8b4c4'), 
                      opacity: 1,
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
            )}
            
            {/* ÍCONE DE IDIOMAS - Mobile (hamburger-compact e hamburger-minimal) */}
            {showLanguageIcon && (
              <div className="relative ml-0 min-[350px]:ml-1">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center justify-center gap-0.5 rounded transition-all duration-200 touch-manipulation"
                  style={{
                    height: '26px',
                    padding: '0 4px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                  }}
                  aria-label="Selecionar idioma"
                >
                  {/* Código do idioma apenas */}
                  <span 
                    className="font-sora font-semibold uppercase"
                    style={{ 
                      fontSize: '0.65rem', 
                      color: '#fff',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {lang.toUpperCase()}
                  </span>
                  {/* Setinha */}
                  <svg 
                    width="8" 
                    height="8" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="3"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                
                {/* Dropdown de idiomas */}
                {isLangDropdownOpen && (
                  <>
                    {/* Overlay para fechar */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLangDropdownOpen(false)}
                    />
                    <div 
                      className="absolute top-full left-0 mt-1 rounded-lg shadow-xl z-50 overflow-hidden"
                      style={{
                        background: theme === 'dark' ? 'rgba(20, 20, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`,
                        backdropFilter: 'blur(12px)',
                        minWidth: '120px',
                      }}
                    >
                      {/* EN */}
                      <button
                        onClick={() => { changeLang('en'); setIsLangDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 transition-colors"
                        style={{
                          background: lang === 'en' ? (theme === 'dark' ? 'rgba(201, 35, 55, 0.2)' : 'rgba(201, 35, 55, 0.1)') : 'transparent',
                          color: lang === 'en' ? '#c92337' : (theme === 'dark' ? '#fff' : '#333'),
                        }}
                      >
                        <img src="/flag-ca.svg" alt="" style={{ height: '12px', borderRadius: '2px' }} />
                        <span className="text-xs font-medium">English</span>
                      </button>
                      {/* FR */}
                      <button
                        onClick={() => { changeLang('fr'); setIsLangDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 transition-colors"
                        style={{
                          background: lang === 'fr' ? (theme === 'dark' ? 'rgba(201, 35, 55, 0.2)' : 'rgba(201, 35, 55, 0.1)') : 'transparent',
                          color: lang === 'fr' ? '#c92337' : (theme === 'dark' ? '#fff' : '#333'),
                        }}
                      >
                        <img src="/flag-ca.svg" alt="" style={{ height: '12px', borderRadius: '2px' }} />
                        <span className="text-xs font-medium">Français</span>
                      </button>
                      {/* PT */}
                      <button
                        onClick={() => { changeLang('pt'); setIsLangDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 transition-colors"
                        style={{
                          background: lang === 'pt' ? (theme === 'dark' ? 'rgba(201, 35, 55, 0.2)' : 'rgba(201, 35, 55, 0.1)') : 'transparent',
                          color: lang === 'pt' ? '#c92337' : (theme === 'dark' ? '#fff' : '#333'),
                        }}
                      >
                        <img src="/flag-br.svg" alt="" style={{ height: '12px', borderRadius: '2px' }} />
                        <span className="text-xs font-medium">Português</span>
                      </button>
                      {/* ES - bandeira da Espanha */}
                      <button
                        onClick={() => { changeLang('es'); setIsLangDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 transition-colors"
                        style={{
                          background: lang === 'es' ? (theme === 'dark' ? 'rgba(201, 35, 55, 0.2)' : 'rgba(201, 35, 55, 0.1)') : 'transparent',
                          color: lang === 'es' ? '#c92337' : (theme === 'dark' ? '#fff' : '#333'),
                        }}
                      >
                        <img src="/flag-es.svg" alt="" style={{ height: '12px', borderRadius: '2px' }} />
                        <span className="text-xs font-medium">Español</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Nav desktop - NO FLUXO NORMAL (não absoluto) - evita sobreposição */}
          {!isMobile && (
          <nav 
            ref={navRef}
            className="flex items-center justify-center font-sora font-medium uppercase" 
            style={{ 
              color: 'var(--theme-text-secondary)', 
              overflow: 'visible', 
              alignItems: 'center', 
              flexWrap: 'nowrap',
              gridColumn: '2', // Ocupa a coluna central do grid
              justifySelf: 'center',
              marginLeft: isCompactMode ? '8px' : '20px', // Menos margem em modo compacto
              gap: isCompactMode ? '2px' : '8px', // Gap menor em modo compacto
              fontSize: isCompactMode ? '0.48rem' : '0.52rem',
              letterSpacing: isCompactMode ? '0.02em' : '0.03em'
            }}
          >
            <LangLink to="/" 
              className="nav-link-glow relative whitespace-nowrap touch-manipulation shrink-0 transition-colors duration-200 font-sora font-semibold"
              onMouseEnter={() => setHoveredRoute('home')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0 4px', // Padding reduzido
                position: 'relative',
                color: activeRoute === 'home' 
                  ? (theme === 'light' ? '#ff5a6e' : '#c92337') // Light: vermelho vibrante! Dark: vermelho original
                  : (hoveredRoute === 'home' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-secondary)')), // Texto CLARO no light!
                textShadow: activeRoute === 'home' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined,
                lineHeight: '1'
              }}
            >
              <span>{t(lang, 'navHome')}</span>
              <span 
                className="absolute left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  bottom: '10px', // Mais perto do texto! (subiu ainda mais!)
                  width: shouldShowLine('home') ? '100%' : '0%',
                  opacity: shouldShowLine('home') ? 1 : 0
                }}
              ></span>
            </LangLink>
            {/* Soluções com submenu */}
            <NavDropdown
              label={t(lang, 'navWhat')}
              mainHref="/what"
              items={[
                { label: t(lang, 'navSolutionsAll'), href: '/what', description: t(lang, 'navSolutionsAllDesc') },
                { label: t(lang, 'navSolutionsCulture'), href: '/what?filter=culture', description: t(lang, 'navSolutionsCultureDesc') },
                { label: t(lang, 'navSolutionsBrands'), href: '/what?filter=brands', description: t(lang, 'navSolutionsBrandsDesc') },
                { label: t(lang, 'navSolutionsAv'), href: '/what?filter=production', description: t(lang, 'navSolutionsAvDesc') },
                { label: t(lang, 'navSolutionsTech'), href: '/what?filter=technology', description: t(lang, 'navSolutionsTechDesc') },
                { label: t(lang, 'navSolutionsEdu'), href: '/what?filter=education', description: t(lang, 'navSolutionsEduDesc') }
              ]}
              lang={lang}
              theme={theme}
              isActive={activeRoute === 'what'}
              onMouseEnter={() => setHoveredRoute('what')}
              onMouseLeave={() => setHoveredRoute(null)}
              hovered={hoveredRoute === 'what'}
            />
            {/* Projetos com submenu */}
            <NavDropdown
              label={t(lang, 'navWork')}
              mainHref="/work"
              items={[
                { label: t(lang, 'navWorkAll'), href: '/work', description: t(lang, 'navWorkAllDesc') },
                { label: t(lang, 'navWorkMuseums'), href: '/work?type=museum', description: t(lang, 'navWorkMuseumsDesc') },
                { label: t(lang, 'navWorkFestivals'), href: '/work?type=festival', description: t(lang, 'navWorkFestivalsDesc') },
                { label: t(lang, 'navWorkBrands'), href: '/work?type=brand', description: t(lang, 'navWorkBrandsDesc') },
                { label: t(lang, 'navWorkVr'), href: '/work?tag=vr', description: t(lang, 'navWorkVrDesc') },
                { label: t(lang, 'navWorkWeb3'), href: '/experience-preview', description: t(lang, 'navWorkWeb3Desc') }
              ]}
              lang={lang}
              theme={theme}
              isActive={activeRoute === 'work'}
              onMouseEnter={() => setHoveredRoute('work')}
              onMouseLeave={() => setHoveredRoute(null)}
              hovered={hoveredRoute === 'work'}
            />
            {/* Studio com submenu */}
            <NavDropdown
              label={t(lang, 'navStudio')}
              mainHref="/studio"
              items={[
                { label: t(lang, 'navStudioOverview'), href: '/studio', description: t(lang, 'navStudioOverviewDesc') },
                { label: t(lang, 'navStudioUnique'), href: '/studio/diferenciais', description: t(lang, 'navStudioUniqueDesc') },
                { label: t(lang, 'navStudioTeam'), href: '/studio/equipe', description: t(lang, 'navStudioTeamDesc') },
                { label: t(lang, 'navStudioCredentials'), href: '/studio/credibilidade', description: t(lang, 'navStudioCredentialsDesc') }
              ]}
              lang={lang}
              theme={theme}
              isActive={activeRoute === 'studio'}
              onMouseEnter={() => setHoveredRoute('studio')}
              onMouseLeave={() => setHoveredRoute(null)}
              hovered={hoveredRoute === 'studio'}
            />
            {/* Academy com submenu */}
            <NavDropdown
              label={t(lang, 'navAcademy')}
              mainHref="/academy"
              items={[
                { label: t(lang, 'navAcademyOverview'), href: '/academy', description: t(lang, 'navAcademyOverviewDesc') },
                { label: t(lang, 'navAcademyCourses'), href: '/academy/courses', description: t(lang, 'navAcademyCoursesDesc') },
                { label: t(lang, 'navAcademyCorporate'), href: '/academy/corporate', description: t(lang, 'navAcademyCorporateDesc') },
                { label: t(lang, 'navAcademyVancouver'), href: '/academy/vancouver', description: t(lang, 'navAcademyVancouverDesc') }
              ]}
              lang={lang}
              theme={theme}
              isActive={activeRoute === 'academy'}
              onMouseEnter={() => setHoveredRoute('academy')}
              onMouseLeave={() => setHoveredRoute(null)}
              hovered={hoveredRoute === 'academy'}
            />
            {/* Blog - Link simples */}
            <LangLink to="/blog" 
              className="nav-link-glow relative whitespace-nowrap touch-manipulation shrink-0 transition-colors duration-200 font-sora font-semibold"
              onMouseEnter={() => setHoveredRoute('blog')}
              onMouseLeave={() => setHoveredRoute(null)}
              style={{ 
                minHeight: '44px', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0 4px', // Padding reduzido
                marginRight: '0', // Sem margem extra
                position: 'relative',
                color: activeRoute === 'blog' 
                  ? (theme === 'light' ? '#ff5a6e' : '#c92337') // Light: vermelho vibrante! Dark: vermelho original
                  : (hoveredRoute === 'blog' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-secondary)')), // Texto CLARO no light!
                textShadow: activeRoute === 'blog' && theme === 'dark' ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' : undefined,
                lineHeight: '1'
              }}
            >
              <span>{t(lang, 'navBlog')}</span>
              <span 
                className="absolute left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
                style={{ 
                  bottom: '10px', // Mais perto do texto! (subiu ainda mais!)
                  width: shouldShowLine('blog') ? '100%' : '0%',
                  opacity: shouldShowLine('blog') ? 1 : 0
                }}
              ></span>
            </LangLink>
          </nav>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              CONTAINER DIREITO - Tema, Busca, CTA e WEB3 - COMPACTO
              ═══════════════════════════════════════════════════════════ */}
          {/* CONTAINER FIXO - Tema, Busca, CTA e WEB3 - COMPACTO */}
          <div className="flex items-center shrink-0" style={{ 
            flexShrink: 0, 
            justifySelf: 'end', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            height: '100%', 
            marginLeft: 'auto', 
            minWidth: 0, 
            maxWidth: '100%', 
            overflow: 'visible', 
            paddingRight: '0',
            gap: isCompactMode ? '6px' : '10px', // Gap ainda menor em modo compacto
            display: 'flex',
            flexDirection: 'row' // Garantir lado a lado
          }}>
            {/* Toggle de tema - ALINHADO */}
            <div className="touch-manipulation shrink-0 ml-1 min-[350px]:ml-2" style={{ 
              width: '36px', 
              minWidth: '36px', 
              height: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0
            }}>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
            
            {/* Botão de busca - COMPACTO */}
            <button
              onClick={() => {
                setIsSearchOpen(true)
                trackInteraction('search_open', 'header_search_button')
              }}
              className="flex items-center justify-center p-2 rounded-lg transition-all duration-200 touch-manipulation shrink-0"
              style={{ 
                width: '36px', 
                height: '36px',
                minWidth: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'light' ? '#f5f5f5' : 'var(--theme-text-secondary)',
                position: 'relative',
                margin: '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme === 'light' ? '#ff5a6e' : '#c92337'
                e.currentTarget.style.background = theme === 'dark' ? 'rgba(201, 35, 55, 0.15)' : 'rgba(255, 90, 110, 0.15)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme === 'light' ? '#f5f5f5' : 'var(--theme-text-secondary)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label={t(lang, 'navSearchLabel')}
              title={t(lang, 'navSearchTitle')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Botões CTA - DESKTOP: COMPACTO */}
                {!isMobile && (
                <div className="flex items-center shrink-0" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: isCompactMode ? '6px' : '10px', // Gap ainda menor em modo compacto
                  height: '100%',
                  alignSelf: 'center',
                  flexDirection: 'row'
                }}>
                  {/* Botão CTA Principal - Desktop/Tablet: Texto compacto */}
                  <LangLink to="/contact"
                    onClick={() => {
                      trackCTA('header', 'Start Project')
                      trackInteraction('cta_click', 'header_start_project')
                    }}
                    className="rounded-lg text-center font-sora font-bold uppercase inline-flex flex-col items-center justify-center transition-all duration-300 shrink-0 cursor-pointer hover:scale-105 hover:shadow-[0_4px_12px_rgba(201,35,55,0.3)]"
                    style={{ 
                      color: theme === 'light' ? '#f5f5f5' : 'var(--theme-text-secondary)',
                      background: theme === 'dark' 
                        ? 'rgba(201, 35, 55, 0.12)' 
                        : 'rgba(201, 35, 55, 0.15)',
                      border: '1px solid rgba(201, 35, 55, 0.7)',
                      boxShadow: theme === 'dark' 
                        ? '0 2px 8px rgba(201, 35, 55, 0.2)' 
                        : '0 2px 8px rgba(201, 35, 55, 0.15)',
                      minWidth: isCompactMode ? '80px' : '95px',
                      width: isCompactMode ? '80px' : '95px',
                      maxWidth: isCompactMode ? '80px' : '95px',
                      height: isCompactMode ? '34px' : '38px',
                      minHeight: isCompactMode ? '34px' : '38px',
                      padding: isCompactMode ? '4px 6px' : '6px 8px',
                      flexShrink: 0,
                      fontSize: isCompactMode ? '0.5rem' : '0.6rem',
                      lineHeight: '1.2',
                      letterSpacing: '0.04em',
                      gap: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="block min-[360px]:whitespace-nowrap text-center" style={{ fontSize: 'inherit', fontWeight: '700' }}>{getCtaLines(lang)[0]}</span>
                    <span className="block min-[360px]:whitespace-nowrap text-center" style={{ fontSize: 'inherit', fontWeight: '700' }}>{getCtaLines(lang)[1]}</span>
                  </LangLink>

                  {/* Botão Web3 - ÍCONE GRANDE E TEXTO LADO A LADO */}
                  <LangLink 
                    to={`/${lang}/experience-preview`}
                    onClick={() => {
                      trackCTA('header', 'Web3 Preview')
                      trackInteraction('cta_click', 'header_web3_preview')
                    }}
                    className="group flex flex-row items-center justify-center"
                    style={{ 
                      gap: isCompactMode ? '4px' : '6px',
                      color: '#ffffff', // SEMPRE branco (fundo é roxo escuro)
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(34, 197, 94, 0.4) 100%)',
                      border: '2px solid rgba(139, 92, 246, 0.9)',
                      boxShadow: '0 3px 12px rgba(139, 92, 246, 0.5)',
                      borderRadius: '10px',
                      minWidth: isCompactMode ? '75px' : '90px',
                      width: 'auto',
                      height: isCompactMode ? '34px' : '38px',
                      minHeight: isCompactMode ? '34px' : '38px',
                      maxHeight: isCompactMode ? '34px' : '38px',
                      padding: isCompactMode ? '4px 8px' : '6px 12px',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textDecoration: 'none',
                      zIndex: 1000,
                      position: 'relative',
                      overflow: 'hidden',
                      margin: '0',
                      alignSelf: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(139, 92, 246, 0.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = '0 3px 12px rgba(139, 92, 246, 0.5)'
                    }}
                  >
                    {/* Ícone SVG Web3 - GRANDE */}
                    <img 
                      src="/web-3-black-icon.svg" 
                      alt="" 
                      style={{ 
                        width: '26px', 
                        height: '26px', 
                        position: 'relative', 
                        zIndex: 1,
                        filter: 'brightness(0) invert(1)', // SEMPRE branco
                        flexShrink: 0
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.7rem',
                      fontWeight: '800', 
                      whiteSpace: 'nowrap', 
                      position: 'relative', 
                      zIndex: 1, 
                      letterSpacing: '0.08em',
                      lineHeight: '1',
                      color: '#ffffff', // SEMPRE branco
                      textTransform: 'uppercase'
                    }}>
                      WEB3
                    </span>
                  </LangLink>
                </div>
                )}

                {/* Botões CTA - Mobile (<640px): Ícones compactos */}
                {isMobile && (
                <div className="flex items-center gap-2">
                  <LangLink to="/contact"
                    onClick={() => {
                      trackCTA('header', 'Start Project Mobile')
                      trackInteraction('cta_click', 'header_start_project_mobile')
                    }}
                    className="flex items-center justify-center rounded-lg font-sora font-bold transition-all duration-300 shrink-0 cursor-pointer hover:scale-105 hover:shadow-[0_4px_12px_rgba(201,35,55,0.3)] touch-manipulation"
                    style={{ 
                      color: '#f5f5f5',
                      background: theme === 'dark' 
                        ? 'rgba(201, 35, 55, 0.15)' 
                        : 'rgba(201, 35, 55, 0.12)',
                      border: '2px solid rgba(201, 35, 55, 0.7)',
                      boxShadow: '0 2px 8px rgba(201, 35, 55, 0.2)',
                      minWidth: '42px',
                      width: '42px',
                      height: '42px',
                      padding: '0',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '100%', 
                      height: '100%',
                      fontSize: '1.8rem',
                      fontWeight: '300',
                      lineHeight: '1',
                      marginTop: '-2px' // Ajuste fino para centralização visual
                    }}>+</span>
                  </LangLink>
                <LangLink 
                  to={`/${lang}/experience-preview`}
                  onClick={() => {
                    trackCTA('header', 'Web3 Preview Mobile')
                    trackInteraction('cta_click', 'header_web3_preview_mobile')
                  }}
                  className="group flex items-center justify-center"
                  style={{ 
                    color: '#ffffff', // SEMPRE branco
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(34, 197, 94, 0.4) 100%)',
                    border: '2px solid rgba(139, 92, 246, 0.9)',
                    boxShadow: '0 3px 12px rgba(139, 92, 246, 0.5)',
                    borderRadius: '10px',
                    minWidth: '42px',
                    width: '42px',
                    height: '42px',
                    padding: '0',
                    flexShrink: 0,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    zIndex: 1000,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 3px 12px rgba(139, 92, 246, 0.5)'
                  }}
                  aria-label="Web3 Preview"
                >
                  {/* Ícone SVG Web3 Mobile - GRANDE e BRANCO */}
                  <img 
                    src="/web-3-black-icon.svg" 
                    alt="Web3" 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      display: 'block', 
                      position: 'relative', 
                      zIndex: 1,
                      filter: 'brightness(0) invert(1)', // SEMPRE branco
                      transition: 'all 0.3s ease'
                    }}
                  />
                </LangLink>
                </div>
                )}

            {/* Botão Hambúrguer - Aparece APENAS em mobile (< 640px) */}
            {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col gap-1.5 touch-manipulation shrink-0"
              aria-label="Menu"
              style={{ 
                minWidth: '44px', 
                minHeight: '44px', 
                width: '44px',
                height: '44px',
                maxWidth: '44px',
                maxHeight: '44px',
                justifyContent: 'center',
                alignItems: 'center',
                // REMOVIDO display: 'flex' - deixar classe CSS controlar (hidden/flex)
                flexShrink: 0,
                zIndex: 10,
                position: 'relative',
                marginLeft: '2px', // Mínimo espaço do CTA
                marginRight: '0',
                padding: '10px 6px', // Padding interno reduzido
                boxSizing: 'border-box',
                // Garantir que não corta em nenhum iPhone
                flexBasis: '44px',
                overflow: 'visible'
              }}
            >
              <span 
                className={`h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#d3cec3' : '#d3cec3'
                }}
              ></span>
              <span 
                className={`h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#d3cec3' : '#d3cec3'
                }}
              ></span>
              <span 
                className={`h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#d3cec3' : '#d3cec3'
                }}
              ></span>
            </button>
            )}
          </div>
        </div>
        
        {/* Linha fina de separação */}
        <div className="h-px w-full bg-white/10"></div>

        {/* Menu Mobile - Aparece APENAS em mobile (< 640px) */}
        {isMobile && (
        <div className={`block overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="border-t backdrop-blur-md" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-overlay)' }}>
            <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 space-y-1">
              <LangLink to="/"
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
              </LangLink>
              <LangLink to="/what"
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
              </LangLink>
              <LangLink to="/work"
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
              </LangLink>
              <LangLink to="/studio"
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
              </LangLink>
              <LangLink to="/academy"
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
              </LangLink>
              <LangLink to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'blog' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'blog' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navBlog')}
              </LangLink>
              <LangLink to="/press"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-3 sm:px-4 font-sora text-[0.7rem] sm:text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors rounded-lg touch-manipulation"
                style={{ 
                  color: activeRoute === 'press' ? '#c92337' : 'var(--theme-text-secondary)',
                  backgroundColor: activeRoute === 'press' ? 'rgba(201, 35, 55, 0.1)' : 'transparent',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {t(lang, 'navPress')}
              </LangLink>
              
              {/* Idiomas e CTA no menu mobile */}
              <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t space-y-2 sm:space-y-3" style={{ borderColor: 'var(--theme-border)' }}>
                <div className="flex items-center justify-center font-sora text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.14em]" style={{ color: 'var(--theme-text-secondary)' }}>
                  {/* Grupo Canadá - EN e FR muito juntos */}
                  <span className="inline-flex items-center gap-0" style={{ alignItems: 'center' }}>
                    <img src="/flag-ca.svg" alt="Canada" className="h-3.5 w-auto rounded-[2px] opacity-90 mr-0.5" style={{ display: 'block', height: '14px', width: 'auto', maxHeight: '14px', maxWidth: '20px' }} />
                    <button
                      onClick={() => changeLang('en')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'en' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-muted)'), 
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
                      onClick={() => changeLang('fr')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'fr' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-muted)'), 
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
                  {/* PT - Brasil */}
                  <span className="inline-flex items-center gap-0" style={{ alignItems: 'center' }}>
                    <img src="/flag-br.svg" alt="Brasil" className="h-3.5 w-auto rounded-[2px] opacity-90 mr-1" style={{ display: 'block', height: '14px', width: 'auto', maxHeight: '14px', maxWidth: '20px' }} />
                    <button
                      onClick={() => changeLang('pt')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'pt' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-muted)'), 
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
                  </span>
                  {/* Separador */}
                  <span className="mx-[2px] opacity-70 text-[0.6rem] sm:text-[0.65rem] flex items-center" style={{ lineHeight: '1', display: 'inline-flex', color: '#c92337' }}>●</span>
                  {/* ES - Espanha */}
                  <span className="inline-flex items-center gap-0" style={{ alignItems: 'center' }}>
                    <img src="/flag-es.svg" alt="España" className="h-3.5 w-auto rounded-[2px] opacity-90 mr-1" style={{ display: 'block', height: '14px', width: 'auto', maxHeight: '14px', maxWidth: '20px' }} />
                    <button
                      onClick={() => changeLang('es')}
                      className="transition-all duration-200 touch-manipulation"
                      style={{ 
                        color: lang === 'es' ? (theme === 'light' ? '#ff5a6e' : '#c92337') : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-muted)'), 
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
        )}
      </header>

      {/* Conteúdo da página - PADDING TOP para compensar header fixo */}
      <main 
        id="main-content" 
        role="main" 
        tabIndex={-1}
        style={{ 
          paddingTop: isScrolled ? '72px' : '80px',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* 🆕 UX PREMIUM - Breadcrumbs visuais 
            EXCEÇÕES: Páginas com submenu interno (academy, studio, work, what) têm seu próprio breadcrumb */}
        {location.pathname !== `/${lang}` && 
         location.pathname !== '/' && 
         !location.pathname.includes('/academy') &&
         !location.pathname.includes('/studio') &&
         !location.pathname.includes('/work') &&
         !location.pathname.includes('/what') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Breadcrumbs lang={lang} theme={theme} />
          </div>
        )}
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
          paddingRight: 'env(safe-area-inset-right, 0px)',
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}
      >
        {/* Container principal */}
        <div className="mx-auto w-full px-4" style={{ position: 'relative', boxSizing: 'border-box', maxWidth: '1280px' }}>
        
        <div className="py-4 sm:py-5 min-[768px]:py-6" style={{ width: '100%', boxSizing: 'border-box', overflowX: 'visible' }}>
          
          {/* ═══════════════════════════════════════════════════════════════════
              FOOTER MOBILE - Layout otimizado para telas pequenas (< 768px)
          ═══════════════════════════════════════════════════════════════════ */}
          <div className="min-[768px]:hidden">
            {/* Logo + Tagline centralizados */}
            <div className="text-center mb-6">
              <LangLink to="/" className="inline-block mb-2.5">
                <img 
                  src="/logo-topo-site.svg"
                  alt="Azimut" 
                  className="opacity-90 h-12 w-auto mx-auto"
                />
              </LangLink>
              <p className="text-[0.75rem] text-slate-400 leading-relaxed max-w-xs mx-auto">
                {t(lang, 'heroLead').split('–')[0].trim()}
              </p>
              {/* Cidades */}
              <div className="flex items-center justify-center gap-1.5 mt-2 text-slate-500 flex-wrap">
                <div className="flex items-center gap-0.5">
                  <img src="/flag-ca.svg" alt="Canada" style={{ height: '10px', width: 'auto' }} className="rounded-[1px]" />
                  <span className="text-[0.55rem]">Vancouver</span>
                </div>
                <span className="text-[0.5rem] opacity-50">•</span>
                <div className="flex items-center gap-0.5">
                  <img src="/flag-br.svg" alt="Brasil" style={{ height: '10px', width: 'auto' }} className="rounded-[1px]" />
                  <span className="text-[0.6rem]">Rio</span>
                  <span className="text-[0.5rem] opacity-40">·</span>
                  <span className="text-[0.55rem]">Floripa</span>
                </div>
              </div>
            </div>
            
            {/* Grid de Links 3 colunas */}
            <div className="grid grid-cols-3 gap-2 mb-5 text-center">
              <nav className="flex flex-col gap-1">
                <h4 className="font-sora font-bold uppercase tracking-tight text-white mb-0.5 text-[0.32rem] min-[350px]:text-[0.38rem]" style={{ lineHeight: '1', whiteSpace: 'nowrap' }}>
                  <span className="hidden min-[350px]:inline">{t(lang, 'navFooterNav')}</span>
                  <span className="inline min-[350px]:hidden">Nav</span>
                </h4>
                {/* Botão de Busca Mobile */}
                <button
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMobileMenuOpen(false)
                    trackInteraction('search_open', 'mobile_menu_search')
                  }}
                  className="flex items-center justify-center gap-1 text-[0.6rem] text-slate-400 hover:text-azimut-red transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{t(lang, 'navSearchLabel')}</span>
                </button>
                <LangLink to="/" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navHome')}</LangLink>
                <LangLink to="/what" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navWhat')}</LangLink>
                <LangLink to="/work" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navWork')}</LangLink>
                <LangLink to="/studio" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navStudio')}</LangLink>
                <LangLink to="/studio/equipe" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">
                  {lang === 'en' ? 'Team' : lang === 'fr' ? 'Équipe' : lang === 'es' ? 'Equipo' : 'Equipe'}
                </LangLink>
              </nav>
              <nav className="flex flex-col gap-1">
                <h4 className="font-sora font-bold uppercase tracking-tight text-white text-[0.32rem] min-[350px]:text-[0.38rem]" style={{ lineHeight: '1', marginBottom: '0.1rem', whiteSpace: 'nowrap' }}>
                  <span className="hidden min-[350px]:inline">{t(lang, 'navFooterEdu')}</span>
                  <span className="inline min-[350px]:hidden">Edu</span>
                </h4>
                <LangLink to="/academy" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navAcademy')}</LangLink>
                <div className="flex flex-col gap-0.5">
                  <LangLink to="/academy/courses" className="text-[0.55rem] text-slate-500 hover:text-azimut-red ml-2">└ {t(lang, 'navFooterCourses')}</LangLink>
                  <LangLink to="/academy/workshops" className="text-[0.55rem] text-slate-500 hover:text-azimut-red ml-2">└ Workshops</LangLink>
                  <LangLink to="/academy/corporate" className="text-[0.55rem] text-slate-500 hover:text-azimut-red ml-2">└ Corporate</LangLink>
                  <LangLink to="/academy/vancouver" className="text-[0.55rem] text-slate-500 hover:text-azimut-red ml-2">└ Vancouver</LangLink>
                </div>
              </nav>
              <nav className="flex flex-col gap-1">
                <h4 className="font-sora font-bold uppercase tracking-tight text-white mb-0.5 text-[0.32rem] min-[350px]:text-[0.38rem]" style={{ lineHeight: '1', whiteSpace: 'nowrap' }}>
                  <span className="hidden min-[350px]:inline">{t(lang, 'navFooterStart')}</span>
                  <span className="inline min-[350px]:hidden">Start</span>
                </h4>
                <LangLink to="/what" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navWhat')}</LangLink>
                <LangLink to="/contact" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navFooterContact')}</LangLink>
                <LangLink to="/press" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navPress')}</LangLink>
                <LangLink to="/work/review" className="text-[0.6rem] text-slate-400 hover:text-azimut-red">{t(lang, 'navFooterReview')}</LangLink>
                <LangLink to="/blog" className="text-[0.7rem] text-slate-400 hover:text-azimut-red">Blog</LangLink>
              </nav>
            </div>
            
            {/* Botão CTA Centralizado */}
            <div className="flex justify-center mb-5">
              <LangLink to="/contact" 
                className="flex flex-col items-center justify-center rounded-xl border px-6 py-3 text-[0.75rem] font-medium transition-all"
                style={{ 
                  color: '#ffffff',
                  borderColor: 'rgba(201, 35, 55, 0.5)',
                  backgroundColor: 'rgba(201, 35, 55, 0.15)',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  gap: '2px',
                  minHeight: '44px'
                }}
              >
                <span>{getCtaLines(lang)[0]}</span>
                <span>{getCtaLines(lang)[1]}</span>
              </LangLink>
            </div>
            
            {/* Ícones Sociais Centralizados */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <a href="https://youtube.com/@azimutart" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors" aria-label="YouTube">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://instagram.com/azimut.art" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com/company/azimut-art" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://vimeo.com/azimutart" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-cyan-500 transition-colors" aria-label="Vimeo">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>
              </a>
              <a href="https://behance.net/azimutart" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors" aria-label="Behance">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.64c.56 0 1.01-.13 1.36-.397.35-.27.52-.678.52-1.22 0-.3-.06-.55-.165-.76-.115-.21-.27-.378-.465-.503-.2-.128-.42-.22-.665-.275-.25-.057-.51-.085-.785-.085H3.262v3.24h3.283zm.18 5.507c.305 0 .59-.03.876-.092.29-.06.548-.165.763-.3.21-.138.38-.323.507-.56.13-.238.19-.53.19-.9 0-.74-.2-1.27-.61-1.593-.41-.32-.948-.48-1.608-.48H3.262v3.93h3.463v-.005zm10.89-9.143h5.37v1.31h-5.37V6.004zm2.648 11.033c.57.56 1.39.84 2.453.84.75 0 1.397-.19 1.943-.574.545-.39.89-.8 1.017-1.254h3.37c-.545 1.67-1.39 2.9-2.535 3.69-1.145.79-2.527 1.18-4.15 1.18-1.125 0-2.14-.18-3.04-.55-.905-.37-1.68-.89-2.312-1.56-.637-.67-1.125-1.47-1.478-2.4-.35-.93-.522-1.95-.522-3.06 0-1.07.18-2.07.535-2.99.36-.92.86-1.71 1.5-2.39.64-.68 1.4-1.21 2.29-1.59.89-.38 1.87-.57 2.94-.57 1.2 0 2.25.23 3.15.7.9.47 1.64 1.09 2.22 1.87.59.79 1.02 1.69 1.29 2.7.28 1.01.37 2.07.28 3.18H18.49c.05 1.09.435 1.96 1.005 2.52l.18.04z"/></svg>
              </a>
            </div>
            
            {/* Contato Compacto - alinhado à newsletter (max-w-xs), email + WhatsApp full width */}
            <div className="text-center mb-5 max-w-xs mx-auto">
              <h4 className="font-sora text-[0.6rem] font-semibold uppercase tracking-wider text-white mb-2">
                {t(lang, 'navFooterContact')}
              </h4>
              <div className="flex flex-col gap-2 w-full">
                <a 
                  href="mailto:contact@azimutimmersive.com" 
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 min-h-[44px] transition-all duration-300 hover:opacity-90 text-[0.75rem]"
                  style={{ 
                    color: '#94a3b8',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[0.65rem] min-[350px]:text-[0.75rem]">contact@azimutimmersive.com</span>
                </a>
                <a 
                  href="https://wa.me/5521999999999?text=Olá!%20Vim%20pelo%20site." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 min-h-[44px] text-[0.75rem] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                  style={{ 
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.22) 0%, rgba(37, 211, 102, 0.1) 100%)' 
                      : 'linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(37, 211, 102, 0.08) 100%)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(37, 211, 102, 0.55)' : 'rgba(37, 211, 102, 0.5)'}`,
                    color: theme === 'dark' ? '#86efac' : '#ffffff',
                    boxShadow: theme === 'dark' ? '0 4px 12px rgba(37, 211, 102, 0.2)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (theme === 'dark') {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 211, 102, 0.3) 0%, rgba(37, 211, 102, 0.15) 100%)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)'
                    } else {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 211, 102, 0.25) 0%, rgba(37, 211, 102, 0.15) 100%)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.2)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (theme === 'dark') {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 211, 102, 0.22) 0%, rgba(37, 211, 102, 0.1) 100%)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.2)'
                    } else {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(37, 211, 102, 0.08) 100%)'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            
            {/* Newsletter Compacta */}
            <div className="text-center mb-6">
              <h4 className="font-sora text-[0.6rem] font-semibold uppercase tracking-wider text-white mb-2">Newsletter</h4>
              <p className="text-[0.65rem] text-slate-500 mb-2">
                {t(lang, 'navGetUpdates')}
              </p>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
                  if (!emailInput?.value) return
                  if (submitBtn) submitBtn.disabled = true
                  try {
                    const backofficeUrl = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'
                    await fetch(`${backofficeUrl}/api/public/newsletter`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: emailInput.value, lang, source: 'footer-mobile' }),
                    })
                    emailInput.value = ''
                    emailInput.placeholder = '✅ Inscrito!'
                    setTimeout(() => { emailInput.placeholder = t(lang, 'navNewsletterPlaceholder') }, 3000)
                  } catch { 
                    emailInput.placeholder = '✅ Obrigado!'
                    setTimeout(() => { emailInput.placeholder = t(lang, 'navNewsletterPlaceholder') }, 3000)
                  }
                  if (submitBtn) submitBtn.disabled = false
                }}
                className="flex gap-2 max-w-xs mx-auto"
              >
                <input
                  type="email"
                  placeholder={t(lang, 'navNewsletterPlaceholder')}
                  required
                  className="footer-newsletter-email flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[0.75rem] focus:outline-none focus:border-azimut-red/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-[0.75rem] font-medium"
                  style={{ background: 'rgba(201, 35, 55, 0.2)', border: '1px solid rgba(201, 35, 55, 0.6)', color: '#ffffff' }}
                >
                  {t(lang, 'navSubscribe')}
                </button>
              </form>
            </div>
            
            {/* Copyright Mobile */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-[0.6rem] text-slate-500 mb-2">
                {t(lang, 'footer').replace('{year}', String(new Date().getFullYear()))}
              </p>
              <div className="flex items-center justify-center gap-3 text-[0.6rem] text-slate-500">
                <LangLink to="/privacy" className="hover:text-azimut-red">{t(lang, 'navPrivacy')}</LangLink>
                <span className="opacity-50">•</span>
                <LangLink to="/terms" className="hover:text-azimut-red">{t(lang, 'navTerms')}</LangLink>
              </div>
            </div>
          </div>
          
          {/* ═══════════════════════════════════════════════════════════════════
              FOOTER DESKTOP - Layout original para telas >= 768px
          ═══════════════════════════════════════════════════════════════════ */}
          <div className="hidden min-[768px]:grid grid-cols-12" style={{ width: '100%', alignItems: 'stretch', maxWidth: '100%', gap: '0.75rem' }}>
            
            {/* 1. BRANDING - Logo e Tagline (3 colunas) */}
            <div className="min-[900px]:col-span-3 max-[899px]:col-span-3 mb-3 min-[768px]:mb-0" style={{ width: '100%', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
              <div className="mb-2" style={{ width: '100%', maxWidth: '260px' }}>
                <LangLink to="/" style={{ display: 'block', width: '100%' }}>
                  <img 
                    src="/logo-topo-site.svg"
                    alt="Azimut" 
                    className="opacity-90 hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      height: 'auto',
                      width: '100%',
                      maxWidth: '100%',
                      display: 'block',
                      objectFit: 'contain'
                    }}
                  />
                </LangLink>
              </div>
              <p className="text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] leading-relaxed" style={{ 
                color: '#94a3b8', 
                textAlign: 'left', 
                width: '100%', 
                maxWidth: '260px',
                wordSpacing: '0.01em',
                lineHeight: '1.6',
                marginTop: '0.75rem',
                marginBottom: 'auto'
              }}>
                {t(lang, 'heroLead').split('–')[0].trim()}
              </p>
              
              {/* Cidades - Alinhadas com a largura da logo (260px) */}
              <div className="flex items-center justify-between flex-wrap gap-1" style={{ color: '#64748b', marginTop: 'auto', paddingTop: '0.75rem', width: '100%', maxWidth: '260px' }}>
                {/* Canadá - Vancouver */}
                <div className="flex items-center gap-0.5">
                  <img src="/flag-ca.svg" alt="Canada" className="rounded-[2px] opacity-90" style={{ display: 'block', height: '12px', width: 'auto' }} />
                  <span className="text-[0.65rem] sm:text-[0.7rem]">Vancouver</span>
                </div>
                <span className="opacity-40 text-[0.5rem]">•</span>
                {/* Brasil - Rio e Florianópolis juntos */}
                <div className="flex items-center gap-0.5">
                  <img src="/flag-br.svg" alt="Brasil" className="rounded-[2px] opacity-90" style={{ display: 'block', height: '12px', width: 'auto' }} />
                  <span className="text-[0.65rem] sm:text-[0.7rem]">Rio</span>
                  <span className="opacity-40 text-[0.5rem]">·</span>
                  <span className="text-[0.6rem] sm:text-[0.65rem]">Floripa</span>
                </div>
              </div>
            </div>

            {/* 2. NAVEGAÇÃO - 3 colunas de links + CTA/WhatsApp/Social abaixo */}
            <div className="min-[900px]:col-span-5 max-[899px]:col-span-6 mb-3 min-[768px]:mb-0" style={{ width: '100%', paddingLeft: '0.5rem', paddingRight: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Grid das 3 colunas de navegação */}
              <div className="grid grid-cols-3 gap-x-4 md:gap-x-5" style={{ flex: '1' }}>
                {/* Coluna 1: Navegação Principal */}
                <nav className="flex flex-col gap-1 sm:gap-1.5" style={{ justifyContent: 'flex-start' }}>
                  <h4 className="font-sora text-[0.6rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] mb-1.5 sm:mb-2 text-white">
                    {t(lang, 'navFooterNav')}
                  </h4>
                  <LangLink to="/" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors font-medium" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>{t(lang, 'navHome')}</LangLink>
                  <LangLink to="/what" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors font-medium" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>{t(lang, 'navWhat')}</LangLink>
                  <LangLink to="/work" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors font-medium" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>{t(lang, 'navWork')}</LangLink>
                  <LangLink to="/studio" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors font-medium" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>{t(lang, 'navStudio')}</LangLink>
                  <LangLink to="/studio/equipe" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors font-medium" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                    {lang === 'en' ? 'Team' : lang === 'fr' ? 'Équipe' : lang === 'es' ? 'Equipo' : 'Equipe'}
                  </LangLink>
                </nav>

                {/* Coluna 2: Academy */}
                <nav className="flex flex-col gap-1 sm:gap-1.5" style={{ justifyContent: 'flex-start' }}>
                  <h4 className="font-sora text-[0.6rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white" style={{ lineHeight: '1.2', marginBottom: '0.2rem' }}>
                    {lang === 'en' ? 'Education' : lang === 'fr' ? 'Éducation' : lang === 'es' ? 'Educación' : 'Educação'}
                  </h4>
                  <LangLink to="/academy" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors hover:text-[#8B2332] font-medium" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                    {t(lang, 'navAcademy')}
                  </LangLink>
                  <div className="mt-0.5 flex flex-col gap-0.5" style={{ flexGrow: '1' }}>
                    <LangLink to="/academy/courses" className="text-[0.6rem] sm:text-[0.65rem] transition-colors hover:text-[#8B2332] ml-2" style={{ color: '#94a3b8' }}>└ {t(lang, 'navFooterCourses')}</LangLink>
                    <LangLink to="/academy/workshops" className="text-[0.6rem] sm:text-[0.65rem] transition-colors hover:text-[#8B2332] ml-2" style={{ color: '#94a3b8' }}>└ Workshops</LangLink>
                    <LangLink to="/academy/corporate" className="text-[0.6rem] sm:text-[0.65rem] transition-colors hover:text-[#8B2332] ml-2" style={{ color: '#94a3b8' }}>└ Corporate</LangLink>
                    <LangLink to="/academy/vancouver" className="text-[0.6rem] sm:text-[0.65rem] transition-colors hover:text-[#8B2332] ml-2" style={{ color: '#94a3b8' }}>
                      └ {t(lang, 'navFooterStudyVan')}
                    </LangLink>
                  </div>
                </nav>

                {/* Coluna 3: Começar */}
                <nav className="flex flex-col gap-1 sm:gap-1.5 h-full" style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <h4 className="font-sora text-[0.6rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] mb-1.5 sm:mb-2 text-white">
                    {t(lang, 'navFooterStart')}
                  </h4>
                  <div className="flex flex-col gap-1 sm:gap-1.5" style={{ flexGrow: '1' }}>
                    <LangLink to="/what" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                      {t(lang, 'navWhat')}
                    </LangLink>
                    <LangLink to="/contact" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                      {t(lang, 'navFooterContact')}
                    </LangLink>
                    <LangLink to="/press" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                      {t(lang, 'navPress')}
                    </LangLink>
                    <LangLink to="/work/review" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                      {t(lang, 'navFooterReview')}
                    </LangLink>
                    <LangLink to="/blog" className="text-[0.68rem] sm:text-[0.72rem] md:text-[0.75rem] transition-colors" style={{ color: '#cbd5e1' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8B2332'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                      Blog
                    </LangLink>
                  </div>
                </nav>
              </div>
              
              {/* Botão CTA + WhatsApp + Ícones Sociais - ALINHADOS COM AS 3 COLUNAS */}
              <div className="flex items-center justify-between pt-3 mt-3 relative" style={{ width: '100%' }}>
                {/* Linha separadora sutil com gradiente */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.08) 100%)'
                  }}
                />
                {/* CTA - alinhado com primeira coluna */}
                <LangLink to="/contact" 
                  className="flex flex-col items-center justify-center rounded-lg border px-2 sm:px-3 text-[0.55rem] sm:text-[0.6rem] font-medium transition-all"
                  style={{ 
                    color: '#ffffff',
                    borderColor: 'rgba(201, 35, 55, 0.4)',
                    backgroundColor: 'rgba(201, 35, 55, 0.12)',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    gap: '1px',
                    width: '130px',
                    height: '42px',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.12)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.4)'
                  }}
                >
                  <span className="block min-[360px]:whitespace-nowrap text-center" style={{ fontSize: 'inherit' }}>{getCtaLines(lang)[0]}</span>
                  <span className="block min-[360px]:whitespace-nowrap text-center" style={{ fontSize: 'inherit' }}>{getCtaLines(lang)[1]}</span>
                </LangLink>
                
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/5521999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20projetos%20da%20Azimut." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg px-2 sm:px-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.2) 0%, rgba(37, 211, 102, 0.1) 100%)' 
                      : 'linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(37, 211, 102, 0.08) 100%)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(37, 211, 102, 0.5)' : 'rgba(37, 211, 102, 0.4)'}`,
                    color: theme === 'dark' ? '#86efac' : '#25D366',
                    height: '42px',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.28) 0%, rgba(37, 211, 102, 0.16) 100%)'
                      : 'linear-gradient(135deg, rgba(37, 211, 102, 0.25) 0%, rgba(37, 211, 102, 0.15) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.7)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.2) 0%, rgba(37, 211, 102, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(37, 211, 102, 0.08) 100%)'
                    e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(37, 211, 102, 0.5)' : 'rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="font-semibold text-[0.58rem] sm:text-[0.62rem]">WhatsApp</span>
                </a>
                
                {/* Ícones Sociais - alinhados à direita */}
                <div className="flex items-center" style={{ gap: '0.4rem' }}>
                  <a href="https://youtube.com/@azimutart" target="_blank" rel="noopener noreferrer" className="social-icon-footer transition-all duration-300 hover:scale-110" aria-label="YouTube" style={{ opacity: 0.7 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#FF0000' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#ffffff' }}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#ffffff', transition: 'all 0.3s ease' }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://instagram.com/azimut.art" target="_blank" rel="noopener noreferrer" className="social-icon-footer transition-all duration-300 hover:scale-110" aria-label="Instagram" style={{ opacity: 0.7 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#E4405F' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#ffffff' }}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7" style={{ color: '#ffffff', transition: 'all 0.3s ease' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://linkedin.com/company/azimut-art" target="_blank" rel="noopener noreferrer" className="social-icon-footer transition-all duration-300 hover:scale-110" aria-label="LinkedIn" style={{ opacity: 0.7 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#0A66C2' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#ffffff' }}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7" style={{ color: '#ffffff', transition: 'all 0.3s ease' }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="https://vimeo.com/azimutart" target="_blank" rel="noopener noreferrer" className="social-icon-footer transition-all duration-300 hover:scale-110" aria-label="Vimeo" style={{ opacity: 0.7 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#1AB7EA' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#ffffff' }}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7" style={{ color: '#ffffff', transition: 'all 0.3s ease' }}><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>
                  </a>
                  <a href="https://behance.net/azimutart" target="_blank" rel="noopener noreferrer" className="social-icon-footer transition-all duration-300 hover:scale-110" aria-label="Behance" style={{ opacity: 0.7 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#1769FF' }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; const svg = e.currentTarget.querySelector('svg'); if (svg) (svg as SVGElement).style.color = '#ffffff' }}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7" style={{ color: '#ffffff', transition: 'all 0.3s ease' }}><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.64c.56 0 1.01-.13 1.36-.397.35-.27.52-.678.52-1.22 0-.3-.06-.55-.165-.76-.115-.21-.27-.378-.465-.503-.2-.128-.42-.22-.665-.275-.25-.057-.51-.085-.785-.085H3.262v3.24h3.283zm.18 5.507c.305 0 .59-.03.876-.092.29-.06.548-.165.763-.3.21-.138.38-.323.507-.56.13-.238.19-.53.19-.9 0-.74-.2-1.27-.61-1.593-.41-.32-.948-.48-1.608-.48H3.262v3.93h3.463v-.005zm10.89-9.143h5.37v1.31h-5.37V6.004zm2.648 11.033c.57.56 1.39.84 2.453.84.75 0 1.397-.19 1.943-.574.545-.39.89-.8 1.017-1.254h3.37c-.545 1.67-1.39 2.9-2.535 3.69-1.145.79-2.527 1.18-4.15 1.18-1.125 0-2.14-.18-3.04-.55-.905-.37-1.68-.89-2.312-1.56-.637-.67-1.125-1.47-1.478-2.4-.35-.93-.522-1.95-.522-3.06 0-1.07.18-2.07.535-2.99.36-.92.86-1.71 1.5-2.39.64-.68 1.4-1.21 2.29-1.59.89-.38 1.87-.57 2.94-.57 1.2 0 2.25.23 3.15.7.9.47 1.64 1.09 2.22 1.87.59.79 1.02 1.69 1.29 2.7.28 1.01.37 2.07.28 3.18H18.49c.05 1.09.435 1.96 1.005 2.52l.18.04zm4.32-7.43c-.468-.47-1.19-.71-2.15-.71-.64 0-1.166.12-1.59.36-.42.24-.755.53-1.003.88-.248.35-.42.72-.518 1.11-.1.39-.158.74-.18 1.04h6.1c-.12-1.18-.47-2.2-1.158-2.68h-.5z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* 3. NEWSLETTER + EMAIL DE CONTATO (4 colunas) */}
            <div className="min-[900px]:col-span-4 max-[899px]:col-span-12 mb-3 min-[768px]:mb-0" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem', paddingRight: '0.5rem' }}>
              
              {/* NEWSLETTER - Texto e formulário JUNTOS */}
              <div style={{ flexGrow: '0', width: '100%', maxWidth: '100%' }}>
                <h4 className="font-sora text-[0.72rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.15em] mb-2.5 sm:mb-3 text-white">
                  {t(lang, 'navNewsletter')}
                </h4>
                {/* Texto descritivo - JUNTO com o formulário */}
                <p className="text-[0.78rem] sm:text-[0.82rem] mb-2.5" style={{ color: '#94a3b8', lineHeight: '1.4', maxWidth: '100%' }}>
                  {lang === 'en' 
                    ? 'Stay updated with our latest projects and insights.' 
                    : lang === 'es'
                    ? 'Mantente al día con nuestros últimos proyectos.'
                    : 'Receba nossas novidades e projetos em primeira mão.'}
                </p>
                <form 
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
                  const email = emailInput?.value
                  
                  if (!email) return
                  
                  // Disable button during submit
                  if (submitBtn) {
                    submitBtn.disabled = true
                    submitBtn.textContent = t(lang, 'navSending')
                  }
                  
                  try {
                    const backofficeUrl = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'
                    const response = await fetch(`${backofficeUrl}/api/public/newsletter`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, lang, source: 'footer' }),
                    })
                    
                    const data = await response.json()
                    
                    if (data.success) {
                      // Success feedback
                      emailInput.value = ''
                      emailInput.placeholder = t(lang, 'navSubscribed')
                      emailInput.style.borderColor = 'rgba(34, 197, 94, 0.5)'
                      setTimeout(() => {
                        emailInput.placeholder = t(lang, 'navNewsletterPlaceholder')
                        emailInput.style.borderColor = ''
                      }, 3000)
                    } else {
                      throw new Error(data.error || 'Erro ao inscrever')
                    }
                  } catch (error) {
                    logger.warn('[Newsletter] API error, using fallback:', error)
                    // Fallback gracioso
                    emailInput.value = ''
                    emailInput.placeholder = t(lang, 'navThanks')
                    setTimeout(() => {
                      emailInput.placeholder = t(lang, 'navNewsletterPlaceholder')
                    }, 3000)
                  } finally {
                    // Re-enable button
                    if (submitBtn) {
                      submitBtn.disabled = false
                      submitBtn.textContent = t(lang, 'navSubscribe')
                    }
                  }
                }}
                className="flex flex-col gap-2"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}
              >
                <input
                  type="email"
                  placeholder={t(lang, 'navNewsletterPlaceholder')}
                  required
                  className="footer-newsletter-email w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[0.7rem] sm:text-[0.75rem] focus:outline-none focus:border-azimut-red/50 focus:bg-white/8 transition-colors"
                  style={{ height: '44px', width: '100%', boxSizing: 'border-box' }}
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg text-[0.7rem] sm:text-[0.8rem] font-medium transition-all duration-300"
                  style={{ 
                    background: 'rgba(201, 35, 55, 0.2)',
                    border: '1px solid rgba(201, 35, 55, 0.6)',
                    color: '#ffffff',
                    height: '44px',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.4)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.8)'
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(201, 35, 55, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.6)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {lang === 'en' ? 'Subscribe' : lang === 'es' ? 'Suscribir' : 'Inscrever'}
                </button>
              </form>
              
              {/* Entre em contato - título + email alinhado na base */}
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                <p className="text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.1em] mb-1.5" style={{ color: '#64748b' }}>
                  {t(lang, 'navGetInTouch')}
                </p>
                <a 
                  href="mailto:contact@azimutimmersive.com" 
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 transition-all duration-300 hover:opacity-90"
                  style={{ 
                    color: '#94a3b8',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: 'clamp(0.68rem, 2vw, 0.75rem)',
                    height: '40px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = '#cbd5e1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[0.65rem] min-[400px]:text-[0.75rem]">contact@azimutimmersive.com</span>
                </a>
              </div>
              </div>
            </div>
          </div>

          {/* Linha divisória - Legal (APENAS DESKTOP) - ESTILO SUPER PREMIUM */}
          <div className="hidden min-[768px]:block mt-4 sm:mt-5 pt-4 sm:pt-5 relative">
            {/* Linha vermelha gradiente premium */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(139, 35, 50, 0.6) 20%, rgba(201, 35, 55, 0.8) 50%, rgba(139, 35, 50, 0.6) 80%, transparent 100%)'
              }}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {/* Copyright - MAIOR E MAIS VISÍVEL */}
              <div className="flex items-center gap-2">
                <p className="text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem]" style={{ color: '#94a3b8', letterSpacing: '0.01em' }}>
                  © {new Date().getFullYear()} <span style={{ color: '#cbd5e1' }}>Azimut Projetos Audiovisuais Ltda.</span>
                  <span className="mx-2 opacity-50">·</span>
                  <span style={{ color: '#64748b' }}>
                    {t(lang, 'navBrazil')} 
                    <span className="mx-1.5" style={{ color: '#8B2332' }}>↔</span> 
                    {t(lang, 'navCanada')}
                  </span>
                </p>
              </div>
              
              {/* Links legais - COM DESTAQUE PREMIUM */}
              <div className="flex items-center gap-1 shrink-0">
                <LangLink 
                  to="/privacy" 
                  className="px-3 py-1.5 rounded-md text-[0.8rem] sm:text-[0.85rem] transition-all duration-300"
                  style={{ 
                    color: '#94a3b8',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.background = 'rgba(139, 35, 50, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(139, 35, 50, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  {t(lang, 'navPrivacyPolicy')}
                </LangLink>
                <span className="text-[0.7rem] opacity-30 mx-1">|</span>
                <LangLink 
                  to="/terms" 
                  className="px-3 py-1.5 rounded-md text-[0.8rem] sm:text-[0.85rem] transition-all duration-300"
                  style={{ 
                    color: '#94a3b8',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.background = 'rgba(139, 35, 50, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(139, 35, 50, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  {t(lang, 'navTermsOfUse')}
                </LangLink>
              </div>
            </div>
          </div>
        </div>
        </div>
      </footer>

      {/* Schema.org - Organization e BreadcrumbList */}
      <SchemaOrganization />
      <SchemaBreadcrumbList lang={lang} />
      
      {/* Google Search Console Verification */}
      <GoogleSearchConsoleVerification />

      {/* Budget Wizard Modal */}
      <BudgetWizardModal
        lang={lang}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={async (profile) => {
          // 1. Enviar lead para backoffice (API existente)
          try {
            const { submitLead } = await import('../api/leads')
            await submitLead(profile)
            
            // 2. Enviar notificação por email (API nova)
            try {
              await fetch('/api/notify-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: profile.organization || 'Sem nome',
                  email: 'não fornecido', // BudgetWizard não coleta email
                  phone: 'não fornecido',
                  formType: 'budget_wizard',
                  lang,
                  score: profile.budget === '200k-1M' || profile.budget === '1M+' ? 80 : 50,
                  project: profile.needs.join(', '),
                  budget: profile.budget,
                  timeline: profile.deadline,
                  message: `Localização: ${profile.location}\nPúblico: ${profile.audience}\nObjetivo: ${profile.objective}\nPrecisa financiamento: ${profile.needsFunding ? 'Sim' : 'Não'}`
                })
              })
            } catch (emailErr) {
              // Email notification failed (não crítico, silencioso em produção)
              if (process.env.NODE_ENV === 'development') {
                console.warn('Email notification failed (non-critical):', emailErr)
              }
            }
            
            // 3. Fechar modal
            setIsWizardOpen(false)
            
            // 4. Redirecionar para thank-you após 500ms
            setTimeout(() => {
              navigate(`/${lang}/thank-you`)
            }, 500)
            
          } catch (error) {
            // Erro ao enviar lead (manter em produção para debug)
            if (process.env.NODE_ENV === 'development') {
              console.error('Erro ao enviar lead:', error)
            }
            alert(
              lang === 'pt'
                ? 'Erro ao enviar. Por favor, tente novamente ou entre em contato diretamente.'
                : lang === 'es'
                ? 'Error al enviar. Por favor, inténtalo de nuevo o contáctanos directamente.'
                : 'Error sending. Please try again or contact us directly.'
            )
            setIsWizardOpen(false)
          }
        }}
      />

      {/* ✅ ETAPA 1: 🍪 Cookie Banner REATIVADO - Componente simples */}
      <CookieBanner lang={lang} />

      {/* ✅ ETAPA 3: 🤖 Claude AI Assistant REATIVADO - Tem fallbacks */}
      <ClaudeAssistant lang={lang} />

      {/* ⬆️ Scroll to Top Button */}
      <ScrollToTopButton />

      {/* 🔧 Dev Tools Button - Apenas em desenvolvimento */}
      {import.meta.env.DEV && <DevToolsButton />}

      {/* 🆕 UX PREMIUM - Sistema de busca (OPCIONAL - pode remover se não funcionar) */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        lang={lang}
        theme={theme}
      />
    </div>
  )
}

export default Layout









