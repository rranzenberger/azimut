import React, { useState, useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import { servicesData, getServiceTitle, getServiceShortDesc } from '../data/servicesData'

interface WhatWeDoProps {
  lang: Lang
}

type FilterCategory = 'all' | 'culture' | 'brands' | 'production' | 'technology'

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)
  const seo = seoData.what[lang]
  
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  
  // Mapeamento de categorias para cada serviço
  const serviceCategoryMap: Record<string, FilterCategory> = {
    'museus-exposicoes': 'culture',
    'festivais-curadoria-eventos': 'culture',
    'educacao-treinamento': 'culture',
    'teatro-espetaculos-imersivos': 'culture',
    'branded-experiences-ativacoes': 'brands',
    'realidade-virtual-vr': 'brands',
    'xr-interatividade': 'brands',
    'cenografia-design-espacial': 'brands',
    'cinema-audiovisual': 'production',
    'pos-producao-vfx': 'production',
    'animacao-2d-3d': 'production',
    'games-interativos': 'production',
    'arquitetura-virtual-bim': 'technology',
    'direcao-arte-criativa': 'technology',
    'ia-criativa': 'technology',
    'consultoria-estrategia': 'technology'
  }
  
  // Filtrar serviços com base no filtro ativo
  const filteredServices = activeFilter === 'all' 
    ? servicesData 
    : servicesData.filter(service => serviceCategoryMap[service.slug] === activeFilter)
  
  useEffect(() => {
    if (starRef.current) {
      starRef.current.style.opacity = '0.3'
    }
  }, [])

  const filters: Array<{ id: FilterCategory; labelPt: string; labelEn: string; labelFr: string; labelEs: string }> = [
    { id: 'all', labelPt: 'Todas', labelEn: 'All', labelFr: 'Tous', labelEs: 'Todas' },
    { id: 'culture', labelPt: 'Cultura', labelEn: 'Culture', labelFr: 'Culture', labelEs: 'Cultura' },
    { id: 'brands', labelPt: 'Marcas', labelEn: 'Brands', labelFr: 'Marques', labelEs: 'Marcas' },
    { id: 'production', labelPt: 'Produção', labelEn: 'Production', labelFr: 'Production', labelEs: 'Producción' },
    { id: 'technology', labelPt: 'Tecnologia', labelEn: 'Technology', labelFr: 'Technologie', labelEs: 'Tecnología' }
  ]

  const getFilterLabel = (filter: typeof filters[0]) => {
    switch (lang) {
      case 'pt': return filter.labelPt
      case 'en': return filter.labelEn
      case 'fr': return filter.labelFr
      case 'es': return filter.labelEs
    }
  }

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        lang={lang}
        path="/what"
      />
      <main className="relative min-h-screen overflow-hidden pt-24 md:pt-32">
        {/* Background: Estrela da Azimut */}
        <div
          ref={starRef}
          className="fixed -right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px] opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{
            zIndex: -5,
            backgroundImage: 'url(/logo-azimut-star.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />

        {/* Hero Section */}
        <section className="relative pb-12 pt-6">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="font-handel text-5xl md:text-7xl uppercase tracking-wide mb-6 glow-text-sm">
              {t(lang, 'navWhat')}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {lang === 'pt' 
                ? 'Criamos experiências imersivas, interativas e cinematográficas de ponta a ponta. Da concepção à execução, integramos arte, tecnologia e narrativa para conectar pessoas, histórias e espaços.'
                : lang === 'es' 
                ? 'Creamos experiencias inmersivas, interactivas y cinematográficas de punta a punta. De la concepción a la ejecución, integramos arte, tecnología y narrativa para conectar personas, historias y espacios.'
                : lang === 'fr' 
                ? 'Nous créons des expériences immersives, interactives et cinématographiques de bout en bout. De la conception à l\'exécution, nous intégrons art, technologie et récit pour connecter personnes, histoires et espaces.'
                : 'We create end-to-end immersive, interactive and cinematic experiences. From conception to execution, we integrate art, technology and narrative to connect people, stories and spaces.'}
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="relative pb-8 pt-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id)
                    trackInteraction('filter_services', filter.id)
                  }}
                  className="transition-all duration-200 touch-manipulation font-sora font-medium uppercase text-sm"
                  style={{
                    background: activeFilter === filter.id 
                      ? 'rgba(201, 35, 55, 0.12)' 
                      : 'transparent',
                    border: activeFilter === filter.id 
                      ? '1px solid rgba(201, 35, 55, 0.3)' 
                      : '1px solid rgba(211, 206, 195, 0.2)',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    color: activeFilter === filter.id 
                      ? '#c92337' 
                      : 'var(--theme-text-secondary)',
                    opacity: activeFilter === filter.id ? 1 : 0.7
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== filter.id) {
                      e.currentTarget.style.background = 'rgba(201, 35, 55, 0.06)'
                      e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.2)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== filter.id) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(211, 206, 195, 0.2)'
                    }
                  }}
                >
                  {getFilterLabel(filter)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Serviços 4x4 */}
        <section className="relative py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <LangLink 
                  key={service.id}
                  to={`/what/${service.slug}`}
                  className="group rounded-2xl border border-white/10 card-adaptive p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                  }}
                  onClick={() => trackInteraction('service_view', service.slug)}
                >
                  <article className="flex flex-col h-full">
                    {service.icon && (
                      <div className="mb-4 text-4xl">{service.icon}</div>
                    )}
                    <h3 className="mb-3 font-sora text-lg font-semibold text-white group-hover:text-azimut-red transition-colors duration-300">
                      {getServiceTitle(service, lang)}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200 group-hover:text-slate-100 transition-colors duration-300 flex-grow">
                      {getServiceShortDesc(service, lang)}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <span className="text-xs font-medium text-azimut-red group-hover:text-white transition-colors duration-300">
                        {lang === 'pt' ? 'Ver detalhes →' : lang === 'es' ? 'Ver detalles →' : lang === 'fr' ? 'Voir détails →' : 'View details →'}
                      </span>
                    </div>
                  </article>
                </LangLink>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-wide mb-6">
              {lang === 'pt' ? 'Vamos criar algo incrível juntos?' : lang === 'es' ? '¿Vamos a crear algo increíble juntos?' : lang === 'fr' ? 'Créons quelque chose d\'incroyable ensemble?' : 'Let\'s create something incredible together?'}
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--theme-text-secondary)' }}>
              {lang === 'pt' ? 'Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade.' : lang === 'es' ? 'Contáctenos para discutir su proyecto y descubrir cómo podemos transformar su visión en realidad.' : lang === 'fr' ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité.' : 'Get in touch to discuss your project and discover how we can transform your vision into reality.'}
            </p>
            <LangLink 
              to="/contact" 
              className="inline-block bg-azimut-red text-white font-sora font-semibold px-8 py-4 rounded-full hover:bg-azimut-red/80 transition-colors duration-300"
            >
              {lang === 'pt' ? 'Iniciar um Projeto' : lang === 'es' ? 'Iniciar un Proyecto' : lang === 'fr' ? 'Démarrer un Projet' : 'Start a Project'}
            </LangLink>
          </div>
        </section>
      </main>
    </>
  )
}

export default WhatWeDo
