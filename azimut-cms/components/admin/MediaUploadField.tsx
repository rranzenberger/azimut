'use client'

import React, { useState } from 'react'
import { Upload, Image as ImageIcon, Film, X, Check } from 'lucide-react'

interface MediaUploadFieldProps {
  label: string
  value?: string // ID da mídia ou URL
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
        throw new Error('Erro no upload')
      }

      const data = await response.json()
      
      // Atualizar preview
      setPreview(data.url)
      
      // Retornar ID da mídia
      onChange(data.id)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  // Selecionar da biblioteca
  const handleSelectFromLibrary = (mediaId: string, url: string) => {
    setPreview(url)
    onChange(mediaId)
    setShowLibrary(false)
  }

  return (
    <div className="space-y-3">
      {/* Label com especificações */}
      <div className="flex items-start justify-between">
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
        {specs && (
          <span className="text-xs text-slate-400">
            {specs.width && specs.height && `${specs.width}x${specs.height}px`}
            {specs.maxSizeMB && ` • máx ${specs.maxSizeMB}MB`}
          </span>
        )}
      </div>

      {specs?.description && (
        <p className="text-xs text-slate-400 -mt-1">
          {specs.description}
        </p>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative rounded-lg overflow-hidden border border-azimut-red/40 bg-slate-900/50">
          {mediaType === 'image' ? (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          ) : (
            <video src={preview} className="w-full h-48 object-cover" controls />
          )}
          <button
            onClick={() => {
              setPreview(null)
              onChange('')
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-azimut-red text-white hover:bg-azimut-red/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex gap-2">
        {/* Upload novo */}
        <label className="flex-1 cursor-pointer">
          <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-azimut-red/40 bg-slate-900/50 px-4 py-3 text-sm text-white hover:border-azimut-red/60 hover:bg-slate-900/70 transition-all">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Enviando...' : 'Fazer Upload'}</span>
          </div>
          <input
            type="file"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* Escolher da biblioteca */}
        {existingMedia.length > 0 && (
          <button
            type="button"
            onClick={() => setShowLibrary(!showLibrary)}
            className="flex items-center gap-2 rounded-lg border border-azimut-red/40 bg-slate-900/50 px-4 py-3 text-sm text-white hover:border-azimut-red/60 hover:bg-slate-900/70 transition-all"
          >
            {mediaType === 'image' ? <ImageIcon className="w-4 h-4" /> : <Film className="w-4 h-4" />}
            <span>Biblioteca</span>
          </button>
        )}
      </div>

      {/* Erro */}
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Biblioteca (grid de mídias) */}
      {showLibrary && existingMedia.length > 0 && (
        <div className="rounded-lg border border-azimut-red/40 bg-slate-900/50 p-4 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2">
            {existingMedia
              .filter(m => m.type === mediaType.toUpperCase())
              .map(media => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => handleSelectFromLibrary(media.id, media.originalUrl)}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-azimut-red transition-all group"
                >
                  {mediaType === 'image' ? (
                    <img 
                      src={media.originalUrl} 
                      alt={media.altPt || ''} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={media.originalUrl} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  {value === media.id && (
                    <div className="absolute inset-0 bg-azimut-red/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
