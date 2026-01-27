/**
 * Script para Otimizar Projetos com IA
 * Usa a API /api/seo/analyze diretamente (sem fetch HTTP)
 */

import { prisma } from '../src/lib/prisma'
import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY || '',
})

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
    // Chamar Claude diretamente (sem fazer fetch HTTP)
    const prompt = `Você é um especialista em SEO para múltiplos buscadores: google, bing.

Analise o seguinte conteúdo e forneça recomendações de otimização:

CONTEÚDO:
${content}

TIPO: project

Forneça uma análise JSON com:
1. keywords: Array de 10-15 palavras-chave principais relevantes
2. metaTitle: Título otimizado (50-60 caracteres)
3. metaDescription: Descrição otimizada (150-160 caracteres)
4. headings: Sugestões de H1, H2, H3 otimizados
5. altTexts: Sugestões de alt texts descritivos para imagens
6. schemaOrg: Tipos de Schema.org recomendados (array)
7. improvements: Array de melhorias específicas
8. competitorAnalysis: Sugestões baseadas em melhores práticas
9. searchEngines: Otimizações específicas para cada buscador mencionado

IMPORTANTE:
- Otimize para google, bing
- Considere diferenças entre buscadores
- Foque em palavras-chave relevantes e naturais
- Priorize experiência do usuário
- Sugira Schema.org apropriado

Retorne APENAS JSON válido, sem markdown, sem explicações adicionais.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // Extrair resposta
    const responseText =
      message.content[0].type === 'text'
        ? message.content[0].text
        : JSON.stringify(message.content[0])

    // Tentar parsear JSON
    let analysis
    try {
      const cleaned = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      analysis = JSON.parse(cleaned)
    } catch (parseError) {
      analysis = {
        raw: responseText,
        error: 'Resposta não é JSON válido',
      }
    }

    return analysis
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
    
    if (analisePt && !analisePt.error) {
      console.log(`  ✅ PT: ${analisePt.keywords?.length || 0} keywords sugeridas`)
      console.log(`     Meta Title: ${analisePt.metaTitle?.substring(0, 60)}...`)
      console.log(`     Meta Description: ${analisePt.metaDescription?.substring(0, 80)}...`)
      
      resultados.otimizados++
    } else if (analisePt?.error) {
      console.log(`  ⚠️  Erro ao processar resposta da IA`)
      resultados.erros++
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
