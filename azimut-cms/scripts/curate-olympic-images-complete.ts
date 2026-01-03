/**
 * SCRIPT COMPLETO DE CUADORIA AUTOMÁTICA
 * 
 * Este script faz TUDO automaticamente:
 * 1. Busca TODAS as imagens do Museu Olímpico no banco
 * 2. Analisa cada uma com DeepSeek para detectar:
 *    - Categoria (jornal, instalações, ginástica, eventos, making-of)
 *    - TIER de impacto (1, 2, 3)
 *    - Tags relevantes (até 5 por imagem)
 *    - Público-alvo (governantes, centros-culturais, produtoras, etc.)
 *    - Descrições melhoradas em 4 idiomas
 *    - Relevância (0-100%)
 * 3. Cria/atualiza tags no banco
 * 4. Associa tags ao projeto
 * 5. Organiza por TIER e relevância
 * 6. Prepara para sistema de recomendação
 * 
 * INTEGRAÇÃO:
 * - Usa DeepSeek (já configurado)
 * - Integra com sistema de scoring (ai-scoring.ts)
 * - Tags são usadas para recomendações personalizadas
 * - Categorias aparecem automaticamente no frontend
 * 
 * Execução: npx tsx scripts/curate-olympic-images-complete.ts
 */

import { PrismaClient } from '@prisma/client'
import { analyzeImageWithAI } from '../lib/image-analysis'
import * as path from 'path'

const prisma = new PrismaClient()

interface AnalysisStats {
  total: number
  analyzed: number
  updated: number
  errors: number
  tagsCreated: number
  tagsAssociated: number
  byCategory: Record<string, number>
  byTier: { tier1: number; tier2: number; tier3: number }
  byAudience: Record<string, number>
}

