import type { Combo } from '../../types/game.types'

export interface ComboPreview3DTranslations {
  preview3dTitle: string
  synergyActive: string
  ariaPreviewCombo: string
}

export interface ComboPreview3DProps {
  combo: Combo | null
  className?: string
  /** Traduções (i18n); fallback para PT */
  translations?: ComboPreview3DTranslations | null
}

const defaultTranslations: ComboPreview3DTranslations = {
  preview3dTitle: 'Preview 3D',
  synergyActive: 'Sinergia ativa — +',
  ariaPreviewCombo: 'Preview do combo {name}',
}

export default function ComboPreview3D({ combo, className = '', translations }: ComboPreview3DProps) {
  if (!combo) return null
  const t = translations ?? defaultTranslations
  return (
    <section
      className={`rounded-xl border border-purple-epic/40 bg-purple-epic/5 p-4 font-body ${className}`}
      aria-label={t.ariaPreviewCombo.replace('{name}', combo.name)}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-purple-epic/20 flex items-center justify-center text-2xl" aria-hidden>
          📦
        </div>
        <div>
          <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-purple-epic mb-0.5">
            {t.preview3dTitle}
          </h3>
          <p className="text-[var(--text-primary)] font-medium">{combo.name}</p>
          <p className="text-xs text-[var(--text-tertiary)]">{t.synergyActive}{combo.bonusPoints} pts</p>
        </div>
      </div>
    </section>
  )
}
