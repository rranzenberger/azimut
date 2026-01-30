import { Button } from '../components/ui'

export interface LeaderboardScreenProps {
  onBack?: () => void
}

export default function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const scores = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('azimut-leaderboard') ?? '[]') : []
  return (
    <div className="min-h-screen bg-bg-darkest p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {onBack && <Button variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>}
        <h1 className="font-display text-3xl font-bold text-azimut-red">Experiências criadas</h1>
        <div className="glass-card rounded-2xl p-6 font-body">
          {scores.length === 0 ? (
            <p className="text-[var(--text-tertiary)]">Nenhuma pontuação ainda. Jogue para aparecer aqui!</p>
          ) : (
            <ul className="space-y-2">
              {scores.slice(0, 10).map((s: { name: string; score: number }, i: number) => (
                <li key={i} className="flex justify-between text-[var(--text-primary)]">
                  <span>{s.name ?? 'Anônimo'}</span>
                  <span className="font-data text-gold-main">{s.score} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
