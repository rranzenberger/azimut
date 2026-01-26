// ════════════════════════════════════════════════════════════
// USE BEHAVIOR TRACKING - Hook para Tracking Comportamental Avançado
// ════════════════════════════════════════════════════════════
// Expande useUserTracking com dados mais detalhados para IA
// ════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useUserTracking } from './useUserTracking'

export interface BehaviorData {
  // Navegação
  pagesVisited: Array<{
    path: string
    timestamp: number
    timeSpent: number
    scrollDepth: number
  }>
  
  // Interações
  projectsViewed: Array<{
    projectId: string
    projectSlug: string
    timestamp: number
    timeSpent: number
  }>
  
  categoriesClicked: Array<{
    category: string
    timestamp: number
    context: string // 'menu', 'filter', 'card'
  }>
  
  searchesPerformed: Array<{
    query: string
    timestamp: number
    resultsCount: number
  }>
  
  // Comportamento detalhado
  scrollDepth: number // 0-100
  timeOnPage: number // segundos
  timeOnSite: number // segundos total
  
  hoveredElements: Map<string, number> // elementId -> hoverTime (ms)
  
  // Elementos que chamam atenção
  attentionHotspots: Array<{
    elementId: string
    elementType: string
    viewTime: number
    timestamp: number
  }>
  
  // CTAs e conversão
  ctaClicks: Array<{
    ctaId: string
    ctaText: string
    timestamp: number
    page: string
  }>
  
  formInteractions: Array<{
    formId: string
    formType: string
    started: boolean
    completed: boolean
    timestamp: number
  }>
  
  videoInteractions: Array<{
    videoId: string
    played: boolean
    completed: boolean
    watchTime: number
    timestamp: number
  }>
}

const STORAGE_KEY = 'azimut_behavior_data'

