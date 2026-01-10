// ════════════════════════════════════════════════════════════
// INTELLIGENT NAVIGATION SYSTEM
// ════════════════════════════════════════════════════════════
// Sistema completo de detecção de perfil e navegação personalizada
// ════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'

export type UserProfile = 
  | 'student'      // 18-25, busca Vancouver/Courses
  | 'business'     // 30-55, busca Corporate/Projects
  | 'museum'       // 40-65, busca Projects (cultura)
  | 'tourist'      // qualquer, busca Exposições locais
  | 'investor'     // 40-70, busca Research/Grandes projetos
  | 'unknown'

export interface UserContext {
  profile: UserProfile
  location: {
    country?: string
    city?: string
    region?: string
    coords?: { lat: number, lng: number }
  }
  interests: string[]
  behavior: {
    visitedPages: string[]
    timeOnSite: number
    scrollDepth: number
    clickedCTAs: string[]
  }
  device: {
    type: 'mobile' | 'tablet' | 'desktop'
    os?: string
  }
}

export interface SmartRecommendation {
  type: 'page' | 'project' | 'cta' | 'exhibition'
  title: string
  description: string
  url: string
  priority: number
  reason: string
}

// Hook principal de navegação inteligente
export const useIntelligentNavigation = () => {
  const [userContext, setUserContext] = useState<UserContext>({
    profile: 'unknown',
    location: {},
    interests: [],
    behavior: {
      visitedPages: [],
      timeOnSite: 0,
      scrollDepth: 0,
      clickedCTAs: []
    },
    device: {
      type: 'desktop'
    }
  })

  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([])

  useEffect(() => {
    detectUserProfile()
    detectLocation()
    trackBehavior()
  }, [])

  // Detectar perfil do usuário
  const detectUserProfile = () => {
    const behaviors = {
      visitedAcademyPages: false,
      visitedCorporatePages: false,
      visitedMuseumProjects: false,
      timeOfDay: new Date().getHours(),
      deviceType: getDeviceType()
    }

    // Lógica de detecção
    const pages = window.location.pathname
    
    if (pages.includes('/academy/vancouver') || pages.includes('/academy/courses')) {
      behaviors.visitedAcademyPages = true
    }
    
    if (pages.includes('/academy/corporate')) {
      behaviors.visitedCorporatePages = true
    }

    if (pages.includes('/project/')) {
      behaviors.visitedMuseumProjects = true
    }

    // Determinar perfil
    let profile: UserProfile = 'unknown'

    if (behaviors.visitedAcademyPages) {
      profile = 'student'
    } else if (behaviors.visitedCorporatePages) {
      profile = 'business'
    } else if (behaviors.visitedMuseumProjects) {
      profile = 'museum'
    } else if (behaviors.timeOfDay >= 9 && behaviors.timeOfDay <= 18) {
      profile = 'business' // Horário comercial
    } else {
      profile = 'student' // Fora do horário
    }

    setUserContext(prev => ({ ...prev, profile, device: { type: behaviors.deviceType } }))
  }

  // Detectar localização
  const detectLocation = async () => {
    try {
      // 1. Tentar geolocation do browser
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserContext(prev => ({
              ...prev,
              location: {
                ...prev.location,
                coords: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              }
            }))
            
            // Reverse geocoding (opcional, se tiver API)
            reverseGeocode(position.coords.latitude, position.coords.longitude)
          },
          (error) => {
            console.warn('Geolocation denied', error)
            fallbackIPLocation()
          }
        )
      } else {
        fallbackIPLocation()
      }
    } catch (error) {
      console.error('Location detection error:', error)
    }
  }

  // Fallback: detectar por IP
  const fallbackIPLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      
      setUserContext(prev => ({
        ...prev,
        location: {
          country: data.country_name,
          city: data.city,
          region: data.region
        }
      }))
    } catch (error) {
      console.error('IP location error:', error)
    }
  }

  // Reverse geocoding (converter coords em cidade/país)
  const reverseGeocode = async (lat: number, lng: number) => {
    // Implementar com Google Maps API ou similar
    // Por enquanto, apenas salvamos as coordenadas
  }

  // Rastrear comportamento
  const trackBehavior = () => {
    // Track visited pages
    const currentPage = window.location.pathname
    setUserContext(prev => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        visitedPages: [...new Set([...prev.behavior.visitedPages, currentPage])]
      }
    }))

    // Track time on site
    const startTime = Date.now()
    const trackTime = setInterval(() => {
      setUserContext(prev => ({
        ...prev,
        behavior: {
          ...prev.behavior,
          timeOnSite: Math.floor((Date.now() - startTime) / 1000)
        }
      }))
    }, 5000) // Update every 5s

    // Track scroll depth
    const trackScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100

      setUserContext(prev => ({
        ...prev,
        behavior: {
          ...prev.behavior,
          scrollDepth: Math.max(prev.behavior.scrollDepth, Math.round(scrollPercent))
        }
      }))
    }

    window.addEventListener('scroll', trackScroll)

    return () => {
      clearInterval(trackTime)
      window.removeEventListener('scroll', trackScroll)
    }
  }

  // Gerar recomendações inteligentes
  const generateRecommendations = (): SmartRecommendation[] => {
    const recs: SmartRecommendation[] = []
    const { profile, location } = userContext

    // Recomendações por perfil
    switch (profile) {
      case 'student':
        recs.push({
          type: 'page',
          title: 'Study in Vancouver',
          description: 'Transform your career with VFS/VanArts programs',
          url: '/academy/vancouver',
          priority: 10,
          reason: 'Perfect for young professionals'
        })
        break

      case 'business':
        recs.push({
          type: 'page',
          title: 'Corporate Training',
          description: 'Upskill your team with VR, AI, and immersive tech',
          url: '/academy/corporate',
          priority: 10,
          reason: 'Ideal for companies'
        })
        break

      case 'museum':
        recs.push({
          type: 'page',
          title: 'Museum Projects',
          description: 'Immersive experiences for cultural institutions',
          url: '/work?filter=museum',
          priority: 10,
          reason: 'Based on your interests'
        })
        break

      case 'tourist':
        recs.push({
          type: 'exhibition',
          title: 'Current Exhibitions',
          description: 'See what\'s happening near you',
          url: '/exhibitions',
          priority: 10,
          reason: 'Based on your location'
        })
        break

      case 'investor':
        recs.push({
          type: 'page',
          title: 'Research & Innovation',
          description: 'Cutting-edge cultural tech',
          url: '/research',
          priority: 10,
          reason: 'For decision makers'
        })
        break
    }

    // Recomendações por localização
    if (location.country === 'Canada') {
      recs.push({
        type: 'cta',
        title: 'Visit Our Vancouver Office',
        description: 'Schedule an in-person meeting',
        url: '/contact?location=vancouver',
        priority: 8,
        reason: 'You\'re in Canada'
      })
    }

    if (location.country === 'Brazil' || location.country === 'Brasil') {
      recs.push({
        type: 'project',
        title: 'Projects in Brazil',
        description: 'See our work in your region',
        url: '/work?country=brazil',
        priority: 9,
        reason: 'Based on your location'
      })
    }

    return recs.sort((a, b) => b.priority - a.priority)
  }

  // Atualizar recomendações quando contexto mudar
  useEffect(() => {
    const recs = generateRecommendations()
    setRecommendations(recs)
  }, [userContext.profile, userContext.location])

  return {
    userContext,
    recommendations,
    updateProfile: (profile: UserProfile) => setUserContext(prev => ({ ...prev, profile })),
    trackCTAClick: (cta: string) => {
      setUserContext(prev => ({
        ...prev,
        behavior: {
          ...prev.behavior,
          clickedCTAs: [...prev.behavior.clickedCTAs, cta]
        }
      }))
    }
  }
}

// Helper: Get device type
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Export helper functions
export const getProfileLabel = (profile: UserProfile, lang: string = 'pt'): string => {
  const labels = {
    pt: {
      student: 'Estudante',
      business: 'Empresário',
      museum: 'Instituição Cultural',
      tourist: 'Visitante',
      investor: 'Investidor',
      unknown: 'Visitante'
    },
    en: {
      student: 'Student',
      business: 'Business',
      museum: 'Cultural Institution',
      tourist: 'Visitor',
      investor: 'Investor',
      unknown: 'Visitor'
    }
  }

  return labels[lang as 'pt' | 'en']?.[profile] || labels.en[profile]
}

export default useIntelligentNavigation
