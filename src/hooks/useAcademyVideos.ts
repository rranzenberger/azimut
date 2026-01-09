// ════════════════════════════════════════════════════════════
// HOOK: useAcademyVideos
// ════════════════════════════════════════════════════════════
// Busca vídeos da Academy do backoffice
// Fallback para vídeos padrão se backoffice offline
// ════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import ApiService from '../services/api'

export interface AcademyVideo {
  id: string
  title: string
  description: string
  videoUrl: string // YouTube URL
  thumbnailUrl?: string
  category: 'institutional' | 'showreel' | 'testimonial' | 'campus' | 'class_demo'
  school?: 'vanarts' | 'vfs' | 'azimut'
  featured?: boolean
  priority?: number
}

// ═══════════════════════════════════════════════════════════
// VÍDEOS PADRÃO (Fallback se backoffice offline)
// ═══════════════════════════════════════════════════════════
const DEFAULT_VIDEOS: AcademyVideo[] = [
  // ─────────────────────────────────────────────────────────
  // VANCOUVER - JÁ IMPLEMENTADOS
  // ─────────────────────────────────────────────────────────
  {
    id: 'vanarts-institutional',
    title: 'VanArts - About the School',
    description: 'Conheça a Vancouver Institute of Media Arts',
    videoUrl: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
    category: 'institutional',
    school: 'vanarts',
    featured: true,
    priority: 1
  },
  {
    id: 'vanarts-brazilian-testimonials',
    title: 'Depoimentos de Alunos Brasileiros',
    description: 'Estudantes brasileiros compartilham suas experiências na VanArts',
    videoUrl: 'https://www.youtube.com/watch?v=y3uhoRpQPYY',
    category: 'testimonial',
    school: 'vanarts',
    featured: true,
    priority: 2
  },
  
  // ─────────────────────────────────────────────────────────
  // PLACEHOLDERS - TROCAR NO BACKOFFICE
  // ─────────────────────────────────────────────────────────
  {
    id: 'vfs-institutional',
    title: 'Vancouver Film School - About',
    description: 'Conheça a Vancouver Film School',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'institutional',
    school: 'vfs',
    featured: true,
    priority: 3
  },
  {
    id: 'vanarts-showreel-2024',
    title: 'VanArts Student Showreel 2024',
    description: 'Melhores trabalhos dos alunos VanArts',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'showreel',
    school: 'vanarts',
    featured: true,
    priority: 4
  },
  {
    id: 'vfs-showreel-2025',
    title: 'VFS Showreel 2025',
    description: 'Melhores trabalhos dos alunos VFS',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'showreel',
    school: 'vfs',
    featured: true,
    priority: 5
  },
  {
    id: 'vanarts-animation-showcase',
    title: 'VanArts Animation Showcase',
    description: 'Showcase de animação 2D/3D dos alunos',
    videoUrl: 'https://vimeo.com/groups/38001/videos/23613221', // Vimeo
    category: 'showreel',
    school: 'vanarts',
    featured: true,
    priority: 6
  },
  {
    id: 'vfs-campus-tour',
    title: 'VFS Campus Virtual Tour',
    description: 'Tour virtual pelas instalações da VFS',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'campus',
    school: 'vfs',
    priority: 7
  },
  {
    id: 'vanarts-campus-tour',
    title: 'VanArts Campus Virtual Tour',
    description: 'Tour virtual pelas instalações da VanArts',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'campus',
    school: 'vanarts',
    priority: 8
  },
  
  // ─────────────────────────────────────────────────────────
  // AZIMUT - INSTITUCIONAL
  // ─────────────────────────────────────────────────────────
  {
    id: 'azimut-history',
    title: '14 Anos de História - Azimut School',
    description: 'De 2004 a 2018: Como a Azimut School formou centenas de profissionais',
    videoUrl: '', // PLACEHOLDER - CRIAR VÍDEO
    category: 'institutional',
    school: 'azimut',
    featured: true,
    priority: 10
  },
  {
    id: 'azimut-class-demo-vr',
    title: 'Aula Demo: VR Cinematográfico',
    description: 'Trecho de aula sobre produção de filmes em 360°',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'class_demo',
    school: 'azimut',
    priority: 11
  },
  {
    id: 'azimut-class-demo-ia',
    title: 'Aula Demo: IA Generativa',
    description: 'Trecho de aula sobre IA aplicada à produção audiovisual',
    videoUrl: '', // PLACEHOLDER - ADICIONAR NO BACKOFFICE
    category: 'class_demo',
    school: 'azimut',
    priority: 12
  }
]

// ═══════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════
export const useAcademyVideos = (category?: string, school?: string) => {
  const [videos, setVideos] = useState<AcademyVideo[]>(DEFAULT_VIDEOS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        
        // TODO: Implementar rota no backoffice
        // const response = await ApiService.get('/api/public/academy/videos', {
        //   category,
        //   school
        // })
        
        // Por enquanto, usar vídeos padrão
        let filtered = DEFAULT_VIDEOS
        
        if (category) {
          filtered = filtered.filter(v => v.category === category)
        }
        
        if (school) {
          filtered = filtered.filter(v => v.school === school)
        }
        
        // Ordenar por priority
        filtered.sort((a, b) => (a.priority || 999) - (b.priority || 999))
        
        setVideos(filtered)
        setError(null)
      } catch (err) {
        console.error('Error fetching academy videos:', err)
        setError('Erro ao carregar vídeos')
        // Manter vídeos padrão em caso de erro
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [category, school])

  return { videos, loading, error }
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Extrai ID do vídeo do YouTube da URL
 */
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // ID direto
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

/**
 * Extrai ID do vídeo do Vimeo da URL
 */
export const getVimeoVideoId = (url: string): string | null => {
  if (!url) return null
  
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/groups\/[^\/]+\/videos\/(\d+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

/**
 * Detecta tipo de vídeo (YouTube, Vimeo, outros)
 */
export const detectVideoType = (url: string): 'youtube' | 'vimeo' | 'other' => {
  if (!url) return 'other'
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube'
  }
  
  if (url.includes('vimeo.com')) {
    return 'vimeo'
  }
  
  return 'other'
}
