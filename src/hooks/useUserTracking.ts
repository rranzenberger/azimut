import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { addPoints, loadProgress, saveProgress } from '../utils/gamification'
import { trackTimeOnPage } from '../utils/analytics'

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
  const sessionIdRef = useRef<string>('')

  // Inicializar sessionId de forma segura (dentro de useEffect)
  useEffect(() => {
    try {
      const session = getOrCreateSession()
      sessionIdRef.current = session.sessionId
    } catch (error) {
      // Se houver erro, criar um sessionId temporário
      console.warn('Erro ao criar sessão de tracking:', error)
      sessionIdRef.current = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    }
  }, [])

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

    try {
      trackPageView(path)
      // Track time on page detalhado
      const cleanupTimeTracking = trackTimeOnPage(path)
      
      return () => {
        cleanupTimeTracking()
        try {
          const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
          updatePageVisit(path, timeSpent, maxScrollRef.current)
        } catch (error) {
          // Silencioso - não quebrar renderização
          if (process.env.NODE_ENV === 'development') {
            console.warn('Erro ao atualizar page visit:', error)
          }
        }
      }
    } catch (error) {
      // Se tracking falhar, não quebrar renderização
      if (process.env.NODE_ENV === 'development') {
        console.warn('Erro ao rastrear page view:', error)
      }
      return () => {}
    }
  }, [location.pathname])

  // Para interações explícitas (CTA, projeto, idioma)
  const trackInteraction = (type: InteractionType, target: string) => {
    try {
      addInteraction(type, target)
    } catch (error) {
      // Se tracking falhar, não quebrar aplicação
      console.warn('Erro ao rastrear interação:', error)
    }
  }

  return { trackInteraction, sessionId: sessionIdRef.current }
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
  
  // 🎮 GAMIFICATION: Award pontos por visualização de página
  try {
    const progress = loadProgress()
    const isFirstVisit = progress.stats.pagesVisited === 0
    
    if (isFirstVisit) {
      addPoints('firstTimeVisitor')
    } else {
      addPoints('pageView')
    }
    
    // Atualizar stats
    progress.stats.pagesVisited++
    saveProgress(progress)
    
    // Disparar evento para atualizar widget
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gamification-update'))
    }
  } catch (e) {
    // Silencioso - gamificação é extra, não deve quebrar
  }
}

function updatePageVisit(path: string, timeSpent: number, scrollDepth: number) {
  const session = getOrCreateSession()
  const lastPage = session.pages[session.pages.length - 1]

  if (lastPage && lastPage.path === path) {
    lastPage.timeSpent = timeSpent
    lastPage.scrollDepth = scrollDepth
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  
  // 🎮 GAMIFICATION: Award pontos por scroll profundo e tempo gasto
  try {
    const progress = loadProgress()
    
    // Deep scroll (>80%)
    if (scrollDepth > 80) {
      addPoints('deepScroll', { scrollDepth })
    }
    
    // Long visit (>2 minutos = 120 segundos)
    if (timeSpent > 120) {
      addPoints('longVisit', { timeSpent })
    }
    
    // Atualizar stats
    progress.stats.timeSpent += timeSpent
    progress.stats.scrollDepth = Math.max(progress.stats.scrollDepth, scrollDepth)
    saveProgress(progress)
    
    // Disparar evento
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gamification-update'))
    }
  } catch (e) {
    // Silencioso
  }
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


































