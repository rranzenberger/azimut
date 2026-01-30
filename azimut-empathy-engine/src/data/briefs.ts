import type { Brief } from '../types/game.types'

export const briefs: Brief[] = [
  // XR/VR
  {
    id: 'brief-xr-experiencia',
    topicId: 'xr-vr',
    title: 'Experiência imersiva',
    objective: 'Monte uma proposta de experiência XR/VR para o cliente. Combine tecnologias que criem imersão.',
  },
  {
    id: 'brief-xr-museu',
    topicId: 'xr-vr',
    title: 'VR para museu',
    objective: 'O cliente quer levar visitantes a uma exposição em VR. Selecione as tecnologias ideais.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente pede pelo menos um combo de tecnologias.',
    },
  },
  {
    id: 'brief-xr-metaverso',
    topicId: 'xr-vr',
    title: 'Presença no metaverso',
    objective: 'Proposta para presença da marca no metaverso. Inclua captura, engines e interação.',
    surprise: {
      type: 'target-bonus',
      description: 'Meta de pontos aumentada nesta fase.',
    },
  },
  // Produção audiovisual
  {
    id: 'brief-av-comercial',
    topicId: 'producao-audiovisual',
    title: 'Comercial de marca',
    objective: 'Monte a equipe e o pipeline para um comercial. Do roteiro à pós-edição.',
  },
  {
    id: 'brief-av-doc',
    topicId: 'producao-audiovisual',
    title: 'Documentário',
    objective: 'Proposta de produção documental: pré-produção, câmera, locação, edição e som.',
    surprise: {
      type: 'time-reduced',
      description: 'Tempo reduzido nesta fase.',
    },
  },
  {
    id: 'brief-av-ia-vfx',
    topicId: 'producao-audiovisual',
    title: 'IA e VFX',
    objective: 'O cliente quer explorar IA e VFX na pós-produção. Combine as tecnologias certas.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer ver um combo de IA + VFX.',
    },
  },
  // Eventos corporativos
  {
    id: 'brief-ev-corporativo',
    topicId: 'eventos-corporativos',
    title: 'Evento corporativo',
    objective: 'Monte a estrutura de um evento: palco, som, iluminação e transmissão.',
  },
  {
    id: 'brief-ev-hibrido',
    topicId: 'eventos-corporativos',
    title: 'Evento híbrido',
    objective: 'Evento presencial e online. Inclua transmissão ao vivo, projeção e streaming.',
    surprise: {
      type: 'time-extra',
      description: 'Tempo extra nesta fase.',
    },
  },
  {
    id: 'brief-ev-cenografia',
    topicId: 'eventos-corporativos',
    title: 'Cenografia e projeção',
    objective: 'O cliente prioriza cenografia e projeção. Combine com som e iluminação.',
  },
  // Estudar Canadá
  {
    id: 'brief-canada-vfx',
    topicId: 'estudar-canada',
    title: 'Estudar VFX no Canadá',
    objective: 'Ajude o cliente a montar um plano: escolas (VFS, VanArts), curso VFX e visto.',
  },
  {
    id: 'brief-canada-game',
    topicId: 'estudar-canada',
    title: 'Game design no Canadá',
    objective: 'Proposta de formação em game design: Vancouver Academy, cursos e residência.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente quer um combo de academias.',
    },
  },
  {
    id: 'brief-canada-animacao',
    topicId: 'estudar-canada',
    title: 'Curso de animação',
    objective: 'O cliente quer estudar animação em Vancouver. Combine escolas e vistos.',
  },
  // Cultura & Museus
  {
    id: 'brief-cultura-museu',
    topicId: 'cultura-museus',
    title: 'Museus & Exposições',
    objective: 'Monte uma proposta de exposição ou experiência museal: curadoria, acervo digital, tour virtual e acessibilidade.',
  },
  {
    id: 'brief-cultura-festival',
    topicId: 'cultura-museus',
    title: 'Festival ou teatro imersivo',
    objective: 'O cliente quer um festival ou espetáculo imersivo. Combine curadoria, palco, projeção mapeada e painel LED.',
    surprise: {
      type: 'combo-required',
      description: 'O cliente pede pelo menos um combo de tecnologias.',
    },
  },
  {
    id: 'brief-cultura-tour',
    topicId: 'cultura-museus',
    title: 'Tour virtual e exposição',
    objective: 'Proposta de tour virtual e exposição com projeção mapeada e acessibilidade.',
  },
]

export function getBriefsByTopicId(topicId: string): Brief[] {
  return briefs.filter((b) => b.topicId === topicId)
}

export function getBriefById(id: string): Brief | undefined {
  return briefs.find((b) => b.id === id)
}

export function pickRandomBriefForTopic(topicId: string): Brief | undefined {
  const list = getBriefsByTopicId(topicId)
  if (list.length === 0) return undefined
  return list[Math.floor(Math.random() * list.length)]
}
