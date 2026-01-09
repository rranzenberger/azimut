// ════════════════════════════════════════════════════════════
// COMPONENTE: VideoCard
// ════════════════════════════════════════════════════════════
// Card compacto de vídeo (ex: testimonials, video grid)
// - Thumbnail com hover glow
// - Badge categoria
// - Info (título, duração, views)
// - Click para abrir VideoPlayerEnhanced em lightbox
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { VideoPlayerEnhanced } from './VideoPlayerEnhanced'

interface VideoCardProps {
  // Vídeo
  videoUrl: string
  thumbnail?: string
  
  // Informações
  title?: string
  description?: string
  category?: string
  duration?: string // "2:45" ou "1h 30min"
  views?: number
  date?: string
  
  // Autor/Pessoa
  authorName?: string
  authorRole?: string
  authorCompany?: string
  authorPhoto?: string
  
  // Visual
  featured?: boolean
  badge?: string
  badgeColor?: string
  
  // Comportamento
  autoOpenLightbox?: boolean
  onClick?: () => void
  
  className?: string
}

export const VideoCard: React.FC<VideoCardProps> = ({
  videoUrl,
  thumbnail,
  title,
  description,
  category,
  duration,
  views,
  date,
  authorName,
  authorRole,
  authorCompany,
  authorPhoto,
  featured = false,
  badge,
  badgeColor = 'azimut-red',
  autoOpenLightbox = true,
  onClick,
  className = ''
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleClick = () => {
    if (autoOpenLightbox) {
      setIsLightboxOpen(true)
    }
    onClick?.()
  }

  return (
    <>
      {/* Card */}
      <div 
        className={`group relative card-adaptive rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-azimut-red/20 hover:-translate-y-2 ${className}`}
        onClick={handleClick}
      >
        {/* Badge featured/custom */}
        {(featured || badge) && (
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-3 py-1 rounded-full bg-${badgeColor} text-white text-xs font-semibold uppercase tracking-wider shadow-lg`}>
              {badge || 'Destaque'}
            </span>
          </div>
        )}

        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title || 'Thumbnail'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Play button hover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-azimut-red/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-azimut-red group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(201,35,55,0.6)]">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Duration badge (bottom-left) */}
          {duration && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-white text-xs font-mono">
                {duration}
              </span>
            </div>
          )}

          {/* Category badge (top-left) */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider border border-white/20">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Author (se tiver) */}
          {authorName && (
            <div className="flex items-center gap-3 mb-3">
              {authorPhoto ? (
                <img
                  src={authorPhoto}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-azimut-red/50"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-azimut-red to-red-700 flex items-center justify-center text-white font-bold text-sm">
                  {authorName.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {authorName}
                </p>
                {(authorRole || authorCompany) && (
                  <p className="text-xs text-white/60 truncate">
                    {authorRole}{authorRole && authorCompany && ' • '}{authorCompany}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Title */}
          {title && (
            <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-azimut-red transition-colors">
              {title}
            </h3>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-white/70 line-clamp-2 mb-3">
              {description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-3 text-xs text-white/50">
            {views && views > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {formatViews(views)}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {date}
              </span>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(201,35,55,0.2)]" />
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Fechar"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video */}
          <div 
            className="w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoPlayerEnhanced
              sources={videoUrl}
              autoplay
              mode="default"
              className="rounded-xl overflow-hidden shadow-2xl"
            />

            {/* Info abaixo do vídeo */}
            {(title || description) && (
              <div className="mt-6 text-center max-w-3xl mx-auto">
                {category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red text-white rounded-full mb-3">
                    {category}
                  </span>
                )}
                {title && (
                  <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                )}
                {authorName && (
                  <p className="text-white/80 mb-3">
                    {authorName}
                    {authorRole && ` • ${authorRole}`}
                    {authorCompany && ` @ ${authorCompany}`}
                  </p>
                )}
                {description && (
                  <p className="text-white/70">{description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Helper: formatar views (1234 -> 1.2k)
function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`
  return views.toString()
}
