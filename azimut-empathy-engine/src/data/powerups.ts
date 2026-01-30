import type { PowerUp } from '../types/game.types'

export const powerups: PowerUp[] = [
  { id: 'time-extra', name: 'Tempo Extra', effect: '+10s', duration: 10 },
  { id: 'raio-x', name: 'Raio-X', effect: 'Revela sinergias' },
  { id: 'ima-combos', name: 'Ímã de Combos', effect: 'Atrai combos' },
]
