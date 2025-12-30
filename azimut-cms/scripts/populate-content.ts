/**
 * Script para popular o banco de dados com conteúdo do site principal
 * Execução: npx tsx scripts/populate-content.ts
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
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function populateContent() {
  console.log('🚀 INICIANDO POPULAÇÃO DO BANCO DE DADOS\n')

  let updatedCount = 0
  let errorCount = 0

  for (const [key, pageData] of Object.entries(pagesContent)) {
    try {
      console.log(`📄 Atualizando: ${pageData.name} (${pageData.slug})`)
      
      await prisma.page.upsert({
        where: { slug: pageData.slug },
        update: {
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
          status: 'PUBLISHED',
        },
        create: {
          name: pageData.name,
          slug: pageData.slug,
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
          status: 'PUBLISHED',
        },
      })
      
      console.log(`   ✅ Sucesso!\n`)
      updatedCount++
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar ${pageData.slug}:`, error)
      errorCount++
    }
  }

  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`✅ ${updatedCount} páginas atualizadas com sucesso!`)
  if (errorCount > 0) {
    console.log(`❌ ${errorCount} páginas com erro`)
  }
  console.log('═══════════════════════════════════════════════════════════════\n')
}

// ═══════════════════════════════════════════════════════════════
// EXECUÇÃO
// ═══════════════════════════════════════════════════════════════

populateContent()
  .then(() => {
    console.log('✨ POPULAÇÃO CONCLUÍDA!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

