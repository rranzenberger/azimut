import type { Brief } from '../types/game.types'

export const briefs: Brief[] = [
  // XR/VR
  {
    id: 'brief-xr-experiencia',
    topicId: 'xr-vr',
    title: 'Experiência imersiva',
    objective: 'Monte uma proposta de experiência XR/VR para o cliente. Combine tecnologias que criem imersão.',
  },
  {
    id: 'brief-xr-museu',
    topicId: 'xr-vr',
    title: 'VR para museu',
    objective: 'O cliente quer levar visitantes a uma exposição em VR. Selecione as tecnologias ideais.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente pede pelo menos um combo de tecnologias.',
    },
  },
  {
    id: 'brief-xr-metaverso',
    topicId: 'xr-vr',
    title: 'Presença no metaverso',
    objective: 'Proposta para presença da marca no metaverso. Inclua captura, engines e interação.',
    surprise: {
      type: 'target-bonus',
      description: 'Meta de pontos aumentada nesta fase.',
    },
  },
  // Produção audiovisual
  {
    id: 'brief-av-comercial',
    topicId: 'producao-audiovisual',
    title: 'Comercial de marca',
    objective: 'Monte a equipe e o pipeline para um comercial. Do roteiro à pós-edição.',
  },
  {
    id: 'brief-av-doc',
    topicId: 'producao-audiovisual',
    title: 'Documentário',
    objective: 'Proposta de produção documental: pré-produção, câmera, locação, edição e som.',
    surprise: {
      type: 'time-reduced',
      description: 'Tempo reduzido nesta fase.',
    },
  },
  {
    id: 'brief-av-ia-vfx',
    topicId: 'producao-audiovisual',
    title: 'IA e VFX',
    objective: 'O cliente quer explorar IA e VFX na pós-produção. Combine as tecnologias certas.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer ver um combo de IA + VFX.',
    },
  },
  // Eventos corporativos
  {
    id: 'brief-ev-corporativo',
    topicId: 'eventos-corporativos',
    title: 'Evento corporativo',
    objective: 'Monte a estrutura de um evento: palco, som, iluminação e transmissão.',
  },
  {
    id: 'brief-ev-hibrido',
    topicId: 'eventos-corporativos',
    title: 'Evento híbrido',
    objective: 'Evento presencial e online. Inclua transmissão ao vivo, projeção e streaming.',
    surprise: {
      type: 'time-extra',
      description: 'Tempo extra nesta fase.',
    },
  },
  {
    id: 'brief-ev-cenografia',
    topicId: 'eventos-corporativos',
    title: 'Cenografia e projeção',
    objective: 'O cliente prioriza cenografia e projeção. Combine com som e iluminação.',
  },
  // Estudar Canadá
  {
    id: 'brief-canada-vfx',
    topicId: 'estudar-canada',
    title: 'Estudar VFX no Canadá',
    objective: 'Ajude o cliente a montar um plano: escolas (VFS, VanArts), curso VFX e visto.',
  },
  {
    id: 'brief-canada-game',
    topicId: 'estudar-canada',
    title: 'Game design no Canadá',
    objective: 'Proposta de formação em game design: Vancouver Academy, cursos e residência.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer um combo de academias.',
    },
  },
  {
    id: 'brief-canada-animacao',
    topicId: 'estudar-canada',
    title: 'Curso de animação',
    objective: 'O cliente quer estudar animação em Vancouver. Combine escolas e vistos.',
  },
  // Cultura & Museus
  {
    id: 'brief-cultura-museu',
    topicId: 'cultura-museus',
    title: 'Museus & Exposições',
    objective: 'Monte uma proposta de exposição ou experiência museal: curadoria, acervo digital, tour virtual e acessibilidade.',
  },
  {
    id: 'brief-cultura-festival',
    topicId: 'cultura-museus',
    title: 'Festival ou teatro imersivo',
    objective: 'O cliente quer um festival ou espetáculo imersivo. Combine curadoria, palco, projeção mapeada e painel LED.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente pede pelo menos um combo de tecnologias.',
    },
  },
  {
    id: 'brief-cultura-tour',
    topicId: 'cultura-museus',
    title: 'Tour virtual e exposição',
    objective: 'Proposta de tour virtual e exposição com projeção mapeada e acessibilidade.',
  },
  // ═══════════════════════════════════════════════════════════════
  // NOVOS BRIEFS (v1.1) — híbridos e Tecnologia & Consultoria
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-cultura-futuro-museu',
    topicId: 'cultura-museus',
    title: 'O Futuro do Museu',
    objective: 'Criar acervo digital acessível via Web + VR. Combine curadoria, acervo digital, tour virtual e acessibilidade.',
    surprise: {
      type: 'target-bonus',
      description: 'Orçamento apertado: meta aumentada. Um combo ajuda a compensar.',
    },
  },
  {
    id: 'brief-ev-festival-vr',
    topicId: 'eventos-corporativos',
    title: 'Festival VR Pop-up',
    objective: 'Montar ativação de festival com experiência XR no foyer. Inclua headsets, projeção e interatividade.',
    surprise: {
      type: 'time-reduced',
      description: 'Prazo reduzido nesta fase.',
    },
  },
  {
    id: 'brief-tec-marca-premium',
    topicId: 'tecnologia-consultoria',
    title: 'Marca Premium 2026',
    objective: 'Lançamento com filme-manifesto e kit de campanha. Direção de arte, identidade e estratégia.',
    surprise: {
      type: 'time-extra',
      description: 'Cliente VIP: tempo extra nesta fase.',
    },
  },
  {
    id: 'brief-canada-vancouver',
    topicId: 'estudar-canada',
    title: 'Programa Educacional Vancouver',
    objective: 'Trilha de carreira com conteúdo e orientação. Escolas, visto e residência.',
    surprise: {
      type: 'combo-required',
      description: 'Documentação extra: precisa de um combo de 3 elementos.',
    },
  },
  {
    id: 'brief-cultura-exposicao-acessivel',
    topicId: 'cultura-museus',
    title: 'Exposição Acessível',
    objective: 'Experiência inclusiva WCAG e trilha de acessibilidade. Curadoria, totem interativo e mediação.',
    surprise: {
      type: 'combo-required',
      description: 'Reduzir movimento obrigatório: ative um combo.',
    },
  },
  {
    id: 'brief-ev-corporativo-imersivo',
    topicId: 'eventos-corporativos',
    title: 'Evento Corporativo Imersivo',
    objective: 'Mapping + áudio espacial + interatividade no palco. Projeção mapeada, QLab e DMX.',
    surprise: {
      type: 'target-bonus',
      description: 'Surpresa: menos cartas, mas valem 3x em combo.',
    },
  },
  {
    id: 'brief-cultura-arquivo-vivo',
    topicId: 'cultura-museus',
    title: 'Arquivo Vivo da Cidade',
    objective: 'Instalação urbana + app/QR + storytelling. Conecte acervo digital, expografia e experiência de marca.',
    surprise: {
      type: 'time-reduced',
      description: 'Cliente muda de ideia: tempo reduzido.',
    },
  },
  // Tecnologia & Consultoria
  {
    id: 'brief-tec-ia-generativa',
    topicId: 'tecnologia-consultoria',
    title: 'IA Generativa',
    objective: 'Proposta de uso de IA para design e conteúdo. Figma, Claude/ChatGPT e Midjourney.',
  },
  {
    id: 'brief-tec-estrategia',
    topicId: 'tecnologia-consultoria',
    title: 'Consultoria Estratégica',
    objective: 'Planejamento estratégico, dashboards e analytics para decisão baseada em dados.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer ver um combo de dados.',
    },
  },
  {
    id: 'brief-tec-design-system',
    topicId: 'tecnologia-consultoria',
    title: 'Design System',
    objective: 'Identidade visual e direção de arte com Figma e gestão de projeto.',
  },
  // Novas surpresas (v1.1): Cliente VIP e Estagiário atrapalhado
  {
    id: 'brief-xr-cliente-vip',
    topicId: 'xr-vr',
    title: 'Cliente VIP',
    objective: 'Apresentação XR para cliente premium. Máxima imersão em pouco tempo.',
    surprise: {
      type: 'client-vip',
      description: 'Cliente VIP: pontos dobrados nos primeiros 10 segundos.',
    },
  },
  {
    id: 'brief-ev-estagiario',
    topicId: 'eventos-corporativos',
    title: 'Evento express',
    objective: 'Menos recursos, mais impacto. Monte a proposta com o que tiver.',
    surprise: {
      type: 'intern-chaos',
      description: 'Estagiário atrapalhado: menos cartas, mas cada uma vale 3×.',
    },
  },
  // ═══════════════════════════════════════════════════════════════
  // IA Generativa
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-ia-pipeline-pre',
    topicId: 'ia-generativa',
    title: 'Pipeline IA para pré-produção',
    objective: 'Acelerar pré-produção com IA. Combine Claude/ChatGPT, Midjourney, Runway e storyboard IA.',
  },
  {
    id: 'brief-ia-concept-art',
    topicId: 'ia-generativa',
    title: 'Concept art com IA',
    objective: 'Visualizações conceituais com IA. DALL-E, Midjourney, Stable Diffusion e direção de arte.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer ver um combo de ferramentas de imagem.',
    },
  },
  {
    id: 'brief-ia-storyboard',
    topicId: 'ia-generativa',
    title: 'Storyboard acelerado',
    objective: 'Storyboards detalhados com IA. Combine storyboard IA, roteiro e ferramentas de vídeo (Sora, Runway).',
    surprise: {
      type: 'time-extra',
      description: 'Cliente dá tempo extra para iterar.',
    },
  },
  {
    id: 'brief-ia-consultoria',
    topicId: 'ia-generativa',
    title: 'Consultoria IA criativa',
    objective: 'Adoção estratégica de IA: seleção de modelos, pipelines e treinamento. Claude, ComfyUI, Figma.',
  },
  // ═══════════════════════════════════════════════════════════════
  // Web3
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-web3-nft-marca',
    topicId: 'web3',
    title: 'Presença NFT para marca',
    objective: 'Proposta de coleção NFT para a marca. Smart contract, wallet, blockchain e IPFS.',
  },
  {
    id: 'brief-web3-metaverso',
    topicId: 'web3',
    title: 'Metaverso tokenizado',
    objective: 'Presença no metaverso com economia tokenizada. Metaverse, token, DAO e blockchain.',
    surprise: {
      type: 'target-bonus',
      description: 'Meta de pontos aumentada nesta fase.',
    },
  },
  {
    id: 'brief-web3-phygital',
    topicId: 'web3',
    title: 'Ativação phygital com blockchain',
    objective: 'Experiência físico-digital com blockchain. NFT, wallet, smart contract e sensores/conteúdo.',
  },
  {
    id: 'brief-web3-dao',
    topicId: 'web3',
    title: 'DAO para comunidade',
    objective: 'Governança descentralizada: DAO, token, smart contract e wallet. Combine as tecnologias certas.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer ver um combo Web3.',
    },
  },
  // ═══════════════════════════════════════════════════════════════
  // Games & Interativos
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-games-serio',
    topicId: 'games',
    title: 'Jogo sério para treinamento',
    objective: 'Proposta de jogo sério para capacitação. Godot ou Unity, gamificação e narrative design.',
  },
  {
    id: 'brief-games-interativo',
    topicId: 'games',
    title: 'Experiência interativa',
    objective: 'Instalação interativa com sensores e narrativa. Combine engines, narrative design e interatividade.',
    surprise: { type: 'combo-required', description: 'O cliente quer um combo de tecnologias.' },
  },
  {
    id: 'brief-games-gamificacao',
    topicId: 'games',
    title: 'Gamificação de processo',
    objective: 'Gamificar um processo interno. Gamificação, UX e engines (Unity/Godot).',
  },
  // ═══════════════════════════════════════════════════════════════
  // Cenografia & Design Espacial
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-cenografia-evento',
    topicId: 'cenografia',
    title: 'Cenografia para evento',
    objective: 'Cenografia completa: projeção mapeada, LED, QLab e DMX. MadMapper ou Resolume.',
  },
  {
    id: 'brief-cenografia-espacial',
    topicId: 'cenografia',
    title: 'Design espacial imersivo',
    objective: 'Espaço imersivo com projeção, iluminação e áudio. TouchDesigner, Notch ou Resolume.',
    surprise: { type: 'time-extra', description: 'Tempo extra nesta fase.' },
  },
  // ═══════════════════════════════════════════════════════════════
  // Cenografia Virtual
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-cenografia-virtual-set',
    topicId: 'cenografia-virtual',
    title: 'Set virtual para produção',
    objective: 'Cenário virtual para filmagem. BIM, Revit, Twinmotion ou Unreal + virtual production.',
  },
  {
    id: 'brief-cenografia-virtual-viz',
    topicId: 'cenografia-virtual',
    title: 'Visualização 3D de espaço',
    objective: 'Visualização arquitetônica e cenográfica. SketchUp, Revit, Twinmotion e Blender.',
  },
  // ═══════════════════════════════════════════════════════════════
  // Direção de Arte & Criativa
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-direcao-arte-marca',
    topicId: 'direcao-arte',
    title: 'Direção de arte de marca',
    objective: 'Identidade visual e direção de arte. Figma, brand kit, pitch deck e UX/UI.',
  },
  {
    id: 'brief-direcao-arte-projeto',
    topicId: 'direcao-arte',
    title: 'Visão criativa do projeto',
    objective: 'Liderar a visão criativa: direção de arte, identidade e consultoria.',
    surprise: { type: 'combo-required', description: 'Cliente quer ver combo de design.' },
  },
  // ═══════════════════════════════════════════════════════════════
  // Ativação de Marcas
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-ativacao-pop-up',
    topicId: 'ativacao-marcas',
    title: 'Ativação pop-up',
    objective: 'Ativação de marca com experiência imersiva. Totem, sensores, projeção e retail.',
  },
  {
    id: 'brief-ativacao-experiencia',
    topicId: 'ativacao-marcas',
    title: 'Experiência de marca',
    objective: 'Marketing experiencial: ativação, experiência de marca e painel LED.',
    surprise: { type: 'target-bonus', description: 'Meta aumentada nesta fase.' },
  },
  // ═══════════════════════════════════════════════════════════════
  // Motion Design & VFX
  // ═══════════════════════════════════════════════════════════════
  // Motion Design (tópico próprio)
  {
    id: 'brief-motion-titulos',
    topicId: 'motion-design',
    title: 'Títulos e gráficos em motion',
    objective: 'Títulos e motion graphics. After Effects, Cinema 4D, tipografia em motion e som.',
  },
  {
    id: 'brief-motion-brand',
    topicId: 'motion-design',
    title: 'Motion para marca',
    objective: 'Identidade em motion. Figma, After Effects, Lottie e direção de arte.',
    surprise: { type: 'combo-required', description: 'Cliente quer combo de motion.' },
  },
  {
    id: 'brief-motion-ia-video',
    topicId: 'motion-design',
    title: 'Motion com IA de vídeo',
    objective: 'Motion acelerado com IA. Runway, Sora, keyframe e concept art.',
    surprise: { type: 'time-extra', description: 'Tempo extra nesta fase.' },
  },
  // VFX & Compositing (separado)
  {
    id: 'brief-motion-vfx-pipeline',
    topicId: 'motion-vfx',
    title: 'Pipeline VFX',
    objective: 'Pipeline de VFX e compositing. Nuke, Houdini, rotoscopia e color grading.',
  },
  {
    id: 'brief-motion-vfx-compositing',
    topicId: 'motion-vfx',
    title: 'Compositing VFX',
    objective: 'Compositing e matchmoving. DaVinci Resolve, Fusion, partículas e integração.',
    surprise: { type: 'time-reduced', description: 'Prazo reduzido nesta fase.' },
  },
  {
    id: 'brief-vfx-photogrammetry',
    topicId: 'motion-vfx',
    title: 'VFX com fotogrametria',
    objective: 'VFX com fotogrametria e integração 3D. Arnold, Redshift e pipeline.',
  },
  // ═══════════════════════════════════════════════════════════════
  // Modelagem 3D
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-modelagem-cenario',
    topicId: 'modelagem-3d',
    title: 'Cenário e assets 3D',
    objective: 'Modelagem de cenário e assets. Blender, Maya, direção de arte e pipeline.',
  },
  {
    id: 'brief-modelagem-arquitetura',
    topicId: 'modelagem-3d',
    title: 'Modelagem arquitetônica',
    objective: 'Visualização 3D arquitetônica. BIM, Revit, SketchUp, Twinmotion.',
    surprise: { type: 'combo-required', description: 'Cliente quer combo de ferramentas 3D.' },
  },
  {
    id: 'brief-modelagem-vfx',
    topicId: 'modelagem-3d',
    title: 'Modelagem para VFX',
    objective: 'Modelos 3D para VFX e simulação. Houdini, Blender, Maya.',
  },
  // ═══════════════════════════════════════════════════════════════
  // Animação 2D/3D
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-animacao-2d',
    topicId: 'animacao-2d-3d',
    title: 'Animação 2D',
    objective: 'Proposta de animação 2D. Toon Boom, After Effects, motion design e direção.',
  },
  {
    id: 'brief-animacao-3d',
    topicId: 'animacao-2d-3d',
    title: 'Animação 3D',
    objective: 'Animação 3D com Blender e Maya. Som, direção e pipeline.',
    surprise: { type: 'time-extra', description: 'Tempo extra nesta fase.' },
  },
  {
    id: 'brief-animacao-ia',
    topicId: 'animacao-2d-3d',
    title: 'Animação com IA',
    objective: 'Animação acelerada com IA. Runway, Sora, rotoscopia e motion design.',
    surprise: { type: 'combo-required', description: 'Cliente quer combo IA + animação.' },
  },
  // ═══════════════════════════════════════════════════════════════
  // Expansão: mais quests (1–2 por tópico)
  // ═══════════════════════════════════════════════════════════════
  { id: 'brief-xr-ar-app', topicId: 'xr-vr', title: 'App AR', objective: 'App mobile com AR. ARKit, ARCore, Vuforia e direção de experiência.', surprise: { type: 'time-extra', description: 'Tempo extra nesta fase.' } },
  { id: 'brief-xr-captura', topicId: 'xr-vr', title: 'Captura volumétrica', objective: 'Experiência com captura volumétrica. Tracking, câmera 360 e engines.', surprise: { type: 'combo-required', description: 'Cliente quer combo de captura.' } },
  { id: 'brief-av-spot', topicId: 'producao-audiovisual', title: 'Spot publicitário', objective: 'Spot de TV ou web. Roteiro, câmera, edição (Premiere) e som.', surprise: { type: 'time-reduced', description: 'Prazo reduzido.' } },
  { id: 'brief-av-virtual-prod', topicId: 'producao-audiovisual', title: 'Virtual production', objective: 'Filmagem em virtual production. Unreal, LED wall e direção.', surprise: { type: 'target-bonus', description: 'Meta aumentada.' } },
  { id: 'brief-ev-live', topicId: 'eventos-corporativos', title: 'Transmissão ao vivo', objective: 'Transmissão profissional. OBS, câmeras, streaming e som.', surprise: { type: 'combo-required', description: 'Cliente quer combo transmissão.' } },
  { id: 'brief-ev-disguise', topicId: 'eventos-corporativos', title: 'Evento com Disguise', objective: 'Evento com media server Disguise. Projeção, LED e sincronia.', surprise: { type: 'time-extra', description: 'Tempo extra.' } },
  { id: 'brief-canada-workshop', topicId: 'estudar-canada', title: 'Workshop intensivo', objective: 'Workshop no Canadá. Escola, visto e treinamento corporativo.', surprise: { type: 'combo-required', description: 'Combo de formação.' } },
  { id: 'brief-cultura-acervo', topicId: 'cultura-museus', title: 'Digitalização de acervo', objective: 'Acervo digital acessível. CMS, QR, audioguia e storytelling.', surprise: { type: 'time-reduced', description: 'Prazo reduzido.' } },
  { id: 'brief-tec-dashboards', topicId: 'tecnologia-consultoria', title: 'Dashboards e analytics', objective: 'Decisão baseada em dados. Dashboards, analytics e planejamento.', surprise: { type: 'combo-required', description: 'Combo de dados.' } },
  { id: 'brief-ia-luma', topicId: 'ia-generativa', title: 'Vídeo com Luma AI', objective: 'Vídeos gerados com IA. Luma AI, Runway, Sora e direção de arte.', surprise: { type: 'target-bonus', description: 'Meta aumentada.' } },
  { id: 'brief-web3-ethereum', topicId: 'web3', title: 'Projeto Ethereum', objective: 'Projeto na Ethereum. Smart contract, wallet e token.', surprise: { type: 'combo-required', description: 'Combo Web3.' } },
  { id: 'brief-games-web', topicId: 'games', title: 'Jogo web', objective: 'Jogo para browser. Phaser ou Godot, narrative design e gamificação.', surprise: { type: 'time-extra', description: 'Tempo extra.' } },
  { id: 'brief-cenografia-led', topicId: 'cenografia', title: 'Cenografia com LED', objective: 'Cenografia com painéis LED. Disguise, QLab e DMX.', surprise: { type: 'combo-required', description: 'Combo cenográfico.' } },
  { id: 'brief-cenografia-virtual-vray', topicId: 'cenografia-virtual', title: 'Render com V-Ray', objective: 'Visualização com V-Ray. Rhino, SketchUp, BIM e direção.', surprise: { type: 'time-reduced', description: 'Prazo reduzido.' } },
  { id: 'brief-direcao-arte-ux', topicId: 'direcao-arte', title: 'UX e direção de arte', objective: 'UX/UI e direção de arte. Figma, identidade e consultoria.', surprise: { type: 'target-bonus', description: 'Meta aumentada.' } },
  { id: 'brief-ativacao-sensores', topicId: 'ativacao-marcas', title: 'Ativação com sensores', objective: 'Ativação com sensores e totem. Experiência de marca e retail.', surprise: { type: 'combo-required', description: 'Combo ativação.' } },
  { id: 'brief-motion-rigging', topicId: 'motion-vfx', title: 'Rigging e animação', objective: 'Pipeline com rigging. Maya, Blender, keyframe e VFX.', surprise: { type: 'time-extra', description: 'Tempo extra.' } },
  { id: 'brief-modelagem-zbrush', topicId: 'modelagem-3d', title: 'Modelagem com ZBrush', objective: 'Modelagem orgânica. ZBrush, Maya, Substance e direção.', surprise: { type: 'combo-required', description: 'Combo 3D.' } },
  { id: 'brief-animacao-c4d', topicId: 'animacao-2d-3d', title: 'Motion com Cinema 4D', objective: 'Motion 3D com Cinema 4D. After Effects, rigging e som.', surprise: { type: 'time-reduced', description: 'Prazo reduzido.' } },

  // ═══════════════════════════════════════════════════════════════
  // Quests premium (projetos de referência — Museu Olímpico etc.)
  // Destravar: descobrir área secreta (toques no hint) ou após 3+ combos na partida.
  // UI: glow, gradiente dourado/âmbar, badge "Premium".
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-premium-museu-olimpico',
    topicId: 'cultura-museus',
    title: 'Rio Museu Olímpico',
    objective: 'Projeto de referência: experiência imersiva para o Rio Museu Olímpico. Curadoria, acervo digital, tour virtual, VR e acessibilidade. Conheça nosso currículo, soluções e projetos.',
    premium: true,
    secret: true,
  },
  {
    id: 'brief-premium-festival-gramado',
    topicId: 'eventos-corporativos',
    title: 'Festival de Cinema de Gramado',
    objective: 'Projeto premium: cobertura e cenografia para festival. Transmissão ao vivo, projeção mapeada, palco e curadoria. Veja nossos projetos.',
    premium: true,
    secret: true,
  },
  {
    id: 'brief-premium-exposicao-internacional',
    topicId: 'cultura-museus',
    title: 'Exposição internacional',
    objective: 'Projeto de longo prazo: exposição internacional com storytelling museal, expografia, mediação e tecnologia. Soluções Azimut.',
    premium: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // Quest SUPER-PREMIUM — só desbloqueada por área secreta (e/ou easter egg)
  // Uma única quest: Rio Museu Olímpico — Experiência Completa
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'brief-super-premium-museu-experiencia-completa',
    topicId: 'cultura-museus',
    title: 'Rio Museu Olímpico — Experiência Completa',
    objective: 'Projeto signature: experiência imersiva completa para o Rio Museu Olímpico. Curadoria total, acervo digital, tour virtual, VR, acessibilidade, storytelling e expografia. Só quem descobriu a área secreta pode receber esta quest.',
    premium: true,
    secret: true,
    superPremium: true,
  },
]

