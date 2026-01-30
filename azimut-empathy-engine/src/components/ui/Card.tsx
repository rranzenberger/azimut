import { type HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'bordered'
  padding?: 'sm' | 'md' | 'lg'
  clickable?: boolean
}

const base = 'rounded-2xl border transition-all duration-200'
const variants = {
  default: 'bg-bg-dark/80 border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]',
  elevated: 'bg-bg-mid/90 border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]',
  glass: 'glass-card',
  bordered: 'bg-bg-dark/50 border-azimut-red/30 hover:border-azimut-red/50',
}
const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export default function Card({
  variant = 'default',
  padding = 'md',
  clickable,
  className = '',
  children,
  ...props
}: CardProps) {
  const Comp = motion.div
  return (
    <Comp
      className={`${base} ${variants[variant]} ${paddings[padding]} ${clickable ? 'cursor-pointer hover:scale-[1.01]' : ''} ${className}`}
      whileHover={clickable ? { scale: 1.01 } : undefined}
      whileTap={clickable ? { scale: 0.99 } : undefined}
      {...props}
    >
      {children}
    </Comp>
  )
}
