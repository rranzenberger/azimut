/**
 * Web3: obter e salvar carteira (endereço + chave privada) no Settings.
 * A chave é criptografada com WEB3_ENCRYPTION_KEY (env).
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'
import { prisma } from './prisma'

const ALG = 'aes-256-gcm'
const IV_LEN = 16
const SALT = 'azimut-web3-v1'
const KEY_LEN = 32

function getEncryptionKey(): Buffer {
  const secret = process.env.WEB3_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY
  if (!secret || secret.length < 16) {
    throw new Error('WEB3_ENCRYPTION_KEY (ou ENCRYPTION_KEY) deve ter pelo menos 16 caracteres para salvar a chave privada no backoffice.')
  }
  return scryptSync(secret, SALT, KEY_LEN)
}

export function encryptPrivateKey(plainKey: string): string {
  const key = getEncryptionKey()
  const iv = randomBytes(IV_LEN)
  const cipher = createCipheriv(ALG, key, iv)
  const enc = Buffer.concat([cipher.update(plainKey, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return Buffer.concat([iv, authTag, enc]).toString('base64')
}

export function decryptPrivateKey(encrypted: string): string {
  const key = getEncryptionKey()
  const buf = Buffer.from(encrypted, 'base64')
  const iv = buf.subarray(0, IV_LEN)
  const authTag = buf.subarray(IV_LEN, IV_LEN + 16)
  const data = buf.subarray(IV_LEN + 16)
  const decipher = createDecipheriv(ALG, key, iv)
  decipher.setAuthTag(authTag)
  return decipher.update(data, undefined, 'utf8') + decipher.final('utf8')
}

export interface Web3WalletConfig {
  companyWalletAddress: string | null
  companyWalletPrivateKey: string | null
  web3RpcUrl: string | null
  web3NftContractAddress: string | null
  web3StudentRewardContractAddress: string | null
}

const DEFAULT_RPC = 'https://polygon-rpc.com'

/**
 * Retorna endereço, chave (se existir) e config Polygon: primeiro do Settings (DB), depois env.
 */
export async function getWeb3WalletConfig(): Promise<Web3WalletConfig> {
  const fromEnv = {
    companyWalletAddress: process.env.COMPANY_WALLET_ADDRESS?.trim() || null,
    companyWalletPrivateKey: process.env.COMPANY_WALLET_PRIVATE_KEY?.trim() || null,
    web3RpcUrl: process.env.RPC_URL?.trim() || null,
    web3NftContractAddress: process.env.NFT_CONTRACT_ADDRESS?.trim() || null,
    web3StudentRewardContractAddress: process.env.STUDENT_REWARD_CONTRACT_ADDRESS?.trim() || null,
  }

  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 'singleton' },
      select: {
        companyWalletAddress: true,
        companyWalletPrivateKeyEncrypted: true,
        web3RpcUrl: true,
        web3NftContractAddress: true,
        web3StudentRewardContractAddress: true,
      },
    })
    if (!settings) {
      return {
        ...fromEnv,
        web3RpcUrl: fromEnv.web3RpcUrl || DEFAULT_RPC,
      }
    }
    let decryptedKey: string | null = null
    if (settings.companyWalletPrivateKeyEncrypted) {
      try {
        decryptedKey = decryptPrivateKey(settings.companyWalletPrivateKeyEncrypted)
      } catch (_) {}
    }
    return {
      companyWalletAddress: settings.companyWalletAddress || fromEnv.companyWalletAddress,
      companyWalletPrivateKey: decryptedKey || fromEnv.companyWalletPrivateKey,
      web3RpcUrl: settings.web3RpcUrl?.trim() || fromEnv.web3RpcUrl || DEFAULT_RPC,
      web3NftContractAddress: settings.web3NftContractAddress?.trim() || fromEnv.web3NftContractAddress,
      web3StudentRewardContractAddress: settings.web3StudentRewardContractAddress?.trim() || fromEnv.web3StudentRewardContractAddress,
    }
  } catch (_) {
    return {
      ...fromEnv,
      web3RpcUrl: fromEnv.web3RpcUrl || DEFAULT_RPC,
    }
  }
}

/**
 * Salva endereço, chave e/ou config Web3 no Settings (chave é criptografada).
 */
export async function saveWeb3WalletConfig(params: {
  companyWalletAddress?: string | null
  companyWalletPrivateKey?: string | null
  web3RpcUrl?: string | null
  web3NftContractAddress?: string | null
  web3StudentRewardContractAddress?: string | null
}): Promise<void> {
  const {
    companyWalletAddress,
    companyWalletPrivateKey,
    web3RpcUrl,
    web3NftContractAddress,
    web3StudentRewardContractAddress,
  } = params

  const existing = await prisma.settings.findUnique({
    where: { id: 'singleton' },
    select: {
      companyWalletAddress: true,
      companyWalletPrivateKeyEncrypted: true,
      web3RpcUrl: true,
      web3NftContractAddress: true,
      web3StudentRewardContractAddress: true,
    },
  })

  let addressToSave = existing?.companyWalletAddress
  let encryptedKeyToSave = existing?.companyWalletPrivateKeyEncrypted
  let rpcToSave = existing?.web3RpcUrl
  let nftToSave = existing?.web3NftContractAddress
  let rewardToSave = existing?.web3StudentRewardContractAddress

  if (companyWalletAddress !== undefined) addressToSave = companyWalletAddress?.trim() || null
  if (companyWalletPrivateKey !== undefined) {
    encryptedKeyToSave = companyWalletPrivateKey?.trim()
      ? encryptPrivateKey(companyWalletPrivateKey.trim())
      : null
  }
  if (web3RpcUrl !== undefined) rpcToSave = web3RpcUrl?.trim() || null
  if (web3NftContractAddress !== undefined) nftToSave = web3NftContractAddress?.trim() || null
  if (web3StudentRewardContractAddress !== undefined) rewardToSave = web3StudentRewardContractAddress?.trim() || null

  const updatePayload: {
    companyWalletAddress?: string | null
    companyWalletPrivateKeyEncrypted?: string | null
    web3RpcUrl?: string | null
    web3NftContractAddress?: string | null
    web3StudentRewardContractAddress?: string | null
    updatedAt: Date
  } = { updatedAt: new Date() }
  if (addressToSave !== undefined) updatePayload.companyWalletAddress = addressToSave
  if (encryptedKeyToSave !== undefined) updatePayload.companyWalletPrivateKeyEncrypted = encryptedKeyToSave
  if (rpcToSave !== undefined) updatePayload.web3RpcUrl = rpcToSave
  if (nftToSave !== undefined) updatePayload.web3NftContractAddress = nftToSave
  if (rewardToSave !== undefined) updatePayload.web3StudentRewardContractAddress = rewardToSave

  await prisma.settings.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      companyWalletAddress: addressToSave ?? null,
      companyWalletPrivateKeyEncrypted: encryptedKeyToSave ?? null,
      web3RpcUrl: rpcToSave ?? null,
      web3NftContractAddress: nftToSave ?? null,
      web3StudentRewardContractAddress: rewardToSave ?? null,
      updatedAt: new Date(),
    },
    update: updatePayload,
  })
}
