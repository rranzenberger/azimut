import React, { useRef, useEffect, useState } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import InternalNavigation from '../components/InternalNavigation'
import StarBackground from '../components/StarBackground'
import { useTheme } from '../contexts/ThemeContext'
import { PageFooterNavigation } from '../components/PageFooterNavigation'

interface StudioProps {
  lang: Lang
}

const Studio: React.FC<StudioProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()
  // Estrela FIXA (sem parallax) - Padronizada com WhatWeDo e Work
  const { theme } = useTheme()
  
  // 🆕 Detecção de scroll para destacar seção ativa no menu
  const [activeSection, setActiveSection] = useState<string>('overview')
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'unique', 'team', 'credentials']
      const scrollPosition = window.scrollY + 200 // Offset para compensar header
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Verificar posição inicial
    
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
          // Linha 1 (ESQUERDA SUPERIOR - primeiro que o olho vê): Associação + Educacional
          '🏆 Membros fundadores da Associação XRBR',
          '🎓 Mestrado em Mídias Criativas (UFRJ)',
          // Linha 1 (DIREITA): Educacional + Canadá (agrupados)
          '🎓 Parceria educacional: VFS & VanArts (Canadá)',
          '🌍 Operações internacionais: Brasil ↔ Canadá',
          // Linha 2 (ESQUERDA): Curadoria (agrupadas)
          '🎬 Curadoria VR no Festival de Gramado desde 2017',
          '🤖 IA, Imersivo (360°, VR/AR/XR), Mentoria & Produção',
          // Linha 2 (DIREITA - maiores no final): Histórico + Projeto Grande
          '🚀 30+ anos: Pioneiros 3D (anos 90) | Audiovisual, Motion, Vídeos\nProdução para Exposições e Projetos Imersivos',
          '🏛️ Direção Geral, Técnica e Audiovisual + Arte/Grafismo no Rio Museu Olímpico'
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
            bio: '30+ anos em produção audiovisual, VR/XR e IA. Curador VR no Festival de Gramado. Especialista Autodesk certificado. 🏛️ Cidadão Canadense - Baseado em Vancouver, BC.',
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
      cta: 'Vamos criar algo incrível juntos?',
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
          // Row 1 (TOP LEFT - first eye sees): Association + Educational
          '🏆 Founding members of XRBR Association',
          '🎓 Master\'s in Creative Media (UFRJ)',
          // Row 1 (RIGHT): Educational + Canada (grouped)
          '🎓 Educational partnership: VFS & VanArts (Canada)',
          '🌍 International operations: Brazil ↔ Canada | Production',
          // Row 2 (LEFT): Curation (grouped)
          '🎬 VR Curatorship at Gramado Festival since 2017',
          '🤖 AI, Immersive (360°, VR/AR/XR), Mentoring & Production',
          // Row 2 (RIGHT - larger at end): Historical + Large Project
          '🚀 30+ years: 3D Pioneers (1990s). | Audiovisual, Motion, Videos\nProduction for Exhibitions and Immersive Projects',
          '🏛️ General, Technical & Audiovisual Direction + Art/Graphics at Rio Olympic Museum'
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
      cta: 'Let\'s create something incredible together?',
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
          '🏆 Miembros fundadores de la Asociación XRBR',
          '🎓 Maestría en Medios Creativos (UFRJ)',
          '🎓 Asociación educativa: VFS & VanArts (Canadá)',
          '🌍 Operaciones internacionales: Brasil ↔ Canadá | Producción',
          '🎬 Curaduría VR en el Festival de Gramado desde 2017',
          '🤖 IA, Experiencias Inmersivas (VR/AR/XR), Mentoría y Producción',
          '🚀 30+ años: Pioneros 3D (años 90) | Audiovisual, Motion, Videos\nProducción para Exposiciones y Proyectos Inmersivos',
          '🏛️ Dirección General, Técnica y Audiovisual + Arte/Grafismo en el Museo Olímpico de Río'
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
          '🏆 Membres fondateurs de l\'Association XRBR',
          '🎓 Master en Médias Créatifs (UFRJ)',
          '🎓 Partenariat éducatif: VFS & VanArts (Canada)',
          '🌍 Opérations internationales: Brésil ↔ Canada | Production',
          '🎬 Curation VR au Festival de Gramado depuis 2017',
          '🤖 IA, Immersif (360°, VR/AR/XR), Mentorat & Production',
          '🚀 30+ ans: Pionniers 3D (années 90). | Audiovisuel, Motion, Vidéos\nProduction pour Expositions et Projets Immersifs',
          '🏛️ Direction Générale, Technique et Audiovisuelle + Art/Graphisme au Musée Olympique de Rio'
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
      cta: 'Créons quelque chose d\'incroyable ensemble?',
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
            top: '52px'
          }}
        >
          <div className="mx-auto max-w-7xl w-full sm:px-4 min-[768px]:px-6 py-3 flex justify-center">
            <nav className="flex flex-wrap gap-1 sm:gap-2">
              {[
                { id: 'overview', label: lang === 'pt' ? 'Visão Geral' : 'Overview', icon: '✦' },
                { id: 'unique', label: lang === 'pt' ? 'Diferenciais' : 'What Makes Us Unique', icon: '💡' },
                { id: 'team', label: lang === 'pt' ? 'Equipe' : 'Team', icon: '👥' },
                { id: 'credentials', label: lang === 'pt' ? 'Credenciais' : 'Credentials', icon: '🏆' }
              ].map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      const el = document.getElementById(item.id)
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 120
                        window.scrollTo({ top, behavior: 'smooth' })
                        setActiveSection(item.id) // Atualizar imediatamente ao clicar
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-colors ${
                      isActive
                        ? 'text-azimut-red border-b-2 border-azimut-red'
                        : 'text-slate-400 hover:text-azimut-red'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )
              })}
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
              {lang === 'pt' ? (
                <>A Azimut é um estúdio criativo-tecnológico dedicado a experiências imersivas, interativas e cinematográficas. Com raízes no Brasil e Canadá, navegamos entre cinema, design, engenharia, educação e pesquisa. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Veja nossos projetos</LangLink> ou <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">conheça nossas soluções</LangLink>.</>
              ) : lang === 'es' ? (
                <>Somos un estudio híbrido que combina producción cinematográfica, investigación en IA y educación inmersiva. Operamos entre Brasil y Canadá, creando experiencias que transforman cómo las personas aprenden e interactúan con el mundo digital. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Ver nuestros proyectos</LangLink> o <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">conocer nuestras soluciones</LangLink>.</>
              ) : lang === 'fr' ? (
                <>Nous sommes un studio hybride combinant production cinématographique, recherche en IA et éducation immersive. Opérant entre le Brésil et le Canada, nous créons des expériences qui transforment la façon dont les gens apprennent et interagissent avec le monde numérique. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">Voir nos projets</LangLink> ou <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">découvrir nos solutions</LangLink>.</>
              ) : (
                <>Azimut is a creative-technology studio dedicated to immersive, interactive and cinematic experiences. With roots in Brazil and Canada, we navigate between cinema, design, engineering, education and research. <LangLink to="/work" className="text-azimut-red hover:text-azimut-red/80 underline">View our projects</LangLink> or <LangLink to="/what" className="text-azimut-red hover:text-azimut-red/80 underline">explore our solutions</LangLink>.</>
              )}
            </p>

            {/* Visual Hero Image - Placeholder for backoffice image */}
            <div className="relative rounded-2xl overflow-hidden mb-12" style={{ height: '400px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-sm flex items-center justify-center border border-azimut-red/20">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className={`font-sora text-xl uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? 'Studio Azimut' : lang === 'es' ? 'Estudio Azimut' : lang === 'fr' ? 'Studio Azimut' : 'Azimut Studio'}
                  </p>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-on-dark-tertiary'}`}>
                    {lang === 'pt' ? 'Imersivo • Interativo • Cinematográfico' : lang === 'es' ? 'Inmersivo • Interactivo • Cinematográfico' : lang === 'fr' ? 'Immersif • Interactif • Cinématographique' : 'Immersive • Interactive • Cinematic'}
                  </p>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                MISSÃO, VISÃO E VALORES - Filosofia de Empatia
                ═══════════════════════════════════════════════════════════ */}
            <div className="mb-16">
              <h3 className="text-lg font-bold mb-8 text-azimut-red uppercase tracking-wider flex items-center gap-2">
                <span>💫</span>
                {lang === 'pt' ? 'Nossa Filosofia' : lang === 'es' ? 'Nuestra Filosofía' : lang === 'fr' ? 'Notre Philosophie' : 'Our Philosophy'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* MISSÃO */}
                <div 
                  className="p-6 rounded-2xl border border-azimut-red/20"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.8) 0%, rgba(26, 24, 21, 0.6) 100%)'
                  }}
                >
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className={`text-lg font-bold mb-3 uppercase tracking-wide ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? 'Missão' : lang === 'es' ? 'Misión' : lang === 'fr' ? 'Mission' : 'Mission'}
                  </h4>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
                    {lang === 'pt' 
                      ? 'Sentir DENTRO do que nossos parceiros sentem. Não observamos de fora — entramos, sentimos, e a partir daí, criamos experiências que transformam.'
                      : lang === 'es'
                      ? 'Sentir DENTRO de lo que nuestros socios sienten. No observamos desde afuera — entramos, sentimos, y a partir de ahí, creamos experiencias que transforman.'
                      : lang === 'fr'
                      ? 'Ressentir DE L\'INTÉRIEUR ce que nos partenaires ressentent. Nous n\'observons pas de l\'extérieur — nous entrons, ressentons, et à partir de là, créons des expériences qui transforment.'
                      : 'Feel FROM WITHIN what our partners feel. We don\'t observe from outside — we enter, feel, and from there, create experiences that transform.'}
                  </p>
                </div>

                {/* VISÃO */}
                <div 
                  className="p-6 rounded-2xl border border-azimut-red/20"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.8) 0%, rgba(26, 24, 21, 0.6) 100%)'
                  }}
                >
                  <div className="text-3xl mb-3">🔭</div>
                  <h4 className={`text-lg font-bold mb-3 uppercase tracking-wide ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? 'Visão' : lang === 'es' ? 'Visión' : lang === 'fr' ? 'Vision' : 'Vision'}
                  </h4>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
                    {lang === 'pt' 
                      ? 'Ser a máquina de empatia que conecta tecnologia e emoção. Criar experiências onde as pessoas não apenas veem — elas VIVEM.'
                      : lang === 'es'
                      ? 'Ser la máquina de empatía que conecta tecnología y emoción. Crear experiencias donde las personas no solo ven — VIVEN.'
                      : lang === 'fr'
                      ? 'Être la machine d\'empathie qui connecte technologie et émotion. Créer des expériences où les gens ne font pas que voir — ils VIVENT.'
                      : 'Be the empathy machine that connects technology and emotion. Create experiences where people don\'t just watch — they LIVE.'}
                  </p>
                  <p className={`text-xs mt-3 italic ${theme === 'dark' ? 'text-slate-400' : 'text-on-dark-tertiary'}`}>
                    — Chris Milk, TED Vancouver 2015
                  </p>
                </div>

                {/* VALORES */}
                <div 
                  className="p-6 rounded-2xl border border-azimut-red/20"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.8) 0%, rgba(26, 24, 21, 0.6) 100%)'
                  }}
                >
                  <div className="text-3xl mb-3">💎</div>
                  <h4 className={`text-lg font-bold mb-3 uppercase tracking-wide ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? 'Valores' : lang === 'es' ? 'Valores' : lang === 'fr' ? 'Valeurs' : 'Values'}
                  </h4>
                  <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
                    <li className="flex items-start gap-2">
                      <span className="text-azimut-red">✦</span>
                      <span>{lang === 'pt' ? 'Empatia: Sentir DENTRO, não apenas COM' : lang === 'es' ? 'Empatía: Sentir DENTRO, no solo CON' : lang === 'fr' ? 'Empathie: Ressentir DE L\'INTÉRIEUR, pas juste AVEC' : 'Empathy: Feel FROM WITHIN, not just WITH'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-azimut-red">✦</span>
                      <span>{lang === 'pt' ? 'Autenticidade: Descontraídos, confiantes, genuínos' : lang === 'es' ? 'Autenticidad: Relajados, confiados, genuinos' : lang === 'fr' ? 'Authenticité: Décontractés, confiants, authentiques' : 'Authenticity: Relaxed, confident, genuine'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-azimut-red">✦</span>
                      <span>{lang === 'pt' ? 'Presença: "Tô aqui", "Do teu lado", "Junto"' : lang === 'es' ? 'Presencia: "Estoy aquí", "A tu lado", "Juntos"' : lang === 'fr' ? 'Présence: "Je suis là", "À tes côtés", "Ensemble"' : 'Presence: "I\'m here", "By your side", "Together"'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════
                  VÍDEO CHRIS MILK - A Máquina de Empatia (LARGURA TOTAL)
                  ═══════════════════════════════════════════════════════════ */}
              <div className="mt-8 mb-6">
                <div className="text-center mb-4">
                  <h4 className={`text-xl font-handel uppercase tracking-wide ${theme === 'dark' ? 'text-azimut-red' : 'text-azimut-red'}`}>
                    {lang === 'pt' ? 'A Máquina de Empatia' : lang === 'es' ? 'La Máquina de Empatía' : lang === 'fr' ? 'La Machine à Empathie' : 'The Empathy Machine'}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-on-dark-tertiary'}`}>
                    Chris Milk • TED Talk 2015
                  </p>
                </div>
                <div 
                  className="relative rounded-2xl overflow-hidden border-2 border-azimut-red/30 shadow-2xl w-full"
                  style={{
                    background: theme === 'dark' 
                      ? 'rgba(15, 23, 42, 0.5)'
                      : 'rgba(26, 24, 21, 0.5)'
                  }}
                >
                  {/* Vídeo multilíngue - usa vídeo do idioma atual ou fallback para PT */}
                  <video 
                    controls 
                    className="w-full aspect-video bg-slate-900"
                    poster="/chris-milk-thumbnail.jpg"
                    preload="metadata"
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    onLoadedMetadata={(e) => {
                      // Garante que o thumbnail aparece quando a página carrega
                      const video = e.currentTarget;
                      video.currentTime = 0;
                    }}
                    onPause={(e) => {
                      // Quando pausar, volta para o início e mostra thumbnail
                      const video = e.currentTarget;
                      // Timeout para não interferir quando o usuário apenas pausa temporariamente
                      setTimeout(() => {
                        if (video.paused && !video.ended) {
                          video.currentTime = 0;
                          video.load();
                        }
                      }, 180000); // 3 minutos = 180000ms
                    }}
                    onEnded={(e) => {
                      // Quando o vídeo terminar, volta para o início e mostra o poster/thumbnail
                      const video = e.currentTarget;
                      video.currentTime = 0;
                      video.load(); // Recarrega para mostrar o poster novamente
                    }}
                    onError={(e) => {
                      // Se o vídeo do idioma não existir, carrega o PT
                      const video = e.currentTarget;
                      if (!video.src.includes('ChrisMilk.mp4')) {
                        video.src = '/ChrisMilk.mp4';
                      }
                    }}
                  >
                    {/* Vídeo por idioma com fallback para PT */}
                    <source 
                      src={(() => {
                        const videos: Record<string, string> = {
                          pt: '/ChrisMilk.mp4',
                          en: '/ChrisMilk-en.mp4',
                          es: '/ChrisMilk-es.mp4',
                          fr: '/ChrisMilk-fr.mp4'
                        };
                        return videos[lang] || videos.pt;
                      })()} 
                      type="video/mp4" 
                    />
                    {/* Fallback para português se o vídeo do idioma não existir */}
                    <source src="/ChrisMilk.mp4" type="video/mp4" />
                    {lang === 'pt' ? 'Seu navegador não suporta vídeo HTML5.' : 'Your browser does not support HTML5 video.'}
                  </video>
                </div>
              </div>

              {/* Citação Chris Milk - The Ultimate Empathy Machine */}
              <div 
                className="p-6 rounded-2xl border-l-4 border-azimut-red"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(135deg, rgba(201, 35, 55, 0.1) 0%, rgba(15, 23, 42, 0.3) 100%)'
                    : 'linear-gradient(135deg, rgba(201, 35, 55, 0.15) 0%, rgba(26, 24, 21, 0.4) 100%)'
                }}
              >
                <p className={`text-lg italic leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-on-dark-primary'}`}>
                  {lang === 'pt' 
                    ? '"Não é uma máquina de filme. Não é uma máquina de TV. É uma máquina de empatia. Você pode ver como é ser outra pessoa."'
                    : lang === 'es'
                    ? '"No es una máquina de cine. No es una máquina de televisión. Es una máquina de empatía. Puedes ver cómo es ser otra persona."'
                    : lang === 'fr'
                    ? '"Ce n\'est pas une machine à films. Ce n\'est pas une machine à télévision. C\'est une machine à empathie. Vous pouvez voir ce que c\'est d\'être quelqu\'un d\'autre."'
                    : '"It\'s not a film machine. It\'s not a TV machine. It\'s an empathy machine. You can see what it\'s like to be someone else."'}
                </p>
                <p className={`text-sm mt-3 font-semibold ${theme === 'dark' ? 'text-azimut-red' : 'text-azimut-red'}`}>
                  — Chris Milk, TED Talk "How Virtual Reality Can Create the Ultimate Empathy Machine" (2015)
                </p>
              </div>

              {/* Citação Carl Rogers */}
              <div 
                className="mt-4 p-6 rounded-2xl border-l-4 border-slate-500"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.2) 0%, rgba(15, 23, 42, 0.3) 100%)'
                    : 'linear-gradient(135deg, rgba(71, 85, 105, 0.25) 0%, rgba(26, 24, 21, 0.4) 100%)'
                }}
              >
                <p className={`text-lg italic leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-on-dark-primary'}`}>
                  {lang === 'pt' 
                    ? '"Ter empatia é ver o mundo pelos olhos do outro, não ver o seu mundo refletido nos olhos dele."'
                    : lang === 'es'
                    ? '"Tener empatía es ver el mundo a través de los ojos del otro, no ver tu mundo reflejado en sus ojos."'
                    : lang === 'fr'
                    ? '"Avoir de l\'empathie, c\'est voir le monde à travers les yeux de l\'autre, pas voir son propre monde reflété dans ses yeux."'
                    : '"To have empathy is to see the world through the other\'s eyes, not to see your world reflected in their eyes."'}
                </p>
                <p className={`text-sm mt-3 font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-on-dark-tertiary'}`}>
                  — Carl Rogers, Psicólogo Humanista
                </p>
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
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg shrink-0 relative overflow-hidden"
                style={theme === 'light' ? {
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.5) 0%, rgba(201, 35, 55, 0.4) 100%)',
                  border: '2px solid rgba(201, 35, 55, 0.8)',
                  color: '#f5f1e8',
                  boxShadow: '0 4px 12px rgba(201, 35, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                } : {
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.1) 100%)',
                  border: '2px solid rgba(201, 35, 55, 0.5)',
                  color: '#c92337'
                }}
                onMouseEnter={(e) => {
                  if (theme === 'light') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.75) 0%, rgba(201, 35, 55, 0.65) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 35, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 1) 0%, rgba(201, 35, 55, 0.9) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 35, 55, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme === 'light') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.5) 0%, rgba(201, 35, 55, 0.4) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.8)'
                    e.currentTarget.style.color = '#f5f1e8'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.1) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.5)'
                    e.currentTarget.style.color = '#c92337'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                <span>{lang === 'pt' ? 'Explorar Detalhes' : lang === 'es' ? 'Explorar Detalles' : lang === 'fr' ? 'Explorer Détails' : 'Explore Details'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </LangLink>
            </div>
            
            {/* Preview Cards com IMAGENS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative rounded-xl overflow-hidden border border-azimut-red/20 transition-all" style={{ height: '300px' }}>
                <div 
                  className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.9) 0%, rgba(26, 24, 21, 0.7) 100%)'
                  }}
                >
                  <div className="text-6xl mb-4 transition-transform">🎬</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? 'Studio + Lab + Academy' : lang === 'es' ? 'Estudio + Lab + Academia' : lang === 'fr' ? 'Studio + Lab + Académie' : 'Studio + Lab + Academy'}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
                    {lang === 'pt' ? 'Produção, pesquisa e educação em um só lugar' : lang === 'es' ? 'Producción, investigación y educación en un solo lugar' : lang === 'fr' ? 'Production, recherche et éducation en un seul endroit' : 'Production, research and education in one place'}
                  </p>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden border border-azimut-red/20 transition-all" style={{ height: '300px' }}>
                <div 
                  className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.7) 0%, rgba(26, 24, 21, 0.5) 100%)'
                  }}
                >
                  <div className="text-6xl mb-4 transition-transform">🌍</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? 'Brasil ↔ Canadá' : lang === 'es' ? 'Brasil ↔ Canadá' : lang === 'fr' ? 'Brésil ↔ Canada' : 'Brazil ↔ Canada'}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
                    {lang === 'pt' ? 'Operações internacionais, perspectivas globais' : lang === 'es' ? 'Operaciones internacionales, perspectivas globales' : lang === 'fr' ? 'Opérations internationales, perspectives mondiales' : 'International operations, global perspectives'}
                  </p>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden border border-azimut-red/20 transition-all" style={{ height: '300px' }}>
                <div 
                  className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 28, 26, 0.5) 0%, rgba(26, 24, 21, 0.3) 100%)'
                  }}
                >
                  <div className="text-6xl mb-4 transition-transform">🎯</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                    {lang === 'pt' ? '30+ Anos Experiência' : lang === 'es' ? '30+ Años de Experiencia' : lang === 'fr' ? '30+ Ans d\'Expérience' : '30+ Years Experience'}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-on-dark-secondary'}`}>
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
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg shrink-0 relative overflow-hidden"
                style={theme === 'light' ? {
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.5) 0%, rgba(201, 35, 55, 0.4) 100%)',
                  border: '2px solid rgba(201, 35, 55, 0.8)',
                  color: '#f5f1e8',
                  boxShadow: '0 4px 12px rgba(201, 35, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                } : {
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.1) 100%)',
                  border: '2px solid rgba(201, 35, 55, 0.5)',
                  color: '#c92337'
                }}
                onMouseEnter={(e) => {
                  if (theme === 'light') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.75) 0%, rgba(201, 35, 55, 0.65) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 35, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 1) 0%, rgba(201, 35, 55, 0.9) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 35, 55, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme === 'light') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.5) 0%, rgba(201, 35, 55, 0.4) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.8)'
                    e.currentTarget.style.color = '#f5f1e8'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.1) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.5)'
                    e.currentTarget.style.color = '#c92337'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
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
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg shrink-0 relative overflow-hidden"
                style={theme === 'light' ? {
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.5) 0%, rgba(201, 35, 55, 0.4) 100%)',
                  border: '2px solid rgba(201, 35, 55, 0.8)',
                  color: '#f5f1e8',
                  boxShadow: '0 4px 12px rgba(201, 35, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                } : {
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.1) 100%)',
                  border: '2px solid rgba(201, 35, 55, 0.5)',
                  color: '#c92337'
                }}
                onMouseEnter={(e) => {
                  if (theme === 'light') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.75) 0%, rgba(201, 35, 55, 0.65) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 35, 55, 0.4), 0 0 20px rgba(201, 35, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 1) 0%, rgba(201, 35, 55, 0.9) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 35, 55, 0.3), 0 0 20px rgba(201, 35, 55, 0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme === 'light') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.5) 0%, rgba(201, 35, 55, 0.4) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.8)'
                    e.currentTarget.style.color = '#f5f1e8'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.1) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.5)'
                    e.currentTarget.style.color = '#c92337'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
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
                  <div 
                    key={i} 
                    className="flex items-center gap-3 p-6 rounded-xl border border-azimut-red/10 transition-all group"
                    style={{
                      background: theme === 'dark' 
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(30, 28, 26, 0.65) 0%, rgba(26, 24, 21, 0.5) 100%)'
                    }}
                  >
                    <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}>{icon}</span>
                    <div className="flex-1">
                      {!isString && item.title && (
                        <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{item.title}</h4>
                      )}
                      <span className={`leading-relaxed ${theme === 'dark' ? 'text-theme-text-secondary' : 'text-on-dark-secondary'}`} style={{ whiteSpace: 'pre-line' }}>{text}</span>
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
                
                // Mapeamento de áreas para slugs de serviços
                const getServiceSlug = (areaName: string): string => {
                  const areaLower = areaName.toLowerCase()
                  if (areaLower.includes('cinema') || areaLower.includes('audiovisual')) return 'cinema-audiovisual'
                  if (areaLower.includes('vr') || areaLower.includes('xr') || areaLower.includes('ar') || areaLower.includes('virtual')) return 'realidade-virtual-vr'
                  if (areaLower.includes('vfx') || areaLower.includes('cgi')) return 'pos-producao-vfx'
                  if (areaLower.includes('motion') || areaLower.includes('design')) return 'pos-producao-vfx'
                  if (areaLower.includes('museografia') || areaLower.includes('museu') || areaLower.includes('museography') || areaLower.includes('exhibition')) return 'museus-exposicoes'
                  if (areaLower.includes('educação') || areaLower.includes('education') || areaLower.includes('educacion') || areaLower.includes('éducation')) return 'educacao-treinamento'
                  return '/what' // fallback para página geral
                }
                
                const serviceSlug = getServiceSlug(name)
                
                return (
                  <LangLink
                    key={i}
                    to={`/what/${serviceSlug}`}
                    className="group relative rounded-xl overflow-hidden border border-azimut-red/20 transition-all cursor-pointer block"
                    style={{ height: '180px', borderColor: 'rgba(201, 35, 55, 0.2)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 1)'
                      e.currentTarget.style.borderWidth = '2px'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 35, 55, 0.2)'
                      e.currentTarget.style.borderWidth = '1px'
                    }}
                  >
                    <div 
                      className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center transition-colors"
                      style={{
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)'
                          : 'linear-gradient(135deg, rgba(30, 28, 26, 0.9) 0%, rgba(26, 24, 21, 0.7) 100%)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(30, 28, 26, 0.95) 0%, rgba(26, 24, 21, 0.8) 100%)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)'
                          : 'linear-gradient(135deg, rgba(30, 28, 26, 0.9) 0%, rgba(26, 24, 21, 0.7) 100%)'
                      }}
                    >
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{area.icon}</div>
                      <p className="text-sm font-semibold text-white uppercase tracking-wide">{name}</p>
                      {desc && (
                        <p className="text-xs text-slate-300 dark:text-slate-300 mt-1">{desc}</p>
                      )}
                    </div>
                  </LangLink>
                )
              })}
            </div>
          </section>

        </div>

        {/* Navegação Final - Curada e Organizada */}
        <PageFooterNavigation
          lang={lang}
          mainCta={{
            title: text.cta,
            description: lang === 'pt' ? 'Entre em contato para discutir seu projeto e descobrir como podemos transformar sua visão em realidade.' : lang === 'es' ? 'Contáctanos para discutir tu proyecto y descubrir cómo podemos transformar tu visión en realidad.' : lang === 'fr' ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons transformer votre vision en réalité.' : 'Get in touch to discuss your project and discover how we can transform your vision into reality.',
            buttonText: text.contact,
            buttonHref: '/contact'
          }}
          navigation={{
            previous: {
              label: lang === 'pt' ? 'Ver Projetos' : lang === 'es' ? 'Ver Proyectos' : lang === 'fr' ? 'Voir Projets' : 'View Projects',
              href: '/work',
              icon: '🎬'
            },
            next: {
              label: lang === 'pt' ? 'Ver Soluções' : lang === 'es' ? 'Ver Soluciones' : lang === 'fr' ? 'Voir Solutions' : 'View Solutions',
              href: '/what',
              icon: '✨'
            }
          }}
        />
      </main>
    </>
  )
}

export default Studio
