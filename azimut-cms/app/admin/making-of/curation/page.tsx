'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MakingOf {
  id: string;
  title: string;
  description: string | null;
  makingOfType: string;
  source: string;
  collaboratorName: string | null;
  clientName: string | null;
  projectName: string | null;
  mediaType: string;
  status: string;
  featured: boolean;
  publishToBlog: boolean;
  publishToNewsletter: boolean;
  publishToSocial: boolean;
  createdAt: string;
  eventDate: string | null;
  mediaFiles: Array<{
    id: string;
    thumbnailUrl: string | null;
    originalUrl: string;
  }>;
  canPublishNow: boolean;
  publishAfterDate: string | null;
}

export default function MakingOfCurationPage() {
  const [items, setItems] = useState<MakingOf[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);

      const res = await fetch(`/api/admin/making-of?${params}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Erro ao buscar making-ofs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleBulkApprove = async () => {
    if (selectedItems.size === 0) {
      alert('Selecione pelo menos um item');
      return;
    }

    if (!confirm(`Aprovar ${selectedItems.size} making-of(s)? Eles serão publicados automaticamente.`)) {
      return;
    }

    try {
      const promises = Array.from(selectedItems).map(id =>
        fetch(`/api/admin/making-of/${id}/approve`, { method: 'POST' })
      );

      await Promise.all(promises);
      alert(`✅ ${selectedItems.size} making-of(s) aprovado(s) e publicado(s)!`);
      setSelectedItems(new Set());
      fetchItems();
    } catch (error) {
      console.error('Erro ao aprovar:', error);
      alert('Erro ao aprovar making-ofs');
    }
  };

  const handleBulkPublish = async () => {
    if (selectedItems.size === 0) {
      alert('Selecione pelo menos um item');
      return;
    }

    if (!confirm(`Publicar ${selectedItems.size} making-of(s) agora?`)) {
      return;
    }

    try {
      const promises = Array.from(selectedItems).map(id =>
        fetch(`/api/admin/making-of/${id}/publish`, { method: 'POST' })
      );

      await Promise.all(promises);
      alert(`✅ ${selectedItems.size} making-of(s) publicado(s)!`);
      setSelectedItems(new Set());
      fetchItems();
    } catch (error) {
      console.error('Erro ao publicar:', error);
      alert('Erro ao publicar making-ofs');
    }
  };

  const pendingCount = items.filter(i => i.status === 'DRAFT' || i.status === 'REVIEW').length;
  const readyToPublish = items.filter(i => i.canPublishNow || (i.publishAfterDate && new Date(i.publishAfterDate) <= new Date())).length;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🎨 Curadoria de Making-of</h1>
          <p className="text-gray-600 mt-1">Revise, organize e publique making-ofs</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/making-of/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ➕ Novo
          </Link>
          <Link
            href="/admin/making-of/templates"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            📋 Templates SQL
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-800">{pendingCount}</div>
          <div className="text-sm text-yellow-600">Aguardando Curadoria</div>
        </div>
        <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-800">{readyToPublish}</div>
          <div className="text-sm text-green-600">Prontos para Publicar</div>
        </div>
        <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-800">{items.filter(i => i.status === 'APPROVED').length}</div>
          <div className="text-sm text-blue-600">Aprovados</div>
        </div>
        <div className="bg-purple-50 border-2 border-purple-400 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-800">{items.filter(i => i.status === 'PUBLISHED').length}</div>
          <div className="text-sm text-purple-600">Publicados</div>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex gap-2">
          {['all', 'DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Todos' : status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            {selectedItems.size > 0 && `${selectedItems.size} selecionado(s)`}
          </div>
          {selectedItems.size > 0 && (
            <>
              <button
                onClick={handleBulkApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                ✅ Aprovar Selecionados
              </button>
              <button
                onClick={handleBulkPublish}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                🚀 Publicar Selecionados
              </button>
            </>
          )}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {viewMode === 'grid' ? '📋 Lista' : '🎨 Grid'}
          </button>
        </div>
      </div>

      {/* Lista/Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Carregando...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">Nenhum making-of encontrado</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg border-2 transition-all cursor-pointer ${
                selectedItems.has(item.id)
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => handleSelect(item.id)}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => handleSelect(item.id)}
                  className="absolute top-2 left-2 w-5 h-5 z-10"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 relative">
                  {item.mediaFiles?.[0]?.thumbnailUrl || item.mediaFiles?.[0]?.originalUrl ? (
                    <img
                      src={item.mediaFiles[0].thumbnailUrl || item.mediaFiles[0].originalUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {item.mediaType === 'VIDEO' ? '🎥' : '📸'}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.featured && (
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">
                        ⭐
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-bold rounded text-white ${
                      item.status === 'PUBLISHED' ? 'bg-green-500' :
                      item.status === 'APPROVED' ? 'bg-blue-500' :
                      item.status === 'REVIEW' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  {item.projectName && <span>🎬 {item.projectName}</span>}
                  {item.collaboratorName && <span>👤 {item.collaboratorName}</span>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.publishToBlog && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">📝 Blog</span>}
                  {item.publishToNewsletter && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">📧 Newsletter</span>}
                  {item.publishToSocial && <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">📱 Social</span>}
                </div>
                {!item.canPublishNow && item.publishAfterDate && (
                  <div className="mt-2 text-xs text-orange-600">
                    📅 Publicar após: {new Date(item.publishAfterDate).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg border-2 p-4 transition-all cursor-pointer ${
                selectedItems.has(item.id)
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => handleSelect(item.id)}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => handleSelect(item.id)}
                  className="w-5 h-5"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {item.mediaFiles?.[0]?.thumbnailUrl ? (
                    <img
                      src={item.mediaFiles[0].thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {item.mediaType === 'VIDEO' ? '🎥' : '📸'}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {item.projectName && <span>🎬 {item.projectName}</span>}
                    {item.collaboratorName && <span>👤 {item.collaboratorName}</span>}
                    <span className={`px-2 py-1 text-xs font-bold rounded text-white ${
                      item.status === 'PUBLISHED' ? 'bg-green-500' :
                      item.status === 'APPROVED' ? 'bg-blue-500' :
                      item.status === 'REVIEW' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/making-of/${item.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
