/**
 * Efeitos sonoros do jogo (Web Audio API — sem arquivos externos).
 * Respeita a opção "Efeitos sonoros" em Configurações (soundEnabled).
 */

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    } catch {
      return null
    }
  }
  return audioContext
}

/** Toca um beep curto (freq Hz, duration ms). */
function beep(freq: number, durationMs: number, type: 'sine' | 'square' = 'sine'): void {
  if (typeof window === 'undefined') return
  try {
    if (!useSettingsStore.getState().soundEnabled) return
  } catch {
    return
  }
  const ctx = getContext()
  if (!ctx) return
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, now)
  osc.frequency.exponentialRampToValueAtTime(0.01, now + durationMs / 1000)
  gain.gain.setValueAtTime(0.15, now)
  gain.gain.exponentialRampToValueAtTime(0.01, now + durationMs / 1000)
  osc.start(now)
  osc.stop(now + durationMs / 1000)
}

export type SoundType = 'drag' | 'combo' | 'goal' | 'secret'

export function playSound(type: SoundType): void {
  switch (type) {
    case 'drag':
      beep(280, 40)
      break
    case 'combo':
      beep(520, 60)
      break
    case 'goal':
      beep(660, 80)
      beep(880, 100)
      break
    case 'secret':
      beep(440, 50)
      beep(660, 50)
      beep(880, 80)
      break
    default:
      beep(440, 50)
  }
}
