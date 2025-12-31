/**
 * @deprecated This file is deprecated. The site now uses 100% backoffice CMS.
 * All content is managed via the backoffice and fetched from the API.
 * 
 * This file is kept for reference only and should not be used in new code.
 * Use hooks like useAzimutContent, useBackofficeContent, useBackofficeProjects, useBackofficeServices instead.
 * 
 * Migration completed: 2025-01-27
 * 
 * Centralized content model for backoffice/CMS integration.
 * Texts are kept multilingual (pt, en, es) and organized by feature.
 */

type LocaleString = {
  pt: string
  en: string
  es: string
}

export type CaseStatus = 'active' | 'in-development'
export type CaseCategory =
  | 'museums'
  | 'brands'
  | 'films'
  | 'installations'
  | 'education'

export interface CaseItem {
  slug: string
  title: LocaleString
  shortDescription: LocaleString
  category: CaseCategory
  status: CaseStatus
  year?: string
  location?: string
  services: string[]
  tags: string[]
  mediaPoster?: string // WebP/AVIF path
  mediaLoop?: string // webm/mp4 path
  links?: {
    video?: string
    press?: string
  }
}

export interface ServiceItem {
  slug: string
  title: LocaleString
  shortDescription: LocaleString
  icon?: string
}

export interface LabItem {
  slug: string
  title: LocaleString
  type: 'experiment' | 'workshop' | 'mentoring'
  description: LocaleString
}

export const homeContent = {
  hero: {
    title: {
      pt: 'Experiências que Conectam Mundos',
      en: 'Experiences that Connect Worlds',
      es: 'Experiencias que Conectan Mundos',
      fr: 'Expériences qui Connectent les Mondes'
    },
    subtitle: {
      pt: 'Após 30 anos explorando diferentes caminhos, descobrimos que nossa combinação de curadoria de festivais, produção comercial, educação e pesquisa é única. Transformamos espaços culturais, marcas e experiências imersivas entre Brasil e Canadá.',
      en: 'After 30 years exploring different paths, we discovered our combination of festival curation, commercial production, education and research is unique. We transform cultural spaces, brands and immersive experiences between Brazil and Canada.',
      es: 'Tras 30 años explorando diferentes caminos, descubrimos que nuestra combinación de curaduría de festivales, producción comercial, educación e investigación es única. Transformamos espacios culturales, marcas y experiencias inmersivas entre Brasil y Canadá.'
    }
  },
  pillars: [
    { pt: 'Museus & Cultura', en: 'Museums & Culture', es: 'Museos & Cultura' },
    { pt: 'Marcas & Eventos', en: 'Brands & Events', es: 'Marcas & Eventos' },
    { pt: 'Educação & Pesquisa', en: 'Education & Research', es: 'Educación & Investigación' }
  ],
  why: [
    {
      pt: 'Arte + Tech + Cinema + Educação, 30 anos de prática.',
      en: 'Art + Tech + Cinema + Education, 30 years of practice.',
      es: 'Arte + Tech + Cine + Educación, 30 años de práctica.'
    },
    {
      pt: 'Binacional Brasil–Canadá, cultura + marcas + governo.',
      en: 'Brazil–Canada, culture + brands + government.',
      es: 'Brasil–Canadá, cultura + marcas + gobierno.'
    },
    {
      pt: 'VR/IA com curadoria em festivais (Gramado, FAM, Rio2C).',
      en: 'VR/AI with festival curation (Gramado, FAM, Rio2C).',
      es: 'VR/IA con curaduría en festivales (Gramado, FAM, Rio2C).'
    },
    {
      pt: 'Ponta a ponta: conceito → roteiro → instalação → métricas.',
      en: 'End-to-end: concept → script → install → metrics.',
      es: 'Llave en mano: concepto → guion → instalación → métricas.'
    },
    {
      pt: 'Equipe sênior em audiovisual, XR, IA e cenografia digital.',
      en: 'Senior team in AV, XR, AI and digital scenography.',
      es: 'Equipo senior en AV, XR, IA y escenografía digital.'
    }
  ]
}

