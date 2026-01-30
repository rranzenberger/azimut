import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Input({
  label,
  error,
  hint,
  fullWidth,
  size = 'md',
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.replace(/\s/g, '-').toLowerCase() : undefined)
  const sizeClass =
    size === 'sm' ? 'px-3 py-2 text-sm' : size === 'lg' ? 'px-4 py-3 text-base' : 'px-4 py-2.5 text-sm'
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border bg-bg-dark/80 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/20 focus:outline-none transition-all ${error ? 'border-red-500' : 'border-white/15'} ${sizeClass} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-[var(--text-tertiary)]">{hint}</p>}
    </div>
  )
}
