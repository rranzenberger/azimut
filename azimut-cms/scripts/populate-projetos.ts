/**
 * Script para popular APENAS PROJETOS (Cases/Portfolio)
 * Inclui tags e services necessários
 * Execução: npx tsx scripts/populate-projetos.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ═══════════════════════════════════════════════════════════════
// TAGS NECESSÁRIAS (criar se não existirem)
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
// PROJETOS/CASES
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
    descriptionPt: `Direção de Tecnologia e Audiovisual para o Museu Rio Olímpico, desenvolvendo conteúdos imersivos e sistema de sinalização digital integrado. Projeto incluiu instalações interativas, mapeamento de conteúdo em múltiplas superfícies e gestão técnica de toda a infraestrutura audiovisual do museu.`,
    descriptionEn: `Technology and Audiovisual Direction for the Rio Olympic Museum, developing immersive content and integrated digital wayfinding system. Project included interactive installations, multi-surface content mapping and technical management of all museum audiovisual infrastructure.`,
    descriptionEs: `Dirección de Tecnología y Audiovisual para el Museo Olímpico de Río, desarrollando contenidos inmersivos y sistema de señalización digital integrado. Proyecto incluyó instalaciones interactivas, mapeo de contenido en múltiples superficies y gestión técnica de toda la infraestructura audiovisual del museo.`,
    descriptionFr: `Direction Technologique et Audiovisuelle pour le Musée Olympique de Rio, développement de contenu immersif et système de signalisation numérique intégré. Le projet comprenait des installations interactives, cartographie de contenu multi-surfaces et gestion technique de toute l'infrastructure audiovisuelle du musée.`,
    year: 2024,
    location: 'Rio de Janeiro, BR',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 10,
    tags: ['museum', 'immersive', 'interactive', 'ux'],
    services: ['cinema-av', 'xr', 'animation', 'cad-revit'],
  },
  {
    slug: 'gramado-vr-ia',
    title: 'Gramado VR/IA',
    shortTitle: 'Gramado VR/IA',
    summaryPt: 'Curadoria oficial de VR e filmes produzidos por IA (2017–2025).',
    summaryEn: 'Official VR and AI film curation (2017–2025).',
    summaryEs: 'Curaduría oficial de VR y films creados con IA (2017–2025).',
    summaryFr: 'Curation officielle de VR et films produits par IA (2017–2025).',
    descriptionPt: `Curadoria oficial da mostra de Realidade Virtual e filmes produzidos por IA do Festival de Cinema de Gramado desde 2017. Selecionamos e apresentamos mais de 200 experiências imersivas de 40+ países, consolidando o festival como referência em cinema imersivo na América Latina.`,
    descriptionEn: `Official curation of the Virtual Reality and AI-produced films showcase at Gramado Film Festival since 2017. We selected and presented over 200 immersive experiences from 40+ countries, establishing the festival as a reference in immersive cinema in Latin America.`,
    descriptionEs: `Curaduría oficial de la muestra de Realidad Virtual y películas producidas por IA del Festival de Cine de Gramado desde 2017. Seleccionamos y presentamos más de 200 experiencias inmersivas de más de 40 países, consolidando el festival como referencia en cine inmersivo en América Latina.`,
    descriptionFr: `Curation officielle du programme de Réalité Virtuelle et films produits par IA au Festival de Cinéma de Gramado depuis 2017. Nous avons sélectionné et présenté plus de 200 expériences immersives de plus de 40 pays, établissant le festival comme référence en cinéma immersif en Amérique Latine.`,
    year: 2017,
    location: 'Gramado, BR',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 9,
    tags: ['festival', 'curation', 'ai', 'vr'],
    services: ['xr', 'education'],
  },
  {
    slug: 'natal-cultural',
    title: 'Natal Cultural (IA + animação)',
    shortTitle: 'Natal Cultural',
    summaryPt: 'Universo interativo com personagens animados via IA; pipeline 2D/3D, comp e direção de arte.',
    summaryEn: 'Interactive universe with AI-driven animated characters; 2D/3D pipeline, comp and art direction.',
    summaryEs: 'Universo interactivo con personajes animados por IA; pipeline 2D/3D, composición y dirección de arte.',
    summaryFr: 'Univers interactif avec personnages animés par IA; pipeline 2D/3D, comp et direction artistique.',
    descriptionPt: `Criação de universo narrativo interativo para evento cultural de Natal, utilizando IA generativa para animação de personagens. Desenvolvemos pipeline híbrido 2D/3D, composição e direção de arte completa para instalação urbana de grande escala.`,
    descriptionEn: `Creation of interactive narrative universe for Christmas cultural event, using generative AI for character animation. We developed hybrid 2D/3D pipeline, compositing and complete art direction for large-scale urban installation.`,
    descriptionEs: `Creación de universo narrativo interactivo para evento cultural de Navidad, utilizando IA generativa para animación de personajes. Desarrollamos pipeline híbrido 2D/3D, composición y dirección de arte completa para instalación urbana de gran escala.`,
    descriptionFr: `Création d'un univers narratif interactif pour événement culturel de Noël, utilisant l'IA générative pour l'animation de personnages. Nous avons développé un pipeline hybride 2D/3D, compositing et direction artistique complète pour installation urbaine à grande échelle.`,
    year: 2024,
    location: 'Rio Bonito, BR',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 8,
    tags: ['ai', 'animation', 'interactive', 'event'],
    services: ['animation', 'creative-ai', 'cinema-av'],
  },
  {
    slug: 'amazonias-possiveis',
    title: 'Amazônias Possíveis',
    shortTitle: 'Amazônias Possíveis',
    summaryPt: 'Filme híbrido IA/VR em desenvolvimento; narrativa amazônica com linguagem cinematográfica.',
    summaryEn: 'Hybrid AI/VR film in development; Amazonian narrative with cinematic language.',
    summaryEs: 'Film híbrido IA/VR en desarrollo; narrativa amazónica con lenguaje cinematográfico.',
    summaryFr: 'Film hybride IA/VR en développement; récit amazonien avec langage cinématographique.',
    descriptionPt: `Filme experimental em desenvolvimento explorando futuros possíveis para a Amazônia através de narrativas imersivas. Combinando IA generativa, VR e linguagem cinematográfica tradicional, o projeto investiga novas formas de storytelling espacial.`,
    descriptionEn: `Experimental film in development exploring possible futures for the Amazon through immersive narratives. Combining generative AI, VR and traditional cinematic language, the project investigates new forms of spatial storytelling.`,
    descriptionEs: `Película experimental en desarrollo explorando futuros posibles para la Amazonía a través de narrativas inmersivas. Combinando IA generativa, VR y lenguaje cinematográfico tradicional, el proyecto investiga nuevas formas de narrativa espacial.`,
    descriptionFr: `Film expérimental en développement explorant des futurs possibles pour l'Amazonie à travers des récits immersifs. Combinant IA générative, VR et langage cinématographique traditionnel, le projet enquête sur de nouvelles formes de narration spatiale.`,
    year: 2024,
    location: 'Brasil',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 7,
    tags: ['ai', 'vr', 'film', 'culture'],
    services: ['creative-ai', 'xr', 'cinema-av'],
  },
  {
    slug: 'van-gogh-la-fontaine',
    title: 'Expos Paisagens de Van Gogh / La Fontaine',
    shortTitle: 'Van Gogh / La Fontaine',
    summaryPt: 'Conteúdos imersivos e motion para IPs globais; direção de arte e animação.',
    summaryEn: 'Immersive content and motion for global IPs; art direction and animation.',
    summaryEs: 'Contenidos inmersivos y motion para IPs globales; dirección de arte y animación.',
    summaryFr: 'Contenu immersif et motion pour IPs mondiaux; direction artistique et animation.',
    descriptionPt: `Desenvolvimento de conteúdos imersivos e motion design para exposições de IPs globais (Van Gogh, La Fontaine). Direção de arte, animação 2D/3D e composição para instalações em múltiplas cidades internacionais.`,
    descriptionEn: `Development of immersive content and motion design for global IP exhibitions (Van Gogh, La Fontaine). Art direction, 2D/3D animation and compositing for installations across multiple international cities.`,
    descriptionEs: `Desarrollo de contenidos inmersivos y motion design para exposiciones de IPs globales (Van Gogh, La Fontaine). Dirección de arte, animación 2D/3D y composición para instalaciones en múltiples ciudades internacionales.`,
    descriptionFr: `Développement de contenu immersif et motion design pour expositions d'IPs mondiaux (Van Gogh, La Fontaine). Direction artistique, animation 2D/3D et compositing pour installations dans plusieurs villes internationales.`,
    year: 2023,
    location: 'Internacional',
    country: 'DEFAULT',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 6,
    tags: ['motion', 'immersive', 'ip', 'culture'],
    services: ['animation', 'cinema-av'],
  },
  {
    slug: 'senna-ativacoes',
    title: 'Senna (Tower/Interlagos)',
    shortTitle: 'Senna',
    summaryPt: 'Ativações audiovisuais e motion para experiências de marca.',
    summaryEn: 'Audiovisual activations and motion for brand experiences.',
    summaryEs: 'Activaciones audiovisuales y motion para experiencias de marca.',
    summaryFr: 'Activations audiovisuelles et motion pour expériences de marque.',
    descriptionPt: `Ativações audiovisuais para experiências de marca Senna (Torre Senna e Autódromo de Interlagos). Motion design, conteúdo imersivo e direção técnica para eventos de alto perfil.`,
    descriptionEn: `Audiovisual activations for Senna brand experiences (Senna Tower and Interlagos Circuit). Motion design, immersive content and technical direction for high-profile events.`,
    descriptionEs: `Activaciones audiovisuales para experiencias de marca Senna (Torre Senna y Autódromo de Interlagos). Motion design, contenido inmersivo y dirección técnica para eventos de alto perfil.`,
    descriptionFr: `Activations audiovisuelles pour expériences de marque Senna (Tour Senna et Circuit d'Interlagos). Motion design, contenu immersif et direction technique pour événements de haut niveau.`,
    year: 2023,
    location: 'Brasil',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 5,
    tags: ['brand', 'motion', 'event'],
    services: ['cinema-av', 'animation'],
  },
  {
    slug: 'vr-amazonia',
    title: 'VR Amazônia (Rio Madeira / Círio)',
    shortTitle: 'VR Amazônia',
    summaryPt: 'Narrativas imersivas 360º sobre território e cultura amazônica.',
    summaryEn: '360 immersive narratives on Amazon territory and culture.',
    summaryEs: 'Narrativas inmersivas 360 sobre territorio y cultura amazónica.',
    summaryFr: 'Récits immersifs 360 sur le territoire et la culture amazonienne.',
    descriptionPt: `Série de filmes VR 360° documentando território e cultura amazônica. Rodado no Rio Madeira e durante o Círio de Nazaré, o projeto combina cinema documental com tecnologia imersiva para preservar e disseminar narrativas regionais.`,
    descriptionEn: `Series of 360° VR films documenting Amazon territory and culture. Shot on the Madeira River and during Círio de Nazaré, the project combines documentary cinema with immersive technology to preserve and disseminate regional narratives.`,
    descriptionEs: `Serie de películas VR 360° documentando territorio y cultura amazónica. Filmado en el Río Madeira y durante el Círio de Nazaré, el proyecto combina cine documental con tecnología inmersiva para preservar y diseminar narrativas regionales.`,
    descriptionFr: `Série de films VR 360° documentant le territoire et la culture amazonienne. Tourné sur le fleuve Madeira et pendant le Círio de Nazaré, le projet combine cinéma documentaire et technologie immersive pour préserver et diffuser les récits régionaux.`,
    year: 2022,
    location: 'Brasil',
    country: 'BR',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 4,
    tags: ['vr', '360', 'culture'],
    services: ['xr', 'cinema-av'],
  },
  {
    slug: 'first-nation',
    title: 'Projeto First Nation (DeepLab/IXLabs)',
    shortTitle: 'First Nation',
    summaryPt: 'Storyboard e animação 2D/motion para projeto cultural no Canadá.',
    summaryEn: 'Storyboard and 2D/motion animation for a cultural project in Canada.',
    summaryEs: 'Storyboard y animación 2D/motion para proyecto cultural en Canadá.',
    summaryFr: 'Storyboard et animation 2D/motion pour un projet culturel au Canada.',
    descriptionPt: `Storyboard, animação 2D e motion design para projeto cultural indígena First Nation no Canadá, em parceria com DeepLab e IXLabs. Desenvolvimento de narrativas visuais respeitando protocolos culturais e trabalhando em colaboração com comunidades originárias.`,
    descriptionEn: `Storyboard, 2D animation and motion design for First Nation indigenous cultural project in Canada, in partnership with DeepLab and IXLabs. Development of visual narratives respecting cultural protocols and working in collaboration with indigenous communities.`,
    descriptionEs: `Storyboard, animación 2D y motion design para proyecto cultural indígena First Nation en Canadá, en asociación con DeepLab e IXLabs. Desarrollo de narrativas visuales respetando protocolos culturales y trabajando en colaboración con comunidades originarias.`,
    descriptionFr: `Storyboard, animation 2D et motion design pour projet culturel autochtone First Nation au Canada, en partenariat avec DeepLab et IXLabs. Développement de récits visuels respectant les protocoles culturels et travaillant en collaboration avec les communautés autochtones.`,
    year: 2023,
    location: 'Canadá',
    country: 'CA',
    status: 'PUBLISHED',
    featured: true,
    priorityHome: 3,
    tags: ['culture', 'canada', 'motion', 'animation'],
    services: ['animation', 'cinema-av'],
  },
]

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function populateProjetos() {
  console.log('🚀 POPULANDO PROJETOS\n')

  let tagsCount = 0
  let projectsCount = 0
  let errors = 0

  // 1. POPULAR TAGS (necessárias para os projetos)
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

  // 2. POPULAR PROJETOS
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

      // Buscar services por slug
      const services = await prisma.service.findMany({
        where: { slug: { in: projectData.services } },
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
          descriptionPt: projectData.descriptionPt,
          descriptionEn: projectData.descriptionEn,
          descriptionEs: projectData.descriptionEs,
          descriptionFr: projectData.descriptionFr,
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
          descriptionPt: projectData.descriptionPt,
          descriptionEn: projectData.descriptionEn,
          descriptionEs: projectData.descriptionEs,
          descriptionFr: projectData.descriptionFr,
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
      
      console.log(`   ✅ ${projectData.title}`)
      projectsCount++
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar projeto ${projectData.slug}:`, error)
      errors++
    }
  }

  // RESUMO
  console.log('\n═══════════════════════════════════════════════════════════════')
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

populateProjetos()
  .then(() => {
    console.log('✨ POPULAÇÃO DE PROJETOS CONCLUÍDA!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

