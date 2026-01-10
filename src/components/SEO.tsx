// ════════════════════════════════════════════════════════════
// SEO COMPONENT - Meta Tags Otimizadas
// ════════════════════════════════════════════════════════════
// Componente reutilizável para SEO em todas as páginas
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  locale?: 'pt_BR' | 'en_US' | 'es_ES' | 'fr_FR'
  noindex?: boolean
  canonical?: string
}

const SEO: React.FC<SEOProps> = ({
  title = 'Azimut - Produção Audiovisual, Experiências Imersivas & Academy',
  description = 'Produtora pioneira em experiências imersivas, VR, AR e projetos culturais. Academy: Cursos de VFX, Animação, Game Design e preparação para VFS/VanArts Vancouver.',
  keywords = 'produtora audiovisual, VR, AR, realidade virtual, experiências imersivas, VFX, animação, game design, Vancouver, VFS, VanArts, cursos cinema, produção cultural',
  image = 'https://azmt.com.br/og-image.jpg',
  url = 'https://azmt.com.br',
  type = 'website',
  author = 'Azimut',
  publishedTime,
  modifiedTime,
  locale = 'pt_BR',
  noindex = false,
  canonical
}) => {
  const siteUrl = 'https://azmt.com.br'
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`
  const canonicalUrl = canonical || fullUrl

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Azimut" />
      <meta property="og:locale" content={locale} />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@azimut" />
      <meta name="twitter:creator" content="@azimut" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content={locale.split('_')[0]} />
      
      {/* Preconnect to improve performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="https://img.youtube.com" />
    </Helmet>
  )
}

export default SEO
