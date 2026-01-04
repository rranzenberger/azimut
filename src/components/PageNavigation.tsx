import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface PageNavigationProps {
  items?: Array<{
    label: string
    href: string
    icon?: string
  }>
  sections?: Array<{
    id: string
    label: string
    icon?: string
  }>
  lang?: string
}

const PageNavigation: React.FC<PageNavigationProps> = ({ sections, items, lang }) => {
  const location = useLocation()
  const [activeHash, setActiveHash] = useState('')
  
  // Suportar tanto 'items' quanto 'sections' para compatibilidade
  const navItems = items || sections || []

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Set initial hash

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update URL hash without triggering full page reload
      window.history.pushState(null, '', `#${id}`)
      setActiveHash(`#${id}`)
    }
  }
  
  const handleClick = (item: any) => {
    // Se for 'items' (com href), extrair id do href
    if (item.href) {
      const hashIndex = item.href.indexOf('#')
      if (hashIndex !== -1) {
        const id = item.href.substring(hashIndex + 1)
        scrollToSection(id)
      }
    } else {
      // Se for 'sections' (com id direto)
      scrollToSection(item.id)
    }
  }
  
  const getItemId = (item: any) => {
    if (item.href) {
      const hashIndex = item.href.indexOf('#')
      return hashIndex !== -1 ? item.href.substring(hashIndex + 1) : ''
    }
    return item.id || ''
  }

  return (
    <div className="mb-12 flex flex-wrap gap-3 border-b pb-4" style={{ borderColor: 'var(--theme-border)' }}>
      {navItems.map((item: any, index: number) => {
        const itemId = getItemId(item)
        const isActive = activeHash === `#${itemId}` || (!activeHash && itemId === 'unique')
        
        return (
          <button
            key={item.id || item.href || index}
            onClick={() => handleClick(item)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-sora text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
              isActive
                ? 'bg-azimut-red/15 text-azimut-red shadow-inner shadow-azimut-red/20'
                : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            }`}
            style={{
              color: isActive ? '#c92337' : undefined
            }}
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default PageNavigation


