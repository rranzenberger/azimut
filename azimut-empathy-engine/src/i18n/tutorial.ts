/**
 * Traduções da TutorialScreen — PT, EN, ES, FR.
 */
import type { Lang } from './lang'

export interface TutorialStep {
  title: string
  text: string
}

export interface TutorialTranslations {
  title: string
  objective: string
  objectiveParagraph: string
  objectiveParagraphMobile: string
  stepsTitle: string
  step2TextMobile: string
  steps: TutorialStep[]
  unlockTitle: string
  unlockPhase: string
  unlockQuest: string
  unlockRewards: string
  unlockSecret: string
  noWallet: string
  readyButton: string
  /** URL do vídeo "Como jogar" (opcional; vazio = não mostra link). */
  tutorialVideoUrl: string
  watchVideoLabel: string
}

const stepsPt: TutorialStep[] = [
  { title: 'Brief', text: 'Em cada fase você recebe um tema (XR/VR, Produção Audiovisual, Eventos, Cultura, Estudar Canadá, Tecnologia) e um objetivo. O brief diz o que o "cliente" precisa: monte uma proposta que atenda a isso usando as cartas certas.' },
  { title: 'Cartas do tema', text: 'As cartas disponíveis são sempre do tema da fase. Arraste as tecnologias que fazem sentido para a zona de composição — aquela área roxa no centro da tela. Lá você monta a proposta que será avaliada.' },
  { title: 'Combos', text: 'Algumas combinações de cartas dão bônus extra de pontos (aparecem em destaque roxo). Quanto mais combos você formar, mais rápido atinge a meta. Cada combo tem um nome e um bônus fixo.' },
  { title: 'Surpresa', text: 'Às vezes o brief traz uma surpresa: por exemplo, "forme pelo menos um combo" ou "tempo extra". Cumprir a surpresa dá vantagem ou bônus. Leia o brief no início da fase para não perder.' },
  { title: '4 fases', text: 'Sentir → Conectar → Sincronizar → Transformar. Cada fase tem tempo limitado e uma meta de pontos. Ao formar combos, você pode ganhar power-ups (tempo extra, revelar raridade, trocar carta). Complete as 4 fases para vencer.' },
]

const stepsEn: TutorialStep[] = [
  { title: 'Brief', text: 'Each phase you get a theme (XR/VR, Audiovisual, Events, Culture, Study Canada, Technology) and an objective. The brief says what the "client" needs: build a proposal that meets it using the right cards.' },
  { title: 'Theme cards', text: 'Available cards are always from the phase theme. Drag the technologies that make sense to the composition zone — the purple area in the centre. There you build the proposal that will be evaluated.' },
  { title: 'Combos', text: 'Some card combinations give extra bonus points (shown in purple). The more combos you form, the faster you reach the goal. Each combo has a name and a fixed bonus.' },
  { title: 'Surprise', text: 'Sometimes the brief includes a surprise: e.g. "form at least one combo" or "extra time". Fulfilling the surprise gives an advantage or bonus. Read the brief at the start of the phase so you don\'t miss it.' },
  { title: '4 phases', text: 'Feel → Connect → Sync → Transform. Each phase has a time limit and a point target. Forming combos can earn power-ups (extra time, reveal rarity, swap card). Complete all 4 phases to win.' },
]

const stepsEs: TutorialStep[] = [
  { title: 'Brief', text: 'En cada fase recibes un tema (XR/VR, Audiovisual, Eventos, Cultura, Estudiar Canadá, Tecnología) y un objetivo. El brief dice lo que el "cliente" necesita: monta una propuesta que lo cumpla con las cartas adecuadas.' },
  { title: 'Cartas del tema', text: 'Las cartas disponibles son siempre del tema de la fase. Arrastra las tecnologías que tengan sentido a la zona de composición — esa área morada en el centro. Ahí montas la propuesta que se evaluará.' },
  { title: 'Combos', text: 'Algunas combinaciones de cartas dan bono extra de puntos (aparecen en morado). Cuantos más combos formes, más rápido alcanzas la meta. Cada combo tiene un nombre y un bono fijo.' },
  { title: 'Sorpresa', text: 'A veces el brief trae una sorpresa: por ejemplo "forma al menos un combo" o "tiempo extra". Cumplir la sorpresa da ventaja o bono. Lee el brief al inicio de la fase para no perderte nada.' },
  { title: '4 fases', text: 'Sentir → Conectar → Sincronizar → Transformar. Cada fase tiene tiempo limitado y una meta de puntos. Al formar combos puedes ganar power-ups (tiempo extra, revelar rareza, cambiar carta). Completa las 4 fases para ganar.' },
]

