import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'

interface SEOProps {
  lang: Lang
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

const SITE_URL = 'https://azimut.art' // Trocar pelo domínio real quando publicar
const DEFAULT_IMAGE = '/og-image.png'

const SEO: React.FC<SEOProps> = ({
  lang,
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website'
}) => {
  const fullTitle = title === 'Home' 
    ? 'Azimut – Immersive • Interactive • Cinematic Experiences'
    : `${title} | Azimut`
  
  const canonicalUrl = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  
  // Mapeamento de idioma para código de localidade
  const localeMap: Record<Lang, string> = {
    en: 'en_CA',
    fr: 'fr_CA',
    pt: 'pt_BR',
    es: 'es_MX'
  }

  return (
    <Helmet>
      {/* Básico */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph - Facebook, WhatsApp, LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={localeMap[lang]} />
      <meta property="og:site_name" content="Azimut" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Hreflang - ajuda Google a entender versões em outros idiomas */}
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path}?lang=en`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${path}?lang=fr`} />
      <link rel="alternate" hrefLang="pt" href={`${SITE_URL}${path}?lang=pt`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}${path}?lang=es`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {/* Extras para SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Azimut" />
      <meta name="theme-color" content="#050814" />
    </Helmet>
  )
}

export default SEO

// ═══════════════════════════════════════════════════════════════
// SEO DATA POR PÁGINA - centralizado para fácil manutenção
// ═══════════════════════════════════════════════════════════════

export const seoData: Record<string, Record<Lang, { title: string; description: string }>> = {
  home: {
    en: {
      title: 'Home',
      description: 'Immersive, interactive and cinematic experiences for culture, brands and hybrid spaces – operating between Brazil and Canada.'
    },
    fr: {
      title: 'Accueil',
      description: 'Expériences immersives, interactives et cinématographiques pour la culture, les marques et les espaces hybrides – entre le Brésil et le Canada.'
    },
    pt: {
      title: 'Início',
      description: 'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos – atuando entre Brasil e Canadá.'
    },
    es: {
      title: 'Inicio',
      description: 'Experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y espacios híbridos – operando entre Brasil y Canadá.'
    }
  },
  what: {
    en: {
      title: 'What We Do',
      description: 'We create immersive installations, interactive exhibitions, and cinematic experiences for museums, brands, festivals and research labs.'
    },
    fr: {
      title: 'Ce que nous faisons',
      description: 'Nous créons des installations immersives, des expositions interactives et des expériences cinématographiques pour musées, marques, festivals et laboratoires.'
    },
    pt: {
      title: 'O que fazemos',
      description: 'Criamos instalações imersivas, exposições interativas e experiências cinematográficas para museus, marcas, festivais e laboratórios de pesquisa.'
    },
    es: {
      title: 'Qué hacemos',
      description: 'Creamos instalaciones inmersivas, exposiciones interactivas y experiencias cinematográficas para museos, marcas, festivales y laboratorios.'
    }
  },
  work: {
    en: {
      title: 'Work',
      description: 'Explore our portfolio of immersive projects, interactive installations and cinematic experiences across Brazil and Canada.'
    },
    fr: {
      title: 'Projets',
      description: 'Explorez notre portfolio de projets immersifs, installations interactives et expériences cinématographiques au Brésil et au Canada.'
    },
    pt: {
      title: 'Projetos',
      description: 'Explore nosso portfólio de projetos imersivos, instalações interativas e experiências cinematográficas no Brasil e Canadá.'
    },
    es: {
      title: 'Proyectos',
      description: 'Explore nuestro portafolio de proyectos inmersivos, instalaciones interactivas y experiencias cinematográficas en Brasil y Canadá.'
    }
  },
  studio: {
    en: {
      title: 'Studio',
      description: 'Meet our creative studio: a multidisciplinary team combining cinema, interactive design, spatial storytelling and AI-driven pipelines.'
    },
    fr: {
      title: 'Studio',
      description: 'Découvrez notre studio créatif: une équipe multidisciplinaire combinant cinéma, design interactif, narration spatiale et pipelines IA.'
    },
    pt: {
      title: 'Estúdio',
      description: 'Conheça nosso estúdio criativo: uma equipe multidisciplinar que combina cinema, design interativo, storytelling espacial e pipelines com IA.'
    },
    es: {
      title: 'Estudio',
      description: 'Conozca nuestro estudio creativo: un equipo multidisciplinario que combina cine, diseño interactivo, narrativa espacial y pipelines con IA.'
    }
  },
  research: {
    en: {
      title: 'Research',
      description: 'Our R&D lab explores emerging technologies: AI, generative systems, spatial computing and hybrid audiovisual experiences.'
    },
    fr: {
      title: 'Recherche',
      description: 'Notre laboratoire R&D explore les technologies émergentes: IA, systèmes génératifs, calcul spatial et expériences audiovisuelles hybrides.'
    },
    pt: {
      title: 'Pesquisa',
      description: 'Nosso laboratório de P&D explora tecnologias emergentes: IA, sistemas generativos, computação espacial e experiências audiovisuais híbridas.'
    },
    es: {
      title: 'Investigación',
      description: 'Nuestro laboratorio de I+D explora tecnologías emergentes: IA, sistemas generativos, computación espacial y experiencias audiovisuales híbridas.'
    }
  },
  academy: {
    en: {
      title: 'Academy',
      description: 'Workshops, courses and mentorship programs on immersive design, interactive storytelling and creative technology.'
    },
    fr: {
      title: 'Académie',
      description: 'Ateliers, cours et programmes de mentorat sur le design immersif, la narration interactive et la technologie créative.'
    },
    pt: {
      title: 'Academia',
      description: 'Workshops, cursos e programas de mentoria sobre design imersivo, storytelling interativo e tecnologia criativa.'
    },
    es: {
      title: 'Academia',
      description: 'Talleres, cursos y programas de mentoría sobre diseño inmersivo, narrativa interactiva y tecnología creativa.'
    }
  },
  contact: {
    en: {
      title: 'Start a Project',
      description: 'Get in touch to start your immersive project. We work with museums, brands, festivals and research institutions in Brazil and Canada.'
    },
    fr: {
      title: 'Commencer un projet',
      description: 'Contactez-nous pour démarrer votre projet immersif. Nous travaillons avec musées, marques, festivals et institutions de recherche au Brésil et au Canada.'
    },
    pt: {
      title: 'Iniciar um Projeto',
      description: 'Entre em contato para iniciar seu projeto imersivo. Trabalhamos com museus, marcas, festivais e instituições de pesquisa no Brasil e Canadá.'
    },
    es: {
      title: 'Iniciar un Proyecto',
      description: 'Contáctenos para iniciar su proyecto inmersivo. Trabajamos con museos, marcas, festivales e instituciones de investigación en Brasil y Canadá.'
    }
  }
}



























