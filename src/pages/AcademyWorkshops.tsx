// ════════════════════════════════════════════════════════════
// ACADEMY WORKSHOPS - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useTheme } from '../contexts/ThemeContext'
import { PageFooterNavigation } from '../components/PageFooterNavigation'
import AcademySubNav from '../components/AcademySubNav'
import { useBackofficeContent } from '../hooks/useBackofficeContent'

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br'

interface AcademyWorkshopsProps {
  lang: Lang
}

const AcademyWorkshops: React.FC<AcademyWorkshopsProps> = ({ lang }) => {
  const { theme } = useTheme()
  const [pastEventsSlots, setPastEventsSlots] = useState<Array<{ id: string; media?: { originalUrl?: string; thumbnailUrl?: string; mediumUrl?: string } }> | null>(null)

  // Backoffice content com fallback para conteúdo hardcoded
  const { page: backofficePage } = useBackofficeContent('academy/workshops', lang)

  // Past Events do backoffice (o site exibe o que está no backoffice)
  useEffect(() => {
    let cancelled = false
    fetch(`${BACKOFFICE_URL}/api/public/academy/past-events`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.slots) return
        setPastEventsSlots(data.slots)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const content: Record<Lang, any> = {
    pt: {
      meta: {
        title: 'Workshops Azimut Academy - Eventos e Palestras',
        description: 'Workshops presenciais e online, palestras em festivais (Rio2C), mini cursos para produtores e agências. Educação rápida e prática.'
      },
      hero: {
        badge: '🎬 Workshops & Eventos',
        title: 'Workshops & Palestras',
        subtitle: 'Aprenda rápido com especialistas',
        description: 'Mini cursos, palestras em festivais de cinema, workshops intensivos para produtores, agências e equipes. De 4h a 3 dias.'
      },
      formats: [
        {
          id: 'mini',
          icon: '⚡',
          title: 'Mini Cursos',
          duration: '4-8 horas',
          description: 'Workshops intensivos de um dia, focados em uma ferramenta ou técnica específica.',
          examples: ['Introdução ao VR', 'IA para Criação de Conteúdo', 'Motion Graphics Essentials']
        },
        {
          id: 'weekend',
          icon: '📅',
          title: 'Workshops de Fim de Semana',
          duration: '2-3 dias',
          description: 'Imersões completas em um tema, com projetos práticos e networking.',
          examples: ['Produção VR Completa', 'Unreal Engine Bootcamp', 'AI Video Production']
        },
        {
          id: 'festivals',
          icon: '🎪',
          title: 'Palestras em Festivais',
          duration: '1-2 horas',
          description: 'Participações em eventos como Rio2C, festivais de cinema e tech conferences.',
          examples: ['Rio2C', 'FEST', 'Campus Party', 'Anima Mundi']
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'In-Company',
          duration: 'Customizado',
          description: 'Workshops customizados na sua empresa, adaptados à necessidade da equipe.',
          examples: ['Google', 'Globo', 'Agências', 'Startups']
        }
      ],
      upcoming: {
        title: 'Próximos Eventos',
        events: [
          {
            id: 'vr-intro',
            title: 'Introdução à Produção VR',
            date: 'Março 2026',
            location: 'Online + Presencial RJ',
            duration: '8 horas',
            price: 'R$ 600',
            spots: '15 vagas'
          },
          {
            id: 'ai-marketing',
            title: 'IA Generativa para Marketing',
            date: 'Abril 2026',
            location: 'Online',
            duration: '6 horas',
            price: 'R$ 450',
            spots: '20 vagas'
          },
          {
            id: 'unreal-weekend',
            title: 'Unreal Engine Weekend',
            date: 'Maio 2026',
            location: 'Presencial RJ',
            duration: '16 horas (2 dias)',
            price: 'R$ 1.200',
            spots: '12 vagas'
          }
        ]
      },
      pastEvents: {
        title: 'Eventos Passados',
        subtitle: 'Veja alguns dos eventos e palestras que realizamos'
      },
      cta: {
        title: 'Quer um Workshop In-Company?',
        subtitle: 'Levamos nosso treinamento até sua empresa ou evento',
        button: 'Solicitar Orçamento'
      }
    },
    en: {
      meta: {
        title: 'Azimut Academy Workshops - Events & Lectures',
        description: 'In-person and online workshops, festival talks (Rio2C), mini courses for producers and agencies. Fast and practical education.'
      },
      hero: {
        badge: '🎬 Workshops & Events',
        title: 'Workshops & Lectures',
        subtitle: 'Learn fast with experts',
        description: 'Mini courses, film festival talks, intensive workshops for producers, agencies and teams. From 4h to 3 days.'
      },
      formats: [
        {
          id: 'mini',
          icon: '⚡',
          title: 'Mini Courses',
          duration: '4-8 hours',
          description: 'Intensive one-day workshops, focused on a specific tool or technique.',
          examples: ['Intro to VR', 'AI for Content Creation', 'Motion Graphics Essentials']
        },
        {
          id: 'weekend',
          icon: '📅',
          title: 'Weekend Workshops',
          duration: '2-3 days',
          description: 'Complete immersions in a topic, with practical projects and networking.',
          examples: ['Complete VR Production', 'Unreal Engine Bootcamp', 'AI Video Production']
        },
        {
          id: 'festivals',
          icon: '🎪',
          title: 'Festival Talks',
          duration: '1-2 hours',
          description: 'Participation in events like Rio2C, film festivals and tech conferences.',
          examples: ['Rio2C', 'FEST', 'Campus Party', 'Anima Mundi']
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'In-Company',
          duration: 'Customized',
          description: 'Customized workshops at your company, adapted to team needs.',
          examples: ['Google', 'Globo', 'Agencies', 'Startups']
        }
      ],
      upcoming: {
        title: 'Upcoming Events',
        events: [
          {
            id: 'vr-intro',
            title: 'Introduction to VR Production',
            date: 'March 2026',
            location: 'Online + In-person RJ',
            duration: '8 hours',
            price: 'USD 120',
            spots: '15 spots'
          },
          {
            id: 'ai-marketing',
            title: 'Generative AI for Marketing',
            date: 'April 2026',
            location: 'Online',
            duration: '6 hours',
            price: 'USD 90',
            spots: '20 spots'
          },
          {
            id: 'unreal-weekend',
            title: 'Unreal Engine Weekend',
            date: 'May 2026',
            location: 'In-person RJ',
            duration: '16 hours (2 days)',
            price: 'USD 240',
            spots: '12 spots'
          }
        ]
      },
      pastEvents: {
        title: 'Past Events',
        subtitle: 'See some of the events and talks we conducted'
      },
      cta: {
        title: 'Want an In-Company Workshop?',
        subtitle: 'We bring our training to your company or event',
        button: 'Request Quote'
      }
    },
    es: {
      meta: {
        title: 'Workshops Azimut Academy - Eventos y Conferencias',
        description: 'Workshops presenciales y online, charlas en festivales (Rio2C), mini cursos para productores y agencias. Educación rápida y práctica.'
      },
      hero: {
        badge: '🎬 Workshops y Eventos',
        title: 'Workshops y Conferencias',
        subtitle: 'Aprende rápido con expertos',
        description: 'Mini cursos, charlas en festivales de cine, workshops intensivos para productores, agencias y equipos. De 4h a 3 días.'
      },
      formats: [
        {
          id: 'mini',
          icon: '⚡',
          title: 'Mini Cursos',
          duration: '4-8 horas',
          description: 'Workshops intensivos de un día, enfocados en una herramienta o técnica específica.',
          examples: ['Introducción a VR', 'IA para Creación de Contenido', 'Motion Graphics Essentials']
        },
        {
          id: 'weekend',
          icon: '📅',
          title: 'Workshops de Fin de Semana',
          duration: '2-3 días',
          description: 'Inmersiones completas en un tema, con proyectos prácticos y networking.',
          examples: ['Producción VR Completa', 'Unreal Engine Bootcamp', 'AI Video Production']
        },
        {
          id: 'festivals',
          icon: '🎪',
          title: 'Charlas en Festivales',
          duration: '1-2 horas',
          description: 'Participaciones en eventos como Rio2C, festivales de cine y tech conferences.',
          examples: ['Rio2C', 'FEST', 'Campus Party', 'Anima Mundi']
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'In-Company',
          duration: 'Personalizado',
          description: 'Workshops personalizados en tu empresa, adaptados a las necesidades del equipo.',
          examples: ['Google', 'Globo', 'Agencias', 'Startups']
        }
      ],
      upcoming: {
        title: 'Próximos Eventos',
        events: [
          {
            id: 'vr-intro',
            title: 'Introducción a la Producción VR',
            date: 'Marzo 2026',
            location: 'Online + Presencial RJ',
            duration: '8 horas',
            price: 'USD 120',
            spots: '15 cupos'
          },
          {
            id: 'ai-marketing',
            title: 'IA Generativa para Marketing',
            date: 'Abril 2026',
            location: 'Online',
            duration: '6 horas',
            price: 'USD 90',
            spots: '20 cupos'
          },
          {
            id: 'unreal-weekend',
            title: 'Unreal Engine Weekend',
            date: 'Mayo 2026',
            location: 'Presencial RJ',
            duration: '16 horas (2 días)',
            price: 'USD 240',
            spots: '12 cupos'
          }
        ]
      },
      pastEvents: {
        title: 'Eventos Pasados',
        subtitle: 'Mira algunos de los eventos y charlas que realizamos'
      },
      cta: {
        title: '¿Quieres un Workshop In-Company?',
        subtitle: 'Llevamos nuestra capacitación a tu empresa o evento',
        button: 'Solicitar Cotización'
      }
    },
    fr: {
      meta: {
        title: 'Workshops Azimut Academy - Événements et Conférences',
        description: 'Workshops en personne et en ligne, conférences dans des festivals (Rio2C), mini cours pour producteurs et agences. Éducation rapide et pratique.'
      },
      hero: {
        badge: '🎬 Workshops & Événements',
        title: 'Workshops & Conférences',
        subtitle: 'Apprenez vite avec des experts',
        description: 'Mini cours, conférences de festivals de cinéma, workshops intensifs pour producteurs, agences et équipes. De 4h à 3 jours.'
      },
      formats: [
        {
          id: 'mini',
          icon: '⚡',
          title: 'Mini Cours',
          duration: '4-8 heures',
          description: 'Workshops intensifs d\'une journée, axés sur un outil ou une technique spécifique.',
          examples: ['Intro à VR', 'IA pour Création de Contenu', 'Motion Graphics Essentials']
        },
        {
          id: 'weekend',
          icon: '📅',
          title: 'Workshops de Week-end',
          duration: '2-3 jours',
          description: 'Immersions complètes dans un sujet, avec projets pratiques et networking.',
          examples: ['Production VR Complète', 'Unreal Engine Bootcamp', 'AI Video Production']
        },
        {
          id: 'festivals',
          icon: '🎪',
          title: 'Conférences dans des Festivals',
          duration: '1-2 heures',
          description: 'Participations à des événements comme Rio2C, festivals de cinéma et tech conferences.',
          examples: ['Rio2C', 'FEST', 'Campus Party', 'Anima Mundi']
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'In-Company',
          duration: 'Personnalisé',
          description: 'Workshops personnalisés dans votre entreprise, adaptés aux besoins de l\'équipe.',
          examples: ['Google', 'Globo', 'Agences', 'Startups']
        }
      ],
      upcoming: {
        title: 'Événements à Venir',
        events: [
          {
            id: 'vr-intro',
            title: 'Introduction à la Production VR',
            date: 'Mars 2026',
            location: 'En ligne + En personne RJ',
            duration: '8 heures',
            price: 'CAD 160',
            spots: '15 places'
          },
          {
            id: 'ai-marketing',
            title: 'IA Générative pour Marketing',
            date: 'Avril 2026',
            location: 'En ligne',
            duration: '6 heures',
            price: 'CAD 120',
            spots: '20 places'
          },
          {
            id: 'unreal-weekend',
            title: 'Unreal Engine Week-end',
            date: 'Mai 2026',
            location: 'En personne RJ',
            duration: '16 heures (2 jours)',
            price: 'CAD 320',
            spots: '12 places'
          }
        ]
      },
      pastEvents: {
        title: 'Événements Passés',
        subtitle: 'Voyez quelques événements et conférences que nous avons réalisés'
      },
      cta: {
        title: 'Vous voulez un Workshop In-Company?',
        subtitle: 'Nous apportons notre formation à votre entreprise ou événement',
        button: 'Demander un Devis'
      }
    }
  }

  const t = content[lang] || content.pt

  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.description}
        url={`/${lang}/academy/workshops`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        keywords="workshops Azimut Academy, palestras, mini cursos, festivais, Rio2C, formação"
      />
      {/* Menu Secundário Academy */}
      <AcademySubNav lang={lang} currentPage="workshops" />

      <div className="min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════
            HERO PREMIUM - Contraste melhorado + Imagem visível + Badge azul
            ═══════════════════════════════════════════════════════════ */}
        <section 
          className="relative min-h-[28vh] flex items-end justify-center overflow-hidden pt-16 pb-8"
          style={{
            backgroundColor: theme === 'dark' ? '#0a1628' : '#1a1815'
          }}
        >
          {/* Imagem de fundo - Eventos/Workshops (alta qualidade + Ken Burns zoom) */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=90)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              opacity: theme === 'dark' ? 0.5 : 0.4,
              animation: 'kenBurnsOnce 8s ease-out forwards'
            }}
          />
          {/* Overlay cinematográfico leve */}
          <div className="absolute inset-0 z-[0] hero-cinematic-overlay" style={{ opacity: 0.5 }} />

          {/* Overlay gradiente premium */}
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              background: theme === 'dark'
                ? `linear-gradient(
                    180deg, 
                    rgba(10, 22, 40, 0.7) 0%, 
                    rgba(10, 22, 40, 0.5) 30%,
                    rgba(10, 22, 40, 0.6) 70%,
                    rgba(5, 8, 20, 0.95) 100%
                  )`
                : `linear-gradient(
                    180deg, 
                    rgba(26, 24, 21, 0.75) 0%, 
                    rgba(26, 24, 21, 0.5) 30%,
                    rgba(26, 24, 21, 0.65) 70%,
                    rgba(26, 24, 21, 0.95) 100%
                  )`
            }}
          />

          {/* Vinheta lateral */}
          <div 
            className="absolute inset-0 z-[2]"
            style={{
              background: 'radial-gradient(ellipse 80% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)'
            }}
          />

          {/* Mesh Gradient - Vermelho Azimut */}
          <div className="absolute inset-0 overflow-hidden z-[3]">
            <div 
              className="absolute rounded-full blur-3xl"
              style={{
                width: '50%',
                height: '100%',
                top: '-30%',
                left: '-15%',
                background: 'radial-gradient(circle, rgba(201, 35, 55, 0.15) 0%, transparent 60%)',
                opacity: 0.8
              }}
            />
          </div>

          {/* Linhas decorativas vermelhas */}
          <div 
            className="absolute top-0 left-0 right-0 h-[1px] z-[4]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(201, 35, 55, 0.3) 20%, rgba(201, 35, 55, 0.6) 50%, rgba(201, 35, 55, 0.3) 80%, transparent 100%)'
            }}
          />
          
          {/* Conteúdo */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              {/* Lado esquerdo */}
              <div className="flex-1">
                {/* Badge - Estilo Vancouver (azul navy escuro no dark / vermelho no claro) */}
                <div 
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4 backdrop-blur-md"
                  style={{
                    background: theme === 'dark'
                      ? 'rgba(30, 41, 59, 0.88)'
                      : 'rgba(201, 35, 55, 0.9)',
                    border: theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.18)'
                      : '1px solid rgba(201, 35, 55, 0.95)',
                    boxShadow: theme === 'dark'
                      ? '0 4px 20px rgba(0, 0, 0, 0.4)'
                      : '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(201, 35, 55, 0.2)'
                  }}
                >
                  <span className="text-white text-xs font-semibold uppercase tracking-[0.15em]" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {t.hero.badge}
                  </span>
                </div>

                {/* Título em 2 linhas com palavra em vermelho (igual Home) */}
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-handel uppercase tracking-wide mb-3"
                  style={{ 
                    color: '#ffffff',
                    textShadow: '0 2px 30px rgba(0, 0, 0, 0.7), 0 4px 60px rgba(0,0,0,0.5)',
                    letterSpacing: '0.05em',
                    lineHeight: '1.15'
                  }}
                >
                  {lang === 'pt' && (
                    <>
                      WORKSHOPS &<br />
                      <span className="text-azimut-red">PALESTRAS</span>
                    </>
                  )}
                  {lang === 'en' && (
                    <>
                      WORKSHOPS &<br />
                      <span className="text-azimut-red">LECTURES</span>
                    </>
                  )}
                  {lang === 'es' && (
                    <>
                      WORKSHOPS Y<br />
                      <span className="text-azimut-red">CONFERENCIAS</span>
                    </>
                  )}
                  {lang === 'fr' && (
                    <>
                      WORKSHOPS &<br />
                      <span className="text-azimut-red">CONFÉRENCES</span>
                    </>
                  )}
                </h1>

                {/* Subtítulo */}
                <p 
                  className="text-lg md:text-xl font-light"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {t.hero.subtitle}
                </p>
              </div>

              {/* Lado direito */}
              <div className="md:max-w-sm md:text-right">
                <p 
                  className="text-sm md:text-base leading-relaxed"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.01em',
                    textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                  }}
                >
                  {t.hero.description}
                </p>
              </div>
            </div>
          </div>

          {/* Gradient fade inferior */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-[5]"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(to top, #050814 0%, rgba(5,8,20,0.8) 40%, transparent 100%)'
                : 'linear-gradient(to top, #1a1815 0%, rgba(26,24,21,0.8) 40%, transparent 100%)'
            }}
          />
          
          {/* Linha vermelha inferior */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px] z-[6]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(201, 35, 55, 0.4) 20%, rgba(201, 35, 55, 0.8) 50%, rgba(201, 35, 55, 0.4) 80%, transparent 100%)'
            }}
          />
        </section>

        {/* FORMATS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.formats.map((format: any) => (
                <div 
                  key={format.id}
                  className="card-adaptive rounded-xl p-6 border border-white/10 hover:border-azimut-red/50 transition-all hover:scale-105"
                >
                  <div className="text-5xl mb-4">{format.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>{format.title}</h3>
                  <p className="text-azimut-red text-sm font-semibold mb-3">{format.duration}</p>
                  <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>{format.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {format.examples.map((ex: string) => (
                      <span key={ex} className="px-2 py-1 bg-white/5 text-xs rounded" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="py-20 bg-gradient-to-b from-transparent via-azimut-red/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.upcoming.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.upcoming.events.map((event: any) => (
                <div 
                  key={event.id}
                  className="card-adaptive rounded-2xl p-8 border border-white/10 hover:border-azimut-red/50 transition-all hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>{event.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <span>📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <span>⏱️</span>
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <span>👥</span>
                      <span>{event.spots}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-3xl font-handel text-azimut-red">{event.price}</span>
                    <Link
                      to={`/${lang}/contact`}
                      className="px-6 py-3 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold uppercase text-sm rounded-lg transition-all"
                    >
                      {lang === 'pt' ? 'Inscrever' : lang === 'en' ? 'Register' : lang === 'es' ? 'Registrarse' : 'S\'inscrire'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAST EVENTS GALLERY */}
        <section className="py-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.pastEvents.title}
            </h2>
            <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
              {t.pastEvents.subtitle}
            </p>

            {/* Galeria Past Events: dados do backoffice (admin/academy/events/gallery) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(pastEventsSlots && pastEventsSlots.length > 0 ? pastEventsSlots : Array.from({ length: 8 }, (_, i) => ({ id: `ph-${i}` }))).map((slot: any) => {
                const imgUrl = slot.media?.originalUrl || slot.media?.thumbnailUrl || slot.media?.mediumUrl
                return (
                  <div
                    key={slot.id}
                    className="aspect-square bg-gradient-to-br from-slate-800 to-black rounded-lg border border-white/10 hover:border-azimut-red/50 transition-all hover:scale-105 cursor-pointer flex items-center justify-center overflow-hidden"
                  >
                    {imgUrl ? (
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl opacity-20">📸</span>
                    )}
                  </div>
                )
              })}
            </div>

            {pastEventsSlots && pastEventsSlots.length > 0 && (
              <p className={`mt-8 text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-600'}`}>
                Conteúdo editável em Backoffice → Academy → Ver galeria Past Events
              </p>
            )}
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

export default AcademyWorkshops