const stepsFr: TutorialStep[] = [
  { title: 'Brief', text: 'À chaque phase tu reçois un thème (XR/VR, Audiovisuel, Événements, Culture, Étudier au Canada, Technologie) et un objectif. Le brief dit ce dont le "client" a besoin : monte une proposition qui y répond avec les bonnes cartes.' },
  { title: 'Cartes du thème', text: 'Les cartes disponibles sont toujours du thème de la phase. Glisse les technologies qui ont du sens dans la zone de composition — cette zone violette au centre. C\'est là que tu montes la proposition qui sera évaluée.' },
  { title: 'Combos', text: 'Certaines combinaisons de cartes donnent un bonus de points (affichées en violet). Plus tu formes de combos, plus tu atteins vite l\'objectif. Chaque combo a un nom et un bonus fixe.' },
  { title: 'Surprise', text: 'Parfois le brief contient une surprise : par ex. "forme au moins un combo" ou "temps en plus". Remplir la surprise donne un avantage ou un bonus. Lis le brief au début de la phase pour ne rien rater.' },
  { title: '4 phases', text: 'Ressentir → Connecter → Synchroniser → Transformer. Chaque phase a un temps limité et une cible de points. En formant des combos tu peux gagner des power-ups (temps en plus, révéler rareté, échanger carte). Complète les 4 phases pour gagner.' },
]

