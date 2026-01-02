import React, { useState, useEffect } from 'react'

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
  className = '' 
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActive || items[0]?.id || '')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Detectar hash na URL e ativar tab correspondente
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && items.find(item => item.id === hash)) {
        setActiveId(hash)
      }
    }

    handleHashChange() // Executar no mount
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [items])

  const handleClick = (item: NavItem) => {
    setActiveId(item.id)
    
    // Se tem href, navegar
    if (item.href) {
      const hashIndex = item.href.indexOf('#')
      if (hashIndex !== -1) {
        const hash = item.href.substring(hashIndex + 1)
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.pushState(null, '', `#${hash}`)
        }
      }
    } else {
      // Scroll direto para ID
      const element = document.getElementById(item.id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.pushState(null, '', `#${item.id}`)
      }
    }
  }

  return (
    <nav 
      className={`mb-12 border-b ${className}`}
      style={{ borderColor: 'var(--theme-border, rgba(0, 0, 0, 0.08))' }}
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
                  ? '#c92337' 
                  : 'var(--theme-text-secondary)',
                backgroundColor: 'transparent',
                opacity: isActive ? 1 : 0.6, // Diminuído de 0.7 para 0.6
                textShadow: isActive 
                  ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' // Diminuído de 0.9/0.6
                  : 'none',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                setHoveredId(item.id) // Marcar como hovered
                if (!isActive) {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.color = '#c92337'
                  e.currentTarget.style.textShadow = '0 0 12px rgba(201, 35, 55, 0.6), 0 0 25px rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                setHoveredId(null) // Remover hover
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
              
              {/* Label com linha embaixo */}
              <span className="relative inline-block">
                {item.label}
                
                {/* Linha vermelha embaixo do TEXTO - aparece no ATIVO ou no HOVER */}
                {shouldShowLine && (
                  <span 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-azimut-red transition-opacity duration-200"
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

