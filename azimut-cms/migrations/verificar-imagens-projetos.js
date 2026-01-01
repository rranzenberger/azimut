// ════════════════════════════════════════════════════════════
// SCRIPT: VERIFICAR IMAGENS DOS PROJETOS
// ════════════════════════════════════════════════════════════
// Objetivo: Verificar se as imagens estão corretas no banco
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Verificando imagens dos projetos...\n')

  const projetos = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    include: { heroImage: true },
    orderBy: { priorityHome: 'asc' }
  })

  console.log(`📋 Total de projetos: ${projetos.length}\n`)

  projetos.forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.title} (${p.slug})`)
    
    if (p.heroImage) {
      console.log(`   ✅ Tem imagem hero`)
      console.log(`   📸 Original: ${p.heroImage.originalUrl?.substring(0, 80)}...`)
      console.log(`   📸 Large: ${p.heroImage.largeUrl?.substring(0, 80)}...`)
      console.log(`   📸 Medium: ${p.heroImage.mediumUrl?.substring(0, 80)}...`)
      console.log(`   📸 Thumbnail: ${p.heroImage.thumbnailUrl?.substring(0, 80)}...`)
    } else {
      console.log(`   ❌ SEM IMAGEM HERO`)
    }
    console.log('')
  })

  // Verificar se URLs são válidas
  console.log('\n🔗 Testando URLs...\n')
  
  for (const projeto of projetos) {
    if (projeto.heroImage?.originalUrl) {
      try {
        const url = new URL(projeto.heroImage.originalUrl)
        console.log(`✅ ${projeto.slug}: URL válida (${url.hostname})`)
      } catch (e) {
        console.log(`❌ ${projeto.slug}: URL inválida - ${projeto.heroImage.originalUrl}`)
      }
    }
  }
}

main()
  .catch(e => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

