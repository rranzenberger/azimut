import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import type { GameElement as GameElementType } from '../../types/game.types'

// Ícones por categoria
const categoryIcons: Record<string, string> = {
  'XR/VR': '🥽',
  'Cinema': '🎬',
  'Eventos': '🎪',
  'Academy': '🎓',
  'Cultura': '🏛️',
  'Tech': '⚡',
  'Marketing': '📣',
  'Produção': '🎥',
}

// Cores de borda por raridade
const rarityColors: Record<GameElementType['rarity'], string> = {
  common: '#64748B',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F97316',
  mythic: '#00F5FF',
}

// Gradientes por raridade
const rarityGradients: Record<GameElementType['rarity'], string> = {
  common: 'linear-gradient(145deg, rgba(100, 116, 139, 0.15) 0%, rgba(100, 116, 139, 0.03) 100%)',
  rare: 'linear-gradient(145deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
  epic: 'linear-gradient(145deg, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.08) 100%)',
  legendary: 'linear-gradient(145deg, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.1) 100%)',
  mythic: 'linear-gradient(145deg, rgba(0, 245, 255, 0.3) 0%, rgba(0, 245, 255, 0.08) 100%)',
}

// Glow por raridade
const rarityGlow: Record<GameElementType['rarity'], string> = {
  common: 'none',
  rare: '0 0 20px rgba(59, 130, 246, 0.2)',
  epic: '0 0 25px rgba(168, 85, 247, 0.25)',
  legendary: '0 0 30px rgba(249, 115, 22, 0.3)',
  mythic: '0 0 35px rgba(0, 245, 255, 0.35)',
}

export interface ElementProps {
  element: GameElementType
  disabled?: boolean
}

export default function Element({ element, disabled }: ElementProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: element.id,
    data: { element },
    disabled,
  })

  const icon = categoryIcons[element.category] || '✨'
  const borderColor = rarityColors[element.rarity]
  const gradient = rarityGradients[element.rarity]
  const glow = rarityGlow[element.rarity]

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative overflow-hidden"
      style={{
        borderRadius: 12,
        padding: 1,
        background: `linear-gradient(135deg, ${borderColor}60 0%, ${borderColor}20 50%, ${borderColor}40 100%)`,
        opacity: disabled ? 0.4 : isDragging ? 0.6 : 1,
        filter: disabled ? 'grayscale(0.5)' : 'none',
        cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      whileHover={disabled ? undefined : { scale: 1.03, y: -4 }}
      whileTap={disabled ? undefined : { scale: 1.05 }}
    >
      {/* Card inner */}
      <div
        style={{
          borderRadius: 11,
          padding: '14px 16px',
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

        {/* Header with icon and name */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                color: '#fff',
                lineHeight: 1.2,
              }}
            >
              {element.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: borderColor,
                opacity: 0.9,
                marginTop: 2,
                fontWeight: 500,
              }}
            >
              {element.category}
            </div>
          </div>
        </div>

        {/* Points */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            +{element.points} pts
          </span>
          
          {/* Rarity indicator */}
          {element.rarity !== 'common' && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: borderColor,
                padding: '2px 8px',
                borderRadius: 4,
                background: `${borderColor}15`,
                border: `1px solid ${borderColor}30`,
              }}
            >
              {element.rarity}
            </span>
          )}
        </div>

        {/* Mythic special effect */}
        {element.rarity === 'mythic' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)',
              animation: 'shimmer 3s infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </motion.div>
  )
}
