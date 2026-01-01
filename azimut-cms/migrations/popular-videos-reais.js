// ════════════════════════════════════════════════════════════
// SCRIPT: POPULAR VÍDEOS REAIS DOS PROJETOS
// ════════════════════════════════════════════════════════════
// Objetivo: Adicionar vídeos reais dos projetos ao backoffice
// Como usar: Cole as URLs dos vídeos que você encontrar abaixo
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ═══════════════════════════════════════════════════════════════════
// 📝 ONDE PROCURAR OS VÍDEOS:
// ═══════════════════════════════════════════════════════════════════
// 
// 1. YouTube - Canal da Ydreams/Azimut
//    - Buscar: "Ydreams", "Azimut", nome do projeto
//    - Copiar URL: https://www.youtube.com/watch?v=VIDEO_ID
//
// 2. Vimeo - Portfolio da Ydreams
//    - Buscar: "Ydreams", nome do projeto
//    - Copiar URL: https://vimeo.com/VIDEO_ID
//
// 3. Sites dos clientes
//    - Museu Rio Olímpico → Site do museu
//    - Festival de Gramado → Site do festival
//    - Exposições → Sites das exposições
//
// 4. Redes sociais
//    - Instagram: Stories/Posts com vídeos
//    - LinkedIn: Posts de projetos
//    - Facebook: Vídeos dos projetos
//
// ═══════════════════════════════════════════════════════════════════

