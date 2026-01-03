/**
 * Script para adicionar UMA ÚNICA imagem ao projeto Museu Olímpico
 * 
 * Útil quando você quer adicionar imagens individualmente
 * 
 * Uso: npx tsx scripts/add-single-image.ts <nome-do-arquivo.jpg>
 * 
 * Exemplo: npx tsx scripts/add-single-image.ts jornal-o-globo-capa.jpg
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function addSingleImage() {
  const filename = process.argv[2]

  if (!filename) {
    console.error('❌ Erro: Nome do arquivo não fornecido!')
    console.log('\n📖 Uso:')
    console.log('   npx tsx scripts/add-single-image.ts <nome-do-arquivo.jpg>')
    console.log('\n💡 Exemplo:')
    console.log('   npx tsx scripts/add-single-image.ts jornal-o-globo-capa.jpg')
    process.exit(1)
  }

  console.log(`📸 Adicionando imagem: ${filename}\n`)

  try {
    // 1. Buscar o projeto
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      console.error('💡 Execute primeiro: npx tsx scripts/add-olympic-museum-project.ts')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado:', project.title, '\n')

    // 2. Verificar se arquivo existe
    const baseUploadPath = path.join(process.cwd(), 'public', 'uploads', 'museu-olimpico')
    const filePath = path.join(baseUploadPath, filename)

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Arquivo não encontrado: ${filename}`)
      console.error(`   📍 Esperado em: ${filePath}`)
      console.error(`\n💡 Dica: Coloque o arquivo na pasta:`)
      console.error(`   ${baseUploadPath}`)
      process.exit(1)
    }

    console.log('✅ Arquivo encontrado!\n')

    // 3. Verificar se já existe
    const existingMedia = await prisma.media.findFirst({
      where: {
        originalUrl: {
          contains: filename
        }
      }
    })

    if (existingMedia) {
      console.log('⏭️  Esta imagem já foi adicionada anteriormente!')
      console.log(`   ID: ${existingMedia.id}`)
      process.exit(0)
    }

    // 4. Criar registro de mídia
    const mediaUrl = `/uploads/museu-olimpico/${filename}`
    
    // Detectar categoria e criar alt text básico
    let category = 'instalacoes'
    let altPt = `Imagem do Museu Olímpico do Rio - ${filename}`
    
    if (filename.toLowerCase().includes('jornal')) {
      category = 'jornal'
      altPt = `Capa do jornal O Globo sobre o Museu Olímpico do Rio - Crédito: Azimut`
    } else if (filename.toLowerCase().includes('ginastica')) {
      category = 'ginastica'
      altPt = `Área de Ginástica Artística do Museu Olímpico do Rio`
    } else if (filename.toLowerCase().includes('inauguracao') || filename.toLowerCase().includes('evento')) {
      category = 'eventos'
      altPt = `Evento no Museu Olímpico do Rio`
    } else if (filename.toLowerCase().includes('construcao') || filename.toLowerCase().includes('making')) {
      category = 'making-of'
      altPt = `Processo de construção do Museu Olímpico do Rio`
    }

    const media = await prisma.media.create({
      data: {
        type: 'IMAGE',
        originalUrl: mediaUrl,
        thumbnailUrl: mediaUrl,
        mediumUrl: mediaUrl,
        largeUrl: mediaUrl,
        altPt: altPt,
        altEn: `Rio Olympic Museum image - ${filename}`,
        altEs: `Imagen del Museo Olímpico de Río - ${filename}`,
        altFr: `Image du Musée Olympique de Rio - ${filename}`,
      }
    })

    console.log('✅ Mídia criada!')
    console.log(`   ID: ${media.id}`)
    console.log(`   Categoria detectada: ${category}\n`)

    // 5. Associar ao projeto
    await prisma.projectMedia.create({
      data: {
        projectId: project.id,
        mediaId: media.id,
        order: 999, // Ordem padrão (pode ajustar depois)
      }
    })

    console.log('✅ Imagem associada ao projeto!')
    console.log(`\n🎉 Sucesso! A imagem foi adicionada.`)
    console.log(`\n💡 Próximos passos:`)
    console.log(`   1. Verifique no site: /work/museu-olimpico-rio`)
    console.log(`   2. A imagem aparecerá na galeria`)
    console.log(`   3. Se necessário, ajuste o alt text no backoffice`)

  } catch (error: any) {
    console.error('❌ Erro:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
addSingleImage()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

