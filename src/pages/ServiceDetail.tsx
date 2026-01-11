import React, { useEffect, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
import { getServiceBySlug, getServiceTitle, getServiceLongDesc, getServiceDeliverables, getServiceProcess } from '../data/servicesData'
import LangLink from '../components/LangLink'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()
  const { trackInteraction } = useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)

  // Tracking
  useEffect(() => {
    if (slug) {
      try {
        const cleanup = trackPageView(`what/${slug}`)
        return cleanup
      } catch (error) {
        console.warn('Tracking error:', error)
        return () => {}
      }
    }
  }, [slug])

  // Parallax na estrela
  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop
          const parallax = scrolled * 0.3
          
          if (star) {
            star.style.transform = `translateY(${parallax}px)`
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Validar slug
  if (!slug) {
    return <Navigate to={`/${lang}/what`} replace />
  }

  const service = getServiceBySlug(slug)

  // Service não encontrado
  if (!service) {
    return (
      <main className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] text-theme-text">
            {lang === 'pt' ? 'Serviço não encontrado' : lang === 'es' ? 'Servicio no encontrado' : lang === 'fr' ? 'Service non trouvé' : 'Service not found'}
          </h1>
          <p className="mb-8 text-theme-text-secondary">
            {lang === 'pt' 
              ? 'O serviço que você está procurando não existe ou foi removido.'
              : lang === 'es'
              ? 'El servicio que buscas no existe o ha sido eliminado.'
              : lang === 'fr'
              ? 'Le service que vous recherchez n\'existe pas ou a été supprimé.'
              : 'The service you are looking for does not exist or has been removed.'}
          </p>
          <LangLink
            to="/what"
            className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-theme-text hover:bg-azimut-red/20 transition-all"
          >
            {lang === 'pt' ? 'Voltar para Soluções' : lang === 'es' ? 'Volver a Soluciones' : lang === 'fr' ? 'Retour aux solutions' : 'Back to Solutions'}
          </LangLink>
        </div>
      </main>
    )
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
      
      <main className="relative py-16 md:py-20">
        {/* Star background - Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75 ease-out" 
          style={{ 
            opacity: 0.3,
            zIndex: -5,
            willChange: 'transform'
          }}
        >
          <img
            src="/logo-azimut-star.svg"
            alt=""
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm font-sora text-theme-text-secondary">
            <LangLink to="/" className="hover:text-azimut-red transition-colors">
              Home
            </LangLink>
            <span className="opacity-50">›</span>
            <LangLink to="/what" className="hover:text-azimut-red transition-colors">
              {lang === 'pt' ? 'Soluções' : lang === 'fr' ? 'Solutions' : lang === 'es' ? 'Soluciones' : 'Solutions'}
            </LangLink>
            <span className="opacity-50">›</span>
            <span className="font-medium text-azimut-red">{title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12 flex items-center gap-6">
            <span className="text-6xl md:text-7xl">{service.icon}</span>
            <h1 className="font-handel text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-theme-text">
              {title}
            </h1>
          </div>

          {/* Descrição expandida */}
          <div className="mb-20 space-y-6">
            {longDesc.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-theme-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          {/* O que entregamos */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text">
              {t.whatWeDeliver}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-azimut-red mt-1 font-bold text-xl">✓</span>
                  <span className="text-theme-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Nosso processo */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text">
              {t.ourProcess}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {process.map((step, index) => (
                <div 
                  key={index} 
                  className="card-dark-adaptive p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-azimut-red text-3xl font-bold mb-4 font-handel">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-theme-card-text leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tecnologias */}
          {service.technologies && service.technologies.length > 0 && (
            <section className="mb-20">
              <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text">
                {t.technologies}
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-azimut-red/10 text-theme-text border border-azimut-red/30 hover:bg-azimut-red/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projetos relacionados */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text">
              {t.relatedProjects}
            </h2>
            <div className="card-dark-adaptive p-12 rounded-lg text-center shadow-lg">
              <p className="mb-6 text-lg text-theme-card-text">
                {lang === 'pt' && 'Projetos filtrados por categoria serão exibidos aqui em breve.'}
                {lang === 'en' && 'Filtered projects by category will be displayed here soon.'}
                {lang === 'fr' && 'Les projets filtrés par catégorie seront affichés ici prochainement.'}
                {lang === 'es' && 'Los proyectos filtrados por categoría se mostrarán aquí pronto.'}
              </p>
              <LangLink
                to="/work"
                className="inline-flex items-center gap-2 rounded-lg bg-azimut-red px-8 py-3 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-white hover:bg-azimut-red/90 transition-all"
              >
                {t.viewAllProjects}
              </LangLink>
            </div>
          </section>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <LangLink
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-azimut-red px-8 py-4 font-sora text-base font-semibold uppercase tracking-[0.1em] text-white hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-xl"
            >
              {t.startProject}
            </LangLink>
            <LangLink
              to="/what"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-theme-text-secondary px-8 py-4 font-sora text-base font-semibold uppercase tracking-[0.1em] text-theme-text hover:border-azimut-red hover:text-azimut-red transition-all"
            >
              {t.backToServices}
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default ServiceDetail
