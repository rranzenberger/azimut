import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

// Função para enviar métricas para analytics (pode ser customizada)
function sendToAnalytics(metric: Metric) {
  // Em produção, enviar para seu analytics (Google Analytics, Plausible, etc.)
  const body = JSON.stringify(metric)
  
  // Log no desenvolvimento
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', metric.name, metric.value.toFixed(2), metric.rating)
  }
  
  // Enviar para analytics em produção
  if (import.meta.env.PROD && 'sendBeacon' in navigator) {
    // Exemplo: navigator.sendBeacon('/analytics', body)
    // Ou integrar com Plausible/GA4/PostHog
  }
}

// Inicializar tracking de Core Web Vitals
export function initWebVitals() {
  try {
    onCLS(sendToAnalytics)  // Cumulative Layout Shift
    onINP(sendToAnalytics)  // Interaction to Next Paint (substitui FID)
    onLCP(sendToAnalytics)  // Largest Contentful Paint
    onFCP(sendToAnalytics)  // First Contentful Paint
    onTTFB(sendToAnalytics) // Time to First Byte
  } catch (err) {
    console.error('[Web Vitals] Error initializing:', err)
  }
}

// Thresholds recomendados pelo Google (atualizados 2024/2025)
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },  // ms
  INP: { good: 200, needsImprovement: 500 },    // ms (substitui FID)
  CLS: { good: 0.1, needsImprovement: 0.25 },   // score
  FCP: { good: 1800, needsImprovement: 3000 },  // ms
  TTFB: { good: 800, needsImprovement: 1800 },  // ms
}

