import type { Combo } from '../types/game.types'

export const combos: Combo[] = [
  // XR/VR
  { id: 'combo-vr-cinema', elementIds: ['vr-headset', '360-camera'], name: 'Experiência Imersiva', bonusPoints: 50, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-xr-imersivo', elementIds: ['vr-headset', '360-camera', 'unity'], name: 'XR Imersivo', bonusPoints: 100, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-web3', elementIds: ['nft', 'blockchain', 'metaverse'], name: 'Web3 Completo', bonusPoints: 300, synergy: true, topicId: 'xr-vr' },
  // Produção audiovisual
  { id: 'combo-ia-vfx', elementIds: ['ai-sora', 'vfx-compositing'], name: 'IA + VFX', bonusPoints: 100, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-luz-camera', elementIds: ['camera', 'light', 'screen'], name: 'Setup Clássico', bonusPoints: 75, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-producao-completa', elementIds: ['roteiro', 'camera-video', 'edicao'], name: 'Produção Completa', bonusPoints: 120, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-elenco-direcao', elementIds: ['elenco', 'direcao', 'roteiro'], name: 'Equipe Criativa', bonusPoints: 90, synergy: true, topicId: 'producao-audiovisual' },
  // Eventos corporativos
  { id: 'combo-palco-som', elementIds: ['stage', 'som-evento', 'iluminacao-evento'], name: 'Palco Completo', bonusPoints: 80, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-transmissao', elementIds: ['transmissao-ao-vivo', 'streaming', 'camera'], name: 'Evento Híbrido', bonusPoints: 150, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-cenografia', elementIds: ['cenografia', 'projecao-evento', 'iluminacao-evento'], name: 'Cenografia + Projeção', bonusPoints: 100, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-curadoria-festival', elementIds: ['curadoria', 'festival', 'teatro'], name: 'Curadoria + Festival', bonusPoints: 120, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-projecao-led', elementIds: ['projecao-mapeada', 'painel-led', 'qlab'], name: 'Projeção + LED', bonusPoints: 150, synergy: true, topicId: 'eventos-corporativos' },
  // Cultura & Museus
  { id: 'combo-exposicao-tour', elementIds: ['exposicao', 'tour-virtual', 'acervo-digital'], name: 'Exposição + Tour Virtual', bonusPoints: 130, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-espetaculo-imersivo', elementIds: ['espetaculo-imersivo', 'teatro', 'projecao-mapeada'], name: 'Espetáculo Imersivo', bonusPoints: 180, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-museu-acessivel', elementIds: ['acessibilidade', 'exposicao', 'tour-virtual'], name: 'Museu Acessível', bonusPoints: 140, synergy: true, topicId: 'cultura-museus' },
  // Produção (novos)
  { id: 'combo-motion-vfx', elementIds: ['motion-design', 'vfx-compositing', 'color-grading'], name: 'Motion + VFX', bonusPoints: 130, synergy: true, topicId: 'producao-audiovisual' },
  // Estudar Canadá
  { id: 'combo-academy-full', elementIds: ['vancouver-academy', 'vfs', 'vanarts'], name: 'Tríplice Academy', bonusPoints: 200, synergy: true, topicId: 'estudar-canada' },
  { id: 'combo-cursos-vancouver', elementIds: ['curso-animacao', 'curso-vfx', 'curso-game-design'], name: 'Cursos Vancouver', bonusPoints: 100, synergy: true, topicId: 'estudar-canada' },
  { id: 'combo-visto-residencia', elementIds: ['visto-estudante', 'residencia-permanente'], name: 'Visto e Residência', bonusPoints: 150, synergy: true, topicId: 'estudar-canada' },
  { id: 'combo-workshop-treinamento', elementIds: ['workshop', 'treinamento-corporativo', 'curso-online'], name: 'Workshop + Treinamento', bonusPoints: 120, synergy: true, topicId: 'estudar-canada' },
]

export function getCombosForElements(ids: string[], topicId?: string | null): Combo[] {
  const set = new Set(ids)
  return combos.filter((c) => {
    const matchElements = c.elementIds.every((id) => set.has(id))
    const matchTopic = topicId == null || c.topicId == null || c.topicId === topicId
    return matchElements && matchTopic
  })
}

export function getComboBonus(selectedIds: string[], topicId?: string | null): number {
  return getCombosForElements(selectedIds, topicId).reduce((sum, c) => sum + c.bonusPoints, 0)
}
