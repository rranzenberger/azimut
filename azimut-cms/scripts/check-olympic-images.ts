/**
 * Script para VERIFICAR ONDE ESTÃO AS IMAGENS
 * 
 * Verifica:
 * 1. Imagens no banco de dados
 * 2. Se as pastas existem
 * 3. Se os arquivos físicos existem
 * 4. URLs das imagens
 * 
 * Execução: npx tsx scripts/check-olympic-images.ts
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function checkOlympicImages() {
  console.log('🔍 VERIFICANDO ONDE ESTÃO AS IMAGENS\n')

  try {
    // 1. Buscar projeto e galeria
    console.log('📊 Buscando projeto no banco de dados...')
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

    console.log(`✅ Projeto encontrado: ${project.title}\n`)

    // 2. Verificar galeria
    if (!project.gallery || project.gallery.length === 0) {
      console.log('⚠️  NENHUMA IMAGEM NO BANCO DE DADOS!\n')
      console.log('💡 Para adicionar imagens:')
      console.log('   1. Execute: npx tsx scripts/add-olympic-media-curated.ts')
      console.log('   2. Ou adicione via backoffice: /admin/projects/museu-olimpico-rio\n')
      process.exit(0)
    }

    console.log(`📸 Encontradas ${project.gallery.length} imagens no banco de dados\n`)

    // 3. Verificar pasta física
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'museu-olimpico')
    const uploadDirExists = fs.existsSync(uploadDir)

    console.log('📁 Verificando pasta física...')
    console.log(`   Caminho: ${uploadDir}`)
    console.log(`   Existe: ${uploadDirExists ? '✅ SIM' : '❌ NÃO'}\n`)

    if (!uploadDirExists) {
      console.log('⚠️  PASTA NÃO EXISTE!\n')
      console.log('💡 Criando pasta...')
      fs.mkdirSync(uploadDir, { recursive: true })
      console.log('✅ Pasta criada!\n')
    }

    // 4. Verificar cada imagem
    console.log('🔍 Verificando cada imagem:\n')
    console.log('═'.repeat(80))

    let foundCount = 0
    let missingCount = 0

    for (let i = 0; i < project.gallery.length; i++) {
      const projectMedia = project.gallery[i]
      const media = projectMedia.media

      console.log(`\n📸 [${i + 1}/${project.gallery.length}] ${path.basename(media.originalUrl)}`)
      console.log(`   ID: ${media.id}`)
      console.log(`   Tipo: ${media.type}`)
      console.log(`   Ordem: ${projectMedia.order}`)

      // Verificar URLs
      console.log(`\n   📍 URLs no banco:`)
      console.log(`      Original: ${media.originalUrl || '❌ não definida'}`)
      console.log(`      Thumbnail: ${media.thumbnailUrl || '❌ não definida'}`)
      console.log(`      Medium: ${media.mediumUrl || '❌ não definida'}`)
      console.log(`      Large: ${media.largeUrl || '❌ não definida'}`)

      // Verificar se arquivo existe
      if (media.originalUrl) {
        const filePath = path.join(process.cwd(), 'public', media.originalUrl)
        const fileExists = fs.existsSync(filePath)

        console.log(`\n   📂 Arquivo físico:`)
        console.log(`      Caminho: ${filePath}`)
        console.log(`      Existe: ${fileExists ? '✅ SIM' : '❌ NÃO'}`)

        if (fileExists) {
          const stats = fs.statSync(filePath)
          console.log(`      Tamanho: ${(stats.size / 1024).toFixed(2)} KB`)
          foundCount++
        } else {
          missingCount++
          console.log(`      ⚠️  ARQUIVO NÃO ENCONTRADO!`)
        }
      } else {
        missingCount++
        console.log(`\n   ⚠️  URL ORIGINAL NÃO DEFINIDA NO BANCO!`)
      }

      // Alt text
      if (media.altPt) {
        console.log(`\n   📝 Alt text (PT): ${media.altPt.substring(0, 60)}...`)
      }

      console.log('   ' + '-'.repeat(76))
    }

    // 5. Resumo
    console.log('\n' + '═'.repeat(80))
    console.log('📊 RESUMO:')
    console.log('═'.repeat(80))
    console.log(`\n📸 Total no banco: ${project.gallery.length}`)
    console.log(`✅ Arquivos encontrados: ${foundCount}`)
    console.log(`❌ Arquivos faltando: ${missingCount}`)
    console.log(`📁 Pasta existe: ${uploadDirExists ? '✅ SIM' : '❌ NÃO'}\n`)

    // 6. Recomendações
    if (missingCount > 0) {
      console.log('⚠️  PROBLEMAS ENCONTRADOS:\n')
      console.log('   1. Algumas imagens não têm arquivos físicos')
      console.log('   2. Ou URLs estão incorretas no banco\n')
      console.log('💡 SOLUÇÕES:\n')
      console.log('   1. Verifique se as imagens foram enviadas corretamente')
      console.log('   2. Execute: npx tsx scripts/add-olympic-media-curated.ts')
      console.log('   3. Ou adicione via backoffice: /admin/projects/museu-olimpico-rio\n')
    } else {
      console.log('✅ TUDO OK! Todas as imagens estão no lugar certo.\n')
    }

    // 7. Verificar API
    console.log('🌐 Verificando API:')
    console.log(`   URL: https://backoffice.azmt.com.br/api/public/project/museu-olimpico-rio?lang=pt`)
    console.log(`   Deve retornar ${project.gallery.length} imagens na galeria\n`)

  } catch (error: any) {
    console.error('❌ Erro:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
checkOlympicImages()
  .then(() => {
    console.log('✅ Verificação concluída!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

