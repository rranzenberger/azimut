/**
 * Script para ADICIONAR DATA DE LANÇAMENTO
 * 
 * Adiciona "Lançamento: Julho de 2025" nas descrições
 * 
 * Execução: npx tsx scripts/fix-olympic-launch-date.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixOlympicLaunchDate() {
  console.log('📅 ADICIONANDO DATA DE LANÇAMENTO: JULHO DE 2025\n')

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

    // 2. Função para adicionar data de lançamento
    const addLaunchDate = (text: string | null, lang: 'pt' | 'en' | 'es' | 'fr'): string | null => {
      if (!text) return null

      const launchDates = {
        pt: 'Lançamento: Julho de 2025',
        en: 'Launch: July 2025',
        es: 'Lanzamiento: Julio de 2025',
        fr: 'Lancement: Juillet 2025'
      }

      // Adicionar na Ficha Técnica se existir
      if (text.includes('## Ficha Técnica') || text.includes('## Technical Specifications')) {
        // Adicionar após o ano
        let updated = text.replace(/\*\*Ano\*\*: 2025/g, `**Ano**: 2025\n**${launchDates[lang]}**`)
        updated = updated.replace(/\*\*Year\*\*: 2025/g, `**Year**: 2025\n**${launchDates.en}**`)
        updated = updated.replace(/\*\*Año\*\*: 2025/g, `**Año**: 2025\n**${launchDates.es}**`)
        updated = updated.replace(/\*\*Année\*\*: 2025/g, `**Année**: 2025\n**${launchDates.fr}**`)
        return updated
      }

      // Se não houver ficha técnica, adicionar no final
      return text + `\n\n**${launchDates[lang]}**`
    }

    // 3. ATUALIZAR DESCRIÇÕES
    console.log('✏️  Adicionando data de lançamento...\n')

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        descriptionPt: addLaunchDate(project.descriptionPt, 'pt'),
        descriptionEn: addLaunchDate(project.descriptionEn, 'en'),
        descriptionEs: addLaunchDate(project.descriptionEs, 'es'),
        descriptionFr: addLaunchDate(project.descriptionFr, 'fr'),
      }
    })

    console.log('✅ Data de lançamento adicionada!\n')
    console.log('   PT: Lançamento: Julho de 2025')
    console.log('   EN: Launch: July 2025')
    console.log('   ES: Lanzamiento: Julio de 2025')
    console.log('   FR: Lancement: Juillet 2025\n')

    console.log('💡 Próximos passos:')
    console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
    console.log('   2. Verifique no site: /work/museu-olimpico-rio\n')

  } catch (error: any) {
    console.error('❌ Erro ao adicionar data de lançamento:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
fixOlympicLaunchDate()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

