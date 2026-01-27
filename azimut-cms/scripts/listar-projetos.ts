/**
 * Script para listar todos os projetos publicados com seus slugs
 */

import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('📋 Listando projetos disponíveis...\n')

  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        slug: true,
        title: true,
        seoTitlePt: true,
        seoDescPt: true,
        seoKeywords: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (projects.length === 0) {
      console.log('⚠️  Nenhum projeto publicado encontrado')
      return
    }

    console.log(`✅ Encontrados ${projects.length} projetos:\n`)
    console.log('='.repeat(80))

    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`)
      console.log(`   Slug: ${project.slug}`)
      console.log(`   URL: https://azmt.com.br/pt/work/${project.slug}`)
      
      if (project.seoTitlePt || project.seoDescPt) {
        console.log(`   ✅ SEO otimizado`)
        if (project.seoTitlePt) {
          console.log(`      Título: ${project.seoTitlePt.substring(0, 60)}...`)
        }
        if (project.seoDescPt) {
          console.log(`      Descrição: ${project.seoDescPt.substring(0, 60)}...`)
        }
        if (project.seoKeywords && project.seoKeywords.length > 0) {
          console.log(`      Keywords: ${project.seoKeywords.slice(0, 5).join(', ')}...`)
        }
      } else {
        console.log(`   ⚠️  SEO não otimizado ainda`)
      }
    })

    console.log('\n' + '='.repeat(80))
    console.log('\n💡 Para testar o SEO, use um dos slugs acima!')
    console.log(`   Exemplo: https://azmt.com.br/pt/work/${projects[0].slug}\n`)
  } catch (error) {
    console.error('❌ Erro ao buscar projetos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
