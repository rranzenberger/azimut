import { Button } from '../components/ui'
import { useGameStore } from '../stores/gameStore'
import { useProgressionStore } from '../stores/progressionStore'
import { getCombosForElements } from '../data/combos'

export interface ResultScreenProps {
  onSaveProgress?: () => void
  onReceiveNFT?: () => void
  onConsultoria?: () => void
  onPlayAgain?: () => void
  onLeaderboard?: () => void
}

export default function ResultScreen({
  onSaveProgress,
  onReceiveNFT,
  onConsultoria,
  onPlayAgain,
  onLeaderboard,
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
  const getLevelName = useProgressionStore((s) => s.getLevelName)
  const combos = getCombosForElements(selectedIds, currentTopicId)

  const handlePlayAgain = () => {
    reset()
    onPlayAgain?.()
  }

  return (
    <div className="min-h-screen bg-bg-darkest flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full space-y-10 text-center">
        <h1 className="font-display text-4xl font-bold text-azimut-red">Showtime!</h1>
        <p className="font-body text-[var(--text-secondary)]">Sua pontuação final</p>
        <div className="font-data text-6xl font-bold text-gold-main tabular-nums">
          {finalScore} <span className="text-2xl text-[var(--text-tertiary)] font-body">pts</span>
        </div>

        {currentBrief?.surprise && surpriseSatisfied !== null && (
          <p className="font-body text-sm text-[var(--text-secondary)]">
            {surpriseSatisfied
              ? 'O cliente queria um combo — você entregou!'
              : 'O cliente queria um combo — quase lá na próxima!'}
          </p>
        )}

        {combos.length > 0 && (
          <div className="text-left glass-card rounded-2xl p-6">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Combos ativados
            </h2>
            <ul className="space-y-2 font-body">
              {combos.map((c) => (
                <li key={c.id} className="text-[var(--text-primary)] flex justify-between">
                  <span>{c.name}</span>
                  <span className="text-gold-main font-data">+{c.bonusPoints} pts</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="font-body text-sm text-[var(--text-tertiary)]">
          {getLevelName()} (Nível {level}) · Recorde: {highScore} pts · Partidas: {gamesPlayed}
        </p>

        <div className="flex flex-col gap-3 pt-4">
          <Button variant="primary" size="lg" onClick={handlePlayAgain} fullWidth>
            Jogar de novo
          </Button>
          {onSaveProgress && (
            <Button variant="secondary" size="md" onClick={onSaveProgress} fullWidth>
              Salvar Progresso
            </Button>
          )}
          {onReceiveNFT && (
            <Button variant="secondary" size="md" onClick={onReceiveNFT} fullWidth>
              Receber NFT
            </Button>
          )}
          {onConsultoria && (
            <Button variant="ghost" size="md" onClick={onConsultoria} fullWidth>
              Consultoria Grátis
            </Button>
          )}
          {onLeaderboard && (
            <Button variant="ghost" size="md" onClick={onLeaderboard} fullWidth>
              Leaderboard
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
