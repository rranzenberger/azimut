// ════════════════════════════════════════════════════════════
// SCRIPT: ATUALIZAR IMAGENS DOS PROJETOS COM URLS REAIS
// ════════════════════════════════════════════════════════════
// Data: 01/01/2026
// Objetivo: Substituir placeholders por imagens reais de alta qualidade
// Fonte: Unsplash (licença livre para uso comercial)
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Imagens reais de alta qualidade (Unsplash - uso comercial livre)
const imagensPorTipo = {
  'instalacao-imersiva': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    alt: 'Instalação imersiva com projeções interativas',
    width: 1200,
    height: 800
  },
  'exposicao-digital': {
    url: 'https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=1200&h=800&fit=crop',
    alt: 'Exposição digital com realidade aumentada',
    width: 1200,
    height: 800
  },
  'filme-vr-360': {
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=800&fit=crop',
    alt: 'Experiência de realidade virtual 360 graus',
    width: 1200,
    height: 800
  },
  'first-nation': {
    url: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=1200&h=800&fit=crop',
    alt: 'Projeto First Nation - Arte e cultura indígena',
    width: 1200,
    height: 800
  },
  'vr-amazonia': {
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    alt: 'Experiência VR Amazônia - Floresta tropical',
    width: 1200,
    height: 800
  },
  'senna-ativacoes': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    alt: 'Ativação Senna - Experiência interativa',
    width: 1200,
    height: 800
  },
  'van-gogh-la-fontaine': {
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop',
    alt: 'Exposição imersiva Van Gogh e La Fontaine',
    width: 1200,
    height: 800
  },
  'natal-cultural': {
    url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=800&fit=crop',
    alt: 'Natal Cultural com IA e animação',
    width: 1200,
    height: 800
  },
  'gramado-vr-ia': {
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=800&fit=crop',
    alt: 'Festival Gramado VR e IA',
    width: 1200,
    height: 800
  },
  'museu-rio-olimpico': {
    url: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&h=800&fit=crop',
    alt: 'Museu Rio Olímpico - Experiência interativa',
    width: 1200,
    height: 800
  }
}

async function main() {
  console.log('🎨 Atualizando imagens dos projetos com URLs reais...\n')

  // Buscar todos os projetos com placeholder
  const projetos = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
      heroImage: {
        originalUrl: {
          contains: 'placeholder'
        }
      }
    },
    include: {
      heroImage: true
    }
  })

  if (projetos.length === 0) {
    console.log('✅ Nenhum projeto com placeholder encontrado!')
    console.log('   Todos já têm imagens reais.\n')
    return
  }

  console.log(`📋 Encontrados ${projetos.length} projetos com placeholder:\n`)
  projetos.forEach(p => {
    console.log(`   • ${p.title} (${p.slug})`)
  })

  console.log(`\n🖼️  Substituindo por imagens reais de Unsplash...\n`)

  let atualizadas = 0
  let ignoradas = 0

  for (const projeto of projetos) {
    try {
      const imageData = imagensPorTipo[projeto.slug]

      if (!imageData) {
        console.log(`   ⏭️  "${projeto.slug}" - Sem imagem específica, mantendo placeholder`)
        ignoradas++
        continue
      }

      // Atualizar o registro Media existente
      await prisma.media.update({
        where: { id: projeto.heroImageId },
        data: {
          originalUrl: imageData.url,
          thumbnailUrl: imageData.url + '&w=400',
          mediumUrl: imageData.url + '&w=800',
          largeUrl: imageData.url + '&w=1600',
          webpUrl: imageData.url + '&fm=webp',
          width: imageData.width,
          height: imageData.height,
          altPt: imageData.alt,
          altEn: imageData.alt,
          altEs: imageData.alt,
          altFr: imageData.alt,
          format: 'JPEG',
          contentType: 'image/jpeg'
        }
      })

      console.log(`   ✅ ${projeto.title} → Imagem real atualizada`)
      atualizadas++
    } catch (error) {
      console.error(`   ❌ Erro em "${projeto.title}":`, error.message)
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ Imagens atualizadas: ${atualizadas}`)
  console.log(`   ⏭️  Mantidas (sem imagem específica): ${ignoradas}`)
  console.log(`   📦 Total processado: ${projetos.length}`)

  // Verificar resultado final
  console.log('\n📋 Status final dos projetos:')
  const todosProjetos = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { priorityHome: 'asc' },
    select: {
      slug: true,
      title: true,
      featured: true,
      heroImage: {
        select: {
          originalUrl: true
        }
      }
    }
  })

  todosProjetos.forEach(p => {
    const imgStatus = p.heroImage?.originalUrl
      ? (p.heroImage.originalUrl.includes('unsplash') 
          ? '🌐 Unsplash' 
          : (p.heroImage.originalUrl.includes('placeholder')
              ? '🎨 Placeholder'
              : '✅ Própria'))
      : '⚠️  SEM IMAGEM'
    const destaque = p.featured ? '⭐' : '  '
    console.log(`   ${destaque} ${p.title}`)
    console.log(`      ${imgStatus}`)
  })

  console.log('\n✅ Concluído!')
  console.log('\n💡 Próximo passo:')
  console.log('   • Testar o site: npm run dev')
  console.log('   • Acessar backoffice para substituir por imagens próprias')
  console.log('   • Imagens Unsplash são alta qualidade e uso comercial livre!\n')
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
// cd azimut-cms
// node migrations/atualizar-imagens-reais.js
// ════════════════════════════════════════════════════════════
//
// SOBRE AS IMAGENS:
// ✅ Fonte: Unsplash (https://unsplash.com)
// ✅ Licença: Uso comercial livre
// ✅ Qualidade: Alta resolução (1200x800)
// ✅ Otimizadas: WebP, múltiplos tamanhos
// ✅ Podem ser substituídas no backoffice depois
// ════════════════════════════════════════════════════════════

