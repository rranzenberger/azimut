/**
 * API para ler e atualizar configuração da carteira Web3 (trocar conta/chave pelo backoffice).
 * GET: retorna endereço e se chave está configurada (nunca retorna a chave).
 * POST: salva endereço e/ou chave privada (chave é criptografada).
 */

import { NextRequest, NextResponse } from 'next/server'
import { getWeb3WalletConfig, saveWeb3WalletConfig } from '@/src/lib/web3-settings'
import { ethers } from 'ethers'

export async function GET() {
  try {
    const config = await getWeb3WalletConfig()
    return NextResponse.json({
      companyWalletAddress: config.companyWalletAddress || null,
      privateKeyConfigured: !!config.companyWalletPrivateKey,
      web3RpcUrl: config.web3RpcUrl || null,
      web3NftContractAddress: config.web3NftContractAddress || null,
      web3StudentRewardContractAddress: config.web3StudentRewardContractAddress || null,
    })
  } catch (e: unknown) {
    console.error('[Web3 Settings GET]', e)
    return NextResponse.json(
      { error: 'Erro ao ler configuração', message: e instanceof Error ? e.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const address = typeof body.companyWalletAddress === 'string' ? body.companyWalletAddress.trim() : undefined
    const privateKey = typeof body.companyWalletPrivateKey === 'string' ? body.companyWalletPrivateKey.trim() : undefined
    const web3RpcUrl = typeof body.web3RpcUrl === 'string' ? body.web3RpcUrl.trim() : undefined
    const web3NftContractAddress = typeof body.web3NftContractAddress === 'string' ? body.web3NftContractAddress.trim() : undefined
    const web3StudentRewardContractAddress = typeof body.web3StudentRewardContractAddress === 'string' ? body.web3StudentRewardContractAddress.trim() : undefined

    if (address !== undefined && address !== '' && !ethers.isAddress(address)) {
      return NextResponse.json(
        { error: 'Endereço inválido. Deve ser um endereço Ethereum (0x...).' },
        { status: 400 }
      )
    }
    if (privateKey !== undefined && privateKey !== '') {
      if (!privateKey.startsWith('0x') || privateKey.length !== 66) {
        return NextResponse.json(
          { error: 'Chave privada inválida. Deve começar com 0x e ter 66 caracteres.' },
          { status: 400 }
        )
      }
    }
    if (web3NftContractAddress !== undefined && web3NftContractAddress !== '' && !ethers.isAddress(web3NftContractAddress)) {
      return NextResponse.json(
        { error: 'Endereço do contrato NFT inválido (0x...).' },
        { status: 400 }
      )
    }
    if (web3StudentRewardContractAddress !== undefined && web3StudentRewardContractAddress !== '' && !ethers.isAddress(web3StudentRewardContractAddress)) {
      return NextResponse.json(
        { error: 'Endereço do contrato StudentReward inválido (0x...).' },
        { status: 400 }
      )
    }

    await saveWeb3WalletConfig({
      companyWalletAddress: address === '' ? null : address,
      companyWalletPrivateKey: privateKey === '' ? null : privateKey,
      web3RpcUrl: web3RpcUrl === '' ? null : web3RpcUrl,
      web3NftContractAddress: web3NftContractAddress === '' ? null : web3NftContractAddress,
      web3StudentRewardContractAddress: web3StudentRewardContractAddress === '' ? null : web3StudentRewardContractAddress,
    })

    const config = await getWeb3WalletConfig()
    return NextResponse.json({
      success: true,
      companyWalletAddress: config.companyWalletAddress || null,
      privateKeyConfigured: !!config.companyWalletPrivateKey,
      web3RpcUrl: config.web3RpcUrl || null,
      web3NftContractAddress: config.web3NftContractAddress || null,
      web3StudentRewardContractAddress: config.web3StudentRewardContractAddress || null,
    })
  } catch (e: unknown) {
    console.error('[Web3 Settings POST]', e)
    return NextResponse.json(
      { error: 'Erro ao salvar', message: e instanceof Error ? e.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}
