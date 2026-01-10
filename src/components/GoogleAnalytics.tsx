// ════════════════════════════════════════════════════════════
// GOOGLE ANALYTICS 4 - TRACKING COMPONENT
// ════════════════════════════════════════════════════════════

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID 
}) => {
  const location = useLocation()

  // Install Google Analytics script
  useEffect(() => {
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.log('⚠️ Google Analytics não configurado. Configure VITE_GA_MEASUREMENT_ID no Vercel.')
      return
    }

    // Create script tag for GA
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      send_page_view: false // We'll send manually on route change
    })

    console.log('✅ Google Analytics inicializado:', measurementId)

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script)
    }
  }, [measurementId])

  // Track page views on route change
  useEffect(() => {
    if (!measurementId || measurementId === 'G-XXXXXXXXXX' || !window.gtag) return

    const pagePath = location.pathname + location.search
    
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href
    })

    console.log('📊 GA Pageview:', pagePath)
  }, [location, measurementId])

  return null // This component doesn't render anything
}

export default GoogleAnalytics

// ════════════════════════════════════════════════════════════
// HELPER FUNCTIONS FOR CUSTOM EVENTS
// ════════════════════════════════════════════════════════════

/**
 * Track custom events
 * @example trackEvent('lead_submitted', { lead_type: 'academy', school: 'VanArts' })
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
    console.log('📊 GA Event:', eventName, parameters)
  }
}

/**
 * Track conversions (form submissions, purchases, etc)
 */
export const trackConversion = (conversionType: 'lead' | 'purchase' | 'signup', data?: Record<string, any>) => {
  trackEvent(`conversion_${conversionType}`, {
    ...data,
    timestamp: new Date().toISOString()
  })
}

/**
 * Track user interactions (clicks, video plays, etc)
 */
export const trackInteraction = (element: string, action: string, data?: Record<string, any>) => {
  trackEvent('user_interaction', {
    element,
    action,
    ...data
  })
}

/**
 * Track chatbot conversations
 */
export const trackChatbot = (action: 'opened' | 'message_sent' | 'lead_captured', data?: Record<string, any>) => {
  trackEvent('chatbot_interaction', {
    action,
    ...data
  })
}
