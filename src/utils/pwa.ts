// PWA utilities - Service Worker registration and Install Prompt

// Importar função de tracking
import { trackPWAEvent } from './analytics'

// Registrar Service Worker
export async function registerServiceWorker() {
  // Apenas em produção
  if (typeof window === 'undefined' || import.meta.env.DEV) {
    return
  }
  
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      
      console.log('[PWA] ✅ Service Worker registered:', registration.scope)
      
      // Verificar atualizações periodicamente
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] Nova versão disponível! Recarregue a página.')
              // Opcional: mostrar notificação para usuário atualizar
            }
          })
        }
      })
      
      // Verificar atualizações a cada hora
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)
      
      return registration
    } catch (error) {
      console.error('[PWA] ❌ Service Worker registration failed:', error)
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
    
    // Analytics - Enviar para backoffice
    trackPWAInstall('installed')
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
  
  // Analytics - Enviar para backoffice
  trackPWAInstall('prompt_shown', { outcome })
  
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

// Track PWA events
async function trackPWAInstall(type: 'installed' | 'prompt_shown', data?: any) {
  try {
    await trackPWAEvent(type, data)
  } catch (error) {
    console.warn('[PWA] Failed to track install event:', error)
    // Não bloquear se tracking falhar
  }
}













































