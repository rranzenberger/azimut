/**
 * API para Status da Carteira Web3
 * Usa Settings (banco) com fallback em variáveis de ambiente
 */

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { getWeb3WalletConfig } from '@/src/lib/web3-settings'

const RPC_TIMEOUT_MS = 15000
const DEFAULT_RPC = 'https://polygon-rpc.com'

function notConfiguredResponse(config: Awaited<ReturnType<typeof getWeb3WalletConfig>>, rpcUrl: string) {
  const hasPrivateKey = !!config.companyWalletPrivateKey?.trim() || !!process.env.COMPANY_WALLET_PRIVATE_KEY?.trim()
  return NextResponse.json({
    address: '',
    balance: '0.0000',
    network: 'Não configurado',
    recentTransactions: 0,
    totalRewardsSent: 0,
    totalPaymentsReceived: 0,
    estimatedGasCost: '0.001000 ETH/MATIC',
    note: 'Preencha o endereço público da carteira e o contrato NFT abaixo, depois clique em Salvar.',
    setupStatus: {
      addressConfigured: false,
      privateKeyConfigured: hasPrivateKey,
      canSendTransactions: false,
      canReceivePayments: false,
    },
    setupMessage: 'Preencha o endereço público da carteira (0x...) e o endereço do contrato NFT abaixo. Salve e atualize o status.',
    config: {
      web3RpcUrl: rpcUrl,
      web3NftContractAddress: config.web3NftContractAddress || null,
      web3StudentRewardContractAddress: config.web3StudentRewardContractAddress || null,
    },
  })
}

export async function GET(request: NextRequest) {
  try {
    let config: Awaited<ReturnType<typeof getWeb3WalletConfig>>
    try {
      config = await getWeb3WalletConfig()
    } catch (e) {
      console.error('[Wallet Status] getWeb3WalletConfig:', e)
      config = {
        companyWalletAddress: process.env.COMPANY_WALLET_ADDRESS?.trim() || null,
        companyWalletPrivateKey: process.env.COMPANY_WALLET_PRIVATE_KEY?.trim() || null,
        web3RpcUrl: process.env.RPC_URL?.trim() || DEFAULT_RPC,
        web3NftContractAddress: process.env.NFT_CONTRACT_ADDRESS?.trim() || null,
        web3StudentRewardContractAddress: process.env.STUDENT_REWARD_CONTRACT_ADDRESS?.trim() || null,
      }
    }
    const addressRaw = config.companyWalletAddress?.trim() ?? ''
    const rpcUrl = config.web3RpcUrl?.trim() || DEFAULT_RPC

    if (!addressRaw) {
      return notConfiguredResponse(config, rpcUrl)
    }

    const address = addressRaw.trim()
    if (!ethers.isAddress(address)) {
      const hasPrivateKey = !!config.companyWalletPrivateKey?.trim() || !!process.env.COMPANY_WALLET_PRIVATE_KEY?.trim()
      return NextResponse.json({
        address: '',
        balance: '0.0000',
        network: 'Endereço inválido',
        recentTransactions: 0,
        totalRewardsSent: 0,
        totalPaymentsReceived: 0,
        estimatedGasCost: '0.001000 ETH/MATIC',
        note: 'Corrija o endereço no formulário abaixo.',
        setupStatus: {
          addressConfigured: false,
          privateKeyConfigured: hasPrivateKey,
          canSendTransactions: false,
          canReceivePayments: false,
        },
        setupMessage: 'Endereço inválido. Use um endereço Ethereum válido (0x seguido de 40 caracteres hex).',
        config: {
          web3RpcUrl: rpcUrl,
          web3NftContractAddress: config.web3NftContractAddress || null,
          web3StudentRewardContractAddress: config.web3StudentRewardContractAddress || null,
        },
      })
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl)

    const balancePromise = provider.getBalance(address)
    const balance = await Promise.race([
      balancePromise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout ao conectar na rede (RPC). Verifique RPC URL.')), RPC_TIMEOUT_MS)
      ),
    ])
    const balanceFormatted = ethers.formatEther(balance)

    const network = await provider.getNetwork()
    const networkName = network.name === 'matic' ? 'Polygon Mainnet' : 
                       network.name === 'maticmum' ? 'Polygon Mumbai (Testnet)' :
                       network.name || 'Unknown'

    let estimatedGasCost = '0.001'
    try {
      const feeData = await provider.getFeeData()
      if (feeData?.gasPrice != null) {
        estimatedGasCost = ethers.formatEther(feeData.gasPrice * BigInt(21000))
      }
    } catch (_) {}

    const hasPrivateKey = !!config.companyWalletPrivateKey?.trim() || !!process.env.COMPANY_WALLET_PRIVATE_KEY?.trim()
    const setupStatus = {
      addressConfigured: true,
      privateKeyConfigured: hasPrivateKey,
      canSendTransactions: hasPrivateKey,
      canReceivePayments: true,
    }

    return NextResponse.json({
      address,
      balance: parseFloat(balanceFormatted).toFixed(4),
      network: networkName,
      recentTransactions: 0,
      totalRewardsSent: 0,
      totalPaymentsReceived: 0,
      estimatedGasCost: `${parseFloat(estimatedGasCost).toFixed(6)} ETH/MATIC`,
      note: 'Taxas são pagas à rede blockchain. Polygon é ~1000x mais barato que Ethereum.',
      setupStatus,
      setupMessage: !hasPrivateKey 
        ? 'Chave privada não configurada. Sistema funciona em modo leitura. Adicione na aba abaixo ou COMPANY_WALLET_PRIVATE_KEY na Vercel.'
        : 'Configuração completa! Sistema pronto para automação.',
      config: {
        web3RpcUrl: rpcUrl,
        web3NftContractAddress: config.web3NftContractAddress || null,
        web3StudentRewardContractAddress: config.web3StudentRewardContractAddress || null,
      },
    })
  } catch (error: unknown) {
    console.error('[Wallet Status] Erro:', error)
    // Nunca retornar 500: devolve 200 "não configurado" para a página carregar e mostrar o formulário
    const rpcUrl = process.env.RPC_URL?.trim() || DEFAULT_RPC
    return NextResponse.json({
      address: '',
      balance: '0.0000',
      network: 'Erro ao conectar',
      recentTransactions: 0,
      totalRewardsSent: 0,
      totalPaymentsReceived: 0,
      estimatedGasCost: '0.001000 ETH/MATIC',
      note: 'Preencha o endereço e o contrato NFT abaixo e salve. Se o erro continuar, verifique se as colunas Web3 existem no banco (rode azimut-cms/sql/populate_web3_settings.sql no Neon).',
      setupStatus: {
        addressConfigured: false,
        privateKeyConfigured: !!process.env.COMPANY_WALLET_PRIVATE_KEY?.trim(),
        canSendTransactions: false,
        canReceivePayments: false,
      },
      setupMessage: 'Erro ao carregar status. Preencha os dados abaixo e clique em Salvar. Depois clique em Atualizar status.',
      config: {
        web3RpcUrl: rpcUrl,
        web3NftContractAddress: process.env.NFT_CONTRACT_ADDRESS?.trim() || null,
        web3StudentRewardContractAddress: process.env.STUDENT_REWARD_CONTRACT_ADDRESS?.trim() || null,
      },
    })
  }
}
