// Centralized content model for backoffice/CMS integration.
// Texts are kept multilingual (pt, en, es) and organized by feature.

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
    title: 'Immersive • Interactive • Cinematic Experiences',
    subtitle: {
      pt: 'Estúdio binacional Brasil–Canadá que une cinema, tecnologia e design para criar museus, instalações imersivas, filmes VR/IA e ativações interativas.',
      en: 'A Brazil–Canada studio blending film, technology and design to create museums, immersive installations, VR/AI films and interactive brand experiences.',
      es: 'Estudio binacional Brasil–Canadá que une cine, tecnología y diseño para museos, instalaciones inmersivas, films VR/IA y activaciones interactivas.'
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
      pt: 'Captação 4K/6K/8K, direção, fotografia, som, edição, cor, VFX, motion e finalização.',
      en: '4K/6K/8K capture, directing, DP, sound, editing, color, VFX, motion and finishing.',
      es: 'Captura 4K/6K/8K, dirección, foto, sonido, edición, color, VFX, motion y finishing.'
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
      pt: 'Modelagem orgânica/hard, rig, acting, render, composição; storyboard e animatic.',
      en: 'Organic/hard modeling, rig, acting, render, comp; storyboard and animatic.',
      es: 'Modelado orgánico/hard, rig, acting, render, comp; storyboard y animatic.'
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
      pt: 'Cinematic VR 360, apps VR para HMD, AR/MR para museus/marcas, ambientes imersivos e mapping.',
      en: 'Cinematic VR 360, VR apps for HMD, AR/MR for museums/brands, immersive rooms and mapping.',
      es: 'VR 360 cinematográfico, apps VR para HMD, AR/MR para museos/marcas, salas inmersivas y mapping.'
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
      pt: 'Modelagem geométrica, props, cenários; plantas, BIM, as-built; integração AV + espaço.',
      en: 'Geometric modeling, props, sets; CAD/BIM/as-built; AV + space integration.',
      es: 'Modelado geométrico, props, sets; CAD/BIM/as-built; integración AV + espacio.'
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
      pt: 'Vídeo/filme IA, personagens/assets IA, campanhas IA, pipelines IA + cinema, consultoria IA.',
      en: 'AI-driven video/film, characters/assets, AI campaigns, AI+cinema pipelines, AI consulting.',
      es: 'Video/film IA, personajes/assets IA, campañas IA, pipelines IA+cine, consultoría IA.'
    }
  },
  {
    slug: 'education',
    title: {
      pt: 'Educação & Consultoria',
      en: 'Education & Consulting',
      es: 'Educación & Consultoría'
    },
    shortDescription: {
      pt: 'Workshops IA/VR/VFX/3D, mentorias, curadoria VR/IA, orientação acadêmica (VFS/VanArts).',
      en: 'AI/VR/VFX/3D workshops, mentoring, VR/AI curation, academic guidance (VFS/VanArts).',
      es: 'Workshops IA/VR/VFX/3D, mentoría, curaduría VR/IA, guía académica (VFS/VanArts).'
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

