/**
 * Traduções da SplashScreen — PT, EN, ES, FR.
 */
import type { Lang } from './lang'

export interface SplashStep {
  text: string
  highlight: string
}

export interface SplashTranslations {
  backToSite: string
  badgeInteractiveGame: string
  teaser: string
  bullets: string
  bulletsSecret: string
  topicsTitle: string
  howToPlay: string
  startGame: string
  viewRanking: string
  fullTutorial: string
  tipsAndTricks: string
  achievementsAndSettings: string
  footer: string
  // Tópicos (nomes por idioma)
  topicXrVr: string
  topicAudiovisual: string
  topicEvents: string
  topicCultureMuseums: string
  topicStudyCanada: string
  topicTechConsulting: string
  topicIaGenerativa: string
  topicWeb3: string
  topicGames: string
  topicCenografia: string
  topicCenografiaVirtual: string
  topicDirecaoArte: string
  topicAtivacaoMarcas: string
  topicMotionDesign: string
  topicMotionVfx: string
  topicModelagem3d: string
  topicAnimacao2d3d: string
  // Novos tópicos (18 total)
  topicApps: string
  topicPerformance: string
  topicDataViz: string
  topicFuturism: string
  topicBranding: string
  topicPremium: string
  // Área secreta (premium)
  secretAreaTitle: string
  secretAreaUnlocked: string
  secretAreaProjects: string
  seeCurriculum: string
  seeSolutions: string
  seeProjects: string
  secretAreaClose: string
  secretAreaHint: string
  // Passos "Como jogar" — desktop: texto completo
  steps: [SplashStep, SplashStep, SplashStep, SplashStep]
  // Versão curta para mobile (opcional)
  stepsShort?: [SplashStep, SplashStep, SplashStep, SplashStep]
}