const tutorial: Record<Lang, TutorialTranslations> = {
  pt: {
    title: 'Como jogar',
    objective: 'Objetivo',
    objectiveParagraph: 'Em cada fase você recebe um brief (tema + objetivo). Use apenas as cartas daquele tema: arraste-as para a zona de composição e monte a proposta. Seu objetivo é atingir a meta de pontos antes do tempo acabar. Formar combos acelera o progresso. O brief pode trazer uma surpresa (ex.: combo obrigatório ou tempo extra). Ao formar combos, você pode ganhar power-ups. Complete as 4 fases para vencer o jogo.',
    objectiveParagraphMobile: 'Em cada fase você recebe um brief (tema + objetivo). Use apenas as cartas daquele tema: toque ou arraste-as para a zona de composição e monte a proposta. Seu objetivo é atingir a meta de pontos antes do tempo acabar. Formar combos acelera o progresso. O brief pode trazer uma surpresa (ex.: combo obrigatório ou tempo extra). Ao formar combos, você pode ganhar power-ups. Complete as 4 fases para vencer o jogo.',
    stepsTitle: 'Passos',
    step2TextMobile: 'As cartas disponíveis são sempre do tema da fase. Toque ou arraste as tecnologias que fazem sentido para a zona de composição — aquela área roxa no centro da tela. Lá você monta a proposta que será avaliada.',
    steps: stepsPt,
    unlockTitle: 'O que você pode desbloquear',
    unlockPhase: '4 fases. Sentir → Conectar → Sincronizar → Transformar. Cada fase é um desafio novo; complete todas para vencer o jogo e desbloquear o que vem depois.',
    unlockQuest: 'Quest especial. Explorar áreas extras e conquistas pode desbloquear uma quest especial, com recompensas exclusivas. Fique de olho no que você desbloqueia ao longo do jogo.',
    unlockRewards: 'Recompensas. NFT, colecionáveis e itens exclusivos podem ser conquistados ao bater metas, formar combos ou descobrir segredos. Quanto mais você joga e explora, mais chances de resgatar.',
    unlockSecret: 'Área secreta. Existe um lugar escondido no Empathy Engine — só quem joga com atenção e explora tudo consegue encontrar. Vale a pena ficar no site e tentar descobrir.',
    noWallet: 'Não precisa de carteira para jogar. Para resgatar NFT e colecionáveis depois, você pode conectar uma carteira quando quiser (ex.: MetaMask, Phantom — há opções gratuitas). Ou crie uma quando for resgatar suas recompensas. O jogo é seu; as recompensas também podem ser.',
    readyButton: 'Estou pronto — jogar',
    tutorialVideoUrl: '',
    watchVideoLabel: 'Assistir vídeo',
  },
  en: {
    title: 'How to play',
    objective: 'Objective',
    objectiveParagraph: 'Each phase you get a brief (theme + objective). Use only the cards from that theme: drag them to the composition zone and build your proposal. Your goal is to reach the point target before time runs out. Forming combos speeds up progress. The brief may include a surprise (e.g. required combo or extra time). Forming combos can earn power-ups. Complete all 4 phases to win.',
    objectiveParagraphMobile: 'Each phase you get a brief (theme + objective). Use only the cards from that theme: tap or drag them to the composition zone and build your proposal. Your goal is to reach the point target before time runs out. Forming combos speeds up progress. The brief may include a surprise (e.g. required combo or extra time). Forming combos can earn power-ups. Complete all 4 phases to win.',
    stepsTitle: 'Steps',
    step2TextMobile: 'Available cards are always from the phase theme. Tap or drag the technologies that make sense to the composition zone — the purple area in the centre. There you build the proposal that will be evaluated.',
    steps: stepsEn,
    unlockTitle: 'What you can unlock',
    unlockPhase: '4 phases. Feel → Connect → Sync → Transform. Each phase is a new challenge; complete all to win and unlock what comes next.',
    unlockQuest: 'Special Quest. Exploring extra areas and achievements can unlock a special quest with exclusive rewards. Keep an eye on what you unlock as you play.',
    unlockRewards: 'Rewards. NFT, collectibles and exclusive items can be earned by hitting targets, forming combos or discovering secrets. The more you play and explore, the more chances to claim.',
    unlockSecret: 'Secret area. There is a hidden place in the Empathy Engine — only those who play carefully and explore everything can find it. Worth sticking around to discover.',
    noWallet: 'No wallet needed to play. To claim NFT and collectibles later, you can connect a wallet when you want (e.g. MetaMask, Phantom — free options available). Or create one when you claim your rewards. The game is yours; the rewards can be too.',
    readyButton: "I'm ready — play",
    tutorialVideoUrl: '',
    watchVideoLabel: 'Watch video',
  },
  es: {
    title: 'Cómo jugar',
    objective: 'Objetivo',
    objectiveParagraph: 'En cada fase recibes un brief (tema + objetivo). Usa solo las cartas de ese tema: arrástralas a la zona de composición y monta la propuesta. Tu objetivo es alcanzar la meta de puntos antes de que se acabe el tiempo. Formar combos acelera el progreso. El brief puede traer una sorpresa (ej.: combo obligatorio o tiempo extra). Al formar combos puedes ganar power-ups. Completa las 4 fases para ganar.',
    objectiveParagraphMobile: 'En cada fase recibes un brief (tema + objetivo). Usa solo las cartas de ese tema: tócalas o arrástralas a la zona de composición y monta la propuesta. Tu objetivo es alcanzar la meta de puntos antes de que se acabe el tiempo. Formar combos acelera el progreso. El brief puede traer una sorpresa (ej.: combo obligatorio o tiempo extra). Al formar combos puedes ganar power-ups. Completa las 4 fases para ganar.',
    stepsTitle: 'Pasos',
    step2TextMobile: 'Las cartas disponibles son siempre del tema de la fase. Toca o arrastra las tecnologías que tengan sentido a la zona de composición — esa área morada en el centro. Ahí montas la propuesta que se evaluará.',
    steps: stepsEs,
    unlockTitle: 'Qué puedes desbloquear',
    unlockPhase: '4 fases. Sentir → Conectar → Sincronizar → Transformar. Cada fase es un reto nuevo; completa todas para ganar y desbloquear lo que sigue.',
    unlockQuest: 'Quest especial. Explorar áreas extra y logros puede desbloquear una quest especial con recompensas exclusivas. Fíjate en lo que desbloqueas mientras juegas.',
    unlockRewards: 'Recompensas. NFT, coleccionables e ítems exclusivos se pueden conseguir al cumplir metas, formar combos o descubrir secretos. Cuanto más juegues y explores, más opciones de canjear.',
    unlockSecret: 'Área secreta. Existe un lugar escondido en el Empathy Engine — solo quien juega con atención y lo explora todo puede encontrarlo. Vale la pena quedarse y descubrirlo.',
    noWallet: 'No necesitas cartera para jugar. Para canjear NFT y coleccionables después, puedes conectar una cartera cuando quieras (ej. MetaMask, Phantom — hay opciones gratuitas). O crea una al canjear tus recompensas. El juego es tuyo; las recompensas también pueden serlo.',
    readyButton: 'Estoy listo — jugar',
  },
  fr: {
    title: 'Comment jouer',
    objective: 'Objectif',
    objectiveParagraph: 'À chaque phase tu reçois un brief (thème + objectif). Utilise uniquement les cartes de ce thème : glisse-les dans la zone de composition et monte la proposition. Ton objectif est d\'atteindre la cible de points avant la fin du temps. Former des combos accélère la progression. Le brief peut inclure une surprise (ex. combo obligatoire ou temps en plus). En formant des combos tu peux gagner des power-ups. Complète les 4 phases pour gagner.',
    objectiveParagraphMobile: 'À chaque phase tu reçois un brief (thème + objectif). Utilise uniquement les cartes de ce thème : appuie ou glisse-les dans la zone de composition et monte la proposition. Ton objectif est d\'atteindre la cible de points avant la fin du temps. Former des combos accélère la progression. Le brief peut inclure une surprise (ex. combo obligatoire ou temps en plus). En formant des combos tu peux gagner des power-ups. Complète les 4 phases pour gagner.',
    stepsTitle: 'Étapes',
    step2TextMobile: 'Les cartes disponibles sont toujours du thème de la phase. Appuie ou glisse les technologies qui ont du sens dans la zone de composition — cette zone violette au centre. C\'est là que tu montes la proposition qui sera évaluée.',
    steps: stepsFr,
    unlockTitle: 'Ce que tu peux débloquer',
    unlockPhase: '4 phases. Ressentir → Connecter → Synchroniser → Transformer. Chaque phase est un nouveau défi ; complète toutes pour gagner et débloquer la suite.',
    unlockQuest: 'Quest spéciale. Explorer les zones et succès peut débloquer une quest spéciale avec des récompenses exclusives. Garde un œil sur ce que tu débloques en jouant.',
    unlockRewards: 'Récompenses. NFT, collection et objets exclusifs peuvent être gagnés en atteignant les cibles, en formant des combos ou en découvrant des secrets. Plus tu joues et explores, plus tu as de chances de réclamer.',
    unlockSecret: 'Zone secrète. Il existe un endroit caché dans l\'Empathy Engine — seuls ceux qui jouent avec attention et tout explorent peuvent le trouver. Ça vaut le coup de rester pour découvrir.',
    noWallet: 'Pas besoin de portefeuille pour jouer. Pour réclamer NFT et collection plus tard, tu peux connecter un portefeuille quand tu veux (ex. MetaMask, Phantom — options gratuites). Ou en créer un au moment de réclamer tes récompenses. Le jeu est à toi ; les récompenses aussi.',
    readyButton: "Je suis prêt — jouer",
    tutorialVideoUrl: '',
    watchVideoLabel: 'Voir la vidéo',
  },
}

export function getTutorialTranslations(lang: Lang): TutorialTranslations {
  return tutorial[lang] ?? tutorial.pt
}
