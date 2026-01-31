import { useRef } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { useGameStore } from '../../stores/gameStore'
import type { GameElement as GameElementType } from '../../types/game.types'

const TAP_MAX_MS = 350
const TAP_MAX_DISTANCE = 14

// Ícones por categoria (todas as categorias do jogo)
const categoryIcons: Record<string, string> = {
  'XR/VR': '🥽',
  'Cinema': '🎬',
  'Eventos': '🎪',
  'Academy': '🎓',
  'Cultura': '🏛️',
  'Tech': '⚡',
  'Marketing': '📣',
  'Produção': '🎥',
  'Web3': '🔗',
  'VFX': '✨',
  'IA': '🤖',
  'Games': '🎮',
}

// Cores de borda por raridade
const rarityColors: Record<GameElementType['rarity'], string> = {
  common: '#64748B',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F97316',
  mythic: '#00F5FF',
}

// Gradientes por raridade (suaves para não atrapalhar leitura)
const rarityGradients: Record<GameElementType['rarity'], string> = {
  common: 'linear-gradient(145deg, rgba(100, 116, 139, 0.12) 0%, rgba(100, 116, 139, 0.02) 100%)',
  rare: 'linear-gradient(145deg, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0.04) 100%)',
  epic: 'linear-gradient(145deg, rgba(168, 85, 247, 0.16) 0%, rgba(168, 85, 247, 0.05) 100%)',
  legendary: 'linear-gradient(145deg, rgba(249, 115, 22, 0.18) 0%, rgba(249, 115, 22, 0.06) 100%)',
  mythic: 'linear-gradient(145deg, rgba(0, 245, 255, 0.18) 0%, rgba(0, 245, 255, 0.06) 100%)',
}

// Glow por raridade (discreto: borda só, sem invadir o texto)
const rarityGlow: Record<GameElementType['rarity'], string> = {
  common: '0 0 6px rgba(100, 116, 139, 0.12)',
  rare: '0 0 8px rgba(59, 130, 246, 0.2), 0 0 12px rgba(59, 130, 246, 0.08)',
  epic: '0 0 8px rgba(168, 85, 247, 0.22), 0 0 14px rgba(168, 85, 247, 0.08)',
  legendary: '0 0 8px rgba(249, 115, 22, 0.25), 0 0 14px rgba(249, 115, 22, 0.08)',
  mythic: '0 0 8px rgba(0, 245, 255, 0.28), 0 0 16px rgba(0, 245, 255, 0.1)',
}

export interface ElementProps {
  element: GameElementType
  disabled?: boolean
  /** Destacar como “compatível com combo” enquanto outra carta está sendo arrastada */
  highlightCombo?: boolean
  onTapAdd?: (elementId: string) => void
}

export default function Element({ element, disabled, highlightCombo, onTapAdd }: ElementProps) {
  const revealRarityUntil = useGameStore((s) => s.revealRarityUntil)
  const showRarityRevealed = revealRarityUntil > 0 && Date.now() < revealRarityUntil
  const tapStart = useRef<{ t: number; x: number; y: number } | null>(null)

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: element.id,
    data: { element },
    disabled,
  })

  const icon = element.icon || categoryIcons[element.category] || '✨'
  const borderColor = rarityColors[element.rarity]
  const gradient = rarityGradients[element.rarity]
  const glow = rarityGlow[element.rarity]

  const comboGlow = highlightCombo
    ? '0 0 10px rgba(168, 85, 247, 0.35), 0 0 0 2px rgba(57, 255, 20, 0.5)'
    : undefined

  const handlePointerDown = (e: React.PointerEvent) => {
    tapStart.current = { t: Date.now(), x: e.clientX, y: e.clientY }
  }
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!onTapAdd || disabled) return
    const start = tapStart.current
    tapStart.current = null
    if (!start) return
    const dt = Date.now() - start.t
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dt < TAP_MAX_MS && dist < TAP_MAX_DISTANCE) {
      e.preventDefault()
      e.stopPropagation()
      onTapAdd(element.id)
    }
  }

  // Só anexar handlers de tap no mobile (onTapAdd definido); no desktop deixamos o @dnd-kit gerir o pointer para o drag
  const tapHandlers = onTapAdd
    ? {
        onPointerDown: handlePointerDown,
        onPointerUp: handlePointerUp,
        onPointerCancel: () => { tapStart.current = null },
      }
    : {}

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      {...tapHandlers}
      className="relative overflow-hidden touch-manipulation min-h-[44px] sm:min-h-0"
      style={{
        borderRadius: 10,
        padding: 2,
        background: highlightCombo
          ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(57, 255, 20, 0.2) 50%, rgba(57, 255, 20, 0.28) 100%)'
          : `linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, ${borderColor}25 30%, ${borderColor}20 70%, rgba(57, 255, 20, 0.15) 100%)`,
        opacity: disabled ? 0.4 : isDragging ? 0.6 : 1,
        filter: disabled ? 'grayscale(0.5)' : 'none',
        cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: comboGlow ?? (glow !== 'none' ? glow : '0 0 8px rgba(168, 85, 247, 0.1), 0 0 12px rgba(57, 255, 20, 0.06)'),
      }}
      whileHover={disabled ? undefined : { scale: 1.03, y: -4 }}
      whileTap={disabled ? undefined : { scale: 1.05 }}
    >
      {/* Card inner — padding responsivo para mobile (área de toque) */}
      <div
        className="rounded-[9px] sm:rounded-[11px] p-2 sm:p-2.5 md:px-2.5 md:pt-3 md:pb-2.5 min-h-[40px] sm:min-h-0"
        style={{
          background: gradient,
          backdropFilter: 'blur(8px)',
          boxShadow: glow,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shine effect on hover */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
            opacity: 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
          className="group-hover:opacity-100"
        />

        {/* Header: ícone menor à esquerda, mais espaço para o título; quebra só em espaços */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                color: '#fff',
                lineHeight: 1.25,
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {element.name}
            </div>
            <div
              style={{
                fontSize: 10,
                color: borderColor,
                opacity: 0.9,
                marginTop: 2,
                fontWeight: 500,
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {element.category}
            </div>
          </div>
        </div>

        {/* Points e raridade — espaço para não encostar na borda */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6,
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              flexShrink: 0,
            }}
          >
            +{element.points} pts
          </span>

          {(element.rarity !== 'common' || showRarityRevealed) && (
            <span
              style={{
                fontSize: 8,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: borderColor,
                padding: '2px 5px',
                borderRadius: 4,
                background: `${borderColor}15`,
                border: `1px solid ${borderColor}30`,
                flexShrink: 0,
              }}
            >
              {element.rarity}
            </span>
          )}
        </div>

        {/* Mythic: brilho bem suave para não atrapalhar leitura */}
        {element.rarity === 'mythic' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.04) 50%, transparent 70%)',
              animation: 'shimmer 3s infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </motion.div>
  )
}
