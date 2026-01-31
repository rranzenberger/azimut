import type { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'back'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

const base =
  'font-display font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azimut-red disabled:opacity-50 disabled:pointer-events-none'
const variants = {
  primary:
    'bg-gradient-to-br from-azimut-red to-azimut-red-dark text-white border border-azimut-red/30 shadow-[0_0_20px_rgba(201,35,55,0.3)] hover:shadow-[0_0_28px_rgba(201,35,55,0.45)] hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-bg-mid/80 text-[var(--text-primary)] border border-white/15 backdrop-blur-sm hover:bg-bg-mid hover:border-white/25 hover:scale-[1.02] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] border border-transparent hover:bg-white/5 hover:text-[var(--text-primary)] hover:border-white/10',
  back:
    'bg-white/[0.06] text-white border border-[rgba(201,35,55,0.6)] hover:bg-azimut-red/10 hover:border-azimut-red/70 hover:text-azimut-red',
}
const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type="button"
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Carregando...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
