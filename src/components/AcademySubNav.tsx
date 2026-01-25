// ════════════════════════════════════════════════════════════
// ACADEMY SUB-NAVIGATION - Menu Secundário para Subpáginas
// ════════════════════════════════════════════════════════════
// Componente reutilizável para navegação entre seções da Academy
// Usado em: Vancouver, Courses, Workshops, Corporate
// ════════════════════════════════════════════════════════════

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'

interface AcademySubNavProps {
  lang: Lang
  currentPage: 'vancouver' | 'courses' | 'workshops' | 'corporate'
}

const AcademySubNav: React.FC<AcademySubNavProps> = ({ lang, currentPage }) => {
  const navigate = useNavigate()

  // Itens do menu com traduções (mesma ordem do dropdown)
  const navItems = [
    {
      id: 'courses',
      icon: '📚',
      href: '/academy/courses',
      labels: {
        pt: 'Cursos',
        en: 'Courses',
        es: 'Cursos',
        fr: 'Cours'
      }
    },
    {
      id: 'vancouver',
      icon: '🇨🇦',
      href: '/academy/vancouver',
      labels: {
        pt: 'Vancouver',
        en: 'Vancouver',
        es: 'Vancouver',
        fr: 'Vancouver'
      }
    },
    {
      id: 'workshops',
      icon: '🎬',
      href: '/academy/workshops',
      labels: {
        pt: 'Workshops',
        en: 'Workshops',
        es: 'Workshops',
        fr: 'Ateliers'
      }
    },
    {
      id: 'corporate',
      icon: '🏢',
      href: '/academy/corporate',
      labels: {
        pt: 'Corporativo',
        en: 'Corporate',
        es: 'Corporativo',
        fr: 'Corporatif'
      }
    }
  ]

  const handleClick = (href: string) => {
    navigate(`/${lang}${href}`)
  }

  return (
    <div 
      className="fixed left-0 right-0 z-40 backdrop-blur-xl submenu-nav"
      style={{
        top: '52px'
      }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-3 flex justify-center">
        <nav className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.href)}
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'text-azimut-red border-b-2 border-azimut-red'
                    : 'text-slate-400 hover:text-azimut-red'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.labels[lang]}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default AcademySubNav
