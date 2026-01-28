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
  const MAX_LOADING_TIME = 10000 // 10 segundos máximo - segurança

  useEffect(() => {
    // ⚠️ SEGURANÇA: Timeout máximo para evitar skeleton infinito
    const maxTimeout = setTimeout(() => {
      setShowSkeleton(false)
    }, MAX_LOADING_TIME)

    if (isLoading) {
      // Delay antes de mostrar skeleton (evita flash rápido)
      const timer = setTimeout(() => {
        setShowSkeleton(true)
      }, delay)

      return () => {
        clearTimeout(timer)
        clearTimeout(maxTimeout)
      }
    } else {
      // Garantir duração mínima (melhor UX)
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDuration - elapsed)

      const timer = setTimeout(() => {
        setShowSkeleton(false)
      }, remaining)

      return () => {
        clearTimeout(timer)
        clearTimeout(maxTimeout)
      }
    }
  }, [isLoading, delay, minDuration, startTime])

  return {
    showSkeleton,
    theme: theme || 'dark'
  }
}
