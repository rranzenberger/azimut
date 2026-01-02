import React from 'react'

// ═══════════════════════════════════════════════════════════════
// BUTTON COMPONENT - Design System Azimut
// ═══════════════════════════════════════════════════════════════
// Componente universal de botão com 3 variantes e 3 tamanhos
// Usa CSS Variables para temas dark/light

interface ButtonProps {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg'
  /** Conteúdo do botão */
  children: React.ReactNode
  /** Evento de clique */
  onClick?: () => void
  /** Tipo do botão (button, submit, reset) */
  type?: 'button' | 'submit' | 'reset'
  /** Desabilitar botão */
  disabled?: boolean
  /** Classes CSS adicionais */
  className?: string
  /** Largura total (100%) */
  fullWidth?: boolean
  /** Ícone antes do texto */
  iconBefore?: React.ReactNode
  /** Ícone depois do texto */
  iconAfter?: React.ReactNode
}

/**
 * Componente Button - Botão universal do Design System
 * 
 * @example
 * // Primary button (padrão)
 * <Button onClick={handleClick}>Enviar</Button>
 * 
 * @example
 * // Secondary button com ícone
 * <Button variant="secondary" iconBefore={<Icon />}>
 *   Ver Mais
 * </Button>
 * 
 * @example
 * // Ghost button pequeno
 * <Button variant="ghost" size="sm">
 *   Cancelar
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
  iconBefore,
  iconAfter
}) => {
  // Estilos base (comum a todas as variantes)
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-sora font-medium uppercase tracking-wider
    transition-all ease-out
    rounded-lg
    cursor-pointer
    touch-manipulation
    select-none
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  // Tamanhos (usando CSS Variables)
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs min-h-[36px]',
    md: 'px-6 py-3 text-sm min-h-[44px]',
    lg: 'px-8 py-4 text-base min-h-[52px]'
  }

  // Variantes (usando CSS Variables)
  const variantStyles: Record<typeof variant, string> = {
    primary: `
      bg-azimut-red text-white
      hover:bg-azimut-red-light
      active:scale-95
    `,
    secondary: `
      border-2 text-azimut-red
      hover:bg-azimut-red hover:text-white
      active:scale-95
    `,
    ghost: `
      text-azimut-red bg-transparent
      hover:bg-azimut-red/10
      active:scale-98
    `
  }

  // Sombras por variante
  const shadowStyles: Record<typeof variant, string> = {
    primary: disabled ? '' : 'shadow-md hover:shadow-lg',
    secondary: '',
    ghost: ''
  }

  // Transições por tamanho
  const transitionStyles = {
    sm: 'duration-150',
    md: 'duration-200',
    lg: 'duration-250'
  }

  // Border por variante
  const borderStyles: Record<typeof variant, string> = {
    primary: 'border-2 border-azimut-red',
    secondary: 'border-azimut-red',
    ghost: 'border-2 border-transparent'
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${shadowStyles[variant]}
        ${transitionStyles[size]}
        ${borderStyles[variant]}
        ${className}
      `}
      style={{
        transition: `all var(--transition-${size === 'sm' ? 'fast' : size === 'md' ? 'base' : 'slow'}) var(--ease-out)`
      }}
    >
      {iconBefore && <span className="flex-shrink-0">{iconBefore}</span>}
      <span>{children}</span>
      {iconAfter && <span className="flex-shrink-0">{iconAfter}</span>}
    </button>
  )
}

export default Button

