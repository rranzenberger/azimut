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

      // MADRUGADA (0-5h) - Science World à noite ⭐ (6 horas)
      if (hour >= 0 && hour < 6) {
        return {
          image: '/vancouver-hero-madrugada.jpg',
          period: 'night',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // AMANHECER (6-7h) - Twilight (2 horas)
      if (hour >= 6 && hour < 8) {
        return {
          image: '/vancouver-hero-twilight.jpg',
          period: 'dawn',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // MANHÃ (8-10h) - Dia ensolarado marina (3 horas)
      if (hour >= 8 && hour < 11) {
        return {
          image: '/vancouver-hero-day.jpg',
          period: 'morning',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // MEIO-DIA (11-13h) - Vista aérea sunset ⭐ (3 horas)
      if (hour >= 11 && hour < 14) {
        return {
          image: '/vancouver-hero-aerial.jpg',
          period: 'noon',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // TARDE (14-15h) - Bandeira do Canadá 🇨🇦 (2 horas)
      if (hour >= 14 && hour < 16) {
        return {
          image: '/vancouver-hero-flag.jpg',
          period: 'afternoon',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // SUNSET (16-21h) - Sunset Science World ⭐⭐ DESTAQUE! (6 horas)
      if (hour >= 16 && hour < 22) {
        return {
          image: '/vancouver-hero-sunset.jpg',
          period: 'sunset',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // NOITE (22-23h) - False Creek luzes (2 horas)
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
