import contentModel from '../data/content'

type Geo = { country?: string; state?: string; city?: string }
type RecoParams = {
  lang: 'pt' | 'en' | 'es'
  geo?: Geo
  tagsRecentes?: string[]
  max?: number
}

/**
 * Stub de recomendação: reordena cases por geo/tags simples.
 * Substitua por fetch em /api/reco quando o backend estiver pronto.
 */
export function getRecommendations({ geo, tagsRecentes = [], max = 3 }: RecoParams) {
  const base = [...contentModel.cases]
  const preferBR = geo?.country?.toLowerCase() === 'br'
  const preferCA = geo?.country?.toLowerCase() === 'ca'

  const scored = base.map(item => {
    let score = 0
    if (preferBR && item.location?.toLowerCase().includes('rio')) score += 2
    if (preferBR && item.slug.includes('gramado')) score += 2
    if (preferCA && item.slug.includes('first-nation')) score += 2
    if (tagsRecentes.some(tag => item.tags.includes(tag))) score += 1
    return { item, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map(s => s.item)
    .slice(0, max)
}






































