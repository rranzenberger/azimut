// ════════════════════════════════════════════════════════════
// HOOK: useEmpatheticCopy - Textos Empáticos com IA
// ════════════════════════════════════════════════════════════
// Usa Claude para gerar textos baseados na filosofia de empatia
// Com fallback para textos pré-definidos se IA não disponível
// ════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'
import { 
  generateEmpatheticCopy, 
  getQuickEmpatheticCopy,
  type CopyContext, 
  type CopyType,
  type CopyResponse 
} from '@/services/empathetic-copy-generator'
import { useBehaviorTracking } from './useBehaviorTracking'

interface UseEmpatheticCopyOptions {
  context: CopyContext
  lang: 'pt' | 'en' | 'es' | 'fr'
  useAI?: boolean  // Se true, tenta gerar com IA. Se false, usa fallbacks
  refreshInterval?: number  // Intervalo para refresh automático (ms)
}

interface UseEmpatheticCopyResult {
  // Textos gerados
  bannerTitle: string
  ctaPrimary: string
  ctaSecondary: string
  cardTitle: string
  cardDesc: string
  heroTitle: string
  heroSubtitle: string
  
  // Estado
  isLoading: boolean
  isAIGenerated: boolean
  
  // Ações
  refresh: () => void
  getCopy: (type: CopyType) => string
}

export function useEmpatheticCopy(options: UseEmpatheticCopyOptions): UseEmpatheticCopyResult {
  const { context, lang, useAI = false, refreshInterval } = options
  
  // Comportamento do usuário (para personalização)
  const { behavior } = useBehaviorTracking()
  
  // Estado dos textos
  const [texts, setTexts] = useState<Record<CopyType, string>>({
    banner_title: getQuickEmpatheticCopy('banner_title', context, lang),
    cta_primary: getQuickEmpatheticCopy('cta_primary', context, lang),
    cta_secondary: getQuickEmpatheticCopy('cta_secondary', context, lang),
    card_title: getQuickEmpatheticCopy('card_title', context, lang),
    card_desc: getQuickEmpatheticCopy('card_desc', context, lang),
    hero_title: getQuickEmpatheticCopy('hero_title', context, lang),
    hero_subtitle: getQuickEmpatheticCopy('hero_subtitle', context, lang)
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isAIGenerated, setIsAIGenerated] = useState(false)
  
  // Função para gerar textos com IA
  const generateTexts = useCallback(async () => {
    if (!useAI) return
    
    setIsLoading(true)
    
    try {
      const userBehavior = behavior ? {
        pagesVisited: behavior.pagesVisited || [],
        timeOnSite: behavior.timeOnPage || 0,
        scrollDepth: behavior.scrollDepth || 0,
        returningVisitor: false
      } : undefined
      
      // Gerar todos os tipos de texto em paralelo
      const types: CopyType[] = [
        'banner_title', 
        'cta_primary', 
        'cta_secondary',
        'card_title',
        'card_desc',
        'hero_title',
        'hero_subtitle'
      ]
      
      const promises = types.map(type => 
        generateEmpatheticCopy({
          type,
          context,
          lang,
          userBehavior
        })
      )
      
      const results = await Promise.all(promises)
      
      const newTexts: Record<CopyType, string> = {
        banner_title: '',
        cta_primary: '',
        cta_secondary: '',
        card_title: '',
        card_desc: '',
        hero_title: '',
        hero_subtitle: ''
      }
      
      results.forEach((result, index) => {
        newTexts[types[index]] = result.text
      })
      
      setTexts(newTexts)
      setIsAIGenerated(results.some(r => !r.cached))
    } catch (error) {
      console.error('Error generating empathetic copy:', error)
    } finally {
      setIsLoading(false)
    }
  }, [context, lang, useAI, behavior])
  
  // Gerar textos iniciais
  useEffect(() => {
    if (useAI) {
      generateTexts()
    }
  }, [context, lang, useAI])
  
  // Refresh automático
  useEffect(() => {
    if (refreshInterval && useAI) {
      const interval = setInterval(() => {
        // Regenerar textos dos fallbacks (variação)
        setTexts({
          banner_title: getQuickEmpatheticCopy('banner_title', context, lang),
          cta_primary: getQuickEmpatheticCopy('cta_primary', context, lang),
          cta_secondary: getQuickEmpatheticCopy('cta_secondary', context, lang),
          card_title: getQuickEmpatheticCopy('card_title', context, lang),
          card_desc: getQuickEmpatheticCopy('card_desc', context, lang),
          hero_title: getQuickEmpatheticCopy('hero_title', context, lang),
          hero_subtitle: getQuickEmpatheticCopy('hero_subtitle', context, lang)
        })
      }, refreshInterval)
      
      return () => clearInterval(interval)
    }
  }, [refreshInterval, context, lang, useAI])
  
  // Função para pegar texto específico
  const getCopy = useCallback((type: CopyType): string => {
    return texts[type] || getQuickEmpatheticCopy(type, context, lang)
  }, [texts, context, lang])
  
  // Função para refresh manual
  const refresh = useCallback(() => {
    if (useAI) {
      generateTexts()
    } else {
      // Apenas variar os fallbacks
      setTexts({
        banner_title: getQuickEmpatheticCopy('banner_title', context, lang),
        cta_primary: getQuickEmpatheticCopy('cta_primary', context, lang),
        cta_secondary: getQuickEmpatheticCopy('cta_secondary', context, lang),
        card_title: getQuickEmpatheticCopy('card_title', context, lang),
        card_desc: getQuickEmpatheticCopy('card_desc', context, lang),
        hero_title: getQuickEmpatheticCopy('hero_title', context, lang),
        hero_subtitle: getQuickEmpatheticCopy('hero_subtitle', context, lang)
      })
    }
  }, [context, lang, useAI, generateTexts])
  
  return {
    bannerTitle: texts.banner_title,
    ctaPrimary: texts.cta_primary,
    ctaSecondary: texts.cta_secondary,
    cardTitle: texts.card_title,
    cardDesc: texts.card_desc,
    heroTitle: texts.hero_title,
    heroSubtitle: texts.hero_subtitle,
    isLoading,
    isAIGenerated,
    refresh,
    getCopy
  }
}

// ════════════════════════════════════════════════════════════
// HOOK SIMPLES - Apenas um texto por vez
// ════════════════════════════════════════════════════════════

export function useEmpatheticText(
  type: CopyType,
  context: CopyContext,
  lang: 'pt' | 'en' | 'es' | 'fr'
): string {
  const [text, setText] = useState(() => getQuickEmpatheticCopy(type, context, lang))
  
  // Variar o texto a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setText(getQuickEmpatheticCopy(type, context, lang))
    }, 30000)
    
    return () => clearInterval(interval)
  }, [type, context, lang])
  
  // Atualizar quando contexto mudar
  useEffect(() => {
    setText(getQuickEmpatheticCopy(type, context, lang))
  }, [type, context, lang])
  
  return text
}

// ════════════════════════════════════════════════════════════
// EXPORT DEFAULT
// ════════════════════════════════════════════════════════════

export default useEmpatheticCopy
