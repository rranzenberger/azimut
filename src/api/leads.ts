// API de Leads - Integração com Kabbam/CRM

import { type UserProfile } from '../components/BudgetWizard'
import { matchEditais } from '../utils/editaisMatching'

export interface Lead extends UserProfile {
  leadScore: number
  priority: 'high' | 'medium' | 'low'
  timestamp: string
  source: 'website' | 'direct'
  editaisSuggested?: string[] // ids dos editais sugeridos
  integration?: 'kabbam' | 'hubspot' | 'custom'
}

/**
 * Envia lead para o backend/CRM
 * Por enquanto: mock local
 * Quando backend estiver pronto: substituir por fetch real
 */
export async function submitLead(profile: UserProfile): Promise<Lead> {
  // Calcular score de lead
  const leadScore = calculateLeadScore(profile)
  const suggested = matchEditais(profile).map(e => e.id)
  
  // Criar lead completo
  const lead: Lead = {
    ...profile,
    leadScore,
    priority: leadScore > 7 ? 'high' : leadScore > 4 ? 'medium' : 'low',
    timestamp: new Date().toISOString(),
    source: 'website',
    editaisSuggested: suggested
  }
  
  // TODO: Substituir por chamada real à API
  // const response = await fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(lead)
  // })
  // return response.json()
  

  return lead
}

/**
 * Calcula score de lead (0-10)
 * Baseado em: budget, perfil, complexidade, urgência
 */
function calculateLeadScore(profile: UserProfile): number {
  let score = 0

  // Budget alto = maior score
  if (profile.budget === '1M+') score += 4
  else if (profile.budget === '200k-1M') score += 3
  else if (profile.budget === '50k-200k') score += 2
  else if (profile.budget === '10k-50k') score += 1

  // Perfil institucional = maior score
  if (profile.role === 'museum' || profile.role === 'prefecture') score += 2
  else if (profile.role === 'brand') score += 1.5
  else if (profile.role === 'education') score += 1

  // Múltiplas necessidades = projeto complexo
  if (profile.needs.length > 2) score += 1

  // Tem localização definida = mais sério
  if (profile.location && profile.location.length > 5) score += 1

  // Tem prazo definido = urgência
  if (profile.deadline && !profile.deadline.toLowerCase().includes('não defini') && !profile.deadline.toLowerCase().includes('not defined')) {
    score += 1
  }

  // Precisa de financiamento = pode ser grande projeto
  if (profile.needsFunding) score += 0.5

  return Math.min(score, 10) // Max 10
}

/**
 * Formata lead para integração com Kabbam
 */
export function formatLeadForKabbam(lead: Lead) {
  return {
    name: lead.organization || 'Não informado',
    email: '', // Será preenchido no formulário final
    phone: '', // Será preenchido no formulário final
    budget: lead.budget,
    needs: lead.needs.join(', '),
    location: lead.location,
    deadline: lead.deadline,
    audience: lead.audience,
    objective: lead.objective,
    role: lead.role,
    leadScore: lead.leadScore,
    priority: lead.priority,
    source: 'website',
    timestamp: lead.timestamp,
    // Campos customizados para Kabbam
    custom_fields: {
      needs_funding: lead.needsFunding,
      project_type: lead.needs.join(' | '),
      estimated_budget_range: lead.budget
    }
  }
}

