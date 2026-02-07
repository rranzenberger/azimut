/**
 * Store de idioma do jogo usando Zustand.
 * Permite trocar idioma sem recarregar a página.
 */
import { create } from 'zustand'

export type Lang = 'pt' | 'en' | 'fr' | 'es'

const LANGS: Lang[] = ['pt', 'en', 'fr', 'es']

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  try {
    // Prefer iframe's own path first (mobile-safe; evita erro ao acessar window.top em iframe)
    const path = window.location.pathname || (function () { try { return window.top!.location.pathname } catch { return '' } })()
    const m = path.match(/\/(pt|en|fr|es)(?:\/|$)/)
    if (m) return m[1] as Lang
  } catch {
    // cross-origin ou restrição mobile
  }
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('azimut-game-lang') : null
  if (stored && LANGS.includes(stored as Lang)) return stored as Lang
  return 'pt'
}

interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useLangStore = create<LangState>((set) => ({
  lang: getInitialLang(),
  setLang: (lang: Lang) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('azimut-game-lang', lang)
    }
    set({ lang })
  },
}))

// Função helper para obter idioma atual (compatível com código existente)
export function getGameLang(): Lang {
  return useLangStore.getState().lang
}

// Função para trocar idioma sem recarregar
export function changeGameLang(newLang: Lang): void {
  useLangStore.getState().setLang(newLang)
}
