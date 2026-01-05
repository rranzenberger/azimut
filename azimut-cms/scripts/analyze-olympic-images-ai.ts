/**
 * Script para ANALISAR IMAGENS DO MUSEU OLÍMPICO com IA (DeepSeek)
 * 
 * Este script:
 * 1. Busca todas as imagens do projeto Museu Olímpico
 * 2. Analisa cada uma com DeepSeek para detectar:
 *    - Categoria automática
 *    - TIER de impacto
 *    - Tags relevantes
 *    - Público-alvo
 *    - Descrições melhoradas
 * 3. Atualiza o banco de dados com as informações
 * 
 * Execução: npx tsx scripts/analyze-olympic-images-ai.ts
 */

import { PrismaClient } from '@prisma/client'
import { analyzeImageWithAI } from '../lib/image-analysis'
import * as path from 'path'

const prisma = new PrismaClient()

async function analyzeOlympicImages() {
  console.log('🤖 ANÁLISE AUTOMÁTICA DE IMAGENS COM IA\n')
  console.log('📸 Analisando imagens do Museu Olímpico do Rio...\n')

  try {
    // 1. Buscar projeto e suas imagens
    console.log('🔍 Buscando projeto e imagens...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      include: {
        gallery: {
          include: {
            media: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      process.exit(1)
    }

    if (!project.gallery || project.gallery.length === 0) {
      console.log('⚠️  Nenhuma imagem encontrada no projeto.')
      console.log('💡 Adicione imagens primeiro com: npx tsx scripts/add-olympic-media-curated.ts')
      process.exit(0)
    }

    console.log(`✅ Encontradas ${project.gallery.length} imagens\n`)

    // 2. Analisar cada imagem
    let analyzed = 0
    let updated = 0
    let errors = 0

    for (const projectMedia of project.gallery) {
      const media = projectMedia.media
      
      if (media.type !== 'IMAGE') {
        console.log(`⏭️  Pulando ${media.originalUrl} (não é imagem)`)
        continue
      }

      try {
        console.log(`\n📸 Analisando: ${path.basename(media.originalUrl)}`)
        
        // Construir URL completa
        const imageUrl = media.originalUrl.startsWith('http')
          ? media.originalUrl
          : `https://backoffice.azmt.com.br${media.originalUrl}`
        
        const filename = path.basename(media.originalUrl)
        const existingAlt = media.altPt || undefined

        // Analisar com IA
        const analysis = await analyzeImageWithAI(imageUrl, filename, existingAlt)

        console.log(`   ✅ Categoria: ${analysis.category}`)
        console.log(`   ✅ TIER: ${analysis.tier}`)
        console.log(`   ✅ Tags: ${analysis.tags.join(', ')}`)
        console.log(`   ✅ Público: ${analysis.targetAudience.join(', ')}`)
        console.log(`   ✅ Relevância: ${analysis.relevance}%`)

        // Atualizar mídia com análise
        await prisma.media.update({
          where: { id: media.id },
          data: {
            altPt: analysis.description.pt,
            altEn: analysis.description.en,
            altEs: analysis.description.es,
            altFr: analysis.description.fr,
          }
        })

        // Criar/atualizar tags baseado na análise
        const tagSlugs = analysis.tags.map(tag => 
          tag.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        )

        for (const tagSlug of tagSlugs.slice(0, 5)) { // Máximo 5 tags
          const tag = await prisma.tag.upsert({
            where: { slug: tagSlug },
            update: {},
            create: {
              slug: tagSlug,
              labelPt: tagSlug,
              labelEn: tagSlug,
              labelEs: tagSlug,
              labelFr: tagSlug,
              category: 'OTHER'
            }
          })

          // Associar tag ao projeto (se ainda não estiver)
          await prisma.project.update({
            where: { id: project.id },
            data: {
              tags: {
                connect: { id: tag.id }
              }
            }
          })
        }

        // Atualizar ordem baseado em TIER (TIER 1 primeiro)
        await prisma.projectMedia.update({
          where: { id: projectMedia.id },
          data: {
            order: analysis.tier === 1 ? 1000 - analysis.relevance : 
                   analysis.tier === 2 ? 500 - analysis.relevance : 
                   100 - analysis.relevance
          }
        })

        analyzed++
        updated++

        // Pequeno delay para não sobrecarregar API
        await new Promise(resolve => setTimeout(resolve, 500))

      } catch (error: any) {
        console.error(`   ❌ Erro ao analisar: ${error.message}`)
        errors++
      }
    }

    // 3. Resumo
    console.log('\n' + '═'.repeat(60))
    console.log('📊 RESUMO DA ANÁLISE:')
    console.log(`   ✅ Analisadas: ${analyzed}`)
    console.log(`   ✅ Atualizadas: ${updated}`)
    console.log(`   ❌ Erros: ${errors}`)
    console.log('═'.repeat(60) + '\n')

    if (updated > 0) {
      console.log('💡 Próximos passos:')
      console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
      console.log('   2. As tags foram criadas/associadas automaticamente')
      console.log('   3. As descrições foram melhoradas com IA')
      console.log('   4. A ordem foi ajustada por TIER e relevância')
    }

  } catch (error: any) {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
analyzeOlympicImages()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