export const services: ServiceItem[] = [
  {
    slug: 'cinema-av',
    title: {
      pt: 'Cinema & Audiovisual',
      en: 'Cinema & Audiovisual',
      es: 'Cine & AV'
    },
    shortDescription: {
      pt: 'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.',
      en: 'We create cinematic narratives that connect audiences. From concept to finishing, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
      es: 'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con expertise técnica de 30 años.'
    }
  },
  {
    slug: 'animation',
    title: {
      pt: 'Animação 2D/3D',
      en: '2D/3D Animation',
      es: 'Animación 2D/3D'
    },
    shortDescription: {
      pt: 'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.',
      en: 'We bring characters and worlds to life through 2D/3D animation. Our technical expertise enables us to create engaging visual narratives, from storyboards to complete finishing.',
      es: 'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica nos permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.'
    }
  },
  {
    slug: 'xr',
    title: {
      pt: 'XR / Interatividade',
      en: 'XR / Interactive',
      es: 'XR / Interactivo'
    },
    shortDescription: {
      pt: 'Criamos experiências imersivas que transportam pessoas para novos mundos. De filmes VR 360° a instalações interativas, nossa curadoria em festivais nos dá uma visão única do que funciona em narrativas imersivas.',
      en: 'We create immersive experiences that transport people to new worlds. From 360° VR films to interactive installations, our festival curation gives us unique insight into what works in immersive storytelling.',
      es: 'Creamos experiencias inmersivas que transportan personas a nuevos mundos. De películas VR 360° a instalaciones interactivas, nuestra curaduría en festivales nos da una visión única de lo que funciona en narrativas inmersivas.'
    }
  },
  {
    slug: 'cad-revit',
    title: {
      pt: 'Arte Técnica / CAD / Revit',
      en: 'Tech Art / CAD / Revit',
      es: 'Arte Técnica / CAD / Revit'
    },
    shortDescription: {
      pt: 'Conectamos o digital ao físico. Nossa expertise em CAD/BIM e arte técnica permite integrar conteúdo audiovisual com espaços arquitetônicos, criando experiências que respeitam tanto a narrativa quanto o espaço.',
      en: 'We connect digital to physical. Our expertise in CAD/BIM and technical art allows us to integrate audiovisual content with architectural spaces, creating experiences that respect both narrative and space.',
      es: 'Conectamos lo digital con lo físico. Nuestra expertise en CAD/BIM y arte técnica nos permite integrar contenido audiovisual con espacios arquitectónicos, creando experiencias que respetan tanto la narrativa como el espacio.'
    }
  },
  {
    slug: 'creative-ai',
    title: {
      pt: 'IA Criativa',
      en: 'Creative AI',
      es: 'IA Creativa'
    },
    shortDescription: {
      pt: 'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.',
      en: 'We explore the potential of generative AI for storytelling. Our research since 1997 and practical experience enables us to create unique pipelines that combine AI with traditional cinematic language.',
      es: 'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.'
    }
  },
  {
    slug: 'education',
    title: {
      pt: 'Educação & Formação',
      en: 'Education & Training',
      es: 'Educación & Formación'
    },
    shortDescription: {
      pt: 'Compartilhamos conhecimento acumulado em 30 anos. Nossos workshops e mentorias formaram centenas de profissionais, enquanto nossa curadoria em festivais nos permite identificar e apresentar as melhores práticas do setor.',
      en: 'We share knowledge accumulated over 30 years. Our workshops and mentoring have trained hundreds of professionals, while our festival curation allows us to identify and present the industry\'s best practices.',
      es: 'Compartimos conocimiento acumulado en 30 años. Nuestros workshops y mentorías han formado cientos de profesionales, mientras nuestra curaduría en festivales nos permite identificar y presentar las mejores prácticas del sector.'
    }
  },
  {
    slug: 'consulting',
    title: {
      pt: 'Consultoria & Estratégia',
      en: 'Consulting & Strategy',
      es: 'Consultoría & Estrategia'
    },
    shortDescription: {
      pt: 'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos (editais nacionais e internacionais) e estratégia de IA permite que clientes realizem projetos que de outra forma não conseguiriam.',
      en: 'We support projects from conception to execution. Our experience in funding (national and international grants) and AI strategy enables clients to realize projects they otherwise could not.',
      es: 'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos (editais nacionales e internacionales) y estrategia de IA permite que clientes realicen proyectos que de otra forma no podrían.'
    }
  }
]

