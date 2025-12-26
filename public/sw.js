// Service Worker para PWA - Azimut
// Versão 1.0.0

const CACHE_NAME = 'azimut-v1'
const OFFLINE_URL = '/offline.html'

// Assets essenciais para cache
const ESSENTIAL_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/logo-azimut-star.svg',
  '/logo-topo-site.svg',
  '/logo-topo-preto-site.svg'
]

// Install - cachear assets essenciais
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching essential assets')
        return cache.addAll(ESSENTIAL_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate - limpar caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name)
              return caches.delete(name)
            })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch - estratégia Network First com fallback para cache
self.addEventListener('fetch', (event) => {
  // Ignorar requisições não-GET e chrome-extension
  if (event.request.method !== 'GET' || event.request.url.includes('chrome-extension')) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a resposta é válida, cachear e retornar
        if (response && response.status === 200) {
          const responseToCache = response.clone()
          
          caches.open(CACHE_NAME).then((cache) => {
            // Cachear apenas assets do mesmo origin
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseToCache)
            }
          })
        }
        
        return response
      })
      .catch(() => {
        // Network falhou, tentar cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response
            }
            
            // Se é navegação e não tem cache, mostrar página offline
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL)
            }
            
            // Para outros recursos, retornar erro
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            })
          })
      })
  )
})

// Background Sync (para formulários offline - futuro)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      // Implementar sincronização de formulários offline
      console.log('[SW] Background sync triggered')
    )
  }
})

// Push Notifications (futuro)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/logo192.png',
    badge: '/azimut-star-32.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('Azimut', options)
  )
})
























