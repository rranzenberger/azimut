import React, { useEffect, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { getServiceBySlug, getServiceTitle, getServiceLongDesc, getServiceDeliverables, getServiceProcess } from '../data/servicesData'
import LangLink from '../components/LangLink'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'

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

  if (!slug) {
    return <Navigate to={`/${lang}/what`} replace />
  }

  const service = getServiceBySlug(slug)

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
      viewAllProjects: 'Ver todos os projetos',
      getQuote: 'Solicitar Orçamento'
    },
    en: {
      backToServices: 'Back to Solutions',
      whatWeDeliver: 'What we deliver',
      ourProcess: 'Our process',
      technologies: 'Technologies & Tools',
      relatedProjects: 'Related projects',
      startProject: 'Start a project',
      viewAllProjects: 'View all projects',
      getQuote: 'Get a Quote'
    },
    fr: {
      backToServices: 'Retour aux Solutions',
      whatWeDeliver: 'Ce que nous livrons',
      ourProcess: 'Notre processus',
      technologies: 'Technologies & Outils',
      relatedProjects: 'Projets associés',
      startProject: 'Démarrer un projet',
      viewAllProjects: 'Voir tous les projets',
      getQuote: 'Demander un devis'
    },
    es: {
      backToServices: 'Volver a Soluciones',
      whatWeDeliver: 'Lo que entregamos',
      ourProcess: 'Nuestro proceso',
      technologies: 'Tecnologías & Herramientas',
      relatedProjects: 'Proyectos relacionados',
      startProject: 'Iniciar un proyecto',
      viewAllProjects: 'Ver todos los proyectos',
      getQuote: 'Solicitar presupuesto'
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
      
      <main className="py-16 md:py-20" style={{ position: 'relative', zIndex: 1 }}>
        {/* Star background - Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75 ease-out" 
          style={{ 
            opacity: 0.3,
            zIndex: 0,
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

        <div className="mx-auto max-w-6xl px-6" style={{ position: 'relative', zIndex: 2 }}>
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

          {/* Hero - Cinematográfico */}
          <div className="mb-16 relative">
            <div className="flex items-center gap-6 mb-6">
              <span className="text-6xl md:text-7xl">{service.icon}</span>
              <h1 className="font-handel text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-theme-text">
                {title}
              </h1>
            </div>
            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-azimut-red via-azimut-red/50 to-transparent rounded-full"></div>
          </div>

          {/* Descrição expandida */}
          <div className="mb-20 space-y-6 pl-6 border-l-2 border-azimut-red/20">
            {longDesc.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-theme-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          {/* O que entregamos */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">✓</span>
              {t.whatWeDeliver}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 border border-transparent hover:border-azimut-red/30 transition-all group"
                >
                  <span className="text-azimut-red text-xl font-bold mt-0.5 group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-theme-text-secondary group-hover:text-theme-text transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Nosso processo */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">⚡</span>
              {t.ourProcess}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {process.map((step, index) => (
                <div 
                  key={index} 
                  className="relative p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/50 transition-all group overflow-hidden"
                >
                  {/* Número de fundo */}
                  <div className="absolute -top-4 -right-4 text-8xl font-bold text-azimut-red/10 font-handel group-hover:text-azimut-red/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="relative z-10">
                    <div className="text-azimut-red text-3xl font-bold mb-4 font-handel">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-theme-card-text leading-relaxed">
                      {step}
                    </div>
                  </div>
                  
                  {/* Barra decorativa */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-azimut-red/50 to-transparent"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Tecnologias */}
          {service.technologies && service.technologies.length > 0 && (
            <section className="mb-20">
              <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
                <span className="text-azimut-red">⚙️</span>
                {t.technologies}
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-azimut-red/10 text-theme-text border border-azimut-red/30 hover:bg-azimut-red hover:text-black transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projetos relacionados */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">🎬</span>
              {t.relatedProjects}
            </h2>
            <div className="relative p-12 rounded-lg text-center overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20">
              {/* Padrão de fundo */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(201,35,55,0.3) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <p className="text-lg text-theme-card-text mb-8 opacity-70">
                  {lang === 'pt' && 'Projetos filtrados por categoria serão exibidos aqui em breve.'}
                  {lang === 'en' && 'Filtered projects by category will be displayed here soon.'}
                  {lang === 'fr' && 'Les projets filtrés par catégorie seront affichés ici prochainement.'}
                  {lang === 'es' && 'Los proyectos filtrados por categoría se mostrarán aquí pronto.'}
                </p>
                <LangLink
                  to="/work"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-azimut-red text-white font-sora text-sm font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {t.viewAllProjects}
                  <span className="text-lg">→</span>
                </LangLink>
              </div>
            </div>
          </section>

          {/* CTAs Finais - Cinematográfico */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <LangLink
              to="/contact"
              onClick={() => trackInteraction('cta_start_project', { source: 'service_detail', service: slug })}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora text-base font-bold uppercase tracking-[0.1em] transition-all shadow-2xl hover:shadow-azimut-red/50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative z-10">{t.startProject}</span>
              <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </LangLink>
            
            <LangLink
              to="/what"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg border-2 border-theme-text-secondary text-theme-text font-sora text-base font-bold uppercase tracking-[0.1em] hover:border-azimut-red hover:text-azimut-red transition-all"
            >
              <span className="text-xl">←</span>
              <span>{t.backToServices}</span>
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default ServiceDetail
