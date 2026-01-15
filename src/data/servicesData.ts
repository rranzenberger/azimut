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
      'Com três décadas de experiência em produção audiovisual, a Azimut domina todas as etapas da criação cinematográfica. Nossa expertise abrange desde o desenvolvimento de conceito e roteiro até a entrega final em padrão broadcast. Fundada em 1996, acumulamos centenas de projetos que nos posicionam como referência em narrativas visuais de impacto.',
      'Trabalhamos com equipamentos de ponta (RED, Blackmagic, Sony Cinema Line) e pipelines de pós-produção que garantem qualidade cinematográfica. Nossa equipe combina visão artística com rigor técnico para criar conteúdos que emocionam e comunicam. Cada projeto é tratado com a mesma dedicação, seja um documentário institucional ou uma produção cinematográfica de grande escala.',
      'Especializados em projetos para instituições culturais, festivais internacionais e marcas premium, entregamos desde documentários até filmes publicitários de alto impacto visual. Nossa experiência inclui trabalhos para o Museu Olímpico, Festival de Cinema de Gramado, e diversas marcas que buscam comunicação visual de excelência.',
      'Nossa metodologia de trabalho é baseada em colaboração profunda com o cliente desde o primeiro briefing. Entendemos que cada projeto tem necessidades únicas, e por isso desenvolvemos abordagens personalizadas que respeitam prazos, orçamentos e objetivos estratégicos. A transparência e comunicação constante são pilares do nosso processo criativo.',
      'Na fase de pré-produção, realizamos pesquisas aprofundadas, desenvolvemos roteiros que equilibram narrativa e impacto visual, e criamos storyboards detalhados que servem como guia para toda a equipe. Nossa experiência em diferentes gêneros (documentário, ficção, publicidade, institucional) nos permite adaptar linguagem e estética conforme a necessidade do projeto.',
      'Durante a captação, utilizamos equipamentos profissionais que garantem máxima qualidade de imagem. Trabalhamos com câmeras RED (8K), Blackmagic URSA Mini Pro (6K), e Sony Cinema Line, sempre com lentes de alta qualidade e sistemas de estabilização adequados. Nossa equipe técnica é treinada para extrair o máximo de cada equipamento, garantindo imagens cinematográficas mesmo em condições desafiadoras.',
      'A pós-produção é onde nossa expertise realmente brilha. Utilizamos DaVinci Resolve para color grading profissional, Adobe Premiere e Avid para edição, After Effects e Nuke para VFX, e pipelines customizados que garantem eficiência sem comprometer qualidade. Cada frame é tratado com atenção aos detalhes, desde correção de cor até composição de efeitos visuais complexos.',
      'Entregamos projetos em múltiplos formatos e resoluções, sempre adaptados às necessidades de cada plataforma. Seja para cinema (DCP), broadcast (ProRes), streaming (H.265), web (MP4) ou redes sociais, garantimos que o conteúdo mantenha sua qualidade visual e impacto narrativo. Nossa experiência com diferentes codecs e formatos nos permite otimizar cada entrega para máxima qualidade e compatibilidade.',
      'Além da produção técnica, oferecemos serviços de direção criativa, consultoria em storytelling, e desenvolvimento de identidade visual para projetos audiovisuais. Acreditamos que um bom filme vai além da técnica: precisa de uma narrativa forte, estética consistente e propósito claro. Por isso, nossa equipe inclui diretores, roteiristas e diretores de arte experientes que trabalham em conjunto para criar obras memoráveis.'
    ],
    longDescEn: [
      'With three decades of experience in audiovisual production, Azimut masters all stages of cinematic creation. Our expertise spans from concept development and screenwriting to final delivery in broadcast standard. Founded in 1996, we have accumulated hundreds of projects that position us as a reference in impactful visual narratives.',
      'We work with cutting-edge equipment (RED, Blackmagic, Sony Cinema Line) and post-production pipelines that ensure cinematic quality. Our team combines artistic vision with technical rigor to create content that moves and communicates. Each project is treated with the same dedication, whether it\'s an institutional documentary or a large-scale cinematic production.',
      'Specialized in projects for cultural institutions, international festivals and premium brands, we deliver everything from documentaries to high visual impact advertising films. Our experience includes work for the Olympic Museum, Gramado Film Festival, and various brands seeking visual communication excellence.',
      'Our work methodology is based on deep collaboration with the client from the first briefing. We understand that each project has unique needs, and therefore we develop personalized approaches that respect deadlines, budgets and strategic objectives. Transparency and constant communication are pillars of our creative process.',
      'In the pre-production phase, we conduct in-depth research, develop scripts that balance narrative and visual impact, and create detailed storyboards that serve as a guide for the entire team. Our experience in different genres (documentary, fiction, advertising, institutional) allows us to adapt language and aesthetics according to project needs.',
      'During capture, we use professional equipment that guarantees maximum image quality. We work with RED cameras (8K), Blackmagic URSA Mini Pro (6K), and Sony Cinema Line, always with high-quality lenses and appropriate stabilization systems. Our technical team is trained to extract the maximum from each piece of equipment, ensuring cinematic images even in challenging conditions.',
      'Post-production is where our expertise really shines. We use DaVinci Resolve for professional color grading, Adobe Premiere and Avid for editing, After Effects and Nuke for VFX, and custom pipelines that ensure efficiency without compromising quality. Each frame is treated with attention to detail, from color correction to composition of complex visual effects.',
      'We deliver projects in multiple formats and resolutions, always adapted to each platform\'s needs. Whether for cinema (DCP), broadcast (ProRes), streaming (H.265), web (MP4) or social media, we ensure content maintains its visual quality and narrative impact. Our experience with different codecs and formats allows us to optimize each delivery for maximum quality and compatibility.',
      'Beyond technical production, we offer creative direction services, storytelling consulting, and visual identity development for audiovisual projects. We believe a good film goes beyond technique: it needs a strong narrative, consistent aesthetics and clear purpose. That\'s why our team includes experienced directors, screenwriters and art directors who work together to create memorable works.'
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
      'Photographie et production',
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
    technologies: ['RED', 'Blackmagic', 'Sony Cinema Line', 'DaVinci Resolve', 'Adobe Premiere', 'After Effects', 'Flame'],
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
      'Nossa pós-produção combina tecnologia de ponta com expertise artística. Dominamos todo o espectro: de ajustes simples a VFX complexos com tracking, rotoscopia, compositing e simulações. Com mais de 25 anos de experiência, desenvolvemos um pipeline robusto que garante qualidade cinematográfica em cada projeto.',
      'Trabalhamos com pipeline não-destrutivo, mantendo qualidade máxima em todas as etapas. Nossa equipe é certificada em Nuke, After Effects, Houdini e DaVinci Resolve. Utilizamos workflows que preservam a qualidade original do material, permitindo revisões e ajustes sem perda de informação.',
      'Especializados em motion design para museus e marcas, criamos identidades visuais animadas que comunicam com sofisticação. Cada projeto recebe tratamento personalizado, desde a concepção do conceito visual até a finalização técnica, garantindo que a identidade da marca ou instituição seja transmitida com clareza e impacto.',
      'Nossa expertise em color grading vai além da correção básica. Trabalhamos com DaVinci Resolve em ambientes calibrados, criando looks cinematográficos que elevam a narrativa visual. Desenvolvemos LUTs personalizados e aplicamos técnicas avançadas de correção de cor que garantem consistência visual em todo o projeto.',
      'Em VFX, realizamos desde composições simples até efeitos complexos que exigem simulações físicas, partículas e integração fotorrealística. Nossa equipe domina técnicas de tracking 3D, matchmoving, rotoscopia manual e automatizada, e compositing avançado que permite criar efeitos invisíveis e impactantes.',
      'Motion graphics é uma de nossas especialidades. Criamos animações 2D e 3D que comunicam informações complexas de forma clara e envolvente. Desenvolvemos infográficos animados, aberturas de programas, identidades visuais animadas e peças publicitárias que capturam atenção e transmitem mensagens de forma eficaz.',
      'Nossa metodologia de trabalho prioriza comunicação constante com o cliente. Realizamos revisões colaborativas através de plataformas online, garantindo que cada ajuste seja aprovado antes de prosseguir. Isso resulta em projetos que atendem exatamente às expectativas, sem retrabalhos desnecessários.',
      'Entregamos projetos em múltiplos formatos e resoluções, sempre otimizados para cada plataforma de destino. Seja para cinema (DCP), broadcast (ProRes), streaming (H.265), web (MP4) ou redes sociais, garantimos que o conteúdo mantenha sua qualidade visual e impacto narrativo em qualquer formato.',
      'Além da produção técnica, oferecemos consultoria em pós-produção, otimização de workflows e treinamento de equipes. Compartilhamos conhecimento e melhores práticas para que nossos clientes possam manter padrões de qualidade em projetos futuros.'
    ],
    longDescEn: [
      'Our post-production combines cutting-edge technology with artistic expertise. We master the full spectrum: from simple adjustments to complex VFX with tracking, rotoscoping, compositing and simulations. With over 25 years of experience, we have developed a robust pipeline that guarantees cinematic quality in every project.',
      'We work with non-destructive pipeline, maintaining maximum quality at all stages. Our team is certified in Nuke, After Effects, Houdini and DaVinci Resolve. We use workflows that preserve original material quality, allowing reviews and adjustments without information loss.',
      'Specialized in motion design for museums and brands, we create animated visual identities that communicate with sophistication. Each project receives personalized treatment, from visual concept conception to technical finishing, ensuring brand or institution identity is transmitted with clarity and impact.',
      'Our color grading expertise goes beyond basic correction. We work with DaVinci Resolve in calibrated environments, creating cinematic looks that elevate visual narrative. We develop custom LUTs and apply advanced color correction techniques that guarantee visual consistency throughout the project.',
      'In VFX, we perform from simple compositions to complex effects requiring physical simulations, particles and photorealistic integration. Our team masters 3D tracking, matchmoving, manual and automated rotoscoping, and advanced compositing techniques that allow creating invisible and impactful effects.',
      'Motion graphics is one of our specialties. We create 2D and 3D animations that communicate complex information clearly and engagingly. We develop animated infographics, program openings, animated visual identities and advertising pieces that capture attention and transmit messages effectively.',
      'Our work methodology prioritizes constant communication with the client. We conduct collaborative reviews through online platforms, ensuring each adjustment is approved before proceeding. This results in projects that meet expectations exactly, without unnecessary rework.',
      'We deliver projects in multiple formats and resolutions, always optimized for each target platform. Whether for cinema (DCP), broadcast (ProRes), streaming (H.265), web (MP4) or social media, we ensure content maintains its visual quality and narrative impact in any format.',
      'Beyond technical production, we offer post-production consulting, workflow optimization and team training. We share knowledge and best practices so our clients can maintain quality standards in future projects.'
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
      'Entrega múltiplos formatos'
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
      'Entrega múltiples formatos'
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
    technologies: ['DaVinci Resolve', 'After Effects', 'Nuke', 'Flame', 'Mocha', 'Houdini', 'Premiere Pro', 'Fusion'],
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
      'Combinamos técnicas tradicionais de animação com tecnologia de ponta para criar mundos visuais únicos. Nossa experiência abrange desde animação 2D frame-by-frame até modelagem 3D fotorrealista. Com mais de duas décadas criando animações, desenvolvemos um processo criativo que equilibra arte e técnica.',
      'Trabalhamos com pipelines completos de produção 3D (modelagem, rigging, animação, lighting, rendering) e motion graphics 2D sofisticados. Nossa equipe domina ferramentas como Blender, Maya, 3ds Max, After Effects e Unreal Engine, escolhendo a melhor tecnologia para cada projeto.',
      'Especializados em criar narrativas visuais para museus, marcas e conteúdos educacionais, onde cada frame conta uma história. Entendemos que animação é mais que movimento: é comunicação, emoção e storytelling. Por isso, cada projeto começa com desenvolvimento de conceito e roteiro, garantindo que a narrativa seja forte antes de qualquer produção técnica.',
      'Nossa abordagem em animação 2D combina técnicas tradicionais com ferramentas digitais modernas. Trabalhamos com Toon Boom Harmony para animação profissional, After Effects para motion graphics, e técnicas de frame-by-frame quando necessário. Cada estilo visual é cuidadosamente desenvolvido para transmitir a personalidade única de cada projeto.',
      'Em animação 3D, oferecemos serviços completos desde modelagem até renderização final. Criamos personagens e ambientes tridimensionais com atenção aos detalhes, utilizando texturização PBR, rigging avançado e animação que respira vida aos personagens. Nossos renders são otimizados para qualidade e eficiência, garantindo resultados fotorrealistas quando necessário.',
      'Desenvolvemos animações interativas para experiências imersivas, integrando animação com engines de games como Unity e Unreal. Isso permite criar experiências onde o usuário interage com personagens e mundos animados em tempo real, abrindo possibilidades infinitas para projetos de realidade virtual, aumentada e web.',
      'Nossa expertise inclui animação de personagens com personalidade, onde cada movimento comunica emoção e intenção. Trabalhamos com princípios clássicos de animação (anticipation, squash & stretch, timing) combinados com técnicas modernas de motion capture e animação procedural quando apropriado.',
      'Para projetos educacionais, criamos animações que simplificam conceitos complexos através de visualizações claras e narrativas envolventes. Desenvolvemos personagens didáticos, infográficos animados e explicações visuais que facilitam aprendizado e aumentam retenção de informação.',
      'Oferecemos serviços completos de produção, incluindo desenvolvimento de roteiro, storyboard, animatic, animação, compositing e finalização. Trabalhamos com prazos realistas e entregas progressivas, garantindo que o cliente acompanhe cada etapa do processo criativo e possa fazer ajustes quando necessário.'
    ],
    longDescEn: [
      'We combine traditional animation techniques with cutting-edge technology to create unique visual worlds. Our experience ranges from 2D frame-by-frame animation to photorealistic 3D modeling. With over two decades creating animations, we have developed a creative process that balances art and technique.',
      'We work with complete 3D production pipelines (modeling, rigging, animation, lighting, rendering) and sophisticated 2D motion graphics. Our team masters tools like Blender, Maya, 3ds Max, After Effects and Unreal Engine, choosing the best technology for each project.',
      'Specialized in creating visual narratives for museums, brands and educational content, where every frame tells a story. We understand that animation is more than movement: it\'s communication, emotion and storytelling. That\'s why each project starts with concept and script development, ensuring narrative is strong before any technical production.',
      'Our 2D animation approach combines traditional techniques with modern digital tools. We work with Toon Boom Harmony for professional animation, After Effects for motion graphics, and frame-by-frame techniques when needed. Each visual style is carefully developed to convey the unique personality of each project.',
      'In 3D animation, we offer complete services from modeling to final rendering. We create three-dimensional characters and environments with attention to detail, using PBR texturing, advanced rigging and animation that breathes life into characters. Our renders are optimized for quality and efficiency, ensuring photorealistic results when needed.',
      'We develop interactive animations for immersive experiences, integrating animation with game engines like Unity and Unreal. This allows creating experiences where users interact with animated characters and worlds in real time, opening infinite possibilities for virtual, augmented and web reality projects.',
      'Our expertise includes character animation with personality, where each movement communicates emotion and intention. We work with classic animation principles (anticipation, squash & stretch, timing) combined with modern motion capture and procedural animation techniques when appropriate.',
      'For educational projects, we create animations that simplify complex concepts through clear visualizations and engaging narratives. We develop didactic characters, animated infographics and visual explanations that facilitate learning and increase information retention.',
      'We offer complete production services, including script development, storyboard, animatic, animation, compositing and finishing. We work with realistic deadlines and progressive deliveries, ensuring the client follows each stage of the creative process and can make adjustments when necessary.'
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
      'Entrega qualquer resolução'
    ],
    deliverablesEn: [
      'Storyboard and animatic',
      '3D modeling and texturing',
      'Character rigging and animation',
      'Traditional and digital 2D animation',
      'Photorealistic lighting and rendering',
      '2D motion graphics',
      'Final compositing',
      'Delivery any resolution'
    ],
    deliverablesFr: [
      'Storyboard et animatique',
      'Modélisation 3D et texturation',
      'Rigging et animation de personnages',
      'Animation 2D traditionnelle et numérique',
      'Éclairage et rendu photoréaliste',
      'Motion graphics 2D',
      'Compositing final',
      'Livraison toute résolution'
    ],
    deliverablesEs: [
      'Storyboard y animatic',
      'Modelado 3D y texturizado',
      'Rigging y animación de personajes',
      'Animación 2D tradicional y digital',
      'Iluminación y renderizado fotorrealista',
      'Motion graphics 2D',
      'Compositing final',
      'Entrega cualquier resolución'
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
    technologies: ['Blender', '3ds Max', 'Maya', 'After Effects', 'Toon Boom', 'Unreal Engine', 'Runway ML', 'Pika Labs', 'Sora'],
    projectCategories: ['animation', '3d', 'motion-design', 'educational']
  },
  {
    id: '4',
    slug: 'xr-interatividade-web3',
    icon: '🌐',
    titlePt: 'XR, Interatividade & Web3',
    titleEn: 'XR, Interactivity & Web3',
    titleFr: 'XR, Interactivité & Web3',
    titleEs: 'XR, Interactividad & Web3',
    shortDescPt: 'Criamos experiências imersivas que conectam mundos físicos, digitais e blockchain. De VR/AR a metaverso, NFTs e instalações interativas com sensores. Pioneiros em XR desde 2015, curadores do festival Immerso XR e desenvolvedores Web3.',
    shortDescEn: 'We create immersive experiences connecting physical, digital and blockchain worlds. From VR/AR to metaverse, NFTs and interactive installations with sensors. XR pioneers since 2015, Immerso XR festival curators and Web3 developers.',
    shortDescFr: 'Nous créons des expériences immersives connectant mondes physiques, numériques et blockchain. De VR/AR au métavers, NFTs et installations interactives avec capteurs. Pionniers XR depuis 2015, curateurs festival Immerso XR et développeurs Web3.',
    shortDescEs: 'Creamos experiencias inmersivas que conectan mundos físicos, digitales y blockchain. De VR/AR a metaverso, NFTs e instalaciones interactivas con sensores. Pioneros XR desde 2015, curadores festival Immerso XR y desarrolladores Web3.',
    longDescPt: [
      'Pioneiros em XR no Brasil desde 2015, desenvolvemos experiências que vão de VR/AR a metaverso com economia crypto. Nossa expertise abrange realidades estendidas, instalações interativas com sensores (Kinect, Leap Motion, NFC), smart contracts (Solidity, NFTs) e mundos virtuais com blockchain integrado. Com mais de 8 anos de experiência, acumulamos conhecimento profundo sobre tecnologias imersivas e suas aplicações práticas.',
      'Como curadores do festival Immerso XR, testamos e validamos centenas de experiências imersivas, desenvolvendo profundo conhecimento sobre linguagem, UX espacial e storytelling. Combinamos isso com desenvolvimento Web3 para criar experiências onde assets digitais têm valor real (NFTs, tokens, DAOs). Essa combinação única de expertise em XR e blockchain nos posiciona como referência em experiências imersivas do futuro.',
      'Especializados em museus, exposições e branded experiences onde XR se encontra com Web3: NFT wearables em VR, play-to-earn games, metaverso com LAND tokenizado, ativações phygital (NFC + blockchain), e instalações interativas com wallet integration. Criamos pontes entre mundos físico e virtual, permitindo que usuários interajam com conteúdo digital de forma natural e intuitiva.',
      'Nossa abordagem em VR combina narrativa cinematográfica com interatividade. Desenvolvemos experiências 360° e 6DoF que transportam usuários para mundos virtuais imersivos. Trabalhamos com Unity e Unreal Engine, garantindo qualidade gráfica e performance otimizada em headsets como Meta Quest, HTC Vive e PlayStation VR2.',
      'Em AR, criamos experiências que sobrepõem conteúdo digital ao mundo real. Desenvolvemos apps mobile (iOS/Android) com ARKit e ARCore, além de soluções para headsets como HoloLens e Magic Leap. Nossa expertise inclui tracking preciso, reconhecimento de objetos e integração com sistemas existentes.',
      'WebXR é uma de nossas especialidades. Desenvolvemos experiências que funcionam diretamente no navegador, sem necessidade de apps ou instalações. Utilizamos Three.js, A-Frame e frameworks modernos para criar experiências acessíveis que funcionam em qualquer dispositivo com navegador compatível.',
      'Nossa expertise em Web3 inclui desenvolvimento de smart contracts (Solidity), integração com blockchains (Ethereum, Solana, Polygon), criação de NFTs, desenvolvimento de DAOs e integração de wallets. Criamos experiências onde propriedade digital é real e transferível, abrindo novas possibilidades para monetização e engajamento.',
      'Instalações interativas são parte fundamental de nossos projetos. Utilizamos sensores de movimento (Kinect, Leap Motion), NFC/RFID para ativações, sensores de presença e tecnologias de tracking para criar experiências que respondem naturalmente à presença e ações dos usuários.',
      'Oferecemos serviços completos desde conceito até deploy e manutenção. Trabalhamos com metodologias ágeis, entregas progressivas e testes extensivos para garantir que cada experiência funcione perfeitamente. Nossa equipe multidisciplinar inclui desenvolvedores, designers, artistas 3D e especialistas em blockchain.'
    ],
    longDescEn: [
      'XR pioneers in Brazil since 2015, we develop experiences ranging from VR/AR to metaverse with crypto economy. Our expertise spans extended realities, interactive installations with sensors (Kinect, Leap Motion, NFC), smart contracts (Solidity, NFTs) and virtual worlds with integrated blockchain.',
      'As curators of the Immerso XR festival, we test and validate hundreds of immersive experiences, developing deep knowledge about language, spatial UX and storytelling. We combine this with Web3 development to create experiences where digital assets have real value (NFTs, tokens, DAOs).',
      'Specialized in museums, exhibitions and branded experiences where XR meets Web3: NFT wearables in VR, play-to-earn games, metaverse with tokenized LAND, phygital activations (NFC + blockchain), and interactive installations with wallet integration.'
    ],
    longDescFr: [
      'Pionniers XR au Brésil depuis 2015, nous développons des expériences allant de VR/AR au métavers avec économie crypto. Notre expertise couvre réalités étendues, installations interactives avec capteurs (Kinect, Leap Motion, NFC), smart contracts (Solidity, NFTs) et mondes virtuels avec blockchain intégrée.',
      'En tant que curateurs du festival Immerso XR, nous testons et validons des centaines d\'expériences immersives, développant une connaissance approfondie du langage, de l\'UX spatial et du storytelling. Nous combinons cela avec développement Web3 pour créer des expériences où les actifs numériques ont une valeur réelle (NFTs, tokens, DAOs).',
      'Spécialisés dans musées, expositions et branded experiences où XR rencontre Web3: NFT wearables en VR, jeux play-to-earn, métavers avec LAND tokenisé, activations phygital (NFC + blockchain), et installations interactives avec intégration wallet.'
    ],
    longDescEs: [
      'Pioneros XR en Brasil desde 2015, desarrollamos experiencias que van de VR/AR a metaverso con economía crypto. Nuestra expertise abarca realidades extendidas, instalaciones interactivas con sensores (Kinect, Leap Motion, NFC), smart contracts (Solidity, NFTs) y mundos virtuales con blockchain integrado.',
      'Como curadores del festival Immerso XR, probamos y validamos cientos de experiencias inmersivas, desarrollando profundo conocimiento sobre lenguaje, UX espacial y storytelling. Combinamos esto con desarrollo Web3 para crear experiencias donde activos digitales tienen valor real (NFTs, tokens, DAOs).',
      'Especializados en museos, exposiciones y branded experiences donde XR se encuentra con Web3: NFT wearables en VR, juegos play-to-earn, metaverso con LAND tokenizado, activaciones phygital (NFC + blockchain), e instalaciones interactivas con integración wallet.'
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
    technologies: ['Unity', 'Unreal Engine', 'Meta Quest', 'HTC Vive', 'PSVR2', 'ARKit', 'ARCore', 'WebXR', 'Vuforia', '8th Wall', 'TouchDesigner', 'Notch', 'Resolume', 'Python', 'Processing', 'OpenFrameworks', 'Max/MSP', 'Kinect', 'Leap Motion', 'LiDAR', 'NFC Tags', 'Arduino', 'Raspberry Pi', 'OSC/MIDI/DMX', 'Insta360 X5', 'Insta360 Pro 2', 'Kandao Obsidian', 'Spatial Audio', 'Ambisonics', 'Solidity', 'Rust', 'Hardhat', 'Foundry', 'Remix', 'Ethereum', 'Solana', 'Polygon', 'BSC', 'MetaMask', 'WalletConnect', 'Web3.js', 'Ethers.js', 'Wagmi', 'Chainlink', 'IPFS', 'OpenZeppelin', 'ERC-721', 'ERC-1155', 'NFT.Storage', 'Decentraland SDK', 'The Sandbox', 'Unity Blockchain SDK', 'Unreal Web3', 'Moralis', 'Alchemy'],
    projectCategories: ['xr', 'vr', 'ar', 'interactive', 'immersive', 'web3', 'nft', 'metaverse', 'blockchain']
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
      'Especializados em design de experiências espaciais, criamos cenografias que fundem físico e digital. Nossa abordagem integra arquitetura, design gráfico, iluminação e projeções mapeadas. Com mais de duas décadas de experiência, desenvolvemos uma metodologia única que transforma espaços em narrativas visuais envolventes.',
      'Com experiência em museus como o Rio Museu Olímpico, desenvolvemos projetos que consideram fluxo de visitantes, acessibilidade, narrativa espacial e integração tecnológica. Entendemos que cada espaço conta uma história, e nossa missão é garantir que essa história seja comunicada de forma clara, impactante e memorável.',
      'Nosso processo colaborativo envolve arquitetos, designers, engenheiros e artistas visuais para garantir coerência estética e funcional. Trabalhamos como orquestradores de projetos complexos, coordenando múltiplas disciplinas para criar ambientes que funcionam tanto do ponto de vista técnico quanto emocional.',
      'Cenografia virtual é uma de nossas especialidades. Utilizamos ferramentas 3D (SketchUp, Rhino, 3ds Max, Revit) para criar visualizações realistas que permitem que clientes vejam e aprovem projetos antes da execução. Isso reduz riscos, otimiza custos e garante que o resultado final atenda exatamente às expectativas.',
      'Sinalética e wayfinding são fundamentais em nossos projetos. Desenvolvemos sistemas de navegação que guiam visitantes de forma intuitiva, utilizando design gráfico, tipografia e iconografia que comunicam claramente sem sobrecarregar visualmente. Cada sinal é pensado para ser funcional e esteticamente integrado ao ambiente.',
      'Design gráfico ambiental transforma espaços em experiências visuais coesas. Criamos identidades visuais que se estendem por todo o ambiente, desde painéis informativos até aplicações em pisos, paredes e tetos. Nossa expertise garante que cada elemento visual contribua para a narrativa geral do espaço.',
      'Projeção mapeada é uma ferramenta poderosa em nossos projetos. Utilizamos MadMapper, Resolume e outras ferramentas para criar projeções que se adaptam perfeitamente à arquitetura, transformando superfícies estáticas em telas dinâmicas que contam histórias e criam atmosferas imersivas.',
      'Iluminação é parte essencial de nossos projetos. Trabalhamos com designers de iluminação para criar ambientes que mudam conforme a hora do dia, o tipo de evento ou a narrativa que queremos comunicar. Utilizamos sistemas de iluminação inteligente que podem ser programados e controlados remotamente.',
      'Oferecemos acompanhamento completo desde concepção até implantação. Trabalhamos em parceria com construtoras, fornecedores e equipes técnicas para garantir que cada detalhe seja executado conforme planejado. Nossa experiência em gestão de projetos complexos nos permite antecipar desafios e resolver problemas antes que se tornem críticos.'
    ],
    longDescEn: [
      'Specialized in spatial experience design, we create scenographies that merge physical and digital. Our approach integrates architecture, graphic design, lighting and projection mapping. With over two decades of experience, we have developed a unique methodology that transforms spaces into engaging visual narratives.',
      'With experience in museums like the Rio Olympic Museum, we develop projects that consider visitor flow, accessibility, spatial narrative and technological integration. We understand that each space tells a story, and our mission is to ensure that story is communicated clearly, impactfully and memorably.',
      'Our collaborative process involves architects, designers, engineers and visual artists to ensure aesthetic and functional coherence. We work as orchestrators of complex projects, coordinating multiple disciplines to create environments that work both technically and emotionally.',
      'Virtual scenography is one of our specialties. We use 3D tools (SketchUp, Rhino, 3ds Max, Revit) to create realistic visualizations that allow clients to see and approve projects before execution. This reduces risks, optimizes costs and ensures the final result meets expectations exactly.',
      'Signage and wayfinding are fundamental in our projects. We develop navigation systems that guide visitors intuitively, using graphic design, typography and iconography that communicate clearly without visual overload. Each sign is designed to be functional and aesthetically integrated into the environment.',
      'Environmental graphic design transforms spaces into cohesive visual experiences. We create visual identities that extend throughout the environment, from informational panels to applications on floors, walls and ceilings. Our expertise ensures each visual element contributes to the overall narrative of the space.',
      'Projection mapping is a powerful tool in our projects. We use MadMapper, Resolume and other tools to create projections that adapt perfectly to architecture, transforming static surfaces into dynamic screens that tell stories and create immersive atmospheres.',
      'Lighting is an essential part of our projects. We work with lighting designers to create environments that change according to time of day, type of event or narrative we want to communicate. We use smart lighting systems that can be programmed and controlled remotely.',
      'We offer complete follow-up from conception to implementation. We work in partnership with construction companies, suppliers and technical teams to ensure every detail is executed as planned. Our experience in managing complex projects allows us to anticipate challenges and solve problems before they become critical.'
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
    technologies: ['SketchUp', 'Rhino', '3ds Max', 'AutoCAD', 'Revit', 'Adobe Creative Suite', 'V-Ray', 'Corona', 'Lumion', 'Enscape', 'MadMapper', 'Resolume'],
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
      'Especializados em game design para contextos não-comerciais, criamos jogos educacionais, instalações interativas e experiências gamificadas para museus e instituições culturais. Com mais de 15 anos desenvolvendo jogos sérios, acumulamos expertise única em criar experiências que educam enquanto divertem.',
      'Nossa abordagem combina mecânicas de jogo envolventes com objetivos educacionais ou de marca, sempre respeitando o público-alvo e o contexto de uso. Entendemos que jogos educacionais precisam ser tão envolventes quanto comerciais, mas com propósito claro de aprendizagem ou engajamento com conteúdo.',
      'Desenvolvemos em Unity e Unreal Engine, com deploy para múltiplas plataformas: touchscreens, web, mobile, consoles e instalações customizadas. Nossa expertise técnica garante que cada jogo funcione perfeitamente na plataforma escolhida, com performance otimizada e experiência de usuário fluida.',
      'Game design document (GDD) é o coração de nossos projetos. Desenvolvemos documentos detalhados que especificam mecânicas, narrativa, arte, som e tecnologia. Esse processo garante que todos os stakeholders entendam a visão do projeto antes de qualquer desenvolvimento, reduzindo retrabalhos e garantindo alinhamento.',
      'Prototipagem rápida é parte fundamental de nosso processo. Criamos versões jogáveis simples que testam mecânicas principais antes de investir em arte e desenvolvimento completo. Isso permite validar conceitos com usuários reais, garantindo que o jogo final seja envolvente e atenda objetivos educacionais ou de marca.',
      'Arte e animação são desenvolvidas com atenção aos detalhes. Trabalhamos com artistas 2D e 3D para criar visuais que comunicam a personalidade única de cada projeto. Seja estilo cartoon, realista ou abstrato, garantimos que a arte sirva à narrativa e aos objetivos do jogo.',
      'Sound design e música são essenciais para criar atmosfera e emoção. Desenvolvemos trilhas sonoras originais, efeitos sonoros customizados e integração de voz quando necessário. Cada elemento sonoro é cuidadosamente projetado para apoiar a narrativa e aumentar imersão.',
      'Integração com hardware customizado é uma de nossas especialidades. Trabalhamos com touchscreens, sensores de movimento, controles físicos customizados e sistemas de feedback háptico. Nossa experiência garante que hardware e software funcionem perfeitamente integrados, criando experiências únicas e memoráveis.',
      'Playtesting extensivo é parte de nosso processo. Testamos jogos com usuários reais em diferentes estágios de desenvolvimento, coletando feedback que informa iterações e melhorias. Isso garante que o jogo final seja intuitivo, envolvente e atenda objetivos educacionais ou de marca de forma eficaz.'
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
    technologies: ['Unity', 'Unreal Engine', 'Godot', 'Python', 'Blender', '3ds Max', 'Adobe Creative Suite', 'Substance Painter', 'WebGL', 'Arduino', 'Raspberry Pi', 'Kinect', 'Leap Motion', 'Touch Screens', 'PlayCanvas', 'Phaser'],
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
    technologies: ['Claude', 'ChatGPT', 'Gemini', 'Perplexity', 'Cursor', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Leonardo.ai', 'Runway ML', 'Pika Labs', 'Sora', 'DomoAI', 'Topaz', 'Magnific AI', 'Waifu2x', 'ComfyUI', 'Automatic1111', 'Notion AI', 'Google Workspace', 'Python'],
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
    technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Miro', 'FigJam', 'Frame.io', 'Notion', 'Slack', 'Asana', 'Monday.com', 'ClickUp', 'Trello', 'Google Workspace', 'Microsoft Teams', 'Zoom', 'Loom', 'Pitch', 'Canva'],
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
    technologies: ['Notion', 'Miro', 'FigJam', 'Google Workspace', 'Asana', 'Monday.com', 'ClickUp', 'Trello', 'Jira', 'Slack', 'Zoom', 'Mural', 'OKR Tools', 'Power BI', 'Tableau', 'Airtable'],
    projectCategories: ['consulting', 'strategy', 'funding', 'management']
  },
  // ========== NOVOS SERVIÇOS ==========
  {
    id: '10',
    slug: 'teatro-espetaculos-imersivos',
    icon: '🎭',
    titlePt: 'Teatro & Espetáculos Imersivos',
    titleEn: 'Theater & Immersive Shows',
    titleFr: 'Théâtre & Spectacles Immersifs',
    titleEs: 'Teatro & Espectáculos Inmersivos',
    shortDescPt: 'Criamos cenografias virtuais interativas para teatro e espetáculos ao vivo. Com animações geradas por IA, painéis LED sincronizados e compositing em tempo real, integramos atores com mundos virtuais em camadas visuais inovadoras.',
    shortDescEn: 'We create interactive virtual scenographies for theater and live shows. With AI-generated animations, synchronized LED panels and real-time compositing, we integrate actors with virtual worlds in innovative visual layers.',
    shortDescFr: 'Nous créons des scénographies virtuelles interactives pour théâtre et spectacles en direct. Avec des animations générées par IA, panneaux LED synchronisés et compositing en temps réel, nous intégrons acteurs avec mondes virtuels en couches visuelles innovantes.',
    shortDescEs: 'Creamos escenografías virtuales interactivas para teatro y espectáculos en vivo. Con animaciones generadas por IA, paneles LED sincronizados y compositing en tiempo real, integramos actores con mundos virtuales en capas visuales innovadoras.',
    longDescPt: [
      'Desenvolvemos tecnologia e conteúdo para espetáculos teatrais imersivos, integrando atores ao vivo com animações e mundos virtuais. Nossa expertise em compositing, painéis LED e IA generativa permite criar cenografias dinâmicas que respondem à narrativa.',
      'No espetáculo "Fala Sério, Mãe!" (estreia 2026), criamos animações de fundo geradas por IA que interagem com os atores em camadas visuais, onde personagens "saem" dos painéis LED, criando uma experiência híbrida entre teatro tradicional e narrativa digital.',
      'Oferecemos desde o conceito visual até a operação ao vivo, garantindo sincronização perfeita entre atores, luz, som e projeções. Essa é a nova fronteira do teatro: onde IA, motion design e interatividade se encontram.'
    ],
    longDescEn: [
      'We develop technology and content for immersive theatrical shows, integrating live actors with animations and virtual worlds. Our expertise in compositing, LED panels and generative AI enables creating dynamic scenographies that respond to the narrative.',
      'In the show "Fala Sério, Mãe!" (premiere 2026), we create AI-generated background animations that interact with actors in visual layers, where characters "emerge" from LED panels, creating a hybrid experience between traditional theater and digital narrative.',
      'We offer everything from visual concept to live operation, ensuring perfect synchronization between actors, lights, sound and projections. This is the new frontier of theater: where AI, motion design and interactivity meet.'
    ],
    longDescFr: [
      'Nous développons technologie et contenu pour spectacles théâtraux immersifs, intégrant acteurs en direct avec animations et mondes virtuels. Notre expertise en compositing, panneaux LED et IA générative permet de créer des scénographies dynamiques qui répondent au récit.',
      'Dans le spectacle "Fala Sério, Mãe!" (première 2026), nous créons des animations de fond générées par IA qui interagissent avec les acteurs en couches visuelles, où les personnages "sortent" des panneaux LED, créant une expérience hybride entre théâtre traditionnel et récit numérique.',
      'Nous offrons du concept visuel à l\'opération en direct, garantissant une synchronisation parfaite entre acteurs, lumières, son et projections. C\'est la nouvelle frontière du théâtre : où IA, motion design et interactivité se rencontrent.'
    ],
    longDescEs: [
      'Desarrollamos tecnología y contenido para espectáculos teatrales inmersivos, integrando actores en vivo con animaciones y mundos virtuales. Nuestra expertise en compositing, paneles LED e IA generativa permite crear escenografías dinámicas que responden a la narrativa.',
      'En el espectáculo "Fala Sério, Mãe!" (estreno 2026), creamos animaciones de fondo generadas por IA que interactúan con los actores en capas visuales, donde personajes "salen" de los paneles LED, creando una experiencia híbrida entre teatro tradicional y narrativa digital.',
      'Ofrecemos desde el concepto visual hasta la operación en vivo, garantizando sincronización perfecta entre actores, luz, sonido y proyecciones. Esta es la nueva frontera del teatro: donde IA, motion design e interactividad se encuentran.'
    ],
    deliverablesPt: [
      'Conceito visual e storyboard',
      'Animações para painéis LED (geradas por IA)',
      'Conteúdo generativo (backgrounds, efeitos)',
      'Compositing em tempo real',
      'Programação de cenas sincronizadas',
      'Operação técnica ao vivo',
      'Treinamento de equipe técnica',
      'Sistema de backup e redundância'
    ],
    deliverablesEn: [
      'Visual concept and storyboard',
      'LED panel animations (AI-generated)',
      'Generative content (backgrounds, effects)',
      'Real-time compositing',
      'Synchronized scene programming',
      'Live technical operation',
      'Technical team training',
      'Backup and redundancy system'
    ],
    deliverablesFr: [
      'Concept visuel et storyboard',
      'Animations pour panneaux LED (générées par IA)',
      'Contenu génératif (arrière-plans, effets)',
      'Compositing en temps réel',
      'Programmation de scènes synchronisées',
      'Opération technique en direct',
      'Formation équipe technique',
      'Système de sauvegarde et redondance'
    ],
    deliverablesEs: [
      'Concepto visual y storyboard',
      'Animaciones para paneles LED (generadas por IA)',
      'Contenido generativo (fondos, efectos)',
      'Compositing en tiempo real',
      'Programación de escenas sincronizadas',
      'Operación técnica en vivo',
      'Capacitación equipo técnico',
      'Sistema de respaldo y redundancia'
    ],
    processPt: [
      'Leitura do roteiro e conceito',
      'Design visual e animatic',
      'Geração de assets (IA + manual)',
      'Programação e sincronização',
      'Testes técnicos e ensaios',
      'Operação durante temporada'
    ],
    processEn: [
      'Script reading and concept',
      'Visual design and animatic',
      'Asset generation (AI + manual)',
      'Programming and synchronization',
      'Technical tests and rehearsals',
      'Operation during season'
    ],
    processFr: [
      'Lecture du scénario et concept',
      'Design visuel et animatique',
      'Génération d\'assets (IA + manuel)',
      'Programmation et synchronisation',
      'Tests techniques et répétitions',
      'Opération pendant saison'
    ],
    processEs: [
      'Lectura del guion y concepto',
      'Diseño visual y animatic',
      'Generación de assets (IA + manual)',
      'Programación y sincronización',
      'Pruebas técnicas y ensayos',
      'Operación durante temporada'
    ],
    technologies: ['Notch', 'TouchDesigner', 'Resolume', 'D3', 'Disguise', 'QLab', 'Ableton Live', 'Reaper', 'Adobe After Effects', 'Adobe Premiere', 'Adobe Photoshop', 'Adobe Illustrator', 'Blender', '3ds Max', 'Cinema 4D', 'Houdini', 'Python', 'Processing', 'Max/MSP', 'vvvv', 'Runway ML', 'Pika Labs', 'Sora', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'ComfyUI', 'LED Panels (ROE, Absen, Unilumin)', 'Timecode Sync', 'DMX/ArtNet', 'OSC Protocol', 'MIDI'],
    projectCategories: ['theater', 'live-events', 'led-screens', 'ai-content', 'motion-design', 'interactive']
  },
  {
    id: '11',
    slug: 'branded-experiences-ativacoes',
    icon: '🎯',
    titlePt: 'Branded Experiences & Ativações',
    titleEn: 'Branded Experiences & Activations',
    titleFr: 'Expériences de Marque & Activations',
    titleEs: 'Branded Experiences & Activaciones',
    shortDescPt: 'Criamos experiências imersivas para marcas aumentarem engajamento e vendas. Do filme 360° do Flamengo distribuído em lojas a estandes com VR em shoppings, integramos tecnologia e narrativa para ativações que convertem.',
    shortDescEn: 'We create immersive experiences for brands to increase engagement and sales. From Flamengo\'s 360° film distributed in stores to VR stands in malls, we integrate technology and narrative for activations that convert.',
    shortDescFr: 'Nous créons des expériences immersives pour que les marques augmentent engagement et ventes. Du film 360° de Flamengo distribué en magasins aux stands VR en centres commerciaux, nous intégrons technologie et récit pour activations qui convertissent.',
    shortDescEs: 'Creamos experiencias inmersivas para marcas aumentar engagement y ventas. De la película 360° del Flamengo distribuida en tiendas a estands con VR en shoppings, integramos tecnología y narrativa para activaciones que convierten.',
    longDescPt: [
      'Desenvolvemos ativações de marca que vão além do tradicional. Usando VR, AR e conteúdo imersivo, criamos experiências memoráveis em pontos de venda, eventos e ações de marketing que geram engajamento real e aumentam vendas.',
      'Nossa abordagem integra produção de conteúdo (filmes 360°, experiências interativas) com fornecimento de tecnologia (aluguel de equipamentos VR) e mensuração de resultados, garantindo ROI para marcas.',
      'Do Flamengo 360 (distribuído em lojas para aumentar vendas) a estandes experienciais em shoppings (Cenna Tower), criamos branded content que emociona e converte. Oferecemos desde o conceito até operação em campo e analytics.'
    ],
    longDescEn: [
      'We develop brand activations that go beyond traditional. Using VR, AR and immersive content, we create memorable experiences at points of sale, events and marketing actions that generate real engagement and increase sales.',
      'Our approach integrates content production (360° films, interactive experiences) with technology supply (VR equipment rental) and results measurement, ensuring ROI for brands.',
      'From Flamengo 360 (distributed in stores to increase sales) to experiential stands in malls (Cenna Tower), we create branded content that moves and converts. We offer everything from concept to field operation and analytics.'
    ],
    longDescFr: [
      'Nous développons des activations de marque qui vont au-delà du traditionnel. Utilisant VR, AR et contenu immersif, nous créons des expériences mémorables en points de vente, événements et actions marketing qui génèrent engagement réel et augmentent ventes.',
      'Notre approche intègre production de contenu (films 360°, expériences interactives) avec fourniture de technologie (location équipements VR) et mesure de résultats, garantissant ROI pour marques.',
      'Du Flamengo 360 (distribué en magasins pour augmenter ventes) aux stands expérientiels en centres commerciaux (Cenna Tower), nous créons branded content qui émeut et convertit. Nous offrons du concept à opération terrain et analytics.'
    ],
    longDescEs: [
      'Desarrollamos activaciones de marca que van más allá de lo tradicional. Usando VR, AR y contenido inmersivo, creamos experiencias memorables en puntos de venta, eventos y acciones de marketing que generan engagement real y aumentan ventas.',
      'Nuestro enfoque integra producción de contenido (películas 360°, experiencias interactivas) con suministro de tecnología (alquiler de equipos VR) y medición de resultados, garantizando ROI para marcas.',
      'Del Flamengo 360 (distribuido en tiendas para aumentar ventas) a estands experienciales en shoppings (Cenna Tower), creamos branded content que emociona y convierte. Ofrecemos desde concepto hasta operación en campo y analytics.'
    ],
    deliverablesPt: [
      'Filmes 360°/VR branded',
      'Estandes experienciais com VR/AR',
      'Ativações de marca em pontos de venda',
      'Aluguel de equipamentos VR + conteúdo customizado',
      'Operação e suporte em campo',
      'Treinamento de promotores',
      'Dashboards de analytics e mensuração',
      'Relatórios de performance (leads, vendas, engajamento)'
    ],
    deliverablesEn: [
      'Branded 360°/VR films',
      'Experiential stands with VR/AR',
      'Brand activations at points of sale',
      'VR equipment rental + custom content',
      'Operation and field support',
      'Promoter training',
      'Analytics and measurement dashboards',
      'Performance reports (leads, sales, engagement)'
    ],
    deliverablesFr: [
      'Films 360°/VR de marque',
      'Stands expérientiels avec VR/AR',
      'Activations de marque en points de vente',
      'Location équipements VR + contenu personnalisé',
      'Opération et support terrain',
      'Formation promoteurs',
      'Tableaux de bord analytics et mesure',
      'Rapports performance (leads, ventes, engagement)'
    ],
    deliverablesEs: [
      'Películas 360°/VR branded',
      'Estands experienciales con VR/AR',
      'Activaciones de marca en puntos de venta',
      'Alquiler de equipos VR + contenido customizado',
      'Operación y soporte en campo',
      'Capacitación de promotores',
      'Dashboards de analytics y medición',
      'Informes de performance (leads, ventas, engagement)'
    ],
    processPt: [
      'Briefing e objetivos de negócio',
      'Conceito criativo + narrativa',
      'Produção de conteúdo imersivo',
      'Planejamento de ativação',
      'Deploy em pontos de venda',
      'Operação e suporte',
      'Mensuração e otimização'
    ],
    processEn: [
      'Briefing and business objectives',
      'Creative concept + narrative',
      'Immersive content production',
      'Activation planning',
      'Point of sale deploy',
      'Operation and support',
      'Measurement and optimization'
    ],
    processFr: [
      'Briefing et objectifs business',
      'Concept créatif + récit',
      'Production contenu immersif',
      'Planification activation',
      'Déploiement points de vente',
      'Opération et support',
      'Mesure et optimisation'
    ],
    processEs: [
      'Briefing y objetivos de negocio',
      'Concepto creativo + narrativa',
      'Producción contenido inmersivo',
      'Planificación de activación',
      'Deploy en puntos de venta',
      'Operación y soporte',
      'Medición y optimización'
    ],
    technologies: ['Meta Quest 2/3', 'Câmeras 360° (Insta360)', 'Google Analytics', 'WebXR', 'Unity', 'Mixpanel'],
    projectCategories: ['branded', 'activation', 'vr-360', 'retail', 'marketing', 'experiential']
  },
  {
    id: '12',
    slug: 'museus-exposicoes',
    icon: '🏛️',
    titlePt: 'Museus & Exposições',
    titleEn: 'Museums & Exhibitions',
    titleFr: 'Musées & Expositions',
    titleEs: 'Museos & Exposiciones',
    shortDescPt: 'Projetamos experiências museológicas completas integrando cenografia, tecnologia e audiovisual. Do Rio Museu Olímpico ao First Nation Museum (Canadá), nossa expertise transforma espaços em narrativas vivas.',
    shortDescEn: 'We design complete museological experiences integrating scenography, technology and audiovisual. From Rio Olympic Museum to First Nation Museum (Canada), our expertise transforms spaces into living narratives.',
    shortDescFr: 'Nous concevons des expériences muséologiques complètes intégrant scénographie, technologie et audiovisuel. Du Musée Olympique de Rio au Musée First Nation (Canada), notre expertise transforme espaces en récits vivants.',
    shortDescEs: 'Proyectamos experiencias museológicas completas integrando escenografía, tecnología y audiovisual. Del Museo Olímpico de Río al First Nation Museum (Canadá), nuestra expertise transforma espacios en narrativas vivas.',
    longDescPt: [
      'Com 22 meses de direção geral e tecnológica no Rio Museu Olímpico, desenvolvemos expertise única em projetos museológicos complexos: desde direção de arte até integração de sistemas interativos, audiovisual e cenografia. Essa experiência nos posicionou como referência em museus que combinam narrativa histórica com tecnologia imersiva.',
      'Nossa abordagem end-to-end integra pesquisa curatorial, design de experiência, produção audiovisual, desenvolvimento de interativos e coordenação de múltiplas empresas de tecnologia. Trabalhamos como orquestradores de projetos complexos, garantindo que todas as peças se encaixem perfeitamente para criar experiências coesas e impactantes.',
      'Especializados em museus que combinam patrimônio cultural com tecnologia de ponta, criamos experiências educacionais que emocionam e permanecem na memória. Entendemos que museus modernos precisam equilibrar respeito ao patrimônio com inovação tecnológica, criando pontes entre passado e futuro.',
      'Nossa metodologia começa com pesquisa curatorial profunda. Trabalhamos em parceria com historiadores, curadores e especialistas para garantir precisão histórica e narrativa autêntica. Essa base sólida permite que a tecnologia amplifique a mensagem, não a substitua.',
      'Desenvolvemos instalações interativas que transformam visitantes em participantes ativos da narrativa. Utilizamos sensores de movimento, telas touch, realidade aumentada e virtual para criar experiências imersivas que permitem exploração personalizada do conteúdo expositivo.',
      'Nossa produção audiovisual para museus inclui documentários, entrevistas com especialistas, reconstituições históricas e filmes imersivos 360°. Cada peça é desenvolvida com rigor técnico e sensibilidade narrativa, garantindo que o conteúdo histórico seja apresentado de forma envolvente e acessível.',
      'Cenografia é parte fundamental de nossos projetos museológicos. Criamos ambientes que transportam visitantes para diferentes épocas e contextos, utilizando projeção mapeada, iluminação inteligente e design espacial que guia a jornada do visitante de forma intuitiva e emocional.',
      'Acessibilidade é prioridade em todos nossos projetos. Desenvolvemos soluções inclusivas: legendas, audiodescrição, versões em LIBRAS, interfaces adaptáveis e percursos alternativos. Acreditamos que tecnologia imersiva deve ser acessível para todos, independente de limitações físicas ou sensoriais.',
      'Oferecemos gestão completa de implantação, coordenando múltiplas empresas, gerenciando prazos e orçamentos, e garantindo que a abertura aconteça conforme planejado. Nossa experiência em projetos de grande escala nos permite antecipar desafios e resolver problemas antes que se tornem críticos.'
    ],
    longDescEn: [
      'With 22 months of general and technology direction at Rio Olympic Museum, we developed unique expertise in complex museological projects: from art direction to integration of interactive systems, audiovisual and scenography.',
      'Our end-to-end approach integrates curatorial research, experience design, audiovisual production, interactive development and coordination of multiple technology companies.',
      'Specialized in museums that combine cultural heritage with cutting-edge technology, we create educational experiences that move and remain in memory.'
    ],
    longDescFr: [
      'Avec 22 mois de direction générale et technologique au Musée Olympique de Rio, nous avons développé une expertise unique en projets muséologiques complexes: de direction artistique à intégration de systèmes interactifs, audiovisuel et scénographie.',
      'Notre approche end-to-end intègre recherche curatoriale, design d\'expérience, production audiovisuelle, développement d\'interactifs et coordination de multiples entreprises technologiques.',
      'Spécialisés en musées qui combinent patrimoine culturel avec technologie de pointe, nous créons des expériences éducatives qui émeuvent et restent en mémoire.'
    ],
    longDescEs: [
      'Con 22 meses de dirección general y tecnológica en el Museo Olímpico de Río, desarrollamos expertise única en proyectos museológicos complejos: desde dirección de arte hasta integración de sistemas interactivos, audiovisual y escenografía.',
      'Nuestro enfoque end-to-end integra investigación curatorial, diseño de experiencia, producción audiovisual, desarrollo de interactivos y coordinación de múltiples empresas de tecnología.',
      'Especializados en museos que combinan patrimonio cultural con tecnología de punta, creamos experiencias educacionales que emocionan y permanecen en la memoria.'
    ],
    deliverablesPt: [
      'Conceito museológico e curadoria',
      'Direção de arte e cenografia',
      'Produção audiovisual (entrevistas, documentários)',
      'Instalações interativas',
      'Capturas 360° de patrimônio',
      'Sinalética e wayfinding',
      'Integração de tecnologias',
      'Gestão de implantação'
    ],
    deliverablesEn: [
      'Museological concept and curation',
      'Art direction and scenography',
      'Audiovisual production (interviews, documentaries)',
      'Interactive installations',
      '360° heritage captures',
      'Signage and wayfinding',
      'Technology integration',
      'Implementation management'
    ],
    deliverablesFr: [
      'Concept muséologique et curation',
      'Direction artistique et scénographie',
      'Production audiovisuelle (interviews, documentaires)',
      'Installations interactives',
      'Captures 360° de patrimoine',
      'Signalétique et orientation',
      'Intégration de technologies',
      'Gestion de mise en œuvre'
    ],
    deliverablesEs: [
      'Concepto museológico y curaduría',
      'Dirección de arte y escenografía',
      'Producción audiovisual (entrevistas, documentales)',
      'Instalaciones interactivas',
      'Capturas 360° de patrimonio',
      'Señalética y orientación',
      'Integración de tecnologías',
      'Gestión de implementación'
    ],
    processPt: [
      'Pesquisa e curadoria',
      'Conceito e master plan',
      'Direção de arte e cenografia',
      'Produção de conteúdos',
      'Desenvolvimento de interativos',
      'Implantação e abertura'
    ],
    processEn: [
      'Research and curation',
      'Concept and master plan',
      'Art direction and scenography',
      'Content production',
      'Interactive development',
      'Implementation and opening'
    ],
    processFr: [
      'Recherche et curation',
      'Concept et master plan',
      'Direction artistique et scénographie',
      'Production de contenus',
      'Développement d\'interactifs',
      'Mise en œuvre et ouverture'
    ],
    processEs: [
      'Investigación y curaduría',
      'Concepto y master plan',
      'Dirección de arte y escenografía',
      'Producción de contenidos',
      'Desarrollo de interactivos',
      'Implementación y apertura'
    ],
    technologies: ['Unity', 'Unreal Engine', 'TouchDesigner', 'Notch', 'Resolume', 'Adobe After Effects', 'Adobe Premiere', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'DaVinci Resolve', 'Blender', '3ds Max', 'Cinema 4D', 'SketchUp', 'Revit', 'AutoCAD', 'V-Ray', 'Corona', 'Enscape', 'Oculus Quest', 'HTC Vive', 'Insta360 X5', 'Insta360 Pro 2', 'DJI Drones', 'Câmeras DSLR/Mirrorless', 'Painéis LED', 'Projeção Mapeada', 'Telas Touch (Elo, Philips)', 'Sensores (Kinect, Leap Motion, LiDAR)', 'QR Code', 'RFID/NFC', 'Beacons BLE', 'Web Apps PWA', 'Arduíno', 'Raspberry Pi', 'OSC/MIDI/DMX', 'Servidores (Dell, HP)', 'Networking (Ubiquiti, Cisco)', 'UPS/NoBreak', 'Sistemas Áudio (QSC, Bose)', 'Acessibilidade (Libras, Audiodescrição)', 'CMS Acervo (PastPerfect, TMS)', 'Runway ML', 'Pika Labs', 'Sora', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Topaz', 'Magnific AI', 'Claude', 'ChatGPT', 'Gemini', 'Perplexity', 'Stock Media (Shutterstock, Getty, Envato)', 'Notion', 'Asana', 'Monday.com', 'Trello', 'ClickUp', 'Slack', 'Miro', 'FigJam', 'Google Workspace', 'Microsoft Project', 'Roteirização (Final Draft, Celtx)', 'Pesquisa (Zotero, Mendeley)'],
    projectCategories: ['museum', 'exhibition', 'cultural', 'heritage']
  },
  {
    id: '13',
    slug: 'festivais-curadoria-eventos',
    icon: '🎪',
    titlePt: 'Festivais, Curadoria & Eventos',
    titleEn: 'Festivals, Curation & Events',
    titleFr: 'Festivals, Curation & Événements',
    titleEs: 'Festivales, Curaduría & Eventos',
    shortDescPt: 'Organizamos e curamos festivais de cinema imersivo (Immerso XR, Gramado VR, Petrópolis). Nossa experiência em curadoria e logística de eventos permite criar experiências culturais de alto impacto.',
    shortDescEn: 'We organize and curate immersive cinema festivals (Immerso XR, Gramado VR, Petrópolis). Our experience in curation and event logistics allows creating high-impact cultural experiences.',
    shortDescFr: 'Nous organisons et curons des festivals de cinéma immersif (Immerso XR, Gramado VR, Petrópolis). Notre expérience en curation et logistique d\'événements permet de créer des expériences culturelles à fort impact.',
    shortDescEs: 'Organizamos y curamos festivales de cine inmersivo (Immerso XR, Gramado VR, Petrópolis). Nuestra experiencia en curaduría y logística de eventos permite crear experiencias culturales de alto impacto.',
    longDescPt: [
      'Como curadores do Immerso XR e realizadores de mostras VR em festivais como Gramado e Petrópolis, desenvolvemos profundo conhecimento em curadoria de conteúdos imersivos e organização de eventos culturais.',
      'Oferecemos desde a curadoria de conteúdo até a execução completa: aluguel de equipamentos VR, montagem de espaços, operação técnica, formação de equipes e documentação.',
      'Nossa rede internacional de parceiros permite acesso a conteúdos exclusivos e expertise em transformar festivais em experiências memoráveis.'
    ],
    longDescEn: [
      'As curators of Immerso XR and organizers of VR showcases at festivals like Gramado and Petrópolis, we developed deep knowledge in immersive content curation and cultural event organization.',
      'We offer from content curation to complete execution: VR equipment rental, space setup, technical operation, team training and documentation.',
      'Our international partner network allows access to exclusive content and expertise in transforming festivals into memorable experiences.'
    ],
    longDescFr: [
      'En tant que curateurs d\'Immerso XR et organisateurs de vitrines VR dans des festivals comme Gramado et Petrópolis, nous avons développé une connaissance approfondie en curation de contenus immersifs et organisation d\'événements culturels.',
      'Nous offrons de la curation de contenu à l\'exécution complète: location équipements VR, montage d\'espaces, opération technique, formation d\'équipes et documentation.',
      'Notre réseau international de partenaires permet accès à contenus exclusifs et expertise en transformation de festivals en expériences mémorables.'
    ],
    longDescEs: [
      'Como curadores de Immerso XR y organizadores de muestras VR en festivales como Gramado y Petrópolis, desarrollamos profundo conocimiento en curaduría de contenidos inmersivos y organización de eventos culturales.',
      'Ofrecemos desde la curaduría de contenido hasta la ejecución completa: alquiler de equipos VR, montaje de espacios, operación técnica, formación de equipos y documentación.',
      'Nuestra red internacional de partners permite acceso a contenidos exclusivos y expertise en transformar festivales en experiencias memorables.'
    ],
    deliverablesPt: [
      'Curadoria de conteúdo',
      'Aluguel de equipamentos VR (Meta Quest, PSVR2)',
      'Montagem e cenografia de espaços',
      'Operação técnica durante evento',
      'Formação de equipe',
      'Gestão de logística',
      'Documentação e cobertura',
      'Relatórios pós-evento'
    ],
    deliverablesEn: [
      'Content curation',
      'VR equipment rental (Meta Quest, PSVR2)',
      'Space setup and scenography',
      'Technical operation during event',
      'Team training',
      'Logistics management',
      'Documentation and coverage',
      'Post-event reports'
    ],
    deliverablesFr: [
      'Curation de contenu',
      'Location équipements VR (Meta Quest, PSVR2)',
      'Montage et scénographie d\'espaces',
      'Opération technique pendant événement',
      'Formation d\'équipe',
      'Gestion logistique',
      'Documentation et couverture',
      'Rapports post-événement'
    ],
    deliverablesEs: [
      'Curaduría de contenido',
      'Alquiler de equipos VR (Meta Quest, PSVR2)',
      'Montaje y escenografía de espacios',
      'Operación técnica durante evento',
      'Formación de equipo',
      'Gestión de logística',
      'Documentación y cobertura',
      'Informes post-evento'
    ],
    processPt: [
      'Definição de conceito e curadoria',
      'Planejamento logístico',
      'Preparação de equipamentos e espaço',
      'Execução e operação',
      'Documentação',
      'Relatório final'
    ],
    processEn: [
      'Concept definition and curation',
      'Logistics planning',
      'Equipment and space preparation',
      'Execution and operation',
      'Documentation',
      'Final report'
    ],
    processFr: [
      'Définition concept et curation',
      'Planification logistique',
      'Préparation équipements et espace',
      'Exécution et opération',
      'Documentation',
      'Rapport final'
    ],
    processEs: [
      'Definición concepto y curaduría',
      'Planificación logística',
      'Preparación equipos y espacio',
      'Ejecución y operación',
      'Documentación',
      'Informe final'
    ],
    technologies: ['Meta Quest', 'PSVR2', 'HTC Vive', 'Projeção', 'Som espacial', 'QR Code', 'Web Apps', 'Streaming (OBS, vMix)', 'Notion', 'Airtable', 'Eventbrite', 'Redes Sociais'],
    projectCategories: ['festival', 'curation', 'event', 'vr', 'culture']
  },
  {
    id: '14',
    slug: 'educacao-treinamento',
    icon: '🎓',
    titlePt: 'Educação & Treinamento',
    titleEn: 'Education & Training',
    titleFr: 'Éducation & Formation',
    titleEs: 'Educación & Capacitación',
    shortDescPt: 'Oferecemos workshops, minicursos e treinamentos em arte, tecnologia, IA, VR/XR, audiovisual, Web3 e marketing para novas mídias. Da iniciação à masterclass, formamos profissionais em tecnologias imersivas, IA generativa, blockchain, NFC e integração criativa de tecnologias emergentes.',
    shortDescEn: 'We offer workshops, short courses and training in art, technology, AI, VR/XR, audiovisual, Web3 and marketing for new media. From beginner to masterclass, we train professionals in immersive technologies, generative AI, blockchain, NFC and creative integration of emerging technologies.',
    shortDescFr: 'Nous offrons ateliers, mini-cours et formations en art, technologie, IA, VR/XR, audiovisuel, Web3 et marketing pour nouveaux médias. De l\'initiation à la masterclass, nous formons professionnels en technologies immersives, IA générative, blockchain, NFC et intégration créative de technologies émergentes.',
    shortDescEs: 'Ofrecemos talleres, minicursos y capacitaciones en arte, tecnología, IA, VR/XR, audiovisual, Web3 y marketing para nuevos medios. De iniciación a masterclass, formamos profesionales en tecnologías inmersivas, IA generativa, blockchain, NFC e integración creativa de tecnologías emergentes.',
    longDescPt: [
      'Capacitamos profissionais e equipes com workshops práticos e minicursos intensivos em tecnologias emergentes. Nossos treinamentos cobrem IA generativa (Midjourney, Runway, ChatGPT), VR/XR (Unity, Unreal), Web3/blockchain (NFTs, smart contracts), audiovisual imersivo (360°, drones), marketing digital para novas mídias e integração criativa de tecnologias (NFC, QR Code, sensores, IoT).',
      'Oferecemos desde iniciação para curiosos até masterclasses técnicas para profissionais. Todos os cursos incluem prática hands-on com equipamentos reais (Oculus, câmeras 360°, painéis LED) e certificado digital. Formatos: workshops (4h-8h), minicursos (3 dias), treinamentos corporativos customizados e programas de inovação para empresas.',
      'Nossa experiência inclui treinamentos corporativos, cursos de extensão e programas educacionais para museus e centros culturais.'
    ],
    longDescEn: [
      'Specialized in creating immersive educational experiences for educational institutions and companies. We use VR/AR, gamification and interactive narratives to increase engagement and knowledge retention.',
      'We offer from practical workshops to development of complete educational platforms, always focused on measurable results.',
      'Our experience includes corporate training, extension courses and educational programs for museums and cultural centers.'
    ],
    longDescFr: [
      'Spécialisés en création d\'expériences éducatives immersives pour institutions d\'enseignement et entreprises. Nous utilisons VR/AR, gamification et récits interactifs pour augmenter engagement et rétention de connaissances.',
      'Nous offrons des ateliers pratiques au développement de plateformes éducatives complètes, toujours focalisés sur résultats mesurables.',
      'Notre expérience inclut formations corporate, cours d\'extension et programmes éducatifs pour musées et centres culturels.'
    ],
    longDescEs: [
      'Especializados en crear experiencias educacionales inmersivas para instituciones de enseñanza y empresas. Usamos VR/AR, gamificación y narrativas interactivas para aumentar engagement y retención de conocimiento.',
      'Ofrecemos desde workshops prácticos hasta desarrollo de plataformas educacionales completas, siempre con foco en resultados medibles.',
      'Nuestra experiencia incluye capacitaciones corporativas, cursos de extensión y programas educacionales para museos y centros culturales.'
    ],
    deliverablesPt: [
      'Desenvolvimento de currículo',
      'Experiências VR/AR educacionais',
      'Jogos educacionais',
      'Workshops práticos',
      'Treinamentos corporativos',
      'Plataformas de e-learning',
      'Material didático',
      'Certificação e avaliação'
    ],
    deliverablesEn: [
      'Curriculum development',
      'Educational VR/AR experiences',
      'Educational games',
      'Practical workshops',
      'Corporate training',
      'E-learning platforms',
      'Didactic material',
      'Certification and evaluation'
    ],
    deliverablesFr: [
      'Développement de curriculum',
      'Expériences VR/AR éducatives',
      'Jeux éducatifs',
      'Ateliers pratiques',
      'Formations corporate',
      'Plateformes e-learning',
      'Matériel didactique',
      'Certification et évaluation'
    ],
    deliverablesEs: [
      'Desarrollo de curriculum',
      'Experiencias VR/AR educacionales',
      'Juegos educacionales',
      'Workshops prácticos',
      'Capacitaciones corporativas',
      'Plataformas de e-learning',
      'Material didáctico',
      'Certificación y evaluación'
    ],
    processPt: [
      'Análise de necessidades',
      'Desenvolvimento pedagógico',
      'Criação de conteúdos',
      'Testes piloto',
      'Implementação',
      'Avaliação e melhoria'
    ],
    processEn: [
      'Needs analysis',
      'Pedagogical development',
      'Content creation',
      'Pilot tests',
      'Implementation',
      'Evaluation and improvement'
    ],
    processFr: [
      'Analyse des besoins',
      'Développement pédagogique',
      'Création de contenus',
      'Tests pilotes',
      'Mise en œuvre',
      'Évaluation et amélioration'
    ],
    processEs: [
      'Análisis de necesidades',
      'Desarrollo pedagógico',
      'Creación de contenidos',
      'Pruebas piloto',
      'Implementación',
      'Evaluación y mejora'
    ],
    technologies: ['Meta Quest', 'HTC Vive', 'Unity', 'Unreal Engine', 'Midjourney', 'Runway ML', 'ChatGPT', 'Claude', 'Stable Diffusion', 'TouchDesigner', 'Resolume', 'Adobe Creative Suite', 'DaVinci Resolve', 'Insta360', 'DJI Drones', 'Solidity', 'MetaMask', 'Hardhat', 'NFC Tags', 'Arduino', 'Raspberry Pi', 'OBS Studio', 'Notion', 'Miro', 'Figma', 'Blender', '3ds Max', 'After Effects', 'Moodle', 'Google Classroom', 'Zoom', 'Discord', 'Kahoot', 'Mentimeter'],
    projectCategories: ['education', 'training', 'corporate', 'elearning']
  },
  {
    id: '15',
    slug: 'realidade-virtual-vr',
    icon: '🥽',
    titlePt: 'Realidade Virtual (VR)',
    titleEn: 'Virtual Reality (VR)',
    titleFr: 'Réalité Virtuelle (VR)',
    titleEs: 'Realidad Virtual (VR)',
    shortDescPt: 'Criamos experiências VR de alta qualidade: filmes 360°, experiências interativas 6DoF e instalações imersivas. Oferecemos também aluguel de equipamentos VR com conteúdo customizado para eventos e ativações.',
    shortDescEn: 'We create high-quality VR experiences: 360° films, interactive 6DoF experiences and immersive installations. We also offer VR equipment rental with custom content for events and activations.',
    shortDescFr: 'Nous créons des expériences VR de haute qualité: films 360°, expériences interactives 6DoF et installations immersives. Nous offrons aussi location équipements VR avec contenu personnalisé pour événements et activations.',
    shortDescEs: 'Creamos experiencias VR de alta calidad: películas 360°, experiencias interactivas 6DoF e instalaciones inmersivas. Ofrecemos también alquiler de equipos VR con contenido customizado para eventos y activaciones.',
    longDescPt: [
      'Pioneiros em VR no Brasil, desenvolvemos experiências que vão de filmes 360° cinematográficos a experiências interativas 6DoF (room-scale). Nossa curadoria no festival Immerso XR nos dá visão única sobre o que funciona em VR.',
      'Oferecemos também serviço completo de aluguel de equipamentos VR (Meta Quest, PSVR2) com conteúdo customizado, ideal para eventos, ativações de marca e experiências pontuais.',
      'Do Flamengo 360 distribuído em lojas ao Museu do Círio em VR, criamos experiências que emocionam e geram resultados.'
    ],
    longDescEn: [
      'Pioneers in VR in Brazil, we develop experiences ranging from cinematic 360° films to interactive 6DoF (room-scale) experiences. Our curation at Immerso XR festival gives us unique insight into what works in VR.',
      'We also offer complete VR equipment rental service (Meta Quest, PSVR2) with custom content, ideal for events, brand activations and one-time experiences.',
      'From Flamengo 360 distributed in stores to Museu do Círio in VR, we create experiences that move and generate results.'
    ],
    longDescFr: [
      'Pionniers en VR au Brésil, nous développons des expériences allant de films 360° cinématographiques à expériences interactives 6DoF (room-scale). Notre curation au festival Immerso XR nous donne une vision unique de ce qui fonctionne en VR.',
      'Nous offrons aussi service complet de location équipements VR (Meta Quest, PSVR2) avec contenu personnalisé, idéal pour événements, activations de marque et expériences ponctuelles.',
      'Du Flamengo 360 distribué en magasins au Museu do Círio en VR, nous créons des expériences qui émeuvent et génèrent résultats.'
    ],
    longDescEs: [
      'Pioneros en VR en Brasil, desarrollamos experiencias que van de películas 360° cinematográficas a experiencias interactivas 6DoF (room-scale). Nuestra curaduría en el festival Immerso XR nos da visión única sobre lo que funciona en VR.',
      'Ofrecemos también servicio completo de alquiler de equipos VR (Meta Quest, PSVR2) con contenido customizado, ideal para eventos, activaciones de marca y experiencias puntuales.',
      'Del Flamengo 360 distribuido en tiendas al Museu do Círio en VR, creamos experiencias que emocionan y generan resultados.'
    ],
    deliverablesPt: [
      'Filmes VR 360° / 180° / 3DoF',
      'Experiências VR 6DoF (room-scale)',
      'Instalações VR multiplayer',
      'Aluguel de equipamentos + conteúdo',
      'Captação 360° (Insta360, Kandao)',
      'Deploy para Meta Quest, PSVR2, Vive',
      'Operação técnica em eventos',
      'Suporte e treinamento'
    ],
    deliverablesEn: [
      'VR 360° / 180° / 3DoF films',
      '6DoF VR experiences (room-scale)',
      'Multiplayer VR installations',
      'Equipment rental + content',
      '360° capture (Insta360, Kandao)',
      'Deploy to Meta Quest, PSVR2, Vive',
      'Technical operation at events',
      'Support and training'
    ],
    deliverablesFr: [
      'Films VR 360° / 180° / 3DoF',
      'Expériences VR 6DoF (room-scale)',
      'Installations VR multijoueurs',
      'Location équipements + contenu',
      'Capture 360° (Insta360, Kandao)',
      'Déploiement Meta Quest, PSVR2, Vive',
      'Opération technique événements',
      'Support et formation'
    ],
    deliverablesEs: [
      'Películas VR 360° / 180° / 3DoF',
      'Experiencias VR 6DoF (room-scale)',
      'Instalaciones VR multiplayer',
      'Alquiler de equipos + contenido',
      'Captura 360° (Insta360, Kandao)',
      'Deploy para Meta Quest, PSVR2, Vive',
      'Operación técnica en eventos',
      'Soporte y capacitación'
    ],
    processPt: [
      'Conceito e narrativa',
      'Produção / Captação 360°',
      'Desenvolvimento (Unity/Unreal)',
      'Testes com usuários',
      'Otimização e deploy',
      'Operação e suporte'
    ],
    processEn: [
      'Concept and narrative',
      'Production / 360° capture',
      'Development (Unity/Unreal)',
      'User testing',
      'Optimization and deploy',
      'Operation and support'
    ],
    processFr: [
      'Concept et récit',
      'Production / Capture 360°',
      'Développement (Unity/Unreal)',
      'Tests utilisateurs',
      'Optimisation et déploiement',
      'Opération et support'
    ],
    processEs: [
      'Concepto y narrativa',
      'Producción / Captura 360°',
      'Desarrollo (Unity/Unreal)',
      'Pruebas con usuarios',
      'Optimización y deploy',
      'Operación y soporte'
    ],
    technologies: ['Meta Quest 2/3/Pro', 'PSVR2', 'HTC Vive', 'Insta360', 'Kandao Obsidian', 'Unity', 'Unreal Engine'],
    projectCategories: ['vr', 'vr-360', 'immersive', 'experiential']
  },
  {
    id: '16',
    slug: 'arquitetura-virtual-bim',
    icon: '🏗️',
    titlePt: 'Arquitetura Virtual & BIM',
    titleEn: 'Virtual Architecture & BIM',
    titleFr: 'Architecture Virtuelle & BIM',
    titleEs: 'Arquitectura Virtual & BIM',
    shortDescPt: 'Criamos maquetes virtuais, renders 3D e experiências BIM para arquitetura e construção. De estandes de venda (Cenna Tower) a visualizações 360° de empreendimentos, transformamos projetos em experiências imersivas.',
    shortDescEn: 'We create virtual models, 3D renders and BIM experiences for architecture and construction. From sales stands (Cenna Tower) to 360° visualizations of developments, we transform projects into immersive experiences.',
    shortDescFr: 'Nous créons des maquettes virtuelles, rendus 3D et expériences BIM pour architecture et construction. Des stands de vente (Cenna Tower) aux visualisations 360° de développements, nous transformons projets en expériences immersives.',
    shortDescEs: 'Creamos maquetas virtuales, renders 3D y experiencias BIM para arquitectura y construcción. De estands de venta (Cenna Tower) a visualizaciones 360° de emprendimientos, transformamos proyectos en experiencias inmersivas.',
    longDescPt: [
      'Especializados em visualização arquitetônica de alto impacto, criamos desde renders fotorrealistas até experiências VR/AR para venda de imóveis e apresentação de projetos.',
      'Trabalhamos com CAD, Revit, BIM e pipelines de render (V-Ray, Corona) para entregar visualizações que vendem. Nossa expertise inclui estandes comerciais interativos e experiências 360° de empreendimentos.',
      'Do conceito ao walkthrough virtual, ajudamos construtoras e incorporadoras a vender mais através de experiências visuais impactantes.'
    ],
    longDescEn: [
      'Specialized in high-impact architectural visualization, we create from photorealistic renders to VR/AR experiences for real estate sales and project presentation.',
      'We work with CAD, Revit, BIM and render pipelines (V-Ray, Corona) to deliver visualizations that sell. Our expertise includes interactive commercial stands and 360° experiences of developments.',
      'From concept to virtual walkthrough, we help builders and developers sell more through impactful visual experiences.'
    ],
    longDescFr: [
      'Spécialisés en visualisation architecturale à fort impact, nous créons des rendus photoréalistes aux expériences VR/AR pour vente immobilière et présentation de projets.',
      'Nous travaillons avec CAD, Revit, BIM et pipelines de rendu (V-Ray, Corona) pour livrer des visualisations qui vendent. Notre expertise inclut stands commerciaux interactifs et expériences 360° de développements.',
      'Du concept au walkthrough virtuel, nous aidons constructeurs et promoteurs à vendre plus à travers des expériences visuelles impactantes.'
    ],
    longDescEs: [
      'Especializados en visualización arquitectónica de alto impacto, creamos desde renders fotorrealistas hasta experiencias VR/AR para venta de inmuebles y presentación de proyectos.',
      'Trabajamos con CAD, Revit, BIM y pipelines de render (V-Ray, Corona) para entregar visualizaciones que venden. Nuestra expertise incluye estands comerciales interactivos y experiencias 360° de emprendimientos.',
      'Del concepto al walkthrough virtual, ayudamos constructoras y desarrolladores a vender más a través de experiencias visuales impactantes.'
    ],
    deliverablesPt: [
      'Renders 3D fotorrealistas',
      'Maquetes virtuais interativas',
      'Experiências VR de walkthrough',
      'Animações de arquitetura (flythroughs)',
      'Integração BIM',
      'Estandes comerciais interativos',
      'Visualizações 360°',
      'Material de marketing (plantas, cortes, vistas)'
    ],
    deliverablesEn: [
      'Photorealistic 3D renders',
      'Interactive virtual models',
      'VR walkthrough experiences',
      'Architecture animations (flythroughs)',
      'BIM integration',
      'Interactive commercial stands',
      '360° visualizations',
      'Marketing material (plans, sections, views)'
    ],
    deliverablesFr: [
      'Rendus 3D photoréalistes',
      'Maquettes virtuelles interactives',
      'Expériences VR de walkthrough',
      'Animations d\'architecture (flythroughs)',
      'Intégration BIM',
      'Stands commerciaux interactifs',
      'Visualisations 360°',
      'Matériel marketing (plans, coupes, vues)'
    ],
    deliverablesEs: [
      'Renders 3D fotorrealistas',
      'Maquetas virtuales interactivas',
      'Experiencias VR de walkthrough',
      'Animaciones de arquitectura (flythroughs)',
      'Integración BIM',
      'Estands comerciales interactivos',
      'Visualizaciones 360°',
      'Material de marketing (plantas, cortes, vistas)'
    ],
    processPt: [
      'Recebimento de projeto (CAD/Revit)',
      'Modelagem 3D',
      'Texturização e lighting',
      'Rendering',
      'Pós-produção',
      'Entrega (imagens, vídeos, VR)'
    ],
    processEn: [
      'Project receipt (CAD/Revit)',
      '3D modeling',
      'Texturing and lighting',
      'Rendering',
      'Post-production',
      'Delivery (images, videos, VR)'
    ],
    processFr: [
      'Réception projet (CAD/Revit)',
      'Modélisation 3D',
      'Texturation et éclairage',
      'Rendu',
      'Post-production',
      'Livraison (images, vidéos, VR)'
    ],
    processEs: [
      'Recepción proyecto (CAD/Revit)',
      'Modelado 3D',
      'Texturizado e iluminación',
      'Renderizado',
      'Posproducción',
      'Entrega (imágenes, videos, VR)'
    ],
    technologies: ['AutoCAD', 'Revit', 'SketchUp', '3ds Max', 'V-Ray', 'Corona', 'Unreal Engine', 'Twinmotion'],
    projectCategories: ['architecture', 'bim', 'real-estate', 'visualization']
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

