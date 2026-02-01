import { useState } from 'react'
import { Button, GameHeader, Toast } from '../components/ui'
import { useGameStore } from '../stores/gameStore'
import { useAchievementsStore } from '../stores/achievementsStore'
import { useProgressionStore } from '../stores/progressionStore'
import { getCombosForElements } from '../data/combos'
import { getGameLang, getResultTranslations, getCommonTranslations } from '../i18n'

const TARGET_WIN = 800 // meta da fase 4

function getSecondChanceDateKey(): string {
  const today = new Date().toISOString().slice(0, 10)
  return `azimut-second-chance-${today}`
}

function canUseSecondChance(): boolean {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem(getSecondChanceDateKey()) !== 'used'
}

function markSecondChanceUsed(): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(getSecondChanceDateKey(), 'used')
}

export interface ResultScreenProps {
  onSaveProgressNft?: () => void
  onConsultoria?: () => void
  onPlayAgain?: () => void
  onLeaderboard?: () => void
  onBackToHome?: () => void
}

export default function ResultScreen({
  onSaveProgressNft,
  onConsultoria,
  onPlayAgain,
  onLeaderboard,
  onBackToHome,
}: ResultScreenProps) {
  const finalScore = useGameStore((s) => s.finalScore)
  const highScore = useGameStore((s) => s.highScore)
  const gamesPlayed = useGameStore((s) => s.gamesPlayed)
  const selectedIds = useGameStore((s) => s.selectedIds)
  const currentTopicId = useGameStore((s) => s.currentTopicId)
  const currentBrief = useGameStore((s) => s.currentBrief)
  const surpriseSatisfied = useGameStore((s) => s.surpriseSatisfied)
  const reset = useGameStore((s) => s.reset)
  const level = useProgressionStore((s) => s.level)
  const combos = getCombosForElements(selectedIds, currentTopicId)
  const lang = getGameLang()
  const t = getResultTranslations(lang)
  const common = getCommonTranslations(lang)
  const levelName = common.levelNames[level] ?? common.levelNames[1]

  const lost = finalScore < TARGET_WIN
  const nearMiss = lost && TARGET_WIN - finalScore <= 50
  const showSecondChance = nearMiss && canUseSecondChance()

  const [scoreTapCount, setScoreTapCount] = useState(0)
  const [easterEggVisible, setEasterEggVisible] = useState(false)
  const handleScoreTap = () => {
    const next = scoreTapCount + 1
    setScoreTapCount(next)
    if (next >= 5) {
      useAchievementsStore.getState().unlock('curioso')
      setEasterEggVisible(true)
      setScoreTapCount(0)
    }
  }

  const handlePlayAgain = () => {
    reset()
    onPlayAgain?.()
  }

  const handleSecondChance = () => {
    markSecondChanceUsed()
    reset()
    onPlayAgain?.()
  }

  return (
    <div className="game-bg h-full flex flex-col overflow-hidden">
      <GameHeader
        title={<span className="font-display font-bold text-azimut-red text-sm md:text-base uppercase tracking-wider">{t.title}</span>}
      />
      <div className="flex-1 min-h-0 overflow-auto flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full space-y-10 text-center">
          <h1 className="font-display text-4xl font-bold text-azimut-red">{t.title}</h1>
          <p className="font-body text-[var(--text-secondary)]">{t.yourFinalScore}</p>
          <button
            type="button"
            onClick={handleScoreTap}
            className="font-data text-6xl font-bold text-gold-main tabular-nums cursor-default border-0 bg-transparent p-0 font-inherit text-inherit touch-manipulation"
            aria-label={t.yourFinalScore}
          >
            {finalScore} <span className="text-2xl text-[var(--text-tertiary)] font-body"> {common.pts}</span>
          </button>

          {currentBrief?.surprise && surpriseSatisfied !== null && (
            <p className="font-body text-sm text-[var(--text-secondary)]">
              {surpriseSatisfied ? t.clientWantedComboYes : t.clientWantedComboNo}
            </p>
          )}

          {combos.length > 0 && (
            <div className="text-left glass-card rounded-2xl p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                {t.combosActivated}
              </h2>
              <ul className="space-y-2 font-body">
                {combos.map((c) => (
                  <li key={c.id} className="text-[var(--text-primary)] flex justify-between">
                    <span>{c.name}</span>
                    <span className="text-gold-main font-data">+{c.bonusPoints} {common.pts}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="font-body text-sm text-[var(--text-tertiary)]">
            {levelName} ({t.levelLabel} {level}) · {t.recordLabel}: {highScore} {common.pts} · {t.gamesLabel}: {gamesPlayed}
          </p>

          {showSecondChance && (
            <div className="rounded-xl p-4 border border-amber-500/30 bg-amber-500/10 text-center">
              <p className="text-amber-200 text-sm font-medium mb-2">{t.nearMissMessage}</p>
              <Button variant="primary" size="md" onClick={handleSecondChance} fullWidth>
                {t.secondChanceButton}
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button variant="primary" size="lg" onClick={handlePlayAgain} fullWidth>
              {t.playAgain}
            </Button>
            {onSaveProgressNft && (
              <Button variant="secondary" size="md" onClick={onSaveProgressNft} fullWidth>
                {t.saveProgressNft}
              </Button>
            )}
            {onConsultoria && (
              <Button variant="ghost" size="md" onClick={onConsultoria} fullWidth>
                {t.freeConsulting}
              </Button>
            )}
            {onLeaderboard && (
              <Button variant="ghost" size="md" onClick={onLeaderboard} fullWidth>
                {t.leaderboard}
              </Button>
            )}
            {onBackToHome && (
              <Button variant="ghost" size="md" onClick={onBackToHome} fullWidth>
                {t.backToHome}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Toast
        message={t.easterEggThanks}
        variant="info"
        visible={easterEggVisible}
        onClose={() => setEasterEggVisible(false)}
        duration={4000}
      />
    </div>
  )
}
