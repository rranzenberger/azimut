/**
 * Componente Canada PR com Maple Leaf VERMELHA garantida
 * Usa bandeira do Canadá 🇨🇦 + SVG de maple leaf vermelha Azimut
 */
import React from 'react'

interface CanadaMapleLeafProps {
  /** Mostrar apenas a maple leaf SVG sem a bandeira */
  leafOnly?: boolean
  /** Tamanho da maple leaf SVG */
  size?: 'sm' | 'md' | 'lg'
  /** Classes CSS adicionais */
  className?: string
}

const CanadaMapleLeaf: React.FC<CanadaMapleLeafProps> = ({ 
  leafOnly = false,
  size = 'sm', 
  className = '' 
}) => {
  const sizeMap = {
    sm: '14',
    md: '18',
    lg: '22'
  }

  const svgSize = sizeMap[size]

  // SVG Maple Leaf VERMELHA (cor oficial Azimut)
  const MapleLeafSVG = (
    <svg 
      width={svgSize} 
      height={svgSize} 
      viewBox="0 0 60 60" 
      fill="#c92337"
      className="inline-block align-middle"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
      aria-label="Maple Leaf"
    >
      <path d="M30,5 L28,12 L24,10 L25,15 L20,16 L23,19 L20,23 L25,23 L23,28 L27,26 L28,30 L30,25 L32,30 L33,26 L37,28 L35,23 L40,23 L37,19 L40,16 L35,15 L36,10 L32,12 L30,5 Z M28,32 L26,40 L30,55 L34,40 L32,32 L30,35 L28,32 Z" />
    </svg>
  )

  if (leafOnly) {
    return <span className={className}>{MapleLeafSVG}</span>
  }

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      <span className="align-middle">🇨🇦</span>
      {MapleLeafSVG}
    </span>
  )
}

export default CanadaMapleLeaf
