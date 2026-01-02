import React from 'react'

// ═══════════════════════════════════════════════════════════════
// CARD COMPONENT - Design System Azimut
// ═══════════════════════════════════════════════════════════════
// Componente universal de card com 3 variantes
// Usa CSS Variables para temas dark/light e classes do index.css

interface CardProps {
  /** Variante visual do card */
  variant?: 'default' | 'elevated' | 'glass'
  /** Conteúdo do card */
  children: React.ReactNode
  /** Classes CSS adicionais */
  className?: string
  /** Padding customizado (usa CSS Variables) */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Card clicável (adiciona hover states) */
  clickable?: boolean
  /** Evento de clique (se clickable) */
  onClick?: () => void
  /** Border radius customizado */
  rounded?: 'md' | 'lg' | 'xl' | '2xl'
}

/**
 * Componente Card - Container universal do Design System
 * 
 * @example
 * // Card padrão
 * <Card>
 *   <h3>Título</h3>
 *   <p>Conteúdo</p>
 * </Card>
 * 
 * @example
 * // Card elevated com hover
 * <Card variant="elevated" clickable onClick={handleClick}>
 *   Clique aqui
 * </Card>
 * 
 * @example
 * // Card glass sem padding
 * <Card variant="glass" padding="none">
 *   <img src="..." />
 * </Card>
 */
const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  padding = 'md',
  clickable = false,
  onClick,
  rounded = 'lg'
}) => {
  // Padding usando CSS Variables
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',  // var(--spacing-3)
    md: 'p-6',  // var(--spacing-6)
    lg: 'p-8',  // var(--spacing-8)
    xl: 'p-12' // var(--spacing-12)
  }

  // Border radius
  const roundedStyles = {
    md: 'rounded-md',   // var(--radius-md)
    lg: 'rounded-lg',   // var(--radius-lg)
    xl: 'rounded-xl',   // var(--radius-xl)
    '2xl': 'rounded-2xl' // var(--radius-2xl)
  }

  // Variantes (usando classes do index.css)
  const variantStyles: Record<typeof variant, string> = {
    default: 'card-adaptive', // já existe no index.css
    elevated: `
      card-adaptive 
      shadow-md 
      ${clickable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
    `,
    glass: 'glass' // já existe no index.css
  }

  // Estilos de transição
  const transitionStyles = `
    transition-all 
    ease-out
  `

  // Estilo de cursor se clicável
  const cursorStyle = clickable ? 'cursor-pointer' : ''

  // Hover states se clicável
  const hoverStyles = clickable ? `
    hover:border-azimut-red/50
    active:scale-[0.98]
  ` : ''

  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${roundedStyles[rounded]}
        ${transitionStyles}
        ${cursorStyle}
        ${hoverStyles}
        ${className}
      `}
      style={{
        transitionDuration: 'var(--transition-base)',
        transitionTimingFunction: 'var(--ease-out)'
      }}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      } : undefined}
    >
      {children}
    </div>
  )
}

export default Card

