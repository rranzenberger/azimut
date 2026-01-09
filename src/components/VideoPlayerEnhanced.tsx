// ════════════════════════════════════════════════════════════
// COMPONENTE: VideoPlayerEnhanced
// ════════════════════════════════════════════════════════════
// Player de vídeo premium com controles custom e múltiplos formatos
// - Suporta: YouTube, Vimeo, MP4 local
// - Hero mode: autoplay loop background
// - Lightbox mode: modal fullscreen
// - Controles premium custom
// - Overlay configurável
// ════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react'
import { VideoPlayer } from './VideoPlayer'

interface VideoSource {
  url: string
  quality?: '4k' | 'hd' | 'sd'
  type?: 'youtube' | 'vimeo' | 'mp4'
}

interface VideoPlayerEnhancedProps {
  // Fontes de vídeo (múltiplas qualidades)
  sources: VideoSource[] | string // String para compatibilidade
  
  // Thumbnail
  thumbnail?: string
  alt?: string
  
  // Comportamento
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  playsinline?: boolean
  
  // Visual
  overlay?: number // 0-1 (0 = transparente, 1 = preto)
  overlayColor?: string // default: black
  className?: string
  aspectRatio?: 'video' | 'square' | 'wide' | 'cinema' // 16:9, 1:1, 21:9, 2.39:1
  
  // Modos especiais
  mode?: 'default' | 'hero' | 'lightbox' // hero = background full, lightbox = click abre modal
  showControls?: boolean
  
  // Informações extras
  title?: string
  duration?: string
  views?: number
  category?: string
  
  // Callbacks
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

// Extrair ID do YouTube
function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

// Extrair ID do Vimeo
function extractVimeoId(url: string): string | null {
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
  return match ? match[1] : null
}

export const VideoPlayerEnhanced: React.FC<VideoPlayerEnhancedProps> = ({
  sources,
  thumbnail,
  alt,
  autoplay = false,
  loop = false,
  muted = false,
  playsinline = true,
  overlay = 0,
  overlayColor = 'black',
  className = '',
  aspectRatio = 'video',
  mode = 'default',
  showControls = true,
  title,
  duration,
  views,
  category,
  onPlay,
  onPause,
  onEnded
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [volume, setVolume] = useState(muted ? 0 : 1)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Normalizar sources para array
  const videoSources: VideoSource[] = typeof sources === 'string' 
    ? [{ url: sources }] 
    : sources

  // Pegar melhor qualidade disponível
  const primarySource = videoSources.find(s => s.quality === '4k') || 
                       videoSources.find(s => s.quality === 'hd') || 
                       videoSources[0]

  // Detectar tipo de vídeo
  const videoType = primarySource.type || 
    (primarySource.url.includes('youtube') || primarySource.url.includes('youtu.be') ? 'youtube' :
     primarySource.url.includes('vimeo') ? 'vimeo' : 
     'mp4')

  // Aspect ratio classes
  const aspectClasses = {
    'video': 'aspect-video', // 16:9
    'square': 'aspect-square', // 1:1
    'wide': 'aspect-[21/9]', // 21:9
    'cinema': 'aspect-[239/100]' // 2.39:1 (cinema)
  }

  // ═══════════════════════════════════════════════════════════
  // MODO HERO (Background Video)
  // ═══════════════════════════════════════════════════════════
  if (mode === 'hero') {
    // YouTube/Vimeo em hero mode
    if (videoType === 'youtube' || videoType === 'vimeo') {
      return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
          <div className="absolute inset-0">
            <VideoPlayer
              videoUrl={primarySource.url}
              autoplay
              muted
              loop
              playsinline
              className="w-full h-full"
            />
          </div>
          {/* Overlay */}
          {overlay > 0 && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: overlayColor,
                opacity: overlay
              }}
            />
          )}
          {/* Conteúdo sobre o vídeo */}
          <div className="relative z-10">
            {/* Children podem ser passados aqui */}
          </div>
        </div>
      )
    }

    // MP4 local em hero mode
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          {videoSources.map((source, idx) => (
            <source key={idx} src={source.url} type="video/mp4" />
          ))}
        </video>
        
        {/* Overlay */}
        {overlay > 0 && (
          <div 
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              backgroundColor: overlayColor,
              opacity: overlay
            }}
          />
        )}
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // MODO LIGHTBOX (Click para abrir modal)
  // ═══════════════════════════════════════════════════════════
  if (mode === 'lightbox') {
    return (
      <>
        {/* Thumbnail clicável */}
        <div 
          className={`relative cursor-pointer group ${aspectClasses[aspectRatio]} ${className}`}
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Thumbnail */}
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={alt || title || 'Vídeo'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : videoType === 'youtube' ? (
            <img
              src={`https://img.youtube.com/vi/${extractYouTubeId(primarySource.url)}/maxresdefault.jpg`}
              alt={alt || title || 'Vídeo'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-azimut-red/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-azimut-red group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(201,35,55,0.6)]">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Info overlay (bottom) */}
          {(title || duration || category) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {category && (
                <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red/90 rounded mb-2">
                  {category}
                </span>
              )}
              {title && (
                <h3 className="text-lg font-bold mb-1 line-clamp-2">{title}</h3>
              )}
              <div className="flex items-center gap-3 text-sm text-white/80">
                {duration && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {duration}
                  </span>
                )}
                {views && views > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {views.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Lightbox */}
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
              className="w-full max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <VideoPlayer
                videoUrl={primarySource.url}
                autoplay
                className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
              />
            </div>
          </div>
        )}
      </>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // MODO DEFAULT (Player padrão com controles)
  // ═══════════════════════════════════════════════════════════
  
  // YouTube/Vimeo: usar VideoPlayer existente
  if (videoType === 'youtube' || videoType === 'vimeo') {
    return (
      <div className={`relative ${aspectClasses[aspectRatio]} ${className}`}>
        <VideoPlayer
          videoUrl={primarySource.url}
          thumbnailUrl={thumbnail}
          alt={alt || title}
          autoplay={autoplay}
          muted={muted}
          loop={loop}
          playsinline={playsinline}
          className="w-full h-full"
        />
      </div>
    )
  }

  // MP4 local: player HTML5 custom
  return (
    <div className={`relative ${aspectClasses[aspectRatio]} card-adaptive overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline={playsinline}
        onPlay={() => {
          setIsPlaying(true)
          onPlay?.()
        }}
        onPause={() => {
          setIsPlaying(false)
          onPause?.()
        }}
        onEnded={() => {
          setIsPlaying(false)
          onEnded?.()
        }}
        onTimeUpdate={(e) => {
          const video = e.currentTarget
          setCurrentTime(video.currentTime)
          setTotalDuration(video.duration)
        }}
      >
        {videoSources.map((source, idx) => (
          <source key={idx} src={source.url} type="video/mp4" />
        ))}
      </video>

      {/* Controles custom (se showControls) */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/progress">
            <div 
              className="h-full bg-azimut-red rounded-full transition-all duration-150 group-hover/progress:h-1.5"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>

          {/* Controles */}
          <div className="flex items-center justify-between text-white">
            {/* Play/Pause */}
            <button
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause()
                  } else {
                    videoRef.current.play()
                  }
                }
              }}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Tempo */}
            <div className="text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted
                    setVolume(videoRef.current.muted ? 0 : 1)
                  }
                }}
              >
                {volume === 0 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Fullscreen */}
            <button
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => {
                if (videoRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen()
                  } else {
                    videoRef.current.requestFullscreen()
                  }
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper: formatar tempo em MM:SS
function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
