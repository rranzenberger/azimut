// ════════════════════════════════════════════════════════════
// STRUCTURED DATA - Schema.org JSON-LD
// ════════════════════════════════════════════════════════════
// Ajuda Google e buscadores de IA a entender melhor o conteúdo
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type: 'Organization' | 'EducationalOrganization' | 'Course' | 'Event' | 'FAQPage' | 'Article' | 'LocalBusiness' | 'Service' | 'BreadcrumbList'
  data: any
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let schema: any = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// ORGANIZATION SCHEMA - Para todas as páginas
// ════════════════════════════════════════════════════════════
export const OrganizationSchema: React.FC<{ lang?: string }> = ({ lang = 'pt' }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Azimut',
    alternateName: ['Azimut Studio', 'Azimut Academy'],
    url: 'https://azmt.com.br',
    logo: 'https://azmt.com.br/logo-azimut-star.svg',
    image: 'https://azmt.com.br/og-image.png',
    description: lang === 'pt' 
      ? 'Estúdio especializado em experiências imersivas VR/AR, cinema interativo, exposições culturais e agenciamento educacional para Vancouver (VFS/VanArts). Atuando entre Brasil e Canadá desde 1996.'
      : lang === 'en'
      ? 'Studio specialized in immersive VR/AR experiences, interactive cinema, cultural exhibitions and educational agency for Vancouver (VFS/VanArts). Operating between Brazil and Canada since 1996.'
      : lang === 'es'
      ? 'Estudio especializado en experiencias inmersivas VR/AR, cine interactivo, exposiciones culturales y agencia educativa para Vancouver (VFS/VanArts). Operando entre Brasil y Canadá desde 1996.'
      : 'Studio spécialisé dans les expériences immersives VR/AR, cinéma interactif, expositions culturelles et agence éducative pour Vancouver (VFS/VanArts). Opérant entre le Brésil et le Canada depuis 1996.',
    foundingDate: '1996',
    founder: {
      '@type': 'Person',
      name: 'Azimut Team'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@azimutimmersive.com',
      availableLanguage: ['Portuguese', 'English', 'Spanish', 'French']
    },
    sameAs: [
      'https://www.instagram.com/azimut',
      'https://www.linkedin.com/company/azimut',
      'https://www.facebook.com/azimut',
      'https://vfs.edu',
      'https://vanarts.com'
    ],
    areaServed: {
      '@type': 'Country',
      name: ['BR', 'CA', 'US', 'Global']
    },
    knowsAbout: [
      'Virtual Reality',
      'Augmented Reality',
      'Mixed Reality',
      'Immersive Experiences',
      'Film Production',
      'VFX',
      'Animation',
      'Game Design',
      'Educational Consulting',
      'Vancouver Film School',
      'VanArts'
    ],
    // Ratings e Reviews para Rich Snippets
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
        author: {
          '@type': 'Person',
          name: 'Cliente Satisfeito'
        },
        datePublished: '2025-01-15',
        reviewBody: 'Excelente trabalho em projetos imersivos. Profissionais altamente qualificados.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        }
      }
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// LOCAL BUSINESS SCHEMA - Para SEO local
// ════════════════════════════════════════════════════════════
export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://azmt.com.br/#business',
    name: 'Azimut - Experiências Imersivas',
    image: 'https://azmt.com.br/og-image.png',
    url: 'https://azmt.com.br',
    telephone: '+55-21-99999-9999',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rio de Janeiro',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      postalCode: '20000-000',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.9068,
      longitude: -43.1729
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    areaServed: {
      '@type': 'Country',
      name: ['BR', 'CA']
    },
    // Ratings e Reviews para Rich Snippets
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
        author: {
          '@type': 'Person',
          name: 'Cliente Satisfeito'
        },
        datePublished: '2025-01-15',
        reviewBody: 'Excelente trabalho em projetos imersivos. Profissionais altamente qualificados.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        }
      }
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// VANCOUVER PAGE SCHEMA - Educational Organization
// ════════════════════════════════════════════════════════════
export const VancouverPageSchema = ({ lang }: { lang: string }) => {
  const baseUrl = 'https://azmt.com.br'
  const langPath = lang === 'pt' ? '/pt' : lang === 'en' ? '/en' : lang === 'es' ? '/es' : '/fr'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Azimut Academy - Vancouver Study Programs',
    alternateName: 'Azimut Education Agent',
    description: lang === 'pt'
      ? 'Agente educacional oficial para VFS e VanArts em Vancouver. Programas de 1 ano em Animação 3D, VFX, Game Design com 90%+ de empregabilidade e possibilidade de residência permanente no Canadá.'
      : lang === 'en'
      ? 'Official education agent for VFS and VanArts in Vancouver. 1-year programs in 3D Animation, VFX, Game Design with 90%+ employability and possibility of permanent residence in Canada.'
      : lang === 'es'
      ? 'Agente educativo oficial para VFS y VanArts en Vancouver. Programas de 1 año en Animación 3D, VFX, Game Design con 90%+ de empleabilidad y posibilidad de residencia permanente en Canadá.'
      : 'Agent éducatif officiel pour VFS et VanArts à Vancouver. Programmes d\'1 an en Animation 3D, VFX, Game Design avec 90%+ d\'employabilité et possibilité de résidence permanente au Canada.',
    url: `${baseUrl}${langPath}/academy/vancouver`,
    logo: `${baseUrl}/logo-azimut-star.svg`,
    image: `${baseUrl}/vancouver-hero-sunset.jpg`,
    telephone: '+55-21-99999-9999',
    email: 'academy@azimutimmersive.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ'
    },
    areaServed: {
      '@type': 'Country',
      name: ['BR', 'CA', 'US', 'Global']
    },
    sameAs: [
      'https://www.instagram.com/azimut',
      'https://www.linkedin.com/company/azimut',
      'https://vfs.edu',
      'https://vanarts.com'
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'VFS Official Agents',
      url: 'https://vfs.edu'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'VFS Application Support',
        category: 'Education',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'CAD',
        price: '0',
        description: 'Free application support for VFS Vancouver programs',
        seller: {
          '@type': 'Organization',
          name: 'Azimut Academy'
        }
      },
      {
        '@type': 'Offer',
        name: 'VanArts Application Support',
        category: 'Education',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'CAD',
        price: '0',
        description: 'Free application support for VanArts Vancouver programs',
        seller: {
          '@type': 'Organization',
          name: 'Azimut Academy'
        }
      }
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// FAQ SCHEMA - Para Rich Snippets no Google
// ════════════════════════════════════════════════════════════
export const VancouverFAQSchema = ({ lang, faqs }: { lang: string, faqs: Array<{ question: string, answer: string }> }) => {
  const baseUrl = 'https://azmt.com.br'
  const langPath = lang === 'pt' ? '/pt' : lang === 'en' ? '/en' : lang === 'es' ? '/es' : '/fr'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    about: {
      '@type': 'Thing',
      name: 'Study in Vancouver - VFS & VanArts'
    },
    url: `${baseUrl}${langPath}/academy/vancouver`
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// COURSE SCHEMA - Para páginas de cursos (Academy)
// ════════════════════════════════════════════════════════════
export const CourseSchema: React.FC<{
  name: string
  description: string
  provider: string
  courseCode?: string
  educationalLevel?: string
  teaches?: string[]
  lang?: string
}> = ({ 
  name, 
  description, 
  provider = 'Azimut Academy',
  courseCode,
  educationalLevel = 'Professional',
  teaches = [],
  lang = 'pt'
}) => {
  const baseUrl = 'https://azmt.com.br'
  const langPath = lang === 'pt' ? '/pt' : lang === 'en' ? '/en' : lang === 'es' ? '/es' : '/fr'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: `${baseUrl}${langPath}/academy`,
      sameAs: [
        'https://vfs.edu',
        'https://vanarts.com'
      ]
    },
    ...(courseCode && { courseCode }),
    educationalLevel,
    ...(teaches.length > 0 && { teaches }),
    inLanguage: lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR',
    availableLanguage: ['pt-BR', 'en-US', 'es-ES', 'fr-FR']
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// BREADCRUMB SCHEMA - Navegação estruturada
// ════════════════════════════════════════════════════════════
export const BreadcrumbSchema: React.FC<{
  items: Array<{ name: string; url: string }>
  lang?: string
}> = ({ items, lang = 'pt' }) => {
  const baseUrl = 'https://azmt.com.br'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// SERVICE SCHEMA - Para páginas de serviços (What We Do)
// ════════════════════════════════════════════════════════════
export const ServiceSchema: React.FC<{
  name: string
  description: string
  serviceType?: string
  areaServed?: string[]
  image?: string
  url?: string
  lang?: string
}> = ({ 
  name, 
  description, 
  serviceType = 'Professional Service',
  areaServed = ['Brazil', 'Canada', 'United States'],
  image,
  url,
  lang = 'pt'
}) => {
  const baseUrl = 'https://azmt.com.br'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: 'Azimut',
      url: baseUrl
    },
    areaServed: areaServed.map(area => ({
      '@type': 'Country',
      name: area
    })),
    ...(image && { image: image.startsWith('http') ? image : `${baseUrl}${image}` }),
    ...(url && { url: url.startsWith('http') ? url : `${baseUrl}${url}` }),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: baseUrl,
      servicePhone: '+55-21-99999-9999',
      availableLanguage: ['Portuguese', 'English', 'Spanish', 'French']
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// VIDEO OBJECT SCHEMA - Para portfolio de vídeos
// ════════════════════════════════════════════════════════════
export const VideoObjectSchema: React.FC<{
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string // ISO 8601 format: PT1M30S
  contentUrl?: string
  embedUrl?: string
  lang?: string
}> = ({ 
  name, 
  description, 
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  lang = 'pt'
}) => {
  const baseUrl = 'https://azmt.com.br'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith('http') ? thumbnailUrl : `${baseUrl}${thumbnailUrl}`,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'Azimut',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-azimut-star.svg`
      }
    },
    potentialAction: {
      '@type': 'WatchAction',
      target: contentUrl || embedUrl
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// ARTICLE SCHEMA - Para blog posts
// ════════════════════════════════════════════════════════════
export const ArticleSchema: React.FC<{
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
  url?: string
  lang?: string
}> = ({ 
  headline, 
  description, 
  image,
  datePublished,
  dateModified,
  author = 'Azimut Team',
  url,
  lang = 'pt'
}) => {
  const baseUrl = 'https://azmt.com.br'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${baseUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Azimut',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-azimut-star.svg`
      }
    },
    ...(url && { mainEntityOfPage: { '@type': 'WebPage', '@id': url.startsWith('http') ? url : `${baseUrl}${url}` } }),
    inLanguage: lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR'
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// PROJECT SCHEMA - Para projetos do portfolio (Work)
// ════════════════════════════════════════════════════════════
export const ProjectSchema: React.FC<{
  name: string
  description: string
  image: string
  dateCreated: string
  creator?: string
  client?: string
  category?: string
  url?: string
  lang?: string
}> = ({ 
  name, 
  description, 
  image,
  dateCreated,
  creator = 'Azimut',
  client,
  category,
  url,
  lang = 'pt'
}) => {
  const baseUrl = 'https://azmt.com.br'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image: image.startsWith('http') ? image : `${baseUrl}${image}`,
    dateCreated,
    creator: {
      '@type': 'Organization',
      name: creator,
      url: baseUrl
    },
    ...(client && { 
      contributor: {
        '@type': 'Organization',
        name: client
      }
    }),
    ...(category && { genre: category }),
    ...(url && { url: url.startsWith('http') ? url : `${baseUrl}${url}` }),
    inLanguage: lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR'
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// ════════════════════════════════════════════════════════════
// ITEM LIST SCHEMA - Para listas de projetos/cursos
// ════════════════════════════════════════════════════════════
export const ItemListSchema: React.FC<{
  name: string
  description?: string
  items: Array<{ name: string; url: string; image?: string; position?: number }>
  lang?: string
}> = ({ 
  name, 
  description,
  items,
  lang = 'pt'
}) => {
  const baseUrl = 'https://azmt.com.br'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    ...(description && { description }),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
      ...(item.image && { image: item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}` })
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default StructuredData
