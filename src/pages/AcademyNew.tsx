// ════════════════════════════════════════════════════════════
// ACADEMY HUB - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════
// Página principal da Academy com estrutura visual completa
// Placeholders para imagens/vídeos que virão do backoffice
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
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

const AcademyNew: React.FC<AcademyProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()
  const { theme } = useTheme()

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

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>
      
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
        background: 'var(--theme-bg-primary)',
        marginTop: '-80px' 
      }}>
        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION - Video Background
            ═══════════════════════════════════════════════════════════
            📹 PLACEHOLDER: Vídeo institucional Academy
            Backoffice: /admin/academy/settings → "Hero Video URL"
            ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image/Video (PLACEHOLDER) */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: theme === 'dark' ? 'brightness(0.85) contrast(1.1)' : 'brightness(1.15) contrast(0.95) saturate(0.9)'
              }}
            >
              {/* ═══════════════════════════════════════════════════════════
                  CURADORIA DE ARTE - Overlays Cinematográficos Premium
                  ═══════════════════════════════════════════════════════ */}
              
              {/* Tema Escuro: Overlay mais sutil - revela mais a imagem */}
              {theme === 'dark' && (
                <>
                  {/* Camada 1: Gradiente vertical suave (menos agressivo) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
                  
                  {/* Camada 2: Vinheta radial cinematográfica (foco no centro) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(
                        ellipse 140% 120% at 50% 45%,
                        transparent 0%,
                        transparent 35%,
                        rgba(0, 0, 0, 0.2) 60%,
                        rgba(0, 0, 0, 0.5) 85%,
                        rgba(0, 0, 0, 0.75) 100%
                      )`
                    }}
                  />
                  
                  {/* Camada 3: Gradiente horizontal sutil (profundidade) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
                  
                  {/* Camada 4: Filtro de cor cinematográfico (tom quente sutil) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent" />
                </>
              )}
              
              {/* Tema Claro: Overlay equilibrado - não muito claro, mantém atmosfera */}
              {theme === 'light' && (
                <>
                  {/* Camada 1: Overlay bege suave (clareia mas preserva imagem) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1e8]/40 via-[#e8e5df]/35 to-[#d3cec3]/45" />
                  
                  {/* Camada 2: Vinheta artística - cria foco central (como galeria) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(
                        ellipse 150% 130% at 50% 50%,
                        transparent 0%,
                        transparent 45%,
                        rgba(30, 28, 26, 0.25) 70%,
                        rgba(20, 18, 16, 0.45) 85%,
                        rgba(10, 8, 6, 0.65) 100%
                      )`
                    }}
                  />
                  
                  {/* Camada 3: Gradiente vertical para profundidade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e1c1a]/30" />
                  
                  {/* Camada 4: Filtro de cor quente sutil (atmosfera premium) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-slate-900/15" />
                  
                  {/* Camada 5: Contraste adicional nas bordas (vinheta reforçada) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(
                        circle at 50% 50%,
                        transparent 30%,
                        rgba(0, 0, 0, 0.1) 60%,
                        rgba(0, 0, 0, 0.3) 100%
                      )`
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-8 animate-fade-in">
              <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
            </div>

            {/* Título - Curadoria de Arte: Tipografia Premium */}
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-handel uppercase tracking-wider mb-8 leading-none animate-fade-in-up"
              style={{ 
                color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                textShadow: theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.3)'
                  : '0 3px 10px rgba(0, 0, 0, 0.6), 0 6px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.4)',
                letterSpacing: '0.08em',
                fontWeight: 400
              }}
            >
              {t.hero.title}
            </h1>

            {/* Subtítulo - Hierarquia Visual Refinada */}
            <p 
              className="text-2xl md:text-4xl mb-6 font-light animate-fade-in-up animation-delay-100"
              style={{ 
                color: theme === 'dark' ? '#f0ece5' : '#e8e5df',
                textShadow: theme === 'dark'
                  ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                  : '0 2px 6px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.04em',
                lineHeight: '1.3'
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Descrição - Legibilidade Premium com Contraste Otimizado */}
            <p 
              className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
              style={{ 
                color: theme === 'dark' ? '#e2e8f0' : '#d3cec3',
                textShadow: theme === 'dark'
                  ? '0 1px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)'
                  : '0 2px 5px rgba(0, 0, 0, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.4)',
                letterSpacing: '0.02em',
                lineHeight: '1.7'
              }}
            >
              {t.hero.description}
            </p>

            {/* Scroll Indicator - Adaptativo por tema */}
            <div className="animate-bounce mt-16">
              <svg 
                className="w-8 h-8 mx-auto" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ 
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(245, 241, 232, 0.6)'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>
        
        {/* Estrela de fundo - detecta tema automaticamente */}
        {/* Posição: header + submenu + folga visual = 160px */}
        <StarBackground 
          className="top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          position="fixed"
          opacity={0.5}
          zIndex={-10}
        />

        {/* ═══════════════════════════════════════════════════════════
            NAVEGAÇÃO INTERNA - Sticky colado no header principal
            ═══════════════════════════════════════════════════════ */}
        <div 
          className="sticky z-40 backdrop-blur-xl"
          style={{
            top: '80px',
            backgroundColor: 'var(--theme-bg-sticky)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderTop: '1px solid rgba(201, 35, 55, 0.3)',
            borderBottom: '1px solid rgba(201, 35, 55, 0.3)',
            marginTop: '-80px',
            paddingTop: '80px'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <InternalNavigation
              items={[
                { id: 'all', label: lang === 'pt' ? 'Visão Geral' : lang === 'es' ? 'Visión General' : lang === 'fr' ? 'Aperçu' : 'Overview', href: '/academy', icon: '🎓' },
                { id: 'vancouver', label: 'Vancouver', href: '/academy/vancouver', icon: '🇨🇦' },
                { id: 'courses', label: lang === 'pt' ? 'Cursos' : lang === 'es' ? 'Cursos' : lang === 'fr' ? 'Cours' : 'Courses', href: '/academy/courses', icon: '📚' },
                { id: 'workshops', label: 'Workshops', href: '/academy/workshops', icon: '🎬' },
                { id: 'corporate', label: lang === 'pt' ? 'Corporativo' : lang === 'es' ? 'Corporativo' : lang === 'fr' ? 'Entreprise' : 'Corporate', href: '/academy/corporate', icon: '🏢' }
              ]}
              lang={lang}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PROGRAMS GRID - 4 Programas Premium
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Imagens dos programas
            Backoffice: /admin/academy/programs → cada programa tem imagem
            ═══════════════════════════════════════════════════════ */}
        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {t.sections.map((section: AcademySection, idx: number) => (
                <Link
                  key={section.id}
                  to={`/${lang}${section.link}`}
                  className="group relative card-adaptive rounded-2xl overflow-hidden border border-white/10 hover:border-azimut-red/50 transition-all duration-700 hover:shadow-2xl hover:shadow-azimut-red/20 hover:-translate-y-3"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  {/* Image/Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-800 to-black">
                    {/* Ícone decorativo - Imagens do backoffice serão adicionadas quando disponíveis */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-9xl opacity-20 group-hover:scale-110 transition-transform duration-700">
                        {section.icon}
                      </span>
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-azimut-red/90 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                        {section.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl">{section.icon}</span>
                      <h3 className="text-3xl font-handel uppercase tracking-wider group-hover:text-azimut-red transition-colors" style={{ color: 'var(--theme-text)' }}>
                        {section.title}
                      </h3>
                    </div>

                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
                      {section.description}
                    </p>

                    {/* Highlight (se existir) */}
                    {section.highlight && (
                      <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
                        <p className="text-green-400 text-sm font-semibold">
                          💰 {section.highlight}
                        </p>
                      </div>
                    )}

                    {/* CTA Arrow */}
                    <div className="flex items-center gap-2 text-azimut-red font-semibold group-hover:gap-4 transition-all">
                      <span className="uppercase tracking-wider text-sm">
                        {lang === 'pt' ? 'Saiba Mais' : lang === 'en' ? 'Learn More' : lang === 'es' ? 'Saber Más' : 'En Savoir Plus'}
                      </span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
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
                  <div className={`text-sm md:text-base uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
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
                  <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
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
