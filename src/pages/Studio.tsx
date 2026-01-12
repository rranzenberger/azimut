import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'

interface StudioProps {
  lang: Lang
}

const Studio: React.FC<StudioProps> = ({ lang }) => {
  useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)

  // Parallax
  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          if (star) {
            star.style.transform = `translateY(${scrolled * 0.3}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const content = {
    pt: {
      title: 'Estúdio & Equipe',
      subtitle: 'Criando experiências imersivas entre Brasil e Canadá',
      about: {
        title: 'Sobre a Azimut',
        text: 'A Azimut é um estúdio criativo-tecnológico dedicado a experiências imersivas, interativas e cinematográficas. Com raízes no Brasil e Canadá, navegamos entre cinema, design, engenharia, educação e pesquisa.'
      },
      credentials: {
        title: 'Credenciais',
        items: [
          '🏆 Membros fundadores da Associação XRBR',
          '🎓 Mestrado em Mídias Criativas (UFRJ)',
          '🎬 Curadoria VR no Festival de Gramado desde 2017',
          '🏛️ Direção Técnica no Museu Olímpico do Rio',
          '🌍 Operações internacionais: Brasil ↔ Canadá'
        ]
      },
      areas: {
        title: 'Áreas de Atuação',
        items: [
          { icon: '🎬', name: 'Cinema & Audiovisual' },
          { icon: '🥽', name: 'VR/XR/AR' },
          { icon: '✨', name: 'VFX & CGI' },
          { icon: '🎨', name: 'Motion Design' },
          { icon: '🏛️', name: 'Museografia Digital' },
          { icon: '🎓', name: 'Educação' }
        ]
      },
      team: {
        title: 'Equipe',
        members: [
          {
            name: 'Ranz Enberger',
            role: 'Diretor Criativo & Tecnológico',
            bio: '30+ anos em produção audiovisual, VR/XR e IA. Diretor Geral de Tecnologia no Museu Olímpico. Curador VR no Festival de Gramado.'
          },
          {
            name: 'Anick Couto',
            role: 'Diretora de Arte',
            bio: 'Direção visual, design de personagens e cenografia. Liderou equipe de arte completa no Museu Olímpico.'
          },
          {
            name: 'Alberto Moura',
            role: 'Diretor Audiovisual',
            bio: 'Produção audiovisual, operações e estratégia cultural. Professor universitário e coordenador de cursos.'
          }
        ]
      },
      cta: 'Interessado em trabalhar conosco?',
      contact: 'Iniciar um Projeto'
    },
    en: {
      title: 'Studio & Team',
      subtitle: 'Creating immersive experiences between Brazil and Canada',
      about: {
        title: 'About Azimut',
        text: 'Azimut is a creative-technology studio dedicated to immersive, interactive and cinematic experiences. With roots in Brazil and Canada, we navigate between cinema, design, engineering, education and research.'
      },
      credentials: {
        title: 'Credentials',
        items: [
          '🏆 Founding members of XRBR Association',
          '🎓 Master\'s in Creative Media (UFRJ)',
          '🎬 VR Curatorship at Gramado Festival since 2017',
          '🏛️ Technical Direction at Rio Olympic Museum',
          '🌍 International operations: Brazil ↔ Canada'
        ]
      },
      areas: {
        title: 'Areas of Practice',
        items: [
          { icon: '🎬', name: 'Cinema & Audiovisual' },
          { icon: '🥽', name: 'VR/XR/AR' },
          { icon: '✨', name: 'VFX & CGI' },
          { icon: '🎨', name: 'Motion Design' },
          { icon: '🏛️', name: 'Digital Museography' },
          { icon: '🎓', name: 'Education' }
        ]
      },
      team: {
        title: 'Team',
        members: [
          {
            name: 'Ranz Enberger',
            role: 'Creative & Technology Director',
            bio: '30+ years in audiovisual production, VR/XR and AI. General Technology Director at Olympic Museum. VR Curator at Gramado Festival.'
          },
          {
            name: 'Anick Couto',
            role: 'Art Director',
            bio: 'Visual direction, character and scenography design. Led complete art team at Olympic Museum.'
          },
          {
            name: 'Alberto Moura',
            role: 'Audiovisual Director',
            bio: 'Audiovisual production, operations and cultural strategy. University professor and course coordinator.'
          }
        ]
      },
      cta: 'Interested in working with us?',
      contact: 'Start a Project'
    },
    es: { title: 'Estudio', subtitle: '', about: { title: '', text: '' }, credentials: { title: '', items: [] }, areas: { title: '', items: [] }, team: { title: '', members: [] }, cta: '', contact: '' },
    fr: { title: 'Studio', subtitle: '', about: { title: '', text: '' }, credentials: { title: '', items: [] }, areas: { title: '', items: [] }, team: { title: '', members: [] }, cta: '', contact: '' }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Azimut`}
        description={text.about.text}
        path="/studio"
      />
      
      <main className="relative py-16 md:py-20">
        {/* Star Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75"
          style={{ opacity: 0.25, zIndex: -5, willChange: 'transform' }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <div className="mb-16">
            <div className="mb-4 inline-block px-4 py-2 rounded-full bg-azimut-red/10 border border-azimut-red/30 text-sm font-semibold text-azimut-red uppercase tracking-wider">
              🏢 Studio
            </div>
            <h1 className="mb-4 font-handel uppercase text-theme-text" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1', letterSpacing: '0.08em' }}>
              {text.title}
            </h1>
            <p className="text-theme-text-secondary max-w-4xl leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {text.subtitle}
            </p>
          </div>

          {/* Sobre */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">📖</span>
              {text.about.title}
            </h2>
            <p className="text-lg leading-relaxed text-theme-text-secondary max-w-4xl">
              {text.about.text}
            </p>
          </section>

          {/* Credenciais */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">🏆</span>
              {text.credentials.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {text.credentials.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-colors">
                  <span className="text-2xl">{item.substring(0, 2)}</span>
                  <span className="text-theme-text-secondary">{item.substring(3)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Áreas de Atuação */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">⚡</span>
              {text.areas.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {text.areas.items.map((area, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 border border-azimut-red/20 hover:border-azimut-red/40 transition-all">
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <p className="text-sm font-semibold text-white">{area.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Equipe */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">👥</span>
              {text.team.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {text.team.members.map((member, i) => (
                <div key={i} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/40 transition-all overflow-hidden">
                  <div className="mb-4 h-32 rounded-lg bg-azimut-red/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-6xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{member.name}</h3>
                  <p className="text-sm text-azimut-red mb-3 uppercase tracking-wider line-clamp-1">{member.role}</p>
                  <p className="text-sm text-theme-text-secondary leading-relaxed line-clamp-4">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Navegação para Subpáginas */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">🔍</span>
              {lang === 'pt' ? 'Explore Mais' : lang === 'es' ? 'Explorar Más' : lang === 'fr' ? 'Explorer Plus' : 'Explore More'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1: Diferenciais */}
              <LangLink
                to="/studio/diferenciais"
                className="group p-8 rounded-xl border-2 border-azimut-red/30 hover:border-azimut-red hover:bg-azimut-red/5 transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-azimut-red transition-colors">
                  {lang === 'pt' ? 'O Que Nos Torna Únicos' : lang === 'es' ? 'Lo Que Nos Hace Únicos' : lang === 'fr' ? 'Ce Qui Nous Rend Uniques' : 'What Makes Us Unique'}
                </h3>
                <p className="text-sm text-theme-text-secondary mb-4">
                  {lang === 'pt' ? 'Nossa combinação especial de Studio + Lab + Academy' : lang === 'es' ? 'Nuestra combinación especial de Estudio + Lab + Academia' : lang === 'fr' ? 'Notre combinaison spéciale de Studio + Lab + Académie' : 'Our special combination of Studio + Lab + Academy'}
                </p>
                <span className="text-azimut-red font-semibold text-sm flex items-center gap-2">
                  {lang === 'pt' ? 'Ver mais' : lang === 'es' ? 'Ver más' : lang === 'fr' ? 'Voir plus' : 'Learn more'} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </LangLink>

              {/* Card 2: Equipe */}
              <LangLink
                to="/studio/equipe"
                className="group p-8 rounded-xl border-2 border-azimut-red/30 hover:border-azimut-red hover:bg-azimut-red/5 transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👥</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-azimut-red transition-colors">
                  {lang === 'pt' ? 'Conheça a Equipe' : lang === 'es' ? 'Conoce el Equipo' : lang === 'fr' ? 'Rencontrez l\'Équipe' : 'Meet the Team'}
                </h3>
                <p className="text-sm text-theme-text-secondary mb-4">
                  {lang === 'pt' ? 'Quem somos e o que fazemos de especial' : lang === 'es' ? 'Quiénes somos y qué hacemos de especial' : lang === 'fr' ? 'Qui nous sommes et ce que nous faisons de spécial' : 'Who we are and what we do special'}
                </p>
                <span className="text-azimut-red font-semibold text-sm flex items-center gap-2">
                  {lang === 'pt' ? 'Ver mais' : lang === 'es' ? 'Ver más' : lang === 'fr' ? 'Voir plus' : 'Learn more'} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </LangLink>

              {/* Card 3: Credenciais */}
              <LangLink
                to="/studio/credibilidade"
                className="group p-8 rounded-xl border-2 border-azimut-red/30 hover:border-azimut-red hover:bg-azimut-red/5 transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-azimut-red transition-colors">
                  {lang === 'pt' ? 'Credenciais & Timeline' : lang === 'es' ? 'Credenciales & Timeline' : lang === 'fr' ? 'Références & Timeline' : 'Credentials & Timeline'}
                </h3>
                <p className="text-sm text-theme-text-secondary mb-4">
                  {lang === 'pt' ? 'Nossa trajetória de 30 anos' : lang === 'es' ? 'Nuestro recorrido de 30 años' : lang === 'fr' ? 'Notre parcours de 30 ans' : 'Our 30-year journey'}
                </p>
                <span className="text-azimut-red font-semibold text-sm flex items-center gap-2">
                  {lang === 'pt' ? 'Ver mais' : lang === 'es' ? 'Ver más' : lang === 'fr' ? 'Voir plus' : 'Learn more'} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </LangLink>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xl text-theme-text-secondary mb-6">{text.cta}</p>
            <LangLink
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase tracking-wider hover:bg-azimut-red/90 transition-all shadow-xl hover:shadow-2xl"
            >
              {text.contact}
              <span className="text-2xl">→</span>
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default Studio
