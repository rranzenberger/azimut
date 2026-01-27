/**
 * Dashboard de Status da Carteira Web3
 * Mostra saldo, taxas, transações recentes
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WalletStatus {
  address: string
  balance: string
  network: string
  recentTransactions: number
  totalRewardsSent: number
  totalPaymentsReceived: number
  estimatedGasCost: string
  setupStatus?: {
    addressConfigured: boolean
    privateKeyConfigured: boolean
    canSendTransactions: boolean
    canReceivePayments: boolean
  }
  setupMessage?: string
}

export default function WalletStatusPage() {
  const [status, setStatus] = useState<WalletStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStatus()
  }, [])

  async function fetchStatus() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/web3/wallet/status')
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      } else {
        setError('Erro ao buscar status da carteira')
      }
    } catch (err) {
      setError('Erro ao conectar com API')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ width: '100%', maxWidth: 1400 }}>
        <div style={{ padding: 40, textAlign: 'center', color: '#c0bccf' }}>
          Carregando status da carteira...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ width: '100%', maxWidth: 1400 }}>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
        }}>
          ⚠️ {error}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <header style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
              💰 Status da Carteira Web3
            </h1>
            <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
              Saldo, taxas e transações da carteira da empresa
            </p>
          </div>
          <button
            onClick={fetchStatus}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🔄 Atualizar
          </button>
        </div>
      </header>

      {status && (
        <>
          {/* Status Principal */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            marginBottom: 32,
          }}>
            <div style={{
              padding: 24,
              borderRadius: 12,
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}>
              <div style={{ fontSize: 14, color: '#86efac', marginBottom: 8, fontWeight: 600 }}>
                💰 Saldo Atual
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                {status.balance} ETH/MATIC
              </div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                {status.network}
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 12,
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}>
              <div style={{ fontSize: 14, color: '#93c5fd', marginBottom: 8, fontWeight: 600 }}>
                📤 Recompensas Enviadas
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                {status.totalRewardsSent}
              </div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                NFTs/Tokens distribuídos
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 12,
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}>
              <div style={{ fontSize: 14, color: '#c4b5fd', marginBottom: 8, fontWeight: 600 }}>
                📥 Pagamentos Recebidos
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                {status.totalPaymentsReceived}
              </div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                Transações recebidas
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 12,
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}>
              <div style={{ fontSize: 14, color: '#fbbf24', marginBottom: 8, fontWeight: 600 }}>
                ⛽ Taxa Estimada
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                {status.estimatedGasCost}
              </div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                Por transação (Polygon)
              </div>
            </div>
          </div>

          {/* Status de Configuração */}
          {status.setupStatus && (
            <div style={{
              padding: 24,
              borderRadius: 12,
              background: status.setupStatus.privateKeyConfigured 
                ? 'rgba(34, 197, 94, 0.1)' 
                : 'rgba(251, 191, 36, 0.1)',
              border: `1px solid ${status.setupStatus.privateKeyConfigured 
                ? 'rgba(34, 197, 94, 0.3)' 
                : 'rgba(251, 191, 36, 0.3)'}`,
              marginBottom: 32,
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 16 }}>
                {status.setupStatus.privateKeyConfigured ? '✅ Configuração Completa' : '⏳ Configuração Parcial'}
              </h2>
              <div style={{ color: '#c0bccf', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                {status.setupMessage}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#c0bccf', marginBottom: 4 }}>Endereço</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: status.setupStatus.addressConfigured ? '#86efac' : '#fca5a5' }}>
                    {status.setupStatus.addressConfigured ? '✅ Configurado' : '❌ Não configurado'}
                  </div>
                </div>
                <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#c0bccf', marginBottom: 4 }}>Chave Privada</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: status.setupStatus.privateKeyConfigured ? '#86efac' : '#fbbf24' }}>
                    {status.setupStatus.privateKeyConfigured ? '✅ Configurado' : '⏳ Pendente'}
                  </div>
                </div>
                <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#c0bccf', marginBottom: 4 }}>Receber Pagamentos</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: status.setupStatus.canReceivePayments ? '#86efac' : '#fca5a5' }}>
                    {status.setupStatus.canReceivePayments ? '✅ Ativo' : '❌ Inativo'}
                  </div>
                </div>
                <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#c0bccf', marginBottom: 4 }}>Enviar Recompensas</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: status.setupStatus.canSendTransactions ? '#86efac' : '#fbbf24' }}>
                    {status.setupStatus.canSendTransactions ? '✅ Ativo' : '⏳ Requer chave privada'}
                  </div>
                </div>
              </div>
              {!status.setupStatus.privateKeyConfigured && (
                <div style={{ marginTop: 16, padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fbbf24', marginBottom: 8 }}>
                    📝 Para ativar automação completa:
                  </div>
                  <ol style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 13, lineHeight: 1.8 }}>
                    <li>Veja o guia: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>COMO_ADICIONAR_CHAVE_PRIVADA_ENV.md</code></li>
                    <li>Ou use Ledger + MetaMask: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>COMO_USAR_LEDGER_COM_SISTEMA.md</code></li>
                    <li>Adicione <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>COMPANY_WALLET_PRIVATE_KEY</code> no arquivo <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>azimut-cms/.env</code></li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Informações sobre Taxas */}
          <div style={{
            padding: 24,
            borderRadius: 12,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: 32,
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 16 }}>
              💡 Sobre as Taxas (Gas Fees)
            </h2>
            <div style={{ color: '#c0bccf', fontSize: 14, lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong style={{ color: '#fff' }}>As taxas são pagas à rede blockchain</strong> para processar transações.
              </p>
              <ul style={{ margin: '0 0 12px 0', paddingLeft: 20 }}>
                <li>✅ <strong>Cliente conecta carteira:</strong> Grátis (sem transação)</li>
                <li>❌ <strong>Cliente faz pagamento:</strong> Cliente paga taxa (~$0.001 no Polygon)</li>
                <li>❌ <strong>Empresa envia recompensa:</strong> Empresa paga taxa (~$0.01 no Polygon)</li>
              </ul>
              <p style={{ margin: '12px 0 0 0' }}>
                <strong style={{ color: '#86efac' }}>Polygon é 1000x mais barato que Ethereum!</strong>
                <br />
                Taxa média: $0.001-0.01 vs $5-50 (Ethereum)
              </p>
            </div>
          </div>

          {/* Endereço da Carteira */}
          <div style={{
            padding: 24,
            borderRadius: 12,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 12 }}>
              🔗 Endereço da Carteira
            </h3>
            <div style={{
              padding: 12,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#c0bccf',
              wordBreak: 'break-all',
            }}>
              {status.address}
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: '#8f8ba2' }}>
              Este é o endereço que recebe pagamentos e envia recompensas
            </div>
          </div>
        </>
      )}
    </div>
  )
}
