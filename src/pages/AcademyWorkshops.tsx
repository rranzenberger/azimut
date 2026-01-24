// ════════════════════════════════════════════════════════════
// ACADEMY WORKSHOPS - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import { useUserTracking } from '../hooks/useUserTracking'
import { useTheme } from '../contexts/ThemeContext'
import { PageFooterNavigation } from '../components/PageFooterNavigation'

interface AcademyWorkshopsProps {
  lang: Lang
}

const AcademyWorkshops: React.FC<AcademyWorkshopsProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()

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
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>

      <div className="min-h-screen bg-theme-primary">
        {/* HERO - GRUDADO NO MENU (margin-top negativo compensa padding do main) */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          style={{ marginTop: '-80px', paddingTop: '80px' }}
        >
          {/* Background com Curadoria de Arte Premium */}
          <div className="absolute inset-0">
            {/* Tema Escuro: Overlay cinematográfico balanceado */}
            {theme === 'dark' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent" />
              </>
            )}
            
            {/* Tema Claro: Overlay equilibrado com vinheta artística */}
            {theme === 'light' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1e8]/40 via-[#e8e5df]/35 to-[#d3cec3]/45" />
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
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e1c1a]/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-slate-900/15" />
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
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
              <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
            </div>

            {/* Título - Cores adaptativas por tema */}
            <h1 
              className="text-5xl md:text-7xl font-handel uppercase tracking-wider mb-6"
              style={{ 
                color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                textShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {t.hero.title}
            </h1>

            {/* Subtítulo - Cores adaptativas por tema */}
            <p 
              className="text-xl md:text-2xl mb-4"
              style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#e8e5df',
                textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Descrição - Cores adaptativas por tema */}
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#d3cec3',
                textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)' : '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              {t.hero.description}
            </p>
          </div>
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
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{format.title}</h3>
                  <p className="text-azimut-red text-sm font-semibold mb-3">{format.duration}</p>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>{format.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {format.examples.map((ex: string) => (
                      <span key={ex} className={`px-2 py-1 bg-white/5 text-xs rounded ${theme === 'dark' ? 'text-white/50' : 'text-on-dark-tertiary'}`}>
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
                  <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{event.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>
                      <span>📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>
                      <span>⏱️</span>
                      <span>{event.duration}</span>
                    </div>
                    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>
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
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
              {t.pastEvents.title}
            </h2>
            <p className="text-xl text-white/70 mb-12">
              {t.pastEvents.subtitle}
            </p>

            {/* PLACEHOLDER: Fotos de eventos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div 
                  key={i}
                  className="aspect-square bg-gradient-to-br from-slate-800 to-black rounded-lg border border-white/10 hover:border-azimut-red/50 transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
                >
                  <span className="text-4xl opacity-20">📸</span>
                </div>
              ))}
            </div>

            <p className={`mt-8 text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-600'}`}>
              📸 PLACEHOLDER: Backoffice → /admin/academy/events/gallery
            </p>
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
