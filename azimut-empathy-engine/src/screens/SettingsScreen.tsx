import { Button, GameHeader } from '../components/ui'
import { useSettingsStore } from '../stores/settingsStore'
import { useAchievementsStore } from '../stores/achievementsStore'
import { ACHIEVEMENTS } from '../stores/achievementsStore'
import { getGameLang, getSettingsTranslations, getCommonTranslations } from '../i18n'

export interface SettingsScreenProps {
  onBack?: () => void
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const lang = getGameLang()
  const t = getSettingsTranslations(lang)
  const common = getCommonTranslations(lang)
  const highContrast = useSettingsStore((s) => s.highContrast)
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  const noTimer = useSettingsStore((s) => s.noTimer)
  const challengeMode = useSettingsStore((s) => s.challengeMode)
  const setHighContrast = useSettingsStore((s) => s.setHighContrast)
  const setReducedMotion = useSettingsStore((s) => s.setReducedMotion)
  const setNoTimer = useSettingsStore((s) => s.setNoTimer)
  const setChallengeMode = useSettingsStore((s) => s.setChallengeMode)
  const unlocked = useAchievementsStore((s) => s.unlocked)
  const isUnlocked = useAchievementsStore((s) => s.isUnlocked)

  return (
    <div className="game-bg h-screen min-h-0 flex flex-col overflow-hidden">
      <GameHeader
        leftAction={onBack ? <Button variant="back" size="sm" onClick={onBack}>← {common.back}</Button> : undefined}
        title={<span className="font-display font-bold text-azimut-red text-sm md:text-base uppercase tracking-wider">{t.title}</span>}
      />
      <main className="flex-1 min-h-0 overflow-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-8 font-body">
        <h1 className="font-display text-2xl font-bold text-azimut-red">{t.title}</h1>
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">{t.highContrast}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">{t.reduceMotion}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={noTimer} onChange={(e) => setNoTimer(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">{t.zenMode}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={challengeMode} onChange={(e) => setChallengeMode(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">{t.challengeMode}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} className="rounded" />
            <span className="text-[var(--text-primary)]">{t.soundLabel}</span>
          </label>
        </div>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span>🏆</span> {t.achievementsTitle} ({unlocked.length}/{ACHIEVEMENTS.length})
          </h2>
          <ul className="space-y-3">
            {ACHIEVEMENTS.map((a) => (
              <li
                key={a.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  isUnlocked(a.id)
                    ? 'bg-emerald-500/10 border-emerald-400/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <span className="text-2xl opacity-90">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold ${isUnlocked(a.id) ? 'text-emerald-200' : 'text-[var(--text-secondary)]'}`}>
                    {t.achievementName[a.id] ?? a.name}
                  </div>
                  <div className="text-sm text-[var(--text-tertiary)]">{t.achievementDesc[a.id] ?? a.description}</div>
                </div>
                {isUnlocked(a.id) && <span className="text-emerald-400 text-sm font-medium">✓</span>}
              </li>
            ))}
          </ul>
        </section>
        </div>
      </main>
    </div>
  )
}
