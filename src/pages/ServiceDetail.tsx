import React, { useEffect, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { getServiceBySlug, getServiceTitle, getServiceShortDesc, getServiceLongDesc, getServiceDeliverables, getServiceProcess } from '../data/servicesData'
import { getServiceFAQs, hasServiceFAQs } from '../data/serviceFAQs'
import LangLink from '../components/LangLink'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
import ServiceHero from '../components/ServiceHero'
import ServiceGallery from '../components/ServiceGallery'
import { getServiceGalleryPlaceholders } from '../utils/servicePlaceholders'
import StarBackground from '../components/StarBackground'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()
  const { trackInteraction } = useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // Estrela FIXA (sem parallax) - Padronizada com WhatWeDo e Work

  // Scroll-reveal animations para seções (sutil, não intrusivo)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            entry.target.classList.remove('opacity-0')
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Dispara quando 10% da seção está visível
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [slug])

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
  const shortDesc = getServiceShortDesc(service, lang)
  const longDescRaw = getServiceLongDesc(service, lang)
  const deliverables = getServiceDeliverables(service, lang)
  const process = getServiceProcess(service, lang)
  
  // Garantir 4 cards para layout 2x2 (dividir se necessário)
  // Cards 1-2 (acima): maiores - textos mais completos
  // Cards 3-4 (abaixo): menores - textos mais concisos e chamativos
  const longDesc = (() => {
    if (longDescRaw.length >= 4) {
      // Se já tem 4+, usar os primeiros 4
      return longDescRaw.slice(0, 4)
    } else if (longDescRaw.length === 3) {
      // Estratégia: 1º parágrafo completo no card 1, 2º completo no card 2
      // 3º parágrafo (geralmente mais curto e chamativo) dividido nos cards 3 e 4
      const first = longDescRaw[0]
      const second = longDescRaw[1]
      const third = longDescRaw[2]
      
      // Dividir o 3º parágrafo (mais curto) em 2 partes
      // Tentar dividir por vírgula ou ponto se possível
      const thirdMid = Math.floor(third.length / 2)
      const thirdBreak = third.lastIndexOf(',', thirdMid) > thirdMid - 100 
        ? third.lastIndexOf(',', thirdMid) + 1
        : third.lastIndexOf('.', thirdMid) > thirdMid - 100
        ? third.lastIndexOf('.', thirdMid) + 1
        : thirdMid
      
      return [
        first, // Card 1: primeiro parágrafo completo (maior)
        second, // Card 2: segundo parágrafo completo (maior)
        third.substring(0, thirdBreak).trim() || third, // Card 3: início do 3º parágrafo (menor)
        third.substring(thirdBreak).trim() || third // Card 4: fim do 3º parágrafo (menor, mais chamativo)
      ]
    } else if (longDescRaw.length === 2) {
      // Estratégia: 1º parágrafo completo no card 1
      // Dividir 2º parágrafo: parte maior no card 2, partes menores nos cards 3 e 4
      const first = longDescRaw[0]
      const second = longDescRaw[1]
      
      // Dividir o 2º parágrafo em 3 partes: 50% + 25% + 25%
      const secondBreak1 = Math.floor(second.length * 0.5)
      const secondBreak2 = Math.floor(second.length * 0.75)
      
      // Encontrar quebras naturais
      const break1 = second.lastIndexOf(',', secondBreak1) > secondBreak1 - 150 
        ? second.lastIndexOf(',', secondBreak1) + 1
        : second.lastIndexOf('.', secondBreak1) > secondBreak1 - 150
        ? second.lastIndexOf('.', secondBreak1) + 1
        : secondBreak1
      
      const break2 = second.lastIndexOf(',', secondBreak2) > secondBreak2 - 100
        ? second.lastIndexOf(',', secondBreak2) + 1
        : second.lastIndexOf('.', secondBreak2) > secondBreak2 - 100
        ? second.lastIndexOf('.', secondBreak2) + 1
        : secondBreak2
      
      return [
        first, // Card 1: primeiro parágrafo completo (maior)
        second.substring(0, break1).trim(), // Card 2: primeira metade do 2º parágrafo (maior)
        second.substring(break1, break2).trim() || second.substring(break1).trim(), // Card 3: segunda parte (menor)
        second.substring(break2).trim() || second.substring(Math.floor(second.length / 2)).trim() // Card 4: terceira parte (menor, mais chamativo)
      ]
    } else {
      // Se tiver apenas 1 parágrafo, dividir estrategicamente
      // Cards 1-2: partes maiores (60% + 40% da primeira metade)
      // Cards 3-4: partes menores (60% + 40% da segunda metade)
      const text = longDescRaw[0]
      const midPoint = Math.floor(text.length / 2)
      
      // Primeira metade (cards 1-2)
      const firstHalfBreak = Math.floor(midPoint * 0.6)
      const break1 = text.lastIndexOf(',', firstHalfBreak) > firstHalfBreak - 200
        ? text.lastIndexOf(',', firstHalfBreak) + 1
        : text.lastIndexOf('.', firstHalfBreak) > firstHalfBreak - 200
        ? text.lastIndexOf('.', firstHalfBreak) + 1
        : firstHalfBreak
      
      // Segunda metade (cards 3-4)
      const secondHalfLength = text.length - midPoint
      const secondHalfBreak = midPoint + Math.floor(secondHalfLength * 0.6)
      const break2 = text.lastIndexOf(',', secondHalfBreak) > secondHalfBreak - 150
        ? text.lastIndexOf(',', secondHalfBreak) + 1
        : text.lastIndexOf('.', secondHalfBreak) > secondHalfBreak - 150
        ? text.lastIndexOf('.', secondHalfBreak) + 1
        : secondHalfBreak
      
      return [
        text.substring(0, break1).trim(), // Card 1: primeira parte maior
        text.substring(break1, midPoint).trim(), // Card 2: segunda parte maior
        text.substring(midPoint, break2).trim(), // Card 3: primeira parte menor
        text.substring(break2).trim() // Card 4: última parte menor (mais chamativa)
      ]
    }
  })()

  // ═══════════════════════════════════════════
  // BUSCAR IMAGENS DO BACKOFFICE (Sistema de Tags)
  // ═══════════════════════════════════════════
  const [heroImage, setHeroImage] = React.useState<string | undefined>(undefined)
  const [galleryImages, setGalleryImages] = React.useState<Array<{ url: string; alt: string; thumbnail?: string }>>([])

  React.useEffect(() => {
    if (!slug) return

    const fetchImages = async () => {
      try {
        // URL base do backoffice (usar variável de ambiente ou fallback)
        const apiBaseUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
        
        // Buscar hero image
        const heroResponse = await fetch(
          `${apiBaseUrl}/api/public/media?pageSlug=what/${slug}&sectionSlug=hero&limit=1`
        )
        if (heroResponse.ok) {
          const heroData = await heroResponse.json()
          if (heroData.media && heroData.media.length > 0) {
            const hero = heroData.media[0]
            setHeroImage(hero.largeUrl || hero.mediumUrl || hero.originalUrl)
          }
        }

        // Buscar gallery images
        const galleryResponse = await fetch(
          `${apiBaseUrl}/api/public/media?pageSlug=what/${slug}&sectionSlug=gallery&limit=20`
        )
        if (galleryResponse.ok) {
          const galleryData = await galleryResponse.json()
          if (galleryData.media && galleryData.media.length > 0) {
            const images = galleryData.media.map((img: any) => ({
              url: img.largeUrl || img.mediumUrl || img.originalUrl,
              thumbnail: img.thumbnailUrl || img.mediumUrl || img.originalUrl,
              alt: img.altPt || img.altEn || img.altEs || img.altFr || title
            }))
            setGalleryImages(images)
          } else {
            // Fallback para placeholders se não houver imagens
            setGalleryImages(getServiceGalleryPlaceholders(slug, title, 6))
          }
        } else {
          // Fallback para placeholders em caso de erro
          setGalleryImages(getServiceGalleryPlaceholders(slug, title, 6))
        }
      } catch (error) {
        console.warn('Erro ao buscar imagens do backoffice:', error)
        // Fallback para placeholders
        setGalleryImages(getServiceGalleryPlaceholders(slug, title, 6))
      }
    }

    fetchImages()
  }, [slug, title])

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

  // FAQ Schema para SEO (Rich Snippets)
  const faqs = hasServiceFAQs(slug) ? getServiceFAQs(slug, lang) : []
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null

  // Service Schema para SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: shortDesc,
    provider: {
      '@type': 'Organization',
      name: 'Azimut',
      url: 'https://azmt.com.br'
    },
    areaServed: {
      '@type': 'Country',
      name: ['BR', 'CA', 'US', 'Global']
    },
    offers: {
      '@type': 'Offer',
      category: 'Creative Services',
      availability: 'https://schema.org/InStock'
    }
  }

  return (
    <>
      <SEO
        title={`${title} - Azimut | Produção Audiovisual e Experiências Imersivas`}
        description={`${shortDesc} ${longDesc[0]?.substring(0, 100)}...`}
        keywords={`${title.toLowerCase()}, produção audiovisual, experiências imersivas, VR, AR, XR, ${lang === 'pt' ? 'Rio de Janeiro, Brasil' : lang === 'en' ? 'Brazil, Canada' : 'Brasil, Canadá'}`}
        url={`/${lang}/what/${slug}`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
      />
      
      {/* FAQ Schema para Rich Snippets */}
      {faqSchema && <StructuredData type="FAQPage" data={faqSchema} />}
      
      {/* Service Schema */}
      <StructuredData type="Service" data={serviceSchema} />
      
      <main className="py-16 md:py-20" style={{ position: 'relative', zIndex: 1 }}>
        {/* Star background - FIXA (padronizada com páginas principais) */}
        <StarBackground
          className="fixed top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          zIndex={-10}
          opacity={0.5}
        />

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

          {/* Hero Visual Premium */}
          <ServiceHero
            icon={service.icon}
            title={title}
            shortDescription={shortDesc}
            heroImage={heroImage}
            lang={lang}
          />

          {/* Galeria de Imagens */}
          <ServiceGallery
            images={galleryImages}
            lang={lang}
          />

          {/* Descrição expandida - Cards Premium */}
          <section 
            ref={(el) => { sectionRefs.current[0] = el }}
            className="section-container opacity-0"
          >
            <span className="section-eyebrow">
              <span>📖</span>
              {lang === 'pt' ? 'SOBRE O SERVIÇO' : lang === 'es' ? 'SOBRE EL SERVICIO' : lang === 'fr' ? 'À PROPOS DU SERVICE' : 'ABOUT THE SERVICE'}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {longDesc.slice(0, 4).map((paragraph, index) => {
                // Primeiros 2 cards (acima) - maiores - melhor hierarquia visual
                // Últimos 2 cards (abaixo) - menores - melhor experiência de leitura
                const isTopRow = index < 2
                
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/40 hover:shadow-[0_20px_60px_rgba(201,35,55,0.2)] transition-all group ${
                      isTopRow ? 'p-8' : 'p-5'
                    }`}
                  >
                    {/* Ícone decorativo de fundo - mais sutil */}
                    <div className="absolute -top-3 -left-3 text-4xl opacity-8 group-hover:opacity-15 transition-opacity">
                      {service.icon}
                    </div>
                    <p className={`leading-relaxed text-theme-text-secondary relative z-10 ${
                      isTopRow ? 'text-lg' : 'text-sm'
                    }`}>
                      {paragraph}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* O que entregamos */}
          <section 
            ref={(el) => { sectionRefs.current[1] = el }}
            className="section-container opacity-0"
          >
            <span className="section-eyebrow">
              <span>✓</span>
              {t.whatWeDeliver.toUpperCase()}
            </span>
            <h2 className="section-title">
              {t.whatWeDeliver}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deliverables.map((item, index) => (
                <div
                  key={index}
                  className="relative group p-4 rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-azimut-red/20 hover:border-azimut-red/50 hover:shadow-[0_20px_60px_rgba(201,35,55,0.2)] transition-all overflow-hidden"
                >
                  {/* Número de fundo - opacidade aumentada para destaque */}
                  <div className="absolute -top-2 -right-2 text-6xl font-bold text-azimut-red/25 font-handel group-hover:text-azimut-red/40 transition-colors">
                    {index + 1}
                  </div>
                  <div className="relative z-10 flex items-start gap-3">
                    <span className="text-azimut-red text-xl font-bold mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">✓</span>
                    <span className="text-theme-text-secondary group-hover:text-theme-text transition-colors leading-relaxed text-sm flex-1 line-clamp-1">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nosso processo - Timeline Visual */}
          <section 
            ref={(el) => { sectionRefs.current[2] = el }}
            className="section-container relative opacity-0"
          >
            <span className="section-eyebrow">
              <span>⚡</span>
              {t.ourProcess.toUpperCase()}
            </span>
            <h2 className="section-title">
              {t.ourProcess}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {process.map((step, index) => (
                <div 
                  key={index} 
                  className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/65 border border-azimut-red/20 hover:border-azimut-red/50 hover:shadow-[0_20px_60px_rgba(201,35,55,0.2)] transition-all group overflow-hidden"
                >
                  {/* Número de fundo - opacidade aumentada para destaque premium */}
                  <div className="absolute -top-3 -right-3 text-7xl font-bold text-azimut-red/30 font-handel group-hover:text-azimut-red/45 transition-colors">
                    {index + 1}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="relative z-10">
                    <div className="text-azimut-red text-2xl font-bold mb-2 font-handel">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-theme-card-text leading-relaxed text-sm">
                      {step}
                    </div>
                  </div>
                  
                  {/* Linha vermelha no topo - mais forte e visível (alinhada com página Soluções) */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #e84858 50%, #c92337 100%)',
                      opacity: 0.85,
                      boxShadow: '0 0 8px rgba(201, 35, 55, 0.5)'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </section>

          {/* Tecnologias */}
          {service.technologies && service.technologies.length > 0 && (
            <section 
              ref={(el) => { sectionRefs.current[3] = el }}
              className="section-container opacity-0"
            >
              <span className="section-eyebrow">
                <span>⚙️</span>
                {t.technologies.toUpperCase()}
              </span>
              <h2 className="section-title">
                {t.technologies}
              </h2>
              <div className="flex flex-wrap gap-4">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="tech-pill group relative px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-default hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Seção especial para Educação & Treinamento - Link para Academy */}
          {slug === 'educacao-treinamento' && (
            <section 
              ref={(el) => { sectionRefs.current[4] = el }}
              className="section-container opacity-0"
            >
              <span className="section-eyebrow">
                <span>🎓</span>
                {lang === 'pt' ? 'ACADEMY AZIMUT' : lang === 'es' ? 'ACADEMIA AZIMUT' : lang === 'fr' ? 'ACADÉMIE AZIMUT' : 'AZIMUT ACADEMY'}
              </span>
              <h2 className="section-title">
                {lang === 'pt' ? 'Conheça nossa Academy' : lang === 'es' ? 'Conoce nuestra Academia' : lang === 'fr' ? 'Découvrez notre Académie' : 'Discover our Academy'}
              </h2>
              <div className="relative p-12 rounded-lg text-center overflow-hidden bg-gradient-to-br from-slate-900/70 to-slate-900/50 border border-azimut-red/30 hover:border-azimut-red/50 transition-all group">
                {/* Padrão de fundo */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(201,35,55,0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-lg text-theme-card-text mb-8 max-w-2xl mx-auto leading-relaxed">
                    {lang === 'pt' 
                      ? 'Explore nossos programas completos de educação: cursos profissionalizantes, workshops, treinamentos corporativos e oportunidades internacionais em Vancouver.'
                      : lang === 'es'
                      ? 'Explora nuestros programas completos de educación: cursos profesionalizantes, talleres, capacitaciones corporativas y oportunidades internacionales en Vancouver.'
                      : lang === 'fr'
                      ? 'Découvrez nos programmes complets d\'éducation: cours professionnels, ateliers, formations corporatives et opportunités internationales à Vancouver.'
                      : 'Explore our complete education programs: professional courses, workshops, corporate training and international opportunities in Vancouver.'}
                  </p>
                  <LangLink
                    to="/academy"
                    onClick={() => trackInteraction('cta_academy_from_service', { source: 'educacao-treinamento', service: slug })}
                    className="group/btn inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-azimut-red text-white font-sora text-base font-bold uppercase tracking-[0.1em] hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-xl hover:shadow-azimut-red/50"
                  >
                    <span>{lang === 'pt' ? 'Ver Academy' : lang === 'es' ? 'Ver Academia' : lang === 'fr' ? 'Voir Académie' : 'View Academy'}</span>
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
                  </LangLink>
                </div>
              </div>
            </section>
          )}

          {/* Seção especial para Consultoria & Estratégia - Link para Academy Corporativa */}
          {slug === 'consultoria-estrategia' && (
            <section 
              ref={(el) => { sectionRefs.current[4] = el }}
              className="section-container opacity-0"
            >
              <span className="section-eyebrow">
                <span>🏢</span>
                {lang === 'pt' ? 'TREINAMENTO CORPORATIVO' : lang === 'es' ? 'CAPACITACIÓN CORPORATIVA' : lang === 'fr' ? 'FORMATION ENTREPRISE' : 'CORPORATE TRAINING'}
              </span>
              <h2 className="section-title">
                {lang === 'pt' ? 'Capacitação para empresas' : lang === 'es' ? 'Capacitación para empresas' : lang === 'fr' ? 'Formation pour entreprises' : 'Corporate training'}
              </h2>
              <div className="relative p-12 rounded-lg text-center overflow-hidden bg-gradient-to-br from-slate-900/70 to-slate-900/50 border border-azimut-red/30 hover:border-azimut-red/50 transition-all group">
                {/* Padrão de fundo */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(201,35,55,0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-lg text-theme-card-text mb-8 max-w-2xl mx-auto leading-relaxed">
                    {lang === 'pt' 
                      ? 'Oferecemos treinamentos corporativos personalizados em tecnologias emergentes, imersivas e audiovisuais. Capacitamos equipes de empresas, governo, ONGs e instituições para inovação e transformação digital.'
                      : lang === 'es'
                      ? 'Ofrecemos capacitaciones corporativas personalizadas en tecnologías emergentes, inmersivas y audiovisuales. Capacitamos equipos de empresas, gobierno, ONGs e instituciones para innovación y transformación digital.'
                      : lang === 'fr'
                      ? 'Nous offrons des formations corporatives personnalisées en technologies émergentes, immersives et audiovisuelles. Nous formons des équipes d\'entreprises, gouvernement, ONG et institutions pour l\'innovation et la transformation numérique.'
                      : 'We offer customized corporate training in emerging, immersive and audiovisual technologies. We train teams from companies, government, NGOs and institutions for innovation and digital transformation.'}
                  </p>
                  <LangLink
                    to="/academy/corporate"
                    onClick={() => trackInteraction('cta_academy_corporate_from_service', { source: 'consultoria-estrategia', service: slug })}
                    className="group/btn inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-azimut-red text-white font-sora text-base font-bold uppercase tracking-[0.1em] hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-xl hover:shadow-azimut-red/50"
                  >
                    <span>{lang === 'pt' ? 'Ver Treinamento Corporativo' : lang === 'es' ? 'Ver Capacitación Corporativa' : lang === 'fr' ? 'Voir Formation Entreprise' : 'View Corporate Training'}</span>
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
                  </LangLink>
                </div>
              </div>
            </section>
          )}

          {/* Projetos relacionados - Apenas para outros serviços */}
          {slug !== 'educacao-treinamento' && slug !== 'consultoria-estrategia' && (
            <section 
              ref={(el) => { sectionRefs.current[4] = el }}
              className="section-container opacity-0"
            >
              <span className="section-eyebrow">
                <span>🎬</span>
                {t.relatedProjects.toUpperCase()}
              </span>
              <h2 className="section-title">
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
          )}

          {/* FAQs - Perguntas Frequentes */}
          {hasServiceFAQs(slug) && (
            <section 
              ref={(el) => { sectionRefs.current[5] = el }}
              className="section-container relative opacity-0"
            >
              <span className="section-eyebrow">
                <span>❓</span>
                {lang === 'pt' ? 'PERGUNTAS FREQUENTES' : lang === 'es' ? 'PREGUNTAS FRECUENTES' : lang === 'fr' ? 'QUESTIONS FRÉQUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
              </span>
              <h2 className="section-title">
                {lang === 'pt' ? 'Perguntas Frequentes' : lang === 'es' ? 'Preguntas Frecuentes' : lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
              </h2>
              
              <div className="mt-8 space-y-4">
                {getServiceFAQs(slug, lang).map((faq, index) => (
                  <details
                    key={index}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-azimut-red/20 hover:border-azimut-red/50 transition-all"
                  >
                    <summary className="cursor-pointer p-6 font-sora text-base font-semibold text-theme-card-text hover:text-azimut-red transition-colors flex items-center justify-between list-none">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-azimut-red text-xl font-bold transition-transform group-open:rotate-180 flex-shrink-0">▼</span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-theme-card-text-secondary leading-relaxed">
                      <p className="text-sm md:text-base">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTAs Finais - Seção Premium (como WhatWeDo) */}
          <section className="py-16 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-wide mb-6 text-theme-light-main">
                {lang === 'pt' ? 'Vamos criar algo incrível juntos?' : lang === 'es' ? '¿Vamos a crear algo increíble juntos?' : lang === 'fr' ? 'Créons quelque chose d\'incroyable ensemble?' : 'Let\'s create something incredible together?'}
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-10 text-theme-text-secondary">
                {lang === 'pt' ? 'Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade.' : lang === 'es' ? 'Contáctenos para discutir su proyecto y descubrir cómo podemos transformar su visión en realidad.' : lang === 'fr' ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité.' : 'Get in touch to discuss your project and discover how we can transform your vision into reality.'}
              </p>
              
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
          </section>
        </div>
      </main>
    </>
  )
}

export default ServiceDetail
