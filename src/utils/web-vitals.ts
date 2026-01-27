import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'
import { logger } from './logger'

// Função para enviar métricas para analytics
function sendToAnalytics(metric: Metric) {
  try {
    // 1. Enviar para Google Analytics 4 (se configurado)
    if (import.meta.env.PROD && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
        // Custom dimensions
        metric_id: metric.id,
        metric_name: metric.name,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
      })
    }

    // 2. Enviar para sistema interno de analytics (se disponível)
    if (import.meta.env.PROD && 'sendBeacon' in navigator) {
      const apiUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
      const body = JSON.stringify({
        event: 'web_vital',
        data: {
          name: metric.name,
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
          id: metric.id,
          navigationType: metric.navigationType,
          timestamp: Date.now(),
        },
      })

      // Usar sendBeacon para não bloquear navegação
      navigator.sendBeacon(`${apiUrl}/api/track`, body)
    }

    // 3. Log em desenvolvimento
    if (import.meta.env.DEV) {
      logger.info(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      })
    }
  } catch (error) {
    // ⚠️ NUNCA quebrar se Web Vitals falhar
    logger.error(error, { context: 'Web Vitals tracking failed' })
  }
}

// Inicializar tracking de Core Web Vitals
export function initWebVitals() {
  try {
    // ⚠️ Cada métrica em try/catch próprio - se uma falhar, outras continuam
    try {
      onCLS(sendToAnalytics)  // Cumulative Layout Shift
    } catch (err) {
      logger.error(err, { context: 'Web Vitals: CLS initialization failed' })
    }

    try {
      onINP(sendToAnalytics)  // Interaction to Next Paint (substitui FID)
    } catch (err) {
      logger.error(err, { context: 'Web Vitals: INP initialization failed' })
    }

    try {
      onLCP(sendToAnalytics)  // Largest Contentful Paint
    } catch (err) {
      logger.error(err, { context: 'Web Vitals: LCP initialization failed' })
    }

    try {
      onFCP(sendToAnalytics)  // First Contentful Paint
    } catch (err) {
      logger.error(err, { context: 'Web Vitals: FCP initialization failed' })
    }

    try {
      onTTFB(sendToAnalytics) // Time to First Byte
    } catch (err) {
      logger.error(err, { context: 'Web Vitals: TTFB initialization failed' })
    }
  } catch (err) {
    // ⚠️ NUNCA quebrar se Web Vitals falhar completamente
    logger.error(err, { context: 'Web Vitals: Complete initialization failed' })
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

