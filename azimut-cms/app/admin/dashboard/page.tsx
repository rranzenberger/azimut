'use client'

import { useEffect, useState } from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

interface AnalyticsData {
  kpis: {
    visitors: { value: number; change: number }
    leads: { value: number; change: number }
    hotLeads: { value: number; change: number }
    conversionRate: { value: number; change: number }
  }
  charts: {
    visitorsPerDay: Array<{ date: string; count: number }>
    leadsByStatus: Array<{ status: string; count: number }>
    trafficSources: Array<{ source: string; count: number }>
    topPages: Array<{ page: string; views: number; avgTime: number }>
    topProjects: Array<{ project: string; views: number }>
  }
  hotLeadsList: Array<{
    id: string
    name: string
    email: string
    company: string | null
    leadScore: number
    budget: string | null
    status: string
    organizationType: string | null
    createdAt: string
    lastContactAt: string | null
  }>
  leadsByType: {
    vancouver: { total: number; inPipeline: number }
    courses: { total: number; inPipeline: number }
    projects: { total: number; inPipeline: number }
  }
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics?period=${period}`)
      const data = await res.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const { kpis, charts, hotLeadsList, leadsByType } = analytics

  // Chart data
  const visitorsChartData = {
    labels: charts.visitorsPerDay.map(v => new Date(v.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
    datasets: [
      {
        label: 'Visitantes',
        data: charts.visitorsPerDay.map(v => v.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const trafficSourcesData = {
    labels: charts.trafficSources.map(t => t.source),
    datasets: [
      {
        data: charts.trafficSources.map(t => t.count),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
          '#14b8a6',
          '#f97316',
          '#06b6d4',
          '#84cc16'
        ]
      }
    ]
  }

  const leadsByStatusData = {
    labels: charts.leadsByStatus.map(l => l.status),
    datasets: [
      {
        label: 'Leads',
        data: charts.leadsByStatus.map(l => l.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard Analytics</h1>
          <p className="text-gray-600 mt-1">Visão geral de performance do site</p>
        </div>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Atualizar
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Visitantes"
          value={kpis.visitors.value.toLocaleString('pt-BR')}
          change={kpis.visitors.change}
          icon="👥"
        />
        <KPICard
          title="Leads Novos"
          value={kpis.leads.value.toLocaleString('pt-BR')}
          change={kpis.leads.change}
          icon="📧"
        />
        <KPICard
          title="Hot Leads (Score 70+)"
          value={kpis.hotLeads.value.toLocaleString('pt-BR')}
          change={kpis.hotLeads.change}
          icon="🔥"
          alert={kpis.hotLeads.value > 0}
        />
        <KPICard
          title="Taxa Conversão"
          value={`${kpis.conversionRate.value}%`}
          change={kpis.conversionRate.change}
          icon="💰"
        />
      </div>

      {/* Leads by Type - Segmented CRM */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          🎯 Leads por Tipo (CRM Segmentado)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vancouver */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🍁</span>
              <a 
                href="/admin/leads?type=VANCOUVER"
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Ver todos →
              </a>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Vancouver (Estudar Fora)</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{leadsByType.vancouver.total}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Em pipeline:</span>
              <span className="font-semibold text-indigo-600">{leadsByType.vancouver.inPipeline}</span>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">📚</span>
              <a 
                href="/admin/leads?type=CONTACT_FORM"
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Ver todos →
              </a>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Cursos & Workshops</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{leadsByType.courses.total}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Em pipeline:</span>
              <span className="font-semibold text-indigo-600">{leadsByType.courses.inPipeline}</span>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🎬</span>
              <a 
                href="/admin/leads?type=BUDGET_INQUIRY"
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Ver todos →
              </a>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Projetos Audiovisuais</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{leadsByType.projects.total}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Em pipeline:</span>
              <span className="font-semibold text-indigo-600">{leadsByType.projects.inPipeline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📈 Visitantes por Dia</h2>
          <Line
            data={visitorsChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.parsed.y} visitantes`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { precision: 0 }
                }
              }
            }}
            height={250}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🎯 Fontes de Tráfego</h2>
          <Pie
            data={trafficSourcesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.parsed} visitantes`
                  }
                }
              }
            }}
            height={250}
          />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Leads por Status</h2>
          <Bar
            data={leadsByStatusData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { precision: 0 }
                }
              }
            }}
            height={250}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📄 Top 10 Páginas</h2>
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            {charts.topPages.map((page, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{page.page || '/'}</p>
                  <p className="text-xs text-gray-500">{Math.floor(page.avgTime / 60)}min {page.avgTime % 60}s médio</p>
                </div>
                <span className="text-sm font-semibold text-blue-600">{page.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Leads Table */}
      {hotLeadsList.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">🔥 Hot Leads (Ação Necessária!)</h2>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
              {hotLeadsList.length} leads
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organização</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Contato</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hotLeadsList.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-lg mr-2`}>
                          {lead.leadScore >= 90 ? '🔥🔥' : lead.leadScore >= 80 ? '🔥' : '🌡️'}
                        </span>
                        <span className="font-semibold text-gray-900">{lead.leadScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{lead.company || '-'}</p>
                        {lead.organizationType && (
                          <p className="text-xs text-gray-500">{lead.organizationType}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{lead.budget || '-'}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {lead.lastContactAt 
                          ? new Date(lead.lastContactAt).toLocaleDateString('pt-BR')
                          : 'Nunca'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={`/admin/leads/${lead.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Ver Detalhes →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects Performance */}
      {charts.topProjects.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🎨 Projetos Mais Vistos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {charts.topProjects.slice(0, 6).map((project, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 truncate flex-1">{project.project}</p>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {project.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function KPICard({ title, value, change, icon, alert }: {
  title: string
  value: string
  change: number
  icon: string
  alert?: boolean
}) {
  const isPositive = change >= 0
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600'
  const bgColor = alert ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'

  return (
    <div className={`p-6 rounded-lg shadow-sm border ${bgColor}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {change !== 0 && (
          <span className={`text-sm font-semibold ${changeColor} flex items-center`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800',
    CONTACTED: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-purple-100 text-purple-800',
    PROPOSAL_SENT: 'bg-indigo-100 text-indigo-800',
    NEGOTIATION: 'bg-orange-100 text-orange-800',
    WON: 'bg-green-100 text-green-800',
    LOST: 'bg-gray-100 text-gray-800'
  }

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}
