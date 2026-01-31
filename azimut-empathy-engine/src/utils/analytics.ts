/**
 * Analytics do Empathy Engine.
 * Envia eventos para o site pai (postMessage) e, se existir, gtag (GA).
 * O site deve escutar window.addEventListener('message', ...) e enviar para GA/backend.
 */

export type GameAnalyticsEvent =
  | 'game_start'
  | 'game_finish'
  | 'secret_unlock'
  | 'premium_quest_played'
  | 'super_premium_quest_played'
  | 'lead_save'
  | 'lead_nft'

export interface GameAnalyticsPayload {
  event: GameAnalyticsEvent
  [key: string]: unknown
}

export function trackGameEvent(event: GameAnalyticsEvent, payload?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const data: GameAnalyticsPayload = { event, ...payload }
  try {
    window.parent?.postMessage({ type: 'empathy_analytics', ...data }, '*')
  } catch {
    // cross-origin ou iframe não disponível
  }
  try {
    const gtag = (window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void }).gtag
    if (typeof gtag === 'function') {
      gtag('event', event, { event_category: 'empathy_engine', ...payload })
    }
  } catch {
    // GA não carregado
  }
}
