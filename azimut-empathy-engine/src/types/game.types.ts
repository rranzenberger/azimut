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
}

export interface BriefSurprise {
  type: 'combo-required' | 'time-reduced' | 'time-extra' | 'target-bonus'
  description: string
}

export interface Brief {
  id: string
  topicId: string
  title: string
  objective: string
  targetScore?: number
  surprise?: BriefSurprise
}
