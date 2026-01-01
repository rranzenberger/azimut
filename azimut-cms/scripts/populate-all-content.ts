/**
 * Script COMPLETO para popular o banco de dados com TODO o conteúdo do site principal
 * Migra: Pages, Services, Projects (Cases), Tags
 * Execução: npx tsx scripts/populate-all-content.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ═══════════════════════════════════════════════════════════════
// CONTEÚDO DAS PÁGINAS (extraído de src/data/content.ts)
// ═══════════════════════════════════════════════════════════════

const pagesContent = {
  home: {
    name: 'Home',
    slug: 'home',
    seoTitlePt: 'Azimut - Experiências Imersivas | Cinema, XR, IA',
    seoTitleEn: 'Azimut - Immersive Experiences | Cinema, XR, AI',
    seoTitleEs: 'Azimut - Experiencias Inmersivas | Cine, XR, IA',
    seoTitleFr: 'Azimut - Expériences Immersives | Cinéma, XR, IA',
    seoDescPt: 'Criamos experiências imersivas que conectam mundos. 30 anos de expertise em cinema, XR, IA, museus e educação entre Brasil e Canadá.',
    seoDescEn: 'We create immersive experiences that connect worlds. 30 years of expertise in cinema, XR, AI, museums and education between Brazil and Canada.',
    seoDescEs: 'Creamos experiencias inmersivas que conectan mundos. 30 años de expertise en cine, XR, IA, museos y educación entre Brasil y Canadá.',
    seoDescFr: 'Nous créons des expériences immersives qui connectent les mondes. 30 ans d\'expertise en cinéma, XR, IA, musées et éducation entre le Brésil et le Canada.',
    heroSloganPt: 'Experiências que Conectam Mundos',
    heroSloganEn: 'Experiences that Connect Worlds',
    heroSloganEs: 'Experiencias que Conectan Mundos',
    heroSloganFr: 'Expériences qui Connectent les Mondes',
    heroSubtitlePt: 'Após 30 anos explorando diferentes caminhos, descobrimos que nossa combinação de curadoria de festivais, produção comercial, educação e pesquisa é única. Transformamos espaços culturais, marcas e experiências imersivas entre Brasil e Canadá.',
    heroSubtitleEn: 'After 30 years exploring different paths, we discovered our combination of festival curation, commercial production, education and research is unique. We transform cultural spaces, brands and immersive experiences between Brazil and Canada.',
    heroSubtitleEs: 'Tras 30 años explorando diferentes caminos, descubrimos que nuestra combinación de curaduría de festivales, producción comercial, educación e investigación es única. Transformamos espacios culturales, marcas y experiencias inmersivas entre Brasil y Canadá.',
    heroSubtitleFr: 'Après 30 ans à explorer différents chemins, nous avons découvert que notre combinaison de curation de festivals, production commerciale, éducation et recherche est unique. Nous transformons espaces culturels, marques et expériences immersives entre le Brésil et le Canada.',
    // Pillars
    pillar1Pt: 'Museus & Cultura',
    pillar1En: 'Museums & Culture',
    pillar1Es: 'Museos & Cultura',
    pillar1Fr: 'Musées & Culture',
    pillar2Pt: 'Marcas & Eventos',
    pillar2En: 'Brands & Events',
    pillar2Es: 'Marcas & Eventos',
    pillar2Fr: 'Marques & Événements',
    pillar3Pt: 'Educação & Pesquisa',
    pillar3En: 'Education & Research',
    pillar3Es: 'Educación & Investigación',
    pillar3Fr: 'Éducation & Recherche',
  },
  what: {
    name: 'Soluções',
    slug: 'what',
    seoTitlePt: 'Soluções | Azimut',
    seoTitleEn: 'Solutions | Azimut',
    seoTitleEs: 'Soluciones | Azimut',
    seoTitleFr: 'Solutions | Azimut',
    seoDescPt: 'Cinema, design interativo, storytelling espacial e IA para criar instalações narrativas e experiências temporais.',
    seoDescEn: 'Cinema, interactive design, spatial storytelling and AI to create narrative installations and time-based experiences.',
    seoDescEs: 'Cine, diseño interactivo, narrativa espacial e IA para crear instalaciones narrativas y experiencias temporales.',
    seoDescFr: 'Cinéma, design interactif, narration spatiale et IA pour créer des installations narratives et expériences temporelles.',
    heroSloganPt: 'O Que Fazemos',
    heroSloganEn: 'What We Do',
    heroSloganEs: 'Lo Que Hacemos',
    heroSloganFr: 'Ce Que Nous Faisons',
    heroSubtitlePt: 'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais.',
    heroSubtitleEn: 'We combine cinema, interactive design, spatial storytelling and AI pipelines to create narrative installations, hybrid environments and time-based experiences.',
    heroSubtitleEs: 'Combinamos cine, diseño interactivo, narrativa espacial y pipelines con IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales.',
    heroSubtitleFr: 'Nous combinons cinéma, design interactif, narration spatiale et pipelines avec IA pour créer des installations narratives, environnements hybrides et expériences temporelles.',
  },
  work: {
    name: 'Projetos',
    slug: 'work',
    seoTitlePt: 'Projetos | Azimut',
    seoTitleEn: 'Projects | Azimut',
    seoTitleEs: 'Proyectos | Azimut',
    seoTitleFr: 'Projets | Azimut',
    seoDescPt: 'Nossos projetos em museus, marcas, festivais e educação. De instalações imersivas a filmes VR e IA.',
    seoDescEn: 'Our projects in museums, brands, festivals and education. From immersive installations to VR and AI films.',
    seoDescEs: 'Nuestros proyectos en museos, marcas, festivales y educación. De instalaciones inmersivas a films VR e IA.',
    seoDescFr: 'Nos projets en musées, marques, festivals et éducation. D\'installations immersives à films VR et IA.',
    heroSloganPt: 'Projetos',
    heroSloganEn: 'Projects',
    heroSloganEs: 'Proyectos',
    heroSloganFr: 'Projets',
    heroSubtitlePt: 'Museus, marcas, festivais e experiências imersivas.',
    heroSubtitleEn: 'Museums, brands, festivals and immersive experiences.',
    heroSubtitleEs: 'Museos, marcas, festivales y experiencias inmersivas.',
    heroSubtitleFr: 'Musées, marques, festivals et expériences immersives.',
  },
  studio: {
    name: 'Estúdio',
    slug: 'studio',
    seoTitlePt: 'Estúdio | Azimut',
    seoTitleEn: 'Studio | Azimut',
    seoTitleEs: 'Estudio | Azimut',
    seoTitleFr: 'Studio | Azimut',
    seoDescPt: 'Equipe binacional Brasil-Canadá com 30 anos de experiência em cinema, XR, IA e experiências imersivas.',
    seoDescEn: 'Brazil-Canada team with 30 years of experience in cinema, XR, AI and immersive experiences.',
    seoDescEs: 'Equipo binacional Brasil-Canadá con 30 años de experiencia en cine, XR, IA y experiencias inmersivas.',
    seoDescFr: 'Équipe binationale Brésil-Canada avec 30 ans d\'expérience en cinéma, XR, IA et expériences immersives.',
    heroSloganPt: 'Estúdio',
    heroSloganEn: 'Studio',
    heroSloganEs: 'Estudio',
    heroSloganFr: 'Studio',
    heroSubtitlePt: 'Equipe binacional Brasil-Canadá especializada em cinema, XR e IA.',
    heroSubtitleEn: 'Brazil-Canada team specialized in cinema, XR and AI.',
    heroSubtitleEs: 'Equipo binacional Brasil-Canadá especializado en cine, XR e IA.',
    heroSubtitleFr: 'Équipe binationale Brésil-Canada spécialisée en cinéma, XR et IA.',
  },
  'studio/about': {
    name: 'Sobre',
    slug: 'studio/about',
    seoTitlePt: 'Sobre | Azimut',
    seoTitleEn: 'About | Azimut',
    seoTitleEs: 'Acerca | Azimut',
    seoTitleFr: 'À Propos | Azimut',
    seoDescPt: 'Nossa história, valores e visão. 30 anos transformando espaços culturais e experiências imersivas.',
    seoDescEn: 'Our history, values and vision. 30 years transforming cultural spaces and immersive experiences.',
    seoDescEs: 'Nuestra historia, valores y visión. 30 años transformando espacios culturales y experiencias inmersivas.',
    seoDescFr: 'Notre histoire, valeurs et vision. 30 ans à transformer espaces culturels et expériences immersives.',
    heroSloganPt: 'Sobre Nós',
    heroSloganEn: 'About Us',
    heroSloganEs: 'Acerca de Nosotros',
    heroSloganFr: 'À Propos de Nous',
    heroSubtitlePt: 'Nossa trajetória de 30 anos entre Brasil e Canadá.',
    heroSubtitleEn: 'Our 30-year journey between Brazil and Canada.',
    heroSubtitleEs: 'Nuestra trayectoria de 30 años entre Brasil y Canadá.',
    heroSubtitleFr: 'Notre parcours de 30 ans entre le Brésil et le Canada.',
  },
  'studio/team': {
    name: 'Equipe',
    slug: 'studio/team',
    seoTitlePt: 'Equipe | Azimut',
    seoTitleEn: 'Team | Azimut',
    seoTitleEs: 'Equipo | Azimut',
    seoTitleFr: 'Équipe | Azimut',
    seoDescPt: 'Conheça nossa equipe de especialistas em cinema, XR, IA e experiências imersivas.',
    seoDescEn: 'Meet our team of specialists in cinema, XR, AI and immersive experiences.',
    seoDescEs: 'Conoce nuestro equipo de especialistas en cine, XR, IA y experiencias inmersivas.',
    seoDescFr: 'Rencontrez notre équipe de spécialistes en cinéma, XR, IA et expériences immersives.',
    heroSloganPt: 'Nossa Equipe',
    heroSloganEn: 'Our Team',
    heroSloganEs: 'Nuestro Equipo',
    heroSloganFr: 'Notre Équipe',
    heroSubtitlePt: 'Especialistas em cinema, XR e IA.',
    heroSubtitleEn: 'Specialists in cinema, XR and AI.',
    heroSubtitleEs: 'Especialistas en cine, XR e IA.',
    heroSubtitleFr: 'Spécialistes en cinéma, XR et IA.',
  },
  academy: {
    name: 'Academy',
    slug: 'academy',
    seoTitlePt: 'Academy | Azimut',
    seoTitleEn: 'Academy | Azimut',
    seoTitleEs: 'Academy | Azimut',
    seoTitleFr: 'Académie | Azimut',
    seoDescPt: 'Cursos, workshops e pesquisa em VR, IA, cinema e experiências imersivas.',
    seoDescEn: 'Courses, workshops and research in VR, AI, cinema and immersive experiences.',
    seoDescEs: 'Cursos, workshops e investigación en VR, IA, cine y experiencias inmersivas.',
    seoDescFr: 'Cours, ateliers et recherche en VR, IA, cinéma et expériences immersives.',
    heroSloganPt: 'Academia Azimut',
    heroSloganEn: 'Azimut Academy',
    heroSloganEs: 'Academia Azimut',
    heroSloganFr: 'Académie Azimut',
    heroSubtitlePt: 'Onde conhecimento, pesquisa e inovação se encontram',
    heroSubtitleEn: 'Where knowledge, research and innovation meet',
    heroSubtitleEs: 'Donde el conocimiento, la investigación y la innovación se encuentran',
    heroSubtitleFr: 'Où la connaissance, la recherche et l\'innovation se rencontrent',
  },
  'academy/research': {
    name: 'Pesquisa',
    slug: 'academy/research',
    seoTitlePt: 'Pesquisa & Inovação | Azimut Academy',
    seoTitleEn: 'Research & Innovation | Azimut Academy',
    seoTitleEs: 'Investigación & Innovación | Azimut Academy',
    seoTitleFr: 'Recherche & Innovation | Académie Azimut',
    seoDescPt: 'Pesquisa aplicada em IA, VR, cinema e experiências imersivas.',
    seoDescEn: 'Applied research in AI, VR, cinema and immersive experiences.',
    seoDescEs: 'Investigación aplicada en IA, VR, cine y experiencias inmersivas.',
    seoDescFr: 'Recherche appliquée en IA, VR, cinéma et expériences immersives.',
    heroSloganPt: 'Pesquisa & Inovação',
    heroSloganEn: 'Research & Innovation',
    heroSloganEs: 'Investigación & Innovación',
    heroSloganFr: 'Recherche & Innovation',
    heroSubtitlePt: 'Explorando novas fronteiras em narrativas imersivas e IA criativa.',
    heroSubtitleEn: 'Exploring new frontiers in immersive storytelling and creative AI.',
    heroSubtitleEs: 'Explorando nuevas fronteras en narrativas inmersivas e IA creativa.',
    heroSubtitleFr: 'Explorer de nouvelles frontières en narration immersive et IA créative.',
  },
  'academy/courses': {
    name: 'Cursos',
    slug: 'academy/courses',
    seoTitlePt: 'Cursos & Workshops | Azimut Academy',
    seoTitleEn: 'Courses & Workshops | Azimut Academy',
    seoTitleEs: 'Cursos & Workshops | Azimut Academy',
    seoTitleFr: 'Cours & Ateliers | Académie Azimut',
    seoDescPt: 'Cursos práticos de VR, IA, cinema e experiências imersivas.',
    seoDescEn: 'Hands-on courses in VR, AI, cinema and immersive experiences.',
    seoDescEs: 'Cursos prácticos de VR, IA, cine y experiencias inmersivas.',
    seoDescFr: 'Cours pratiques en VR, IA, cinéma et expériences immersives.',
    heroSloganPt: 'Cursos & Workshops',
    heroSloganEn: 'Courses & Workshops',
    heroSloganEs: 'Cursos & Workshops',
    heroSloganFr: 'Cours & Ateliers',
    heroSubtitlePt: 'Aprenda com especialistas em VR, IA e cinema imersivo.',
    heroSubtitleEn: 'Learn from specialists in VR, AI and immersive cinema.',
    heroSubtitleEs: 'Aprenda de especialistas en VR, IA y cine inmersivo.',
    heroSubtitleFr: 'Apprenez des spécialistes en VR, IA et cinéma immersif.',
  },
  'academy/corporate': {
    name: 'Corporate',
    slug: 'academy/corporate',
    seoTitlePt: 'Treinamento Corporativo | Azimut Academy',
    seoTitleEn: 'Corporate Training | Azimut Academy',
    seoTitleEs: 'Entrenamiento Corporativo | Azimut Academy',
    seoTitleFr: 'Formation d\'Entreprise | Académie Azimut',
    seoDescPt: 'Treinamentos customizados para empresas em VR, IA e experiências imersivas.',
    seoDescEn: 'Customized corporate training in VR, AI and immersive experiences.',
    seoDescEs: 'Entrenamientos personalizados para empresas en VR, IA y experiencias inmersivas.',
    seoDescFr: 'Formations personnalisées pour entreprises en VR, IA et expériences immersives.',
    heroSloganPt: 'Treinamento Corporativo',
    heroSloganEn: 'Corporate Training',
    heroSloganEs: 'Entrenamiento Corporativo',
    heroSloganFr: 'Formation d\'Entreprise',
    heroSubtitlePt: 'Soluções customizadas para sua empresa.',
    heroSubtitleEn: 'Customized solutions for your company.',
    heroSubtitleEs: 'Soluciones personalizadas para su empresa.',
    heroSubtitleFr: 'Solutions personnalisées pour votre entreprise.',
  },
  contact: {
    name: 'Contato',
    slug: 'contact',
    seoTitlePt: 'Contato | Azimut',
    seoTitleEn: 'Contact | Azimut',
    seoTitleEs: 'Contacto | Azimut',
    seoTitleFr: 'Contact | Azimut',
    seoDescPt: 'Entre em contato para projetos de museus, marcas, experiências imersivas, cursos e consultoria.',
    seoDescEn: 'Get in touch for museum projects, brands, immersive experiences, courses and consulting.',
    seoDescEs: 'Contáctenos para proyectos de museos, marcas, experiencias inmersivas, cursos y consultoría.',
    seoDescFr: 'Contactez-nous pour projets de musées, marques, expériences immersives, cours et conseil.',
    heroSloganPt: 'Vamos Conversar',
    heroSloganEn: 'Let\'s Talk',
    heroSloganEs: 'Hablemos',
    heroSloganFr: 'Parlons-en',
    heroSubtitlePt: 'Conte-nos sobre seu projeto.',
    heroSubtitleEn: 'Tell us about your project.',
    heroSubtitleEs: 'Cuéntenos sobre su proyecto.',
    heroSubtitleFr: 'Parlez-nous de votre projet.',
  },
}

// ═══════════════════════════════════════════════════════════════
// SERVIÇOS (extraído de src/data/content.ts)
// ═══════════════════════════════════════════════════════════════

const servicesContent = [
  {
    slug: 'cinema-av',
    titlePt: 'Cinema & Audiovisual',
    titleEn: 'Cinema & Audiovisual',
    titleEs: 'Cine & AV',
    titleFr: 'Cinéma & Audiovisuel',
    descriptionPt: 'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.',
    descriptionEn: 'We create cinematic narratives that connect audiences. From concept to finishing, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
    descriptionEs: 'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con expertise técnica de 30 años.',
    descriptionFr: 'Nous créons des narrations cinématographiques qui connectent les audiences. Du concept à la finalisation, nous livrons du contenu de haute qualité pour musées, festivals et marques, avec 30 ans d\'expertise technique.',
    priority: 10,
  },
  {
    slug: 'animation',
    titlePt: 'Animação 2D/3D',
    titleEn: '2D/3D Animation',
    titleEs: 'Animación 2D/3D',
    titleFr: 'Animation 2D/3D',
    descriptionPt: 'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.',
    descriptionEn: 'We bring characters and worlds to life through 2D/3D animation. Our technical expertise enables us to create engaging visual narratives, from storyboards to complete finishing.',
    descriptionEs: 'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica nos permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.',
    descriptionFr: 'Nous donnons vie aux personnages et mondes grâce à l\'animation 2D/3D. Notre expertise technique nous permet de créer des narrations visuelles engageantes, des storyboards à la finalisation complète.',
    priority: 9,
  },
  {
    slug: 'xr',
    titlePt: 'XR / Interatividade',
    titleEn: 'XR / Interactive',
    titleEs: 'XR / Interactivo',
    titleFr: 'XR / Interactif',
    descriptionPt: 'Criamos experiências imersivas que transportam pessoas para novos mundos. De filmes VR 360° a instalações interativas, nossa curadoria em festivais nos dá uma visão única do que funciona em narrativas imersivas.',
    descriptionEn: 'We create immersive experiences that transport people to new worlds. From 360° VR films to interactive installations, our festival curation gives us unique insight into what works in immersive storytelling.',
    descriptionEs: 'Creamos experiencias inmersivas que transportan personas a nuevos mundos. De películas VR 360° a instalaciones interactivas, nuestra curaduría en festivales nos da una visión única de lo que funciona en narrativas inmersivas.',
    descriptionFr: 'Nous créons des expériences immersives qui transportent les gens vers de nouveaux mondes. Des films VR 360° aux installations interactives, notre curation de festivals nous donne un aperçu unique de ce qui fonctionne dans la narration immersive.',
    priority: 8,
  },
  {
    slug: 'cad-revit',
    titlePt: 'Arte Técnica / CAD / Revit',
    titleEn: 'Tech Art / CAD / Revit',
    titleEs: 'Arte Técnica / CAD / Revit',
    titleFr: 'Art Technique / CAD / Revit',
    descriptionPt: 'Conectamos o digital ao físico. Nossa expertise em CAD/BIM e arte técnica permite integrar conteúdo audiovisual com espaços arquitetônicos, criando experiências que respeitam tanto a narrativa quanto o espaço.',
    descriptionEn: 'We connect digital to physical. Our expertise in CAD/BIM and technical art allows us to integrate audiovisual content with architectural spaces, creating experiences that respect both narrative and space.',
    descriptionEs: 'Conectamos lo digital con lo físico. Nuestra expertise en CAD/BIM y arte técnica nos permite integrar contenido audiovisual con espacios arquitectónicos, creando experiencias que respetan tanto la narrativa como el espacio.',
    descriptionFr: 'Nous connectons le numérique au physique. Notre expertise en CAD/BIM et art technique nous permet d\'intégrer le contenu audiovisuel avec les espaces architecturaux, créant des expériences qui respectent à la fois la narration et l\'espace.',
    priority: 7,
  },
  {
    slug: 'creative-ai',
    titlePt: 'IA Criativa',
    titleEn: 'Creative AI',
    titleEs: 'IA Creativa',
    titleFr: 'IA Créative',
    descriptionPt: 'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.',
    descriptionEn: 'We explore the potential of generative AI for storytelling. Our research since 1997 and practical experience enables us to create unique pipelines that combine AI with traditional cinematic language.',
    descriptionEs: 'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.',
    descriptionFr: 'Nous explorons le potentiel de l\'IA générative pour la narration. Nos recherches depuis 1997 et notre expérience pratique nous permettent de créer des pipelines uniques qui combinent IA et langage cinématographique traditionnel.',
    priority: 6,
  },
  {
    slug: 'education',
    titlePt: 'Educação & Formação',
    titleEn: 'Education & Training',
    titleEs: 'Educación & Formación',
    titleFr: 'Éducation & Formation',
    descriptionPt: 'Compartilhamos conhecimento acumulado em 30 anos. Nossos workshops e mentorias formaram centenas de profissionais, enquanto nossa curadoria em festivais nos permite identificar e apresentar as melhores práticas do setor.',
    descriptionEn: 'We share knowledge accumulated over 30 years. Our workshops and mentoring have trained hundreds of professionals, while our festival curation allows us to identify and present the industry\'s best practices.',
    descriptionEs: 'Compartimos conocimiento acumulado en 30 años. Nuestros workshops y mentorías han formado cientos de profesionales, mientras nuestra curaduría en festivales nos permite identificar y presentar las mejores prácticas del sector.',
    descriptionFr: 'Nous partageons les connaissances accumulées sur 30 ans. Nos ateliers et mentorats ont formé des centaines de professionnels, tandis que notre curation de festivals nous permet d\'identifier et présenter les meilleures pratiques de l\'industrie.',
    priority: 5,
  },
  {
    slug: 'consulting',
    titlePt: 'Consultoria & Estratégia',
    titleEn: 'Consulting & Strategy',
    titleEs: 'Consultoría & Estrategia',
    titleFr: 'Conseil & Stratégie',
    descriptionPt: 'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos (editais nacionais e internacionais) e estratégia de IA permite que clientes realizem projetos que de outra forma não conseguiriam.',
    descriptionEn: 'We support projects from conception to execution. Our experience in funding (national and international grants) and AI strategy enables clients to realize projects they otherwise could not.',
    descriptionEs: 'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos (editais nacionales e internacionales) y estrategia de IA permite que clientes realicen proyectos que de otra forma no podrían.',
    descriptionFr: 'Nous accompagnons les projets de la conception à l\'exécution. Notre expérience en financement (subventions nationales et internationales) et stratégie IA permet aux clients de réaliser des projets qu\'ils ne pourraient pas autrement.',
    priority: 4,
  },
]

// ═══════════════════════════════════════════════════════════════
// TAGS (extraídas dos projetos)
// ═══════════════════════════════════════════════════════════════

const tagsContent = [
  { slug: 'museum', labelPt: 'Museu', labelEn: 'Museum', labelEs: 'Museo', labelFr: 'Musée', category: 'INDUSTRY' },
  { slug: 'immersive', labelPt: 'Imersivo', labelEn: 'Immersive', labelEs: 'Inmersivo', labelFr: 'Immersif', category: 'FORMAT' },
  { slug: 'interactive', labelPt: 'Interativo', labelEn: 'Interactive', labelEs: 'Interactivo', labelFr: 'Interactif', category: 'FORMAT' },
  { slug: 'ux', labelPt: 'UX', labelEn: 'UX', labelEs: 'UX', labelFr: 'UX', category: 'TECHNOLOGY' },
  { slug: 'festival', labelPt: 'Festival', labelEn: 'Festival', labelEs: 'Festival', labelFr: 'Festival', category: 'INDUSTRY' },
  { slug: 'curation', labelPt: 'Curadoria', labelEn: 'Curation', labelEs: 'Curaduría', labelFr: 'Curation', category: 'FORMAT' },
  { slug: 'ai', labelPt: 'IA', labelEn: 'AI', labelEs: 'IA', labelFr: 'IA', category: 'TECHNOLOGY' },
  { slug: 'animation', labelPt: 'Animação', labelEn: 'Animation', labelEs: 'Animación', labelFr: 'Animation', category: 'FORMAT' },
  { slug: 'vr', labelPt: 'VR', labelEn: 'VR', labelEs: 'VR', labelFr: 'VR', category: 'TECHNOLOGY' },
  { slug: 'film', labelPt: 'Filme', labelEn: 'Film', labelEs: 'Film', labelFr: 'Film', category: 'FORMAT' },
  { slug: 'motion', labelPt: 'Motion', labelEn: 'Motion', labelEs: 'Motion', labelFr: 'Motion', category: 'FORMAT' },
  { slug: 'ip', labelPt: 'IP', labelEn: 'IP', labelEs: 'IP', labelFr: 'IP', category: 'INDUSTRY' },
  { slug: 'brand', labelPt: 'Marca', labelEn: 'Brand', labelEs: 'Marca', labelFr: 'Marque', category: 'INDUSTRY' },
  { slug: 'event', labelPt: 'Evento', labelEn: 'Event', labelEs: 'Evento', labelFr: 'Événement', category: 'INDUSTRY' },
  { slug: '360', labelPt: '360°', labelEn: '360°', labelEs: '360°', labelFr: '360°', category: 'FORMAT' },
  { slug: 'culture', labelPt: 'Cultura', labelEn: 'Culture', labelEs: 'Cultura', labelFr: 'Culture', category: 'INDUSTRY' },
  { slug: 'canada', labelPt: 'Canadá', labelEn: 'Canada', labelEs: 'Canadá', labelFr: 'Canada', category: 'INDUSTRY' },
]

// ═══════════════════════════════════════════════════════════════
// PROJETOS/CASES (extraído de src/data/content.ts)
// ═══════════════════════════════════════════════════════════════

const projectsContent = [
  {
    slug: 'museu-rio-olimpico',
    title: 'Museu Rio Olímpico',
    shortTitle: 'Museu Rio Olímpico',
    summaryPt: 'Direção de tecnologia, audiovisual e arte; conteúdos imersivos e sinalização digital.',
    summaryEn: 'Tech, AV and art direction; immersive content and digital wayfinding.',
    summaryEs: 'Dirección de tecnología, audiovisual y arte; contenidos inmersivos y señalización digital.',
    summaryFr: 'Direction technique, audiovisuelle et artistique; contenu immersif et signalisation numérique.',
    year: 2024,
    location: 'Rio de Janeiro, BR',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 10,
    tags: ['museum', 'immersive', 'interactive', 'ux'],
    services: ['Cinema & AV', 'XR', 'Animation', 'CAD/Revit'],
  },
  {
    slug: 'gramado-vr-ia',
    title: 'Gramado VR/IA',
    shortTitle: 'Gramado VR/IA',
    summaryPt: 'Curadoria oficial de VR e filmes produzidos por IA (2017–2025).',
    summaryEn: 'Official VR and AI film curation (2017–2025).',
    summaryEs: 'Curaduría oficial de VR y films creados con IA (2017–2025).',
    summaryFr: 'Curation officielle de VR et films produits par IA (2017–2025).',
    year: 2017,
    location: 'Gramado, BR',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 9,
    tags: ['festival', 'curation', 'ai'],
    services: ['XR', 'Education'],
  },
  {
    slug: 'natal-cultural',
    title: 'Natal Cultural (IA + animação)',
    shortTitle: 'Natal Cultural',
    summaryPt: 'Universo interativo com personagens animados via IA; pipeline 2D/3D, comp e direção de arte.',
    summaryEn: 'Interactive universe with AI-driven animated characters; 2D/3D pipeline, comp and art direction.',
    summaryEs: 'Universo interactivo con personajes animados por IA; pipeline 2D/3D, composición y dirección de arte.',
    summaryFr: 'Univers interactif avec personnages animés par IA; pipeline 2D/3D, comp et direction artistique.',
    year: 2024,
    location: 'Rio Bonito, BR',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 8,
    tags: ['ai', 'animation', 'interactive'],
    services: ['Animation', 'Creative AI', 'Cinema & AV'],
  },
  {
    slug: 'amazonias-possiveis',
    title: 'Amazônias Possíveis',
    shortTitle: 'Amazônias Possíveis',
    summaryPt: 'Filme híbrido IA/VR em desenvolvimento; narrativa amazônica com linguagem cinematográfica.',
    summaryEn: 'Hybrid AI/VR film in development; Amazonian narrative with cinematic language.',
    summaryEs: 'Film híbrido IA/VR en desarrollo; narrativa amazónica con lenguaje cinematográfico.',
    summaryFr: 'Film hybride IA/VR en développement; récit amazonien avec langage cinématographique.',
    year: 2024,
    location: 'Brasil',
    country: 'BR',
    status: 'DRAFT',
    featured: false,
    priorityHome: 0,
    tags: ['ai', 'vr', 'film'],
    services: ['Creative AI', 'XR', 'Cinema & AV'],
  },
  {
    slug: 'van-gogh-la-fontaine',
    title: 'Expos Paisagens de Van Gogh / La Fontaine',
    shortTitle: 'Van Gogh / La Fontaine',
    summaryPt: 'Conteúdos imersivos e motion para IPs globais; direção de arte e animação.',
    summaryEn: 'Immersive content and motion for global IPs; art direction and animation.',
    summaryEs: 'Contenidos inmersivos y motion para IPs globales; dirección de arte y animación.',
    summaryFr: 'Contenu immersif et motion pour IPs mondiaux; direction artistique et animation.',
    year: 2023,
    location: 'Internacional',
    country: 'DEFAULT',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 7,
    tags: ['motion', 'immersive', 'ip'],
    services: ['Animation', 'Cinema & AV'],
  },
  {
    slug: 'senna-ativacoes',
    title: 'Senna (Tower/Interlagos)',
    shortTitle: 'Senna',
    summaryPt: 'Ativações audiovisuais e motion para experiências de marca.',
    summaryEn: 'Audiovisual activations and motion for brand experiences.',
    summaryEs: 'Activaciones audiovisuales y motion para experiencias de marca.',
    summaryFr: 'Activations audiovisuelles et motion pour expériences de marque.',
    year: 2023,
    location: 'Brasil',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 6,
    tags: ['brand', 'motion', 'event'],
    services: ['Cinema & AV', 'Animation'],
  },
  {
    slug: 'vr-amazonia',
    title: 'VR Amazônia (Rio Madeira / Círio)',
    shortTitle: 'VR Amazônia',
    summaryPt: 'Narrativas imersivas 360º sobre território e cultura amazônica.',
    summaryEn: '360 immersive narratives on Amazon territory and culture.',
    summaryEs: 'Narrativas inmersivas 360 sobre territorio y cultura amazónica.',
    summaryFr: 'Récits immersifs 360 sur le territoire et la culture amazonienne.',
    year: 2022,
    location: 'Brasil',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 5,
    tags: ['vr', '360', 'culture'],
    services: ['XR', 'Cinema & AV'],
  },
  {
    slug: 'first-nation',
    title: 'Projeto First Nation (DeepLab/IXLabs)',
    shortTitle: 'First Nation',
    summaryPt: 'Storyboard e animação 2D/motion para projeto cultural no Canadá.',
    summaryEn: 'Storyboard and 2D/motion animation for a cultural project in Canada.',
    summaryEs: 'Storyboard y animación 2D/motion para proyecto cultural en Canadá.',
    summaryFr: 'Storyboard et animation 2D/motion pour un projet culturel au Canada.',
    year: 2023,
    location: 'Canadá',
    country: 'CA',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 4,
    tags: ['culture', 'canada', 'motion'],
    services: ['Animation'],
  },
]

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function populateAllContent() {
  console.log('🚀 INICIANDO POPULAÇÃO COMPLETA DO BANCO DE DADOS\n')

  let pagesCount = 0
  let servicesCount = 0
  let tagsCount = 0
  let projectsCount = 0
  let errors = 0

  // 1. POPULAR PÁGINAS
  console.log('📄 POPULANDO PÁGINAS...\n')
  for (const [key, pageData] of Object.entries(pagesContent)) {
    try {
      // Construir objeto de dados base
      const baseData = {
        name: pageData.name,
        seoTitlePt: pageData.seoTitlePt,
        seoTitleEn: pageData.seoTitleEn,
        seoTitleEs: pageData.seoTitleEs,
        seoTitleFr: pageData.seoTitleFr,
        seoDescPt: pageData.seoDescPt,
        seoDescEn: pageData.seoDescEn,
        seoDescEs: pageData.seoDescEs,
        seoDescFr: pageData.seoDescFr,
        heroSloganPt: pageData.heroSloganPt,
        heroSloganEn: pageData.heroSloganEn,
        heroSloganEs: pageData.heroSloganEs,
        heroSloganFr: pageData.heroSloganFr,
        heroSubtitlePt: pageData.heroSubtitlePt,
        heroSubtitleEn: pageData.heroSubtitleEn,
        heroSubtitleEs: pageData.heroSubtitleEs,
        heroSubtitleFr: pageData.heroSubtitleFr,
        status: 'PUBLISHED' as const,
      }

      // Adicionar pillars apenas se existirem no pageData (apenas para home)
      const pillarFields = (pageData as any).pillar1Pt !== undefined ? {
        pillar1Pt: (pageData as any).pillar1Pt,
        pillar1En: (pageData as any).pillar1En,
        pillar1Es: (pageData as any).pillar1Es,
        pillar1Fr: (pageData as any).pillar1Fr,
        pillar2Pt: (pageData as any).pillar2Pt,
        pillar2En: (pageData as any).pillar2En,
        pillar2Es: (pageData as any).pillar2Es,
        pillar2Fr: (pageData as any).pillar2Fr,
        pillar3Pt: (pageData as any).pillar3Pt,
        pillar3En: (pageData as any).pillar3En,
        pillar3Es: (pageData as any).pillar3Es,
        pillar3Fr: (pageData as any).pillar3Fr,
      } : {}

      await prisma.page.upsert({
        where: { slug: pageData.slug },
        update: {
          ...baseData,
          ...pillarFields,
        },
        create: {
          slug: pageData.slug,
          ...baseData,
          ...pillarFields,
        },
      })
      pagesCount++
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar página ${pageData.slug}:`, error)
      errors++
    }
  }
  console.log(`✅ ${pagesCount} páginas populadas\n`)

  // 2. POPULAR TAGS (antes dos projetos, pois projetos dependem delas)
  console.log('🏷️  POPULANDO TAGS...\n')
  for (const tagData of tagsContent) {
    try {
      await prisma.tag.upsert({
        where: { slug: tagData.slug },
        update: {
          labelPt: tagData.labelPt,
          labelEn: tagData.labelEn,
          labelEs: tagData.labelEs,
          labelFr: tagData.labelFr,
          category: tagData.category as any,
        },
        create: {
          slug: tagData.slug,
          labelPt: tagData.labelPt,
          labelEn: tagData.labelEn,
          labelEs: tagData.labelEs,
          labelFr: tagData.labelFr,
          category: tagData.category as any,
        },
      })
      tagsCount++
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar tag ${tagData.slug}:`, error)
      errors++
    }
  }
  console.log(`✅ ${tagsCount} tags populadas\n`)

  // 3. POPULAR SERVIÇOS
  console.log('🛠️  POPULANDO SERVIÇOS...\n')
  for (const serviceData of servicesContent) {
    try {
      await prisma.service.upsert({
        where: { slug: serviceData.slug },
        update: {
          titlePt: serviceData.titlePt,
          titleEn: serviceData.titleEn,
          titleEs: serviceData.titleEs,
          titleFr: serviceData.titleFr,
          descriptionPt: serviceData.descriptionPt,
          descriptionEn: serviceData.descriptionEn,
          descriptionEs: serviceData.descriptionEs,
          descriptionFr: serviceData.descriptionFr,
          priority: serviceData.priority,
          status: 'PUBLISHED',
        },
        create: {
          slug: serviceData.slug,
          titlePt: serviceData.titlePt,
          titleEn: serviceData.titleEn,
          titleEs: serviceData.titleEs,
          titleFr: serviceData.titleFr,
          descriptionPt: serviceData.descriptionPt,
          descriptionEn: serviceData.descriptionEn,
          descriptionEs: serviceData.descriptionEs,
          descriptionFr: serviceData.descriptionFr,
          priority: serviceData.priority,
          status: 'PUBLISHED',
          segments: [],
        },
      })
      servicesCount++
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar serviço ${serviceData.slug}:`, error)
      errors++
    }
  }
  console.log(`✅ ${servicesCount} serviços populados\n`)

  // 4. POPULAR PROJETOS
  console.log('🎬 POPULANDO PROJETOS...\n')
  for (const projectData of projectsContent) {
    try {
      // Buscar market
      const market = await prisma.market.findUnique({
        where: { code: projectData.country },
      })

      // Buscar tags por slug
      const tags = await prisma.tag.findMany({
        where: { slug: { in: projectData.tags } },
      })

      // Buscar services por slug (mapeamento aproximado)
      const serviceSlugMap: Record<string, string> = {
        'Cinema & AV': 'cinema-av',
        'Animation': 'animation',
        'XR': 'xr',
        'CAD/Revit': 'cad-revit',
        'Creative AI': 'creative-ai',
        'Education': 'education',
      }
      const serviceSlugs = projectData.services
        .map((s) => serviceSlugMap[s] || s.toLowerCase().replace(/\s+/g, '-'))
        .filter(Boolean)
      const services = await prisma.service.findMany({
        where: { slug: { in: serviceSlugs } },
      })

      // Extrair ano (primeiro número ou null)
      const yearMatch = projectData.year?.toString().match(/\d{4}/)
      const year = yearMatch ? parseInt(yearMatch[0]) : null

      // Extrair cidade do location
      const city = projectData.location?.split(',')[0]?.trim() || null
      const stateProvince = projectData.location?.includes(',')
        ? projectData.location.split(',')[1]?.trim() || null
        : null

      await prisma.project.upsert({
        where: { slug: projectData.slug },
        update: {
          title: projectData.title,
          shortTitle: projectData.shortTitle,
          summaryPt: projectData.summaryPt,
          summaryEn: projectData.summaryEn,
          summaryEs: projectData.summaryEs,
          summaryFr: projectData.summaryFr,
          year,
          city,
          stateProvince,
          country: projectData.country,
          status: projectData.status as any,
          featured: projectData.featured,
          priorityHome: projectData.priorityHome,
          marketId: market?.id || null,
          tags: { set: tags.map((t) => ({ id: t.id })) },
          services: { set: services.map((s) => ({ id: s.id })) },
        },
        create: {
          slug: projectData.slug,
          title: projectData.title,
          shortTitle: projectData.shortTitle,
          summaryPt: projectData.summaryPt,
          summaryEn: projectData.summaryEn,
          summaryEs: projectData.summaryEs,
          summaryFr: projectData.summaryFr,
          year,
          city,
          stateProvince,
          country: projectData.country,
          status: projectData.status as any,
          featured: projectData.featured,
          priorityHome: projectData.priorityHome,
          marketId: market?.id || null,
          tags: { connect: tags.map((t) => ({ id: t.id })) },
          services: { connect: services.map((s) => ({ id: s.id })) },
        },
      })
      projectsCount++
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar projeto ${projectData.slug}:`, error)
      errors++
    }
  }
  console.log(`✅ ${projectsCount} projetos populados\n`)

  // RESUMO
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`✅ Páginas: ${pagesCount}`)
  console.log(`✅ Serviços: ${servicesCount}`)
  console.log(`✅ Tags: ${tagsCount}`)
  console.log(`✅ Projetos: ${projectsCount}`)
  if (errors > 0) {
    console.log(`❌ Erros: ${errors}`)
  }
  console.log('═══════════════════════════════════════════════════════════════\n')
}

// ═══════════════════════════════════════════════════════════════
// EXECUÇÃO
// ═══════════════════════════════════════════════════════════════

populateAllContent()
  .then(() => {
    console.log('✨ POPULAÇÃO COMPLETA CONCLUÍDA!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

