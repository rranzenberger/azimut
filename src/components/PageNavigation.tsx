import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface PageNavigationProps {
  sections: Array<{
    id: string
    label: string
    icon?: string
  }>
  lang: string
}

const PageNavigation: React.FC<PageNavigationProps> = ({ sections, lang }) => {
  const location = useLocation()
  const [activeHash, setActiveHash] = useState('')

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

  return (
    <div className="mb-12 flex flex-wrap gap-3 border-b pb-4" style={{ borderColor: 'var(--theme-border)' }}>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-sora text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-200 ${
            activeHash === `#${section.id}` || (!activeHash && section.id === 'unique')
              ? 'bg-azimut-red/15 text-azimut-red shadow-inner shadow-azimut-red/20'
              : 'bg-transparent hover:bg-white/5 hover:text-white'
          }`}
          style={{
            color: activeHash === `#${section.id}` || (!activeHash && section.id === 'unique') ? '#c92337' : 'var(--theme-text-secondary)'
          }}
        >
          {section.icon && <span className="text-lg">{section.icon}</span>}
          {section.label}
        </button>
      ))}
    </div>
  )
}

export default PageNavigation
