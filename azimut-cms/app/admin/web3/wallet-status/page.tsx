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
  config?: {
    web3RpcUrl: string | null
    web3NftContractAddress: string | null
    web3StudentRewardContractAddress: string | null
  }
}

interface Web3ConfigForm {
  companyWalletAddress: string
  web3RpcUrl: string
  web3NftContractAddress: string
  web3StudentRewardContractAddress: string
}

const defaultForm: Web3ConfigForm = {
  companyWalletAddress: '',
  web3RpcUrl: 'https://polygon-rpc.com',
  web3NftContractAddress: '',
  web3StudentRewardContractAddress: '',
}

export default function WalletStatusPage() {
  const [status, setStatus] = useState<WalletStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [configForm, setConfigForm] = useState<Web3ConfigForm>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchStatus()
    fetchConfig()
  }, [])

  async function fetchConfig() {
    try {
      const res = await fetch('/api/web3/settings')
      const data = await res.json().catch(() => ({}))
      if (res.ok && data) {
        setConfigForm({
          companyWalletAddress: data.companyWalletAddress || '',
          web3RpcUrl: data.web3RpcUrl || 'https://polygon-rpc.com',
          web3NftContractAddress: data.web3NftContractAddress || '',
          web3StudentRewardContractAddress: data.web3StudentRewardContractAddress || '',
        })
      }
    } catch (_) {}
  }

  async function fetchStatus() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/web3/wallet/status')
      const data = await response.json().catch(() => ({}))
      if (response.ok) {
        setStatus(data)
        setError(null)
        if (data.config) {
          setConfigForm(prev => ({
            ...prev,
            web3RpcUrl: data.config.web3RpcUrl || prev.web3RpcUrl,
            web3NftContractAddress: data.config.web3NftContractAddress || prev.web3NftContractAddress,
            web3StudentRewardContractAddress: data.config.web3StudentRewardContractAddress || prev.web3StudentRewardContractAddress,
          }))
        }
        if (data.address) setConfigForm(prev => ({ ...prev, companyWalletAddress: data.address }))
      } else {
        const serverMessage = data.message || data.error || 'Erro ao buscar status da carteira'
        setError(serverMessage)
      }
    } catch (err) {
      setError('Erro ao conectar com API. Preencha os dados abaixo (carteira e RPC) ou defina COMPANY_WALLET_ADDRESS e RPC_URL na Vercel.')
    } finally {
      setLoading(false)
    }
  }

  async function saveConfig(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMessage(null)
    try {
      const res = await fetch('/api/web3/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyWalletAddress: configForm.companyWalletAddress || undefined,
          web3RpcUrl: configForm.web3RpcUrl || undefined,
          web3NftContractAddress: configForm.web3NftContractAddress || undefined,
          web3StudentRewardContractAddress: configForm.web3StudentRewardContractAddress || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSaveMessage('Configuração salva. Atualize o status acima.')
        fetchStatus()
      } else {
        setSaveMessage(data.error || 'Erro ao salvar')
      }
    } catch (_) {
      setSaveMessage('Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  if (loading && !status) {
    return (
      <div style={{ width: '100%', maxWidth: 1400 }}>
        <div style={{ padding: 40, textAlign: 'center', color: '#c0bccf' }}>
          Carregando status da carteira...
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
              💰 Carteira Web3
            </h1>
            <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
              Saldo, Polygon e contratos — configure aqui ou use variáveis na Vercel
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
            🔄 Atualizar status
          </button>
        </div>
      </header>

      {error && (
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          marginBottom: 24,
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Formulário: Carteira pública, RPC, Contratos */}
      <div style={{
        padding: 24,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 32,
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 16 }}>
          📋 Dados da carteira e Polygon (editáveis)
        </h2>
        <form onSubmit={saveConfig}>
          <div style={{ display: 'grid', gap: 16, maxWidth: 640 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, color: '#c0bccf', marginBottom: 6 }}>Endereço público da carteira (0x...)</label>
              <input
                type="text"
                value={configForm.companyWalletAddress}
                onChange={e => setConfigForm(prev => ({ ...prev, companyWalletAddress: e.target.value }))}
                placeholder="0xd5B2Da856140810c34834be5CEB366Dd7857500e"
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, color: '#c0bccf', marginBottom: 6 }}>RPC da rede (Polygon)</label>
              <input
                type="text"
                value={configForm.web3RpcUrl}
                onChange={e => setConfigForm(prev => ({ ...prev, web3RpcUrl: e.target.value }))}
                placeholder="https://polygon-rpc.com"
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, color: '#c0bccf', marginBottom: 6 }}>Contrato NFT (endereço que emite o NFT)</label>
              <input
                type="text"
                value={configForm.web3NftContractAddress}
                onChange={e => setConfigForm(prev => ({ ...prev, web3NftContractAddress: e.target.value }))}
                placeholder="0x..."
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, color: '#c0bccf', marginBottom: 6 }}>Contrato Student Reward</label>
              <input
                type="text"
                value={configForm.web3StudentRewardContractAddress}
                onChange={e => setConfigForm(prev => ({ ...prev, web3StudentRewardContractAddress: e.target.value }))}
                placeholder="0x..."
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 14 }}
              />
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                border: 'none',
                background: '#c92337',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Salvando...' : 'Salvar configuração'}
            </button>
            {saveMessage && (
              <span style={{ fontSize: 14, color: saveMessage.startsWith('Configuração') ? '#86efac' : '#fca5a5' }}>
                {saveMessage}
              </span>
            )}
          </div>
        </form>
        <p style={{ marginTop: 12, fontSize: 12, color: '#8f8ba2' }}>
          Chave privada: configure apenas na Vercel (Environment Variables) como <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>COMPANY_WALLET_PRIVATE_KEY</code>. Não preencha aqui.
        </p>
      </div>

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
