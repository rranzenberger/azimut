'use client';

import { useState, useEffect } from 'react';

interface Media {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  originalUrl: string;
  thumbnailUrl?: string | null;
  mediumUrl?: string | null;
  largeUrl?: string | null;
  altPt?: string | null;
  altEn?: string | null;
  width?: number | null;
  height?: number | null;
}

interface GalleryItem {
  id: string;
  mediaId: string;
  order: number;
  media: Media;
}

interface GalleryManagerProps {
  projectId: string;
  initialGallery?: GalleryItem[];
}

export function GalleryManager({ projectId, initialGallery = [] }: GalleryManagerProps) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [availableMedia, setAvailableMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string>('');

  // Carregar mídias disponíveis
  useEffect(() => {
    async function fetchMedia() {
      setLoadingMedia(true);
      try {
        const res = await fetch('/api/admin/media?limit=100');
        const data = await res.json();
        if (res.ok) {
          // Filtrar mídias que já estão na galeria
          const galleryMediaIds = new Set(gallery.map(item => item.mediaId));
          const filtered = data.media.filter((m: Media) => !galleryMediaIds.has(m.id));
          setAvailableMedia(filtered);
        }
      } catch (err) {
        console.error('Error fetching media:', err);
      } finally {
        setLoadingMedia(false);
      }
    }
    fetchMedia();
  }, [gallery]);

  // Adicionar mídia à galeria
  async function handleAddMedia() {
    if (!selectedMediaId) {
      setError('Selecione uma mídia');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: selectedMediaId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao adicionar mídia');
        setLoading(false);
        return;
      }

      // Atualizar galeria
      setGallery([...gallery, data.projectMedia]);
      setSelectedMediaId('');
      setShowMediaSelector(false);
    } catch (err) {
      setError('Erro de rede ao adicionar mídia');
    } finally {
      setLoading(false);
    }
  }

  // Remover mídia da galeria
  async function handleRemoveMedia(mediaId: string) {
    if (!confirm('Tem certeza que deseja remover esta mídia da galeria?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery?mediaId=${mediaId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erro ao remover mídia');
        setLoading(false);
        return;
      }

      // Atualizar galeria
      setGallery(gallery.filter(item => item.mediaId !== mediaId));
    } catch (err) {
      setError('Erro de rede ao remover mídia');
    } finally {
      setLoading(false);
    }
  }

  // Mover mídia para cima
  async function handleMoveUp(index: number) {
    if (index === 0) return;

    const newGallery = [...gallery];
    [newGallery[index - 1], newGallery[index]] = [newGallery[index], newGallery[index - 1]];

    // Atualizar ordem
    const mediaIds = newGallery.map(item => item.mediaId);

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaIds }),
      });

      if (res.ok) {
        setGallery(newGallery);
      } else {
        setError('Erro ao reordenar');
      }
    } catch (err) {
      setError('Erro de rede ao reordenar');
    } finally {
      setLoading(false);
    }
  }

  // Mover mídia para baixo
  async function handleMoveDown(index: number) {
    if (index === gallery.length - 1) return;

    const newGallery = [...gallery];
    [newGallery[index], newGallery[index + 1]] = [newGallery[index + 1], newGallery[index]];

    // Atualizar ordem
    const mediaIds = newGallery.map(item => item.mediaId);

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaIds }),
      });

      if (res.ok) {
        setGallery(newGallery);
      } else {
        setError('Erro ao reordenar');
      }
    } catch (err) {
      setError('Erro de rede ao reordenar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Galeria de Mídias</h3>
        <button
          type="button"
          onClick={() => setShowMediaSelector(!showMediaSelector)}
          disabled={loading}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(201,35,55,0.3)',
            background: 'rgba(201,35,55,0.1)',
            color: '#fca5a5',
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {showMediaSelector ? 'Cancelar' : '+ Adicionar Mídia'}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            background: 'rgba(201,35,55,0.12)',
            border: '1px solid rgba(201,35,55,0.35)',
            color: '#fca5a5',
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {/* Seletor de mídia */}
      {showMediaSelector && (
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            marginBottom: 16,
          }}
        >
          <label style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'block' }}>
            Selecione uma mídia para adicionar:
          </label>
          {loadingMedia ? (
            <p style={{ color: '#8f8ba2', fontSize: 13 }}>Carregando mídias...</p>
          ) : availableMedia.length === 0 ? (
            <p style={{ color: '#8f8ba2', fontSize: 13 }}>
              Nenhuma mídia disponível. <a href="/admin/media" style={{ color: '#7dd3fc' }}>Envie uma mídia primeiro</a>.
            </p>
          ) : (
            <>
              <select
                value={selectedMediaId}
                onChange={(e) => setSelectedMediaId(e.target.value)}
                style={{
                  width: '100%',
                  height: 42,
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  padding: '0 12px',
                  color: '#fff',
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                <option value="">-- Selecione uma mídia --</option>
                {availableMedia.map((media) => (
                  <option key={media.id} value={media.id}>
                    {media.type} - {media.altPt || media.altEn || media.originalUrl.split('/').pop()}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddMedia}
                disabled={loading || !selectedMediaId}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: loading || !selectedMediaId ? '#666' : '#c92337',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: loading || !selectedMediaId ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Adicionando...' : 'Adicionar à Galeria'}
              </button>
            </>
          )}
        </div>
      )}

      {/* Lista da galeria */}
      {gallery.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            color: '#8f8ba2',
          }}
        >
          <p style={{ margin: 0, fontSize: 14 }}>Nenhuma mídia na galeria ainda.</p>
          <p style={{ margin: '8px 0 0', fontSize: 13 }}>
            Clique em "Adicionar Mídia" para começar.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {gallery.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: 16,
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                alignItems: 'center',
              }}
            >
              {/* Preview */}
              <div style={{ position: 'relative', width: 120, height: 80, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a' }}>
                {item.media.type === 'IMAGE' ? (
                  <img
                    src={item.media.thumbnailUrl || item.media.mediumUrl || item.media.originalUrl}
                    alt={item.media.altPt || item.media.altEn || ''}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg style={{ width: 32, height: 32, color: '#666' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                <div
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: item.media.type === 'IMAGE' ? 'rgba(46,204,113,0.8)' : 'rgba(201,35,55,0.8)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.media.type}
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: '#fff' }}>
                  {item.media.altPt || item.media.altEn || 'Sem descrição'}
                </div>
                <div style={{ fontSize: 12, color: '#8f8ba2', wordBreak: 'break-all' }}>
                  {item.media.originalUrl}
                </div>
                {item.media.width && item.media.height && (
                  <div style={{ fontSize: 12, color: '#8f8ba2', marginTop: 4 }}>
                    {item.media.width} × {item.media.height}px
                  </div>
                )}
              </div>

              {/* Controles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={loading || index === 0}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: loading || index === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                      color: loading || index === 0 ? '#666' : '#fff',
                      cursor: loading || index === 0 ? 'not-allowed' : 'pointer',
                      fontSize: 12,
                    }}
                    title="Mover para cima"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={loading || index === gallery.length - 1}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: loading || index === gallery.length - 1 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                      color: loading || index === gallery.length - 1 ? '#666' : '#fff',
                      cursor: loading || index === gallery.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: 12,
                    }}
                    title="Mover para baixo"
                  >
                    ↓
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(item.mediaId)}
                  disabled={loading}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(201,35,55,0.3)',
                    background: 'rgba(201,35,55,0.1)',
                    color: '#fca5a5',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {gallery.length > 0 && (
        <p style={{ marginTop: 12, fontSize: 12, color: '#8f8ba2' }}>
          💡 A ordem das mídias na galeria será exibida na página de detalhe do projeto.
        </p>
      )}
    </div>
  );
}

