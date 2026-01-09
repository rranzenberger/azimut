import { useState } from 'react'

interface BudgetEstimate {
  success: boolean
  estimatedRange?: {
    min: number
    max: number
    currency: string
  }
  confidence?: 'alta' | 'média' | 'baixa'
  breakdown?: Record<string, string>
  costFactors?: string[]
  options?: Array<{
    tier: string
    budget: string
    includes: string[]
  }>
  additionalCosts?: string[]
  timeline?: string
  recommendations?: string[]
  fallback?: boolean
}

interface EstimateParams {
  projectType?: string
  description?: string
  features?: string[]
  size?: string
  timeline?: string
  organizationType?: string
  language?: string
}

export const useBudgetEstimator = () => {
  const [estimate, setEstimate] = useState<BudgetEstimate | null>(null)
  const [loading, setLoading] = useState(false)

  const getEstimate = async (params: EstimateParams) => {
    setLoading(true)
    
    try {
      const response = await fetch('https://backoffice.azmt.com.br/api/ai/budget-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })

      if (!response.ok) throw new Error('Failed to estimate budget')

      const data = await response.json()
      setEstimate(data)
      return data
    } catch (error) {
      console.error('Error estimating budget:', error)
      setEstimate({
        success: false,
        fallback: true
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  const clearEstimate = () => {
    setEstimate(null)
  }

  return {
    estimate,
    loading,
    getEstimate,
    clearEstimate
  }
}
