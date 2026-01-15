/**
 * Hook para selecionar imagem baseada na hora do dia
 * Premium feature - mostra Vancouver no momento certo
 */
import { useState, useEffect } from 'react'

interface TimeBasedImage {
  primary: string
  carousel: string[]
  period: string
  vancouverTime: string
  vancouverHour: number
}

export const useTimeBasedImage = (): TimeBasedImage => {
  const [currentImage, setCurrentImage] = useState<TimeBasedImage>({
    primary: '/vancouver-hero-sunset.jpg', // Fallback
    carousel: [],
    period: 'sunset',
    vancouverTime: '18:00',
    vancouverHour: 18
  })

  useEffect(() => {
    const getImageByTime = (): TimeBasedImage => {
      const now = new Date()
      const hour = now.getHours()
      
      // Calcular hora de Vancouver (Pacific Time: UTC-8 ou UTC-7 no horário de verão)
      const vancouverTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Vancouver' }))
      const vancouverHour = vancouverTime.getHours()
      const vancouverMinutes = vancouverTime.getMinutes()
      const vancouverTimeString = `${vancouverHour.toString().padStart(2, '0')}:${vancouverMinutes.toString().padStart(2, '0')}`

      // MADRUGADA (0-5h) - Noite tranquila
      if (hour >= 0 && hour < 6) {
        return {
          primary: '/vancouver-hero-night.jpg',
          carousel: ['/vancouver-hero-night.jpg', '/vancouver-hero-twilight.jpg'],
          period: 'night',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // MANHÃ (6-11h) - Dia ensolarado
      if (hour >= 6 && hour < 12) {
        return {
          primary: '/vancouver-hero-day.jpg',
          carousel: ['/vancouver-hero-day.jpg', '/vancouver-hero-flag.jpg'],
          period: 'morning',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // MEIO-DIA (12-14h) - Dia energético
      if (hour >= 12 && hour < 15) {
        return {
          primary: '/vancouver-hero-day.jpg',
          carousel: ['/vancouver-hero-day.jpg', '/vancouver-hero-aerial.jpg'],
          period: 'noon',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // TARDE (15-17h) - Golden hour se aproximando
      if (hour >= 15 && hour < 18) {
        return {
          primary: '/vancouver-hero-aerial.jpg',
          carousel: ['/vancouver-hero-aerial.jpg', '/vancouver-hero-flag.jpg', '/vancouver-hero-sunset.jpg'],
          period: 'afternoon',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // PRÉ-SUNSET (17-20h) - Sunset épico ⭐ (JANELA MAIOR!)
      if (hour >= 17 && hour < 20) {
        return {
          primary: '/vancouver-hero-sunset.jpg',
          carousel: ['/vancouver-hero-sunset.jpg', '/vancouver-hero-aerial.jpg', '/vancouver-hero-twilight.jpg'],
          period: 'sunset',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // BLUE HOUR (20-21h) - Crepúsculo
      if (hour >= 20 && hour < 22) {
        return {
          primary: '/vancouver-hero-twilight.jpg',
          carousel: ['/vancouver-hero-twilight.jpg', '/vancouver-hero-sunset.jpg'],
          period: 'twilight',
          vancouverTime: vancouverTimeString,
          vancouverHour
        }
      }

      // NOITE (22-23h) - Noite com luzes
      return {
        primary: '/vancouver-hero-night.jpg',
        carousel: ['/vancouver-hero-night.jpg', '/vancouver-hero-twilight.jpg'],
        period: 'evening',
        vancouverTime: vancouverTimeString,
        vancouverHour
      }
    }

    setCurrentImage(getImageByTime())

    // Atualizar a cada 30 minutos (caso usuário fique na página)
    const interval = setInterval(() => {
      setCurrentImage(getImageByTime())
    }, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return currentImage
}
