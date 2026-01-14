import React, { useState, useEffect, useCallback } from 'react'
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
 * Componente de Navegação Interna - VERSÃO SIMPLIFICADA
 * 
 * ⚠️ Este componente NÃO tem sticky próprio!
 * O sticky é controlado pelo container pai na página.
 * 
 * Isso evita conflitos de posicionamento.
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

  // Sincronizar activeId com defaultActive
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

  // Função para scroll com offset calculado
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    
    console.log('🎯 scrollToElement:', elementId, element ? 'ENCONTRADO' : 'NÃO ENCONTRADO')
    
    if (!element) {
      console.error('❌ Elemento não encontrado:', elementId)
      return
    }

    // Scroll nativo com scroll-margin-top (já definido no CSS da section)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      
      // Navegação normal (URL com query string ou outra página)
      const fullPath = lang ? `/${lang}${item.href}` : getLangPath(item.href)
      navigate(fullPath)
    }
  }

  return (
    <nav 
      className={`flex flex-wrap gap-1 sm:gap-2 ${className}`}
      aria-label="Internal navigation"
    >
      {items.map((item) => {
        const isActive = activeId === item.id
        const isHovered = hoveredId === item.id
        const shouldShowLine = isActive || isHovered
        
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={`
              relative flex items-center gap-1.5 sm:gap-2 
              px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg
              font-sora text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.06em] sm:tracking-[0.08em]
              transition-all duration-300 ease-out
              whitespace-nowrap
            `}
            style={{
              color: isActive 
                ? 'var(--theme-accent-red)'
                : 'var(--theme-text-secondary)',
              backgroundColor: 'transparent',
              opacity: isActive ? 1 : 0.6
            }}
            onMouseEnter={(e) => {
              setHoveredId(item.id)
              if (!isActive) {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.color = 'var(--theme-accent-red)'
              }
            }}
            onMouseLeave={(e) => {
              setHoveredId(null)
              if (!isActive) {
                e.currentTarget.style.opacity = '0.6'
                e.currentTarget.style.color = 'var(--theme-text-secondary)'
              }
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && (
              <span 
                className="text-sm sm:text-base leading-none" 
                aria-hidden="true"
                style={{ opacity: isActive ? 1 : 0.7 }}
              >
                {item.icon}
              </span>
            )}
            
            <span className="relative">
              {item.label}
              {shouldShowLine && (
                <span 
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-azimut-red"
                  style={{ opacity: isActive ? 0.8 : 0.4 }}
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default InternalNavigation
