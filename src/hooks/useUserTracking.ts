import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

type InteractionType = 'cta_click' | 'project_view' | 'service_view' | 'language_change'

interface PageVisit {
  path: string
  timestamp: string
  timeSpent: number // segundos
  scrollDepth: number // percentual
}

interface Interaction {
  type: InteractionType
  target: string
  timestamp: string
}

interface UserSession {
  sessionId: string
  startedAt: string
  pages: PageVisit[]
  interactions: Interaction[]
  interests: string[]
}

const STORAGE_KEY = 'azimut_user_session'

export function useUserTracking() {
  const location = useLocation()
  const startTimeRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)

  // Tracking de scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      )

      if (scrollPercentage > maxScrollRef.current) {
        maxScrollRef.current = scrollPercentage
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tracking de page view e tempo/scroll na saída
  useEffect(() => {
    const path = location.pathname
    const startTime = Date.now()
    startTimeRef.current = startTime
    maxScrollRef.current = 0

    trackPageView(path)

    return () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      updatePageVisit(path, timeSpent, maxScrollRef.current)
    }
  }, [location.pathname])

  // Para interações explícitas (CTA, projeto, idioma)
  const trackInteraction = (type: InteractionType, target: string) => {
    addInteraction(type, target)
  }

  return { trackInteraction }
}

// Helpers
function getOrCreateSession(): UserSession {
  if (typeof window === 'undefined') {
    return {
      sessionId: 'server',
      startedAt: new Date().toISOString(),
      pages: [],
      interactions: [],
      interests: []
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored) as UserSession
    } catch {
      // se corromper, recria
    }
  }

  const newSession: UserSession = {
    sessionId: generateSessionId(),
    startedAt: new Date().toISOString(),
    pages: [],
    interactions: [],
    interests: []
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession))
  return newSession
}

function trackPageView(path: string) {
  const session = getOrCreateSession()

  session.pages.push({
    path,
    timestamp: new Date().toISOString(),
    timeSpent: 0,
    scrollDepth: 0
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function updatePageVisit(path: string, timeSpent: number, scrollDepth: number) {
  const session = getOrCreateSession()
  const lastPage = session.pages[session.pages.length - 1]

  if (lastPage && lastPage.path === path) {
    lastPage.timeSpent = timeSpent
    lastPage.scrollDepth = scrollDepth
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function addInteraction(type: InteractionType, target: string) {
  const session = getOrCreateSession()

  session.interactions.push({
    type,
    target,
    timestamp: new Date().toISOString()
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}





























