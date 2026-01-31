import { create } from 'zustand'
import type { Brief, GameElement, PowerUp } from '../types/game.types'
import { getComboBonus, getCombosForElements, combos } from '../data/combos'
import { elements, getElementById } from '../data/elements'
import { powerups } from '../data/powerups'
import { topics } from '../data/topics'
import { pickRandomBriefForTopic, pickRandomPremiumBrief, getSuperPremiumBrief } from '../data/briefs'
import { isSecretUnlocked } from '../utils/secretArea'
import { shuffled } from '../utils/shuffle'
import { useSettingsStore } from '../stores/settingsStore'

// ═══════════════════════════════════════════════════════════════
// BALANCEAMENTO RECOMENDADO (v1.1)
// Fase 4 ajustada para reduzir frustração
// ═══════════════════════════════════════════════════════════════
const PHASE_DURATION: Record<1 | 2 | 3 | 4, number> = { 
  1: 20, 
  2: 30, 
  3: 40, 
  4: 45  // Era 30, agora 45 (recomendação)
}

const TARGET_SCORE: Record<1 | 2 | 3 | 4, number> = { 
  1: 200, 
  2: 350,  // Era 400, agora 350
  3: 550,  // Era 600, agora 550
  4: 800   // Era 1000, agora 800
}

const POOL_SIZE = 24  // Desktop: 4 linhas de 6 cartas; mobile: scroll com 24 cartas
const POOL_SIZE_INTERN = 12  // Surpresa "Estagiário atrapalhado": menos cartas, cada uma vale 3×
const POWER_UP_CHANCE = 0.35
const GUARANTEED_RARE_COUNT = 1  // Garantia de pelo menos 1 Rare+ por pool
const PITY_AFTER_LOSSES = 3  // Após N derrotas de fase, próxima fase ganha bônus (pool + tempo)

export type GameStatus = 'idle' | 'playing' | 'finished'

export const PHASE_NAMES: Record<1 | 2 | 3 | 4, string> = {
  1: 'Sentir', 2: 'Conectar', 3: 'Sincronizar', 4: 'Transformar',
}

function pickRandomTopicId(): string {
  const topic = topics[Math.floor(Math.random() * topics.length)]
  return topic!.id
}

// ═══════════════════════════════════════════════════════════════
// GARANTIA DE RARIDADE E COMBO (anti-frustração)
// ═══════════════════════════════════════════════════════════════
function ensureRareInPool(pool: string[]): string[] {
  const poolElements = pool.map(id => getElementById(id)).filter(Boolean) as GameElement[]
  const hasRare = poolElements.some(el => el.rarity !== 'common')
  
  if (!hasRare) {
    // Encontrar um elemento Rare+ que não está no pool
    const rareElements = elements.filter(el => 
      el.rarity !== 'common' && !pool.includes(el.id)
    )
    if (rareElements.length > 0) {
      const randomRare = rareElements[Math.floor(Math.random() * rareElements.length)]
      // Substituir um elemento comum aleatório
      const commonIndex = pool.findIndex(id => {
        const el = getElementById(id)
        return el?.rarity === 'common'
      })
      if (commonIndex !== -1 && randomRare) {
        pool[commonIndex] = randomRare.id
      }
    }
  }
  return pool
}

/** Garante exatamente poolSize cartas no pool; se o tópico tiver menos, preenche com outras do baralho. */
function fillPoolToSize(pool: string[], poolSize: number): string[] {
  if (pool.length >= poolSize) return pool.slice(0, poolSize)
  const poolSet = new Set(pool)
  const allIds = elements.map((e) => e.id)
  const available = shuffled(allIds.filter((id) => !poolSet.has(id)))
  return [...pool, ...available.slice(0, poolSize - pool.length)]
}

