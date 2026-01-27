/**
 * Página de Gerenciamento de Recompensas para Estudantes
 * Registra projetos e gerencia recompensas automáticas
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function StudentRewardsPage() {
  const [registering, setRegistering] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function registerProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRegistering(true)
    setError(null)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      studentAddress: formData.get('studentAddress') as string,
      projectValue: formData.get('projectValue') as string,
      description: formData.get('description') as string,
      paymentMethod: formData.get('paymentMethod') as 'direct' | 'external',
    }

    try {
      const response = await fetch('/api/web3/student-reward/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const resultData = await response.json()
        setResult(resultData)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao registrar projeto')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com API')
    } finally {
      setRegistering(false)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <header style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
              🎓 Recompensas para Estudantes (Canadá)
            </h1>
            <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
              Registre projetos e distribua recompensas automáticas em crypto
            </p>
          </div>
          <Link
            href="/admin/web3/wallet-status"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            💰 Status da Carteira
          </Link>
        </div>
      </header>

      {/* Explicação */}
      <div style={{
        padding: 24,
        borderRadius: 12,
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 600, color: '#c4b5fd' }}>
          💡 Como Funciona
        </h2>
        <div style={{ color: '#c0bccf', fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 12px 0' }}>
            Quando um <strong>estudante no Canadá contrata um projeto</strong> (portfólio, site, VR, etc.),
            ele recebe automaticamente uma <strong>porcentagem de volta em crypto</strong> como incentivo.
          </p>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: 20 }}>
            <li>✅ <strong>Estudante contrata:</strong> Paga pelo projeto</li>
            <li>✅ <strong>Sistema registra:</strong> No smart contract blockchain</li>
            <li>✅ <strong>Recompensa automática:</strong> Estudante recebe crypto de volta (ex: 5%)</li>
            <li>✅ <strong>NFT exclusivo:</strong> Estudante recebe NFT único na carteira</li>
            <li>✅ <strong>Transparente:</strong> Tudo verificável no blockchain</li>
          </ul>
          <p style={{ margin: '12px 0 0 0', color: '#86efac' }}>
            <strong>Exemplo:</strong> Projeto de $1000 → Estudante recebe $50 em crypto + NFT exclusivo automaticamente!
          </p>
        </div>
      </div>

      {/* Formulário de Registro */}
      <div style={{
        padding: 32,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 32,
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 24 }}>
          📝 Registrar Novo Projeto
        </h2>

        <form onSubmit={registerProject}>
          <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#c0bccf', marginBottom: 8 }}>
                Endereço da Carteira do Estudante *
              </label>
              <input
                type="text"
                name="studentAddress"
                required
                placeholder="0x..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'monospace',
                }}
              />
              <div style={{ fontSize: 12, color: '#8f8ba2', marginTop: 4 }}>
                Endereço Ethereum/Polygon do estudante (MetaMask, etc.)
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#c0bccf', marginBottom: 8 }}>
                Valor do Projeto (ETH/MATIC) *
              </label>
              <input
                type="number"
                name="projectValue"
                required
                step="0.001"
                min="0.01"
                placeholder="0.5"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                }}
              />
              <div style={{ fontSize: 12, color: '#8f8ba2', marginTop: 4 }}>
                Valor em ETH ou MATIC (ex: 0.5 = ~$1000)
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#c0bccf', marginBottom: 8 }}>
                Descrição do Projeto *
              </label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Portfólio personalizado para estudante no Canadá"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                  resize: 'vertical',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#c0bccf', marginBottom: 8 }}>
                Método de Pagamento *
              </label>
              <select
                name="paymentMethod"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                <option value="external">Pagamento Externo (Cartão, PIX, etc.)</option>
                <option value="direct">Pagamento Direto em Crypto</option>
              </select>
              <div style={{ fontSize: 12, color: '#8f8ba2', marginTop: 4 }}>
                Externo: Registra projeto sem receber pagamento no contrato
                <br />
                Direto: Estudante envia crypto para o contrato (recompensa automática)
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={registering}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: 12,
              background: registering
                ? 'rgba(139, 92, 246, 0.3)'
                : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              border: 'none',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: registering ? 'not-allowed' : 'pointer',
              opacity: registering ? 0.6 : 1,
            }}
          >
            {registering ? '🔄 Registrando...' : '✅ Registrar Projeto e Pagar Recompensa'}
          </button>
        </form>
      </div>

      {/* Resultado */}
      {result && (
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.5)',
          marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#86efac', marginBottom: 16 }}>
            ✅ Projeto Registrado com Sucesso!
          </h3>
          <div style={{ color: '#c0bccf', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong style={{ color: '#fff' }}>Estudante:</strong> {result.project.studentAddress}
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong style={{ color: '#fff' }}>Valor do Projeto:</strong> {result.project.projectValue} ETH/MATIC
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong style={{ color: '#86efac' }}>Recompensa:</strong> {result.project.rewardAmount} ETH/MATIC
            </p>
            {result.project.nftTokenId && (
              <p style={{ margin: '0 0 8px 0' }}>
                <strong style={{ color: '#c4b5fd' }}>🎨 NFT Mintado:</strong> Token ID #{result.project.nftTokenId}
              </p>
            )}
            <p style={{ margin: '0 0 8px 0' }}>
              <strong style={{ color: '#fff' }}>Transação:</strong> {result.project.txHash}
            </p>
            <p style={{ margin: '12px 0 0 0', color: '#86efac', fontWeight: 600 }}>
              {result.message}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Informações Adicionais */}
      <div style={{
        padding: 24,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 12 }}>
          📋 Informações Importantes
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 14, lineHeight: 1.8 }}>
          <li>Recompensa padrão: <strong style={{ color: '#86efac' }}>5%</strong> do valor do projeto em crypto</li>
          <li>NFT exclusivo: <strong style={{ color: '#c4b5fd' }}>Mint automático</strong> para carteira do estudante</li>
          <li>Valor mínimo: <strong style={{ color: '#86efac' }}>0.01 ETH/MATIC</strong></li>
          <li>Taxa da rede: <strong style={{ color: '#fbbf24' }}>~$0.01</strong> por transação (Polygon)</li>
          <li>Tudo é <strong style={{ color: '#c4b5fd' }}>transparente e verificável</strong> no blockchain</li>
        </ul>
      </div>
    </div>
  )
}
