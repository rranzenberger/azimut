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

// Ícones por tópico
const topicIcons: Record<string, string> = {
  'xr-vr': '🥽',
  'audiovisual': '🎬',
  'eventos': '🎪',
  'cultura': '🏛️',
  'canada': '🍁',
}

// Cores por tópico
const topicColors: Record<string, string> = {
  'xr-vr': '#00F5FF',
  'audiovisual': '#A855F7',
  'eventos': '#F97316',
  'cultura': '#3B82F6',
  'canada': '#22C55E',
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

  // Cor do tópico atual
  const topicColor = currentTopicId ? topicColors[currentTopicId] || '#A855F7' : '#A855F7'
  const topicIcon = currentTopicId ? topicIcons[currentTopicId] || '🎯' : '🎯'

  // Progresso para a meta
  const progressPercent = Math.min((totalScore / targetScore) * 100, 100)
  const isNearGoal = progressPercent >= 80
  const isGoalReached = progressPercent >= 100

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
    window.top?.location.assign('/pt/experience-preview')
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div 
        className="min-h-screen flex flex-col"
        style={{ 
          background: `
            radial-gradient(ellipse 100% 80% at 50% -20%, ${topicColor}15 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 80% 100%, rgba(201, 35, 55, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 10% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
            linear-gradient(180deg, #050508 0%, #0A0D12 30%, #0D1015 70%, #050508 100%)
          `,
        }}
      >
        {/* Header Premium com Glass */}
        <header 
          className="sticky top-0 z-50 px-4 md:px-6 py-3"
          style={{ 
            background: 'rgba(5, 5, 8, 0.9)', 
            backdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: `1px solid ${topicColor}20`,
            boxShadow: `0 4px 30px rgba(0,0,0,0.4), 0 1px 0 ${topicColor}10`,
          }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToSite}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ 
                color: '#9CA3AF', 
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${topicColor}20`
                e.currentTarget.style.borderColor = `${topicColor}50`
                e.currentTarget.style.color = topicColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#9CA3AF'
              }}
            >
              <span>←</span>
              <span className="hidden sm:inline">Voltar</span>
            </button>
            
            {/* Logo central com cor do tópico */}
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 13, 
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: topicColor,
              textShadow: `0 0 20px ${topicColor}50`,
            }}>
              EMPATHY ENGINE
            </div>
            
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#9CA3AF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  Menu
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-5">

            {/* ═══════════════════════════════════════════════════════════════
                QUEST CARD - DESTAQUE PRINCIPAL
                ═══════════════════════════════════════════════════════════════ */}
            {currentBrief && currentTopic && (
              <section 
                style={{
                  borderRadius: 20,
                  padding: 0,
                  background: `linear-gradient(135deg, ${topicColor}08 0%, transparent 100%)`,
                  border: `2px solid ${topicColor}30`,
                  boxShadow: `0 0 60px ${topicColor}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Barra superior colorida */}
                <div style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${topicColor}, ${topicColor}80, ${topicColor})`,
                }} />
                
                {/* Conteúdo */}
                <div style={{ padding: '20px 24px' }}>
                  {/* Header da Quest */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${topicColor}20`,
                      border: `2px solid ${topicColor}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      boxShadow: `0 0 20px ${topicColor}30`,
                    }}>
                      {topicIcon}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: topicColor,
                        marginBottom: 2,
                      }}>
                        🎯 Sua Quest
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        {currentTopic.name}
                      </div>
                    </div>
                  </div>

                  {/* Objetivo */}
                  <div style={{
                    padding: '16px 20px',
                    borderRadius: 12,
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    marginBottom: currentBrief.surprise ? 12 : 0,
                  }}>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#FFD700',
                      marginBottom: 8,
                    }}>
                      📋 Objetivo
                    </div>
                    <p style={{ 
                      color: '#E5E5E5', 
                      fontWeight: 500, 
                      fontSize: 15, 
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {currentBrief.objective}
                    </p>
                  </div>

                  {/* Surpresa */}
                  {currentBrief.surprise && (
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                      <span style={{ fontSize: 18 }}>✨</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Bônus Surpresa
                        </div>
                        <div style={{ fontSize: 13, color: '#C084FC' }}>
                          {currentBrief.surprise.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                STATS HUD - Fase, Timer, Score, Meta
                ═══════════════════════════════════════════════════════════════ */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 12,
            }}>
              {/* Fase */}
              <div style={{
                padding: '14px 18px',
                borderRadius: 14,
                background: 'linear-gradient(145deg, rgba(20, 23, 31, 0.9) 0%, rgba(10, 13, 18, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}>
                <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  Fase
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {phase}/4
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                  {getPhaseName(phase)}
                </div>
              </div>

              {/* Timer */}
              <div style={{
                padding: '14px 18px',
                borderRadius: 14,
                background: timeLeft <= 5 
                  ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)'
                  : timeLeft <= 10
                  ? 'linear-gradient(145deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)'
                  : 'linear-gradient(145deg, rgba(20, 23, 31, 0.9) 0%, rgba(10, 13, 18, 0.95) 100%)',
                border: timeLeft <= 5 
                  ? '1px solid rgba(239, 68, 68, 0.3)'
                  : timeLeft <= 10
                  ? '1px solid rgba(245, 158, 11, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                animation: timeLeft <= 5 ? 'pulse 0.5s ease-in-out infinite' : 'none',
              }}>
                <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  ⏱️ Tempo
                </div>
                <div style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: timeLeft <= 5 ? '#EF4444' : timeLeft <= 10 ? '#F59E0B' : '#fff',
                  letterSpacing: '0.05em',
                }}>
                  0:{timeLeft.toString().padStart(2, '0')}
                </div>
              </div>

              {/* Score */}
              <div style={{
                padding: '14px 18px',
                borderRadius: 14,
                background: isGoalReached 
                  ? 'linear-gradient(145deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)'
                  : 'linear-gradient(145deg, rgba(20, 23, 31, 0.9) 0%, rgba(10, 13, 18, 0.95) 100%)',
                border: isGoalReached 
                  ? '1px solid rgba(34, 197, 94, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
              }}>
                <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  🎯 Pontos
                </div>
                <div style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: isGoalReached ? '#22C55E' : '#FFD700',
                  letterSpacing: '0.05em',
                }}>
                  {totalScore}
                </div>
              </div>

              {/* Meta */}
              <div style={{
                padding: '14px 18px',
                borderRadius: 14,
                background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
              }}>
                <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  🏆 Meta
                </div>
                <div style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#FFD700',
                  letterSpacing: '0.05em',
                }}>
                  {targetScore}
                </div>
              </div>
            </div>

            {/* Barra de progresso para meta */}
            <div style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: 'rgba(10, 13, 18, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Progresso para Meta
                </span>
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 700, 
                  color: isGoalReached ? '#22C55E' : isNearGoal ? '#FFD700' : '#9CA3AF',
                }}>
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div style={{
                height: 8,
                borderRadius: 999,
                background: 'rgba(255, 255, 255, 0.06)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  borderRadius: 999,
                  background: isGoalReached 
                    ? 'linear-gradient(90deg, #22C55E 0%, #4ADE80 100%)'
                    : isNearGoal
                    ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)'
                    : `linear-gradient(90deg, ${topicColor} 0%, ${topicColor}80 100%)`,
                  boxShadow: isGoalReached 
                    ? '0 0 20px rgba(34, 197, 94, 0.5)'
                    : isNearGoal
                    ? '0 0 20px rgba(255, 215, 0, 0.5)'
                    : `0 0 15px ${topicColor}50`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
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
              <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {getLevelName()} (Nível {level})
              </span>
              <ProgressBar value={xp} max={xpToNextLevel} variant="gold" size="sm" className="flex-1 max-w-[200px]" />
              <span style={{ fontFamily: 'var(--font-data)', fontSize: 11, color: '#6B7280' }}>{xp}/{xpToNextLevel} XP</span>
              {eventMultiplier > 1 && (
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  fontFamily: 'var(--font-data)',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#FFD700',
                }}>
                  ⚡ 2×
                </span>
              )}
            </div>

            {/* Combos */}
            {combos.length > 0 && (
              <section style={{
                padding: '16px 20px',
                borderRadius: 14,
                background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.03) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A855F7', marginBottom: 12 }}>
                  🔥 Combos ativos ({combos.length})
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {combos.map((c) => (
                    <span 
                      key={c.id} 
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
                      {c.name} <span style={{ color: '#FFD700' }}>+{c.bonusPoints}</span>
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Power-up */}
            {availablePowerUp && (
              <section style={{
                padding: '16px 20px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(255, 215, 0, 0.04) 100%)',
                border: '2px solid rgba(255, 215, 0, 0.35)',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFD700', marginBottom: 6 }}>
                      ⚡ Power-up disponível
                    </h3>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: 0 }}>{availablePowerUp.name}</p>
                    <p style={{ color: '#9CA3AF', fontSize: 13, margin: '4px 0 0' }}>{availablePowerUp.effect}</p>
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
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6B7280', marginBottom: 8 }}>
                💬 O cliente reage
              </h3>
              <p style={{ color: '#B8B4A8', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{clientReaction}</p>
            </section>

            {/* Composition Zone */}
            <CompositionZone id={COMPOSITION_ZONE_ID} selected={selected} combos={combos} onRemove={removeElement} />

            <p style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic', textAlign: 'center' }}>
              💡 Não existe escolha errada. Cada tecnologia conecta de um jeito.
            </p>

            {/* Cards Grid */}
            <section>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 12, 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                color: '#9CA3AF', 
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span>🎴</span> Tecnologias disponíveis ({pool.length - selectedIds.length} restantes)
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
              +{activeElement.points} pts
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
