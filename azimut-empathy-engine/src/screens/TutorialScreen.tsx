import { useState, useEffect } from 'react'
import { Button, GameHeader } from '../components/ui'
import { getGameLang, getTutorialTranslations, getCommonTranslations } from '../i18n'

export interface TutorialScreenProps {
  onComplete?: () => void
  onBack?: () => void
}

export default function TutorialScreen({ onComplete, onBack }: TutorialScreenProps) {
  const lang = getGameLang()
  const t = getTutorialTranslations(lang)
  const common = getCommonTranslations(lang)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="game-bg h-screen min-h-0 flex flex-col overflow-hidden">
      <GameHeader
        leftAction={onBack ? <Button variant="back" size="sm" onClick={onBack}>← {common.back}</Button> : undefined}
        title={<span className="font-display font-bold text-azimut-red text-sm md:text-base uppercase tracking-wider">{t.title}</span>}
      />

      <main className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-5 p-4 pb-8">
          <section className="rounded-xl border border-white/10 bg-bg-dark/30 p-5 flex-shrink-0">
            <h2 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              {t.objective}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isMobile ? t.objectiveParagraphMobile : t.objectiveParagraph}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {t.stepsTitle}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-white/10 bg-bg-dark/30 p-4 flex-shrink-0"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-azimut-red/20 text-azimut-red font-data font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-[var(--text-primary)] text-sm sm:text-base leading-tight mb-1">
                      {step.title}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {i === 1 && isMobile ? t.step2TextMobile : step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {t.tutorialVideoUrl && (
            <section className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5 flex-shrink-0">
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {t.watchVideoLabel}
              </p>
              <a
                href={t.tutorialVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[var(--bg-dark)] rounded"
              >
                <span aria-hidden>▶</span>
                {t.watchVideoLabel}
              </a>
            </section>
          )}

          <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex-shrink-0">
            <h2 className="font-display text-base sm:text-lg font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span aria-hidden>🔓</span> {t.unlockTitle}
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <li><strong className="text-white">4 fases.</strong> {t.unlockPhase}</li>
              <li><strong className="text-purple-400">Quest especial.</strong> {t.unlockQuest}</li>
              <li><strong className="text-amber-400">Recompensas.</strong> {t.unlockRewards}</li>
              <li><strong className="text-cyan-400">Área secreta.</strong> {t.unlockSecret}</li>
            </ul>
            <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-white/10 pt-4">
              {t.noWallet}
            </p>
          </section>

          {onComplete && (
            <div className="flex-shrink-0 pt-2">
              <Button variant="primary" size="lg" onClick={onComplete} fullWidth className="text-base py-3">
                {t.readyButton}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
