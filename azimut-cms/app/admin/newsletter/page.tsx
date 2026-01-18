'use client'

import { useState, useEffect } from 'react'

interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  preferredLanguage: string
  source: string
  status: 'ACTIVE' | 'UNSUBSCRIBED' | 'BOUNCED' | 'SPAM'
  subscribedAt: string
  unsubscribedAt?: string
  lastEmailSentAt?: string
  emailCount: number
  leadId?: string
  lead?: {
    name?: string
    company?: string
    message?: string
    status?: string
  }
}

interface Stats {
  totalSubscribers: number
  activeSubscribers: number
  unsubscribed: number
  byLanguage: Record<string, number>
  bySource: Record<string, number>
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'list' | 'stats' | 'send'>('list')
  const [sendStatus, setSendStatus] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [seedStatus, setSeedStatus] = useState<string>('')

  useEffect(() => {
    fetchSubscribers()
    fetchStats()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin/newsletter')
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data.subscribers || [])
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/newsletter/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleUnsubscribe = async (id: string) => {
    if (!confirm('Tem certeza que deseja desinscrever este usuário?')) return
    
    try {
      const res = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'UNSUBSCRIBED' })
      })
      
      if (res.ok) {
        fetchSubscribers()
        fetchStats()
      }
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja DELETAR este inscrito permanentemente?')) return
    
    try {
      const res = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        fetchSubscribers()
        fetchStats()
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const handleSeedData = async () => {
    const count = prompt('Quantos inscritos de teste gerar? (max 2000)', '100')
    if (!count) return
    
    setSeedStatus('Gerando dados de teste...')
    
    try {
      const res = await fetch('/api/admin/newsletter/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: parseInt(count) })
      })
      
      const data = await res.json()
      
      if (data.success) {
        setSeedStatus(`✅ ${data.count} inscritos de teste criados!`)
        fetchSubscribers()
        fetchStats()
        setTimeout(() => setSeedStatus(''), 3000)
      } else {
        setSeedStatus(`❌ Erro: ${data.message}`)
      }
    } catch (error) {
      setSeedStatus(`❌ Erro ao gerar dados: ${error}`)
    }
  }

  const handleClearTestData = async () => {
    if (!confirm('Tem certeza que deseja DELETAR TODOS os inscritos de teste (emails teste_*)?')) return
    
    setSeedStatus('Deletando dados de teste...')
    
    try {
      const res = await fetch('/api/admin/newsletter/seed', {
        method: 'DELETE'
      })
      
      const data = await res.json()
      
      if (data.success) {
        setSeedStatus(`✅ ${data.count} inscritos de teste deletados!`)
        fetchSubscribers()
        fetchStats()
        setTimeout(() => setSeedStatus(''), 3000)
      } else {
        setSeedStatus(`❌ Erro: ${data.message}`)
      }
    } catch (error) {
      setSeedStatus(`❌ Erro ao deletar: ${error}`)
    }
  }

  const handleSendCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    setSendStatus('Enviando...')
    
    try {
      const res = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: formData.get('subject'),
          content: formData.get('content'),
          type: formData.get('type')
        })
      })
      
      const data = await res.json()
      
      if (data.success) {
        setSendStatus(`✅ Enviado para ${data.sent} inscritos!`)
        form.reset()
      } else {
        setSendStatus(`❌ Erro: ${data.error}`)
      }
    } catch (error) {
      setSendStatus(`❌ Erro ao enviar: ${error}`)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📧 Newsletter</h1>
        <div className="flex gap-3">
          <button
            onClick={handleSeedData}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🧪 Gerar Dados de Teste
          </button>
          <button
            onClick={handleClearTestData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🗑️ Limpar Dados de Teste
          </button>
        </div>
      </div>

      {seedStatus && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          seedStatus.includes('✅') ? 'bg-green-900/30 text-green-300 border border-green-700' :
          'bg-red-900/30 text-red-300 border border-red-700'
        }`}>
          {seedStatus}
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-2 px-4 ${activeTab === 'list' ? 'border-b-2 border-azimut-red text-azimut-red' : 'text-slate-400'}`}
        >
          Lista ({subscribers.length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`pb-2 px-4 ${activeTab === 'stats' ? 'border-b-2 border-azimut-red text-azimut-red' : 'text-slate-400'}`}
        >
          Estatísticas
        </button>
        <button
          onClick={() => setActiveTab('send')}
          className={`pb-2 px-4 ${activeTab === 'send' ? 'border-b-2 border-azimut-red text-azimut-red' : 'text-slate-400'}`}
        >
          Enviar Campanha
        </button>
      </div>

      {/* Lista de Inscritos */}
      {activeTab === 'list' && (
        <>
          {/* Filtros */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'all' ? 'bg-azimut-red text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Todos ({subscribers.length})
            </button>
            <button
              onClick={() => setFilterStatus('ACTIVE')}
              className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'ACTIVE' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Ativos ({subscribers.filter(s => s.status === 'ACTIVE').length})
            </button>
            <button
              onClick={() => setFilterStatus('UNSUBSCRIBED')}
              className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'UNSUBSCRIBED' ? 'bg-yellow-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Desinscritos ({subscribers.filter(s => s.status === 'UNSUBSCRIBED').length})
            </button>
            <button
              onClick={() => setFilterStatus('BOUNCED')}
              className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'BOUNCED' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Bounced ({subscribers.filter(s => s.status === 'BOUNCED').length})
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-400">Carregando...</div>
            ) : subscribers.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                Nenhum inscrito ainda. Os inscritos aparecerão aqui quando alguém usar o formulário do footer.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium">Nome</th>
                      <th className="p-3 text-left text-sm font-medium">Email</th>
                      <th className="p-3 text-left text-sm font-medium">Idioma</th>
                      <th className="p-3 text-left text-sm font-medium">Origem</th>
                      <th className="p-3 text-left text-sm font-medium">Status</th>
                      <th className="p-3 text-left text-sm font-medium">Empresa</th>
                      <th className="p-3 text-left text-sm font-medium">Objetivo</th>
                      <th className="p-3 text-left text-sm font-medium">Inscrito em</th>
                      <th className="p-3 text-left text-sm font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {subscribers
                      .filter(sub => filterStatus === 'all' || sub.status === filterStatus)
                      .map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-700/50">
                        <td className="p-3 text-sm">
                          {sub.name || sub.lead?.name || <span className="text-slate-500 italic">Não informado</span>}
                        </td>
                        <td className="p-3 text-sm font-mono text-xs">{sub.email}</td>
                        <td className="p-3 text-sm uppercase text-center">{sub.preferredLanguage}</td>
                        <td className="p-3 text-sm">
                          <span className="px-2 py-1 rounded text-xs bg-slate-700">
                            {sub.source}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            sub.status === 'ACTIVE' ? 'bg-green-900 text-green-300' :
                            sub.status === 'UNSUBSCRIBED' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          {sub.lead?.company || <span className="text-slate-500 italic">Não informado</span>}
                        </td>
                        <td className="p-3 text-sm max-w-[200px] truncate" title={sub.lead?.message || ''}>
                          {sub.lead?.message ? (
                            <span className="text-slate-300">{sub.lead.message}</span>
                          ) : (
                            <span className="text-slate-500 italic">Não informado</span>
                          )}
                        </td>
                        <td className="p-3 text-sm text-slate-400">
                          {new Date(sub.subscribedAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            {sub.status === 'ACTIVE' && (
                              <button
                                onClick={() => handleUnsubscribe(sub.id)}
                                className="text-yellow-400 hover:text-yellow-300 text-xs whitespace-nowrap"
                              >
                                Desinscrever
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(sub.id)}
                              className="text-red-400 hover:text-red-300 text-xs"
                            >
                              Deletar
                            </button>
                          </div>
                        </td>
                      </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Estatísticas */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-slate-400 text-sm">Total de Inscritos</h3>
            <p className="text-3xl font-bold">{stats.totalSubscribers}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-slate-400 text-sm">Ativos</h3>
            <p className="text-3xl font-bold text-green-400">{stats.activeSubscribers}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-slate-400 text-sm">Desinscritos</h3>
            <p className="text-3xl font-bold text-yellow-400">{stats.unsubscribed}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-slate-400 text-sm">Por Idioma</h3>
            <div className="text-sm mt-2">
              {Object.entries(stats.byLanguage || {}).map(([lang, count]) => (
                <div key={lang} className="flex justify-between">
                  <span className="uppercase">{lang}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enviar Campanha */}
      {activeTab === 'send' && (
        <div className="max-w-2xl">
          <form onSubmit={handleSendCampaign} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Campanha</label>
              <select name="type" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3">
                <option value="custom">Campanha Personalizada</option>
                <option value="blog_digest">Resumo do Blog</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Assunto</label>
              <input
                type="text"
                name="subject"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3"
                placeholder="Ex: Novidades da Azimut - Janeiro 2026"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Conteúdo (HTML ou texto)</label>
              <textarea
                name="content"
                required
                rows={10}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 font-mono text-sm"
                placeholder="Digite o conteúdo da newsletter..."
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-azimut-red hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Enviar para {stats?.activeSubscribers || 0} inscritos
              </button>
              
              {sendStatus && (
                <span className={sendStatus.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {sendStatus}
                </span>
              )}
            </div>
          </form>
          
          <div className="mt-8 p-4 bg-slate-800 rounded-lg">
            <h3 className="font-medium mb-2">⚠️ Importante</h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Os emails serão enviados apenas para inscritos com status ACTIVE</li>
              <li>• Cada email incluirá automaticamente um link de cancelamento</li>
              <li>• O envio é feito em lotes para evitar bloqueios</li>
              <li>• Recomendamos no máximo 1 newsletter por semana</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
