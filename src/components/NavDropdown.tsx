import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { Lang } from '../i18n'
import LangLink from './LangLink'

interface NavDropdownProps {
  label: string
  items: Array<{
    label: string
    href: string
    description?: string
  }>
  lang: Lang
  theme: 'dark' | 'light'
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  hovered: boolean
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  items,
  lang,
  theme,
  isActive,
  onMouseEnter,
  onMouseLeave,
  hovered
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const location = useLocation()

  // Fechar dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Verificar se algum item está ativo
  const hasActiveItem = items.some(item => {
    const pathWithoutLang = location.pathname.replace(/^\/(pt|en|fr|es)/, '')
    const hrefWithoutLang = item.href.replace(/^\/(pt|en|fr|es)/, '')
    return pathWithoutLang === hrefWithoutLang || pathWithoutLang.startsWith(hrefWithoutLang + '/')
  })

  // Função para abrir com cancelamento de timeout
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsOpen(true)
    onMouseEnter()
  }

  // Função para fechar com delay
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      onMouseLeave()
    }, 200) // 200ms de delay
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Link principal */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="nav-link-glow relative whitespace-nowrap pb-1 shrink-0 transition-colors duration-200 font-sora font-semibold"
        style={{
          padding: '0 6px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isActive || hasActiveItem || hovered
            ? (theme === 'light' ? '#ff5a6e' : '#c92337') // Vermelho vibrante no light, vermelho no dark
            : (theme === 'light' ? '#f5f5f5' : 'var(--theme-text-secondary)'), // Texto CLARO no light!
          textShadow: (isActive || hasActiveItem) && theme === 'dark' 
            ? '0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)' 
            : undefined
        }}
      >
        <span>{label}</span>
        {/* Seta indicadora */}
        <svg
          className={`ml-1 w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {/* Linha vermelha */}
        <span
          className="absolute bottom-0 left-0 h-[1px] min-[768px]:h-[1.5px] md:h-[1.5px] lg:h-[2px] xl:h-[2px] bg-azimut-red transition-all duration-200 ease-in-out"
          style={{
            width: (isActive || hasActiveItem || hovered) ? '100%' : '0%',
            opacity: (isActive || hasActiveItem || hovered) ? 1 : 0,
            bottom: '10px' // Mais perto do texto! ✅
          }}
        ></span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-lg border border-white/10 z-50 animate-fade-in-up"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, rgba(10, 15, 26, 0.98) 0%, rgba(26, 31, 46, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.98) 100%)',
            animation: 'fadeInUp 0.2s ease-out'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-2">
            {items.map((item, idx) => {
              const isItemActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              return (
                <LangLink
                  key={idx}
                  to={item.href}
                  className="block px-4 py-3 rounded-md transition-all duration-200 group"
                  onClick={() => {
                    // Fechar dropdown ao clicar
                    setIsOpen(false)
                  }}
                  style={{
                    backgroundColor: isItemActive
                      ? 'rgba(201, 35, 55, 0.15)'
                      : 'transparent',
                    color: isItemActive
                      ? '#c92337'
                      : 'var(--theme-text)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isItemActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(201, 35, 55, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isItemActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <div className="font-sora text-sm font-semibold mb-1 group-hover:text-azimut-red transition-colors">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="font-sora text-xs opacity-70" style={{ color: 'var(--theme-text-secondary)' }}>
                      {item.description}
                    </div>
                  )}
                </LangLink>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default NavDropdown








