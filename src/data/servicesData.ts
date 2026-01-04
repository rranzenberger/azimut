import { Lang } from '../i18n'

export interface Service {
  id: string
  slug: string
  icon: string
  titlePt: string
  titleEn: string
  titleFr: string
  titleEs: string
  shortDescPt: string
  shortDescEn: string
  shortDescFr: string
  shortDescEs: string
  longDescPt: string[]
  longDescEn: string[]
  longDescFr: string[]
  longDescEs: string[]
  deliverablesPt: string[]
  deliverablesEn: string[]
  deliverablesFr: string[]
  deliverablesEs: string[]
  processPt: string[]
  processEn: string[]
  processFr: string[]
  processEs: string[]
  technologies: string[]
  // Categorias de projetos relacionados
  projectCategories: string[]
}

export const servicesData: Service[] = [
  {
    id: '1',
    slug: 'cinema-audiovisual',
    icon: '🎬',
    titlePt: 'Cinema & Audiovisual',
    titleEn: 'Cinema & Audiovisual',
    titleFr: 'Cinéma & Audiovisuel',
    titleEs: 'Cine & Audiovisual',
    shortDescPt: 'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.',
    shortDescEn: 'We create cinematic narratives that connect audiences. From concept to completion, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
    shortDescFr: 'Nous créons des récits cinématographiques qui connectent les audiences. Du concept à la finalisation, nous livrons du contenu de haute qualité pour musées, festivals et marques, avec 30 ans d\'expertise technique.',
    shortDescEs: 'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con 30 años de expertise técnica.',
    longDescPt: [
      'Com três décadas de experiência em produção audiovisual, a Azimut domina todas as etapas da criação cinematográfica. Nossa expertise abrange desde o desenvolvimento de conceito e roteiro até a entrega final em padrão broadcast.',
      'Trabalhamos com equipamentos de ponta (RED, Blackmagic, Sony Cinema Line) e pipelines de pós-produção que garantem qualidade cinematográfica. Nossa equipe combina visão artística com rigor técnico para criar conteúdos que emocionam e comunicam.',
      'Especializados em projetos para instituições culturais, festivais internacionais e marcas premium, entregamos desde documentários até filmes publicitários de alto impacto visual.'
    ],
    longDescEn: [
      'With three decades of experience in audiovisual production, Azimut masters all stages of cinematic creation. Our expertise spans from concept development and screenwriting to final delivery in broadcast standard.',
      'We work with cutting-edge equipment (RED, Blackmagic, Sony Cinema Line) and post-production pipelines that ensure cinematic quality. Our team combines artistic vision with technical rigor to create content that moves and communicates.',
      'Specialized in projects for cultural institutions, international festivals and premium brands, we deliver everything from documentaries to high visual impact advertising films.'
    ],
    longDescFr: [
      'Avec trois décennies d\'expérience en production audiovisuelle, Azimut maîtrise toutes les étapes de la création cinématographique. Notre expertise couvre du développement du concept et du scénario à la livraison finale en standard broadcast.',
      'Nous travaillons avec des équipements de pointe (RED, Blackmagic, Sony Cinema Line) et des pipelines de post-production qui garantissent une qualité cinématographique. Notre équipe combine vision artistique et rigueur technique pour créer des contenus qui émeuvent et communiquent.',
      'Spécialisés dans les projets pour institutions culturelles, festivals internationaux et marques premium, nous livrons des documentaires aux films publicitaires à fort impact visuel.'
    ],
    longDescEs: [
      'Con tres décadas de experiencia en producción audiovisual, Azimut domina todas las etapas de la creación cinematográfica. Nuestra expertise abarca desde el desarrollo de concepto y guion hasta la entrega final en estándar broadcast.',
      'Trabajamos con equipos de punta (RED, Blackmagic, Sony Cinema Line) y pipelines de posproducción que garantizan calidad cinematográfica. Nuestro equipo combina visión artística con rigor técnico para crear contenidos que emocionan y comunican.',
      'Especializados en proyectos para instituciones culturales, festivales internacionales y marcas premium, entregamos desde documentales hasta películas publicitarias de alto impacto visual.'
    ],
    deliverablesPt: [
      'Conceito e desenvolvimento de roteiro',
      'Direção de fotografia e produção',
      'Captação em 4K/6K/8K',
      'Edição e montagem',
      'Color grading cinematográfico',
      'Motion graphics e VFX',
      'Finalização em DCP, ProRes, H.265',
      'Entrega multiplataforma'
    ],
    deliverablesEn: [
      'Concept and script development',
      'Cinematography and production',
      '4K/6K/8K capture',
      'Editing and assembly',
      'Cinematic color grading',
      'Motion graphics and VFX',
      'DCP, ProRes, H.265 finishing',
      'Multi-platform delivery'
    ],
    deliverablesFr: [
      'Concept et développement de scénario',
      'Direction de la photographie et production',
      'Capture 4K/6K/8K',
      'Montage et édition',
      'Étalonnage cinématographique',
      'Motion graphics et VFX',
      'Finalisation DCP, ProRes, H.265',
      'Livraison multiplateforme'
    ],
    deliverablesEs: [
      'Concepto y desarrollo de guion',
      'Dirección de fotografía y producción',
      'Captura 4K/6K/8K',
      'Edición y montaje',
      'Color grading cinematográfico',
      'Motion graphics y VFX',
      'Finalización DCP, ProRes, H.265',
      'Entrega multiplataforma'
    ],
    processPt: [
      'Briefing e desenvolvimento conceitual',
      'Roteiro e storyboard',
      'Pré-produção e planejamento técnico',
      'Captação e direção',
      'Edição e pós-produção',
      'Finalização e entrega'
    ],
    processEn: [
      'Briefing and concept development',
      'Script and storyboard',
      'Pre-production and technical planning',
      'Capture and direction',
      'Editing and post-production',
      'Finishing and delivery'
    ],
    processFr: [
      'Briefing et développement conceptuel',
      'Scénario et storyboard',
      'Pré-production et planification technique',
      'Capture et direction',
      'Montage et post-production',
      'Finalisation et livraison'
    ],
    processEs: [
      'Briefing y desarrollo conceptual',
      'Guion y storyboard',
      'Preproducción y planificación técnica',
      'Captura y dirección',
      'Edición y posproducción',
      'Finalización y entrega'
    ],
    technologies: ['RED', 'Blackmagic', 'Sony Cinema Line', 'DaVinci Resolve', 'Adobe Premiere', 'After Effects', 'Cinema 4D'],
    projectCategories: ['cinema', 'audiovisual', 'documentary', 'branded-content']
  },
  {
    id: '2',
    slug: 'pos-producao-vfx',
    icon: '🎞️',
    titlePt: 'Pós-Produção & VFX',
    titleEn: 'Post-Production & VFX',
    titleFr: 'Post-Production & VFX',
    titleEs: 'Posproducción & VFX',
    shortDescPt: 'Fazemos desde o básico até o complexo: composição de vídeo, edição, motion design, VFX e grafismo. Pipeline completo com padrão cinematográfico para projetos de alta exigência técnica.',
    shortDescEn: 'We do everything from basic to complex: video composition, editing, motion design, VFX and graphics. Complete pipeline with cinematic standard for technically demanding projects.',
    shortDescFr: 'Nous faisons du basique au complexe: composition vidéo, montage, motion design, VFX et graphisme. Pipeline complet avec standard cinématographique pour projets exigeants techniquement.',
    shortDescEs: 'Hacemos desde lo básico hasta lo complejo: composición de video, edición, motion design, VFX y grafismo. Pipeline completo con estándar cinematográfico para proyectos de alta exigencia técnica.',
    longDescPt: [
      'Nossa pós-produção combina tecnologia de ponta com expertise artística. Dominamos todo o espectro: de ajustes simples a VFX complexos com tracking, rotoscopia, compositing e simulações.',
      'Trabalhamos com pipeline não-destrutivo, mantendo qualidade máxima em todas as etapas. Nossa equipe é certificada em Nuke, After Effects, Houdini e DaVinci Resolve.',
      'Especializados em motion design para museus e marcas, criamos identidades visuais animadas que comunicam com sofisticação.'
    ],
    longDescEn: [
      'Our post-production combines cutting-edge technology with artistic expertise. We master the full spectrum: from simple adjustments to complex VFX with tracking, rotoscoping, compositing and simulations.',
      'We work with non-destructive pipeline, maintaining maximum quality at all stages. Our team is certified in Nuke, After Effects, Houdini and DaVinci Resolve.',
      'Specialized in motion design for museums and brands, we create animated visual identities that communicate with sophistication.'
    ],
    longDescFr: [
      'Notre post-production combine technologie de pointe et expertise artistique. Nous maîtrisons tout le spectre: des ajustements simples aux VFX complexes avec tracking, rotoscopie, compositing et simulations.',
      'Nous travaillons avec un pipeline non-destructif, maintenant une qualité maximale à toutes les étapes. Notre équipe est certifiée en Nuke, After Effects, Houdini et DaVinci Resolve.',
      'Spécialisés en motion design pour musées et marques, nous créons des identités visuelles animées qui communiquent avec sophistication.'
    ],
    longDescEs: [
      'Nuestra posproducción combina tecnología de punta con expertise artística. Dominamos todo el espectro: de ajustes simples a VFX complejos con tracking, rotoscopia, compositing y simulaciones.',
      'Trabajamos con pipeline no-destructivo, manteniendo calidad máxima en todas las etapas. Nuestro equipo está certificado en Nuke, After Effects, Houdini y DaVinci Resolve.',
      'Especializados en motion design para museos y marcas, creamos identidades visuales animadas que comunican con sofisticación.'
    ],
    deliverablesPt: [
      'Edição e montagem avançada',
      'Color grading profissional',
      'VFX e compositing',
      'Motion design e animação 2D',
      'Tracking e rotoscopia',
      'Cleanup e remoção de elementos',
      'Grafismo e lower thirds',
      'Entrega em múltiplos formatos'
    ],
    deliverablesEn: [
      'Advanced editing and assembly',
      'Professional color grading',
      'VFX and compositing',
      'Motion design and 2D animation',
      'Tracking and rotoscoping',
      'Cleanup and element removal',
      'Graphics and lower thirds',
      'Multi-format delivery'
    ],
    deliverablesFr: [
      'Montage avancé',
      'Étalonnage professionnel',
      'VFX et compositing',
      'Motion design et animation 2D',
      'Tracking et rotoscopie',
      'Nettoyage et suppression d\'éléments',
      'Graphisme et basse casse',
      'Livraison multi-formats'
    ],
    deliverablesEs: [
      'Edición y montaje avanzado',
      'Color grading profesional',
      'VFX y compositing',
      'Motion design y animación 2D',
      'Tracking y rotoscopia',
      'Limpieza y remoción de elementos',
      'Grafismo y lower thirds',
      'Entrega en múltiples formatos'
    ],
    processPt: [
      'Análise de material bruto',
      'Edição e montagem',
      'VFX e motion design',
      'Color grading',
      'Review e ajustes',
      'Entrega final'
    ],
    processEn: [
      'Raw material analysis',
      'Editing and assembly',
      'VFX and motion design',
      'Color grading',
      'Review and adjustments',
      'Final delivery'
    ],
    processFr: [
      'Analyse du matériel brut',
      'Montage',
      'VFX et motion design',
      'Étalonnage',
      'Révision et ajustements',
      'Livraison finale'
    ],
    processEs: [
      'Análisis de material bruto',
      'Edición y montaje',
      'VFX y motion design',
      'Color grading',
      'Revisión y ajustes',
      'Entrega final'
    ],
    technologies: ['DaVinci Resolve', 'After Effects', 'Nuke', 'Houdini', 'Premiere Pro', 'Fusion'],
    projectCategories: ['vfx', 'motion-design', 'post-production', 'audiovisual']
  },
  {
    id: '3',
    slug: 'animacao-2d-3d',
    icon: '🎨',
    titlePt: 'Animação 2D/3D',
    titleEn: '2D/3D Animation',
    titleFr: 'Animation 2D/3D',
    titleEs: 'Animación 2D/3D',
    shortDescPt: 'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.',
    shortDescEn: 'We bring characters and worlds to life through 2D/3D animation. Our technical expertise allows us to create engaging visual narratives, from storyboards to complete finishing.',
    shortDescFr: 'Nous donnons vie aux personnages et aux mondes à travers l\'animation 2D/3D. Notre expertise technique nous permet de créer des récits visuels captivants, des storyboards à la finalisation complète.',
    shortDescEs: 'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.',
    longDescPt: [
      'Combinamos técnicas tradicionais de animação com tecnologia de ponta para criar mundos visuais únicos. Nossa experiência abrange desde animação 2D frame-by-frame até modelagem 3D fotorrealista.',
      'Trabalhamos com pipelines completos de produção 3D (modelagem, rigging, animação, lighting, rendering) e motion graphics 2D sofisticados.',
      'Especializados em criar narrativas visuais para museus, marcas e conteúdos educacionais, onde cada frame conta uma história.'
    ],
    longDescEn: [
      'We combine traditional animation techniques with cutting-edge technology to create unique visual worlds. Our experience ranges from 2D frame-by-frame animation to photorealistic 3D modeling.',
      'We work with complete 3D production pipelines (modeling, rigging, animation, lighting, rendering) and sophisticated 2D motion graphics.',
      'Specialized in creating visual narratives for museums, brands and educational content, where every frame tells a story.'
    ],
    longDescFr: [
      'Nous combinons des techniques d\'animation traditionnelles avec une technologie de pointe pour créer des mondes visuels uniques. Notre expérience couvre de l\'animation 2D image par image à la modélisation 3D photoréaliste.',
      'Nous travaillons avec des pipelines de production 3D complets (modélisation, rigging, animation, éclairage, rendu) et des motion graphics 2D sophistiqués.',
      'Spécialisés dans la création de récits visuels pour musées, marques et contenus éducatifs, où chaque image raconte une histoire.'
    ],
    longDescEs: [
      'Combinamos técnicas tradicionales de animación con tecnología de punta para crear mundos visuales únicos. Nuestra experiencia abarca desde animación 2D fotograma por fotograma hasta modelado 3D fotorrealista.',
      'Trabajamos con pipelines completos de producción 3D (modelado, rigging, animación, iluminación, renderizado) y motion graphics 2D sofisticados.',
      'Especializados en crear narrativas visuales para museos, marcas y contenidos educacionales, donde cada frame cuenta una historia.'
    ],
    deliverablesPt: [
      'Storyboard e animatic',
      'Modelagem 3D e texturização',
      'Rigging e animação de personagens',
      'Animação 2D tradicional e digital',
      'Lighting e rendering fotorrealista',
      'Motion graphics 2D',
      'Compositing final',
      'Entrega em qualquer resolução'
    ],
    deliverablesEn: [
      'Storyboard and animatic',
      '3D modeling and texturing',
      'Character rigging and animation',
      'Traditional and digital 2D animation',
      'Photorealistic lighting and rendering',
      '2D motion graphics',
      'Final compositing',
      'Delivery in any resolution'
    ],
    deliverablesFr: [
      'Storyboard et animatique',
      'Modélisation 3D et texturation',
      'Rigging et animation de personnages',
      'Animation 2D traditionnelle et numérique',
      'Éclairage et rendu photoréaliste',
      'Motion graphics 2D',
      'Compositing final',
      'Livraison en toute résolution'
    ],
    deliverablesEs: [
      'Storyboard y animatic',
      'Modelado 3D y texturizado',
      'Rigging y animación de personajes',
      'Animación 2D tradicional y digital',
      'Iluminación y renderizado fotorrealista',
      'Motion graphics 2D',
      'Compositing final',
      'Entrega en cualquier resolución'
    ],
    processPt: [
      'Conceito e storyboard',
      'Modelagem e rigging (3D) ou desenho (2D)',
      'Animação',
      'Lighting e rendering',
      'Compositing e finalização',
      'Entrega'
    ],
    processEn: [
      'Concept and storyboard',
      'Modeling and rigging (3D) or drawing (2D)',
      'Animation',
      'Lighting and rendering',
      'Compositing and finishing',
      'Delivery'
    ],
    processFr: [
      'Concept et storyboard',
      'Modélisation et rigging (3D) ou dessin (2D)',
      'Animation',
      'Éclairage et rendu',
      'Compositing et finalisation',
      'Livraison'
    ],
    processEs: [
      'Concepto y storyboard',
      'Modelado y rigging (3D) o dibujo (2D)',
      'Animación',
      'Iluminación y renderizado',
      'Compositing y finalización',
      'Entrega'
    ],
    technologies: ['Blender', 'Cinema 4D', 'Maya', 'After Effects', 'Toon Boom', 'Unreal Engine'],
    projectCategories: ['animation', '3d', 'motion-design', 'educational']
  },
  {
    id: '4',
    slug: 'xr-interatividade',
    icon: '🥽',
    titlePt: 'XR / Interatividade',
    titleEn: 'XR / Interactivity',
    titleFr: 'XR / Interactivité',
    titleEs: 'XR / Interactividad',
    shortDescPt: 'Criamos experiências imersivas que transportam pessoas para novos mundos. De filmes VR 360° a instalações interativas, nossa curadoria em festivais nos dá uma visão única do que funciona em narrativas imersivas.',
    shortDescEn: 'We create immersive experiences that transport people to new worlds. From VR 360° films to interactive installations, our festival curation gives us unique insight into what works in immersive narratives.',
    shortDescFr: 'Nous créons des expériences immersives qui transportent les gens vers de nouveaux mondes. Des films VR 360° aux installations interactives, notre curation de festivals nous donne une vision unique de ce qui fonctionne en récits immersifs.',
    shortDescEs: 'Creamos experiencias inmersivas que transportan personas a nuevos mundos. De películas VR 360° a instalaciones interactivas, nuestra curaduría en festivales nos da una visión única de lo que funciona en narrativas inmersivas.',
    longDescPt: [
      'Pioneiros em XR no Brasil desde 2015, desenvolvemos experiências que vão de VR/AR a instalações interativas multiplataforma. Nossa expertise abrange todo o espectro de realidades estendidas.',
      'Como curadores do festival Immerso XR, testamos e validamos centenas de experiências imersivas, desenvolvendo profundo conhecimento sobre linguagem, UX espacial e storytelling imersivo.',
      'Especializados em projetos para museus e espaços culturais, onde a interatividade se torna ferramenta de educação e encantamento.'
    ],
    longDescEn: [
      'Pioneers in XR in Brazil since 2015, we develop experiences ranging from VR/AR to multiplatform interactive installations. Our expertise spans the full spectrum of extended realities.',
      'As curators of the Immerso XR festival, we test and validate hundreds of immersive experiences, developing deep knowledge about language, spatial UX and immersive storytelling.',
      'Specialized in projects for museums and cultural spaces, where interactivity becomes a tool for education and enchantment.'
    ],
    longDescFr: [
      'Pionniers en XR au Brésil depuis 2015, nous développons des expériences allant de VR/AR aux installations interactives multiplateformes. Notre expertise couvre tout le spectre des réalités étendues.',
      'En tant que curateurs du festival Immerso XR, nous testons et validons des centaines d\'expériences immersives, développant une connaissance approfondie du langage, de l\'UX spatial et du storytelling immersif.',
      'Spécialisés dans les projets pour musées et espaces culturels, où l\'interactivité devient un outil d\'éducation et d\'enchantement.'
    ],
    longDescEs: [
      'Pioneros en XR en Brasil desde 2015, desarrollamos experiencias que van de VR/AR a instalaciones interactivas multiplataforma. Nuestra expertise abarca todo el espectro de realidades extendidas.',
      'Como curadores del festival Immerso XR, probamos y validamos cientos de experiencias inmersivas, desarrollando profundo conocimiento sobre lenguaje, UX espacial y storytelling inmersivo.',
      'Especializados en proyectos para museos y espacios culturales, donde la interactividad se convierte en herramienta de educación y encanto.'
    ],
    deliverablesPt: [
      'Filmes VR 360° / 180° / 3DoF',
      'Experiências VR 6DoF (room-scale)',
      'AR para mobile e headsets',
      'Instalações interativas',
      'Projeções mapeadas interativas',
      'Interfaces gestuais e espaciais',
      'Multi-user experiences',
      'Deploy para Meta Quest, PSVR2, Vive'
    ],
    deliverablesEn: [
      'VR 360° / 180° / 3DoF films',
      '6DoF VR experiences (room-scale)',
      'Mobile and headset AR',
      'Interactive installations',
      'Interactive projection mapping',
      'Gestural and spatial interfaces',
      'Multi-user experiences',
      'Deploy to Meta Quest, PSVR2, Vive'
    ],
    deliverablesFr: [
      'Films VR 360° / 180° / 3DoF',
      'Expériences VR 6DoF (room-scale)',
      'AR pour mobile et casques',
      'Installations interactives',
      'Projections mappées interactives',
      'Interfaces gestuelles et spatiales',
      'Expériences multi-utilisateurs',
      'Déploiement Meta Quest, PSVR2, Vive'
    ],
    deliverablesEs: [
      'Películas VR 360° / 180° / 3DoF',
      'Experiencias VR 6DoF (room-scale)',
      'AR para móvil y cascos',
      'Instalaciones interactivas',
      'Proyecciones mapeadas interactivas',
      'Interfaces gestuales y espaciales',
      'Experiencias multiusuario',
      'Deploy para Meta Quest, PSVR2, Vive'
    ],
    processPt: [
      'Conceito e prototipagem',
      'Design de interação e UX espacial',
      'Desenvolvimento (Unity/Unreal)',
      'Testes com usuários',
      'Otimização e polish',
      'Deploy e suporte'
    ],
    processEn: [
      'Concept and prototyping',
      'Interaction design and spatial UX',
      'Development (Unity/Unreal)',
      'User testing',
      'Optimization and polish',
      'Deploy and support'
    ],
    processFr: [
      'Concept et prototypage',
      'Design d\'interaction et UX spatial',
      'Développement (Unity/Unreal)',
      'Tests utilisateurs',
      'Optimisation et polish',
      'Déploiement et support'
    ],
    processEs: [
      'Concepto y prototipado',
      'Diseño de interacción y UX espacial',
      'Desarrollo (Unity/Unreal)',
      'Pruebas con usuarios',
      'Optimización y pulido',
      'Deploy y soporte'
    ],
    technologies: ['Unity', 'Unreal Engine', 'Meta Quest', 'ARKit', 'ARCore', 'WebXR', 'TouchDesigner'],
    projectCategories: ['xr', 'vr', 'ar', 'interactive', 'immersive']
  },
  {
    id: '5',
    slug: 'cenografia-design-espacial',
    icon: '🏗️',
    titlePt: 'Cenografia & Design Espacial',
    titleEn: 'Scenography & Spatial Design',
    titleFr: 'Scénographie & Design Spatial',
    titleEs: 'Escenografía & Diseño Espacial',
    shortDescPt: 'Projetamos espaços que contam histórias: cenografia virtual, sinalética, design gráfico e direção de arte. Integramos tecnologia, audiovisual e design para criar ambientes memoráveis.',
    shortDescEn: 'We design spaces that tell stories: virtual scenography, signage, graphic design and art direction. We integrate technology, audiovisual and design to create memorable environments.',
    shortDescFr: 'Nous concevons des espaces qui racontent des histoires: scénographie virtuelle, signalétique, design graphique et direction artistique. Nous intégrons technologie, audiovisuel et design pour créer des environnements mémorables.',
    shortDescEs: 'Proyectamos espacios que cuentan historias: escenografía virtual, señalética, diseño gráfico y dirección de arte. Integramos tecnología, audiovisual y diseño para crear ambientes memorables.',
    longDescPt: [
      'Especializados em design de experiências espaciais, criamos cenografias que fundem físico e digital. Nossa abordagem integra arquitetura, design gráfico, iluminação e projeções mapeadas.',
      'Com experiência em museus como o Rio Museu Olímpico, desenvolvemos projetos que consideram fluxo de visitantes, acessibilidade, narrativa espacial e integração tecnológica.',
      'Nosso processo colaborativo envolve arquitetos, designers, engenheiros e artistas visuais para garantir coerência estética e funcional.'
    ],
    longDescEn: [
      'Specialized in spatial experience design, we create scenographies that merge physical and digital. Our approach integrates architecture, graphic design, lighting and projection mapping.',
      'With experience in museums like the Rio Olympic Museum, we develop projects that consider visitor flow, accessibility, spatial narrative and technological integration.',
      'Our collaborative process involves architects, designers, engineers and visual artists to ensure aesthetic and functional coherence.'
    ],
    longDescFr: [
      'Spécialisés en design d\'expériences spatiales, nous créons des scénographies qui fusionnent physique et numérique. Notre approche intègre architecture, design graphique, éclairage et projections mappées.',
      'Avec une expérience dans des musées comme le Musée Olympique de Rio, nous développons des projets qui considèrent le flux de visiteurs, l\'accessibilité, le récit spatial et l\'intégration technologique.',
      'Notre processus collaboratif implique architectes, designers, ingénieurs et artistes visuels pour garantir cohérence esthétique et fonctionnelle.'
    ],
    longDescEs: [
      'Especializados en diseño de experiencias espaciales, creamos escenografías que fusionan físico y digital. Nuestro enfoque integra arquitectura, diseño gráfico, iluminación y proyecciones mapeadas.',
      'Con experiencia en museos como el Museo Olímpico de Río, desarrollamos proyectos que consideran flujo de visitantes, accesibilidad, narrativa espacial e integración tecnológica.',
      'Nuestro proceso colaborativo involucra arquitectos, diseñadores, ingenieros y artistas visuales para garantizar coherencia estética y funcional.'
    ],
    deliverablesPt: [
      'Conceito e master plan espacial',
      'Sinalética e wayfinding',
      'Design gráfico ambiental',
      'Cenografia virtual (renders 3D)',
      'Projeções mapeadas',
      'Especificações técnicas',
      'Identidade visual espacial',
      'Acompanhamento de implantação'
    ],
    deliverablesEn: [
      'Concept and spatial master plan',
      'Signage and wayfinding',
      'Environmental graphic design',
      'Virtual scenography (3D renders)',
      'Projection mapping',
      'Technical specifications',
      'Spatial visual identity',
      'Implementation follow-up'
    ],
    deliverablesFr: [
      'Concept et master plan spatial',
      'Signalétique et orientation',
      'Design graphique environnemental',
      'Scénographie virtuelle (rendus 3D)',
      'Projections mappées',
      'Spécifications techniques',
      'Identité visuelle spatiale',
      'Suivi de mise en œuvre'
    ],
    deliverablesEs: [
      'Concepto y master plan espacial',
      'Señalética y orientación',
      'Diseño gráfico ambiental',
      'Escenografía virtual (renders 3D)',
      'Proyecciones mapeadas',
      'Especificaciones técnicas',
      'Identidad visual espacial',
      'Seguimiento de implementación'
    ],
    processPt: [
      'Briefing e análise do espaço',
      'Conceito e mood board',
      'Projeto executivo 3D',
      'Especificações técnicas',
      'Prototipagem',
      'Acompanhamento de obra'
    ],
    processEn: [
      'Briefing and space analysis',
      'Concept and mood board',
      '3D executive project',
      'Technical specifications',
      'Prototyping',
      'Construction follow-up'
    ],
    processFr: [
      'Briefing et analyse de l\'espace',
      'Concept et mood board',
      'Projet exécutif 3D',
      'Spécifications techniques',
      'Prototypage',
      'Suivi de chantier'
    ],
    processEs: [
      'Briefing y análisis del espacio',
      'Concepto y mood board',
      'Proyecto ejecutivo 3D',
      'Especificaciones técnicas',
      'Prototipado',
      'Seguimiento de obra'
    ],
    technologies: ['SketchUp', 'Rhino', 'AutoCAD', 'Adobe Creative Suite', 'V-Ray', 'MadMapper', 'Resolume'],
    projectCategories: ['spatial-design', 'scenography', 'museum', 'exhibition']
  },
  {
    id: '6',
    slug: 'games-interativos',
    icon: '🎮',
    titlePt: 'Games & Interativos',
    titleEn: 'Games & Interactives',
    titleFr: 'Jeux & Interactifs',
    titleEs: 'Juegos & Interactivos',
    shortDescPt: 'Desenvolvemos jogos e experiências interativas para museus, marcas e educação. De jogos sérios a narrativas não-lineares, criamos experiências que engajam e educam.',
    shortDescEn: 'We develop games and interactive experiences for museums, brands and education. From serious games to non-linear narratives, we create experiences that engage and educate.',
    shortDescFr: 'Nous développons des jeux et expériences interactives pour musées, marques et éducation. Des jeux sérieux aux récits non-linéaires, nous créons des expériences qui engagent et éduquent.',
    shortDescEs: 'Desarrollamos juegos y experiencias interactivas para museos, marcas y educación. De juegos serios a narrativas no lineales, creamos experiencias que engajan y educan.',
    longDescPt: [
      'Especializados em game design para contextos não-comerciais, criamos jogos educacionais, instalações interativas e experiências gamificadas para museus e instituições culturais.',
      'Nossa abordagem combina mecânicas de jogo envolventes com objetivos educacionais ou de marca, sempre respeitando o público-alvo e o contexto de uso.',
      'Desenvolvemos em Unity e Unreal Engine, com deploy para múltiplas plataformas: touchscreens, web, mobile, consoles e instalações customizadas.'
    ],
    longDescEn: [
      'Specialized in game design for non-commercial contexts, we create educational games, interactive installations and gamified experiences for museums and cultural institutions.',
      'Our approach combines engaging game mechanics with educational or brand objectives, always respecting the target audience and context of use.',
      'We develop in Unity and Unreal Engine, with deploy to multiple platforms: touchscreens, web, mobile, consoles and custom installations.'
    ],
    longDescFr: [
      'Spécialisés en game design pour contextes non-commerciaux, nous créons des jeux éducatifs, installations interactives et expériences gamifiées pour musées et institutions culturelles.',
      'Notre approche combine des mécaniques de jeu engageantes avec des objectifs éducatifs ou de marque, respectant toujours le public cible et le contexte d\'utilisation.',
      'Nous développons en Unity et Unreal Engine, avec déploiement sur multiples plateformes: écrans tactiles, web, mobile, consoles et installations personnalisées.'
    ],
    longDescEs: [
      'Especializados en game design para contextos no comerciales, creamos juegos educacionales, instalaciones interactivas y experiencias gamificadas para museos e instituciones culturales.',
      'Nuestro enfoque combina mecánicas de juego envolventes con objetivos educacionales o de marca, siempre respetando el público objetivo y el contexto de uso.',
      'Desarrollamos en Unity y Unreal Engine, con deploy para múltiples plataformas: touchscreens, web, móvil, consolas e instalaciones customizadas.'
    ],
    deliverablesPt: [
      'Game design document',
      'Prototipagem jogável',
      'Desenvolvimento completo',
      'Arte 2D/3D e animações',
      'Sound design e música',
      'Integração com hardware customizado',
      'Testes de usabilidade',
      'Deploy multiplataforma'
    ],
    deliverablesEn: [
      'Game design document',
      'Playable prototyping',
      'Complete development',
      '2D/3D art and animations',
      'Sound design and music',
      'Custom hardware integration',
      'Usability testing',
      'Multi-platform deploy'
    ],
    deliverablesFr: [
      'Document de game design',
      'Prototypage jouable',
      'Développement complet',
      'Art 2D/3D et animations',
      'Sound design et musique',
      'Intégration matériel personnalisé',
      'Tests d\'utilisabilité',
      'Déploiement multiplateforme'
    ],
    deliverablesEs: [
      'Documento de game design',
      'Prototipado jugable',
      'Desarrollo completo',
      'Arte 2D/3D y animaciones',
      'Sound design y música',
      'Integración con hardware customizado',
      'Pruebas de usabilidad',
      'Deploy multiplataforma'
    ],
    processPt: [
      'Conceito e GDD',
      'Prototipagem e testes',
      'Desenvolvimento e iteração',
      'Arte e som',
      'Playtesting',
      'Deploy e suporte'
    ],
    processEn: [
      'Concept and GDD',
      'Prototyping and testing',
      'Development and iteration',
      'Art and sound',
      'Playtesting',
      'Deploy and support'
    ],
    processFr: [
      'Concept et GDD',
      'Prototypage et tests',
      'Développement et itération',
      'Art et son',
      'Playtesting',
      'Déploiement et support'
    ],
    processEs: [
      'Concepto y GDD',
      'Prototipado y pruebas',
      'Desarrollo e iteración',
      'Arte y sonido',
      'Playtesting',
      'Deploy y soporte'
    ],
    technologies: ['Unity', 'Unreal Engine', 'Godot', 'WebGL', 'Arduino', 'Raspberry Pi'],
    projectCategories: ['games', 'interactive', 'educational', 'gamification']
  },
  {
    id: '7',
    slug: 'ia-criativa',
    icon: '🤖',
    titlePt: 'IA Criativa',
    titleEn: 'Creative AI',
    titleFr: 'IA Créative',
    titleEs: 'IA Creativa',
    shortDescPt: 'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.',
    shortDescEn: 'We explore the potential of generative AI for narratives. Our research since 1997 and practical experience allows us to create unique pipelines that combine AI with traditional cinematic language.',
    shortDescFr: 'Nous explorons le potentiel de l\'IA générative pour les récits. Notre recherche depuis 1997 et expérience pratique nous permet de créer des pipelines uniques qui combinent l\'IA avec le langage cinématographique traditionnel.',
    shortDescEs: 'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.',
    longDescPt: [
      'Pioneiros em pesquisa de IA para narrativas no Brasil (desde 1997), desenvolvemos expertise única na intersecção entre inteligência artificial e storytelling.',
      'Criamos pipelines que usam Stable Diffusion, Midjourney, RunwayML e ferramentas custom para acelerar pré-produção, criar concept art, storyboards e até sequências animadas experimentais.',
      'Nossa abordagem não substitui artistas, mas potencializa a criatividade humana, permitindo iterar rapidamente e explorar direções visuais inovadoras.'
    ],
    longDescEn: [
      'Pioneers in AI research for narratives in Brazil (since 1997), we have developed unique expertise at the intersection of artificial intelligence and storytelling.',
      'We create pipelines that use Stable Diffusion, Midjourney, RunwayML and custom tools to accelerate pre-production, create concept art, storyboards and even experimental animated sequences.',
      'Our approach doesn\'t replace artists, but enhances human creativity, allowing rapid iteration and exploration of innovative visual directions.'
    ],
    longDescFr: [
      'Pionniers en recherche IA pour récits au Brésil (depuis 1997), nous avons développé une expertise unique à l\'intersection de l\'intelligence artificielle et du storytelling.',
      'Nous créons des pipelines qui utilisent Stable Diffusion, Midjourney, RunwayML et outils personnalisés pour accélérer la pré-production, créer du concept art, des storyboards et même des séquences animées expérimentales.',
      'Notre approche ne remplace pas les artistes, mais renforce la créativité humaine, permettant une itération rapide et l\'exploration de directions visuelles innovantes.'
    ],
    longDescEs: [
      'Pioneros en investigación de IA para narrativas en Brasil (desde 1997), hemos desarrollado expertise única en la intersección entre inteligencia artificial y storytelling.',
      'Creamos pipelines que usan Stable Diffusion, Midjourney, RunwayML y herramientas custom para acelerar preproducción, crear concept art, storyboards y hasta secuencias animadas experimentales.',
      'Nuestro enfoque no reemplaza artistas, sino que potencia la creatividad humana, permitiendo iterar rápidamente y explorar direcciones visuales innovadoras.'
    ],
    deliverablesPt: [
      'Pesquisa e desenvolvimento de pipeline',
      'Concept art gerado por IA',
      'Storyboards acelerados',
      'Geração de assets 2D/3D',
      'Video-to-video styling',
      'Treinamento de modelos custom',
      'Documentação de workflow',
      'Consultoria em IA criativa'
    ],
    deliverablesEn: [
      'Research and pipeline development',
      'AI-generated concept art',
      'Accelerated storyboards',
      '2D/3D asset generation',
      'Video-to-video styling',
      'Custom model training',
      'Workflow documentation',
      'Creative AI consulting'
    ],
    deliverablesFr: [
      'Recherche et développement de pipeline',
      'Concept art généré par IA',
      'Storyboards accélérés',
      'Génération d\'assets 2D/3D',
      'Stylisation vidéo-à-vidéo',
      'Entraînement de modèles personnalisés',
      'Documentation de workflow',
      'Consulting en IA créative'
    ],
    deliverablesEs: [
      'Investigación y desarrollo de pipeline',
      'Concept art generado por IA',
      'Storyboards acelerados',
      'Generación de assets 2D/3D',
      'Estilización video-a-video',
      'Entrenamiento de modelos custom',
      'Documentación de workflow',
      'Consultoría en IA creativa'
    ],
    processPt: [
      'Análise de necessidades',
      'Seleção/treinamento de modelos',
      'Criação de pipeline',
      'Iteração e refinamento',
      'Integração com workflow existente',
      'Documentação e transferência'
    ],
    processEn: [
      'Needs analysis',
      'Model selection/training',
      'Pipeline creation',
      'Iteration and refinement',
      'Integration with existing workflow',
      'Documentation and transfer'
    ],
    processFr: [
      'Analyse des besoins',
      'Sélection/entraînement de modèles',
      'Création de pipeline',
      'Itération et raffinement',
      'Intégration au workflow existant',
      'Documentation et transfert'
    ],
    processEs: [
      'Análisis de necesidades',
      'Selección/entrenamiento de modelos',
      'Creación de pipeline',
      'Iteración y refinamiento',
      'Integración con workflow existente',
      'Documentación y transferencia'
    ],
    technologies: ['Stable Diffusion', 'Midjourney', 'RunwayML', 'ComfyUI', 'Automatic1111', 'Python', 'TensorFlow'],
    projectCategories: ['ai', 'research', 'innovation', 'concept-art']
  },
  {
    id: '8',
    slug: 'direcao-arte-criativa',
    icon: '🎭',
    titlePt: 'Direção de Arte & Criativa',
    titleEn: 'Art & Creative Direction',
    titleFr: 'Direction Artistique & Créative',
    titleEs: 'Dirección de Arte & Creativa',
    shortDescPt: 'Lideramos a visão criativa de projetos complexos: direção de arte, direção criativa e identidade visual. Coordenamos equipes multidisciplinares para garantir coerência estética e narrativa.',
    shortDescEn: 'We lead the creative vision of complex projects: art direction, creative direction and visual identity. We coordinate multidisciplinary teams to ensure aesthetic and narrative coherence.',
    shortDescFr: 'Nous dirigeons la vision créative de projets complexes: direction artistique, direction créative et identité visuelle. Nous coordonnons des équipes multidisciplinaires pour garantir cohérence esthétique et narrative.',
    shortDescEs: 'Lideramos la visión creativa de proyectos complejos: dirección de arte, dirección creativa e identidad visual. Coordinamos equipos multidisciplinares para garantizar coherencia estética y narrativa.',
    longDescPt: [
      'Com 30 anos de experiência, nossa diretora de arte Aick liderou projetos complexos como o Rio Museu Olímpico, integrando cenografia, tecnologia, audiovisual e design gráfico.',
      'Oferecemos direção de arte completa: desde conceito e identidade visual até supervisão de produção e garantia de qualidade estética em todas as entregas.',
      'Nossa abordagem integra pesquisa visual, referências culturais, tendências contemporâneas e coerência narrativa para criar experiências visuais únicas.'
    ],
    longDescEn: [
      'With 30 years of experience, our art director Aick has led complex projects like the Rio Olympic Museum, integrating scenography, technology, audiovisual and graphic design.',
      'We offer complete art direction: from concept and visual identity to production supervision and aesthetic quality assurance in all deliveries.',
      'Our approach integrates visual research, cultural references, contemporary trends and narrative coherence to create unique visual experiences.'
    ],
    longDescFr: [
      'Avec 30 ans d\'expérience, notre directrice artistique Aick a dirigé des projets complexes comme le Musée Olympique de Rio, intégrant scénographie, technologie, audiovisuel et design graphique.',
      'Nous offrons une direction artistique complète: du concept et identité visuelle à la supervision de production et assurance qualité esthétique dans toutes les livraisons.',
      'Notre approche intègre recherche visuelle, références culturelles, tendances contemporaines et cohérence narrative pour créer des expériences visuelles uniques.'
    ],
    longDescEs: [
      'Con 30 años de experiencia, nuestra directora de arte Aick lideró proyectos complejos como el Museo Olímpico de Río, integrando escenografía, tecnología, audiovisual y diseño gráfico.',
      'Ofrecemos dirección de arte completa: desde concepto e identidad visual hasta supervisión de producción y garantía de calidad estética en todas las entregas.',
      'Nuestro enfoque integra investigación visual, referencias culturales, tendencias contemporáneas y coherencia narrativa para crear experiencias visuales únicas.'
    ],
    deliverablesPt: [
      'Conceito e mood board',
      'Identidade visual completa',
      'Style guide',
      'Direção de fotografia',
      'Supervisão de design',
      'Art direction para vídeo/foto',
      'Coordenação de equipes criativas',
      'Quality assurance estético'
    ],
    deliverablesEn: [
      'Concept and mood board',
      'Complete visual identity',
      'Style guide',
      'Photography direction',
      'Design supervision',
      'Art direction for video/photo',
      'Creative team coordination',
      'Aesthetic quality assurance'
    ],
    deliverablesFr: [
      'Concept et mood board',
      'Identité visuelle complète',
      'Guide de style',
      'Direction de photographie',
      'Supervision de design',
      'Direction artistique pour vidéo/photo',
      'Coordination d\'équipes créatives',
      'Assurance qualité esthétique'
    ],
    deliverablesEs: [
      'Concepto y mood board',
      'Identidad visual completa',
      'Guía de estilo',
      'Dirección de fotografía',
      'Supervisión de diseño',
      'Dirección de arte para video/foto',
      'Coordinación de equipos creativos',
      'Garantía de calidad estética'
    ],
    processPt: [
      'Briefing e pesquisa',
      'Conceito e referências',
      'Desenvolvimento de identidade',
      'Coordenação de produção',
      'Supervisão e QA',
      'Entrega e documentação'
    ],
    processEn: [
      'Briefing and research',
      'Concept and references',
      'Identity development',
      'Production coordination',
      'Supervision and QA',
      'Delivery and documentation'
    ],
    processFr: [
      'Briefing et recherche',
      'Concept et références',
      'Développement d\'identité',
      'Coordination de production',
      'Supervision et QA',
      'Livraison et documentation'
    ],
    processEs: [
      'Briefing e investigación',
      'Concepto y referencias',
      'Desarrollo de identidad',
      'Coordinación de producción',
      'Supervisión y QA',
      'Entrega y documentación'
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Miro', 'Frame.io', 'Asana', 'Monday'],
    projectCategories: ['art-direction', 'branding', 'museum', 'cultural']
  },
  {
    id: '9',
    slug: 'consultoria-estrategia',
    icon: '💡',
    titlePt: 'Consultoria & Estratégia',
    titleEn: 'Consulting & Strategy',
    titleFr: 'Conseil & Stratégie',
    titleEs: 'Consultoría & Estrategia',
    shortDescPt: 'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos (editais nacionais e internacionais) e estratégia de IA permite que clientes realizem projetos que de outra forma não conseguiriam.',
    shortDescEn: 'We accompany projects from conception to execution. Our experience in resource acquisition (national and international grants) and AI strategy allows clients to realize projects they couldn\'t otherwise achieve.',
    shortDescFr: 'Nous accompagnons les projets de la conception à l\'exécution. Notre expérience en acquisition de ressources (subventions nationales et internationales) et stratégie IA permet aux clients de réaliser des projets qu\'ils ne pourraient autrement atteindre.',
    shortDescEs: 'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos (convocatorias nacionales e internacionales) y estrategia de IA permite que clientes realicen proyectos que de otra forma no conseguirían.',
    longDescPt: [
      'Oferecemos consultoria estratégica completa para projetos culturais, tecnológicos e audiovisuais. Nossa expertise inclui captação de recursos via editais (Ancine, Lei Rouanet, editais internacionais).',
      'Desenvolvemos estratégias de integração tecnológica, ajudando instituições a adotar IA, XR e outras tecnologias de forma inteligente e alinhada com seus objetivos.',
      'Atuamos como consultores, coordenadores de projeto ou parceiros estratégicos, adaptando nosso modelo de trabalho às necessidades de cada cliente.'
    ],
    longDescEn: [
      'We offer complete strategic consulting for cultural, technological and audiovisual projects. Our expertise includes resource acquisition through grants (Ancine, Lei Rouanet, international calls).',
      'We develop technology integration strategies, helping institutions adopt AI, XR and other technologies intelligently and aligned with their objectives.',
      'We act as consultants, project coordinators or strategic partners, adapting our working model to each client\'s needs.'
    ],
    longDescFr: [
      'Nous offrons du conseil stratégique complet pour projets culturels, technologiques et audiovisuels. Notre expertise inclut l\'acquisition de ressources via subventions (Ancine, Lei Rouanet, appels internationaux).',
      'Nous développons des stratégies d\'intégration technologique, aidant les institutions à adopter l\'IA, XR et autres technologies de manière intelligente et alignée avec leurs objectifs.',
      'Nous agissons comme consultants, coordinateurs de projet ou partenaires stratégiques, adaptant notre modèle de travail aux besoins de chaque client.'
    ],
    longDescEs: [
      'Ofrecemos consultoría estratégica completa para proyectos culturales, tecnológicos y audiovisuales. Nuestra expertise incluye captación de recursos vía convocatorias (Ancine, Lei Rouanet, convocatorias internacionales).',
      'Desarrollamos estrategias de integración tecnológica, ayudando instituciones a adoptar IA, XR y otras tecnologías de forma inteligente y alineada con sus objetivos.',
      'Actuamos como consultores, coordinadores de proyecto o partners estratégicos, adaptando nuestro modelo de trabajo a las necesidades de cada cliente.'
    ],
    deliverablesPt: [
      'Análise de viabilidade',
      'Planejamento estratégico',
      'Captação de recursos',
      'Gestão de projetos',
      'Coordenação de equipes',
      'Integração tecnológica',
      'Documentação de processos',
      'Relatórios de prestação de contas'
    ],
    deliverablesEn: [
      'Feasibility analysis',
      'Strategic planning',
      'Resource acquisition',
      'Project management',
      'Team coordination',
      'Technology integration',
      'Process documentation',
      'Accountability reports'
    ],
    deliverablesFr: [
      'Analyse de faisabilité',
      'Planification stratégique',
      'Acquisition de ressources',
      'Gestion de projets',
      'Coordination d\'équipes',
      'Intégration technologique',
      'Documentation de processus',
      'Rapports de comptes rendus'
    ],
    deliverablesEs: [
      'Análisis de viabilidad',
      'Planificación estratégica',
      'Captación de recursos',
      'Gestión de proyectos',
      'Coordinación de equipos',
      'Integración tecnológica',
      'Documentación de procesos',
      'Informes de rendición de cuentas'
    ],
    processPt: [
      'Diagnóstico inicial',
      'Planejamento estratégico',
      'Desenvolvimento de proposta',
      'Captação de recursos',
      'Execução e coordenação',
      'Prestação de contas'
    ],
    processEn: [
      'Initial diagnosis',
      'Strategic planning',
      'Proposal development',
      'Resource acquisition',
      'Execution and coordination',
      'Accountability'
    ],
    processFr: [
      'Diagnostic initial',
      'Planification stratégique',
      'Développement de proposition',
      'Acquisition de ressources',
      'Exécution et coordination',
      'Comptes rendus'
    ],
    processEs: [
      'Diagnóstico inicial',
      'Planificación estratégica',
      'Desarrollo de propuesta',
      'Captación de recursos',
      'Ejecución y coordinación',
      'Rendición de cuentas'
    ],
    technologies: ['Notion', 'Miro', 'Google Workspace', 'Asana', 'Monday', 'Slack'],
    projectCategories: ['consulting', 'strategy', 'funding', 'management']
  }
]

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find(s => s.slug === slug)
}

