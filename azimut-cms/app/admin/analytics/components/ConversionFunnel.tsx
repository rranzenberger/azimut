'use client'

import { useState, useEffect } from 'react'

interface FunnelStep {
  step: string
  visitors: number
  percentage: number
  dropOff: number
}

interface FunnelData {
  totalSessions: number
  funnel: FunnelStep[]
  overallConversion: number
  period: string
}

const stepIcons: Record<string, string> = {
  Home: '🏠',
  Projetos: '🎬',
  About: 'ℹ️',
  Serviços: '🛠️',
  Academy: '🎓',
  Contato: '📧',
}

const stepColors: Record<string, string> = {
  Home: '#3b82f6',
  Projetos: '#8b5cf6',
  About: '#06b6d4',
  Serviços: '#f59e0b',
  Academy: '#10b981',
  Contato: '#ef4444',
}

export default function ConversionFunnel() {
  const [data, setData] = useState<FunnelData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFunnel = async () => {
      try {
        const res = await fetch('/api/admin/analytics/funnel')
        if (res.ok) {
          const result = await res.json()
          setData(result)
        }
      } catch (err) {
        console.error('Erro ao buscar funil:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFunnel()
  }, [])

  if (loading) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
      }}>
        <div style={{ textAlign: 'center', color: '#9f9bb0', padding: 40 }}>
          ⏳ Calculando funil...
        </div>
      </div>
    )
  }

  if (!data) return null

  const maxVisitors = Math.max(...data.funnel.map(f => f.visitors), 1)

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 4 }}>
            🎯 Funil de Conversão
          </h2>
          <span style={{ color: '#6b7280', fontSize: 13 }}>
            Jornada do visitante ({data.period})
          </span>
        </div>
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 8,
          padding: '8px 16px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444' }}>
            {data.overallConversion}%
          </div>
          <div style={{ color: '#9f9bb0', fontSize: 11 }}>Taxa Conversão</div>
        </div>
      </div>

      {/* Funnel Visual */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.funnel.map((step, index) => {
          const width = Math.max((step.visitors / maxVisitors) * 100, 10)
          const color = stepColors[step.step] || '#6b7280'
          
          return (
            <div key={step.step} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Step Label */}
              <div style={{ width: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{stepIcons[step.step] || '📄'}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#d3cec3' }}>{step.step}</span>
              </div>

              {/* Bar */}
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  height: 32,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${width}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)`,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 12,
                    transition: 'width 0.5s ease',
                  }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>
                      {step.visitors}
                    </span>
                  </div>
                </div>
              </div>

              {/* Percentage */}
              <div style={{ width: 60, textAlign: 'right' }}>
                <span style={{ color: color, fontWeight: 600, fontSize: 14 }}>
                  {step.percentage}%
                </span>
              </div>

              {/* Drop-off */}
              {step.dropOff > 0 && (
                <div style={{ width: 60, textAlign: 'right' }}>
                  <span style={{ color: '#ef4444', fontSize: 12 }}>
                    ↓ {step.dropOff}%
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{ color: '#9f9bb0', fontSize: 13 }}>
          📊 Total de sessões: <strong style={{ color: '#d3cec3' }}>{data.totalSessions}</strong>
        </div>
        <div style={{ color: '#9f9bb0', fontSize: 13 }}>
          📧 Chegaram no contato: <strong style={{ color: '#22c55e' }}>{data.funnel.find(f => f.step === 'Contato')?.visitors || 0}</strong>
        </div>
      </div>
    </div>
  )
}
