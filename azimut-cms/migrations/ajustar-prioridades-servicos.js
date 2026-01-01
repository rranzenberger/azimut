// ════════════════════════════════════════════════════════════
// SCRIPT: AJUSTAR PRIORIDADES DOS SERVIÇOS (SEM DELETAR NADA)
// ════════════════════════════════════════════════════════════
// Data: 01/01/2026
// Objetivo: Colocar os 6 serviços com 4 idiomas nas primeiras posições
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Ajustando prioridades dos serviços...\n')

  // Serviços prioritários (com 4 idiomas completos)
  const servicosPrioritarios = [
    { slug: 'cinema-audiovisual', novaPrioridade: 1 },
    { slug: 'animacao-2d-3d', novaPrioridade: 2 },
    { slug: 'xr-interatividade', novaPrioridade: 3 },
    { slug: 'ia-criativa', novaPrioridade: 4 },
    { slug: 'educacao-formacao', novaPrioridade: 5 },
    { slug: 'consultoria-estrategia', novaPrioridade: 6 }
  ]

  // Ajustar prioridades dos 6 principais
  console.log('📌 Ajustando os 6 serviços principais:\n')
  
  for (const servico of servicosPrioritarios) {
    try {
      const atualizado = await prisma.service.update({
        where: { slug: servico.slug },
        data: { priority: servico.novaPrioridade },
        select: { slug: true, titlePt: true, priority: true, icon: true }
      })
      console.log(`   ✅ ${atualizado.icon} ${atualizado.titlePt} → Prioridade ${atualizado.novaPrioridade}`)
    } catch (error) {
      console.log(`   ⚠️  Serviço "${servico.slug}" não encontrado, pulando...`)
    }
  }

  // Colocar os outros (antigos) nas posições 7+
  console.log('\n📋 Ajustando serviços secundários (mantendo todos):\n')
  
  const slugsPrioritarios = servicosPrioritarios.map(s => s.slug)
  
  const servicosSecundarios = await prisma.service.findMany({
    where: {
      slug: {
        notIn: slugsPrioritarios
      }
    },
    orderBy: { createdAt: 'asc' }
  })

  let prioridadeSecundaria = 7
  for (const servico of servicosSecundarios) {
    await prisma.service.update({
      where: { id: servico.id },
      data: { priority: prioridadeSecundaria }
    })
    console.log(`   📦 ${servico.icon || '❓'} ${servico.titlePt} → Prioridade ${prioridadeSecundaria}`)
    prioridadeSecundaria++
  }

  // Mostrar resultado final
  console.log('\n✅ Prioridades ajustadas! Ordem final:\n')
  
  const todosServicos = await prisma.service.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { priority: 'asc' },
    select: {
      priority: true,
      icon: true,
      titlePt: true,
      titleEn: true,
      titleEs: true,
      titleFr: true,
      slug: true
    }
  })

  todosServicos.forEach((s, index) => {
    const temIdiomas = s.titleEn && s.titleEs && s.titleFr ? '✅ 4 idiomas' : '⚠️  Idiomas incompletos'
    console.log(`   ${index + 1}. ${s.icon || '❓'} ${s.titlePt} (${s.slug}) - ${temIdiomas}`)
  })

  console.log(`\n📊 Total de serviços: ${todosServicos.length}`)
  console.log('✅ Concluído! Nada foi deletado, apenas reordenado.')
}

main()
  .catch(e => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// ════════════════════════════════════════════════════════════
// COMO EXECUTAR:
// ════════════════════════════════════════════════════════════
// cd azimut-cms
// node migrations/ajustar-prioridades-servicos.js
// ════════════════════════════════════════════════════════════

