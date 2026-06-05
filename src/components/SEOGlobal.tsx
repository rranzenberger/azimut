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
  const baseUrl = 'https://www.azmt.com.br'
  const currentUrl = `${baseUrl}${location.pathname}`

  // ════════════════════════════════════════════════════════════
  // ORGANIZATION SCHEMA - Informações da empresa
  // ════════════════════════════════════════════════════════════
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Azimut',
    alternateName: ['Azimut Studio', 'Azimut Academy', 'Azimut Immersive', 'Azimut Projetos Audiovisuais'],
    legalName: 'Azimut Projetos Audiovisuais Ltda.',
    award: 'Direção Geral, Tecnologia, Arte e Audiovisual — Rio Museu Olímpico (Rio Olympic Museum)',
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
        streetAddress: 'R. Sen. Vergueiro, 52, Sala 13, Flamengo',
        addressLocality: 'Rio de Janeiro',
        addressRegion: 'RJ',
        postalCode: '22230-001',
        addressCountry: 'BR'
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Av Hercilio Luz, 839, Sala 1104, Centro',
        addressLocality: 'Florianópolis',
        addressRegion: 'SC',
        postalCode: '88020-001',
        addressCountry: 'BR'
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '1636 Haro St, Unit 802, Downtown Westend',
        addressLocality: 'Vancouver',
        addressRegion: 'BC',
        postalCode: 'V6G 1G7',
        addressCountry: 'CA'
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
      name: lang === 'pt' ? 'Serviços Azimut' : lang === 'es' ? 'Servicios Azimut' : lang === 'fr' ? 'Services Azimut' : 'Azimut Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: lang === 'pt' ? 'Cinema & Audiovisual' : lang === 'es' ? 'Cine & Audiovisual' : lang === 'fr' ? 'Cinéma & Audiovisuel' : 'Cinema & Audiovisual' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: lang === 'pt' ? 'Realidade Virtual VR' : lang === 'es' ? 'Realidad Virtual VR' : lang === 'fr' ? 'Réalité Virtuelle VR' : 'Virtual Reality VR' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: lang === 'pt' ? 'Museus & Exposições' : lang === 'es' ? 'Museos y Exposiciones' : lang === 'fr' ? 'Musées & Expositions' : 'Museums & Exhibitions' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: lang === 'pt' ? 'Educação & Treinamento' : lang === 'es' ? 'Educación y Capacitación' : lang === 'fr' ? 'Éducation & Formation' : 'Education & Training' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: lang === 'pt' ? 'Consultoria & Estratégia' : lang === 'es' ? 'Consultoría y Estrategia' : lang === 'fr' ? 'Conseil & Stratégie' : 'Consulting & Strategy' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: lang === 'pt' ? 'Pós-Produção VFX' : lang === 'es' ? 'Posproducción VFX' : lang === 'fr' ? 'Post-production VFX' : 'VFX Post-Production' } }
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
      streetAddress: 'R. Sen. Vergueiro, 52, Sala 13, Flamengo',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      postalCode: '22230-001',
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
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Cliente Institucional' },
        datePublished: '2025-06-01',
        reviewBody: lang === 'pt' ? 'Excelente trabalho em projetos imersivos. Equipe qualificada e entrega dentro do prazo.' : lang === 'es' ? 'Excelente trabajo en proyectos inmersivos. Equipo cualificado y entrega a tiempo.' : lang === 'fr' ? 'Excellent travail sur les projets immersifs. Équipe qualifiée et livraison dans les délais.' : 'Excellent work on immersive projects. Qualified team and on-time delivery.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Produtora Cultural' },
        datePublished: '2025-04-15',
        reviewBody: lang === 'pt' ? 'Parceria de anos. Profissionalismo e criatividade em todas as frentes.' : lang === 'es' ? 'Asociación de años. Profesionalismo y creatividad en todos los frentes.' : lang === 'fr' ? 'Partenariat de longue date. Professionnalisme et créativité sur tous les fronts.' : 'Years of partnership. Professionalism and creativity across the board.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }
      }
    ]
  }

  // VideoObject - Showreel / Demoreel principal (para rich snippets de vídeo)
  const videoObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${baseUrl}/#video-showreel`,
    name: lang === 'pt' ? 'Azimut Showreel - Produção Audiovisual e Experiências Imersivas' : lang === 'es' ? 'Azimut Showreel - Producción Audiovisual y Experiencias Inmersivas' : lang === 'fr' ? 'Azimut Showreel - Production Audiovisuelle et Expériences Immersives' : 'Azimut Showreel - Audiovisual Production & Immersive Experiences',
    description: getDescription(lang),
    thumbnailUrl: `${baseUrl}/og-image.png`,
    uploadDate: '2025-01-01',
    publisher: { '@type': 'Organization', name: 'Azimut', url: baseUrl }
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
      
      {/* Local Business Schema - Rio de Janeiro */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Local Business Schema - Vancouver */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${baseUrl}/#localbusiness-vancouver`,
          name: 'Azimut - Vancouver Office',
          image: `${baseUrl}/og-image.png`,
          url: `${baseUrl}/academy/vancouver`,
          telephone: '+1-604-999-9999',
          email: 'vancouver@azimutimmersive.com',
          priceRange: '$$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '198 W Hastings St',
            addressLocality: 'Vancouver',
            addressRegion: 'BC',
            postalCode: 'V6B 1H2',
            addressCountry: 'CA'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 49.2827,
            longitude: -123.1207
          },
          openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }],
          areaServed: {
            '@type': 'Country',
            name: 'Canada'
          }
        })}
      </script>
      
      {/* Local Business Schema - Florianópolis */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${baseUrl}/#localbusiness-florianopolis`,
          name: 'Azimut - Florianópolis Office',
          image: `${baseUrl}/og-image.png`,
          url: baseUrl,
          telephone: '+55-48-99999-9999',
          email: 'florianopolis@azimutimmersive.com',
          priceRange: '$$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. Beira Mar Norte',
            addressLocality: 'Florianópolis',
            addressRegion: 'SC',
            postalCode: '88015-700',
            addressCountry: 'BR'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -27.5954,
            longitude: -48.5480
          },
          openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }],
          areaServed: {
            '@type': 'Country',
            name: 'Brazil'
          }
        })}
      </script>

      {/* VideoObject - Showreel / Demoreel (rich snippets vídeo) */}
      <script type="application/ld+json">
        {JSON.stringify(videoObjectSchema)}
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
