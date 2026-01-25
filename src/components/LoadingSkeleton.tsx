// ════════════════════════════════════════════════════════════
// LOADING SKELETON - Componente Premium para Loading States
// ════════════════════════════════════════════════════════════
// Componente isolado e seguro - não mexe em código existente
// ════════════════════════════════════════════════════════════

import React from 'react'

interface LoadingSkeletonProps {
  type?: 'text' | 'card' | 'image' | 'list' | 'custom'
  lines?: number
  width?: string | number
  height?: string | number
  className?: string
  theme?: 'dark' | 'light'
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'text',
  lines = 3,
  width,
  height,
  className = '',
  theme = 'dark'
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
    background: theme === 'dark'
      ? 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)'
      : 'linear-gradient(90deg, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 75%)',
    backgroundSize: '200% 100%'
  }

  // Adicionar animação CSS se não existir
  React.useEffect(() => {
    if (!document.getElementById('skeleton-animation-style')) {
      const style = document.createElement('style')
      style.id = 'skeleton-animation-style'
      style.textContent = `
        @keyframes skeleton-pulse {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  if (type === 'text') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              height: height || (i === lines - 1 ? '0.75rem' : '1rem'),
              width: width || (i === lines - 1 ? '60%' : '100%')
            }}
          />
        ))}
      </div>
    )
  }

  if (type === 'card') {
    return (
      <div
        className={`rounded-xl ${className}`}
        style={{
          ...baseStyle,
          width: width || '100%',
          height: height || '200px',
          padding: '1.5rem'
        }}
      >
        <div className="flex flex-col gap-3">
          <div style={{ ...baseStyle, height: '1.25rem', width: '70%' }} />
          <div style={{ ...baseStyle, height: '0.875rem', width: '100%' }} />
          <div style={{ ...baseStyle, height: '0.875rem', width: '90%' }} />
        </div>
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div
        className={`rounded-lg ${className}`}
        style={{
          ...baseStyle,
          width: width || '100%',
          height: height || '200px',
          aspectRatio: '16/9'
        }}
      />
    )
  }

  if (type === 'list') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3"
            style={{
              ...baseStyle,
              height: height || '3rem',
              width: width || '100%',
              padding: '0.75rem',
              borderRadius: '8px'
            }}
          >
            <div style={{ ...baseStyle, width: '2.5rem', height: '2.5rem', borderRadius: '50%', flexShrink: 0 }} />
            <div className="flex-1 flex flex-col gap-2">
              <div style={{ ...baseStyle, height: '0.875rem', width: '60%' }} />
              <div style={{ ...baseStyle, height: '0.75rem', width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Custom - retorna base style para customização
  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        width: width || '100%',
        height: height || '1rem'
      }}
    />
  )
}

export default LoadingSkeleton
