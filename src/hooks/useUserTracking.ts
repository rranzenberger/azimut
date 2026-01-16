/**
 * Hook para Tracking de Usuários
 * VERSÃO ROBUSTA - NUNCA causa erro #310
 * 
 * Estratégia: Hooks são SEMPRE chamados na mesma ordem
 * Se tracking falhar, falha silenciosamente
 */

import { useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

// ✅ ETAPA 5: TRACKING REATIVADO
// Tracking de comportamento do usuário ativado
const TRACKING_ENABLED = true;

type InteractionType = 'cta_click' | 'project_view' | 'service_view' | 'language_change'

interface PageVisit {
  path: string
  timestamp: string
  timeSpent: number
  scrollDepth: number
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
  const isMounted = useRef(true)

  // Cleanup
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Inicializar sessão
  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    
    try {
      const session = getOrCreateSession()
      sessionIdRef.current = session.sessionId
    } catch {
      sessionIdRef.current = `temp_${Date.now()}`
    }
  }, [])

  // Scroll tracking
  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          try {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const scrollTop = window.scrollY

            const scrollPercentage = Math.round(
              ((scrollTop + windowHeight) / documentHeight) * 100
            )

            if (scrollPercentage > maxScrollRef.current) {
              maxScrollRef.current = scrollPercentage
            }
          } catch {
            // Silencioso
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Page view tracking
  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    
    const path = location.pathname
    startTimeRef.current = Date.now()
    maxScrollRef.current = 0

    try {
      trackPageViewInternal(path)
    } catch {
      // Silencioso
    }
    
    return () => {
      try {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
        updatePageVisitInternal(path, timeSpent, maxScrollRef.current)
      } catch {
        // Silencioso
      }
    }
  }, [location.pathname])

  // Track interaction - SEMPRE retorna função válida
  const trackInteraction = useCallback((type: InteractionType, target: string) => {
    if (!TRACKING_ENABLED) return;
    
    try {
      addInteractionInternal(type, target)
    } catch {
      // Silencioso
    }
  }, [])

  return { 
    trackInteraction, 
    sessionId: sessionIdRef.current 
  }
}

// Helpers internos
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

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as UserSession
    }
  } catch {
    // Recria se corrompido
  }

  const newSession: UserSession = {
    sessionId: generateSessionId(),
    startedAt: new Date().toISOString(),
    pages: [],
    interactions: [],
    interests: []
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession))
  } catch {
    // localStorage pode estar cheio
  }
  
  return newSession
}

function trackPageViewInternal(path: string) {
  const session = getOrCreateSession()

  session.pages.push({
    path,
    timestamp: new Date().toISOString(),
    timeSpent: 0,
    scrollDepth: 0
  })

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Silencioso
  }
}

function updatePageVisitInternal(path: string, timeSpent: number, scrollDepth: number) {
  const session = getOrCreateSession()
  const lastPage = session.pages[session.pages.length - 1]

  if (lastPage && lastPage.path === path) {
    lastPage.timeSpent = timeSpent
    lastPage.scrollDepth = scrollDepth
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Silencioso
  }
}

function addInteractionInternal(type: InteractionType, target: string) {
  const session = getOrCreateSession()

  session.interactions.push({
    type,
    target,
    timestamp: new Date().toISOString()
  })

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Silencioso
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
