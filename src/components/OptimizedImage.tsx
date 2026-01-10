// ════════════════════════════════════════════════════════════
// OPTIMIZED IMAGE - Componente de Imagem Otimizada
// ════════════════════════════════════════════════════════════
// Lazy loading, placeholder blur, WebP support
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  priority?: boolean // Se true, carrega imediatamente (hero images)
  placeholder?: string // Imagem blur base64 ou URL baixa resolução
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Converter para WebP se possível
  const webpSrc = src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png')
    ? src.replace(/\.(jpg|jpeg|png)$/, '.webp')
    : src

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder blur enquanto carrega */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full blur-xl scale-110"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Skeleton loader */}
      {!isLoaded && !placeholder && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
      )}

      {/* Imagem principal */}
      <picture>
        {/* WebP para browsers que suportam */}
        <source srcSet={webpSrc} type="image/webp" />
        
        {/* Fallback para imagem original */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
        />
      </picture>

      {/* Mensagem de erro */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm">
          ⚠️ Erro ao carregar imagem
        </div>
      )}
    </div>
  )
}

export default OptimizedImage