const videosReais = {
  
  // ───────────────────────────────────────────────────────────
  // PROJETO: Instalação Imersiva
  // ───────────────────────────────────────────────────────────
  'instalacao-imersiva': {
    // Cole aqui a URL do vídeo quando encontrar ↓
    videoUrl: '', // Ex: 'https://www.youtube.com/watch?v=ABC123'
    alt: 'Vídeo da Instalação Imersiva'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Exposição Digital
  // ───────────────────────────────────────────────────────────
  'exposicao-digital': {
    videoUrl: '',
    alt: 'Vídeo da Exposição Digital'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Filme VR 360°
  // ───────────────────────────────────────────────────────────
  'filme-vr-360': {
    videoUrl: '',
    alt: 'Vídeo do Filme VR 360°'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: First Nation (DeepLab/IXLabs)
  // ───────────────────────────────────────────────────────────
  'first-nation': {
    videoUrl: '',
    alt: 'Vídeo do Projeto First Nation'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: VR Amazônia (Rio Madeira / Círio)
  // ───────────────────────────────────────────────────────────
  'vr-amazonia': {
    videoUrl: '',
    alt: 'Vídeo VR Amazônia - Rio Madeira e Círio'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Senna (Tower/Interlagos)
  // ───────────────────────────────────────────────────────────
  'senna-ativacoes': {
    videoUrl: '',
    alt: 'Vídeo Ativações Senna - Torre e Interlagos'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Van Gogh / La Fontaine
  // ───────────────────────────────────────────────────────────
  'van-gogh-la-fontaine': {
    videoUrl: '',
    alt: 'Vídeo Exposições Van Gogh e La Fontaine'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Natal Cultural (IA + animação)
  // ───────────────────────────────────────────────────────────
  'natal-cultural': {
    videoUrl: '',
    alt: 'Vídeo Natal Cultural com IA e Animação'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Gramado VR/IA
  // ───────────────────────────────────────────────────────────
  'gramado-vr-ia': {
    videoUrl: '',
    alt: 'Vídeo Festival de Gramado VR/IA'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Museu Rio Olímpico
  // ───────────────────────────────────────────────────────────
  'museu-rio-olimpico': {
    videoUrl: '',
    alt: 'Vídeo Museu Rio Olímpico - Instalação Interativa'
  },

  // ───────────────────────────────────────────────────────────
  // ✅ ADICIONE MAIS PROJETOS AQUI SE NECESSÁRIO
  // ───────────────────────────────────────────────────────────
}

// Função para extrair ID do YouTube
function extractYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

// Função para extrair ID do Vimeo
function extractVimeoId(url) {
  if (!url) return null
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
  return match ? match[1] : null
}

// Função para gerar URLs de thumbnail
function getThumbnailUrls(videoUrl) {
  const youtubeId = extractYouTubeId(videoUrl)
  const vimeoId = extractVimeoId(videoUrl)

  if (youtubeId) {
    return {
      original: videoUrl,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      medium: `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
      large: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      platform: 'youtube'
    }
  }

  if (vimeoId) {
    return {
      original: videoUrl,
      thumbnail: `https://vumbnail.com/${vimeoId}.jpg`,
      medium: `https://vumbnail.com/${vimeoId}.jpg`,
      large: `https://vumbnail.com/${vimeoId}.jpg`,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
      platform: 'vimeo'
    }
  }

  return null
}

async function main() {
  console.log('🎬 Adicionando vídeos reais aos projetos...\n')

  let adicionados = 0
  let ignorados = 0
  let erros = 0

  for (const [slug, dados] of Object.entries(videosReais)) {
    try {
      if (!dados.videoUrl || dados.videoUrl.trim() === '') {
        console.log(`⏭️  ${slug}: Sem URL de vídeo, pulando`)
        ignorados++
        continue
      }

      // Buscar projeto
      const projeto = await prisma.project.findUnique({
        where: { slug },
        include: { heroImage: true }
      })

      if (!projeto) {
        console.log(`❌ ${slug}: Projeto não encontrado`)
        erros++
        continue
      }

      // Gerar URLs de thumbnail
      const urls = getThumbnailUrls(dados.videoUrl)
      if (!urls) {
        console.log(`❌ ${slug}: URL inválida (deve ser YouTube ou Vimeo)`)
        erros++
        continue
      }

      // Se já tem heroImage, verificar se é vídeo
      if (projeto.heroImageId) {
        const existingMedia = await prisma.media.findUnique({
          where: { id: projeto.heroImageId }
        })

        if (existingMedia && existingMedia.type === 'VIDEO') {
          // Atualizar vídeo existente
          await prisma.media.update({
            where: { id: projeto.heroImageId },
            data: {
              originalUrl: urls.original,
              thumbnailUrl: urls.thumbnail,
              mediumUrl: urls.medium,
              largeUrl: urls.large,
              altPt: dados.alt,
              altEn: dados.alt,
              altEs: dados.alt,
              altFr: dados.alt,
              format: urls.platform.toUpperCase(),
            }
          })
          console.log(`✅ ${slug}: Vídeo atualizado`)
        } else {
          // Criar novo vídeo e substituir imagem
          const video = await prisma.media.create({
            data: {
              type: 'VIDEO',
              originalUrl: urls.original,
              thumbnailUrl: urls.thumbnail,
              mediumUrl: urls.medium,
              largeUrl: urls.large,
              altPt: dados.alt,
              altEn: dados.alt,
              altEs: dados.alt,
              altFr: dados.alt,
              format: urls.platform.toUpperCase(),
            }
          })

          await prisma.project.update({
            where: { id: projeto.id },
            data: { heroImageId: video.id }
          })
          console.log(`✅ ${slug}: Vídeo criado (substituiu imagem)`)
        }
      } else {
        // Criar novo vídeo
        const video = await prisma.media.create({
          data: {
            type: 'VIDEO',
            originalUrl: urls.original,
            thumbnailUrl: urls.thumbnail,
            mediumUrl: urls.medium,
            largeUrl: urls.large,
            altPt: dados.alt,
            altEn: dados.alt,
            altEs: dados.alt,
            altFr: dados.alt,
            format: urls.platform.toUpperCase(),
          }
        })

        await prisma.project.update({
          where: { id: projeto.id },
          data: { heroImageId: video.id }
        })
        console.log(`✅ ${slug}: Vídeo criado`)
      }

      adicionados++
    } catch (error) {
      console.error(`❌ Erro em ${slug}:`, error.message)
      erros++
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ Vídeos adicionados: ${adicionados}`)
  console.log(`   ⏭️  Ignorados (sem URL): ${ignorados}`)
  console.log(`   ❌ Erros: ${erros}`)

  // Listar projetos com vídeos
  console.log('\n📋 Projetos com vídeos:')
  const projetosComVideo = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
      heroImage: {
        type: 'VIDEO'
      }
    },
    include: { heroImage: true },
    select: {
      slug: true,
      title: true,
      heroImage: {
        select: {
          type: true,
          originalUrl: true
        }
      }
    }
  })

  projetosComVideo.forEach(p => {
    const platform = p.heroImage?.originalUrl?.includes('youtube') ? 'YouTube' : 'Vimeo'
    console.log(`   🎬 ${p.title} (${platform})`)
  })

  console.log('\n✅ Concluído!')
  console.log('\n💡 Próximo passo:')
  console.log('   • O site vai detectar automaticamente que é vídeo')
  console.log('   • Vai mostrar player do YouTube/Vimeo')
  console.log('   • Thumbnail será usada como preview\n')
}

main()
  .catch(e => {
    console.error('❌ Erro fatal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// ════════════════════════════════════════════════════════════
// COMO EXECUTAR:
// ════════════════════════════════════════════════════════════
// 1. Procure os vídeos nos lugares indicados acima
// 2. Cole as URLs neste arquivo
// 3. Execute:
//    cd azimut-cms
//    node migrations/popular-videos-reais.js
// ════════════════════════════════════════════════════════════

