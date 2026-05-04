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
  fallbackVideoUrl?: string
  thumbnailUrl?: string
  alt?: string
  className?: string
  /** Enquadramento da thumbnail: 'contain' = sem cortes, centralizada; 'cover' = preenche o card */
  objectFit?: 'cover' | 'contain'
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsinline?: boolean
  platform?: 'youtube' | 'vimeo' | 'file'
  /** Preenche o container pai (hero full-bleed) sem forçar aspect-video */
  fillParent?: boolean
  /** Controles nativos (MP4). Se omitido: mostra quando não está em autoplay */
  showControls?: boolean
}

// Extrair ID do YouTube (watch, embed, youtu.be, shorts)
function extractYouTubeId(url: string): string | null {
  const trimmed = url.trim()
  const shorts = trimmed.match(/youtube\.com\/shorts\/([^&\n?#/]+)/i)
  if (shorts) return shorts[1]
  const match = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  )
  return match ? match[1] : null
}

// Extrair ID do Vimeo
function extractVimeoId(url: string): string | null {
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
  return match ? match[1] : null
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  fallbackVideoUrl,
  thumbnailUrl,
  alt,
  className = '',
  objectFit = 'cover',
  autoplay = false,
  muted = false,
  loop = false,
  playsinline = false,
  platform,
  fillParent = false,
  showControls,
}) => {
  const normalizedUrl = typeof videoUrl === 'string' ? videoUrl.trim() : ''
  // ═══════════════════════════════════════════════════════════
  // TODOS OS HOOKS NO TOPO - OBRIGATÓRIO PARA EVITAR ERRO #310
  // ═══════════════════════════════════════════════════════════
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFileUrl, setCurrentFileUrl] = useState(normalizedUrl)
  const [filePlaybackFailed, setFilePlaybackFailed] = useState(false)
  /** Iframe YouTube/Vimeo: evita “buraco preto” enquanto o player embutido carrega */
  const [embedReady, setEmbedReady] = useState(false)
  /** MP4: primeiro frame / playback — até lá mostra-se camada de fundo */
  const [fileSurfaceReady, setFileSurfaceReady] = useState(false)
  const fileVideoRef = useRef<HTMLVideoElement | null>(null)
  const videoIdRef = useRef<string | null>(null)
  const progressTracked = useRef<Set<number>>(new Set())
  const hasPlayed = useRef(false)
  const hasCompleted = useRef(false)

  // Detectar plataforma automaticamente se não fornecida
  const detectedPlatform = platform ||
    (normalizedUrl.includes('youtube') || normalizedUrl.includes('youtu.be') ? 'youtube' :
     normalizedUrl.includes('vimeo') ? 'vimeo' : 'file')

  const youtubeId = detectedPlatform === 'youtube' ? extractYouTubeId(normalizedUrl) : null
  const vimeoId = detectedPlatform === 'vimeo' ? extractVimeoId(normalizedUrl) : null

  // Armazenar videoId para tracking - HOOK SEMPRE EXECUTADO
  useEffect(() => {
    videoIdRef.current = youtubeId || vimeoId || videoUrl
  }, [youtubeId, vimeoId, normalizedUrl])

  useEffect(() => {
    setCurrentFileUrl(normalizedUrl)
    setFilePlaybackFailed(false)
    setFileSurfaceReady(false)
  }, [normalizedUrl])

  useEffect(() => {
    setFileSurfaceReady(false)
  }, [currentFileUrl])

  useEffect(() => {
    setEmbedReady(false)
  }, [normalizedUrl, autoplay, detectedPlatform, youtubeId, vimeoId])

  const wrapperClass = fillParent
    ? `relative w-full h-full min-h-0 overflow-hidden ${className}`
    : `relative aspect-video overflow-hidden ${className}`

  const thumbWrapClass = fillParent
    ? `relative w-full h-full min-h-0 cursor-pointer group overflow-hidden ${className}`
    : `relative aspect-video cursor-pointer group overflow-hidden ${className}`

  const errorBoxClass = fillParent
    ? `relative w-full h-full min-h-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center ${className}`
    : `relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center ${className}`

  const nativeControls = showControls !== undefined ? showControls : !autoplay

  // Safari / políticas de autoplay: reforçar play() em vídeo arquivo
  useEffect(() => {
    if (detectedPlatform !== 'file' || !autoplay) return
    const el = fileVideoRef.current
    if (!el) return
    const tryPlay = () => {
      void el.play().catch(() => {
        /* autoplay bloqueado ou falha transitória */
      })
    }
    tryPlay()
    el.addEventListener('loadeddata', tryPlay)
    return () => el.removeEventListener('loadeddata', tryPlay)
  }, [autoplay, detectedPlatform, currentFileUrl])

  // ═══════════════════════════════════════════════════════════
  // AGORA SIM PODEMOS TER RETURNS CONDICIONAIS (DEPOIS DOS HOOKS)
  // ═══════════════════════════════════════════════════════════

  // Plataforma não suportada
  if (!detectedPlatform) {
    return (
      <div className={errorBoxClass}>
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
  if ((detectedPlatform === 'youtube' && !youtubeId) || (detectedPlatform === 'vimeo' && !vimeoId)) {
    return (
      <div className={errorBoxClass}>
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
    // youtube-nocookie.com evita cookies de terceiros até o usuário dar play (Best Practices / Lighthouse)
    const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1${autoplay || isPlaying ? '&autoplay=1' : ''}${muted ? '&mute=1' : ''}${loop ? '&loop=1&playlist=' + youtubeId : ''}${playsinline ? '&playsinline=1' : ''}`

    if (!isPlaying && !autoplay && thumbnail) {
      return (
        <div className={thumbWrapClass} onClick={handlePlay} style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
          <img 
            src={thumbnail} 
            alt={alt || 'Video thumbnail'}
            width={640}
            height={360}
            className={`w-full h-full ${objectFit === 'contain' ? 'object-contain object-center' : 'object-cover'}`}
            style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}
            onError={(e) => {
              // Fallback para thumbnail de qualidade menor
              const target = e.currentTarget
              if (target.src.includes('maxresdefault')) {
                target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
              }
            }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors" style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
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
      <div className={wrapperClass} style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
        {/* Fundo sempre visível até o iframe pintar (evita retângulo preto) */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-[#0a0f18] to-black"
            aria-hidden
          />
        )}
        <iframe
          src={embedUrl}
          title={alt || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 z-10 h-full w-full"
          style={{
            borderRadius: className.includes('rounded') ? undefined : '1rem',
            opacity: embedReady ? 1 : 0,
            transition: 'opacity 0.35s ease-out',
          }}
          onLoad={() => setEmbedReady(true)}
        />
      </div>
    )
  }

  // Vimeo embed
  if (detectedPlatform === 'vimeo') {
    const embedUrl = `https://player.vimeo.com/video/${vimeoId}?${autoplay || isPlaying ? 'autoplay=1&' : ''}${muted ? 'muted=1&' : ''}${loop ? 'loop=1&' : ''}${playsinline ? 'playsinline=1&' : ''}title=0&byline=0&portrait=0`

    if (!isPlaying && !autoplay && thumbnail) {
      return (
        <div className={thumbWrapClass} onClick={handlePlay} style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
          <img 
            src={thumbnail} 
            alt={alt || 'Video thumbnail'}
            width={640}
            height={360}
            className={`w-full h-full ${objectFit === 'contain' ? 'object-contain object-center' : 'object-cover'}`}
            style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors" style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
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
      <div className={wrapperClass} style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-[#0a0f18] to-black"
            aria-hidden
          />
        )}
        <iframe
          src={embedUrl}
          title={alt || 'Vimeo Video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 z-10 h-full w-full"
          style={{
            borderRadius: className.includes('rounded') ? undefined : '1rem',
            opacity: embedReady ? 1 : 0,
            transition: 'opacity 0.35s ease-out',
          }}
          onLoad={() => setEmbedReady(true)}
        />
      </div>
    )
  }

  // Arquivo de vídeo direto (mp4/webm/mov)
  if (detectedPlatform === 'file') {
    if (filePlaybackFailed) {
      return (
        <div className={errorBoxClass}>
          <div className="text-center p-6">
            <svg className="w-16 h-16 mx-auto mb-2 text-azimut-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Erro ao carregar vídeo</p>
          </div>
        </div>
      )
    }

    return (
      <div className={wrapperClass} style={{ borderRadius: className.includes('rounded') ? undefined : '1rem' }}>
        {/* Letterbox / buffer: nunca área vazia preta enquanto o ficheiro não pinta */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-[#0a0f18] to-black"
          aria-hidden
        />
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-[1] h-full w-full ${
              objectFit === 'contain' ? 'object-contain object-center' : 'object-cover'
            } ${fileSurfaceReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          />
        ) : null}
        <video
          ref={fileVideoRef}
          src={currentFileUrl}
          poster={thumbnailUrl}
          autoPlay={autoplay}
          muted={muted || autoplay}
          loop={loop}
          playsInline={playsinline}
          controls={nativeControls}
          preload={autoplay ? 'auto' : 'metadata'}
          onLoadedData={() => setFileSurfaceReady(true)}
          onPlaying={() => setFileSurfaceReady(true)}
          onError={() => {
            if (fallbackVideoUrl && currentFileUrl !== fallbackVideoUrl) {
              setCurrentFileUrl(fallbackVideoUrl)
              return
            }
            setFilePlaybackFailed(true)
          }}
          className="relative z-[2] h-full w-full"
          style={{
            borderRadius: className.includes('rounded') ? undefined : '1rem',
            objectFit: objectFit === 'contain' ? 'contain' : 'cover',
            background: 'transparent',
          }}
        />
      </div>
    )
  }

  // Fallback (não deveria chegar aqui)
  return null
}

export default VideoPlayer
