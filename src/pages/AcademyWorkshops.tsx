// ════════════════════════════════════════════════════════════
// ACADEMY WORKSHOPS - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════
// Página de Workshops, Palestras e Mini-Cursos
// Placeholders para imagens/vídeos que virão do backoffice
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import { VideoCard } from '../components/VideoCard'
import { useUserTracking } from '../hooks/useUserTracking'

interface Workshop {
  id: string
  title: string
  description: string
  duration: string
  format: string
  audience: string
  banner: string
  icon: string
  upcoming?: boolean
}

interface AcademyWorkshopsProps {
  lang: Lang
}

const AcademyWorkshops: React.FC<AcademyWorkshopsProps> = ({ lang }) => {
  useUserTracking()

  const content = {
    pt: {
      hero: {
        badge: '🎬 Eventos & Palestras',
        title: 'Workshops & Eventos',
        subtitle: 'Conhecimento intensivo em formato compacto',
        description: 'Workshops de 4h a 3 dias. Palestras em festivais, eventos corporativos, escolas e instituições. Formato hands-on com aplicação imediata.'
      },

      formats: [
        {
          id: 'mini',
          title: 'Mini-Cursos',
          duration: '4-8 horas',
          description: 'Workshops intensivos de 1 dia. Ideal para introdução a novas tecnologias.',
          icon: '⚡'
        },
        {
          id: 'workshop',
          title: 'Workshops',
          duration: '2-3 dias',
          description: 'Imersão prática com projeto final. Formato hands-on com instrutores.',
          icon: '🎯'
        },
        {
          id: 'talk',
          title: 'Palestras',
          duration: '1-2 horas',
          description: 'Apresentações em festivais, eventos, universidades e empresas.',
          icon: '🎤'
        },
        {
          id: 'corporate',
          title: 'In-Company',
          duration: 'Customizado',
          description: 'Workshops fechados para empresas, órgãos públicos e instituições.',
          icon: '🏢'
        }
      ],

      workshops: [
        {
          id: 'vr-intro',
          title: 'Intro to VR Filmmaking',
          description: 'Introdução à produção de filmes em 360°. Câmeras, stitching, edição básica. Hands-on com equipamentos.',
          duration: '8 horas (1 dia)',
          format: 'Presencial',
          audience: 'Iniciantes, cineastas, produtores',
          banner: '/workshops/vr-intro-banner.jpg', // PLACEHOLDER
          icon: '🎥',
          upcoming: true
        },
        {
          id: 'ia-sprint',
          title: 'IA Sprint: ChatGPT to Video',
          description: 'Do roteiro ao vídeo em 4 horas. ChatGPT, Midjourney, Runway. Pipeline completo de IA aplicada.',
          duration: '4 horas',
          format: 'Presencial/Online',
          audience: 'Criadores de conteúdo, marketers',
          banner: '/workshops/ia-sprint-banner.jpg', // PLACEHOLDER
          icon: '🤖',
          upcoming: true
        },
        {
          id: 'interactive-museums',
          title: 'Instalações Interativas para Museus',
          description: 'Sensores, projeções mapeadas, TouchDesigner. Protótipo funcional em 2 dias.',
          duration: '16 horas (2 dias)',
          format: 'Presencial',
          audience: 'Museólogos, artistas, curadores',
          banner: '/workshops/museums-banner.jpg', // PLACEHOLDER
          icon: '🎨'
        },
        {
          id: 'motion-basics',
          title: 'Motion Graphics Essentials',
          description: 'After Effects para iniciantes. Animação de texto, shapes, transições. Projeto prático.',
          duration: '8 horas (1 dia)',
          format: 'Presencial',
          audience: 'Designers, editores',
          banner: '/workshops/motion-banner.jpg', // PLACEHOLDER
          icon: '✨'
        }
      ] as Workshop[],

      pastEvents: {
        title: 'Onde Já Palestramos',
        events: [
          {
            name: 'Rio2C (Rio Creative Conference)',
            year: '2019-2023',
            description: 'Painéis sobre VR e tecnologias imersivas',
            logo: '/events/rio2c-logo.png' // PLACEHOLDER
          },
          {
            name: 'SESC',
            year: '2018-2022',
            description: 'Workshops de animação e VR para comunidade',
            logo: '/events/sesc-logo.png' // PLACEHOLDER
          },
          {
            name: 'UFRJ / ECO',
            year: '2015-2024',
            description: 'Palestras e cursos de extensão',
            logo: '/events/ufrj-logo.png' // PLACEHOLDER
          },
          {
            name: 'Festival do Rio',
            year: '2017-2020',
            description: 'Oficinas de Cinema Imersivo',
            logo: '/events/festival-rio-logo.png' // PLACEHOLDER
          }
        ]
      },

      photos: {
        title: 'Workshops Anteriores',
        subtitle: 'Momentos dos nossos eventos e palestras'
      },

      testimonials: {
        title: 'O Que Dizem os Participantes',
        items: [
          {
            name: 'Ana Silva',
            role: 'Designer, Globo',
            text: 'Workshop prático e direto ao ponto. Saí aplicando no mesmo dia.',
            photo: '/testimonials/ana.jpg' // PLACEHOLDER
          },
          {
            name: 'Carlos Mendes',
            role: 'Produtor Independente',
            text: 'Melhor introdução a VR que encontrei. Equipamento profissional e instrutores experientes.',
            photo: '/testimonials/carlos.jpg' // PLACEHOLDER
          }
        ]
      },

      cta: {
        title: 'Quer um Workshop na Sua Empresa ou Evento?',
        subtitle: 'Desenvolvemos workshops customizados para festivais, empresas, escolas e instituições',
        button: 'Solicitar Orçamento'
      }
    }
  }

  const t = content[lang] || content.pt

  return (
    <>
      <Helmet>
        <title>{t.hero.title} | Azimut Academy</title>
        <meta name="description" content={t.hero.description} />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* HERO */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
                <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                  {t.hero.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white mb-6">
                {t.hero.title}
              </h1>

              <p className="text-2xl text-white/90 mb-4">
                {t.hero.subtitle}
              </p>

              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {t.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* FORMATS */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.formats.map(format => (
                <div key={format.id} className="card-adaptive p-6 rounded-xl border border-white/10 text-center hover:border-azimut-red/50 transition-all">
                  <div className="text-5xl mb-4">{format.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{format.title}</h3>
                  <div className="text-azimut-red text-sm font-semibold mb-3">{format.duration}</div>
                  <p className="text-white/60 text-sm">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKSHOPS LIST - PLACEHOLDER */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                Próximos Workshops
              </h2>
            </div>

            <div className="space-y-6">
              {t.workshops.map(workshop => (
                <article key={workshop.id} className="card-adaptive rounded-xl overflow-hidden border border-white/10 hover:border-azimut-red/50 transition-all">
                  <div className="md:flex">
                    {/* Banner (PLACEHOLDER) */}
                    <div className="md:w-1/3 aspect-video md:aspect-auto bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <span className="text-8xl opacity-30">{workshop.icon}</span>
                      {/* TODO: Imagem real */}
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6">
                      {workshop.upcoming && (
                        <span className="inline-block px-3 py-1 bg-azimut-red text-white text-xs font-bold uppercase rounded-full mb-3">
                          Em Breve
                        </span>
                      )}
                      
                      <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                        <span>{workshop.icon}</span>
                        {workshop.title}
                      </h3>

                      <p className="text-white/70 mb-4">{workshop.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-white/50">Duração:</span>
                          <div className="text-white font-semibold">{workshop.duration}</div>
                        </div>
                        <div>
                          <span className="text-white/50">Formato:</span>
                          <div className="text-white font-semibold">{workshop.format}</div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-white/50">Público:</span>
                          <div className="text-white font-semibold">{workshop.audience}</div>
                        </div>
                      </div>

                      <button className="px-6 py-2 bg-azimut-red text-white font-semibold rounded-lg hover:bg-azimut-red/90 transition-all">
                        Inscrever-se →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/workshops/list → Upload banners
              </p>
            </div>
          </div>
        </section>

        {/* PAST EVENTS */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white text-center mb-12">
              {t.pastEvents.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.pastEvents.events.map((event, i) => (
                <div key={i} className="card-adaptive p-6 rounded-xl border border-white/10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/5 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🎪</span>
                    {/* TODO: Logo do evento */}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{event.name}</h3>
                  <div className="text-azimut-red text-sm font-semibold mb-2">{event.year}</div>
                  <p className="text-white/60 text-xs">{event.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/workshops/past-events → Upload logos
              </p>
            </div>
          </div>
        </section>

        {/* PHOTOS GALLERY - PLACEHOLDER */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.photos.title}
              </h2>
              <p className="text-lg text-white/70">{t.photos.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="text-4xl opacity-30">📸</span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/workshops/photos → Upload fotos
              </p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white text-center mb-12">
              {t.testimonials.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.testimonials.items.map((testimonial, i) => (
                <div key={i} className="card-adaptive p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-azimut-red/30 to-slate-800 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <div className="text-white font-bold">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.cta.subtitle}
            </p>
            <button className="px-8 py-4 bg-azimut-red text-white font-semibold rounded-lg hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-azimut-red/50 hover:scale-105">
              {t.cta.button} →
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

export default AcademyWorkshops
