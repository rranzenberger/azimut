'use client'

import React, { useState, useRef } from 'react'

interface MediaUploadFieldProps {
  label: string
  value?: string // ID da mídia
  onChange: (mediaId: string) => void
  mediaType: 'image' | 'video'
  specs?: {
    width?: number
    height?: number
    maxSizeMB?: number
    description?: string
  }
  existingMedia?: Array<{
    id: string
    originalUrl: string
    altPt?: string
    type: string
  }>
}

export default function MediaUploadField({
  label,
  value,
  onChange,
  mediaType,
  specs,
  existingMedia = []
}: MediaUploadFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Estilos inline consistentes com o backoffice
  const containerStyle: React.CSSProperties = {
    marginBottom: 20,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: '#e8e6f2',
  }

  const specsStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#7dd3fc',
    marginTop: 4,
    marginBottom: 12,
    padding: '8px 12px',
    borderRadius: 6,
    background: 'rgba(125, 211, 252, 0.1)',
    border: '1px solid rgba(125, 211, 252, 0.2)',
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
    cursor: uploading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: uploading ? 0.6 : 1,
  }

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    borderColor: 'rgba(201, 35, 55, 0.6)',
    background: 'rgba(201, 35, 55, 0.2)',
  }

  const selectStyle: React.CSSProperties = {
    width: '100%',
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

  // Upload de arquivo
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploading(true)

    try {
      // Validar tamanho
      const maxBytes = (specs?.maxSizeMB || 10) * 1024 * 1024
      if (file.size > maxBytes) {
        throw new Error(`Arquivo muito grande! Máximo: ${specs?.maxSizeMB || 10}MB`)
      }

      // Validar tipo
      const validTypes = mediaType === 'image' 
        ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        : ['video/mp4', 'video/webm', 'video/mov']
      
      if (!validTypes.includes(file.type)) {
        throw new Error(`Tipo inválido! Use: ${validTypes.join(', ')}`)
      }

      // Validar dimensões (apenas para imagens)
      if (mediaType === 'image' && (specs?.width || specs?.height)) {
        const img = new Image()
        const url = URL.createObjectURL(file)
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            if (specs.width && img.width < specs.width * 0.8) {
              reject(new Error(`Largura muito pequena! Recomendado: ${specs.width}px`))
            }
            if (specs.height && img.height < specs.height * 0.8) {
              reject(new Error(`Altura muito pequena! Recomendada: ${specs.height}px`))
            }
            resolve(true)
          }
          img.onerror = () => reject(new Error('Erro ao carregar imagem'))
          img.src = url
        })
      }

      // Fazer upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', mediaType.toUpperCase())

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro no upload')
      }

      const data = await response.json()
      
      // Atualizar preview
      setPreview(data.url || data.originalUrl)
      
      // Retornar ID da mídia
      onChange(data.id || data.media?.id)

    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload')
    } finally {
      setUploading(false)
      // Limpar input para permitir re-upload do mesmo arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Selecionar da biblioteca
  const handleSelectFromLibrary = (mediaId: string) => {
    const media = existingMedia.find(m => m.id === mediaId)
    if (media) {
      setPreview(media.originalUrl)
      onChange(mediaId)
      setShowLibrary(false)
    }
  }

  // Buscar preview da mídia selecionada
  React.useEffect(() => {
    if (value && existingMedia.length > 0) {
      const media = existingMedia.find(m => m.id === value)
      if (media) {
        setPreview(media.originalUrl)
      }
    } else if (!value) {
      setPreview(null)
    }
  }, [value, existingMedia])

  return (
    <div style={containerStyle}>
      {/* Label */}
      <label style={labelStyle}>
        {label}
      </label>

      {/* Especificações VISÍVEIS */}
      {specs && (
        <div style={specsStyle}>
          <strong style={{ color: '#7dd3fc', display: 'block', marginBottom: 4 }}>
            📐 Especificações Recomendadas:
          </strong>
          {specs.width && specs.height && (
            <div style={{ marginTop: 4 }}>
              <strong>Dimensões:</strong> {specs.width}x{specs.height}px
            </div>
          )}
          {specs.maxSizeMB && (
            <div style={{ marginTop: 4 }}>
              <strong>Tamanho máximo:</strong> {specs.maxSizeMB}MB
            </div>
          )}
          {specs.description && (
            <div style={{ marginTop: 4, fontSize: 11, opacity: 0.9 }}>
              💡 {specs.description}
            </div>
          )}
        </div>
      )}

      {/* Botões de ação - LADO A LADO */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {/* Botão Fazer Upload - SEMPRE VISÍVEL */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={uploading ? buttonStyle : buttonHoverStyle}
          onMouseEnter={(e) => {
            if (!uploading) {
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
          }}
          onMouseLeave={(e) => {
            if (!uploading) {
              Object.assign(e.currentTarget.style, buttonStyle)
            }
          }}
        >
          <span style={{ fontSize: 16 }}>📤</span>
          <span>{uploading ? 'Enviando...' : 'Fazer Upload'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={mediaType === 'image' ? 'image/*' : 'video/*'}
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ display: 'none' }}
        />

        {/* Dropdown Biblioteca */}
        <select
          value={value || ''}
          onChange={(e) => {
            if (e.target.value) {
              handleSelectFromLibrary(e.target.value)
            } else {
              onChange('')
              setPreview(null)
            }
          }}
          style={selectStyle}
        >
          <option value="">📚 Selecionar da Biblioteca</option>
          {existingMedia
            .filter(m => m.type === mediaType.toUpperCase())
            .sort((a, b) => {
              // Ordenar por data (mais recente primeiro)
              return 0
            })
            .map(media => (
              <option key={media.id} value={media.id} style={{ background: 'rgba(10, 15, 30, 0.98)', color: '#ffffff' }}>
                {mediaType === 'image' ? '🖼️' : '🎥'} {media.altPt || media.originalUrl}
              </option>
            ))}
        </select>
      </div>

      {/* Preview */}
      {preview && (
        <div style={{
          position: 'relative',
          marginTop: 12,
          padding: 10,
          borderRadius: 8,
          border: '1px solid rgba(201, 35, 55, 0.3)',
          background: 'rgba(201, 35, 55, 0.1)',
        }}>
          {mediaType === 'image' ? (
            <img 
              src={preview} 
              alt="Preview" 
              style={{ 
                width: '100%', 
                maxHeight: 200, 
                objectFit: 'cover', 
                borderRadius: 6 
              }} 
            />
          ) : (
            <video 
              src={preview} 
              controls
              style={{ 
                width: '100%', 
                maxHeight: 200, 
                objectFit: 'cover', 
                borderRadius: 6 
              }} 
            />
          )}
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#86efac' }}>
            ✅ {mediaType === 'image' ? 'Imagem' : 'Vídeo'} selecionado(a) (será usado!)
          </p>
          <button
            type="button"
            onClick={() => {
              setPreview(null)
              onChange('')
            }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              padding: '6px 10px',
              borderRadius: 6,
              background: 'rgba(201, 35, 55, 0.9)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ✕ Remover
          </button>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div style={{
          marginTop: 12,
          padding: '10px 14px',
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