export function useBehaviorTracking() {
  const location = useLocation()
  const { trackInteraction } = useUserTracking()
  
  const [behavior, setBehavior] = useState<BehaviorData>(() => {
    // Carregar do localStorage se existir (com verificação SSR)
    if (typeof window === 'undefined') {
      return {
        pagesVisited: [],
        projectsViewed: [],
        categoriesClicked: [],
        searchesPerformed: [],
        scrollDepth: 0,
        timeOnPage: 0,
        timeOnSite: 0,
        hoveredElements: new Map(),
        attentionHotspots: [],
        ctaClicks: [],
        formInteractions: [],
        videoInteractions: []
      }
    }
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Converter hoveredElements de array para Map
        if (parsed.hoveredElements && Array.isArray(parsed.hoveredElements)) {
          parsed.hoveredElements = new Map(parsed.hoveredElements)
        } else {
          parsed.hoveredElements = new Map()
        }
        return parsed
      }
    } catch {
      // Ignorar erros de parse
    }
    
    return {
      pagesVisited: [],
      projectsViewed: [],
      categoriesClicked: [],
      searchesPerformed: [],
      scrollDepth: 0,
      timeOnPage: 0,
      timeOnSite: 0,
      hoveredElements: new Map(),
      attentionHotspots: [],
      ctaClicks: [],
      formInteractions: [],
      videoInteractions: []
    }
  })
  
  const pageStartTimeRef = useRef<number>(Date.now())
  const siteStartTimeRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)
  const hoverTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  
  // Inicializar tempo do site
  useEffect(() => {
    siteStartTimeRef.current = Date.now()
    
    // Atualizar tempo total a cada 5 segundos
    const interval = setInterval(() => {
      setBehavior(prev => ({
        ...prev,
        timeOnSite: Math.floor((Date.now() - siteStartTimeRef.current) / 1000)
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Tracking de página atual
  useEffect(() => {
    pageStartTimeRef.current = Date.now()
    maxScrollRef.current = 0
    
    // Adicionar página visitada
    setBehavior(prev => {
      const newPage = {
        path: location.pathname,
        timestamp: Date.now(),
        timeSpent: 0,
        scrollDepth: 0
      }
      
      // Atualizar última página ou adicionar nova
      const pages = [...prev.pagesVisited]
      const lastPage = pages[pages.length - 1]
      
      if (lastPage && lastPage.path === location.pathname) {
        // Mesma página (navegação interna)
        return prev
      }
      
      // Calcular tempo da página anterior
      if (lastPage) {
        lastPage.timeSpent = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
        lastPage.scrollDepth = maxScrollRef.current
      }
      
      pages.push(newPage)
      
      return {
        ...prev,
        pagesVisited: pages.slice(-20), // Manter últimas 20 páginas
        timeOnPage: 0
      }
    })
    
    // Atualizar tempo na página a cada segundo
    const interval = setInterval(() => {
      setBehavior(prev => ({
        ...prev,
        timeOnPage: Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
      }))
    }, 1000)
    
    return () => {
      clearInterval(interval)
      // Salvar tempo final da página
      setBehavior(prev => {
        const pages = [...prev.pagesVisited]
        const currentPage = pages[pages.length - 1]
        if (currentPage && currentPage.path === location.pathname) {
          currentPage.timeSpent = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
          currentPage.scrollDepth = maxScrollRef.current
        }
        return { ...prev, pagesVisited: pages }
      })
    }
  }, [location.pathname])
  
  // Tracking de scroll depth
  useEffect(() => {
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
              
              setBehavior(prev => ({
                ...prev,
                scrollDepth: Math.max(prev.scrollDepth, scrollPercentage)
              }))
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
  
  // Tracking de hover em elementos
  const trackHover = useCallback((elementId: string, elementType: string) => {
    const startTime = Date.now()
    
    // Limpar timer anterior se existir
    const existingTimer = hoverTimersRef.current.get(elementId)
    if (existingTimer) {
      clearTimeout(existingTimer)
    }
    
    // Timer para salvar hover time após 500ms
    const timer = setTimeout(() => {
      const hoverTime = Date.now() - startTime
      
      setBehavior(prev => {
        const newHovered = new Map(prev.hoveredElements)
        const currentTime = newHovered.get(elementId) || 0
        newHovered.set(elementId, currentTime + hoverTime)
        
        // Adicionar a attention hotspots se hover > 2s
        const hotspots = [...prev.attentionHotspots]
        if (hoverTime > 2000) {
          hotspots.push({
            elementId,
            elementType,
            viewTime: hoverTime,
            timestamp: Date.now()
          })
        }
        
        return {
          ...prev,
          hoveredElements: newHovered,
          attentionHotspots: hotspots.slice(-50) // Últimos 50
        }
      })
      
      hoverTimersRef.current.delete(elementId)
    }, 500)
    
    hoverTimersRef.current.set(elementId, timer)
  }, [])
  
  // Tracking de categoria clicada
  const trackCategoryClick = useCallback((category: string, context: string = 'menu') => {
    setBehavior(prev => ({
      ...prev,
      categoriesClicked: [
        ...prev.categoriesClicked,
        {
          category,
          timestamp: Date.now(),
          context
        }
      ].slice(-50) // Últimas 50
    }))
    
    trackInteraction('category_click', category)
  }, [trackInteraction])
  
  // Tracking de busca
  const trackSearch = useCallback((query: string, resultsCount: number) => {
    setBehavior(prev => ({
      ...prev,
      searchesPerformed: [
        ...prev.searchesPerformed,
        {
          query,
          timestamp: Date.now(),
          resultsCount
        }
      ].slice(-20) // Últimas 20 buscas
    }))
    
    trackInteraction('search', query)
  }, [trackInteraction])
  
  // Tracking de projeto visualizado
  const trackProjectView = useCallback((projectId: string, projectSlug: string) => {
    const startTime = Date.now()
    
    setBehavior(prev => {
      // Verificar se já está sendo visualizado
      const existing = prev.projectsViewed.find(p => p.projectId === projectId)
      if (existing) {
        return prev // Já está sendo rastreado
      }
      
      return {
        ...prev,
        projectsViewed: [
          ...prev.projectsViewed,
          {
            projectId,
            projectSlug,
            timestamp: startTime,
            timeSpent: 0
          }
        ].slice(-30) // Últimos 30 projetos
      }
    })
    
    // Atualizar tempo gasto a cada 5 segundos
    const interval = setInterval(() => {
      setBehavior(prev => {
        const projects = prev.projectsViewed.map(p => {
          if (p.projectId === projectId) {
            return {
              ...p,
              timeSpent: Math.floor((Date.now() - p.timestamp) / 1000)
            }
          }
          return p
        })
        return { ...prev, projectsViewed: projects }
      })
    }, 5000)
    
    // Limpar quando sair da página do projeto
    return () => clearInterval(interval)
  }, [])
  
  // Tracking de CTA
  const trackCTAClick = useCallback((ctaId: string, ctaText: string) => {
    setBehavior(prev => ({
      ...prev,
      ctaClicks: [
        ...prev.ctaClicks,
        {
          ctaId,
          ctaText,
          timestamp: Date.now(),
          page: location.pathname
        }
      ].slice(-30) // Últimos 30 CTAs
    }))
    
    trackInteraction('cta_click', ctaId)
  }, [location.pathname, trackInteraction])
  
  // Tracking de formulário
  const trackFormInteraction = useCallback((
    formId: string,
    formType: string,
    started: boolean,
    completed: boolean = false
  ) => {
    setBehavior(prev => {
      const interactions = [...prev.formInteractions]
      
      // Atualizar interação existente ou criar nova
      const existing = interactions.findIndex(f => f.formId === formId)
      
      if (existing >= 0) {
        interactions[existing] = {
          ...interactions[existing],
          started: started || interactions[existing].started,
          completed: completed || interactions[existing].completed,
          timestamp: Date.now()
        }
      } else {
        interactions.push({
          formId,
          formType,
          started,
          completed,
          timestamp: Date.now()
        })
      }
      
      return {
        ...prev,
        formInteractions: interactions.slice(-20) // Últimos 20
      }
    })
    
    if (started) {
      trackInteraction('form_start', formId)
    }
    if (completed) {
      trackInteraction('form_complete', formId)
    }
  }, [trackInteraction])
  
  // Tracking de vídeo
  const trackVideoInteraction = useCallback((
    videoId: string,
    played: boolean,
    completed: boolean = false,
    watchTime: number = 0
  ) => {
    setBehavior(prev => {
      const interactions = [...prev.videoInteractions]
      
      const existing = interactions.findIndex(v => v.videoId === videoId)
      
      if (existing >= 0) {
        interactions[existing] = {
          ...interactions[existing],
          played: played || interactions[existing].played,
          completed: completed || interactions[existing].completed,
          watchTime: Math.max(interactions[existing].watchTime, watchTime),
          timestamp: Date.now()
        }
      } else {
        interactions.push({
          videoId,
          played,
          completed,
          watchTime,
          timestamp: Date.now()
        })
      }
      
      return {
        ...prev,
        videoInteractions: interactions.slice(-20) // Últimos 20
      }
    })
    
    if (played) {
      trackInteraction('video_play', videoId)
    }
    if (completed) {
      trackInteraction('video_complete', videoId)
    }
  }, [trackInteraction])
  
  // Salvar no localStorage periodicamente
  useEffect(() => {
    const saveInterval = setInterval(() => {
      try {
        const toSave = {
          ...behavior,
          hoveredElements: Array.from(behavior.hoveredElements.entries())
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
        }
      } catch {
        // Silencioso - localStorage pode estar cheio
      }
    }, 10000) // A cada 10 segundos
    
    return () => clearInterval(saveInterval)
  }, [behavior])
  
  return {
    behavior,
    trackHover,
    trackCategoryClick,
    trackSearch,
    trackProjectView,
    trackCTAClick,
    trackFormInteraction,
    trackVideoInteraction
  }
}
