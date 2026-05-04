// ════════════════════════════════════════════════════════════
// ACADEMY HUB - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════
// Página principal da Academy com estrutura visual completa
// Os 4 cards (Vancouver, Cursos, Workshops, Corporate) vêm do backoffice quando disponíveis
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import StarBackground from '../components/StarBackground'
import InternalNavigation from '../components/InternalNavigation'
import CanadaMapleLeaf from '../components/CanadaMapleLeaf'
import { CourseSchema } from '../components/StructuredData'
import { useTheme } from '../contexts/ThemeContext'
import { PageFooterNavigation } from '../components/PageFooterNavigation'

interface AcademyProps {
  lang: Lang
}

// Interface TypeScript para conteúdo da Academy
interface AcademySection {
  id: string
  icon: string
  title: string
  description: string
  link: string
  badge: string
  highlight?: string
}

interface AcademyStat {
  value: string
  label: string
}

/** Seção da landing Academy vinda do backoffice (imagem + textos) */
interface AcademyLandingSection {
  slug: string
  name: string
  heroImageUrl: string | null
  heroSlogan: { pt?: string | null; en?: string | null }
  heroSubtitle: { pt?: string | null; en?: string | null }
  heroDescription: { pt?: string | null; en?: string | null }
}

interface AcademyContent {
  meta: {
    title: string
    description: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
  }
  sections: AcademySection[]
  statsSection: {
    title: string
    stats: AcademyStat[]
  }
  credibility: {
    title: string
    items: string[]
  }
  cta: {
    title: string
    subtitle: string
    button: string
  }
}

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