function ensureComboInPool(pool: string[], topicId: string): string[] {
  // Verificar se já existe pelo menos um combo possível
  const topicCombos = combos.filter(c => c.topicId === topicId || !c.topicId)
  const poolSet = new Set(pool)
  
  const hasCombo = topicCombos.some(combo => {
    const elementsInPool = combo.elementIds.filter(id => poolSet.has(id))
    return elementsInPool.length >= combo.elementIds.length
  })
  
  if (!hasCombo && topicCombos.length > 0) {
    // Escolher um combo aleatório e garantir que seus elementos estejam no pool
    const randomCombo = topicCombos[Math.floor(Math.random() * topicCombos.length)]
    if (randomCombo) {
      randomCombo.elementIds.forEach((elementId, index) => {
        if (!poolSet.has(elementId) && index < pool.length) {
          // Encontrar um slot para substituir (preferir commons)
          const commonIndex = pool.findIndex(id => {
            const el = getElementById(id)
            return el?.rarity === 'common' && !randomCombo.elementIds.includes(id)
          })
          if (commonIndex !== -1) {
            pool[commonIndex] = elementId
            poolSet.add(elementId)
          }
        }
      })
    }
  }
  
  return pool
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
        timeLeft = Math.max(15, Math.floor(timeLeft * 0.7)) // Mínimo 15s (era 10s com 0.6)
        break
      case 'time-extra':
        timeLeft += 10
        break
      case 'target-bonus':
        targetScore = Math.floor(targetScore * 1.2) // Era 1.25, agora 1.2
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
  rerollsLeft: number
  consecutiveLosses: number  // derrotas de fase consecutivas (pity após PITY_AFTER_LOSSES)
  timerFrozenUntil: number
  vipUntil: number
  revealRarityUntil: number  // Power-up Revelar Raridade: mostra raridade em todas as cartas até este timestamp (0 = off)
  powerUpSwapCardActive: boolean  // Power-up Trocar Carta: true = jogador deve clicar em uma carta da zona para devolver ao pool
  phaseCardMultiplier: 1 | 3
  nextCardMultiplier: 1 | 3
  multiplierForCard: Record<string, number>
  topicIdsThisGame: string[]
  totalCombosThisGame: number
  hadPremiumBriefInGame: boolean
  hadSuperPremiumBriefInGame: boolean
  lastPhaseEndSnapshot: { timeLeft: number; score: number; targetScore: number; combosCount: number } | null
  gameEndSnapshot: { totalCombosInGame: number; topicIds: string[]; hadPremiumBrief?: boolean; hadSuperPremiumBrief?: boolean } | null
  clearPhaseEndSnapshot: () => void
  clearGameEndSnapshot: () => void
  addElement: (id: string, element: GameElement) => void
  removeElement: (id: string) => void
  setTimeLeft: (t: number) => void
  clearTimerFrozen: () => void
  clearSwapCardMode: () => void  // sai do modo "Trocar carta" (powerUpSwapCardActive = false)
  phaseTimerStarted: boolean  // false até o jogador clicar "Iniciar" / "Continuar" na tela da quest
  startPhaseTimer: () => void  // chamado ao clicar Iniciar/Continuar na tela da quest
  startGame: () => void
  endPhase: () => void
  reset: () => void
  consumePowerUp: (id: string) => void
  rerollPool: () => void  // NOVO: função de reroll
  getTotalScore: (el: GameElement[]) => number
  getPhaseName: (p: 1 | 2 | 3 | 4) => string
  getCompatibleCombos: (elementId: string) => string[]  // NOVO: para highlight de combos
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
  rerollsLeft: 1,
  consecutiveLosses: 0,
  timerFrozenUntil: 0,
  vipUntil: 0,
  revealRarityUntil: 0,
  powerUpSwapCardActive: false,
  phaseCardMultiplier: 1,
  nextCardMultiplier: 1,
  multiplierForCard: {},
  topicIdsThisGame: [],
  totalCombosThisGame: 0,
  hadPremiumBriefInGame: false,
  lastPhaseEndSnapshot: null,
  gameEndSnapshot: null,

  clearPhaseEndSnapshot() {
    set({ lastPhaseEndSnapshot: null })
  },
  clearGameEndSnapshot() {
    set({ gameEndSnapshot: null })
  },

  addElement(id, _element) {
    set((s) => {
      if (s.selectedIds.includes(id)) return s
      const mult = s.nextCardMultiplier === 3 ? 3 : 1
      const newIds = [...s.selectedIds, id]
      const newMultiplierForCard = { ...s.multiplierForCard }
      if (mult === 3) newMultiplierForCard[id] = 3
      const prevCombo = getCombosForElements(s.selectedIds, s.currentTopicId).length
      const newCombo = getCombosForElements(newIds, s.currentTopicId).length
      const shouldSpawn = newCombo > prevCombo && Math.random() < POWER_UP_CHANCE && powerups.length > 0
      const availablePowerUp = shouldSpawn ? powerups[Math.floor(Math.random() * powerups.length)]! : s.availablePowerUp
      return {
        selectedIds: newIds,
        availablePowerUp,
        nextCardMultiplier: 1 as 1 | 3,  // consumido após usar 3x
        multiplierForCard: newMultiplierForCard,
      }
    })
  },

  removeElement(id) {
    set((s) => ({ selectedIds: s.selectedIds.filter((x) => x !== id) }))
  },

  setTimeLeft(t) {
    set({ timeLeft: Math.max(0, t) })
  },

  clearTimerFrozen() {
    set({ timerFrozenUntil: 0 })
  },

  clearSwapCardMode() {
    set({ powerUpSwapCardActive: false })
  },

  phaseTimerStarted: false,
  startPhaseTimer() {
    const { currentBrief } = get()
    const vipUntil = currentBrief?.surprise?.type === 'client-vip' ? Date.now() + 10000 : 0
    set({ phaseTimerStarted: true, vipUntil })
  },

  // NOVO: Reroll do pool (1x por fase)
  rerollPool() {
    const { rerollsLeft, currentTopicId, poolOrder } = get()
    if (rerollsLeft <= 0) return
    
    const topic = topics.find((t) => t.id === currentTopicId)
    const allElementIds = topic ? [...topic.elementIds] : elements.map((e) => e.id)
    
    // Trocar 6 cartas aleatórias
    const indicesToReplace = shuffled([...Array(poolOrder.length).keys()]).slice(0, 6)
    const availableIds = allElementIds.filter(id => !poolOrder.includes(id))
    const newIds = shuffled(availableIds).slice(0, 6)
    
    const newPool = [...poolOrder]
    indicesToReplace.forEach((index, i) => {
      if (newIds[i]) {
        newPool[index] = newIds[i]
      }
    })
    
    // Garantir raridade e combo no novo pool
    const finalPool = ensureComboInPool(ensureRareInPool(newPool), currentTopicId || '')
    
    set({
      poolOrder: finalPool,
      rerollsLeft: rerollsLeft - 1,
    })
  },

  startGame() {
    const { phase, consecutiveLosses } = get()
    // 15% de chance de brief premium se área secreta foi descoberta; 25% disso = super-premium (só esta quest)
    const usePremium = isSecretUnlocked() && Math.random() < 0.15
    const superBrief = usePremium && Math.random() < 0.25 ? getSuperPremiumBrief() : undefined
    const premiumBrief = usePremium ? (superBrief ?? pickRandomPremiumBrief()) : null
    const topicId = premiumBrief ? premiumBrief.topicId : pickRandomTopicId()
    const brief = premiumBrief ?? pickRandomBriefForTopic(topicId)
    const topic = topics.find((t) => t.id === topicId)
    const isInternChaos = brief?.surprise?.type === 'intern-chaos'
    const poolSize = isInternChaos ? POOL_SIZE_INTERN : POOL_SIZE

    let poolOrder = topic
      ? shuffled([...topic.elementIds]).slice(0, poolSize)
      : shuffled(elements.map((e) => e.id)).slice(0, poolSize)

    poolOrder = ensureRareInPool(poolOrder)
    poolOrder = ensureComboInPool(poolOrder, topicId)

    // Pity: após PITY_AFTER_LOSSES derrotas de fase, bônus no pool e no tempo
    if (consecutiveLosses >= PITY_AFTER_LOSSES) {
      const rareElements = elements.filter(el =>
        (el.rarity === 'rare' || el.rarity === 'epic') && !poolOrder.includes(el.id)
      )
      if (rareElements.length > 0) {
        const bonusRare = rareElements[Math.floor(Math.random() * rareElements.length)]
        const commonIndex = poolOrder.findIndex(id => getElementById(id)?.rarity === 'common')
        if (commonIndex !== -1 && bonusRare) {
          poolOrder[commonIndex] = bonusRare.id
        }
      }
    }

    let { timeLeft, targetScore } = applySurpriseToPhase(brief ?? null, phase)
    if (consecutiveLosses >= PITY_AFTER_LOSSES) timeLeft += 5

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
      rerollsLeft: 1,
      timerFrozenUntil: 0,
      vipUntil: 0,
      phaseCardMultiplier: isInternChaos ? 3 : 1,
      nextCardMultiplier: 1,
      multiplierForCard: {},
      topicIdsThisGame: [],
      totalCombosThisGame: 0,
      hadPremiumBriefInGame: !!(brief?.premium),
      hadSuperPremiumBriefInGame: !!(brief?.superPremium),
      revealRarityUntil: 0,
      powerUpSwapCardActive: false,
      phaseTimerStarted: false,
    })
  },

  endPhase() {
    const { getTotalScore, phase, accumulatedScore, highScore, gamesPlayed, selectedIds, currentBrief, targetScore, consecutiveLosses, currentTopicId, timeLeft, topicIdsThisGame, totalCombosThisGame } = get()
    const total = getTotalScore(elements)
    const combosCount = getCombosForElements(selectedIds, currentTopicId).length
    const surpriseSatisfied =
      currentBrief?.surprise?.type === 'combo-required' ? combosCount >= 1 : null
    const newAcc = accumulatedScore + total
    const newTopicIds = [...topicIdsThisGame, currentTopicId].filter(Boolean)
    const newTotalCombos = totalCombosThisGame + combosCount
    
    // Verificar se atingiu a meta
    const metGoal = total >= targetScore
    
    if (phase < 4) {
      const newConsecutiveLosses = metGoal ? 0 : consecutiveLosses + 1
      const hadPremium = get().hadPremiumBriefInGame || !!(currentBrief?.premium)
      const hadSuper = get().hadSuperPremiumBriefInGame || !!(currentBrief?.superPremium)
      set({ lastPhaseEndSnapshot: { timeLeft, score: total, targetScore, combosCount }, topicIdsThisGame: newTopicIds, totalCombosThisGame: newTotalCombos, hadPremiumBriefInGame: hadPremium, hadSuperPremiumBriefInGame: hadSuper })

      const nextPhase = (phase + 1) as 2 | 3 | 4
      const usePremium = isSecretUnlocked() && Math.random() < 0.15
      const nextSuperBrief = usePremium && Math.random() < 0.25 ? getSuperPremiumBrief() : undefined
      const nextPremiumBrief = usePremium ? (nextSuperBrief ?? pickRandomPremiumBrief()) : null
      const nextTopicId = nextPremiumBrief ? nextPremiumBrief.topicId : pickRandomTopicId()
      const challengeMode = useSettingsStore.getState().challengeMode
      const nextBrief = nextPremiumBrief ?? pickRandomBriefForTopic(nextTopicId, challengeMode)
      const nextTopic = topics.find((t) => t.id === nextTopicId)
      const isNextInternChaos = nextBrief?.surprise?.type === 'intern-chaos'
      const nextPoolSize = isNextInternChaos ? POOL_SIZE_INTERN : POOL_SIZE

      let nextPool = nextTopic
        ? shuffled([...nextTopic.elementIds]).slice(0, nextPoolSize)
        : shuffled(elements.map((e) => e.id)).slice(0, nextPoolSize)
      nextPool = fillPoolToSize(nextPool, nextPoolSize)

      nextPool = ensureRareInPool(nextPool)
      nextPool = ensureComboInPool(nextPool, nextTopicId)

      const { timeLeft: nextTimeLeftBase, targetScore: nextTargetScore } = applySurpriseToPhase(nextBrief ?? null, nextPhase)
      let nextTimeLeft = nextTimeLeftBase
      // Pity: após PITY_AFTER_LOSSES derrotas de fase, bônus na próxima fase
      if (newConsecutiveLosses >= PITY_AFTER_LOSSES) {
        const rareElements = elements.filter(el =>
          (el.rarity === 'rare' || el.rarity === 'epic') && !nextPool.includes(el.id)
        )
        if (rareElements.length > 0) {
          const bonusRare = rareElements[Math.floor(Math.random() * rareElements.length)]
          const commonIndex = nextPool.findIndex(id => getElementById(id)?.rarity === 'common')
          if (commonIndex !== -1 && bonusRare) {
            nextPool[commonIndex] = bonusRare.id
          }
        }
        nextTimeLeft += 5
      }

      set({
        accumulatedScore: newAcc,
        phase: nextPhase,
        currentTopicId: nextTopicId,
        currentBrief: nextBrief ?? null,
        surpriseSatisfied,
        selectedIds: [],
        poolOrder: nextPool,
        timeLeft: nextTimeLeft,
        targetScore: nextTargetScore,
        availablePowerUp: null,
        rerollsLeft: 1,
        consecutiveLosses: newConsecutiveLosses,
        timerFrozenUntil: 0,
        vipUntil: 0,
        revealRarityUntil: 0,
        powerUpSwapCardActive: false,
        phaseCardMultiplier: isNextInternChaos ? 3 : 1,
        nextCardMultiplier: 1,
        multiplierForCard: {},
        phaseTimerStarted: false,
      })
    } else {
      const hadPremium = get().hadPremiumBriefInGame || !!(currentBrief?.premium)
      const hadSuper = get().hadSuperPremiumBriefInGame || !!(currentBrief?.superPremium)
      set({ gameEndSnapshot: { totalCombosInGame: newTotalCombos, topicIds: newTopicIds, hadPremiumBrief: hadPremium, hadSuperPremiumBrief: hadSuper } })
      const won = newAcc >= TARGET_SCORE[4]
      set({
        status: 'finished',
        timeLeft: 0,
        finalScore: newAcc,
        highScore: Math.max(highScore, newAcc),
        gamesPlayed: gamesPlayed + 1,
        surpriseSatisfied,
        consecutiveLosses: won ? 0 : consecutiveLosses + 1,
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
      rerollsLeft: 1,
      timerFrozenUntil: 0,
      vipUntil: 0,
      revealRarityUntil: 0,
      powerUpSwapCardActive: false,
      phaseCardMultiplier: 1,
      nextCardMultiplier: 1,
      multiplierForCard: {},
      phaseTimerStarted: false,
      hadPremiumBriefInGame: false,
      hadSuperPremiumBriefInGame: false,
    })
  },

  consumePowerUp(id: string) {
    const { availablePowerUp, timeLeft, setTimeLeft } = get()
    if (!availablePowerUp || availablePowerUp.id !== id) return
    const updates: Partial<GameState> = { availablePowerUp: null }
    if (id === 'time-extra' && availablePowerUp.duration) setTimeLeft(timeLeft + availablePowerUp.duration)
    if (id === 'freeze-time' && availablePowerUp.duration)
      updates.timerFrozenUntil = Date.now() + availablePowerUp.duration * 1000
    if (id === 'multiplier-3x') updates.nextCardMultiplier = 3
    if (id === 'reveal-rarity' && availablePowerUp.duration)
      updates.revealRarityUntil = Date.now() + availablePowerUp.duration * 1000
    if (id === 'swap-card') {
      const { selectedIds } = get()
      updates.powerUpSwapCardActive = selectedIds.length > 0
    }
    set(updates)
  },

  getTotalScore(el) {
    const { selectedIds, eventMultiplier, currentTopicId, multiplierForCard, vipUntil, phaseCardMultiplier } = get()
    const base = selectedIds.reduce(
      (sum, id) => sum + (el.find((e) => e.id === id)?.points ?? 0) * (multiplierForCard[id] ?? 1),
      0
    )
    const bonus = getComboBonus(selectedIds, currentTopicId)
    let total = (base + bonus) * eventMultiplier * phaseCardMultiplier
    if (vipUntil > 0 && Date.now() < vipUntil) total *= 2
    return total
  },

  getPhaseName(p) {
    return PHASE_NAMES[p]
  },

  // NOVO: Retorna IDs de elementos que formam combo com o elemento dado
  getCompatibleCombos(elementId: string) {
    const { currentTopicId, poolOrder } = get()
    const compatibleIds: string[] = []
    
    const topicCombos = combos.filter(c => c.topicId === currentTopicId || !c.topicId)
    
    topicCombos.forEach(combo => {
      if (combo.elementIds.includes(elementId)) {
        // Adicionar outros elementos do combo que estão no pool
        combo.elementIds.forEach(id => {
          if (id !== elementId && poolOrder.includes(id) && !compatibleIds.includes(id)) {
            compatibleIds.push(id)
          }
        })
      }
    })
    
    return compatibleIds
  },
}))
