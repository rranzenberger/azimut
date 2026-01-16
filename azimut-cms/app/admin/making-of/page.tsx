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
}

const typeLabels: Record<string, { label: string; icon: string; color: string }> = {
  PERSONAL: { label: 'Pessoal', icon: '👤', color: '#3b82f6' },
  PARTNERSHIP: { label: 'Parceria', icon: '🤝', color: '#10b981' },
  HIRED: { label: 'Contratado', icon: '💼', color: '#f59e0b' },
  CLIENT: { label: 'Cliente', icon: '👥', color: '#8b5cf6' },
  EVENT: { label: 'Evento', icon: '🎬', color: '#ef4444' },
};

export default function MakingOfPage() {
  const [items, setItems] = useState<MakingOf[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('type', filter);

      const res = await fetch(`/api/admin/making-of?${params}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Erro ao buscar making-of:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🎬 Making-of</h1>
          <p className="text-gray-600 mt-1">Gerencie making-ofs pessoais, parcerias e materiais de clientes</p>
        </div>
        <Link
          href="/admin/making-of/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          ➕ Novo Making-of
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'PERSONAL', 'PARTNERSHIP', 'HIRED', 'CLIENT', 'EVENT'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type === 'all' ? 'Todos' : typeLabels[type]?.icon + ' ' + typeLabels[type]?.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Carregando...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">Nenhum making-of encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/making-of/${item.id}`}
              className="bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all overflow-hidden"
            >
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
                <div className="absolute top-2 right-2">
                  <span
                    className="px-2 py-1 text-xs font-bold rounded text-white"
                    style={{ backgroundColor: typeLabels[item.makingOfType]?.color || '#6b7280' }}
                  >
                    {typeLabels[item.makingOfType]?.icon} {typeLabels[item.makingOfType]?.label}
                  </span>
                </div>
                {item.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">
                      ⭐ Destaque
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {item.projectName && <span>🎬 {item.projectName}</span>}
                  {item.collaboratorName && <span>👤 {item.collaboratorName}</span>}
                  {item.clientName && <span>👥 {item.clientName}</span>}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {item.publishToBlog && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">📝 Blog</span>}
                  {item.publishToNewsletter && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">📧 Newsletter</span>}
                  {item.publishToSocial && <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">📱 Social</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