export const cases: CaseItem[] = [
  {
    slug: 'museu-rio-olimpico',
    title: {
      pt: 'Museu Rio Olímpico',
      en: 'Rio Olympic Museum',
      es: 'Museo Olímpico de Río'
    },
    shortDescription: {
      pt: 'Direção de tecnologia, audiovisual e arte; conteúdos imersivos e sinalização digital.',
      en: 'Tech, AV and art direction; immersive content and digital wayfinding.',
      es: 'Dirección de tecnología, audiovisual y arte; contenidos inmersivos y señalización digital.'
    },
    category: 'museums',
    status: 'active',
    year: '2024–2025',
    location: 'Rio de Janeiro, BR',
    services: ['Cinema & AV', 'XR', 'Animation', 'CAD/Revit'],
    tags: ['museum', 'immersive', 'interactive', 'ux'],
    // BACKOFFICE: Adicionar URL da imagem/vídeo quando disponível
    // mediaPoster: '/cases/rio-olympic-hero.webp',
    // mediaLoop: '/cases/rio-olympic-loop.mp4'
  },
  {
    slug: 'gramado-vr-ia',
    title: {
      pt: 'Gramado VR/IA',
      en: 'Gramado VR/AI',
      es: 'Gramado VR/IA'
    },
    shortDescription: {
      pt: 'Curadoria oficial de VR e filmes produzidos por IA (2017–2025).',
      en: 'Official VR and AI film curation (2017–2025).',
      es: 'Curaduría oficial de VR y films creados con IA (2017–2025).'
    },
    category: 'museums',
    status: 'active',
    year: '2017–2025',
    location: 'Gramado, BR',
    services: ['XR', 'Education'],
    tags: ['festival', 'curation', 'ai'],
    // BACKOFFICE: Adicionar URL da imagem/vídeo quando disponível
    // mediaPoster: '/cases/gramado-vr-hero.webp',
    // mediaLoop: '/cases/gramado-vr-loop.mp4'
  },
  {
    slug: 'natal-cultural',
    title: {
      pt: 'Natal Cultural (IA + animação)',
      en: 'Cultural Holiday (AI + animation)',
      es: 'Navidad Cultural (IA + animación)'
    },
    shortDescription: {
      pt: 'Universo interativo com personagens animados via IA; pipeline 2D/3D, comp e direção de arte.',
      en: 'Interactive universe with AI-driven animated characters; 2D/3D pipeline, comp and art direction.',
      es: 'Universo interactivo con personajes animados por IA; pipeline 2D/3D, composición y dirección de arte.'
    },
    // BACKOFFICE: Adicionar URL da imagem/vídeo quando disponível
    // mediaPoster: '/cases/natal-rio-bonito-hero.webp',
    // mediaLoop: '/cases/natal-rio-bonito-loop.mp4'
    category: 'installations',
    status: 'active',
    year: '2024',
    location: 'Rio Bonito, BR',
    services: ['Animation', 'Creative AI', 'Cinema & AV'],
    tags: ['ai', 'animation', 'interactive']
  },
  {
    slug: 'amazonias-possiveis',
    title: {
      pt: 'Amazônias Possíveis (em desenvolvimento)',
      en: 'Amazônias Possíveis (in development)',
      es: 'Amazônias Possíveis (en desarrollo)'
    },
    shortDescription: {
      pt: 'Filme híbrido IA/VR em desenvolvimento; narrativa amazônica com linguagem cinematográfica.',
      en: 'Hybrid AI/VR film in development; Amazonian narrative with cinematic language.',
      es: 'Film híbrido IA/VR en desarrollo; narrativa amazónica con lenguaje cinematográfico.'
    },
    category: 'films',
    status: 'in-development',
    services: ['Creative AI', 'XR', 'Cinema & AV'],
    tags: ['ai', 'vr', 'film']
  },
  {
    slug: 'van-gogh-la-fontaine',
    title: {
      pt: 'Expos Paisagens de Van Gogh / La Fontaine',
      en: 'Van Gogh / La Fontaine Exhibitions',
      es: 'Expos Van Gogh / La Fontaine'
    },
    shortDescription: {
      pt: 'Conteúdos imersivos e motion para IPs globais; direção de arte e animação.',
      en: 'Immersive content and motion for global IPs; art direction and animation.',
      es: 'Contenidos inmersivos y motion para IPs globales; dirección de arte y animación.'
    },
    category: 'museums',
    status: 'active',
    services: ['Animation', 'Cinema & AV'],
    tags: ['motion', 'immersive', 'ip']
  },
  {
    slug: 'senna-ativacoes',
    title: {
      pt: 'Senna (Tower/Interlagos)',
      en: 'Senna (Tower/Interlagos)',
      es: 'Senna (Tower/Interlagos)'
    },
    shortDescription: {
      pt: 'Ativações audiovisuais e motion para experiências de marca.',
      en: 'Audiovisual activations and motion for brand experiences.',
      es: 'Activaciones audiovisuales y motion para experiencias de marca.'
    },
    category: 'brands',
    status: 'active',
    services: ['Cinema & AV', 'Animation'],
    tags: ['brand', 'motion', 'event']
  },
  {
    slug: 'vr-amazonia',
    title: {
      pt: 'VR Amazônia (Rio Madeira / Círio)',
      en: 'Amazon VR (Rio Madeira / Círio)',
      es: 'VR Amazonia (Rio Madeira / Círio)'
    },
    shortDescription: {
      pt: 'Narrativas imersivas 360º sobre território e cultura amazônica.',
      en: '360 immersive narratives on Amazon territory and culture.',
      es: 'Narrativas inmersivas 360 sobre territorio y cultura amazónica.'
    },
    category: 'films',
    status: 'active',
    services: ['XR', 'Cinema & AV'],
    tags: ['vr', '360', 'culture']
  },
  {
    slug: 'first-nation',
    title: {
      pt: 'Projeto First Nation (DeepLab/IXLabs)',
      en: 'First Nation Project (DeepLab/IXLabs)',
      es: 'Proyecto First Nation (DeepLab/IXLabs)'
    },
    shortDescription: {
      pt: 'Storyboard e animação 2D/motion para projeto cultural no Canadá.',
      en: 'Storyboard and 2D/motion animation for a cultural project in Canada.',
      es: 'Storyboard y animación 2D/motion para proyecto cultural en Canadá.'
    },
    category: 'education',
    status: 'active',
    services: ['Animation'],
    tags: ['culture', 'canada', 'motion']
  }
]

