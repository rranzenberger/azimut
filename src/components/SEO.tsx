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
      
            {/* Robots - Otimizado para Google, Bing e outros buscadores */}
            {noindex ? (
              <meta name="robots" content="noindex, nofollow" />
            ) : (
              <>
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="slurp" content="index, follow" />
                <meta name="duckduckbot" content="index, follow" />
                <meta name="yandex" content="index, follow" />
              </>
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

// ════════════════════════════════════════════════════════════
// SEO DATA - Dados pré-configurados para cada página
// ════════════════════════════════════════════════════════════

export const seoData = {
  home: {
    pt: {
      title: 'Azimut - Produção Audiovisual, Experiências Imersivas & Academy',
      description: 'Produtora pioneira em experiências imersivas, VR, AR e projetos culturais. Academy: Cursos de VFX, Animação, Game Design e preparação para VFS/VanArts Vancouver.',
      keywords: 'produtora audiovisual, VR, AR, realidade virtual, experiências imersivas, VFX, animação, game design, Vancouver, VFS, VanArts',
    },
    en: {
      title: 'Azimut - Audiovisual Production, Immersive Experiences & Academy',
      description: 'Pioneer in immersive experiences, VR, AR and cultural projects. Academy: VFX, Animation, Game Design courses and preparation for VFS/VanArts Vancouver.',
      keywords: 'audiovisual production, VR, AR, virtual reality, immersive experiences, VFX, animation, game design, Vancouver, VFS, VanArts',
    },
    es: {
      title: 'Azimut - Producción Audiovisual, Experiencias Inmersivas & Academy',
      description: 'Pionera en experiencias inmersivas, VR, AR y proyectos culturales. Academy: Cursos de VFX, Animación, Game Design y preparación para VFS/VanArts Vancouver.',
      keywords: 'producción audiovisual, VR, AR, realidad virtual, experiencias inmersivas, VFX, animación, game design, Vancouver, VFS, VanArts',
    },
    fr: {
      title: 'Azimut - Production Audiovisuelle, Expériences Immersives & Academy',
      description: 'Pionnière en expériences immersives, VR, AR et projets culturels. Academy: Cours VFX, Animation, Game Design et préparation VFS/VanArts Vancouver.',
      keywords: 'production audiovisuelle, VR, AR, réalité virtuelle, expériences immersives, VFX, animation, game design, Vancouver, VFS, VanArts',
    },
  },
  work: {
    pt: {
      title: 'Trabalhos - Portfolio Azimut',
      description: 'Conheça nossos projetos de VR, AR, exposições e experiências imersivas. 30 anos transformando ideias em realidade.',
      keywords: 'portfolio, projetos VR, exposições imersivas, realidade virtual, casos de sucesso',
    },
    en: {
      title: 'Work - Azimut Portfolio',
      description: 'Discover our VR, AR, exhibitions and immersive experiences projects. 30 years transforming ideas into reality.',
      keywords: 'portfolio, VR projects, immersive exhibitions, virtual reality, success cases',
    },
    es: {
      title: 'Trabajos - Portfolio Azimut',
      description: 'Conoce nuestros proyectos de VR, AR, exposiciones y experiencias inmersivas. 30 años transformando ideas en realidad.',
      keywords: 'portfolio, proyectos VR, exposiciones inmersivas, realidad virtual, casos de éxito',
    },
    fr: {
      title: 'Travaux - Portfolio Azimut',
      description: 'Découvrez nos projets VR, AR, expositions et expériences immersives. 30 ans à transformer les idées en réalité.',
      keywords: 'portfolio, projets VR, expositions immersives, réalité virtuelle, cas de succès',
    },
  },
  studio: {
    pt: {
      title: 'Estúdio - Azimut',
      description: 'Estúdio completo para produção audiovisual, VR/AR e experiências imersivas. Equipamentos de última geração.',
      keywords: 'estúdio VR, produção audiovisual, equipamentos profissionais, locação de estúdio',
    },
    en: {
      title: 'Studio - Azimut',
      description: 'Complete studio for audiovisual production, VR/AR and immersive experiences. State-of-the-art equipment.',
      keywords: 'VR studio, audiovisual production, professional equipment, studio rental',
    },
    es: {
      title: 'Estudio - Azimut',
      description: 'Estudio completo para producción audiovisual, VR/AR y experiencias inmersivas. Equipos de última generación.',
      keywords: 'estudio VR, producción audiovisual, equipos profesionales, alquiler de estudio',
    },
    fr: {
      title: 'Studio - Azimut',
      description: 'Studio complet pour production audiovisuelle, VR/AR et expériences immersives. Équipements de dernière génération.',
      keywords: 'studio VR, production audiovisuelle, équipements professionnels, location studio',
    },
  },
  contact: {
    pt: {
      title: 'Contato - Azimut',
      description: 'Entre em contato conosco. Orçamentos, parcerias e informações sobre nossos serviços.',
      keywords: 'contato, orçamento, fale conosco, parcerias',
    },
    en: {
      title: 'Contact - Azimut',
      description: 'Get in touch with us. Quotes, partnerships and information about our services.',
      keywords: 'contact, quote, reach us, partnerships',
    },
    es: {
      title: 'Contacto - Azimut',
      description: 'Contáctanos. Presupuestos, asociaciones e información sobre nuestros servicios.',
      keywords: 'contacto, presupuesto, contáctenos, asociaciones',
    },
    fr: {
      title: 'Contact - Azimut',
      description: 'Contactez-nous. Devis, partenariats et informations sur nos services.',
      keywords: 'contact, devis, nous joindre, partenariats',
    },
  },
  academy: {
    pt: {
      title: 'Azimut Academy - Cursos de VFX, Animação & Game Design',
      description: 'Cursos profissionais de VFX, Animação, Game Design. Preparação para VFS e VanArts. Certificação internacional.',
      keywords: 'cursos VFX, escola animação, game design, VFS, VanArts, Vancouver, certificação',
    },
    en: {
      title: 'Azimut Academy - VFX, Animation & Game Design Courses',
      description: 'Professional VFX, Animation, Game Design courses. Preparation for VFS and VanArts. International certification.',
      keywords: 'VFX courses, animation school, game design, VFS, VanArts, Vancouver, certification',
    },
    es: {
      title: 'Azimut Academy - Cursos de VFX, Animación & Game Design',
      description: 'Cursos profesionales de VFX, Animación, Game Design. Preparación para VFS y VanArts. Certificación internacional.',
      keywords: 'cursos VFX, escuela animación, game design, VFS, VanArts, Vancouver, certificación',
    },
    fr: {
      title: 'Azimut Academy - Cours VFX, Animation & Game Design',
      description: 'Cours professionnels VFX, Animation, Game Design. Préparation VFS et VanArts. Certification internationale.',
      keywords: 'cours VFX, école animation, game design, VFS, VanArts, Vancouver, certification',
    },
  },
  press: {
    pt: {
      title: 'Imprensa - Azimut',
      description: 'Notícias, press releases e cobertura da mídia sobre a Azimut.',
      keywords: 'imprensa, press release, notícias, mídia',
    },
    en: {
      title: 'Press - Azimut',
      description: 'News, press releases and media coverage about Azimut.',
      keywords: 'press, press release, news, media',
    },
    es: {
      title: 'Prensa - Azimut',
      description: 'Noticias, comunicados de prensa y cobertura de medios sobre Azimut.',
      keywords: 'prensa, comunicado de prensa, noticias, medios',
    },
    fr: {
      title: 'Presse - Azimut',
      description: 'Actualités, communiqués de presse et couverture médiatique sur Azimut.',
      keywords: 'presse, communiqué de presse, actualités, médias',
    },
  },
  research: {
    pt: {
      title: 'Pesquisa - Azimut',
      description: 'Pesquisa e desenvolvimento em tecnologias imersivas, VR, AR e inovação.',
      keywords: 'pesquisa, desenvolvimento, inovação, VR, AR, tecnologia',
    },
    en: {
      title: 'Research - Azimut',
      description: 'Research and development in immersive technologies, VR, AR and innovation.',
      keywords: 'research, development, innovation, VR, AR, technology',
    },
    es: {
      title: 'Investigación - Azimut',
      description: 'Investigación y desarrollo en tecnologías inmersivas, VR, AR e innovación.',
      keywords: 'investigación, desarrollo, innovación, VR, AR, tecnología',
    },
    fr: {
      title: 'Recherche - Azimut',
      description: 'Recherche et développement en technologies immersives, VR, AR et innovation.',
      keywords: 'recherche, développement, innovation, VR, AR, technologie',
    },
  },
  what: {
    pt: {
      title: 'Serviços - O Que Fazemos | Azimut',
      description: 'Produção audiovisual, experiências imersivas, VR/AR, exposições culturais e consultoria em inovação.',
      keywords: 'serviços, produção, VR, AR, exposições, consultoria, inovação',
    },
    en: {
      title: 'Services - What We Do | Azimut',
      description: 'Audiovisual production, immersive experiences, VR/AR, cultural exhibitions and innovation consulting.',
      keywords: 'services, production, VR, AR, exhibitions, consulting, innovation',
    },
    es: {
      title: 'Servicios - Qué Hacemos | Azimut',
      description: 'Producción audiovisual, experiencias inmersivas, VR/AR, exposiciones culturales y consultoría en innovación.',
      keywords: 'servicios, producción, VR, AR, exposiciones, consultoría, innovación',
    },
    fr: {
      title: 'Services - Ce Que Nous Faisons | Azimut',
      description: 'Production audiovisuelle, expériences immersives, VR/AR, expositions culturelles et conseil en innovation.',
      keywords: 'services, production, VR, AR, expositions, conseil, innovation',
    },
  },
  vancouver: {
    pt: {
      title: 'Estude em Vancouver - VFS & VanArts | Azimut Academy',
      description: 'Prepare-se para estudar cinema, VFX e animação no Canadá. Agenciamento oficial para VFS e VanArts Vancouver.',
      keywords: 'estudar Vancouver, VFS, VanArts, Canadá, intercâmbio, cinema, VFX, animação',
    },
    en: {
      title: 'Study in Vancouver - VFS & VanArts | Azimut Academy',
      description: 'Prepare to study film, VFX and animation in Canada. Official agency for VFS and VanArts Vancouver.',
      keywords: 'study Vancouver, VFS, VanArts, Canada, exchange, film, VFX, animation',
    },
    es: {
      title: 'Estudiar en Vancouver - VFS & VanArts | Azimut Academy',
      description: 'Prepárate para estudiar cine, VFX y animación en Canadá. Agencia oficial para VFS y VanArts Vancouver.',
      keywords: 'estudiar Vancouver, VFS, VanArts, Canadá, intercambio, cine, VFX, animación',
    },
    fr: {
      title: 'Étudier à Vancouver - VFS & VanArts | Azimut Academy',
      description: 'Préparez-vous à étudier le cinéma, VFX et animation au Canada. Agence officielle VFS et VanArts Vancouver.',
      keywords: 'étudier Vancouver, VFS, VanArts, Canada, échange, cinéma, VFX, animation',
    },
  },
}

