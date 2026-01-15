// ════════════════════════════════════════════════════════════
// STRUCTURED DATA - Schema.org JSON-LD
// ════════════════════════════════════════════════════════════
// Ajuda Google e buscadores de IA a entender melhor o conteúdo
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type: 'Organization' | 'EducationalOrganization' | 'Course' | 'Event' | 'FAQPage' | 'Article' | 'LocalBusiness'
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
      email: 'contact@azmt.com.br',
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
    '@id': 'https://azmt.com.br',
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
    email: 'academy@azmt.com.br',
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

export default StructuredData
