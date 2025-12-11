import React from 'react'
import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'article' | 'breadcrumb'
  data?: Record<string, any>
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'organization', data = {} }) => {
  const getStructuredData = () => {
    const baseUrl = 'https://azimut.com' // TODO: usar variável de ambiente
    
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Azimut',
          alternateName: 'Azimut Immersive',
          url: baseUrl,
          logo: `${baseUrl}/logo-azimut-star.svg`,
          description: 'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos',
          foundingDate: '2015',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contact@azimut.com',
            availableLanguage: ['Portuguese', 'English', 'French', 'Spanish']
          },
          sameAs: [
            'https://www.linkedin.com/company/azimut',
            'https://www.instagram.com/azimut',
            // Adicionar outras redes sociais
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CA'
          },
          ...data
        }
      
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Azimut',
          url: baseUrl,
          description: 'Experiências imersivas, interativas e cinematográficas',
          inLanguage: ['pt-BR', 'en-CA', 'fr-CA', 'es'],
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          ...data
        }
      
      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          publisher: {
            '@type': 'Organization',
            name: 'Azimut',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo-azimut-star.svg`
            }
          },
          ...data
        }
      
      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items || []
        }
      
      default:
        return data
    }
  }

  const structuredData = getStructuredData()

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default StructuredData












