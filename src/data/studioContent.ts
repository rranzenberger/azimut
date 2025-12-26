// ═══════════════════════════════════════════════════════════════
// CONTEÚDO DA PÁGINA STUDIO - Azimut
// ═══════════════════════════════════════════════════════════════
// Este conteúdo será migrado para o CMS quando o dashboard admin estiver pronto
// Por enquanto, mantido em código para implementação rápida

export interface StudioContent {
  heritage: {
    title: string
    body: string
    stats: Array<{ label: string; value: string }>
  }
  unique: {
    title: string
    items: string[]
  }
  vision: {
    title: string
    body: string
  }
  mission: {
    title: string
    body: string
  }
  values: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  pillars: Array<{
    icon: string
    title: string
    body: string
  }>
  strategy: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  cocreation: {
    title: string
    body: string
  }
  timeline: Array<{
    period: string
    title: string
    items: string[]
  }>
}

export const studioContent: Record<'pt' | 'en' | 'fr' | 'es', StudioContent> = {
  pt: {
    heritage: {
      title: 'Experiência Global | Brasil-Canadá',
      body: 'Desde 1996, unimos arte, tecnologia e narrativa em projetos que transformam. Do primeiro centro de treinamento Autodesk da América do Sul à direção técnica do Rio Museu Olímpico, criamos experiências imersivas entre Brasil e Canadá.\n\nCombinamos pesquisa, produção, educação e curadoria — algo raro no mundo.',
      stats: [
        { label: 'Experiência', value: '1996' },
        { label: 'Autodesk', value: '1996-2018' },
        { label: 'Rio Museum', value: 'Atual' },
        { label: 'Gramado VR', value: '2017' },
        { label: 'BR-CA', value: 'Binacional' }
      ]
    },
    unique: {
      title: 'O que nos torna únicos',
      items: [
        'Pesquisa acadêmica + Produção comercial (raramente encontradas juntas)',
        'Educação (formamos centenas) + Curadoria de festivais (Gramado VR desde 2017)',
        'Arquitetura/BIM + Cinema/VFX + VR/XR/IA (expertise técnica ampla)',
        'Time com 30 anos de bagagem internacional (desde 1996)',
        'Operação binacional Brasil-Canadá (conectando ecossistemas criativos)',
        'Não somos apenas um estúdio. Somos um ecossistema que integra conhecimento, criação e transformação.'
      ]
    },
    vision: {
      title: 'Visão',
      body: 'Ser referência global em experiências imersivas, interativas e cinematográficas que unem arte, tecnologia e narrativa, transformando espaços culturais, marcas e cidades em ambientes de conexão e descoberta.'
    },
    mission: {
      title: 'Missão',
      body: 'Criar experiências imersivas de ponta a ponta que conectam pessoas, histórias e espaços através de tecnologia criativa, design cinematográfico e narrativas envolventes, sempre em colaboração com instituições, marcas e comunidades.'
    },
    values: {
      title: 'Valores',
      items: [
        {
          title: 'Inovação Contínua',
          description: 'Exploramos fronteiras tecnológicas e artísticas, sempre em busca de novas formas de contar histórias e criar conexões.'
        },
        {
          title: 'Excelência Técnica',
          description: '30 anos de expertise em CG, VFX, VR/XR e IA aplicada ao audiovisual, com certificações internacionais e formação de profissionais.'
        },
        {
          title: 'Colaboração',
          description: 'Acreditamos em cocriação com artistas, instituições, marcas e comunidades, construindo projetos em rede.'
        },
        {
          title: 'Impacto Cultural',
          description: 'Geramos transformação real através da cultura, educação e inclusão, conectando ecossistemas criativos entre Brasil e Canadá.'
        }
      ]
    },
    pillars: [
      {
        icon: '🎨',
        title: 'Arte e Estética Imersiva',
        body: 'Criamos experiências visuais e sonoras que capturam e transportam o público, misturando arte contemporânea, design interativo e ambientações sensoriais.'
      },
      {
        icon: '🧠',
        title: 'Tecnologia Criativa',
        body: 'Exploramos as fronteiras da tecnologia para contar histórias de forma interativa — usando XR, IA, projeções, sensores, instalações reativas e mais.'
      },
      {
        icon: '🎥',
        title: 'Narrativa Cinematográfica',
        body: 'Nosso diferencial é o storytelling sofisticado com linguagem de cinema, roteiros autorais, ritmo, emoção e direção de arte envolvente.'
      },
      {
        icon: '🌍',
        title: 'Impacto Cultural e Social',
        body: 'Geramos transformação real por meio da cultura, colaborando com comunidades, museus, territórios criativos e iniciativas de educação e inclusão.'
      },
      {
        icon: '🌐',
        title: 'Atuação Binacional (Brasil–Canadá)',
        body: 'Conectamos ecossistemas criativos entre América do Sul e América do Norte — em projetos, editais, festivais e parcerias institucionais.'
      },
      {
        icon: '🤝',
        title: 'Modelo de Cocriação',
        body: 'Desenvolvemos projetos em rede, com artistas, marcas, estúdios e instituições públicas/privadas, usando metodologias ágeis e colaborativas.'
      }
    ],
    strategy: {
      title: 'Estratégia & Posicionamento',
      items: [
        {
          title: 'Produtora Criativa Binacional',
          description: 'Forte atuação em cultura, inovação, festivais e governo, operando entre Brasil e Canadá.'
        },
        {
          title: 'Tecnologias de Ponta',
          description: 'Projetos em XR, IA, arte generativa, filmes VR, instalações e tecnologia interativa.'
        },
        {
          title: 'Parcerias Estratégicas',
          description: 'Colaborações com universidades, centros culturais, marcas e fundos públicos nacionais e internacionais.'
        },
        {
          title: 'Expertise em Captação',
          description: 'Experiência comprovada em editais nacionais e internacionais, leis de incentivo e financiamento cultural.'
        }
      ]
    },
    cocreation: {
      title: 'Modelo de Cocriação',
      body: 'Desenvolvemos projetos em rede, com artistas, marcas, estúdios e instituições públicas/privadas, usando metodologias ágeis e colaborativas. Acreditamos que as melhores experiências nascem da união de diferentes perspectivas e expertise.'
    },
    timeline: [
      {
        period: '1996-2004',
        title: 'Architecad + Fundações',
        items: [
          'Pioneiros em Maquete Virtual no Brasil',
          'Centro de Treinamento Autodesk',
          'Único Application Engineer na América do Sul',
          'Demo Artist Autodesk Discreet (1996-2008)',
          'Azimut Computação e Produções Cinematográficas (1998-2004)'
        ]
      },
      {
        period: '2004-2018',
        title: 'Azimut Escola',
        items: [
          'Cursos profissionalizantes: Animação, VFX, Maquete Virtual',
          'Único Flame Trainer certificado no Brasil',
          'Formamos centenas de profissionais',
          'Centro de Treinamento Autodesk (único na América do Sul)',
          'Cursos de 1-2 anos + cursos de curta duração',
          'CAD, 3ds Max, Photoshop, After Effects, Flame'
        ]
      },
      {
        period: '2018-2025',
        title: 'Azimut Projetos Audiovisuais',
        items: [
          'Direção Técnica Rio Museu Olímpico',
          'Curadoria VR Festival de Gramado (desde 2017)',
          'Instalações imersivas + IA',
          'Projetos com YDreams e instituições',
          'Operação binacional Brasil-Canadá',
          'Foco em cultura, museus, festivais e marcas'
        ]
      }
    ]
  },
  en: {
    heritage: {
      title: 'Global Experience | Brazil-Canada',
      body: 'Since 1996, we unite art, technology and narrative in transformative projects. From South America\'s first Autodesk training center to Rio Olympic Museum\'s technical direction, we create immersive experiences between Brazil and Canada.\n\nWe combine research, production, education and curation — rare worldwide.',
      stats: [
        { label: 'Experience', value: '1996' },
        { label: 'Autodesk', value: '1996-2018' },
        { label: 'Rio Museum', value: 'Current' },
        { label: 'Gramado VR', value: '2017' },
        { label: 'BR-CA', value: 'Binational' }
      ]
    },
    unique: {
      title: 'What makes us unique',
      items: [
        'Academic research + Commercial production',
        'Education (we trained hundreds) + Festival curation',
        'Architecture/BIM + Cinema/VFX + VR/XR/AI',
        'Team with 30 years of international experience',
        'Binational operation Brazil-Canada',
        'We\'re not just a studio. We\'re a complete ecosystem.'
      ]
    },
    vision: {
      title: 'Vision',
      body: 'To be a global reference in immersive, interactive and cinematic experiences that unite art, technology and narrative, transforming cultural spaces, brands and cities into environments of connection and discovery.'
    },
    mission: {
      title: 'Mission',
      body: 'Create cutting-edge immersive experiences end-to-end that connect people, stories and spaces through creative technology, cinematic design and engaging narratives, always in collaboration with institutions, brands and communities.'
    },
    values: {
      title: 'Values',
      items: [
        {
          title: 'Continuous Innovation',
          description: 'We explore technological and artistic frontiers, always seeking new ways to tell stories and create connections.'
        },
        {
          title: 'Technical Excellence',
          description: '30 years of expertise in CG, VFX, VR/XR and AI applied to audiovisual, with international certifications and professional training.'
        },
        {
          title: 'Collaboration',
          description: 'We believe in co-creation with artists, institutions, brands and communities, building projects in network.'
        },
        {
          title: 'Cultural Impact',
          description: 'We generate real transformation through culture, education and inclusion, connecting creative ecosystems between Brazil and Canada.'
        }
      ]
    },
    pillars: [
      {
        icon: '🎨',
        title: 'Immersive Art & Aesthetics',
        body: 'We create visual and sound experiences that capture and transport audiences, blending contemporary art, interactive design and sensory environments.'
      },
      {
        icon: '🧠',
        title: 'Creative Technology',
        body: 'We explore technology frontiers to tell stories interactively — using XR, AI, projections, sensors, reactive installations and more.'
      },
      {
        icon: '🎥',
        title: 'Cinematic Narrative',
        body: 'Our differentiator is sophisticated storytelling with cinematic language, original scripts, rhythm, emotion and engaging art direction.'
      },
      {
        icon: '🌍',
        title: 'Cultural & Social Impact',
        body: 'We generate real transformation through culture, collaborating with communities, museums, creative territories and education and inclusion initiatives.'
      },
      {
        icon: '🌐',
        title: 'Binational Operation (Brazil–Canada)',
        body: 'We connect creative ecosystems between South and North America — in projects, grants, festivals and institutional partnerships.'
      },
      {
        icon: '🤝',
        title: 'Co-creation Model',
        body: 'We develop projects in network, with artists, brands, studios and public/private institutions, using agile and collaborative methodologies.'
      }
    ],
    strategy: {
      title: 'Strategy & Positioning',
      items: [
        {
          title: 'Binational Creative Producer',
          description: 'Strong presence in culture, innovation, festivals and government, operating between Brazil and Canada.'
        },
        {
          title: 'Cutting-edge Technologies',
          description: 'Projects in XR, AI, generative art, VR films, installations and interactive technology.'
        },
        {
          title: 'Strategic Partnerships',
          description: 'Collaborations with universities, cultural centers, brands and public funds nationally and internationally.'
        },
        {
          title: 'Funding Expertise',
          description: 'Proven experience in national and international grants, incentive laws and cultural funding.'
        }
      ]
    },
    cocreation: {
      title: 'Co-creation Model',
      body: 'We develop projects in network, with artists, brands, studios and public/private institutions, using agile and collaborative methodologies. We believe the best experiences are born from the union of different perspectives and expertise.'
    },
    timeline: [
      {
        period: '1996-2004',
        title: 'Architecad + Foundations',
        items: [
          'Pioneers in Virtual Mockup in Brazil',
          'Autodesk Training Center',
          'Only Application Engineer in South America',
          'Autodesk Discreet Demo Artist (1996-2008)',
          'Azimut Computing and Cinematographic Productions (1998-2004)'
        ]
      },
      {
        period: '2004-2018',
        title: 'Azimut School',
        items: [
          'Professional courses: Animation, VFX, Virtual Mockup',
          'Only certified Flame Trainer in Brazil',
          'We trained hundreds of professionals',
          'Autodesk Training Center (only one in South America)',
          '1-2 year courses + short-term courses',
          'CAD, 3ds Max, Photoshop, After Effects, Flame'
        ]
      },
      {
        period: '2018-2025',
        title: 'Azimut Audiovisual Projects',
        items: [
          'Technical Direction Rio Olympic Museum',
          'VR Curation Gramado Festival (since 2017)',
          'Immersive installations + AI',
          'Projects with YDreams and institutions',
          'Binational operation Brazil-Canada',
          'Focus on culture, museums, festivals and brands'
        ]
      }
    ]
  },
  fr: {
    heritage: {
      title: '30 Ans d\'Innovation',
      body: 'Depuis 1996, nous avons fusionné art, technologie et éducation dans des projets pionniers. Du premier centre de formation Autodesk d\'Amérique du Sud à la direction technique du Musée Olympique de Rio, notre parcours reflète 30 ans d\'innovation en CG, VR/XR, IA et expériences immersives.\n\nNous sommes uniques : recherche + production + éducation + curation dans un seul studio.',
      stats: [
        { label: 'Années d\'expérience', value: '30' },
        { label: 'Centre de Formation Autodesk', value: '1996-2018' },
        { label: 'Direction Technique Musée Olympique de Rio', value: 'Actuel' },
        { label: 'Curation VR Gramado', value: 'Depuis 2017' },
        { label: 'Seul Flame Trainer au Brésil', value: 'Certifié' }
      ]
    },
    unique: {
      title: 'Ce qui nous rend uniques',
      items: [
        'Recherche académique + Production commerciale',
        'Éducation (nous avons formé des centaines) + Curation de festivals',
        'Architecture/BIM + Cinéma/VFX + VR/XR/IA',
        'Équipe avec 30 ans d\'expérience internationale',
        'Opération binationale Brésil-Canada',
        'Nous ne sommes pas seulement un studio. Nous sommes un écosystème complet.'
      ]
    },
    vision: {
      title: 'Vision',
      body: 'Être une référence mondiale en expériences immersives, interactives et cinématographiques qui unissent art, technologie et narration, transformant les espaces culturels, marques et villes en environnements de connexion et découverte.'
    },
    mission: {
      title: 'Mission',
      body: 'Créer des expériences immersives de pointe de bout en bout qui connectent les gens, les histoires et les espaces grâce à la technologie créative, au design cinématographique et aux narrations engageantes, toujours en collaboration avec les institutions, marques et communautés.'
    },
    values: {
      title: 'Valeurs',
      items: [
        {
          title: 'Innovation Continue',
          description: 'Nous explorons les frontières technologiques et artistiques, toujours à la recherche de nouvelles façons de raconter des histoires et créer des connexions.'
        },
        {
          title: 'Excellence Technique',
          description: '30 ans d\'expertise en CG, VFX, VR/XR et IA appliquée à l\'audiovisuel, avec certifications internationales et formation professionnelle.'
        },
        {
          title: 'Collaboration',
          description: 'Nous croyons en la co-création avec les artistes, institutions, marques et communautés, construisant des projets en réseau.'
        },
        {
          title: 'Impact Culturel',
          description: 'Nous générons une transformation réelle grâce à la culture, l\'éducation et l\'inclusion, connectant les écosystèmes créatifs entre le Brésil et le Canada.'
        }
      ]
    },
    pillars: [
      {
        icon: '🎨',
        title: 'Art & Esthétique Immersive',
        body: 'Nous créons des expériences visuelles et sonores qui capturent et transportent le public, mélangeant art contemporain, design interactif et environnements sensoriels.'
      },
      {
        icon: '🧠',
        title: 'Technologie Créative',
        body: 'Nous explorons les frontières de la technologie pour raconter des histoires de manière interactive — utilisant XR, IA, projections, capteurs, installations réactives et plus.'
      },
      {
        icon: '🎥',
        title: 'Narration Cinématographique',
        body: 'Notre différenciateur est le storytelling sophistiqué avec langage cinématographique, scripts originaux, rythme, émotion et direction artistique engageante.'
      },
      {
        icon: '🌍',
        title: 'Impact Culturel & Social',
        body: 'Nous générons une transformation réelle grâce à la culture, collaborant avec les communautés, musées, territoires créatifs et initiatives d\'éducation et d\'inclusion.'
      },
      {
        icon: '🌐',
        title: 'Opération Binationale (Brésil–Canada)',
        body: 'Nous connectons les écosystèmes créatifs entre l\'Amérique du Sud et l\'Amérique du Nord — dans les projets, subventions, festivals et partenariats institutionnels.'
      },
      {
        icon: '🤝',
        title: 'Modèle de Co-création',
        body: 'Nous développons des projets en réseau, avec des artistes, marques, studios et institutions publiques/privées, utilisant des méthodologies agiles et collaboratives.'
      }
    ],
    strategy: {
      title: 'Stratégie & Positionnement',
      items: [
        {
          title: 'Producteur Créatif Binational',
          description: 'Forte présence dans la culture, l\'innovation, les festivals et le gouvernement, opérant entre le Brésil et le Canada.'
        },
        {
          title: 'Technologies de Pointe',
          description: 'Projets en XR, IA, art génératif, films VR, installations et technologie interactive.'
        },
        {
          title: 'Partenariats Stratégiques',
          description: 'Collaborations avec universités, centres culturels, marques et fonds publics nationaux et internationaux.'
        },
        {
          title: 'Expertise en Financement',
          description: 'Expérience prouvée en subventions nationales et internationales, lois d\'incitation et financement culturel.'
        }
      ]
    },
    cocreation: {
      title: 'Modèle de Co-création',
      body: 'Nous développons des projets en réseau, avec des artistes, marques, studios et institutions publiques/privées, utilisando méthodologies agiles et collaboratives. Nous croyons que les meilleures expériences naissent de l\'union de différentes perspectives et expertise.'
    },
    timeline: [
      {
        period: '1996-2004',
        title: 'Architecad + Fondations',
        items: [
          'Pionniers en Maquette Virtuelle au Brésil',
          'Centre de Formation Autodesk',
          'Seul Application Engineer en Amérique du Sud',
          'Demo Artist Autodesk Discreet (1996-2008)',
          'Azimut Informatique et Productions Cinématographiques (1998-2004)'
        ]
      },
      {
        period: '2004-2018',
        title: 'Azimut École',
        items: [
          'Cours professionnels : Animation, VFX, Maquette Virtuelle',
          'Seul Flame Trainer certifié au Brésil',
          'Nous avons formé des centaines de professionnels',
          'Centre de Formation Autodesk (seul en Amérique du Sud)',
          'Cours de 1-2 ans + cours de courte durée',
          'CAD, 3ds Max, Photoshop, After Effects, Flame'
        ]
      },
      {
        period: '2018-2025',
        title: 'Azimut Projets Audiovisuels',
        items: [
          'Direction Technique Musée Olympique de Rio',
          'Curation VR Festival de Gramado (depuis 2017)',
          'Installations immersives + IA',
          'Projets avec YDreams et institutions',
          'Opération binationale Brésil-Canada',
          'Focus sur culture, musées, festivals et marques'
        ]
      }
    ]
  },
  es: {
    heritage: {
      title: '30 Años de Innovación',
      body: 'Desde 1996, hemos fusionado arte, tecnología y educación en proyectos pioneros. Del primer centro de formación Autodesk de América del Sur a la dirección técnica del Museo Olímpico de Río, nuestro recorrido refleja 30 años de innovación en CG, VR/XR, IA y experiencias inmersivas.\n\nSomos únicos: investigación + producción + educación + curaduría en un solo estudio.',
      stats: [
        { label: 'Años de experiencia', value: '30' },
        { label: 'Centro de Formación Autodesk', value: '1996-2018' },
        { label: 'Dirección Técnica Museo Olímpico de Río', value: 'Actual' },
        { label: 'Curaduría VR Gramado', value: 'Desde 2017' },
        { label: 'Único Flame Trainer en Brasil', value: 'Certificado' }
      ]
    },
    unique: {
      title: 'Lo que nos hace únicos',
      items: [
        'Investigación académica + Producción comercial',
        'Educación (formamos cientos) + Curaduría de festivales',
        'Arquitectura/BIM + Cine/VFX + VR/XR/IA',
        'Equipo con 30 años de experiencia internacional',
        'Operación binacional Brasil-Canadá',
        'No somos solo un estudio. Somos un ecosistema completo.'
      ]
    },
    vision: {
      title: 'Visión',
      body: 'Ser referencia global en experiencias inmersivas, interactivas y cinematográficas que unen arte, tecnología y narrativa, transformando espacios culturales, marcas y ciudades en entornos de conexión y descubrimiento.'
    },
    mission: {
      title: 'Misión',
      body: 'Crear experiencias inmersivas de vanguardia de principio a fin que conectan personas, historias y espacios a través de tecnología creativa, diseño cinematográfico y narrativas envolventes, siempre en colaboración con instituciones, marcas y comunidades.'
    },
    values: {
      title: 'Valores',
      items: [
        {
          title: 'Innovación Continua',
          description: 'Exploramos fronteras tecnológicas y artísticas, siempre buscando nuevas formas de contar historias y crear conexiones.'
        },
        {
          title: 'Excelencia Técnica',
          description: '30 años de experiencia en CG, VFX, VR/XR e IA aplicada al audiovisual, con certificaciones internacionales y formación profesional.'
        },
        {
          title: 'Colaboración',
          description: 'Creemos en la co-creación con artistas, instituciones, marcas y comunidades, construyendo proyectos en red.'
        },
        {
          title: 'Impacto Cultural',
          description: 'Generamos transformación real a través de la cultura, educación e inclusión, conectando ecosistemas creativos entre Brasil y Canadá.'
        }
      ]
    },
    pillars: [
      {
        icon: '🎨',
        title: 'Arte y Estética Inmersiva',
        body: 'Creamos experiencias visuales y sonoras que capturan y transportan al público, mezclando arte contemporáneo, diseño interactivo y ambientaciones sensoriales.'
      },
      {
        icon: '🧠',
        title: 'Tecnología Creativa',
        body: 'Exploramos las fronteras de la tecnología para contar historias de forma interactiva — usando XR, IA, proyecciones, sensores, instalaciones reactivas y más.'
      },
      {
        icon: '🎥',
        title: 'Narrativa Cinematográfica',
        body: 'Nuestro diferenciador es el storytelling sofisticado con lenguaje cinematográfico, guiones originales, ritmo, emoción y dirección de arte envolvente.'
      },
      {
        icon: '🌍',
        title: 'Impacto Cultural y Social',
        body: 'Generamos transformación real a través de la cultura, colaborando con comunidades, museos, territorios creativos e iniciativas de educación e inclusión.'
      },
      {
        icon: '🌐',
        title: 'Actuación Binacional (Brasil–Canadá)',
        body: 'Conectamos ecosistemas creativos entre América del Sur y América del Norte — en proyectos, convocatorias, festivales y alianzas institucionales.'
      },
      {
        icon: '🤝',
        title: 'Modelo de Co-creación',
        body: 'Desarrollamos proyectos en red, con artistas, marcas, estudios e instituciones públicas/privadas, usando metodologías ágiles y colaborativas.'
      }
    ],
    strategy: {
      title: 'Estrategia & Posicionamiento',
      items: [
        {
          title: 'Productora Creativa Binacional',
          description: 'Fuerte presencia en cultura, innovación, festivales y gobierno, operando entre Brasil y Canadá.'
        },
        {
          title: 'Tecnologías de Vanguardia',
          description: 'Proyectos en XR, IA, arte generativa, películas VR, instalaciones y tecnología interactiva.'
        },
        {
          title: 'Alianzas Estratégicas',
          description: 'Colaboraciones con universidades, centros culturales, marcas y fondos públicos nacionales e internacionales.'
        },
        {
          title: 'Experiencia en Captación',
          description: 'Experiencia comprobada en convocatorias nacionales e internacionales, leyes de incentivo y financiamiento cultural.'
        }
      ]
    },
    cocreation: {
      title: 'Modelo de Co-creación',
      body: 'Desarrollamos proyectos en red, con artistas, marcas, estudios e instituciones públicas/privadas, usando metodologías ágiles y colaborativas. Creemos que las mejores experiencias nacen de la unión de diferentes perspectivas y experiencia.'
    },
    timeline: [
      {
        period: '1996-2004',
        title: 'Architecad + Fundaciones',
        items: [
          'Pioneros en Maqueta Virtual en Brasil',
          'Centro de Formación Autodesk',
          'Único Application Engineer en América del Sur',
          'Demo Artist Autodesk Discreet (1996-2008)',
          'Azimut Computación y Producciones Cinematográficas (1998-2004)'
        ]
      },
      {
        period: '2004-2018',
        title: 'Azimut Escuela',
        items: [
          'Cursos profesionales: Animación, VFX, Maqueta Virtual',
          'Único Flame Trainer certificado en Brasil',
          'Formamos cientos de profesionales',
          'Centro de Formación Autodesk (único en América del Sur)',
          'Cursos de 1-2 años + cursos de corta duración',
          'CAD, 3ds Max, Photoshop, After Effects, Flame'
        ]
      },
      {
        period: '2018-2025',
        title: 'Azimut Proyectos Audiovisuales',
        items: [
          'Dirección Técnica Museo Olímpico de Río',
          'Curaduría VR Festival de Gramado (desde 2017)',
          'Instalaciones inmersivas + IA',
          'Proyectos con YDreams e instituciones',
          'Operación binacional Brasil-Canadá',
          'Enfoque en cultura, museos, festivales y marcas'
        ]
      }
    ]
  }
}





















