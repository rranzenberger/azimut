// ════════════════════════════════════════════════════════════
// STRUCTURED DATA - Schema.org JSON-LD
// ════════════════════════════════════════════════════════════
// Ajuda Google a entender melhor o conteúdo
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type: 'Organization' | 'EducationalOrganization' | 'Course' | 'Event' | 'FAQPage' | 'Article'
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

// Helper: Schema para página Vancouver
export const VancouverPageSchema = ({ lang }: { lang: string }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Azimut Academy - Vancouver Study Programs',
    description: 'Official education agent for VFS and VanArts in Vancouver. 1-year programs in 3D Animation, VFX, Game Design with 90%+ employability.',
    url: 'https://azmt.com.br/academy/vancouver',
    logo: 'https://azmt.com.br/logo.png',
    image: 'https://azmt.com.br/images/vancouver-hero.jpg',
    telephone: '+55-21-99999-9999',
    email: 'academy@azmt.com.br',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'Rio de Janeiro'
    },
    sameAs: [
      'https://www.instagram.com/azimut',
      'https://www.linkedin.com/company/azimut',
      'https://www.facebook.com/azimut'
    ],
    offers: {
      '@type': 'Offer',
      category: 'Education',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'CAD',
      price: '35000',
      description: 'Complete study package for Vancouver including VFS/VanArts application support'
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

// Helper: FAQ Schema para Vancouver
export const VancouverFAQSchema = ({ lang, faqs }: { lang: string, faqs: Array<{ question: string, answer: string }> }) => {
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
