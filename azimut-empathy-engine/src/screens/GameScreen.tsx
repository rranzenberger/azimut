import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { elements, getElementById } from '../data/elements'
import { getTopicById } from '../data/topics'
import { getCombosForElements, getComboPartnersForElement } from '../data/combos'
import { getClientReaction } from '../data/clientReactions'
import { useGameStore, type GameStatus } from '../stores/gameStore'
import { useProgressionStore } from '../stores/progressionStore'
import { useSettingsStore } from '../stores/settingsStore'
import { useAchievementsStore } from '../stores/achievementsStore'
import {
  Element,
  CompositionZone,
  Timer,
  ScoreDisplay,
  ComboPreview3D,
  TopicIcon,
  MAPLE_LEAF_ICON,
  MotivationalCard,
} from '../components/game'
import { pickMotivationalPhrase } from '../data/motivationalPhrases'
import type { MotivationalSituation } from '../data/motivationalPhrases'
import { getGameLang, getGameTranslations, getCommonTranslations, getTopicName, getDisplayTitle, getDisplayObjective } from '../i18n'
import { playSound } from '../utils/sound'
import { trackGameEvent } from '../utils/analytics'
import { submitGameLead } from '../utils/leads'
import { Button, Modal, Input, ProgressBar, Toast, GameHeader } from '../components/ui'
import ResultScreen from './ResultScreen'

const COMPOSITION_ZONE_ID = 'composition-zone'

// Ícones e cores: usar currentTopic?.icon/color quando existir (Topic), senão fallback
const topicIcons: Record<string, string> = {
  'xr-vr': '🥽',
  'producao-audiovisual': '🎬',
  'eventos-corporativos': '🎪',
  'cultura-museus': '🏛️',
  'estudar-canada': MAPLE_LEAF_ICON,
  'tecnologia-consultoria': '⚡',
}

const topicColors: Record<string, string> = {
  'xr-vr': '#00F5FF',
  'producao-audiovisual': '#A855F7',
  'eventos-corporativos': '#F97316',
  'cultura-museus': '#3B82F6',
  'estudar-canada': '#EB2D37', // Vermelho oficial Canadá (FIP)
  'tecnologia-consultoria': '#FFD700',
}

export interface GameScreenProps {
  onLeaderboard?: () => void
  onBack?: () => void
}

