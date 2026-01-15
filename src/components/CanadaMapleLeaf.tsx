/**
 * Componente Canada PR com Maple Leaf VERMELHA oficial
 * Usa bandeira do Canadá 🇨🇦 + PNG oficial da maple leaf vermelha
 */
import React from 'react'

interface CanadaMapleLeafProps {
  /** Mostrar apenas a maple leaf PNG sem a bandeira */
  leafOnly?: boolean
  /** Tamanho da maple leaf PNG */
  size?: 'sm' | 'md' | 'lg' | 'match-text'
  /** Classes CSS adicionais */
  className?: string
}

const CanadaMapleLeaf: React.FC<CanadaMapleLeafProps> = ({ 
  leafOnly = false,
  size = 'sm', 
  className = '' 
}) => {
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 22,
    'match-text': '1em' // Tamanho igual ao texto ao lado
  }

  const imgSize = size === 'match-text' ? sizeMap['match-text'] : sizeMap[size as 'sm' | 'md' | 'lg']

  // Maple Leaf PNG oficial do Canadá
  const MapleLeafImage = (
    <img 
      src="/Maple-Leaf-Canada.png" 
      alt="Canada Maple Leaf"
      width={typeof imgSize === 'number' ? imgSize : undefined}
      height={typeof imgSize === 'number' ? imgSize : undefined}
      className="inline-block"
      style={{ 
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
        verticalAlign: 'middle',
        width: typeof imgSize === 'string' ? imgSize : undefined,
        height: typeof imgSize === 'string' ? imgSize : undefined,
        display: 'inline-block'
      }}
    />
  )

  if (leafOnly) {
    return <span className={className}>{MapleLeafImage}</span>
  }

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      <span className="align-middle">🇨🇦</span>
      {MapleLeafImage}
    </span>
  )
}

export default CanadaMapleLeaf
