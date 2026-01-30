import type { GameElement } from '../types/game.types'

const basePoints: Record<GameElement['rarity'], number> = {
  common: 100,
  rare: 150,
  epic: 250,
  legendary: 400,
  mythic: 600,
}

function el(
  id: string,
  name: string,
  category: string,
  rarity: GameElement['rarity'],
  nameEn?: string
): GameElement {
  return { id, name, nameEn, category, rarity, points: basePoints[rarity] }
}

export const elements: GameElement[] = [
  // XR/VR
  el('vr-headset', 'Headset VR', 'VR', 'common', 'VR Headset'),
  el('ar-glasses', 'Óculos AR', 'VR', 'rare', 'AR Glasses'),
  el('360-camera', 'Câmera 360', 'VR', 'common', '360 Camera'),
  el('oculus-vr', 'Oculus VR', 'VR', 'rare', 'Oculus VR'),
  el('unity', 'Unity', 'VR', 'epic', 'Unity'),
  el('unreal-engine', 'Unreal Engine', 'VR', 'epic', 'Unreal Engine'),
  el('tracking', 'Tracking espacial', 'VR', 'rare', 'Spatial tracking'),
  el('volumetric-capture', 'Captura volumétrica', 'VR', 'legendary', 'Volumetric capture'),
  el('spatial-audio', 'Áudio espacial', 'VR', 'rare', 'Spatial audio'),
  el('nft', 'NFT', 'Web3', 'mythic', 'NFT'),
  el('blockchain', 'Blockchain', 'Web3', 'legendary', 'Blockchain'),
  el('metaverse', 'Metaverso', 'Web3', 'mythic', 'Metaverse'),
  el('touchdesigner', 'TouchDesigner', 'VR', 'epic', 'TouchDesigner'),
  el('notch', 'Notch', 'VR', 'epic', 'Notch'),
  el('resolume', 'Resolume', 'VR', 'rare', 'Resolume'),
  el('webxr', 'WebXR', 'VR', 'epic', 'WebXR'),
  el('instalacao-interativa', 'Instalação interativa', 'VR', 'legendary', 'Interactive installation'),
  // Produção audiovisual
  el('camera', 'Câmera', 'Cinema', 'common', 'Camera'),
  el('light', 'Luz', 'Cinema', 'common', 'Light'),
  el('screen', 'Tela', 'Cinema', 'common', 'Screen'),
  el('ai-sora', 'IA Sora', 'IA', 'legendary', 'AI Sora'),
  el('vfx-compositing', 'Compositing VFX', 'VFX', 'epic', 'VFX Compositing'),
  el('pre-producao', 'Pré-produção', 'Cinema', 'common', 'Pre-production'),
  el('roteiro', 'Roteiro', 'Cinema', 'common', 'Script'),
  el('elenco', 'Elenco', 'Cinema', 'rare', 'Cast'),
  el('atores', 'Atores', 'Cinema', 'common', 'Actors'),
  el('camera-video', 'Câmera de vídeo', 'Cinema', 'common', 'Video camera'),
  el('locacao', 'Locação', 'Cinema', 'rare', 'Location'),
  el('edicao', 'Edição', 'Cinema', 'common', 'Editing'),
  el('som', 'Som', 'Cinema', 'common', 'Sound'),
  el('pos-edicao', 'Pós-edição', 'Cinema', 'rare', 'Post-production'),
  el('direcao', 'Direção', 'Cinema', 'epic', 'Direction'),
  el('color-grading', 'Color grading', 'Cinema', 'rare', 'Color grading'),
  el('motion-design', 'Motion design', 'VFX', 'epic', 'Motion design'),
  el('rotoscopia', 'Rotoscopia', 'VFX', 'rare', 'Rotoscoping'),
  el('blender', 'Blender', 'VFX', 'epic', 'Blender'),
  el('maya', 'Maya', 'VFX', 'epic', 'Maya'),
  el('toon-boom', 'Toon Boom', 'VFX', 'rare', 'Toon Boom'),
  el('godot', 'Godot', 'Games', 'rare', 'Godot'),
  el('gamificacao', 'Gamificação', 'Games', 'epic', 'Gamification'),
  // Eventos corporativos
  el('stage', 'Palco', 'Eventos', 'common', 'Stage'),
  el('som-evento', 'Som ao vivo', 'Eventos', 'common', 'Live sound'),
  el('iluminacao-evento', 'Iluminação', 'Eventos', 'common', 'Lighting'),
  el('transmissao-ao-vivo', 'Transmissão ao vivo', 'Eventos', 'epic', 'Live streaming'),
  el('cenografia', 'Cenografia', 'Eventos', 'rare', 'Set design'),
  el('projecao-evento', 'Projeção', 'Eventos', 'rare', 'Projection'),
  el('streaming', 'Streaming', 'Eventos', 'epic', 'Streaming'),
  el('curadoria', 'Curadoria', 'Eventos', 'epic', 'Curation'),
  el('festival', 'Festival', 'Eventos', 'rare', 'Festival'),
  el('teatro', 'Teatro', 'Eventos', 'rare', 'Theater'),
  el('qlab', 'QLab', 'Eventos', 'rare', 'QLab'),
  el('painel-led', 'Painel LED', 'Eventos', 'epic', 'LED panel'),
  el('projecao-mapeada', 'Projeção mapeada', 'Eventos', 'legendary', 'Projection mapping'),
  el('tour-virtual', 'Tour virtual', 'Eventos', 'epic', 'Virtual tour'),
  // Cultura & Museus
  el('exposicao', 'Exposição', 'Cultura', 'common', 'Exhibition'),
  el('acervo-digital', 'Acervo digital', 'Cultura', 'rare', 'Digital archive'),
  el('acessibilidade', 'Acessibilidade', 'Cultura', 'epic', 'Accessibility'),
  el('espetaculo-imersivo', 'Espetáculo imersivo', 'Cultura', 'legendary', 'Immersive show'),
  // Estudar Canadá
  el('vancouver-academy', 'Vancouver Academy', 'Academy', 'legendary', 'Vancouver Academy'),
  el('vfs', 'VFS', 'Academy', 'epic', 'VFS'),
  el('vanarts', 'VanArts', 'Academy', 'epic', 'VanArts'),
  el('curso-animacao', 'Curso Animação', 'Academy', 'rare', 'Animation course'),
  el('curso-vfx', 'Curso VFX', 'Academy', 'rare', 'VFX course'),
  el('curso-game-design', 'Curso Game Design', 'Academy', 'rare', 'Game design course'),
  el('visto-estudante', 'Visto de estudante', 'Academy', 'epic', 'Study permit'),
  el('residencia-permanente', 'Residência permanente', 'Academy', 'legendary', 'Permanent residence'),
  el('workshop', 'Workshop', 'Academy', 'rare', 'Workshop'),
  el('curso-online', 'Curso online', 'Academy', 'rare', 'Online course'),
  el('treinamento-corporativo', 'Treinamento corporativo', 'Academy', 'epic', 'Corporate training'),
]

export function getElementById(id: string): GameElement | undefined {
  return elements.find((e) => e.id === id)
}
