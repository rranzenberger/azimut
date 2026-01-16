/**
 * ═══════════════════════════════════════════════════════════════
 * UTILITIES DE PERFORMANCE - Otimizações Globais
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Debounce - Limita execução de função
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle - Limita execução de função (executa no máximo a cada X ms)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Preload Resource - Pré-carrega recurso crítico
 */
export function preloadResource(
  href: string,
  as: 'image' | 'font' | 'script' | 'style',
  type?: string
): void {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type
  if (as === 'font') link.crossOrigin = 'anonymous'
  
  document.head.appendChild(link)
}

/**
 * Prefetch Route - Pré-carrega rota provável
 */
export function prefetchRoute(href: string): void {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  link.as = 'document'
  
  document.head.appendChild(link)
}

/**
 * Intersection Observer Helper - Lazy loading otimizado
 */
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px', // Carrega 50px antes de aparecer
    threshold: 0.01,
    ...options,
  })
}

/**
 * Detect Slow Connection - Detecta conexão lenta
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false
  
  // @ts-ignore - connection pode não existir em todos os browsers
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  
  if (!connection) return false
  
  // 2G ou save-data ativo
  if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
    return true
  }
  
  // @ts-ignore
  if (navigator.connection?.saveData) {
    return true
  }
  
  return false
}

/**
 * Request Idle Callback - Executa quando navegador está ocioso
 */
export function requestIdleCallback(callback: () => void, timeout?: number): number {
  if (typeof window === 'undefined') {
    return setTimeout(callback, 0)
  }
  
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout })
  }
  
  // Fallback para browsers antigos
  return setTimeout(callback, timeout || 1)
}

/**
 * Cancel Idle Callback
 */
export function cancelIdleCallback(id: number): void {
  if (typeof window === 'undefined') return
  
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id)
  } else {
    clearTimeout(id)
  }
}

/**
 * Lazy Load Image - Carrega imagem quando visível
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  onLoad?: () => void,
  onError?: () => void
): () => void {
  const observer = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src
        if (onLoad) img.onload = onLoad
        if (onError) img.onerror = onError
        observer?.disconnect()
      }
    })
  })
  
  if (observer) {
    observer.observe(img)
  } else {
    // Fallback: carrega imediatamente
    img.src = src
  }
  
  return () => observer?.disconnect()
}

/**
 * Performance Mark - Marca performance
 */
export function mark(name: string): void {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name)
  }
}

/**
 * Performance Measure - Mede performance
 */
export function measure(name: string, startMark: string, endMark?: string): void {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(name, startMark, endMark)
    } catch (e) {
      // Ignora erros
    }
  }
}

/**
 * Get Performance Metrics - Retorna métricas de performance
 */
export function getPerformanceMetrics(): {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
} {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) {
    return {}
  }
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = performance.getEntriesByType('paint')
  
  const fcp = paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime
  const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime
  
  return {
    fcp: fcp ? Math.round(fcp) : undefined,
    lcp: lcp ? Math.round(lcp) : undefined,
    ttfb: navigation ? Math.round(navigation.responseStart - navigation.requestStart) : undefined,
  }
}
