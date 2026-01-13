import React, { useState, useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import { useLocation } from 'react-router-dom'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import InternalNavigation from '../components/InternalNavigation'
import { servicesData, getServiceTitle, getServiceShortDesc } from '../data/servicesData'

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO: Destacar palavras-chave em vermelho para melhor leitura
// Baseado em pesquisa UX: destaque de keywords melhora scanabilidade
// ═══════════════════════════════════════════════════════════════
const highlightKeywords = (text: string, lang: Lang): React.ReactNode => {
  // Verificação: se não for string, retornar como está
  if (typeof text !== 'string' || !text) {
    return text
  }

  // Palavras-chave importantes por idioma (tecnologias, processos, resultados, marcas)
  const keywords: Record<Lang, string[]> = {
    pt: [
      // Tecnologias (prioridade alta)
      'VR', 'AR', 'XR', '360°', '6DoF', 'BIM', 'VFX', 'CGI', 'IA', 'AI', 'Web3', 'NFTs', 'metaverso',
      '4K', '6K', '8K', 'DCP', 'ProRes', 'H.265', 'RED', 'Blackmagic', 'Sony',
      // Processos/Entregas (prioridade média)
      'conceito', 'roteiro', 'direção', 'produção', 'pós-produção', 'edição', 'montagem', 'color grading',
      'motion design', 'animação', 'composição', 'renderização', 'pipeline', 'workflow',
      // Resultados/Valores (prioridade média)
      'imersivo', 'interativo', 'cinematográfico', 'experiências', 'narrativas', 'instalações',
      'museus', 'festivais', 'marcas', 'educação', 'treinamento', 'workshops',
      // Específicos/Marcas (prioridade alta)
      'Rio Museu Olímpico', 'Gramado VR', 'VFS', 'VanArts', 'Autodesk', '30 anos', '1996',
      'Immerso XR', 'Petrópolis', 'Flamengo', 'Cenna Tower', 'First Nation Museum'
    ],
    en: [
      // Tecnologias
      'VR', 'AR', 'XR', '360°', '6DoF', 'BIM', 'VFX', 'CGI', 'AI', 'Web3', 'NFTs', 'metaverse',
      '4K', '6K', '8K', 'DCP', 'ProRes', 'H.265', 'RED', 'Blackmagic', 'Sony',
      // Processos
      'concept', 'script', 'direction', 'production', 'post-production', 'editing', 'color grading',
      'motion design', 'animation', 'composition', 'rendering', 'pipeline', 'workflow',
      // Resultados
      'immersive', 'interactive', 'cinematic', 'experiences', 'narratives', 'installations',
      'museums', 'festivals', 'brands', 'education', 'training', 'workshops',
      // Específicos/Marcas
      'Rio Olympic Museum', 'Gramado VR', 'VFS', 'VanArts', 'Autodesk', '30 years', '1996',
      'Immerso XR', 'Petrópolis', 'Flamengo', 'Cenna Tower', 'First Nation Museum',
      // Palavras adicionais dos cards em inglês
      'design', 'spaces', 'virtual', 'scenography', 'signage', 'graphic', 'art direction',
      'games', 'interactive', 'serious games', 'non-linear', 'generative AI', 'research',
      'creative vision', 'visual identity', 'consulting', 'strategy', 'grants', 'theater',
      'live shows', 'AI-generated', 'LED', 'branded', 'activations', 'engagement', 'sales',
      'exhibitions', 'museological', 'scenography', 'technology', 'audiovisual',
      // Palavras comuns que aparecem nos textos
      'video', 'composition', 'graphics', 'complete', 'pipeline', 'visual', 'narratives',
      'characters', 'worlds', 'life', 'technical', 'expertise', 'engaging', 'connecting',
      'physical', 'digital', 'blockchain', 'metaverse', 'NFTs', 'museum', 'museums',
      'festival', 'festivals', 'brand', 'brands', 'high-quality', 'content', 'completion'
    ],
    es: [
      'VR', 'AR', 'XR', '360°', '6DoF', 'BIM', 'VFX', 'CGI', 'IA', 'AI', 'Web3', 'NFTs', 'metaverso',
      '4K', '6K', '8K', 'DCP', 'ProRes', 'H.265', 'RED', 'Blackmagic', 'Sony',
      'concepto', 'guion', 'dirección', 'producción', 'posproducción', 'edición', 'color grading',
      'motion design', 'animación', 'composición', 'renderizado', 'pipeline', 'workflow',
      'inmersivo', 'interactivo', 'cinematográfico', 'experiencias', 'narrativas', 'instalaciones',
      'museos', 'festivales', 'marcas', 'educación', 'formación', 'talleres',
      'Museo Olímpico de Río', 'Gramado VR', 'VFS', 'VanArts', 'Autodesk', '30 años', '1996',
      'Immerso XR', 'Petrópolis', 'Flamengo', 'Cenna Tower', 'First Nation Museum'
    ],
    fr: [
      'VR', 'AR', 'XR', '360°', '6DoF', 'BIM', 'VFX', 'CGI', 'IA', 'AI', 'Web3', 'NFTs', 'métavers',
      '4K', '6K', '8K', 'DCP', 'ProRes', 'H.265', 'RED', 'Blackmagic', 'Sony',
      'concept', 'scénario', 'direction', 'production', 'post-production', 'montage', 'étalonnage',
      'motion design', 'animation', 'composition', 'rendu', 'pipeline', 'workflow',
      'immersif', 'interactif', 'cinématographique', 'expériences', 'récits', 'installations',
      'musées', 'festivals', 'marques', 'éducation', 'formation', 'ateliers',
      'Musée Olympique de Rio', 'Gramado VR', 'VFS', 'VanArts', 'Autodesk', '30 ans', '1996',
      'Immerso XR', 'Petrópolis', 'Flamengo', 'Cenna Tower', 'First Nation Museum'
    ]
  }

  const keywordsList = keywords[lang] || keywords.pt
  
  // Ordenar por tamanho (mais longas primeiro) para evitar sobreposição
  const sortedKeywords = keywordsList.sort((a, b) => b.length - a.length)
  
  // Criar regex melhorada: usa word boundaries para palavras normais, mas permite caracteres especiais
  const escapedKeywords = sortedKeywords.map(k => {
    // Escapar caracteres especiais do regex
    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Se contém apenas letras/números, usa word boundaries; senão, busca literal
    if (/^[a-zA-Z0-9]+$/.test(k)) {
      return `\\b${escaped}\\b`
    } else {
      return escaped
    }
  })
  
  // ABORDAGEM MAIS SIMPLES: usar split e map para garantir funcionamento
  try {
    // Criar regex simples sem word boundaries complexos
    const simpleKeywords = sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const regex = new RegExp(`(${simpleKeywords.join('|')})`, 'gi')
    
    // Dividir texto pelas palavras-chave encontradas
    const parts = text.split(regex)
    
    // Se não encontrou nenhuma palavra-chave, retornar texto original
    if (parts.length === 1) {
      return text
    }
    
    // Mapear partes: se for palavra-chave, destacar; senão, texto normal
    return (
      <>
        {parts.map((part, index) => {
          // Verificar se esta parte é uma palavra-chave (case-insensitive)
          const isKeyword = sortedKeywords.some(kw => 
            kw.toLowerCase() === part.toLowerCase()
          )
          
          if (isKeyword) {
            return (
              <span key={`kw-${index}`} className="keyword-highlight" style={{ color: '#c92337', fontWeight: 600 }}>
                {part}
              </span>
            )
          }
          return <React.Fragment key={`txt-${index}`}>{part}</React.Fragment>
        })}
      </>
    )
  } catch (error) {
    // Se houver erro, retornar texto original
    console.warn('Erro ao destacar palavras-chave:', error)
    return text
  }
}

interface WhatWeDoProps {
  lang: Lang
}

type FilterCategory = 'all' | 'culture' | 'brands' | 'production' | 'technology'

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const seo = seoData.what[lang]
  const location = useLocation()
  
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
      <main className="relative min-h-screen pt-6 md:pt-8 pb-24 film-grain" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
        {/* Background: Estrela da Azimut - FIXA (FUNDO - atrás de tudo) */}
        <div
          className="fixed top-20 -right-28 h-[520px] w-[520px] md:top-24 md:-right-40 md:h-[680px] md:w-[680px] opacity-50 pointer-events-none"
          style={{
            zIndex: -10,
            backgroundImage: 'url(/logo-azimut-star.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Prefixo Narrativo - APENAS ESTE ANIMA */}
            <div className="mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
                {lang === 'pt' ? 'O QUE CRIAMOS' : lang === 'es' ? 'LO QUE CREAMOS' : lang === 'fr' ? 'CE QUE NOUS CRÉONS' : 'WHAT WE CREATE'}
              </span>
            </div>
            {/* Título - SEM animação */}
            <h1 className="font-handel uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1' }}>
              {t(lang, 'navWhat')}
            </h1>
            {/* Parágrafo - SEM animação */}
            <p className="max-w-3xl leading-relaxed mb-8" style={{ color: 'var(--theme-text-secondary)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {lang === 'pt' 
                ? 'Criamos experiências imersivas, interativas e cinematográficas de ponta a ponta. Da concepção à execução, integramos arte, tecnologia e narrativa para conectar pessoas, histórias e espaços.'
                : lang === 'es' 
                ? 'Creamos experiencias inmersivas, interactivas y cinematográficas de punta a punta. De la concepción a la ejecución, integramos arte, tecnología y narrativa para conectar personas, historias y espacios.'
                : lang === 'fr' 
                ? 'Nous créons des expériences immersives, interactives et cinématographiques de bout en bout. De la conception à l\'exécution, nous intégrons art, technologie et récit pour connecter personnes, histoires et espaces.'
                : 'We create end-to-end immersive, interactive and cinematic experiences. From conception to execution, we integrate art, technology and narrative to connect people, stories and spaces.'}
            </p>

          {/* Navegação Interna - Padrão Universal Azimut */}
          <InternalNavigation
          items={[
            {
              id: 'all',
              label: lang === 'pt' ? 'Todas' : lang === 'es' ? 'Todas' : lang === 'fr' ? 'Tous' : 'All',
              href: '/what',
              icon: '✦'
            },
            {
              id: 'culture',
              label: lang === 'pt' ? 'Cultura' : lang === 'es' ? 'Cultura' : lang === 'fr' ? 'Culture' : 'Culture',
              href: '/what?filter=culture',
              icon: '🎭'
            },
            {
              id: 'brands',
              label: lang === 'pt' ? 'Marcas' : lang === 'es' ? 'Marcas' : lang === 'fr' ? 'Marques' : 'Brands',
              href: '/what?filter=brands',
              icon: '🎯'
            },
            {
              id: 'production',
              label: lang === 'pt' ? 'Produção' : lang === 'es' ? 'Producción' : lang === 'fr' ? 'Production' : 'Production',
              href: '/what?filter=production',
              icon: '🎬'
            },
            {
              id: 'technology',
              label: lang === 'pt' ? 'Tecnologia' : lang === 'es' ? 'Tecnología' : lang === 'fr' ? 'Technologie' : 'Technology',
              href: '/what?filter=technology',
              icon: '🚀'
            }
          ]}
          defaultActive={activeFilter}
          lang={lang}
        />
        </div>

        {/* Grid de Serviços 4x4 - CONTAINER ABAIXADO 60px para linha vermelha aparecer */}
        <section className="relative" style={{ paddingTop: '60px', paddingBottom: '48px' }}>
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
                    
                    {/* Título */}
                    <h3 className="mb-3 font-sora text-[0.88rem] font-semibold uppercase tracking-[0.03em] text-white/90 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-snug">
                      {getServiceTitle(service, lang)}
                    </h3>
                    
                    {/* Descrição - 3 linhas para visual mais limpo */}
                    <p className="text-[0.8rem] leading-[1.7] text-slate-400 group-hover:text-slate-300 transition-colors duration-300 flex-grow line-clamp-3">
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
                          style={{ fontSize: '1.3rem', transform: 'scaleX(1.7)' }}
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
