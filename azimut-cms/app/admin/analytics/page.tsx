'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import gráficos dinamicamente para evitar SSR issues
const ScoreDistributionChart = dynamic(() => import('./components/ScoreDistributionChart'), { ssr: false });
const VisitorTypesChart = dynamic(() => import('./components/VisitorTypesChart'), { ssr: false });
const CountryChart = dynamic(() => import('./components/CountryChart'), { ssr: false });
const TimelineChart = dynamic(() => import('./components/TimelineChart'), { ssr: false });

// Novos componentes Premium
const RealTimeCounter = dynamic(() => import('./components/RealTimeCounter'), { ssr: false });
const ConversionFunnel = dynamic(() => import('./components/ConversionFunnel'), { ssr: false });
const WorldMap = dynamic(() => import('./components/WorldMap'), { ssr: false });
const AlertsPanel = dynamic(() => import('./components/AlertsPanel'), { ssr: false });

interface AnalyticsData {
  overview: {
    totalSessions: number;
    sessionsWithAI: number;
    hotLeads: number;
    warmLeads: number;
    avgConversionScore: number;
    uniqueVisitors?: number;
    returningVisitors?: number;
    pwaInstalls?: number;
    totalPageViews?: number;
    bounceRate?: number;
  };
  visitorTypes: Record<string, number>;
  visitorsByCountry: Record<string, number>;
  visitorsByLanguage: Record<string, number>;
  topProjects: Array<{
    id: string;
    title: string;
    slug: string;
    count: number;
  }>;
  recentSessions: Array<{
    sessionId: string;
    country: string | null;
    language: string | null;
    visitorType: string;
    conversionScore: number;
    pagesViewed: number;
    duration: number;
    createdAt: string;
    lastActivityAt: string;
  }>;
  scoreDistribution: {
    hot: number;
    warm: number;
    cold: number;
  };
  timeline?: Array<{
    date: string;
    count: number;
  }>;
  visitors?: Array<{
    fingerprint: string;
    deviceType: string | null;
    browser: string | null;
    country: string | null;
    visitCount: number;
    lastActivityAt: string;
    engagementScore: number;
  }>;
  leadCandidates?: Array<{
    fingerprint: string;
    conversionProbability: number;
    engagementScore: number;
    deviceType: string | null;
    country: string | null;
    lastActivityAt: string;
  }>;
}

const visitorTypeLabels: Record<string, string> = {
  MUSEUM_CURATOR: '🏛️ Museus',
  CITY_OFFICIAL: '🏢 Governo',
  BRAND_MANAGER: '🎯 Marcas',
  FESTIVAL_ORGANIZER: '🎭 Festivais',
  EDUCATIONAL_LEADER: '📚 Educação',
  TECH_ENTHUSIAST: '💻 Tech',
  GENERAL_PUBLIC: '👥 Público Geral',
  UNKNOWN: '❓ Desconhecido',
};

const countryFlags: Record<string, string> = {
  BR: '🇧🇷', CA: '🇨🇦', US: '🇺🇸', FR: '🇫🇷', ES: '🇪🇸', PT: '🇵🇹',
  IT: '🇮🇹', DE: '🇩🇪', GB: '🇬🇧', AR: '🇦🇷', MX: '🇲🇽', CL: '🇨🇱', CO: '🇨🇴',
};

// Estilos inline reutilizáveis
const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  padding: 24,
};

const cardLargeStyle = {
  ...cardStyle,
  padding: 32,
};

const sectionStyle = {
  ...cardStyle,
  marginBottom: 24,
};

const gridStyle3 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 20,
  marginBottom: 20,
};

const gridStyle4 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  marginBottom: 20,
};

