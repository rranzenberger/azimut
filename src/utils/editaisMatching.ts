import { type UserProfile } from '../components/BudgetWizard'
import { editais, type Edital } from '../data/editais'

type BudgetRange =
  | '2k-10k'
  | '10k-50k'
  | '50k-200k'
  | '200k-1M'
  | '1M+'
  | 'funding'

const budgetToRange: Record<BudgetRange, { min: number; max: number }> = {
  '2k-10k': { min: 2000, max: 10000 },
  '10k-50k': { min: 10000, max: 50000 },
  '50k-200k': { min: 50000, max: 200000 },
  '200k-1M': { min: 200000, max: 1000000 },
  '1M+': { min: 1000000, max: 99999999 },
  funding: { min: 0, max: 99999999 }
}

interface MatchResult {
  edital: Edital
  score: number
}

export function matchEditais(profile: UserProfile): Edital[] {
  const budgetRange = budgetToRange[(profile.budget as BudgetRange) || 'funding']
  const userCountry = normalizeCountry(profile.location)
  const role = profile.role || 'other'

  const results: MatchResult[] = editais.map((edital) => {
    let score = 0

    // Country match
    if (userCountry && edital.country === userCountry) score += 3
    else if (!userCountry || edital.country === 'INTL') score += 1

    // Role match
    if (edital.roles.includes(role)) score += 2

    // Budget overlap
    if (budgetOverlaps(budgetRange, { min: edital.minBudget, max: edital.maxBudget })) {
      score += 2
    }

    // Funding help
    if (profile.budget === 'funding') score += 1

    return { edital, score }
  })

  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(r => r.edital)
}

function budgetOverlaps(a: { min: number; max: number }, b: { min: number; max: number }) {
  return a.max >= b.min && b.max >= a.min
}

function normalizeCountry(location: string | undefined): 'BR' | 'CA' | 'US' | 'EU' | 'INTL' | null {
  if (!location) return null
  const loc = location.toLowerCase()
  if (loc.includes('brasil') || loc.includes('brazil') || loc.includes('br')) return 'BR'
  if (loc.includes('canad') || loc.includes('ca') || loc.includes('bc')) return 'CA'
  if (loc.includes('usa') || loc.includes('estados unidos') || loc.includes('us')) return 'US'
  if (loc.includes('europa') || loc.includes('portugal') || loc.includes('espanha') || loc.includes('franca')) return 'EU'
  return 'INTL'
}












