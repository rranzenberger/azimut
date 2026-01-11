// ════════════════════════════════════════════════════════════
// UNIFIED TRACKING SYSTEM
// Envia eventos para Google Analytics + Sistema Interno
// ════════════════════════════════════════════════════════════

import { trackEvent as trackGA, trackConversion as trackGAConversion, trackInteraction as trackGAInteraction } from '../components/GoogleAnalytics'
import { trackPageView as trackInternalPageView, trackProjectInteraction as trackInternalProject, trackCTA as trackInternalCTA, trackBehavior as trackInternalBehavior, trackPWAEvent as trackInternalPWA, submitLead as submitInternalLead, trackLanguageChange as trackInternalLanguage, getSessionId, getVisitorFingerprint } from './analytics'

// ════════════════════════════════════════════════════════════
// UNIFIED PAGE VIEW
// ════════════════════════════════════════════════════════════

/**
 * Track page view in BOTH systems
 * @returns cleanup function
 */
export function trackPageViewUnified(pageSlug: string): () => void {
  // Google Analytics (via component)
  // O componente GoogleAnalytics já faz isso automaticamente via useLocation
  
  // Sistema Interno
  const cleanup = trackInternalPageView(pageSlug)
  
  return cleanup
}

// ════════════════════════════════════════════════════════════
// UNIFIED EVENTS
// ════════════════════════════════════════════════════════════

/**
 * Track custom event in BOTH systems
 */
export async function trackEventUnified(
  eventName: string,
  category: string,
  data?: Record<string, any>
) {
  // Google Analytics
  trackGA(eventName, {
    event_category: category,
    ...data,
  })
  
  // Sistema Interno (via behavior tracking)
  await trackInternalBehavior('cta_click', {
    element: eventName,
    elementType: category,
    metadata: data,
  })
}

// ════════════════════════════════════════════════════════════
// UNIFIED PROJECT INTERACTION
// ════════════════════════════════════════════════════════════

/**
 * Track project interaction in BOTH systems
 */
export async function trackProjectUnified(
  projectSlug: string,
  type: 'VIEW' | 'CLICK' | 'HOVER'
) {
  // Google Analytics
  trackGA('project_interaction', {
    event_category: 'projects',
    project_slug: projectSlug,
    interaction_type: type,
  })
  
  // Sistema Interno
  await trackInternalProject(projectSlug, type)
}

// ════════════════════════════════════════════════════════════
// UNIFIED CTA CLICK
// ════════════════════════════════════════════════════════════

/**
 * Track CTA click in BOTH systems
 */
export async function trackCTAUnified(ctaName: string, location?: string) {
  // Google Analytics
  trackGAInteraction(ctaName, 'click', { location })
  
  // Sistema Interno
  await trackInternalCTA(ctaName, location)
}

// ════════════════════════════════════════════════════════════
// UNIFIED CONVERSION
// ════════════════════════════════════════════════════════════

/**
 * Track conversion in BOTH systems
 */
export async function trackConversionUnified(
  type: 'lead' | 'academy' | 'contact' | 'quiz',
  value?: number,
  data?: Record<string, any>
) {
  // Google Analytics
  trackGAConversion('lead', {
    conversion_type: type,
    value,
    ...data,
  })
  
  // Sistema Interno
  await trackInternalBehavior('form_start', {
    element: `conversion_${type}`,
    value: value?.toString(),
    metadata: data,
  })
}

// ════════════════════════════════════════════════════════════
// UNIFIED LEAD SUBMISSION
// ════════════════════════════════════════════════════════════

/**
 * Submit lead to BOTH systems
 */
export async function submitLeadUnified(leadData: {
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  projectType?: string
  budget?: string
  timeline?: string
  description?: string
  source?: string
}) {
  // Google Analytics - Track conversion
  trackGAConversion('lead', {
    lead_source: leadData.source || 'website',
    lead_type: leadData.projectType || 'general',
  })
  
  // Sistema Interno - Submit lead
  const result = await submitInternalLead(leadData)
  
  return result
}

// ════════════════════════════════════════════════════════════
// UNIFIED PWA TRACKING
// ════════════════════════════════════════════════════════════

