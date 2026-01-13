import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import InternalNavigation from '../components/InternalNavigation'

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
      
      <main className="relative pt-6 md:pt-8 pb-24">
        {/* Star Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75"
          style={{ opacity: 0.25, zIndex: -5, willChange: 'transform' }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Hero - MESMA ALTURA QUE WORK */}
          {/* Prefixo Narrativo - APENAS ESTE ANIMA */}
          <div className="mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
              {lang === 'pt' ? 'NOSSO ESTÚDIO' : lang === 'es' ? 'NUESTRO ESTUDIO' : lang === 'fr' ? 'NOTRE STUDIO' : 'OUR STUDIO'}
            </span>
          </div>
          {/* Título - SEM animação */}
          <h1 className="mb-4 font-handel uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1' }}>
            {text.title}
          </h1>
          {/* Parágrafo - SEM animação */}
          <p className="mb-8 max-w-3xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
            {text.subtitle}
          </p>

          {/* Navegação Interna - SCROLL NA MESMA PÁGINA (igual Work) */}
          <InternalNavigation
            items={[
              {
                id: 'overview',
                label: lang === 'pt' ? 'Visão Geral' : lang === 'es' ? 'Visión General' : lang === 'fr' ? 'Vue d\'Ensemble' : 'Overview',
                href: '#overview',
                icon: '✦'
              },
              {
                id: 'unique',
                label: lang === 'pt' ? 'Diferenciais' : lang === 'es' ? 'Diferenciales' : lang === 'fr' ? 'Différenciation' : 'What Makes Us Unique',
                href: '#unique',
                icon: '💡'
              },
              {
                id: 'team',
                label: lang === 'pt' ? 'Equipe' : lang === 'es' ? 'Equipo' : lang === 'fr' ? 'Équipe' : 'Team',
                href: '#team',
                icon: '👥'
              },
              {
                id: 'credentials',
                label: lang === 'pt' ? 'Credenciais' : lang === 'es' ? 'Credenciales' : lang === 'fr' ? 'Références' : 'Credentials',
                href: '#credentials',
                icon: '🏆'
              }
            ]}
            lang={lang}
          />

          {/* Sobre (Overview) */}
          <section id="overview" className="mb-16 scroll-mt-40">
            <h2 className="mb-6 font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red flex items-center gap-2">
              <span>📖</span>
              {text.about.title}
            </h2>
            <p className="text-lg leading-relaxed text-theme-text-secondary max-w-4xl mb-12">
              {text.about.text}
            </p>

            {/* Visual Hero Image - Placeholder for backoffice image */}
            <div className="relative rounded-2xl overflow-hidden mb-12" style={{ height: '400px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-sm flex items-center justify-center border border-azimut-red/20">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white font-sora text-xl uppercase tracking-wider">
                    {lang === 'pt' ? 'Studio Azimut' : lang === 'es' ? 'Estudio Azimut' : lang === 'fr' ? 'Studio Azimut' : 'Azimut Studio'}
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    {lang === 'pt' ? 'Imersivo • Interativo • Cinematográfico' : lang === 'es' ? 'Inmersivo • Interactivo • Cinematográfico' : lang === 'fr' ? 'Immersif • Interactif • Cinématographique' : 'Immersive • Interactive • Cinematic'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Diferenciais (What Makes Us Unique) */}
          <section id="unique" className="mb-16 scroll-mt-40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red flex items-center gap-2">
                <span>💡</span>
                {lang === 'pt' ? 'O Que Nos Torna Únicos' : lang === 'es' ? 'Lo Que Nos Hace Únicos' : lang === 'fr' ? 'Ce Qui Nous Rend Uniques' : 'What Makes Us Unique'}
              </h2>
              <LangLink
                to="/studio/diferenciais"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-azimut-red/10 border border-azimut-red/40 text-azimut-red hover:bg-azimut-red hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
              >
                {lang === 'pt' ? 'Ver Detalhes' : lang === 'es' ? 'Ver Detalles' : lang === 'fr' ? 'Voir Détails' : 'View Details'}
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </LangLink>
            </div>
            
            {/* Preview Cards com IMAGENS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative rounded-xl overflow-hidden border border-azimut-red/20 hover:border-azimut-red/60 transition-all cursor-pointer" style={{ height: '300px' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center group-hover:bg-slate-900/80 transition-colors">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'pt' ? 'Studio + Lab + Academy' : lang === 'es' ? 'Estudio + Lab + Academia' : lang === 'fr' ? 'Studio + Lab + Académie' : 'Studio + Lab + Academy'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {lang === 'pt' ? 'Produção, pesquisa e educação em um só lugar' : lang === 'es' ? 'Producción, investigación y educación en un solo lugar' : lang === 'fr' ? 'Production, recherche et éducation en un seul endroit' : 'Production, research and education in one place'}
                  </p>
                </div>
              </div>
              
              <div className="group relative rounded-xl overflow-hidden border border-azimut-red/20 hover:border-azimut-red/60 transition-all cursor-pointer" style={{ height: '300px' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center group-hover:bg-slate-900/80 transition-colors">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌍</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'pt' ? 'Brasil ↔ Canadá' : lang === 'es' ? 'Brasil ↔ Canadá' : lang === 'fr' ? 'Brésil ↔ Canada' : 'Brazil ↔ Canada'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {lang === 'pt' ? 'Operações internacionais, perspectivas globais' : lang === 'es' ? 'Operaciones internacionales, perspectivas globales' : lang === 'fr' ? 'Opérations internationales, perspectives mondiales' : 'International operations, global perspectives'}
                  </p>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden border border-azimut-red/20 hover:border-azimut-red/60 transition-all cursor-pointer" style={{ height: '300px' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center group-hover:bg-slate-900/80 transition-colors">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'pt' ? '30+ Anos Experiência' : lang === 'es' ? '30+ Años de Experiencia' : lang === 'fr' ? '30+ Ans d\'Expérience' : '30+ Years Experience'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {lang === 'pt' ? 'Expertise comprovada em projetos de grande escala' : lang === 'es' ? 'Experiencia comprobada en proyectos de gran escala' : lang === 'fr' ? 'Expertise prouvée dans des projets à grande échelle' : 'Proven expertise in large-scale projects'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Equipe */}
          <section id="team" className="mb-16 scroll-mt-40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red flex items-center gap-2">
                <span>👥</span>
                {text.team.title}
              </h2>
              <LangLink
                to="/studio/equipe"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-azimut-red/10 border border-azimut-red/40 text-azimut-red hover:bg-azimut-red hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
              >
                {lang === 'pt' ? 'Equipe Completa' : lang === 'es' ? 'Equipo Completo' : lang === 'fr' ? 'Équipe Complète' : 'Full Team'}
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </LangLink>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {text.team.members.map((member, i) => (
                <LangLink
                  key={i}
                  to="/studio/equipe"
                  className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red transition-all cursor-pointer"
                >
                  {/* Image placeholder - altura fixa */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/70 flex items-center justify-center border-b border-azimut-red/10 group-hover:bg-azimut-red/10 transition-colors">
                    <span className="text-8xl group-hover:scale-110 transition-transform opacity-50">👤</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-azimut-red mb-3 uppercase tracking-wider font-semibold">{member.role}</p>
                    <p className="text-sm text-theme-text-secondary leading-relaxed line-clamp-3">{member.bio}</p>
                  </div>
                </LangLink>
              ))}
            </div>
          </section>

          {/* Credenciais */}
          <section id="credentials" className="mb-16 scroll-mt-40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red flex items-center gap-2">
                <span>🏆</span>
                {text.credentials.title}
              </h2>
              <LangLink
                to="/studio/credibilidade"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-azimut-red/10 border border-azimut-red/40 text-azimut-red hover:bg-azimut-red hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
              >
                {lang === 'pt' ? 'Ver Timeline' : lang === 'es' ? 'Ver Timeline' : lang === 'fr' ? 'Voir Timeline' : 'View Timeline'}
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </LangLink>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {text.credentials.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-6 rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-900/20 border border-azimut-red/10 hover:border-azimut-red/30 hover:bg-slate-900/50 transition-all">
                  <span className="text-3xl shrink-0">{item.substring(0, 2)}</span>
                  <span className="text-theme-text-secondary leading-relaxed">{item.substring(3)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Áreas de Atuação */}
          <section className="mb-16">
            <h2 className="mb-6 font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red flex items-center gap-2">
              <span>⚡</span>
              {text.areas.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {text.areas.items.map((area, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden border border-azimut-red/20 hover:border-azimut-red/60 transition-all cursor-pointer" style={{ height: '180px' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-900/30 hover:bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center transition-colors">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{area.icon}</div>
                    <p className="text-sm font-semibold text-white uppercase tracking-wide">{area.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-azimut-red/5 to-transparent border border-azimut-red/20">
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
