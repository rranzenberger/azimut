'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  monitorEnabled: boolean;
  monitorKeywords: string[];
  creditType: string;
  creditText: string | null;
  azimutContributions: string[];
}

interface MonitoringResult {
  id: string;
  sourceType: string;
  sourceTitle: string | null;
  sourceUrl: string;
  status: string;
  createdAt: string;
}

export default function ProjectMonitoringPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [results, setResults] = useState<MonitoringResult[]>([]);

  const [formData, setFormData] = useState({
    monitorEnabled: false,
    keywords: '',
    creditType: 'CLIENTE',
    creditText: '',
    contributions: '',
  });

  useEffect(() => {
    fetchProject();
    fetchResults();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
        setFormData({
          monitorEnabled: data.project.monitorEnabled || false,
          keywords: (data.project.monitorKeywords || []).join(', '),
          creditType: data.project.creditType || 'CLIENTE',
          creditText: data.project.creditText || '',
          contributions: (data.project.azimutContributions || []).join(', '),
        });
      }
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch(`/api/admin/blog/monitor?projectId=${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.suggestions || []);
      }
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monitorEnabled: formData.monitorEnabled,
          monitorKeywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
          creditType: formData.creditType,
          creditText: formData.creditText,
          azimutContributions: formData.contributions.split(',').map(c => c.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        alert('✅ Configuração salva! Monitoramento ' + (formData.monitorEnabled ? 'ativado' : 'desativado'));
        fetchProject();
      } else {
        const error = await res.json();
        alert(`Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar configuração');
    } finally {
      setSaving(false);
    }
  };

  const handleStartMonitoring = async () => {
    if (!formData.keywords.trim()) {
      alert('Digite pelo menos uma palavra-chave');
      return;
    }

    setMonitoring(true);
    try {
      const res = await fetch('/api/admin/blog/monitor/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
          projectId: projectId,
          sources: ['news', 'youtube', 'instagram', 'linkedin'],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ Busca concluída! ${data.count || 0} resultados encontrados.`);
        fetchResults();
      } else {
        const error = await res.json();
        alert(`Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao buscar:', error);
      alert('Erro ao iniciar busca');
    } finally {
      setMonitoring(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Carregando...</div>;
  }

  if (!project) {
    return <div className="p-8 text-center text-red-500">Projeto não encontrado</div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/projects"
            className="text-blue-600 hover:underline mb-2 inline-block"
          >
            ← Voltar para Projetos
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">🤖 Monitoramento: {project.title}</h1>
          <p className="text-gray-600 mt-1">Configure monitoramento automático com DeepSeek/Claude</p>
        </div>
      </div>

      {/* Configuração */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">⚙️ Configuração de Monitoramento</h2>

        {/* Ativar Monitoramento */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="monitorEnabled"
            checked={formData.monitorEnabled}
            onChange={(e) => setFormData({ ...formData, monitorEnabled: e.target.checked })}
            className="w-5 h-5"
          />
          <label htmlFor="monitorEnabled" className="text-lg font-medium text-gray-900">
            Ativar Monitoramento Automático
          </label>
        </div>
        <p className="text-sm text-gray-600 ml-8">
          Quando ativado, o sistema monitora automaticamente usando DeepSeek/Claude e traz resultados para a área de curadoria.
        </p>

        {/* Palavras-chave */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Palavras-chave para Monitoramento *
          </label>
          <textarea
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Rio Museu Olímpico, instalação imersiva, Azimut, LED 20x5m"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separe por vírgula. O sistema busca conteúdo relacionado a estas palavras-chave.
          </p>
        </div>

        {/* Tipo de Crédito */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Crédito
            </label>
            <select
              value={formData.creditType}
              onChange={(e) => setFormData({ ...formData, creditType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="CLIENTE">Cliente (crédito parcial)</option>
              <option value="AUTORAL">Autoral (crédito total)</option>
              <option value="EVENTO">Evento (crédito total)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texto do Crédito
            </label>
            <input
              type="text"
              value={formData.creditText}
              onChange={(e) => setFormData({ ...formData, creditText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Animação por Azimut"
            />
          </div>
        </div>

        {/* Contribuições */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contribuições da Azimut
          </label>
          <input
            type="text"
            value={formData.contributions}
            onChange={(e) => setFormData({ ...formData, contributions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: arte generativa, motion design, LED 20x5m"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separe por vírgula. O que a Azimut fez neste projeto.
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
          >
            {saving ? 'Salvando...' : '💾 Salvar Configuração'}
          </button>
          <button
            onClick={handleStartMonitoring}
            disabled={monitoring || !formData.keywords.trim()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50"
          >
            {monitoring ? 'Buscando...' : '🔍 Buscar Agora (DeepSeek/Claude)'}
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">📊 Resultados Encontrados</h2>
          <button
            onClick={fetchResults}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            🔄 Atualizar
          </button>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum resultado encontrado ainda. Clique em "Buscar Agora" para iniciar.
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/admin/blog/monitor?id=${result.id}`}
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {result.sourceTitle || 'Sem título'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.sourceUrl}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(result.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-xs font-bold rounded text-white ${
                      result.status === 'PUBLISHED' ? 'bg-green-500' :
                      result.status === 'APPROVED' ? 'bg-blue-500' :
                      result.status === 'PENDING' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Como Funciona</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Configure palavras-chave relacionadas ao projeto</li>
          <li>Ative o monitoramento automático</li>
          <li>DeepSeek/Claude busca conteúdo automaticamente</li>
          <li>Resultados aparecem na área de curadoria</li>
          <li>Você revisa e aprova para publicar</li>
        </ul>
      </div>
    </div>
  );
}
