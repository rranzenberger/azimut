import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FontSize = 'small' | 'medium' | 'large'

interface SettingsState {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: FontSize
  noTimer: boolean
  setHighContrast: (v: boolean) => void
  setReducedMotion: (v: boolean) => void
  setFontSize: (v: FontSize) => void
  setNoTimer: (v: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
      noTimer: false,
      setHighContrast: (v) => set({ highContrast: v }),
      setReducedMotion: (v) => set({ reducedMotion: v }),
      setFontSize: (v) => set({ fontSize: v }),
      setNoTimer: (v) => set({ noTimer: v }),
    }),
    { name: 'azimut-empathy-settings' }
  )
)
