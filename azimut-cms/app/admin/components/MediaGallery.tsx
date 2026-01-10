'use client'

import React, { useState, useEffect } from 'react'
import { Image as ImageIcon, Film, Search, Filter, Grid3x3, List, Download, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'

interface Media {
  id: string
  type: 'IMAGE' | 'VIDEO'
  originalUrl: string
  thumbnailUrl?: string
  mediumUrl?: string
  largeUrl?: string
  webpUrl?: string
  width?: number
  height?: number
  sizeBytes: number
  durationSeconds?: number
  mimeType: string
  filename: string
  originalFilename: string
  folder?: string
  alt?: string
  caption?: string
  createdAt: string
  updatedAt: string
}

interface MediaGalleryProps {
  onSelect?: (media: Media) => void
  multiSelect?: boolean
  folder?: string
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  onSelect,
  multiSelect = false,
  folder
}) => {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL')
  const [lightboxMedia, setLightboxMedia] = useState<Media | null>(null)

  useEffect(() => {
    loadMedia()
  }, [folder, typeFilter, search])

  const loadMedia = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (folder) params.append('folder', folder)
      if (typeFilter !== 'ALL') params.append('type', typeFilter)
      if (search) params.append('search', search)
      params.append('limit', '100')

      const response = await fetch(`/api/media/list?${params}`)
      const data = await response.json()

      if (data.success) {
        setMedia(data.data)
      }
    } catch (error) {
      console.error('Failed to load media:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      if (multiSelect) {
        newSelected.add(id)
      } else {
        newSelected.clear()
        newSelected.add(id)
      }
    }
    setSelectedIds(newSelected)

    // Callback
    if (onSelect && !multiSelect) {
      const selectedMedia = media.find(m => m.id === id)
      if (selectedMedia) {
        onSelect(selectedMedia)
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Search */}
        <div className="flex-1 min-w-[200px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar arquivos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="ALL">Todos</option>
            <option value="IMAGE">Imagens</option>
            <option value="VIDEO">Vídeos</option>
          </select>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Selected count */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-sm text-blue-900 dark:text-blue-100">
            {selectedIds.size} arquivo{selectedIds.size > 1 ? 's' : ''} selecionado{selectedIds.size > 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Limpar seleção
          </button>
        </div>
      )}

      {/* Grid/List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Carregando...</div>
      ) : media.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Nenhum arquivo encontrado</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => {
            const isSelected = selectedIds.has(item.id)
            const thumbnailUrl = item.thumbnailUrl || item.mediumUrl || item.originalUrl

            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={`
                  relative group cursor-pointer rounded-lg overflow-hidden
                  border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                {/* Thumbnail */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                  {item.type === 'IMAGE' ? (
                    <img
                      src={thumbnailUrl}
                      alt={item.alt || item.originalFilename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-12 h-12 text-gray-400" />
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightboxMedia(item)
                      }}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30"
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                    {item.type === 'IMAGE' ? 'IMG' : 'VID'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-2 bg-white dark:bg-gray-800">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                    {item.originalFilename}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(item.sizeBytes)}
                    {item.width && ` • ${item.width}×${item.height}`}
                    {item.durationSeconds && ` • ${formatDuration(item.durationSeconds)}`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {media.map((item) => {
            const isSelected = selectedIds.has(item.id)
            const thumbnailUrl = item.thumbnailUrl || item.mediumUrl || item.originalUrl

            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={`
                  flex items-center gap-4 p-3 rounded-lg cursor-pointer
                  border transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {item.type === 'IMAGE' ? (
                    <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {item.originalFilename}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(item.sizeBytes)}
                    {item.width && ` • ${item.width}×${item.height}`}
                    {item.durationSeconds && ` • ${formatDuration(item.durationSeconds)}`}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {/* Type */}
                <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                  {item.type}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxMedia(null)}
        >
          <div className="max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {lightboxMedia.type === 'IMAGE' ? (
              <img
                src={lightboxMedia.largeUrl || lightboxMedia.originalUrl}
                alt={lightboxMedia.alt || lightboxMedia.originalFilename}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={lightboxMedia.originalUrl}
                controls
                className="max-w-full max-h-[90vh]"
              />
            )}
          </div>
          <button
            onClick={() => setLightboxMedia(null)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default MediaGallery
