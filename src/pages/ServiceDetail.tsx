import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { getServiceBySlug, getServiceTitle, getServiceLongDesc, getServiceDeliverables, getServiceProcess } from '../data/servicesData'
import LangLink from '../components/LangLink'
import SEO from '../components/SEO'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return <Navigate to={`/${lang}/what`} replace />
  }

  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            {lang === 'pt' ? 'Serviço não encontrado' : 'Service not found'}
          </h1>
          <LangLink to="/what" className="text-azimut-red hover:underline">
            {lang === 'pt' ? '← Voltar para Soluções' : '← Back to Solutions'}
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
    <main className="min-h-screen py-20 px-6">
      <SEO
        title={`${title} - Azimut`}
        description={longDesc[0]}
        lang={lang}
        path={`/what/${slug}`}
      />

      {/* Container principal */}
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* ========== BREADCRUMBS ========== */}
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <LangLink to="/" className="hover:text-azimut-red transition-colors">
            Home
          </LangLink>
          <span>›</span>
          <LangLink to="/what" className="hover:text-azimut-red transition-colors">
            {lang === 'pt' ? 'Soluções' : lang === 'fr' ? 'Solutions' : lang === 'es' ? 'Soluciones' : 'Solutions'}
          </LangLink>
          <span>›</span>
          <span className="text-azimut-red font-medium">{title}</span>
        </nav>

        {/* ========== HERO - SUPER VISÍVEL ========== */}
        <div 
          className="bg-gradient-to-r from-azimut-red/20 to-transparent p-8 rounded-lg border-l-4 border-azimut-red"
          style={{ minHeight: '200px' }}
        >
          <div className="flex items-center gap-6">
            <span className="text-7xl">{service.icon}</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 uppercase">
                {title}
              </h1>
              <p className="text-azimut-red text-sm uppercase tracking-wider">
                Detalhes do Serviço
              </p>
            </div>
          </div>
        </div>

        {/* ========== DESCRIÇÃO - SUPER VISÍVEL ========== */}
        <div 
          className="bg-slate-800/50 p-8 rounded-lg space-y-6"
          style={{ minHeight: '300px' }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-azimut-red pb-2 inline-block">
            📄 Sobre este serviço
          </h2>
          {longDesc.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* ========== O QUE ENTREGAMOS - SUPER VISÍVEL ========== */}
        <div 
          className="bg-slate-800/50 p-8 rounded-lg"
          style={{ minHeight: '400px' }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-azimut-red pb-2 inline-block">
            ✓ {t.whatWeDeliver}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg hover:bg-slate-900/80 transition-colors"
              >
                <span className="text-azimut-red text-2xl font-bold">✓</span>
                <span className="text-gray-300 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========== NOSSO PROCESSO - SUPER VISÍVEL ========== */}
        <div 
          className="bg-slate-800/50 p-8 rounded-lg"
          style={{ minHeight: '500px' }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-azimut-red pb-2 inline-block">
            🔄 {t.ourProcess}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-azimut-red/20 to-slate-900 p-6 rounded-lg border border-azimut-red/30 hover:border-azimut-red transition-colors"
              >
                <div className="text-azimut-red text-4xl font-bold mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-gray-300 leading-relaxed text-base">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== TECNOLOGIAS - SUPER VISÍVEL ========== */}
        {service.technologies && service.technologies.length > 0 && (
          <div 
            className="bg-slate-800/50 p-8 rounded-lg"
            style={{ minHeight: '200px' }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-azimut-red pb-2 inline-block">
              🛠️ {t.technologies}
            </h2>
            <div className="flex flex-wrap gap-4">
              {service.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-azimut-red/20 text-white border-2 border-azimut-red rounded-full text-base font-semibold hover:bg-azimut-red hover:text-black transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ========== PROJETOS RELACIONADOS - SUPER VISÍVEL ========== */}
        <div 
          className="bg-slate-800/50 p-12 rounded-lg text-center"
          style={{ minHeight: '300px' }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            🎬 {t.relatedProjects}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {lang === 'pt' && 'Projetos filtrados por categoria serão exibidos aqui em breve.'}
            {lang === 'en' && 'Filtered projects by category will be displayed here soon.'}
            {lang === 'fr' && 'Les projets filtrés par catégorie seront affichés ici prochainement.'}
            {lang === 'es' && 'Los proyectos filtrados por categoría se mostrarán aquí pronto.'}
          </p>
          <LangLink
            to="/work"
            className="inline-block px-8 py-4 bg-azimut-red text-white text-lg font-bold rounded-lg hover:bg-azimut-red/90 transition-all shadow-lg"
          >
            {t.viewAllProjects}
          </LangLink>
        </div>

        {/* ========== CTAs FINAIS - SUPER VISÍVEL ========== */}
        <div 
          className="flex flex-col sm:flex-row gap-6 items-center justify-center py-8"
          style={{ minHeight: '150px' }}
        >
          <LangLink
            to="/contact"
            className="px-10 py-5 bg-azimut-red text-white text-xl font-bold rounded-lg hover:bg-azimut-red/90 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {t.startProject}
          </LangLink>
          <LangLink
            to="/what"
            className="px-10 py-5 border-2 border-white text-white text-xl font-bold rounded-lg hover:bg-white hover:text-black transition-all"
          >
            {t.backToServices}
          </LangLink>
        </div>

      </div>
    </main>
  )
}

export default ServiceDetail
