// ════════════════════════════════════════════════════════════
// SCRIPT: POPULAR IMAGENS PLACEHOLDER NOS PROJETOS
// ════════════════════════════════════════════════════════════
// Data: 01/01/2026
// Objetivo: Adicionar imagens placeholder aos projetos sem heroImage
// Estratégia: Cria registro Media + associa ao projeto
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// URL de imagem placeholder (será substituída por upload real depois)
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/1200x800/1a1a1a/c92337?text=Aguardando+Imagem'

async function main() {
  console.log('🖼️  Iniciando população de imagens placeholder...\n')

  // Buscar todos os projetos PUBLICADOS sem heroImage
  const projetosSemImagem = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
      heroImageId: null
    },
    select: {
      id: true,
      slug: true,
      title: true
    }
  })

  if (projetosSemImagem.length === 0) {
    console.log('✅ Todos os projetos já têm imagem hero!')
    console.log('   Nada a fazer aqui.\n')
    return
  }

  console.log(`📋 Encontrados ${projetosSemImagem.length} projetos sem imagem hero:\n`)
  projetosSemImagem.forEach(p => {
    console.log(`   • ${p.title} (${p.slug})`)
  })

  console.log(`\n🎨 Criando imagens placeholder...\n`)

  let criadas = 0
  let erros = 0

  for (const projeto of projetosSemImagem) {
    try {
      // Criar registro de Media placeholder
      const media = await prisma.media.create({
        data: {
          type: 'IMAGE',
          originalUrl: PLACEHOLDER_IMAGE_URL,
          thumbnailUrl: PLACEHOLDER_IMAGE_URL,
          mediumUrl: PLACEHOLDER_IMAGE_URL,
          largeUrl: PLACEHOLDER_IMAGE_URL,
          width: 1200,
          height: 800,
          format: 'PNG',
          contentType: 'image/png',
          altPt: `Imagem placeholder para ${projeto.title}`,
          altEn: `Placeholder image for ${projeto.title}`,
          altEs: `Imagen placeholder para ${projeto.title}`,
          altFr: `Image placeholder pour ${projeto.title}`,
        }
      })

      // Associar ao projeto como heroImage
      await prisma.project.update({
        where: { id: projeto.id },
        data: { heroImageId: media.id }
      })

      console.log(`   ✅ ${projeto.title} → Imagem placeholder criada`)
      criadas++
    } catch (error) {
      console.error(`   ❌ Erro em "${projeto.title}":`, error.message)
      erros++
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ Imagens criadas: ${criadas}`)
  console.log(`   ❌ Erros: ${erros}`)
  console.log(`   📦 Total processado: ${projetosSemImagem.length}`)

  // Verificar resultado final
  console.log('\n📋 Status final dos projetos:')
  const todosProjetos = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { priorityHome: 'asc' },
    select: {
      slug: true,
      title: true,
      heroImageId: true,
      featured: true,
      heroImage: {
        select: {
          originalUrl: true
        }
      }
    }
  })

  todosProjetos.forEach(p => {
    const imgStatus = p.heroImageId 
      ? (p.heroImage?.originalUrl?.includes('placeholder') 
          ? '🎨 Placeholder' 
          : '✅ Imagem real')
      : '⚠️  SEM IMAGEM'
    const destaque = p.featured ? '⭐' : '  '
    console.log(`   ${destaque} ${p.title}`)
    console.log(`      ${imgStatus}`)
  })

  console.log('\n✅ Concluído!')
  console.log('\n💡 Próximo passo:')
  console.log('   1. Acesse o backoffice → Projetos')
  console.log('   2. Clique em cada projeto')
  console.log('   3. Faça upload da imagem hero real')
  console.log('   4. O placeholder será substituído automaticamente\n')
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
// node migrations/popular-imagens-placeholder.js
// ════════════════════════════════════════════════════════════
// 
// NOTA: Este script:
// ✅ Cria registros Media com URL placeholder
// ✅ Associa aos projetos sem heroImage
// ✅ NÃO sobrescreve imagens existentes
// ✅ Mantém estrutura visual do site intacta
// ✅ Depois, você pode substituir no backoffice
// ════════════════════════════════════════════════════════════

