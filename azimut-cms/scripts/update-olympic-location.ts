/**
 * Script para atualizar LOCALIZAÇÃO e TAGS do Museu Olímpico do Rio
 * 
 * Localização:
 * - Cidade: Rio de Janeiro
 * - Estado: RJ
 * - País: Brasil
 * - Endereço: Velódromo, Parque Olímpico, Barra da Tijuca
 * - Próximo: Parque Rita Lee
 * 
 * Tags:
 * - Barra da Tijuca
 * - Parque Olímpico
 * - Velódromo
 * - Rio de Janeiro
 * - Museu
 * - Instalação Interativa
 * 
 * Execução: npx tsx scripts/update-olympic-location.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateOlympicLocation() {
  console.log('📍 ATUALIZANDO LOCALIZAÇÃO: MUSEU OLÍMPICO DO RIO\n')

  try {
    // 1. Buscar o projeto
    console.log('🔍 Buscando projeto...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      include: { tags: true }
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      console.error('💡 Execute primeiro: npx tsx scripts/add-olympic-museum-project.ts')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado:', project.title, '\n')

    // 2. Criar ou buscar tags de localização
    console.log('🏷️  Criando/buscando tags...\n')
    
    const tagSlugs = [
      'barra-da-tijuca',
      'parque-olimpico',
      'velodromo',
      'rio-de-janeiro',
      'museu',
      'instalacao-interativa',
      'parque-rita-lee'
    ]

    const tags = []
    for (const slug of tagSlugs) {
      let tag = await prisma.tag.findUnique({ where: { slug } })
      
      if (!tag) {
        // Criar tag baseado no slug
        const labels: Record<string, { pt: string; en: string; es: string; fr: string }> = {
          'barra-da-tijuca': {
            pt: 'Barra da Tijuca',
            en: 'Barra da Tijuca',
            es: 'Barra da Tijuca',
            fr: 'Barra da Tijuca'
          },
          'parque-olimpico': {
            pt: 'Parque Olímpico',
            en: 'Olympic Park',
            es: 'Parque Olímpico',
            fr: 'Parc Olympique'
          },
          'velodromo': {
            pt: 'Velódromo',
            en: 'Velodrome',
            es: 'Velódromo',
            fr: 'Vélodrome'
          },
          'rio-de-janeiro': {
            pt: 'Rio de Janeiro',
            en: 'Rio de Janeiro',
            es: 'Río de Janeiro',
            fr: 'Rio de Janeiro'
          },
          'museu': {
            pt: 'Museu',
            en: 'Museum',
            es: 'Museo',
            fr: 'Musée'
          },
          'instalacao-interativa': {
            pt: 'Instalação Interativa',
            en: 'Interactive Installation',
            es: 'Instalación Interactiva',
            fr: 'Installation Interactive'
          },
          'parque-rita-lee': {
            pt: 'Parque Rita Lee',
            en: 'Rita Lee Park',
            es: 'Parque Rita Lee',
            fr: 'Parc Rita Lee'
          }
        }

        const label = labels[slug] || { pt: slug, en: slug, es: slug, fr: slug }
        
        tag = await prisma.tag.create({
          data: {
            slug,
            labelPt: label.pt,
            labelEn: label.en,
            labelEs: label.es,
            labelFr: label.fr,
            category: 'OTHER' // Ou 'INDUSTRY' se preferir
          }
        })
        console.log(`   ✅ Tag criada: ${label.pt}`)
      } else {
        console.log(`   ⏭️  Tag já existe: ${tag.labelPt}`)
      }
      
      tags.push(tag)
    }

    console.log('')

    // 3. ATUALIZAR LOCALIZAÇÃO E TAGS
    console.log('✏️  Atualizando localização e tags...\n')

    // Buscar tags existentes do projeto para não perder
    const existingProject = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      include: { tags: true }
    })

    // Combinar tags existentes com novas tags de localização
    const allTagIds = [
      ...(existingProject?.tags.map(t => ({ id: t.id })) || []),
      ...tags.map(t => ({ id: t.id }))
    ]
    
    // Remover duplicatas
    const uniqueTags = Array.from(
      new Map(allTagIds.map(tag => [tag.id, tag])).values()
    )

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        // LOCALIZAÇÃO DETALHADA
        city: 'Rio de Janeiro',
        stateProvince: 'RJ',
        country: 'Brasil',
        
        // TAGS - Combinar tags existentes com novas tags de localização
        tags: {
          set: uniqueTags
        }
      }
    })

    console.log('✅ Localização atualizada:')
    console.log(`   📍 Cidade: Rio de Janeiro`)
    console.log(`   📍 Estado: RJ`)
    console.log(`   📍 País: Brasil`)
    console.log(`   📍 Local: Velódromo, Parque Olímpico, Barra da Tijuca`)
    console.log(`   📍 Próximo: Parque Rita Lee`)
    console.log('')
    console.log('✅ Tags associadas:')
    tags.forEach(tag => {
      console.log(`   🏷️  ${tag.labelPt}`)
    })

    console.log('\n' + '═'.repeat(50))
    console.log('🎉 Atualização concluída com sucesso!')
    console.log('═'.repeat(50) + '\n')

    console.log('💡 Próximos passos:')
    console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
    console.log('   2. As tags aparecerão na página do projeto')
    console.log('   3. A localização aparecerá nos metadados')

  } catch (error: any) {
    console.error('❌ Erro:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
updateOlympicLocation()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

