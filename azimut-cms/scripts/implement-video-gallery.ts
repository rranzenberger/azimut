/**
 * Script para implementar GALERIA MULTI-VÍDEO no Projeto Museu Olímpico
 * - Vídeo Hero: Eduardo Paes (Dailymotion - oficial)
 * - Galeria: Múltiplos vídeos complementares
 * 
 * Execução: npx tsx scripts/implement-video-gallery.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function implementVideoGallery() {
  console.log('🎬 IMPLEMENTANDO GALERIA MULTI-VÍDEO: MUSEU OLÍMPICO\n')

  try {
    // 1. Buscar o projeto
    console.log('🔍 Buscando projeto...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      include: { 
        heroImage: true,
        gallery: {
          include: { media: true }
        }
      },
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado\n')

    // 2. ATUALIZAR VÍDEO HERO para Eduardo Paes (Dailymotion - OFICIAL)
    console.log('🏆 Atualizando vídeo HERO para versão oficial (Eduardo Paes)...')
    
    const HERO_VIDEO_URL = 'https://www.dailymotion.com/video/x9o0hao'
    const HERO_VIDEO_ID = 'x9o0hao'

    let heroVideo

    if (project.heroImageId) {
      // Atualizar mídia existente
      heroVideo = await prisma.media.update({
        where: { id: project.heroImageId },
        data: {
          type: 'VIDEO',
          originalUrl: HERO_VIDEO_URL,
          thumbnailUrl: `https://www.dailymotion.com/thumbnail/video/${HERO_VIDEO_ID}`,
          mediumUrl: `https://www.dailymotion.com/thumbnail/video/${HERO_VIDEO_ID}`,
          largeUrl: `https://www.dailymotion.com/thumbnail/video/${HERO_VIDEO_ID}`,
          format: 'video/dailymotion',
          contentType: 'video/mp4',
          altPt: 'Eduardo Paes inaugura o Rio Museu Olímpico - Vídeo Oficial',
          altEn: 'Eduardo Paes inaugurates Rio Olympic Museum - Official Video',
          altEs: 'Eduardo Paes inaugura el Museo Olímpico de Río - Video Oficial',
          altFr: 'Eduardo Paes inaugure le Musée Olympique de Rio - Vidéo Officielle',
        },
      })
      console.log('✅ Vídeo HERO atualizado (Dailymotion - Oficial)')
    } else {
      // Criar nova mídia
      heroVideo = await prisma.media.create({
        data: {
          type: 'VIDEO',
          originalUrl: HERO_VIDEO_URL,
          thumbnailUrl: `https://www.dailymotion.com/thumbnail/video/${HERO_VIDEO_ID}`,
          mediumUrl: `https://www.dailymotion.com/thumbnail/video/${HERO_VIDEO_ID}`,
          largeUrl: `https://www.dailymotion.com/thumbnail/video/${HERO_VIDEO_ID}`,
          width: 1280,
          height: 720,
          format: 'video/dailymotion',
          contentType: 'video/mp4',
          altPt: 'Eduardo Paes inaugura o Rio Museu Olímpico - Vídeo Oficial',
          altEn: 'Eduardo Paes inaugurates Rio Olympic Museum - Official Video',
          altEs: 'Eduardo Paes inaugura el Museo Olímpico de Río - Video Oficial',
          altFr: 'Eduardo Paes inaugure le Musée Olympique de Rio - Vidéo Officielle',
        },
      })

      await prisma.project.update({
        where: { slug: 'museu-olimpico-rio' },
        data: { heroImageId: heroVideo.id },
      })
      console.log('✅ Vídeo HERO criado e conectado (Dailymotion - Oficial)')
    }

    console.log('')

    // 3. CRIAR VÍDEOS PARA A GALERIA
    console.log('🎥 Criando galeria de vídeos complementares...\n')

    const galleryVideos = [
      {
        url: 'https://www.youtube.com/watch?v=7Y8YQOBU74U',
        id: '7Y8YQOBU74U',
        platform: 'youtube',
        titlePt: 'Tour pelas Instalações',
        titleEn: 'Facilities Tour',
        titleEs: 'Tour por las Instalaciones',
        titleFr: 'Visite des Installations',
        descPt: 'Visão geral das instalações e exposições do Museu Olímpico do Rio.',
        descEn: 'Overview of Rio Olympic Museum facilities and exhibitions.',
        descEs: 'Visión general de las instalaciones y exposiciones del Museo Olímpico de Río.',
        descFr: 'Aperçu des installations et expositions du Musée Olympique de Rio.',
        order: 1,
      },
      {
        url: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        id: '1Pcoi_E9SXI',
        platform: 'youtube',
        titlePt: 'Experiência dos Visitantes',
        titleEn: 'Visitor Experience',
        titleEs: 'Experiencia de los Visitantes',
        titleFr: 'Expérience des Visiteurs',
        descPt: 'Visitantes interagindo com as instalações imersivas e interativas do museu.',
        descEn: 'Visitors interacting with the museum\'s immersive and interactive installations.',
        descEs: 'Visitantes interactuando con las instalaciones inmersivas e interactivas del museo.',
        descFr: 'Visiteurs interagissant avec les installations immersives et interactives du musée.',
        order: 2,
      },
    ]

    // Limpar galeria existente (se houver)
    if (project.gallery.length > 0) {
      console.log('🗑️  Limpando galeria anterior...')
      await prisma.projectMedia.deleteMany({
        where: { projectId: project.id },
      })
      console.log('✅ Galeria anterior removida\n')
    }

    // Criar novos vídeos na galeria
    for (const video of galleryVideos) {
      const thumbnail = video.platform === 'youtube' 
        ? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
        : `https://www.dailymotion.com/thumbnail/video/${video.id}`

      // Criar mídia
      const media = await prisma.media.create({
        data: {
          type: 'VIDEO',
          originalUrl: video.url,
          thumbnailUrl: thumbnail,
          mediumUrl: thumbnail,
          largeUrl: thumbnail,
          width: 1280,
          height: 720,
          format: `video/${video.platform}`,
          contentType: 'video/mp4',
          altPt: video.descPt,
          altEn: video.descEn,
          altEs: video.descEs,
          altFr: video.descFr,
        },
      })

      // Adicionar à galeria do projeto
      await prisma.projectMedia.create({
        data: {
          projectId: project.id,
          mediaId: media.id,
          order: video.order,
        },
      })

      console.log(`   ✅ Vídeo ${video.order}: ${video.titlePt}`)
    }

    console.log('\n✅ Galeria criada com sucesso!\n')

    // RESUMO FINAL
    console.log('═══════════════════════════════════════════════════════════════')
    console.log('✅ GALERIA MULTI-VÍDEO IMPLEMENTADA COM SUCESSO!')
    console.log('═══════════════════════════════════════════════════════════════')
    console.log('\n📺 VÍDEO HERO (Home):')
    console.log(`   🏆 Eduardo Paes Inaugura Museu Olímpico (OFICIAL)`)
    console.log(`   🔗 ${HERO_VIDEO_URL}`)
    console.log(`   📺 Plataforma: Dailymotion`)
    console.log(`   ⭐ Tipo: Institucional/Oficial\n`)

    console.log('🎬 GALERIA DE VÍDEOS (Página do Projeto):')
    galleryVideos.forEach((video) => {
      console.log(`   ${video.order}. ${video.titlePt}`)
      console.log(`      🔗 ${video.url}`)
      console.log(`      📺 ${video.platform.toUpperCase()}\n`)
    })

    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('🌐 ONDE VISUALIZAR:\n')
    console.log('1️⃣  VÍDEO HERO:')
    console.log('   • Site: https://azmt.com.br')
    console.log('   • Localização: Hero Section da Home')
    console.log('   • Vídeo: Eduardo Paes (oficial/institucional)\n')

    console.log('2️⃣  GALERIA DE VÍDEOS:')
    console.log('   • Site: https://azmt.com.br/work/museu-olimpico-rio')
    console.log('   • Localização: Página de detalhes do projeto')
    console.log('   • Total: 2 vídeos complementares\n')

    console.log('3️⃣  BACKOFFICE (Editar):')
    console.log('   • URL: https://backoffice.azmt.com.br/admin/projects')
    console.log('   • Acesse: "Museu Olímpico do Rio"')
    console.log('   • Edite: Vídeos, textos, adicione mais mídias\n')

    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('💡 PRÓXIMOS PASSOS:\n')
    console.log('✅ Vídeo oficial Eduardo Paes no Hero (Dailymotion)')
    console.log('✅ Galeria com 2 vídeos complementares')
    console.log('📝 Você pode adicionar mais vídeos no backoffice quando quiser')
    console.log('🎬 Quando tiver vídeo editado Azimut, substitui facilmente\n')

  } catch (error) {
    console.error('❌ ERRO ao implementar galeria:', error)
    throw error
  }
}

// Executar
implementVideoGallery()
  .then(() => {
    console.log('✨ GALERIA MULTI-VÍDEO IMPLEMENTADA COM SUCESSO!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

