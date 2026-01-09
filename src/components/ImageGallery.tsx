// ════════════════════════════════════════════════════════════
// COMPONENTE: ImageGallery
// ════════════════════════════════════════════════════════════
// Galeria de imagens premium com lightbox
// - Grid responsivo (1-6 colunas)
// - Hover zoom smooth
// - Lightbox modal fullscreen
// - Filtros por categoria/tag
// - Lazy loading
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'

export interface GalleryImage {
  url: string
  thumbnailUrl?: string
  title?: string
  description?: string
  category?: string
  tags?: string[]
  alt?: string
  // Extras
  studentName?: string
  year?: number
  featured?: boolean
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: number // pixels
  layout?: 'grid' | 'masonry'
  lightbox?: boolean
  filters?: string[] // Categorias para filtrar
  showInfo?: boolean // Mostrar título/descrição no hover
  className?: string
  lazyLoad?: boolean
  onImageClick?: (image: GalleryImage, index: number) => void
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 16,
  layout = 'grid',
  lightbox = true,
  filters,
  showInfo = true,
  className = '',
  lazyLoad = true,
  onImageClick
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Filtrar imagens
  const filteredImages = selectedFilter === 'all' 
    ? images 
    : images.filter(img => 
        img.category === selectedFilter || 
        img.tags?.includes(selectedFilter)
      )

  // Grid columns classes
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }

  // Abrir lightbox
  const openLightbox = (index: number) => {
    if (lightbox) {
      setLightboxIndex(index)
      setIsLightboxOpen(true)
      document.body.style.overflow = 'hidden'
    }
    onImageClick?.(filteredImages[index], index)
  }

  // Fechar lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxIndex(null)
    document.body.style.overflow = 'auto'
  }

  // Navegação lightbox
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, lightboxIndex])

  return (
    <div className={`w-full ${className}`}>
      {/* Filtros */}
      {filters && filters.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedFilter === 'all'
                ? 'bg-azimut-red text-white shadow-lg shadow-azimut-red/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
            onClick={() => setSelectedFilter('all')}
          >
            Todos ({images.length})
          </button>
          {filters.map(filter => {
            const count = images.filter(img => 
              img.category === filter || img.tags?.includes(filter)
            ).length
            
            return (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-azimut-red text-white shadow-lg shadow-azimut-red/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter} ({count})
              </button>
            )
          })}
        </div>
      )}

      {/* Grid de imagens */}
      <div 
        className={`grid ${columnClasses[columns]} animate-fade-in`}
        style={{ gap: `${gap}px` }}
      >
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl cursor-pointer card-adaptive"
            onClick={() => openLightbox(index)}
          >
            {/* Badge destaque */}
            {image.featured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 rounded-full bg-azimut-red text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                  Destaque
                </span>
              </div>
            )}

            {/* Imagem */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={image.thumbnailUrl || image.url}
                alt={image.alt || image.title || `Imagem ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading={lazyLoad ? 'lazy' : 'eager'}
              />

              {/* Overlay gradient hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon zoom hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                <div className="w-16 h-16 rounded-full bg-azimut-red/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Info overlay */}
            {showInfo && (image.title || image.description || image.studentName) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {image.category && (
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-azimut-red/90 rounded mb-2">
                    {image.category}
                  </span>
                )}
                {image.title && (
                  <h3 className="text-sm font-bold mb-1 line-clamp-2">{image.title}</h3>
                )}
                {image.studentName && (
                  <p className="text-xs text-white/80">por {image.studentName}</p>
                )}
                {image.description && (
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">{image.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mostrar "Nenhum resultado" se filtrado vazio */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-white/60 text-lg">Nenhuma imagem encontrada</p>
          <button
            className="mt-4 px-4 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
            onClick={() => setSelectedFilter('all')}
          >
            Ver todas
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          {filteredImages.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              aria-label="Anterior"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {filteredImages.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              aria-label="Próxima"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image container */}
          <div 
            className="w-full max-w-7xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].alt || filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Info */}
            {(filteredImages[lightboxIndex].title || filteredImages[lightboxIndex].description) && (
              <div className="mt-6 text-center max-w-2xl">
                {filteredImages[lightboxIndex].category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red text-white rounded-full mb-3">
                    {filteredImages[lightboxIndex].category}
                  </span>
                )}
                {filteredImages[lightboxIndex].title && (
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {filteredImages[lightboxIndex].title}
                  </h3>
                )}
                {filteredImages[lightboxIndex].studentName && (
                  <p className="text-white/80 mb-2">
                    por {filteredImages[lightboxIndex].studentName}
                    {filteredImages[lightboxIndex].year && ` • ${filteredImages[lightboxIndex].year}`}
                  </p>
                )}
                {filteredImages[lightboxIndex].description && (
                  <p className="text-white/70">
                    {filteredImages[lightboxIndex].description}
                  </p>
                )}
              </div>
            )}

            {/* Counter */}
            <div className="mt-4 text-white/60 text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