async function curateOlympicImages() {
  console.log('🎯 CUADORIA AUTOMÁTICA COMPLETA - MUSEU OLÍMPICO DO RIO\n')
  console.log('🤖 Usando DeepSeek para análise inteligente\n')
  console.log('📊 Integrado com sistema de recomendação personalizada\n')

  const stats: AnalysisStats = {
    total: 0,
    analyzed: 0,
    updated: 0,
    errors: 0,
    tagsCreated: 0,
    tagsAssociated: 0,
    byCategory: {},
    byTier: { tier1: 0, tier2: 0, tier3: 0 },
    byAudience: {}
  }

  try {
    // 1. Buscar projeto e TODAS as imagens
    console.log('🔍 Buscando projeto e imagens no banco de dados...')
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
        },
        tags: true
      }
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      console.error('💡 Execute primeiro: npx tsx scripts/add-olympic-museum-project.ts')
      process.exit(1)
    }

    if (!project.gallery || project.gallery.length === 0) {
      console.log('⚠️  Nenhuma imagem encontrada no projeto.')
      console.log('💡 Adicione imagens primeiro com: npx tsx scripts/add-olympic-media-curated.ts')
      process.exit(0)
    }

    stats.total = project.gallery.length
    console.log(`✅ Encontradas ${stats.total} imagens no banco\n`)

    // 2. Analisar cada imagem com IA
    console.log('🤖 Iniciando análise com DeepSeek...\n')
    console.log('⏳ Isso pode levar alguns minutos...\n')

    const allTags = new Set<string>()
    const tagMap = new Map<string, string>() // slug -> label

    for (let i = 0; i < project.gallery.length; i++) {
      const projectMedia = project.gallery[i]
      const media = projectMedia.media
      
      if (media.type !== 'IMAGE') {
        console.log(`⏭️  [${i + 1}/${stats.total}] Pulando ${path.basename(media.originalUrl)} (não é imagem)`)
        continue
      }

      try {
        const filename = path.basename(media.originalUrl)
        console.log(`\n📸 [${i + 1}/${stats.total}] Analisando: ${filename}`)
        
        // Construir URL completa
        const imageUrl = media.originalUrl.startsWith('http')
          ? media.originalUrl
          : `https://backoffice.azmt.com.br${media.originalUrl}`
        
        const existingAlt = media.altPt || undefined

        // Analisar com DeepSeek
        console.log('   🤖 Consultando DeepSeek...')
        const analysis = await analyzeImageWithAI(imageUrl, filename, existingAlt)

        console.log(`   ✅ Categoria: ${analysis.category}`)
        console.log(`   ✅ TIER: ${analysis.tier}`)
        console.log(`   ✅ Tags detectadas: ${analysis.tags.length}`)
        console.log(`   ✅ Público-alvo: ${analysis.targetAudience.join(', ')}`)
        console.log(`   ✅ Relevância: ${analysis.relevance}%`)

        // Atualizar estatísticas
        stats.byCategory[analysis.category] = (stats.byCategory[analysis.category] || 0) + 1
        if (analysis.tier === 1) stats.byTier.tier1++
        else if (analysis.tier === 2) stats.byTier.tier2++
        else if (analysis.tier === 3) stats.byTier.tier3++
        
        analysis.targetAudience.forEach(aud => {
          stats.byAudience[aud] = (stats.byAudience[aud] || 0) + 1
        })

        // 3. Atualizar mídia com descrições melhoradas
        await prisma.media.update({
          where: { id: media.id },
          data: {
            altPt: analysis.description.pt,
            altEn: analysis.description.en,
            altEs: analysis.description.es,
            altFr: analysis.description.fr,
          }
        })
        console.log('   ✅ Descrições atualizadas (4 idiomas)')

        // 4. Criar/atualizar tags baseado na análise
        for (const tagLabel of analysis.tags.slice(0, 5)) {
          const tagSlug = tagLabel.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .substring(0, 50) // Limitar tamanho

          if (!tagMap.has(tagSlug)) {
            tagMap.set(tagSlug, tagLabel)
          }
          allTags.add(tagSlug)
        }

        // 5. Atualizar ordem baseado em TIER e relevância
        const orderScore = analysis.tier === 1 
          ? 10000 - analysis.relevance  // TIER 1: ordem alta
          : analysis.tier === 2 
          ? 5000 - analysis.relevance    // TIER 2: ordem média
          : 1000 - analysis.relevance    // TIER 3: ordem baixa

        await prisma.projectMedia.update({
          where: { id: projectMedia.id },
          data: {
            order: orderScore
          }
        })
        console.log(`   ✅ Ordem ajustada (TIER ${analysis.tier}, relevância ${analysis.relevance}%)`)

        stats.analyzed++
        stats.updated++

        // Delay para não sobrecarregar API
        if (i < project.gallery.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000)) // 1 segundo entre análises
        }

      } catch (error: any) {
        console.error(`   ❌ Erro ao analisar: ${error.message}`)
        if (error.stack) {
          console.error(`   Stack: ${error.stack.split('\n')[0]}`)
        }
        stats.errors++
      }
    }

    // 6. Criar todas as tags detectadas
    console.log('\n' + '═'.repeat(60))
    console.log('🏷️  CRIANDO/ATUALIZANDO TAGS...\n')

    const existingProjectTags = new Set(project.tags.map(t => t.slug))

    for (const tagSlug of allTags) {
      const tagLabel = tagMap.get(tagSlug) || tagSlug
      
      try {
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: {
            slug: tagSlug,
            labelPt: tagLabel,
            labelEn: tagLabel,
            labelEs: tagLabel,
            labelFr: tagLabel,
            category: 'OTHER'
          }
        })

        if (!existingProjectTags.has(tagSlug)) {
          await prisma.project.update({
            where: { id: project.id },
            data: {
              tags: {
                connect: { id: tag.id }
              }
            }
          })
          stats.tagsAssociated++
          console.log(`   ✅ Tag associada: ${tagLabel}`)
        } else {
          console.log(`   ⏭️  Tag já existe: ${tagLabel}`)
        }

        stats.tagsCreated++
      } catch (error: any) {
        console.error(`   ❌ Erro ao criar tag ${tagSlug}: ${error.message}`)
      }
    }

    // 7. Resumo completo
    console.log('\n' + '═'.repeat(60))
    console.log('📊 RESUMO COMPLETO DA CUADORIA:')
    console.log('═'.repeat(60))
    console.log(`\n📸 IMAGENS:`)
    console.log(`   Total no banco: ${stats.total}`)
    console.log(`   ✅ Analisadas: ${stats.analyzed}`)
    console.log(`   ✅ Atualizadas: ${stats.updated}`)
    console.log(`   ❌ Erros: ${stats.errors}`)

    console.log(`\n🏷️  TAGS:`)
    console.log(`   ✅ Criadas/atualizadas: ${stats.tagsCreated}`)
    console.log(`   ✅ Associadas ao projeto: ${stats.tagsAssociated}`)

    console.log(`\n📊 POR CATEGORIA:`)
    Object.entries(stats.byCategory).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} imagem(ns)`)
    })

    console.log(`\n⭐ POR TIER:`)
    console.log(`   TIER 1 (Máximo impacto): ${stats.byTier.tier1}`)
    console.log(`   TIER 2 (Alto impacto): ${stats.byTier.tier2}`)
    console.log(`   TIER 3 (Complementar): ${stats.byTier.tier3}`)

    console.log(`\n🎯 POR PÚBLICO-ALVO:`)
    Object.entries(stats.byAudience)
      .sort((a, b) => b[1] - a[1])
      .forEach(([aud, count]) => {
        console.log(`   ${aud}: ${count} imagem(ns)`)
      })

    console.log('\n' + '═'.repeat(60))
    console.log('🎉 CUADORIA COMPLETA!')
    console.log('═'.repeat(60) + '\n')

    if (stats.updated > 0) {
      console.log('💡 PRÓXIMOS PASSOS:')
      console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
      console.log('   2. Veja as tags criadas: /admin/tags')
      console.log('   3. Teste no site: /work/museu-olimpico-rio')
      console.log('   4. Filtros e seções aparecem automaticamente!')
      console.log('   5. Sistema de recomendação usa essas tags!')
    }

    console.log('\n🔄 INTEGRAÇÃO COM SISTEMA DE RECOMENDAÇÃO:')
    console.log('   ✅ Tags são usadas para scoring de interesse')
    console.log('   ✅ DeepSeek analisa comportamento do visitante')
    console.log('   ✅ Projetos recomendados baseados em tags')
    console.log('   ✅ Conteúdo personalizado por público-alvo\n')

  } catch (error: any) {
    console.error('\n❌ ERRO FATAL:', error)
    if (error.stack) {
      console.error('Stack:', error.stack)
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
curateOlympicImages()
  .then(() => {
    console.log('✅ Script concluído com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