const splash: Record<Lang, SplashTranslations> = {
  pt: {
    backToSite: 'Voltar ao Site',
    badgeInteractiveGame: 'Jogo Interativo',
    teaser: 'Monte propostas criativas e veja o cliente reagir em tempo real',
    bullets: '4 fases • Quest especial • NFT e colecionáveis • ',
    bulletsSecret: 'Área secreta — você descobre?',
    topicsTitle: 'Tópicos Disponíveis',
    howToPlay: 'Como Jogar',
    startGame: 'Começar a Jogar',
    viewRanking: 'Ver Ranking',
    fullTutorial: 'Tutorial completo',
    tipsAndTricks: 'Dicas e truques',
    achievementsAndSettings: 'Conquistas e Configurações',
    footer: '© 2026 Azimut • Immersive Experiences • v2.1-31jan',
    topicXrVr: 'XR/AR/VR',
    topicAudiovisual: 'Audiovisual',
    topicEvents: 'Eventos',
    topicCultureMuseums: 'Cultura & Museus',
    topicStudyCanada: 'Estudar Canadá',
    topicTechConsulting: 'Tech & Consultoria',
    topicIaGenerativa: 'IA Generativa',
    topicWeb3: 'Web3',
    topicGames: 'Games & Interativos',
    topicCenografia: 'Cenografia',
    topicCenografiaVirtual: 'Ceno Virtual',
    topicDirecaoArte: 'Direção de Arte & Criativa',
    topicAtivacaoMarcas: 'Ativação de Marcas',
    topicMotionDesign: 'Motion Design',
    topicMotionVfx: 'VFX & Compositing',
    topicModelagem3d: 'Modelagem 3D',
    topicAnimacao2d3d: 'Animação 2D/3D',
    topicApps: 'Apps & Mobile',
    topicPerformance: 'Performance Art',
    topicDataViz: 'Data Viz',
    topicFuturism: 'Futurismo',
    topicBranding: 'Branding',
    topicPremium: 'Premium',
    secretAreaTitle: 'Área Secreta',
    secretAreaUnlocked: 'Você descobriu! Projetos premium da Azimut.',
    secretAreaProjects: 'Museu Olímpico, Festival de Gramado, exposições internacionais. Conheça nosso currículo, soluções e projetos.',
    seeCurriculum: 'Ver currículo',
    seeSolutions: 'Ver soluções',
    seeProjects: 'Ver projetos',
    secretAreaHint: 'Toque 5 vezes no texto acima para descobrir.',
    steps: [
      { text: 'Receba um brief com tema e objetivo', highlight: 'brief' },
      { text: 'Arraste cartas para a zona de composição', highlight: 'cartas' },
      { text: 'Forme combos para ganhar bônus', highlight: 'combos' },
      { text: 'Atinja a meta de pontos antes do tempo', highlight: 'meta de pontos' },
    ],
    stepsShort: [
      { text: 'brief com tema e objetivo', highlight: 'brief' },
      { text: 'Toque ou arraste cartas à zona', highlight: 'cartas' },
      { text: 'Combos dão bônus', highlight: 'Combos' },
      { text: 'Meta antes do tempo', highlight: 'Meta' },
    ],
  },
  en: {
    backToSite: 'Back to Site',
    badgeInteractiveGame: 'Interactive Game',
    teaser: 'Build creative proposals and see the client react in real time',
    bullets: '4 phases • Special Quest • NFT & collectibles • ',
    bulletsSecret: 'Secret area — will you find it?',
    topicsTitle: 'Available Topics',
    howToPlay: 'How to Play',
    startGame: 'Start Playing',
    viewRanking: 'View Ranking',
    fullTutorial: 'Full tutorial',
    tipsAndTricks: 'Tips and tricks',
    achievementsAndSettings: 'Achievements & Settings',
    footer: '© 2026 Azimut • Immersive Experiences',
    topicXrVr: 'XR/AR/VR',
    topicAudiovisual: 'Audiovisual',
    topicEvents: 'Events',
    topicCultureMuseums: 'Culture & Museums',
    topicStudyCanada: 'Study Canada',
    topicTechConsulting: 'Tech & Consulting',
    topicIaGenerativa: 'Generative AI',
    topicWeb3: 'Web3',
    topicGames: 'Games & Interactives',
    topicCenografia: 'Scenography & Spatial Design',
    topicCenografiaVirtual: 'Virtual Scenography',
    topicDirecaoArte: 'Art & Creative Direction',
    topicAtivacaoMarcas: 'Brand Activation',
    topicMotionDesign: 'Motion Design',
    topicMotionVfx: 'VFX & Compositing',
    topicModelagem3d: '3D Modeling',
    topicAnimacao2d3d: '2D/3D Animation',
    topicApps: 'Apps & Mobile',
    topicPerformance: 'Performance Art',
    topicDataViz: 'Data Viz',
    topicFuturism: 'Futurism',
    topicBranding: 'Branding',
    topicPremium: 'Premium',
    secretAreaTitle: 'Secret Area',
    secretAreaUnlocked: 'You found it! Azimut premium projects.',
    secretAreaProjects: 'Rio Olympic Museum, Gramado Film Festival, international exhibitions. See our curriculum, solutions and projects.',
    seeCurriculum: 'See curriculum',
    seeSolutions: 'See solutions',
    seeProjects: 'See projects',
    secretAreaClose: 'Close',
    secretAreaHint: 'Tap 5 times on the text above to discover.',
    steps: [
      { text: 'Get a brief with theme and objective', highlight: 'brief' },
      { text: 'Tap or drag cards to the composition zone', highlight: 'cards' },
      { text: 'Form combos to earn bonuses', highlight: 'combos' },
      { text: 'Reach the point goal before time runs out', highlight: 'point goal' },
    ],
    stepsShort: [
      { text: 'brief with theme and objective', highlight: 'brief' },
      { text: 'Tap or drag cards to the zone', highlight: 'cards' },
      { text: 'Combos earn bonuses', highlight: 'Combos' },
      { text: 'Goal before time runs out', highlight: 'Goal' },
    ],
  },
  es: {
    backToSite: 'Volver al sitio',
    badgeInteractiveGame: 'Juego interactivo',
    teaser: 'Monta propuestas creativas y ve al cliente reaccionar en tiempo real',
    bullets: '4 fases • Quest especial • NFT y coleccionables • ',
    bulletsSecret: 'Área secreta — ¿la descubres?',
    topicsTitle: 'Temas disponibles',
    howToPlay: 'Cómo jugar',
    startGame: 'Empezar a jugar',
    viewRanking: 'Ver ranking',
    fullTutorial: 'Tutorial completo',
    tipsAndTricks: 'Consejos y trucos',
    achievementsAndSettings: 'Logros y configuración',
    footer: '© 2026 Azimut • Immersive Experiences',
    topicXrVr: 'XR/AR/VR',
    topicAudiovisual: 'Audiovisual',
    topicEvents: 'Eventos',
    topicCultureMuseums: 'Cultura y museos',
    topicStudyCanada: 'Estudiar en Canadá',
    topicTechConsulting: 'Tech y consultoría',
    topicIaGenerativa: 'IA generativa',
    topicWeb3: 'Web3',
    topicGames: 'Juegos e interactivos',
    topicCenografia: 'Escenografía y diseño espacial',
    topicCenografiaVirtual: 'Escenografía virtual',
    topicDirecaoArte: 'Dirección de arte y creativa',
    topicAtivacaoMarcas: 'Activación de marcas',
    topicMotionDesign: 'Motion Design',
    topicMotionVfx: 'VFX y Compositing',
    topicModelagem3d: 'Modelado 3D',
    topicAnimacao2d3d: 'Animación 2D/3D',
    topicApps: 'Apps & Mobile',
    topicPerformance: 'Performance Art',
    topicDataViz: 'Data Viz',
    topicFuturism: 'Futurismo',
    topicBranding: 'Branding',
    topicPremium: 'Premium',
    secretAreaTitle: 'Área secreta',
    secretAreaUnlocked: '¡Lo descubriste! Proyectos premium de Azimut.',
    secretAreaProjects: 'Rio Museo Olímpico, Festival de Gramado, exposiciones internacionales. Conoce nuestro currículo, soluciones y proyectos.',
    seeCurriculum: 'Ver currículo',
    seeSolutions: 'Ver soluciones',
    seeProjects: 'Ver proyectos',
    secretAreaClose: 'Cerrar',
    secretAreaHint: 'Toca 5 veces el texto de arriba para descubrir.',
    steps: [
      { text: 'Recibe un brief con tema y objetivo', highlight: 'brief' },
      { text: 'Arrastra cartas a la zona de composición', highlight: 'cartas' },
      { text: 'Forma combos para ganar bonos', highlight: 'combos' },
      { text: 'Alcanza la meta de puntos antes del tiempo', highlight: 'meta de puntos' },
    ],
    stepsShort: [
      { text: 'brief con tema y objetivo', highlight: 'brief' },
      { text: 'Toca o arrastra cartas a la zona', highlight: 'cartas' },
      { text: 'Combos dan bonos', highlight: 'Combos' },
      { text: 'Meta antes del tiempo', highlight: 'Meta' },
    ],
  },
  fr: {
    backToSite: 'Retour au site',
    badgeInteractiveGame: 'Jeu interactif',
    teaser: 'Montez des propositions créatives et voyez le client réagir en temps réel',
    bullets: '4 phases • Quest spéciale • NFT et collection • ',
    bulletsSecret: 'Zone secrète — tu la trouves ?',
    topicsTitle: 'Sujets disponibles',
    howToPlay: 'Comment jouer',
    startGame: 'Commencer à jouer',
    viewRanking: 'Voir le classement',
    fullTutorial: 'Tutoriel complet',
    tipsAndTricks: 'Astuces et conseils',
    achievementsAndSettings: 'Succès et paramètres',
    footer: '© 2026 Azimut • Immersive Experiences',
    topicXrVr: 'XR/AR/VR',
    topicAudiovisual: 'Audiovisuel',
    topicEvents: 'Événements',
    topicCultureMuseums: 'Culture et musées',
    topicStudyCanada: 'Étudier au Canada',
    topicTechConsulting: 'Tech et conseil',
    topicIaGenerativa: 'IA générative',
    topicWeb3: 'Web3',
    topicGames: 'Jeux et interactifs',
    topicCenografia: 'Scénographie et design spatial',
    topicCenografiaVirtual: 'Scénographie virtuelle',
    topicDirecaoArte: 'Direction artistique et créative',
    topicAtivacaoMarcas: 'Activation de marques',
    topicMotionDesign: 'Motion Design',
    topicMotionVfx: 'VFX et Compositing',
    topicModelagem3d: 'Modélisation 3D',
    topicAnimacao2d3d: 'Animation 2D/3D',
    topicApps: 'Apps & Mobile',
    topicPerformance: 'Performance Art',
    topicDataViz: 'Data Viz',
    topicFuturism: 'Futurisme',
    topicBranding: 'Branding',
    topicPremium: 'Premium',
    secretAreaTitle: 'Zone secrète',
    secretAreaUnlocked: 'Tu as trouvé ! Projets premium Azimut.',
    secretAreaProjects: 'Rio Musée Olympique, Festival de Gramado, expositions internationales. Découvre notre curriculum, solutions et projets.',
    seeCurriculum: 'Voir le curriculum',
    seeSolutions: 'Voir les solutions',
    seeProjects: 'Voir les projets',
    secretAreaClose: 'Fermer',
    secretAreaHint: 'Appuie 5 fois sur le texte ci-dessus pour découvrir.',
    steps: [
      { text: 'Reçois un brief avec thème et objectif', highlight: 'brief' },
      { text: 'Glisse les cartes dans la zone de composition', highlight: 'cartes' },
      { text: 'Forme des combos pour gagner des bonus', highlight: 'combos' },
      { text: 'Atteins l’objectif de points avant la fin du temps', highlight: 'objectif de points' },
    ],
    stepsShort: [
      { text: 'brief avec thème et objectif', highlight: 'brief' },
      { text: 'Appuie ou glisse les cartes dans la zone', highlight: 'cartes' },
      { text: 'Combos = bonus', highlight: 'Combos' },
      { text: 'Objectif avant la fin', highlight: 'Objectif' },
    ],
  },
}

