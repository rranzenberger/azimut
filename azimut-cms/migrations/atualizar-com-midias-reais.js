// ════════════════════════════════════════════════════════════
// SCRIPT: ATUALIZAR COM IMAGENS/VÍDEOS REAIS DOS PROJETOS
// ════════════════════════════════════════════════════════════
// Data: 01/01/2026
// Como usar: Cole as URLs das imagens/vídeos do YouTube, Instagram,
//            Vimeo ou qualquer outra fonte onde os projetos foram publicados
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ═══════════════════════════════════════════════════════════════════
// 📝 INSTRUÇÕES PARA PREENCHER:
// ═══════════════════════════════════════════════════════════════════
// 
// Para cada projeto, adicione:
// 1. URL da imagem (pode ser do Instagram, Facebook, site, etc)
// 2. OU URL do vídeo do YouTube/Vimeo
// 3. Se for vídeo do YouTube, use: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
// 4. Se for Instagram, clique com botão direito na imagem → "Copiar endereço da imagem"
// 5. Se for Vimeo, use a thumbnail do vídeo
//
// ═══════════════════════════════════════════════════════════════════

const imagensReaisProjetos = {
  
  // ───────────────────────────────────────────────────────────
  // PROJETO: Instalação Imersiva
  // ───────────────────────────────────────────────────────────
  'instalacao-imersiva': {
    // Cole a URL da imagem aqui ↓
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    // OU se for vídeo do YouTube, cole assim:
    // url: 'https://img.youtube.com/vi/SEU_VIDEO_ID/maxresdefault.jpg',
    alt: 'Instalação Imersiva - Experiência Visual Interativa'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Exposição Digital
  // ───────────────────────────────────────────────────────────
  'exposicao-digital': {
    url: 'https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=1200&h=800&fit=crop',
    alt: 'Exposição Digital - Narrativa Espacial com AR'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Filme VR 360°
  // ───────────────────────────────────────────────────────────
  'filme-vr-360': {
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=800&fit=crop',
    alt: 'Filme VR 360° - Experiência Virtual'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: First Nation (DeepLab/IXLabs)
  // ───────────────────────────────────────────────────────────
  'first-nation': {
    url: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=1200&h=800&fit=crop',
    alt: 'Projeto First Nation - Arte e Cultura Indígena'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: VR Amazônia (Rio Madeira / Círio)
  // ───────────────────────────────────────────────────────────
  'vr-amazonia': {
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    alt: 'VR Amazônia - Rio Madeira e Círio'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Senna (Tower/Interlagos)
  // ───────────────────────────────────────────────────────────
  'senna-ativacoes': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    alt: 'Ativações Senna - Torre e Interlagos'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Van Gogh / La Fontaine
  // ───────────────────────────────────────────────────────────
  'van-gogh-la-fontaine': {
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop',
    alt: 'Exposições Paisagens de Van Gogh e La Fontaine'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Natal Cultural (IA + animação)
  // ───────────────────────────────────────────────────────────
  'natal-cultural': {
    url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=800&fit=crop',
    alt: 'Natal Cultural - IA e Animação'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Gramado VR/IA
  // ───────────────────────────────────────────────────────────
  'gramado-vr-ia': {
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=800&fit=crop',
    alt: 'Festival de Gramado - VR e IA'
  },

  // ───────────────────────────────────────────────────────────
  // PROJETO: Museu Rio Olímpico
  // ───────────────────────────────────────────────────────────
  'museu-rio-olimpico': {
    url: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&h=800&fit=crop',
    alt: 'Museu Rio Olímpico - Instalação Interativa'
  },

  // ───────────────────────────────────────────────────────────
  // ✅ ADICIONE MAIS PROJETOS AQUI SE NECESSÁRIO
  // ───────────────────────────────────────────────────────────
}

// ═══════════════════════════════════════════════════════════════════
// 🎬 COMO OBTER URL DE THUMBNAIL DO YOUTUBE:
// ═══════════════════════════════════════════════════════════════════
//
// Se o vídeo é: https://www.youtube.com/watch?v=ABC123XYZ
// Use: https://img.youtube.com/vi/ABC123XYZ/maxresdefault.jpg
//
// Qualidades disponíveis:
// - maxresdefault.jpg  (1280x720 - melhor qualidade)
// - sddefault.jpg      (640x480)
// - hqdefault.jpg      (480x360)
// - mqdefault.jpg      (320x180)
//
// ═══════════════════════════════════════════════════════════════════

async function main() {
  console.log('🎨 Atualizando projetos com imagens/vídeos reais...\n')

  let atualizados = 0
  let ignorados = 0
  let erros = 0

  for (const [slug, dados] of Object.entries(imagensReaisProjetos)) {
    try {
      // Buscar projeto
      const projeto = await prisma.project.findUnique({
        where: { slug },
        include: { heroImage: true }
      })

      if (!projeto) {
        console.log(`   ⏭️  Projeto "${slug}" não encontrado no banco`)
        ignorados++
        continue
      }

      // Se já tem heroImage, atualizar; senão, criar
      if (projeto.heroImageId) {
        // Atualizar Media existente
        await prisma.media.update({
          where: { id: projeto.heroImageId },
          data: {
            originalUrl: dados.url,
            thumbnailUrl: dados.url + '&w=400',
            mediumUrl: dados.url + '&w=800',
            largeUrl: dados.url + '&w=1600',
            webpUrl: dados.url + '&fm=webp',
            altPt: dados.alt,
            altEn: dados.alt,
            altEs: dados.alt,
            altFr: dados.alt,
          }
        })
        console.log(`   ✅ ${projeto.title} → Imagem atualizada`)
      } else {
        // Criar novo Media e associar
        const media = await prisma.media.create({
          data: {
            type: 'IMAGE',
            originalUrl: dados.url,
            thumbnailUrl: dados.url + '&w=400',
            mediumUrl: dados.url + '&w=800',
            largeUrl: dados.url + '&w=1600',
            webpUrl: dados.url + '&fm=webp',
            width: 1200,
            height: 800,
            altPt: dados.alt,
            altEn: dados.alt,
            altEs: dados.alt,
            altFr: dados.alt,
          }
        })

        await prisma.project.update({
          where: { id: projeto.id },
          data: { heroImageId: media.id }
        })
        console.log(`   ✅ ${projeto.title} → Nova imagem criada`)
      }

      atualizados++
    } catch (error) {
      console.error(`   ❌ Erro em "${slug}":`, error.message)
      erros++
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ Atualizados: ${atualizados}`)
  console.log(`   ⏭️  Ignorados: ${ignorados}`)
  console.log(`   ❌ Erros: ${erros}`)

  // Listar status final
  console.log('\n📋 Projetos no banco:')
  const todos = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { priorityHome: 'asc' },
    include: { heroImage: true }
  })

  todos.forEach(p => {
    const temImg = p.heroImage ? '✅' : '⚠️ '
    const fonte = p.heroImage?.originalUrl?.includes('youtube') 
      ? '(YouTube)' 
      : p.heroImage?.originalUrl?.includes('unsplash')
        ? '(Unsplash)'
        : '(Própria)'
    console.log(`   ${temImg} ${p.title} ${fonte}`)
  })

  console.log('\n✅ Concluído!\n')
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
// 1. Edite este arquivo e cole as URLs das imagens reais
// 2. Execute:
//    cd azimut-cms
//    node migrations/atualizar-com-midias-reais.js
// ════════════════════════════════════════════════════════════

