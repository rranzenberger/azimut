import { Button } from '../components/ui'
import { useSettingsStore } from '../stores/settingsStore'

export interface SettingsScreenProps {
  onBack?: () => void
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const highContrast = useSettingsStore((s) => s.highContrast)
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  const noTimer = useSettingsStore((s) => s.noTimer)
  const setHighContrast = useSettingsStore((s) => s.setHighContrast)
  const setReducedMotion = useSettingsStore((s) => s.setReducedMotion)
  const setNoTimer = useSettingsStore((s) => s.setNoTimer)

  return (
    <div className="min-h-screen bg-bg-darkest p-8">
      <div className="max-w-2xl mx-auto space-y-8 font-body">
        {onBack && <Button variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>}
        <h1 className="font-display text-3xl font-bold text-azimut-red">Configurações</h1>
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">Alto contraste</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">Reduzir movimento</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={noTimer} onChange={(e) => setNoTimer(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">Modo sem timer</span>
          </label>
        </div>
      </div>
    </div>
  )
}
