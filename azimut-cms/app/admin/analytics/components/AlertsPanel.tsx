'use client'

import { useState, useEffect } from 'react'

interface Alert {
  id: string
  type: 'hot_lead' | 'traffic_spike' | 'new_country' | 'pwa_install' | 'returning_visitor' | 'high_engagement'
  severity: 'high' | 'medium' | 'low'
  title: string
  message: string
  timestamp: string
  data?: Record<string, any>
  read: boolean
}

interface AlertsData {
  alerts: Alert[]
  total: number
  summary: {
    high: number
    medium: number
    low: number
  }
  lastUpdated: string
}

const severityColors = {
  high: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#ef4444', icon: '🔴' },
  medium: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#f59e0b', icon: '🟠' },
  low: { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', text: '#22c55e', icon: '🟢' },
}

const typeIcons: Record<string, string> = {
  hot_lead: '🔥',
  traffic_spike: '📈',
  new_country: '🌍',
  pwa_install: '📱',
  returning_visitor: '🔄',
  high_engagement: '⭐',
}

export default function AlertsPanel() {
  const [data, setData] = useState<AlertsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/admin/alerts')
      if (res.ok) {
        const result = await res.json()
        setData(result)
      }
    } catch (err) {
      console.error('Erro ao buscar alertas:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
    // Atualizar a cada 2 minutos
    const interval = setInterval(fetchAlerts, 120000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return 'Agora'
    if (minutes < 60) return `${minutes}m atrás`
    if (hours < 24) return `${hours}h atrás`
    return date.toLocaleDateString('pt-BR')
  }

  const filteredAlerts = data?.alerts.filter(a => 
    filter === 'all' || a.severity === filter
  ) || []

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.02) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <span style={{ color: '#9f9bb0' }}>Carregando alertas...</span>
        </div>
      </div>
    )
  }

  const hasAlerts = data && data.total > 0
  const highCount = data?.summary.high || 0

  return (
    <div style={{
      background: hasAlerts 
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.02) 100%)'
        : 'rgba(255,255,255,0.03)',
      border: hasAlerts 
        ? '1px solid rgba(239, 68, 68, 0.3)'
        : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
    }}>
      {/* Header */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🔔</span>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              Alertas Inteligentes
              {highCount > 0 && (
                <span style={{
                  marginLeft: 12,
                  padding: '4px 10px',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                }}>
                  {highCount} urgente{highCount > 1 ? 's' : ''}
                </span>
              )}
            </h2>
            <span style={{ color: '#6b7280', fontSize: 13 }}>
              {data?.total || 0} alertas nas últimas 24h
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Summary badges */}
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ 
              padding: '4px 8px', 
              background: 'rgba(239, 68, 68, 0.2)', 
              borderRadius: 6,
              fontSize: 12,
              color: '#ef4444',
            }}>
              🔴 {data?.summary.high || 0}
            </span>
            <span style={{ 
              padding: '4px 8px', 
              background: 'rgba(245, 158, 11, 0.2)', 
              borderRadius: 6,
              fontSize: 12,
              color: '#f59e0b',
            }}>
              🟠 {data?.summary.medium || 0}
            </span>
            <span style={{ 
              padding: '4px 8px', 
              background: 'rgba(34, 197, 94, 0.2)', 
              borderRadius: 6,
              fontSize: 12,
              color: '#22c55e',
            }}>
              🟢 {data?.summary.low || 0}
            </span>
          </div>
          <span style={{ color: '#6b7280', fontSize: 18 }}>
            {expanded ? '▼' : '▶'}
          </span>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div style={{ marginTop: 20 }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['all', 'high', 'medium', 'low'] as const).map(f => (
              <button
                key={f}
                onClick={(e) => { e.stopPropagation(); setFilter(f); }}
                style={{
                  padding: '6px 12px',
                  background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  color: filter === f ? '#fff' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                {f === 'all' ? 'Todos' : f === 'high' ? '🔴 Urgente' : f === 'medium' ? '🟠 Médio' : '🟢 Baixo'}
              </button>
            ))}
          </div>

          {/* Alerts List */}
          {filteredAlerts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 40,
              color: '#6b7280',
            }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>✅</span>
              Nenhum alerta no momento
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredAlerts.slice(0, 10).map(alert => {
                const colors = severityColors[alert.severity]
                return (
                  <div
                    key={alert.id}
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 12,
                      padding: 16,
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Icon */}
                    <span style={{ fontSize: 24 }}>
                      {typeIcons[alert.type] || '📌'}
                    </span>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: colors.text }}>
                          {alert.title}
                        </h3>
                        <span style={{ color: '#6b7280', fontSize: 12 }}>
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>
                      <p style={{ margin: '8px 0 0', fontSize: 14, color: '#9f9bb0', lineHeight: 1.5 }}>
                        {alert.message}
                      </p>

                      {/* Data tags */}
                      {alert.data && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                          {Object.entries(alert.data).map(([key, value]) => (
                            <span
                              key={key}
                              style={{
                                padding: '3px 8px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 4,
                                fontSize: 11,
                                color: '#9f9bb0',
                              }}
                            >
                              {key}: <strong style={{ color: '#d3cec3' }}>{String(value)}</strong>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Severity indicator */}
                    <span style={{ fontSize: 16 }}>{colors.icon}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Show more */}
          {filteredAlerts.length > 10 && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span style={{ color: '#6b7280', fontSize: 13 }}>
                +{filteredAlerts.length - 10} alertas adicionais
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