const AcademyNew: React.FC<AcademyProps> = ({ lang }) => {
  const { theme } = useTheme()
  const [landingSections, setLandingSections] = useState<AcademyLandingSection[]>([])

  // Buscar os 4 cards da Academy no backoffice (imagens e textos) para exibir no site
  useEffect(() => {
    let cancelled = false
    fetch(`${BACKOFFICE_URL}/api/public/academy/landing-sections`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { sections?: AcademyLandingSection[] } | null) => {
        if (cancelled || !data?.sections) return
        setLandingSections(data.sections)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // ═══════════════════════════════════════════════════════════
  // CONTEÚDO POR IDIOMA
  // ═══════════════════════════════════════════════════════════
  const content: Record<Lang, AcademyContent> = {
    pt: {
      meta: {
        title: 'Azimut Academy - Educação de Excelência',
        description: 'Cursos, workshops, treinamentos corporativos e agente educacional para Vancouver. 30 anos de experiência em tecnologias imersivas e produção audiovisual.'
      },
      hero: {
        badge: '🎓 Educação & Formação',
        title: 'Azimut Academy',
        subtitle: 'Forme-se com quem tem 30 anos de mercado',
        description: 'Cursos, workshops, treinamentos corporativos e agente educacional para Vancouver. Educação de excelência em tecnologias imersivas, IA e produção audiovisual.'
      },
      
      sections: [
        {
          id: 'vancouver',
          icon: '🇨🇦',
          title: 'Estudar em Vancouver',
          description: 'Agente oficial VFS/VanArts. Forme-se em 1 ano nas melhores escolas de mídia do Canadá com 90%+ empregabilidade.',
          link: '/academy/vancouver',
          badge: 'Internacional',
          highlight: 'Comissão: CAD 1.500-3.000 por aluno'
        },
        {
          id: 'courses',
          icon: '📚',
          title: 'Cursos',
          description: 'Formação profissional em audiovisual, VR, IA para marketing, game design e tecnologias imersivas.',
          link: '/academy/courses',
          badge: 'Profissionalizante'
        },
        {
          id: 'workshops',
          icon: '🎬',
          title: 'Workshops & Eventos',
          description: 'Mini cursos, palestras em festivais (Rio2C), workshops presenciais e online para produtores e agências.',
          link: '/academy/workshops',
          badge: 'Eventos'
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'Corporativo',
          description: 'Treinamentos customizados para empresas, governo, ONGs e instituições. Parcerias com SESC, SENAC e universidades.',
          link: '/academy/corporate',
          badge: 'B2B'
        }
      ],

      statsSection: {
        title: 'Nossa História Educacional',
        stats: [
          { value: '30+', label: 'Anos de Experiência' },
          { value: '14', label: 'Anos como Escola (2004-2018)' },
          { value: '500+', label: 'Alunos Formados' },
          { value: '4', label: 'Programas Ativos' }
        ]
      },

      credibility: {
        title: 'Credibilidade',
        items: [
          '🎓 Azimut School (2004-2018): Escola de animação e computação gráfica',
          '🔬 Pesquisadores associados UFRJ/ECO',
          '🇨🇦 Agente educacional oficial VFS e VanArts',
          '👨‍🏫 Professores doutores e coordenadores de pós-graduação'
        ]
      },

      cta: {
        title: 'Pronto para Começar?',
        subtitle: 'Escolha o programa ideal para você ou sua empresa',
        button: 'Falar com Consultor'
      }
    },
    en: {
      meta: {
        title: 'Azimut Academy - Excellence in Education',
        description: 'Courses, workshops, corporate training and educational agent for Vancouver. 30 years of experience in immersive technologies and audiovisual production.'
      },
      hero: {
        badge: '🎓 Education & Training',
        title: 'Azimut Academy',
        subtitle: 'Learn from 30 years of industry experience',
        description: 'Courses, workshops, corporate training and educational agent for Vancouver. Excellence in immersive technologies, AI and audiovisual production.'
      },
      
      sections: [
        {
          id: 'vancouver',
          icon: '🇨🇦',
          title: 'Study in Vancouver',
          description: 'Official VFS/VanArts agent. Graduate in 1 year from Canada\'s top media schools with 90%+ employability.',
          link: '/academy/vancouver',
          badge: 'International',
          highlight: 'Commission: CAD 1,500-3,000 per student'
        },
        {
          id: 'courses',
          icon: '📚',
          title: 'Courses',
          description: 'Professional training in audiovisual, VR, AI for marketing, game design and immersive technologies.',
          link: '/academy/courses',
          badge: 'Professional'
        },
        {
          id: 'workshops',
          icon: '🎬',
          title: 'Workshops & Events',
          description: 'Mini courses, festival talks (Rio2C), in-person and online workshops for producers and agencies.',
          link: '/academy/workshops',
          badge: 'Events'
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'Corporate',
          description: 'Custom training for companies, government, NGOs and institutions. Partnerships with SESC, SENAC and universities.',
          link: '/academy/corporate',
          badge: 'B2B'
        }
      ],

      statsSection: {
        title: 'Our Educational History',
        stats: [
          { value: '30+', label: 'Years of Experience' },
          { value: '14', label: 'Years as School (2004-2018)' },
          { value: '500+', label: 'Alumni' },
          { value: '4', label: 'Active Programs' }
        ]
      },

      credibility: {
        title: 'Credibility',
        items: [
          '🎓 Azimut School (2004-2018): Animation and computer graphics school',
          '🔬 Associate researchers UFRJ/ECO',
          '🇨🇦 Official educational agent VFS and VanArts',
          '👨‍🏫 PhD professors and postgraduate coordinators'
        ]
      },

      cta: {
        title: 'Ready to Start?',
        subtitle: 'Choose the ideal program for you or your company',
        button: 'Talk to Consultant'
      }
    },
    es: {
      meta: {
        title: 'Azimut Academy - Educación de Excelencia',
        description: 'Cursos, workshops, capacitación corporativa y agente educacional para Vancouver. 30 años de experiencia en tecnologías inmersivas y producción audiovisual.'
      },
      hero: {
        badge: '🎓 Educación y Formación',
        title: 'Azimut Academy',
        subtitle: 'Fórmate con quien tiene 30 años de mercado',
        description: 'Cursos, workshops, capacitación corporativa y agente educacional para Vancouver. Educación de excelencia en tecnologías inmersivas, IA y producción audiovisual.'
      },
      
      sections: [
        {
          id: 'vancouver',
          icon: '🇨🇦',
          title: 'Estudiar en Vancouver',
          description: 'Agente oficial VFS/VanArts. Fórmate en 1 año en las mejores escuelas de medios de Canadá con 90%+ empleabilidad.',
          link: '/academy/vancouver',
          badge: 'Internacional',
          highlight: 'Comisión: CAD 1.500-3.000 por alumno'
        },
        {
          id: 'courses',
          icon: '📚',
          title: 'Cursos',
          description: 'Formación profesional en audiovisual, VR, IA para marketing, game design y tecnologías inmersivas.',
          link: '/academy/courses',
          badge: 'Profesional'
        },
        {
          id: 'workshops',
          icon: '🎬',
          title: 'Workshops y Eventos',
          description: 'Mini cursos, charlas en festivales (Rio2C), workshops presenciales y online para productores y agencias.',
          link: '/academy/workshops',
          badge: 'Eventos'
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'Corporativo',
          description: 'Capacitaciones personalizadas para empresas, gobierno, ONGs e instituciones. Asociaciones con SESC, SENAC y universidades.',
          link: '/academy/corporate',
          badge: 'B2B'
        }
      ],

      statsSection: {
        title: 'Nuestra Historia Educacional',
        stats: [
          { value: '30+', label: 'Años de Experiencia' },
          { value: '14', label: 'Años como Escuela (2004-2018)' },
          { value: '500+', label: 'Alumnos Formados' },
          { value: '4', label: 'Programas Activos' }
        ]
      },

      credibility: {
        title: 'Credibilidad',
        items: [
          '🎓 Azimut School (2004-2018): Escuela de animación y computación gráfica',
          '🔬 Investigadores asociados UFRJ/ECO',
          '🇨🇦 Agente educacional oficial VFS y VanArts',
          '👨‍🏫 Profesores doctores y coordinadores de posgrado'
        ]
      },

      cta: {
        title: '¿Listo para Comenzar?',
        subtitle: 'Elige el programa ideal para ti o tu empresa',
        button: 'Hablar con Consultor'
      }
    },
    fr: {
      meta: {
        title: 'Azimut Academy - Excellence en Éducation',
        description: 'Cours, ateliers, formation corporative et agent éducatif pour Vancouver. 30 ans d\'expérience en technologies immersives et production audiovisuelle.'
      },
      hero: {
        badge: '🎓 Éducation & Formation',
        title: 'Azimut Academy',
        subtitle: 'Formez-vous avec 30 ans d\'expérience',
        description: 'Cours, ateliers, formation corporative et agent éducatif pour Vancouver. Excellence en technologies immersives, IA et production audiovisuelle.'
      },
      
      sections: [
        {
          id: 'vancouver',
          icon: '🇨🇦',
          title: 'Étudier à Vancouver',
          description: 'Agent officiel VFS/VanArts. Diplômez en 1 an des meilleures écoles de médias au Canada avec 90%+ d\'employabilité.',
          link: '/academy/vancouver',
          badge: 'International',
          highlight: 'Commission: CAD 1.500-3.000 par étudiant'
        },
        {
          id: 'courses',
          icon: '📚',
          title: 'Cours',
          description: 'Formation professionnelle en audiovisuel, VR, IA pour marketing, game design et technologies immersives.',
          link: '/academy/courses',
          badge: 'Professionnel'
        },
        {
          id: 'workshops',
          icon: '🎬',
          title: 'Ateliers & Événements',
          description: 'Mini cours, conférences dans festivals (Rio2C), ateliers en personne et en ligne pour producteurs et agences.',
          link: '/academy/workshops',
          badge: 'Événements'
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'Corporatif',
          description: 'Formations personnalisées pour entreprises, gouvernement, ONG et institutions. Partenariats avec SESC, SENAC et universités.',
          link: '/academy/corporate',
          badge: 'B2B'
        }
      ],

      statsSection: {
        title: 'Notre Histoire Éducative',
        stats: [
          { value: '30+', label: 'Ans d\'Expérience' },
          { value: '14', label: 'Ans comme École (2004-2018)' },
          { value: '500+', label: 'Diplômés' },
          { value: '4', label: 'Programmes Actifs' }
        ]
      },

      credibility: {
        title: 'Crédibilité',
        items: [
          '🎓 Azimut School (2004-2018): École d\'animation et infographie',
          '🔬 Chercheurs associés UFRJ/ECO',
          '🇨🇦 Agent éducatif officiel VFS et VanArts',
          '👨‍🏫 Professeurs docteurs et coordinateurs de troisième cycle'
        ]
      },

      cta: {
        title: 'Prêt à Commencer?',
        subtitle: 'Choisissez le programme idéal pour vous ou votre entreprise',
        button: 'Parler avec un Consultant'
      }
    }
  }

  const t = content[lang] || content.pt

  /** Imagem local do card «Vancouver» (instalação interativa) quando o CMS não define hero */
  const DEFAULT_ACADEMY_CARD_IMAGES: Partial<Record<string, string>> = {
    vancouver: '/images/academy/vancouver-card.png',
  }

  // Para cada card, pegar dados do backoffice quando existirem (slug: academy/vancouver, academy/courses, etc.)
  const getBackofficeSection = (sectionId: string) =>
    landingSections.find((s) => s.slug === `academy/${sectionId}`)
  const textFromBackoffice = (s: AcademyLandingSection | undefined, field: 'heroSlogan' | 'heroSubtitle' | 'heroDescription') => {
    if (!s) return null
    const obj = s[field]
    if (!obj) return null
    const val = (obj as Record<string, string | null | undefined>)[lang] ?? (obj as Record<string, string | null | undefined>).pt ?? (obj as Record<string, string | null | undefined>).en
    return val && String(val).trim() ? val : null
  }

  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.description}
        url={`/${lang}/academy`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        keywords="Azimut Academy, cursos, workshops, Vancouver, VFS, VanArts, VR, AR, animação, VFX, game design, treinamento corporativo"
      />
      {/* Course Schema para SEO */}
      <CourseSchema
        name={lang === 'pt' ? 'Azimut Academy - Cursos Profissionais' : lang === 'en' ? 'Azimut Academy - Professional Courses' : lang === 'es' ? 'Azimut Academy - Cursos Profesionales' : 'Azimut Academy - Cours Professionnels'}
        description={t.meta.description}
        provider="Azimut Academy"
        educationalLevel="Professional"
        teaches={[
          'Virtual Reality',
          'Augmented Reality',
          'VFX',
          'Animation',
          'Game Design',
          'Audiovisual Production',
          'AI for Marketing'
        ]}
        lang={lang}
      />

      <div className="min-h-screen" style={{ 
        background: 'var(--theme-bg-primary)'
      }}>
        {/* ═══════════════════════════════════════════════════════════
            NAVEGAÇÃO INTERNA - FIXO colado no header (PADRONIZADO com WhatWeDo/Studio)
            ═══════════════════════════════════════════════════════════ */}
        <div 
          className="fixed left-0 right-0 z-40 backdrop-blur-xl submenu-nav"
          style={{
            top: '52px'
          }}
        >
          <div className="mx-auto max-w-7xl w-full sm:px-4 min-[768px]:px-6 py-3 flex justify-center">
            <InternalNavigation
              items={[
                { id: 'courses', label: lang === 'pt' ? 'Cursos' : lang === 'es' ? 'Cursos' : lang === 'fr' ? 'Cours' : 'Courses', href: '/academy/courses', icon: '📚' },
                { id: 'workshops', label: 'Workshops', href: '/academy/workshops', icon: '🎬' },
                { id: 'corporate', label: lang === 'pt' ? 'Corporativo' : lang === 'es' ? 'Corporativo' : lang === 'fr' ? 'Entreprise' : 'Corporate', href: '/academy/corporate', icon: '🏢' },
                { id: 'vancouver', label: 'Vancouver', href: '/academy/vancouver', icon: '🇨🇦' }
              ]}
              lang={lang}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION - CURADORIA PREMIUM (rostos visíveis, texto legível)
            ═══════════════════════════════════════════════════════════
            📹 PLACEHOLDER: Vídeo institucional Academy
            Backoffice: /admin/academy/settings → "Hero Video URL"
            ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[58vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden pt-0 pb-0">
          {/* Background Image/Video (PLACEHOLDER) - rostos visíveis */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 35%',
                filter: theme === 'dark' ? 'brightness(0.88) contrast(1.12)' : 'brightness(1.05) contrast(1.08) saturate(0.92)'
              }}
            >
              {/* ═══════════════════════════════════════════════════════════
                  CURADORIA DE ARTE PREMIUM - Overlays cinematográficos
                  ═══════════════════════════════════════════════════════ */}
              
              {/* Tema Escuro: Degradê azul leve (versão anterior que estava boa) */}
              {theme === 'dark' && (
                <>
                  {/* Camada 1: Revela a imagem no topo (rostos visíveis) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                  
                  {/* Camada 2: Degradê azul sutil (identidade Academy no escuro) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        rgba(37, 99, 235, 0.08) 0%,
                        rgba(59, 130, 246, 0.12) 40%,
                        rgba(30, 58, 138, 0.20) 100%
                      )`
                    }}
                  />
                  
                  {/* Camada 3: Vinheta lateral para profundidade */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                  
                  {/* Camada 4: Área de leitura (degradê escuro embaixo) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.85) 0%,
                        rgba(0, 0, 0, 0.50) 30%,
                        transparent 55%
                      )`
                    }}
                  />
                </>
              )}
              
              {/* Tema Claro: LUXURY PREMIUM - Tons neutros quentes (charcoal/slate/beige) + granulação */}
              {theme === 'light' && (
                <>
                  {/* Camada 1: Base CHARCOAL/SLATE (neutro premium - não rosa) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        transparent 0%,
                        transparent 20%,
                        rgba(72, 66, 60, 0.10) 40%,
                        rgba(58, 52, 46, 0.25) 55%,
                        rgba(42, 38, 34, 0.50) 70%,
                        rgba(28, 25, 22, 0.80) 85%,
                        rgba(18, 16, 14, 0.95) 100%
                      )`
                    }}
                  />
                  
                  {/* Camada 2: Base MUITO ESCURA (charcoal profundo) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to top,
                        rgba(12, 11, 10, 0.98) 0%,
                        rgba(22, 20, 18, 0.92) 15%,
                        rgba(42, 38, 34, 0.70) 35%,
                        rgba(72, 66, 60, 0.40) 55%,
                        rgba(105, 95, 85, 0.18) 70%,
                        transparent 85%
                      )`
                    }}
                  />
                  
                  {/* Camada 3: VINHETA CINEMATOGRÁFICA - Escurecimento nas bordas */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#18120e]/45 via-transparent to-[#18120e]/45"
                  />
                  
                  {/* Camada 4: Vinheta radial (foco no centro) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(
                        ellipse 110% 90% at 50% 50%,
                        transparent 0%,
                        transparent 45%,
                        rgba(18, 16, 14, 0.22) 70%,
                        rgba(14, 12, 10, 0.45) 85%,
                        rgba(10, 9, 8, 0.65) 100%
                      )`
                    }}
                  />
                  
                  {/* Camada 5: Warmth sutil (bege/taupe - não rosa) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        transparent 0%,
                        transparent 35%,
                        rgba(120, 105, 90, 0.06) 55%,
                        rgba(95, 82, 70, 0.08) 70%,
                        transparent 85%
                      )`
                    }}
                  />
                  
                  {/* Camada 6: GRANULAÇÃO CINEMATOGRÁFICA (film grain) */}
                  <div 
                    className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px'
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Content - Pílula e título no mesmo container para alinhamento perfeito */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-16 pb-12 md:pt-20 md:pb-16">
              {/* Container centralizado para pílula + título */}
              <div className="flex flex-col items-center">
                {/* Container inline para alinhar pílula com início do título */}
                <div className="inline-flex flex-col items-start">
                  {/* Badge Premium - Alinhado com lateral esquerda do título */}
                  <div 
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 backdrop-blur-md animate-fade-in"
                    style={theme === 'dark' ? {
                      background: 'rgba(23, 37, 84, 0.55)',
                      border: '1px solid rgba(30, 58, 138, 0.70)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.20)'
                    } : {
                      background: 'rgba(201, 35, 55, 0.50)',
                      border: '1px solid rgba(201, 35, 55, 0.70)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                    }}
                  >
                    <span 
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ 
                        color: '#ffffff',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      {t.hero.badge}
                    </span>
                  </div>

                  {/* Título - mesmo container da pílula para alinhamento */}
                  <h1 
                    className="text-5xl md:text-7xl lg:text-8xl font-handel uppercase tracking-wider leading-none animate-fade-in-up"
                    style={{ 
                      color: '#ffffff',
                      textShadow: theme === 'dark' 
                        ? '0 4px 18px rgba(0, 0, 0, 0.75), 0 8px 30px rgba(0, 0, 0, 0.55)'
                        : '0 4px 24px rgba(0, 0, 0, 0.85), 0 8px 40px rgba(0, 0, 0, 0.65)',
                      letterSpacing: '0.06em',
                      fontWeight: 400
                    }}
                  >
                    {t.hero.title}
                  </h1>
                </div>
              </div>
              
              {/* Margem após título */}
              <div className="h-2 md:h-4" />

              {/* Espaçador para baixar os textos */}
              <div className="h-8 md:h-12" />

              {/* Subtítulo - Mais abaixo */}
              <p 
                className="text-center text-xl md:text-2xl mb-5 font-light animate-fade-in-up animation-delay-100"
                style={{ 
                  color: '#ffffff',
                  textShadow: theme === 'dark'
                    ? '0 2px 10px rgba(0, 0, 0, 0.65)'
                    : '0 3px 14px rgba(0, 0, 0, 0.75), 0 6px 24px rgba(0, 0, 0, 0.55)',
                  letterSpacing: '0.02em',
                  lineHeight: '1.35'
                }}
              >
                {t.hero.subtitle}
              </p>

              {/* Descrição - Mais abaixo */}
              <p 
                className="text-center text-base md:text-lg max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
                style={{ 
                  color: '#ffffff',
                  textShadow: theme === 'dark'
                    ? '0 2px 8px rgba(0, 0, 0, 0.6)'
                    : '0 2px 12px rgba(0, 0, 0, 0.7), 0 4px 20px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.01em',
                  lineHeight: '1.65'
                }}
              >
                {t.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* Linha vermelha fina premium (1px) */}
        <div className="relative w-full h-[1px] overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #c92337 8%, #ff4757 25%, #e84858 50%, #ff4757 75%, #c92337 92%, transparent 100%)',
              opacity: 0.85
            }}
          />
        </div>
        
        {/* Estrela de fundo - detecta tema automaticamente */}
        {/* Posição: header + submenu + folga visual = 160px */}
        <StarBackground 
          className="top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          position="fixed"
          opacity={0.5}
          zIndex={-10}
        />

        {/* Navegação interna movida para o topo - ver div fixed acima */}

        {/* ═══════════════════════════════════════════════════════════
            PROGRAMS GRID - 4 Programas Premium
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Imagens dos programas
            Backoffice: /admin/academy/programs → cada programa tem imagem
            ═══════════════════════════════════════════════════════ */}
        <section className="py-12 relative overflow-hidden">
          {/* Background com granulação (não muito branco) */}
          <div className="absolute inset-0 -z-10">
            {/* Cor de fundo - escuro no dark, bege escurecido no claro */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: theme === 'dark' ? '#0a0908' : '#e8e0d5'
              }}
            />
            
            {/* Overlay sutil para escurecer mais (site claro) */}
            {theme === 'light' && (
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(42, 38, 34, 0.08) 0%, rgba(28, 25, 22, 0.12) 100%)'
                }}
              />
            )}
            
            {/* Granulação cinematográfica */}
            <div 
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px'
              }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {t.sections.map((section: AcademySection, idx: number) => {
                const backSection = getBackofficeSection(section.id)
                const cardImageUrl =
                  backSection?.heroImageUrl || DEFAULT_ACADEMY_CARD_IMAGES[section.id] || null
                const cardTitle = textFromBackoffice(backSection, 'heroSlogan') || textFromBackoffice(backSection, 'heroSubtitle') || section.title
                const cardDescription = textFromBackoffice(backSection, 'heroDescription') || section.description
                return (
                <Link
                  key={section.id}
                  to={`/${lang}${section.link}`}
                  className="group relative card-adaptive rounded-2xl overflow-hidden border border-azimut-red/20 hover:border-azimut-red/50 transition-all duration-500 hover:shadow-xl hover:shadow-azimut-red/15 hover:-translate-y-2 bg-gradient-to-b from-white/5 to-transparent dark:from-white/[0.04] dark:to-transparent"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  {/* Linha vermelha premium no topo do card */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-azimut-red to-transparent opacity-90 z-10" aria-hidden />
                  {/* Image/Video Thumbnail — imagem do backoffice ou placeholder */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900">
                    {cardImageUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url(${cardImageUrl})` }}
                        aria-hidden
                      />
                    ) : (
                      <>
                        <div 
                          className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity"
                          style={{
                            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,35,55,0.15) 0%, transparent 60%)'
                          }}
                          aria-hidden
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-8xl md:text-9xl opacity-25 group-hover:scale-110 transition-transform duration-500" aria-hidden>
                            {section.icon}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 transition-opacity" />
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-azimut-red/90 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                        {section.badge}
                      </span>
                    </div>
                    {/* Indicador de vídeo (opcional) — para cards que tiverem vídeo no backoffice */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                      <span className="text-2xl">▶</span>
                    </div>
                  </div>

                  {/* Content — texto do backoffice ou fallback local */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <span className="text-4xl md:text-5xl flex-shrink-0">{section.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-handel uppercase tracking-wider group-hover:text-azimut-red transition-colors" style={{ color: 'var(--theme-text)' }}>
                        {cardTitle}
                      </h3>
                    </div>

                    <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
                      {cardDescription}
                    </p>

                    {/* Highlight (ex.: Vancouver comissão) */}
                    {section.highlight && (
                      <div className="inline-block px-4 py-2 rounded-xl bg-azimut-red/10 border border-azimut-red/30 mb-4 md:mb-6">
                        <p className="text-azimut-red text-sm font-semibold">
                          💰 {section.highlight}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-azimut-red font-semibold group-hover:gap-4 transition-all">
                      <span className="uppercase tracking-wider text-sm">
                        {lang === 'pt' ? 'Saiba Mais' : lang === 'en' ? 'Learn More' : lang === 'es' ? 'Saber Más' : 'En Savoir Plus'}
                      </span>
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
              })}
            </div>

            {/* Depoimento — bloco único premium (paleta do site) */}
            <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
              <div 
                className="relative p-6 md:p-8 rounded-2xl border border-azimut-red/30"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(135deg, rgba(201, 35, 55, 0.1) 0%, rgba(26, 31, 44, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(201, 35, 55, 0.15) 0%, rgba(245, 241, 232, 0.95) 100%)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-azimut-red/60 to-transparent opacity-80" aria-hidden />
                {/* Texto escuro no tema claro para contraste com fundo claro */}
                <p className={`text-lg md:text-xl leading-relaxed italic mb-4 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                  {lang === 'pt' && '"A Azimut Academy une prática de mercado e método. Saí pronto para atuar em projetos imersivos."'}
                  {lang === 'en' && '"Azimut Academy combines real-world practice and method. I left ready to work on immersive projects."'}
                  {lang === 'es' && '"Azimut Academy une práctica de mercado y método. Salí listo para actuar en proyectos inmersivos."'}
                  {lang === 'fr' && '"Azimut Academy allie pratique du marché et méthode. J\'en suis sorti prêt à travailler sur des projets immersifs."'}
                </p>
                <p className="text-sm font-semibold text-azimut-red">
                  — {lang === 'pt' ? 'Ex-aluno' : lang === 'en' ? 'Alumni' : lang === 'es' ? 'Exalumno' : 'Ancien élève'}, Azimut Academy
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STATS SECTION - Nossa História
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-transparent via-azimut-red/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-handel uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>
                {t.statsSection.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.statsSection.stats.map((stat: AcademyStat, idx: number) => (
                <div 
                  key={idx}
                  className="text-center p-8 card-adaptive rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all hover:scale-105"
                >
                  <div className="text-5xl md:text-6xl font-handel text-azimut-red mb-3">
                    {stat.value}
                  </div>
                  {/* Texto sempre claro pois card-adaptive tem fundo escuro */}
                  <div className="text-sm md:text-base uppercase tracking-wider text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CREDIBILITY SECTION
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-5xl font-handel uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>
                {t.credibility.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.credibility.items.map((item: string, idx: number) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-6 card-adaptive rounded-xl border border-white/10 hover:border-azimut-red/30 transition-all"
                >
                  <div className="text-2xl flex-shrink-0">
                    {item.split(' ')[0]}
                  </div>
                  <p className="leading-relaxed" style={{ color: '#cbd5e1' }}>
                    {item.substring(item.indexOf(' ') + 1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navegação Final - Curada e Organizada (dentro de card, gap reduzido) */}
        <PageFooterNavigation
          lang={lang}
          compact={true}
          mainCta={{
            title: t.cta.title,
            description: t.cta.subtitle,
            buttonText: t.cta.button,
            buttonHref: `/contact`
          }}
          navigation={{
            previous: {
              label: lang === 'pt' ? 'Conhecer Estúdio' : lang === 'es' ? 'Conocer Estudio' : lang === 'fr' ? 'Découvrir Studio' : 'Meet Studio',
              href: '/studio',
              icon: '🏛️'
            },
            next: {
              label: lang === 'pt' ? 'Ver Cursos' : lang === 'es' ? 'Ver Cursos' : lang === 'fr' ? 'Voir Cours' : 'View Courses',
              href: '/what/educacao-treinamento',
              icon: '🎓'
            }
          }}
        />
      </div>
    </>
  )
}

export default AcademyNew
