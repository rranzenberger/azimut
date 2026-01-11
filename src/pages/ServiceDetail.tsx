import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Lang } from '../i18n'
import { getServiceBySlug, getServiceTitle, getServiceLongDesc, getServiceDeliverables, getServiceProcess, Service } from '../data/servicesData'
import LangLink from '../components/LangLink'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  // Tracking interno do site (analytics para backoffice)
  useUserTracking();
  
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
    <>
      <SEO
        title={`${title} - Azimut`}
        description={longDesc[0]}
        lang={lang}
        path={`/what/${slug}`}
      />

      <div className="relative min-h-screen pb-24">
        {/* Estrela de fundo */}
        <div
          className="absolute -right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px] opacity-30 pointer-events-none"
          style={{ zIndex: -5 }}
        >
          <img
            src="/logo-azimut-star.svg"
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6 pt-8">
          {/* Hero - Sempre visível */}
          <section className="mb-12">
            {/* Breadcrumbs inline */}
            <nav className="mb-6 flex items-center gap-2 text-sm font-sora">
              <LangLink 
                to="/" 
                className="hover:text-azimut-red transition-colors duration-200" 
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                Home
              </LangLink>
              <span className="opacity-50" style={{ color: 'var(--theme-text-secondary)' }}>›</span>
              <LangLink 
                to="/what" 
                className="hover:text-azimut-red transition-colors duration-200" 
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                {lang === 'pt' ? 'Soluções' : lang === 'fr' ? 'Solutions' : lang === 'es' ? 'Soluciones' : 'Solutions'}
              </LangLink>
              <span className="opacity-50" style={{ color: 'var(--theme-text-secondary)' }}>›</span>
              <span className="font-medium" style={{ color: 'var(--theme-accent-red)' }}>{title}</span>
            </nav>

            {/* Título com ícone */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl md:text-6xl">{service.icon}</span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-sora"
                style={{ color: 'var(--theme-text)' }}
              >
                {title}
              </h1>
            </div>
          </section>

          {/* Descrição expandida */}
          <div className="mb-20">
            {longDesc.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed mb-6"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* O que entregamos */}
          <div className="mb-20">
            <h2
              className="text-3xl font-bold mb-8 uppercase font-sora"
              style={{ color: 'var(--theme-text)' }}
            >
              {t.whatWeDeliver}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-azimut-red mt-1 font-bold">✓</span>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nosso processo */}
          <div className="mb-20">
            <h2
              className="text-3xl font-bold mb-8 uppercase font-sora"
              style={{ color: 'var(--theme-text)' }}
            >
              {t.ourProcess}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {process.map((step, index) => (
                <div
                  key={index}
                  className="card-dark-adaptive p-6 rounded-lg"
                >
                  <div className="text-azimut-red text-2xl font-bold mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div style={{ color: 'var(--theme-card-text, #e2e8f0)' }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tecnologias */}
          {service.technologies.length > 0 && (
            <div className="mb-20">
              <h2
                className="text-3xl font-bold mb-8 uppercase font-sora"
                style={{ color: 'var(--theme-text)' }}
              >
                {t.technologies}
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'rgba(201, 35, 55, 0.1)',
                      color: 'var(--theme-text)',
                      border: '1px solid rgba(201, 35, 55, 0.3)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projetos relacionados - Placeholder */}
          <div className="mb-20">
            <h2
              className="text-3xl font-bold mb-8 uppercase font-sora"
              style={{ color: 'var(--theme-text)' }}
            >
              {t.relatedProjects}
            </h2>
            <div
              className="card-dark-adaptive p-12 rounded-lg text-center"
            >
              <p className="mb-6" style={{ color: 'var(--theme-card-text, #e2e8f0)' }}>
                {lang === 'pt' && 'Projetos filtrados por categoria serão exibidos aqui em breve.'}
                {lang === 'en' && 'Filtered projects by category will be displayed here soon.'}
                {lang === 'fr' && 'Les projets filtrés par catégorie seront affichés ici prochainement.'}
                {lang === 'es' && 'Los proyectos filtrados por categoría se mostrarán aquí pronto.'}
              </p>
              <LangLink
                to="/work"
                className="inline-block px-8 py-3 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: 'var(--theme-accent-red)',
                  color: '#ffffff'
                }}
              >
                {t.viewAllProjects}
              </LangLink>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <LangLink
              to="/"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-200 text-center"
              style={{
                backgroundColor: 'var(--theme-accent-red)',
                color: '#ffffff',
                fontWeight: 600
              }}
            >
              {t.startProject}
            </LangLink>
            <LangLink
              to="/what"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-200 text-center border"
              style={{
                borderColor: 'var(--theme-text-secondary)',
                color: 'var(--theme-text)'
              }}
            >
              {t.backToServices}
            </LangLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceDetail

