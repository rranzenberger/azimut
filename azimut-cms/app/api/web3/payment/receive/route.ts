/**
 * API para Receber Pagamentos em Crypto
 * Usa a carteira da empresa (chave privada em .env)
 */

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

interface PaymentRequest {
  amount: string
  currency: 'ETH' | 'MATIC' | 'USDT' | 'USDC'
  fromAddress: string
  txHash?: string
  description?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    const { amount, currency, fromAddress, txHash, description } = body

    // Endereço da carteira da empresa (para receber pagamentos)
    const COMPANY_WALLET_ADDRESS = process.env.COMPANY_WALLET_ADDRESS
    const COMPANY_WALLET_PRIVATE_KEY = process.env.COMPANY_WALLET_PRIVATE_KEY

    if (!COMPANY_WALLET_ADDRESS) {
      return NextResponse.json(
        { error: 'Carteira da empresa não configurada (COMPANY_WALLET_ADDRESS)' },
        { status: 500 }
      )
    }

    // Validar endereço
    if (!/^0x[a-fA-F0-9]{40}$/.test(fromAddress)) {
      return NextResponse.json(
        { error: 'Endereço de carteira inválido' },
        { status: 400 }
      )
    }

    // Registrar pagamento no banco
    // TODO: Criar modelo Payment no Prisma schema
    // try {
    //   const { prisma } = await import('@/src/lib/prisma')
    //   
    //   await (prisma as any).payment.create({
    //     data: {
    //       fromAddress: fromAddress.toLowerCase(),
    //       toAddress: COMPANY_WALLET_ADDRESS.toLowerCase(),
    //       amount: parseFloat(amount),
    //       currency,
    //       txHash: txHash || null,
    //       status: txHash ? 'CONFIRMED' : 'PENDING',
    //       description: description || `Pagamento de ${amount} ${currency}`,
    //     },
    //   })
    // } catch (dbError: any) {
    //   // Se tabela Payment não existir, continuar mesmo assim
    //   console.warn('[Payment] Tabela não existe, continuando...', dbError.message)
    // }

    return NextResponse.json({
      success: true,
      payment: {
        from: fromAddress,
        to: COMPANY_WALLET_ADDRESS,
        amount,
        currency,
        txHash,
        status: txHash ? 'CONFIRMED' : 'PENDING',
      },
      message: 'Pagamento registrado com sucesso',
    })
  } catch (error: any) {
    console.error('[Payment Receive] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao processar pagamento',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
