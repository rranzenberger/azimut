'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SocialMediaItem {
  id: string;
  sourceType: string;
  sourceName: string;
  sourceIcon: string;
  sourceUrl: string;
  title: string;
  projectName?: string;
  status: string;
  publishAfterDate?: string;
  canPublishNow: boolean;
  createdAt: string;
}

export function SocialMediaSidebar() {
  const [items, setItems] = useState<SocialMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [showPendingOnly, setShowPendingOnly] = useState(true);

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 60000); // Atualizar a cada 1 minuto
    return () => clearInterval(interval);
  }, [filter, showPendingOnly]);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('sourceType', filter);
      if (showPendingOnly) params.set('status', 'PENDING');

      const res = await fetch(`/api/admin/blog/monitor?${params}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.suggestions || []);
      }
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSourceIcon = (sourceType: string) => {
    const icons: Record<string, string> = {
      INSTAGRAM: '📸',
      YOUTUBE: '🎥',
      LINKEDIN: '💼',
      FACEBOOK: '👥',
      TWITTER: '🐦',
      JOURNAL: '📰',
      TV: '📺',
      PODCAST: '🎙️',
      BLOG: '📝',
      NEWS: '📰',
      PRESS: '📰',
      OTHER: '🔗',
    };
    return icons[sourceType] || '🔗';
  };

  const getStatusColor = (status: string, canPublishNow: boolean, publishAfterDate?: string) => {
    if (status === 'PUBLISHED') return 'bg-green-100 text-green-800';
    if (status === 'APPROVED') return 'bg-blue-100 text-blue-800';
    if (status === 'REJECTED') return 'bg-red-100 text-red-800';
    
    // Se pode publicar agora
    if (canPublishNow) return 'bg-yellow-100 text-yellow-800 animate-pulse';
    
    // Se tem data futura
    if (publishAfterDate) {
      const date = new Date(publishAfterDate);
      const now = new Date();
      if (date <= now) return 'bg-yellow-100 text-yellow-800 animate-pulse';
      return 'bg-gray-100 text-gray-800';
    }
    
    return 'bg-gray-100 text-gray-800';
  };

  const pendingCount = items.filter(i => i.status === 'PENDING').length;
  const readyToPublish = items.filter(i => i.canPublishNow || (i.publishAfterDate && new Date(i.publishAfterDate) <= new Date())).length;

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-screen overflow-y-auto fixed right-0 top-0 z-40 shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">📱 Mídia Social</h2>
          {pendingCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              {pendingCount}
            </span>
          )}
        </div>
        
        {/* Filtros */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 text-xs rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('INSTAGRAM')}
              className={`px-2 py-1 text-xs rounded ${filter === 'INSTAGRAM' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              📸
            </button>
            <button
              onClick={() => setFilter('YOUTUBE')}
              className={`px-2 py-1 text-xs rounded ${filter === 'YOUTUBE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              🎥
            </button>
            <button
              onClick={() => setFilter('JOURNAL')}
              className={`px-2 py-1 text-xs rounded ${filter === 'JOURNAL' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              📰
            </button>
          </div>
          
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={showPendingOnly}
              onChange={(e) => setShowPendingOnly(e.target.checked)}
            />
            <span>Apenas pendentes</span>
          </label>
        </div>

        {/* Stats */}
        {readyToPublish > 0 && (
          <div className="mt-3 p-2 bg-yellow-100 border border-yellow-400 rounded text-xs">
            <span className="font-bold">⚠️ {readyToPublish} pronto(s) para publicar!</span>
          </div>
        )}
      </div>

      {/* Lista */}
      <div className="p-2">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Carregando...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Nenhum item encontrado
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/admin/blog/monitor?id=${item.id}`}
                className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xl">{getSourceIcon(item.sourceType)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-900 truncate">
                        {item.title || 'Sem título'}
                      </span>
                      <span className={`px-1.5 py-0.5 text-xs rounded ${getStatusColor(item.status, item.canPublishNow, item.publishAfterDate)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {item.sourceName || item.sourceType}
                    </div>
                    {item.projectName && (
                      <div className="text-xs text-blue-600 mt-1">
                        🎬 {item.projectName}
                      </div>
                    )}
                    {item.publishAfterDate && (
                      <div className="text-xs text-orange-600 mt-1">
                        📅 {new Date(item.publishAfterDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
