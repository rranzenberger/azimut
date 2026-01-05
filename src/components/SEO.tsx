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

const SITE_URL = 'https://azimut.com' // Domínio principal (azimut.art redireciona para aqui)
const DEFAULT_IMAGE = '/og-image.png'

const SEO: React.FC<SEOProps> = ({
  lang,
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website'
}) => {
  // Título otimizado para SEO - sempre inclui palavras-chave
  const fullTitle = title === 'Home' || title === 'Início' || title === 'Inicio' || title === 'Accueil'
    ? 'Azimut – Immersive XR VR AR Experiences | Interactive Cinema | Brazil Canada'
    : `${title} | Azimut – Immersive Experiences`
  
  // Construir URLs com prefixo de idioma (/pt, /en, /fr, /es)
  const pathWithoutLang = path.replace(/^\/(pt|en|fr|es)/, '') || '/'
  const canonicalUrl = `${SITE_URL}/${lang}${pathWithoutLang}`
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

      {/* Hreflang - URLs com prefixo de idioma (/pt, /en, /fr, /es) */}
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en${pathWithoutLang}`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr${pathWithoutLang}`} />
      <link rel="alternate" hrefLang="pt" href={`${SITE_URL}/pt${pathWithoutLang}`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}/es${pathWithoutLang}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en${pathWithoutLang}`} />

      {/* Extras para SEO - PREMIUM 2026 */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Azimut" />
      <meta name="theme-color" content="#050814" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Keywords estratégicos por idioma + ÁREAS + COBERTURA GLOBAL ULTRA-COMPLETA (40+ PAÍSES, 70+ CIDADES) */}
      {lang === 'en' && <meta name="keywords" content="immersive experiences, VR experiences, AR experiences, XR experiences, interactive cinema, spatial computing, museum technology, brand experiences, virtual reality, augmented reality, mixed reality, extended reality, interactive installations, immersive storytelling, metaverse, Web3, NFT experiences, digital twins, AI experiences, generative art, projection mapping, volumetric video, 360 video, holographic displays, Canada, USA, UK, Switzerland, Israel, Brazil, Mexico, Argentina, Uruguay, Chile, Colombia, Ecuador, Paraguay, Peru, Venezuela, France, Belgium, Portugal, Spain, Italy, Germany, Netherlands, Austria, Sweden, Norway, Denmark, Finland, Poland, Czech Republic, Saudi Arabia, UAE, South Africa, Egypt, Turkey, Australia, New Zealand, Japan, South Korea, Singapore, India, China, Hong Kong, Taiwan, Thailand, Malaysia, Montreal, Quebec, Toronto, Vancouver, New York, Los Angeles, San Francisco, Miami, Austin, Mexico City, Buenos Aires, Montevideo, Santiago, Bogota, Quito, Lima, Asuncion, Paris, Brussels, Lisbon, Madrid, Barcelona, Rome, Milan, Berlin, Munich, Frankfurt, London, Manchester, Edinburgh, Zurich, Geneva, Basel, Amsterdam, Rotterdam, Vienna, Stockholm, Oslo, Copenhagen, Helsinki, Warsaw, Prague, Tel Aviv, Jerusalem, Haifa, Riyadh, Dubai, Abu Dhabi, Johannesburg, Cape Town, Durban, Cairo, Istanbul, Sydney, Melbourne, Brisbane, Auckland, Wellington, Tokyo, Osaka, Kyoto, Seoul, Busan, Singapore, Mumbai, Bangalore, Delhi, Beijing, Shanghai, Hong Kong, Taipei, Bangkok, Kuala Lumpur, museums, galleries, festivals, brands, startups, innovation centers, tech hubs, cultural institutions, XR studio, VR production, AR development, MR solutions, spatial design, interactive design, immersive theater, location based entertainment, VR arcade, escape rooms, theme parks, VR training, corporate training, simulation, educational XR, research labs, university partnerships, government projects, smart cities, digital transformation, innovation consulting" />}
      {lang === 'fr' && <meta name="keywords" content="expériences immersives, expériences VR, expériences AR, expériences XR, cinéma interactif, informatique spatiale, technologie muséale, expériences de marque, réalité virtuelle, réalité augmentée, réalité mixte, réalité étendue, installations interactives, narration immersive, métavers, Web3, expériences NFT, jumeaux numériques, expériences IA, art génératif, projection mapping, vidéo volumétrique, vidéo 360, affichages holographiques, Canada, États-Unis, Royaume-Uni, Suisse, Israël, Brésil, Mexique, Argentine, Uruguay, Chili, Colombie, Équateur, Paraguay, Pérou, Venezuela, France, Belgique, Portugal, Espagne, Italie, Allemagne, Pays-Bas, Autriche, Suède, Norvège, Danemark, Finlande, Pologne, République Tchèque, Arabie Saoudite, EAU, Afrique du Sud, Égypte, Turquie, Australie, Nouvelle-Zélande, Japon, Corée du Sud, Singapour, Inde, Chine, Hong Kong, Taiwan, Thaïlande, Malaisie, Montréal, Québec, Toronto, Vancouver, New York, Los Angeles, Paris, Bruxelles, Lisbonne, Madrid, Barcelone, Rome, Milan, Berlin, Munich, Londres, Zurich, Genève, Amsterdam, Vienne, Stockholm, Oslo, Copenhague, Helsinki, Varsovie, Prague, Tel Aviv, Jérusalem, Riyad, Dubaï, Johannesburg, Le Cap, Caire, Istanbul, Sydney, Melbourne, Auckland, Tokyo, Seoul, Singapour, Mumbai, Bangalore, Delhi, Pékin, Shanghai, Hong Kong, Taipei, Bangkok, Kuala Lumpur, musées, galeries, festivals, marques, startups, centres d'innovation, pôles tech, institutions culturelles, studio XR, production VR, développement AR, solutions RM, design spatial, design interactif, théâtre immersif, divertissement basé sur la localisation, arcade VR, escape rooms, parcs à thème, formation VR, formation corporative, simulation, XR éducatif, laboratoires de recherche, partenariats universitaires, projets gouvernementaux, villes intelligentes, transformation digitale, conseil en innovation" />}
      {lang === 'pt' && <meta name="keywords" content="experiências imersivas, experiências VR, experiências AR, experiências XR, cinema interativo, computação espacial, tecnologia para museus, experiências de marca, realidade virtual, realidade aumentada, realidade mista, realidade estendida, instalações interativas, storytelling imersivo, metaverso, Web3, experiências NFT, gêmeos digitais, experiências IA, arte generativa, mapeamento de projeção, vídeo volumétrico, vídeo 360, displays holográficos, Brasil, Canadá, EUA, Reino Unido, Suíça, Israel, México, Argentina, Uruguai, Chile, Colômbia, Equador, Paraguai, Peru, Venezuela, França, Bélgica, Portugal, Espanha, Itália, Alemanha, Holanda, Áustria, Suécia, Noruega, Dinamarca, Finlândia, Polônia, República Tcheca, Arábia Saudita, EAU, África do Sul, Egito, Turquia, Austrália, Nova Zelândia, Japão, Coreia do Sul, Singapura, Índia, China, Hong Kong, Taiwan, Tailândia, Malásia, Rio de Janeiro, São Paulo, Brasília, Belo Horizonte, Salvador, Recife, Porto Alegre, Curitiba, Montreal, Quebec, Toronto, Vancouver, Nova York, Los Angeles, São Francisco, Miami, Austin, Cidade do México, Buenos Aires, Montevidéu, Santiago, Bogotá, Quito, Lima, Assunção, Paris, Bruxelas, Lisboa, Porto, Madrid, Barcelona, Roma, Milão, Berlim, Munique, Frankfurt, Londres, Manchester, Zurique, Genebra, Amsterdam, Viena, Estocolmo, Oslo, Copenhague, Helsinque, Varsóvia, Praga, Tel Aviv, Jerusalém, Riad, Dubai, Abu Dhabi, Joanesburgo, Cidade do Cabo, Cairo, Istambul, Sydney, Melbourne, Auckland, Tóquio, Seul, Singapura, Mumbai, Bangalore, Delhi, Pequim, Xangai, Hong Kong, Taipei, Bangkok, Kuala Lumpur, museus, galerias, festivais, marcas, startups, centros de inovação, hubs tech, instituições culturais, estúdio XR, produção VR, desenvolvimento AR, soluções RM, design espacial, design interativo, teatro imersivo, entretenimento baseado em localização, arcade VR, escape rooms, parques temáticos, treinamento VR, treinamento corporativo, simulação, XR educacional, laboratórios de pesquisa, parcerias universitárias, projetos governamentais, cidades inteligentes, transformação digital, consultoria em inovação" />}
      {lang === 'es' && <meta name="keywords" content="experiencias inmersivas, experiencias VR, experiencias AR, experiencias XR, cine interactivo, computación espacial, tecnología museística, experiencias de marca, realidad virtual, realidad aumentada, realidad mixta, realidad extendida, instalaciones interactivas, narrativa inmersiva, metaverso, Web3, experiencias NFT, gemelos digitales, experiencias IA, arte generativo, mapeo de proyección, video volumétrico, video 360, pantallas holográficas, Brasil, Canadá, Estados Unidos, Reino Unido, Suiza, Israel, México, Argentina, Uruguay, Chile, Colombia, Ecuador, Paraguay, Perú, Venezuela, Francia, Bélgica, Portugal, España, Italia, Alemania, Países Bajos, Austria, Suecia, Noruega, Dinamarca, Finlandia, Polonia, República Checa, Arabia Saudita, EAU, Sudáfrica, Egipto, Turquía, Australia, Nueva Zelanda, Japón, Corea del Sur, Singapur, India, China, Hong Kong, Taiwán, Tailandia, Malasia, Río de Janeiro, São Paulo, Montreal, Quebec, Toronto, Vancouver, Nueva York, Los Angeles, San Francisco, Miami, Austin, Ciudad de México, Guadalajara, Monterrey, Buenos Aires, Montevideo, Santiago, Bogotá, Medellín, Quito, Lima, Asunción, París, Bruselas, Lisboa, Madrid, Barcelona, Valencia, Roma, Milán, Berlín, Múnich, Frankfurt, Londres, Manchester, Zúrich, Ginebra, Ámsterdam, Viena, Estocolmo, Oslo, Copenhague, Helsinki, Varsovia, Praga, Tel Aviv, Jerusalén, Riad, Dubái, Abu Dabi, Johannesburgo, Ciudad del Cabo, El Cairo, Estambul, Sídney, Melbourne, Auckland, Tokio, Osaka, Seúl, Singapur, Mumbai, Bangalore, Delhi, Pekín, Shanghái, Hong Kong, Taipéi, Bangkok, Kuala Lumpur, museos, galerías, festivales, marcas, startups, centros de innovación, hubs tech, instituciones culturales, estudio XR, producción VR, desarrollo AR, soluciones RM, diseño espacial, diseño interactivo, teatro inmersivo, entretenimiento basado en ubicación, arcade VR, escape rooms, parques temáticos, entrenamiento VR, capacitación corporativa, simulación, XR educacional, laboratorios de investigación, asociaciones universitarias, proyectos gubernamentales, ciudades inteligentes, transformación digital, consultoría en innovación" />}
      
      {/* Geo-targeting - COBERTURA GLOBAL ULTRA-COMPLETA (40+ PAÍSES, 70+ CIDADES) */}
      <meta name="geo.region" content="BR;CA;US;MX;AR;UY;CL;CO;EC;PY;PE;VE;FR;BE;PT;ES;IT;DE;GB;CH;NL;AT;SE;NO;DK;FI;PL;CZ;IL;SA;AE;ZA;EG;TR;AU;NZ;JP;KR;SG;IN;CN;HK;TW;TH;MY" />
      <meta name="geo.placename" content="Rio de Janeiro;São Paulo;Brasília;Montreal;Quebec;Toronto;Vancouver;New York;Los Angeles;San Francisco;Miami;Austin;Mexico City;Buenos Aires;Montevideo;Santiago;Bogota;Quito;Lima;Asuncion;Paris;Brussels;Lisbon;Madrid;Barcelona;Rome;Milan;Berlin;Munich;Frankfurt;London;Manchester;Zurich;Geneva;Amsterdam;Rotterdam;Vienna;Stockholm;Oslo;Copenhagen;Helsinki;Warsaw;Prague;Tel Aviv;Jerusalem;Riyadh;Dubai;Abu Dhabi;Johannesburg;Cape Town;Cairo;Istanbul;Sydney;Melbourne;Auckland;Tokyo;Osaka;Seoul;Busan;Singapore;Mumbai;Bangalore;Delhi;Beijing;Shanghai;Hong Kong;Taipei;Bangkok;Kuala Lumpur" />
      <meta name="geo.position" content="-22.9068;-43.1729;45.5017;-73.5673;19.4326;-99.1332;51.5074;-0.1278;32.0853;34.7818" /> {/* Rio + Montreal + Mexico City + London + Tel Aviv */}
      
      {/* Content Language */}
      <meta httpEquiv="content-language" content={lang} />
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
      description: 'Azimut creates immersive XR/VR/AR experiences, interactive cinema and spatial storytelling for museums, brands and festivals worldwide. Operating in 40+ countries across 6 continents: Brazil, Canada, USA, UK, Switzerland, Israel, Mexico, Argentina, Chile, Colombia, France, Spain, Italy, Germany, Netherlands, Austria, Sweden, Norway, Denmark, Saudi Arabia, UAE, South Africa, Turkey, Australia, New Zealand, Japan, South Korea, Singapore, China, Hong Kong and more.'
    },
    fr: {
      title: 'Accueil',
      description: 'Azimut crée des expériences immersives XR/VR/AR, du cinéma interactif et du storytelling spatial pour musées, marques et festivals dans le monde entier. Opérant dans 40+ pays sur 6 continents: Brésil, Canada, États-Unis, Royaume-Uni, Suisse, Israël, Mexique, Argentine, Chili, Colombie, France, Espagne, Italie, Allemagne, Pays-Bas, Autriche, Suède, Norvège, Danemark, Arabie Saoudite, EAU, Afrique du Sud, Turquie, Australie, Nouvelle-Zélande, Japon, Corée du Sud, Singapour, Chine, Hong Kong et plus.'
    },
    pt: {
      title: 'Início',
      description: 'Azimut cria experiências imersivas XR/VR/AR, cinema interativo e storytelling espacial para museus, marcas e festivais em todo o mundo. Atuando em 40+ países em 6 continentes: Brasil, Canadá, EUA, Reino Unido, Suíça, Israel, México, Argentina, Chile, Colômbia, França, Espanha, Itália, Alemanha, Holanda, Áustria, Suécia, Noruega, Dinamarca, Arábia Saudita, EAU, África do Sul, Turquia, Austrália, Nova Zelândia, Japão, Coreia do Sul, Singapura, China, Hong Kong e mais.'
    },
    es: {
      title: 'Inicio',
      description: 'Azimut crea experiencias inmersivas XR/VR/AR, cine interactivo y storytelling espacial para museos, marcas y festivales en todo el mundo. Operando en 40+ países en 6 continentes: Brasil, Canadá, USA, Reino Unido, Suiza, Israel, México, Argentina, Chile, Colombia, Francia, España, Italia, Alemania, Países Bajos, Austria, Suecia, Noruega, Dinamarca, Arabia Saudita, EAU, Sudáfrica, Turquía, Australia, Nueva Zelanda, Japón, Corea del Sur, Singapur, China, Hong Kong y más.'
    }
  },
  what: {
    en: {
      title: 'What We Do',
      description: 'Immersive XR/VR/AR installations, interactive exhibitions and cinematic experiences for museums, brands, festivals and research labs. Virtual reality, augmented reality, mixed reality, spatial computing and AI-driven pipelines. Brazil and Canada.'
    },
    fr: {
      title: 'Ce que nous faisons',
      description: 'Installations immersives XR/VR/AR, expositions interactives et expériences cinématographiques pour musées, marques, festivals et laboratoires. Réalité virtuelle, réalité augmentée, réalité mixte, informatique spatiale et pipelines IA. Brésil et Canada.'
    },
    pt: {
      title: 'O que fazemos',
      description: 'Instalações imersivas XR/VR/AR, exposições interativas e experiências cinematográficas para museus, marcas, festivais e laboratórios. Realidade virtual, realidade aumentada, realidade mista, computação espacial e pipelines com IA. Brasil e Canadá.'
    },
    es: {
      title: 'Qué hacemos',
      description: 'Instalaciones inmersivas XR/VR/AR, exposiciones interactivas y experiencias cinematográficas para museos, marcas, festivales y laboratorios. Realidad virtual, realidad aumentada, realidad mixta, computación espacial y pipelines con IA. Brasil y Canadá.'
    }
  },
  work: {
    en: {
      title: 'Work',
      description: 'Portfolio of immersive XR/VR/AR projects, interactive installations and cinematic experiences. Olympic museums, international festivals, brand activations and cultural exhibitions across Brazil and Canada. Virtual reality, augmented reality, mixed reality.'
    },
    fr: {
      title: 'Projets',
      description: 'Portfolio de projets immersifs XR/VR/AR, installations interactives et expériences cinématographiques. Musées olympiques, festivals internationaux, activations de marque et expositions culturelles au Brésil et au Canada. Réalité virtuelle, réalité augmentée, réalité mixte.'
    },
    pt: {
      title: 'Projetos',
      description: 'Portfólio de projetos imersivos XR/VR/AR, instalações interativas e experiências cinematográficas. Museus olímpicos, festivais internacionais, ativações de marca e exposições culturais no Brasil e Canadá. Realidade virtual, realidade aumentada, realidade mista.'
    },
    es: {
      title: 'Proyectos',
      description: 'Portafolio de proyectos inmersivos XR/VR/AR, instalaciones interactivas y experiencias cinematográficas. Museos olímpicos, festivales internacionales, activaciones de marca y exposiciones culturales en Brasil y Canadá. Realidad virtual, realidad aumentada, realidad mixta.'
    }
  },
  studio: {
    en: {
      title: 'Studio',
      description: 'Creative studio combining cinema, interactive design, spatial storytelling and AI pipelines. Multidisciplinary team specialized in immersive XR/VR/AR experiences, virtual reality, augmented reality, mixed reality. Festival curation, commercial production, education and research. Brazil and Canada.'
    },
    fr: {
      title: 'Studio',
      description: 'Studio créatif combinant cinéma, design interactif, narration spatiale et pipelines IA. Équipe multidisciplinaire spécialisée en expériences immersives XR/VR/AR, réalité virtuelle, réalité augmentée, réalité mixte. Curation de festivals, production commerciale, éducation et recherche. Brésil et Canada.'
    },
    pt: {
      title: 'Estúdio',
      description: 'Estúdio criativo combinando cinema, design interativo, storytelling espacial e pipelines com IA. Equipe multidisciplinar especializada em experiências imersivas XR/VR/AR, realidade virtual, realidade aumentada, realidade mista. Curadoria de festivais, produção comercial, educação e pesquisa. Brasil e Canadá.'
    },
    es: {
      title: 'Estudio',
      description: 'Estudio creativo combinando cine, diseño interactivo, narrativa espacial y pipelines con IA. Equipo multidisciplinario especializado en experiencias inmersivas XR/VR/AR, realidad virtual, realidad aumentada, realidad mixta. Curaduría de festivales, producción comercial, educación e investigación. Brasil y Canadá.'
    }
  },
  research: {
    en: {
      title: 'Research',
      description: 'R&D lab exploring AI, generative systems, spatial computing, computer vision and hybrid audiovisual experiences. Virtual reality research, augmented reality research, mixed reality research. Immersive technology innovation. Brazil and Canada.'
    },
    fr: {
      title: 'Recherche',
      description: 'Laboratoire R&D explorant IA, systèmes génératifs, informatique spatiale, vision par ordinateur et expériences audiovisuelles hybrides. Recherche en réalité virtuelle, réalité augmentée, réalité mixte. Innovation en technologie immersive. Brésil et Canada.'
    },
    pt: {
      title: 'Pesquisa',
      description: 'Laboratório de P&D explorando IA, sistemas generativos, computação espacial, visão computacional e experiências audiovisuais híbridas. Pesquisa em realidade virtual, realidade aumentada, realidade mista. Inovação em tecnologia imersiva. Brasil e Canadá.'
    },
    es: {
      title: 'Investigación',
      description: 'Laboratorio de I+D explorando IA, sistemas generativos, computación espacial, visión por computadora y experiencias audiovisuales híbridas. Investigación en realidad virtual, realidad aumentada, realidad mixta. Innovación en tecnología inmersiva. Brasil y Canadá.'
    }
  },
  academy: {
    en: {
      title: 'Academy',
      description: 'Workshops, courses and mentorship on immersive design, interactive storytelling, VR/AR/XR development and creative technology. Virtual reality training, augmented reality training, mixed reality training. Brazil and Canada.'
    },
    fr: {
      title: 'Académie',
      description: 'Ateliers, cours et mentorat sur design immersif, narration interactive, développement VR/AR/XR et technologie créative. Formation en réalité virtuelle, réalité augmentée, réalité mixte. Brésil et Canada.'
    },
    pt: {
      title: 'Academia',
      description: 'Workshops, cursos e mentoria sobre design imersivo, storytelling interativo, desenvolvimento VR/AR/XR e tecnologia criativa. Treinamento em realidade virtual, realidade aumentada, realidade mista. Brasil e Canadá.'
    },
    es: {
      title: 'Academia',
      description: 'Talleres, cursos y mentoría sobre diseño inmersivo, narrativa interactiva, desarrollo VR/AR/XR y tecnología creativa. Entrenamiento en realidad virtual, realidad aumentada, realidad mixta. Brasil y Canadá.'
    }
  },
  contact: {
    en: {
      title: 'Start a Project',
      description: 'Start your immersive XR/VR/AR project with Azimut. Museums, brands, festivals, research institutions. Virtual reality, augmented reality, mixed reality, interactive installations, spatial computing. Brazil (Rio) and Canada (Montreal).'
    },
    fr: {
      title: 'Commencer un projet',
      description: 'Démarrez votre projet immersif XR/VR/AR avec Azimut. Musées, marques, festivals, institutions de recherche. Réalité virtuelle, réalité augmentée, réalité mixte, installations interactives, informatique spatiale. Brésil (Rio) et Canada (Montréal).'
    },
    pt: {
      title: 'Iniciar um Projeto',
      description: 'Inicie seu projeto imersivo XR/VR/AR com a Azimut. Museus, marcas, festivais, instituições de pesquisa. Realidade virtual, realidade aumentada, realidade mista, instalações interativas, computação espacial. Brasil (Rio) e Canadá (Montreal).'
    },
    es: {
      title: 'Iniciar un Proyecto',
      description: 'Inicie su proyecto inmersivo XR/VR/AR con Azimut. Museos, marcas, festivales, instituciones de investigación. Realidad virtual, realidad aumentada, realidad mixta, instalaciones interactivas, computación espacial. Brasil (Río) y Canadá (Montreal).'
    }
  },
  press: {
    en: {
      title: 'Press',
      description: 'Press materials, media kits and communication support. Immersive XR/VR/AR experiences, virtual reality, augmented reality, mixed reality, interactive cinema. Azimut press team in Brazil and Canada.'
    },
    fr: {
      title: 'Presse',
      description: 'Matériel de presse, kits média et support communication. Expériences immersives XR/VR/AR, réalité virtuelle, réalité augmentée, réalité mixte, cinéma interactif. Équipe presse Azimut au Brésil et au Canada.'
    },
    pt: {
      title: 'Imprensa',
      description: 'Material de imprensa, kits de mídia e assessoria de comunicação. Experiências imersivas XR/VR/AR, realidade virtual, realidade aumentada, realidade mista, cinema interativo. Equipe de imprensa Azimut no Brasil e Canadá.'
    },
    es: {
      title: 'Prensa',
      description: 'Material de prensa, kits de medios y asesoría de comunicación. Experiencias inmersivas XR/VR/AR, realidad virtual, realidad aumentada, realidad mixta, cine interactivo. Equipo de prensa Azimut en Brasil y Canadá.'
    }
  }
}



























