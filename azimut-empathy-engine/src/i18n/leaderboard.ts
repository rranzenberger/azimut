import type { Lang } from './lang'

export interface LeaderboardTranslations {
  title: string
  all: string
  noScoresYet: string
  noScoresInTopic: string
}

const lb: Record<Lang, LeaderboardTranslations> = {
  pt: { title: 'Ranking', all: 'Todos', noScoresYet: 'Nenhuma pontuação ainda. Jogue para aparecer aqui!', noScoresInTopic: 'Nenhuma pontuação neste tópico ainda.' },
  en: { title: 'Ranking', all: 'All', noScoresYet: 'No scores yet. Play to appear here!', noScoresInTopic: 'No scores in this topic yet.' },
  es: { title: 'Ranking', all: 'Todos', noScoresYet: 'Aún no hay puntuaciones. ¡Juega para aparecer aquí!', noScoresInTopic: 'Aún no hay puntuaciones en este tema.' },
  fr: { title: 'Classement', all: 'Tous', noScoresYet: "Aucun score pour l'instant. Joue pour apparaître ici !", noScoresInTopic: "Aucun score dans ce thème pour l'instant." },
}

export function getLeaderboardTranslations(lang: Lang): LeaderboardTranslations {
  return lb[lang] ?? lb.pt
}
