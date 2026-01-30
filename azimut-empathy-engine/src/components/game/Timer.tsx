export interface TimerProps {
  seconds: number
  label?: string
  variant?: 'default' | 'warning' | 'danger'
  className?: string
}

const variantClass = {
  default: 'text-[var(--text-primary)]',
  warning: 'text-amber-400',
  danger: 'text-red-400',
}

export default function Timer({ seconds, label = 'Tempo', variant = 'default', className = '' }: TimerProps) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const str = `${m}:${s.toString().padStart(2, '0')}`
  return (
    <div className={`font-data tabular-nums ${variantClass[variant]} ${className}`}>
      {label && <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] block font-body">{label}</span>}
      <span className="text-xl font-bold">{str}</span>
    </div>
  )
}
