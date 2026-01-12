// ════════════════════════════════════════════════════════════
// 🎮 HOOK DE GAMIFICAÇÃO - useGamification
// ════════════════════════════════════════════════════════════
// Hook React para usar gamificação em qualquer componente
// ════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'
import { 
  addPoints, 
  loadProgress, 
  saveProgress,
  type UserProgress,
  type Badge,
  type Achievement,
  POINTS_CONFIG
} from '../utils/gamification'

interface UseGamificationReturn {
  progress: UserProgress
  awardPoints: (action: keyof typeof POINTS_CONFIG, metadata?: Record<string, any>) => Promise<{
    levelUp: boolean
    newBadges: Badge[]
    newAchievements: Achievement[]
  }>
  updateStats: (stat: keyof UserProgress['stats'], increment?: number) => void
  showNotification: (type: 'levelUp' | 'badge' | 'achievement' | 'points', message: string, emoji: string) => void
  isLoading: boolean
}

export function useGamification(): UseGamificationReturn {
  const [progress, setProgress] = useState<UserProgress>(loadProgress())
  const [isLoading, setIsLoading] = useState(false)

  // Carregar progresso atualizado
  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  // Listener para mudanças externas (de outros tabs/componentes)
  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadProgress())
    }

    window.addEventListener('storage', handleUpdate)
    window.addEventListener('gamification-update', handleUpdate)

    return () => {
      window.removeEventListener('storage', handleUpdate)
      window.removeEventListener('gamification-update', handleUpdate)
    }
  }, [])

  // Conceder pontos
  const awardPoints = useCallback(async (
    action: keyof typeof POINTS_CONFIG, 
    metadata?: Record<string, any>
  ) => {
    setIsLoading(true)

    try {
      const result = addPoints(action, metadata)
      setProgress(result.progress)

      // Disparar evento customizado para outros componentes
      window.dispatchEvent(new CustomEvent('gamification-update'))

      // Mostrar notificações
      if (result.levelUp) {
        showNotification(
          'levelUp',
          `Level Up! Agora você é ${result.progress.level}`,
          '🎉'
        )
      }

      result.newBadges.forEach(badge => {
        setTimeout(() => {
          showNotification(
            'badge',
            `Nova badge desbloqueada: ${badge.name}`,
            badge.emoji
          )
        }, 500)
      })

      result.newAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          showNotification(
            'achievement',
            `Conquista completa: ${achievement.name}`,
            achievement.emoji
          )
        }, 1000 + (index * 500))
      })

      return {
        levelUp: result.levelUp,
        newBadges: result.newBadges,
        newAchievements: result.newAchievements
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Atualizar stats
  const updateStats = useCallback((
    stat: keyof UserProgress['stats'], 
    increment: number = 1
  ) => {
    const updated = loadProgress()
    updated.stats[stat] += increment
    saveProgress(updated)
    setProgress(updated)

    // Disparar evento
    window.dispatchEvent(new CustomEvent('gamification-update'))
  }, [])

  // Mostrar notificação
  const showNotification = useCallback((
    type: 'levelUp' | 'badge' | 'achievement' | 'points',
    message: string,
    emoji: string
  ) => {
    // Disparar evento customizado com dados da notificação
    window.dispatchEvent(new CustomEvent('gamification-notification', {
      detail: { type, message, emoji }
    }))

    // Confetti para level up e badges legendárias
    if (type === 'levelUp' || type === 'achievement') {
      triggerConfetti()
    }
  }, [])

  return {
    progress,
    awardPoints,
    updateStats,
    showNotification,
    isLoading
  }
}

// Helper: Trigger confetti animation
function triggerConfetti() {
  // Criar elementos de confetti
  const colors = ['#c92337', '#ff6b35', '#f6ad55', '#4299e1', '#9f7aea']
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '0'
  container.style.left = '0'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.pointerEvents = 'none'
  container.style.zIndex = '9999'
  document.body.appendChild(container)

  // Gerar 50 confetes
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    confetti.style.position = 'absolute'
    confetti.style.width = '10px'
    confetti.style.height = '10px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.top = '-20px'
    confetti.style.borderRadius = '50%'
    confetti.style.animation = `confetti-fall ${2 + Math.random() * 2}s ease-out forwards`
    confetti.style.animationDelay = `${Math.random() * 0.5}s`
    container.appendChild(confetti)
  }

  // Remover container após animação
  setTimeout(() => {
    document.body.removeChild(container)
  }, 4000)
}

// CSS Animation (adicionar ao index.css se não existir)
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes confetti-fall {
      0% {
        transform: translateY(-20px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    @keyframes slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .animate-slide-in-right {
      animation: slide-in-right 0.5s ease-out;
    }
  `
  if (document.head) {
    document.head.appendChild(style)
  }
}
