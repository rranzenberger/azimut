/**
 * API para Gerenciar Conexão de Carteira e Transações
 * Recebe pagamentos e distribui recompensas
 */

import { NextRequest, NextResponse } from 'next/server'

interface WalletConnectRequest {
  address: string
  chainId: number
  signature?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: WalletConnectRequest = await request.json()
    const { address, chainId, signature, message } = body

    if (!address) {
      return NextResponse.json(
        { error: 'Endereço da carteira é obrigatório' },
        { status: 400 }
      )
    }

    // Validar endereço Ethereum
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: 'Endereço de carteira inválido' },
        { status: 400 }
      )
    }

    // Salvar conexão de carteira (opcional: associar com usuário/lead)
    try {
      const { prisma } = await import('@/src/lib/prisma')
      
      // Buscar ou criar registro de carteira
      const wallet = await prisma.wallet.upsert({
        where: { address: address.toLowerCase() },
        update: {
          chainId,
          lastConnectedAt: new Date(),
        },
        create: {
          address: address.toLowerCase(),
          chainId,
          lastConnectedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        wallet: {
          address: wallet.address,
          chainId: wallet.chainId,
          connected: true,
        },
        message: 'Carteira conectada com sucesso',
      })
    } catch (dbError: any) {
      // Se tabela Wallet não existir, apenas retornar sucesso
      if (dbError.code === 'P2021' || dbError.message?.includes('does not exist')) {
        return NextResponse.json({
          success: true,
          wallet: {
            address: address.toLowerCase(),
            chainId,
            connected: true,
          },
          message: 'Carteira conectada (registro não salvo - tabela não existe)',
        })
      }
      throw dbError
    }
  } catch (error: any) {
    console.error('[Wallet Connect] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao conectar carteira',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
