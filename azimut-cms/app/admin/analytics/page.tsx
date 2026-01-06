'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AnalyticsData {
  overview: {
    totalSessions: number;
    sessionsWithAI: number;
    hotLeads: number;
    warmLeads: number;
    avgConversionScore: number;
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
      const res = await fetch('/api/admin/analytics');
      
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Erro ao carregar analytics');
      }

      const analyticsData = await res.json();
      setData(analyticsData);
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
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Com Perfil IA</div>
            <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {data.overview.sessionsWithAI}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((data.overview.sessionsWithAI / data.overview.totalSessions) * 100)}%
            </div>
          </div>

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
        </div>

        {/* Distribuição de Scores */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Distribuição de Conversion Scores
          </h2>
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

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visitor Types */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tipos de Visitantes
            </h2>
            <div className="space-y-3">
              {Object.entries(data.visitorTypes)
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {visitorTypeLabels[type] || type}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(count / data.overview.sessionsWithAI) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Visitors by Country */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Visitantes por País
            </h2>
            <div className="space-y-3">
              {Object.entries(data.visitorsByCountry)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {countryFlags[country] || '🌍'} {country}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(count / data.overview.totalSessions) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
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

