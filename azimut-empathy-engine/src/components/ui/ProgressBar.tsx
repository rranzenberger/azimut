import type { HTMLAttributes } from 'react'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'gold' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showLabel?: boolean
}

const variantClass = {
  default: 'bg-azimut-red',
  gold: 'bg-gold-main',
  purple: 'bg-purple-epic',
}
const sizeClass = { sm: 'h-2', md: 'h-3', lg: 'h-4' }

export default function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showLabel = false,
  className = '',
  ...props
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={className} {...props}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-[var(--text-secondary)] font-body">{label}</span>}
          {showLabel && (
            <span className="text-sm font-data tabular-nums text-[var(--text-primary)]">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full bg-bg-mid overflow-hidden ${sizeClass[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${variantClass[variant]} ${sizeClass[size]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
