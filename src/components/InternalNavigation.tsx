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
                backgroundColor: isActive 
                  ? 'rgba(201, 35, 55, 0.05)' 
                  : 'transparent',
                opacity: isActive ? 1 : 0.85,
                border: isActive 
                  ? '1px solid rgba(201, 35, 55, 0.15)' 
                  : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.color = 'var(--theme-text)'
                  e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.04)'
                  e.currentTarget.style.border = '1px solid rgba(201, 35, 55, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.opacity = '0.85'
                  e.currentTarget.style.color = 'var(--theme-text-secondary)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.border = '1px solid transparent'
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
              
              {/* Label */}
              <span>{item.label}</span>
              
              {/* Linha vermelha embaixo quando ativo - SUTIL como menu superior */}
              {isActive && (
                <span 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-azimut-red rounded-full"
                  style={{ opacity: 0.5 }}
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default InternalNavigation

