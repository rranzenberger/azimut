// ════════════════════════════════════════════════════════════
// UNIFIED TRACKING HOOK
// Combina Google Analytics + Sistema Interno em um só hook
// ════════════════════════════════════════════════════════════

import { useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useUserTracking } from './useUserTracking'
import {
  trackEventUnified,
  trackProjectUnified,
  trackCTAUnified,
  trackConversionUnified,
  trackVideoUnified,
  trackDownloadUnified,
  trackOutboundUnified,
  trackScrollUnified,
} from '../utils/unifiedTracking'

interface UseUnifiedTrackingReturn {
  // Session info
  sessionId: string
  
  // Tracking functions
  trackEvent: (name: string, category: string, data?: Record<string, any>) => void
  trackProject: (slug: string, type: 'VIEW' | 'CLICK' | 'HOVER') => void
  trackCTA: (name: string, location?: string) => void
  trackConversion: (type: 'lead' | 'academy' | 'contact' | 'quiz', value?: number, data?: Record<string, any>) => void
  trackVideo: (action: 'play' | 'pause' | 'complete' | 'progress', videoId: string, data?: { progress?: number; duration?: number }) => void
  trackDownload: (fileName: string, fileType: string) => void
  trackOutbound: (url: string, linkText?: string) => void
}

/**
 * Hook unificado de tracking
 * Envia dados para Google Analytics + Sistema Interno automaticamente
 * 
 * @example
 * const { trackEvent, trackCTA, trackConversion } = useUnifiedTracking()
 * 
 * // Track custom event
 * trackEvent('button_click', 'ui', { button: 'submit' })
 * 
 * // Track CTA
 * trackCTA('Start Project', 'hero')
 * 
 * // Track conversion
 * trackConversion('lead', 100, { source: 'contact_form' })
 */
export function useUnifiedTracking(): UseUnifiedTrackingReturn {
  const location = useLocation()
  const { sessionId, trackInteraction } = useUserTracking()
  const scrollMilestonesRef = useRef<Set<number>>(new Set())

  // Track scroll milestones (25%, 50%, 75%, 100%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      const milestones = [25, 50, 75, 100]
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone)
          trackScrollUnified(milestone, location.pathname)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Reset scroll milestones on page change
  useEffect(() => {
    scrollMilestonesRef.current.clear()
  }, [location.pathname])

  // Memoized tracking functions
  const trackEvent = useCallback((name: string, category: string, data?: Record<string, any>) => {
    trackEventUnified(name, category, data)
  }, [])

  const trackProject = useCallback((slug: string, type: 'VIEW' | 'CLICK' | 'HOVER') => {
    trackProjectUnified(slug, type)
    trackInteraction('project_view', slug)
  }, [trackInteraction])

  const trackCTA = useCallback((name: string, loc?: string) => {
    trackCTAUnified(name, loc)
    trackInteraction('cta_click', name)
  }, [trackInteraction])

  const trackConversion = useCallback((
    type: 'lead' | 'academy' | 'contact' | 'quiz',
    value?: number,
    data?: Record<string, any>
  ) => {
    trackConversionUnified(type, value, data)
  }, [])

  const trackVideo = useCallback((
    action: 'play' | 'pause' | 'complete' | 'progress',
    videoId: string,
    data?: { progress?: number; duration?: number }
  ) => {
    trackVideoUnified(action, videoId, data)
  }, [])

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackDownloadUnified(fileName, fileType)
  }, [])

  const trackOutbound = useCallback((url: string, linkText?: string) => {
    trackOutboundUnified(url, linkText)
  }, [])

  return {
    sessionId,
    trackEvent,
    trackProject,
    trackCTA,
    trackConversion,
    trackVideo,
    trackDownload,
    trackOutbound,
  }
}

export default useUnifiedTracking
