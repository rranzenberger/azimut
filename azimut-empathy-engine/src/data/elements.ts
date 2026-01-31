import type { GameElement } from '../types/game.types'

// Rebalance v1.1: reduz hiato common vs mythic (recomendação ChatGPT)
const basePoints: Record<GameElement['rarity'], number> = {
  common: 120,
  rare: 220,
  epic: 300,
  legendary: 450,
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
  // ═══════════════════════════════════════════════════════════════
  // XR/VR (17 elementos)
  // ═══════════════════════════════════════════════════════════════
  el('vr-headset', 'Headset VR', 'XR/VR', 'common', 'VR Headset'),
  el('ar-glasses', 'Óculos AR', 'XR/VR', 'rare', 'AR Glasses'),
  el('360-camera', 'Câmera 360', 'XR/VR', 'common', '360 Camera'),
  el('oculus-vr', 'Oculus VR', 'XR/VR', 'rare', 'Oculus VR'),
  el('unity', 'Unity', 'XR/VR', 'epic', 'Unity'),
  el('unreal-engine', 'Unreal Engine', 'XR/VR', 'epic', 'Unreal Engine'),
  el('tracking', 'Tracking espacial', 'XR/VR', 'rare', 'Spatial tracking'),
  el('volumetric-capture', 'Captura volumétrica', 'XR/VR', 'legendary', 'Volumetric capture'),
  el('spatial-audio', 'Áudio espacial', 'XR/VR', 'rare', 'Spatial audio'),
  el('nft', 'NFT', 'Web3', 'mythic', 'NFT'),
  el('blockchain', 'Blockchain', 'Web3', 'legendary', 'Blockchain'),
  el('metaverse', 'Metaverso', 'Web3', 'mythic', 'Metaverse'),
  el('touchdesigner', 'TouchDesigner', 'XR/VR', 'epic', 'TouchDesigner'),
  el('notch', 'Notch', 'XR/VR', 'epic', 'Notch'),
  el('resolume', 'Resolume', 'XR/VR', 'rare', 'Resolume'),
  el('webxr', 'WebXR', 'XR/VR', 'epic', 'WebXR'),
  el('instalacao-interativa', 'Instalação interativa', 'XR/VR', 'legendary', 'Interactive installation'),
  // NOVOS XR/VR
  el('meta-quest', 'Meta Quest', 'XR/VR', 'epic', 'Meta Quest'),
  el('htc-vive', 'HTC Vive', 'XR/VR', 'epic', 'HTC Vive'),
  el('arkit', 'ARKit', 'XR/VR', 'rare', 'ARKit'),
  el('arcore', 'ARCore', 'XR/VR', 'rare', 'ARCore'),

  // ═══════════════════════════════════════════════════════════════
  // Produção audiovisual (23+ elementos)
  // ═══════════════════════════════════════════════════════════════
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
  // NOVOS Produção
  el('runway-ml', 'Runway ML', 'IA', 'rare', 'Runway ML'),
  el('da-vinci-resolve', 'DaVinci Resolve', 'Cinema', 'rare', 'DaVinci Resolve'),
  el('nuke', 'Nuke', 'VFX', 'epic', 'Nuke'),
  el('after-effects', 'After Effects', 'VFX', 'rare', 'After Effects'),
  el('houdini', 'Houdini', 'VFX', 'mythic', 'Houdini'),
  el('red-camera', 'RED Camera', 'Cinema', 'rare', 'RED Camera'),
  el('blackmagic', 'Blackmagic', 'Cinema', 'rare', 'Blackmagic'),
  el('virtual-production', 'Virtual Production', 'Cinema', 'legendary', 'Virtual Production'),
  el('sound-design', 'Sound Design', 'Cinema', 'rare', 'Sound Design'),
  el('jogo-serio', 'Jogo Sério', 'Games', 'epic', 'Serious Game'),

  // ═══════════════════════════════════════════════════════════════
  // Eventos corporativos (17+ elementos)
  // ═══════════════════════════════════════════════════════════════
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
  // NOVOS Eventos
  el('dmx-artnet', 'DMX / ArtNet', 'Eventos', 'common', 'DMX / ArtNet'),
  el('ativacao-marca', 'Ativação de Marca', 'Eventos', 'rare', 'Brand Activation'),
  el('experiencia-marca', 'Experiência de Marca', 'Eventos', 'epic', 'Brand Experience'),
  el('marketing-experiencial', 'Marketing Experiencial', 'Eventos', 'rare', 'Experiential Marketing'),
  el('retail', 'Retail', 'Eventos', 'rare', 'Retail'),

  // ═══════════════════════════════════════════════════════════════
  // Cultura & Museus (EXPANDIDO: 12+ dedicadas)
  // ═══════════════════════════════════════════════════════════════
  el('exposicao', 'Exposição', 'Cultura', 'common', 'Exhibition'),
  el('acervo-digital', 'Acervo digital', 'Cultura', 'rare', 'Digital archive'),
  el('acessibilidade', 'Acessibilidade', 'Cultura', 'epic', 'Accessibility'),
  el('espetaculo-imersivo', 'Espetáculo imersivo', 'Cultura', 'legendary', 'Immersive show'),
  // NOVOS Cultura & Museus (8 novas dedicadas)
  el('storytelling-museal', 'Storytelling Museal', 'Cultura', 'rare', 'Museum Storytelling'),
  el('cms-acervo', 'CMS Acervo', 'Cultura', 'rare', 'Collection CMS'),
  el('expografia', 'Expografia', 'Cultura', 'rare', 'Expography'),
  el('mediacao-cultural', 'Mediação Cultural', 'Cultura', 'rare', 'Cultural Mediation'),
  el('totem-interativo', 'Totem Interativo', 'Cultura', 'epic', 'Interactive Kiosk'),
  el('sensores', 'Sensores', 'Cultura', 'common', 'Sensors'),
  el('rouanet', 'Lei Rouanet', 'Cultura', 'epic', 'Rouanet Law'),
  el('pitch-deck', 'Pitch Deck', 'Cultura', 'rare', 'Pitch Deck'),
  el('brand-kit', 'Brand Kit', 'Cultura', 'rare', 'Brand Kit'),
  el('webapp', 'Web App', 'Cultura', 'rare', 'Web App'),
  el('qr-code', 'QR Code', 'Cultura', 'common', 'QR Code'),
  el('audioguia', 'Audioguia', 'Cultura', 'rare', 'Audio Guide'),

  // ═══════════════════════════════════════════════════════════════
  // Estudar Canadá (11 elementos)
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // NOVO TÓPICO: Tecnologia & Consultoria
  // ═══════════════════════════════════════════════════════════════
  el('figma', 'Figma', 'Tech', 'rare', 'Figma'),
  el('direcao-arte', 'Direção de Arte', 'Tech', 'rare', 'Art Direction'),
  el('identidade-visual', 'Identidade Visual', 'Tech', 'rare', 'Visual Identity'),
  el('claude-chatgpt', 'Claude / ChatGPT', 'IA', 'epic', 'Claude / ChatGPT'),
  el('midjourney', 'Midjourney', 'IA', 'epic', 'Midjourney'),
  el('stable-diffusion', 'Stable Diffusion', 'IA', 'epic', 'Stable Diffusion'),
  el('bim', 'BIM', 'Tech', 'rare', 'BIM'),
  el('revit', 'Revit', 'Tech', 'rare', 'Revit'),
  el('sketchup', 'SketchUp', 'Tech', 'rare', 'SketchUp'),
  el('twinmotion', 'Twinmotion', 'Tech', 'rare', 'Twinmotion'),
  el('consultoria', 'Consultoria', 'Tech', 'rare', 'Consulting'),
  el('estrategia', 'Estratégia', 'Tech', 'rare', 'Strategy'),
  el('gestao-projeto', 'Gestão de Projeto', 'Tech', 'rare', 'Project Management'),
  el('notion', 'Notion', 'Tech', 'common', 'Notion'),
  el('miro', 'Miro', 'Tech', 'common', 'Miro'),
  el('ux-ui', 'UX/UI', 'Tech', 'rare', 'UX/UI'),
  el('planejamento-estrategico', 'Planejamento Estratégico', 'Tech', 'epic', 'Strategic Planning'),
  el('dashboards', 'Dashboards', 'Tech', 'rare', 'Dashboards'),
  el('analytics', 'Analytics', 'Tech', 'rare', 'Analytics'),

  // ═══════════════════════════════════════════════════════════════
  // NOVO TÓPICO: IA Generativa (novos cards)
  // ═══════════════════════════════════════════════════════════════
  el('dall-e', 'DALL-E', 'IA', 'epic', 'DALL-E'),
  el('gemini', 'Gemini', 'IA', 'rare', 'Gemini'),
  el('pika-labs', 'Pika Labs', 'IA', 'rare', 'Pika Labs'),
  el('comfyui', 'ComfyUI', 'IA', 'epic', 'ComfyUI'),
  el('concept-art-ia', 'Concept Art IA', 'IA', 'rare', 'AI Concept Art'),
  el('storyboard-ia', 'Storyboard IA', 'IA', 'epic', 'AI Storyboard'),

  // ═══════════════════════════════════════════════════════════════
  // NOVO TÓPICO: Web3 (novos cards; nft, blockchain, metaverse já existem)
  // ═══════════════════════════════════════════════════════════════
  el('smart-contract', 'Smart Contract', 'Web3', 'legendary', 'Smart Contract'),
  el('token', 'Token', 'Web3', 'epic', 'Token'),
  el('dao', 'DAO', 'Web3', 'legendary', 'DAO'),
  el('wallet', 'Wallet', 'Web3', 'rare', 'Wallet'),
  el('ipfs', 'IPFS', 'Web3', 'epic', 'IPFS'),
  el('solana', 'Solana', 'Web3', 'epic', 'Solana'),

  // ═══════════════════════════════════════════════════════════════
  // Games & Cenografia (novos cards)
  // ═══════════════════════════════════════════════════════════════
  el('narrative-design', 'Narrative Design', 'Games', 'epic', 'Narrative Design'),
  el('madmapper', 'MadMapper', 'Eventos', 'epic', 'MadMapper'),
  el('3ds-max', '3ds Max', 'VFX', 'epic', '3ds Max'),

  // ═══════════════════════════════════════════════════════════════
  // Expansão: mais cards (Cinema, VFX, XR, IA, Web3, Eventos, Games)
  // ═══════════════════════════════════════════════════════════════
  el('zbrush', 'ZBrush', 'VFX', 'epic', 'ZBrush'),
  el('cinema-4d', 'Cinema 4D', 'VFX', 'epic', 'Cinema 4D'),
  el('rhino', 'Rhino', 'Tech', 'rare', 'Rhino'),
  el('premiere-pro', 'Premiere Pro', 'Cinema', 'rare', 'Premiere Pro'),
  el('obs-studio', 'OBS Studio', 'Eventos', 'common', 'OBS Studio'),
  el('luma-ai', 'Luma AI', 'IA', 'epic', 'Luma AI'),
  el('leonardo-ai', 'Leonardo.ai', 'IA', 'rare', 'Leonardo.ai'),
  el('phaser', 'Phaser', 'Games', 'rare', 'Phaser'),
  el('kinect', 'Kinect', 'XR/VR', 'rare', 'Kinect'),
  el('vuforia', 'Vuforia', 'XR/VR', 'epic', 'Vuforia'),
  el('ethereum', 'Ethereum', 'Web3', 'legendary', 'Ethereum'),
  el('polygon', 'Polygon', 'Web3', 'rare', 'Polygon'),
  el('cursor-ai', 'Cursor', 'IA', 'rare', 'Cursor'),
  el('disguise', 'Disguise', 'Eventos', 'legendary', 'Disguise'),
  el('v-ray', 'V-Ray', 'VFX', 'epic', 'V-Ray'),
  el('substance-painter', 'Substance Painter', 'VFX', 'rare', 'Substance Painter'),
  el('rigging', 'Rigging', 'VFX', 'epic', 'Rigging'),
  el('keyframe', 'Keyframe', 'VFX', 'common', 'Keyframe'),

  // ═══════════════════════════════════════════════════════════════
  // Motion Design (tópico próprio) + VFX
  // ═══════════════════════════════════════════════════════════════
  el('motion-capture', 'Motion Capture', 'VFX', 'legendary', 'Motion Capture'),
  el('typography-motion', 'Tipografia em Motion', 'VFX', 'rare', 'Typography Motion'),
  el('lottie', 'Lottie', 'VFX', 'rare', 'Lottie'),
  el('fusion', 'Fusion', 'VFX', 'epic', 'Fusion'),
  el('matchmoving', 'Matchmoving', 'VFX', 'epic', 'Matchmoving'),
  el('particles-vfx', 'Partículas VFX', 'VFX', 'epic', 'Particles VFX'),

  // ═══════════════════════════════════════════════════════════════
  // Expansão: mais cards (Cinema, Eventos, XR, IA, Web3, Games, Tech)
  // ═══════════════════════════════════════════════════════════════
  el('flame', 'Flame', 'VFX', 'mythic', 'Flame'),
  el('arnold', 'Arnold', 'VFX', 'epic', 'Arnold'),
  el('redshift', 'Redshift', 'VFX', 'epic', 'Redshift'),
  el('octane', 'Octane', 'VFX', 'epic', 'Octane'),
  el('procreate', 'Procreate', 'VFX', 'rare', 'Procreate'),
  el('affinity', 'Affinity', 'Tech', 'rare', 'Affinity'),
  el('audition', 'Audition', 'Cinema', 'rare', 'Audition'),
  el('pro-tools', 'Pro Tools', 'Cinema', 'epic', 'Pro Tools'),
  el('ableton', 'Ableton Live', 'Eventos', 'epic', 'Ableton Live'),
  el('max-msp', 'Max/MSP', 'XR/VR', 'epic', 'Max/MSP'),
  el('vvvv', 'vvvv', 'XR/VR', 'epic', 'vvvv'),
  el('processing', 'Processing', 'Games', 'rare', 'Processing'),
  el('openframeworks', 'OpenFrameworks', 'XR/VR', 'epic', 'OpenFrameworks'),
  el('arduino', 'Arduino', 'XR/VR', 'rare', 'Arduino'),
  el('raspberry-pi', 'Raspberry Pi', 'XR/VR', 'rare', 'Raspberry Pi'),
  el('nfc', 'NFC', 'Eventos', 'rare', 'NFC'),
  el('rfid', 'RFID', 'Eventos', 'rare', 'RFID'),
  el('lidar', 'LiDAR', 'XR/VR', 'epic', 'LiDAR'),
  el('photogrammetry', 'Fotogrametria', 'VFX', 'legendary', 'Photogrammetry'),
  el('perplexity', 'Perplexity', 'IA', 'rare', 'Perplexity'),
  el('copilot', 'Copilot', 'IA', 'rare', 'Copilot'),
  el('chainlink', 'Chainlink', 'Web3', 'epic', 'Chainlink'),
  el('moralis', 'Moralis', 'Web3', 'rare', 'Moralis'),
  el('playcanvas', 'PlayCanvas', 'Games', 'rare', 'PlayCanvas'),
  el('construct', 'Construct', 'Games', 'rare', 'Construct'),
  el('unreal-blueprint', 'Unreal Blueprint', 'Games', 'epic', 'Unreal Blueprint'),
  el('lumion', 'Lumion', 'Tech', 'epic', 'Lumion'),
  el('enscape', 'Enscape', 'Tech', 'rare', 'Enscape'),
  el('frame-io', 'Frame.io', 'Tech', 'rare', 'Frame.io'),
  el('shotgrid', 'ShotGrid', 'Tech', 'epic', 'ShotGrid'),
  el('teradek', 'Teradek', 'Eventos', 'rare', 'Teradek'),
  el('blackmagic-atem', 'ATEM', 'Eventos', 'epic', 'ATEM'),
  el('qlab-audio', 'QLab Áudio', 'Eventos', 'rare', 'QLab Audio'),
  el('reaper', 'Reaper', 'Cinema', 'rare', 'Reaper'),
  el('storyboard', 'Storyboard', 'Cinema', 'common', 'Storyboard'),
  el('location-scout', 'Location Scout', 'Cinema', 'rare', 'Location Scout'),

  // ═══════════════════════════════════════════════════════════════
  // Últimos 6 cards (meta 200)
  // ═══════════════════════════════════════════════════════════════
  el('corona-renderer', 'Corona Renderer', 'VFX', 'epic', 'Corona Renderer'),
  el('substance-designer', 'Substance Designer', 'VFX', 'epic', 'Substance Designer'),
  el('realflow', 'RealFlow', 'VFX', 'legendary', 'RealFlow'),
  el('marvelous-designer', 'Marvelous Designer', 'VFX', 'epic', 'Marvelous Designer'),
  el('topaz-video', 'Topaz Video AI', 'IA', 'rare', 'Topaz Video AI'),
  el('kandinsky', 'Kandinsky', 'IA', 'epic', 'Kandinsky'),
]

export function getElementById(id: string): GameElement | undefined {
  return elements.find((e) => e.id === id)
}

// Função auxiliar para obter elementos por categoria
export function getElementsByCategory(category: string): GameElement[] {
  return elements.filter((e) => e.category === category)
}

// Função auxiliar para obter elementos por raridade
export function getElementsByRarity(rarity: GameElement['rarity']): GameElement[] {
  return elements.filter((e) => e.rarity === rarity)
}
