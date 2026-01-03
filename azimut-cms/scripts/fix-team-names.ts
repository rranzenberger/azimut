/**
 * Script para CORRIGIR NOMES DA EQUIPE nas descrições
 * 
 * - Ranz Ranzenberger → Ranz Enberger
 * - Alberto Barreto → Alberto Moura
 * 
 * Execução: npx tsx scripts/fix-team-names.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixTeamNames() {
  console.log('👥 CORRIGINDO NOMES DA EQUIPE\n')
  console.log('   Ranz Ranzenberger → Ranz Enberger')
  console.log('   Alberto Barreto → Alberto Moura')
  console.log('   Verificando todas as ocorrências...\n')

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

    // 2. Função para substituir nomes
    const replaceNames = (text: string | null): string | null => {
      if (!text) return null
      
      // Ranz Ranzenberger → Ranz Enberger
      let updated = text.replace(/Ranz Ranzenberger/g, 'Ranz Enberger')
      updated = updated.replace(/ranz ranzenberger/gi, 'Ranz Enberger')
      
      // Alberto Barreto → Alberto Moura
      updated = updated.replace(/Alberto Barreto/g, 'Alberto Moura')
      updated = updated.replace(/alberto barreto/gi, 'Alberto Moura')
      
      // Aickm → Aick Couto Pereira
      updated = updated.replace(/Aickm/g, 'Aick Couto Pereira')
      updated = updated.replace(/aickm/gi, 'Aick Couto Pereira')
      
      // Corrigir função para especificar "da Azimut"
      updated = updated.replace(/Aick Couto Pereira.*?Diretora de Arte(?! da Azimut)/g, 'Aick Couto Pereira - Diretora de Arte da Azimut')
      updated = updated.replace(/Aick Couto Pereira.*?Art Director(?! Azimut)/g, 'Aick Couto Pereira - Azimut Art Director')
      
      return updated
    }

    // 3. ATUALIZAR DESCRIÇÕES
    console.log('✏️  Atualizando nomes nas descrições...\n')

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        descriptionPt: replaceNames(project.descriptionPt),
        descriptionEn: replaceNames(project.descriptionEn),
        descriptionEs: replaceNames(project.descriptionEs),
        descriptionFr: replaceNames(project.descriptionFr),
      }
    })

    console.log('✅ Nomes corrigidos nas descrições!\n')

    // 4. Verificar resultado
    const updated = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      select: {
        descriptionPt: true,
      }
    })

    if (updated?.descriptionPt?.includes('Ranz Enberger')) {
      console.log('✅ Verificação: "Ranz Enberger" encontrado')
    }

    if (updated?.descriptionPt?.includes('Alberto Moura')) {
      console.log('✅ Verificação: "Alberto Moura" encontrado')
    }

    if (updated?.descriptionPt?.includes('Ranz Ranzenberger')) {
      console.log('⚠️  Aviso: Ainda há ocorrências de "Ranz Ranzenberger"')
    }

    if (updated?.descriptionPt?.includes('Alberto Barreto')) {
      console.log('⚠️  Aviso: Ainda há ocorrências de "Alberto Barreto"')
    }

    console.log('\n💡 Próximos passos:')
    console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
    console.log('   2. Verifique no site: /work/museu-olimpico-rio')
    console.log('   3. Os nomes devem aparecer corretamente\n')

  } catch (error: any) {
    console.error('❌ Erro ao corrigir nomes:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
fixTeamNames()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

