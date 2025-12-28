// PWA utilities - Service Worker registration and Install Prompt

// Registrar Service Worker
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      
      console.log('[PWA] Service Worker registered:', registration.scope)
      
      // Verificar atualizações a cada hora
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)
      
      return registration
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error)
    }
  } else {
    console.log('[PWA] Service Workers not supported')
  }
}

// Install Prompt (A2HS - Add to Home Screen)
let deferredPrompt: any = null

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir mini-infobar automática no mobile
    e.preventDefault()
    
    // Guardar evento para usar depois
    deferredPrompt = e
    
    console.log('[PWA] Install prompt available')
    
    // Disparar evento customizado para UI
    window.dispatchEvent(new CustomEvent('pwa-installable'))
  })
  
  // Detectar quando PWA é instalado
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully')
    deferredPrompt = null
    
    // Analytics (implementar depois)
    // trackEvent('pwa_installed')
  })
}

// Mostrar prompt de instalação
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) {
    console.log('[PWA] Install prompt not available')
    return false
  }
  
  // Mostrar prompt nativo
  deferredPrompt.prompt()
  
  // Aguardar escolha do usuário
  const { outcome } = await deferredPrompt.userChoice
  
  console.log('[PWA] User choice:', outcome)
  
  // Analytics
  // trackEvent('pwa_install_prompt', { outcome })
  
  deferredPrompt = null
  
  return outcome === 'accepted'
}

// Verificar se PWA está instalado
export function isPWAInstalled(): boolean {
  // Standalone mode (iOS)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }
  
  // @ts-ignore - iOS Safari
  if (window.navigator.standalone === true) {
    return true
  }
  
  return false
}

// Verificar se pode mostrar install prompt
export function canShowInstallPrompt(): boolean {
  return deferredPrompt !== null
}





























