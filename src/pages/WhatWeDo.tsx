import React, { useState, useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import { useLocation, useNavigate } from 'react-router-dom'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import InternalNavigation from '../components/InternalNavigation'
import { servicesData, getServiceTitle, getServiceShortDesc } from '../data/servicesData'
import { useBackofficeServices } from '../hooks/useBackofficeService'
import StarBackground from '../components/StarBackground'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { PageFooterNavigation } from '../components/PageFooterNavigation'
import { useTheme } from '../contexts/ThemeContext'

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
            <span 
              key={i} 
              className="keyword-highlight-primary"
            >
              {part}
            </span>
          )
        }
        
        if (isSecondary) {
          // 🟡 SECUNDÁRIA: Amarelo/laranja claro BOLD - destaque elegante
          return (
            <span 
              key={i} 
              className="keyword-highlight-secondary"
            >
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

type FilterCategory = 'all' | 'culture' | 'brands' | 'production' | 'technology' | 'education'

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  const seo = seoData.what[lang]
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  
  // Animação automática de seções
  useScrollAnimation()
  
  // 🆕 BUSCAR SERVIÇOS DO BACKOFFICE (com fallback para dados locais)
  const { services: backofficeServices, loading: loadingServices } = useBackofficeServices(lang)
  
  // Ler filtro da URL (?filter=culture)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const filter = params.get('filter')
      if (filter && ['culture', 'brands', 'production', 'technology', 'education'].includes(filter)) {
        return filter as FilterCategory
      }
    }
    return 'all'
  })

  // Atualizar filtro quando a URL mudar (navegação via dropdown)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const filter = params.get('filter')
    if (filter && ['culture', 'brands', 'production', 'technology', 'education'].includes(filter)) {
      setActiveFilter(filter as FilterCategory)
    } else {
      setActiveFilter('all')
    }
    
    // 🆕 SCROLL TO TOP quando filtro mudar via URL
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.search])
  
  // Mapeamento de segments do backoffice para FilterCategory
  // education, training → 'education'
  // culture, museum, festival, theater → 'culture'
  // branding, activation, vr, xr, ar → 'brands'
  // cinema, audiovisual, vfx, animation, games → 'production'
  // ai, technology, consulting, strategy, architecture → 'technology'
  const getServiceCategory = (segments: string[]): FilterCategory => {
    if (!segments || segments.length === 0) return 'technology' // default
    
    // Educação tem prioridade (card educação e consultoria)
    if (segments.some(s => ['education', 'training', 'workshop', 'course', 'academy'].includes(s))) {
      return 'education'
    }
    
    // Cultura
    if (segments.some(s => ['culture', 'museum', 'exhibition', 'festival', 'curation', 'theater', 'live-show'].includes(s))) {
      return 'culture'
    }
    
    // Marcas/Ativações
    if (segments.some(s => ['branding', 'activation', 'vr', 'xr', 'ar', 'immersive', 'interactive', 'web3', 'scenography'].includes(s))) {
      return 'brands'
    }
    
    // Produção
    if (segments.some(s => ['cinema', 'audiovisual', 'production', 'vfx', 'animation', '3d', '2d', 'motion', 'compositing', 'games'].includes(s))) {
      return 'production'
    }
    
    // Tecnologia (default)
    return 'technology'
  }
  
  // Mapeamento legado de categorias para dados locais (fallback)
  const serviceCategoryMap: Record<string, FilterCategory> = {
    'museus-exposicoes': 'culture',
    'festivais-curadoria-eventos': 'culture',
    'teatro-espetaculos-imersivos': 'culture',
    'educacao-treinamento': 'education',
    'branded-experiences-ativacoes': 'brands',
    'realidade-virtual-vr': 'brands',
    'xr-interatividade-web3': 'brands',
    'cenografia-design-espacial': 'brands',
    'cinema-audiovisual': 'production',
    'pos-producao-vfx': 'production',
    'animacao-2d-3d': 'production',
    'games-interativos': 'production',
    'arquitetura-virtual-bim': 'technology',
    'direcao-arte-criativa': 'technology',
    'ia-criativa': 'technology',
    'inteligencia-artificial': 'technology',
    'consultoria-estrategia': 'education' // ← ATUALIZADO: agora aparece em educação
  }
  
  // 🆕 USAR DADOS DO BACKOFFICE (se disponíveis) ou FALLBACK para dados locais
  const servicesSource = backofficeServices.length > 0 ? backofficeServices : servicesData
  
  // Filtrar serviços com base no filtro ativo
  const filteredServices = activeFilter === 'all' 
    ? servicesSource 
    : servicesSource.filter(service => {
        // Se vier do backoffice, usar segments
        if ('segments' in service && service.segments) {
          return getServiceCategory(service.segments) === activeFilter
        }
        // Se for dado local, verificar projectCategories
        if ('projectCategories' in service && service.projectCategories) {
          return getServiceCategory(service.projectCategories) === activeFilter
        }
        // Fallback: usar mapeamento legado
        return serviceCategoryMap[service.slug] === activeFilter
      })

  const filters: Array<{ id: FilterCategory; labelPt: string; labelEn: string; labelFr: string; labelEs: string }> = [
    { id: 'all', labelPt: 'Todas', labelEn: 'All', labelFr: 'Tous', labelEs: 'Todas' },
    { id: 'culture', labelPt: 'Cultura', labelEn: 'Culture', labelFr: 'Culture', labelEs: 'Cultura' },
    { id: 'brands', labelPt: 'Marcas', labelEn: 'Brands', labelFr: 'Marques', labelEs: 'Marcas' },
    { id: 'production', labelPt: 'Produção', labelEn: 'Production', labelFr: 'Production', labelEs: 'Producción' },
    { id: 'technology', labelPt: 'Tecnologia', labelEn: 'Technology', labelFr: 'Technologie', labelEs: 'Tecnología' },
    { id: 'education', labelPt: 'Educação', labelEn: 'Education', labelFr: 'Éducation', labelEs: 'Educación' }
  ]

  const getFilterLabel = (filter: typeof filters[0]) => {
    switch (lang) {
      case 'pt': return filter.labelPt
      case 'en': return filter.labelEn
      case 'fr': return filter.labelFr
      case 'es': return filter.labelEs
    }
  }

  const filterIcons: Record<FilterCategory, string> = {
    all: '✦',
    culture: '🎭',
    brands: '🎯',
    production: '🎬',
    technology: '🚀',
    education: '🎓'
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
            top: '52px'
          }}
        >
          <div className="mx-auto max-w-7xl w-full sm:px-4 min-[768px]:px-6 py-3 flex justify-center">
            <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {filters.map((filter) => {
                const href = filter.id === 'all' ? '/what' : `/what?filter=${filter.id}`
                const isActive = activeFilter === filter.id
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      const fullPath = `/${lang}${href}`
                      navigate(fullPath)
                    }}
                    className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-colors ${
                      isActive
                        ? 'text-azimut-red border-b-2 border-azimut-red'
                        : 'text-slate-400 hover:text-azimut-red'
                    }`}
                  >
                    <span>{filterIcons[filter.id]}</span>
                    <span>{getFilterLabel(filter)}</span>
                  </button>
                )
              })}
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
              {lang === 'pt' ? (
                <>Criamos experiências imersivas, interativas e cinematográficas de ponta a ponta. Da concepção à execução, integramos arte, tecnologia e narrativa para conectar pessoas, histórias e espaços. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Veja nossos projetos</LangLink> ou <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">conheça nosso estúdio</LangLink>.</>
              ) : lang === 'es' ? (
                <>Creamos experiencias inmersivas, interactivas y cinematográficas de extremo a extremo. Desde la concepción hasta la ejecución, integramos arte, tecnología y narrativa para conectar personas, historias y espacios. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Ver nuestros proyectos</LangLink> o <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">conocer nuestro estudio</LangLink>.</>
              ) : lang === 'fr' ? (
                <>Nous créons des expériences immersives, interactives et cinématographiques de bout en bout. De la conception à l'exécution, nous intégrons l'art, la technologie et la narration pour connecter les personnes, les histoires et les espaces. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Voir nos projets</LangLink> ou <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">découvrir notre studio</LangLink>.</>
              ) : (
                <>We create end-to-end immersive, interactive and cinematic experiences. From conception to execution, we integrate art, technology and narrative to connect people, stories and spaces. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">View our projects</LangLink> or <LangLink to="/studio" className="text-azimut-red hover:text-azimut-red/80 underline">meet our studio</LangLink>.</>
              )}
            </p>
            {/* Ativação de marca no seu evento: estande, quiosque com game, tecnologia e audiovisual — link direto para o jogo */}
            <div className={`mt-6 p-4 rounded-xl border border-azimut-red/30 ${theme === 'dark' ? 'bg-azimut-red/10' : 'bg-azimut-red/5'}`}>
              <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                {lang === 'pt' ? 'Ativação de marca no seu evento: estande em feira comercial, centro cultural, lançamento de produto, evento de divulgação, interno ou exposição. Quiosque com game, tecnologia e audiovisual integrados atraem visitantes ao seu estande e à sua página. Provinha:' : lang === 'es' ? 'Activación de marca en tu evento: stand en feria comercial, centro cultural, lanzamiento de producto, evento de divulgación, interno o exposición. Quiosco con game, tecnología y audiovisual integrados atrae visitantes a tu stand y a tu web. Pruébalo:' : lang === 'fr' ? 'Activation de marque à votre événement : stand en foire commerciale, centre culturel, lancement de produit, événement de promotion, interne ou exposition. Kiosque avec game, technologie et audiovisuel intégrés — attire les visiteurs sur votre stand et votre site. Aperçu :' : 'Brand activation at your event: trade-fair stand, cultural center, product launch, promotional or in-house event, or exhibition. Kiosk with game, technology and audiovisual in one draws visitors to your stand and your site. Try it:'}{' '}
                <LangLink to="/game" className="text-azimut-red hover:underline font-semibold">
                  {lang === 'pt' ? 'Jogue o Empathy Engine' : lang === 'es' ? 'Juega el Empathy Engine' : lang === 'fr' ? 'Jouez à l\'Empathy Engine' : 'Play Empathy Engine'} →
                </LangLink>
              </p>
            </div>
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
                  className="group relative rounded-xl cursor-pointer transition-all duration-400 hover:z-50 z-10 card-adaptive"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.04}s both`,
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
                  {/* LINHA VERMELHA NO TOPO - MAIS FORTE E VISÍVEL */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #e84858 50%, #c92337 100%)',
                      opacity: 1,
                      boxShadow: '0 0 15px rgba(201,35,55,0.8), 0 0 25px rgba(201,35,55,0.5)'
                    }}
                  />
                  {/* Glow intenso no hover */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[4px] rounded-t-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #ff5a6a 50%, #c92337 100%)',
                      boxShadow: '0 0 25px rgba(232,72,88,1), 0 0 50px rgba(201,35,55,0.8)'
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
                    
                    {/* Título - sempre claro pois card tem fundo escuro em ambos os temas */}
                    <h3 
                      className="mb-3 font-sora text-[0.88rem] font-semibold uppercase tracking-[0.03em] transition-colors duration-300 line-clamp-2 leading-snug text-slate-200"
                    >
                      {/* 🆕 Usar dados do backoffice (se disponível) ou fallback para dados locais */}
                      {'title' in service ? service.title : getServiceTitle(service, lang)}
                    </h3>
                    
                    {/* Descrição - sempre claro pois card tem fundo escuro em ambos os temas */}
                    <p 
                      className="text-[0.82rem] leading-[1.75] transition-colors duration-300 flex-grow line-clamp-3 text-slate-400"
                      style={{ fontWeight: 400 }}
                    >
                      {(() => {
                        // 🆕 Usar dados do backoffice (se disponível) ou fallback para dados locais
                        const desc = 'description' in service ? service.description : getServiceShortDesc(service, lang)
                        const highlighted = highlightKeywords(desc || '', lang)
                        return highlighted
                      })()}
                    </p>
                    
                    {/* CTA Premium - Vermelho bold com seta animada */}
                    <div className="mt-5 pt-3 border-t border-white/[0.06] flex-shrink-0">
                      <span 
                        className="text-[0.78rem] font-bold uppercase tracking-[0.06em] transition-all duration-300 inline-flex items-center gap-10 group-hover:gap-11"
                      >
                        <span 
                          className="view-details-cta group-hover:underline group-hover:underline-offset-4 decoration-2 transition-colors duration-300"
                          style={{ color: '#ffffff' }}
                        >
                          {lang === 'pt' ? 'Ver detalhes' : lang === 'es' ? 'Ver detalles' : lang === 'fr' ? 'Voir détails' : 'View details'}
                        </span>
                        <span 
                          className="arrow-cta inline-flex items-center justify-center w-11 h-9 rounded-lg border-2 transition-all duration-300 group-hover:w-14 group-hover:border-azimut-red/70 group-hover:bg-azimut-red/10 group-hover:shadow-[0_0_14px_rgba(201,35,55,0.6)]"
                          style={{ 
                            fontSize: '1.3rem', 
                            transform: 'scaleX(1.7)', 
                            color: '#ffffff',
                            borderColor: 'rgba(230, 57, 70, 0.5)',
                            borderWidth: '2px'
                          }}
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

        {/* Navegação Final - Curada e Organizada */}
        <PageFooterNavigation
          lang={lang}
          mainCta={{
            title: lang === 'pt' ? 'Vamos criar algo incrível juntos?' : lang === 'es' ? '¿Vamos a crear algo increíble juntos?' : lang === 'fr' ? 'Créons quelque chose d\'incroyable ensemble?' : 'Let\'s create something incredible together?',
            description: lang === 'pt' ? 'Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade.' : lang === 'es' ? 'Contáctenos para discutir su proyecto y descubrir cómo podemos transformar su visión en realidad.' : lang === 'fr' ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité.' : 'Get in touch to discuss your project and discover how we can transform your vision into reality.',
            buttonText: lang === 'pt' ? 'Iniciar um Projeto' : lang === 'es' ? 'Iniciar un Proyecto' : lang === 'fr' ? 'Démarrer un Projet' : 'Start a Project',
            buttonHref: '/contact'
          }}
          navigation={{
            previous: {
              label: lang === 'pt' ? 'Conhecer Estúdio' : lang === 'es' ? 'Conocer Estudio' : lang === 'fr' ? 'Découvrir Studio' : 'Meet Studio',
              href: '/studio',
              icon: '🏛️'
            },
            next: {
              label: lang === 'pt' ? 'Ver Projetos' : lang === 'es' ? 'Ver Proyectos' : lang === 'fr' ? 'Voir Projets' : 'View Projects',
              href: '/work',
              icon: '🎬'
            }
          }}
        />
      </main>
    </>
  )
}

export default WhatWeDo
