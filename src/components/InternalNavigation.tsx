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
      style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      aria-label="Internal navigation"
    >
      <div className="flex flex-wrap gap-1 -mb-px">
        {items.map((item) => {
          const isActive = activeId === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`
                relative flex items-center gap-2 
                px-5 py-3
                font-sora text-sm font-semibold uppercase tracking-[0.1em]
                transition-all duration-200
                ${isActive 
                  ? 'text-azimut-red' 
                  : 'text-slate-400 hover:text-white'
                }
              `}
              style={{
                backgroundColor: isActive 
                  ? 'rgba(201, 35, 55, 0.08)' 
                  : 'transparent'
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Ícone */}
              {item.icon && (
                <span className="text-lg leading-none" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              
              {/* Label */}
              <span>{item.label}</span>
              
              {/* Linha vermelha embaixo quando ativo */}
              {isActive && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-azimut-red"
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

