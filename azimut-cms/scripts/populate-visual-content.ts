/**
 * 🎨 POPULAÇÃO MASSIVA DE CONTEÚDO VISUAL
 * 
 * Popula o backoffice com:
 * - Imagens placeholder (Unsplash)
 * - Vídeos placeholder (URLs genéricos)
 * - Textos ricos
 * - Sections visuais
 * 
 * TUDO com prefix [PLACEHOLDER] para fácil identificação
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// URLs de imagens placeholder temáticas (Unsplash - free to use)
const PLACEHOLDER_IMAGES = {
  vr360: 'https://images.unsplash.com/photo-1617802690992-15d51f6e6d3e?w=1920&q=80', // VR headset
  vfx: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1920&q=80', // VFX/CGI
  cinema: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&q=80', // Cinema camera
  animation: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80', // 3D render
  motion: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=1920&q=80', // Motion design
  museum: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1920&q=80', // Museum interior
  studio: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80', // Studio equipment
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80', // Team working
  education: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80', // Education/learning
  research: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80', // Lab/research
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80', // Technology
  interactive: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80', // Interactive display
  vancouver: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1920&q=80', // Vancouver city
  corporate: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80', // Corporate training
  workshop: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80', // Workshop/collaboration
}

// URLs de vídeos placeholder (Pexels - free to use)
const PLACEHOLDER_VIDEOS = {
  showreel: 'https://player.vimeo.com/video/76979871', // Generic showreel placeholder
  vr360: 'https://www.youtube.com/embed/gzDS-Kfd5XQ', // VR demo
  museum: 'https://www.youtube.com/embed/jJ3qj8_Lf2w', // Museum tour
  studio: 'https://www.youtube.com/embed/1La4QzGeaaQ', // Studio tour
  process: 'https://www.youtube.com/embed/3fumBcKC6RE', // Creative process
}

async function main() {
  console.log('🎨 Iniciando população massiva de conteúdo visual...\n')

  // 1. Popular MEDIA com placeholders
  console.log('📸 Criando mídias placeholder...')
  
  const mediaPlaceholders = await Promise.all([
    // VR/360 images
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_VR_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_VR_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.vr360,
        thumbnailUrl: PLACEHOLDER_IMAGES.vr360,
        largeUrl: PLACEHOLDER_IMAGES.vr360,
        altPt: '[PLACEHOLDER] VR Headset - Trocar por imagem real',
        altEn: '[PLACEHOLDER] VR Headset - Replace with real image',
        width: 1920,
        height: 1080
      }
    }),
    
    // Cinema images
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_CINEMA_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_CINEMA_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.cinema,
        thumbnailUrl: PLACEHOLDER_IMAGES.cinema,
        largeUrl: PLACEHOLDER_IMAGES.cinema,
        altPt: '[PLACEHOLDER] Cinema Camera - Trocar por imagem real',
        altEn: '[PLACEHOLDER] Cinema Camera - Replace with real image',
        width: 1920,
        height: 1080
      }
    }),

    // VFX images
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_VFX_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_VFX_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.vfx,
        thumbnailUrl: PLACEHOLDER_IMAGES.vfx,
        largeUrl: PLACEHOLDER_IMAGES.vfx,
        altPt: '[PLACEHOLDER] VFX/CGI - Trocar por imagem real',
        altEn: '[PLACEHOLDER] VFX/CGI - Replace with real image',
        width: 1920,
        height: 1080
      }
    }),

    // Studio image
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_STUDIO_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_STUDIO_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.studio,
        thumbnailUrl: PLACEHOLDER_IMAGES.studio,
        largeUrl: PLACEHOLDER_IMAGES.studio,
        altPt: '[PLACEHOLDER] Studio - Trocar por foto real do estúdio Azimut',
        altEn: '[PLACEHOLDER] Studio - Replace with real Azimut studio photo',
        width: 1920,
        height: 1080
      }
    }),

    // Research/Lab image
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_RESEARCH_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_RESEARCH_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.research,
        thumbnailUrl: PLACEHOLDER_IMAGES.research,
        largeUrl: PLACEHOLDER_IMAGES.research,
        altPt: '[PLACEHOLDER] Pesquisa & Lab - Trocar por imagem real',
        altEn: '[PLACEHOLDER] Research & Lab - Replace with real image',
        width: 1920,
        height: 1080
      }
    }),

    // Education image
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_EDUCATION_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_EDUCATION_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.education,
        thumbnailUrl: PLACEHOLDER_IMAGES.education,
        largeUrl: PLACEHOLDER_IMAGES.education,
        altPt: '[PLACEHOLDER] Educação - Trocar por imagem real de curso/workshop',
        altEn: '[PLACEHOLDER] Education - Replace with real course/workshop image',
        width: 1920,
        height: 1080
      }
    }),

    // Vancouver image
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_VANCOUVER_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_VANCOUVER_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.vancouver,
        thumbnailUrl: PLACEHOLDER_IMAGES.vancouver,
        largeUrl: PLACEHOLDER_IMAGES.vancouver,
        altPt: '[PLACEHOLDER] Vancouver - Trocar por foto real da cidade',
        altEn: '[PLACEHOLDER] Vancouver - Replace with real city photo',
        width: 1920,
        height: 1080
      }
    }),

    // Team image
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_TEAM_HERO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_TEAM_HERO',
        type: 'IMAGE',
        originalUrl: PLACEHOLDER_IMAGES.team,
        thumbnailUrl: PLACEHOLDER_IMAGES.team,
        largeUrl: PLACEHOLDER_IMAGES.team,
        altPt: '[PLACEHOLDER] Equipe - Trocar por foto real da equipe Azimut',
        altEn: '[PLACEHOLDER] Team - Replace with real Azimut team photo',
        width: 1920,
        height: 1080
      }
    }),

    // Showreel video
    prisma.media.upsert({
      where: { id: 'PLACEHOLDER_SHOWREEL_VIDEO' },
      update: {},
      create: {
        id: 'PLACEHOLDER_SHOWREEL_VIDEO',
        type: 'VIDEO',
        originalUrl: PLACEHOLDER_VIDEOS.showreel,
        thumbnailUrl: PLACEHOLDER_IMAGES.cinema,
        altPt: '[PLACEHOLDER] Showreel - Trocar por vídeo real da Azimut',
        altEn: '[PLACEHOLDER] Showreel - Replace with real Azimut video',
        durationSeconds: 120
      }
    })
  ])

  console.log(`✅ ${mediaPlaceholders.length} mídias placeholder criadas!\n`)

  // 2. Popular PAGES com conteúdo visual
  console.log('📄 Criando/atualizando páginas com conteúdo visual...')

  // Studio Page
  await prisma.page.upsert({
    where: { slug: 'studio' },
    update: {
      heroBackgroundImageId: 'PLACEHOLDER_STUDIO_HERO',
      demoreelVideoId: 'PLACEHOLDER_SHOWREEL_VIDEO',
      heroSloganPt: '[PLACEHOLDER] Experiências que Conectam Mundos',
      heroSloganEn: '[PLACEHOLDER] Experiences that Connect Worlds',
      heroSubtitlePt: '[PLACEHOLDER] 30 anos criando narrativas imersivas entre Brasil e Canadá',
      heroSubtitleEn: '[PLACEHOLDER] 30 years creating immersive narratives between Brazil and Canada',
      pillar1Pt: 'Cinema & Audiovisual',
      pillar1En: 'Cinema & Audiovisual',
      pillar2Pt: 'Tecnologias Imersivas (VR/XR/AR)',
      pillar2En: 'Immersive Technologies (VR/XR/AR)',
      pillar3Pt: 'Educação & Curadoria',
      pillar3En: 'Education & Curatorship'
    },
    create: {
      slug: 'studio',
      name: 'Studio',
      heroBackgroundImageId: 'PLACEHOLDER_STUDIO_HERO',
      demoreelVideoId: 'PLACEHOLDER_SHOWREEL_VIDEO',
      heroSloganPt: '[PLACEHOLDER] Experiências que Conectam Mundos',
      heroSloganEn: '[PLACEHOLDER] Experiences that Connect Worlds',
      heroSubtitlePt: '[PLACEHOLDER] 30 anos criando narrativas imersivas entre Brasil e Canadá',
      heroSubtitleEn: '[PLACEHOLDER] 30 years creating immersive narratives between Brazil and Canada',
      seoTitlePt: 'Studio - Azimut',
      seoTitleEn: 'Studio - Azimut',
      seoDescPt: 'Conheça a Azimut: 30 anos de experiência em narrativas imersivas',
      seoDescEn: 'Meet Azimut: 30 years of experience in immersive storytelling',
      pillar1Pt: 'Cinema & Audiovisual',
      pillar1En: 'Cinema & Audiovisual',
      pillar2Pt: 'Tecnologias Imersivas (VR/XR/AR)',
      pillar2En: 'Immersive Technologies (VR/XR/AR)',
      pillar3Pt: 'Educação & Curadoria',
      pillar3En: 'Education & Curatorship'
    }
  })

  // Research Page
  await prisma.page.upsert({
    where: { slug: 'academy/research' },
    update: {
      heroBackgroundImageId: 'PLACEHOLDER_RESEARCH_HERO',
      heroSloganPt: '[PLACEHOLDER] Explorando Fronteiras da Narrativa',
      heroSloganEn: '[PLACEHOLDER] Exploring Storytelling Frontiers',
      heroSubtitlePt: '[PLACEHOLDER] Pesquisa em IA, VR Cinematográfico e Sistemas Interativos',
      heroSubtitleEn: '[PLACEHOLDER] Research in AI, Cinematic VR and Interactive Systems'
    },
    create: {
      slug: 'academy/research',
      name: 'Research & Lab',
      heroBackgroundImageId: 'PLACEHOLDER_RESEARCH_HERO',
      heroSloganPt: '[PLACEHOLDER] Explorando Fronteiras da Narrativa',
      heroSloganEn: '[PLACEHOLDER] Exploring Storytelling Frontiers',
      heroSubtitlePt: '[PLACEHOLDER] Pesquisa em IA, VR Cinematográfico e Sistemas Interativos',
      heroSubtitleEn: '[PLACEHOLDER] Research in AI, Cinematic VR and Interactive Systems',
      seoTitlePt: 'Research & Lab - Azimut Academy',
      seoTitleEn: 'Research & Lab - Azimut Academy',
      seoDescPt: 'Pesquisa e desenvolvimento em narrativas imersivas e tecnologias emergentes',
      seoDescEn: 'Research and development in immersive storytelling and emerging technologies'
    }
  })

  // Academy Courses
  await prisma.page.upsert({
    where: { slug: 'academy/courses' },
    update: {
      heroBackgroundImageId: 'PLACEHOLDER_EDUCATION_HERO',
      heroSloganPt: '[PLACEHOLDER] Cursos de VR, VFX e Motion Design',
      heroSloganEn: '[PLACEHOLDER] VR, VFX and Motion Design Courses'
    },
    create: {
      slug: 'academy/courses',
      name: 'Academy Courses',
      heroBackgroundImageId: 'PLACEHOLDER_EDUCATION_HERO',
      heroSloganPt: '[PLACEHOLDER] Cursos de VR, VFX e Motion Design',
      heroSloganEn: '[PLACEHOLDER] VR, VFX and Motion Design Courses',
      seoTitlePt: 'Cursos - Azimut Academy',
      seoTitleEn: 'Courses - Azimut Academy'
    }
  })

  // Academy Workshops
  await prisma.page.upsert({
    where: { slug: 'academy/workshops' },
    update: {
      heroBackgroundImageId: 'PLACEHOLDER_EDUCATION_HERO',
      heroSloganPt: '[PLACEHOLDER] Workshops Práticos e Imersivos',
      heroSloganEn: '[PLACEHOLDER] Practical and Immersive Workshops'
    },
    create: {
      slug: 'academy/workshops',
      name: 'Academy Workshops',
      heroBackgroundImageId: 'PLACEHOLDER_EDUCATION_HERO',
      heroSloganPt: '[PLACEHOLDER] Workshops Práticos e Imersivos',
      heroSloganEn: '[PLACEHOLDER] Practical and Immersive Workshops',
      seoTitlePt: 'Workshops - Azimut Academy',
      seoTitleEn: 'Workshops - Azimut Academy'
    }
  })

  // Academy Corporate
  await prisma.page.upsert({
    where: { slug: 'academy/corporate' },
    update: {
      heroBackgroundImageId: 'PLACEHOLDER_EDUCATION_HERO',
      heroSloganPt: '[PLACEHOLDER] Treinamentos Corporativos Personalizados',
      heroSloganEn: '[PLACEHOLDER] Customized Corporate Training'
    },
    create: {
      slug: 'academy/corporate',
      name: 'Academy Corporate',
      heroBackgroundImageId: 'PLACEHOLDER_EDUCATION_HERO',
      heroSloganPt: '[PLACEHOLDER] Treinamentos Corporativos Personalizados',
      heroSloganEn: '[PLACEHOLDER] Customized Corporate Training',
      seoTitlePt: 'Corporate - Azimut Academy',
      seoTitleEn: 'Corporate - Azimut Academy'
    }
  })

  console.log('✅ 5 páginas criadas/atualizadas!\n')

  // 3. Criar SECTIONS com conteúdo visual
  console.log('📐 Criando sections visuais...')

  // Studio - Section: Sobre a Azimut
  const studioPage = await prisma.page.findUnique({ where: { slug: 'studio' } })
  
  if (studioPage) {
    await prisma.section.upsert({
      where: { id: 'SECTION_STUDIO_ABOUT' },
      update: {},
      create: {
        id: 'SECTION_STUDIO_ABOUT',
        pageId: studioPage.id,
        type: 'text',
        layout: 'two-column',
        order: 1,
        titlePt: '[PLACEHOLDER] Sobre a Azimut',
        titleEn: '[PLACEHOLDER] About Azimut',
        bodyPt: `[PLACEHOLDER] A Azimut é um estúdio criativo-tecnológico dedicado a experiências imersivas, interativas e cinematográficas.

Com raízes no Brasil e Canadá, navegamos entre cinema, design, engenharia, educação e pesquisa. Criamos projetos para museus, instalações públicas, festivais, ativações de marca e laboratórios experimentais.

Nossa expertise:
• 30 anos em produção audiovisual
• Direção Geral de Tecnologia (Museu Olímpico)
• Curadoria de VR (Festival de Gramado desde 2017)
• Membros fundadores da Associação XRBR
• Operações internacionais Brasil ↔ Canadá`,
        bodyEn: `[PLACEHOLDER] Azimut is a creative-technology studio dedicated to immersive, interactive and cinematic experiences.

With roots in Brazil and Canada, we navigate between cinema, design, engineering, education and research. We create projects for museums, public installations, festivals, brand activations and experimental labs.

Our expertise:
• 30 years in audiovisual production
• General Technology Direction (Olympic Museum)
• VR Curatorship (Gramado Festival since 2017)
• Founding members of XRBR Association
• International operations Brazil ↔ Canada`
      }
    })

    // Studio - Section: Showreel
    await prisma.section.upsert({
      where: { id: 'SECTION_STUDIO_SHOWREEL' },
      update: {},
      create: {
        id: 'SECTION_STUDIO_SHOWREEL',
        pageId: studioPage.id,
        type: 'video',
        layout: 'full-width',
        order: 2,
        titlePt: '[PLACEHOLDER] Showreel 2024',
        titleEn: '[PLACEHOLDER] Showreel 2024',
        bodyPt: 'TROCAR por URL do vídeo showreel real da Azimut',
        bodyEn: 'REPLACE with real Azimut showreel video URL'
      }
    })

    // Studio - Section: Equipe
    await prisma.section.upsert({
      where: { id: 'SECTION_STUDIO_TEAM' },
      update: {},
      create: {
        id: 'SECTION_STUDIO_TEAM',
        pageId: studioPage.id,
        type: 'team',
        layout: 'grid-3',
        order: 3,
        titlePt: '[PLACEHOLDER] Equipe',
        titleEn: '[PLACEHOLDER] Team',
        bodyPt: `VARIÁVEIS para trocar no backoffice:
- TEAM_MEMBER_1_PHOTO
- TEAM_MEMBER_1_NAME
- TEAM_MEMBER_1_ROLE
- TEAM_MEMBER_1_BIO

Use a interface de Mídias para fazer upload das fotos reais.`,
        bodyEn: 'VARIABLES to replace in backoffice (see PT)'
      }
    })
  }

  // Research - Sections
  const researchPage = await prisma.page.findUnique({ where: { slug: 'academy/research' } })
  
  if (researchPage) {
    await prisma.section.upsert({
      where: { id: 'SECTION_RESEARCH_AREAS' },
      update: {},
      create: {
        id: 'SECTION_RESEARCH_AREAS',
        pageId: researchPage.id,
        type: 'grid',
        layout: 'grid-3',
        order: 1,
        titlePt: '[PLACEHOLDER] Áreas de Pesquisa',
        titleEn: '[PLACEHOLDER] Research Areas',
        bodyPt: `🤖 IA Generativa para Narrativa
🎬 Cinematic VR & 360
⚡ Sistemas Interativos
🧬 Pipelines Híbridos (IA+Humano)
🏛️ Museografia Digital
🎓 Educação Imersiva

TROCAR por descrições detalhadas de cada área.`,
        bodyEn: 'REPLACE with detailed descriptions'
      }
    })

    await prisma.section.upsert({
      where: { id: 'SECTION_RESEARCH_PROJECTS' },
      update: {},
      create: {
        id: 'SECTION_RESEARCH_PROJECTS',
        pageId: researchPage.id,
        type: 'timeline',
        layout: 'vertical',
        order: 2,
        titlePt: '[PLACEHOLDER] Projetos de Pesquisa',
        titleEn: '[PLACEHOLDER] Research Projects',
        bodyPt: `2024-2026: IA para Animação de Personagens
2023-2025: VR Cinematográfico
2022-2024: Interfaces Tangíveis

TROCAR por projetos reais com descrições completas.`,
        bodyEn: 'REPLACE with real projects'
      }
    })
  }

  console.log('✅ Sections criadas!\n')

  // 4. Criar PROJETOS placeholder para demonstração
  console.log('🎬 Criando projetos placeholder...')

  const placeholderProjects = [
    {
      id: 'PLACEHOLDER_PROJECT_VR',
      slug: 'placeholder-tour-virtual-360',
      title: '[PLACEHOLDER] Tour Virtual 360° - Museu de Arte',
      summaryPt: '[PLACEHOLDER] Tour imersivo em 360° com hotspots interativos e áudio espacial. TROCAR por projeto real.',
      summaryEn: '[PLACEHOLDER] Immersive 360° tour with interactive hotspots and spatial audio. REPLACE with real project.',
      heroImageId: 'PLACEHOLDER_VR_HERO',
      type: 'VR/360',
      status: 'DRAFT' as const
    },
    {
      id: 'PLACEHOLDER_PROJECT_VFX',
      slug: 'placeholder-efeitos-visuais-filme',
      title: '[PLACEHOLDER] Efeitos Visuais para Longa-Metragem',
      summaryPt: '[PLACEHOLDER] VFX cinematográfico com compositing, cleanup e CGI. TROCAR por projeto real.',
      summaryEn: '[PLACEHOLDER] Cinematic VFX with compositing, cleanup and CGI. REPLACE with real project.',
      heroImageId: 'PLACEHOLDER_VFX_HERO',
      type: 'VFX',
      status: 'DRAFT' as const
    }
  ]

  for (const proj of placeholderProjects) {
    await prisma.project.upsert({
      where: { id: proj.id },
      update: {},
      create: proj
    })
  }

  console.log(`✅ ${placeholderProjects.length} projetos placeholder criados!\n`)

  console.log('🎉 População massiva concluída!\n')
  console.log('📊 RESUMO:')
  console.log(`   • ${mediaPlaceholders.length} mídias placeholder`)
  console.log(`   • 5 páginas configuradas`)
  console.log(`   • ${placeholderProjects.length} projetos demo`)
  console.log(`   • Seções visuais criadas`)
  console.log('\n✅ Backoffice populado com placeholders visuais!')
  console.log('🎨 Agora o site ficará EXTREMAMENTE VISUAL!')
  console.log('\n📝 Próximo passo: Trocar [PLACEHOLDER] por conteúdo real no backoffice')
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
