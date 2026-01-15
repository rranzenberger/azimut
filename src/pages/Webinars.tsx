// ════════════════════════════════════════════════════════════
// WEBINARS PAGE - AZIMUT ACADEMY
// ════════════════════════════════════════════════════════════
// Lista webinars online sobre Vancouver, Cursos, VR, etc
// Permite registro e acesso a gravações
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import { useUserTracking } from '../hooks/useUserTracking'
import CanadaMapleLeaf from '../components/CanadaMapleLeaf'

interface WebinarsProps {
  lang: Lang
}

const Webinars: React.FC<WebinarsProps> = ({ lang }) => {
  useUserTracking()
  const [selectedWebinar, setSelectedWebinar] = useState<string | null>(null)

  const content: Record<Lang, any> = {
    pt: {
      meta: {
        title: 'Webinars Azimut Academy - Info Sessions & Workshops Online',
        description: 'Participe de nossos webinars gratuitos sobre Vancouver, VR, IA e produção audiovisual. Info sessions, workshops e Q&A ao vivo.'
      },
      hero: {
        badge: '🎤 Webinars & Info Sessions',
        title: 'Aprenda com Especialistas',
        subtitle: 'Webinars gratuitos, Q&A ao vivo e workshops online',
        description: 'Participe de nossas sessões online sobre Vancouver, VR, IA Generativa e produção audiovisual. Tire dúvidas direto com nossos consultores.'
      },
      upcoming: {
        title: 'Próximos Webinars',
        subtitle: 'Inscreva-se gratuitamente',
        cta: 'Inscrever-se Grátis'
      },
      recorded: {
        title: 'Gravações Disponíveis',
        subtitle: 'Assista quando quiser',
        cta: 'Assistir Agora'
      },
      topics: {
        title: 'Temas Abordados',
        list: [
          {
            icon: '🇨🇦',
            title: 'Info Session Vancouver',
            description: 'Tudo sobre VFS e VanArts: cursos, custos, vistos, moradia, empregabilidade.'
          },
          {
            icon: '🎓',
            title: 'Como Aplicar para VFS/VanArts',
            description: 'Processo de aplicação passo a passo, portfolio, requisitos, prazos.'
          },
          {
            icon: '🥽',
            title: 'Produção VR & Cinema 360°',
            description: 'Workshop online sobre criação de experiências imersivas.'
          },
          {
            icon: '🤖',
            title: 'IA Generativa para Criação',
            description: 'Midjourney, Runway, ChatGPT aplicados à produção audiovisual.'
          },
          {
            icon: '💼',
            title: 'Carreira Internacional',
            description: 'Como trabalhar no exterior, network, portfolio internacional.'
          },
          {
            icon: '🎨',
            title: 'Portfolio Review',
            description: 'Feedback ao vivo sobre seu portfolio por profissionais da área.'
          }
        ]
      },
      register: {
        title: 'Inscreva-se em um Webinar',
        name: 'Nome completo',
        email: 'E-mail',
        phone: 'Telefone (opcional)',
        webinar: 'Webinar de interesse',
        submit: 'Confirmar Inscrição',
        success: 'Inscrição confirmada! Você receberá um e-mail com o link de acesso.'
      },
      cta: {
        title: 'Quer Sugerir um Tema?',
        subtitle: 'Entre em contato e nos diga sobre o que você gostaria de aprender',
        button: 'Enviar Sugestão'
      }
    },
    en: {
      meta: {
        title: 'Azimut Academy Webinars - Info Sessions & Online Workshops',
        description: 'Join our free webinars about Vancouver, VR, AI and audiovisual production. Info sessions, workshops and live Q&A.'
      },
      hero: {
        badge: '🎤 Webinars & Info Sessions',
        title: 'Learn from Experts',
        subtitle: 'Free webinars, live Q&A and online workshops',
        description: 'Join our online sessions about Vancouver, VR, Generative AI and audiovisual production. Ask questions directly to our consultants.'
      },
      upcoming: {
        title: 'Upcoming Webinars',
        subtitle: 'Register for free',
        cta: 'Register Free'
      },
      recorded: {
        title: 'Recorded Sessions',
        subtitle: 'Watch anytime',
        cta: 'Watch Now'
      },
      topics: {
        title: 'Topics Covered',
        list: [
          {
            icon: '🇨🇦',
            title: 'Vancouver Info Session',
            description: 'Everything about VFS and VanArts: programs, costs, visas, housing, employability.'
          },
          {
            icon: '🎓',
            title: 'How to Apply to VFS/VanArts',
            description: 'Step-by-step application process, portfolio, requirements, deadlines.'
          },
          {
            icon: '🥽',
            title: 'VR Production & 360° Cinema',
            description: 'Online workshop on creating immersive experiences.'
          },
          {
            icon: '🤖',
            title: 'Generative AI for Creators',
            description: 'Midjourney, Runway, ChatGPT applied to audiovisual production.'
          },
          {
            icon: '💼',
            title: 'International Career',
            description: 'How to work abroad, networking, international portfolio.'
          },
          {
            icon: '🎨',
            title: 'Portfolio Review',
            description: 'Live feedback on your portfolio by industry professionals.'
          }
        ]
      },
      register: {
        title: 'Register for a Webinar',
        name: 'Full name',
        email: 'Email',
        phone: 'Phone (optional)',
        webinar: 'Webinar of interest',
        submit: 'Confirm Registration',
        success: 'Registration confirmed! You will receive an email with the access link.'
      },
      cta: {
        title: 'Want to Suggest a Topic?',
        subtitle: 'Contact us and tell us what you would like to learn about',
        button: 'Send Suggestion'
      }
    },
    es: content.pt, // TODO
    fr: content.pt  // TODO
  }

  const t = content[lang] || content.pt

  // Mock data - será substituído por API
  const mockWebinars = [
    {
      id: '1',
      title: 'Info Session Vancouver: VFS & VanArts',
      date: '15 Fevereiro 2026, 19:00 (Horário Brasília)',
      duration: '60 minutos',
      speaker: 'Equipe Azimut',
      spots: 50,
      registered: 32,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Workshop: IA Generativa para Marketing',
      date: '22 Fevereiro 2026, 14:00 (Horário Brasília)',
      duration: '90 minutos',
      speaker: 'Prof. Alberto Luchetti',
      spots: 30,
      registered: 18,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Como Criar seu Portfolio Internacional',
      date: '10 Janeiro 2026, 19:00',
      duration: '60 minutos',
      speaker: 'Equipe Azimut',
      recording: 'https://youtube.com/watch?v=...',
      status: 'recorded'
    }
  ]

  const upcomingWebinars = mockWebinars.filter(w => w.status === 'upcoming')
  const recordedWebinars = mockWebinars.filter(w => w.status === 'recorded')

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-black to-[#0a0e18] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
                <span className="text-azimut-red text-sm font-semibold uppercase">
                  {t.hero.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-handel uppercase tracking-wider text-white mb-6">
                {t.hero.title}
              </h1>

              <p className="text-2xl md:text-3xl text-white/80 mb-6">
                {t.hero.subtitle}
              </p>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                {t.hero.description}
              </p>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-azimut-red rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          </div>
        </section>

        {/* Upcoming Webinars */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.upcoming.title}
              </h2>
              <p className="text-xl text-white/70">{t.upcoming.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="card-adaptive rounded-xl p-8 border border-white/10 hover:border-azimut-red/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {webinar.title}
                    </h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase">
                      Ao Vivo
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 text-white/70">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📅</span>
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⏱️</span>
                      <span>{webinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">👤</span>
                      <span>{webinar.speaker}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-white/60 mb-2">
                      <span>{webinar.registered} inscritos</span>
                      <span>{webinar.spots - webinar.registered} vagas</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-azimut-red"
                        style={{ width: `${(webinar.registered / webinar.spots) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedWebinar(webinar.id)}
                    className="w-full px-6 py-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-bold uppercase tracking-wider rounded-lg transition-all hover:scale-105"
                  >
                    {t.upcoming.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recorded Webinars */}
        {recordedWebinars.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                  {t.recorded.title}
                </h2>
                <p className="text-xl text-white/70">{t.recorded.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {recordedWebinars.map((webinar) => (
                  <div
                    key={webinar.id}
                    className="card-adaptive rounded-xl p-6 border border-white/10 hover:border-azimut-red/50 transition-all"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      {webinar.title}
                    </h3>

                    <div className="space-y-2 mb-6 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>{webinar.duration}</span>
                      </div>
                    </div>

                    <a
                      href={webinar.recording}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded-lg transition-all text-center"
                    >
                      {t.recorded.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Topics */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.topics.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.topics.list.map((topic: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 card-adaptive rounded-xl border border-white/10 hover:border-azimut-red/30 transition-all"
                >
                  <div className="text-5xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {topic.title}
                  </h3>
                  <p className="text-white/70">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-10">
              {t.cta.subtitle}
            </p>

            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-azimut-red hover:bg-azimut-red/90 text-white text-lg font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-azimut-red/50"
            >
              {t.cta.button}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default Webinars
