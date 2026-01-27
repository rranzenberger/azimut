/**
 * Script para testar se a chave da API está funcionando
 */

// Carregar variáveis de ambiente
try {
  const { config } = require('dotenv')
  const { resolve } = require('path')
  const { existsSync } = require('fs')
  
  const possiblePaths = [
    resolve(__dirname, '../.env.local'),
    resolve(__dirname, '../.env'),
    resolve(process.cwd(), '.env'),
    resolve(process.cwd(), '../.env'),
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
    console.warn('⚠️  Nenhum arquivo .env encontrado')
  }
} catch (e) {
  console.warn('⚠️  Erro ao carregar dotenv:', e)
}

import Anthropic from '@anthropic-ai/sdk'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

console.log('\n🔍 DIAGNÓSTICO DA CHAVE API\n')
console.log('='.repeat(60))

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY não encontrada!')
  console.error('')
  console.error('📋 Verifique:')
  console.error('   1. Arquivo .env existe na pasta azimut-cms?')
  console.error('   2. Linha ANTHROPIC_API_KEY= está presente?')
  console.error('   3. Não há espaços antes ou depois do =')
  console.error('')
  process.exit(1)
}

console.log(`✅ Chave encontrada: ${ANTHROPIC_API_KEY.substring(0, 20)}...`)
console.log(`   Tamanho: ${ANTHROPIC_API_KEY.length} caracteres`)
console.log(`   Formato: ${ANTHROPIC_API_KEY.startsWith('sk-ant-') ? '✅ Correto' : '⚠️  Formato inesperado'}`)
console.log('')

// Testar a chave fazendo uma requisição simples
console.log('🧪 Testando chave com requisição de teste...')
console.log('')

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
})

try {
  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 10,
    messages: [
      {
        role: 'user',
        content: 'Diga apenas "OK"',
      },
    ],
  })
  
  console.log('✅ SUCESSO! Chave API está funcionando!')
  console.log(`   Resposta: ${message.content[0].type === 'text' ? message.content[0].text : 'OK'}`)
  console.log('')
  console.log('💡 Você pode executar EXECUTAR_OTIMIZAR_SEO.bat agora!')
} catch (error: any) {
  console.error('❌ ERRO ao testar chave API!')
  console.error('')
  console.error(`   Erro: ${error.message || JSON.stringify(error)}`)
  console.error('')
  
  if (error.message?.includes('invalid x-api-key') || error.message?.includes('authentication')) {
    console.error('🔑 PROBLEMA: Chave API inválida ou expirada')
    console.error('')
    console.error('📋 Soluções:')
    console.error('   1. Verifique se copiou a chave completa (sem espaços)')
    console.error('   2. Obtenha uma nova chave em: https://console.anthropic.com/')
    console.error('   3. Verifique se a chave não foi revogada')
    console.error('   4. Certifique-se de que não há espaços ou quebras de linha')
    console.error('')
    console.error('💡 Como obter nova chave:')
    console.error('   1. Acesse: https://console.anthropic.com/settings/keys')
    console.error('   2. Clique em "Create Key"')
    console.error('   3. Copie a chave completa')
    console.error('   4. Cole no arquivo azimut-cms/.env')
    console.error('   5. Execute este script novamente para testar')
  } else if (error.message?.includes('rate_limit')) {
    console.error('⚠️  Limite de requisições excedido. Aguarde alguns minutos.')
  } else {
    console.error('⚠️  Erro desconhecido. Verifique sua conexão com a internet.')
  }
  
  process.exit(1)
}
