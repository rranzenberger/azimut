import { useState, useEffect } from 'react'
import { getSessionId } from '../utils/analytics'
import { logger } from '@/utils/logger'

/**
 * 🎯 HOOK DE PERSONALIZAÇÃO - Busca dados da IA DeepSeek
 * 
 * Retorna:
 * - visitorType: Tipo de visitante identificado pela IA
 * - recommendedProjects: Lista de IDs de projetos recomendados
 * - scores: Scores de interesse em diferentes áreas
 * - suggestedPage: Próxima página sugerida
 */

export interface PersonalizationData {
  visitorType: string | null
  recommendedProjects: Array<{
    projectId: string
    score: number
    reason: string
  }>
  scores: {
    museum: number
    brand: number
    festival: number
    city: number
    education: number
    vr: number
    ai: number
  }
  suggestedPage: string | null
  suggestedAction: string | null
  conversionScore: number
}

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

export function usePersonalization(): PersonalizationData | null {
  const [data, setData] = useState<PersonalizationData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPersonalization = async () => {
      try {
        const sessionId = getSessionId()
        
        // Buscar dados do backoffice
        const response = await fetch(`${BACKOFFICE_URL}/api/visitor/personalization?sessionId=${sessionId}`)
        
        if (!response.ok) {
          console.warn('Personalization API não disponível, usando defaults')
          setData(null)
          return
        }

        const result = await response.json()
        
        setData({
          visitorType: result.visitorType || null,
          recommendedProjects: result.recommendedProjects || [],
          scores: result.scores || {
            museum: 0,
            brand: 0,
            festival: 0,
            city: 0,
            education: 0,
            vr: 0,
            ai: 0
          },
          suggestedPage: result.suggestedPage || null,
          suggestedAction: result.suggestedAction || null,
          conversionScore: result.conversionScore || 0
        })
      } catch (error) {
        logger.warn('Erro ao buscar personalização:', error)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPersonalization()

    // Atualizar a cada 2 minutos (se o usuário ainda está navegando)
    const interval = setInterval(fetchPersonalization, 120000)

    return () => clearInterval(interval)
  }, [])

  // Enquanto carrega, retornar null (experiência padrão)
  if (loading) return null

  return data
}

/**
 * 🎨 HOOK DE CTAs PERSONALIZADOS
 */
export function usePersonalizedCTA(visitorType: string | null, lang: string) {
  if (!visitorType) {
    return {
      pt: 'Conhecer nosso trabalho →',
      en: 'Explore our work →',
      fr: 'Découvrir notre travail →',
      es: 'Conocer nuestro trabajo →'
    }
  }

  const ctas: Record<string, Record<string, string>> = {
    MUSEUM_CURATOR: {
      pt: 'Criar experiência para seu museu →',
      en: 'Create experience for your museum →',
      fr: 'Créer une expérience pour votre musée →',
      es: 'Crear experiencia para su museo →'
    },
    BRAND_MANAGER: {
      pt: 'Ativar sua marca com XR →',
      en: 'Activate your brand with XR →',
      fr: 'Activer votre marque avec XR →',
      es: 'Activar su marca con XR →'
    },
    CITY_OFFICIAL: {
      pt: 'Transformar sua cidade →',
      en: 'Transform your city →',
      fr: 'Transformer votre ville →',
      es: 'Transformar su ciudad →'
    },
    FESTIVAL_ORGANIZER: {
      pt: 'Criar experiência para seu festival →',
      en: 'Create experience for your festival →',
      fr: 'Créer une expérience pour votre festival →',
      es: 'Crear experiencia para su festival →'
    },
    EDUCATOR: {
      pt: 'Inovar na educação →',
      en: 'Innovate in education →',
      fr: 'Innover dans l\'éducation →',
      es: 'Innovar en educación →'
    },
    TECH_ENTHUSIAST: {
      pt: 'Explorar tecnologias imersivas →',
      en: 'Explore immersive technologies →',
      fr: 'Explorer les technologies immersives →',
      es: 'Explorar tecnologías inmersivas →'
    },
    CULTURAL_PRODUCER: {
      pt: 'Realizar seu projeto cultural →',
      en: 'Realize your cultural project →',
      fr: 'Réaliser votre projet culturel →',
      es: 'Realizar su proyecto cultural →'
    }
  }

  return ctas[visitorType] || ctas.GENERAL_PUBLIC || {
    pt: 'Conhecer nosso trabalho →',
    en: 'Explore our work →',
    fr: 'Découvrir notre travail →',
    es: 'Conocer nuestro trabajo →'
  }
}

