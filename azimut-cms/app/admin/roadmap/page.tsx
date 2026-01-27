/**
 * Roadmap e Planejamento Completo
 * Visualização de todas as funcionalidades planejadas e priorizadas
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Feature {
  id: string
  title: string
  description: string
  category: 'seo' | 'ia' | 'web3' | 'game' | 'neuro' | 'navegacao' | 'analytics' | 'outros'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  status: 'done' | 'in-progress' | 'planned' | 'backlog'
  dependencies?: string[]
  estimatedTime?: string
}

const features: Feature[] = [
  // ✅ COMPLETO
  {
    id: 'seo-ia-otimizacao',
    title: 'Otimização SEO com IA',
    description: 'Sistema completo de otimização de projetos com Claude/DeepSeek',
    category: 'seo',
    priority: 'high',
    status: 'done',
  },
  {
    id: 'analise-leads-ia',
    title: 'Análise Inteligente de Leads',
    description: 'Qualificação automática de leads com IA, score e priorização',
    category: 'ia',
    priority: 'high',
    status: 'done',
  },
  {
    id: 'dashboard-leads',
    title: 'Dashboard de Leads',
    description: 'Visualização de métricas, leads quentes e insights',
    category: 'analytics',
    priority: 'high',
    status: 'done',
  },
  {
    id: 'ferramentas-backoffice',
    title: 'Ferramentas e Automações',
    description: 'Central de ferramentas com botões visuais para todas as ações',
    category: 'outros',
    priority: 'high',
    status: 'done',
  },
  
  // 🚧 EM PROGRESSO
  {
    id: 'navegacao-ia',
    title: 'Navegação Inteligente com IA',
    description: 'Sistema de navegação que aprende com comportamento do usuário e sugere conteúdo personalizado',
    category: 'navegacao',
    priority: 'high',
    status: 'planned',
    estimatedTime: '2-3 semanas',
  },
  {
    id: 'analise-avancada-ia',
    title: 'Análise Avançada com DeepSeek/Claude',
    description: 'Dashboard de análise profunda de comportamento, padrões e insights preditivos',
    category: 'ia',
    priority: 'high',
    status: 'planned',
    estimatedTime: '1-2 semanas',
  },
  
  // 📋 PLANEJADO
  {
    id: 'gamificacao-basica',
    title: 'Gamificação Básica - Sistema de Pontos',
    description: 'Sistema de pontuação por ações no site, níveis, badges e dashboard de progresso',
    category: 'game',
    priority: 'high',
    status: 'planned',
    estimatedTime: '1-2 semanas',
  },
  {
    id: 'web3-integration',
    title: 'Integração Web3 - Wallet Connect',
    description: 'Conectar carteiras digitais (MetaMask/WalletConnect), verificar elegibilidade e preparar para NFTs',
    category: 'web3',
    priority: 'high',
    status: 'planned',
    estimatedTime: '2 semanas',
    dependencies: ['gamificacao-basica'],
  },
  {
    id: 'nfts-personalizados',
    title: 'NFTs Personalizados para Alunos',
    description: 'Mintar NFTs como recompensa: Explorador, Estudante Online/Vancouver, Mestre, Lenda',
    category: 'web3',
    priority: 'high',
    status: 'planned',
    estimatedTime: '1 semana',
    dependencies: ['web3-integration'],
  },
  {
    id: 'game-show-interativo',
    title: 'Game Show Interativo com NFTs',
    description: 'Quiz ao vivo durante eventos, leaderboard em tempo real, NFTs especiais para top participantes',
    category: 'game',
    priority: 'medium',
    status: 'planned',
    estimatedTime: '2 semanas',
    dependencies: ['nfts-personalizados'],
  },
  {
    id: 'game-features',
    title: 'Features de Game',
    description: 'Sistema de gamificação, achievements, leaderboards e interatividade',
    category: 'game',
    priority: 'medium',
    status: 'planned',
    estimatedTime: '2-3 semanas',
  },
  {
    id: 'neuro-analytics',
    title: 'Analytics Neurocientífico',
    description: 'Análise de atenção, engajamento e experiência baseada em neurociência',
    category: 'neuro',
    priority: 'medium',
    status: 'planned',
    estimatedTime: '3-4 semanas',
    dependencies: ['analise-avancada-ia'],
  },
  {
    id: 'chatbot-avancado',
    title: 'Chatbot Avançado com IA',
    description: 'Assistente virtual que entende contexto e ajuda usuários em tempo real',
    category: 'ia',
    priority: 'medium',
    status: 'planned',
    estimatedTime: '2 semanas',
  },
  {
    id: 'personalizacao-extrema',
    title: 'Personalização Extrema',
    description: 'Conteúdo 100% personalizado baseado em perfil, comportamento e intenção',
    category: 'ia',
    priority: 'medium',
    status: 'planned',
    estimatedTime: '2-3 semanas',
  },
  {
    id: 'recomendacoes-ia',
    title: 'Sistema de Recomendações IA',
    description: 'Recomenda projetos, serviços e conteúdo baseado em análise profunda',
    category: 'ia',
    priority: 'medium',
    status: 'planned',
    estimatedTime: '1-2 semanas',
  },
  
  // 🔮 BACKLOG
  {
    id: 'ar-vr-enhanced',
    title: 'AR/VR Enhanced',
    description: 'Experiências imersivas aprimoradas com IA e personalização',
    category: 'outros',
    priority: 'low',
    status: 'backlog',
  },
  {
    id: 'voice-interface',
    title: 'Interface por Voz',
    description: 'Navegação e controle por comandos de voz com IA',
    category: 'navegacao',
    priority: 'low',
    status: 'backlog',
  },
]

export default function RoadmapPage() {
  const [filter, setFilter] = useState<'all' | Feature['category']>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | Feature['priority']>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | Feature['status']>('all')

  const categories = {
    seo: { label: '🔍 SEO', color: '#3b82f6' },
    ia: { label: '🤖 IA', color: '#8b5cf6' },
    web3: { label: '⛓️ Web3', color: '#f59e0b' },
    game: { label: '🎮 Game', color: '#ef4444' },
    neuro: { label: '🧠 Neuro', color: '#ec4899' },
    navegacao: { label: '🧭 Navegação', color: '#10b981' },
    analytics: { label: '📊 Analytics', color: '#06b6d4' },
    outros: { label: '⚡ Outros', color: '#6366f1' },
  }

  const priorities = {
    urgent: { label: '🔴 Urgente', color: '#ef4444' },
    high: { label: '🟠 Alta', color: '#f59e0b' },
    medium: { label: '🟡 Média', color: '#eab308' },
    low: { label: '🟢 Baixa', color: '#10b981' },
  }

  const statuses = {
    done: { label: '✅ Completo', color: '#10b981' },
    'in-progress': { label: '🚧 Em Progresso', color: '#3b82f6' },
    planned: { label: '📋 Planejado', color: '#8b5cf6' },
    backlog: { label: '🔮 Backlog', color: '#6b7280' },
  }

  const filteredFeatures = features.filter(f => {
    if (filter !== 'all' && f.category !== filter) return false
    if (priorityFilter !== 'all' && f.priority !== priorityFilter) return false
    if (statusFilter !== 'all' && f.status !== statusFilter) return false
    return true
  })

  const stats = {
    total: features.length,
    done: features.filter(f => f.status === 'done').length,
    inProgress: features.filter(f => f.status === 'in-progress').length,
    planned: features.filter(f => f.status === 'planned').length,
    backlog: features.filter(f => f.status === 'backlog').length,
  }

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          🗺️ Roadmap e Planejamento
        </h1>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
          Visão completa de todas as funcionalidades planejadas e priorizadas
        </p>
      </header>

      {/* Estatísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        <div style={{
          padding: 20,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>{stats.total}</div>
          <div style={{ fontSize: 14, color: '#c0bccf' }}>Total</div>
        </div>
        <div style={{
          padding: 20,
          borderRadius: 12,
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981' }}>{stats.done}</div>
          <div style={{ fontSize: 14, color: '#c0bccf' }}>Completo</div>
        </div>
        <div style={{
          padding: 20,
          borderRadius: 12,
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#3b82f6' }}>{stats.inProgress}</div>
          <div style={{ fontSize: 14, color: '#c0bccf' }}>Em Progresso</div>
        </div>
        <div style={{
          padding: 20,
          borderRadius: 12,
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#8b5cf6' }}>{stats.planned}</div>
          <div style={{ fontSize: 14, color: '#c0bccf' }}>Planejado</div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        padding: 20,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c0bccf', marginBottom: 8 }}>
              Categoria:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                fontSize: 14,
              }}
            >
              <option value="all">Todas</option>
              {Object.entries(categories).map(([key, cat]) => (
                <option key={key} value={key}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c0bccf', marginBottom: 8 }}>
              Prioridade:
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                fontSize: 14,
              }}
            >
              <option value="all">Todas</option>
              {Object.entries(priorities).map(([key, pri]) => (
                <option key={key} value={key}>{pri.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c0bccf', marginBottom: 8 }}>
              Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                fontSize: 14,
              }}
            >
              <option value="all">Todos</option>
              {Object.entries(statuses).map(([key, sta]) => (
                <option key={key} value={key}>{sta.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Link para Estratégia Web3 */}
      <div style={{
        padding: 20,
        borderRadius: 12,
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 600, color: '#fde047' }}>
              🎮 Estratégia Web3/NFT Detalhada
            </h3>
            <p style={{ margin: 0, color: '#c0bccf', fontSize: 14 }}>
              Veja o plano completo de gamificação com NFTs para alunos (Online e Vancouver)
            </p>
          </div>
          <Link
            href="/admin/roadmap/web3-strategy"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(251, 191, 36, 0.5)',
              background: 'rgba(251, 191, 36, 0.2)',
              color: '#fde047',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Ver Estratégia Completa →
          </Link>
        </div>
      </div>

      {/* Próximos Passos Prioritários */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🎯 Próximos Passos Prioritários
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredFeatures
            .filter(f => f.status === 'planned' && (f.priority === 'urgent' || f.priority === 'high'))
            .sort((a, b) => {
              const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
              return priorityOrder[a.priority] - priorityOrder[b.priority]
            })
            .map((feature) => (
              <div
                key={feature.id}
                style={{
                  padding: 24,
                  borderRadius: 12,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 20 }}>{categories[feature.category].label}</span>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#fff' }}>
                        {feature.title}
                      </h3>
                    </div>
                    <p style={{ margin: 0, color: '#c0bccf', fontSize: 14, lineHeight: 1.6 }}>
                      {feature.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      background: priorities[feature.priority].color + '20',
                      color: priorities[feature.priority].color,
                      border: `1px solid ${priorities[feature.priority].color}40`,
                    }}>
                      {priorities[feature.priority].label}
                    </span>
                    {feature.estimatedTime && (
                      <span style={{ fontSize: 12, color: '#8f8ba2' }}>
                        ⏱️ {feature.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>
                {feature.dependencies && feature.dependencies.length > 0 && (
                  <div style={{
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 8,
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    fontSize: 12,
                    color: '#93c5fd',
                  }}>
                    ⚠️ Depende de: {feature.dependencies.join(', ')}
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Todas as Features */}
      <section>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          📋 Todas as Funcionalidades
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              style={{
                padding: 20,
                borderRadius: 12,
                background: feature.status === 'done' 
                  ? 'rgba(16, 185, 129, 0.05)' 
                  : 'rgba(0,0,0,0.3)',
                border: `1px solid ${
                  feature.status === 'done' 
                    ? 'rgba(16, 185, 129, 0.3)' 
                    : 'rgba(255,255,255,0.1)'
                }`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 16 }}>{categories[feature.category].label}</span>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#fff' }}>
                      {feature.title}
                    </h3>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      background: statuses[feature.status].color + '20',
                      color: statuses[feature.status].color,
                    }}>
                      {statuses[feature.status].label}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#c0bccf', fontSize: 13 }}>
                    {feature.description}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    background: priorities[feature.priority].color + '20',
                    color: priorities[feature.priority].color,
                  }}>
                    {priorities[feature.priority].label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
