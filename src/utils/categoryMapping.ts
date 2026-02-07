/**
 * Mapeamento de Categorias de Projetos
 * Fase 2: Reestruturação Menu Projetos
 * 
 * 6 CATEGORIAS PRINCIPAIS (menu fixo):
 * 1. 🎬 Vídeo & Cinema
 * 2. 🥽 VR & XR
 * 3. 🏛️ Museus & Exposições
 * 4. 🎪 Festivais & Curadoria
 * 5. 🎨 Design & Animação
 * 6. 🎓 Educação & Treinamento
 * 
 * CATEGORIAS SECUNDÁRIAS (filtros colapsáveis):
 * - Tecnologias (VR, AR, 360°, IA, etc)
 * - Tipos de Trabalho (filme, exposição, curso, etc)
 * - Indústrias (museu, festival, marca, etc)
 */

import type { Lang } from '../i18n'

export interface MainCategory {
  id: string
  label: Record<Lang, string>
  icon: string
  keywords: string[] // Palavras-chave para busca automática
  projectCategory?: string[] // Mapeia para projectCategory do backoffice
  type?: string // Mapeia para type legado
}

export interface SecondaryFilter {
  id: string
  label: Record<Lang, string>
  type: 'workType' | 'technologies' | 'industry' | 'tag' | 'year'
  options: Array<{
    value: string
    label: Record<Lang, string>
  }>
}

/**
 * 6 CATEGORIAS PRINCIPAIS para o menu fixo
 * Palavras curtas para caber em uma linha
 */
export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'video-cinema',
    label: {
      pt: 'Vídeo',
      en: 'Video',
      es: 'Video',
      fr: 'Vidéo'
    },
    icon: '🎬',
    keywords: ['video', 'cinema', 'filme', 'film', 'audiovisual', 'produção cinematográfica'],
    projectCategory: ['video', 'cinema', 'audiovisual', 'corporate'],
    type: 'FILM'
  },
  {
    id: 'vr-xr',
    label: {
      pt: 'VR & XR',
      en: 'VR & XR',
      es: 'VR & XR',
      fr: 'VR & XR'
    },
    icon: '🥽',
    keywords: ['vr', 'ar', 'xr', 'realidade virtual', 'augmented reality', '360'],
    projectCategory: ['vr-360', 'vr', 'ar', 'xr'],
    type: 'VR_FILM'
  },
  {
    id: 'museums-exhibitions',
    label: {
      pt: 'Museus',
      en: 'Museums',
      es: 'Museos',
      fr: 'Musées'
    },
    icon: '🏛️',
    keywords: ['museu', 'museum', 'exposição', 'exhibition', 'exposições interativas', 'instalacao'],
    projectCategory: ['museum', 'exhibition', 'museus', 'exposicao', 'instalacao'],
    type: 'MUSEUM'
  },
  {
    id: 'festivals-curation',
    label: {
      pt: 'Festivais',
      en: 'Festivals',
      es: 'Festivales',
      fr: 'Festivals'
    },
    icon: '🎪',
    keywords: ['festival', 'curadoria', 'curation', 'gramado', 'evento'],
    projectCategory: ['curadoria', 'festival'],
    type: 'FESTIVAL'
  },
  {
    id: 'design-animation',
    label: {
      pt: 'Design',
      en: 'Design',
      es: 'Diseño',
      fr: 'Design'
    },
    icon: '🎨',
    keywords: ['design', 'animação', 'animation', 'motion design', 'vfx', 'cgi', '3d', '2d', 'games'],
    projectCategory: ['design', 'animation', 'vfx', 'motion', 'games'],
    type: 'ANIMATION'
  },
  {
    id: 'education-training',
    label: {
      pt: 'Educação',
      en: 'Education',
      es: 'Educación',
      fr: 'Éducation'
    },
    icon: '🎓',
    keywords: ['educação', 'education', 'treinamento', 'training', 'curso', 'course', 'academy'],
    projectCategory: ['education', 'training'],
    type: 'EDUCATION'
  }
]

/**
 * Filtros secundários (colapsáveis)
 */
export const SECONDARY_FILTERS: SecondaryFilter[] = [
  {
    id: 'work-type',
    label: {
      pt: 'Tipo de Trabalho',
      en: 'Work Type',
      es: 'Tipo de Trabajo',
      fr: 'Type de Travail'
    },
    type: 'workType',
    options: [
      { value: 'filme', label: { pt: 'Filme', en: 'Film', es: 'Película', fr: 'Film' } },
      { value: 'exposicao', label: { pt: 'Exposição', en: 'Exhibition', es: 'Exposición', fr: 'Exposition' } },
      { value: 'curso', label: { pt: 'Curso', en: 'Course', es: 'Curso', fr: 'Cours' } },
      { value: 'palestra', label: { pt: 'Palestra', en: 'Lecture', es: 'Conferencia', fr: 'Conférence' } },
      { value: 'instalacao', label: { pt: 'Instalação', en: 'Installation', es: 'Instalación', fr: 'Installation' } }
    ]
  },
  {
    id: 'technologies',
    label: {
      pt: 'Tecnologias',
      en: 'Technologies',
      es: 'Tecnologías',
      fr: 'Technologies'
    },
    type: 'technologies',
    options: [
      { value: 'VR', label: { pt: 'VR', en: 'VR', es: 'VR', fr: 'VR' } },
      { value: 'AR', label: { pt: 'AR', en: 'AR', es: 'AR', fr: 'AR' } },
      { value: '360', label: { pt: '360°', en: '360°', es: '360°', fr: '360°' } },
      { value: 'IA', label: { pt: 'IA', en: 'AI', es: 'IA', fr: 'IA' } },
      { value: '3D', label: { pt: '3D', en: '3D', es: '3D', fr: '3D' } },
      { value: 'VFX', label: { pt: 'VFX', en: 'VFX', es: 'VFX', fr: 'VFX' } }
    ]
  },
  {
    id: 'industry',
    label: {
      pt: 'Indústria',
      en: 'Industry',
      es: 'Industria',
      fr: 'Industrie'
    },
    type: 'industry',
    options: [
      { value: 'museum', label: { pt: 'Museu', en: 'Museum', es: 'Museo', fr: 'Musée' } },
      { value: 'festival', label: { pt: 'Festival', en: 'Festival', es: 'Festival', fr: 'Festival' } },
      { value: 'brand', label: { pt: 'Marca', en: 'Brand', es: 'Marca', fr: 'Marque' } },
      { value: 'education', label: { pt: 'Educação', en: 'Education', es: 'Educación', fr: 'Éducation' } }
    ]
  }
]

/**
 * Função helper para mapear categoria principal para filtros
 */
export function getCategoryFilters(categoryId: string): {
  projectCategory?: string[]
  type?: string
} {
  const category = MAIN_CATEGORIES.find(cat => cat.id === categoryId)
  if (!category) return {}
  
  return {
    projectCategory: category.projectCategory,
    type: category.type
  }
}

/**
 * Função helper para traduzir labels
 */
export function getCategoryLabel(categoryId: string, lang: Lang): string {
  const category = MAIN_CATEGORIES.find(cat => cat.id === categoryId)
  if (!category) return categoryId
  return category.label[lang] || category.label.pt
}
