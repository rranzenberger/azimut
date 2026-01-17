import React, { useState, useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import { useLocation, useNavigate } from 'react-router-dom'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import InternalNavigation from '../components/InternalNavigation'
import { servicesData, getServiceTitle, getServiceShortDesc } from '../data/servicesData'
import StarBackground from '../components/StarBackground'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO: Destacar palavras-chave com DUAS cores harmônicas
// PRIMÁRIAS (tech): Coral médio - destaque principal
// SECUNDÁRIAS (conceitos): Bege sutil + semi-bold - destaque suave
// ═══════════════════════════════════════════════════════════════
const highlightKeywords = (text: string, lang: Lang): React.ReactNode => {
  if (typeof text !== 'string' || !text) return text

  // ═══════════════════════════════════════════════════════════════
  // CURADORIA DE ARTE - HIERARQUIA VISUAL PREMIUM
  // ═══════════════════════════════════════════════════════════════
  
  // 🔴 PRIMÁRIAS (VERMELHO BOLD): Tecnologias core + termos de IMPACTO
  // São as palavras que VENDEM, que o cliente procura
  const primary = [
    // Tecnologias Core - O QUE ENTREGAMOS
    'VR', 'AR', 'XR', 'AI', 'IA', 'VFX', '3D', '2D', 'BIM', '360', 'NFTs', 'Web3', 'LED',
    // Experiências de Impacto - COMO ENTREGAMOS  
    'imersivo', 'imersiva', 'imersivas', 'immersive', 'inmersivo', 'inmersiva', 'imersivos',
    'cinematográfico', 'cinematográfica', 'cinematográficas', 'cinematic', 'cinématographique', 'cinematográficos',
    'interativo', 'interativa', 'interativas', 'interativos', 'interactive', 'interactif', 'interactives',
    // Verticais Premium
    'metaverso', 'metaverse', 'métavers', 'blockchain',
    'games', 'jogos', 'gaming', 'jeux', 'juegos',
    // Educação (vertical forte)
    'educação', 'education', 'éducation', 'educación', 'treinamento', 'training', 'formação',
    // Museologia e Cultura
    'museológicas', 'museological', 'muséologiques', 'museológico',
    // Arte e Direção (para cards de arte)
    'direção', 'direction', 'criativa', 'criativo', 'creative', 'créatif',
    // Cenografia e Espaços
    'cenografia', 'scenography', 'scénographie', 'cenografias',
    'virtuais', 'virtual', 'virtuel', 'virtuales',
    // Qualidade alta
    'alta', 'high', 'haute', 'alto', 'premium', 'high-quality'
  ]
  
  // 🟡 SECUNDÁRIAS (CREME DOURADO): Conceitos de valor, contexto
  // Complementam a leitura, agregam significado
  const secondary = [
    // Experiências e resultados
    'experiência', 'experiências', 'experience', 'experiences', 'expériences',
    'narrativa', 'narrativas', 'narrative', 'storytelling', 'récits',
    // Qualificadores 
    'inovação', 'innovation', 'inovador', 'innovative',
    'expertise', 'técnica', 'technical', 'technique',
    // Lugares e contexto
    'museus', 'museums', 'musées', 'exposições', 'exhibitions',
    'festivais', 'festivals', 'eventos', 'events', 'festival',
    'marcas', 'brands', 'marques', 'brand',
    'teatro', 'theatre', 'espetáculos', 'shows', 'spectacles',
    // Produção e processo
    'animação', 'animation', 'motion', 'animações',
    'design', 'espacial', 'spatial',
    'produção', 'production', 'pipeline', 'pipelines',
    // Extras contextuais
    'audiovisual', 'tecnologia', 'technology', 'technologie',
    'conceito', 'concept', 'conception',
    'identidade', 'identity', 'identité',
    'coordenamos', 'coordinate', 'coordonnons'
  ]

  const allKeywords = [...primary, ...secondary]
  const escaped = allKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
  const parts = text.split(regex)
  
  if (parts.length <= 1) return text

  return (
    <>
      {parts.map((part, i) => {
        const isPrimary = primary.some(kw => kw.toLowerCase() === part.toLowerCase())
        const isSecondary = secondary.some(kw => kw.toLowerCase() === part.toLowerCase())
        
        if (isPrimary) {
          // 🔴 PRIMÁRIA: Vermelho Azimut BOLD - máximo destaque
          return (
            <span key={i} style={{ 
              color: '#e63946', 
              fontWeight: 700, 
              letterSpacing: '0.02em',
              textShadow: '0 0 20px rgba(201, 35, 55, 0.3)'
            }}>
              {part}
            </span>
          )
        }
        
        if (isSecondary) {
          // 🟡 SECUNDÁRIA: Dourado warm BOLD - destaque elegante
          return (
            <span key={i} style={{ 
              color: '#f4c97e', 
              fontWeight: 600 
            }}>
              {part}
            </span>
          )
        }
        
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

interface WhatWeDoProps {
  lang: Lang
}

type FilterCategory = 'all' | 'culture' | 'brands' | 'production' | 'technology'

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  const seo = seoData.what[lang]
  const location = useLocation()
  const navigate = useNavigate()
  
  // Animação automática de seções
  useScrollAnimation()
  
  // Ler filtro da URL (?filter=culture)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const filter = params.get('filter')
      if (filter && ['culture', 'brands', 'production', 'technology'].includes(filter)) {
        return filter as FilterCategory
      }
    }
    return 'all'
  })

  // Atualizar filtro quando a URL mudar (navegação via dropdown)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const filter = params.get('filter')
    if (filter && ['culture', 'brands', 'production', 'technology'].includes(filter)) {
      setActiveFilter(filter as FilterCategory)
    } else {
      setActiveFilter('all')
    }
    
    // 🆕 SCROLL TO TOP quando filtro mudar via URL
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.search])
  
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
        lang={lang}
        path="/what"
      />
      <main className="relative min-h-screen pb-24 film-grain">
        {/* Background: Estrela da Azimut - FIXA (FUNDO - atrás de tudo) */}
        {/* Posição: header + submenu + folga visual = 160px */}
        <StarBackground
          className="fixed top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          zIndex={-10}
          opacity={0.5}
        />

        {/* ═══════════════════════════════════════════════════════════
            NAVEGAÇÃO INTERNA - FIXO colado no header
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className="fixed left-0 right-0 z-40 backdrop-blur-xl submenu-nav"
          style={{
            top: '52px',
            borderBottom: '2px solid rgba(201, 35, 55, 0.5)'
          }}
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-3">
            <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {[
                { id: 'all', label: lang === 'pt' ? 'Todas' : 'All', href: '/what', icon: '✦' },
                { id: 'culture', label: lang === 'pt' ? 'Cultura' : 'Culture', href: '/what?filter=culture', icon: '🎭' },
                { id: 'brands', label: lang === 'pt' ? 'Marcas' : 'Brands', href: '/what?filter=brands', icon: '🎯' },
                { id: 'production', label: lang === 'pt' ? 'Produção' : 'Production', href: '/what?filter=production', icon: '🎬' },
                { id: 'technology', label: lang === 'pt' ? 'Tecnologia' : 'Technology', href: '/what?filter=technology', icon: '🚀' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const fullPath = `/${lang}${item.href}`
                    navigate(fullPath)
                  }}
                  className="flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide hover:text-azimut-red transition-colors"
                  style={{ color: 'var(--theme-text-secondary)' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Espaçador para compensar header + submenu fixos */}
        <div style={{ height: '48px' }} />

        {/* Conteúdo - DENTRO do container */}
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="pt-6 md:pt-8 mb-8">
            <div className="mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
                {lang === 'pt' ? 'O QUE CRIAMOS' : 'WHAT WE CREATE'}
              </span>
            </div>
            <h1 className="font-handel uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1' }}>
              {t(lang, 'navWhat')}
            </h1>
            <p className="max-w-3xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {lang === 'pt' 
                ? 'Criamos experiências imersivas, interativas e cinematográficas de ponta a ponta. Da concepção à execução, integramos arte, tecnologia e narrativa para conectar pessoas, histórias e espaços.'
                : 'We create end-to-end immersive, interactive and cinematic experiences. From conception to execution, we integrate art, technology and narrative to connect people, stories and spaces.'}
            </p>
          </div>
        </div>

        {/* Grid de Serviços */}
        <section className="relative pb-12">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            {/* GAP-Y-14 = 56px entre linhas de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14">
              {filteredServices.map((service, index) => (
                <LangLink 
                  key={service.id}
                  to={`/what/${service.slug}`}
                  className="group relative rounded-xl cursor-pointer transition-all duration-400 hover:z-50 z-10"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.04}s both`,
                    background: 'linear-gradient(165deg, rgba(20, 24, 38, 0.98) 0%, rgba(12, 15, 24, 0.99) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    marginTop: '20px',
                    transform: 'translateY(0)',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(201,35,55,0.3), 0 0 40px rgba(201,35,55,0.2)'
                    e.currentTarget.style.borderColor = 'rgba(201,35,55,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                  }}
                  onClick={() => trackInteraction('service_view', service.slug)}
                >
                  {/* LINHA VERMELHA NO TOPO - SEMPRE VISÍVEL */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #e84858 50%, #c92337 100%)',
                      opacity: 0.7,
                      boxShadow: '0 0 10px rgba(201,35,55,0.5)'
                    }}
                  />
                  {/* Glow intenso no hover */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[4px] rounded-t-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #ff5a6a 50%, #c92337 100%)',
                      boxShadow: '0 0 20px rgba(232,72,88,0.8), 0 0 40px rgba(201,35,55,0.6)'
                    }}
                  />
                  
                  <article className="relative flex flex-col h-full p-5 pt-6">
                    {/* Ícone com container sutil */}
                    {service.icon && (
                      <div className="mb-4 flex-shrink-0">
                        <div 
                          className="inline-flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-300 group-hover:scale-110"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(201,35,55,0.08) 0%, rgba(201,35,55,0.03) 100%)',
                            border: '1px solid rgba(201,35,55,0.1)'
                          }}
                        >
                          <span className="text-[1.5rem]">{service.icon}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Título - FORÇA BRUTA: cor inline para garantir branco */}
                    <h3 
                      className="mb-3 font-sora text-[0.88rem] font-semibold uppercase tracking-[0.03em] transition-colors duration-300 line-clamp-2 leading-snug"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      {getServiceTitle(service, lang)}
                    </h3>
                    
                    {/* Descrição - FORÇA BRUTA: cor inline para garantir legibilidade */}
                    <p 
                      className="text-[0.82rem] leading-[1.75] transition-colors duration-300 flex-grow line-clamp-3"
                      style={{ color: '#9a9590', fontWeight: 400 }}
                    >
                      {(() => {
                        const desc = getServiceShortDesc(service, lang)
                        const highlighted = highlightKeywords(desc || '', lang)
                        return highlighted
                      })()}
                    </p>
                    
                    {/* CTA Premium - Vermelho bold com seta animada */}
                    <div className="mt-5 pt-3 border-t border-white/[0.06] flex-shrink-0">
                      <span 
                        className="text-[0.78rem] font-bold uppercase tracking-[0.06em] transition-all duration-300 inline-flex items-center gap-10 group-hover:gap-11"
                        style={{ color: '#e8505f' }}
                      >
                        <span className="group-hover:underline group-hover:underline-offset-4 decoration-2">
                          {lang === 'pt' ? 'Ver detalhes' : lang === 'es' ? 'Ver detalles' : lang === 'fr' ? 'Voir détails' : 'View details'}
                        </span>
                        <span 
                          className="inline-flex items-center justify-center w-11 h-9 rounded-lg border border-azimut-red/20 transition-all duration-300 group-hover:w-14 group-hover:border-azimut-red/50 group-hover:bg-azimut-red/10 group-hover:shadow-[0_0_14px_rgba(232,80,95,0.6)]"
                          style={{ fontSize: '1.3rem', transform: 'scaleX(1.7)', color: '#e8505f' }}
                        >
                          →
                        </span>
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
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-wide mb-6 text-theme-light-main">
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
