import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import InternalNavigation from '../components/InternalNavigation'
import StarBackground from '../components/StarBackground'

interface StudioProps {
  lang: Lang
}

const Studio: React.FC<StudioProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()
  // Estrela FIXA (sem parallax) - Padronizada com WhatWeDo e Work

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
            slug: 'ranz',
            name: 'Ranz Enberger',
            role: 'Diretor Criativo & Tecnologia',
            credential: 'Direção Geral e Tecnologia na Montagem do Rio Museu Olímpico',
            bio: '30+ anos em produção audiovisual, VR/XR e IA. Curador VR no Festival de Gramado. Especialista Autodesk certificado.',
            photo: '/Ranz.jpeg'
          },
          {
            slug: 'anick',
            name: 'Anick Couto',
            role: 'Diretora de Arte',
            credential: 'Liderança da Equipe de Arte na Montagem do Rio Museu Olímpico',
            bio: 'Direção visual, design de personagens e cenografia digital. UI, grafismo e sinalização.',
            photo: '/anick.jpg'
          },
          {
            slug: 'alberto',
            name: 'Alberto Moura',
            role: 'Diretor Audiovisual',
            credential: 'Diretor Audiovisual na Montagem do Rio Museu Olímpico',
            bio: 'Produção audiovisual e estratégia cultural. Professor universitário e coordenador de cursos.',
            photo: '/alberto.jpg'
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
            slug: 'ranz',
            name: 'Ranz Enberger',
            role: 'Creative & Technology Director',
            credential: 'General & Technology Direction at Rio Olympic Museum Setup',
            bio: '30+ years in audiovisual production, VR/XR and AI. VR Curator at Gramado Festival. Certified Autodesk specialist.',
            photo: '/Ranz.jpeg'
          },
          {
            slug: 'anick',
            name: 'Anick Couto',
            role: 'Art Director',
            credential: 'Art Team Lead at Rio Olympic Museum Setup',
            bio: 'Visual direction, character design and digital scenography. UI, graphics and signage.',
            photo: '/anick.jpg'
          },
          {
            slug: 'alberto',
            name: 'Alberto Moura',
            role: 'Audiovisual Director',
            credential: 'Audiovisual Director at Rio Olympic Museum Setup',
            bio: 'Audiovisual production and cultural strategy. University professor and course coordinator.',
            photo: '/alberto.jpg'
          }
        ]
      },
      cta: 'Interested in working with us?',
      contact: 'Start a Project'
    },
    es: {
      title: 'Estudio',
      subtitle: 'Creando experiencias inmersivas que conectan tecnología, arte y educación. Más de 30 años de experiencia en proyectos de gran escala.',
      about: {
        title: 'Sobre Nosotros',
        text: 'Somos un estudio híbrido que combina producción cinematográfica, investigación en IA y educación inmersiva. Operamos entre Brasil y Canadá, creando experiencias que transforman cómo las personas aprenden e interactúan con el mundo digital.'
      },
      credentials: {
        title: 'Credenciales',
        items: [
          { icon: '🏛️', title: 'Olympic Museum', desc: 'Tecnología y dirección de arte', year: '2018-2023' },
          { icon: '🎓', title: 'VFS & VanArts', desc: 'Socio educativo en Canadá', year: '2024+' },
          { icon: '🏆', title: '50+ Proyectos VR/AR', desc: 'Clientes internacionales', year: '2015-2024' },
          { icon: '🤖', title: 'AI & Machine Learning', desc: 'Investigación aplicada', year: '2020+' }
        ]
      },
      areas: {
        title: 'Áreas de Actuación',
        items: [
          { icon: '🎬', title: 'Producción VR/AR', desc: 'Experiencias inmersivas cinematográficas' },
          { icon: '🎮', title: 'Serious Games', desc: 'Juegos educativos y de entrenamiento' },
          { icon: '🤖', title: 'IA & Interactividad', desc: 'Sistemas inteligentes y adaptativos' },
          { icon: '🏛️', title: 'Museografía Digital', desc: 'Exposiciones interactivas' },
          { icon: '📱', title: 'Experiencias Móviles', desc: 'Apps y WebXR' },
          { icon: '🎓', title: 'EdTech', desc: 'Plataformas educativas innovadoras' }
        ]
      },
      team: {
        title: 'Equipo',
        members: [
          {
            slug: 'ranz',
            name: 'Ranz Enberger',
            role: 'Director Creativo & Tecnología',
            credential: 'Dirección General y Tecnología en el Montaje del Rio Museo Olímpico',
            bio: '30+ años en producción audiovisual, VR/XR e IA. Curador VR en Festival de Gramado. Especialista Autodesk certificado.',
            photo: '/Ranz.jpeg'
          },
          {
            slug: 'anick',
            name: 'Anick Couto',
            role: 'Directora de Arte',
            credential: 'Líder del Equipo de Arte en el Montaje del Rio Museo Olímpico',
            bio: 'Dirección visual, diseño de personajes y escenografía digital. UI, grafismo y señalización.',
            photo: '/anick.jpg'
          },
          {
            slug: 'alberto',
            name: 'Alberto Moura',
            role: 'Director Audiovisual',
            credential: 'Director Audiovisual en el Montaje del Rio Museo Olímpico',
            bio: 'Producción audiovisual y estrategia cultural. Profesor universitario y coordinador de cursos.',
            photo: '/alberto.jpg'
          }
        ]
      },
      cta: '¿Interesado en trabajar con nosotros?',
      contact: 'Iniciar un Proyecto'
    },
    fr: {
      title: 'Studio',
      subtitle: 'Créer des expériences immersives qui connectent technologie, art et éducation. Plus de 30 ans d\'expérience dans des projets à grande échelle.',
      about: {
        title: 'À Propos de Nous',
        text: 'Nous sommes un studio hybride combinant production cinématographique, recherche en IA et éducation immersive. Opérant entre le Brésil et le Canada, nous créons des expériences qui transforment la façon dont les gens apprennent et interagissent avec le monde numérique.'
      },
      credentials: {
        title: 'Références',
        items: [
          { icon: '🏛️', title: 'Olympic Museum', desc: 'Technologie et direction artistique', year: '2018-2023' },
          { icon: '🎓', title: 'VFS & VanArts', desc: 'Partenaire éducatif au Canada', year: '2024+' },
          { icon: '🏆', title: '50+ Projets VR/AR', desc: 'Clients internationaux', year: '2015-2024' },
          { icon: '🤖', title: 'IA & Machine Learning', desc: 'Recherche appliquée', year: '2020+' }
        ]
      },
      areas: {
        title: 'Domaines d\'Expertise',
        items: [
          { icon: '🎬', title: 'Production VR/AR', desc: 'Expériences immersives cinématographiques' },
          { icon: '🎮', title: 'Serious Games', desc: 'Jeux éducatifs et de formation' },
          { icon: '🤖', title: 'IA & Interactivité', desc: 'Systèmes intelligents et adaptatifs' },
          { icon: '🏛️', title: 'Muséographie Numérique', desc: 'Expositions interactives' },
          { icon: '📱', title: 'Expériences Mobiles', desc: 'Apps et WebXR' },
          { icon: '🎓', title: 'EdTech', desc: 'Plateformes éducatives innovantes' }
        ]
      },
      team: {
        title: 'Équipe',
        members: [
          {
            slug: 'ranz',
            name: 'Ranz Enberger',
            role: 'Directeur Créatif & Technologie',
            credential: 'Direction Générale et Technologie au Montage du Musée Olympique de Rio',
            bio: '30+ ans en production audiovisuelle, VR/XR et IA. Curateur VR au Festival de Gramado. Spécialiste Autodesk certifié.',
            photo: '/Ranz.jpeg'
          },
          {
            slug: 'anick',
            name: 'Anick Couto',
            role: 'Directrice Artistique',
            credential: 'Responsable de l\'Équipe Artistique au Montage du Musée Olympique de Rio',
            bio: 'Direction visuelle, design de personnages et scénographie digitale. UI, graphisme et signalétique.',
            photo: '/anick.jpg'
          },
          {
            slug: 'alberto',
            name: 'Alberto Moura',
            role: 'Directeur Audiovisuel',
            credential: 'Directeur Audiovisuel au Montage du Musée Olympique de Rio',
            bio: 'Production audiovisuelle et stratégie culturelle. Professeur universitaire et coordinateur de cours.',
            photo: '/alberto.jpg'
          }
        ]
      },
      cta: 'Intéressé à travailler avec nous?',
      contact: 'Démarrer un Projet'
    }
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
      
      <main className="relative pb-24 film-grain">
        {/* Star Background - FIXA (FUNDO - atrás de tudo) */}
        {/* Posição: header + submenu + folga visual = 160px */}
        <StarBackground
          className="fixed top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          zIndex={-10}
          opacity={0.5}
        />

        {/* ═══════════════════════════════════════════════════════════
            NAVEGAÇÃO INTERNA - FIXO colado no header (position: fixed)
            ═══════════════════════════════════════════════════════════ */}
        {/* Submenu - Cor diferenciada: azul marinho escuro (dark) / bege claro (light) */}
        <div 
          className="fixed left-0 right-0 z-40 backdrop-blur-xl submenu-nav"
          style={{
            top: '52px',
            borderBottom: '2px solid rgba(201, 35, 55, 0.5)'
          }}
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-3">
            <nav className="flex flex-wrap gap-1 sm:gap-2">
              {[
                { id: 'overview', label: lang === 'pt' ? 'Visão Geral' : 'Overview', icon: '✦' },
                { id: 'unique', label: lang === 'pt' ? 'Diferenciais' : 'What Makes Us Unique', icon: '💡' },
                { id: 'team', label: lang === 'pt' ? 'Equipe' : 'Team', icon: '👥' },
                { id: 'credentials', label: lang === 'pt' ? 'Credenciais' : 'Credentials', icon: '🏆' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id)
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 120
                      window.scrollTo({ top, behavior: 'smooth' })
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide hover:text-azimut-red transition-colors"
                  style={{ color: 'var(--theme-text-secondary)' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Espaçador para compensar header + submenu fixos */}
        <div style={{ height: '48px' }} />

        {/* Conteúdo - DENTRO do container */}
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="pt-6 md:pt-8 mb-8">
            <div className="mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
                {lang === 'pt' ? 'NOSSO ESTÚDIO' : lang === 'es' ? 'NUESTRO ESTUDIO' : lang === 'fr' ? 'NOTRE STUDIO' : 'OUR STUDIO'}
              </span>
            </div>
            <h1 className="mb-4 font-handel uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.1' }}>
              {text.title}
            </h1>
            <p className="max-w-3xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {text.subtitle}
            </p>
          </div>

          {/* Sobre (Overview) */}
          <section id="overview" className="section-container scroll-mt-32">
            {/* LABEL PEQUENO (Eyebrow) - COM EMOJI ANIMADO */}
            <span className="section-eyebrow">
              <span>📖</span>
              {text.about.title}
            </span>
            
            {/* TÍTULO GRANDE - Hierarquia clara */}
            <h2 className="section-title">
              {lang === 'pt' ? 'Quem Somos' : lang === 'es' ? 'Quiénes Somos' : lang === 'fr' ? 'Qui Nous Sommes' : 'Who We Are'}
            </h2>
            
            {/* PARÁGRAFO - Legível e respirável */}
            <p className="body-large mb-16">
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
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                    {lang === 'pt' ? 'Imersivo • Interativo • Cinematográfico' : lang === 'es' ? 'Inmersivo • Interactivo • Cinematográfico' : lang === 'fr' ? 'Immersif • Interactif • Cinématographique' : 'Immersive • Interactive • Cinematic'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Diferenciais (What Makes Us Unique) */}
          <section id="unique" className="section-container scroll-mt-32">
            <div className="section-header">
              <div>
                {/* LABEL PEQUENO (Eyebrow) - COM EMOJI */}
                <span className="section-eyebrow">
                  <span>💡</span>
                  {lang === 'pt' ? 'Diferenciais' : lang === 'es' ? 'Diferenciales' : lang === 'fr' ? 'Différenciation' : 'What Makes Us Unique'}
                </span>
                
                {/* TÍTULO GRANDE */}
                <h2 className="section-title">
                  {lang === 'pt' ? 'O Que Nos Torna Únicos' : lang === 'es' ? 'Lo Que Nos Hace Únicos' : lang === 'fr' ? 'Ce Qui Nous Rend Uniques' : 'What Makes Us Unique'}
                </h2>
              </div>
              
              <LangLink
                to="/studio/diferenciais"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-azimut-red/10 to-transparent border-2 border-azimut-red/30 hover:border-azimut-red hover:from-azimut-red hover:to-azimut-red/90 text-azimut-red hover:text-white font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg hover:shadow-azimut-red/20 shrink-0"
              >
                <span>{lang === 'pt' ? 'Explorar Detalhes' : lang === 'es' ? 'Explorar Detalles' : lang === 'fr' ? 'Explorer Détails' : 'Explore Details'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
          <section id="team" className="section-container scroll-mt-32">
            <div className="section-header">
              <div>
                {/* LABEL PEQUENO (Eyebrow) - COM EMOJI */}
                <span className="section-eyebrow">
                  <span>👥</span>
                  {lang === 'pt' ? 'Equipe' : lang === 'es' ? 'Equipo' : lang === 'fr' ? 'Équipe' : 'Team'}
                </span>
                
                {/* TÍTULO GRANDE */}
                <h2 className="section-title">
                  {text.team.title}
                </h2>
              </div>
              
              <LangLink
                to="/studio/equipe"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-azimut-red/10 to-transparent border-2 border-azimut-red/30 hover:border-azimut-red hover:from-azimut-red hover:to-azimut-red/90 text-azimut-red hover:text-white font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg hover:shadow-azimut-red/20 shrink-0"
              >
                <span>{lang === 'pt' ? 'Ver Equipe Completa' : lang === 'es' ? 'Ver Equipo Completo' : lang === 'fr' ? 'Voir Équipe Complète' : 'View Full Team'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </LangLink>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {text.team.members.map((member, i) => (
                <div
                  key={i}
                  className="team-card group relative rounded-2xl overflow-hidden border-2 border-azimut-red/20 hover:border-azimut-red/60 transition-all duration-500 cursor-pointer"
                >
                  {/* FOTO REAL com Duotone Cinematográfico - FORMATO HORIZONTAL - CLICÁVEL */}
                  <LangLink to={`/studio/equipe#${member.slug}`} className="block">
                    <div className="team-photo relative overflow-hidden aspect-[4/3] w-full">
                      <img 
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ 
                          objectPosition: member.name.includes('Alberto') ? 'center 35%' : 'center center',
                          transform: member.name.includes('Alberto') ? 'scale(1.2)' : 'scale(1)',
                          transformOrigin: 'center center'
                        }}
                        onError={(e) => {
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)'
                          }
                          e.currentTarget.src = '/logo-azimut-star.svg'
                          e.currentTarget.className = 'absolute bottom-4 right-4 w-12 h-12 object-contain opacity-20'
                        }}
                      />
                    </div>
                  </LangLink>
                  
                  {/* Content - 2 CTAs: Nome clicável + Botão premium - FUNDO SÓLIDO */}
                  <div className="team-card-content p-4">
                    {/* Nome clicável - 2 LINHAS: Nome branco + Sobrenome vermelho */}
                    <LangLink
                      to={`/studio/equipe#${member.slug}`}
                      className="block mb-2 hover:opacity-80 transition-opacity"
                    >
                      <h3 className="team-member-name font-handel uppercase tracking-[0.04em] leading-[1.05]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
                        <span className="text-white block">{member.name.split(' ')[0]}</span>
                        <span className="text-azimut-red block">{member.name.split(' ').slice(1).join(' ')}</span>
                      </h3>
                    </LangLink>
                    
                    {/* Cargo + Credencial - 2 linhas em cream */}
                    <div className="mb-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.1em] font-semibold" style={{ color: '#d3cec3' }}>
                        {member.role}
                      </p>
                      {member.credential && (
                        <p className="text-[0.55rem] uppercase tracking-[0.08em] font-medium mt-0.5" style={{ color: '#a8a29e' }}>
                          {member.credential}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-theme-text-secondary leading-relaxed line-clamp-2 mb-4">
                      {member.bio}
                    </p>
                    
                    {/* Botão premium individual */}
                    <LangLink
                      to={`/studio/equipe#${member.slug}`}
                      className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-azimut-red hover:text-white transition-colors"
                    >
                      <span>{lang === 'pt' ? 'Ver Perfil' : lang === 'es' ? 'Ver Perfil' : lang === 'fr' ? 'Voir Profil' : 'View Profile'}</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </LangLink>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Credenciais */}
          <section id="credentials" className="section-container scroll-mt-32">
            <div className="section-header">
              <div>
                {/* LABEL PEQUENO (Eyebrow) - COM EMOJI */}
                <span className="section-eyebrow">
                  <span>🏆</span>
                  {lang === 'pt' ? 'Credenciais' : lang === 'es' ? 'Credenciales' : lang === 'fr' ? 'Références' : 'Credentials'}
                </span>
                
                {/* TÍTULO GRANDE */}
                <h2 className="section-title">
                  {text.credentials.title}
                </h2>
              </div>
              
              <LangLink
                to="/studio/credibilidade"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-azimut-red/10 to-transparent border-2 border-azimut-red/30 hover:border-azimut-red hover:from-azimut-red hover:to-azimut-red/90 text-azimut-red hover:text-white font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg hover:shadow-azimut-red/20 shrink-0"
              >
                <span>{lang === 'pt' ? 'Ver Timeline Completo' : lang === 'es' ? 'Ver Timeline Completo' : lang === 'fr' ? 'Voir Timeline Complet' : 'View Full Timeline'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </LangLink>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {text.credentials.items.map((item, i) => {
                // Suporta tanto string (PT/EN) quanto objeto (ES/FR)
                const isString = typeof item === 'string'
                const icon = isString ? item.substring(0, 2) : item.icon || '🏆'
                const text = isString ? item.substring(3) : item.desc || item.title || ''
                
                return (
                  <div key={i} className="flex items-start gap-3 p-6 rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-900/20 border border-azimut-red/10 hover:border-azimut-red/30 hover:bg-slate-900/50 transition-all">
                    <span className="text-3xl shrink-0">{icon}</span>
                    <div className="flex-1">
                      {!isString && item.title && (
                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      )}
                      <span className="text-theme-text-secondary leading-relaxed">{text}</span>
                      {!isString && item.year && (
                        <div className="text-xs text-azimut-red mt-2 font-semibold">{item.year}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Áreas de Atuação */}
          <section className="mb-16">
            <h2 className="mb-6 font-sora text-sm font-bold uppercase tracking-[0.2em] text-azimut-red flex items-center gap-2">
              <span>⚡</span>
              {text.areas.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {text.areas.items.map((area, i) => {
                // Suporta tanto { icon, name } (PT/EN) quanto { icon, title, desc } (ES/FR)
                const name = area.name || area.title || ''
                const desc = area.desc || ''
                
                return (
                  <div key={i} className="group relative rounded-xl overflow-hidden border border-azimut-red/20 hover:border-azimut-red/60 transition-all cursor-pointer" style={{ height: '180px' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-900/30 hover:bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center transition-colors">
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{area.icon}</div>
                      <p className="text-sm font-semibold text-white uppercase tracking-wide">{name}</p>
                      {desc && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{desc}</p>
                      )}
                    </div>
                  </div>
                )
              })}
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
