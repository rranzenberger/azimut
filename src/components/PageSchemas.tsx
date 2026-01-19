// ════════════════════════════════════════════════════════════
// PAGE-SPECIFIC SCHEMAS - Schema.org JSON-LD para SEO
// ════════════════════════════════════════════════════════════
// Adiciona schemas específicos automaticamente baseado na página
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { type Lang } from '../i18n'

interface PageSchemasProps {
  lang: Lang
  pageType?: 'home' | 'services' | 'work' | 'academy' | 'contact' | 'blog' | 'studio' | 'vancouver'
  customData?: any
}

export const PageSchemas: React.FC<PageSchemasProps> = ({ lang, pageType, customData }) => {
  const location = useLocation()
  const baseUrl = 'https://azmt.com.br'
  const currentUrl = `${baseUrl}${location.pathname}`

  // ═══════════════════════════════════════════════════════
  // HOME PAGE SCHEMAS
  // ═══════════════════════════════════════════════════════
  const homeSchemas = () => ([
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#organization`,
      name: 'Azimut',
      image: `${baseUrl}/og-image.png`,
      logo: `${baseUrl}/logo-azimut-star.svg`,
      url: baseUrl,
      telephone: '+55-11-98765-4321',
      email: 'contato@azmt.com.br',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Augusta',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        postalCode: '01305-000',
        addressCountry: 'BR'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -23.5505,
        longitude: -46.6333
      },
      areaServed: [
        { '@type': 'Country', name: 'Brasil' },
        { '@type': 'Country', name: 'Canada' }
      ],
      foundingDate: '1996',
      description: lang === 'pt'
        ? 'Estúdio especializado em experiências imersivas VR/AR, cinema interativo e exposições culturais. Agenciamento educacional VFS/VanArts Vancouver.'
        : 'Studio specialized in immersive VR/AR experiences, interactive cinema and cultural exhibitions. Educational agency for VFS/VanArts Vancouver.',
      slogan: lang === 'pt'
        ? 'Experiências Imersivas que Transformam'
        : 'Immersive Experiences that Transform',
      priceRange: '$$-$$$',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer, PIX',
      openingHours: 'Mo-Fr 09:00-18:00',
      sameAs: [
        'https://www.linkedin.com/company/azimut',
        'https://www.instagram.com/azimut.studio',
        'https://www.facebook.com/azimut.studio',
        'https://twitter.com/azimut_studio'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Azimut',
      description: lang === 'pt'
        ? 'Experiências imersivas VR/AR, cinema interativo, exposições culturais e educação em Vancouver'
        : 'Immersive VR/AR experiences, interactive cinema, cultural exhibitions and Vancouver education',
      publisher: {
        '@id': `${baseUrl}/#organization`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/${lang}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: [lang.toUpperCase(), 'pt-BR', 'en-US', 'es-ES', 'fr-CA']
    }
  ])

  // ═══════════════════════════════════════════════════════
  // SERVICES PAGE SCHEMAS
  // ═══════════════════════════════════════════════════════
  const servicesSchemas = () => ([
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: lang === 'pt' ? 'Serviços Azimut' : 'Azimut Services',
      description: lang === 'pt'
        ? 'Experiências imersivas, cinema interativo, exposições culturais e educação'
        : 'Immersive experiences, interactive cinema, cultural exhibitions and education',
      itemListElement: [
        {
          '@type': 'Service',
          name: lang === 'pt' ? 'Experiências Imersivas VR/AR' : 'Immersive VR/AR Experiences',
          description: lang === 'pt'
            ? 'Criação de experiências imersivas em realidade virtual e aumentada para museus, eventos e marcas'
            : 'Creation of immersive experiences in virtual and augmented reality for museums, events and brands',
          provider: { '@id': `${baseUrl}/#organization` },
          serviceType: 'Virtual Reality Production',
          areaServed: ['BR', 'CA'],
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `${baseUrl}/${lang}/what`,
            servicePhone: '+55-11-98765-4321',
            serviceLocation: {
              '@type': 'Place',
              address: { '@type': 'PostalAddress', addressCountry: 'BR' }
            }
          }
        },
        {
          '@type': 'Service',
          name: lang === 'pt' ? 'Cinema Interativo 360º' : 'Interactive 360º Cinema',
          description: lang === 'pt'
            ? 'Produção de cinema interativo 360º com narrativas imersivas'
            : 'Interactive 360º cinema production with immersive narratives',
          provider: { '@id': `${baseUrl}/#organization` },
          serviceType: 'Interactive Cinema Production'
        },
        {
          '@type': 'Service',
          name: lang === 'pt' ? 'Exposições Culturais' : 'Cultural Exhibitions',
          description: lang === 'pt'
            ? 'Curadoria e produção de exposições culturais com tecnologia imersiva'
            : 'Curation and production of cultural exhibitions with immersive technology',
          provider: { '@id': `${baseUrl}/#organization` },
          serviceType: 'Cultural Exhibition Design'
        },
        {
          '@type': 'EducationalOrganization',
          name: lang === 'pt' ? 'Azimut Academy - Agenciamento VFS/VanArts' : 'Azimut Academy - VFS/VanArts Agency',
          description: lang === 'pt'
            ? 'Agenciamento educacional para Vancouver Film School e VanArts. Suporte completo para estudar cinema e artes digitais no Canadá.'
            : 'Educational agency for Vancouver Film School and VanArts. Complete support to study film and digital arts in Canada.',
          provider: { '@id': `${baseUrl}/#organization` },
          areaServed: ['BR', 'PT', 'ES', 'AR'],
          educationalCredentialAwarded: 'Diploma',
          offers: {
            '@type': 'Offer',
            category: lang === 'pt' ? 'Educação Superior' : 'Higher Education',
            areaServed: 'Worldwide'
          }
        }
      ]
    }
  ])

  // ═══════════════════════════════════════════════════════
  // ACADEMY PAGE SCHEMAS
  // ═══════════════════════════════════════════════════════
  const academySchemas = () => ([
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Azimut Academy',
      description: lang === 'pt'
        ? 'Agenciamento educacional para Vancouver Film School (VFS) e VanArts. Suporte completo para brasileiros estudarem cinema, animação, game design e artes digitais no Canadá.'
        : 'Educational agency for Vancouver Film School (VFS) and VanArts. Complete support for Brazilians to study film, animation, game design and digital arts in Canada.',
      url: `${baseUrl}/${lang}/academy`,
      logo: `${baseUrl}/logo-azimut-star.svg`,
      parentOrganization: { '@id': `${baseUrl}/#organization` },
      areaServed: ['BR', 'PT', 'ES', 'AR', 'MX'],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressLocality: 'São Paulo'
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Vancouver Film School',
          url: 'https://vfs.edu',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CA',
            addressLocality: 'Vancouver'
          }
        },
        {
          '@type': 'EducationalOrganization',
          name: 'VanArts',
          url: 'https://vanarts.com',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CA',
            addressLocality: 'Vancouver'
          }
        }
      ],
      offers: {
        '@type': 'Offer',
        category: lang === 'pt' ? 'Assessoria Educacional' : 'Educational Consulting',
        priceCurrency: 'BRL',
        price: '0',
        description: lang === 'pt' ? 'Consultoria gratuita' : 'Free consultation'
      }
    }
  ])

  // ═══════════════════════════════════════════════════════
  // CONTACT PAGE SCHEMAS
  // ═══════════════════════════════════════════════════════
  const contactSchemas = () => ([
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: lang === 'pt' ? 'Contato - Azimut' : 'Contact - Azimut',
      description: lang === 'pt'
        ? 'Entre em contato com a Azimut para criar experiências imersivas ou estudar em Vancouver'
        : 'Contact Azimut to create immersive experiences or study in Vancouver',
      url: currentUrl,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+55-11-98765-4321',
            contactType: 'Customer Service',
            email: 'contato@azmt.com.br',
            availableLanguage: ['Portuguese', 'English', 'Spanish', 'French'],
            areaServed: ['BR', 'CA']
          },
          {
            '@type': 'ContactPoint',
            telephone: '+55-11-98765-4321',
            contactType: 'Sales',
            email: 'projetos@azmt.com.br',
            availableLanguage: ['Portuguese', 'English']
          },
          {
            '@type': 'ContactPoint',
            telephone: '+55-11-98765-4321',
            contactType: 'Education Support',
            email: 'academy@azmt.com.br',
            availableLanguage: ['Portuguese', 'English', 'Spanish']
          }
        ]
      }
    }
  ])

  // ═══════════════════════════════════════════════════════
  // WORK/PORTFOLIO PAGE SCHEMAS
  // ═══════════════════════════════════════════════════════
  const workSchemas = () => ([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: lang === 'pt' ? 'Portfólio - Azimut' : 'Portfolio - Azimut',
      description: lang === 'pt'
        ? 'Projetos de experiências imersivas VR/AR, cinema interativo e exposições culturais'
        : 'Immersive VR/AR experiences, interactive cinema and cultural exhibitions projects',
      url: currentUrl,
      hasPart: [] // Será preenchido dinamicamente com os projetos
    }
  ])

  // ═══════════════════════════════════════════════════════
  // VANCOUVER PAGE SCHEMAS
  // ═══════════════════════════════════════════════════════
  const vancouverSchemas = () => ([
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: lang === 'pt' ? 'Como funciona o agenciamento para VFS?' : 'How does VFS agency work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: lang === 'pt'
              ? 'A Azimut Academy oferece suporte completo para brasileiros que querem estudar na Vancouver Film School. Auxiliamos na escolha do curso, application, visto, acomodação e preparação para o Canadá.'
              : 'Azimut Academy offers complete support for Brazilians who want to study at Vancouver Film School. We assist in course selection, application, visa, accommodation and preparation for Canada.'
          }
        },
        {
          '@type': 'Question',
          name: lang === 'pt' ? 'Quais cursos posso fazer na VFS?' : 'What courses can I take at VFS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: lang === 'pt'
              ? 'VFS oferece cursos de Cinema, Animação, Game Design, VFX, Acting, Sound Design, VR/AR e muito mais. Todos com duração de 1 ano e focados em preparar profissionais para a indústria.'
              : 'VFS offers courses in Film, Animation, Game Design, VFX, Acting, Sound Design, VR/AR and more. All 1-year long and focused on preparing professionals for the industry.'
          }
        }
      ]
    }
  ])

  // ═══════════════════════════════════════════════════════
  // RENDER SCHEMAS
  // ═══════════════════════════════════════════════════════
  const getSchemas = () => {
    switch (pageType) {
      case 'home':
        return homeSchemas()
      case 'services':
        return servicesSchemas()
      case 'academy':
        return academySchemas()
      case 'contact':
        return contactSchemas()
      case 'work':
        return workSchemas()
      case 'vancouver':
        return vancouverSchemas()
      default:
        return []
    }
  }

  const schemas = getSchemas()

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default PageSchemas
