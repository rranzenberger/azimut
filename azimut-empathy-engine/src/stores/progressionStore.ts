import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_LEVEL = 10

export const LEVEL_NAMES: Record<number, string> = {
  1: 'Aprendiz', 2: 'Aprendiz', 3: 'Iniciante', 4: 'Iniciante',
  5: 'Criador', 6: 'Criador', 7: 'Expert', 8: 'Expert', 9: 'Maestro', 10: 'Maestro',
}

function xpForLevel(level: number): number {
  return 300 + level * 100
}

interface ProgressionState {
  level: number
  xp: number
  xpToNextLevel: number
  badges: string[]
  addXp: (score: number) => void
  getLevelName: () => string
}

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      level: 1,
      xp: 0,
      xpToNextLevel: xpForLevel(1),
      badges: [],
      addXp(score: number) {
        const gained = Math.min(500, Math.floor(score / 5))
        set((s) => {
          let { level, xp, xpToNextLevel } = s
          xp += gained
          while (level < MAX_LEVEL && xp >= xpToNextLevel) {
            xp -= xpToNextLevel
            level += 1
            xpToNextLevel = xpForLevel(level)
          }
          if (level >= MAX_LEVEL) xp = Math.min(xp, xpToNextLevel - 1)
          return { level, xp, xpToNextLevel }
        })
      },
      getLevelName() {
        return LEVEL_NAMES[get().level] ?? 'Aprendiz'
      },
    }),
    { name: 'azimut-empathy-progression' }
  )
)
