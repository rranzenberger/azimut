/**
 * Envio de leads do jogo para a API do backoffice.
 * POST para /api/leads/game com origem empathy_engine.
 */

export type GameLeadType = 'save_nft' | 'consulting'

function getLeadsApiBaseUrl(): string {
  const env = typeof import.meta !== 'undefined' && import.meta.env
  const url = (env as { VITE_LEADS_API_URL?: string })?.VITE_LEADS_API_URL
    || (env as { VITE_CMS_API_URL?: string })?.VITE_CMS_API_URL
  return url || 'https://backoffice.azmt.com.br'
}

export interface SubmitGameLeadParams {
  name: string
  email: string
  type: GameLeadType
  lang?: string
}

export async function submitGameLead(params: SubmitGameLeadParams): Promise<{ success: boolean; error?: string }> {
  const { name, email, type, lang } = params
  const base = getLeadsApiBaseUrl()
  const url = `${base.replace(/\/$/, '')}/api/leads/game`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        type,
        lang: lang || 'pt',
        sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { success: false, error: data?.error || data?.message || `HTTP ${res.status}` }
    }

    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro de rede'
    return { success: false, error: message }
  }
}