export function getSplashTranslations(lang: Lang): SplashTranslations {
  return splash[lang] ?? splash.pt
}

/** Mapa topicId (data/topics) -> chave em SplashTranslations */
const TOPIC_ID_TO_KEY: Record<string, keyof SplashTranslations> = {
  'xr-vr': 'topicXrVr',
  'producao-audiovisual': 'topicAudiovisual',
  'eventos-corporativos': 'topicEvents',
  'cultura-museus': 'topicCultureMuseums',
  'estudar-canada': 'topicStudyCanada',
  'tecnologia-consultoria': 'topicTechConsulting',
  'ia-generativa': 'topicIaGenerativa',
  'web3': 'topicWeb3',
  'games': 'topicGames',
  'cenografia': 'topicCenografia',
  'cenografia-virtual': 'topicCenografiaVirtual',
  'direcao-arte': 'topicDirecaoArte',
  'ativacao-marcas': 'topicAtivacaoMarcas',
  'motion-design': 'topicMotionDesign',
  'motion-vfx': 'topicMotionVfx',
  'modelagem-3d': 'topicModelagem3d',
  'animacao-2d-3d': 'topicAnimacao2d3d',
}

/** Nome do tópico no idioma atual (para Leaderboard, GameScreen, etc.) */
export function getTopicName(lang: Lang, topicId: string): string {
  const key = TOPIC_ID_TO_KEY[topicId]
  if (!key) return topicId
  const tr = splash[lang] ?? splash.pt
  return (tr as Record<string, string>)[key] ?? topicId
}
