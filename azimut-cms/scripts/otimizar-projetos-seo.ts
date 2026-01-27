/**
 * Script para Otimizar Projetos com IA
 * Chama Claude diretamente (sem fazer fetch HTTP)
 */

// Carregar variáveis de ambiente do arquivo .env
try {
  const { config } = require('dotenv')
  const { resolve } = require('path')
  const { existsSync } = require('fs')
  
  // Tentar múltiplos caminhos possíveis
  const possiblePaths = [
    resolve(__dirname, '../.env.local'), // .env.local tem prioridade
    resolve(__dirname, '../.env'),       // .env na pasta azimut-cms
    resolve(process.cwd(), '.env'),       // .env no diretório atual
    resolve(process.cwd(), '../.env'),   // .env um nível acima
  ]
  
  let loaded = false
  for (const envPath of possiblePaths) {
    if (existsSync(envPath)) {
      const result = config({ path: envPath })
      if (!result.error) {
        console.log(`✅ Carregado .env de: ${envPath}`)
        loaded = true
        break
      }
    }
  }
  
  if (!loaded) {
    console.warn('⚠️  Nenhum arquivo .env encontrado, usando variáveis de ambiente do sistema')
  }
} catch (e) {
  // Se dotenv não estiver instalado, continuar (pode estar no ambiente)
  console.warn('⚠️  dotenv não encontrado, usando variáveis de ambiente do sistema')
  console.warn(`   Erro: ${e}`)
}

import { prisma } from '../src/lib/prisma'
import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

// Debug: mostrar se a chave foi carregada (sem mostrar o valor completo)
if (ANTHROPIC_API_KEY) {
  console.log(`✅ ANTHROPIC_API_KEY encontrada: ${ANTHROPIC_API_KEY.substring(0, 15)}...`)
} else {
  console.error('❌ ERRO: ANTHROPIC_API_KEY não encontrada!')
  console.error('')
  console.error('📋 Como configurar:')
  console.error('   1. Crie um arquivo .env na pasta azimut-cms')
  console.error('   2. Adicione: ANTHROPIC_API_KEY=sua-chave-aqui')
  console.error('   3. Ou configure no Vercel (Settings → Environment Variables)')
  console.error('')
  console.error('🔍 Debug:')
  console.error(`   Diretório atual: ${process.cwd()}`)
  console.error(`   __dirname: ${__dirname}`)
  console.error(`   Variáveis de ambiente disponíveis: ${Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('API')).join(', ') || 'nenhuma'}`)
  console.error('')
  process.exit(1)
}

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

    // Tentar modelos disponíveis (mais recente primeiro)
    // Removidos modelos deprecados: claude-3-opus-20240229, claude-3-sonnet-20240229
    const models = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-haiku-20241022', // Modelo mais recente do Haiku
      'claude-3-haiku-20240307'    // Fallback para Haiku antigo
    ]
    
    let message
    let lastError
    
    for (const model of models) {
      try {
        console.log(`    Tentando modelo: ${model}`)
        message = await anthropic.messages.create({
          model: model,
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        })
        
        // Se chegou aqui, funcionou!
        break
      } catch (error: any) {
        lastError = error
        const errorMsg = error.message || JSON.stringify(error)
        // Se não for erro de modelo não encontrado, parar
        if (!errorMsg.includes('not_found') && !errorMsg.includes('404')) {
          throw error
        }
        // Caso contrário, tentar próximo modelo
        continue
      }
    }
    
    if (!message) {
      throw lastError || new Error('Nenhum modelo disponível')
    }

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
    const errorMsg = error.message || JSON.stringify(error)
    console.error(`  ❌ Erro ao otimizar ${project.slug} (${lang}):`, errorMsg)
    
    // Se for erro de autenticação, mostrar ajuda detalhada
    if (errorMsg.includes('authentication') || errorMsg.includes('api-key') || errorMsg.includes('401') || errorMsg.includes('invalid x-api-key')) {
      console.error(`     ⚠️  ERRO DE AUTENTICAÇÃO!`)
      console.error(`     🔑 Chave carregada: ${ANTHROPIC_API_KEY ? `${ANTHROPIC_API_KEY.substring(0, 15)}...` : 'NÃO ENCONTRADA'}`)
      console.error(`     💡 Verifique:`)
      console.error(`        1. Se a chave está correta no arquivo .env`)
      console.error(`        2. Se o arquivo .env está na pasta azimut-cms`)
      console.error(`        3. Se a chave não expirou ou foi revogada`)
      console.error(`        4. Tente obter uma nova chave em: https://console.anthropic.com/`)
    }
    
    return { error: errorMsg }
  }
}

