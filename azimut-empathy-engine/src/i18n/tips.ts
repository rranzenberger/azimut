/**
 * Traduções da TipsScreen — PT, EN, ES, FR.
 */
import type { Lang } from './lang'

export interface TipItem {
  icon: string
  title: string
  text: string
}

export interface TipsTranslations {
  title: string
  intro: string
  tips: TipItem[]
}

const tips: Record<Lang, TipsTranslations> = {
  pt: {
    title: 'Dicas e truques',
    intro: 'Dicas práticas para mandar bem no Empathy Engine e desbloquear o máximo de recompensas.',
    tips: [
      { icon: '📋', title: 'Leia o brief no início da fase', text: 'O brief diz o tema, o objetivo e se há surpresa (ex.: combo obrigatório ou tempo extra). Quem lê joga melhor.' },
      { icon: '🔥', title: 'Priorize combos', text: 'Combos dão bônus grande de pontos e podem liberar power-ups (tempo extra, revelar raridade, trocar carta). Tente formar pelo menos um por fase.' },
      { icon: '🔄', title: 'Use "Trocar cartas" com critério', text: 'Você tem uma troca por fase. Use quando as cartas não ajudam a formar combo ou atingir a meta — trocar no início pode desperdiçar.' },
      { icon: '✨', title: 'Cartas raras valem mais', text: 'Rare, Epic, Legendary e Mythic dão mais pontos que Common. Se puder, inclua cartas raras na zona para subir o placar rápido.' },
      { icon: '⏱️', title: 'Cuide do tempo', text: 'Cada fase tem limite de tempo. Se estiver perto da meta, coloque cartas que somem mais; se faltar pouco tempo, não hesite em trocar carta.' },
      { icon: '🎯', title: 'Complete as 4 fases', text: 'Sentir → Conectar → Sincronizar → Transformar. Vencer o jogo inteiro desbloqueia conquistas e pode liberar a quest especial.' },
      { icon: '💜', title: 'Surpresa no brief = oportunidade', text: 'Se o brief pedir "forme um combo" ou tiver tempo extra, cumprir dá vantagem. Ajuste sua estratégia à surpresa da fase.' },
      { icon: '🔮', title: 'Explore tudo', text: 'Conquistas, ranking e configurações escondem detalhes. Quem explora descobre mais — inclusive a área secreta.' },
    ],
  },
  en: {
    title: 'Tips and tricks',
    intro: 'Practical tips to do well in the Empathy Engine and unlock the most rewards.',
    tips: [
      { icon: '📋', title: 'Read the brief at the start of the phase', text: 'The brief says the theme, objective and any surprise (e.g. required combo or extra time). Those who read play better.' },
      { icon: '🔥', title: 'Prioritise combos', text: 'Combos give big point bonuses and can unlock power-ups (extra time, reveal rarity, swap card). Try to form at least one per phase.' },
      { icon: '🔄', title: 'Use "Swap cards" wisely', text: 'You have one swap per phase. Use it when cards don\'t help form a combo or reach the target — swapping early can waste it.' },
      { icon: '✨', title: 'Rare cards are worth more', text: 'Rare, Epic, Legendary and Mythic give more points than Common. If you can, include rare cards in the zone to score fast.' },
      { icon: '⏱️', title: 'Watch the clock', text: 'Each phase has a time limit. If you\'re close to the target, add cards that score more; if time is short, don\'t hesitate to swap.' },
      { icon: '🎯', title: 'Complete all 4 phases', text: 'Feel → Connect → Sync → Transform. Beating the whole game unlocks achievements and can unlock the special quest.' },
      { icon: '💜', title: 'Brief surprise = opportunity', text: 'If the brief asks for "form a combo" or has extra time, fulfilling it gives an advantage. Adjust your strategy to the phase surprise.' },
      { icon: '🔮', title: 'Explore everything', text: 'Achievements, ranking and settings hide details. Those who explore discover more — including the secret area.' },
    ],
  },
  es: {
    title: 'Consejos y trucos',
    intro: 'Consejos prácticos para rendir bien en el Empathy Engine y desbloquear al máximo las recompensas.',
    tips: [
      { icon: '📋', title: 'Lee el brief al inicio de la fase', text: 'El brief indica el tema, el objetivo y si hay sorpresa (ej. combo obligatorio o tiempo extra). Quien lee juega mejor.' },
      { icon: '🔥', title: 'Prioriza los combos', text: 'Los combos dan bono grande de puntos y pueden liberar power-ups (tiempo extra, revelar rareza, cambiar carta). Intenta formar al menos uno por fase.' },
      { icon: '🔄', title: 'Usa "Cambiar cartas" con criterio', text: 'Tienes un cambio por fase. Úsalo cuando las cartas no ayuden a formar combo o alcanzar la meta — cambiar al inicio puede desperdiciarlo.' },
      { icon: '✨', title: 'Las cartas raras valen más', text: 'Rare, Epic, Legendary y Mythic dan más puntos que Common. Si puedes, incluye cartas raras en la zona para subir el marcador rápido.' },
      { icon: '⏱️', title: 'Cuida el tiempo', text: 'Cada fase tiene límite de tiempo. Si estás cerca de la meta, pon cartas que sumen más; si queda poco tiempo, no dudes en cambiar carta.' },
      { icon: '🎯', title: 'Completa las 4 fases', text: 'Sentir → Conectar → Sincronizar → Transformar. Vencer el juego completo desbloquea logros y puede liberar la quest especial.' },
      { icon: '💜', title: 'Sorpresa en el brief = oportunidad', text: 'Si el brief pide "forma un combo" o tiene tiempo extra, cumplirlo da ventaja. Ajusta tu estrategia a la sorpresa de la fase.' },
      { icon: '🔮', title: 'Explora todo', text: 'Logros, ranking y configuración esconden detalles. Quien explora descubre más — incluida el área secreta.' },
    ],
  },
  fr: {
    title: 'Astuces et conseils',
    intro: 'Conseils pratiques pour bien jouer à l\'Empathy Engine et débloquer un maximum de récompenses.',
    tips: [
      { icon: '📋', title: 'Lis le brief au début de la phase', text: 'Le brief indique le thème, l\'objectif et s\'il y a une surprise (ex. combo obligatoire ou temps en plus). Qui lit joue mieux.' },
      { icon: '🔥', title: 'Priorise les combos', text: 'Les combos donnent un gros bonus de points et peuvent débloquer des power-ups (temps en plus, révéler rareté, échanger carte). Essaie d\'en former au moins un par phase.' },
      { icon: '🔄', title: 'Utilise "Échanger cartes" avec discernement', text: 'Tu as un échange par phase. Utilise-le quand les cartes n\'aident pas à former un combo ou atteindre la cible — échanger au début peut le gâcher.' },
      { icon: '✨', title: 'Les cartes rares valent plus', text: 'Rare, Epic, Legendary et Mythic donnent plus de points que Common. Si tu peux, mets des cartes rares dans la zone pour monter vite au score.' },
      { icon: '⏱️', title: 'Surveille le temps', text: 'Chaque phase a une limite de temps. Si tu es proche de la cible, mets des cartes qui rapportent plus ; s\'il reste peu de temps, n\'hésite pas à échanger.' },
      { icon: '🎯', title: 'Complète les 4 phases', text: 'Ressentir → Connecter → Synchroniser → Transformer. Gagner toute la partie débloque des succès et peut débloquer la quest spéciale.' },
      { icon: '💜', title: 'Surprise dans le brief = opportunité', text: 'Si le brief demande "forme un combo" ou a du temps en plus, le remplir donne un avantage. Adapte ta stratégie à la surprise de la phase.' },
      { icon: '🔮', title: 'Explore tout', text: 'Succès, classement et paramètres cachent des détails. Qui explore découvre plus — y compris la zone secrète.' },
    ],
  },
}

export function getTipsTranslations(lang: Lang): TipsTranslations {
  return tips[lang] ?? tips.pt
}
