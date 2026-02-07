/**
 * Idioma do jogo: PT, EN, ES, FR.
 * Respeita URL (/pt/, /en/, etc.) e depois localStorage 'azimut-game-lang'.
 */
export type Lang = 'pt' | 'en' | 'fr' | 'es'

const LANGS: Lang[] = ['pt', 'en', 'fr', 'es']

export function getGameLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  try {
    // Prefer iframe path first (mobile-safe)
    const path = window.location.pathname || (function () { try { return window.top!.location.pathname } catch { return '' } })()
    const m = path.match(/\/(pt|en|fr|es)(?:\/|$)/)
    if (m) return m[1] as Lang
  } catch {
    // cross-origin iframe
  }
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('azimut-game-lang') : null
  if (stored && LANGS.includes(stored as Lang)) return stored as Lang
  return 'pt'
}

export function isValidLang(s: string): s is Lang {
  return LANGS.includes(s as Lang)
}
