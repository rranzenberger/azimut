/**
 * Personalização de Projetos baseada em Comportamento
 * 
 * Analisa dados de tracking (localStorage) para construir perfil de interesse
 * e reordenar os projetos exibidos ao visitante.
 * 
 * Fluxo:
 * 1. Visitante NOVO → usa priorityHome (flag do backoffice)
 * 2. Visitante com HISTÓRICO → sobrepõe os 3 cards com projetos 
 *    que combinam com as categorias de interesse dele
 */

import { MAIN_CATEGORIES } from './categoryMapping'

const STORAGE_KEY = 'azimut_behavior_data'

export interface InterestProfile {
  /** Categorias ranqueadas por interesse (maior score primeiro) */
  rankedCategories: Array<{ categoryId: string; score: number }>
  /** Se o visitante tem dados suficientes para personalizar */
  hasEnoughData: boolean
  /** Total de interações registradas */
  totalInteractions: number
}

interface BehaviorSnapshot {
  categoriesClicked?: Array<{ category: string; timestamp: number }>
  projectsViewed?: Array<{ projectSlug: string; timeSpent: number }>
  pagesVisited?: Array<{ path: string; timeSpent: number }>
}

/**
 * Lê comportamento do localStorage e gera perfil de interesse
 */
export function getInterestProfile(): InterestProfile {
  const empty: InterestProfile = {
    rankedCategories: [],
    hasEnoughData: false,
    totalInteractions: 0,
  }

  if (typeof window === 'undefined') return empty

  let data: BehaviorSnapshot
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    data = JSON.parse(raw)
  } catch {
    return empty
  }

  // Contabilizar scores por categoria
  const scores: Record<string, number> = {}

  // 1. Cliques em categorias (peso 3 por clique)
  if (data.categoriesClicked?.length) {
    for (const click of data.categoriesClicked) {
      const catId = click.category
      // Mapear ID do MAIN_CATEGORIES
      const match = MAIN_CATEGORIES.find(
        c => c.id === catId || c.projectCategory?.includes(catId)
      )
      if (match) {
        scores[match.id] = (scores[match.id] || 0) + 3
      }
    }
  }

  // 2. Projetos visualizados - inferir categoria pelo slug/type (peso 2)
  if (data.projectsViewed?.length) {
    for (const view of data.projectsViewed) {
      const slug = view.projectSlug?.toLowerCase() || ''
      // Bonus por tempo gasto (> 10s = interesse real)
      const timeBonus = view.timeSpent > 10 ? 1 : 0

      for (const cat of MAIN_CATEGORIES) {
        const matchesKeyword = cat.keywords?.some(kw => slug.includes(kw.toLowerCase()))
        if (matchesKeyword) {
          scores[cat.id] = (scores[cat.id] || 0) + 2 + timeBonus
        }
      }
    }
  }

  // 3. Páginas visitadas - inferir interesse por path (peso 1)
  if (data.pagesVisited?.length) {
    for (const page of data.pagesVisited) {
      const path = page.path?.toLowerCase() || ''
      if (path.includes('/work/projects') && page.timeSpent > 5) {
        // Visitou portfólio completo → interesse geral, pequeno boost para todas
        for (const cat of MAIN_CATEGORIES) {
          scores[cat.id] = (scores[cat.id] || 0) + 0.5
        }
      }
    }
  }

  const totalInteractions =
    (data.categoriesClicked?.length || 0) +
    (data.projectsViewed?.length || 0)

  // Precisa de pelo menos 2 interações para personalizar
  if (totalInteractions < 2) return { ...empty, totalInteractions }

  const rankedCategories = Object.entries(scores)
    .map(([categoryId, score]) => ({ categoryId, score }))
    .sort((a, b) => b.score - a.score)

  return {
    rankedCategories,
    hasEnoughData: rankedCategories.length > 0,
    totalInteractions,
  }
}

/**
 * Reordena projetos: mantém destaque (index 0), personaliza os 3 seguintes
 * 
 * @param projects - Todos os projetos ordenados por priorityHome
 * @param profile - Perfil de interesse do visitante
 * @returns Projetos reordenados (destaque + 3 personalizados + restante)
 */
export function personalizeProjectOrder<T extends {
  projectCategory?: string[]
  type?: string
  tags?: string[]
  featured?: boolean
  priorityHome?: number
}>(projects: T[], profile: InterestProfile): T[] {
  if (!projects.length) return projects
  if (!profile.hasEnoughData) return projects // Sem dados → ordem original (priorityHome)

  const [featured, ...rest] = projects
  if (rest.length <= 3) return projects // Poucos projetos → não personaliza

  // Calcular score de relevância para cada projeto
  const scored = rest.map(project => {
    let relevanceScore = 0

    for (const interest of profile.rankedCategories) {
      const cat = MAIN_CATEGORIES.find(c => c.id === interest.categoryId)
      if (!cat) continue

      // Verifica se o projeto pertence a esta categoria
      const matchesCategory = project.projectCategory?.some(pc =>
        cat.projectCategory?.includes(pc)
      )
      const matchesType = cat.type && project.type?.toLowerCase() === cat.type.toLowerCase()
      const matchesKeywords = cat.keywords?.some(kw =>
        project.type?.toLowerCase().includes(kw.toLowerCase()) ||
        project.tags?.some(t => t.toLowerCase().includes(kw.toLowerCase()))
      )

      if (matchesCategory || matchesType || matchesKeywords) {
        relevanceScore += interest.score
      }
    }

    return { project, relevanceScore }
  })

  // Separar: projetos relevantes (score > 0) e restante
  const relevant = scored
    .filter(s => s.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)

  const notRelevant = scored
    .filter(s => s.relevanceScore === 0)

  // Montar resultado: destaque + até 3 relevantes + restante por priorityHome
  const personalizedTop = relevant.slice(0, 3).map(s => s.project)
  const remaining = [
    ...relevant.slice(3).map(s => s.project),
    ...notRelevant.map(s => s.project),
  ]

  return [featured, ...personalizedTop, ...remaining]
}
