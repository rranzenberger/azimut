// ════════════════════════════════════════════════════════════
// COMPONENTE: VideoPlayer
// ════════════════════════════════════════════════════════════
// Renderiza vídeos do YouTube ou Vimeo
// CORRIGIDO: Todos os hooks no topo para evitar erro #310
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'
import { trackVideoEvent } from '../utils/analytics'

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl?: string
  alt?: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsinline?: boolean
  platform?: 'youtube' | 'vimeo'
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

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  alt,
  className = '',
  autoplay = false,
  muted = false,
  loop = false,
  playsinline = false,
  platform
}) => {
  // ═══════════════════════════════════════════════════════════
  // TODOS OS HOOKS NO TOPO - OBRIGATÓRIO PARA EVITAR ERRO #310
  // ═══════════════════════════════════════════════════════════
  const [isPlaying, setIsPlaying] = useState(false)
  const videoIdRef = useRef<string | null>(null)
  const progressTracked = useRef<Set<number>>(new Set())
  const hasPlayed = useRef(false)
  const hasCompleted = useRef(false)

  // Detectar plataforma automaticamente se não fornecida
  const detectedPlatform = platform || 
    (videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? 'youtube' : 
     videoUrl.includes('vimeo') ? 'vimeo' : null)

  const youtubeId = detectedPlatform === 'youtube' ? extractYouTubeId(videoUrl) : null
  const vimeoId = detectedPlatform === 'vimeo' ? extractVimeoId(videoUrl) : null

  // Armazenar videoId para tracking - HOOK SEMPRE EXECUTADO
  useEffect(() => {
    videoIdRef.current = youtubeId || vimeoId || videoUrl
  }, [youtubeId, vimeoId, videoUrl])

  // ═══════════════════════════════════════════════════════════
  // AGORA SIM PODEMOS TER RETURNS CONDICIONAIS (DEPOIS DOS HOOKS)
  // ═══════════════════════════════════════════════════════════

  // Plataforma não suportada
  if (!detectedPlatform) {
    return (
      <div className={`relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <svg className="w-16 h-16 mx-auto mb-2 text-azimut-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Vídeo não suportado</p>
        </div>
      </div>
    )
  }

  // ID não extraído
  if (!youtubeId && !vimeoId) {
    return (
      <div className={`relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <svg className="w-16 h-16 mx-auto mb-2 text-azimut-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <p className="text-xs text-slate-400 uppercase tracking-wider">URL inválida</p>
        </div>
      </div>
    )
  }

  // Thumbnail para clique (se não autoplay)
  const getThumbnail = () => {
    if (thumbnailUrl) return thumbnailUrl
    if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    return null
  }

  const thumbnail = getThumbnail()

  const handlePlay = () => {
    setIsPlaying(true)
    
    // Track video play
    if (!hasPlayed.current && videoIdRef.current) {
      try {
        trackVideoEvent('play', videoIdRef.current, {
          platform: detectedPlatform,
          position: 0
        })
        hasPlayed.current = true
      } catch {
        // Silencioso
      }
    }
  }

  // YouTube embed
  if (detectedPlatform === 'youtube') {
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1${autoplay || isPlaying ? '&autoplay=1' : ''}${muted ? '&mute=1' : ''}${loop ? '&loop=1&playlist=' + youtubeId : ''}${playsinline ? '&playsinline=1' : ''}`

    if (!isPlaying && !autoplay && thumbnail) {
      return (
        <div className={`relative aspect-video cursor-pointer group ${className}`} onClick={handlePlay}>
          <img 
            src={thumbnail} 
            alt={alt || 'Video thumbnail'} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback para thumbnail de qualidade menor
              const target = e.currentTarget
              if (target.src.includes('maxresdefault')) {
                target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
              }
            }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-20 h-20 rounded-full bg-azimut-red/90 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={`relative aspect-video ${className}`}>
        <iframe
          src={embedUrl}
          title={alt || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  // Vimeo embed
  if (detectedPlatform === 'vimeo') {
    const embedUrl = `https://player.vimeo.com/video/${vimeoId}?${autoplay || isPlaying ? 'autoplay=1&' : ''}${muted ? 'muted=1&' : ''}${loop ? 'loop=1&' : ''}${playsinline ? 'playsinline=1&' : ''}title=0&byline=0&portrait=0`

    if (!isPlaying && !autoplay && thumbnail) {
      return (
        <div className={`relative aspect-video cursor-pointer group ${className}`} onClick={handlePlay}>
          <img 
            src={thumbnail} 
            alt={alt || 'Video thumbnail'} 
            className="w-full h-full object-cover"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-20 h-20 rounded-full bg-azimut-red/90 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={`relative aspect-video ${className}`}>
        <iframe
          src={embedUrl}
          title={alt || 'Vimeo Video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  // Fallback (não deveria chegar aqui)
  return null
}

export default VideoPlayer
