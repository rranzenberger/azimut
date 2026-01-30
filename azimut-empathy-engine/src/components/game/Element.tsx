import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import type { GameElement as GameElementType } from '../../types/game.types'

const rarityStyles: Record<GameElementType['rarity'], string> = {
  common: 'border-[var(--rarity-common)] bg-bg-mid/60 shadow-sm hover:shadow-[0_4px_12px_rgba(148,163,184,0.15)]',
  rare: 'border-[var(--rarity-rare)] bg-bg-mid/70 shadow-sm hover:shadow-[0_0_16px_rgba(244,207,93,0.2)]',
  epic: 'border-purple-epic/60 bg-purple-epic/5 shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]',
  legendary: 'border-orange-500/50 bg-orange-500/5 shadow-sm hover:shadow-[0_0_20px_rgba(255,107,53,0.2)]',
  mythic: 'border-cyan-400/50 bg-cyan-400/5 shadow-sm hover:shadow-[0_0_24px_rgba(0,245,255,0.2)]',
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

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        relative rounded-xl border-2 p-4 cursor-grab active:cursor-grabbing
        transition-all duration-200 font-body
        ${rarityStyles[element.rarity]}
        ${isDragging ? 'opacity-50 scale-95 z-50' : ''}
        ${disabled ? 'cursor-not-allowed opacity-60 grayscale-[0.3]' : 'hover:scale-[1.03] hover:border-opacity-80'}
      `}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      <div className="font-display font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
        {element.name}
      </div>
      <div className="text-xs text-[var(--text-tertiary)] mt-1">{element.category}</div>
      <div className="text-xs font-data font-semibold text-gold-main mt-2">+{element.points} pts</div>
    </motion.div>
  )
}