export function getBriefsByTopicId(topicId: string): Brief[] {
  return briefs.filter((b) => b.topicId === topicId)
}

export function getBriefById(id: string): Brief | undefined {
  return briefs.find((b) => b.id === id)
}

export function pickRandomBriefForTopic(topicId: string, onlyWithSurprise?: boolean): Brief | undefined {
  let list = getBriefsByTopicId(topicId)
  if (onlyWithSurprise) {
    const withSurprise = list.filter((b) => b.surprise)
    if (withSurprise.length > 0) list = withSurprise
  }
  if (list.length === 0) return undefined
  return list[Math.floor(Math.random() * list.length)]
}

/** Briefs premium (Museu Olímpico, etc.) — aparecem ao descobrir área secreta. */
export function getPremiumBriefs(): Brief[] {
  return briefs.filter((b) => b.premium === true)
}

/** Briefs premium que não são super-premium (para sorteio normal). */
export function getNormalPremiumBriefs(): Brief[] {
  return briefs.filter((b) => b.premium === true && !b.superPremium)
}

/** A única quest super-premium — só disponível para quem descobriu a área secreta. */
export function getSuperPremiumBrief(): Brief | undefined {
  return briefs.find((b) => b.superPremium === true)
}

/** Um brief premium aleatório (exclui super-premium; super-premium é sorteado separadamente no gameStore). */
export function pickRandomPremiumBrief(): Brief | undefined {
  const list = getNormalPremiumBriefs()
  if (list.length === 0) return undefined
  return list[Math.floor(Math.random() * list.length)]
}
