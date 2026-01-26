// ════════════════════════════════════════════════════════════
// USE INTENTION DETECTION - Hook para Detecção de Intenção com IA
// ════════════════════════════════════════════════════════════
// Analisa comportamento e detecta intenção do usuário
// ════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react'
import { useBehaviorTracking, type BehaviorData } from './useBehaviorTracking'

export interface DetectedIntention {
  intention: string // 'interested_in_museums' | 'interested_in_vr' | 'hot_lead' | etc
  confidence: number // 0-1
  suggestedAction: string // 'section-cultura' | 'contact-form' | etc
  personalizedCTA: string // 'Ver Projetos Culturais' | 'Falar com Especialista'
  highlightElements: string[] // IDs de elementos para destacar
  recommendedCategory?: string // Categoria mais relevante
  visitorType?: string // 'MUSEUM_CURATOR' | 'BRAND_MANAGER' | etc
}

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'
const ANALYSIS_INTERVAL = 10000 // 10 segundos
const MIN_TIME_FOR_ANALYSIS = 5000 // 5 segundos na página

export function useIntentionDetection(lang?: string) {
  const { behavior } = useBehaviorTracking()
  const [intention, setIntention] = useState<DetectedIntention | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const lastAnalysisRef = useRef<number>(0)
  const analysisCacheRef = useRef<Map<string, DetectedIntention>>(new Map())
  const abortControllerRef = useRef<AbortController | null>(null)
  
  useEffect(() => {
    // Verificar se está no cliente (SSR safety)
    if (typeof window === 'undefined') return
    
    // Detectar idioma da URL se não fornecido
    const currentLang = lang || (() => {
      const path = window.location.pathname
      if (path.startsWith('/en/')) return 'en'
      if (path.startsWith('/es/')) return 'es'
      if (path.startsWith('/fr/')) return 'fr'
      return 'pt'
    })()
    
    // 🆕 Detecção rápida baseada na URL atual (sem esperar 5s)
    const currentPath = window.location.pathname.toLowerCase()
    const isMuseumPage = currentPath.includes('museus') || currentPath.includes('museum') || currentPath.includes('exposicoes') || currentPath.includes('exhibition')
    const isVRPage = currentPath.includes('vr') || currentPath.includes('virtual') || currentPath.includes('realidade-virtual')
    const isEducationPage = currentPath.includes('academy') || currentPath.includes('vancouver') || currentPath.includes('course') || currentPath.includes('workshop') || currentPath.includes('educacao') || currentPath.includes('treinamento')
    
    // Se está em página específica, detectar imediatamente (após 2s)
    if (isMuseumPage && behavior.timeOnPage >= 2) {
      console.log('🎯 Detecção rápida: página de museus detectada!')
      const quickIntention: DetectedIntention = {
        intention: 'interested_in_museums',
        confidence: 0.75,
        suggestedAction: 'work?type=museum',
        personalizedCTA: currentLang === 'pt' ? 'Ver Projetos Culturais' : currentLang === 'en' ? 'View Cultural Projects' : currentLang === 'es' ? 'Ver Proyectos Culturales' : 'Voir Projets Culturels',
        highlightElements: [],
        recommendedCategory: 'museus',
        visitorType: 'MUSEUM_CURATOR'
      }
      setIntention(quickIntention)
      return
    }
    
    if (isVRPage && behavior.timeOnPage >= 2) {
      console.log('🎯 Detecção rápida: página de VR detectada!')
      const quickIntention: DetectedIntention = {
        intention: 'interested_in_vr',
        confidence: 0.75,
        suggestedAction: 'work?tag=vr',
        personalizedCTA: currentLang === 'pt' ? 'Ver Projetos VR' : currentLang === 'en' ? 'View VR Projects' : currentLang === 'es' ? 'Ver Proyectos VR' : 'Voir Projets VR',
        highlightElements: [],
        recommendedCategory: 'vr',
        visitorType: 'TECH_ENTHUSIAST'
      }
      setIntention(quickIntention)
      return
    }
    
    if (isEducationPage && behavior.timeOnPage >= 2) {
      console.log('🎯 Detecção rápida: página de educação/Vancouver detectada!')
      const quickIntention: DetectedIntention = {
        intention: 'interested_in_education',
        confidence: 0.75,
        suggestedAction: 'academy',
        personalizedCTA: currentLang === 'pt' ? 'Conhecer a Academy' : currentLang === 'en' ? 'Discover the Academy' : currentLang === 'es' ? 'Conocer la Academy' : 'Découvrir l\'Academy',
        highlightElements: [],
        recommendedCategory: 'education',
        visitorType: 'STUDENT_PROSPECT'
      }
      setIntention(quickIntention)
      return
    }
    
    // Debug: Log comportamento
    console.log('🔍 useIntentionDetection - Comportamento:', {
      timeOnPage: behavior.timeOnPage,
      timeOnSite: behavior.timeOnSite,
      pagesVisited: behavior.pagesVisited.length,
      categoriesClicked: behavior.categoriesClicked.length,
      projectsViewed: behavior.projectsViewed.length,
      searchesPerformed: behavior.searchesPerformed.length
    })
    
    // Não analisar se tempo na página < 5s (para análise completa)
    if (behavior.timeOnPage < MIN_TIME_FOR_ANALYSIS) {
      console.log('⏱️ Aguardando 5s na página...', behavior.timeOnPage, 's')
      return
    }
    
    // Não analisar muito frequentemente (mínimo 10s entre análises)
    const now = Date.now()
    if (now - lastAnalysisRef.current < ANALYSIS_INTERVAL) {
      const remaining = Math.ceil((ANALYSIS_INTERVAL - (now - lastAnalysisRef.current)) / 1000)
      console.log('⏳ Aguardando', remaining, 's antes da próxima análise...')
      return
    }
    
    // Criar hash do comportamento para cache
    const behaviorHash = createBehaviorHash(behavior)
    
    // Verificar cache
    const cached = analysisCacheRef.current.get(behaviorHash)
    if (cached) {
      setIntention(cached)
      return
    }
    
    // Cancelar análise anterior se ainda estiver rodando
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Nova análise
    const controller = new AbortController()
    abortControllerRef.current = controller
    
    setLoading(true)
    setError(null)
    lastAnalysisRef.current = now
    
    console.log('🚀 Iniciando análise de intenção...')
    analyzeIntention(behavior, controller.signal)
      .then(result => {
        if (!controller.signal.aborted) {
          console.log('✅ Intenção detectada:', result)
          setIntention(result)
          // Salvar no cache
          analysisCacheRef.current.set(behaviorHash, result)
          // Limpar cache antigo (manter últimos 20)
          if (analysisCacheRef.current.size > 20) {
            const firstKey = analysisCacheRef.current.keys().next().value
            analysisCacheRef.current.delete(firstKey)
          }
        }
      })
      .catch(err => {
        if (!controller.signal.aborted) {
          setError(err.message)
          console.warn('Erro ao analisar intenção:', err)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })
    
    return () => {
      controller.abort()
    }
  }, [behavior, lang])
  
  return { intention, loading, error, behavior }
}

/**
 * Analisa comportamento e retorna intenção detectada
 */
async function analyzeIntention(
  behavior: BehaviorData,
  signal: AbortSignal
): Promise<DetectedIntention> {
  try {
    const response = await fetch(`${BACKOFFICE_URL}/api/ai/analyze-intention`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ behavior }),
      signal
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Validar resposta
    if (!data.intention || typeof data.confidence !== 'number') {
      throw new Error('Resposta inválida da API')
    }
    
    return {
      intention: data.intention,
      confidence: Math.max(0, Math.min(1, data.confidence)), // Garantir 0-1
      suggestedAction: data.suggestedAction || '',
      personalizedCTA: data.personalizedCTA || '',
      highlightElements: data.highlightElements || [],
      recommendedCategory: data.recommendedCategory,
      visitorType: data.visitorType
    }
  } catch (err: any) {
    // Se foi abortado, não é erro
    if (err.name === 'AbortError') {
      throw err
    }
    
    // Fallback: análise local básica se API falhar
    return analyzeIntentionLocal(behavior)
  }
}

