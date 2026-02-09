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
  captionEs?: string | null;
  captionFr?: string | null;
  displayFit?: string | null;
  displayPosition?: string | null;
  displayScale?: number | null;
  media: Media;
}

interface GalleryManagerProps {
  projectId: string;
  initialGallery?: GalleryItem[];
  /** Chamado quando a galeria é alterada (add/remove/reorder) para atualizar o pai (ex.: contagem na aba) */
  onGalleryChange?: (gallery: GalleryItem[]) => void;
}

export function GalleryManager({ projectId, initialGallery = [], onGalleryChange }: GalleryManagerProps) {
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
  const [captions, setCaptions] = useState<{ pt: string; en: string; es: string; fr: string }>({
    pt: '', en: '', es: '', fr: '',
  });
  const [replacingItemId, setReplacingItemId] = useState<string | null>(null);
  const [replaceMediaId, setReplaceMediaId] = useState<string>('');
  const [replaceUrl, setReplaceUrl] = useState('');
  const [replaceUrlType, setReplaceUrlType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [editingDisplayId, setEditingDisplayId] = useState<string | null>(null);
  const [displayFit, setDisplayFit] = useState<string>('contain');
  const [displayPosition, setDisplayPosition] = useState<string>('center');
  const [displayScale, setDisplayScale] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const POSITION_OPTIONS = [
    { value: 'top left', label: '↖' },
    { value: 'top', label: '↑' },
    { value: 'top right', label: '↗' },
    { value: 'left', label: '←' },
    { value: 'center', label: '●' },
    { value: 'right', label: '→' },
    { value: 'bottom left', label: '↙' },
    { value: 'bottom', label: '↓' },
    { value: 'bottom right', label: '↘' },
  ] as const;
  const SCALE_MIN = 0.8;
  const SCALE_MAX = 1.2;
  const SCALE_STEP = 0.05;

  const LANG_LABELS = { pt: 'Português', en: 'English', es: 'Español', fr: 'Français' } as const;

  // Thumbnail para vídeo quando a mídia não tem thumbnailUrl (YouTube/Vimeo)
  function getVideoThumbnailUrl(media: Media): string | null {
    if (media.thumbnailUrl || media.mediumUrl) return media.thumbnailUrl || media.mediumUrl || null;
    const url = media.originalUrl || '';
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return `https://vumbnail.com/${vimeo[1]}.jpg`;
    return null;
  }

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
            onGalleryChange?.(updatedData.project.gallery);
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
            onGalleryChange?.(updatedData.project.gallery);
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
            onGalleryChange?.(updatedData.project.gallery);
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
        const next = gallery.filter(item => item.mediaId !== mediaId);
        setGallery(next);
        onGalleryChange?.(next);
        setSuccess('Mídia removida!');
      }
    } catch (err) {
      setError('Erro ao remover');
    } finally {
      setLoading(false);
    }
  }

  // Salvar legendas (PT/EN/ES/FR) no ProjectMedia – aparecem na subpágina do projeto
  async function handleSaveCaption(itemId: string) {
    const item = gallery.find(g => g.id === itemId);
    if (!item) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectMediaId: itemId,
          captionPt: captions.pt || null,
          captionEn: captions.en || null,
          captionEs: captions.es || null,
          captionFr: captions.fr || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao salvar legendas');
        return;
      }
      if (data.gallery) {
        setGallery(data.gallery);
        onGalleryChange?.(data.gallery);
      }
      setSuccess('Legendas salvas! Aparecem na subpágina do projeto (conforme idioma).');
    } catch (err) {
      setError('Erro ao salvar legendas');
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
      onGalleryChange?.(newGallery);
    } catch (err) {
      setError('Erro ao reordenar');
    } finally {
      setLoading(false);
    }
  }

  // Substituir mídia do item (mantém ordem e legendas)
  async function handleReplaceWith(newMediaId: string) {
    if (!replacingItemId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectMediaId: replacingItemId, mediaId: newMediaId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao substituir');
        setLoading(false);
        return;
      }
      if (data.gallery) {
        setGallery(data.gallery);
        onGalleryChange?.(data.gallery);
      }
      setSuccess('Mídia substituída!');
      setReplacingItemId(null);
      setReplaceMediaId('');
    } catch (err) {
      setError('Erro ao substituir');
    } finally {
      setLoading(false);
    }
  }

  async function handleReplaceByUrl() {
    if (!replacingItemId || !replaceUrl.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const createRes = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: replaceUrlType,
          originalUrl: replaceUrl.trim(),
          altPt: 'Mídia do projeto',
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        setError(createData.error || 'Erro ao criar mídia');
        setLoading(false);
        return;
      }
      await handleReplaceWith(createData.media.id);
      setReplaceUrl('');
    } catch (err) {
      setError('Erro ao substituir por URL');
    } finally {
      setLoading(false);
    }
  }

  function openDisplayEditor(item: GalleryItem) {
    setEditingDisplayId(item.id);
    setDisplayFit(item.displayFit || 'contain');
    setDisplayPosition(item.displayPosition || 'center');
    setDisplayScale(item.displayScale != null ? item.displayScale : 1);
  }

  async function handleApplyDisplay() {
    if (!editingDisplayId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/gallery`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectMediaId: editingDisplayId,
          displayFit: displayFit,
          displayPosition: displayPosition,
          displayScale: Math.round(displayScale * 100) / 100,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao aplicar');
        setLoading(false);
        return;
      }
      if (data.gallery) {
        setGallery(data.gallery);
        onGalleryChange?.(data.gallery);
      }
      setSuccess('Posição e escala aplicados!');
      setEditingDisplayId(null);
    } catch (err) {
      setError('Erro ao aplicar');
    } finally {
      setLoading(false);
    }
  }

  const imageCount = gallery.filter(g => g.media.type === 'IMAGE').length;
  const videoCount = gallery.filter(g => g.media.type === 'VIDEO').length;

  return (
    <div style={{ marginTop: 16 }}>
      {/* Cabeçalho compacto: título + contagem + botão */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16,
        padding: '10px 14px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#fff' }}>
            📸 Galeria ({gallery.length})
          </h3>
          <span style={{ fontSize: 12, color: '#8f8ba2' }}>
            🖼️ {imageCount} imgs · 🎬 {videoCount} vídeos · subpágina do projeto
          </span>
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
          {showAddPanel ? '✕ Fechar' : '+ Adicionar'}
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

      {/* Painel de adicionar — em linha quando houver espaço */}
      {showAddPanel && (
        <div style={{
          padding: 14,
          borderRadius: 10,
          border: '2px dashed rgba(201,35,55,0.35)',
          background: 'rgba(201,35,55,0.05)',
          marginBottom: 16,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(152px, 1fr))',
          gap: 10,
        }}>
          {gallery.map((item, index) => (
            <div
              key={item.id}
              style={{
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Número de ordem */}
              <div style={{
                position: 'absolute',
                top: 4,
                left: 4,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.75)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                zIndex: 2,
              }}>
                {index + 1}
              </div>

              {/* Badge de tipo */}
              <div style={{
                position: 'absolute',
                top: 4,
                right: 4,
                padding: '2px 5px',
                borderRadius: 4,
                background: item.media.type === 'IMAGE' ? 'rgba(46,204,113,0.9)' : 'rgba(201,35,55,0.9)',
                color: '#fff',
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                zIndex: 2,
              }}>
                {item.media.type === 'IMAGE' ? 'IMG' : 'VID'}
              </div>

              {/* Thumbnail compacto */}
              <div style={{
                width: '100%',
                height: 90,
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
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x90/1a1a1a/666?text=Img';
                    }}
                  />
                ) : (
                  (() => {
                    const thumb = item.media.thumbnailUrl || item.media.mediumUrl || getVideoThumbnailUrl(item.media);
                    return (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: thumb
                            ? `url(${thumb}) center/cover`
                            : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                        }}
                      >
                        <div style={{ fontSize: 24, marginBottom: 2, textShadow: '0 0 6px #000' }}>▶️</div>
                        <span style={{ fontSize: 10, color: '#aaa' }}>
                          {item.media.originalUrl.includes('youtube') ? 'YouTube' : 
                           item.media.originalUrl.includes('vimeo') ? 'Vimeo' : 'Vídeo'}
                        </span>
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Conteúdo do card — compacto */}
              <div style={{ padding: 8 }}>
                {/* Legendas: só expande ao clicar */}
                {editingCaption === item.id ? (
                  <div style={{ marginBottom: 8 }}>
                    <p style={{ margin: '0 0 6px', fontSize: 10, color: '#8f8ba2', fontWeight: 600 }}>
                      Legendas (PT, EN, ES, FR)
                    </p>
                    {(['pt', 'en', 'es', 'fr'] as const).map((lang) => (
                      <div key={lang} style={{ marginBottom: 4 }}>
                        <label style={{ display: 'block', fontSize: 9, color: '#666', marginBottom: 1 }}>
                          {LANG_LABELS[lang]}
                        </label>
                        <textarea
                          value={captions[lang]}
                          onChange={(e) => setCaptions((c) => ({ ...c, [lang]: e.target.value }))}
                          placeholder={`${LANG_LABELS[lang]}...`}
                          style={{
                            width: '100%',
                            minHeight: 36,
                            padding: 4,
                            borderRadius: 4,
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            fontSize: 11,
                            resize: 'vertical',
                          }}
                        />
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                      <button type="button" onClick={() => handleSaveCaption(item.id)} style={{ flex: 1, padding: 6, borderRadius: 4, border: 'none', background: '#6ee7b7', color: '#000', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                        ✓ Salvar
                      </button>
                      <button type="button" onClick={() => setEditingCaption(null)} style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#888', fontSize: 10, cursor: 'pointer' }}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setEditingCaption(item.id);
                      setCaptions({
                        pt: item.captionPt ?? item.media.altPt ?? '',
                        en: item.captionEn ?? '',
                        es: item.captionEs ?? '',
                        fr: item.captionFr ?? '',
                      });
                    }}
                    style={{
                      padding: 4,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.03)',
                      marginBottom: 6,
                      cursor: 'pointer',
                      minHeight: 28,
                    }}
                  >
                    {[item.captionPt, item.captionEn, item.captionEs, item.captionFr].some(Boolean) ? (
                      <p style={{ margin: 0, fontSize: 10, color: '#8f8ba2' }}>
                        PT {item.captionPt ? '✓' : '—'} · EN {item.captionEn ? '✓' : '—'} · ES {item.captionEs ? '✓' : '—'} · FR {item.captionFr ? '✓' : '—'}
                      </p>
                    ) : (
                      <p style={{ margin: 0, fontSize: 10, color: '#666', fontStyle: 'italic' }}>
                        📝 Legendas
                      </p>
                    )}
                  </div>
                )}

                {/* Controles em uma linha */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0 || loading}
                    style={{
                      padding: 4,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: index === 0 ? 'transparent' : 'rgba(255,255,255,0.05)',
                      color: index === 0 ? '#444' : '#888',
                      fontSize: 10,
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                      minWidth: 26,
                    }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === gallery.length - 1 || loading}
                    style={{
                      padding: 4,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: index === gallery.length - 1 ? 'transparent' : 'rgba(255,255,255,0.05)',
                      color: index === gallery.length - 1 ? '#444' : '#888',
                      fontSize: 10,
                      cursor: index === gallery.length - 1 ? 'not-allowed' : 'pointer',
                      minWidth: 26,
                    }}
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.mediaId)}
                    disabled={loading}
                    style={{ padding: 4, borderRadius: 4, border: 'none', background: 'rgba(201,35,55,0.25)', color: '#fca5a5', fontSize: 10, cursor: 'pointer' }}
                    title="Apagar"
                  >
                    🗑️
                  </button>
                  <button
                    type="button"
                    onClick={() => { setReplacingItemId(item.id); setReplaceMediaId(''); }}
                    disabled={loading}
                    style={{ padding: 4, borderRadius: 4, border: '1px solid rgba(125,211,252,0.4)', background: 'rgba(125,211,252,0.08)', color: '#7dd3fc', fontSize: 10, cursor: 'pointer' }}
                    title="Substituir"
                  >
                    🔄
                  </button>
                  <button
                    type="button"
                    onClick={() => openDisplayEditor(item)}
                    disabled={loading}
                    style={{
                      padding: 4,
                      borderRadius: 4,
                      border: '1px solid rgba(251,191,36,0.4)',
                      background: editingDisplayId === item.id ? 'rgba(251,191,36,0.2)' : 'rgba(251,191,36,0.06)',
                      color: '#fbbf24',
                      fontSize: 10,
                      cursor: 'pointer',
                    }}
                    title="Posição/escala"
                  >
                    📐
                  </button>
                </div>

                {/* Painel: Ajustar posição e escala */}
                {editingDisplayId === item.id && (
                  <div style={{
                    marginTop: 8,
                    padding: 10,
                    borderRadius: 6,
                    border: '1px solid rgba(251,191,36,0.25)',
                    background: 'rgba(251,191,36,0.05)',
                  }}>
                    <p style={{ margin: '0 0 8px', fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>
                      Enquadramento, posição e escala
                    </p>
                    <p style={{ margin: '0 0 8px', fontSize: 10, color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong>Enquadramento:</strong> &quot;Sem cortes&quot; mostra a imagem inteira; &quot;Preencher&quot; pode cortar bordas. — <strong>Posição:</strong> clique em uma zona do grid abaixo para definir onde a imagem fica ancorada no quadro. — <strong>Escala:</strong> − e + (80%–120%).
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, color: '#8f8ba2', marginBottom: 4 }}>Enquadramento</label>
                        <select
                          value={displayFit}
                          onChange={(e) => setDisplayFit(e.target.value)}
                          style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(255,255,255,0.04)',
                            color: '#fff',
                            fontSize: 13,
                          }}
                        >
                          <option value="contain">Sem cortes (contain)</option>
                          <option value="cover">Preencher — pode cortar (cover)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, color: '#8f8ba2', marginBottom: 4 }}>Posição no quadro (clique na zona)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                          {POSITION_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setDisplayPosition(opt.value)}
                              title={opt.value}
                              style={{
                                padding: 5,
                                borderRadius: 4,
                                border: displayPosition === opt.value ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.12)',
                                background: displayPosition === opt.value ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)',
                                color: '#fff',
                                fontSize: 12,
                                cursor: 'pointer',
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <label style={{ fontSize: 10, color: '#8f8ba2' }}>Escala:</label>
                      <button
                        type="button"
                        onClick={() => setDisplayScale((s) => Math.max(SCALE_MIN, Math.round((s - SCALE_STEP) * 100) / 100))}
                        disabled={displayScale <= SCALE_MIN}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: displayScale <= SCALE_MIN ? '#333' : 'rgba(255,255,255,0.08)',
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 700,
                          cursor: displayScale <= SCALE_MIN ? 'not-allowed' : 'pointer',
                        }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: 48, fontSize: 14, fontWeight: 600, color: '#fff' }}>
                        {Math.round(displayScale * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setDisplayScale((s) => Math.min(SCALE_MAX, Math.round((s + SCALE_STEP) * 100) / 100))}
                        disabled={displayScale >= SCALE_MAX}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: displayScale >= SCALE_MAX ? '#333' : 'rgba(255,255,255,0.08)',
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 700,
                          cursor: displayScale >= SCALE_MAX ? 'not-allowed' : 'pointer',
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={handleApplyDisplay}
                        disabled={loading}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 6,
                          border: 'none',
                          background: '#fbbf24',
                          color: '#000',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Aplicar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingDisplayId(null)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: 'transparent',
                          color: '#94a3b8',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Painel de substituição */}
                {replacingItemId === item.id && (
                  <div style={{
                    marginTop: 8,
                    padding: 10,
                    borderRadius: 6,
                    border: '1px solid rgba(125,211,252,0.25)',
                    background: 'rgba(125,211,252,0.05)',
                  }}>
                    <p style={{ margin: '0 0 6px', fontSize: 11, color: '#7dd3fc', fontWeight: 600 }}>
                      Substituir por:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                      <select
                        value={replaceMediaId}
                        onChange={(e) => setReplaceMediaId(e.target.value)}
                        style={{
                          minWidth: 200,
                          padding: 8,
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.12)',
                          background: 'rgba(255,255,255,0.04)',
                          color: '#fff',
                          fontSize: 13,
                        }}
                      >
                        <option value="">Selecione da biblioteca...</option>
                        {availableMedia.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.type === 'IMAGE' ? '🖼️' : '🎬'} {m.altPt || m.originalUrl.split('/').pop()?.slice(0, 35)}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleReplaceWith(replaceMediaId)}
                        disabled={loading || !replaceMediaId}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 6,
                          border: 'none',
                          background: replaceMediaId ? '#7dd3fc' : '#444',
                          color: replaceMediaId ? '#000' : '#888',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: replaceMediaId ? 'pointer' : 'not-allowed',
                        }}
                      >
                        Substituir
                      </button>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#8f8ba2' }}>Ou por URL:</span>
                      <select
                        value={replaceUrlType}
                        onChange={(e) => setReplaceUrlType(e.target.value as 'IMAGE' | 'VIDEO')}
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
                        value={replaceUrl}
                        onChange={(e) => setReplaceUrl(e.target.value)}
                        placeholder="https://..."
                        style={{
                          flex: 1,
                          minWidth: 180,
                          padding: 8,
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.12)',
                          background: 'rgba(255,255,255,0.04)',
                          color: '#fff',
                          fontSize: 13,
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleReplaceByUrl}
                        disabled={loading || !replaceUrl.trim()}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 6,
                          border: 'none',
                          background: replaceUrl.trim() ? '#6ee7b7' : '#444',
                          color: replaceUrl.trim() ? '#000' : '#888',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: replaceUrl.trim() ? 'pointer' : 'not-allowed',
                        }}
                      >
                        Substituir por URL
                      </button>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        onClick={() => { setReplacingItemId(null); setReplaceMediaId(''); setReplaceUrl(''); }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: 'transparent',
                          color: '#94a3b8',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {gallery.length > 0 && (
        <p style={{ marginTop: 10, fontSize: 11, color: '#555', textAlign: 'center' }}>
          💡 Clique em 📝 para legendas · ← → para reordenar
        </p>
      )}
    </div>
  );
}
