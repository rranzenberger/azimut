/**
 * Hook para selecionar imagem baseada na hora LOCAL do usuário
 * Uma imagem por período - sem carousel
 */
import { useState, useEffect } from 'react'

interface TimeBasedImage {
  image: string
  period: string
  vancouverTime: string
  vancouverHour: number
}

export const useTimeBasedImage = (): TimeBasedImage => {
  const [currentImage, setCurrentImage] = useState<TimeBasedImage>({
    image: '/vancouver-hero-sunset.jpg', // Fallback
    period: 'sunset',
    vancouverTime: '18:00',
    vancouverHour: 18
  })

  useEffect(() => {
    const getImageByTime = (): TimeBasedImage => {
      const now = new Date()
      const hour = now.getHours()
      
      // Calcular hora de Vancouver (Pacific Time)
      const vancouverTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Vancouver' }))
      const vancouverHour = vancouverTime.getHours()
      const vancouverMinutes = vancouverTime.getMinutes()
      const vancouverTimeString = `${vancouverHour.toString().padStart(2, '0')}:${vancouverMinutes.toString().padStart(2, '0')}`

      // MADRUGADA (0-4h) - Sunset Science World ⭐ (imagem destaque)
      if (hour >= 0 && hour < 5) {
        return {
          image: '/vancouver-hero-sunset.jpg',
          period: 'night',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // AMANHECER (5-7h) - Twilight/Bluehour
      if (hour >= 5 && hour < 8) {
        return {
          image: '/vancouver-hero-twilight.jpg',
          period: 'dawn',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // MANHÃ (8-11h) - Day marina com reflexo
      if (hour >= 8 && hour < 12) {
        return {
          image: '/vancouver-hero-day.jpg',
          period: 'morning',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // MEIO-DIA (12-14h) - Flag (identidade canadense)
      if (hour >= 12 && hour < 15) {
        return {
          image: '/vancouver-hero-flag.jpg',
          period: 'noon',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // TARDE (15-16h) - Aerial (vista aérea)
      if (hour >= 15 && hour < 17) {
        return {
          image: '/vancouver-hero-aerial.jpg',
          period: 'afternoon',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // SUNSET (17-21h) - Sunset Science World ⭐ JANELA MAIOR
      if (hour >= 17 && hour < 22) {
        return {
          image: '/vancouver-hero-sunset.jpg',
          period: 'sunset',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // NOITE (22-23h) - Night False Creek
      return {
        image: '/vancouver-hero-night.jpg',
        period: 'evening',
        vancouverTime: vancouverTimeString,
        vancouverHour
      }
    }

    setCurrentImage(getImageByTime())

    // Atualizar a cada 30 minutos
    const interval = setInterval(() => {
      setCurrentImage(getImageByTime())
    }, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return currentImage
}
