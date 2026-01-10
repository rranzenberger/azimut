'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import gráficos dinamicamente para evitar SSR issues
const ScoreDistributionChart = dynamic(() => import('./components/ScoreDistributionChart'), { ssr: false });
const VisitorTypesChart = dynamic(() => import('./components/VisitorTypesChart'), { ssr: false });
const CountryChart = dynamic(() => import('./components/CountryChart'), { ssr: false });
const TimelineChart = dynamic(() => import('./components/TimelineChart'), { ssr: false });

interface AnalyticsData {
  overview: {
    totalSessions: number;
    sessionsWithAI: number;
    hotLeads: number;
    warmLeads: number;
    avgConversionScore: number;
    // Novos campos da API nova
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
  // Novos dados da API nova
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
  BR: '🇧🇷',
  CA: '🇨🇦',
  US: '🇺🇸',
  FR: '🇫🇷',
  ES: '🇪🇸',
  PT: '🇵🇹',
  IT: '🇮🇹',
  DE: '🇩🇪',
  GB: '🇬🇧',
  AR: '🇦🇷',
  MX: '🇲🇽',
  CL: '🇨🇱',
  CO: '🇨🇴',
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Buscar dados da nova API e API antiga (compatibilidade)
      const [overviewRes, oldRes, visitorsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/analytics/overview').catch(() => null),
        fetch('/api/admin/analytics').catch(() => null),
        fetch('/api/admin/analytics/visitors?page=1&limit=20').catch(() => null),
        fetch('/api/admin/analytics/leads?limit=20').catch(() => null),
      ]);

