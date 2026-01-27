'use client';

import { useState, useEffect, useRef } from 'react';

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
  captionPt?: string | null;
  captionEn?: string | null;
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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string>('');
  const [urlInput, setUrlInput] = useState('');
  const [urlType, setUrlType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionText, setCaptionText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar mídias disponíveis
  useEffect(() => {
    async function fetchMedia() {
      setLoadingMedia(true);
      try {
        const res = await fetch('/api/admin/media?limit=100');
        const data = await res.json();
        if (res.ok) {
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

  // Upload de arquivo
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao enviar arquivo');
        setUploading(false);
        return;
      }

      // Adicionar à galeria automaticamente
      const addRes = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: data.media.id }),
      });

      if (addRes.ok) {
        const updatedRes = await fetch(`/api/admin/projects/${projectId}`);
        if (updatedRes.ok) {
          const updatedData = await updatedRes.json();
          if (updatedData.project?.gallery) {
            setGallery(updatedData.project.gallery);
          }
        }
        setSuccess('Mídia adicionada!');
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Erro de rede ao enviar arquivo');
    } finally {
      setUploading(false);
    }
  }

  // Adicionar mídia por URL
  async function handleAddByUrl() {
    if (!urlInput.trim()) {
      setError('Digite uma URL válida');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const createRes = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: urlType,
          originalUrl: urlInput.trim(),
          altPt: `Mídia do projeto`,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        setError(createData.error || 'Erro ao criar mídia');
        setLoading(false);
        return;
      }

      const addRes = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: createData.media.id }),
      });

      if (addRes.ok) {
        const updatedRes = await fetch(`/api/admin/projects/${projectId}`);
        if (updatedRes.ok) {
          const updatedData = await updatedRes.json();
          if (updatedData.project?.gallery) {
            setGallery(updatedData.project.gallery);
          }
        }
        setSuccess('Mídia adicionada!');
        setUrlInput('');
      }
    } catch (err) {
      setError('Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  // Adicionar mídia existente
  async function handleAddExisting() {
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

      if (res.ok) {
        const updatedRes = await fetch(`/api/admin/projects/${projectId}`);
        if (updatedRes.ok) {
          const updatedData = await updatedRes.json();
          if (updatedData.project?.gallery) {
            setGallery(updatedData.project.gallery);
          }
        }
        setSelectedMediaId('');
        setSuccess('Mídia adicionada!');
      }
    } catch (err) {
      setError('Erro de rede');
    } finally {
      setLoading(false);
    }
  }

  // Remover mídia
  async function handleRemove(mediaId: string) {
    if (!confirm('Remover esta mídia da galeria?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery?mediaId=${mediaId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setGallery(gallery.filter(item => item.mediaId !== mediaId));
        setSuccess('Mídia removida!');
      }
    } catch (err) {
      setError('Erro ao remover');
    } finally {
      setLoading(false);
    }
  }

  // Salvar legenda
  async function handleSaveCaption(itemId: string) {
    setLoading(true);
    try {
      // Por ora, salvar como altPt da mídia (ideal seria ter captionPt no ProjectMedia)
      const item = gallery.find(g => g.id === itemId);
      if (item) {
        await fetch(`/api/admin/media/${item.mediaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ altPt: captionText }),
        });
        
        // Atualizar localmente
        setGallery(gallery.map(g => 
          g.id === itemId 
            ? { ...g, media: { ...g.media, altPt: captionText } }
            : g
        ));
        setSuccess('Legenda salva!');
      }
    } catch (err) {
      setError('Erro ao salvar legenda');
    } finally {
      setLoading(false);
      setEditingCaption(null);
    }
  }

  // Mover mídia
  async function handleMove(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= gallery.length) return;

    const newGallery = [...gallery];
    [newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]];

    const mediaIds = newGallery.map(item => item.mediaId);

    setLoading(true);
    try {
      await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaIds }),
      });
      setGallery(newGallery);
    } catch (err) {
      setError('Erro ao reordenar');
    } finally {
      setLoading(false);
    }
  }

  const imageCount = gallery.filter(g => g.media.type === 'IMAGE').length;
  const videoCount = gallery.filter(g => g.media.type === 'VIDEO').length;

  return (
    <div style={{ marginTop: 16 }}>
      {/* Header com contador */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#fff' }}>
            📸 Galeria de Mídias ({gallery.length})
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#8f8ba2' }}>
            🖼️ {imageCount} imagens • 🎬 {videoCount} vídeos
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddPanel(!showAddPanel)}
          disabled={loading || uploading}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: showAddPanel ? '#666' : 'linear-gradient(135deg, #c92337 0%, #ff6b6b 100%)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {showAddPanel ? '✕ Fechar' : '+ Adicionar Mídia'}
        </button>
      </div>

      {/* Mensagens */}
      {error && (
        <div style={{
          padding: '10px 14px',
          borderRadius: 8,
          background: 'rgba(201,35,55,0.15)',
          border: '1px solid rgba(201,35,55,0.4)',
          color: '#fca5a5',
          marginBottom: 16,
          fontSize: 13,
        }}>
          ❌ {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: '10px 14px',
          borderRadius: 8,
          background: 'rgba(46,204,113,0.15)',
          border: '1px solid rgba(46,204,113,0.4)',
          color: '#6ee7b7',
          marginBottom: 16,
          fontSize: 13,
        }}>
          ✓ {success}
        </div>
      )}

      {/* Painel de adicionar */}
      {showAddPanel && (
        <div style={{
          padding: 20,
          borderRadius: 12,
          border: '2px dashed rgba(201,35,55,0.4)',
          background: 'rgba(201,35,55,0.05)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* Upload de arquivo */}
            <div style={{ 
              padding: 16, 
              borderRadius: 10, 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#6ee7b7' }}>
                📤 Upload de Arquivo
              </h4>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#fff',
                  fontSize: 13,
                }}
              />
              {uploading && <p style={{ margin: '8px 0 0', fontSize: 12, color: '#6ee7b7' }}>Enviando...</p>}
            </div>

            {/* URL externa */}
            <div style={{ 
              padding: 16, 
              borderRadius: 10, 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#7dd3fc' }}>
                🔗 URL Externa
              </h4>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <select
                  value={urlType}
                  onChange={(e) => setUrlType(e.target.value as 'IMAGE' | 'VIDEO')}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: 13,
                  }}
                >
                  <option value="IMAGE">🖼️ Imagem</option>
                  <option value="VIDEO">🎬 Vídeo</option>
                </select>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: 13,
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleAddByUrl}
                disabled={loading || !urlInput.trim()}
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 6,
                  border: 'none',
                  background: urlInput.trim() ? '#7dd3fc' : '#444',
                  color: urlInput.trim() ? '#000' : '#888',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Adicionar URL
              </button>
            </div>

            {/* Biblioteca existente */}
            <div style={{ 
              padding: 16, 
              borderRadius: 10, 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#fbbf24' }}>
                📂 Da Biblioteca
              </h4>
              {loadingMedia ? (
                <p style={{ color: '#8f8ba2', fontSize: 12 }}>Carregando...</p>
              ) : availableMedia.length === 0 ? (
                <p style={{ color: '#8f8ba2', fontSize: 12 }}>Nenhuma mídia disponível</p>
              ) : (
                <>
                  <select
                    value={selectedMediaId}
                    onChange={(e) => setSelectedMediaId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 8,
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.04)',
                      color: '#fff',
                      fontSize: 13,
                      marginBottom: 8,
                    }}
                  >
                    <option value="">Selecione...</option>
                    {availableMedia.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.type === 'IMAGE' ? '🖼️' : '🎬'} {m.altPt || m.originalUrl.split('/').pop()?.slice(0, 30)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddExisting}
                    disabled={!selectedMediaId}
                    style={{
                      width: '100%',
                      padding: 8,
                      borderRadius: 6,
                      border: 'none',
                      background: selectedMediaId ? '#fbbf24' : '#444',
                      color: selectedMediaId ? '#000' : '#888',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: selectedMediaId ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Adicionar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid de Mídias */}
      {gallery.length === 0 ? (
        <div style={{
          padding: 60,
          textAlign: 'center',
          borderRadius: 12,
          border: '2px dashed rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <p style={{ margin: 0, fontSize: 15, color: '#8f8ba2' }}>
            Nenhuma mídia na galeria ainda
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#666' }}>
            Clique em "+ Adicionar Mídia" para começar
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}>
          {gallery.map((item, index) => (
            <div
              key={item.id}
              style={{
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Número de ordem */}
              <div style={{
                position: 'absolute',
                top: 8,
                left: 8,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                zIndex: 2,
              }}>
                {index + 1}
              </div>

              {/* Badge de tipo */}
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                padding: '4px 8px',
                borderRadius: 6,
                background: item.media.type === 'IMAGE' ? 'rgba(46,204,113,0.9)' : 'rgba(201,35,55,0.9)',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                zIndex: 2,
              }}>
                {item.media.type === 'IMAGE' ? '🖼️ IMG' : '🎬 VID'}
              </div>

              {/* Thumbnail */}
              <div style={{
                width: '100%',
                height: 140,
                background: '#111',
                position: 'relative',
              }}>
                {item.media.type === 'IMAGE' ? (
                  <img
                    src={item.media.thumbnailUrl || item.media.mediumUrl || item.media.originalUrl}
                    alt={item.media.altPt || ''}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/220x140/1a1a1a/666?text=Imagem';
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  }}>
                    <div style={{ fontSize: 36, marginBottom: 4 }}>▶️</div>
                    <span style={{ fontSize: 11, color: '#888' }}>
                      {item.media.originalUrl.includes('youtube') ? 'YouTube' : 
                       item.media.originalUrl.includes('vimeo') ? 'Vimeo' : 'Vídeo'}
                    </span>
                  </div>
                )}
              </div>

              {/* Conteúdo do card */}
              <div style={{ padding: 12 }}>
                {/* Campo de legenda */}
                {editingCaption === item.id ? (
                  <div style={{ marginBottom: 10 }}>
                    <textarea
                      value={captionText}
                      onChange={(e) => setCaptionText(e.target.value)}
                      placeholder="Digite a legenda..."
                      style={{
                        width: '100%',
                        minHeight: 60,
                        padding: 8,
                        borderRadius: 6,
                        border: '1px solid rgba(201,35,55,0.5)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: 12,
                        resize: 'vertical',
                      }}
                    />
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <button
                        type="button"
                        onClick={() => handleSaveCaption(item.id)}
                        style={{
                          flex: 1,
                          padding: 6,
                          borderRadius: 4,
                          border: 'none',
                          background: '#6ee7b7',
                          color: '#000',
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        ✓ Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCaption(null)}
                        style={{
                          flex: 1,
                          padding: 6,
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: 'transparent',
                          color: '#888',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setEditingCaption(item.id);
                      setCaptionText(item.media.altPt || '');
                    }}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.04)',
                      marginBottom: 10,
                      cursor: 'pointer',
                      minHeight: 40,
                    }}
                  >
                    {item.media.altPt ? (
                      <p style={{ margin: 0, fontSize: 12, color: '#ccc', lineHeight: 1.4 }}>
                        {item.media.altPt}
                      </p>
                    ) : (
                      <p style={{ margin: 0, fontSize: 12, color: '#666', fontStyle: 'italic' }}>
                        📝 Clique para adicionar legenda...
                      </p>
                    )}
                  </div>
                )}

                {/* Controles */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0 || loading}
                    style={{
                      flex: 1,
                      padding: 6,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: index === 0 ? 'transparent' : 'rgba(255,255,255,0.05)',
                      color: index === 0 ? '#444' : '#888',
                      fontSize: 12,
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    ← Mover
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === gallery.length - 1 || loading}
                    style={{
                      flex: 1,
                      padding: 6,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: index === gallery.length - 1 ? 'transparent' : 'rgba(255,255,255,0.05)',
                      color: index === gallery.length - 1 ? '#444' : '#888',
                      fontSize: 12,
                      cursor: index === gallery.length - 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Mover →
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.mediaId)}
                    disabled={loading}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: 'none',
                      background: 'rgba(201,35,55,0.2)',
                      color: '#fca5a5',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                    title="Remover"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {gallery.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 12, color: '#666', textAlign: 'center' }}>
          💡 Clique nas legendas para editar • Arraste os botões para reordenar
        </p>
      )}
    </div>
  );
}
