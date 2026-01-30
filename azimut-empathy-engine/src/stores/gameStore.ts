import { create } from 'zustand'
import type { Brief, GameElement, PowerUp } from '../types/game.types'
import { getComboBonus, getCombosForElements } from '../data/combos'
import { elements } from '../data/elements'
import { powerups } from '../data/powerups'
import { topics } from '../data/topics'
import { pickRandomBriefForTopic } from '../data/briefs'
import { shuffled } from '../utils/shuffle'

const PHASE_DURATION: Record<1 | 2 | 3 | 4, number> = { 1: 20, 2: 30, 3: 40, 4: 30 }
const TARGET_SCORE: Record<1 | 2 | 3 | 4, number> = { 1: 200, 2: 400, 3: 600, 4: 1000 }
const POOL_SIZE = 18
const POWER_UP_CHANCE = 0.35

export type GameStatus = 'idle' | 'playing' | 'finished'

export const PHASE_NAMES: Record<1 | 2 | 3 | 4, string> = {
  1: 'Sentir', 2: 'Conectar', 3: 'Sincronizar', 4: 'Transformar',
}

function pickRandomTopicId(): string {
  const topic = topics[Math.floor(Math.random() * topics.length)]
  return topic!.id
}

function applySurpriseToPhase(
  brief: Brief | null,
  phase: 1 | 2 | 3 | 4
): { timeLeft: number; targetScore: number } {
  let timeLeft = PHASE_DURATION[phase]
  let targetScore = brief?.targetScore ?? TARGET_SCORE[phase]
  if (brief?.surprise) {
    switch (brief.surprise.type) {
      case 'time-reduced':
        timeLeft = Math.max(10, Math.floor(timeLeft * 0.6))
        break
      case 'time-extra':
        timeLeft += 10
        break
      case 'target-bonus':
        targetScore = Math.floor(targetScore * 1.25)
        break
      default:
        break
    }
  }
  return { timeLeft, targetScore }
}

interface GameState {
  phase: 1 | 2 | 3 | 4
  status: GameStatus
  currentTopicId: string | null
  currentBrief: Brief | null
  surpriseSatisfied: boolean | null
  selectedIds: string[]
  poolOrder: string[]
  accumulatedScore: number
  timeLeft: number
  targetScore: number
  eventMultiplier: number
  gamesPlayed: number
  highScore: number
  finalScore: number
  availablePowerUp: PowerUp | null
  addElement: (id: string, element: GameElement) => void
  removeElement: (id: string) => void
  setTimeLeft: (t: number) => void
  startGame: () => void
  endPhase: () => void
  reset: () => void
  consumePowerUp: (id: string) => void
  getTotalScore: (el: GameElement[]) => number
  getPhaseName: (p: 1 | 2 | 3 | 4) => string
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 1,
  status: 'idle',
  currentTopicId: null,
  currentBrief: null,
  surpriseSatisfied: null,
  selectedIds: [],
  poolOrder: [],
  accumulatedScore: 0,
  timeLeft: PHASE_DURATION[1],
  targetScore: TARGET_SCORE[1],
  eventMultiplier: 1,
  gamesPlayed: 0,
  highScore: 0,
  finalScore: 0,
  availablePowerUp: null,

  addElement(id, _element) {
    set((s) => {
      if (s.selectedIds.includes(id)) return s
      const newIds = [...s.selectedIds, id]
      const prevCombo = getCombosForElements(s.selectedIds, s.currentTopicId).length
      const newCombo = getCombosForElements(newIds, s.currentTopicId).length
      const shouldSpawn = newCombo > prevCombo && Math.random() < POWER_UP_CHANCE && powerups.length > 0
      const availablePowerUp = shouldSpawn ? powerups[Math.floor(Math.random() * powerups.length)]! : s.availablePowerUp
      return {
        selectedIds: newIds,
        availablePowerUp,
      }
    })
  },

