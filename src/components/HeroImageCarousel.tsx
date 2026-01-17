/**
 * Hero image com efeito Ken Burns (zoom que para)
 * Uma imagem por horário - cinematográfico premium
 */
import React from 'react'

interface HeroImageProps {
  image: string
}

const HeroImage: React.FC<HeroImageProps> = ({ image }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Imagem com Ken Burns - zoom suave que para */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'kenBurnsOnce 8s ease-out forwards'
        }}
      />
      
      {/* Overlay cinematográfico premium - vinheta + gradiente */}
      <div className="absolute inset-0 hero-cinematic-overlay" />
    </div>
  )
}

export default HeroImage
