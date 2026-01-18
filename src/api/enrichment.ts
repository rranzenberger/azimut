// ════════════════════════════════════════════════════════════
// API: Enriquecimento de Leads
// ════════════════════════════════════════════════════════════
// Funções para buscar e salvar dados de enriquecimento
// ════════════════════════════════════════════════════════════

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export interface EnrichedProfile {
  basic: {
    full_name?: string
    photo_url?: string
    email: string
    phone?: string
  }
  professional: {
    current_role?: string
    company?: string
    company_size?: string
    industry?: string
    linkedin_url?: string
    years_experience?: number
  }
  location: {
    city?: string
    state?: string
    country?: string
    timezone?: string
  }
  interests: {
    professional?: string[]
    personal?: string[]
    events_attended?: string[]
  }
  conversation: {
    tone?: 'formal' | 'semiformal' | 'casual'
    triggers?: string[]
    avoid?: string[]
    connections?: string[]
  }
  scoring: {
    quality?: number
    budget_potential?: 'baixo' | 'medio' | 'alto'
    decision_power?: 'baixo' | 'medio' | 'alto'
    urgency?: 'baixa' | 'media' | 'alta'
  }
  enriched_at?: string
  sources?: string[]
}

export interface LeadEnrichment {
  lead_id: number
  enrichment_status: 'pending' | 'processing' | 'completed' | 'failed'
  enriched_profile?: EnrichedProfile
  conversation_context?: string
  recommended_approach?: string
  lead_score?: number
  detected_city?: string
  detected_company?: string
  linkedin_url?: string
}

/**
 * Solicita enriquecimento de um lead
 */
export async function requestEnrichment(leadId: number): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BACKOFFICE_URL}/api/enrichment/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_id: leadId })
    })

    const data = await response.json()
    return { success: data.success, message: data.message || 'Enriquecimento solicitado' }
  } catch (error) {
    console.error('[Enrichment] Error:', error)
    return { success: false, message: 'Erro ao solicitar enriquecimento' }
  }
}

/**
 * Busca perfil enriquecido de um lead
 */
export async function getEnrichedProfile(leadId: number): Promise<EnrichedProfile | null> {
  try {
    const response = await fetch(`${BACKOFFICE_URL}/api/enrichment/${leadId}`)
    
    if (!response.ok) return null
    
    const data = await response.json()
    return data.enriched_profile || null
  } catch (error) {
    console.error('[Enrichment] Error:', error)
    return null
  }
}

/**
 * Busca perfil por email (para chatbot)
 */
export async function getProfileByEmail(email: string): Promise<EnrichedProfile | null> {
  try {
    const response = await fetch(`${BACKOFFICE_URL}/api/enrichment/by-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    
    if (!response.ok) return null
    
    const data = await response.json()
    return data.enriched_profile || null
  } catch (error) {
    console.error('[Enrichment] Error:', error)
    return null
  }
}

/**
 * Registra interação com lead
 */
export async function logInteraction(
  leadId: number,
  type: 'email_sent' | 'email_opened' | 'chat' | 'whatsapp' | 'call',
  direction: 'inbound' | 'outbound',
  data?: {
    subject?: string
    content?: string
    context?: Record<string, any>
  }
): Promise<boolean> {
  try {
    const response = await fetch(`${BACKOFFICE_URL}/api/enrichment/interaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: leadId,
        interaction_type: type,
        direction,
        ...data
      })
    })

    return response.ok
  } catch (error) {
    console.error('[Enrichment] Error logging interaction:', error)
    return false
  }
}
