import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface PageNavigationProps {
  items: Array<{
    label: string
    href: string
    icon?: string
  }>
  theme?: 'dark' | 'light'
}

/**
 * Navegação interna de página (tabs/seções)
 * Usado em SOLUTIONS, WORK e ACADEMY para navegação híbrida:
 * - Dropdown no header (acesso rápido)
 * - Navegação visual na página (exploração e contexto)
 */
const PageNavigation: React.FC<PageNavigationProps> = ({ items, theme = 'dark' }) => {
  const location = useLocation()
  
  // Verificar se item está ativo (pathname + hash)
  const isActive = (href: string) => {
    if (href.includes('#')) {
      return location.pathname + location.hash === href
    }
    return location.pathname === href
  }
  
  return (
    <nav 
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12"
      role="navigation"
      aria-label="Page navigation"
    >
      {items.map((item, index) => {
        const active = isActive(item.href)
        return (
          <Link
            key={index}
            to={item.href}
            className="group relative px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg font-sora text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] font-semibold uppercase tracking-[0.08em] transition-all duration-300 border"
            style={{
              color: active ? '#ffffff' : 'var(--theme-text-secondary)',
              backgroundColor: active 
                ? 'rgba(201, 35, 55, 0.2)' 
                : theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.6)' 
                  : 'rgba(255, 255, 255, 0.6)',
              borderColor: active 
                ? 'rgba(201, 35, 55, 0.6)' 
                : theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
              boxShadow: active 
                ? '0 4px 12px rgba(201, 35, 55, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(201, 35, 55, 0.25)'
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.backgroundColor = theme === 'dark' 
                  ? 'rgba(26, 31, 46, 0.6)' 
                  : 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.borderColor = theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            {item.icon && (
              <span className="mr-2 text-base sm:text-lg">{item.icon}</span>
            )}
            <span>{item.label}</span>
            
            {/* Indicador visual ativo */}
            {active && (
              <span 
                className="absolute -bottom-1 left-1/2 w-3/4 h-[2px] bg-azimut-red"
                style={{
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 8px rgba(201, 35, 55, 0.6)'
                }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default PageNavigation

