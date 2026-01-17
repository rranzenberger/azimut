// ════════════════════════════════════════════════════════════
// OPTIMIZED IMAGE - Componente de Imagem Otimizada Premium
// ════════════════════════════════════════════════════════════
// Lazy loading com Intersection Observer, WebP/AVIF support,
// Blur placeholder, Responsive images, Performance optimized
// MEMOIZADO: Evita re-renders desnecessários
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef, memo, useCallback } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties // Adicionado para suportar estilos inline
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  priority?: boolean // Se true, carrega imediatamente (hero images)
  placeholder?: string // Imagem blur base64 ou URL baixa resolução
  sizes?: string // Para responsive images (ex: "(max-width: 768px) 100vw, 50vw")
  srcSet?: string // Para responsive images
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void // Handler de erro
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  objectFit = 'cover',
  priority = false,
  placeholder,
  sizes,
  srcSet,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority) // Se priority, já está "in view"
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer para lazy loading inteligente
  useEffect(() => {
    if (priority || !imgRef.current) return // Se priority, já carrega

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect() // Desconectar após primeira visualização
          }
        })
      },
      {
        rootMargin: '50px', // Começar a carregar 50px antes de entrar na viewport
        threshold: 0.01
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [priority])

  // Converter para WebP/AVIF se possível
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif' | 'original' = 'webp') => {
    if (format === 'original') return originalSrc
    
    const ext = originalSrc.split('.').pop()?.toLowerCase()
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, `.${format}`)
    }
    return originalSrc
  }

  const webpSrc = getOptimizedSrc(src, 'webp')
  const avifSrc = getOptimizedSrc(src, 'avif')

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, minHeight: height || 'auto', ...style }}
    >
      {/* Placeholder blur enquanto carrega */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full blur-xl scale-110"
          style={{ objectFit }}
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Skeleton loader otimizado */}
      {!isLoaded && !placeholder && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" 
          style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
        />
      )}

      {/* Imagem principal com formatos otimizados */}
      {isInView && (
        <picture>
          {/* AVIF (melhor compressão, se disponível) */}
          <source srcSet={avifSrc} type="image/avif" />
          
          {/* WebP (bom compromisso) */}
          <source srcSet={webpSrc} type="image/webp" />
          
          {/* Fallback para imagem original */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            srcSet={srcSet}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={(e) => {
              handleError()
              if (onError) onError(e)
            }}
            className={`w-full h-full transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit, ...(style || {}) }}
          />
        </picture>
      )}

      {/* Mensagem de erro */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm">
          ⚠️ Erro ao carregar imagem
        </div>
      )}
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
