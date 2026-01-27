'use client'

import React, { useState, useRef, useEffect } from 'react'

/**
 * UnifiedMediaUpload - Componente unificado para upload de mídia
 * 
 * Permite upload de:
 * - Imagem principal (thumbnail/hero)
 * - Vídeo (opcional)
 * 
 * Lógica de exibição:
 * - Se tem vídeo → mostra vídeo com thumbnail como poster
 * - Se não tem vídeo → mostra imagem/thumbnail
 * 
 * As mídias são salvas automaticamente na biblioteca para reuso.
 */

interface MediaData {
  id: string
  type: 'IMAGE' | 'VIDEO'
  originalUrl: string
  thumbnailUrl?: string
  altPt?: string
}

interface UnifiedMediaUploadProps {
  // Identificação do local (para categorizar na biblioteca)
  pageSlug: string
  sectionSlug?: string
  
  // Valores atuais
  imageId?: string
  imageUrl?: string
  videoId?: string
  videoUrl?: string
  
  // Callbacks
  onImageChange: (mediaId: string | null, url: string | null) => void
  onVideoChange?: (mediaId: string | null, url: string | null) => void
  
  // Opções
  allowVideo?: boolean
  allowExternalUrl?: boolean
  
  // Especificações
  imageSpecs?: {
    width?: number
    height?: number
    maxSizeMB?: number
    description?: string
  }
  videoSpecs?: {
    maxSizeMB?: number
    description?: string
  }
  
  // Biblioteca existente
  existingMedia?: MediaData[]
  
  // Labels customizáveis
  imageLabel?: string
  videoLabel?: string
}

