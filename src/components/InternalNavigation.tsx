import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguageRoute } from '../hooks/useLanguageRoute'
import type { Lang } from '../i18n'

interface NavItem {
  id: string
  label: string
  icon?: string
  href?: string
}

interface InternalNavigationProps {
  items: NavItem[]
  defaultActive?: string
  className?: string
  lang?: Lang
}

/**
 * Componente de Navegação Interna UNIVERSAL - VERSÃO 2.0
 * 
 * ✅ Sticky funciona em TODAS as páginas
 * ✅ Scroll para anchors calcula offset corretamente
 * ✅ Usa variáveis CSS globais (--header-height, --internal-nav-height)
 * ✅ Responsivo: mobile, tablet, desktop
 * 
 * Design System Azimut - Padrão Universal
 */
const InternalNavigation: React.FC<InternalNavigationProps> = ({ 
  items, 
  defaultActive,
  className = '',
  lang
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActive || items[0]?.id || '')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { getLangPath } = useLanguageRoute()
  const navRef = useRef<HTMLElement>(null)

  // 🆕 Sincronizar activeId com defaultActive quando prop mudar
  useEffect(() => {
    if (defaultActive) {
      setActiveId(defaultActive)
    }
  }, [defaultActive])

  // Detectar rota atual e ativar tab correspondente
  useEffect(() => {
    const pathname = location.pathname
    const search = location.search
    const hash = location.hash.replace('#', '')
    const cleanPath = pathname.replace(/^\/(pt|en|fr|es)/, '')
    
    // Se tem hash, ativar o item correspondente
    if (hash) {
      const hashItem = items.find(item => item.id === hash)
      if (hashItem) {
        setActiveId(hash)
        return
      }
    }
    
    // Verificar qual item corresponde à rota
    let foundMatch = false
    items.forEach(item => {
      if (item.href) {
        const [hrefPath, hrefQueryOrAnchor] = item.href.split(/[?#]/)
        const cleanHref = hrefPath.replace(/^\/(pt|en|fr|es)/, '')
        
        if (item.href.includes('?')) {
          const currentQuery = search.startsWith('?') ? search.substring(1) : search
          if (cleanPath === cleanHref && currentQuery === hrefQueryOrAnchor) {
            setActiveId(item.id)
            foundMatch = true
          }
        } else if (cleanPath === cleanHref || cleanPath.endsWith(`/${item.id}`)) {
          setActiveId(item.id)
          foundMatch = true
        }
      }
    })
    
    // Se não encontrou match, ativar primeiro item
    if (!foundMatch && !search && !hash) {
      const allItem = items.find(i => i.id === 'all')
      if (allItem) {
        setActiveId('all')
      } else if (items[0]) {
        setActiveId(items[0].id)
      }
    }
  }, [location.pathname, location.search, location.hash, items])

  // 🆕 Função robusta para scroll com offset calculado
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    // Calcular offset usando variáveis CSS
    const computedStyle = getComputedStyle(document.documentElement)
    const headerHeight = parseInt(computedStyle.getPropertyValue('--header-height')) || 80
    const navHeight = navRef.current?.offsetHeight || 52
    const margin = 20

    const elementTop = element.getBoundingClientRect().top + window.scrollY
    const targetScroll = elementTop - headerHeight - navHeight - margin

    window.scrollTo({ 
      top: Math.max(0, targetScroll), 
      behavior: 'smooth' 
    })
  }, [])

  const handleClick = (item: NavItem) => {
    setActiveId(item.id)
    
    if (item.href) {
      // Anchor na mesma página (#section)
      if (item.href.startsWith('#')) {
        const anchor = item.href.replace('#', '')
        scrollToElement(anchor)
        return
      }
      
      // Anchor em outra página ou mesma página com path
      if (item.href.includes('#')) {
        const [path, anchor] = item.href.split('#')
        const cleanPath = path || location.pathname.replace(/^\/(pt|en|fr|es)/, '')
        const currentPath = location.pathname.replace(/^\/(pt|en|fr|es)/, '')
        
        if (!cleanPath || cleanPath === currentPath) {
          scrollToElement(anchor)
          return
        }
      }
      
      // Navegação normal (com query string ou outra página)
      const fullPath = lang ? `/${lang}${item.href}` : getLangPath(item.href)
      navigate(fullPath)
      
      // Scroll suave para o topo após navegação
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav 
      ref={navRef}
      className={`mb-6 sm:mb-8 sticky z-40 backdrop-blur-xl transition-all duration-300 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8 ${className}`}
      style={{
        // ✅ Usa variável CSS para posicionamento responsivo
        top: 'var(--header-height)',
        backgroundColor: 'var(--theme-bg-sticky)',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        borderBottom: '2px solid rgba(201, 35, 55, 0.6)'
      }}
      aria-label="Internal navigation"
    >
      <div className="flex flex-wrap gap-2 -mb-px">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isHovered = hoveredId === item.id
          const shouldShowLine = isActive || isHovered
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`
                relative flex items-center gap-2 
                px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
                font-sora text-xs sm:text-sm font-medium uppercase tracking-[0.08em]
                transition-all duration-300 ease-out
              `}
              style={{
                color: isActive 
                  ? 'var(--theme-accent-red)'
                  : 'var(--theme-text-secondary)',
                backgroundColor: 'transparent',
                opacity: isActive ? 1 : 0.6,
                textShadow: 'none',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                setHoveredId(item.id)
                if (!isActive) {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.color = 'var(--theme-accent-red)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                setHoveredId(null)
                if (!isActive) {
                  e.currentTarget.style.opacity = '0.6'
                  e.currentTarget.style.color = 'var(--theme-text-secondary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="relative inline-flex items-center gap-2">
                {item.icon && (
                  <span 
                    className="text-base leading-none" 
                    aria-hidden="true"
                    style={{ opacity: isActive ? 1 : 0.7 }}
                  >
                    {item.icon}
                  </span>
                )}
                
                <span>{item.label}</span>
                
                {shouldShowLine && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-azimut-red transition-opacity duration-200"
                    style={{ opacity: isActive ? 0.6 : 0.4 }}
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default InternalNavigation
