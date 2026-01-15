// ════════════════════════════════════════════════════════════
// USER PROFILE DETECTOR - FASE 2 Personalização
// ════════════════════════════════════════════════════════════
// Detecta automaticamente o perfil do usuário baseado em:
// - Páginas visitadas
// - Tempo de permanência
// - Cliques e interações
// - Horário de acesso
// - Idioma/região
// ════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { Lang } from '../i18n'

export type UserProfile = 'student' | 'business' | 'corporate' | 'agency' | 'investor' | 'unknown'

interface UserBehavior {
  pagesVisited: string[]
  timeOnSite: number
  lastInteraction: Date
  interactions: {
    type: 'click' | 'scroll' | 'hover' | 'form_start' | 'video_watch'
    target: string
    timestamp: Date
  }[]
  preferredLanguage: Lang
  detectedRegion?: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
}

interface UserProfileData {
  profile: UserProfile
  confidence: number // 0-100
  interests: string[]
  likelyBudget: 'low' | 'medium' | 'high' | 'unknown'
  conversionProbability: number // 0-100
  recommendedContent: string[]
}

export const useUserProfileDetection = (lang: Lang): UserProfileData => {
  const location = useLocation()
  const [behavior, setBehavior] = useState<UserBehavior>(() => {
    // Carregar do localStorage se existir
    const saved = localStorage.getItem('azimut_user_behavior')
    return saved ? JSON.parse(saved) : {
      pagesVisited: [],
      timeOnSite: 0,
      lastInteraction: new Date(),
      interactions: [],
      preferredLanguage: lang,
      deviceType: detectDeviceType()
    }
  })

  const [profile, setProfile] = useState<UserProfileData>({
    profile: 'unknown',
    confidence: 0,
    interests: [],
    likelyBudget: 'unknown',
    conversionProbability: 0,
    recommendedContent: []
  })

  // Detectar tipo de dispositivo
  function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  // Rastrear página visitada
  useEffect(() => {
    const currentPath = location.pathname
    
    setBehavior(prev => {
      const updated = {
        ...prev,
        pagesVisited: [...prev.pagesVisited, currentPath],
        lastInteraction: new Date()
      }
      
      // Salvar no localStorage
      localStorage.setItem('azimut_user_behavior', JSON.stringify(updated))
      
      return updated
    })
  }, [location.pathname])

  // Rastrear tempo no site
  useEffect(() => {
    const interval = setInterval(() => {
      setBehavior(prev => ({
        ...prev,
        timeOnSite: prev.timeOnSite + 1
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ALGORITMO DE DETECÇÃO DE PERFIL
  useEffect(() => {
    const detectProfile = (): UserProfileData => {
      const { pagesVisited, timeOnSite, interactions, preferredLanguage } = behavior
      
      let detectedProfile: UserProfile = 'unknown'
      let confidence = 0
      let interests: string[] = []
      let likelyBudget: 'low' | 'medium' | 'high' | 'unknown' = 'unknown'
      let conversionProbability = 0
      let recommendedContent: string[] = []

      // ═══════════════════════════════════════════════════════════
      // REGRA 1: ESTUDANTE
      // ═══════════════════════════════════════════════════════════
      const isStudent = 
        pagesVisited.some(p => p.includes('/academy')) ||
        pagesVisited.some(p => p.includes('/vancouver')) ||
        pagesVisited.some(p => p.includes('/courses'))

      if (isStudent) {
        detectedProfile = 'student'
        confidence = 70
        interests.push('Education', 'Vancouver', 'VanArts', 'VFS')
        likelyBudget = 'low'
        conversionProbability = 55
        recommendedContent = [
          '/academy/vancouver',
          '/academy/courses',
          '/academy/quiz'
        ]

        // Aumentar confiança se passou mais tempo
        if (timeOnSite > 60) confidence += 15
        if (pagesVisited.filter(p => p.includes('academy')).length > 2) confidence += 10
      }

      // ═══════════════════════════════════════════════════════════
      // REGRA 2: BUSINESS (Empresa/Projeto)
      // ═══════════════════════════════════════════════════════════
      const isBusiness =
        pagesVisited.some(p => p.includes('/start-project')) ||
        pagesVisited.some(p => p.includes('/work')) ||
        pagesVisited.some(p => p.includes('/solutions'))

      if (isBusiness) {
        detectedProfile = 'business'
        confidence = 75
        interests.push('VR/AR', 'Digital Experiences', 'Innovation')
        likelyBudget = 'medium'
        conversionProbability = 65
        recommendedContent = [
          '/start-project',
          '/work',
          '/solutions/virtual-reality'
        ]

        // Aumentar confiança se visitou pricing ou cases
        if (pagesVisited.some(p => p.includes('/work/'))) confidence += 10
        if (pagesVisited.some(p => p.includes('/contact'))) confidence += 15
        if (timeOnSite > 120) {
          confidence += 10
          likelyBudget = 'high'
          conversionProbability = 80
        }
      }

      // ═══════════════════════════════════════════════════════════
      // REGRA 3: CORPORATE (Grande empresa)
      // ═══════════════════════════════════════════════════════════
      const isCorporate =
        pagesVisited.some(p => p.includes('/solutions/corporate')) ||
        pagesVisited.some(p => p.includes('/academy/corporate')) ||
        (behavior.deviceType === 'desktop' && timeOnSite > 180)

      if (isCorporate) {
        detectedProfile = 'corporate'
        confidence = 80
        interests.push('Corporate Training', 'Enterprise Solutions', 'Scale')
        likelyBudget = 'high'
        conversionProbability = 75
        recommendedContent = [
          '/solutions/corporate',
          '/academy/corporate',
          '/start-project'
        ]
      }

      // ═══════════════════════════════════════════════════════════
      // REGRA 4: AGÊNCIA (Parceiro)
      // ═══════════════════════════════════════════════════════════
      const isAgency =
        pagesVisited.some(p => p.includes('/studio')) ||
        pagesVisited.some(p => p.includes('/work')) &&
        pagesVisited.length > 5

      if (isAgency) {
        detectedProfile = 'agency'
        confidence = 70
        interests.push('Partnership', 'White Label', 'B2B')
        likelyBudget = 'medium'
        conversionProbability = 60
        recommendedContent = [
          '/studio',
          '/work',
          '/contact'
        ]
      }

      // ═══════════════════════════════════════════════════════════
      // REGRA 5: INVESTIDOR
      // ═══════════════════════════════════════════════════════════
      const isInvestor =
        pagesVisited.some(p => p.includes('/about')) &&
        pagesVisited.some(p => p.includes('/work')) &&
        timeOnSite > 240

      if (isInvestor) {
        detectedProfile = 'investor'
        confidence = 65
        interests.push('Investment', 'Growth', 'Portfolio')
        likelyBudget = 'high'
        conversionProbability = 40
        recommendedContent = [
          '/about',
          '/work',
          '/contact'
        ]
      }

      // ═══════════════════════════════════════════════════════════
      // AJUSTES BASEADOS EM COMPORTAMENTO
      // ═══════════════════════════════════════════════════════════
      
      // Horário comercial = mais provável ser business
      const hour = new Date().getHours()
      if (hour >= 9 && hour <= 18 && detectedProfile === 'business') {
        confidence += 5
        conversionProbability += 5
      }

      // Mobile = mais provável ser estudante
      if (behavior.deviceType === 'mobile' && detectedProfile === 'student') {
        confidence += 5
      }

      // Idioma PT + BR region = mais provável ser business
      if (preferredLanguage === 'pt' && detectedProfile === 'business') {
        confidence += 5
      }

      // Cap confidence at 95 (nunca 100% certeza)
      confidence = Math.min(confidence, 95)
      conversionProbability = Math.min(conversionProbability, 95)

      return {
        profile: detectedProfile,
        confidence,
        interests,
        likelyBudget,
        conversionProbability,
        recommendedContent
      }
    }

    const detected = detectProfile()
    setProfile(detected)

  }, [behavior])

  return profile
}

// ════════════════════════════════════════════════════════════
// FUNÇÕES AUXILIARES
// ════════════════════════════════════════════════════════════

export const trackInteraction = (
  type: 'click' | 'scroll' | 'hover' | 'form_start' | 'video_watch',
  target: string
) => {
  const saved = localStorage.getItem('azimut_user_behavior')
  if (!saved) return

  const behavior: UserBehavior = JSON.parse(saved)
  behavior.interactions.push({
    type,
    target,
    timestamp: new Date()
  })

  localStorage.setItem('azimut_user_behavior', JSON.stringify(behavior))
}

export const getUserInsights = (profile: UserProfileData, lang: Lang): string[] => {
  const insights: Record<UserProfile, Record<Lang, string[]>> = {
    student: {
      pt: [
        'Você parece interessado em estudar em Vancouver! 🎓',
        'Posso te ajudar a escolher entre VanArts e VFS',
        'Temos bolsas e descontos disponíveis'
      ],
      en: [
        'You seem interested in studying in Vancouver! 🎓',
        'I can help you choose between VanArts and VFS',
        'We have scholarships and discounts available'
      ],
      es: [
        '¡Pareces interesado en estudiar en Vancouver! 🎓',
        'Puedo ayudarte a elegir entre VanArts y VFS',
        'Tenemos becas y descuentos disponibles'
      ],
      fr: [
        'Vous semblez intéressé par étudier à Vancouver! 🎓',
        'Je peux vous aider à choisir entre VanArts et VFS',
        'Nous avons des bourses et des réductions disponibles'
      ]
    },
    business: {
      pt: [
        'Vejo que você está explorando nossos projetos! 💼',
        'Posso recomendar soluções específicas para seu negócio',
        'Temos cases de sucesso no seu setor'
      ],
      en: [
        'I see you are exploring our projects! 💼',
        'I can recommend specific solutions for your business',
        'We have success stories in your sector'
      ],
      es: [
        '¡Veo que estás explorando nuestros proyectos! 💼',
        'Puedo recomendar soluciones específicas para tu negocio',
        'Tenemos casos de éxito en tu sector'
      ],
      fr: [
        'Je vois que vous explorez nos projets! 💼',
        'Je peux recommander des solutions spécifiques pour votre entreprise',
        'Nous avons des success stories dans votre secteur'
      ]
    },
    corporate: {
      pt: [
        'Empresas como a sua confiam na Azimut 🏢',
        'Posso agendar uma consultoria executiva',
        'Oferecemos soluções enterprise personalizadas'
      ],
      en: [
        'Companies like yours trust Azimut 🏢',
        'I can schedule an executive consultation',
        'We offer custom enterprise solutions'
      ],
      es: [
        'Empresas como la tuya confían en Azimut 🏢',
        'Puedo agendar una consultoría ejecutiva',
        'Ofrecemos soluciones enterprise personalizadas'
      ],
      fr: [
        'Des entreprises comme la vôtre font confiance à Azimut 🏢',
        'Je peux planifier une consultation executive',
        'Nous proposons des solutions enterprise personnalisées'
      ]
    },
    agency: {
      pt: [
        'Interessado em parceria? Vamos conversar! 🤝',
        'Temos programas white-label para agências',
        'Posso mostrar casos de parceiros de sucesso'
      ],
      en: [
        'Interested in partnership? Let\'s talk! 🤝',
        'We have white-label programs for agencies',
        'I can show successful partner cases'
      ],
      es: [
        '¿Interesado en asociación? ¡Hablemos! 🤝',
        'Tenemos programas white-label para agencias',
        'Puedo mostrar casos de socios exitosos'
      ],
      fr: [
        'Intéressé par un partenariat? Parlons-en! 🤝',
        'Nous avons des programmes white-label pour agences',
        'Je peux montrer des cas de partenaires réussis'
      ]
    },
    investor: {
      pt: [
        'Obrigado pelo interesse na Azimut! 📊',
        'Posso conectar você com nosso time executivo',
        'Temos materiais exclusivos para investidores'
      ],
      en: [
        'Thank you for your interest in Azimut! 📊',
        'I can connect you with our executive team',
        'We have exclusive materials for investors'
      ],
      es: [
        '¡Gracias por tu interés en Azimut! 📊',
        'Puedo conectarte con nuestro equipo ejecutivo',
        'Tenemos materiales exclusivos para inversores'
      ],
      fr: [
        'Merci de votre intérêt pour Azimut! 📊',
        'Je peux vous connecter avec notre équipe executive',
        'Nous avons des matériaux exclusifs pour investisseurs'
      ]
    },
    unknown: {
      pt: [
        'Bem-vindo à Azimut! Como posso ajudar? 👋',
        'Estou aqui para responder suas dúvidas',
        'Posso recomendar conteúdo relevante para você'
      ],
      en: [
        'Welcome to Azimut! How can I help? 👋',
        'I\'m here to answer your questions',
        'I can recommend relevant content for you'
      ],
      es: [
        '¡Bienvenido a Azimut! ¿Cómo puedo ayudar? 👋',
        'Estoy aquí para responder tus preguntas',
        'Puedo recomendar contenido relevante para ti'
      ],
      fr: [
        'Bienvenue à Azimut! Comment puis-je aider? 👋',
        'Je suis ici pour répondre à vos questions',
        'Je peux recommander du contenu pertinent pour vous'
      ]
    }
  }

  return insights[profile.profile]?.[lang] || insights.unknown[lang]
}