export const labItems: LabItem[] = [
  {
    slug: 'ai-xr-prototypes',
    title: {
      pt: 'Protótipos IA + XR',
      en: 'AI + XR Prototypes',
      es: 'Prototipos IA + XR'
    },
    type: 'experiment',
    description: {
      pt: 'Demos curtos para museus/marcas com IA, VR e interatividade.',
      en: 'Short demos for museums/brands using AI, VR and interactivity.',
      es: 'Demos cortos para museos/marcas con IA, VR e interactividad.'
    }
  },
  {
    slug: 'workshops-ia-vr',
    title: {
      pt: 'Workshops IA / VR / VFX / 3D',
      en: 'Workshops AI / VR / VFX / 3D',
      es: 'Workshops IA / VR / VFX / 3D'
    },
    type: 'workshop',
    description: {
      pt: 'Formação prática para equipes e criativos em tecnologias imersivas.',
      en: 'Hands-on training for teams and creatives on immersive tech.',
      es: 'Formación práctica para equipos y creativos en tecnologías inmersivas.'
    }
  },
  {
    slug: 'mentoring-academic',
    title: {
      pt: 'Mentorias e curadoria VR/IA',
      en: 'VR/AI Mentoring & Curation',
      es: 'Mentoría y curaduría VR/IA'
    },
    type: 'mentoring',
    description: {
      pt: 'Apoio a projetos, festivais e orientação acadêmica (VFS/VanArts).',
      en: 'Support for projects, festivals and academic guidance (VFS/VanArts).',
      es: 'Apoyo a proyectos, festivales y guía académica (VFS/VanArts).'
    }
  }
]

export const contactFields = {
  fields: [
    'name',
    'email',
    'countryCity',
    'projectType', // Museu/Cultura, Marca/Evento, Educação/Workshop, XR/IA, Outro
    'message'
  ],
  ctas: {
    primary: {
      pt: 'Enviar projeto',
      en: 'Send project',
      es: 'Enviar proyecto'
    },
    secondary: {
      pt: 'Agendar conversa',
      en: 'Book a call',
      es: 'Agendar llamada'
    }
  }
}

export const contentModel = {
  home: homeContent,
  services,
  cases,
  lab: labItems,
  contact: contactFields
}

export default contentModel

