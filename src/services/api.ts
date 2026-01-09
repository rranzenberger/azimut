/**
 * API Service - Centralized API calls to backoffice
 * Handles all communication between site and CMS/backoffice
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const API_KEY = import.meta.env.VITE_API_KEY || ''

// Check if features are enabled
const AI_ENABLED = import.meta.env.VITE_ENABLE_AI_SUGGESTIONS !== 'false'
const TRACKING_ENABLED = import.meta.env.VITE_ENABLE_TRACKING !== 'false'

export class ApiService {
  /**
   * Submit lead to CRM
   */
  static async submitLead(data: any) {
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to submit lead')
      }

      return await response.json()
    } catch (error) {
      console.error('❌ Error submitting lead:', error)
      throw error
    }
  }

  /**
   * Get AI suggestions for form fields (optional)
   */
  static async getAiSuggestions(data: any) {
    if (!AI_ENABLED) {
      console.log('ℹ️ AI suggestions disabled')
      return null
    }

    try {
      const response = await fetch(`${API_URL}/api/ai/form-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        console.warn('⚠️ AI suggestions not available')
        return null
      }

      return await response.json()
    } catch (error) {
      console.warn('⚠️ AI suggestions failed (non-critical):', error)
      return null // Fail silently
    }
  }

  /**
   * Track visitor behavior (optional)
   */
  static async trackVisitor(data: any) {
    if (!TRACKING_ENABLED) {
      return
    }

    try {
      await fetch(`${API_URL}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY })
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      // Fail silently - tracking is optional
      console.debug('Tracking failed (non-critical):', error)
    }
  }

  /**
   * Get personalized content recommendations
   */
  static async getRecommendations(sessionId: string) {
    try {
      const response = await fetch(
        `${API_URL}/api/public/content?sessionId=${sessionId}`,
        {
          headers: {
            ...(API_KEY && { 'X-API-Key': API_KEY })
          }
        }
      )

      if (!response.ok) {
        return null
      }

      return await response.json()
    } catch (error) {
      console.debug('Recommendations not available:', error)
      return null
    }
  }

  /**
   * Health check - test if API is reachable
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/health`, {
        method: 'GET',
        headers: {
          ...(API_KEY && { 'X-API-Key': API_KEY })
        }
      })
      return response.ok
    } catch {
      return false
    }
  }
}

// Export singleton instance
export default ApiService
