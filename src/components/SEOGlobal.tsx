// ════════════════════════════════════════════════════════════
// SEO GLOBAL - Schemas JSON-LD para TODAS as páginas
// ════════════════════════════════════════════════════════════
// Este componente é incluído no Layout.tsx e injeta schemas
// globais em todas as páginas automaticamente.
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { type Lang } from '../i18n'

interface SEOGlobalProps {
  lang: Lang
}

const SEOGlobal: React.FC<SEOGlobalProps> = ({ lang }) => {
  const location = useLocation()
  const baseUrl = 'https://azmt.com.br'
  const currentUrl = `${baseUrl}${location.pathname}`

  // ════════════════════════════════════════════════════════════
  // ORGANIZATION SCHEMA - Informações da empresa
  // ════════════════════════════════════════════════════════════
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Azimut',
    alternateName: ['Azimut Studio', 'Azimut Academy', 'Azimut Immersive'],
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo-azimut-star.svg`,
      width: 512,
      height: 512
    },
    image: `${baseUrl}/og-image.png`,
    description: getDescription(lang),
    foundingDate: '1996',
    founder: {
      '@type': 'Person',
      name: 'Ranz'
    },
    // Múltiplos endereços (Brasil e Canadá)
    address: [
      {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressLocality: 'Rio de Janeiro',
        addressRegion: 'RJ',
        postalCode: '22041-080'
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressLocality: 'Florianópolis',
        addressRegion: 'SC'
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'CA',
        addressLocality: 'Vancouver',
        addressRegion: 'BC'
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'contact@azimutimmersive.com',
        availableLanguage: ['Portuguese', 'English', 'Spanish', 'French']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Sales',
        email: 'academy@azimutimmersive.com',
        availableLanguage: ['Portuguese', 'English', 'Spanish', 'French']
      }
    ],
    sameAs: [
      'https://www.instagram.com/azimutimmersive',
      'https://www.linkedin.com/company/azimut-immersive',
      'https://www.facebook.com/azimutimmersive',
      'https://www.youtube.com/@azimutimmersive',
      'https://vimeo.com/azimutimmersive'
    ],
    areaServed: [
      { '@type': 'Country', name: 'Brazil' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' }
    ],
    knowsAbout: [
      'Virtual Reality Production',
      'Augmented Reality',
      'Mixed Reality',
      'Immersive Experiences',
      'Film Production',
      'VFX',
      '3D Animation',
      'Game Design',
      'Interactive Museums',
      'Cultural Exhibitions',
      'Educational Consulting',
      'Vancouver Film School',
      'VanArts'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Azimut Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'pt' ? 'Produção VR/AR' : 'VR/AR Production'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'pt' ? 'Experiências Imersivas' : 'Immersive Experiences'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'pt' ? 'Academy - Cursos VFX' : 'Academy - VFX Courses'
          }
        }
      ]
    }
  }

  // ════════════════════════════════════════════════════════════
  // WEBSITE SCHEMA - Informações do site
  // ════════════════════════════════════════════════════════════
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Azimut',
    url: baseUrl,
    description: getDescription(lang),
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    inLanguage: [
      { '@type': 'Language', name: 'Portuguese', alternateName: 'pt' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'French', alternateName: 'fr' }
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${lang}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  // ════════════════════════════════════════════════════════════
  // SITE NAVIGATION ELEMENT - Menu principal
  // ════════════════════════════════════════════════════════════
  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${baseUrl}/#navigation`,
    name: 'Main Navigation',
    hasPart: [
      {
        '@type': 'WebPage',
        name: lang === 'pt' ? 'Início' : 'Home',
        url: `${baseUrl}/${lang}`
      },
      {
        '@type': 'WebPage',
        name: lang === 'pt' ? 'O Que Fazemos' : 'What We Do',
        url: `${baseUrl}/${lang}/what`
      },
      {
        '@type': 'WebPage',
        name: lang === 'pt' ? 'Trabalhos' : 'Work',
        url: `${baseUrl}/${lang}/work`
      },
      {
        '@type': 'WebPage',
        name: 'Academy',
        url: `${baseUrl}/${lang}/academy`
      },
      {
        '@type': 'WebPage',
        name: lang === 'pt' ? 'Estúdio' : 'Studio',
        url: `${baseUrl}/${lang}/studio`
      },
      {
        '@type': 'WebPage',
        name: lang === 'pt' ? 'Contato' : 'Contact',
        url: `${baseUrl}/${lang}/contact`
      }
    ]
  }

  // ════════════════════════════════════════════════════════════
  // LOCAL BUSINESS SCHEMA - Para SEO local (Rio, Floripa, Vancouver)
  // ════════════════════════════════════════════════════════════
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Azimut - Experiências Imersivas',
    image: `${baseUrl}/og-image.png`,
    url: baseUrl,
    telephone: '+55-21-99999-9999',
    email: 'contact@azimutimmersive.com',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Copacabana',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      postalCode: '22041-080',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.9707,
      longitude: -43.1824
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  }

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Navigation Schema */}
      <script type="application/ld+json">
        {JSON.stringify(navigationSchema)}
      </script>
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// HELPER: Descrição por idioma
// ════════════════════════════════════════════════════════════
function getDescription(lang: Lang): string {
  const descriptions = {
    pt: 'Estúdio pioneiro em experiências imersivas, VR/AR, cinema interativo e exposições culturais. Academy com cursos de VFX, Animação e preparação para VFS/VanArts Vancouver. Atuando entre Brasil e Canadá desde 1996.',
    en: 'Pioneer studio in immersive experiences, VR/AR, interactive cinema and cultural exhibitions. Academy with VFX, Animation courses and preparation for VFS/VanArts Vancouver. Operating between Brazil and Canada since 1996.',
    es: 'Estudio pionero en experiencias inmersivas, VR/AR, cine interactivo y exposiciones culturales. Academy con cursos de VFX, Animación y preparación para VFS/VanArts Vancouver. Operando entre Brasil y Canadá desde 1996.',
    fr: 'Studio pionnier en expériences immersives, VR/AR, cinéma interactif et expositions culturelles. Academy avec cours VFX, Animation et préparation VFS/VanArts Vancouver. Opérant entre le Brésil et le Canada depuis 1996.'
  }
  return descriptions[lang] || descriptions.en
}

export default SEOGlobal
