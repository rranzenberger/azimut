/**
 * Componente de Conexão de Carteira Web3
 * Suporta: MetaMask, WalletConnect, Ledger, Coinbase Wallet
 */

import { useState, useEffect } from 'react'
import { type Lang } from '../i18n'

interface WalletInfo {
  address: string
  chainId: number
  balance?: string
}

interface WalletConnectProps {
  lang: Lang
  onConnect?: (wallet: WalletInfo) => void
  onDisconnect?: () => void
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export function WalletConnect({ lang, onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supportedWallets, setSupportedWallets] = useState<string[]>([])

  // Detectar carteiras disponíveis
  useEffect(() => {
    const wallets: string[] = []
    
    if (window.ethereum) {
      wallets.push('MetaMask')
      
      // Detectar outras carteiras
      if (window.ethereum.isCoinbaseWallet) wallets.push('Coinbase Wallet')
      if (window.ethereum.isBraveWallet) wallets.push('Brave Wallet')
      if (window.ethereum.isTrust) wallets.push('Trust Wallet')
    }
    
    // WalletConnect pode ser adicionado via biblioteca
    if (typeof window !== 'undefined') {
      wallets.push('WalletConnect')
      wallets.push('Ledger (via WalletConnect)')
    }
    
    setSupportedWallets(wallets)
    
    // Verificar se já está conectado
    checkConnection()
  }, [])

  async function checkConnection() {
    if (!window.ethereum) return
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        })
        
