// ════════════════════════════════════════════════════════════
// API: ANALYZE INTENTION - Análise de Intenção com IA
// ════════════════════════════════════════════════════════════
// Analisa comportamento do usuário e detecta intenção
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { getAIProvider } from '@/src/lib/ai-provider'

// Cache simples em memória (para produção, usar Redis)
const analysisCache = new Map<string, { result: any; timestamp: number }>()
const CACHE_TTL = 30000 // 30 segundos

export async function POST(request: NextRequest) {
  try {
    const { behavior } = await request.json()
    
    if (!behavior) {
      return NextResponse.json(
        { error: 'Behavior data is required' },
        { status: 400 }
      )
    }
    
    // Criar chave de cache
    const cacheKey = createCacheKey(behavior)
    
    // Verificar cache
    const cached = analysisCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.result)
    }
    
    // Analisar com IA
    const ai = getAIProvider()
    
    const prompt = createAnalysisPrompt(behavior)
    
    const response = await ai.chat([
      {
        role: 'system',
        content: 'Você é um especialista em análise comportamental e detecção de intenção de usuários em sites. Analise o comportamento fornecido e retorne APENAS um JSON válido com a intenção detectada.'
      },
      {
        role: 'user',
        content: prompt
      }
    ])
    
    // Parsear resposta JSON
    let intentionData
    try {
      // Tentar extrair JSON da resposta
      const jsonMatch = response.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        intentionData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // Se falhar, usar análise local
      intentionData = analyzeIntentionLocal(behavior)
    }
    
    // Validar e normalizar resposta
    const result = normalizeIntentionResponse(intentionData, behavior)
    
    // Salvar no cache
    analysisCache.set(cacheKey, {
      result,
      timestamp: Date.now()
    })
    
    // Limpar cache antigo (manter últimos 100)
    if (analysisCache.size > 100) {
      const firstKey = analysisCache.keys().next().value
      if (firstKey) {
        analysisCache.delete(firstKey)
      }
    }
    
    return NextResponse.json(result)
    
  } catch (error: any) {
    console.error('Error analyzing intention:', error)
    
    // Fallback: análise local
    try {
      const { behavior } = await request.json()
      const fallbackResult = analyzeIntentionLocal(behavior)
      return NextResponse.json(fallbackResult)
    } catch {
      return NextResponse.json(
        { 
          error: 'Failed to analyze intention',
          intention: 'unknown',
          confidence: 0,
          suggestedAction: '',
          personalizedCTA: '',
          highlightElements: []
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Cria prompt para análise de intenção
 */
function createAnalysisPrompt(behavior: any): string {
  const pages = behavior.pagesVisited?.map((p: any) => p.path).join(', ') || 'nenhuma'
  const projects = behavior.projectsViewed?.map((p: any) => p.projectSlug).join(', ') || 'nenhum'
  const categories = behavior.categoriesClicked?.map((c: any) => c.category).join(', ') || 'nenhuma'
  const searches = behavior.searchesPerformed?.map((s: any) => s.query).join(', ') || 'nenhuma'
  const scrollDepth = behavior.scrollDepth || 0
  const timeOnPage = behavior.timeOnPage || 0
  const timeOnSite = behavior.timeOnSite || 0
  const ctaClicks = behavior.ctaClicks?.length || 0
  const formStarted = behavior.formInteractions?.some((f: any) => f.started) || false
  
  return `
Analise o comportamento do usuário e detecte sua intenção:

COMPORTAMENTO:
- Páginas visitadas: ${pages}
- Projetos visualizados: ${projects}
- Categorias clicadas: ${categories}
- Buscas realizadas: ${searches}
- Scroll depth: ${scrollDepth}%
- Tempo na página: ${timeOnPage}s
- Tempo no site: ${timeOnSite}s
- CTAs clicados: ${ctaClicks}
- Formulário iniciado: ${formStarted ? 'sim' : 'não'}

PERFIS POSSÍVEIS:
1. MUSEUM_CURATOR - Curador de museu (interesse em: museus, exposições, curadoria, cultura)
2. BRAND_MANAGER - Gerente de marca (interesse em: branded experiences, VR, ativações)
3. CITY_OFFICIAL - Oficial da cidade (interesse em: projetos urbanos, cultura cidadã)
4. FESTIVAL_ORGANIZER - Organizador de festival (interesse em: festivais, eventos, cinema interativo)
5. TECH_ENTHUSIAST - Entusiasta tech (interesse em: VR, AR, IA, tecnologia)
6. EDUCATION_LEADER - Líder educacional (interesse em: academy, cursos, treinamento)
7. HOT_LEAD - Lead quente (muito tempo, muitas páginas, formulário iniciado)
8. GENERAL_PUBLIC - Público geral (sem padrão claro)

RESPONDA APENAS COM JSON (sem markdown, sem texto extra):
{
  "intention": "interested_in_museums" | "interested_in_vr" | "hot_lead" | "general_interest",
  "confidence": 0.0-1.0,
  "suggestedAction": "section-cultura" | "section-vr" | "contact-form" | "",
  "personalizedCTA": "Ver Projetos para Museus" | "Explorar VR" | "Falar com Especialista" | "Ver nosso trabalho",
  "highlightElements": ["id-elemento-1", "id-elemento-2"],
  "recommendedCategory": "museus" | "vr" | "cinema" | "",
  "visitorType": "MUSEUM_CURATOR" | "BRAND_MANAGER" | "CITY_OFFICIAL" | "FESTIVAL_ORGANIZER" | "TECH_ENTHUSIAST" | "EDUCATION_LEADER" | "HOT_LEAD" | "GENERAL_PUBLIC"
}
`
}

/**
 * Análise local (fallback se IA falhar)
 */
function analyzeIntentionLocal(behavior: any): any {
  const categories = (behavior.categoriesClicked || []).map((c: any) => c.category?.toLowerCase() || '').join(' ')
  const projects = (behavior.projectsViewed || []).map((p: any) => p.projectSlug?.toLowerCase() || '').join(' ')
  const searches = (behavior.searchesPerformed || []).map((s: any) => s.query?.toLowerCase() || '').join(' ')
  
  const allText = `${categories} ${projects} ${searches}`.toLowerCase()
  
  // Detectar interesse em museus
  const museumKeywords = ['museu', 'museum', 'exposição', 'exhibition', 'cultura', 'culture', 'curadoria', 'curation', 'arte', 'art']
  const hasMuseumInterest = museumKeywords.some(k => allText.includes(k))
  
  // Detectar interesse em VR
  const vrKeywords = ['vr', 'virtual reality', 'realidade virtual', 'ar', 'augmented', 'aumentada', 'xr', 'imersivo', 'immersive']
  const hasVRInterest = vrKeywords.some(k => allText.includes(k))
  
  // Detectar hot lead
  const timeOnSite = behavior.timeOnSite || 0
  const pagesCount = behavior.pagesVisited?.length || 0
  const formStarted = behavior.formInteractions?.some((f: any) => f.started) || false
  const ctaClicks = behavior.ctaClicks?.length || 0
  
  const isHotLead = 
    timeOnSite > 300 || // 5+ minutos
    pagesCount > 5 || // 5+ páginas
    formStarted || // Formulário iniciado
    ctaClicks > 2 // 2+ CTAs clicados
  
  // Determinar intenção
  if (hasMuseumInterest) {
    return {
      intention: 'interested_in_museums',
      confidence: 0.75,
      suggestedAction: 'section-cultura',
      personalizedCTA: 'Ver Projetos para Museus',
      highlightElements: ['category-museus', 'project-olympic-museum'],
      recommendedCategory: 'museus',
      visitorType: 'MUSEUM_CURATOR'
    }
  }
  
  if (hasVRInterest) {
    return {
      intention: 'interested_in_vr',
      confidence: 0.75,
      suggestedAction: 'section-vr',
      personalizedCTA: 'Explorar Realidade Virtual',
      highlightElements: ['category-vr', 'service-vr'],
      recommendedCategory: 'vr',
      visitorType: 'TECH_ENTHUSIAST'
    }
  }
  
  if (isHotLead) {
    return {
      intention: 'hot_lead',
      confidence: 0.85,
      suggestedAction: 'contact-form',
      personalizedCTA: 'Falar com Especialista',
      highlightElements: ['cta-contact', 'budget-wizard'],
      recommendedCategory: '',
      visitorType: 'HOT_LEAD'
    }
  }
  
  return {
    intention: 'general_interest',
    confidence: 0.5,
    suggestedAction: '',
    personalizedCTA: 'Ver nosso trabalho',
    highlightElements: [],
    recommendedCategory: '',
    visitorType: 'GENERAL_PUBLIC'
  }
}

/**
 * Normaliza resposta da IA
 */
function normalizeIntentionResponse(data: any, behavior: any): any {
  return {
    intention: data.intention || 'general_interest',
    confidence: Math.max(0, Math.min(1, data.confidence || 0.5)),
    suggestedAction: data.suggestedAction || '',
    personalizedCTA: data.personalizedCTA || 'Ver nosso trabalho',
    highlightElements: Array.isArray(data.highlightElements) ? data.highlightElements : [],
    recommendedCategory: data.recommendedCategory || '',
    visitorType: data.visitorType || 'GENERAL_PUBLIC'
  }
}

/**
 * Cria chave de cache baseada no comportamento
 */
function createCacheKey(behavior: any): string {
  const key = JSON.stringify({
    pages: behavior.pagesVisited?.length || 0,
    projects: behavior.projectsViewed?.length || 0,
    categories: (behavior.categoriesClicked || []).map((c: any) => c.category).join(','),
    searches: behavior.searchesPerformed?.length || 0,
    scroll: Math.floor((behavior.scrollDepth || 0) / 10),
    time: Math.floor((behavior.timeOnPage || 0) / 10)
  })
  
  // Hash simples
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString()
}
