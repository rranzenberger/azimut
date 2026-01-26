'use client'

import React, { useState, useRef, useEffect } from 'react'

interface VideoWithThumbnailFieldProps {
  label: string
  // Vídeo
  videoValue?: string
  videoUrl?: string
  onVideoChange: (mediaId: string) => void
  onVideoUrlChange: (url: string) => void
  // Thumbnail
  thumbnailValue?: string
  thumbnailUrl?: string
  onThumbnailChange: (mediaId: string) => void
  onThumbnailUrlChange: (url: string) => void
  // Config
  specs?: {
    videoMaxSizeMB?: number
    thumbWidth?: number
    thumbHeight?: number
    thumbMaxSizeMB?: number
    description?: string
  }
  existingMedia?: Array<{
    id: string
    originalUrl: string
    altPt?: string
    type: string
  }>
}

export default function VideoWithThumbnailField({
  label,
  videoValue,
  videoUrl,
  onVideoChange,
  onVideoUrlChange,
  thumbnailValue,
  thumbnailUrl,
  onThumbnailChange,
  onThumbnailUrlChange,
  specs,
  existingMedia = []
}: VideoWithThumbnailFieldProps) {
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingThumb, setUploadingThumb] = useState(false)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [thumbPreview, setThumbPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const videoInputRef = useRef<HTMLInputElement>(null)
  const thumbInputRef = useRef<HTMLInputElement>(null)

  // Estilos
  const sectionStyle: React.CSSProperties = {
    padding: 20,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    marginBottom: 20,
  }

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 20px',
    borderRadius: 8,
    border: '2px solid rgba(201, 35, 55, 0.4)',
    background: 'rgba(201, 35, 55, 0.1)',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  const selectStyle: React.CSSProperties = {
    flex: 1,
    minHeight: 48,
    padding: '0.75rem 2.75rem 0.75rem 1rem',
    borderRadius: 8,
    background: 'rgba(10, 15, 30, 0.95)',
    border: '1px solid rgba(201, 35, 55, 0.4)',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c92337'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.2em',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    background: 'rgba(10, 15, 30, 0.95)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#ffffff',
    fontSize: 14,
  }

  // Sincronizar previews com valores existentes
  useEffect(() => {
    if (videoValue && existingMedia.length > 0) {
      const media = existingMedia.find(m => m.id === videoValue)
      if (media) setVideoPreview(media.originalUrl)
    } else if (videoUrl) {
      setVideoPreview(videoUrl)
    } else if (!videoValue && !videoUrl) {
      setVideoPreview(null)
    }
  }, [videoValue, videoUrl, existingMedia])

  useEffect(() => {
    if (thumbnailValue && existingMedia.length > 0) {
      const media = existingMedia.find(m => m.id === thumbnailValue)
      if (media) setThumbPreview(media.originalUrl)
    } else if (thumbnailUrl) {
      setThumbPreview(thumbnailUrl)
    } else if (!thumbnailValue && !thumbnailUrl) {
      setThumbPreview(null)
    }
  }, [thumbnailValue, thumbnailUrl, existingMedia])

  // Upload de vídeo
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploadingVideo(true)

    try {
      const maxBytes = (specs?.videoMaxSizeMB || 25) * 1024 * 1024
      if (file.size > maxBytes) {
        throw new Error(`Vídeo muito grande! Máximo: ${specs?.videoMaxSizeMB || 25}MB`)
      }

      const validTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/quicktime']
      if (!validTypes.includes(file.type)) {
        throw new Error('Tipo inválido! Use: MP4, WebM ou MOV')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'VIDEO')

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro no upload do vídeo')
      }

      const data = await response.json()
      setVideoPreview(data.url || data.originalUrl)
      onVideoChange(data.id || data.media?.id)

    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload do vídeo')
    } finally {
      setUploadingVideo(false)
      if (videoInputRef.current) videoInputRef.current.value = ''
    }
  }

  // Upload de thumbnail
  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploadingThumb(true)

    try {
      const maxBytes = (specs?.thumbMaxSizeMB || 2) * 1024 * 1024
      if (file.size > maxBytes) {
        throw new Error(`Thumbnail muito grande! Máximo: ${specs?.thumbMaxSizeMB || 2}MB`)
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        throw new Error('Tipo inválido! Use: JPG, PNG ou WebP')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'IMAGE')
      formData.append('imageType', 'video-poster')

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro no upload do thumbnail')
      }

      const data = await response.json()
      setThumbPreview(data.url || data.originalUrl)
      onThumbnailChange(data.id || data.media?.id)

    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload do thumbnail')
    } finally {
      setUploadingThumb(false)
      if (thumbInputRef.current) thumbInputRef.current.value = ''
    }
  }

  // Selecionar da biblioteca
  const handleSelectVideo = (mediaId: string) => {
    if (!mediaId) {
      setVideoPreview(null)
      onVideoChange('')
      return
    }
    const media = existingMedia.find(m => m.id === mediaId)
    if (media) {
      setVideoPreview(media.originalUrl)
      onVideoChange(mediaId)
    }
  }

  const handleSelectThumb = (mediaId: string) => {
    if (!mediaId) {
      setThumbPreview(null)
      onThumbnailChange('')
      return
    }
    const media = existingMedia.find(m => m.id === mediaId)
    if (media) {
      setThumbPreview(media.originalUrl)
      onThumbnailChange(mediaId)
    }
  }

  const videos = existingMedia.filter(m => m.type === 'VIDEO')
  const images = existingMedia.filter(m => m.type === 'IMAGE')

  return (
    <div style={{ marginBottom: 24 }}>
      {/* ═══════════════════════════════════════════════════════════
          SEÇÃO DO VÍDEO
      ═══════════════════════════════════════════════════════════ */}
      <div style={sectionStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>
          🎬 {label}
        </h3>
        
        {/* Especificações */}
        <div style={{ 
          fontSize: 12, 
          color: '#7dd3fc', 
          marginBottom: 16,
          padding: '8px 12px',
          borderRadius: 6,
          background: 'rgba(125, 211, 252, 0.1)',
          border: '1px solid rgba(125, 211, 252, 0.2)',
        }}>
          <strong>📐 Tamanho máximo:</strong> {specs?.videoMaxSizeMB || 25}MB
          {specs?.description && <span style={{ marginLeft: 12 }}>💡 {specs.description}</span>}
        </div>

        {/* Botões: Upload + Dropdown */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            disabled={uploadingVideo}
            style={{ ...buttonStyle, opacity: uploadingVideo ? 0.6 : 1 }}
          >
            <span>📤</span>
            <span>{uploadingVideo ? 'Enviando...' : 'Fazer Upload'}</span>
          </button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: 'none' }}
          />

          <select
            value={videoValue || ''}
            onChange={(e) => handleSelectVideo(e.target.value)}
            style={selectStyle}
          >
            <option value="">📚 Selecionar da Biblioteca ({videos.length} vídeos)</option>
            {videos.map(media => (
              <option key={media.id} value={media.id}>
                🎥 {media.altPt || media.originalUrl}
              </option>
            ))}
          </select>
        </div>

        {/* URL Manual */}
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8f8ba2' }}>
            📍 OU usar URL externa (YouTube/Vimeo/Local)
          </label>
          <input
            type="url"
            value={videoUrl || ''}
            onChange={(e) => onVideoUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... ou /meu-video.mp4"
            style={inputStyle}
            disabled={!!videoValue}
          />
          <div style={{ marginTop: 6, fontSize: 11, color: videoValue ? '#8f8ba2' : '#7dd3fc' }}>
            {videoValue ? '🔒 Desabilitado (vídeo selecionado acima)' : '🌐 Cole a URL'}
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════
          SEÇÃO DO THUMBNAIL (só aparece se tem vídeo)
      ═══════════════════════════════════════════════════════════ */}
      {(videoValue || videoUrl || videoPreview) && (
        <div style={{ 
          ...sectionStyle, 
          borderColor: 'rgba(147, 51, 234, 0.3)',
          background: 'rgba(147, 51, 234, 0.08)'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#a78bfa' }}>
            🖼️ Thumbnail do Vídeo (Capa)
          </h3>
          
          <p style={{ margin: '0 0 12px', fontSize: 12, color: '#8f8ba2' }}>
            Imagem que aparece antes de dar play. Recomendado: {specs?.thumbWidth || 1920}x{specs?.thumbHeight || 1080}px (16:9)
          </p>

          {/* Botões: Upload + Dropdown */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => thumbInputRef.current?.click()}
              disabled={uploadingThumb}
              style={{ 
                ...buttonStyle, 
                borderColor: 'rgba(147, 51, 234, 0.4)',
                background: 'rgba(147, 51, 234, 0.1)',
                opacity: uploadingThumb ? 0.6 : 1 
              }}
            >
              <span>📤</span>
              <span>{uploadingThumb ? 'Enviando...' : 'Upload Thumbnail'}</span>
            </button>
            <input
              ref={thumbInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbUpload}
              style={{ display: 'none' }}
            />

            <select
              value={thumbnailValue || ''}
              onChange={(e) => handleSelectThumb(e.target.value)}
              style={{ ...selectStyle, borderColor: 'rgba(147, 51, 234, 0.4)' }}
            >
              <option value="">📚 Selecionar da Biblioteca ({images.length} imagens)</option>
              {images.map(media => (
                <option key={media.id} value={media.id}>
                  🖼️ {media.altPt || media.originalUrl}
                </option>
              ))}
            </select>
          </div>

          {/* URL Manual */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8f8ba2' }}>
              📍 OU usar URL local
            </label>
            <input
              type="url"
              value={thumbnailUrl || ''}
              onChange={(e) => onThumbnailUrlChange(e.target.value)}
              placeholder="/chris-milk-thumbnail.png"
              style={inputStyle}
              disabled={!!thumbnailValue}
            />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PREVIEWS LADO A LADO (Thumbnail + Vídeo)
      ═══════════════════════════════════════════════════════════ */}
      {(videoPreview || thumbPreview) && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 20,
          marginTop: 8
        }}>
          {/* Preview do Thumbnail */}
          <div style={{ 
            padding: 16, 
            borderRadius: 12, 
            background: 'rgba(147, 51, 234, 0.08)',
            border: '1px solid rgba(147, 51, 234, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#a78bfa' }}>
                🖼️ Preview do Thumbnail
              </h4>
              {thumbPreview && (
                <button
                  type="button"
                  onClick={() => { setThumbPreview(null); onThumbnailChange(''); onThumbnailUrlChange(''); }}
                  style={{ padding: '4px 10px', borderRadius: 4, background: 'rgba(239,68,68,0.8)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11 }}
                >
                  ✕ Remover
                </button>
              )}
            </div>
            <div style={{ 
              aspectRatio: '16/9', 
              width: '100%',
              borderRadius: 8, 
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.5)',
              border: '2px solid rgba(147, 51, 234, 0.4)',
            }}>
              {thumbPreview ? (
                <img 
                  src={thumbPreview}
                  alt="Thumbnail preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/og-image.png' }}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#8f8ba2',
                  fontSize: 12
                }}>
                  ⚠️ Sem thumbnail
                </div>
              )}
            </div>
          </div>

          {/* Preview do Vídeo Completo */}
          <div style={{ 
            padding: 16, 
            borderRadius: 12, 
            background: 'rgba(46, 204, 113, 0.08)',
            border: '1px solid rgba(46, 204, 113, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#86efac' }}>
                📺 Preview do Vídeo
              </h4>
              {videoPreview && (
                <button
                  type="button"
                  onClick={() => { setVideoPreview(null); onVideoChange(''); onVideoUrlChange(''); }}
                  style={{ padding: '4px 10px', borderRadius: 4, background: 'rgba(239,68,68,0.8)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11 }}
                >
                  ✕ Remover
                </button>
              )}
            </div>
            <div style={{ 
              aspectRatio: '16/9', 
              width: '100%',
              borderRadius: 8, 
              overflow: 'hidden',
              background: '#000',
              border: '2px solid rgba(46, 204, 113, 0.4)',
            }}>
              {videoPreview ? (
                <video 
                  src={videoPreview} 
                  controls 
                  poster={thumbPreview || undefined}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#8f8ba2',
                  fontSize: 12
                }}>
                  ⚠️ Sem vídeo
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 8,
          border: '1px solid rgba(239, 68, 68, 0.5)',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#fca5a5',
          fontSize: 13,
        }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
