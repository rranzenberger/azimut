// ════════════════════════════════════════════════════════════
// DASHBOARD DE LEADS - Visualização Centralizada
// ════════════════════════════════════════════════════════════
// Dashboard premium para visualizar, filtrar e exportar leads

import React, { useState, useEffect } from 'react'
import { calculateLeadScore, type LeadScore } from '../utils/analytics'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  projectType?: string
  budget?: string
  timeline?: string
  description?: string
  visitorFingerprint: string
  sessionId: string
  createdAt: string
  source: {
    url: string
    referrer: string
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
  }
  leadScore?: LeadScore
}

interface LeadsDashboardProps {
  lang?: 'pt' | 'en' | 'es' | 'fr'
  apiUrl?: string
}

const LeadsDashboard: React.FC<LeadsDashboardProps> = ({ 
  lang = 'pt',
  apiUrl
}) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'score'>('score')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')

  const BACKOFFICE_URL = apiUrl || import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'
  const API_BASE = `${BACKOFFICE_URL}/api`

  // Buscar leads do backoffice
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE}/leads`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch leads')
        }

        const data = await response.json()
        const leadsData: Lead[] = Array.isArray(data) ? data : data.leads || []

        // Calcular score para cada lead
        const leadsWithScores = await Promise.all(
          leadsData.map(async (lead) => {
            if (lead.visitorFingerprint) {
              try {
                const score = await calculateLeadScore(lead.visitorFingerprint)
                return { ...lead, leadScore: score }
              } catch {
                return lead
              }
            }
            return lead
          })
        )

        setLeads(leadsWithScores)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar leads')
        console.error('Erro ao buscar leads:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [API_BASE])

  // Filtrar e ordenar leads
  const filteredLeads = React.useMemo(() => {
    let filtered = leads

    // Filtro por temperatura
    if (filter !== 'all') {
      filtered = filtered.filter((lead) => {
        const score = lead.leadScore?.score || 0
        if (filter === 'hot') return score >= 70
        if (filter === 'warm') return score >= 40 && score < 70
        if (filter === 'cold') return score < 40
        return true
      })
    }

    // Busca por texto
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.company?.toLowerCase().includes(term) ||
          lead.projectType?.toLowerCase().includes(term)
      )
    }

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = a.leadScore?.score || 0
        const scoreB = b.leadScore?.score || 0
        return scoreB - scoreA
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [leads, filter, searchTerm, sortBy])

  // Exportar dados
  const exportData = () => {
    if (exportFormat === 'csv') {
      const csv = [
        'Nome,Email,Telefone,Empresa,Cargo,Projeto,Orçamento,Prazo,Score,Nível,Data',
        ...filteredLeads.map((lead) => {
          const score = lead.leadScore?.score || 0
          const level = lead.leadScore?.level || 'cold'
          return [
            `"${lead.name}"`,
            `"${lead.email}"`,
            `"${lead.phone || ''}"`,
            `"${lead.company || ''}"`,
            `"${lead.position || ''}"`,
            `"${lead.projectType || ''}"`,
            `"${lead.budget || ''}"`,
            `"${lead.timeline || ''}"`,
            score,
            level,
            new Date(lead.createdAt).toLocaleDateString('pt-BR'),
          ].join(',')
        }),
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `leads-azimut-${filter}-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else {
      const json = JSON.stringify(filteredLeads, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `leads-azimut-${filter}-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const content = {
    pt: {
      title: 'Dashboard de Leads',
      all: 'Todos',
      hot: 'Quentes',
      warm: 'Mornos',
      cold: 'Frios',
      search: 'Buscar...',
      sortBy: 'Ordenar por',
      score: 'Score',
      date: 'Data',
      export: 'Exportar',
      loading: 'Carregando leads...',
      error: 'Erro ao carregar leads',
      noLeads: 'Nenhum lead encontrado',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      company: 'Empresa',
      project: 'Projeto',
      scoreLabel: 'Score',
      level: 'Nível',
      createdAt: 'Data',
      viewDetails: 'Ver Detalhes',
      close: 'Fechar',
    },
    en: {
      title: 'Leads Dashboard',
      all: 'All',
      hot: 'Hot',
      warm: 'Warm',
      cold: 'Cold',
      search: 'Search...',
      sortBy: 'Sort by',
      score: 'Score',
      date: 'Date',
      export: 'Export',
      loading: 'Loading leads...',
      error: 'Error loading leads',
      noLeads: 'No leads found',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      project: 'Project',
      scoreLabel: 'Score',
      level: 'Level',
      createdAt: 'Date',
      viewDetails: 'View Details',
      close: 'Close',
    },
    es: {
      title: 'Dashboard de Leads',
      all: 'Todos',
      hot: 'Calientes',
      warm: 'Tibios',
      cold: 'Fríos',
      search: 'Buscar...',
      sortBy: 'Ordenar por',
      score: 'Puntuación',
      date: 'Fecha',
      export: 'Exportar',
      loading: 'Cargando leads...',
      error: 'Error al cargar leads',
      noLeads: 'No se encontraron leads',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      company: 'Empresa',
      project: 'Proyecto',
      scoreLabel: 'Puntuación',
      level: 'Nivel',
      createdAt: 'Fecha',
      viewDetails: 'Ver Detalles',
      close: 'Cerrar',
    },
    fr: {
      title: 'Tableau de Bord des Leads',
      all: 'Tous',
      hot: 'Chauds',
      warm: 'Tièdes',
      cold: 'Froids',
      search: 'Rechercher...',
      sortBy: 'Trier par',
      score: 'Score',
      date: 'Date',
      export: 'Exporter',
      loading: 'Chargement des leads...',
      error: 'Erreur lors du chargement des leads',
      noLeads: 'Aucun lead trouvé',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      company: 'Entreprise',
      project: 'Projet',
      scoreLabel: 'Score',
      level: 'Niveau',
      createdAt: 'Date',
      viewDetails: 'Voir les Détails',
      close: 'Fermer',
    },
  }

  const t = content[lang]

  const getScoreColor = (level?: string) => {
    switch (level) {
      case 'hot': return 'text-green-400 bg-green-500/20 border-green-500/50'
      case 'warm': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
    }
  }

  if (loading) {
    return (
      <div className="p-6 card-adaptive rounded-xl">
        <p className="text-theme-card-text-secondary">{t.loading}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 card-adaptive rounded-xl border border-red-500/50">
        <p className="text-red-400">{t.error}: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-handel uppercase text-theme-card-text">
          {t.title}
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
            className="dropdown-azimut text-sm"
            style={{ width: '80px' }}
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-azimut-red hover:bg-azimut-red/90 text-white rounded-lg text-sm font-semibold transition-all"
          >
            {t.export}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'hot', 'warm', 'cold'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-azimut-red text-white'
                  : 'bg-white/5 text-theme-card-text-secondary hover:bg-white/10'
              }`}
            >
              {t[f]} ({f === 'all' ? leads.length : filteredLeads.length})
            </button>
          ))}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.search}
          className="input-adaptive flex-1 max-w-md"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
          className="dropdown-azimut"
        >
          <option value="score">{t.sortBy}: {t.score}</option>
          <option value="date">{t.sortBy}: {t.date}</option>
        </select>
      </div>

      {/* Lista de Leads */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="p-6 card-adaptive rounded-xl text-center">
            <p className="text-theme-card-text-secondary">{t.noLeads}</p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const score = lead.leadScore?.score || 0
            const level = lead.leadScore?.level || 'cold'
            return (
              <div
                key={lead.id}
                className="card-adaptive rounded-xl p-6 border border-white/10 hover:border-azimut-red/30 transition-all cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-theme-card-text">
                        {lead.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(level)}`}
                      >
                        {score} - {level.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-theme-card-text-secondary">
                      <p>
                        <strong>{t.email}:</strong> {lead.email}
                      </p>
                      {lead.phone && (
                        <p>
                          <strong>{t.phone}:</strong> {lead.phone}
                        </p>
                      )}
                      {lead.company && (
                        <p>
                          <strong>{t.company}:</strong> {lead.company}
                        </p>
                      )}
                      {lead.projectType && (
                        <p>
                          <strong>{t.project}:</strong> {lead.projectType}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-theme-card-text-secondary">
                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Modal de Detalhes */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="card-adaptive rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-handel uppercase text-theme-card-text">
                {selectedLead.name}
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-theme-card-text-secondary hover:text-theme-card-text"
              >
                ✕
              </button>
            </div>

            {selectedLead.leadScore && (
              <div className={`mb-6 p-6 rounded-xl border-2 ${getScoreColor(selectedLead.leadScore.level)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-theme-card-text-secondary mb-1">{t.scoreLabel}</p>
                    <p className="text-4xl font-bold">{selectedLead.leadScore.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-theme-card-text-secondary mb-1">{t.level}</p>
                    <p className="text-2xl font-bold uppercase">{selectedLead.leadScore.level}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-theme-card-text-secondary mb-1">{t.email}</p>
                <p className="text-theme-card-text">{selectedLead.email}</p>
              </div>
              {selectedLead.phone && (
                <div>
                  <p className="text-sm font-semibold text-theme-card-text-secondary mb-1">{t.phone}</p>
                  <p className="text-theme-card-text">{selectedLead.phone}</p>
                </div>
              )}
              {selectedLead.company && (
                <div>
                  <p className="text-sm font-semibold text-theme-card-text-secondary mb-1">{t.company}</p>
                  <p className="text-theme-card-text">{selectedLead.company}</p>
                </div>
              )}
              {selectedLead.projectType && (
                <div>
                  <p className="text-sm font-semibold text-theme-card-text-secondary mb-1">{t.project}</p>
                  <p className="text-theme-card-text">{selectedLead.projectType}</p>
                </div>
              )}
              {selectedLead.description && (
                <div>
                  <p className="text-sm font-semibold text-theme-card-text-secondary mb-1">Descrição</p>
                  <p className="text-theme-card-text">{selectedLead.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadsDashboard
