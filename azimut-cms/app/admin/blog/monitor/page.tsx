'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MonitorSuggestion {
  id: string;
  projectId: string | null;
  projectName: string | null;
  sourceType: string;
  sourceUrl: string;
  sourceTitle: string | null;
  sourceContent: string | null;
  sourceImageUrl: string | null;
  creditType: string;
  creditText: string | null;
  azimutContributions: string[];
  suggestedTitlePt: string | null;
  suggestedExcerptPt: string | null;
  suggestedContentPt: string | null;
  status: string;
  createdAt: string;
  aiProcessedAt: string | null;
  project: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

export default function BlogMonitorPage() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<MonitorSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    sourceType: '',
    projectId: '',
  });
  const [projects, setProjects] = useState<Array<{ id: string; title: string }>>([]);
  const [searchForm, setSearchForm] = useState({
    keywords: '',
    projectId: '',
    sources: ['news', 'youtube'] as ('news' | 'youtube' | 'instagram')[],
  });
  const [addingManual, setAddingManual] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [reposting, setReposting] = useState<string | null>(null);

  useEffect(() => {
    fetchSuggestions();
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set('status', filters.status);
      if (filters.sourceType) params.set('sourceType', filters.sourceType);
      if (filters.projectId) params.set('projectId', filters.projectId);

      const res = await fetch(`/api/admin/blog/monitor?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchForm.keywords.trim()) {
      alert('Digite pelo menos uma palavra-chave');
      return;
    }

    setSearching(true);
    try {
      const keywords = searchForm.keywords.split(',').map(k => k.trim()).filter(Boolean);
      
      const res = await fetch('/api/admin/blog/monitor/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords,
          projectId: searchForm.projectId || null,
          sources: searchForm.sources,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ ${data.message}`);
        fetchSuggestions();
        setSearchForm({ keywords: '', projectId: '', sources: ['news', 'youtube'] });
      } else {
        const error = await res.json();
        alert(`❌ Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao buscar:', error);
      alert('❌ Erro ao buscar conteúdo');
    } finally {
      setSearching(false);
    }
  };

  const handleProcessAI = async (id: string) => {
    setProcessing(id);
    try {
      const res = await fetch(`/api/admin/blog/monitor/${id}/process-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          languages: ['pt', 'en'],
          improveSEO: true,
        }),
      });

      if (res.ok) {
        alert('✅ Processado com IA com sucesso!');
        fetchSuggestions();
      } else {
        const error = await res.json();
        alert(`❌ Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao processar:', error);
      alert('❌ Erro ao processar com IA');
    } finally {
      setProcessing(null);
    }
  };

  const handleApprove = async (id: string) => {
    if (!confirm('Criar post do blog a partir desta sugestão?')) return;

    try {
      const res = await fetch(`/api/admin/blog/monitor/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publish: false, // Criar como rascunho
          featured: false,
        }),
      });

      if (res.ok) {
        alert('✅ Post criado com sucesso!');
        router.push('/admin/blog');
      } else {
        const error = await res.json();
        alert(`❌ Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao aprovar:', error);
      alert('❌ Erro ao aprovar sugestão');
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Rejeitar esta sugestão?')) return;

    try {
      const res = await fetch(`/api/admin/blog/monitor/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' }),
      });

      if (res.ok) {
        fetchSuggestions();
      }
    } catch (error) {
      console.error('Erro ao rejeitar:', error);
    }
  };

  const handleDownloadMedia = async (id: string) => {
    if (!confirm('Baixar mídia e salvar no backoffice?')) return;

    setDownloading(id);
    try {
      const res = await fetch(`/api/admin/blog/monitor/${id}/download-media`, {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ ${data.message}`);
        fetchSuggestions();
      } else {
        const error = await res.json();
        alert(`❌ Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao baixar mídia:', error);
      alert('❌ Erro ao baixar mídia');
    } finally {
      setDownloading(null);
    }
  };

  const handleRepost = async (id: string) => {
    const platforms = prompt(
      'Selecione as redes sociais (separadas por vírgula):\n' +
      'instagram, linkedin, youtube, vimeo\n\n' +
      'Exemplo: instagram,linkedin'
    );

    if (!platforms) return;

    const platformList = platforms.split(',').map(p => p.trim().toLowerCase()) as ('instagram' | 'youtube' | 'linkedin' | 'vimeo')[];

    const customText = prompt('Digite o texto personalizado (ou deixe em branco para usar o padrão):');
    const hashtagsInput = prompt('Digite as hashtags (separadas por vírgula, ou deixe em branco):');
    const hashtags = hashtagsInput ? hashtagsInput.split(',').map(h => h.trim()) : [];

    if (!confirm(`Repostar em: ${platformList.join(', ')}?`)) return;

    setReposting(id);
    try {
      const res = await fetch(`/api/admin/blog/monitor/${id}/repost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platforms: platformList,
          customText: customText || undefined,
          hashtags,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ ${data.message}\n\n${data.failedPlatforms ? `Falhou em: ${data.failedPlatforms.join(', ')}` : ''}`);
      } else {
        const error = await res.json();
        alert(`❌ Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao repostar:', error);
      alert('❌ Erro ao repostar');
    } finally {
      setReposting(null);
    }
  };

  const handleAddManual = async () => {
    const urlInput = document.getElementById('manualUrl') as HTMLInputElement;
    const projectSelect = document.getElementById('manualProjectId') as HTMLSelectElement;
    
    const url = urlInput?.value.trim();
    const projectId = projectSelect?.value || '';

    if (!url) {
      alert('Digite uma URL');
      return;
    }

    setAddingManual(true);
    try {
      const res = await fetch('/api/admin/blog/monitor/add-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          projectId: projectId || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ ${data.message}`);
        urlInput.value = '';
        projectSelect.value = '';
        fetchSuggestions();
      } else {
        const error = await res.json();
        alert(`❌ Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao adicionar URL:', error);
      alert('❌ Erro ao adicionar URL');
    } finally {
      setAddingManual(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'PUBLISHED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'NEWS': return '📰';
      case 'YOUTUBE': return '🎥';
      case 'INSTAGRAM': return '📸';
      case 'BLOG': return '📝';
      default: return '🔗';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🤖 Monitoramento de Conteúdo</h1>
            <p className="text-gray-600 mt-1">Busque e gerencie conteúdo para o blog automaticamente</p>
          </div>
          {suggestions.filter(s => s.status === 'PENDING').length > 0 && (
            <div className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold text-lg animate-pulse border-4 border-red-600 shadow-lg">
              🔔 {suggestions.filter(s => s.status === 'PENDING').length} Pendente{suggestions.filter(s => s.status === 'PENDING').length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Adicionar URL Manualmente */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-2 border-blue-300 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📎 Adicionar URL Manualmente</h2>
        <p className="text-sm text-gray-600 mb-4">
          Copie a URL de um post do Instagram, YouTube ou notícia e cole aqui:
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL do Post (Instagram, YouTube, Notícia, etc.)
            </label>
            <input
              type="url"
              id="manualUrl"
              placeholder="https://www.instagram.com/p/ABC123... ou https://youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projeto (opcional)
              </label>
              <select
                id="manualProjectId"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nenhum projeto</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddManual}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                ➕ Adicionar URL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Busca Automática */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Buscar Conteúdo Automaticamente</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Palavras-chave (separadas por vírgula)
            </label>
            <input
              type="text"
              value={searchForm.keywords}
              onChange={(e) => setSearchForm({ ...searchForm, keywords: e.target.value })}
              placeholder="Ex: Rio Museu Olímpico, Azimut, instalação imersiva"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projeto (opcional)
              </label>
              <select
                value={searchForm.projectId}
                onChange={(e) => setSearchForm({ ...searchForm, projectId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os projetos</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fontes
              </label>
              <div className="space-y-2">
                {['news', 'youtube', 'instagram'].map(source => (
                  <label key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchForm.sources.includes(source as any)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSearchForm({
                            ...searchForm,
                            sources: [...searchForm.sources, source as any],
                          });
                        } else {
                          setSearchForm({
                            ...searchForm,
                            sources: searchForm.sources.filter(s => s !== source),
                          });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {source === 'news' ? '📰 Notícias' : source === 'youtube' ? '🎥 YouTube' : '📸 Instagram'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {searching ? '⏳ Buscando...' : '🔍 Buscar Agora'}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todos</option>
              <option value="PENDING">Pendente</option>
              <option value="APPROVED">Aprovado</option>
              <option value="REJECTED">Rejeitado</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fonte</label>
            <select
              value={filters.sourceType}
              onChange={(e) => setFilters({ ...filters, sourceType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todas</option>
              <option value="NEWS">Notícias</option>
              <option value="YOUTUBE">YouTube</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="BLOG">Blog</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Projeto</label>
            <select
              value={filters.projectId}
              onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todos</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Sugestões */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-pulse text-gray-400">Carregando...</div>
        </div>
      ) : suggestions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">Nenhuma sugestão encontrada</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map(suggestion => {
            const isPending = suggestion.status === 'PENDING';
            const needsAttention = isPending && !suggestion.aiProcessedAt;
            const readyToApprove = isPending && suggestion.suggestedTitlePt;
            
            return (
            <div
              key={suggestion.id}
              className={`p-6 rounded-lg shadow-sm border-2 transition-all ${
                needsAttention
                  ? 'bg-yellow-50 border-yellow-400 animate-pulse'
                  : readyToApprove
                  ? 'bg-green-50 border-green-400'
                  : 'bg-white border-gray-200'
              } hover:shadow-lg`}
            >
              {/* Alerta Visual para Pendentes */}
              {isPending && (
                <div className={`mb-4 p-3 rounded-lg flex items-center gap-3 ${
                  needsAttention
                    ? 'bg-yellow-100 border-2 border-yellow-400 animate-pulse'
                    : readyToApprove
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-blue-100 border-2 border-blue-400'
                }`}>
                  <span className="text-2xl animate-bounce">
                    {needsAttention ? '⚠️' : readyToApprove ? '✅' : '⏳'}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">
                      {needsAttention 
                        ? '⚠️ PRECISA PROCESSAR COM IA PRIMEIRO'
                        : readyToApprove
                        ? '✅ PRONTO PARA APROVAR E PUBLICAR'
                        : '⏳ Aguardando processamento'
                      }
                    </p>
                    <p className="text-sm text-gray-700">
                      {needsAttention
                        ? 'Clique em "Processar com IA" para gerar o conteúdo'
                        : readyToApprove
                        ? 'Revisar e clicar em "Aprovar e Criar Post"'
                        : 'Processando...'
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getSourceIcon(suggestion.sourceType)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {suggestion.sourceTitle || 'Sem título'}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(suggestion.status)}`}>
                      {suggestion.status}
                    </span>
                    {isPending && (
                      <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                        🔔 PENDENTE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {suggestion.project?.title || suggestion.projectName || 'Sem projeto'}
                  </p>
                  <a
                    href={suggestion.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {suggestion.sourceUrl}
                  </a>
                </div>
                {suggestion.sourceImageUrl && (
                  <img
                    src={suggestion.sourceImageUrl}
                    alt=""
                    className="w-24 h-24 object-cover rounded-lg ml-4"
                  />
                )}
              </div>

              {suggestion.suggestedTitlePt && (
                <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">✨ Sugestão de Post (PT)</h4>
                  <p className="text-sm font-medium text-gray-900 mb-1">{suggestion.suggestedTitlePt}</p>
                  <p className="text-sm text-gray-700">{suggestion.suggestedExcerptPt}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {!suggestion.aiProcessedAt && (
                  <button
                    onClick={() => handleProcessAI(suggestion.id)}
                    disabled={processing === suggestion.id}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-bold ${
                      needsAttention
                        ? 'bg-purple-600 text-white hover:bg-purple-700 animate-pulse shadow-lg'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    } disabled:opacity-50`}
                  >
                    {processing === suggestion.id ? '⏳ Processando...' : '🤖 Processar com IA'}
                  </button>
                )}
                {(suggestion.sourceImageUrl || suggestion.sourceVideoUrl) && (
                  <button
                    onClick={() => handleDownloadMedia(suggestion.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  >
                    📥 Baixar Mídia
                  </button>
                )}
                {suggestion.suggestedTitlePt && suggestion.status !== 'PUBLISHED' && (
                  <>
                    <button
                      onClick={() => handleApprove(suggestion.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-bold shadow-lg hover:shadow-xl"
                    >
                      ✅ Aprovar e Criar Post
                    </button>
                    <button
                      onClick={() => handleRepost(suggestion.id)}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-bold"
                    >
                      📱 Repostar nas Redes
                    </button>
                  </>
                )}
                {suggestion.status === 'PENDING' && (
                  <button
                    onClick={() => handleReject(suggestion.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    ❌ Rejeitar
                  </button>
                )}
                {suggestion.status === 'PUBLISHED' && (
                  <a
                    href={`/admin/blog/${suggestion.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm inline-block"
                  >
                    📝 Ver Post
                  </a>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
