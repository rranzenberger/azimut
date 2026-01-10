import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { type Lang } from '../i18n'

interface BreadcrumbsProps {
  lang: Lang
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ lang }) => {
  const location = useLocation()
  
  // Remove lang prefix and split path
  const pathWithoutLang = location.pathname.replace(`/${lang}`, '')
  const pathSegments = pathWithoutLang.split('/').filter(segment => segment)

  // If we're on homepage, don't show breadcrumbs
  if (pathSegments.length === 0) {
    return null
  }

  const labels: Record<Lang, Record<string, string>> = {
    pt: {
      home: 'Início',
      work: 'Trabalhos',
      what: 'Serviços',
      studio: 'Estúdio',
      academy: 'Academy',
      courses: 'Cursos',
      workshops: 'Workshops',
      corporate: 'Corporativo',
      vancouver: 'Vancouver',
      contact: 'Contato',
      press: 'Imprensa',
      research: 'Pesquisa',
      privacy: 'Privacidade',
      terms: 'Termos',
    },
    en: {
      home: 'Home',
      work: 'Work',
      what: 'Services',
      studio: 'Studio',
      academy: 'Academy',
      courses: 'Courses',
      workshops: 'Workshops',
      corporate: 'Corporate',
      vancouver: 'Vancouver',
      contact: 'Contact',
      press: 'Press',
      research: 'Research',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    es: {
      home: 'Inicio',
      work: 'Trabajos',
      what: 'Servicios',
      studio: 'Estudio',
      academy: 'Academy',
      courses: 'Cursos',
      workshops: 'Talleres',
      corporate: 'Corporativo',
      vancouver: 'Vancouver',
      contact: 'Contacto',
      press: 'Prensa',
      research: 'Investigación',
      privacy: 'Privacidad',
      terms: 'Términos',
    },
    fr: {
      home: 'Accueil',
      work: 'Travaux',
      what: 'Services',
      studio: 'Studio',
      academy: 'Academy',
      courses: 'Cours',
      workshops: 'Ateliers',
      corporate: 'Entreprise',
      vancouver: 'Vancouver',
      contact: 'Contact',
      press: 'Presse',
      research: 'Recherche',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },
  }

  const getLabel = (segment: string): string => {
    return labels[lang]?.[segment] || segment
  }

  const buildPath = (index: number): string => {
    const segments = pathSegments.slice(0, index + 1)
    return `/${lang}/${segments.join('/')}`
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {/* Home */}
        <li>
          <Link 
            to={`/${lang}`}
            className="text-slate-600 dark:text-slate-400 hover:text-azimut-red dark:hover:text-azimut-red transition-colors"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
          </Link>
        </li>

        {/* Path segments */}
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1
          const label = getLabel(segment)
          const path = buildPath(index)

          return (
            <React.Fragment key={path}>
              {/* Separator */}
              <li>
                <svg 
                  className="w-4 h-4 text-slate-400 dark:text-slate-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </li>

              {/* Link or current page */}
              <li>
                {isLast ? (
                  <span 
                    className="text-slate-900 dark:text-white font-medium capitalize"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="text-slate-600 dark:text-slate-400 hover:text-azimut-red dark:hover:text-azimut-red transition-colors capitalize"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
