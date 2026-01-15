/**
 * Carrossel premium de imagens do hero
 * Transição fade suave + efeito Ken Burns
 */
import React, { useState, useEffect } from 'react'

interface HeroImageCarouselProps {
  images: string[]
  interval?: number // ms entre trocas (default: 8000)
}

const HeroImageCarousel: React.FC<HeroImageCarouselProps> = ({ 
  images, 
  interval = 8000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  return (
    <div className="absolute inset-0 z-0">
      {images.map((image, index) => (
        <div
          key={image}
          className={`
            absolute inset-0 transition-opacity duration-[2000ms] ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: index === currentIndex ? 'kenBurns 12s ease-out forwards' : 'none'
          }}
        />
      ))}
      
      {/* Overlay cinematográfico premium - vinheta + gradiente */}
      <div className="absolute inset-0 hero-cinematic-overlay" />
    </div>
  )
}

export default HeroImageCarousel
