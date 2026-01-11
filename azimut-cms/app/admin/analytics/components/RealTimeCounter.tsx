'use client'

import { useState, useEffect } from 'react'

interface RealTimeData {
  onlineNow: number
  lastUpdated: string
  topPages: Array<{ page: string; count: number }>
  byCountry: Array<{ country: string; count: number }>
  activeSessions: Array<{
    id: string
    country: string | null
    device: string | null
    currentPage: string
    lastActivity: string
  }>
}

const countryFlags: Record<string, string> = {
  BR: '🇧🇷', CA: '🇨🇦', US: '🇺🇸', FR: '🇫🇷', ES: '🇪🇸', PT: '🇵🇹',
  IT: '🇮🇹', DE: '🇩🇪', GB: '🇬🇧', AR: '🇦🇷', MX: '🇲🇽', Unknown: '🌍',
}

export default function RealTimeCounter() {
  const [data, setData] = useState<RealTimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchRealTime = async () => {
    try {
      const res = await fetch('/api/admin/analytics/realtime')
      if (res.ok) {
        const result = await res.json()
        setData(result)
        setLastRefresh(new Date())
      }
    } catch (err) {
      console.error('Erro ao buscar dados real-time:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRealTime()
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchRealTime, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }}></div>
          <span style={{ color: '#9f9bb0' }}>Carregando...</span>
        </div>
      </div>
    )
  }

  const onlineCount = data?.onlineNow || 0

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: onlineCount > 0 ? '#22c55e' : '#6b7280',
            boxShadow: onlineCount > 0 ? '0 0 10px #22c55e' : 'none',
            animation: onlineCount > 0 ? 'pulse 2s infinite' : 'none',
          }}></div>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#22c55e' }}>⚡ TEMPO REAL</span>
        </div>
        <span style={{ color: '#6b7280', fontSize: 12 }}>
          Atualizado: {lastRefresh.toLocaleTimeString('pt-BR')}
        </span>
      </div>

      {/* Main Counter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {/* Online Now */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>
            {onlineCount}
          </div>
          <div style={{ color: '#9f9bb0', fontSize: 14, marginTop: 8 }}>
            visitantes online agora
          </div>
        </div>

        {/* Top Pages Being Viewed */}
        <div>
          <div style={{ color: '#9f9bb0', fontSize: 12, marginBottom: 12, textTransform: 'uppercase' }}>
            📄 Páginas Ativas
          </div>
          {data?.topPages?.slice(0, 4).map((page, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: '#d3cec3', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {page.page.replace(/^\/(pt|en|fr|es)/, '').replace(/^\//, '/') || '/'}
              </span>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>{page.count}</span>
            </div>
          ))}
          {(!data?.topPages || data.topPages.length === 0) && (
            <div style={{ color: '#6b7280', fontSize: 13 }}>Nenhuma página ativa</div>
          )}
        </div>

        {/* By Country */}
        <div>
          <div style={{ color: '#9f9bb0', fontSize: 12, marginBottom: 12, textTransform: 'uppercase' }}>
            🌍 Por País
          </div>
          {data?.byCountry?.slice(0, 4).map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: '#d3cec3' }}>
                {countryFlags[c.country] || '🌍'} {c.country}
              </span>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>{c.count}</span>
            </div>
          ))}
          {(!data?.byCountry || data.byCountry.length === 0) && (
            <div style={{ color: '#6b7280', fontSize: 13 }}>Nenhum país identificado</div>
          )}
        </div>
      </div>

      {/* Active Sessions List (se tiver muitos) */}
      {onlineCount > 0 && data?.activeSessions && data.activeSessions.length > 0 && (
        <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
          <div style={{ color: '#9f9bb0', fontSize: 12, marginBottom: 12, textTransform: 'uppercase' }}>
            👥 Sessões Ativas ({onlineCount})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.activeSessions.slice(0, 8).map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span>{countryFlags[s.country || 'Unknown'] || '🌍'}</span>
                <span style={{ color: '#9f9bb0' }}>{s.device || 'Desktop'}</span>
                <span style={{ color: '#6b7280' }}>•</span>
                <span style={{ color: '#22c55e' }}>{s.currentPage.replace(/^\/(pt|en|fr|es)/, '').substring(0, 15) || '/'}</span>
              </div>
            ))}
            {onlineCount > 8 && (
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 12,
                color: '#6b7280',
              }}>
                +{onlineCount - 8} mais
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
