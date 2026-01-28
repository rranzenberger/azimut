/**
 * API para Registrar Projeto de Estudante e Pagar Recompensa
 * Integra com smart contract StudentReward
 */

import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

interface RegisterProjectRequest {
  studentAddress: string
  projectValue: string // Em ETH/MATIC
  description: string
  paymentMethod: 'direct' | 'external' // Direto via contrato ou externo
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterProjectRequest = await request.json()
    const { studentAddress, projectValue, description, paymentMethod } = body

    const COMPANY_WALLET_PRIVATE_KEY = process.env.COMPANY_WALLET_PRIVATE_KEY
    const RPC_URL = process.env.RPC_URL || 'https://polygon-rpc.com'
    const STUDENT_REWARD_CONTRACT = process.env.STUDENT_REWARD_CONTRACT_ADDRESS

    if (!COMPANY_WALLET_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Carteira da empresa não configurada' },
        { status: 500 }
      )
    }

    if (!STUDENT_REWARD_CONTRACT) {
      return NextResponse.json(
        { error: 'Contrato StudentReward não configurado. Configure STUDENT_REWARD_CONTRACT_ADDRESS no .env' },
        { status: 500 }
      )
    }

    // Validar endereço
    if (!/^0x[a-fA-F0-9]{40}$/.test(studentAddress)) {
      return NextResponse.json(
        { error: 'Endereço de carteira do estudante inválido' },
        { status: 400 }
      )
    }

    // Conectar à blockchain
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const wallet = new ethers.Wallet(COMPANY_WALLET_PRIVATE_KEY, provider)

    // ABI do contrato (funções principais)
    const contractABI = [
      'function registerProject(address _student, string memory _description) payable',
      'function registerProjectExternal(address _student, uint256 _value, string memory _description)',
      'function rewardPercentage() view returns (uint256)',
      'function getProject(uint256 _projectId) view returns (uint256, address, uint256, uint256, bool, uint256, string memory)',
      'event ProjectRegistered(uint256 indexed projectId, address indexed student, uint256 value, uint256 rewardAmount)',
    ]

    const contract = new ethers.Contract(STUDENT_REWARD_CONTRACT, contractABI, wallet)

    let txHash: string | null = null
    let projectId: number | null = null
    let rewardAmount: string | null = null
    let nftTokenId: string | null = null

    if (paymentMethod === 'direct') {
      // Pagamento direto via contrato (estudante envia crypto para o contrato)
      // O contrato automaticamente calcula e paga a recompensa
      const value = ethers.parseEther(projectValue)
      
      const tx = await contract.registerProject(studentAddress, description, { value })
      txHash = tx.hash
      
      // Aguardar confirmação
      const receipt = await tx.wait()
      
      // Buscar evento ProjectRegistered
      const event = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log)
          return parsed?.name === 'ProjectRegistered'
        } catch {
          return false
        }
      })

      if (event) {
        const parsed = contract.interface.parseLog(event)
        projectId = Number(parsed?.args[0])
        rewardAmount = ethers.formatEther(parsed?.args[3] || 0)
      }
      
      // Verificar se NFT foi mintado (aguardar um pouco para confirmação)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Tentar obter NFT mintado (se contrato NFT configurado)
      const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
      if (NFT_CONTRACT_ADDRESS && projectId) {
        try {
          const nftABI = [
            'function getNFTByProject(uint256 _projectId) view returns (uint256)',
            'function tokenURI(uint256 tokenId) view returns (string)',
          ]
          const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, nftABI, provider)
          const nftId = await nftContract.getNFTByProject(projectId)
          if (nftId && nftId > 0) {
            nftTokenId = nftId.toString()
          }
        } catch (nftError) {
          console.warn('[Student Reward] Erro ao verificar NFT:', nftError)
          // NFT é opcional, continuar mesmo se falhar
        }
      }
    } else {
      // Pagamento externo (registrar sem receber pagamento no contrato)
      const value = ethers.parseEther(projectValue)
      
      const tx = await contract.registerProjectExternal(studentAddress, value, description)
      txHash = tx.hash
      
      await tx.wait()
      
      // Obter porcentagem de recompensa
      const rewardPercentage = await contract.rewardPercentage()
      const rewardAmountWei = (value * rewardPercentage) / BigInt(10000)
      rewardAmount = ethers.formatEther(rewardAmountWei)
    }

    // Registrar no banco
    try {
      const { prisma } = await import('@/src/lib/prisma')
      
      await prisma.studentProject.create({
        data: {
          studentAddress: studentAddress.toLowerCase(),
          projectValue: parseFloat(projectValue),
          rewardAmount: rewardAmount ? parseFloat(rewardAmount) : null,
          description,
          txHash: txHash || null,
          contractAddress: STUDENT_REWARD_CONTRACT!.toLowerCase(),
          status: 'REGISTERED',
        },
      })
    } catch (dbError: any) {
      console.warn('[Student Reward] Tabela não existe, continuando...', dbError.message)
    }

    return NextResponse.json({
      success: true,
      project: {
        studentAddress,
        projectValue,
        rewardAmount,
        description,
        txHash,
        contractAddress: STUDENT_REWARD_CONTRACT,
        nftTokenId,
      },
      message: `Projeto registrado! Estudante receberá ${rewardAmount || 'calculando...'} ETH/MATIC de recompensa${nftTokenId ? ` e NFT #${nftTokenId}` : ''}.`,
    })
  } catch (error: any) {
    console.error('[Student Reward] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao registrar projeto',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
