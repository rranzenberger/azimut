import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import type { GameElement } from '../../types/game.types'
import type { Combo } from '../../types/game.types'
import ComboRays from './ComboRays'

export interface CompositionZoneProps {
  id: string
  selected: GameElement[]
  combos?: Combo[]
  onRemove?: (id: string) => void
  children?: React.ReactNode
}

export default function CompositionZone({
  id,
  selected,
  combos = [],
  onRemove,
  children,
}: CompositionZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id, data: { type: 'composition' } })

  return (
    <motion.div
      ref={setNodeRef}
      className={`
        relative min-h-[200px] rounded-2xl border-2 border-dashed p-6 overflow-hidden
        transition-all duration-200
        ${isOver ? 'border-azimut-red bg-azimut-red/10 shadow-[0_0_24px_rgba(201,35,55,0.2)]' : 'border-white/20 bg-bg-dark/50 backdrop-blur-sm'}
      `}
      animate={isOver ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.15 }}
    >
      <ComboRays active={combos.length > 0} />
      <div className="relative z-10 mb-3">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Zona de composição ({selected.length} elementos)
        </h3>
        <p className="text-xs text-[var(--text-tertiary)] mt-1 font-body">
          Traga as tecnologias que você SENTE que vão conectar mundos
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap gap-3">
        {selected.map((el) => (
          <motion.div
            key={el.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-lg border border-white/20 bg-bg-mid/60 px-3 py-2 text-sm flex items-center gap-2 font-body backdrop-blur-sm"
          >
            <span className="text-[var(--text-primary)]">{el.name}</span>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(el.id)}
                className="text-azimut-red hover:underline text-xs font-medium"
                aria-label={`Remover ${el.name}`}
              >
                ×
              </button>
            )}
          </motion.div>
        ))}
      </div>
      {children}
    </motion.div>
  )
}
