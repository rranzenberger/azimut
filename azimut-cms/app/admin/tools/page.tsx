/**
 * Página de Ferramentas e Automações
 * Centraliza todas as ações que antes eram scripts
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ToolsPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  async function executeAction(action: string, params?: any) {
    setLoading(action)
    setResult(null)

    try {
      let response
      
      switch (action) {
        case 'analyze-leads':
          response = await fetch('/api/admin/leads/analyze-all', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ limit: 100 }),
          })
          break
          
        case 'generate-report':
          response = await fetch('/api/admin/reports/leads-daily')
          break
          
        case 'optimize-seo-all':
          response = await fetch('/api/admin/seo/optimize-all', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skipOptimized: true }),
          })
          break
          
        default:
          throw new Error('Ação não encontrada')
      }

      if (response.ok) {
        const data = await response.json()
        setResult({ success: true, data })
      } else {
        const error = await response.json()
        setResult({ success: false, error: error.message || 'Erro desconhecido' })
      }
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 1200 }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          🛠️ Ferramentas e Automações
        </h1>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
          Centralize todas as ações e automações em um só lugar
        </p>
      </header>

      {/* Seção: Análise de Leads */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          👥 Análise de Leads com IA
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <p style={{ color: '#c0bccf', marginBottom: 20, fontSize: 14 }}>
            Analise todos os leads sem análise usando IA (Claude/DeepSeek). 
            Isso qualifica leads, calcula scores e gera insights automaticamente.
          </p>
          
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => executeAction('analyze-leads')}
              disabled={loading === 'analyze-leads'}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(34, 197, 94, 0.5)',
                background: loading === 'analyze-leads' 
                  ? 'rgba(34, 197, 94, 0.3)' 
                  : 'rgba(34, 197, 94, 0.2)',
                color: '#86efac',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading === 'analyze-leads' ? 'not-allowed' : 'pointer',
                opacity: loading === 'analyze-leads' ? 0.6 : 1,
              }}
            >
              {loading === 'analyze-leads' ? '⏳ Analisando...' : '🤖 Analisar Todos os Leads com IA'}
            </button>
            
            <Link
              href="/admin/leads/dashboard"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(59, 130, 246, 0.5)',
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              📊 Ver Dashboard de Leads
            </Link>
            
            <Link
              href="/admin/leads"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              📋 Ver Todos os Leads
            </Link>
          </div>

          {loading === 'analyze-leads' && (
            <div style={{ marginTop: 16, color: '#86efac', fontSize: 14 }}>
              ⏳ Processando... Isso pode levar alguns minutos.
            </div>
          )}

          {result && loading === null && result.data && (
            <div style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 8,
              background: result.success 
                ? 'rgba(34, 197, 94, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${result.success ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: result.success ? '#86efac' : '#fca5a5',
            }}>
              {result.success ? (
                <div>
                  ✅ <strong>Sucesso!</strong> {result.data.results?.analyzed || 0} leads analisados.
                  {result.data.results?.errors > 0 && (
                    <div style={{ marginTop: 8, fontSize: 12 }}>
                      ⚠️ {result.data.results.errors} erros encontrados.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  ❌ <strong>Erro:</strong> {result.error}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Seção: Relatórios */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          📊 Relatórios e Análises
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <p style={{ color: '#c0bccf', marginBottom: 20, fontSize: 14 }}>
            Gere relatórios diários com estatísticas, leads quentes e insights da IA.
          </p>
          
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => executeAction('generate-report')}
              disabled={loading === 'generate-report'}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(251, 191, 36, 0.5)',
                background: loading === 'generate-report' 
                  ? 'rgba(251, 191, 36, 0.3)' 
                  : 'rgba(251, 191, 36, 0.2)',
                color: '#fde047',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading === 'generate-report' ? 'not-allowed' : 'pointer',
                opacity: loading === 'generate-report' ? 0.6 : 1,
              }}
            >
              {loading === 'generate-report' ? '⏳ Gerando...' : '📄 Gerar Relatório Diário'}
            </button>
          </div>

          {loading === 'generate-report' && (
            <div style={{ marginTop: 16, color: '#fde047', fontSize: 14 }}>
              ⏳ Gerando relatório...
            </div>
          )}

          {result && loading === null && result.data && result.data.stats && (
            <div style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 8,
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}>
              <div style={{ color: '#fde047', marginBottom: 12 }}>
                ✅ <strong>Relatório Gerado!</strong>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 12,
                color: '#fff',
              }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{result.data.stats.total}</div>
                  <div style={{ fontSize: 12, color: '#c0bccf' }}>Total de Leads</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444' }}>
                    {result.data.stats.hot}
                  </div>
                  <div style={{ fontSize: 12, color: '#c0bccf' }}>Leads Quentes</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e' }}>
                    R$ {result.data.stats.totalEstimatedValue.toLocaleString('pt-BR')}
                  </div>
                  <div style={{ fontSize: 12, color: '#c0bccf' }}>Valor Estimado</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Seção: SEO */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🔍 Otimização SEO com IA
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <p style={{ color: '#c0bccf', marginBottom: 20, fontSize: 14 }}>
            Otimize todos os projetos com IA para melhorar SEO e ranking nos buscadores.
          </p>
          
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/admin/projects"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(139, 92, 246, 0.5)',
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#c4b5fd',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              🎥 Gerenciar Projetos
            </Link>
            
            <Link
              href="/admin/analytics"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              📊 Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Seção: Links Rápidos */}
      <section>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🔗 Links Rápidos
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}>
            <Link
              href="/admin/leads/dashboard"
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid rgba(59, 130, 246, 0.3)',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#93c5fd',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>🎯</div>
              <div style={{ fontWeight: 600 }}>Dashboard Leads</div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                Métricas e insights
              </div>
            </Link>
            
            <Link
              href="/admin/leads"
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid rgba(34, 197, 94, 0.3)',
                background: 'rgba(34, 197, 94, 0.1)',
                color: '#86efac',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>👥</div>
              <div style={{ fontWeight: 600 }}>Todos os Leads</div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                Lista completa
              </div>
            </Link>
            
            <Link
              href="/admin/analytics"
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid rgba(251, 191, 36, 0.3)',
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#fde047',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>📊</div>
              <div style={{ fontWeight: 600 }}>Analytics IA</div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                Análise completa
              </div>
            </Link>
            
            <Link
              href="/admin/projects"
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid rgba(139, 92, 246, 0.3)',
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#c4b5fd',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>🎥</div>
              <div style={{ fontWeight: 600 }}>Projetos</div>
              <div style={{ fontSize: 12, color: '#c0bccf', marginTop: 4 }}>
                Gerenciar projetos
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
