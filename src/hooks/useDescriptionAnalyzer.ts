import { useState, useEffect } from 'react'
import { useDebounce } from './useDebounce'

interface DescriptionAnalysis {
  analyzed: boolean
  detectedType?: string
  detectedElements?: string[]
  suggestions?: string[]
  detailLevel?: 'baixo' | 'médio' | 'alto'
  estimatedBudgetRange?: string
  questions?: string[]
}

export const useDescriptionAnalyzer = (description: string, language: string = 'pt') => {
  const [analysis, setAnalysis] = useState<DescriptionAnalysis>({ analyzed: false })
  const [loading, setLoading] = useState(false)
  
  // Debounce para não chamar IA a cada caractere digitado
  const debouncedDescription = useDebounce(description, 1000)

  useEffect(() => {
    if (!debouncedDescription || debouncedDescription.length < 20) {
      setAnalysis({ analyzed: false })
      return
    }

    const analyzeDescription = async () => {
      setLoading(true)
      
      try {
        const response = await fetch('https://backoffice.azmt.com.br/api/ai/analyze-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: debouncedDescription,
            language
          })
        })

        if (!response.ok) throw new Error('Failed to analyze')

        const data = await response.json()
        setAnalysis(data)
      } catch (error) {
        console.error('Error analyzing description:', error)
        setAnalysis({ analyzed: false })
      } finally {
        setLoading(false)
      }
    }

    analyzeDescription()
  }, [debouncedDescription, language])

  return {
    analysis,
    loading
  }
}
