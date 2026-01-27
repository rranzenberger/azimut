'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function LeadsDashboardClient({ initialData }: { initialData: any }) {
  const [stats, setStats] = useState(initialData?.stats || null)
  const [hotLeads, setHotLeads] = useState(initialData?.hotLeads || [])
  const [aiInsights, setAiInsights] = useState(initialData?.aiInsights || null)
  const [loading, setLoading] = useState(!initialData)

  useEffect(() => {
    if (!initialData) {
      fetchDashboard()
    }
  }, [])

  async function fetchDashboard() {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/reports/leads-daily`)
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setHotLeads(data.hotLeads || [])
        setAiInsights(data.aiInsights)
      }
    } catch (error) {
      console.error('Erro ao buscar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  async function analyzeAllLeads() {
    if (!confirm('Deseja analisar todos os leads sem análise? Isso pode levar alguns minutos.')) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/admin/leads/analyze-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 100 }),
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`✅ ${result.results.analyzed} leads analisados com sucesso!`)
        await fetchDashboard()
      } else {
        const error = await response.json()
        alert(`Erro: ${error.message || 'Erro ao analisar leads'}`)
      }
    } catch (error: any) {
      alert(`Erro: ${error.message || 'Erro ao analisar leads'}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ color: '#c0bccf' }}>Carregando dashboard...</p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <header style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
            🎯 Dashboard de Leads Inteligente
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Análise em tempo real com IA (Claude + DeepSeek)
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={analyzeAllLeads}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(34, 197, 94, 0.5)',
              background: 'rgba(34, 197, 94, 0.2)',
              color: '#86efac',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🤖 Analisar Todos com IA
          </button>
          <Link
            href="/admin/leads"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(59, 130, 246, 0.5)',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#93c5fd',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Ver Todos os Leads
          </Link>
        </div>
      </header>

      {/* Estatísticas */}
      {stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 16, 
          marginBottom: 32 
        }}>
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              {stats.total}
            </div>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>Total de Leads</div>
          </div>
          
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>
              {stats.hot}
            </div>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>Leads Quentes</div>
          </div>
          
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#22c55e', marginBottom: 8 }}>
              R$ {stats.totalEstimatedValue.toLocaleString('pt-BR')}
            </div>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>Valor Estimado</div>
          </div>
          
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#3b82f6', marginBottom: 8 }}>
              {stats.avgScore.toFixed(1)}
            </div>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>Score Médio</div>
          </div>
        </div>
      )}

      {/* Leads Quentes */}
      {hotLeads.length > 0 && (
        <div style={{
          marginBottom: 32,
          padding: 24,
          borderRadius: 12,
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 600, color: '#ef4444' }}>
            🔥 Leads Quentes (Prioridade Máxima)
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {hotLeads.map((lead: any) => (
              <Link
                key={lead.id}
                href={`/admin/leads/${lead.id}`}
                style={{
                  display: 'block',
                  padding: 16,
                  borderRadius: 8,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                      {lead.name}
                    </div>
                    <div style={{ fontSize: 14, color: '#c0bccf' }}>
                      {lead.company || 'Sem empresa'} • {lead.email}
                    </div>
                    <div style={{ fontSize: 12, color: '#8f8ba2', marginTop: 4 }}>
                      {lead.projectType || 'Tipo não especificado'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444' }}>
                      {lead.score}
                    </div>
                    <div style={{ fontSize: 12, color: '#c0bccf' }}>Score</div>
                    {lead.estimatedValue && (
                      <div style={{ fontSize: 14, color: '#22c55e', marginTop: 4 }}>
                        R$ {lead.estimatedValue.toLocaleString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Insights da IA */}
      {aiInsights && (
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 600, color: '#3b82f6' }}>
            🧠 Insights da IA
          </h2>
          
          {aiInsights.insights && aiInsights.insights.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Principais Insights:</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf' }}>
                {aiInsights.insights.map((insight: string, i: number) => (
                  <li key={i} style={{ marginBottom: 8 }}>{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {aiInsights.recommendations && aiInsights.recommendations.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Recomendações:</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf' }}>
                {aiInsights.recommendations.map((rec: string, i: number) => (
                  <li key={i} style={{ marginBottom: 8 }}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {aiInsights.priorityActions && aiInsights.priorityActions.length > 0 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Ações Prioritárias:</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf' }}>
                {aiInsights.priorityActions.map((action: string, i: number) => (
                  <li key={i} style={{ marginBottom: 8 }}>{action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}