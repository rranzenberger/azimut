import { useState, useEffect } from 'react'

interface Project {
  id: string
  slug: string
  translations: any[]
  heroImage: any
  aiScore?: number
  aiReason?: string
}

interface UseAIRecommendationsOptions {
  visitedPages?: string[]
  timeSpent?: Record<string, number>
  interests?: string[]
  currentPage?: string
  sessionId?: string
  enabled?: boolean
}

export const useAIRecommendations = (options: UseAIRecommendationsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string>('')
  const [detectedInterest, setDetectedInterest] = useState<string>('')
  const { enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const fetchRecommendations = async () => {
      setLoading(true)
      
      try {
        const response = await fetch('https://backoffice.azmt.com.br/api/ai/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(options)
        })

        if (!response.ok) throw new Error('Failed to fetch recommendations')

        const data = await response.json()
        
        setProjects(data.projects || [])
        setAnalysis(data.analysis || '')
        setDetectedInterest(data.detectedInterest || '')
      } catch (error) {
        console.error('Error fetching AI recommendations:', error)
        // Silenciosamente falha - não mostrar erro ao usuário
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [JSON.stringify(options), enabled])

  return {
    projects,
    loading,
    analysis,
    detectedInterest
  }
}
