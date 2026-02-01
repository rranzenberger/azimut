/**
 * Traduções da GameScreen — PT, EN, ES, FR.
 */
import type { Lang } from './lang'

export interface GameTranslations {
  back: string
  yourQuest: string
  phase: string
  objective: string
  bonus: string
  howToPlay: string
  dragCards: string
  dragCardsMobile: string
  reachTarget: string
  start: string
  continuePhase: string
  dropInZone: string
  swapCards: string
  goalReached: string
  fewSecondsLeft: string
  secondsLeft: string
  comboActivated: string
  almostThere: string
  goingWell: string
  keepGoing: string
  dropError: string
  surpriseComboRequired: string
  surpriseTimeReduced: string
  surpriseTimeExtra: string
  surpriseTargetBonus: string
  surpriseClientVip: string
  surpriseInternChaos: string
  comboToast: string
  formCombos: string
  goButton: string
  metaLabel: string
  technologiesAvailable: string
  remaining: string
  useButton: string
  timeLeftShort: string
  surpriseModalTitleCombo: string
  surpriseModalTitleTimeReduced: string
  surpriseModalTitleTimeExtra: string
  surpriseModalTitleTargetBonus: string
  surpriseModalTitleClientVip: string
  surpriseModalTitleInternChaos: string
  compositionZoneTitle: string
  elementsLabel: string
  swapModeHint: string
  dropHereHint: string
  continueAddingHint: string
  dragTechnologiesHint: string
  dragTechnologiesHintMobile: string
  returnToPoolAria: string
  removeAria: string
  briefQuestLabel: string
  whatToDoLabel: string
  bonusSurpriseLabel: string
  combosLabel: string
  clientLabel: string
  submitButton: string
  menuLabel: string
  noWrongChoiceHint: string
  leadModalSaveNft: string
  leadModalConsulting: string
  inputNameLabel: string
  inputNamePlaceholder: string
  inputEmailLabel: string
  inputEmailPlaceholder: string
  synergyActive: string
  preview3dTitle: string
  ariaPreviewCombo: string
  /** Badge para quest premium (Rio Museu Olímpico etc.) */
  premiumBadge: string
  /** Badge para quest super-premium (só área secreta) */
  superPremiumBadge: string
  /** Easter egg: 7 toques no título durante o jogo */
  easterEggExplorer: string
}

