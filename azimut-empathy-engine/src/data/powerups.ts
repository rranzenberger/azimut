import type { PowerUp } from '../types/game.types'

export const powerups: PowerUp[] = [
  { id: 'time-extra', name: 'Tempo Extra', effect: '+10s', duration: 10, tooltip: 'Adiciona 10 segundos ao cronômetro desta fase.' },
  { id: 'raio-x', name: 'Raio-X', effect: 'Revela sinergias', tooltip: 'As cartas que formam combo com a que você está adicionando ficam destacadas.' },
  { id: 'ima-combos', name: 'Ímã de Combos', effect: 'Atrai combos', tooltip: 'Aumenta a chance de surgirem cartas que formam combos no próximo sorteio.' },
  { id: 'freeze-time', name: 'Congelar Tempo', effect: 'Pausa 5s', duration: 5, tooltip: 'Pausa o cronômetro por 5 segundos.' },
  { id: 'multiplier-3x', name: 'Multiplicador 3×', effect: 'Próxima carta vale 3×', tooltip: 'A próxima carta que você colocar na zona valerá o triplo de pontos.' },
  { id: 'reveal-rarity', name: 'Revelar Raridade', effect: 'Mostra raridade por 8s', duration: 8, tooltip: 'Revela a raridade de todas as cartas (incluindo common) por 8 segundos.' },
  { id: 'swap-card', name: 'Trocar Carta', effect: 'Devolve uma ao pool', tooltip: 'Remove uma carta da zona e devolve ao pool. Clique em "Usar" e depois na carta que quer devolver.' },
]