/**
 * Análise local básica (fallback se API falhar)
 */
function analyzeIntentionLocal(behavior: BehaviorData): DetectedIntention {
  // Análise simples baseada em padrões
  const categories = behavior.categoriesClicked.map(c => c.category.toLowerCase())
  const projects = behavior.projectsViewed.map(p => p.projectSlug.toLowerCase())
  const searches = behavior.searchesPerformed.map(s => s.query.toLowerCase())
  const pages = behavior.pagesVisited.map(p => p.path.toLowerCase())
  
  // 🆕 Detectar pela URL atual também (mais rápido!) - com verificação SSR
  const currentPath = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : ''
  
  // Detectar interesse em museus
  const museumKeywords = ['museu', 'museum', 'exposição', 'exhibition', 'cultura', 'culture', 'curadoria', 'curation', 'museus-exposicoes']
  const hasMuseumInterest = 
    currentPath.includes('museus') || // 🆕 Detectar URL imediatamente
    currentPath.includes('museum') ||
    currentPath.includes('exposicoes') ||
    currentPath.includes('exhibition') ||
    categories.some(c => museumKeywords.some(k => c.includes(k))) ||
    projects.some(p => museumKeywords.some(k => p.includes(k))) ||
    searches.some(s => museumKeywords.some(k => s.includes(k))) ||
    pages.some(p => museumKeywords.some(k => p.includes(k)))
  
  // Detectar interesse em VR
  const vrKeywords = ['vr', 'virtual reality', 'realidade virtual', 'ar', 'augmented', 'aumentada']
  const hasVRInterest =
    categories.some(c => vrKeywords.some(k => c.includes(k))) ||
    projects.some(p => vrKeywords.some(k => p.includes(k))) ||
    searches.some(s => vrKeywords.some(k => s.includes(k)))
  
  // Detectar hot lead
  const isHotLead = 
    behavior.timeOnSite > 300 || // 5+ minutos
    behavior.pagesVisited.length > 5 || // 5+ páginas
    behavior.formInteractions.some(f => f.started) || // Formulário iniciado
    behavior.ctaClicks.length > 2 // 2+ CTAs clicados
  
  // Determinar intenção
  let intention = 'general_interest'
  let confidence = 0.5
  let suggestedAction = ''
  let personalizedCTA = 'Ver nosso trabalho'
  let recommendedCategory = ''
  let visitorType = 'GENERAL_PUBLIC'
  
  if (hasMuseumInterest) {
    intention = 'interested_in_museums'
    confidence = 0.7
    suggestedAction = 'section-cultura'
    personalizedCTA = 'Ver Projetos para Museus'
    recommendedCategory = 'museus'
    visitorType = 'MUSEUM_CURATOR'
  } else if (hasVRInterest) {
    intention = 'interested_in_vr'
    confidence = 0.7
    suggestedAction = 'section-vr'
    personalizedCTA = 'Explorar Realidade Virtual'
    recommendedCategory = 'vr'
    visitorType = 'TECH_ENTHUSIAST'
  } else if (isHotLead) {
    intention = 'hot_lead'
    confidence = 0.8
    suggestedAction = 'contact-form'
    personalizedCTA = 'Falar com Especialista'
    recommendedCategory = ''
    visitorType = 'HIGH_POTENTIAL'
  }
  
  return {
    intention,
    confidence,
    suggestedAction,
    personalizedCTA,
    highlightElements: [],
    recommendedCategory,
    visitorType
  }
}

/**
 * Cria hash do comportamento para cache
 */
function createBehaviorHash(behavior: BehaviorData): string {
  const key = JSON.stringify({
    pages: behavior.pagesVisited.length,
    projects: behavior.projectsViewed.length,
    categories: behavior.categoriesClicked.map(c => c.category).join(','),
    searches: behavior.searchesPerformed.length,
    scroll: Math.floor(behavior.scrollDepth / 10), // Arredondar para 10%
    time: Math.floor(behavior.timeOnPage / 10) // Arredondar para 10s
  })
  
  // Hash simples (para produção, usar crypto.subtle.digest)
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}
