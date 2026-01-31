import React from 'react'

// Importar a imagem para o Vite resolver o caminho (evita placeholder em dev/build com base /game/)
import mapleLeafImg from '../../assets/Maple-Leaf-Canada.png'

export const MAPLE_LEAF_ICON = 'maple-leaf'

export interface TopicIconProps {
  icon: string
  size?: number
  className?: string
  style?: React.CSSProperties
  /** Cor da maple leaf (usa máscara para pintar o ícone). Se não informado, usa a imagem original. */
  iconColor?: string
}

/** Renderiza ícone do tópico: imagem maple leaf (assets) ou emoji. */
export default function TopicIcon({ icon, size = 20, className = '', style, iconColor }: TopicIconProps) {
  if (icon === MAPLE_LEAF_ICON) {
    if (iconColor) {
      return (
        <span
          className={className}
          role="img"
          aria-hidden
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            width: size,
            height: size,
            backgroundColor: iconColor,
            WebkitMaskImage: `url(${mapleLeafImg})`,
            maskImage: `url(${mapleLeafImg})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            ...style,
          }}
        />
      )
    }
    return (
      <img
        src={mapleLeafImg}
        alt=""
        width={size}
        height={size}
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain', ...style }}
      />
    )
  }
  return (
    <span className={className} style={{ fontSize: size, lineHeight: 1, ...style }}>
      {icon}
    </span>
  )
}
