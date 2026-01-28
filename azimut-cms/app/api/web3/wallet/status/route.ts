/**
 * API para Status da Carteira Web3
 * Retorna saldo, estatísticas e informações sobre taxas
 */

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

export async function GET(request: NextRequest) {
  try {
    const COMPANY_WALLET_ADDRESS = process.env.COMPANY_WALLET_ADDRESS
    const RPC_URL = process.env.RPC_URL || 'https://polygon-rpc.com'

    if (!COMPANY_WALLET_ADDRESS) {
      return NextResponse.json(
        { error: 'Carteira da empresa não configurada' },
        { status: 500 }
      )
    }

    // Conectar à blockchain
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    
    // Obter saldo
    const balance = await provider.getBalance(COMPANY_WALLET_ADDRESS)
    const balanceFormatted = ethers.formatEther(balance)

    // Obter network
    const network = await provider.getNetwork()
    const networkName = network.name === 'matic' ? 'Polygon Mainnet' : 
                       network.name === 'maticmum' ? 'Polygon Mumbai (Testnet)' :
                       network.name || 'Unknown'

    // Estatísticas do banco
    let totalRewardsSent = 0
    let totalPaymentsReceived = 0

    try {
      const { prisma } = await import('@/src/lib/prisma')
      
      // TODO: Criar modelo Reward no Prisma schema
      totalRewardsSent = 0 // Temporário até criar modelo Reward
      // totalRewardsSent = await (prisma as any).reward.count({
      //   where: {
      //     fromAddress: COMPANY_WALLET_ADDRESS.toLowerCase(),
      //     status: 'SENT',
      //   },
      // })

      // TODO: Criar modelo Payment no Prisma schema
      totalPaymentsReceived = 0 // Temporário até criar modelo Payment
      // totalPaymentsReceived = await (prisma as any).payment.count({
      //   where: {
      //     toAddress: COMPANY_WALLET_ADDRESS.toLowerCase(),
      //     status: 'CONFIRMED',
      //   },
      // })
    } catch (dbError) {
      // Ignorar se tabelas não existirem
      console.warn('[Wallet Status] Tabelas não existem ainda')
    }

    // Estimar taxa média (Polygon)
    const gasPrice = await provider.getFeeData()
    const estimatedGasCost = gasPrice.gasPrice 
      ? ethers.formatEther(gasPrice.gasPrice * BigInt(21000)) // Gas limit padrão para transfer
      : '0.001'

    // Verificar se chave privada está configurada
    const hasPrivateKey = !!process.env.COMPANY_WALLET_PRIVATE_KEY
    const setupStatus = {
      addressConfigured: !!COMPANY_WALLET_ADDRESS,
      privateKeyConfigured: hasPrivateKey,
      canSendTransactions: hasPrivateKey,
      canReceivePayments: !!COMPANY_WALLET_ADDRESS,
    }

    return NextResponse.json({
      address: COMPANY_WALLET_ADDRESS,
      balance: parseFloat(balanceFormatted).toFixed(4),
      network: networkName,
      recentTransactions: 0, // TODO: Implementar contagem de transações recentes
      totalRewardsSent,
      totalPaymentsReceived,
      estimatedGasCost: `${parseFloat(estimatedGasCost).toFixed(6)} ETH/MATIC`,
      note: 'Taxas são pagas à rede blockchain. Polygon é ~1000x mais barato que Ethereum.',
      setupStatus,
      setupMessage: !hasPrivateKey 
        ? 'Chave privada não configurada. Sistema funciona em modo leitura. Para automação completa, adicione COMPANY_WALLET_PRIVATE_KEY no .env'
        : 'Configuração completa! Sistema pronto para automação.',
    })
  } catch (error: any) {
    console.error('[Wallet Status] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao buscar status da carteira',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
