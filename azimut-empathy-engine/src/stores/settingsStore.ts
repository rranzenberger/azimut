import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FontSize = 'small' | 'medium' | 'large'

interface SettingsState {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: FontSize
  noTimer: boolean
  /** Modo Zen = sem timer (usa noTimer). */
  challengeMode: boolean
  /** Efeitos sonoros (arrastar, combo, meta, área secreta). */
  soundEnabled: boolean
  setHighContrast: (v: boolean) => void
  setReducedMotion: (v: boolean) => void
  setFontSize: (v: FontSize) => void
  setNoTimer: (v: boolean) => void
  setChallengeMode: (v: boolean) => void
  setSoundEnabled: (v: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
      noTimer: false,
      challengeMode: false,
      soundEnabled: true,
      setHighContrast: (v) => set({ highContrast: v }),
      setReducedMotion: (v) => set({ reducedMotion: v }),
      setFontSize: (v) => set({ fontSize: v }),
      setNoTimer: (v) => set({ noTimer: v }),
      setChallengeMode: (v) => set({ challengeMode: v }),
      setSoundEnabled: (v) => set({ soundEnabled: v }),
    }),
    { name: 'azimut-empathy-settings' }
  )
)
