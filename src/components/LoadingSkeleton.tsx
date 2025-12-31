import React from 'react'

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" role="status" aria-live="polite" aria-label="Loading page content">
      <div className="flex flex-col items-center gap-4">
        {/* Logo animado */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-azimut-red opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-2 border-azimut-red border-t-transparent animate-spin"></div>
        </div>
        
        {/* Texto de loading */}
        <p className="text-sm font-sora uppercase tracking-wider" style={{ color: 'var(--theme-text-secondary)' }}>
          Loading...
        </p>
      </div>
    </div>
  )
}

export default LoadingSkeleton


































