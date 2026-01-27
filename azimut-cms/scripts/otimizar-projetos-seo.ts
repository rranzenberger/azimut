/**
 * Script para Otimizar Projetos com IA
 * Usa a API /api/seo/analyze para otimizar conteúdo de projetos
 */

import { prisma } from '../src/lib/prisma'

const API_URL = process.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

async function otimizarProjeto(project: any, lang: 'pt' | 'en' | 'es' | 'fr' = 'pt') {
  const descriptionField = `description${lang.charAt(0).toUpperCase() + lang.slice(1)}` as 'descriptionPt' | 'descriptionEn' | 'descriptionEs' | 'descriptionFr'
  const summaryField = `summary${lang.charAt(0).toUpperCase() + lang.slice(1)}` as 'summaryPt' | 'summaryEn' | 'summaryEs' | 'summaryFr'
  
  const description = project[descriptionField] || project[summaryField] || project.title
  
  if (!description || description.length < 20) {
    console.log(`  ⚠️  Projeto ${project.slug} (${lang}): Sem descrição suficiente`)
    return null
  }

  const content = `${project.title}\n\n${description}`
  
  try {
    const response = await fetch(`${API_URL}/api/seo/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        type: 'project',
        targetSearchEngines: ['google', 'bing'],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.success || !data.analysis) {
      throw new Error('Resposta inválida da API')
    }

    return data.analysis
  } catch (error: any) {
    console.error(`  ❌ Erro ao otimizar ${project.slug} (${lang}):`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Iniciando otimização de projetos com IA...\n')

  if (!ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY não configurada!')
    process.exit(1)
  }

  // Buscar projetos publicados
  const projects = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
    },
    select: {
      id: true,
      slug: true,
      title: true,
      descriptionPt: true,
      descriptionEn: true,
      descriptionEs: true,
      descriptionFr: true,
      summaryPt: true,
      summaryEn: true,
      summaryEs: true,
      summaryFr: true,
    },
    take: 10, // Limitar a 10 projetos por vez para não exceder limites da API
  })

  console.log(`📊 Encontrados ${projects.length} projetos para otimizar\n`)

  const resultados = {
    otimizados: 0,
    erros: 0,
    semDescricao: 0,
  }

  for (const project of projects) {
    console.log(`\n📝 Otimizando: ${project.title} (${project.slug})`)
    
    // Otimizar para português (prioridade)
    const analisePt = await otimizarProjeto(project, 'pt')
    
    if (analisePt) {
      console.log(`  ✅ PT: ${analisePt.keywords?.length || 0} keywords sugeridas`)
      console.log(`     Meta Title: ${analisePt.metaTitle?.substring(0, 60)}...`)
      console.log(`     Meta Description: ${analisePt.metaDescription?.substring(0, 80)}...`)
      
      // Aqui você pode salvar as sugestões no banco se quiser
      // Por enquanto, apenas exibimos
      
      resultados.otimizados++
    } else {
      resultados.semDescricao++
    }

    // Aguardar 1 segundo entre requisições para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 RESUMO:')
  console.log(`  ✅ Otimizados: ${resultados.otimizados}`)
  console.log(`  ⚠️  Sem descrição: ${resultados.semDescricao}`)
  console.log(`  ❌ Erros: ${resultados.erros}`)
  console.log('='.repeat(50))
  console.log('\n💡 DICA: As sugestões estão sendo exibidas acima.')
  console.log('   Para salvar no banco, modifique este script.\n')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