/**
 * Track PWA events in BOTH systems
 */
export async function trackPWAUnified(
  type: 'installed' | 'prompt_shown' | 'prompt_dismissed'
) {
  // Google Analytics
  trackGA('pwa_event', {
    event_category: 'pwa',
    pwa_action: type,
  })
  
  // Sistema Interno
  await trackInternalPWA(type)
}

// ════════════════════════════════════════════════════════════
// UNIFIED LANGUAGE CHANGE
// ════════════════════════════════════════════════════════════

/**
 * Track language change in BOTH systems
 */
export async function trackLanguageUnified(from: string, to: string) {
  // Google Analytics
  trackGA('language_change', {
    event_category: 'engagement',
    from_language: from,
    to_language: to,
  })
  
  // Sistema Interno
  await trackInternalLanguage(from, to)
}

// ════════════════════════════════════════════════════════════
// UNIFIED VIDEO TRACKING
// ════════════════════════════════════════════════════════════

/**
 * Track video events in BOTH systems
 */
export async function trackVideoUnified(
  action: 'play' | 'pause' | 'complete' | 'progress',
  videoId: string,
  data?: { progress?: number; duration?: number }
) {
  // Google Analytics
  trackGA('video_interaction', {
    event_category: 'video',
    video_id: videoId,
    video_action: action,
    ...data,
  })
  
  // Sistema Interno
  await trackInternalBehavior('video_play', {
    element: videoId,
    value: action,
    metadata: data,
  })
}

// ════════════════════════════════════════════════════════════
// UNIFIED SCROLL TRACKING
// ════════════════════════════════════════════════════════════

/**
 * Track scroll milestones in BOTH systems
 * @param percentage 25, 50, 75, 100
 */
export function trackScrollUnified(percentage: number, pageSlug: string) {
  // Google Analytics
  trackGA('scroll_depth', {
    event_category: 'engagement',
    scroll_percentage: percentage,
    page: pageSlug,
  })
  
  // Sistema Interno já faz isso automaticamente via useUserTracking
}

// ════════════════════════════════════════════════════════════
// UNIFIED DOWNLOAD TRACKING
// ════════════════════════════════════════════════════════════

/**
 * Track file downloads in BOTH systems
 */
export async function trackDownloadUnified(fileName: string, fileType: string) {
  // Google Analytics
  trackGA('file_download', {
    event_category: 'engagement',
    file_name: fileName,
    file_type: fileType,
  })
  
  // Sistema Interno
  await trackInternalBehavior('download', {
    element: fileName,
    elementType: fileType,
  })
}

// ════════════════════════════════════════════════════════════
// UNIFIED OUTBOUND LINK TRACKING
// ════════════════════════════════════════════════════════════

/**
 * Track outbound link clicks in BOTH systems
 */
export async function trackOutboundUnified(url: string, linkText?: string) {
  // Google Analytics
  trackGA('outbound_link', {
    event_category: 'engagement',
    link_url: url,
    link_text: linkText,
  })
  
  // Sistema Interno
  await trackInternalBehavior('external_link', {
    element: linkText || url,
    value: url,
  })
}

// ════════════════════════════════════════════════════════════
// UTILITIES
// ════════════════════════════════════════════════════════════

/**
 * Get unified session info
 */
export async function getUnifiedSessionInfo() {
  const sessionId = getSessionId()
  const fingerprint = await getVisitorFingerprint()
  
  return {
    sessionId,
    fingerprint,
    timestamp: new Date().toISOString(),
  }
}

// ════════════════════════════════════════════════════════════
// ENHANCED E-COMMERCE (Future)
// ════════════════════════════════════════════════════════════

// TODO: Add enhanced e-commerce tracking for:
// - Product views
// - Add to cart
// - Checkout steps
// - Purchases

export default {
  trackPageViewUnified,
  trackEventUnified,
  trackProjectUnified,
  trackCTAUnified,
  trackConversionUnified,
  submitLeadUnified,
  trackPWAUnified,
  trackLanguageUnified,
  trackVideoUnified,
  trackScrollUnified,
  trackDownloadUnified,
  trackOutboundUnified,
  getUnifiedSessionInfo,
}
