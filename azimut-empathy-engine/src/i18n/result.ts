/**
 * Traduções da ResultScreen — PT, EN, ES, FR.
 */
import type { Lang } from './lang'

export interface ResultTranslations {
  title: string
  yourFinalScore: string
  clientWantedComboYes: string
  clientWantedComboNo: string
  combosActivated: string
  levelLabel: string
  recordLabel: string
  gamesLabel: string
  nearMissMessage: string
  secondChanceButton: string
  playAgain: string
  saveProgressNft: string
  freeConsulting: string
  leaderboard: string
  backToHome: string
}

const result: Record<Lang, ResultTranslations> = {
  pt: {
    title: 'Showtime!',
    yourFinalScore: 'Sua pontuação final',
    clientWantedComboYes: 'O cliente queria um combo — você entregou!',
    clientWantedComboNo: 'O cliente queria um combo — quase lá na próxima!',
    combosActivated: 'Combos ativados',
    levelLabel: 'Nível',
    recordLabel: 'Recorde',
    gamesLabel: 'Partidas',
    nearMissMessage: 'Quase lá! Você perdeu por menos de 50 pts.',
    secondChanceButton: 'Segunda Chance (1x por dia)',
    playAgain: 'Jogar de novo',
    saveProgressNft: 'Salvar & Receber NFT',
    freeConsulting: 'Consultoria Grátis',
    leaderboard: 'Ranking',
    backToHome: 'Voltar ao Início',
    easterEggThanks: 'Obrigado por jogar! Você é curioso. ✨',
  },
  en: {
    title: 'Showtime!',
    yourFinalScore: 'Your final score',
    clientWantedComboYes: 'The client wanted a combo — you delivered!',
    clientWantedComboNo: 'The client wanted a combo — almost there next time!',
    combosActivated: 'Combos activated',
    levelLabel: 'Level',
    recordLabel: 'Record',
    gamesLabel: 'Games',
    nearMissMessage: 'So close! You lost by less than 50 pts.',
    secondChanceButton: 'Second Chance (1x per day)',
    playAgain: 'Play again',
    saveProgressNft: 'Save & Get NFT',
    freeConsulting: 'Free Consulting',
    leaderboard: 'Leaderboard',
    backToHome: 'Back to Home',
    easterEggThanks: 'Thanks for playing! You\'re curious. ✨',
  },
  es: {
    title: '¡Showtime!',
    yourFinalScore: 'Tu puntuación final',
    clientWantedComboYes: 'El cliente quería un combo — ¡lo cumpliste!',
    clientWantedComboNo: 'El cliente quería un combo — ¡casi la próxima!',
    combosActivated: 'Combos activados',
    levelLabel: 'Nivel',
    recordLabel: 'Record',
    gamesLabel: 'Partidas',
    nearMissMessage: '¡Casi! Perdiste por menos de 50 pts.',
    secondChanceButton: 'Segunda oportunidad (1x al día)',
    playAgain: 'Jugar de nuevo',
    saveProgressNft: 'Guardar & Recibir NFT',
    freeConsulting: 'Consultoría gratis',
    leaderboard: 'Ranking',
    backToHome: 'Volver al Inicio',
    easterEggThanks: '¡Gracias por jugar! Eres curioso. ✨',
  },
  fr: {
    title: 'Showtime !',
    yourFinalScore: 'Ton score final',
    clientWantedComboYes: 'Le client voulait un combo — tu as livré !',
    clientWantedComboNo: 'Le client voulait un combo — presque la prochaine fois !',
    combosActivated: 'Combos activés',
    levelLabel: 'Niveau',
    recordLabel: 'Record',
    gamesLabel: 'Parties',
    nearMissMessage: 'Presque ! Tu as perdu de moins de 50 pts.',
    secondChanceButton: 'Seconde chance (1x par jour)',
    playAgain: 'Rejouer',
    saveProgressNft: 'Sauvegarder & Recevoir NFT',
    freeConsulting: 'Consulting gratuit',
    leaderboard: 'Classement',
    backToHome: 'Retour à l\'accueil',
    easterEggThanks: 'Merci d\'avoir joué ! Tu es curieux. ✨',
  },
}

export function getResultTranslations(lang: Lang): ResultTranslations {
  return result[lang] ?? result.pt
}
