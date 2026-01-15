// ════════════════════════════════════════════════════════════
// PERFORMANCE UTILITIES
// ════════════════════════════════════════════════════════════
// Funções para otimização de performance
// ════════════════════════════════════════════════════════════

// Preload de recursos críticos
export const preloadResource = (href: string, as: 'script' | 'style' | 'font' | 'image' | 'fetch') => {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }
  document.head.appendChild(link)
}

// Prefetch de rotas
export const prefetchRoute = (href: string) => {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}

// Intersection Observer para lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback para navegadores antigos
    return {
      observe: () => {},
      disconnect: () => {},
      unobserve: () => {}
    }
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.01,
    ...options
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Debounce para otimizar eventos
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle para otimizar eventos
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Verificar se está em conexão lenta
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false
  }

  // @ts-ignore - Network Information API
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (!connection) return false

  // Verificar se é 2G ou save-data mode
  return (
    connection.effectiveType === '2g' ||
    connection.effectiveType === 'slow-2g' ||
    // @ts-ignore
    connection.saveData === true
  )
}

// Lazy load de scripts
export const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Document not available'))
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

// Medir performance de uma função
export const measurePerformance = <T>(
  fn: () => T,
  label?: string
): T => {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  const duration = end - start

  if (label && typeof console !== 'undefined' && console.time) {
    console.timeEnd(label || 'Performance')
  }

  return result
}

// RequestIdleCallback polyfill
export const requestIdleCallback = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options)
  }

  // Fallback: setTimeout com delay mínimo
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 50 // Simular 50ms restantes
    })
  }, 1)
}

// Cancelar idle callback
export const cancelIdleCallback = (id: number) => {
  if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(id)
  } else {
    clearTimeout(id)
  }
}
