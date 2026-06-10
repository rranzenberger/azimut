// ════════════════════════════════════════════════════════════
// SCHEMA.ORG - BreadcrumbList Schema
// ════════════════════════════════════════════════════════════
// JSON-LD BreadcrumbList para melhorar navegação interna
// ════════════════════════════════════════════════════════════

import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface BreadcrumbItem {
  name: string
  url: string
}

interface SchemaBreadcrumbListProps {
  items?: BreadcrumbItem[]
  lang?: 'pt' | 'en' | 'es' | 'fr'
}

const SchemaBreadcrumbList: React.FC<SchemaBreadcrumbListProps> = ({
  items,
  lang = 'pt'
}) => {
  const location = useLocation()
  const siteUrl = 'https://azimutimmersive.com'

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

    const breadcrumbItems: BreadcrumbItem[] = [
      {
        name: lang === 'pt' ? 'Home' : lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : 'Accueil',
        url: `${siteUrl}/${lang === 'pt' ? '' : lang}`
      }
    ]

    // Mapear paths para nomes legíveis
    const pathNames: Record<string, Record<string, string>> = {
      work: {
        pt: 'Trabalhos',
        en: 'Work',
        es: 'Trabajos',
        fr: 'Travaux'
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
      }
    }

    let currentPath = ''
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`
      const name = pathNames[part]?.[lang] || part.charAt(0).toUpperCase() + part.slice(1)
      
      breadcrumbItems.push({
        name,
        url: `${siteUrl}/${lang === 'pt' ? '' : lang}${currentPath}`
      })
    })

    return breadcrumbItems
  }, [items, location.pathname, lang, siteUrl])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default SchemaBreadcrumbList