export default function GameScreen({ onLeaderboard, onBack }: GameScreenProps) {
  const status = useGameStore((s) => s.status)
  const selectedIds = useGameStore((s) => s.selectedIds)
  const poolOrder = useGameStore((s) => s.poolOrder)
  const addElement = useGameStore((s) => s.addElement)
  const removeElement = useGameStore((s) => s.removeElement)
  const getTotalScore = useGameStore((s) => s.getTotalScore)
  const timeLeft = useGameStore((s) => s.timeLeft)
  const targetScore = useGameStore((s) => s.targetScore)
  const eventMultiplier = useGameStore((s) => s.eventMultiplier)
  const vipUntil = useGameStore((s) => s.vipUntil)
  const phaseCardMultiplier = useGameStore((s) => s.phaseCardMultiplier)
  const phase = useGameStore((s) => s.phase)
  const accumulatedScore = useGameStore((s) => s.accumulatedScore)
  const availablePowerUp = useGameStore((s) => s.availablePowerUp)
  const consumePowerUp = useGameStore((s) => s.consumePowerUp)
  const getPhaseName = useGameStore((s) => s.getPhaseName)
  const currentTopicId = useGameStore((s) => s.currentTopicId)
  const currentBrief = useGameStore((s) => s.currentBrief)
  const rerollsLeft = useGameStore((s) => s.rerollsLeft)
  const rerollPool = useGameStore((s) => s.rerollPool)
  const powerUpSwapCardActive = useGameStore((s) => s.powerUpSwapCardActive)
  const clearSwapCardMode = useGameStore((s) => s.clearSwapCardMode)
  const reset = useGameStore((s) => s.reset)
  const startGame = useGameStore((s) => s.startGame)
  const phaseTimerStarted = useGameStore((s) => s.phaseTimerStarted)
  const startPhaseTimer = useGameStore((s) => s.startPhaseTimer)
  const noTimer = useSettingsStore((s) => s.noTimer)
  const level = useProgressionStore((s) => s.level)
  const xp = useProgressionStore((s) => s.xp)
  const xpToNextLevel = useProgressionStore((s) => s.xpToNextLevel)
  const getLevelName = useProgressionStore((s) => s.getLevelName)

  const lang = getGameLang()
  const gameT = getGameTranslations(lang)
  const common = getCommonTranslations(lang)

  const selected = selectedIds.map((id) => getElementById(id)).filter(Boolean) as typeof elements
  const phaseScore = getTotalScore(elements)
  const totalScore = accumulatedScore + phaseScore
  const combos = getCombosForElements(selectedIds, currentTopicId)
  const clientReaction = getClientReaction(selectedIds, currentTopicId)
  const currentTopic = currentTopicId ? getTopicById(currentTopicId) : null

  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [leadModal, setLeadModal] = React.useState<'save' | 'nft' | 'consultoria' | null>(null)
  const [leadName, setLeadName] = React.useState('')
  const [leadEmail, setLeadEmail] = React.useState('')
  const [showSurpriseIntroModal, setShowSurpriseIntroModal] = React.useState(false)
  const [comboToast, setComboToast] = React.useState<{ message: string; visible: boolean }>({ message: '', visible: false })
  const [showDropErrorGlow, setShowDropErrorGlow] = React.useState(false)
  const [errorToast, setErrorToast] = React.useState<{ message: string; visible: boolean }>({ message: '', visible: false })
  const [motivationalPhrase, setMotivationalPhrase] = React.useState<ReturnType<typeof pickMotivationalPhrase> | null>(null)
  const [motivationalVisible, setMotivationalVisible] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const motivationalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastMotivationalPhaseRef = useRef<number>(0)
  const surpriseShownForPhaseRef = useRef<number>(-1)
  const prevComboCountRef = useRef(0)
  const activeElement = activeId ? getElementById(activeId) : null
  const comboPartnerIds = useMemo(
    () => (activeId ? getComboPartnersForElement(activeId, currentTopicId) : []),
    [activeId, currentTopicId]
  )

  // Cor e ícone do tópico (Topic do data ou fallback)
  const topicColor = currentTopic?.color ?? (currentTopicId ? topicColors[currentTopicId] : '#A855F7') ?? '#A855F7'
  const topicIcon = currentTopic?.icon ?? (currentTopicId ? topicIcons[currentTopicId] : '🎯') ?? '🎯'

  // Progresso para a meta (cores: longe / meio / perto / atingido)
  const progressPercent = Math.min((totalScore / targetScore) * 100, 100)
  const isFar = progressPercent < 50
  const isNearGoal = progressPercent >= 80
  const isGoalReached = progressPercent >= 100

  // Mensagem dinâmica no card Quest (feedback, incentivo, contagem)
  const questFeedbackMessage = (() => {
    if (isGoalReached) return { text: gameT.goalReached, icon: '🎉', color: '#22C55E' }
    if (timeLeft <= 5) return { text: gameT.fewSecondsLeft, icon: '⏱', color: '#EF4444' }
    if (timeLeft <= 15) return { text: `${gameT.secondsLeft} ${timeLeft}`, icon: '⏱', color: '#F97316' }
    if (combos.length > 0) return { text: gameT.comboActivated, icon: '✨', color: '#A855F7' }
    if (isNearGoal) return { text: gameT.almostThere, icon: '🔥', color: '#FFD700' }
    if (progressPercent >= 50) return { text: gameT.goingWell, icon: '👍', color: '#3B82F6' }
    if (progressPercent >= 25) return { text: gameT.keepGoing, icon: '🎯', color: topicColor }
    return { text: isMobile ? gameT.dragCardsMobile : gameT.dragCards, icon: '🎴', color: '#9CA3AF' }
  })()

  const pool = useMemo(() => {
    if (poolOrder.length > 0) {
      return poolOrder.map((id) => getElementById(id)).filter(Boolean) as typeof elements
    }
    return elements.slice(0, 24)
  }, [poolOrder])

  useEffect(() => {
    if (status === 'idle') {
      surpriseShownForPhaseRef.current = -1
      startGame()
    }
  }, [status, startGame])

  // Modal de surpresa ao iniciar a fase (uma vez por fase)
  useEffect(() => {
    if (status !== 'playing' || !currentBrief?.surprise) return
    if (surpriseShownForPhaseRef.current !== phase) {
      surpriseShownForPhaseRef.current = phase
      setShowSurpriseIntroModal(true)
    }
  }, [status, phase, currentBrief?.surprise, currentBrief?.id])

  const showMotivational = useCallback((situation?: MotivationalSituation, durationMs = 8000) => {
    if (motivationalTimeoutRef.current) clearTimeout(motivationalTimeoutRef.current)
    setMotivationalPhrase(pickMotivationalPhrase(situation))
    setMotivationalVisible(true)
    motivationalTimeoutRef.current = setTimeout(() => {
      setMotivationalVisible(false)
      motivationalTimeoutRef.current = null
    }, durationMs)
  }, [])

  // Toast de combo ativado + card motivacional (reforço ego)
  useEffect(() => {
    if (status !== 'playing') return
    if (selectedIds.length === 0) {
      prevComboCountRef.current = 0
      return
    }
    const currentCombos = getCombosForElements(selectedIds, currentTopicId)
    if (currentCombos.length > prevComboCountRef.current) {
      const newCombos = currentCombos.slice(prevComboCountRef.current)
      const c = newCombos[0]
      if (c) {
        playSound('combo')
        setComboToast({ message: gameT.comboToast.replace('{name}', c.name).replace('{pts}', String(c.bonusPoints)), visible: true })
        setTimeout(() => showMotivational('combo', 7000), 800)
      }
      prevComboCountRef.current = currentCombos.length
    }
  }, [status, selectedIds, currentTopicId, showMotivational])

  // Card motivacional ao iniciar fase (uma vez por fase)
  useEffect(() => {
    if (status !== 'playing' || !phaseTimerStarted) return
    if (lastMotivationalPhaseRef.current === phase) return
    lastMotivationalPhaseRef.current = phase
    showMotivational('phase_start', 8000)
  }, [status, phase, phaseTimerStarted, showMotivational])

  // Card motivacional periódico: incentivo / ego / Azimut (a cada ~30s)
  useEffect(() => {
    if (status !== 'playing') return
    const situations = ['general', 'ego', 'azimut'] as const
    const interval = setInterval(() => {
      const situation = situations[Math.floor(Math.random() * situations.length)]
      showMotivational(situation, 9000)
    }, 32000)
    return () => clearInterval(interval)
  }, [status, showMotivational])

  useEffect(() => () => {
    if (motivationalTimeoutRef.current) clearTimeout(motivationalTimeoutRef.current)
  }, [])

  const prevStatusRef = useRef<GameStatus>(status)
  useEffect(() => {
    if (prevStatusRef.current === 'playing' && status === 'finished') {
      const final = useGameStore.getState().finalScore
      useProgressionStore.getState().addXp(final)
      trackGameEvent('game_finish', { score: final })
    }
    if (status === 'playing' && prevStatusRef.current === 'idle') trackGameEvent('game_start')
    prevStatusRef.current = status
  }, [status])

  // Analytics: premium_quest_played / super_premium_quest_played quando a fase inicia com esse brief
  useEffect(() => {
    if (status !== 'playing' || !phaseTimerStarted || !currentBrief) return
    if (currentBrief.superPremium) trackGameEvent('super_premium_quest_played', { briefId: currentBrief.id })
    else if (currentBrief.premium) trackGameEvent('premium_quest_played', { briefId: currentBrief.id })
  }, [status, phaseTimerStarted, currentBrief?.id, currentBrief?.premium, currentBrief?.superPremium])

  // Conquistas: verificar ao fim da fase e ao fim do jogo
  const lastPhaseEndSnapshot = useGameStore((s) => s.lastPhaseEndSnapshot)
  const gameEndSnapshot = useGameStore((s) => s.gameEndSnapshot)
  const clearPhaseEndSnapshot = useGameStore((s) => s.clearPhaseEndSnapshot)
  const clearGameEndSnapshot = useGameStore((s) => s.clearGameEndSnapshot)
  useEffect(() => {
    if (lastPhaseEndSnapshot) {
      if (lastPhaseEndSnapshot.score >= lastPhaseEndSnapshot.targetScore) playSound('goal')
      useAchievementsStore.getState().checkPhaseEnd(lastPhaseEndSnapshot)
      clearPhaseEndSnapshot()
    }
  }, [lastPhaseEndSnapshot, clearPhaseEndSnapshot])
  useEffect(() => {
    if (status === 'finished' && gameEndSnapshot) {
      useAchievementsStore.getState().checkGameEnd(gameEndSnapshot)
      // Salvar no leaderboard (por tópico)
      try {
        const key = 'azimut-leaderboard'
        const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null
        const list: { name: string; score: number; topicIds?: string[]; date?: number }[] = raw ? JSON.parse(raw) : []
        const finalScore = useGameStore.getState().finalScore
        list.push({ name: getCommonTranslations(getGameLang()).anonymous, score: finalScore, topicIds: gameEndSnapshot.topicIds, date: Date.now() })
        list.sort((a, b) => b.score - a.score)
        if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(list.slice(0, 100)))
      } catch (_) {}
      clearGameEndSnapshot()
    }
  }, [status, gameEndSnapshot, clearGameEndSnapshot])

  useEffect(() => {
    if (status !== 'playing' || noTimer || !phaseTimerStarted) return
    const t = setInterval(() => {
      const store = useGameStore.getState()
      const now = Date.now()
      if (store.timerFrozenUntil > now) return // Congelar Tempo ativo
      if (store.timerFrozenUntil > 0 && store.timerFrozenUntil <= now) store.clearTimerFrozen()
      const next = store.timeLeft - 1
      store.setTimeLeft(next)
      if (next <= 0) store.endPhase()
    }, 1000)
    return () => clearInterval(t)
  }, [status, noTimer, phaseTimerStarted])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  )
  const handleTapAdd = useCallback(
    (id: string) => {
      const el = getElementById(id)
      if (el && !selectedIds.includes(id)) addElement(id, el)
    },
    [selectedIds, addElement]
  )
  const handleDragStart = useCallback((e: DragStartEvent) => setActiveId(e.active.id as string), [])
  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveId(null)
      const id = e.active.id as string
      const el = getElementById(id)
      if (e.over?.id === COMPOSITION_ZONE_ID) {
        if (el && !selectedIds.includes(id)) {
          addElement(id, el)
          playSound('drag')
        }
        return
      }
      // Soltou fora da zona: glow vermelho + alerta + card motivacional (toque leve)
      if (el) {
        setErrorToast({ message: gameT.dropError, visible: true })
        setShowDropErrorGlow(true)
        setTimeout(() => setShowDropErrorGlow(false), 1500)
        showMotivational('drop_error', 4000)
      }
    },
    [selectedIds, addElement, showMotivational]
  )

  if (status === 'finished') {
    return (
      <>
        <ResultScreen
          onSaveProgress={() => setLeadModal('save')}
          onReceiveNFT={() => setLeadModal('nft')}
          onConsultoria={() => setLeadModal('consultoria')}
          onPlayAgain={() => { reset(); startGame() }}
          onLeaderboard={onLeaderboard}
        />
        {leadModal && (
          <Modal isOpen={!!leadModal} onClose={() => setLeadModal(null)} title={leadModal === 'save' ? gameT.leadModalSave : leadModal === 'nft' ? gameT.leadModalNft : gameT.leadModalConsulting}>
            <div className="space-y-4">
              <Input label={gameT.inputNameLabel} value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder={gameT.inputNamePlaceholder} fullWidth />
              <Input label={gameT.inputEmailLabel} type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder={gameT.inputEmailPlaceholder} fullWidth />
              <Button
                variant="primary"
                fullWidth
                onClick={async () => {
                  const type = leadModal === 'nft' ? 'nft' as const : leadModal === 'consultoria' ? 'consulting' as const : 'save' as const
                  trackGameEvent(leadModal === 'nft' ? 'lead_nft' : 'lead_save')
                  const result = await submitGameLead({ name: leadName, email: leadEmail, type, lang })
                  setLeadModal(null)
                  setLeadName('')
                  setLeadEmail('')
                  if (!result.success && result.error) {
                    setErrorToast({ message: result.error, visible: true })
                    setTimeout(() => setErrorToast((t) => ({ ...t, visible: false })), 4000)
                  }
                }}
              >
                {gameT.submitButton}
              </Button>
            </div>
          </Modal>
        )}
      </>
    )
  }

  const handleBackToSite = () => {
    const currentLang = getGameLang()
    window.top?.location.assign(`/${currentLang}/experience-preview`)
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="game-bg h-screen flex flex-col overflow-hidden">
        {/* Header padrão: logo Azimut à esquerda + título + Menu */}
        <GameHeader
          leftAction={
            <button
              onClick={handleBackToSite}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all"
              style={{ 
                color: '#9CA3AF', 
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(232, 72, 88, 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(232, 72, 88, 0.12)'
                e.currentTarget.style.borderColor = 'rgba(232, 72, 88, 0.7)'
                e.currentTarget.style.color = '#E84858'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(232, 72, 88, 0.5)'
                e.currentTarget.style.color = '#9CA3AF'
              }}
            >
              <span>←</span>
              <span className="hidden sm:inline">{gameT.back}</span>
            </button>
          }
          title={
            <button
              type="button"
              className="hidden sm:block cursor-default border-0 bg-transparent p-0 font-inherit"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: topicColor,
                textShadow: `0 0 24px ${topicColor}60`,
              }}
              onClick={() => {
                const next = titleTapCount + 1
                setTitleTapCount(next)
                if (next >= 7) {
                  useAchievementsStore.getState().unlock('explorador')
                  setEasterEggToast({ message: gameT.easterEggExplorer, visible: true })
                  setTitleTapCount(0)
                }
              }}
              aria-label="EMPATHY ENGINE"
            >
              EMPATHY ENGINE
            </button>
          }
          rightAction={onBack ? (
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-1.5 px-2 py-2 min-w-[40px] min-[380px]:px-3 min-[380px]:min-w-0 rounded-lg text-sm font-medium transition-all shrink-0"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#9CA3AF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
              aria-label={gameT.menuLabel}
            >
              <span className="text-base leading-none min-[380px]:hidden" aria-hidden>☰</span>
              <span className="hidden min-[380px]:inline">{gameT.menuLabel}</span>
            </button>
          ) : undefined}
          accentColor={`${topicColor}20`}
        />

        {/* Tela Quest — compacta no mobile, sem scroll; igual ao layout da imagem */}
        {status === 'playing' && !phaseTimerStarted && currentBrief && currentTopic && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            <div className="card-glow-home-quest w-full max-w-3xl rounded-xl sm:rounded-2xl overflow-hidden flex flex-col mx-1 max-h-[100dvh] flex flex-col" style={currentBrief.superPremium ? { boxShadow: '0 0 40px rgba(255,165,0,0.15)' } : undefined}>
              <div className="card-glow-home-inner rounded-xl sm:rounded-2xl flex flex-col overflow-hidden min-h-0 flex-1 flex flex-col">
                <div style={{ height: 4, background: currentBrief.superPremium ? 'linear-gradient(90deg, rgba(255,165,0,0.9) 0%, rgba(255,140,0,0.6) 50%, rgba(255,215,0,0.6) 50%, rgba(255,165,0,0.9) 100%)' : 'linear-gradient(90deg, rgba(168, 85, 247, 0.9) 0%, rgba(168, 85, 247, 0.5) 50%, rgba(57, 255, 20, 0.5) 50%, rgba(57, 255, 20, 0.9) 100%)' }} />
                <div className="flex flex-col gap-3 sm:gap-5 p-4 sm:p-8 flex-1 min-h-0 overflow-y-auto">
                  {/* Cabeçalho — uma linha compacta */}
                  <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center" style={{ background: `${topicColor}25`, border: `2px solid ${topicColor}50` }}>
                      <TopicIcon icon={topicIcon} size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-extrabold uppercase text-xs sm:text-base" style={{ letterSpacing: '0.08em', color: topicColor }}>🎯 {gameT.yourQuest} {phase}/4</span>
                        {currentBrief.premium && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold shrink-0" style={{ color: currentBrief.superPremium ? '#FFA500' : '#FFD700', border: `1px solid ${currentBrief.superPremium ? 'rgba(255, 165, 0, 0.6)' : 'rgba(255, 215, 0, 0.5)'}`, background: currentBrief.superPremium ? 'rgba(255, 165, 0, 0.18)' : 'rgba(255, 215, 0, 0.12)', boxShadow: currentBrief.superPremium ? '0 0 16px rgba(255, 165, 0, 0.4)' : '0 0 12px rgba(255, 215, 0, 0.25)' }}>{currentBrief.superPremium ? gameT.superPremiumBadge : gameT.premiumBadge}</span>
                        )}
                      </div>
                      <div className="font-display font-extrabold text-white uppercase text-base sm:text-xl leading-tight line-clamp-2 mt-0.5" style={{ letterSpacing: '0.04em' }}>{currentBrief.premium ? getDisplayTitle(lang, currentBrief.id, currentBrief.title) : getTopicName(lang, currentTopicId ?? '')}</div>
                    </div>
                  </div>

                  {/* Objetivo · Bônus · Como jogar — cards compactos; super-premium = âmbar/laranja */}
                  <div className="flex flex-col gap-3 sm:gap-5 rounded-lg sm:rounded-xl p-3 sm:p-6 flex-1 min-h-0" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="rounded-lg sm:rounded-xl px-3 py-2.5 sm:px-5 sm:py-4 flex-shrink-0" style={{ background: currentBrief.superPremium ? 'rgba(255,165,0,0.12)' : 'rgba(255,215,0,0.08)', borderLeft: `4px solid ${currentBrief.superPremium ? '#FFA500' : '#FFD700'}` }}>
                      <div className="font-display font-extrabold uppercase text-xs sm:text-base mb-1 sm:mb-2" style={{ letterSpacing: '0.05em', color: currentBrief.superPremium ? '#FFA500' : '#FFD700' }}>📋 {gameT.objective}</div>
                      <p className="text-[#E5E7EB] text-xs sm:text-base leading-snug m-0 line-clamp-3 sm:line-clamp-none">{getDisplayObjective(lang, currentBrief.id, currentBrief.objective)}</p>
                    </div>
                    {currentBrief.surprise && (
                      <div className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl px-3 py-2 sm:px-5 sm:py-4 flex-shrink-0" style={{ background: 'rgba(168,85,247,0.12)', borderLeft: '4px solid #A855F7' }}>
                        <span className="text-base sm:text-xl">✨</span>
                        <span className="text-[#D8B4FE] text-xs sm:text-base"><span className="font-bold text-[#C084FC]">{gameT.bonus}</span> {currentBrief.surprise.description}</span>
                      </div>
                    )}
                    <div className="rounded-lg sm:rounded-xl px-3 py-2.5 sm:px-5 sm:py-4 flex-shrink-0 border-l-4" style={{ background: 'rgba(57,255,20,0.06)', borderLeftColor: 'rgba(57,255,20,0.9)' }}>
                      <div className="font-display font-extrabold uppercase text-xs sm:text-base mb-1.5 sm:mb-2.5" style={{ color: '#39FF14' }}>🎮 {gameT.howToPlay}</div>
                      <ul className="text-[#D1D5DB] text-xs sm:text-base m-0 leading-snug space-y-0.5 sm:space-y-2 list-none pl-0">
                        <li>· {gameT.dragCards}</li>
                        <li>· {gameT.formCombos}</li>
                        <li>· {gameT.reachTarget}</li>
                      </ul>
                    </div>
                  </div>

                  <Button variant="primary" size="lg" fullWidth onClick={startPhaseTimer} className="text-sm sm:text-base py-2.5 sm:py-3.5 flex-shrink-0 mt-2 sm:mt-3">
                    {phase === 1 ? `▶ ${gameT.start}` : `${gameT.continuePhase} ${phase}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-0 p-2 sm:p-2 md:p-3 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto w-full px-0">
            {/* Sidebar Quest — compacta: cabe na tela, título em até 2 linhas, sem empurrar o resto */}
            {currentBrief && currentTopic && (
              <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-shrink-0 flex-col pr-2 min-h-0">
                <div className="card-glow-home rounded-xl overflow-hidden flex-1 flex flex-col min-h-0 ml-0" style={{ borderLeft: `4px solid ${currentBrief.superPremium ? '#FFA500' : topicColor}`, boxShadow: currentBrief.superPremium ? '0 0 24px rgba(255,165,0,0.1)' : undefined }}>
                  <div className="card-glow-home-inner rounded-xl flex-1 flex flex-col min-h-0 px-4 py-3">
                    <div style={{ height: 3, background: currentBrief.superPremium ? 'linear-gradient(90deg, #FFA500, rgba(255,165,0,0.7))' : `linear-gradient(90deg, ${topicColor}, ${topicColor}80)` }} />
                    {/* Lista superior: quest, o que fazer, surpresa, feedback/timer — altura limitada para não colar no card de incentivo */}
                    <div className="min-h-0 max-h-[40%] overflow-y-auto flex flex-col gap-2.5 pt-3 pb-2 flex-shrink-0">
                      <div className="flex items-start gap-2.5 flex-shrink-0">
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${topicColor}25`, border: `2px solid ${topicColor}50` }}>
                          <TopicIcon icon={topicIcon} size={26} />
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-display font-extrabold uppercase text-xs tracking-widest" style={{ color: topicColor }}>{gameT.briefQuestLabel}</span>
                            {currentBrief.premium && (
                              <span className="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-bold shrink-0" style={{ color: currentBrief.superPremium ? '#FFA500' : '#FFD700', border: `1px solid ${currentBrief.superPremium ? 'rgba(255, 165, 0, 0.6)' : 'rgba(255, 215, 0, 0.5)'}`, background: currentBrief.superPremium ? 'rgba(255, 165, 0, 0.18)' : 'rgba(255, 215, 0, 0.12)' }}>{currentBrief.superPremium ? gameT.superPremiumBadge : gameT.premiumBadge}</span>
                            )}
                          </div>
                          <div className="font-display font-extrabold text-white uppercase text-sm leading-tight mt-0.5 line-clamp-2 break-words" style={{ letterSpacing: '0.03em', wordBreak: 'break-word', overflowWrap: 'break-word' }}>{currentBrief.premium ? getDisplayTitle(lang, currentBrief.id, currentBrief.title) : getTopicName(lang, currentTopicId ?? '')}</div>
                          <div className="text-xs mt-1" style={{ color: topicColor }}>{gameT.phase} {phase}/4 · {common.phaseNames[phase as 1 | 2 | 3 | 4]}</div>
                        </div>
                      </div>
                      <div className="rounded-lg px-3 py-2 flex-shrink-0" style={{ background: 'rgba(0,0,0,0.35)', borderLeft: `4px solid ${currentBrief.superPremium ? '#FFA500' : '#FFD700'}` }}>
                        <div className="font-display font-extrabold uppercase text-xs mb-1" style={{ color: currentBrief.superPremium ? '#FFA500' : '#FFD700' }}>{gameT.whatToDoLabel}</div>
                        <p className="text-[#E5E7EB] text-xs leading-snug m-0 break-words line-clamp-2" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{getDisplayObjective(lang, currentBrief.id, currentBrief.objective)}</p>
                      </div>
                      {currentBrief.surprise && (
                        <div className="flex items-center gap-2 rounded-lg px-3 py-2 flex-shrink-0" style={{ background: 'rgba(168,85,247,0.15)', borderLeft: '4px solid #A855F7' }}>
                          <span className="text-base">✨</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-[#C084FC] text-xs uppercase">{gameT.bonusSurpriseLabel}</div>
                            <div className="text-[#D8B4FE] text-xs leading-snug break-words line-clamp-2" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{currentBrief.surprise.description}</div>
                          </div>
                        </div>
                      )}
                      <div className="rounded-lg px-3 py-2 flex-shrink-0 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.06)', borderLeft: `4px solid ${questFeedbackMessage.color}` }}>
                        <span style={{ fontSize: 16 }}>{questFeedbackMessage.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-bold text-xs" style={{ color: questFeedbackMessage.color }}>{questFeedbackMessage.text}</div>
                          {phaseTimerStarted && (
                            <div className="text-xs mt-0.5" style={{ color: timeLeft <= 10 ? '#F97316' : '#9CA3AF' }}>⏱ {gameT.timeLeftShort} {timeLeft}s</div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Espaço acima do card de incentivo: separa do último card superior */}
                    <div className="flex-1 min-h-[2rem]" aria-hidden />
                    {/* Card de incentivo: sempre no meio da lateral — espaço igual por cima (lista) e por baixo (como jogar) */}
                    {motivationalVisible && motivationalPhrase && (
                      <div className="flex-shrink-0 rounded-lg px-4 py-6 text-center flex flex-col items-center justify-center min-h-[200px]" style={{ background: `linear-gradient(145deg, ${topicColor}18 0%, rgba(0,0,0,0.35) 100%)`, border: `1px solid ${topicColor}30` }}>
                        <span className="block text-5xl mb-4" aria-hidden>{motivationalPhrase.emoji}</span>
                        <p className="m-0 font-semibold text-white text-sm sm:text-base leading-snug px-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>{motivationalPhrase.text}</p>
                      </div>
                    )}
                    {/* Espaço abaixo do card de incentivo: empurra "Como jogar" para o fundo e mantém distância fixa */}
                    <div className="flex-1 min-h-[2rem]" aria-hidden />
                    {/* Como jogar sempre lá em baixo, fixo */}
                    <div className="rounded-lg px-3 py-2 flex-shrink-0 border-l-4 mt-2" style={{ background: 'rgba(255,255,255,0.04)', borderLeftColor: topicColor }}>
                      <div className="font-display font-extrabold uppercase text-xs mb-1" style={{ color: topicColor }}>🎮 {gameT.howToPlay}</div>
                      <ul className="text-[#D1D5DB] text-xs m-0 leading-snug space-y-0.5 list-none pl-0 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <li>· {isMobile ? gameT.dragCardsMobile : gameT.dragCards}</li>
                        <li>· {gameT.formCombos}</li>
                        <li>· {gameT.reachTarget}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </aside>
            )}
            <div className="flex-1 min-h-0 flex flex-col gap-2 min-w-0">

            {/* Nome do jogo acima do card de tópico — só mobile */}
            <div
              className="lg:hidden flex-shrink-0 text-center py-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: topicColor,
                textShadow: `0 0 20px ${topicColor}50`,
              }}
            >
              EMPATHY ENGINE
            </div>

            {/* Quest compacta no topo — só mobile */}
            {currentBrief && currentTopic && (
              <section className="lg:hidden card-glow-home rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
                <div className="card-glow-home-inner rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 flex flex-row items-center gap-2 sm:gap-3" style={{ background: currentBrief.premium ? (currentBrief.superPremium ? `linear-gradient(135deg, rgba(255,165,0,0.14) 0%, ${topicColor}08 50%, transparent 100%)` : `linear-gradient(135deg, rgba(255,215,0,0.08) 0%, ${topicColor}08 50%, transparent 100%)`) : `linear-gradient(135deg, ${topicColor}08 0%, transparent 100%)`, borderLeft: currentBrief.premium ? (currentBrief.superPremium ? '3px solid rgba(255,165,0,0.7)' : '3px solid rgba(255,215,0,0.6)') : undefined, boxShadow: currentBrief.superPremium ? '0 0 20px rgba(255,165,0,0.12)' : undefined }}>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${topicColor}25`, border: `2px solid ${topicColor}50` }}>
                    <TopicIcon icon={topicIcon} size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-display font-extrabold text-white uppercase text-xs sm:text-sm leading-tight line-clamp-2">{currentBrief.premium ? getDisplayTitle(lang, currentBrief.id, currentBrief.title) : getTopicName(lang, currentTopicId ?? '')}</span>
                      {currentBrief.premium && (
                        <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] sm:text-[10px] font-bold shrink-0" style={{ color: currentBrief.superPremium ? '#FFA500' : '#FFD700', border: `1px solid ${currentBrief.superPremium ? 'rgba(255, 165, 0, 0.6)' : 'rgba(255, 215, 0, 0.5)'}`, background: currentBrief.superPremium ? 'rgba(255, 165, 0, 0.18)' : 'rgba(255, 215, 0, 0.12)' }}>{currentBrief.superPremium ? gameT.superPremiumBadge : gameT.premiumBadge}</span>
                      )}
                    </div>
                    <div className="text-[#E5E7EB] text-[10px] sm:text-sm leading-tight line-clamp-2 mt-0.5">{getDisplayObjective(lang, currentBrief.id, currentBrief.objective)}</div>
                  </div>
                  <div className="text-xs sm:text-sm flex-shrink-0 font-bold" style={{ color: topicColor }}>{phase}/4</div>
                </div>
              </section>
            )}

            {/* Faixa de stats — compacta no mobile, wrap */}
            <div className="flex-shrink-0 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold bg-black/30 border border-white/10">
                {gameT.phase} <span style={{ color: topicColor }}>{phase}/4</span> · {getPhaseName(phase)}
              </span>
              <span className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold font-mono ${timeLeft <= 5 ? 'text-red-400' : timeLeft <= 10 ? 'text-amber-400' : ''}`}>
                ⏱ 0:{timeLeft.toString().padStart(2, '0')}
              </span>
              <span className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold text-amber-400">
                🎯 {totalScore}
              </span>
              <span className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold text-amber-400/90">
                {gameT.metaLabel} {targetScore}
              </span>
              <div className="flex-1 min-w-[60px] sm:min-w-[80px] max-w-[100px] sm:max-w-[120px] h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{
                  width: `${progressPercent}%`,
                  background: isGoalReached ? 'linear-gradient(90deg,#22C55E,#4ADE80)' : isNearGoal ? 'linear-gradient(90deg,#FFD700,#FFA500)' : `linear-gradient(90deg,${topicColor},${topicColor}80)`,
                }} />
              </div>
              <span className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs text-gray-400">
                {common.levelNames[level] ?? common.levelNames[1]} · {xp}/{xpToNextLevel} XP
              </span>
              {eventMultiplier > 1 && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold text-amber-400 border border-amber-400/40">⚡ 2×</span>
              )}
              {vipUntil > 0 && Date.now() < vipUntil && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold text-purple-400 border border-purple-400/40">VIP 2×</span>
              )}
              {phaseCardMultiplier > 1 && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold text-cyan-400 border border-cyan-400/40">3×</span>
              )}
            </div>

            {/* Combos — compacto no mobile */}
            {combos.length > 0 && (
              <div className="flex-shrink-0 flex flex-wrap items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg bg-purple-500/10 border border-purple-500/20">
                <span className="text-[10px] sm:text-xs font-bold text-purple-400">🔥 {gameT.combosLabel}</span>
                {combos.map((c) => (
                  <span key={c.id} className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold text-purple-300 bg-purple-500/20">
                    {c.name} <span className="text-amber-400">+{c.bonusPoints}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Power-up — compacto no mobile */}
            {availablePowerUp && (
              <div
                className="flex-shrink-0 flex items-center justify-between gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg bg-amber-500/10 border border-amber-500/30 touch-manipulation"
                title={availablePowerUp.tooltip ?? availablePowerUp.effect}
              >
                <span className="text-[10px] sm:text-xs font-bold text-amber-400 truncate min-w-0">⚡ {availablePowerUp.name}</span>
                <Button variant="primary" size="sm" className="py-1 px-2 text-[10px] sm:text-xs shrink-0" onClick={() => consumePowerUp(availablePowerUp.id)}>{gameT.useButton}</Button>
              </div>
            )}

            {/* Client Reaction — compacta no mobile */}
            <section className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg bg-black/30 border border-white/5" aria-live="polite" aria-atomic="true">
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase shrink-0">💬 {gameT.clientLabel}</span>
              <p className="text-[#B8B4A8] text-[10px] sm:text-xs sm:text-sm truncate m-0 flex-1 min-w-0">{clientReaction}</p>
            </section>

            {/* Área principal do jogo: zona de composição + cartas (área central como antes, sem painel enorme) */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
            <CompositionZone id={COMPOSITION_ZONE_ID} selected={selected} combos={combos} onRemove={removeElement} isSwapMode={powerUpSwapCardActive} onClearSwapMode={clearSwapCardMode} showDropError={showDropErrorGlow} translations={{ compositionZoneTitle: gameT.compositionZoneTitle, elementsLabel: gameT.elementsLabel, swapModeHint: gameT.swapModeHint, dropHereHint: gameT.dropHereHint, continueAddingHint: gameT.continueAddingHint, dragTechnologiesHint: isMobile ? gameT.dragTechnologiesHintMobile : gameT.dragTechnologiesHint, dragCards: isMobile ? gameT.dragCardsMobile : gameT.dragCards, returnToPoolAria: gameT.returnToPoolAria, removeAria: gameT.removeAria }} />

            <p className="flex-shrink-0 text-center py-0.5 sm:py-1 text-[10px] sm:text-[11px]" style={{ color: '#6B7280', fontStyle: 'italic' }}>
              💡 {gameT.noWrongChoiceHint}
            </p>

            {/* Card motivacional: overlay no mobile (centro); no desktop fica dentro da lateral da quest */}
            <div className="lg:hidden">
              <MotivationalCard phrase={motivationalPhrase} visible={motivationalVisible} accentColor={topicColor} variant="overlay" />
            </div>

            {/* Cards Grid — mobile: 2 colunas (toque maior), scroll interno */}
            <section className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
                <h2 className="font-display font-bold uppercase tracking-wider text-[10px] sm:text-xs text-gray-400 m-0 flex items-center gap-1 sm:gap-2">
                  <span>🎴</span> {gameT.technologiesAvailable} ({pool.length - selectedIds.length} {gameT.remaining})
                </h2>
                {rerollsLeft > 0 && (
                  <button
                    type="button"
                    onClick={() => rerollPool()}
                    className="touch-manipulation flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.08) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: '#C084FC',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.15) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.08) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    <span>🔄</span> {gameT.swapCards} ({rerollsLeft}x)
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 pb-2">
                {pool.map((el) => (
                  <Element
                    key={el.id}
                    element={el}
                    disabled={selectedIds.includes(el.id)}
                    highlightCombo={!!activeId && comboPartnerIds.includes(el.id)}
                    onTapAdd={isMobile ? handleTapAdd : undefined}
                  />
                ))}
              </div>
            </section>
            </div>
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeElement ? (
          <div
            style={{
              borderRadius: 12,
              padding: 16,
              background: `linear-gradient(145deg, ${topicColor}30 0%, ${topicColor}10 100%)`,
              border: `2px solid ${topicColor}`,
              boxShadow: `0 0 30px ${topicColor}50`,
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', color: '#fff' }}>
              {activeElement.name}
            </div>
            <div style={{ fontSize: 11, color: topicColor, marginTop: 4 }}>{activeElement.category}</div>
            <div style={{ fontFamily: 'var(--font-data)', fontSize: 12, fontWeight: 700, color: '#FFD700', marginTop: 8 }}>
              +{activeElement.points} {common.pts}
            </div>
          </div>
        ) : null}
      </DragOverlay>

      {/* Modal curto de surpresa ao iniciar a fase */}
      {currentBrief?.surprise && (
        <Modal
          isOpen={showSurpriseIntroModal}
          onClose={() => setShowSurpriseIntroModal(false)}
          title={currentBrief.surprise.description}
        >
          <p className="text-[var(--text-secondary)] mb-2">{currentBrief.surprise.description}</p>
          <p className="text-xs text-[var(--text-tertiary)] mb-4" style={{ fontStyle: 'italic' }}>
            {currentBrief.surprise.type === 'combo-required' && gameT.surpriseComboRequired}
            {currentBrief.surprise.type === 'time-reduced' && gameT.surpriseTimeReduced}
            {currentBrief.surprise.type === 'time-extra' && gameT.surpriseTimeExtra}
            {currentBrief.surprise.type === 'target-bonus' && gameT.surpriseTargetBonus}
            {currentBrief.surprise.type === 'client-vip' && gameT.surpriseClientVip}
            {currentBrief.surprise.type === 'intern-chaos' && gameT.surpriseInternChaos}
          </p>
          <Button variant="primary" fullWidth onClick={() => setShowSurpriseIntroModal(false)}>
            {gameT.goButton}
          </Button>
        </Modal>
      )}

      {/* Toast de erro (soltou fora da zona) */}
      <Toast
        message={errorToast.message}
        variant="error"
        visible={errorToast.visible}
        onClose={() => setErrorToast((p) => ({ ...p, visible: false }))}
        duration={2500}
      />
      {/* Toast de combo ativado */}
      <Toast
        message={comboToast.message}
        variant="success"
        visible={comboToast.visible}
        onClose={() => setComboToast((p) => ({ ...p, visible: false }))}
        duration={2500}
      />
      <Toast
        message={easterEggToast.message}
        variant="info"
        visible={easterEggToast.visible}
        onClose={() => setEasterEggToast((p) => ({ ...p, visible: false }))}
        duration={4000}
      />
    </DndContext>
  )
}