/**
 * 🏛️ HOOK DE HERO ADAPTATIVO
 */
export function usePersonalizedHero(visitorType: string | null, lang: string) {
  if (!visitorType) return null

  const heroes: Record<string, Record<string, { title: string; subtitle: string }>> = {
    MUSEUM_CURATOR: {
      pt: {
        title: 'Criamos experiências que transformam museus',
        subtitle: 'Narrativas imersivas que conectam acervos ao público do século XXI'
      },
      en: {
        title: 'We create experiences that transform museums',
        subtitle: 'Immersive narratives connecting collections to 21st century audiences'
      },
      fr: {
        title: 'Nous créons des expériences qui transforment les musées',
        subtitle: 'Récits immersifs reliant les collections au public du 21e siècle'
      },
      es: {
        title: 'Creamos experiencias que transforman museos',
        subtitle: 'Narrativas inmersivas que conectan colecciones al público del siglo XXI'
      }
    },
    BRAND_MANAGER: {
      pt: {
        title: 'Ativamos marcas através de XR e experiências imersivas',
        subtitle: 'Branded experiences que geram engajamento e memorabilidade'
      },
      en: {
        title: 'We activate brands through XR and immersive experiences',
        subtitle: 'Branded experiences that generate engagement and memorability'
      },
      fr: {
        title: 'Nous activons les marques via XR et expériences immersives',
        subtitle: 'Expériences de marque générant engagement et mémorabilité'
      },
      es: {
        title: 'Activamos marcas a través de XR y experiencias inmersivas',
        subtitle: 'Experiencias de marca que generan engagement y memorabilidad'
      }
    },
    CITY_OFFICIAL: {
      pt: {
        title: 'Projetos culturais que transformam cidades',
        subtitle: 'Experiências urbanas que conectam comunidades e patrimônio'
      },
      en: {
        title: 'Cultural projects that transform cities',
        subtitle: 'Urban experiences connecting communities and heritage'
      },
      fr: {
        title: 'Projets culturels qui transforment les villes',
        subtitle: 'Expériences urbaines reliant communautés et patrimoine'
      },
      es: {
        title: 'Proyectos culturales que transforman ciudades',
        subtitle: 'Experiencias urbanas que conectan comunidades y patrimonio'
      }
    },
    FESTIVAL_ORGANIZER: {
      pt: {
        title: 'Experiências imersivas para festivais e eventos',
        subtitle: 'Instalações que surpreendem e engajam seu público'
      },
      en: {
        title: 'Immersive experiences for festivals and events',
        subtitle: 'Installations that surprise and engage your audience'
      },
      fr: {
        title: 'Expériences immersives pour festivals et événements',
        subtitle: 'Installations qui surprennent et engagent votre public'
      },
      es: {
        title: 'Experiencias inmersivas para festivales y eventos',
        subtitle: 'Instalaciones que sorprenden y enganchan a su público'
      }
    },
    EDUCATOR: {
      pt: {
        title: 'Compartilhamos conhecimento através da tecnologia',
        subtitle: 'Experiências educacionais que inspiram e transformam'
      },
      en: {
        title: 'We share knowledge through technology',
        subtitle: 'Educational experiences that inspire and transform'
      },
      fr: {
        title: 'Nous partageons la connaissance via la technologie',
        subtitle: 'Expériences éducatives qui inspirent et transforment'
      },
      es: {
        title: 'Compartimos conocimiento a través de la tecnología',
        subtitle: 'Experiencias educativas que inspiran y transforman'
      }
    }
  }

  return heroes[visitorType]?.[lang] || null
}

