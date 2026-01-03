/**
 * Script para CORRIGIR ANO do projeto
 * 
 * De: 2016/2022
 * Para: 2025 (Lançamento: Julho de 2025)
 * 
 * Execução: npx tsx scripts/fix-olympic-year.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixOlympicYear() {
  console.log('📅 CORRIGINDO ANO: 2025 (Lançamento: Julho de 2025)\n')

  try {
    // 1. Buscar o projeto
    console.log('🔍 Buscando projeto...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado\n')
    console.log(`   Ano atual: ${project.year || 'não definido'}\n`)

    // 2. ATUALIZAR ANO
    console.log('✏️  Atualizando ano para 2025 (Lançamento: Julho de 2025)...\n')

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        year: 2025,
        
        // Atualizar também nas descrições
        descriptionPt: project.descriptionPt?.replace(/2016/g, '2025').replace(/2022/g, '2025').replace(/Rio 2016/g, 'Rio 2025') || null,
        descriptionEn: project.descriptionEn?.replace(/2016/g, '2025').replace(/2022/g, '2025').replace(/Rio 2016/g, 'Rio 2025') || null,
        descriptionEs: project.descriptionEs?.replace(/2016/g, '2025').replace(/2022/g, '2025').replace(/Río 2016/g, 'Río 2025') || null,
        descriptionFr: project.descriptionFr?.replace(/2016/g, '2025').replace(/2022/g, '2025').replace(/Rio 2016/g, 'Rio 2025') || null,
      }
    })

    console.log('✅ Ano atualizado com sucesso!\n')
    console.log('   Novo ano: 2025')
    console.log('   Lançamento: Julho de 2025\n')

    // 3. Verificar resultado
    const updated = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      select: {
        year: true,
      }
    })

    console.log('📋 Verificação:')
    console.log(`   Ano: ${updated?.year}\n`)

    if (updated?.year === 2025) {
      console.log('✅ Ano corrigido corretamente!\n')
    }

    console.log('💡 Próximos passos:')
    console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
    console.log('   2. Verifique no site: /work/museu-olimpico-rio')
    console.log('   3. O ano deve aparecer como 2025 (Lançamento: Julho de 2025)\n')

  } catch (error: any) {
    console.error('❌ Erro ao atualizar ano:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
fixOlympicYear()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