  removeElement(id) {
    set((s) => ({ selectedIds: s.selectedIds.filter((x) => x !== id) }))
  },

  setTimeLeft(t) {
    set({ timeLeft: Math.max(0, t) })
  },

  startGame() {
    const phase = get().phase
    const topicId = pickRandomTopicId()
    const brief = pickRandomBriefForTopic(topicId)
    const topic = topics.find((t) => t.id === topicId)
    const poolOrder = topic
      ? shuffled([...topic.elementIds]).slice(0, POOL_SIZE)
      : shuffled(elements.map((e) => e.id)).slice(0, POOL_SIZE)
    const { timeLeft, targetScore } = applySurpriseToPhase(brief ?? null, phase)
    set({
      status: 'playing',
      currentTopicId: topicId,
      currentBrief: brief ?? null,
      surpriseSatisfied: null,
      selectedIds: [],
      poolOrder,
      accumulatedScore: 0,
      timeLeft,
      targetScore,
      eventMultiplier: Math.random() < 0.2 ? 2 : 1,
      availablePowerUp: null,
    })
  },

  endPhase() {
    const { getTotalScore, phase, accumulatedScore, highScore, gamesPlayed, selectedIds, currentBrief } = get()
    const total = getTotalScore(elements)
    const combosCount = getCombosForElements(selectedIds).length
    const surpriseSatisfied =
      currentBrief?.surprise?.type === 'combo-required' ? combosCount >= 1 : null
    const newAcc = accumulatedScore + total
    if (phase < 4) {
      const nextPhase = (phase + 1) as 2 | 3 | 4
      const nextTopicId = pickRandomTopicId()
      const nextBrief = pickRandomBriefForTopic(nextTopicId)
      const nextTopic = topics.find((t) => t.id === nextTopicId)
      const nextPool = nextTopic
        ? shuffled([...nextTopic.elementIds]).slice(0, POOL_SIZE)
        : shuffled(elements.map((e) => e.id)).slice(0, POOL_SIZE)
      const { timeLeft, targetScore } = applySurpriseToPhase(nextBrief ?? null, nextPhase)
      set({
        accumulatedScore: newAcc,
        phase: nextPhase,
        currentTopicId: nextTopicId,
        currentBrief: nextBrief ?? null,
        surpriseSatisfied,
        selectedIds: [],
        poolOrder: nextPool,
        timeLeft,
        targetScore,
        availablePowerUp: null,
      })
    } else {
      set({
        status: 'finished',
        timeLeft: 0,
        finalScore: newAcc,
        highScore: Math.max(highScore, newAcc),
        gamesPlayed: gamesPlayed + 1,
        surpriseSatisfied,
      })
    }
  },

  reset() {
    set({
      phase: 1,
      status: 'idle',
      currentTopicId: null,
      currentBrief: null,
      surpriseSatisfied: null,
      selectedIds: [],
      poolOrder: [],
      accumulatedScore: 0,
      timeLeft: PHASE_DURATION[1],
      targetScore: TARGET_SCORE[1],
      eventMultiplier: 1,
      finalScore: 0,
      availablePowerUp: null,
    })
  },

  consumePowerUp(id: string) {
    const { availablePowerUp, timeLeft, setTimeLeft } = get()
    if (!availablePowerUp || availablePowerUp.id !== id) return
    if (id === 'time-extra' && availablePowerUp.duration) setTimeLeft(timeLeft + availablePowerUp.duration)
    set({ availablePowerUp: null })
  },

  getTotalScore(el) {
    const { selectedIds, eventMultiplier, currentTopicId } = get()
    const base = selectedIds.reduce((sum, id) => sum + (el.find((e) => e.id === id)?.points ?? 0), 0)
    const bonus = getComboBonus(selectedIds, currentTopicId)
    return (base + bonus) * eventMultiplier
  },

  getPhaseName(p) {
    return PHASE_NAMES[p]
  },
}))
