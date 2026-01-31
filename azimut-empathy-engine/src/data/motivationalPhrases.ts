/**
 * Frases motivacionais do Empathy Engine
 * Tom: estamos juntos — empático, coloquial, nada agressivo. Erro = tristeza leve + "pode melhorar".
 * PT, EN, FR, ES; uso futuro: automação para captar jogador como lead.
 */

export type MotivationalSituation =
  | 'drop_error'
  | 'general'
  | 'ego'
  | 'azimut'
  | 'time_low'
  | 'near_goal'
  | 'combo'
  | 'goal_reached'
  | 'phase_start'

export type Lang = 'pt' | 'en' | 'fr' | 'es'

export interface MotivationalPhrase {
  text: Record<Lang, string>
  emoji: string
  situation: MotivationalSituation
}

function getGameLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  try {
    const path = window.top?.location?.pathname ?? window.location.pathname
    const m = path.match(/^\/(pt|en|fr|es)\b/)
    if (m) return m[1] as Lang
  } catch {
    // cross-origin iframe
  }
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('azimut-game-lang') : null
  if (stored && (['pt', 'en', 'fr', 'es'] as const).includes(stored as Lang)) return stored as Lang
  return 'pt'
}

const LANG_DEFAULT: Lang = 'pt'

export const motivationalPhrases: MotivationalPhrase[] = [
  // ─── drop_error: tristeza leve, "foi quase lá", "bateu na trave", nada agressivo ───
  { text: { pt: 'Foi quase lá! Na próxima a Azimut torce por você na zona.', en: 'So close! Next time Azimut is rooting for you in the zone.', fr: 'Presque ! La prochaine fois, ajoute à la zone.', es: 'Casi. La próxima Azimut anima por ti en la zona.' }, emoji: '😔', situation: 'drop_error' },
  { text: { pt: 'Bateu na trave! A Azimut sabe que na próxima você acerta a zona.', en: 'So close! Azimut knows you will hit the zone next time.', fr: 'T’y étais presque ! Réessaie dans la zone violette.', es: 'Casi. Intenta otra vez en la zona morada.' }, emoji: '🎯', situation: 'drop_error' },
  { text: { pt: 'Pode melhorar — adicione à zona na próxima.', en: 'You can do better — Azimut believes in you. Add to the zone next time.', fr: 'Tu peux faire mieux — Azimut croit en toi. Ajoute à la zone la prochaine fois.', es: 'Puedes mejorar — añádela a la zona la próxima.' }, emoji: '💪', situation: 'drop_error' },
  { text: { pt: 'Que pena, quase! A zona é aquela no centro. Azimut na torcida.', en: 'Almost! The zone is the one in the middle. Azimut is with you.', fr: 'Dommage, presque ! La zone est celle au centre.', es: 'Casi. La zona es la del centro.' }, emoji: '✨', situation: 'drop_error' },
  { text: { pt: 'Acontece! Na próxima você adiciona à zona. A Azimut confia.', en: 'It happens! Next time you’ll add it to the zone.', fr: 'Ça arrive ! La prochaine fois tu ajoutes à la zone.', es: 'Pasa. La próxima añádela a la zona.' }, emoji: '🤝', situation: 'drop_error' },
  { text: { pt: 'Sem pressa — a zona aceita suas cartas. A Azimut está com você.', en: 'No rush — the zone is waiting. Azimut is with you.', fr: 'Pas de stress — la zone attend tes cartes.', es: 'Sin prisa — la zona acepta tus cartas.' }, emoji: '👍', situation: 'drop_error' },
  { text: { pt: 'Quase acertou! A Azimut torce — adicione à zona de composição.', en: 'Almost got it! Azimut is rooting — add it to the composition zone.', fr: 'Presque ! Ajoute à la zone de composition.', es: 'Casi. Añádela a la zona de composición.' }, emoji: '🚀', situation: 'drop_error' },
  // ─── general: incentivo, estamos juntos ─────────────────────────────────────────
  { text: { pt: 'Boa! Cada carta conta.', en: 'Nice! Every card counts. Azimut sees you.', fr: 'Bien ! Chaque carte compte. Azimut te voit.', es: '¡Bien! Cada carta cuenta. Azimut te ve.' }, emoji: '🌟', situation: 'general' },
  { text: { pt: 'Você está mandando bem! A Azimut curte.', en: 'You’re doing great!', fr: 'Tu gères !', es: '¡Lo estás haciendo bien!' }, emoji: '💜', situation: 'general' },
  { text: { pt: 'Continue assim! A Azimut está com você.', en: 'Keep it up! We’re with you.', fr: 'Continue ! On est avec toi.', es: 'Sigue así. Estamos contigo.' }, emoji: '🔥', situation: 'general' },
  { text: { pt: 'Isso aí! Ótimo ritmo.', en: 'That’s it! Great pace.', fr: 'C’est ça ! Bon rythme.', es: 'Eso. Buen ritmo.' }, emoji: '👍', situation: 'general' },
  { text: { pt: 'Cada tecnologia conecta de um jeito. A Azimut acredita no seu caminho.', en: 'Every tech connects differently. You’re on the right track.', fr: 'Chaque tech connecte à sa façon. T’es sur la bonne voie.', es: 'Cada tecnología conecta a su manera. Vas bien.' }, emoji: '🎴', situation: 'general' },
  // ─── ego: elogio, inflar o ego (coloquial) ────────────────────────────────────────
  { text: { pt: 'Você tem ótimo gosto para combos! A Azimut adora.', en: 'You’ve got great taste in combos!', fr: 'T’as du goût pour les combos !', es: 'Tienes muy buen ojo para los combos.' }, emoji: '🔥', situation: 'ego' },
  { text: { pt: 'Olha só que escolhas incríveis! Azimut aprova.', en: 'Look at those choices! Azimut approves.', fr: 'Regarde ces choix !', es: 'Mira qué buenas elecciones. Azimut lo aprueba.' }, emoji: '👏', situation: 'ego' },
  { text: { pt: 'Talentoso! A Azimut adora jogadores assim.', en: 'Talented! Azimut loves players like you.', fr: 'Talentueux ! Azimut adore les joueurs comme toi.', es: 'Con talento. A Azimut le encantan jugadores así.' }, emoji: '😎', situation: 'ego' },
  { text: { pt: 'Suas combinações são de outro nível! A Azimut vibra.', en: 'Your combos are next level! Azimut is hyped.', fr: 'Tes combos sont au top ! Azimut vibre.', es: 'Tus combos son de otro nivel. Azimut vibra.' }, emoji: '✨', situation: 'ego' },
  { text: { pt: 'Você nasceu para montar experiências. A Azimut vê isso.', en: 'You were born to build experiences. Azimut sees it.', fr: 'T’es fait pour créer des expériences.', es: 'Naciste para armar experiencias.' }, emoji: '🎪', situation: 'ego' },
  // ─── azimut: parceria, Vancouver, projeto (subliminar, “estamos juntos”) ─────────
  { text: { pt: 'A Azimut pode te ajudar a levar isso pro mundo real.', en: 'Azimut can help you take this to the real world.', fr: 'Azimut peut t’aider à passer au monde réel.', es: 'Azimut puede ayudarte a llevarlo al mundo real.' }, emoji: '🌍', situation: 'azimut' },
  { text: { pt: 'Que tal um projeto juntos? Nós da Azimut te orientamos.', en: 'How about a project together? We at Azimut will guide you.', fr: 'Et si on faisait un projet ensemble ? Nous chez Azimut on t’accompagne.', es: '¿Un proyecto juntos? Nosotros en Azimut te orientamos.' }, emoji: '📐', situation: 'azimut' },
  { text: { pt: 'Estudar em Vancouver pode ser seu próximo passo. A Azimut conecta.', en: 'Studying in Vancouver could be your next step. Azimut connects you.', fr: 'Étudier à Vancouver peut être ta prochaine étape. Azimut te connecte.', es: 'Estudiar en Vancouver puede ser tu próximo paso. Azimut te conecta.' }, emoji: '🍁', situation: 'azimut' },
  { text: { pt: 'A Azimut é sua parceira em experiências imersivas.', en: 'Azimut is your partner in immersive experiences.', fr: 'Azimut est ton partenaire en expériences immersives.', es: 'Azimut es tu socia en experiencias inmersivas.' }, emoji: '🤝', situation: 'azimut' },
  { text: { pt: 'Vamos fazer um projeto junto? Nós da Azimut te orientamos.', en: 'Let’s do a project together? We at Azimut will guide you.', fr: 'On fait un projet ensemble ? Nous chez Azimut on t’oriente.', es: '¿Hacemos un proyecto juntos? Nosotros en Azimut te orientamos.' }, emoji: '🚀', situation: 'azimut' },
  { text: { pt: 'XR, eventos, cultura — a Azimut faz isso com você.', en: 'XR, events, culture — Azimut does it with you.', fr: 'XR, événements, culture — Azimut fait ça avec toi.', es: 'XR, eventos, cultura — Azimut lo hace contigo.' }, emoji: '🎪', situation: 'azimut' },
  { text: { pt: 'Daqui para um projeto real é um passo. A Azimut te apoia.', en: 'From here to a real project is one step. Azimut’s got you.', fr: 'D’ici à un vrai projet, c’est un pas. Azimut te soutient.', es: 'De aquí a un proyecto real hay un paso. Azimut te apoya.' }, emoji: '💜', situation: 'azimut' },
  // ─── time_low ─────────────────────────────────────────────────────────────────
  { text: { pt: 'Respira. A Azimut torce por você. Você consegue.', en: 'Breathe. You’ve got this.', fr: 'Respire. Tu peux le faire.', es: 'Respira. Puedes.' }, emoji: '🧘', situation: 'time_low' },
  { text: { pt: 'Foco! A Azimut acredita — faltam poucos segundos.', en: 'Focus! Azimut believes — just a few seconds left.', fr: 'Concentre ! Plus que quelques secondes.', es: 'Foco. Azimut cree en ti — quedan pocos segundos.' }, emoji: '⏱️', situation: 'time_low' },
  { text: { pt: 'Última reta — a Azimut está com você! Você dá conta.', en: 'Last stretch — you’ve got it!', fr: 'Dernière ligne droite — tu gères !', es: 'Última recta — tú puedes.' }, emoji: '💪', situation: 'time_low' },
  // ─── near_goal ─────────────────────────────────────────────────────────────────
  { text: { pt: 'Quase lá! A Azimut vibra com você. Mais um pouco.', en: 'Almost there! Azimut is hyped. A bit more.', fr: 'Presque ! Azimut vibre. Encore un peu.', es: 'Casi. Un poco más.' }, emoji: '🎯', situation: 'near_goal' },
  { text: { pt: 'Meta ali na frente! Azimut na torcida.', en: 'Goal’s right there!', fr: 'L’objectif est là !', es: 'La meta está ahí.' }, emoji: '🔥', situation: 'near_goal' },
  { text: { pt: 'Você está pertinho! A Azimut acredita.', en: 'You’re so close!', fr: 'T’y es presque !', es: 'Estás muy cerca.' }, emoji: '✨', situation: 'near_goal' },
  // ─── combo / goal_reached / phase_start ─────────────────────────────────────────
  { text: { pt: 'Combo ativado! A Azimut vibra com você!', en: 'Combo! You’re awesome!', fr: 'Combo ! T’assures !', es: '¡Combo! ¡Eres genial!' }, emoji: '🔥', situation: 'combo' },
  { text: { pt: 'Sinergia em ação! Azimut aprova.', en: 'Synergy in action! Azimut approves.', fr: 'Synergie en action ! Azimut approuve.', es: '¡Sinergia en acción! Azimut lo aprueba.' }, emoji: '👏', situation: 'combo' },
  { text: { pt: 'Meta batida! Parabéns da Azimut!', en: 'Goal hit! Congrats from Azimut!', fr: 'Objectif atteint ! Bravo de la part d'\''Azimut !', es: '¡Meta cumplida! ¡Felicidades de Azimut!' }, emoji: '🎉', situation: 'goal_reached' },
  { text: { pt: 'Você arrasou! A Azimut comemora com você.', en: 'You crushed it! Azimut celebrates with you.', fr: 'T’as tout déchiré !', es: '¡Lo bordaste!' }, emoji: '🌟', situation: 'goal_reached' },
  { text: { pt: 'Nova fase! A Azimut vai com você. Vamos nessa.', en: 'New phase! Let’s go.', fr: 'Nouvelle phase ! C’est parti.', es: 'Nueva fase. Vamos.' }, emoji: '🚀', situation: 'phase_start' },
  { text: { pt: 'Pronto para o próximo desafio? A Azimut está com você.', en: 'Ready for the next challenge? Azimut is with you.', fr: 'Prêt pour le prochain défi ?', es: '¿Listo para el siguiente reto?' }, emoji: '💜', situation: 'phase_start' },
]

/** Retorna uma frase aleatória para a situação; texto no idioma atual (pt/en/fr/es). */
export function pickMotivationalPhrase(situation?: MotivationalSituation, lang?: Lang): { text: string; emoji: string; situation: MotivationalSituation } {
  const currentLang = lang ?? getGameLang()
  const forSituation = situation
    ? motivationalPhrases.filter((p) => p.situation === situation)
    : motivationalPhrases
  const pool = forSituation.length > 0 ? forSituation : motivationalPhrases
  const phrase = pool[Math.floor(Math.random() * pool.length)]
  const text = phrase.text[currentLang] ?? phrase.text[LANG_DEFAULT]
  return { text, emoji: phrase.emoji, situation: phrase.situation }
}
