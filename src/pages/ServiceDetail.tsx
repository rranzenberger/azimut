import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Lang } from '../i18n'
import { getServiceBySlug, getServiceTitle, getServiceLongDesc, getServiceDeliverables, getServiceProcess } from '../data/servicesData'
import LangLink from '../components/LangLink'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  useUserTracking()
  
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to={`/${lang}/what`} replace />
  }

  const service = getServiceBySlug(slug)

  if (!service) {
    return <Navigate to={`/${lang}/what`} replace />
  }

  const title = getServiceTitle(service, lang)
  const longDesc = getServiceLongDesc(service, lang)
  const deliverables = getServiceDeliverables(service, lang)
  const process = getServiceProcess(service, lang)

  const translations = {
    pt: {
      backToServices: 'Voltar para Soluções',
      whatWeDeliver: 'O que entregamos',
      ourProcess: 'Nosso processo',
      technologies: 'Tecnologias & Ferramentas',
      relatedProjects: 'Projetos relacionados',
      startProject: 'Iniciar um projeto',
      viewAllProjects: 'Ver todos os projetos'
    },
    en: {
      backToServices: 'Back to Solutions',
      whatWeDeliver: 'What we deliver',
      ourProcess: 'Our process',
      technologies: 'Technologies & Tools',
      relatedProjects: 'Related projects',
      startProject: 'Start a project',
      viewAllProjects: 'View all projects'
    },
    fr: {
      backToServices: 'Retour aux Solutions',
      whatWeDeliver: 'Ce que nous livrons',
      ourProcess: 'Notre processus',
      technologies: 'Technologies & Outils',
      relatedProjects: 'Projets associés',
      startProject: 'Démarrer un projet',
      viewAllProjects: 'Voir tous les projets'
    },
    es: {
      backToServices: 'Volver a Soluciones',
      whatWeDeliver: 'Lo que entregamos',
      ourProcess: 'Nuestro proceso',
      technologies: 'Tecnologías & Herramientas',
      relatedProjects: 'Proyectos relacionados',
      startProject: 'Iniciar un proyecto',
      viewAllProjects: 'Ver todos los proyectos'
    }
  }

  const t = translations[lang]

  return (
    <div className="relative min-h-screen pt-16 md:pt-20 pb-24 overflow-hidden">
      <SEO
        title={`${title} - Azimut`}
        description={longDesc[0]}
        lang={lang}
        path={`/what/${slug}`}
      />

      {/* Estrela de fundo */}
      <div className="absolute -right-28 -bottom-40 md:-right-40 md:-bottom-60 h-[520px] w-[520px] md:h-[680px] md:w-[680px] opacity-30 pointer-events-none -z-5">
        <img src="/logo-azimut-star.svg" alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm font-sora">
          <LangLink to="/" className="text-theme-text-secondary hover:text-azimut-red transition-colors">
            Home
          </LangLink>
          <span className="opacity-50 text-theme-text-secondary">›</span>
          <LangLink to="/what" className="text-theme-text-secondary hover:text-azimut-red transition-colors">
            {lang === 'pt' ? 'Soluções' : lang === 'fr' ? 'Solutions' : lang === 'es' ? 'Soluciones' : 'Solutions'}
          </LangLink>
          <span className="opacity-50 text-theme-text-secondary">›</span>
          <span className="font-medium text-azimut-red">{title}</span>
        </nav>

        {/* Hero */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl md:text-6xl">{service.icon}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-sora text-theme-text">
            {title}
          </h1>
        </div>

        {/* Descrição */}
        <div className="mb-20">
          {longDesc.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed mb-6 text-theme-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        {/* O que entregamos */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 uppercase font-sora text-theme-text">
            {t.whatWeDeliver}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-azimut-red mt-1 font-bold">✓</span>
                <span className="text-theme-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nosso processo */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 uppercase font-sora text-theme-text">
            {t.ourProcess}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div key={index} className="card-dark-adaptive p-6 rounded-lg shadow-lg">
                <div className="text-azimut-red text-2xl font-bold mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-theme-card-text">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologias */}
        {service.technologies.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 uppercase font-sora text-theme-text">
              {t.technologies}
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, index) => (
                <span key={index} className="px-4 py-2 rounded-full text-sm font-medium bg-azimut-red/10 text-theme-text border border-azimut-red/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projetos relacionados */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 uppercase font-sora text-theme-text">
            {t.relatedProjects}
          </h2>
          <div className="card-dark-adaptive p-12 rounded-lg text-center shadow-lg">
            <p className="mb-6 text-theme-card-text">
              {lang === 'pt' && 'Projetos filtrados por categoria serão exibidos aqui em breve.'}
              {lang === 'en' && 'Filtered projects by category will be displayed here soon.'}
              {lang === 'fr' && 'Les projets filtrés par catégorie seront affichés ici prochainement.'}
              {lang === 'es' && 'Los proyectos filtrados por categoría se mostrarán aquí pronto.'}
            </p>
            <LangLink to="/work" className="inline-block px-8 py-3 rounded-lg bg-azimut-red text-white hover:bg-azimut-red/90 transition-all duration-200">
              {t.viewAllProjects}
            </LangLink>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <LangLink to="/" className="inline-block px-8 py-4 rounded-lg bg-azimut-red text-white hover:bg-azimut-red/90 transition-all duration-200 text-center font-semibold">
            {t.startProject}
          </LangLink>
          <LangLink to="/what" className="inline-block px-8 py-4 rounded-lg border border-theme-text-secondary text-theme-text hover:border-azimut-red hover:text-azimut-red transition-all duration-200 text-center">
            {t.backToServices}
          </LangLink>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
