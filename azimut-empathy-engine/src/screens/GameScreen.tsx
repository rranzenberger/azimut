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
      <div 
        className="min-h-screen flex flex-col"
        style={{ 
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(201, 35, 55, 0.06) 0%, transparent 50%),
            linear-gradient(180deg, #050508 0%, #0D0F14 50%, #050508 100%)
          `,
        }}
      >
        {/* Header Premium com Glass */}
        <header 
          className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3"
          style={{ 
            background: 'rgba(5, 5, 8, 0.85)', 
            backdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <button
            onClick={handleBackToSite}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ 
              color: '#B8B4A8', 
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)'
              e.currentTarget.style.color = '#C084FC'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#B8B4A8'
            }}
          >
            <span>←</span>
            <span className="hidden sm:inline">Voltar</span>
          </button>
          
          {/* Logo central */}
          <div style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 14, 
            fontWeight: 700,
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 50%, #22C55E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            EMPATHY ENGINE
          </div>
          
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: '#7A7770' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B4A8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#7A7770'}
              >
                Menu
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-5">

          {/* Brief Card Premium */}
          {currentBrief && currentTopic && (
            <section 
              className="brief-card"
              aria-labelledby="brief-title"
              style={{
                borderRadius: 16,
                padding: '20px 24px',
                background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.12) 0%, rgba(201, 35, 55, 0.03) 100%)',
                border: '1px solid rgba(201, 35, 55, 0.25)',
                boxShadow: '0 0 40px rgba(201, 35, 55, 0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #C92337, #E84858, #C92337)',
              }} />
              <h2 id="brief-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#E84858',
                marginBottom: 8,
              }}>
                Brief · {currentTopic.name}
              </h2>
              <p style={{ color: '#fff', fontWeight: 500, fontSize: 15, lineHeight: 1.5 }}>{currentBrief.objective}</p>
              {currentBrief.surprise && (
                <p style={{ 
                  fontSize: 13, 
                  color: '#C084FC', 
                  marginTop: 10,
                  padding: '8px 12px',
                  background: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: 8,
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                }}>
                  ✨ Surpresa: {currentBrief.surprise.description}
                </p>
              )}
            </section>
          )}

          {/* Stats Row Premium */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Fase */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
              Fase {phase}/4: {getPhaseName(phase)}
            </h1>
            
            {/* Stats */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Timer seconds={timeLeft} label="Tempo" variant={timeLeft <= 5 ? 'danger' : timeLeft <= 10 ? 'warning' : 'default'} />
              <ScoreDisplay score={totalScore} label="Pontos" />
              <div style={{
                padding: '8px 14px',
                borderRadius: 10,
                background: 'rgba(255, 215, 0, 0.08)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{ fontSize: 12, color: '#7A7770' }}>Meta:</span>
                <span style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#FFD700',
                }}>{targetScore}</span>
              </div>
              {eventMultiplier > 1 && (
                <span style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  fontFamily: 'var(--font-data)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#FFD700',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
                }}>
                  ⚡ GOLDEN HOUR 2×
                </span>
              )}
            </div>
          </div>

          {/* Level Progress */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            padding: '10px 16px',
            borderRadius: 10,
            background: 'rgba(13, 15, 20, 0.6)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <span style={{ fontSize: 12, color: '#7A7770', fontWeight: 500, whiteSpace: 'nowrap' }}>
              {getLevelName()} (Nível {level})
            </span>
            <ProgressBar value={xp} max={xpToNextLevel} variant="gold" size="sm" className="flex-1 max-w-[200px]" />
            <span style={{ fontFamily: 'var(--font-data)', fontSize: 11, color: '#7A7770' }}>{xp}/{xpToNextLevel} XP</span>
          </div>

          {/* Combos Premium */}
          {combos.length > 0 && (
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A7770', marginBottom: 10 }}>
                Combos ativos ({combos.length})
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {combos.map((c) => (
                  <span 
                    key={c.id} 
                    className="combo-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 999,
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.08) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.35)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#C084FC',
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
                    }}
                  >
                    🔥 {c.name} <span style={{ color: '#A855F7' }}>+{c.bonusPoints}</span>
                  </span>
                ))}
              </div>
              <ComboPreview3D combo={combos[0] ?? null} className="mt-2" />
            </section>
          )}

          {/* Power-up Premium */}
          {availablePowerUp && (
            <section className="powerup-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFD700', marginBottom: 6 }}>
                    ⚡ Power-up disponível
                  </h3>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: 0 }}>{availablePowerUp.name}</p>
                  <p style={{ color: '#7A7770', fontSize: 13, margin: '4px 0 0' }}>{availablePowerUp.effect}</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => consumePowerUp(availablePowerUp.id)}>Usar</Button>
              </div>
            </section>
          )}

          {/* Client Reaction */}
          <section style={{
            borderRadius: 14,
            padding: 16,
            background: 'rgba(13, 15, 20, 0.7)',
            border: '1px solid rgba(255,255,255,0.06)',
          }} aria-live="polite" aria-atomic="true">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A7770', marginBottom: 8 }}>
              💬 O cliente reage
            </h3>
            <p style={{ color: '#B8B4A8', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{clientReaction}</p>
          </section>

          <CompositionZone id={COMPOSITION_ZONE_ID} selected={selected} combos={combos} onRemove={removeElement} />

          <p style={{ fontSize: 13, color: '#7A7770', fontStyle: 'italic' }}>
            💡 Não existe escolha errada. Cada tecnologia conecta de um jeito.
          </p>

          {/* Cards Grid Premium */}
          <section>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 12, 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              color: '#B8B4A8', 
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>🎴</span> Tecnologias disponíveis
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
