// ════════════════════════════════════════════════════════════
// COMPONENTE: VideoPlayer
// ════════════════════════════════════════════════════════════
// Renderiza vídeos do YouTube ou Vimeo
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
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
  const [isPlaying, setIsPlaying] = useState(false)
  const videoIdRef = React.useRef<string | null>(null)
  const progressTracked = React.useRef<Set<number>>(new Set())
  const hasPlayed = React.useRef(false)
  const hasCompleted = React.useRef(false)

  // Detectar plataforma automaticamente se não fornecida
  const detectedPlatform = platform || 
    (videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? 'youtube' : 
     videoUrl.includes('vimeo') ? 'vimeo' : null)

  if (!detectedPlatform) {
    // Se não for YouTube nem Vimeo, mostrar placeholder
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

  const youtubeId = detectedPlatform === 'youtube' ? extractYouTubeId(videoUrl) : null
  const vimeoId = detectedPlatform === 'vimeo' ? extractVimeoId(videoUrl) : null
  
  // Armazenar videoId para tracking
  useEffect(() => {
    videoIdRef.current = youtubeId || vimeoId || videoUrl
  }, [youtubeId, vimeoId, videoUrl])

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

  // Se autoplay ou já está playing, mostrar iframe diretamente
  if (autoplay || isPlaying) {
    if (detectedPlatform === 'youtube' && youtubeId) {
      // Parâmetros YouTube para autoplay automático
      const params = new URLSearchParams({
        autoplay: '1',
        mute: muted ? '1' : '0',
        loop: loop ? '1' : '0',
        playlist: loop ? youtubeId : '', // Necessário para loop funcionar
        playsinline: playsinline ? '1' : '0',
        rel: '0',
        modestbranding: '1',
        controls: '1',
        enablejsapi: '1'
      })
      
      // Track play quando iframe carrega (YouTube API)
      useEffect(() => {
        if (youtubeId && isPlaying && !hasPlayed.current) {
          hasPlayed.current = true
          trackVideoEvent(youtubeId, videoUrl, 'play', {
            platform: 'youtube',
          })
        }
      }, [youtubeId, videoUrl, isPlaying])

      return (
        <div className={`relative aspect-video ${className}`}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?${params.toString()}`}
            title={alt || 'Vídeo do YouTube'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    if (detectedPlatform === 'vimeo' && vimeoId) {
      // Parâmetros Vimeo para autoplay automático
      const params = new URLSearchParams({
        autoplay: '1',
        muted: muted ? '1' : '0',
        loop: loop ? '1' : '0',
        autopause: '0',
        title: '0',
        byline: '0',
        portrait: '0'
      })
      
      return (
        <div className={`relative aspect-video ${className}`}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
            title={alt || 'Vídeo do Vimeo'}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }
  }

  // Mostrar thumbnail com botão play
  const thumbnail = thumbnailUrl || 
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null) ||
    (vimeoId ? `https://vumbnail.com/${vimeoId}.jpg` : null)

  const handlePlay = () => {
    setIsPlaying(true)
    if (videoIdRef.current && !hasPlayed.current) {
      hasPlayed.current = true
      trackVideoEvent(videoIdRef.current, videoUrl, 'play', {
        platform: detectedPlatform || 'custom',
      })
    }
  }

  return (
    <div 
      className={`relative aspect-video cursor-pointer group ${className}`}
      onClick={handlePlay}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={alt || 'Thumbnail do vídeo'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
      
      {/* Botão Play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-azimut-red/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-azimut-red group-hover:scale-110 transition-all duration-300">
          <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Badge da plataforma */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white uppercase tracking-wider">
          {detectedPlatform === 'youtube' ? 'YouTube' : 'Vimeo'}
        </span>
      </div>
    </div>
  )
}

