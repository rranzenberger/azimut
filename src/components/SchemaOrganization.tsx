// ════════════════════════════════════════════════════════════
// SCHEMA.ORG - Organization Schema
// ════════════════════════════════════════════════════════════
// JSON-LD Schema.org para melhorar SEO e rich snippets
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SchemaOrganizationProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
}

const SchemaOrganization: React.FC<SchemaOrganizationProps> = ({
  name = 'Azimut',
  url = 'https://azmt.com.br',
  logo = 'https://azmt.com.br/logo-azimut-star.svg',
  description = 'Produtora pioneira em experiências imersivas, VR, AR e projetos culturais. Academy: Cursos de VFX, Animação, Game Design e preparação para VFS/VanArts Vancouver.',
  sameAs = [
    'https://instagram.com/azimut',
    'https://linkedin.com/company/azimut',
    'https://facebook.com/azimut'
  ],
  address = {
    streetAddress: 'Rio de Janeiro, RJ',
    addressLocality: 'Rio de Janeiro',
    addressRegion: 'RJ',
    postalCode: '22041-080',
    addressCountry: 'BR'
  }
}) => {
  // Endereços múltiplos (Rio de Janeiro e Vancouver)
  const addresses = [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Rio de Janeiro, RJ',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      postalCode: '22041-080',
      addressCountry: 'BR'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Vancouver, BC',
      addressLocality: 'Vancouver',
      addressRegion: 'BC',
      postalCode: 'V6B 1A1',
      addressCountry: 'CA'
    }
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo
    },
    description,
    sameAs,
    address: addresses.length === 1 ? addresses[0] : addresses,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Portuguese', 'English', 'Spanish', 'French']
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Brazil'
      },
      {
        '@type': 'Country',
        name: 'Canada'
      }
    ],
    offers: {
      '@type': 'Offer',
      category: 'Services',
      name: 'Immersive Experiences, VR/AR Production, Educational Agency'
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

export default SchemaOrganization