export default function UnifiedMediaUpload({
  pageSlug,
  sectionSlug,
  imageId,
  imageUrl,
  videoId,
  videoUrl,
  onImageChange,
  onVideoChange,
  allowVideo = true,
  allowExternalUrl = true,
  imageSpecs = { width: 1920, height: 1080, maxSizeMB: 5 },
  videoSpecs = { maxSizeMB: 50 },
  existingMedia = [],
  imageLabel = 'Imagem de Fundo do Hero',
  videoLabel = 'Vídeo Demoreel Institucional',
}: UnifiedMediaUploadProps) {
  const [uploading, setUploading] = useState<'image' | 'video' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null)
  const [videoPreview, setVideoPreview] = useState<string | null>(videoUrl || null)
  const [externalImageUrl, setExternalImageUrl] = useState('')
  const [externalVideoUrl, setExternalVideoUrl] = useState('')
  
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  // Atualizar previews quando valores mudam
  useEffect(() => {
    if (imageUrl) setImagePreview(imageUrl)
    if (videoUrl) setVideoPreview(videoUrl)
  }, [imageUrl, videoUrl])

  // Upload de arquivo
  const handleFileUpload = async (
    file: File, 
    type: 'IMAGE' | 'VIDEO',
    onSuccess: (mediaId: string, url: string) => void
  ) => {
    setError(null)
    setSuccess(null)
    setUploading(type === 'IMAGE' ? 'image' : 'video')

    try {
      // Validar tamanho
      const maxBytes = (type === 'IMAGE' ? imageSpecs.maxSizeMB : videoSpecs.maxSizeMB) || 10
      if (file.size > maxBytes * 1024 * 1024) {
        throw new Error(`Arquivo muito grande! Máximo: ${maxBytes}MB`)
      }

      // Validar tipo
      const validTypes = type === 'IMAGE'
        ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        : ['video/mp4', 'video/webm', 'video/mov', 'video/quicktime']

      if (!validTypes.some(t => file.type.includes(t.split('/')[1]))) {
        throw new Error(`Tipo inválido! Use: ${validTypes.map(t => t.split('/')[1]).join(', ')}`)
      }

      // FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)
      formData.append('pageSlug', pageSlug)
      if (sectionSlug) formData.append('sectionSlug', sectionSlug)

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro no upload')
      }

      const data = await response.json()
      const mediaId = data.media?.id || data.id
      const mediaUrl = data.media?.originalUrl || data.originalUrl || data.url

      onSuccess(mediaId, mediaUrl)
      setSuccess(`${type === 'IMAGE' ? 'Imagem' : 'Vídeo'} enviado com sucesso!`)

    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload')
    } finally {
      setUploading(null)
    }
  }

  // Upload de imagem
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await handleFileUpload(file, 'IMAGE', (mediaId, url) => {
      setImagePreview(url)
      onImageChange(mediaId, url)
    })

    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  // Upload de vídeo
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await handleFileUpload(file, 'VIDEO', (mediaId, url) => {
      setVideoPreview(url)
      onVideoChange?.(mediaId, url)
    })

    if (videoInputRef.current) videoInputRef.current.value = ''
  }

  // Adicionar URL externa de imagem
  const handleExternalImageUrl = async () => {
    if (!externalImageUrl.trim()) return

    setError(null)
    setSuccess(null)
    setUploading('image')

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'IMAGE',
          originalUrl: externalImageUrl.trim(),
          altPt: `Imagem ${pageSlug}`,
          pageSlug,
          sectionSlug,
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar URL')
      }

      const data = await response.json()
      const mediaId = data.media?.id
      const mediaUrl = externalImageUrl.trim()

      setImagePreview(mediaUrl)
      onImageChange(mediaId, mediaUrl)
      setExternalImageUrl('')
      setSuccess('URL da imagem adicionada!')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(null)
    }
  }

  // Adicionar URL externa de vídeo
  const handleExternalVideoUrl = async () => {
    if (!externalVideoUrl.trim()) return

    setError(null)
    setSuccess(null)
    setUploading('video')

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'VIDEO',
          originalUrl: externalVideoUrl.trim(),
          altPt: `Vídeo ${pageSlug}`,
          pageSlug,
          sectionSlug,
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar URL')
      }

      const data = await response.json()
      const mediaId = data.media?.id
      const mediaUrl = externalVideoUrl.trim()

      setVideoPreview(mediaUrl)
      onVideoChange?.(mediaId, mediaUrl)
      setExternalVideoUrl('')
      setSuccess('URL do vídeo adicionada!')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(null)
    }
  }

  // Selecionar da biblioteca
  const handleSelectFromLibrary = (mediaId: string, type: 'IMAGE' | 'VIDEO') => {
    const media = existingMedia.find(m => m.id === mediaId)
    if (!media) return

    if (type === 'IMAGE') {
      setImagePreview(media.originalUrl)
      onImageChange(mediaId, media.originalUrl)
    } else {
      setVideoPreview(media.originalUrl)
      onVideoChange?.(mediaId, media.originalUrl)
    }
  }

  // Remover mídia
  const handleRemove = (type: 'IMAGE' | 'VIDEO') => {
    if (type === 'IMAGE') {
      setImagePreview(null)
      onImageChange(null, null)
    } else {
      setVideoPreview(null)
      onVideoChange?.(null, null)
    }
  }

  // Estilos
  const sectionStyle: React.CSSProperties = {
    padding: 20,
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.02)',
    marginBottom: 20,
  }

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: 600,
    color: '#e8e6f2',
  }

  const specsStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#7dd3fc',
    marginBottom: 16,
    padding: '10px 14px',
    borderRadius: 8,
    background: 'rgba(125, 211, 252, 0.08)',
    border: '1px solid rgba(125, 211, 252, 0.15)',
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
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    fontSize: 14,
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c92337'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.2em',
  }

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(10, 15, 30, 0.95)',
    color: '#ffffff',
    fontSize: 14,
  }

  const previewStyle: React.CSSProperties = {
    position: 'relative',
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    border: '1px solid rgba(46, 204, 113, 0.3)',
    background: 'rgba(46, 204, 113, 0.05)',
  }

  return (
    <div>
      {/* Mensagens */}
      {error && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 8,
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          marginBottom: 16,
          fontSize: 13,
        }}>
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 8,
          background: 'rgba(46, 204, 113, 0.12)',
          border: '1px solid rgba(46, 204, 113, 0.3)',
          color: '#6ee7b7',
          marginBottom: 16,
          fontSize: 13,
        }}>
          ✓ {success}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SEÇÃO: IMAGEM
          ═══════════════════════════════════════════════════════════════ */}
      <div style={sectionStyle}>
        <div style={labelStyle}>
          🖼️ {imageLabel}
        </div>

        <div style={{ marginBottom: 12, fontSize: 13, color: '#94a3b8' }}>
          <strong>Imagem de Fundo</strong>
        </div>

        {/* Especificações */}
        <div style={specsStyle}>
          <div style={{ fontWeight: 600, marginBottom: 6, color: '#7dd3fc' }}>
            📐 Especificações Recomendadas:
          </div>
          {imageSpecs.width && imageSpecs.height && (
            <div><strong>Dimensões:</strong> {imageSpecs.width}×{imageSpecs.height}px</div>
          )}
          {imageSpecs.maxSizeMB && (
            <div><strong>Tamanho máximo:</strong> {imageSpecs.maxSizeMB}MB</div>
          )}
          {imageSpecs.description && (
            <div style={{ marginTop: 4, fontSize: 11, opacity: 0.9 }}>
              💡 {imageSpecs.description}
            </div>
          )}
        </div>

        {/* Botões de Upload */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploading === 'image'}
            style={{
              ...buttonStyle,
              opacity: uploading === 'image' ? 0.6 : 1,
              cursor: uploading === 'image' ? 'not-allowed' : 'pointer',
            }}
          >
            <span>📤</span>
            <span>{uploading === 'image' ? 'Enviando...' : 'Fazer Upload'}</span>
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          <select
            value={imageId || ''}
            onChange={(e) => e.target.value && handleSelectFromLibrary(e.target.value, 'IMAGE')}
            style={selectStyle}
          >
            <option value="">📚 Selecionar da Biblioteca</option>
            {existingMedia
              .filter(m => m.type === 'IMAGE')
              .map(media => (
                <option key={media.id} value={media.id}>
                  🖼️ {media.altPt || media.originalUrl.split('/').pop()}
                </option>
              ))}
          </select>
        </div>

        {/* URL Externa */}
        {allowExternalUrl && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#8f8ba2', marginBottom: 8 }}>
              💡 OU usar URL externa (Unsplash, Cloudinary, etc)
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="url"
                value={externalImageUrl}
                onChange={(e) => setExternalImageUrl(e.target.value)}
                placeholder="/hero-background.jpg"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={handleExternalImageUrl}
                disabled={!externalImageUrl.trim() || uploading === 'image'}
                style={{
                  ...buttonStyle,
                  padding: '12px 16px',
                  opacity: !externalImageUrl.trim() ? 0.5 : 1,
                }}
              >
                Usar
              </button>
            </div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
              🌐 Cole a URL da imagem externa (será usado apenas se nenhuma mídia for selecionada)
            </div>
          </div>
        )}

        {/* Preview da Imagem */}
        {imagePreview && (
          <div style={previewStyle}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                maxHeight: 200,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <span style={{ fontSize: 12, color: '#6ee7b7' }}>
                ✅ Imagem selecionada
              </span>
              <button
                type="button"
                onClick={() => handleRemove('IMAGE')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                ✕ Remover
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SEÇÃO: VÍDEO (opcional)
          ═══════════════════════════════════════════════════════════════ */}
      {allowVideo && (
        <div style={sectionStyle}>
          <div style={labelStyle}>
            🎬 {videoLabel}
          </div>

          <div style={{ marginBottom: 12, fontSize: 13, color: '#94a3b8' }}>
            <strong>Vídeo Demoreel</strong>
          </div>

          {/* Especificações */}
          <div style={specsStyle}>
            <div style={{ fontWeight: 600, marginBottom: 6, color: '#7dd3fc' }}>
              📐 Especificações Recomendadas:
            </div>
            <div><strong>Tamanho máximo:</strong> {videoSpecs.maxSizeMB}MB</div>
            <div style={{ marginTop: 4, fontSize: 11, opacity: 0.9 }}>
              💡 Vídeo institucional (MP4, WebM ou MOV)
            </div>
          </div>

          {/* Botões de Upload */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              disabled={uploading === 'video'}
              style={{
                ...buttonStyle,
                opacity: uploading === 'video' ? 0.6 : 1,
                cursor: uploading === 'video' ? 'not-allowed' : 'pointer',
              }}
            >
              <span>📤</span>
              <span>{uploading === 'video' ? 'Enviando...' : 'Fazer Upload'}</span>
            </button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              style={{ display: 'none' }}
            />

            <select
              value={videoId || ''}
              onChange={(e) => e.target.value && handleSelectFromLibrary(e.target.value, 'VIDEO')}
              style={selectStyle}
            >
              <option value="">📚 Selecionar da Biblioteca</option>
              {existingMedia
                .filter(m => m.type === 'VIDEO')
                .map(media => (
                  <option key={media.id} value={media.id}>
                    🎬 {media.altPt || media.originalUrl.split('/').pop()}
                  </option>
                ))}
            </select>
          </div>

          {/* URL Externa de Vídeo */}
          {allowExternalUrl && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#8f8ba2', marginBottom: 8 }}>
                💡 OU usar URL externa (YouTube/Vimeo)
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="url"
                  value={externalVideoUrl}
                  onChange={(e) => setExternalVideoUrl(e.target.value)}
                  placeholder="https://vimeo.com/..."
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={handleExternalVideoUrl}
                  disabled={!externalVideoUrl.trim() || uploading === 'video'}
                  style={{
                    ...buttonStyle,
                    padding: '12px 16px',
                    opacity: !externalVideoUrl.trim() ? 0.5 : 1,
                  }}
                >
                  Usar
                </button>
              </div>
            </div>
          )}

          {/* Preview do Vídeo */}
          {videoPreview && (
            <div style={previewStyle}>
              {videoPreview.includes('youtube') || videoPreview.includes('vimeo') ? (
                <div style={{
                  padding: 16,
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 8,
                  textAlign: 'center',
                }}>
                  <span style={{ fontSize: 32 }}>🎬</span>
                  <p style={{ margin: '8px 0 0', fontSize: 13, color: '#94a3b8' }}>
                    {videoPreview}
                  </p>
                </div>
              ) : (
                <video
                  src={videoPreview}
                  controls
                  style={{
                    width: '100%',
                    maxHeight: 200,
                    borderRadius: 8,
                  }}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <span style={{ fontSize: 12, color: '#6ee7b7' }}>
                  ✅ Vídeo selecionado
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove('VIDEO')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  ✕ Remover
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resumo */}
      <div style={{
        padding: 12,
        borderRadius: 8,
        background: 'rgba(147, 51, 234, 0.08)',
        border: '1px solid rgba(147, 51, 234, 0.2)',
        fontSize: 12,
        color: '#c4b5fd',
      }}>
        <strong>📊 Resumo:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
          <li>Imagem: {imagePreview ? '✅ Definida' : '❌ Não definida'}</li>
          {allowVideo && (
            <li>Vídeo: {videoPreview ? '✅ Definido' : '❌ Não definido'}</li>
          )}
        </ul>
        <p style={{ margin: '8px 0 0', opacity: 0.8 }}>
          💡 {videoPreview ? 'O vídeo será exibido com a imagem como thumbnail.' : 'A imagem será exibida como fundo.'}
        </p>
      </div>
    </div>
  )
}
