import React, { useState, useEffect, useRef } from 'react'
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
 * Componente de Navegação Interna UNIVERSAL
 * 
 * Design System Azimut - Usado em TODAS as páginas para consistência
 * Padrão: Tabs com linha vermelha embaixo quando ativo
 * 
 * @example
 * <InternalNavigation
 *   items={[
 *     { id: 'overview', label: 'Overview', icon: '🏠' },
 *     { id: 'details', label: 'Details', icon: '📊' }
 *   ]}
 * />
 */
const InternalNavigation: React.FC<InternalNavigationProps> = ({ 
  items, 
  defaultActive,
  className = '',
  lang
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActive || items[0]?.id || '')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { getLangPath } = useLanguageRoute()
  const navRef = useRef<HTMLElement>(null)

  // 🆕 Detectar scroll para tornar o menu sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Menu fica sticky IMEDIATAMENTE após passar do hero (50px)
      setIsSticky(scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 🆕 Sincronizar activeId com defaultActive quando prop mudar (navegação via dropdown externo)
  useEffect(() => {
    if (defaultActive) {
      setActiveId(defaultActive)
    }
  }, [defaultActive])

  // Detectar rota atual e ativar tab correspondente (incluindo query strings e anchors)
  useEffect(() => {
    const pathname = location.pathname
    const search = location.search
    const hash = location.hash.replace('#', '')
    const cleanPath = pathname.replace(/^\/(pt|en|fr|es)/, '')
    
    // Se tem hash, tentar ativar o item correspondente
    if (hash) {
      const hashItem = items.find(item => item.id === hash)
      if (hashItem) {
        setActiveId(hash)
        return
      }
    }
    
    // Verificar qual item corresponde à rota (com query strings)
    let foundMatch = false
    items.forEach(item => {
      if (item.href) {
        // Separar path e query string/anchor do href
        const [hrefPath, hrefQueryOrAnchor] = item.href.split(/[?#]/)
        const cleanHref = hrefPath.replace(/^\/(pt|en|fr|es)/, '')
        
        // Match exato de path + query
        if (item.href.includes('?')) {
          const currentQuery = search.startsWith('?') ? search.substring(1) : search
          if (cleanPath === cleanHref && currentQuery === hrefQueryOrAnchor) {
            setActiveId(item.id)
            foundMatch = true
          }
        } 
        // Match de path simples
        else if (cleanPath === cleanHref || cleanPath.endsWith(`/${item.id}`)) {
          setActiveId(item.id)
          foundMatch = true
        }
      }
    })
    
    // Se não encontrou match e está na página principal (sem query/hash), ativar primeiro item ou 'all'
    if (!foundMatch && !search && !hash) {
      const allItem = items.find(i => i.id === 'all')
      if (allItem) {
        setActiveId('all')
      } else if (items[0]) {
        setActiveId(items[0].id)
      }
    }
  }, [location.pathname, location.search, location.hash, items])

  const handleClick = (item: NavItem) => {
    setActiveId(item.id)
    
    // Se tem href, processar navegação
    if (item.href) {
      // Verificar se é um anchor (#section)
      if (item.href.includes('#')) {
        const [path, anchor] = item.href.split('#')
        const cleanPath = path || location.pathname.replace(/^\/(pt|en|fr|es)/, '')
        const currentPath = location.pathname.replace(/^\/(pt|en|fr|es)/, '')
        
        // Se está na mesma página, apenas fazer scroll para o anchor
        if (!cleanPath || cleanPath === currentPath) {
          const element = document.getElementById(anchor)
          if (element) {
            // Calcular posição: header (60px) + submenu (~56px) + margem (20px)
            const elementTop = element.getBoundingClientRect().top + window.scrollY
            const headerHeight = 60 // Altura do header fixo
            const navHeight = navRef.current ? navRef.current.offsetHeight : 56
            const margin = 20 // Margem extra
            const targetScroll = elementTop - headerHeight - navHeight - margin
            
            window.scrollTo({ 
              top: targetScroll > 0 ? targetScroll : 0, 
              behavior: 'smooth' 
            })
          }
          return // Não navegar, apenas fazer scroll
        }
      }
      
      // Navegação normal (com ou sem query string)
      const fullPath = lang ? `/${lang}${item.href}` : getLangPath(item.href)
      navigate(fullPath)
      
      // Scroll para posição do submenu (para ficar sticky no topo)
      setTimeout(() => {
        if (navRef.current) {
          const navTop = navRef.current.getBoundingClientRect().top + window.scrollY
          const headerHeight = 80 // Altura aproximada do header
          const targetScroll = navTop - headerHeight
          
          window.scrollTo({ 
            top: targetScroll > 0 ? targetScroll : 0, 
            behavior: 'smooth' 
          })
        }
      }, 100)
    }
  }

  return (
    <nav 
      ref={navRef}
      className={`mb-8 sticky z-40 backdrop-blur-xl transition-all duration-300 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8 ${className}`}
      style={{
        top: '60px', // Logo abaixo do header fixo (60px)
        backgroundColor: 'var(--theme-bg-sticky, rgba(10, 14, 23, 0.98))',
        paddingTop: '0.875rem',
        paddingBottom: '0.875rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        borderBottom: '2px solid rgba(201, 35, 55, 0.6)' // Linha vermelha Azimut
      }}
      aria-label="Internal navigation"
    >
      <div className="flex flex-wrap gap-2 -mb-px">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isHovered = hoveredId === item.id
          const shouldShowLine = isActive || isHovered // Linha aparece no ativo OU no hover
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`
                relative flex items-center gap-2 
                px-6 py-3 rounded-xl
                font-sora text-sm font-medium uppercase tracking-[0.08em]
                transition-all duration-300 ease-out
              `}
              style={{
                color: isActive 
                  ? 'var(--theme-accent-red)' // Usa cor adaptativa do tema!
                  : 'var(--theme-text-secondary)',
                backgroundColor: 'transparent',
                opacity: isActive ? 1 : 0.6,
                textShadow: 'none', // SEM GLOW
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                setHoveredId(item.id)
                if (!isActive) {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.color = 'var(--theme-accent-red)' // Usa cor adaptativa!
                  e.currentTarget.style.textShadow = 'none' // SEM GLOW no hover
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                setHoveredId(null)
                if (!isActive) {
                  e.currentTarget.style.opacity = '0.6'
                  e.currentTarget.style.color = 'var(--theme-text-secondary)'
                  e.currentTarget.style.textShadow = 'none'
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Wrapper para ícone + texto + linha */}
              <span className="relative inline-flex items-center gap-2">
                {/* Ícone */}
                {item.icon && (
                  <span 
                    className="text-base leading-none" 
                    aria-hidden="true"
                    style={{ opacity: isActive ? 1 : 0.7 }}
                  >
                    {item.icon}
                  </span>
                )}
                
                {/* Label */}
                <span>{item.label}</span>
                
                {/* Linha vermelha embaixo do conteúdo - SOBRE a linha branca */}
                {shouldShowLine && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-azimut-red transition-opacity duration-200"
                    style={{ 
                      opacity: isActive ? 0.6 : 0.4
                    }}
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

