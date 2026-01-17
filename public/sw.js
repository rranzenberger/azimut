// Service Worker para PWA - Azimut
// Versão 1.0.0

const CACHE_VERSION = 'azimut-v2'
const STATIC_CACHE = 'azimut-static-v2'
const IMAGE_CACHE = 'azimut-images-v2'
const OFFLINE_URL = '/offline.html'

// Assets essenciais para cache imediato (critical)
const ESSENTIAL_ASSETS = [
  '/',
  '/manifest.json',
  '/logo-azimut-star.svg',
  '/azimut-star-32.png',
  '/logo-topo-site.svg',
  '/logo-topo-preto-site.svg',
  '/offline.html',
  '/fonts/HandelGothic-Regular.ttf',
  '/fonts/Inter-VariableFont.ttf',
  '/fonts/Sora-VariableFont_wght.ttf'
]

// Install - cachear assets essenciais
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v2...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching essential assets')
        return cache.addAll(ESSENTIAL_ASSETS.map(url => new Request(url, { cache: 'reload' })))
          .catch(err => {
            console.warn('[SW] Some assets failed to cache:', err)
            // Continuar mesmo se alguns assets falharem
            return Promise.resolve()
          })
      })
      .then(() => self.skipWaiting()) // Ativar imediatamente
  )
})

// Activate - limpar caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker v2...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== CACHE_VERSION)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name)
              return caches.delete(name)
            })
        )
      })
      .then(() => self.clients.claim()) // Controlar todas as páginas imediatamente
  )
})

// Fetch - estratégia otimizada por tipo de recurso
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignorar requisições não-GET e chrome-extension
  if (request.method !== 'GET' || request.url.includes('chrome-extension')) {
    return
  }

  // Estratégia 1: Imagens - Cache First (mais rápido)
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse // Cache hit - retornar imediatamente
        }
        
        // Cache miss - buscar da rede e cachear
        return fetch(request).then((response) => {
          if (response.ok && request.url.startsWith(self.location.origin)) {
            const responseToCache = response.clone()
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return response
        }).catch(() => {
          // Se falhar, retornar placeholder ou nada
          return new Response('', { status: 404 })
        })
      })
    )
    return
  }

  // Estratégia 2: HTML/JS/CSS - Network First com fallback robusto
  if (
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.mode === 'navigate'
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cachear apenas se válido e do mesmo origin
          if (response.ok && request.url.startsWith(self.location.origin)) {
            const responseToCache = response.clone()
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          // Network falhou, usar cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            
            // Se é navegação, mostrar página offline
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL).then((offlinePage) => {
                if (offlinePage) {
                  return offlinePage
                }
                // Fallback HTML básico
                return new Response(
                  '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Offline - Azimut</title><style>body{font-family:sans-serif;text-align:center;padding:2rem;background:#050814;color:#fff}h1{color:#c92337}</style></head><body><h1>Você está offline</h1><p>Verifique sua conexão com a internet.</p><p>Algumas páginas visitadas anteriormente podem estar disponíveis.</p></body></html>',
                  { headers: { 'Content-Type': 'text/html' } }
                )
              })
            }
            
            return new Response('Offline', { status: 503 })
          })
        })
    )
    return
  }

  // Estratégia 3: Outros recursos - Network First genérico
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
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













































