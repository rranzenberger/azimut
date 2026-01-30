import { type HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'red' | 'gold' | 'outline' | 'muted'
  size?: 'sm' | 'md' | 'lg'
}

const variantClass = {
  default: 'bg-bg-mid text-[var(--text-secondary)] border border-white/10',
  red: 'bg-azimut-red/20 text-azimut-red border border-azimut-red/30',
  gold: 'bg-gold-main/15 text-gold-main border border-gold-main/30',
  outline: 'bg-transparent text-[var(--text-secondary)] border border-white/20',
  muted: 'bg-white/5 text-[var(--text-tertiary)] border border-white/10',
}
const sizeClass = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm', lg: 'px-3 py-1.5 text-base' }

export default function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg font-body font-medium ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...props}
    />
  )
}
