import type { Combo } from '../../types/game.types'

export interface ComboPreview3DProps {
  combo: Combo | null
  className?: string
}

export default function ComboPreview3D({ combo, className = '' }: ComboPreview3DProps) {
  if (!combo) return null
  return (
    <section
      className={`rounded-xl border border-purple-epic/40 bg-purple-epic/5 p-4 font-body ${className}`}
      aria-label={`Preview do combo ${combo.name}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-purple-epic/20 flex items-center justify-center text-2xl" aria-hidden>
          📦
        </div>
        <div>
          <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-purple-epic mb-0.5">
            Preview 3D
          </h3>
          <p className="text-[var(--text-primary)] font-medium">{combo.name}</p>
          <p className="text-xs text-[var(--text-tertiary)]">Sinergia ativa — +{combo.bonusPoints} pts</p>
        </div>
      </div>
    </section>
  )
}
