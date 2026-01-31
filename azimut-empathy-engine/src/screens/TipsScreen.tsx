import { Button, GameHeader } from '../components/ui'
import { getGameLang, getTipsTranslations, getCommonTranslations } from '../i18n'

export interface TipsScreenProps {
  onBack?: () => void
}

export default function TipsScreen({ onBack }: TipsScreenProps) {
  const lang = getGameLang()
  const t = getTipsTranslations(lang)
  const common = getCommonTranslations(lang)

  return (
    <div className="game-bg h-screen min-h-0 flex flex-col overflow-hidden">
      <GameHeader
        leftAction={onBack ? <Button variant="back" size="sm" onClick={onBack}>← {common.back}</Button> : undefined}
        title={<span className="font-display font-bold text-amber-400 text-sm md:text-base uppercase tracking-wider">{t.title}</span>}
      />
      <main className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-2xl mx-auto flex flex-col gap-5 p-4 pb-8">
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.intro}
          </p>
          <ul className="space-y-4">
            {t.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-white/10 bg-bg-dark/30 p-4"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(255, 193, 7, 0.12)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
                  {tip.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm sm:text-base mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