      // Se nova API funcionar, usar ela
      if (overviewRes && overviewRes.ok) {
        const overviewData = await overviewRes.json();
        
        // Buscar dados antigos para compatibilidade
        let oldData = null;
        if (oldRes && oldRes.ok) {
          oldData = await oldRes.json();
        }

        // Combinar dados: nova API + dados antigos para compatibilidade
        const combinedData: AnalyticsData = {
          overview: {
            totalSessions: overviewData.metrics?.totalSessions || oldData?.overview?.totalSessions || 0,
            sessionsWithAI: oldData?.overview?.sessionsWithAI || 0,
            hotLeads: oldData?.overview?.hotLeads || 0,
            warmLeads: oldData?.overview?.warmLeads || 0,
            avgConversionScore: oldData?.overview?.avgConversionScore || 0,
            // Novos campos
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
        // Fallback: usar API antiga se nova não funcionar
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Analytics & DeepSeek IA
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Análise de comportamento e perfis de visitantes
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Sessões</div>
            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {data.overview.totalSessions}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">👥 Visitantes Únicos</div>
            <div className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
              {data.overview.uniqueVisitors || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">Com fingerprint</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">🔄 Retornantes</div>
            <div className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {data.overview.returningVisitors || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">Visitantes frequentes</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">📱 PWA Installs</div>
            <div className="mt-2 text-3xl font-bold text-cyan-600 dark:text-cyan-400">
              {data.overview.pwaInstalls || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">App instalado</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Com Perfil IA</div>
            <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {data.overview.sessionsWithAI}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {data.overview.totalSessions > 0 ? Math.round((data.overview.sessionsWithAI / data.overview.totalSessions) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Cards Adicionais - Segunda Linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">🔥 Leads Quentes</div>
            <div className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
              {data.overview.hotLeads}
            </div>
            <div className="text-xs text-gray-500 mt-1">&gt; 75% score</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">🌡️ Leads Mornos</div>
            <div className="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400">
              {data.overview.warmLeads}
            </div>
            <div className="text-xs text-gray-500 mt-1">50-75% score</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">📈 Score Médio</div>
            <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
              {data.overview.avgConversionScore}%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">📄 Page Views</div>
            <div className="mt-2 text-3xl font-bold text-teal-600 dark:text-teal-400">
              {data.overview.totalPageViews || 0}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">📉 Bounce Rate</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {data.overview.bounceRate?.toFixed(1) || '0.0'}%
            </div>
          </div>
        </div>

        {/* Distribuição de Scores */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Distribuição de Conversion Scores
          </h2>
          
          {/* Gráfico de Pizza */}
          <div className="mb-6">
            <ScoreDistributionChart
              hot={data.scoreDistribution.hot}
              warm={data.scoreDistribution.warm}
              cold={data.scoreDistribution.cold}
            />
          </div>
          
          {/* Barras de progresso (mantidas para referência rápida) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">🔥 Quentes (&gt;75%)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {data.scoreDistribution.hot}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all"
                  style={{
                    width: `${(data.scoreDistribution.hot / data.overview.sessionsWithAI) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">🌡️ Mornos (50-75%)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {data.scoreDistribution.warm}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${(data.scoreDistribution.warm / data.overview.sessionsWithAI) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">❄️ Frios (&lt;50%)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {data.scoreDistribution.cold}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${(data.scoreDistribution.cold / data.overview.sessionsWithAI) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Linha - Timeline */}
        {data.timeline && data.timeline.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📈 Timeline de Visitantes (Últimos 30 dias)
            </h2>
            <TimelineChart data={data.timeline} />
          </div>
        )}

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visitor Types */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tipos de Visitantes
            </h2>
            <VisitorTypesChart data={data.visitorTypes} />
          </div>

          {/* Visitors by Country */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Visitantes por País
            </h2>
            <CountryChart data={data.visitorsByCountry} />
          </div>
        </div>

        {/* Top Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Projetos Mais Visualizados
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Projeto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Visualizações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.topProjects.map((project, index) => (
                  <tr key={project.id}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {project.title}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {project.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visitantes com Fingerprint */}
        {data.visitors && data.visitors.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              👥 Visitantes com Fingerprint
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fingerprint
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Browser
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      País
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Visitas
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Engajamento
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Última Visita
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.visitors.map((visitor, index) => (
                    <tr key={visitor.fingerprint || index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-mono text-xs">
                        {visitor.fingerprint?.substring(0, 12)}...
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {visitor.deviceType || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {visitor.browser || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {countryFlags[visitor.country || ''] || '🌍'} {visitor.country || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {visitor.visitCount || 1}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            (visitor.engagementScore || 0) >= 70
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : (visitor.engagementScore || 0) >= 40
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}
                        >
                          {visitor.engagementScore || 0}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {new Date(visitor.lastActivityAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🎯 Lead Candidates (Alta Probabilidade de Conversão)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fingerprint
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Probabilidade
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Engajamento
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      País
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Última Visita
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.leadCandidates.map((lead, index) => (
                    <tr key={lead.fingerprint || index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-mono text-xs">
                        {lead.fingerprint?.substring(0, 12)}...
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            (lead.conversionProbability || 0) >= 0.8
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : (lead.conversionProbability || 0) >= 0.6
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                        >
                          {((lead.conversionProbability || 0) * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            (lead.engagementScore || 0) >= 70
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : (lead.engagementScore || 0) >= 40
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}
                        >
                          {lead.engagementScore || 0}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {lead.deviceType || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {countryFlags[lead.country || ''] || '🌍'} {lead.country || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {new Date(lead.lastActivityAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Sessions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🕐 Sessões Recentes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    País
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Páginas
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duração
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.recentSessions.map((session) => (
                  <tr key={session.sessionId}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {countryFlags[session.country || ''] || '🌍'} {session.country || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {visitorTypeLabels[session.visitorType]?.split(' ')[0] || '❓'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          session.conversionScore > 75
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : session.conversionScore >= 50
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}
                      >
                        {session.conversionScore}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {session.pagesViewed}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {Math.round(session.duration / 60)}min
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(session.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Atualizar Dados
          </button>
        </div>
      </div>
    </div>
  );
}

