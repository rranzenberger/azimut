// ════════════════════════════════════════════════════════════
// USE LOADING SKELETON - Hook Helper Seguro
// ════════════════════════════════════════════════════════════
// Hook isolado - não mexe em código existente
// ════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface UseLoadingSkeletonOptions {
  delay?: number // Delay antes de mostrar skeleton (evita flash)
  minDuration?: number // Duração mínima do skeleton
}

export function useLoadingSkeleton(
  isLoading: boolean,
  options: UseLoadingSkeletonOptions = {}
) {
  const { theme } = useTheme()
  const { delay = 200, minDuration = 500 } = options
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (isLoading) {
      // Delay antes de mostrar skeleton (evita flash rápido)
      const timer = setTimeout(() => {
        setShowSkeleton(true)
      }, delay)

      return () => clearTimeout(timer)
    } else {
      // Garantir duração mínima (melhor UX)
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDuration - elapsed)

      const timer = setTimeout(() => {
        setShowSkeleton(false)
      }, remaining)

      return () => clearTimeout(timer)
    }
  }, [isLoading, delay, minDuration, startTime])

  return {
    showSkeleton,
    theme: theme || 'dark'
  }
}
