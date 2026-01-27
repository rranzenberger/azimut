/**
 * Script para Deploy do Smart Contract StudentReward
 * Incentiva estudantes no Canadá com retorno automático em crypto
 */

import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

dotenv.config({ path: join(process.cwd(), '.env') })

async function main() {
  console.log('🚀 Deployando contrato StudentReward...\n')

  // Configurações
  const RPC_URL = process.env.RPC_URL || 'https://polygon-rpc.com'
  const PRIVATE_KEY = process.env.COMPANY_WALLET_PRIVATE_KEY
  const COMPANY_WALLET = process.env.COMPANY_WALLET_ADDRESS

  if (!PRIVATE_KEY) {
    throw new Error('COMPANY_WALLET_PRIVATE_KEY não configurada no .env')
  }

  if (!COMPANY_WALLET) {
    throw new Error('COMPANY_WALLET_ADDRESS não configurada no .env')
  }

  // Parâmetros do contrato
  const REWARD_PERCENTAGE = 500 // 5% (500 basis points)
  const MIN_PROJECT_VALUE = ethers.parseEther('0.01') // Mínimo 0.01 ETH/MATIC

  // Conectar à blockchain
  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

  console.log('📋 Configurações:')
  console.log(`   Rede: ${RPC_URL}`)
  console.log(`   Carteira: ${wallet.address}`)
  console.log(`   Recompensa: ${REWARD_PERCENTAGE / 100}%`)
  console.log(`   Valor mínimo: ${ethers.formatEther(MIN_PROJECT_VALUE)} ETH/MATIC\n`)

  // Verificar saldo
  const balance = await provider.getBalance(wallet.address)
  console.log(`💰 Saldo: ${ethers.formatEther(balance)} ETH/MATIC`)

  if (balance < ethers.parseEther('0.1')) {
    console.warn('⚠️  Saldo baixo! Recomendado pelo menos 0.1 ETH/MATIC para deploy e taxas.\n')
  }

  // Ler bytecode do contrato (precisa compilar primeiro)
  // Por enquanto, vamos usar um deploy simplificado
  console.log('📦 Compilando contrato...')
  
  // Nota: Em produção, use Hardhat ou Foundry para compilar
  // Este é um exemplo simplificado
  const contractPath = join(process.cwd(), 'contracts', 'StudentReward.sol')
  
  try {
    const contractSource = readFileSync(contractPath, 'utf-8')
    console.log('✅ Contrato encontrado\n')
  } catch (error) {
    console.error('❌ Erro ao ler contrato. Certifique-se de que está compilado.')
    console.error('   Use: npx hardhat compile ou forge build\n')
    throw error
  }

  // ABI simplificado (apenas funções principais)
  const contractABI = [
    'constructor(address _companyWallet, uint256 _rewardPercentage, uint256 _minProjectValue)',
    'function registerProject(address _student, string memory _description) payable',
    'function registerProjectExternal(address _student, uint256 _value, string memory _description)',
    'function payReward(uint256 _projectId)',
    'function setRewardPercentage(uint256 _newPercentage)',
    'function getProject(uint256 _projectId) view returns (uint256, address, uint256, uint256, bool, uint256, string memory)',
  ]

  console.log('⚠️  NOTA: Para deploy real, você precisa:')
  console.log('   1. Compilar o contrato (npx hardhat compile)')
  console.log('   2. Obter o bytecode compilado')
  console.log('   3. Fazer deploy usando ethers.js\n')

  console.log('📝 Para fazer deploy manualmente:')
  console.log('   1. Use Remix IDE: https://remix.ethereum.org')
  console.log('   2. Cole o código do contrato')
  console.log('   3. Compile (Solidity 0.8.20)')
  console.log('   4. Deploy com parâmetros:')
  console.log(`      - _companyWallet: ${COMPANY_WALLET}`)
  console.log(`      - _rewardPercentage: ${REWARD_PERCENTAGE}`)
  console.log(`      - _minProjectValue: ${MIN_PROJECT_VALUE.toString()}`)
  console.log('   5. Copie o endereço do contrato deployado\n')

  console.log('✅ Script concluído!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })
