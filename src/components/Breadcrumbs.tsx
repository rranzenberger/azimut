// ════════════════════════════════════════════════════════════
// BREADCRUMBS VISUAL - Componente Premium para Navegação
// ════════════════════════════════════════════════════════════
// Componente isolado - Schema já existe, só adiciona visual
// ════════════════════════════════════════════════════════════

import React from 'react'
import { useLocation } from 'react-router-dom'
import LangLink from './LangLink'
import { type Lang } from '../i18n'

interface BreadcrumbsProps {
  lang: Lang
  theme?: 'dark' | 'light'
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  lang, 
  theme = 'dark',
  className = '' 
}) => {
  const location = useLocation()
  
  // Gerar breadcrumbs baseado na rota atual
  const generateBreadcrumbs = () => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    
    // Remover prefixo de idioma se existir
    const langPrefixes = ['pt', 'en', 'es', 'fr']
    if (segments.length > 0 && langPrefixes.includes(segments[0])) {
      segments.shift()
    }
    
    const breadcrumbs: Array<{ label: string; path: string }> = [
      { label: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home', path: `/${lang}` }
    ]
    
    let currentPath = `/${lang}`
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Traduzir labels conhecidos
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      // Traduções específicas
      const translations: Record<string, Record<Lang, string>> = {
        'what': {
          pt: 'Soluções',
          en: 'Solutions',
          es: 'Soluciones',
          fr: 'Solutions'
        },
        'work': {
          pt: 'Projetos',
          en: 'Work',
          es: 'Proyectos',
          fr: 'Projets'
        },
        'studio': {
          pt: 'Estúdio',
          en: 'Studio',
          es: 'Estudio',
          fr: 'Studio'
        },
        'academy': {
          pt: 'Academy',
          en: 'Academy',
          es: 'Academy',
          fr: 'Academy'
        },
        'contact': {
          pt: 'Contato',
          en: 'Contact',
          es: 'Contacto',
          fr: 'Contact'
        },
        'blog': {
          pt: 'Blog',
          en: 'Blog',
          es: 'Blog',
          fr: 'Blog'
        }
      }
      
      if (translations[segment]) {
        label = translations[segment][lang]
      }
      
      breadcrumbs.push({ label, path: currentPath })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // Não mostrar breadcrumbs na home
  if (breadcrumbs.length <= 1) {
    return null
  }
  
  return (
    <nav 
      className={`flex items-center gap-2 text-sm ${className}`}
      aria-label="Breadcrumb"
      style={{
        color: theme === 'dark' ? '#94a3b8' : '#64748b',
        padding: '0.75rem 0',
        marginBottom: '1rem'
      }}
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        
        return (
          <React.Fragment key={crumb.path}>
            {isLast ? (
              <span 
                style={{
                  color: theme === 'dark' ? '#cbd5e1' : '#1e293b',
                  fontWeight: '500'
                }}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <>
                <LangLink
                  to={crumb.path}
                  className="hover:opacity-80 transition-opacity"
                  style={{
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme === 'dark' ? '#cbd5e1' : '#1e293b'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme === 'dark' ? '#94a3b8' : '#64748b'
                  }}
                >
                  {crumb.label}
                </LangLink>
                <span 
                  style={{
                    color: theme === 'dark' ? 'rgba(148, 163, 184, 0.4)' : 'rgba(100, 116, 139, 0.4)',
                    margin: '0 0.25rem'
                  }}
                  aria-hidden="true"
                >
                  /
                </span>
              </>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
