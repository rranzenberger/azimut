import React from 'react'

const LoadingSkeleton: React.FC = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black via-[#0a0e18] to-black" 
      role="status" 
      aria-live="polite" 
      aria-label="Carregando conteúdo da página"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo animado premium */}
        <div className="relative w-20 h-20" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border-2 border-azimut-red/30 opacity-50"></div>
          <div className="absolute inset-0 rounded-full border-2 border-azimut-red border-t-transparent animate-spin" style={{ animationDuration: '1s' }}></div>
          <div className="absolute inset-2 rounded-full border border-azimut-red/20 animate-pulse"></div>
        </div>
        
        {/* Texto de loading com shimmer */}
        <div className="flex flex-col items-center gap-2">
          <p className="sr-only">
            Carregando conteúdo da página, por favor aguarde...
          </p>
          <div className="h-1 w-24 bg-azimut-red/20 rounded-full overflow-hidden" aria-hidden="true">
            <div className="h-full bg-azimut-red animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton













































