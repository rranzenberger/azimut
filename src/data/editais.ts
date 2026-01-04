export interface Edital {
  id: string
  name: { pt: string; en: string; es: string }
  country: 'BR' | 'CA' | 'US' | 'EU' | 'INTL'
  type: 'federal' | 'state' | 'provincial' | 'fund' | 'tax_incentive'
  minBudget: number
  maxBudget: number
  roles: Array<'museum' | 'prefecture' | 'brand' | 'education' | 'other'>
  tags: string[]
}

export const editais: Edital[] = [
  {
    id: 'rouanet',
    name: { pt: 'Lei Rouanet', en: 'Rouanet Law', es: 'Ley Rouanet' },
    country: 'BR',
    type: 'federal',
    minBudget: 50000,
    maxBudget: 10000000,
    roles: ['museum', 'prefecture', 'education', 'other'],
    tags: ['cultura', 'museus', 'exposicao', 'impostos']
  },
  {
    id: 'proac',
    name: { pt: 'PROAC', en: 'PROAC (São Paulo)', es: 'PROAC (São Paulo)' },
    country: 'BR',
    type: 'state',
    minBudget: 30000,
    maxBudget: 1500000,
    roles: ['museum', 'prefecture', 'education', 'other'],
    tags: ['cultura', 'estado', 'sp', 'exposicao']
  },
  {
    id: 'creative-bc',
    name: { pt: 'Creative BC', en: 'Creative BC', es: 'Creative BC' },
    country: 'CA',
    type: 'provincial',
    minBudget: 25000,
    maxBudget: 2000000,
    roles: ['museum', 'prefecture', 'education', 'brand', 'other'],
    tags: ['canada', 'bc', 'film', 'vr', 'xr', 'digital']
  },
  {
    id: 'cmf',
    name: { pt: 'Canada Media Fund', en: 'Canada Media Fund', es: 'Canada Media Fund' },
    country: 'CA',
    type: 'fund',
    minBudget: 50000,
    maxBudget: 3000000,
    roles: ['brand', 'museum', 'education', 'other'],
    tags: ['conteudo', 'digital', 'vr', 'xr', 'ia']
  },
  {
    id: 'telefilm-dev',
    name: { pt: 'Telefilm - Desenvolvimento', en: 'Telefilm - Development', es: 'Telefilm - Desarrollo' },
    country: 'CA',
    type: 'fund',
    minBudget: 20000,
    maxBudget: 250000,
    roles: ['brand', 'other'],
    tags: ['film', 'doc', 'vr', 'dev']
  },
  {
    id: 'creative-europe',
    name: { pt: 'Creative Europe', en: 'Creative Europe', es: 'Creative Europe' },
    country: 'EU',
    type: 'fund',
    minBudget: 50000,
    maxBudget: 5000000,
    roles: ['museum', 'education', 'other'],
    tags: ['cultura', 'coop', 'europe', 'digital']
  }
]








































