/**
 * Traduções de títulos e objetivos dos briefs premium e super-premium — PT, EN, ES, FR.
 * Apenas os 4 premium + 1 super-premium têm tradução; os demais usam o texto do data/briefs.
 */
import type { Lang } from './lang'

const titles: Record<Lang, Record<string, string>> = {
  pt: {
    'brief-premium-museu-olimpico': 'Rio Museu Olímpico',
    'brief-premium-festival-gramado': 'Festival de Cinema de Gramado',
    'brief-premium-exposicao-internacional': 'Exposição internacional',
    'brief-super-premium-museu-experiencia-completa': 'Rio Museu Olímpico — Experiência Completa',
  },
  en: {
    'brief-premium-museu-olimpico': 'Rio Olympic Museum',
    'brief-premium-festival-gramado': 'Gramado Film Festival',
    'brief-premium-exposicao-internacional': 'International exhibition',
    'brief-super-premium-museu-experiencia-completa': 'Rio Olympic Museum — Complete Experience',
  },
  es: {
    'brief-premium-museu-olimpico': 'Rio Museo Olímpico',
    'brief-premium-festival-gramado': 'Festival de Cine de Gramado',
    'brief-premium-exposicao-internacional': 'Exposición internacional',
    'brief-super-premium-museu-experiencia-completa': 'Rio Museo Olímpico — Experiencia Completa',
  },
  fr: {
    'brief-premium-museu-olimpico': 'Rio Musée Olympique',
    'brief-premium-festival-gramado': 'Festival du film de Gramado',
    'brief-premium-exposicao-internacional': 'Exposition internationale',
    'brief-super-premium-museu-experiencia-completa': 'Rio Musée Olympique — Expérience complète',
  },
}

const objectives: Record<Lang, Record<string, string>> = {
  pt: {
    'brief-premium-museu-olimpico': 'Projeto de referência: experiência imersiva para o Rio Museu Olímpico. Curadoria, acervo digital, tour virtual, VR e acessibilidade. Conheça nosso currículo, soluções e projetos.',
    'brief-premium-festival-gramado': 'Projeto premium: cobertura e cenografia para festival. Transmissão ao vivo, projeção mapeada, palco e curadoria. Veja nossos projetos.',
    'brief-premium-exposicao-internacional': 'Projeto de longo prazo: exposição internacional com storytelling museal, expografia, mediação e tecnologia. Soluções Azimut.',
    'brief-super-premium-museu-experiencia-completa': 'Projeto signature: experiência imersiva completa para o Rio Museu Olímpico. Curadoria total, acervo digital, tour virtual, VR, acessibilidade, storytelling e expografia. Só quem descobriu a área secreta pode receber esta quest.',
  },
  en: {
    'brief-premium-museu-olimpico': 'Reference project: immersive experience for the Rio Olympic Museum. Curation, digital collection, virtual tour, VR and accessibility. See our curriculum, solutions and projects.',
    'brief-premium-festival-gramado': 'Premium project: coverage and scenography for the festival. Live broadcast, mapping projection, stage and curation. See our projects.',
    'brief-premium-exposicao-internacional': 'Long-term project: international exhibition with museum storytelling, expography, mediation and technology. Azimut solutions.',
    'brief-super-premium-museu-experiencia-completa': 'Signature project: complete immersive experience for the Rio Olympic Museum. Full curation, digital collection, virtual tour, VR, accessibility, storytelling and expography. Only those who discovered the secret area can receive this quest.',
  },
  es: {
    'brief-premium-museu-olimpico': 'Proyecto de referencia: experiencia inmersiva para el Rio Museo Olímpico. Curaduría, acervo digital, tour virtual, VR y accesibilidad. Conoce nuestro currículo, soluciones y proyectos.',
    'brief-premium-festival-gramado': 'Proyecto premium: cobertura y escenografía para el festival. Transmisión en vivo, proyección mapeada, escenario y curaduría. Ve nuestros proyectos.',
    'brief-premium-exposicao-internacional': 'Proyecto a largo plazo: exposición internacional con storytelling museal, expografía, mediación y tecnología. Soluciones Azimut.',
    'brief-super-premium-museu-experiencia-completa': 'Proyecto signature: experiencia inmersiva completa para el Rio Museo Olímpico. Curaduría total, acervo digital, tour virtual, VR, accesibilidad, storytelling y expografía. Solo quien descubrió el área secreta puede recibir esta quest.',
  },
  fr: {
    'brief-premium-museu-olimpico': 'Projet de référence : expérience immersive pour le Rio Musée Olympique. Curation, collection numérique, visite virtuelle, VR et accessibilité. Découvre notre curriculum, solutions et projets.',
    'brief-premium-festival-gramado': 'Projet premium : couverture et scénographie pour le festival. Diffusion en direct, projection mappée, scène et curation. Voir nos projets.',
    'brief-premium-exposicao-internacional': 'Projet à long terme : exposition internationale avec storytelling muséal, expographie, médiation et technologie. Solutions Azimut.',
    'brief-super-premium-museu-experiencia-completa': 'Projet signature : expérience immersive complète pour le Rio Musée Olympique. Curation totale, collection numérique, visite virtuelle, VR, accessibilité, storytelling et expographie. Seuls ceux qui ont découvert la zone secrète peuvent recevoir cette quest.',
  },
}

export function getBriefTitle(lang: Lang, briefId: string): string | undefined {
  return titles[lang]?.[briefId]
}

export function getBriefObjective(lang: Lang, briefId: string): string | undefined {
  return objectives[lang]?.[briefId]
}

export function getDisplayTitle(lang: Lang, briefId: string, fallback: string): string {
  return getBriefTitle(lang, briefId) ?? fallback
}

export function getDisplayObjective(lang: Lang, briefId: string, fallback: string): string {
  return getBriefObjective(lang, briefId) ?? fallback
}
