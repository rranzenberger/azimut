import React, { useEffect, useState } from 'react'

interface StarBackgroundProps {
  className?: string
  style?: React.CSSProperties
  position?: 'fixed' | 'absolute' | 'relative'
  zIndex?: number
  opacity?: number
}

/**
 * Componente reutilizável para a estrela de fundo da Azimut
 * Detecta automaticamente o tema (dark/light) e usa o SVG apropriado
 */
const StarBackground: React.FC<StarBackgroundProps> = ({
  className = '',
  style = {},
  position = 'fixed',
  zIndex = -10,
  opacity = 0.5
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Detectar tema inicial
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(currentTheme === 'light' ? 'light' : 'dark')

    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
      setTheme(newTheme === 'light' ? 'light' : 'dark')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  // Escolher SVG baseado no tema
  const starSrc = theme === 'light' 
    ? '/logo-azimut-escuro.svg'  // Tema claro: linhas escuras
    : '/logo-azimut-star.svg'     // Tema escuro: linhas brancas

  const defaultStyle: React.CSSProperties = {
    position,
    zIndex,
    opacity,
    pointerEvents: 'none',
    ...style
  }

  return (
    <div
      className={`${className}`}
      style={defaultStyle}
    >
      <img
        src={starSrc}
        alt=""
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}

export default StarBackground
