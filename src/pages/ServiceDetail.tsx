import React, { useEffect, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { getServiceBySlug, getServiceTitle, getServiceShortDesc, getServiceLongDesc, getServiceDeliverables, getServiceProcess, servicesData } from '../data/servicesData'
// 🆕 Buscar serviço do backoffice (para slugs que não existem localmente)
import { useBackofficeService } from '../hooks/useBackofficeService'
import { getServiceFAQs, hasServiceFAQs } from '../data/serviceFAQs'
import LangLink from '../components/LangLink'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ServiceHero from '../components/ServiceHero'
import ServiceGallery from '../components/ServiceGallery'
import { getServiceGalleryPlaceholders } from '../utils/servicePlaceholders'
import StarBackground from '../components/StarBackground'
import { logger } from '@/utils/logger'
import { PageFooterNavigation } from '../components/PageFooterNavigation'
import { useTheme } from '../contexts/ThemeContext'
// 🆕 FASE 2: Site Inteligente - Detecção de Intenção
import DynamicSuggestionBanner from '../components/DynamicSuggestionBanner'

interface ServiceDetailProps {
  lang: Lang
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()
  const { theme } = useTheme()

  // Curadoria 2026: slug "realidade-virtual-vr" unificado em "xr-interatividade-web3"
  if (slug === 'realidade-virtual-vr') {
    return <Navigate to={`/${lang}/what/xr-interatividade-web3`} replace />
  }
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  
  // 🆕 Buscar serviço do backoffice (para slugs que não existem localmente)
  const { service: backofficeService, loading: loadingBackoffice } = useBackofficeService(slug || '', lang)
  
  const starRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Animação automática de seções ao entrar na viewport
  useScrollAnimation()

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
    let observer: IntersectionObserver | null = null
    let timeoutId: NodeJS.Timeout | null = null

    // Função para verificar se elemento está visível (parcialmente ou completamente)
    const isElementVisible = (element: Element): boolean => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const windowWidth = window.innerWidth || document.documentElement.clientWidth
      
      // Elemento está visível se qualquer parte dele está na viewport
      return (
        rect.bottom > 0 &&
        rect.top < windowHeight &&
        rect.right > 0 &&
        rect.left < windowWidth
      )
    }

    // Aguardar próximo tick para garantir que os refs foram atribuídos
    timeoutId = setTimeout(() => {
      observer = new IntersectionObserver(
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
          rootMargin: '50px', // Margem para detectar antes de entrar na viewport
          threshold: 0.01 // Dispara quando qualquer parte da seção está visível
        }
      )

      // Observar todos os refs que existem
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          // Se já está visível, animar imediatamente
          if (isElementVisible(ref)) {
            ref.classList.add('animate-fade-in-up')
            ref.classList.remove('opacity-0')
          } else {
            observer?.observe(ref)
          }
        }
      })

      // Também observar elementos com a classe section-container diretamente (fallback)
      const sectionElements = document.querySelectorAll('.section-container.opacity-0')
      sectionElements.forEach((el) => {
        // Se já está visível, animar imediatamente
        if (isElementVisible(el)) {
          el.classList.add('animate-fade-in-up')
          el.classList.remove('opacity-0')
        } else {
          observer?.observe(el)
        }
      })
    }, 100) // Pequeno delay para garantir que o DOM foi atualizado

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (observer) {
        sectionRefs.current.forEach((ref) => {
          if (ref) {
            observer.unobserve(ref)
          }
        })
        const sectionElements = document.querySelectorAll('.section-container.opacity-0')
        sectionElements.forEach((el) => {
          observer.unobserve(el)
        })
      }
    }
  }, [slug])

  if (!slug) {
    return <Navigate to={`/${lang}/what`} replace />
  }

  // Buscar primeiro localmente, depois do backoffice
  const localService = getServiceBySlug(slug)
  const service = localService // Preferir dados locais (mais completos)
  
  // Se não encontrar localmente e ainda está carregando do backoffice, mostrar loading
  if (!localService && loadingBackoffice) {
    return (
      <main className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-theme-text-secondary/20 rounded mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-theme-text-secondary/10 rounded mx-auto"></div>
          </div>
        </div>
      </main>
    )
  }
  
  // Se não encontrar em nenhum lugar, mostrar erro
  // MAS se tem backofficeService, usar os dados dele para exibir algo básico
  if (!service && !backofficeService) {
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
            {lang === 'pt' ? 'Voltar para Serviços' : lang === 'es' ? 'Volver a Soluciones' : lang === 'fr' ? 'Retour aux solutions' : 'Back to Solutions'}
          </LangLink>
        </div>
      </main>
    )
  }
  
  // Se não tem serviço local MAS tem do backoffice, redirecionar para /what
  // porque os dados do backoffice são incompletos para renderizar a página
  if (!service && backofficeService) {
    // Serviço existe no backoffice mas não tem dados locais completos
    // Redirecionar para a lista de serviços
    return <Navigate to={`/${lang}/what`} replace />
  }

  const title = getServiceTitle(service, lang)
  const shortDesc = getServiceShortDesc(service, lang)
  // Preferir conteúdo da subpágina do backoffice quando existir (editável no CMS)
  const longDescRaw = (backofficeService?.longDesc && backofficeService.longDesc.length > 0)
    ? backofficeService.longDesc
    : getServiceLongDesc(service, lang)
  const deliverables = (backofficeService?.deliverables && backofficeService.deliverables.length > 0)
    ? backofficeService.deliverables
    : getServiceDeliverables(service, lang)
  const process = (backofficeService?.process && backofficeService.process.length > 0)
    ? backofficeService.process
    : getServiceProcess(service, lang)
  const technologiesList = (backofficeService?.technologies && backofficeService.technologies.length > 0)
    ? backofficeService.technologies
    : (service as { technologies?: string[] }).technologies ?? []
  
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
        // Erro ao buscar imagens (não crítico, silencioso em produção)
        logger.warn('Erro ao buscar imagens do backoffice:', error)
        // Fallback para placeholders
        setGalleryImages(getServiceGalleryPlaceholders(slug, title, 6))
      }
    }

    fetchImages()
  }, [slug, title])

  const translations = {
    pt: {
      backToServices: 'Voltar para Serviços',
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

  // FAQ: prioridade backoffice (service.faqs), fallback para serviceFAQs estático
  const faqs = (backofficeService?.faqs && backofficeService.faqs.length > 0)
    ? backofficeService.faqs
    : (hasServiceFAQs(slug) ? getServiceFAQs(slug, lang) : [])
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

  // Serviços relacionados para internal linking (Google identifica relacionamento)
  const relatedServices = servicesData
    .filter(s => s.slug !== slug && (
      s.projectCategories.some(cat => service.projectCategories.includes(cat)) ||
      s.technologies.some(tech => service.technologies.includes(tech))
    ))
    .slice(0, 4)

  return (
    <>
      <SEO
        title={`${title} ${lang === 'pt' ? 'Rio de Janeiro' : lang === 'en' ? 'Brazil' : 'Brasil'} - Azimut | ${lang === 'pt' ? 'Produção Audiovisual, Experiências Imersivas, VR AR XR' : lang === 'en' ? 'Audiovisual Production, Immersive Experiences, VR AR XR' : 'Producción Audiovisual, Experiencias Inmersivas, VR AR XR'}`}
        description={`${shortDesc} ${lang === 'pt' ? '30 anos de experiência em produção audiovisual, VR, AR, XR e projetos culturais. Especialistas em' : lang === 'en' ? '30 years of experience in audiovisual production, VR, AR, XR and cultural projects. Specialists in' : '30 años de experiencia en producción audiovisual, VR, AR, XR y proyectos culturales. Especialistas en'} ${title.toLowerCase()}. ${longDesc[0]?.substring(0, 80)}...`}
        keywords={`${title.toLowerCase()}, produção audiovisual ${lang === 'pt' ? 'rio de janeiro' : 'brasil'}, experiências imersivas, realidade virtual VR, realidade aumentada AR, XR, ${lang === 'pt' ? 'produtora audiovisual rio, VR brasil, AR brasil' : lang === 'en' ? 'audiovisual production brazil, VR brazil, AR brazil' : 'producción audiovisual brasil, VR brasil, AR brasil'}, museus, exposições, ${slug === 'realidade-virtual-vr' ? 'VR studio brasil, realidade virtual imersiva' : slug === 'cinema-audiovisual' ? 'produção de filmes, documentários, cinema' : slug === 'museus-exposicoes' ? 'museus imersivos, exposições interativas' : ''}`}
        url={`/${lang}/what/${slug}`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
      />
      
      {/* FAQ Schema para Rich Snippets */}
      {faqSchema && <StructuredData type="FAQPage" data={faqSchema} />}
      
      {/* Service Schema */}
      <StructuredData type="Service" data={serviceSchema} />
      
      {/* 🆕 FASE 2: Banner de Sugestão Dinâmica */}
      <DynamicSuggestionBanner 
        lang={lang} 
        theme={theme}
        minConfidence={0.3}
        autoHideDelay={45000}
      />
      
      <main className="py-16 md:py-20" style={{ position: 'relative', zIndex: 1 }}>
        {/* Star background - FIXA (padronizada com páginas principais) */}
        <StarBackground
          className="fixed top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          zIndex={-10}
          opacity={0.5}
        />

        <div className="mx-auto max-w-6xl px-6" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs
              lang={lang}
              items={[
                { name: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home', url: `/${lang}` },
                { name: lang === 'pt' ? 'Serviços' : lang === 'es' ? 'Soluciones' : lang === 'fr' ? 'Solutions' : 'Solutions', url: `/${lang}/what` },
                { name: title, url: `/${lang}/what/${slug}` }
              ]}
            />
          </div>

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
                    className={`relative rounded-2xl border transition-all group backdrop-blur-sm ${
                      isTopRow ? 'p-8' : 'p-5'
                    }`}
                    style={{
                      background: theme === 'dark' 
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                        : 'linear-gradient(135deg, rgba(30, 28, 26, 0.7) 0%, rgba(26, 24, 21, 0.5) 100%)',
                      borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                      boxShadow: theme === 'dark' 
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                        : '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#c92337'
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 12px 40px rgba(201, 35, 55, 0.3)'
                        : '0 12px 40px rgba(201, 35, 55, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                        : '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Ícone decorativo de fundo - mais sutil */}
                    <div className="absolute -top-3 -left-3 text-4xl opacity-8 group-hover:opacity-15 transition-opacity">
                      {service.icon}
                    </div>
                    <p 
                      className={`leading-relaxed relative z-10 ${
                        isTopRow ? 'text-lg' : 'text-sm'
                      }`}
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#f5f1e8'
                      }}
                    >
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
                  className="relative group p-4 rounded-xl border transition-all overflow-hidden backdrop-blur-sm"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.7) 0%, rgba(26, 24, 21, 0.5) 100%)',
                    borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                    boxShadow: theme === 'dark' 
                      ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                      : '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c92337'
                    e.currentTarget.style.boxShadow = theme === 'dark' 
                      ? '0 12px 40px rgba(201, 35, 55, 0.3)'
                      : '0 12px 40px rgba(201, 35, 55, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                    e.currentTarget.style.boxShadow = theme === 'dark' 
                      ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                      : '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Número de fundo - opacidade aumentada para destaque */}
                  <div 
                    className="absolute -top-2 -right-2 text-6xl font-bold font-handel transition-colors"
                    style={{
                      color: theme === 'dark' ? 'rgba(201, 35, 55, 0.25)' : 'rgba(201, 35, 55, 0.15)'
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="relative z-10 flex items-start gap-3">
                    <span 
                      className="text-xl font-bold mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0"
                      style={{
                        color: '#c92337'
                      }}
                    >✓</span>
                    <span 
                      className="leading-relaxed text-sm flex-1 line-clamp-1 transition-colors"
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#f5f1e8'
                      }}
                    >{item}</span>
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
                  className="relative p-4 rounded-2xl border transition-all group overflow-hidden backdrop-blur-sm"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.9) 0%, rgba(26, 24, 21, 0.7) 100%)',
                    borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                    boxShadow: theme === 'dark' 
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c92337'
                    e.currentTarget.style.boxShadow = theme === 'dark' 
                      ? '0 20px 60px rgba(201, 35, 55, 0.3)'
                      : '0 12px 40px rgba(201, 35, 55, 0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                    e.currentTarget.style.boxShadow = theme === 'dark' 
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {/* Número de fundo - opacidade aumentada para destaque premium */}
                  <div 
                    className="absolute -top-3 -right-3 text-7xl font-bold font-handel transition-colors"
                    style={{
                      color: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.15)'
                    }}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="relative z-10">
                    <div 
                      className="text-2xl font-bold mb-2 font-handel"
                      style={{
                        color: '#c92337'
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div 
                      className="leading-relaxed text-sm"
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#f5f1e8'
                      }}
                    >
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
                    className="tech-pill group relative px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-default"
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
              <div 
                className="relative p-12 rounded-lg text-center overflow-hidden border transition-all group"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.5))'
                    : 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(245, 241, 232, 0.9))',
                  borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                  boxShadow: theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.08)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.5)' : 'rgba(201, 35, 55, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                }}
              >
                {/* Padrão de fundo */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(201,35,55,0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <p 
                    className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#f5f1e8'
                    }}
                  >
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
              <div 
                className="relative p-12 rounded-lg text-center overflow-hidden border transition-all group"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.5))'
                    : 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(245, 241, 232, 0.9))',
                  borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                  boxShadow: theme === 'light' ? '0 4px 16px rgba(0, 0, 0, 0.08)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.5)' : 'rgba(201, 35, 55, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                }}
              >
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

          {/* Serviços Relacionados - INTERNAL LINKING para SEO */}
          {relatedServices.length > 0 && (
            <section 
              ref={(el) => { sectionRefs.current[5] = el }}
              className="section-container opacity-0"
            >
              <span className="section-eyebrow">
                <span>🔗</span>
                {lang === 'pt' ? 'SERVIÇOS RELACIONADOS' : lang === 'es' ? 'SERVICIOS RELACIONADOS' : lang === 'fr' ? 'SERVICES CONNEXES' : 'RELATED SERVICES'}
              </span>
              <h2 className="section-title">
                {lang === 'pt' ? 'Serviços Relacionados' : lang === 'es' ? 'Servicios Relacionados' : lang === 'fr' ? 'Services Connexes' : 'Related Services'}
              </h2>
              <p className="text-center text-theme-text-secondary mb-8 max-w-2xl mx-auto">
                {lang === 'pt' ? 'Explore outros serviços que podem complementar seu projeto:' : lang === 'es' ? 'Explora otros servicios que pueden complementar tu proyecto:' : lang === 'fr' ? 'Explorez d\'autres services qui peuvent compléter votre projet:' : 'Explore other services that can complement your project:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedServices.map((related) => {
                  const relatedTitle = getServiceTitle(related, lang)
                  const relatedShortDesc = getServiceShortDesc(related, lang)
                  return (
                    <LangLink
                      key={related.slug}
                      to={`/what/${related.slug}`}
                      onClick={() => trackInteraction('service_related_click', { from: slug, to: related.slug })}
                      className="group relative overflow-hidden rounded-xl border transition-all p-6 hover:scale-[1.02] backdrop-blur-sm"
                      style={{
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                          : 'linear-gradient(135deg, rgba(30, 28, 26, 0.7) 0%, rgba(26, 24, 21, 0.5) 100%)',
                        borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                        boxShadow: theme === 'dark' 
                          ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                          : '0 4px 16px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#c92337'
                        e.currentTarget.style.boxShadow = theme === 'dark' 
                          ? '0 12px 40px rgba(201, 35, 55, 0.3)'
                          : '0 12px 40px rgba(201, 35, 55, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                        e.currentTarget.style.boxShadow = theme === 'dark' 
                          ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                          : '0 4px 16px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="text-3xl mb-3">{related.icon}</div>
                      <h3 
                        className="font-handel text-lg uppercase tracking-wide mb-2 group-hover:text-azimut-red transition-colors"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#f5f1e8'
                        }}
                      >
                        {relatedTitle}
                      </h3>
                      <p 
                        className="text-sm line-clamp-3"
                        style={{
                          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(245, 241, 232, 0.8)'
                        }}
                      >
                        {relatedShortDesc}
                      </p>
                      <span className="absolute bottom-4 right-4 text-azimut-red text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </LangLink>
                  )
                })}
              </div>
            </section>
          )}

          {/* Projetos relacionados - Apenas para outros serviços */}
          {slug !== 'educacao-treinamento' && slug !== 'consultoria-estrategia' && (
            <section 
              ref={(el) => { sectionRefs.current[6] = el }}
              className="section-container opacity-0"
            >
              <span className="section-eyebrow">
                <span>🎬</span>
                {t.relatedProjects.toUpperCase()}
              </span>
              <h2 className="section-title">
                {t.relatedProjects}
              </h2>
              <div 
                className="relative p-12 rounded-lg text-center overflow-hidden border backdrop-blur-sm"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                    : 'linear-gradient(135deg, rgba(30, 28, 26, 0.7) 0%, rgba(26, 24, 21, 0.5) 100%)',
                  borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Padrão de fundo */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(201,35,55,0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <p 
                    className="text-lg mb-8 opacity-70"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#f5f1e8'
                    }}
                  >
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

          {/* FAQs - Perguntas Frequentes (backoffice ou fallback estático) */}
          {faqs.length > 0 && (
            <section 
              ref={(el) => { sectionRefs.current[7] = el }}
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
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group relative overflow-hidden rounded-xl border transition-all backdrop-blur-sm"
                    style={{
                      background: theme === 'dark' 
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                        : 'linear-gradient(135deg, rgba(30, 28, 26, 0.7) 0%, rgba(26, 24, 21, 0.5) 100%)',
                      borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)',
                      boxShadow: theme === 'dark' 
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                        : '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#c92337'
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 12px 40px rgba(201, 35, 55, 0.3)'
                        : '0 12px 40px rgba(201, 35, 55, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.3)'
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                        : '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <summary 
                      className="cursor-pointer p-6 font-sora text-base font-semibold hover:text-azimut-red transition-colors flex items-center justify-between list-none"
                      style={{
                        color: theme === 'dark' ? '#ffffff' : '#f5f1e8'
                      }}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-azimut-red text-xl font-bold transition-transform group-open:rotate-180 flex-shrink-0">▼</span>
                    </summary>
                    <div 
                      className="px-6 pb-6 pt-0 leading-relaxed"
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(245, 241, 232, 0.8)'
                      }}
                    >
                      <p className="text-sm md:text-base">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Navegação Final - Padronizada com fundo bege no tema claro */}
          <PageFooterNavigation
            lang={lang}
            mainCta={{
              title: lang === 'pt' ? 'Vamos criar algo incrível juntos?' : lang === 'es' ? '¿Vamos a crear algo increíble juntos?' : lang === 'fr' ? 'Créons quelque chose d\'incroyable ensemble?' : 'Let\'s create something incredible together?',
              description: lang === 'pt' ? 'Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade.' : lang === 'es' ? 'Contáctenos para discutir su proyecto y descubrir cómo podemos transformar su visión en realidad.' : lang === 'fr' ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité.' : 'Get in touch to discuss your project and discover how we can transform your vision into reality.',
              buttonText: t.startProject,
              buttonHref: '/contact'
            }}
            navigation={{
              previous: {
                label: t.backToServices,
                href: '/what',
                icon: '←'
              }
            }}
          />
        </div>
      </main>
    </>
  )
}

export default ServiceDetail
