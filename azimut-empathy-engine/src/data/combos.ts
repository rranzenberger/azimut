import type { Combo } from '../types/game.types'

export const combos: Combo[] = [
  // ═══════════════════════════════════════════════════════════════
  // XR/VR
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-vr-cinema', elementIds: ['vr-headset', '360-camera'], name: 'Experiência Imersiva', bonusPoints: 50, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-xr-imersivo', elementIds: ['vr-headset', '360-camera', 'unity'], name: 'XR Imersivo', bonusPoints: 100, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-web3', elementIds: ['nft', 'blockchain', 'metaverse'], name: 'Web3 Completo', bonusPoints: 300, synergy: true, topicId: 'web3' },
  // NOVOS XR/VR
  { id: 'combo-ar-mobile', elementIds: ['arkit', 'arcore', 'ux-ui'], name: 'AR Mobile', bonusPoints: 200, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-headsets-premium', elementIds: ['meta-quest', 'htc-vive', 'tracking'], name: 'Headsets Premium', bonusPoints: 180, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-realtime-engines', elementIds: ['unity', 'unreal-engine', 'touchdesigner'], name: 'Real-time Engines', bonusPoints: 220, synergy: true, topicId: 'xr-vr' },

  // ═══════════════════════════════════════════════════════════════
  // Produção audiovisual
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-ia-vfx', elementIds: ['ai-sora', 'vfx-compositing'], name: 'IA + VFX', bonusPoints: 100, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-luz-camera', elementIds: ['camera', 'light', 'screen'], name: 'Setup Clássico', bonusPoints: 75, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-producao-completa', elementIds: ['roteiro', 'camera-video', 'edicao'], name: 'Produção Completa', bonusPoints: 120, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-elenco-direcao', elementIds: ['elenco', 'direcao', 'roteiro'], name: 'Equipe Criativa', bonusPoints: 90, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-motion-vfx', elementIds: ['motion-design', 'vfx-compositing', 'color-grading'], name: 'Motion + VFX', bonusPoints: 130, synergy: true, topicId: 'producao-audiovisual' },
  // NOVOS Produção
  { id: 'combo-ia-filmmaking', elementIds: ['ai-sora', 'runway-ml', 'roteiro'], name: 'IA Filmmaking', bonusPoints: 250, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-virtual-production-epic', elementIds: ['unreal-engine', 'virtual-production', 'direcao-arte'], name: 'Virtual Production', bonusPoints: 300, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-storyworld', elementIds: ['roteiro', 'sound-design', 'motion-design'], name: 'Storyworld', bonusPoints: 200, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-cinema-premium', elementIds: ['red-camera', 'blackmagic', 'da-vinci-resolve'], name: 'Cinema Premium', bonusPoints: 180, synergy: true, topicId: 'producao-audiovisual' },
  { id: 'combo-vfx-pipeline', elementIds: ['nuke', 'after-effects', 'houdini'], name: 'VFX Pipeline', bonusPoints: 280, synergy: true, topicId: 'producao-audiovisual' },

  // ═══════════════════════════════════════════════════════════════
  // Eventos corporativos
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-palco-som', elementIds: ['stage', 'som-evento', 'iluminacao-evento'], name: 'Palco Completo', bonusPoints: 80, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-transmissao', elementIds: ['transmissao-ao-vivo', 'streaming', 'camera'], name: 'Evento Híbrido', bonusPoints: 150, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-cenografia', elementIds: ['cenografia', 'projecao-evento', 'iluminacao-evento'], name: 'Cenografia + Projeção', bonusPoints: 100, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-curadoria-festival', elementIds: ['curadoria', 'festival', 'teatro'], name: 'Curadoria + Festival', bonusPoints: 120, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-projecao-led', elementIds: ['projecao-mapeada', 'painel-led', 'qlab'], name: 'Projeção + LED', bonusPoints: 150, synergy: true, topicId: 'eventos-corporativos' },
  // NOVOS Eventos
  { id: 'combo-evento-sincronizado', elementIds: ['dmx-artnet', 'projecao-mapeada', 'spatial-audio'], name: 'Evento Sincronizado', bonusPoints: 250, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-brand-experience', elementIds: ['ativacao-marca', 'experiencia-marca', 'marketing-experiencial'], name: 'Brand Experience', bonusPoints: 220, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-retail-imersivo', elementIds: ['retail', 'totem-interativo', 'sensores'], name: 'Retail Imersivo', bonusPoints: 180, synergy: true, topicId: 'eventos-corporativos' },

  // ═══════════════════════════════════════════════════════════════
  // Cultura & Museus
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-exposicao-tour', elementIds: ['exposicao', 'tour-virtual', 'acervo-digital'], name: 'Exposição + Tour Virtual', bonusPoints: 130, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-espetaculo-imersivo', elementIds: ['espetaculo-imersivo', 'teatro', 'projecao-mapeada'], name: 'Espetáculo Imersivo', bonusPoints: 180, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-museu-acessivel', elementIds: ['acessibilidade', 'exposicao', 'tour-virtual'], name: 'Museu Acessível', bonusPoints: 140, synergy: true, topicId: 'cultura-museus' },
  // NOVOS Cultura & Museus
  { id: 'combo-museu-hibrido', elementIds: ['acervo-digital', 'webapp', 'vr-headset'], name: 'Museu Híbrido', bonusPoints: 300, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-interativo-museu', elementIds: ['totem-interativo', 'sensores', 'acessibilidade'], name: 'Interativo Museu', bonusPoints: 250, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-capta-patrocinio', elementIds: ['rouanet', 'pitch-deck', 'brand-kit'], name: 'Captação + Patrocínio', bonusPoints: 250, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-storytelling-completo', elementIds: ['storytelling-museal', 'expografia', 'mediacao-cultural'], name: 'Storytelling Completo', bonusPoints: 200, synergy: true, topicId: 'cultura-museus' },
  { id: 'combo-acervo-conectado', elementIds: ['cms-acervo', 'qr-code', 'audioguia'], name: 'Acervo Conectado', bonusPoints: 180, synergy: true, topicId: 'cultura-museus' },

  // ═══════════════════════════════════════════════════════════════
  // Estudar Canadá
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-academy-full', elementIds: ['vancouver-academy', 'vfs', 'vanarts'], name: 'Tríplice Academy', bonusPoints: 200, synergy: true, topicId: 'estudar-canada' },
  { id: 'combo-cursos-vancouver', elementIds: ['curso-animacao', 'curso-vfx', 'curso-game-design'], name: 'Cursos Vancouver', bonusPoints: 100, synergy: true, topicId: 'estudar-canada' },
  { id: 'combo-visto-residencia', elementIds: ['visto-estudante', 'residencia-permanente'], name: 'Visto e Residência', bonusPoints: 150, synergy: true, topicId: 'estudar-canada' },
  { id: 'combo-workshop-treinamento', elementIds: ['workshop', 'treinamento-corporativo', 'curso-online'], name: 'Workshop + Treinamento', bonusPoints: 120, synergy: true, topicId: 'estudar-canada' },
  // NOVO
  { id: 'combo-educacao-carreira', elementIds: ['vfs', 'visto-estudante', 'residencia-permanente'], name: 'Educação + Carreira', bonusPoints: 300, synergy: true, topicId: 'estudar-canada' },

  // ═══════════════════════════════════════════════════════════════
  // NOVO: Tecnologia & Consultoria
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-design-system', elementIds: ['figma', 'direcao-arte', 'identidade-visual'], name: 'Design System', bonusPoints: 180, synergy: true, topicId: 'tecnologia-consultoria' },
  { id: 'combo-ia-generativa', elementIds: ['claude-chatgpt', 'midjourney', 'stable-diffusion'], name: 'IA Generativa', bonusPoints: 280, synergy: true, topicId: 'tecnologia-consultoria' },
  { id: 'combo-arquitetura-3d', elementIds: ['bim', 'revit', 'twinmotion'], name: 'Arquitetura 3D', bonusPoints: 200, synergy: true, topicId: 'tecnologia-consultoria' },
  { id: 'combo-dados-decidem', elementIds: ['planejamento-estrategico', 'dashboards', 'analytics'], name: 'Dados Decidem', bonusPoints: 250, synergy: true, topicId: 'tecnologia-consultoria' },
  { id: 'combo-gestao-agil', elementIds: ['gestao-projeto', 'notion', 'miro'], name: 'Gestão Ágil', bonusPoints: 150, synergy: true, topicId: 'tecnologia-consultoria' },
  { id: 'combo-consultoria-estrategica', elementIds: ['consultoria', 'estrategia', 'ux-ui'], name: 'Consultoria Estratégica', bonusPoints: 220, synergy: true, topicId: 'tecnologia-consultoria' },

  // ═══════════════════════════════════════════════════════════════
  // IA Generativa
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-ia-texto-imagem', elementIds: ['claude-chatgpt', 'midjourney', 'direcao-arte'], name: 'IA Texto + Imagem', bonusPoints: 220, synergy: true, topicId: 'ia-generativa' },
  { id: 'combo-ia-video-pipeline', elementIds: ['ai-sora', 'runway-ml', 'pika-labs'], name: 'IA de Vídeo', bonusPoints: 280, synergy: true, topicId: 'ia-generativa' },
  { id: 'combo-ia-pre-producao', elementIds: ['concept-art-ia', 'storyboard-ia', 'figma'], name: 'Pré-produção IA', bonusPoints: 250, synergy: true, topicId: 'ia-generativa' },
  { id: 'combo-ia-imagem-completo', elementIds: ['midjourney', 'stable-diffusion', 'dall-e'], name: 'IA Imagem Completo', bonusPoints: 260, synergy: true, topicId: 'ia-generativa' },
  { id: 'combo-ia-workflow', elementIds: ['claude-chatgpt', 'comfyui', 'stable-diffusion'], name: 'Workflow IA', bonusPoints: 270, synergy: true, topicId: 'ia-generativa' },

  // ═══════════════════════════════════════════════════════════════
  // Web3
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-web3-governance', elementIds: ['smart-contract', 'token', 'dao'], name: 'Governança Web3', bonusPoints: 280, synergy: true, topicId: 'web3' },
  { id: 'combo-web3-storage', elementIds: ['wallet', 'ipfs', 'nft'], name: 'Storage + NFT', bonusPoints: 250, synergy: true, topicId: 'web3' },
  { id: 'combo-web3-chain', elementIds: ['blockchain', 'solana', 'smart-contract'], name: 'Chain Completa', bonusPoints: 260, synergy: true, topicId: 'web3' },
  { id: 'combo-web3-ecosystem', elementIds: ['nft', 'wallet', 'metaverse'], name: 'Ecossistema Web3', bonusPoints: 270, synergy: true, topicId: 'web3' },
  { id: 'combo-web3-decentralized', elementIds: ['dao', 'ipfs', 'blockchain'], name: 'Descentralizado', bonusPoints: 240, synergy: true, topicId: 'web3' },

  // ═══════════════════════════════════════════════════════════════
  // COMBOS PONTE (conectam tópicos diferentes)
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-ia-video', elementIds: ['ai-sora', 'runway-ml', 'motion-design'], name: 'IA de Vídeo', bonusPoints: 260, synergy: true },
  { id: 'combo-xr-eventos', elementIds: ['vr-headset', 'projecao-mapeada', 'spatial-audio'], name: 'XR + Eventos', bonusPoints: 240, synergy: true },
  { id: 'combo-museu-xr', elementIds: ['tour-virtual', 'vr-headset', 'acervo-digital'], name: 'Museu XR', bonusPoints: 220, synergy: true },
  { id: 'combo-producao-ia', elementIds: ['claude-chatgpt', 'roteiro', 'midjourney'], name: 'Produção + IA', bonusPoints: 200, synergy: true },
  { id: 'combo-vr-nft', elementIds: ['vr-headset', 'nft', 'metaverse'], name: 'VR + NFT', bonusPoints: 280, synergy: true },
  { id: 'combo-ia-consultoria', elementIds: ['claude-chatgpt', 'figma', 'direcao-arte'], name: 'IA + Consultoria', bonusPoints: 230, synergy: true },

  // ═══════════════════════════════════════════════════════════════
  // Games & Interativos
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-games-engine', elementIds: ['godot', 'unity', 'narrative-design'], name: 'Game Engine + Narrativa', bonusPoints: 220, synergy: true, topicId: 'games' },
  { id: 'combo-games-serio', elementIds: ['jogo-serio', 'gamificacao', 'unity'], name: 'Jogo Sério', bonusPoints: 250, synergy: true, topicId: 'games' },
  { id: 'combo-games-interativo', elementIds: ['instalacao-interativa', 'sensores', 'narrative-design'], name: 'Instalação Narrativa', bonusPoints: 260, synergy: true, topicId: 'games' },
  { id: 'combo-games-assets', elementIds: ['3ds-max', 'blender', 'unity'], name: 'Assets 3D para Game', bonusPoints: 270, synergy: true, topicId: 'games' },

  // ═══════════════════════════════════════════════════════════════
  // Cenografia & Design Espacial
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-cenografia-projecao', elementIds: ['projecao-mapeada', 'painel-led', 'qlab'], name: 'Projeção + LED', bonusPoints: 220, synergy: true, topicId: 'cenografia' },
  { id: 'combo-cenografia-mapping', elementIds: ['madmapper', 'projecao-mapeada', 'dmx-artnet'], name: 'Mapping Cenográfico', bonusPoints: 250, synergy: true, topicId: 'cenografia' },
  { id: 'combo-cenografia-realtime', elementIds: ['touchdesigner', 'notch', 'resolume'], name: 'Real-time Cenografia', bonusPoints: 270, synergy: true, topicId: 'cenografia' },

  // ═══════════════════════════════════════════════════════════════
  // Cenografia Virtual
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-cenografia-virtual-bim', elementIds: ['bim', 'revit', 'twinmotion'], name: 'BIM + Viz', bonusPoints: 220, synergy: true, topicId: 'cenografia-virtual' },
  { id: 'combo-cenografia-virtual-set', elementIds: ['unreal-engine', 'virtual-production', 'blender'], name: 'Set Virtual', bonusPoints: 300, synergy: true, topicId: 'cenografia-virtual' },
  { id: 'combo-cenografia-virtual-3d', elementIds: ['sketchup', 'twinmotion', 'maya'], name: 'Cenário 3D', bonusPoints: 250, synergy: true, topicId: 'cenografia-virtual' },
  { id: 'combo-cenografia-virtual-max', elementIds: ['3ds-max', 'sketchup', 'twinmotion'], name: 'Viz Arquitetônica', bonusPoints: 240, synergy: true, topicId: 'cenografia-virtual' },

  // ═══════════════════════════════════════════════════════════════
  // Direção de Arte & Criativa
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-direcao-arte-identidade', elementIds: ['direcao-arte', 'identidade-visual', 'brand-kit'], name: 'Identidade Completa', bonusPoints: 230, synergy: true, topicId: 'direcao-arte' },
  { id: 'combo-direcao-arte-design', elementIds: ['figma', 'direcao-arte', 'ux-ui'], name: 'Design + Direção', bonusPoints: 220, synergy: true, topicId: 'direcao-arte' },
  { id: 'combo-direcao-arte-pitch', elementIds: ['pitch-deck', 'brand-kit', 'identidade-visual'], name: 'Pitch Visual', bonusPoints: 200, synergy: true, topicId: 'direcao-arte' },

  // ═══════════════════════════════════════════════════════════════
  // Ativação de Marcas
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-ativacao-experiencia', elementIds: ['ativacao-marca', 'experiencia-marca', 'marketing-experiencial'], name: 'Experiência de Marca', bonusPoints: 240, synergy: true, topicId: 'ativacao-marcas' },
  { id: 'combo-ativacao-retail', elementIds: ['retail', 'totem-interativo', 'sensores'], name: 'Retail Ativado', bonusPoints: 220, synergy: true, topicId: 'ativacao-marcas' },
  { id: 'combo-ativacao-imersivo', elementIds: ['projecao-mapeada', 'painel-led', 'experiencia-marca'], name: 'Ativação Imersiva', bonusPoints: 260, synergy: true, topicId: 'ativacao-marcas' },

  // ═══════════════════════════════════════════════════════════════
  // Motion Design (tópico próprio)
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-motion-ae-c4d', elementIds: ['motion-design', 'after-effects', 'cinema-4d'], name: 'Motion 2D/3D', bonusPoints: 270, synergy: true, topicId: 'motion-design' },
  { id: 'combo-motion-lottie', elementIds: ['lottie', 'figma', 'typography-motion'], name: 'Motion para App', bonusPoints: 240, synergy: true, topicId: 'motion-design' },
  { id: 'combo-motion-ia', elementIds: ['runway-ml', 'ai-sora', 'motion-design'], name: 'Motion + IA', bonusPoints: 280, synergy: true, topicId: 'motion-design' },
  { id: 'combo-motion-titulos', elementIds: ['keyframe', 'sound-design', 'premiere-pro'], name: 'Títulos e Edição', bonusPoints: 230, synergy: true, topicId: 'motion-design' },
  { id: 'combo-motion-brand', elementIds: ['direcao-arte', 'figma', 'concept-art-ia'], name: 'Motion de Marca', bonusPoints: 250, synergy: true, topicId: 'motion-design' },

  // ═══════════════════════════════════════════════════════════════
  // VFX & Compositing (separado de Motion Design)
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-motion-vfx-pipeline', elementIds: ['nuke', 'houdini', 'fusion'], name: 'Pipeline VFX', bonusPoints: 290, synergy: true, topicId: 'motion-vfx' },
  { id: 'combo-motion-vfx-motion', elementIds: ['vfx-compositing', 'matchmoving', 'rotoscopia'], name: 'Compositing + Match', bonusPoints: 270, synergy: true, topicId: 'motion-vfx' },
  { id: 'combo-motion-vfx-grade', elementIds: ['da-vinci-resolve', 'color-grading', 'vfx-compositing'], name: 'Grade + Compositing', bonusPoints: 230, synergy: true, topicId: 'motion-vfx' },
  { id: 'combo-motion-vfx-3d', elementIds: ['blender', 'maya', 'rotoscopia'], name: 'VFX 3D', bonusPoints: 260, synergy: true, topicId: 'motion-vfx' },
  { id: 'combo-vfx-render', elementIds: ['arnold', 'redshift', 'houdini'], name: 'Render VFX', bonusPoints: 300, synergy: true, topicId: 'motion-vfx' },

  // ═══════════════════════════════════════════════════════════════
  // Modelagem 3D
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-modelagem-soft', elementIds: ['blender', 'maya', 'direcao-arte'], name: 'Pipeline 3D', bonusPoints: 250, synergy: true, topicId: 'modelagem-3d' },
  { id: 'combo-modelagem-arq', elementIds: ['bim', 'revit', 'twinmotion'], name: 'Modelagem Arquitetônica', bonusPoints: 220, synergy: true, topicId: 'modelagem-3d' },
  { id: 'combo-modelagem-viz', elementIds: ['sketchup', 'twinmotion', 'blender'], name: 'Visualização 3D', bonusPoints: 240, synergy: true, topicId: 'modelagem-3d' },
  { id: 'combo-modelagem-vfx', elementIds: ['houdini', 'blender', 'maya'], name: 'Modelagem VFX', bonusPoints: 280, synergy: true, topicId: 'modelagem-3d' },
  { id: 'combo-modelagem-3ds', elementIds: ['3ds-max', 'blender', 'maya'], name: 'Tríplice 3D', bonusPoints: 270, synergy: true, topicId: 'modelagem-3d' },

  // ═══════════════════════════════════════════════════════════════
  // Animação 2D/3D
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-animacao-2d', elementIds: ['toon-boom', 'after-effects', 'motion-design'], name: 'Animação 2D', bonusPoints: 240, synergy: true, topicId: 'animacao-2d-3d' },
  { id: 'combo-animacao-3d', elementIds: ['blender', 'maya', 'sound-design'], name: 'Animação 3D', bonusPoints: 260, synergy: true, topicId: 'animacao-2d-3d' },
  { id: 'combo-animacao-ia', elementIds: ['runway-ml', 'ai-sora', 'motion-design'], name: 'Animação + IA', bonusPoints: 270, synergy: true, topicId: 'animacao-2d-3d' },
  { id: 'combo-animacao-rotoscopia', elementIds: ['rotoscopia', 'after-effects', 'direcao'], name: 'Rotoscopia + Direção', bonusPoints: 230, synergy: true, topicId: 'animacao-2d-3d' },

  // ═══════════════════════════════════════════════════════════════
  // Combos com novos cards (expansão)
  // ═══════════════════════════════════════════════════════════════
  { id: 'combo-modelagem-zbrush', elementIds: ['zbrush', 'maya', 'substance-painter'], name: 'Pipeline Escultura', bonusPoints: 280, synergy: true, topicId: 'modelagem-3d' },
  { id: 'combo-animacao-c4d', elementIds: ['cinema-4d', 'after-effects', 'motion-design'], name: 'Motion 3D', bonusPoints: 260, synergy: true, topicId: 'animacao-2d-3d' },
  { id: 'combo-xr-vuforia', elementIds: ['vuforia', 'ar-glasses', 'unity'], name: 'AR com Vuforia', bonusPoints: 250, synergy: true, topicId: 'xr-vr' },
  { id: 'combo-web3-chains', elementIds: ['ethereum', 'polygon', 'smart-contract'], name: 'Multi-Chain', bonusPoints: 270, synergy: true, topicId: 'web3' },
  { id: 'combo-ia-luma', elementIds: ['luma-ai', 'runway-ml', 'ai-sora'], name: 'IA de Vídeo', bonusPoints: 280, synergy: true, topicId: 'ia-generativa' },
  { id: 'combo-evento-obs', elementIds: ['obs-studio', 'transmissao-ao-vivo', 'streaming'], name: 'Transmissão OBS', bonusPoints: 220, synergy: true, topicId: 'eventos-corporativos' },
  { id: 'combo-cenografia-disguise', elementIds: ['disguise', 'projecao-mapeada', 'painel-led'], name: 'Media Server', bonusPoints: 290, synergy: true, topicId: 'cenografia' },
  { id: 'combo-viz-vray', elementIds: ['v-ray', 'rhino', 'twinmotion'], name: 'Render Realista', bonusPoints: 260, synergy: true, topicId: 'cenografia-virtual' },
  { id: 'combo-motion-rigging', elementIds: ['rigging', 'maya', 'keyframe'], name: 'Animação 3D', bonusPoints: 250, synergy: true, topicId: 'motion-vfx' },
  { id: 'combo-vfx-photogrammetry', elementIds: ['photogrammetry', 'matchmoving', 'vfx-compositing'], name: 'Fotogrametria VFX', bonusPoints: 290, synergy: true, topicId: 'motion-vfx' },
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

// NOVO: Retorna combos que contêm um elemento específico
export function getCombosContainingElement(elementId: string, topicId?: string | null): Combo[] {
  return combos.filter((c) => {
    const hasElement = c.elementIds.includes(elementId)
    const matchTopic = topicId == null || c.topicId == null || c.topicId === topicId
    return hasElement && matchTopic
  })
}

// Retorna IDs dos elementos que formam combo com um elemento dado (para highlight em tempo real)
export function getComboPartnersForElement(elementId: string, topicId?: string | null): string[] {
  const partners: Set<string> = new Set()
  const relevantCombos = getCombosContainingElement(elementId, topicId)
  relevantCombos.forEach((combo) => {
    combo.elementIds.forEach((id) => {
      if (id !== elementId) partners.add(id)
    })
  })
  return Array.from(partners)
}