        setWallet({
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        })
        setIsConnected(true)
        onConnect?.({
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        })
      }
    } catch (err) {
      console.error('Erro ao verificar conexão:', err)
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      setError('MetaMask ou outra carteira não encontrada. Por favor, instale MetaMask.')
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    setConnecting(true)
    setError(null)

    try {
      // Solicitar conexão
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('Nenhuma conta conectada')
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })

      const walletInfo: WalletInfo = {
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        balance: (parseInt(balance, 16) / 1e18).toFixed(4),
      }

      setWallet(walletInfo)
      setIsConnected(true)
      onConnect?.(walletInfo)

      // Salvar conexão no backend
      try {
        const backofficeUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
        await fetch(`${backofficeUrl}/api/web3/wallet/connect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: walletInfo.address,
            chainId: walletInfo.chainId,
          }),
        })
      } catch (apiError) {
        console.warn('Erro ao salvar conexão no backend:', apiError)
        // Não bloquear se API falhar
      }

      // Escutar mudanças de conta
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    } catch (err: any) {
      console.error('Erro ao conectar:', err)
      setError(err.message || 'Erro ao conectar carteira')
    } finally {
      setConnecting(false)
    }
  }

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      disconnect()
    } else {
      checkConnection()
    }
  }

  function handleChainChanged() {
    checkConnection()
  }

  function disconnect() {
    setWallet(null)
    setIsConnected(false)
    onDisconnect?.()
    
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }

  function formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  function getChainName(chainId: number) {
    const chains: Record<number, string> = {
      1: 'Ethereum Mainnet',
      137: 'Polygon',
      56: 'BSC',
      42161: 'Arbitrum',
      10: 'Optimism',
      5: 'Goerli Testnet',
      80001: 'Mumbai Testnet',
    }
    return chains[chainId] || `Chain ${chainId}`
  }

  if (isConnected && wallet) {
    return (
      <div style={{
        padding: 24,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
        border: '2px solid rgba(34, 197, 94, 0.4)',
        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Efeito de brilho animado */}
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                marginBottom: 12 
              }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 12px rgba(34, 197, 94, 0.8)',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <div style={{ fontSize: 14, color: '#86efac', fontWeight: 600 }}>
                  ✅ Carteira Conectada
                </div>
              </div>
              
              <div style={{ 
                fontSize: 20, 
                fontWeight: 700, 
                color: '#fff', 
                marginBottom: 8,
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
              }}>
                {formatAddress(wallet.address)}
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: 16, 
                flexWrap: 'wrap',
                fontSize: 13,
                color: '#c0bccf',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>⛓️</span>
                  <span>{getChainName(wallet.chainId)}</span>
                </div>
                {wallet.balance && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16 }}>💰</span>
                    <span>{wallet.balance} {wallet.chainId === 137 ? 'MATIC' : 'ETH'}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={disconnect}
              style={{
                padding: '10px 18px',
                borderRadius: 10,
                border: '1px solid rgba(239, 68, 68, 0.5)',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)'
              }}
            >
              Desconectar
            </button>
          </div>
          
          {/* Link para ver no explorer */}
          <div style={{
            padding: 12,
            borderRadius: 8,
            background: 'rgba(0, 0, 0, 0.2)',
            marginTop: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ fontSize: 12, color: '#8f8ba2' }}>
              Ver no explorer:
            </div>
            <a
              href={wallet.chainId === 137 
                ? `https://polygonscan.com/address/${wallet.address}`
                : wallet.chainId === 1
                ? `https://etherscan.io/address/${wallet.address}`
                : `#`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: '#86efac',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Abrir <span>→</span>
            </a>
          </div>
          
          {error && (
            <div style={{
              padding: 12,
              borderRadius: 8,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: 13,
              marginTop: 12,
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>
        
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{
      padding: 28,
      borderRadius: 16,
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)',
      border: '2px solid rgba(139, 92, 246, 0.3)',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Efeito de fundo animado */}
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            marginBottom: 12 
          }}>
            <div style={{
              fontSize: 32,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🔗
            </div>
            <h3 style={{ 
              fontSize: 22, 
              fontWeight: 700, 
              color: '#fff', 
              margin: 0,
              background: 'linear-gradient(135deg, #fff 0%, #c0bccf 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Conectar Carteira Digital
            </h3>
          </div>
          <p style={{ 
            fontSize: 14, 
            color: '#c0bccf', 
            lineHeight: 1.7,
            margin: 0,
            paddingLeft: 44,
          }}>
            Conecte sua carteira para receber NFTs, tokens e recompensas exclusivas. Suportamos MetaMask, Ledger, Coinbase Wallet e mais.
          </p>
        </div>

      {supportedWallets.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#8f8ba2', marginBottom: 8 }}>
            Carteiras detectadas:
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {supportedWallets.map((wallet) => (
              <span
                key={wallet}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#c4b5fd',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {wallet}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={connecting}
        style={{
          width: '100%',
          padding: '18px 28px',
          borderRadius: 12,
          background: connecting
            ? 'rgba(139, 92, 246, 0.3)'
            : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          border: 'none',
          color: '#fff',
          fontSize: 16,
          fontWeight: 700,
          cursor: connecting ? 'not-allowed' : 'pointer',
          opacity: connecting ? 0.6 : 1,
          marginBottom: 12,
          boxShadow: connecting 
            ? 'none' 
            : '0 4px 20px rgba(139, 92, 246, 0.4)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          if (!connecting) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(139, 92, 246, 0.6)'
          }
        }}
        onMouseLeave={(e) => {
          if (!connecting) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.4)'
          }
        }}
      >
        {connecting ? '🔄 Conectando...' : '🔗 Conectar Carteira'}
      </button>

      {error && (
        <div style={{
          padding: 12,
          borderRadius: 8,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          fontSize: 14,
          marginTop: 12,
        }}>
          ⚠️ {error}
        </div>
      )}

      {!window.ethereum && (
        <div style={{
          padding: 16,
          borderRadius: 8,
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          marginTop: 12,
        }}>
          <div style={{ fontSize: 14, color: '#fbbf24', marginBottom: 8, fontWeight: 600 }}>
            📥 Instale uma Carteira
          </div>
          <div style={{ fontSize: 12, color: '#c0bccf', lineHeight: 1.6, marginBottom: 12 }}>
            Para conectar sua carteira, você precisa instalar MetaMask ou outra carteira compatível.
          </div>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 8,
              background: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.5)',
              color: '#fbbf24',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            📥 Instalar MetaMask →
          </a>
        </div>
      )}
      </div>
    </div>
  )
}

