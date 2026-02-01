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
  saveProgress: string
  receiveNft: string
  freeConsulting: string
  leaderboard: string
  backToMenu: string
  easterEggThanks: string
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
    saveProgress: 'Salvar Progresso',
    receiveNft: 'Receber NFT',
    freeConsulting: 'Consultoria Grátis',
    leaderboard: 'Ranking',
    backToMenu: 'Voltar ao Menu',
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
    saveProgress: 'Save Progress',
    receiveNft: 'Get NFT',
    freeConsulting: 'Free Consulting',
    leaderboard: 'Leaderboard',
    backToMenu: 'Back to Menu',
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
    saveProgress: 'Guardar Progreso',
    receiveNft: 'Recibir NFT',
    freeConsulting: 'Consultoría gratis',
    leaderboard: 'Ranking',
    backToMenu: 'Volver al Menú',
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
    saveProgress: 'Sauvegarder',
    receiveNft: 'Recevoir NFT',
    freeConsulting: 'Consulting gratuit',
    leaderboard: 'Classement',
    backToMenu: 'Retour au Menu',
    easterEggThanks: 'Merci d\'avoir joué ! Tu es curieux. ✨',
  },
}

export function getResultTranslations(lang: Lang): ResultTranslations {
  return result[lang] ?? result.pt
}
