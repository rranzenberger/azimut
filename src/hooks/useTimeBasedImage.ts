/**
 * Hook para selecionar imagem baseada na hora de VANCOUVER (não local)
 * Uma imagem por período - sem carousel
 * A imagem corresponde ao horário atual de Vancouver
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
      
      // Calcular hora de Vancouver (Pacific Time) - USA APENAS ESTA HORA
      const vancouverTimeString = now.toLocaleString('en-US', { 
        timeZone: 'America/Vancouver',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      
      // Extrair hora e minutos de Vancouver
      const vancouverDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Vancouver' }))
      const vancouverHour = vancouverDate.getHours()
      const vancouverMinutes = vancouverDate.getMinutes()
      const vancouverTimeFormatted = `${vancouverHour.toString().padStart(2, '0')}:${vancouverMinutes.toString().padStart(2, '0')}`

      // USAR APENAS HORA DE VANCOUVER para determinar a imagem
      // MADRUGADA (0-5h) - Science World à noite ⭐ (6 horas)
      if (vancouverHour >= 0 && vancouverHour < 6) {
        return {
          image: '/vancouver-hero-madrugada.jpg',
          period: 'night',
          vancouverTime: vancouverTimeFormatted,
          vancouverHour
        }
      }

      // AMANHECER (6-7h) - Twilight (2 horas)
      if (vancouverHour >= 6 && vancouverHour < 8) {
        return {
          image: '/vancouver-hero-twilight.jpg',
          period: 'dawn',
          vancouverTime: vancouverTimeFormatted,
          vancouverHour
        }
      }

      // MANHÃ (8-10h) - Dia ensolarado marina (3 horas)
      if (vancouverHour >= 8 && vancouverHour < 11) {
        return {
          image: '/vancouver-hero-day.jpg',
          period: 'morning',
          vancouverTime: vancouverTimeFormatted,
          vancouverHour
        }
      }

      // MEIO-DIA (11-13h) - Vista aérea sunset ⭐ (3 horas)
      if (vancouverHour >= 11 && vancouverHour < 14) {
        return {
          image: '/vancouver-hero-aerial.jpg',
          period: 'noon',
          vancouverTime: vancouverTimeFormatted,
          vancouverHour
        }
      }

      // TARDE (14-15h) - Bandeira do Canadá 🇨🇦 (2 horas)
      if (vancouverHour >= 14 && vancouverHour < 16) {
        return {
          image: '/vancouver-hero-flag.jpg',
          period: 'afternoon',
          vancouverTime: vancouverTimeFormatted,
          vancouverHour
        }
      }

      // SUNSET (16-21h) - Sunset Science World ⭐⭐ DESTAQUE! (6 horas)
      if (vancouverHour >= 16 && vancouverHour < 22) {
        return {
          image: '/vancouver-hero-sunset.jpg',
          period: 'sunset',
          vancouverTime: vancouverTimeFormatted,
          vancouverHour
        }
      }

      // NOITE (22-23h) - False Creek luzes (2 horas)
      return {
        image: '/vancouver-hero-night.jpg',
        period: 'evening',
        vancouverTime: vancouverTimeFormatted,
        vancouverHour
      }
    }

    setCurrentImage(getImageByTime())

    // Atualizar a cada minuto para manter sincronizado
    const interval = setInterval(() => {
      setCurrentImage(getImageByTime())
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return currentImage
}
