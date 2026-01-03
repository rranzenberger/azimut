/**
 * Script para CORRIGIR TÍTULO do projeto
 * 
 * De: "Museu Olímpico do Rio"
 * Para: "Rio Museu Olímpico"
 * 
 * Execução: npx tsx scripts/fix-olympic-title.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixOlympicTitle() {
  console.log('✏️  CORRIGINDO TÍTULO: RIO MUSEU OLÍMPICO\n')

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
    console.log(`   Título atual: "${project.title}"`)
    console.log(`   Short title atual: "${project.shortTitle}"\n`)

    // 2. ATUALIZAR TÍTULO CORRETO
    console.log('✏️  Atualizando título...\n')

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        // TÍTULO CORRETO: "Rio Museu Olímpico"
        title: 'Direção Geral - Rio Museu Olímpico',
        shortTitle: 'Rio Museu Olímpico',
        
        // Atualizar summaries também para manter consistência
        summaryPt: project.summaryPt?.replace(/Museu Olímpico do Rio/g, 'Rio Museu Olímpico') || 
          'Direção Geral, Tecnologia e Coordenação do Rio Museu Olímpico. A Azimut foi convidada pela YDreams para assumir a gestão completa do projeto: cronograma, prazos, interface institucional, direção de tecnologia e audiovisual. Um projeto emblemático celebrando o legado olímpico do Rio 2016.',
        
        summaryEn: project.summaryEn?.replace(/Rio Olympic Museum/g, 'Rio Olympic Museum') || 
          'General Direction, Technology and Coordination of Rio Olympic Museum. Azimut was invited by YDreams to assume complete project management: schedule, deadlines, institutional interface, technology and audiovisual direction. An emblematic project celebrating the Olympic legacy of Rio 2016.',
        
        summaryEs: project.summaryEs?.replace(/Museo Olímpico de Río/g, 'Museo Olímpico de Río') || 
          'Dirección General, Tecnología y Coordinación del Museo Olímpico de Río. Azimut fue invitada por YDreams para asumir la gestión completa del proyecto: cronograma, plazos, interfaz institucional, dirección de tecnología y audiovisual. Un proyecto emblemático que celebra el legado olímpico de Río 2016.',
        
        summaryFr: project.summaryFr?.replace(/Musée Olympique de Rio/g, 'Musée Olympique de Rio') || 
          'Direction Générale, Technologie et Coordination du Musée Olympique de Rio. Azimut a été invitée par YDreams pour assumer la gestion complète du projet : calendrier, délais, interface institutionnelle, direction technologique et audiovisuelle. Un projet emblématique célébrant l\'héritage olympique de Rio 2016.',
      }
    })

    console.log('✅ Título atualizado com sucesso!\n')
    console.log('   Novo título: "Direção Geral - Rio Museu Olímpico"')
    console.log('   Novo short title: "Rio Museu Olímpico"\n')

    // 3. Verificar resultado
    const updated = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      select: {
        title: true,
        shortTitle: true,
      }
    })

    console.log('📋 Verificação:')
    console.log(`   Título: "${updated?.title}"`)
    console.log(`   Short title: "${updated?.shortTitle}"\n`)

    console.log('💡 Próximos passos:')
    console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
    console.log('   2. Verifique no site: /work/museu-olimpico-rio')
    console.log('   3. O título deve aparecer como "Rio Museu Olímpico"\n')

  } catch (error: any) {
    console.error('❌ Erro ao atualizar título:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
fixOlympicTitle()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

