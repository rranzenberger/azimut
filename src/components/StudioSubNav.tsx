// ════════════════════════════════════════════════════════════
// STUDIO SUB-NAVIGATION - Menu Secundário para Subpáginas
// ════════════════════════════════════════════════════════════
// Componente reutilizável para navegação entre seções do Studio
// Usado em: StudioDiferenciais, StudioTeam, StudioCredentials
// ════════════════════════════════════════════════════════════

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'

interface StudioSubNavProps {
  lang: Lang
  currentPage: 'overview' | 'diferenciais' | 'equipe' | 'credentials'
}

const StudioSubNav: React.FC<StudioSubNavProps> = ({ lang, currentPage }) => {
  const navigate = useNavigate()

  // Itens do menu com traduções (mesma ordem do Studio home)
  const navItems = [
    {
      id: 'overview',
      icon: '✦',
      href: '/studio',
      labels: {
        pt: 'Visão Geral',
        en: 'Overview',
        es: 'Visión General',
        fr: 'Aperçu'
      }
    },
    {
      id: 'diferenciais',
      icon: '💡',
      href: '/studio/diferenciais',
      labels: {
        pt: 'Diferenciais',
        en: 'What Makes Us Unique',
        es: 'Diferenciales',
        fr: 'Différenciation'
      }
    },
    {
      id: 'equipe',
      icon: '👥',
      href: '/studio/equipe',
      labels: {
        pt: 'Equipe',
        en: 'Team',
        es: 'Equipo',
        fr: 'Équipe'
      }
    },
    {
      id: 'credentials',
      icon: '🏆',
      href: '/studio/credentials',
      labels: {
        pt: 'Credenciais',
        en: 'Credentials',
        es: 'Credenciales',
        fr: 'Références'
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
      <div className="mx-auto max-w-7xl w-full sm:px-4 min-[768px]:px-6 py-3 flex justify-center">
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

export default StudioSubNav