async function main() {
  console.log('🚀 Iniciando otimização de projetos com IA...\n')
  
  // Verificar argumentos
  const args = process.argv.slice(2)
  const processAll = args.includes('--all') || args.includes('-a')
  const skipOptimized = args.includes('--skip-optimized') || args.includes('-s')
  const languages = args.includes('--multi-lang') || args.includes('-m') ? ['pt', 'en', 'es', 'fr'] : ['pt']
  
  if (processAll) {
    console.log('📋 Modo: Processar TODOS os projetos')
  } else {
    console.log('📋 Modo: Processar 10 projetos por vez')
  }
  
  if (skipOptimized) {
    console.log('⏭️  Pulando projetos já otimizados')
  }
  
  if (languages.length > 1) {
    console.log(`🌍 Idiomas: ${languages.join(', ')}`)
  } else {
    console.log(`🌍 Idioma: ${languages[0]}`)
  }
  
  console.log(`🔑 API Key configurada: ${ANTHROPIC_API_KEY ? '✅ Sim' : '❌ Não'}`)
  if (ANTHROPIC_API_KEY) {
    console.log(`   (Chave: ${ANTHROPIC_API_KEY.substring(0, 10)}...)`)
  }
  console.log('')

  // Verificar argumentos da linha de comando
  const args = process.argv.slice(2)
  const processAll = args.includes('--all') || args.includes('-a')
  const skipOptimized = args.includes('--skip-optimized') || args.includes('-s')
  const limit = processAll ? 1000 : 10 // Processar todos ou limitar a 10
  
  // Construir where clause
  const whereClause: any = {
    status: 'PUBLISHED',
  }
  
  // Se skipOptimized, pular projetos que já têm SEO
  if (skipOptimized) {
    whereClause.OR = [
      { seoTitlePt: null },
      { seoDescPt: null },
    ]
  }

  // Buscar projetos publicados
  const projects = await prisma.project.findMany({
    where: whereClause,
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
      seoTitlePt: true, // Incluir para verificar se já está otimizado
      seoDescPt: true,
    },
    take: limit,
    orderBy: {
      createdAt: 'desc', // Processar mais recentes primeiro
    },
  })

  console.log(`📊 Encontrados ${projects.length} projetos para otimizar\n`)

  const resultados = {
    otimizados: 0,
    erros: 0,
    semDescricao: 0,
  }

  for (const project of projects) {
    console.log(`\n📝 Otimizando: ${project.title} (${project.slug})`)
    
    // Verificar se já está otimizado (se não estiver pulando)
    if (!skipOptimized && project.seoTitlePt && project.seoDescPt) {
      console.log(`  ⏭️  Já otimizado, pulando...`)
      continue
    }
    
    // Otimizar para cada idioma solicitado
    const updateData: any = {}
    
    for (const lang of languages) {
      const analise = await otimizarProjeto(project, lang as 'pt' | 'en' | 'es' | 'fr')
      
      if (analise && !analise.error) {
        console.log(`  ✅ ${lang.toUpperCase()}: ${analise.keywords?.length || 0} keywords sugeridas`)
        console.log(`     Meta Title: ${analise.metaTitle?.substring(0, 60)}...`)
        console.log(`     Meta Description: ${analise.metaDescription?.substring(0, 80)}...`)
        
        // Preparar dados para atualização
        if (lang === 'pt') {
          updateData.seoTitlePt = analise.metaTitle || null
          updateData.seoDescPt = analise.metaDescription || null
          updateData.seoKeywords = analise.keywords || []
        } else if (lang === 'en') {
          updateData.seoTitleEn = analise.metaTitle || null
          updateData.seoDescEn = analise.metaDescription || null
        } else if (lang === 'es') {
          updateData.seoTitleEs = analise.metaTitle || null
          updateData.seoDescEs = analise.metaDescription || null
        } else if (lang === 'fr') {
          updateData.seoTitleFr = analise.metaTitle || null
          updateData.seoDescFr = analise.metaDescription || null
        }
        
        resultados.otimizados++
      } else if (analise?.error) {
        console.log(`  ⚠️  Erro ao processar ${lang.toUpperCase()}: ${analise.error}`)
        resultados.erros++
      } else {
        console.log(`  ⚠️  Sem descrição suficiente para ${lang.toUpperCase()}`)
        resultados.semDescricao++
      }
      
      // Aguardar entre idiomas
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    // Salvar no banco de dados (apenas se houver dados para salvar)
    if (Object.keys(updateData).length > 0) {
      try {
        await prisma.project.update({
          where: { id: project.id },
          data: updateData,
        })
        console.log(`     💾 Salvo no banco de dados`)
      } catch (dbError: any) {
        console.log(`     ⚠️  Erro ao salvar: ${dbError.message}`)
        resultados.erros++
      }
    }

    // Aguardar 1 segundo entre projetos para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 RESUMO:')
  console.log(`  ✅ Otimizados e salvos: ${resultados.otimizados}`)
  console.log(`  ⚠️  Sem descrição: ${resultados.semDescricao}`)
  console.log(`  ❌ Erros: ${resultados.erros}`)
  console.log('='.repeat(50))
  console.log('\n✅ SUCESSO! Todas as otimizações foram salvas automaticamente no banco de dados.')
  console.log(`   Idiomas processados: ${languages.join(', ')}`)
  console.log('   Campos atualizados: seoTitle*, seoDesc*, seoKeywords')
  console.log('   Você pode verificar no backoffice ou executar novamente para atualizar.\n')
  console.log('💡 Dicas:')
  console.log('   - Use --all ou -a para processar todos os projetos')
  console.log('   - Use --skip-optimized ou -s para pular projetos já otimizados')
  console.log('   - Use --multi-lang ou -m para otimizar todos os idiomas\n')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
