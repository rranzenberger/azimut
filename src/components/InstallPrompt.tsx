import React, { useState, useEffect } from 'react'
import { showInstallPrompt, canShowInstallPrompt, isPWAInstalled } from '../utils/pwa'

const InstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar se já está instalado
    setIsInstalled(isPWAInstalled())
    
    // Listener para quando prompt estiver disponível
    const handleInstallable = () => {
      if (!isPWAInstalled()) {
        // Mostrar após 10 segundos (não irritar o usuário)
        setTimeout(() => {
          if (canShowInstallPrompt()) {
            setShowPrompt(true)
          }
        }, 10000)
      }
    }
    
    window.addEventListener('pwa-installable', handleInstallable)
    
    return () => {
      window.removeEventListener('pwa-installable', handleInstallable)
    }
  }, [])

  const handleInstall = async () => {
    const accepted = await showInstallPrompt()
    
    if (accepted) {
      setShowPrompt(false)
      setIsInstalled(true)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Não mostrar novamente nesta sessão
    sessionStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  // Não mostrar se já instalado ou foi dismissado
  if (isInstalled || !showPrompt || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up"
      style={{
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <div
        className="p-4 rounded-xl shadow-2xl backdrop-blur-lg"
        style={{
          background: 'var(--theme-card-bg)',
          border: '1px solid rgba(201, 35, 55, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(201, 35, 55, 0.1)'
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-12 h-12">
            <img
              src="/logo-azimut-star.svg"
              alt="Azimut"
              className="w-full h-full"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-semibold mb-1"
              style={{ color: 'var(--theme-text)' }}
            >
              Instalar Azimut
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Acesse mais rápido e trabalhe offline
            </p>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Fechar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all"
            style={{
              color: 'var(--theme-text-secondary)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            Agora não
          </button>
          
          <button
            onClick={handleInstall}
            className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all"
            style={{
              color: '#ffffff',
              background: '#c92337',
              border: 'none',
              boxShadow: '0 2px 8px rgba(201, 35, 55, 0.3)'
            }}
          >
            Instalar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default InstallPrompt












