import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { elements, getElementById } from '../data/elements'
import { getTopicById } from '../data/topics'
import { getCombosForElements } from '../data/combos'
import { getClientReaction } from '../data/clientReactions'
import { useGameStore } from '../stores/gameStore'
import { useProgressionStore } from '../stores/progressionStore'
import { useSettingsStore } from '../stores/settingsStore'
import {
  Element,
  CompositionZone,
  Timer,
  ScoreDisplay,
  ComboPreview3D,
} from '../components/game'
import { Button, Modal, Input, ProgressBar } from '../components/ui'
import ResultScreen from './ResultScreen'

const COMPOSITION_ZONE_ID = 'composition-zone'

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
  const phase = useGameStore((s) => s.phase)
  const accumulatedScore = useGameStore((s) => s.accumulatedScore)
  const availablePowerUp = useGameStore((s) => s.availablePowerUp)
  const consumePowerUp = useGameStore((s) => s.consumePowerUp)
  const getPhaseName = useGameStore((s) => s.getPhaseName)
  const currentTopicId = useGameStore((s) => s.currentTopicId)
  const currentBrief = useGameStore((s) => s.currentBrief)
  const reset = useGameStore((s) => s.reset)
  const startGame = useGameStore((s) => s.startGame)
  const noTimer = useSettingsStore((s) => s.noTimer)
  const level = useProgressionStore((s) => s.level)
  const xp = useProgressionStore((s) => s.xp)
  const xpToNextLevel = useProgressionStore((s) => s.xpToNextLevel)
  const getLevelName = useProgressionStore((s) => s.getLevelName)

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
  const activeElement = activeId ? getElementById(activeId) : null

  const pool = useMemo(() => {
    if (poolOrder.length > 0) {
      return poolOrder.map((id) => getElementById(id)).filter(Boolean) as typeof elements
    }
    return elements.slice(0, 18)
  }, [poolOrder])

  useEffect(() => {
    if (status === 'idle') startGame()
  }, [status, startGame])

  const prevStatusRef = useRef(status)
  useEffect(() => {
    if (prevStatusRef.current === 'playing' && status === 'finished') {
      const final = useGameStore.getState().finalScore
      useProgressionStore.getState().addXp(final)
    }
    prevStatusRef.current = status
  }, [status])

  useEffect(() => {
    if (status !== 'playing' || noTimer) return
    const t = setInterval(() => {
      const store = useGameStore.getState()
      const next = store.timeLeft - 1
      store.setTimeLeft(next)
      if (next <= 0) store.endPhase()
    }, 1000)
    return () => clearInterval(t)
  }, [status, noTimer])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const handleDragStart = useCallback((e: DragStartEvent) => setActiveId(e.active.id as string), [])
  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveId(null)
      const id = e.active.id as string
      if (e.over?.id === COMPOSITION_ZONE_ID) {
        const el = getElementById(id)
        if (el && !selectedIds.includes(id)) addElement(id, el)
      }
    },
    [selectedIds, addElement]
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
          <Modal isOpen={!!leadModal} onClose={() => setLeadModal(null)} title={leadModal === 'save' ? 'Salvar Progresso' : leadModal === 'nft' ? 'Receber NFT' : 'Consultoria Grátis'}>
            <div className="space-y-4">
              <Input label="Nome" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Seu nome" fullWidth />
              <Input label="Email" type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="email@exemplo.com" fullWidth />
              <Button variant="primary" fullWidth onClick={() => { setLeadModal(null); setLeadName(''); setLeadEmail('') }}>Enviar</Button>
            </div>
          </Modal>
        )}
      </>
    )
  }

  const handleBackToSite = () => {
    // Sair do iframe e voltar ao site
    window.top?.location.assign('/pt/experience-preview')
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #0f0f12 0%, #1a1a2e 100%)' }}>
        {/* Header Premium */}
        <header 
          className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10"
          style={{ background: 'rgba(15, 15, 18, 0.95)', backdropFilter: 'blur(12px)' }}
        >
          <button
            onClick={handleBackToSite}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
            style={{ color: '#d3cec3', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span>←</span>
            <span className="hidden sm:inline">Voltar ao Site</span>
          </button>
          
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                style={{ color: '#9ca3af' }}
              >
                Menu do Jogo
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">

          {currentBrief && currentTopic && (
            <section className="glass-card rounded-2xl border border-white/10 p-5 space-y-3" aria-labelledby="brief-title">
              <h2 id="brief-title" className="font-display text-xs font-semibold uppercase tracking-wider text-azimut-red">
                Brief · {currentTopic.name}
              </h2>
              <p className="font-body text-[var(--text-primary)] font-medium">{currentBrief.objective}</p>
              {currentBrief.surprise && (
                <p className="font-body text-sm text-purple-epic">
                  Surpresa: {currentBrief.surprise.description}
                </p>
              )}
            </section>
          )}

          <header className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="font-display text-2xl font-bold text-azimut-red">
                Fase {phase}/4: {getPhaseName(phase)}
              </h1>
              <div className="flex gap-6 flex-wrap">
                <Timer seconds={timeLeft} label="Tempo" variant={timeLeft <= 5 ? 'danger' : timeLeft <= 10 ? 'warning' : 'default'} />
                <ScoreDisplay score={totalScore} label="Pontos de conexão" />
                <div className="font-body text-sm text-[var(--text-tertiary)]">
                  Meta: <span className="font-data font-bold text-gold-main">{targetScore} pts</span>
                </div>
                {eventMultiplier > 1 && (
                  <span className="px-2 py-1 rounded-lg bg-gold-main/20 text-gold-main text-xs font-data font-bold">GOLDEN HOUR 2×</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] whitespace-nowrap">
                {getLevelName()} (Nível {level})
              </span>
              <ProgressBar value={xp} max={xpToNextLevel} variant="gold" size="sm" className="flex-1 max-w-[200px]" />
              <span className="font-data text-xs text-[var(--text-tertiary)] tabular-nums">{xp}/{xpToNextLevel} XP</span>
            </div>
          </header>

          {combos.length > 0 && (
            <section aria-label="Combos ativos">
              <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Combos ativos ({combos.length})</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {combos.map((c) => (
                  <span key={c.id} className="px-3 py-1 rounded-lg bg-purple-epic/20 text-purple-epic text-sm font-body">
                    🔥 {c.name} +{c.bonusPoints}
                  </span>
                ))}
              </div>
              <ComboPreview3D combo={combos[0] ?? null} className="mt-2" />
            </section>
          )}

          {availablePowerUp && (
            <section className="rounded-xl border-2 border-gold-main/50 bg-gold-main/10 p-4 flex flex-wrap items-center justify-between gap-3 glass-card">
              <div>
                <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-gold-main mb-1">Power-up disponível</h3>
                <p className="font-body text-[var(--text-primary)] font-medium">{availablePowerUp.name}</p>
                <p className="font-body text-sm text-[var(--text-tertiary)]">{availablePowerUp.effect}</p>
              </div>
              <Button variant="primary" size="sm" onClick={() => consumePowerUp(availablePowerUp.id)}>Usar</Button>
            </section>
          )}

          <section className="rounded-xl border border-white/10 bg-bg-dark/50 p-4 font-body" aria-live="polite" aria-atomic="true">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">O cliente reage</h3>
            <p className="text-[var(--text-secondary)]">{clientReaction}</p>
          </section>

          <CompositionZone id={COMPOSITION_ZONE_ID} selected={selected} combos={combos} onRemove={removeElement} />

          <p className="font-body text-sm text-[var(--text-tertiary)] italic">
            💡 Não existe escolha errada. Cada tecnologia conecta de um jeito.
          </p>

          <section>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">Tecnologias disponíveis</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {pool.map((el) => (
                <Element key={el.id} element={el} disabled={selectedIds.includes(el.id)} />
              ))}
            </div>
          </section>
        </div>
        </div>
      </div>

      <DragOverlay>
        {activeElement ? (
          <div className="rounded-xl border-2 border-azimut-red bg-bg-dark p-4 shadow-[0_0_24px_rgba(201,35,55,0.35)] opacity-95 font-body">
            <div className="font-display font-bold text-sm uppercase text-[var(--text-primary)]">{activeElement.name}</div>
            <div className="text-xs text-[var(--text-tertiary)]">{activeElement.category}</div>
            <div className="text-xs font-data font-semibold text-gold-main mt-2">+{activeElement.points} pts</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