const gridStyle2 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,
  marginBottom: 24,
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cleaningUp, setCleaningUp] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      const [overviewRes, oldRes, visitorsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/analytics/overview').catch(() => null),
        fetch('/api/admin/analytics').catch(() => null),
        fetch('/api/admin/analytics/visitors?page=1&limit=20').catch(() => null),
        fetch('/api/admin/analytics/leads?limit=20').catch(() => null),
      ]);

      if (overviewRes && overviewRes.ok) {
        const overviewData = await overviewRes.json();
        let oldData = null;
        if (oldRes && oldRes.ok) {
          oldData = await oldRes.json();
        }

        const combinedData: AnalyticsData = {
          overview: {
            totalSessions: overviewData.metrics?.totalSessions || oldData?.overview?.totalSessions || 0,
            sessionsWithAI: oldData?.overview?.sessionsWithAI || 0,
            hotLeads: oldData?.overview?.hotLeads || 0,
            warmLeads: oldData?.overview?.warmLeads || 0,
            avgConversionScore: oldData?.overview?.avgConversionScore || 0,
            uniqueVisitors: overviewData.metrics?.uniqueVisitors || 0,
            returningVisitors: overviewData.metrics?.returningVisitors || 0,
            pwaInstalls: overviewData.metrics?.pwaInstalls || 0,
            totalPageViews: overviewData.metrics?.totalPageViews || 0,
            bounceRate: overviewData.metrics?.bounceRate || 0,
          },
          visitorTypes: oldData?.visitorTypes || {},
          visitorsByCountry: overviewData.charts?.countries?.reduce((acc: Record<string, number>, item: any) => {
            acc[item.country] = item.count;
            return acc;
          }, {}) || oldData?.visitorsByCountry || {},
          visitorsByLanguage: oldData?.visitorsByLanguage || {},
          topProjects: overviewData.charts?.topPages?.slice(0, 10).map((page: any, index: number) => ({
            id: `page-${index}`,
            title: page.page,
            slug: page.page,
            count: page.views,
          })) || oldData?.topProjects || [],
          recentSessions: oldData?.recentSessions || [],
          scoreDistribution: oldData?.scoreDistribution || { hot: 0, warm: 0, cold: 0 },
          timeline: overviewData.charts?.timeline || [],
          visitors: visitorsRes && visitorsRes.ok ? ((await visitorsRes.json()).visitors || []).map((v: any) => ({
            fingerprint: v.fingerprint || v.visitorFingerprint,
            deviceType: v.deviceType,
            browser: v.browser,
            country: v.country,
            visitCount: v.visitCount || 1,
            lastActivityAt: v.lastActivityAt || v.updatedAt,
            engagementScore: v.engagementScore || 0,
          })) : [],
          leadCandidates: leadsRes && leadsRes.ok ? ((await leadsRes.json()).leads || []).map((l: any) => ({
            fingerprint: l.fingerprint || l.visitorFingerprint,
            conversionProbability: l.conversionProbability || 0,
            engagementScore: l.engagementScore || 0,
            deviceType: l.deviceType,
            country: l.country,
            lastActivityAt: l.lastActivityAt || l.updatedAt,
          })) : [],
        };

        setData(combinedData);
      } else if (oldRes && oldRes.ok) {
        const oldData = await oldRes.json();
        setData({
          ...oldData,
          timeline: [],
          visitors: [],
          leadCandidates: [],
        });
      } else {
        throw new Error('Erro ao carregar analytics');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanupTestData = async () => {
    if (!confirm('⚠️ ATENÇÃO: Isso apagará TODOS os dados de teste (prefixo TESTE_). Tem certeza?')) {
      return;
    }

    setCleaningUp(true);
    try {
      const response = await fetch('/api/admin/cleanup-test-data', { method: 'POST' });
      const result = await response.json();

      if (result.success) {
        alert(`✅ ${result.message}\n\nApagados:\n- ${result.deleted.sessions} sessões\n- ${result.deleted.pageViews} page views\n- ${result.deleted.behaviors} comportamentos\n- ${result.deleted.pwaInstalls} PWA installs\n- ${result.deleted.interestScores} interest scores\n- ${result.deleted.leads} leads`);
        fetchAnalytics();
      } else {
        alert(`❌ Erro: ${result.error || 'Erro desconhecido'}`);
      }
    } catch (error: any) {
      alert(`❌ Erro ao apagar dados de teste: ${error.message}`);
    } finally {
      setCleaningUp(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <p style={{ color: '#9f9bb0' }}>Carregando analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ef4444', marginBottom: 16 }}>{error}</p>
          <button
            onClick={fetchAnalytics}
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, marginBottom: 8 }}>📊 Analytics & IA</h1>
          <p style={{ color: '#9f9bb0', margin: 0 }}>Análise de comportamento e perfis de visitantes</p>
        </div>
        <button
          onClick={handleCleanupTestData}
          disabled={cleaningUp}
          style={{
            padding: '10px 20px',
            background: cleaningUp ? '#6b7280' : '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: cleaningUp ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {cleaningUp ? '⏳ Apagando...' : '🗑️ Apagar Dados de Teste'}
        </button>
      </header>

      {/* ⚡ TEMPO REAL - Visitantes Online Agora */}
      <RealTimeCounter />

      {/* 🔔 ALERTAS INTELIGENTES */}
      <AlertsPanel />

      {/* 🎯 Funil de Conversão */}
      <ConversionFunnel />

      {/* 🌍 Mapa de Visitantes */}
      <WorldMap data={data.visitorsByCountry} />

      {/* Linha 1: 3 Cards Grandes */}
      <div style={gridStyle3}>
        <div style={{ ...cardLargeStyle, borderColor: 'rgba(99, 102, 241, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: '#9f9bb0', fontWeight: 600 }}>Total de Sessões</span>
            <span style={{ fontSize: 32 }}>📊</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#f3f4f6' }}>{data.overview.totalSessions}</div>
        </div>

        <div style={{ ...cardLargeStyle, borderColor: 'rgba(168, 85, 247, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: '#9f9bb0', fontWeight: 600 }}>👥 Visitantes Únicos</span>
            <span style={{ fontSize: 32 }}>👥</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#a855f7' }}>{data.overview.uniqueVisitors || 0}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>Com fingerprint</div>
        </div>

        <div style={{ ...cardLargeStyle, borderColor: 'rgba(34, 197, 94, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: '#9f9bb0', fontWeight: 600 }}>📈 Score Médio</span>
            <span style={{ fontSize: 32 }}>📈</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#22c55e' }}>{data.overview.avgConversionScore}%</div>
        </div>
      </div>

      {/* Linha 2: 4 Cards Médios */}
      <div style={gridStyle4}>
        <div style={{ ...cardStyle, borderColor: 'rgba(99, 102, 241, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>🔄 Retornantes</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#818cf8' }}>{data.overview.returningVisitors || 0}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>Visitantes frequentes</div>
        </div>

        <div style={{ ...cardStyle, borderColor: 'rgba(6, 182, 212, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>📱 PWA Installs</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#06b6d4' }}>{data.overview.pwaInstalls || 0}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>App instalado</div>
        </div>

        <div style={{ ...cardStyle, borderColor: 'rgba(20, 184, 166, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>📄 Page Views</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#14b8a6' }}>{data.overview.totalPageViews || 0}</div>
        </div>

        <div style={{ ...cardStyle, borderColor: 'rgba(234, 179, 8, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>📉 Bounce Rate</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#eab308' }}>{data.overview.bounceRate?.toFixed(1) || '0.0'}%</div>
        </div>
      </div>

      {/* Linha 3: 4 Cards IA/Leads */}
      <div style={gridStyle4}>
        <div style={{ ...cardStyle, borderColor: 'rgba(59, 130, 246, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>🤖 Com Perfil IA</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#3b82f6' }}>{data.overview.sessionsWithAI}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
            {data.overview.totalSessions > 0 ? Math.round((data.overview.sessionsWithAI / data.overview.totalSessions) * 100) : 0}%
          </div>
        </div>

        <div style={{ ...cardStyle, borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>🔥 Leads Quentes</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>{data.overview.hotLeads}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>&gt; 75% score</div>
        </div>

        <div style={{ ...cardStyle, borderColor: 'rgba(249, 115, 22, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>🌡️ Leads Mornos</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#f97316' }}>{data.overview.warmLeads}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>50-75% score</div>
        </div>

        <div style={{ ...cardStyle, borderColor: 'rgba(156, 163, 175, 0.3)' }}>
          <div style={{ color: '#9f9bb0', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>📊 Total Leads</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#9ca3af' }}>{data.overview.hotLeads + data.overview.warmLeads}</div>
          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>Leads totais</div>
        </div>
      </div>

      {/* Timeline */}
      {data.timeline && data.timeline.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>📈 Timeline de Visitantes (Últimos 30 dias)</h2>
          <TimelineChart data={data.timeline} />
        </div>
      )}

      {/* Gráficos - 2 colunas */}
      <div style={gridStyle2}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Tipos de Visitantes</h2>
          <VisitorTypesChart data={data.visitorTypes} />
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Visitantes por País</h2>
          <CountryChart data={data.visitorsByCountry} />
        </div>
      </div>

      {/* Score Distribution */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Distribuição de Scores</h2>
        <ScoreDistributionChart
          hot={data.scoreDistribution.hot}
          warm={data.scoreDistribution.warm}
          cold={data.scoreDistribution.cold}
        />
        <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#9f9bb0', fontSize: 14 }}>🔥 Quentes (&gt;75%)</span>
              <span style={{ fontWeight: 600 }}>{data.scoreDistribution.hot}</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
              <div style={{ height: '100%', background: '#ef4444', borderRadius: 4, width: `${(data.scoreDistribution.hot / Math.max(data.overview.sessionsWithAI, 1)) * 100}%` }}></div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#9f9bb0', fontSize: 14 }}>🌡️ Mornos (50-75%)</span>
              <span style={{ fontWeight: 600 }}>{data.scoreDistribution.warm}</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
              <div style={{ height: '100%', background: '#f97316', borderRadius: 4, width: `${(data.scoreDistribution.warm / Math.max(data.overview.sessionsWithAI, 1)) * 100}%` }}></div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#9f9bb0', fontSize: 14 }}>❄️ Frios (&lt;50%)</span>
              <span style={{ fontWeight: 600 }}>{data.scoreDistribution.cold}</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
              <div style={{ height: '100%', background: '#3b82f6', borderRadius: 4, width: `${(data.scoreDistribution.cold / Math.max(data.overview.sessionsWithAI, 1)) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Projects */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>🏆 Páginas Mais Visualizadas</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '12px 0', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>#</th>
              <th style={{ textAlign: 'left', padding: '12px 0', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Página</th>
              <th style={{ textAlign: 'left', padding: '12px 0', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Views</th>
            </tr>
          </thead>
          <tbody>
            {data.topProjects.slice(0, 10).map((project, index) => (
              <tr key={project.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 0', color: '#9f9bb0' }}>{index + 1}</td>
                <td style={{ padding: '12px 0' }}>{project.title}</td>
                <td style={{ padding: '12px 0', color: '#3b82f6', fontWeight: 600 }}>{project.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visitantes com Fingerprint */}
      {data.visitors && data.visitors.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>👥 Visitantes com Fingerprint</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Fingerprint</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Device</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Browser</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>País</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Visitas</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Engajamento</th>
                </tr>
              </thead>
              <tbody>
                {data.visitors.slice(0, 15).map((visitor, index) => (
                  <tr key={visitor.fingerprint || index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontSize: 12 }}>{visitor.fingerprint?.substring(0, 12)}...</td>
                    <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{visitor.deviceType || 'Unknown'}</td>
                    <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{visitor.browser || 'Unknown'}</td>
                    <td style={{ padding: '12px 8px' }}>{countryFlags[visitor.country || ''] || '🌍'} {visitor.country || 'N/A'}</td>
                    <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{visitor.visitCount || 1}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background: (visitor.engagementScore || 0) >= 70 ? 'rgba(34, 197, 94, 0.2)' : (visitor.engagementScore || 0) >= 40 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                        color: (visitor.engagementScore || 0) >= 70 ? '#22c55e' : (visitor.engagementScore || 0) >= 40 ? '#eab308' : '#9ca3af',
                      }}>
                        {visitor.engagementScore || 0}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Candidates */}
      {data.leadCandidates && data.leadCandidates.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>🎯 Lead Candidates (Alta Probabilidade)</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Fingerprint</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Probabilidade</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Engajamento</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Device</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>País</th>
                </tr>
              </thead>
              <tbody>
                {data.leadCandidates.slice(0, 10).map((lead, index) => (
                  <tr key={lead.fingerprint || index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontSize: 12 }}>{lead.fingerprint?.substring(0, 12)}...</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background: (lead.conversionProbability || 0) >= 0.8 ? 'rgba(239, 68, 68, 0.2)' : (lead.conversionProbability || 0) >= 0.6 ? 'rgba(249, 115, 22, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                        color: (lead.conversionProbability || 0) >= 0.8 ? '#ef4444' : (lead.conversionProbability || 0) >= 0.6 ? '#f97316' : '#eab308',
                      }}>
                        {((lead.conversionProbability || 0) * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background: (lead.engagementScore || 0) >= 70 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                        color: (lead.engagementScore || 0) >= 70 ? '#22c55e' : '#9ca3af',
                      }}>
                        {lead.engagementScore || 0}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{lead.deviceType || 'Unknown'}</td>
                    <td style={{ padding: '12px 8px' }}>{countryFlags[lead.country || ''] || '🌍'} {lead.country || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>🕐 Sessões Recentes</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>País</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Tipo</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Score</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Páginas</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Duração</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.recentSessions.slice(0, 15).map((session) => (
                <tr key={session.sessionId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 8px' }}>{countryFlags[session.country || ''] || '🌍'} {session.country || 'N/A'}</td>
                  <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{visitorTypeLabels[session.visitorType]?.split(' ')[0] || '❓'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      background: session.conversionScore > 75 ? 'rgba(239, 68, 68, 0.2)' : session.conversionScore >= 50 ? 'rgba(249, 115, 22, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                      color: session.conversionScore > 75 ? '#ef4444' : session.conversionScore >= 50 ? '#f97316' : '#3b82f6',
                    }}>
                      {session.conversionScore}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{session.pagesViewed}</td>
                  <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>{Math.round(session.duration / 60)}min</td>
                  <td style={{ padding: '12px 8px', color: '#9f9bb0' }}>
                    {new Date(session.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refresh Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <button
          onClick={fetchAnalytics}
          style={{
            padding: '12px 32px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          🔄 Atualizar Dados
        </button>
      </div>
    </div>
  );
}
