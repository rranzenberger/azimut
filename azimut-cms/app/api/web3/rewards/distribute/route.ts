/**
 * API para Distribuir Recompensas (NFTs, Tokens)
 * Quando cliente ganha, distribui automaticamente
 */

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

interface RewardRequest {
  toAddress: string
  rewardType: 'NFT' | 'TOKEN' | 'ETH'
  amount?: string // Para tokens/ETH
  nftId?: string // Para NFTs
  description?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RewardRequest = await request.json()
    const { toAddress, rewardType, amount, nftId, description } = body

    // Endereço da carteira da empresa (para enviar recompensas)
    const COMPANY_WALLET_ADDRESS = process.env.COMPANY_WALLET_ADDRESS
    const COMPANY_WALLET_PRIVATE_KEY = process.env.COMPANY_WALLET_PRIVATE_KEY
    const RPC_URL = process.env.RPC_URL || 'https://polygon-rpc.com'

    if (!COMPANY_WALLET_ADDRESS) {
      return NextResponse.json(
        { 
          error: 'Carteira da empresa não configurada',
          message: 'Configure COMPANY_WALLET_ADDRESS no .env',
          setupRequired: true
        },
        { status: 500 }
      )
    }

    if (!COMPANY_WALLET_PRIVATE_KEY) {
      return NextResponse.json(
        { 
          error: 'Chave privada não configurada',
          message: 'Para enviar recompensas automaticamente, configure COMPANY_WALLET_PRIVATE_KEY no .env',
          setupRequired: true,
          canReceiveOnly: true,
          note: 'O sistema pode receber pagamentos, mas não pode enviar recompensas sem a chave privada. Veja COMO_ADICIONAR_CHAVE_PRIVADA_ENV.md para configurar.'
        },
        { status: 500 }
      )
    }

    // Validar endereço
    if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
      return NextResponse.json(
        { error: 'Endereço de carteira inválido' },
        { status: 400 }
      )
    }

    let txHash: string | null = null
    let error: string | null = null

    try {
      // Conectar à blockchain
      const provider = new ethers.JsonRpcProvider(RPC_URL)
      const wallet = new ethers.Wallet(COMPANY_WALLET_PRIVATE_KEY, provider)
      
      // Verificar saldo antes de enviar (para evitar falhas)
      const balance = await provider.getBalance(COMPANY_WALLET_ADDRESS)
      const minBalance = ethers.parseEther('0.01') // Mínimo 0.01 ETH/MATIC para taxas
      
      if (balance < minBalance) {
        return NextResponse.json(
          { 
            error: 'Saldo insuficiente na carteira da empresa',
            message: `Saldo atual: ${ethers.formatEther(balance)} ETH/MATIC. Mínimo necessário: 0.01 para cobrir taxas.`,
            requiredBalance: '0.01',
            currentBalance: ethers.formatEther(balance),
          },
          { status: 400 }
        )
      }

      if (rewardType === 'ETH' || rewardType === 'TOKEN') {
        // Enviar ETH ou tokens
        if (!amount) {
          return NextResponse.json(
            { error: 'Quantidade é obrigatória para ETH/TOKEN' },
            { status: 400 }
          )
        }

        const tx = await wallet.sendTransaction({
          to: toAddress,
          value: ethers.parseEther(amount),
        })

        txHash = tx.hash
      } else if (rewardType === 'NFT') {
        // Mint NFT (requer contrato NFT)
        const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
        
        if (!NFT_CONTRACT_ADDRESS) {
          return NextResponse.json(
            { error: 'Contrato NFT não configurado (NFT_CONTRACT_ADDRESS)' },
            { status: 500 }
          )
        }

        // ABI básico para mint NFT (ajustar conforme seu contrato)
        const nftAbi = [
          'function safeMint(address to, uint256 tokenId) public',
        ]

        const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, nftAbi, wallet)
        const tokenId = nftId || Date.now().toString()
        
        const tx = await nftContract.safeMint(toAddress, tokenId)
        txHash = tx.hash
      }

      // Registrar recompensa no banco
      try {
        const { prisma } = await import('@/src/lib/prisma')
        
        // TODO: Criar modelo Reward no Prisma schema
        // await (prisma as any).reward.create({
        //   data: {
        //     toAddress: toAddress.toLowerCase(),
        //     fromAddress: COMPANY_WALLET_ADDRESS.toLowerCase(),
        //     rewardType,
        //     amount: amount ? parseFloat(amount) : null,
        //     nftId: nftId || null,
        //     txHash,
        //     status: txHash ? 'SENT' : 'PENDING',
        //     description: description || `Recompensa: ${rewardType}`,
        //   },
        // })
      } catch (dbError: any) {
        console.warn('[Reward] Tabela não existe, continuando...', dbError.message)
      }

      // Obter estimativa de gas usado (para relatório)
      const receipt = await provider.getTransactionReceipt(txHash)
      const gasUsed = receipt?.gasUsed || null
      const gasPrice = receipt?.gasPrice || null
      const totalCost = gasUsed && gasPrice ? ethers.formatEther(gasUsed * gasPrice) : null

      return NextResponse.json({
        success: true,
        reward: {
          to: toAddress,
          type: rewardType,
          amount,
          nftId,
          txHash,
          status: 'SENT',
        },
        gasInfo: {
          gasUsed: gasUsed?.toString(),
          gasPrice: gasPrice?.toString(),
          totalCost: totalCost, // Custo total em ETH/MATIC
        },
        message: `Recompensa distribuída com sucesso. Taxa da rede: ${totalCost || 'calculando...'} ETH/MATIC`,
      })
    } catch (txError: any) {
      console.error('[Reward Distribution] Erro na transação:', txError)
      error = txError.message || 'Erro ao distribuir recompensa'
      
      // Registrar erro no banco
      try {
        const { prisma } = await import('@/src/lib/prisma')
        await prisma.reward.create({
          data: {
            toAddress: toAddress.toLowerCase(),
            fromAddress: COMPANY_WALLET_ADDRESS.toLowerCase(),
            rewardType,
            amount: amount ? parseFloat(amount) : null,
            nftId: nftId || null,
            txHash: null,
            status: 'FAILED',
            description: `Erro: ${error}`,
          },
        })
      } catch (dbError) {
        // Ignorar erro de banco
      }

      return NextResponse.json(
        {
          error: 'Erro ao distribuir recompensa',
          message: error,
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('[Reward Distribution] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao processar recompensa',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
