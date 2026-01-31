/**
 * Textos comuns a várias telas — PT, EN, ES, FR.
 */
import type { Lang } from './lang'

export interface CommonTranslations {
  back: string
  anonymous: string
  pts: string
  phaseNames: Record<1 | 2 | 3 | 4, string>
  levelNames: Record<number, string>
}

const common: Record<Lang, CommonTranslations> = {
  pt: {
    back: 'Voltar',
    anonymous: 'Anônimo',
    pts: 'pts',
    phaseNames: { 1: 'Sentir', 2: 'Conectar', 3: 'Sincronizar', 4: 'Transformar' },
    levelNames: { 1: 'Aprendiz', 2: 'Aprendiz', 3: 'Iniciante', 4: 'Iniciante', 5: 'Criador', 6: 'Criador', 7: 'Expert', 8: 'Expert', 9: 'Maestro', 10: 'Maestro' },
  },
  en: {
    back: 'Back',
    anonymous: 'Anonymous',
    pts: 'pts',
    phaseNames: { 1: 'Feel', 2: 'Connect', 3: 'Sync', 4: 'Transform' },
    levelNames: { 1: 'Apprentice', 2: 'Apprentice', 3: 'Beginner', 4: 'Beginner', 5: 'Creator', 6: 'Creator', 7: 'Expert', 8: 'Expert', 9: 'Maestro', 10: 'Maestro' },
  },
  es: {
    back: 'Volver',
    anonymous: 'Anónimo',
    pts: 'pts',
    phaseNames: { 1: 'Sentir', 2: 'Conectar', 3: 'Sincronizar', 4: 'Transformar' },
    levelNames: { 1: 'Aprendiz', 2: 'Aprendiz', 3: 'Principiante', 4: 'Principiante', 5: 'Creador', 6: 'Creador', 7: 'Experto', 8: 'Experto', 9: 'Maestro', 10: 'Maestro' },
  },
  fr: {
    back: 'Retour',
    anonymous: 'Anonyme',
    pts: 'pts',
    phaseNames: { 1: 'Ressentir', 2: 'Connecter', 3: 'Synchroniser', 4: 'Transformer' },
    levelNames: { 1: 'Apprenti', 2: 'Apprenti', 3: 'Débutant', 4: 'Débutant', 5: 'Créateur', 6: 'Créateur', 7: 'Expert', 8: 'Expert', 9: 'Maestro', 10: 'Maestro' },
  },
}

export function getCommonTranslations(lang: Lang): CommonTranslations {
  return common[lang] ?? common.pt
}
