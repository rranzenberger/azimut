/**
 * Script para popular APENAS a página "Soluções" (What) e Serviços
 * Execução: npx tsx scripts/populate-solucoes.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ═══════════════════════════════════════════════════════════════
// PÁGINA "SOLUÇÕES" (WHAT)
// ═══════════════════════════════════════════════════════════════

const whatPageContent = {
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
}

// ═══════════════════════════════════════════════════════════════
// SERVIÇOS
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
    segments: ['museum', 'culture', 'brand'],
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
    segments: ['brand', 'culture', 'education'],
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
    segments: ['museum', 'culture', 'brand'],
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
    segments: ['museum', 'culture'],
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
    segments: ['research', 'brand', 'culture'],
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
    segments: ['education', 'research'],
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
    segments: ['consulting', 'research'],
  },
]

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function populateSolucoes() {
  console.log('🚀 POPULANDO PÁGINA DE SOLUÇÕES + SERVIÇOS\n')

  let pageCount = 0
  let servicesCount = 0
  let errors = 0

  // 1. POPULAR PÁGINA "WHAT" (SOLUÇÕES)
  console.log('📄 POPULANDO PÁGINA "SOLUÇÕES"...\n')
  try {
    await prisma.page.upsert({
      where: { slug: whatPageContent.slug },
      update: {
        name: whatPageContent.name,
        seoTitlePt: whatPageContent.seoTitlePt,
        seoTitleEn: whatPageContent.seoTitleEn,
        seoTitleEs: whatPageContent.seoTitleEs,
        seoTitleFr: whatPageContent.seoTitleFr,
        seoDescPt: whatPageContent.seoDescPt,
        seoDescEn: whatPageContent.seoDescEn,
        seoDescEs: whatPageContent.seoDescEs,
        seoDescFr: whatPageContent.seoDescFr,
        heroSloganPt: whatPageContent.heroSloganPt,
        heroSloganEn: whatPageContent.heroSloganEn,
        heroSloganEs: whatPageContent.heroSloganEs,
        heroSloganFr: whatPageContent.heroSloganFr,
        heroSubtitlePt: whatPageContent.heroSubtitlePt,
        heroSubtitleEn: whatPageContent.heroSubtitleEn,
        heroSubtitleEs: whatPageContent.heroSubtitleEs,
        heroSubtitleFr: whatPageContent.heroSubtitleFr,
        status: 'PUBLISHED',
      },
      create: {
        slug: whatPageContent.slug,
        name: whatPageContent.name,
        seoTitlePt: whatPageContent.seoTitlePt,
        seoTitleEn: whatPageContent.seoTitleEn,
        seoTitleEs: whatPageContent.seoTitleEs,
        seoTitleFr: whatPageContent.seoTitleFr,
        seoDescPt: whatPageContent.seoDescPt,
        seoDescEn: whatPageContent.seoDescEn,
        seoDescEs: whatPageContent.seoDescEs,
        seoDescFr: whatPageContent.seoDescFr,
        heroSloganPt: whatPageContent.heroSloganPt,
        heroSloganEn: whatPageContent.heroSloganEn,
        heroSloganEs: whatPageContent.heroSloganEs,
        heroSloganFr: whatPageContent.heroSloganFr,
        heroSubtitlePt: whatPageContent.heroSubtitlePt,
        heroSubtitleEn: whatPageContent.heroSubtitleEn,
        heroSubtitleEs: whatPageContent.heroSubtitleEs,
        heroSubtitleFr: whatPageContent.heroSubtitleFr,
        status: 'PUBLISHED',
      },
    })
    pageCount++
    console.log('   ✅ Página "Soluções" populada')
  } catch (error) {
    console.error('   ❌ Erro ao popular página "Soluções":', error)
    errors++
  }

  // 2. POPULAR SERVIÇOS
  console.log('\n🛠️  POPULANDO SERVIÇOS...\n')
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
          segments: serviceData.segments,
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
          segments: serviceData.segments,
          status: 'PUBLISHED',
        },
      })
      servicesCount++
      console.log(`   ✅ ${serviceData.titlePt}`)
    } catch (error) {
      console.error(`   ❌ Erro ao popular serviço ${serviceData.slug}:`, error)
      errors++
    }
  }

  // RESUMO
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log(`✅ Página "Soluções": ${pageCount}`)
  console.log(`✅ Serviços: ${servicesCount}`)
  if (errors > 0) {
    console.log(`❌ Erros: ${errors}`)
  }
  console.log('═══════════════════════════════════════════════════════════════\n')
}

// ═══════════════════════════════════════════════════════════════
// EXECUÇÃO
// ═══════════════════════════════════════════════════════════════

populateSolucoes()
  .then(() => {
    console.log('✨ POPULAÇÃO DE SOLUÇÕES CONCLUÍDA!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

