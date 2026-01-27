/**
 * Script para verificar configuração da carteira Web3
 * Testa se endereço, chave privada e conexão estão funcionando
 */

import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Carregar .env
dotenv.config({ path: resolve(__dirname, '../.env') })

async function verificarCarteira() {
  console.log('🔍 Verificando configuração da carteira Web3...\n')

  // 1. Verificar variáveis de ambiente
  const COMPANY_WALLET_ADDRESS = process.env.COMPANY_WALLET_ADDRESS
  const COMPANY_WALLET_PRIVATE_KEY = process.env.COMPANY_WALLET_PRIVATE_KEY
  const RPC_URL = process.env.RPC_URL || 'https://polygon-rpc.com'

  console.log('📋 Variáveis de Ambiente:')
  console.log(`   COMPANY_WALLET_ADDRESS: ${COMPANY_WALLET_ADDRESS ? '✅ Configurado' : '❌ FALTANDO'}`)
  console.log(`   COMPANY_WALLET_PRIVATE_KEY: ${COMPANY_WALLET_PRIVATE_KEY ? '✅ Configurado' : '❌ FALTANDO'}`)
  console.log(`   RPC_URL: ${RPC_URL}\n`)

  if (!COMPANY_WALLET_ADDRESS) {
    console.error('❌ Erro: COMPANY_WALLET_ADDRESS não configurado no .env')
    process.exit(1)
  }

  if (!COMPANY_WALLET_PRIVATE_KEY) {
    console.error('❌ Erro: COMPANY_WALLET_PRIVATE_KEY não configurado no .env')
    console.error('   Adicione a chave privada no arquivo azimut-cms/.env')
    process.exit(1)
  }

  // 2. Validar formato do endereço
  console.log('🔎 Validando formato:')
  const isValidAddress = ethers.isAddress(COMPANY_WALLET_ADDRESS)
  console.log(`   Endereço válido: ${isValidAddress ? '✅' : '❌'}`)

  if (!isValidAddress) {
    console.error(`❌ Endereço inválido: ${COMPANY_WALLET_ADDRESS}`)
    process.exit(1)
  }

  // 3. Validar formato da chave privada
  let isValidPrivateKey = false
  try {
    // Tentar criar wallet com a chave privada
    const wallet = new ethers.Wallet(COMPANY_WALLET_PRIVATE_KEY)
    isValidPrivateKey = true
    console.log(`   Chave privada válida: ✅`)
    console.log(`   Endereço derivado da chave: ${wallet.address}`)
    
    // Verificar se o endereço da chave corresponde ao endereço configurado
    if (wallet.address.toLowerCase() !== COMPANY_WALLET_ADDRESS.toLowerCase()) {
      console.warn(`   ⚠️  ATENÇÃO: O endereço da chave privada (${wallet.address}) não corresponde ao COMPANY_WALLET_ADDRESS (${COMPANY_WALLET_ADDRESS})`)
    } else {
      console.log(`   ✅ Endereço corresponde à chave privada`)
    }
  } catch (error: any) {
    console.error(`   Chave privada válida: ❌`)
    console.error(`   Erro: ${error.message}`)
    process.exit(1)
  }

  // 4. Testar conexão com blockchain
  console.log('\n🌐 Testando conexão com blockchain:')
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const network = await provider.getNetwork()
    console.log(`   Rede: ${network.name} (Chain ID: ${network.chainId})`)
    
    // Obter saldo
    const balance = await provider.getBalance(COMPANY_WALLET_ADDRESS)
    const balanceFormatted = ethers.formatEther(balance)
    console.log(`   Saldo: ${parseFloat(balanceFormatted).toFixed(4)} MATIC`)
    
    if (balance === BigInt(0)) {
      console.warn(`   ⚠️  ATENÇÃO: Carteira sem fundos! Adicione MATIC para pagar taxas.`)
    } else {
      console.log(`   ✅ Carteira com fundos`)
    }

    // Estimar taxa de gas
    const gasPrice = await provider.getFeeData()
    if (gasPrice.gasPrice) {
      const estimatedGas = ethers.formatEther(gasPrice.gasPrice * BigInt(21000))
      console.log(`   Taxa estimada por transação: ~${parseFloat(estimatedGas).toFixed(6)} MATIC`)
    }

    console.log('\n✅ Configuração completa e funcionando!')
    console.log('\n📝 Próximos passos:')
    console.log('   1. Acesse /admin/web3/wallet-status no backoffice')
    console.log('   2. Teste conectar uma carteira no site público')
    console.log('   3. Configure os smart contracts (quando necessário)')

  } catch (error: any) {
    console.error(`   ❌ Erro ao conectar: ${error.message}`)
    console.error(`   Verifique se a RPC_URL está correta: ${RPC_URL}`)
    process.exit(1)
  }
}

verificarCarteira().catch(console.error)