export function getServiceTitle(service: Service, lang: Lang): string {
  switch (lang) {
    case 'pt': return service.titlePt
    case 'en': return service.titleEn
    case 'fr': return service.titleFr
    case 'es': return service.titleEs
  }
}

export function getServiceShortDesc(service: Service, lang: Lang): string {
  switch (lang) {
    case 'pt': return service.shortDescPt
    case 'en': return service.shortDescEn
    case 'fr': return service.shortDescFr
    case 'es': return service.shortDescEs
  }
}

export function getServiceLongDesc(service: Service, lang: Lang): string[] {
  switch (lang) {
    case 'pt': return service.longDescPt
    case 'en': return service.longDescEn
    case 'fr': return service.longDescFr
    case 'es': return service.longDescEs
  }
}

export function getServiceDeliverables(service: Service, lang: Lang): string[] {
  switch (lang) {
    case 'pt': return service.deliverablesPt
    case 'en': return service.deliverablesEn
    case 'fr': return service.deliverablesFr
    case 'es': return service.deliverablesEs
  }
}

export function getServiceProcess(service: Service, lang: Lang): string[] {
  switch (lang) {
    case 'pt': return service.processPt
    case 'en': return service.processEn
    case 'fr': return service.processFr
    case 'es': return service.processEs
  }
}

