// ════════════════════════════════════════════════════════════
// SCRIPT: APAGAR DADOS DE TESTE DO BANCO DE DADOS
// ════════════════════════════════════════════════════════════
// 
// USO:
//   npx tsx scripts/delete-test-data.ts
//
// ⚠️ ATENÇÃO: Este script apaga TODOS os dados que começam
//    com o prefixo TESTE_
//
// ════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TEST_PREFIX = 'TESTE_'

async function deleteTestData() {
  console.log('🗑️  Iniciando remoção de dados de teste...')
  console.log(`📌 Prefixo: ${TEST_PREFIX}`)
  console.log('')

  try {
    // Encontrar todas as sessões de teste
    const testSessions = await prisma.visitorSession.findMany({
      where: {
        OR: [
          { sessionId: { startsWith: TEST_PREFIX } },
          { visitorFingerprint: { startsWith: TEST_PREFIX } },
          { utmCampaign: { startsWith: TEST_PREFIX } },
        ],
      },
      select: { sessionId: true },
    })

    const sessionIds = testSessions.map(s => s.sessionId)
    const count = sessionIds.length

    console.log(`📊 Encontradas ${count} sessões de teste`)
    console.log('')

    if (count === 0) {
      console.log('✅ Nenhum dado de teste encontrado!')
      return
    }

    // Apagar em ordem (respeitando foreign keys)
    console.log('🗑️  Apagando dados relacionados...')

    // 1. Apagar InterestScore
    const deletedInterestScores = await prisma.interestScore.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })
    console.log(`   ✅ ${deletedInterestScores.count} InterestScore(s) apagado(s)`)

    // 2. Apagar PWAInstall
    const deletedPWAInstalls = await prisma.pWAInstall.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })
    console.log(`   ✅ ${deletedPWAInstalls.count} PWAInstall(s) apagado(s)`)

    // 3. Apagar VisitorBehavior
    const deletedBehaviors = await prisma.visitorBehavior.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })
    console.log(`   ✅ ${deletedBehaviors.count} VisitorBehavior(s) apagado(s)`)

    // 4. Apagar PageView
    const deletedPageViews = await prisma.pageView.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })
    console.log(`   ✅ ${deletedPageViews.count} PageView(s) apagado(s)`)

    // 5. Apagar VisitorSession
    const deletedSessions = await prisma.visitorSession.deleteMany({
      where: { sessionId: { in: sessionIds } },
    })
    console.log(`   ✅ ${deletedSessions.count} VisitorSession(s) apagado(s)`)

    console.log('')
    console.log('✅ Todos os dados de teste foram apagados!')
    console.log(`📊 Total removido: ${count} sessões`)

  } catch (error) {
    console.error('❌ Erro ao apagar dados de teste:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

deleteTestData()
  .then(() => {
    console.log('✅ Processo concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  })
