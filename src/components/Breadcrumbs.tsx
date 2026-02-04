// ═══════════════════════════════════════════════════════════════
// BREADCRUMBS VISUAL - Componente Premium de Navegação
// ═══════════════════════════════════════════════════════════════
// Componente visual + Schema.org BreadcrumbList
// ═══════════════════════════════════════════════════════════════

import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import SchemaBreadcrumbList from './SchemaBreadcrumbList'

interface BreadcrumbsProps {
  items?: Array<{ name: string; url: string }>
  lang?: Lang
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  lang = 'pt',
  className = ''
}) => {
  const location = useLocation()
  const siteUrl = 'https://azmt.com.br'

  // Gerar breadcrumbs automaticamente baseado na URL se não fornecidos
  const breadcrumbs = useMemo(() => {
    if (items && items.length > 0) {
      return items
    }

    const path = location.pathname
    const pathParts = path.split('/').filter(Boolean)
    
    // Remover idioma do início se presente
    if (pathParts[0] && ['pt', 'en', 'es', 'fr'].includes(pathParts[0])) {
      pathParts.shift()
    }

    const breadcrumbItems: Array<{ name: string; url: string }> = [
      {
        name: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : 'Accueil',
        url: `/${lang === 'pt' ? '' : lang}`
      }
    ]

    // Mapear paths para nomes legíveis
    const pathNames: Record<string, Record<string, string>> = {
      work: {
        pt: 'Projetos',
        en: 'Work',
        es: 'Proyectos',
        fr: 'Projets'
      },
      what: {
        pt: 'Serviços',
        en: 'Services',
        es: 'Servicios',
        fr: 'Services'
      },
      studio: {
        pt: 'Estúdio',
        en: 'Studio',
        es: 'Estudio',
        fr: 'Studio'
      },
      academy: {
        pt: 'Academy',
        en: 'Academy',
        es: 'Academy',
        fr: 'Académie'
      },
      vancouver: {
        pt: 'Vancouver',
        en: 'Vancouver',
        es: 'Vancouver',
        fr: 'Vancouver'
      },
      contact: {
        pt: 'Contato',
        en: 'Contact',
        es: 'Contacto',
        fr: 'Contact'
      },
      blog: {
        pt: 'Blog',
        en: 'Blog',
        es: 'Blog',
        fr: 'Blog'
      },
      research: {
        pt: 'Pesquisa',
        en: 'Research',
        es: 'Investigación',
        fr: 'Recherche'
      }
    }

    let currentPath = ''
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`
      const name = pathNames[part]?.[lang] || part.charAt(0).toUpperCase() + part.slice(1)
      
      // Não adicionar o último item se for um slug (ex: /work/projeto-slug)
      if (index === pathParts.length - 1 && pathParts.length > 1) {
        // É provavelmente um slug, não adicionar ao breadcrumb
        return
      }
      
      breadcrumbItems.push({
        name,
        url: `/${lang === 'pt' ? '' : lang}${currentPath}`
      })
    })

    return breadcrumbItems
  }, [items, location.pathname, lang])

  // Se só tem Home, não mostrar breadcrumbs
  if (breadcrumbs.length <= 1) {
    return (
      <>
        <SchemaBreadcrumbList items={breadcrumbs} lang={lang} />
      </>
    )
  }

  return (
    <>
      {/* Schema.org BreadcrumbList */}
      <SchemaBreadcrumbList items={breadcrumbs} lang={lang} />
      
      {/* Breadcrumbs Visuais */}
      <nav 
        className={`text-sm ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1
            
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span 
                    className="text-slate-500 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
                {isLast ? (
                  <span 
                    className="text-slate-600 dark:text-slate-200 font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-slate-500 dark:text-slate-400 hover:text-azimut-red transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
