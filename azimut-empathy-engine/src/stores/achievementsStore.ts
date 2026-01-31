import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AchievementDef {
  id: string
  name: string
  description: string
  icon: string
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'mestre-combos', name: 'Mestre dos Combos', description: 'Ative 10 combos diferentes em uma partida', icon: '🔥' },
  { id: 'velocista', name: 'Velocista', description: 'Complete uma fase com mais de 10s restantes', icon: '⚡' },
  { id: 'perfeccionista', name: 'Perfeccionista', description: 'Atinja exatamente a meta (sem ultrapassar)', icon: '🎯' },
  { id: 'multitopico', name: 'Multitópico', description: 'Jogue as 4 fases com tópicos diferentes', icon: '🌐' },
  { id: 'primeiro-combo', name: 'Primeiro Combo', description: 'Ative seu primeiro combo', icon: '✨' },
  { id: 'fase-perfeita', name: 'Fase Perfeita', description: 'Atinga a meta e ative pelo menos 1 combo na mesma fase', icon: '🌟' },
  // Especiais: easter eggs + área secreta → direito a NFT diferenciado
  { id: 'explorador', name: 'Explorador', description: 'Easter egg: 7 toques no título durante o jogo', icon: '🎮' },
  { id: 'curioso', name: 'Curioso', description: 'Easter egg: 5 toques no score na tela de resultado', icon: '✨' },
  { id: 'area-secreta', name: 'Área Secreta', description: 'Descobriu a área secreta na tela inicial', icon: '🔮' },
  { id: 'quest-premium', name: 'Quest Premium', description: 'Completou pelo menos uma fase com quest premium (Rio Museu Olímpico etc.)', icon: '🏛️' },
  { id: 'super-premium', name: 'Super Premium', description: 'Completou pelo menos uma fase com a quest super-premium (Rio Museu Olímpico — Experiência Completa)', icon: '👑' },
]

interface PhaseEndSnapshot {
  timeLeft: number
  score: number
  targetScore: number
  combosCount: number
}

interface GameEndSnapshot {
  totalCombosInGame: number
  topicIds: string[]
  hadPremiumBrief?: boolean
}

interface AchievementsState {
  unlocked: string[]
  unlock: (id: string) => void
  checkPhaseEnd: (snapshot: PhaseEndSnapshot) => void
  checkGameEnd: (snapshot: GameEndSnapshot) => void
  isUnlocked: (id: string) => boolean
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlocked: [],

      unlock(id: string) {
        set((s) => {
          if (s.unlocked.includes(id)) return s
          return { unlocked: [...s.unlocked, id] }
        })
      },

      isUnlocked(id: string) {
        return get().unlocked.includes(id)
      },

      checkPhaseEnd(snapshot: PhaseEndSnapshot) {
        const { unlock, isUnlocked } = get()
        if (snapshot.timeLeft > 10 && !isUnlocked('velocista')) unlock('velocista')
        if (snapshot.score === snapshot.targetScore && snapshot.score > 0 && !isUnlocked('perfeccionista')) unlock('perfeccionista')
        if (snapshot.combosCount >= 1 && snapshot.score >= snapshot.targetScore && !isUnlocked('fase-perfeita')) unlock('fase-perfeita')
        if (snapshot.combosCount >= 1 && !isUnlocked('primeiro-combo')) unlock('primeiro-combo')
      },

      checkGameEnd(snapshot: GameEndSnapshot) {
        const { unlock, isUnlocked } = get()
        if (snapshot.totalCombosInGame >= 10 && !isUnlocked('mestre-combos')) unlock('mestre-combos')
        const uniqueTopics = new Set(snapshot.topicIds).size
        if (uniqueTopics >= 4 && !isUnlocked('multitopico')) unlock('multitopico')
        if (snapshot.hadPremiumBrief && !isUnlocked('quest-premium')) unlock('quest-premium')
        if (snapshot.hadSuperPremiumBrief && !isUnlocked('super-premium')) unlock('super-premium')
      },
    }),
    { name: 'azimut-empathy-achievements' }
  )
)
