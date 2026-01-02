/**
 * Calcula anos de experiência desde o início do estúdio
 * Data de início: Agosto de 1996
 * Atualiza automaticamente a cada ano em agosto
 */

const STUDIO_START_DATE = new Date('1996-08-01')

export const getYearsOfExperience = (): number => {
  const now = new Date()
  const diffTime = now.getTime() - STUDIO_START_DATE.getTime()
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25) // Considera anos bissextos
  
  return Math.floor(diffYears)
}

/**
 * Retorna string formatada com anos de experiência
 * Ex: "30+ years", "30+ anos", "30+ ans", "30+ años"
 */
export const getYearsText = (lang: 'en' | 'pt' | 'es' | 'fr' = 'en'): string => {
  const years = getYearsOfExperience()
  
  const labels = {
    en: `${years}+ years`,
    pt: `${years}+ anos`,
    es: `${years}+ años`,
    fr: `${years}+ ans`
  }
  
  return labels[lang]
}

/**
 * Apenas o número (para uso em textos dinâmicos)
 */
export const getYearsNumber = (): number => {
  return getYearsOfExperience()
}

/**
 * Para uso em frases completas
 * Ex: "Com 30 anos de experiência", "With 30 years of experience"
 */
export const getExperiencePhrase = (lang: 'en' | 'pt' | 'es' | 'fr' = 'en'): string => {
  const years = getYearsOfExperience()
  
  const phrases = {
    en: `${years} years of experience`,
    pt: `${years} anos de experiência`,
    es: `${years} años de experiencia`,
    fr: `${years} ans d'expérience`
  }
  
  return phrases[lang]
}

