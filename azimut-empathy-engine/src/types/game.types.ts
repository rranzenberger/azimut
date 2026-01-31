export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'

export interface GameElement {
  id: string
  name: string
  nameEn?: string
  category: string
  rarity: Rarity
  points: number
  icon?: string
  description?: string
}

export interface Combo {
  id: string
  elementIds: string[]
  name: string
  bonusPoints: number
  synergy?: boolean
  topicId?: string
}

export interface PowerUp {
  id: string
  name: string
  effect: string
  duration?: number
  /** Explicação curta para tooltip / acessibilidade */
  tooltip?: string
}

export interface BriefSurprise {
  type: 'combo-required' | 'time-reduced' | 'time-extra' | 'target-bonus' | 'client-vip' | 'intern-chaos'
  description: string
}

export interface Brief {
  id: string
  topicId: string
  title: string
  objective: string
  targetScore?: number
  surprise?: BriefSurprise
  /** Quest premium (projetos de referência: Museu Olímpico, etc.) — UI com destaque (glow, gradiente). */
  premium?: boolean
  /** Quest escondida/surpresa — pode ser destravada ao descobrir a área secreta ou após N combos. */
  secret?: boolean
  /** Quest super-premium: só aparece para quem descobriu a área secreta; uma única quest especial. */
  superPremium?: boolean
}
