export interface ScoreDisplayProps {
  score: number
  label?: string
  className?: string
}

export default function ScoreDisplay({ score, label = 'Pontos', className = '' }: ScoreDisplayProps) {
  return (
    <div className={`font-data tabular-nums text-gold-main ${className}`}>
      {label && <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] block font-body">{label}</span>}
      <span className="text-xl font-bold">{score}</span>
    </div>
  )
}