const game: Record<Lang, GameTranslations> = {
  pt: {
    back: 'Voltar',
    yourQuest: 'Sua Quest — Fase',
    phase: 'Fase',
    objective: 'Objetivo · O que precisa fazer',
    bonus: 'Bônus:',
    howToPlay: 'Como jogar',
    dragCards: 'Arraste cartas para a zona de composição',
    dragCardsMobile: 'Toque ou arraste as cartas para a zona de composição',
    reachTarget: 'Atinja a meta antes do tempo',
    start: 'Iniciar',
    continuePhase: 'Continuar — Fase',
    dropInZone: 'Solte na zona de composição',
    swapCards: 'Trocar cartas',
    goalReached: 'Meta atingida!',
    fewSecondsLeft: 'Faltam poucos segundos!',
    secondsLeft: 'Faltam',
    comboActivated: 'Combo ativado!',
    almostThere: 'Quase lá!',
    goingWell: 'Está indo bem!',
    keepGoing: 'Continue assim!',
    dropError: 'Solte na zona de composição',
    surpriseComboRequired: 'Isso significa: você precisa formar pelo menos um combo nesta fase para atender ao cliente.',
    surpriseTimeReduced: 'Isso significa: o cronômetro desta fase começa com menos tempo.',
    surpriseTimeExtra: 'Isso significa: você ganha tempo extra no cronômetro desta fase.',
    surpriseTargetBonus: 'Isso significa: a meta de pontos desta fase é maior.',
    surpriseClientVip: 'Isso significa: nos primeiros 10 segundos, todos os pontos valem o dobro.',
    surpriseInternChaos: 'Isso significa: você recebe menos cartas, mas cada carta colocada na zona vale 3× os pontos.',
    comboToast: 'Combo: {name} (+{pts} pts)',
    formCombos: 'Forme combos para bônus',
    goButton: 'Vamos lá',
    metaLabel: 'Meta',
    technologiesAvailable: 'Tecnologias disponíveis',
    remaining: 'restantes',
    useButton: 'Usar',
    timeLeftShort: 'Faltam',
    surpriseModalTitleCombo: 'Combo obrigatório',
    surpriseModalTitleTimeReduced: 'Tempo reduzido',
    surpriseModalTitleTimeExtra: 'Tempo extra',
    surpriseModalTitleTargetBonus: 'Meta bônus',
    surpriseModalTitleClientVip: 'Cliente VIP',
    surpriseModalTitleInternChaos: 'Estagiário atrapalhado',
    compositionZoneTitle: 'Zona de composição',
    elementsLabel: 'elem.',
    swapModeHint: 'Clique em uma carta abaixo para devolver ao pool.',
    dropHereHint: 'Solte aqui para adicionar à composição!',
    continueAddingHint: 'Continue adicionando elementos para formar combos',
    dragTechnologiesHint: 'Arraste tecnologias que conectam mundos',
    dragTechnologiesHintMobile: 'Toque ou arraste as cartas para a zona de composição',
    returnToPoolAria: 'Devolver {name} ao pool',
    removeAria: 'Remover {name}',
    briefQuestLabel: 'BRIEF · QUEST',
    whatToDoLabel: 'O que precisa fazer',
    bonusSurpriseLabel: 'Bônus Surpresa',
    combosLabel: 'Combos:',
    clientLabel: 'Cliente:',
    submitButton: 'Enviar',
    menuLabel: 'Menu',
    noWrongChoiceHint: 'Não existe escolha errada. Cada tecnologia conecta de um jeito.',
    leadModalSave: 'Salvar Progresso',
    leadModalNft: 'Receber NFT',
    leadModalConsulting: 'Consultoria Grátis',
    inputNameLabel: 'Nome',
    inputNamePlaceholder: 'Seu nome',
    inputEmailLabel: 'Email',
    inputEmailPlaceholder: 'email@exemplo.com',
    synergyActive: 'Sinergia ativa — +',
    preview3dTitle: 'Visualização 3D',
    ariaPreviewCombo: 'Visualização do combo {name}',
    premiumBadge: '✦ Premium',
    superPremiumBadge: '✦ Super Premium',
    easterEggExplorer: 'Você é um explorador! Easter egg encontrado. 🎮✨',
  },
  en: {
    back: 'Back',
    yourQuest: 'Your Quest — Phase',
    phase: 'Phase',
    objective: 'Objective · What you need to do',
    bonus: 'Bonus:',
    howToPlay: 'How to play',
    dragCards: 'Drag cards to the composition zone',
    dragCardsMobile: 'Tap or drag cards to the composition zone',
    reachTarget: 'Reach the target before time runs out',
    start: 'Start',
    continuePhase: 'Continue — Phase',
    dropInZone: 'Add to the composition zone',
    swapCards: 'Swap cards',
    goalReached: 'Target reached!',
    fewSecondsLeft: 'Few seconds left!',
    secondsLeft: 'Seconds left',
    comboActivated: 'Combo activated!',
    almostThere: 'Almost there!',
    goingWell: 'Doing well!',
    keepGoing: 'Keep going!',
    dropError: 'Drop in the composition zone',
    surpriseComboRequired: 'This means: you need to form at least one combo this phase to satisfy the client.',
    surpriseTimeReduced: 'This means: this phase timer starts with less time.',
    surpriseTimeExtra: 'This means: you get extra time on this phase timer.',
    surpriseTargetBonus: 'This means: this phase point target is higher.',
    surpriseClientVip: 'This means: for the first 10 seconds, all points count double.',
    surpriseInternChaos: 'This means: you get fewer cards, but each card placed in the zone is worth 3× points.',
    comboToast: 'Combo: {name} (+{pts} pts)',
    formCombos: 'Form combos for bonus',
    goButton: "Let's go",
    metaLabel: 'Target',
    technologiesAvailable: 'Available technologies',
    remaining: 'remaining',
    useButton: 'Use',
    timeLeftShort: 'Left',
    surpriseModalTitleCombo: 'Combo required',
    surpriseModalTitleTimeReduced: 'Reduced time',
    surpriseModalTitleTimeExtra: 'Extra time',
    surpriseModalTitleTargetBonus: 'Bonus target',
    surpriseModalTitleClientVip: 'VIP client',
    surpriseModalTitleInternChaos: 'Chaos intern',
    compositionZoneTitle: 'Composition Zone',
    elementsLabel: 'elem.',
    swapModeHint: 'Click a card below to return it to the pool.',
    dropHereHint: 'Drop here to add to the composition!',
    continueAddingHint: 'Keep adding elements to form combos',
    dragTechnologiesHint: 'Drag technologies that will connect worlds',
    dragTechnologiesHintMobile: 'Tap or drag cards to the composition zone',
    returnToPoolAria: 'Return {name} to pool',
    removeAria: 'Remove {name}',
    briefQuestLabel: 'BRIEF · QUEST',
    whatToDoLabel: 'What you need to do',
    bonusSurpriseLabel: 'Bonus Surprise',
    combosLabel: 'Combos:',
    clientLabel: 'Client:',
    submitButton: 'Submit',
    menuLabel: 'Menu',
    noWrongChoiceHint: 'There is no wrong choice. Each technology connects in its own way.',
    leadModalSaveNft: 'Save & Get NFT',
    leadModalConsulting: 'Free Consulting',
    inputNameLabel: 'Name',
    inputNamePlaceholder: 'Your name',
    inputEmailLabel: 'Email',
    inputEmailPlaceholder: 'email@example.com',
    synergyActive: 'Synergy active — +',
    preview3dTitle: '3D Preview',
    ariaPreviewCombo: 'Preview of combo {name}',
    premiumBadge: '✦ Premium',
    superPremiumBadge: '✦ Super Premium',
    easterEggExplorer: 'You\'re an explorer! Easter egg found. 🎮✨',
  },
  es: {
    back: 'Volver',
    yourQuest: 'Tu Quest — Fase',
    phase: 'Fase',
    objective: 'Objetivo · Lo que hay que hacer',
    bonus: 'Bono:',
    howToPlay: 'Cómo jugar',
    dragCards: 'Arrastra cartas a la zona de composición',
    dragCardsMobile: 'Toca o arrastra las cartas a la zona de composición',
    reachTarget: 'Alcanza la meta antes de que se acabe el tiempo',
    start: 'Iniciar',
    continuePhase: 'Continuar — Fase',
    dropInZone: 'Suelta en la zona de composición',
    swapCards: 'Cambiar cartas',
    goalReached: '¡Meta alcanzada!',
    fewSecondsLeft: '¡Quedan pocos segundos!',
    secondsLeft: 'Quedan',
    comboActivated: '¡Combo activado!',
    almostThere: '¡Casi!',
    goingWell: '¡Vas bien!',
    keepGoing: '¡Sigue así!',
    dropError: 'Suelta en la zona de composición',
    surpriseComboRequired: 'Significa: debes formar al menos un combo en esta fase para satisfacer al cliente.',
    surpriseTimeReduced: 'Significa: el temporizador de esta fase empieza con menos tiempo.',
    surpriseTimeExtra: 'Significa: tienes tiempo extra en el temporizador de esta fase.',
    surpriseTargetBonus: 'Significa: la meta de puntos de esta fase es mayor.',
    surpriseClientVip: 'Significa: en los primeros 10 segundos, todos los puntos valen el doble.',
    surpriseInternChaos: 'Significa: recibes menos cartas, pero cada carta en la zona vale 3× puntos.',
    comboToast: 'Combo: {name} (+{pts} pts)',
    formCombos: 'Forma combos para bono',
    goButton: 'Vamos',
    metaLabel: 'Meta',
    technologiesAvailable: 'Tecnologías disponibles',
    remaining: 'restantes',
    useButton: 'Usar',
    timeLeftShort: 'Quedan',
    surpriseModalTitleCombo: 'Combo obligatorio',
    surpriseModalTitleTimeReduced: 'Tiempo reducido',
    surpriseModalTitleTimeExtra: 'Tiempo extra',
    surpriseModalTitleTargetBonus: 'Meta bono',
    surpriseModalTitleClientVip: 'Cliente VIP',
    surpriseModalTitleInternChaos: 'Caos interno',
    compositionZoneTitle: 'Zona de composición',
    elementsLabel: 'elem.',
    swapModeHint: 'Haz clic en una carta abajo para devolverla al pool.',
    dropHereHint: 'Suelta aquí para añadir a la composición.',
    continueAddingHint: 'Sigue añadiendo elementos para formar combos',
    dragTechnologiesHint: 'Arrastra las tecnologías que conectarán mundos',
    returnToPoolAria: 'Devolver {name} al pool',
    removeAria: 'Quitar {name}',
    briefQuestLabel: 'BRIEF · QUEST',
    whatToDoLabel: 'Lo que hay que hacer',
    bonusSurpriseLabel: 'Bono Sorpresa',
    combosLabel: 'Combos:',
    clientLabel: 'Cliente:',
    submitButton: 'Enviar',
    menuLabel: 'Menú',
    noWrongChoiceHint: 'No hay elección equivocada. Cada tecnología conecta a su manera.',
    leadModalSaveNft: 'Guardar & Recibir NFT',
    leadModalConsulting: 'Consultoría gratis',
    inputNameLabel: 'Nombre',
    inputNamePlaceholder: 'Tu nombre',
    inputEmailLabel: 'Email',
    inputEmailPlaceholder: 'email@ejemplo.com',
    synergyActive: 'Sinergia activa — +',
    preview3dTitle: 'Vista 3D',
    ariaPreviewCombo: 'Vista del combo {name}',
    premiumBadge: '✦ Premium',
    superPremiumBadge: '✦ Super Premium',
    easterEggExplorer: '¡Eres un explorador! Easter egg encontrado. 🎮✨',
  },
  fr: {
    back: 'Retour',
    yourQuest: 'Ta Quest — Phase',
    phase: 'Phase',
    objective: 'Objectif · Ce qu\'il faut faire',
    bonus: 'Bonus :',
    howToPlay: 'Comment jouer',
    dragCards: 'Glisse les cartes dans la zone de composition',
    dragCardsMobile: 'Appuie ou glisse les cartes dans la zone de composition',
    reachTarget: 'Atteins la cible avant la fin du temps',
    start: 'Démarrer',
    continuePhase: 'Continuer — Phase',
    dropInZone: 'Dépose dans la zone de composition',
    swapCards: 'Échanger cartes',
    goalReached: 'Cible atteinte !',
    fewSecondsLeft: 'Plus que quelques secondes !',
    secondsLeft: 'Secondes restantes',
    comboActivated: 'Combo activé !',
    almostThere: 'Presque !',
    goingWell: 'Tu gères !',
    keepGoing: 'Continue !',
    dropError: 'Dépose dans la zone de composition',
    surpriseComboRequired: 'Ça veut dire : tu dois former au moins un combo cette phase pour satisfaire le client.',
    surpriseTimeReduced: 'Ça veut dire : le chrono de cette phase commence avec moins de temps.',
    surpriseTimeExtra: 'Ça veut dire : tu as du temps en plus sur le chrono de cette phase.',
    surpriseTargetBonus: 'Ça veut dire : la cible de points de cette phase est plus haute.',
    surpriseClientVip: 'Ça veut dire : pendant les 10 premières secondes, tous les points comptent double.',
    surpriseInternChaos: 'Ça veut dire : tu as moins de cartes, mais chaque carte placée dans la zone vaut 3× les points.',
    comboToast: 'Combo : {name} (+{pts} pts)',
    formCombos: 'Forme des combos pour un bonus',
    goButton: "C'est parti",
    metaLabel: 'Cible',
    technologiesAvailable: 'Technologies disponibles',
    remaining: 'restantes',
    useButton: 'Utiliser',
    timeLeftShort: 'Reste',
    surpriseModalTitleCombo: 'Combo obligatoire',
    surpriseModalTitleTimeReduced: 'Temps réduit',
    surpriseModalTitleTimeExtra: 'Temps en plus',
    surpriseModalTitleTargetBonus: 'Cible bonus',
    surpriseModalTitleClientVip: 'Client VIP',
    surpriseModalTitleInternChaos: 'Stagiaire chaos',
    compositionZoneTitle: 'Zone de composition',
    elementsLabel: 'elem.',
    swapModeHint: 'Clique sur une carte ci-dessous pour la remettre dans le pool.',
    dropHereHint: 'Dépose ici pour ajouter à la composition !',
    continueAddingHint: 'Continue d\'ajouter des éléments pour former des combos',
    dragTechnologiesHint: 'Glisse les technologies qui connecteront les mondes',
    dragTechnologiesHintMobile: 'Appuie ou glisse les cartes dans la zone de composition',
    returnToPoolAria: 'Remettre {name} dans le pool',
    removeAria: 'Retirer {name}',
    briefQuestLabel: 'BRIEF · QUEST',
    whatToDoLabel: 'Ce qu\'il faut faire',
    bonusSurpriseLabel: 'Bonus Surprise',
    combosLabel: 'Combos :',
    clientLabel: 'Client :',
    submitButton: 'Envoyer',
    menuLabel: 'Menu',
    noWrongChoiceHint: 'Il n\'y a pas de mauvais choix. Chaque technologie connecte à sa façon.',
    leadModalSaveNft: 'Sauvegarder & Recevoir NFT',
    leadModalConsulting: 'Consulting gratuit',
    inputNameLabel: 'Nom',
    inputNamePlaceholder: 'Ton nom',
    inputEmailLabel: 'Email',
    inputEmailPlaceholder: 'email@exemple.com',
    synergyActive: 'Synergie active — +',
    preview3dTitle: 'Aperçu 3D',
    ariaPreviewCombo: 'Aperçu du combo {name}',
    premiumBadge: '✦ Premium',
    superPremiumBadge: '✦ Super Premium',
    easterEggExplorer: 'Tu es un explorateur ! Easter egg trouvé. 🎮✨',
  },
}

export function getGameTranslations(lang: Lang): GameTranslations {
  return game[lang] ?? game.pt
}
