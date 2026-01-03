/**
 * Script para atualizar o vídeo do Projeto Museu Olímpico
 * Substitui por um vídeo mais neutro e institucional
 * 
 * Execução: npx tsx scripts/update-olympic-video.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateOlympicVideo() {
  console.log('🎬 ATUALIZANDO VÍDEO: MUSEU OLÍMPICO DO RIO\n')

  try {
    // 1. Buscar o projeto
    console.log('🔍 Buscando projeto...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      include: { heroImage: true },
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado\n')

    // 2. Atualizar ou criar nova mídia com vídeo neutro
    console.log('🎥 Atualizando vídeo para versão mais neutra...')
    
    // Novo vídeo: mais neutro e institucional
    const NEW_VIDEO_ID = '7Y8YQOBU74U'
    const NEW_VIDEO_URL = `https://www.youtube.com/watch?v=${NEW_VIDEO_ID}`

    let heroVideo

    if (project.heroImageId) {
      // Atualizar mídia existente
      heroVideo = await prisma.media.update({
        where: { id: project.heroImageId },
        data: {
          originalUrl: NEW_VIDEO_URL,
          thumbnailUrl: `https://img.youtube.com/vi/${NEW_VIDEO_ID}/maxresdefault.jpg`,
          mediumUrl: `https://img.youtube.com/vi/${NEW_VIDEO_ID}/hqdefault.jpg`,
          largeUrl: `https://img.youtube.com/vi/${NEW_VIDEO_ID}/maxresdefault.jpg`,
          altPt: 'Museu Olímpico do Rio - Tour institucional pelas instalações e exposições',
          altEn: 'Rio Olympic Museum - Institutional tour of facilities and exhibitions',
          altEs: 'Museo Olímpico de Río - Tour institucional por las instalaciones y exposiciones',
          altFr: 'Musée Olympique de Rio - Visite institutionnelle des installations et expositions',
        },
      })
      console.log('✅ Mídia existente atualizada')
    } else {
      // Criar nova mídia
      heroVideo = await prisma.media.create({
        data: {
          type: 'VIDEO',
          originalUrl: NEW_VIDEO_URL,
          thumbnailUrl: `https://img.youtube.com/vi/${NEW_VIDEO_ID}/maxresdefault.jpg`,
          mediumUrl: `https://img.youtube.com/vi/${NEW_VIDEO_ID}/hqdefault.jpg`,
          largeUrl: `https://img.youtube.com/vi/${NEW_VIDEO_ID}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          format: 'video/youtube',
          contentType: 'video/mp4',
          altPt: 'Museu Olímpico do Rio - Tour institucional pelas instalações e exposições',
          altEn: 'Rio Olympic Museum - Institutional tour of facilities and exhibitions',
          altEs: 'Museo Olímpico de Río - Tour institucional por las instalaciones y exposiciones',
          altFr: 'Musée Olympique de Rio - Visite institutionnelle des installations et expositions',
        },
      })

      // Conectar ao projeto
      await prisma.project.update({
        where: { slug: 'museu-olimpico-rio' },
        data: { heroImageId: heroVideo.id },
      })
      console.log('✅ Nova mídia criada e conectada')
    }

    console.log('\n═══════════════════════════════════════════════════════════════')
    console.log('✅ VÍDEO ATUALIZADO COM SUCESSO!')
    console.log('═══════════════════════════════════════════════════════════════')
    console.log(`📁 Projeto: ${project.title}`)
    console.log(`🎥 Vídeo Anterior: https://www.youtube.com/watch?v=1Pcoi_E9SXI`)
    console.log(`🎥 Vídeo Novo (Neutro): ${NEW_VIDEO_URL}`)
    console.log(`📸 Thumbnail: https://img.youtube.com/vi/${NEW_VIDEO_ID}/maxresdefault.jpg`)
    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('✨ Características do novo vídeo:')
    console.log('   ✅ Mais neutro e institucional')
    console.log('   ✅ Foco nas instalações e exposições')
    console.log('   ✅ Sem narração promocional excessiva')
    console.log('   ✅ Visual mais clean e profissional\n')

    console.log('🔗 VERIFICAR:')
    console.log('1. Site: https://azmt.com.br (vídeo já atualizado)')
    console.log('2. Backoffice: https://backoffice.azmt.com.br/admin/projects')
    console.log('3. Depois você pode trocar por vídeo próprio da Azimut\n')

  } catch (error) {
    console.error('❌ ERRO ao atualizar vídeo:', error)
    throw error
  }
}

// Executar
updateOlympicVideo()
  .then(() => {
    console.log('✨ ATUALIZAÇÃO CONCLUÍDA!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

