import React, { useState, useEffect } from 'react'
import { t, type Lang } from '../i18n'
import { useLocation, useNavigate } from 'react-router-dom'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { useBackofficeContent } from '../hooks/useBackofficeContent'
import InternalNavigation from '../components/InternalNavigation'

interface AcademyProps {
  lang: Lang
  section?: 'research' | 'courses' | 'corporate'
}

const Academy: React.FC<AcademyProps> = ({ lang, section }) => {
  useUserTracking()
  const seo = seoData.academy[lang]
  const location = useLocation()
  const navigate = useNavigate()
  
  // Buscar conteúdo da página academy do backoffice (opcional, para SEO)
  const { page: academyPage, loading: pageLoading } = useBackofficeContent('academy', lang)
  
  // Lab items não estão no banco ainda - deixar vazio por enquanto
  // TODO: Implementar modelo Lab no banco ou usar seções da página
  // PROTEÇÃO: Garantir que sempre seja array
  const labItems: any[] = []
  
  // Função locale para conteúdo estático (workshops, áreas, etc)
  // Academy mantém conteúdo estático por enquanto devido à complexidade dos submenus
  const locale = (entry: { pt: string; en: string; es: string; fr?: string }) => {
    if (lang === 'fr') return entry.fr || entry.en
    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }

  // Detectar seção ativa baseada no prop section ou hash
  const [activeSection, setActiveSection] = useState<'research' | 'courses' | 'corporate'>(() => {
    if (section) return section
    const hash = location.hash.replace('#', '')
    if (hash === 'courses') return 'courses'
    if (hash === 'corporate') return 'corporate'
    return 'research'
  })

  // Sincronizar activeSection com prop section
  useEffect(() => {
    if (section) {
      setActiveSection(section)
      // Scroll para o topo ao mudar de seção
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [section])

  // Função para mudar seção (navega para a rota correta)
  const changeSection = (newSection: 'research' | 'courses' | 'corporate') => {
    setActiveSection(newSection)
    navigate(`/${lang}/academy/${newSection}`)
  }

  // ═══════════════════════════════════════════════════════════════
  // WORKSHOPS E CURSOS
  // ═══════════════════════════════════════════════════════════════
  const workshops = [
    {
      title: { 
        pt: 'VR Cinematográfico: Do Conceito à Tela', 
        en: 'Cinematic VR: From Concept to Screen', 
        es: 'VR Cinematográfico: Del Concepto a la Pantalla', 
        fr: 'VR Cinématographique: Du Concept à l\'Écran' 
      },
      description: { 
        pt: 'Aprenda a criar filmes imersivos em 360°. Domine linguagem cinematográfica para VR, direção de câmera, narrativa espacial e pós-produção profissional.',
        en: 'Learn to create immersive 360° films. Master cinematic language for VR, camera direction, spatial storytelling and professional post-production.',
        es: 'Aprende a crear películas inmersivas en 360°. Domina el lenguaje cinematográfico para VR, dirección de cámara, narrativa espacial y postproducción profesional.',
        fr: 'Apprenez à créer des films immersifs en 360°. Maîtrisez le langage cinématographique pour la VR, la direction de caméra, la narration spatiale et la post-production professionnelle.'
      },
      duration: '16h',
      level: { pt: 'Intermediário', en: 'Intermediate', es: 'Intermedio', fr: 'Intermédiaire' },
      audience: { pt: 'Cineastas, produtores, criadores', en: 'Filmmakers, producers, creators', es: 'Cineastas, productores, creadores', fr: 'Cinéastes, producteurs, créateurs' }
    },
    {
      title: { 
        pt: 'IA Generativa para Produção Audiovisual', 
        en: 'Generative AI for Audiovisual Production', 
        es: 'IA Generativa para Producción Audiovisual', 
        fr: 'IA Générative pour Production Audiovisuelle' 
      },
      description: { 
        pt: 'Pipelines completos de IA aplicados a roteiro, storyboard, animação, VFX e finalização. Ferramentas práticas: ChatGPT, Midjourney, Runway, Stable Diffusion.',
        en: 'Complete AI pipelines applied to script, storyboard, animation, VFX and finishing. Practical tools: ChatGPT, Midjourney, Runway, Stable Diffusion.',
        es: 'Pipelines completos de IA aplicados a guión, storyboard, animación, VFX y finalización. Herramientas prácticas: ChatGPT, Midjourney, Runway, Stable Diffusion.',
        fr: 'Pipelines complets d\'IA appliqués au scénario, storyboard, animation, VFX et finalisation. Outils pratiques: ChatGPT, Midjourney, Runway, Stable Diffusion.'
      },
      duration: '12h',
      level: { pt: 'Avançado', en: 'Advanced', es: 'Avanzado', fr: 'Avancé' },
      audience: { pt: 'Profissionais de audiovisual, VFX, animação', en: 'Audiovisual, VFX, animation professionals', es: 'Profesionales de audiovisual, VFX, animación', fr: 'Professionnels audiovisuels, VFX, animation' }
    },
    {
      title: { 
        pt: 'Instalações Interativas para Museus e Eventos', 
        en: 'Interactive Installations for Museums & Events', 
        es: 'Instalaciones Interactivas para Museos y Eventos', 
        fr: 'Installations Interactives pour Musées & Événements' 
      },
      description: { 
        pt: 'Desenvolva experiências interativas imersivas. Aprenda sensores, projeções mapeadas, interfaces físicas e integração com conteúdo audiovisual.',
        en: 'Develop immersive interactive experiences. Learn sensors, mapped projections, physical interfaces and integration with audiovisual content.',
        es: 'Desarrolla experiencias interactivas inmersivas. Aprende sensores, proyecciones mapeadas, interfaces físicas e integración con contenido audiovisual.',
        fr: 'Développez des expériences interactives immersives. Apprenez les capteurs, projections mappées, interfaces physiques et intégration avec contenu audiovisuel.'
      },
      duration: '20h',
      level: { pt: 'Intermediário', en: 'Intermediate', es: 'Intermedio', fr: 'Intermédiaire' },
      audience: { pt: 'Museólogos, produtores culturais, artistas', en: 'Museologists, cultural producers, artists', es: 'Museólogos, productores culturales, artistas', fr: 'Muséologues, producteurs culturels, artistes' }
    },
    {
      title: { 
        pt: 'Motion Design & Animação para Projetos Imersivos', 
        en: 'Motion Design & Animation for Immersive Projects', 
        es: 'Motion Design & Animación para Proyectos Inmersivos', 
        fr: 'Motion Design & Animation pour Projets Immersifs' 
      },
      description: { 
        pt: 'Técnicas profissionais de motion graphics, animação 2D/3D e composição para projetos imersivos. After Effects, Cinema 4D, Blender.',
        en: 'Professional motion graphics techniques, 2D/3D animation and compositing for immersive projects. After Effects, Cinema 4D, Blender.',
        es: 'Técnicas profesionales de motion graphics, animación 2D/3D y composición para proyectos inmersivos. After Effects, Cinema 4D, Blender.',
        fr: 'Techniques professionnelles de motion graphics, animation 2D/3D et composition pour projets immersifs. After Effects, Cinema 4D, Blender.'
      },
      duration: '24h',
      level: { pt: 'Básico a Intermediário', en: 'Beginner to Intermediate', es: 'Básico a Intermedio', fr: 'Débutant à Intermédiaire' },
      audience: { pt: 'Designers, animadores, criadores', en: 'Designers, animators, creators', es: 'Diseñadores, animadores, creadores', fr: 'Designers, animateurs, créateurs' }
    }
  ]

  // PROTEÇÃO: Garantir que workshops sempre seja array válido (DEPOIS da declaração)
  const safeWorkshops = Array.isArray(workshops) && workshops.length > 0 ? workshops : []

  // ═══════════════════════════════════════════════════════════════
  // LABELS E TEXTS
  // ═══════════════════════════════════════════════════════════════
  const labels = {
    hero: {
      title: {
        pt: 'Academia Azimut',
        en: 'Azimut Academy',
        es: 'Academia Azimut',
        fr: 'Académie Azimut'
      },
      subtitle: {
        pt: 'Onde conhecimento, pesquisa e inovação se encontram',
        en: 'Where knowledge, research and innovation meet',
        es: 'Donde el conocimiento, la investigación y la innovación se encuentran',
        fr: 'Où la connaissance, la recherche et l\'innovation se rencontrent'
      }
    },
    tabs: {
      research: {
        pt: 'Pesquisa & Inovação',
        en: 'Research & Innovation',
        es: 'Investigación & Innovación',
        fr: 'Recherche & Innovation'
      },
      courses: {
        pt: 'Cursos & Workshops',
        en: 'Courses & Workshops',
        es: 'Cursos & Workshops',
        fr: 'Cours & Workshops'
      },
      corporate: {
        pt: 'Treinamento Corporativo',
        en: 'Corporate Training',
        es: 'Entrenamiento Corporativo',
        fr: 'Formation d\'Entreprise'
      }
    },
    research: {
      title: {
        pt: 'Pesquisa & Desenvolvimento',
        en: 'Research & Development',
        es: 'Investigación & Desarrollo',
        fr: 'Recherche & Développement'
      },
      description: {
        pt: 'Exploramos fronteiras tecnológicas e artísticas, desenvolvendo metodologias experimentais para narrativas imersivas. Nossos projetos de P&D resultam em inovações aplicadas em museus, festivais e instalações públicas.',
        en: 'We explore technological and artistic frontiers, developing experimental methodologies for immersive storytelling. Our R&D projects result in innovations applied in museums, festivals and public installations.',
        es: 'Exploramos fronteras tecnológicas y artísticas, desarrollando metodologías experimentales para narrativas inmersivas. Nuestros proyectos de I+D resultan en innovaciones aplicadas en museos, festivales e instalaciones públicas.',
        fr: 'Nous explorons les frontières technologiques et artistiques, développant des méthodologies expérimentales pour narrations immersives. Nos projets R&D aboutissent à des innovations appliquées dans musées, festivals et installations publiques.'
      }
    },
    courses: {
      title: {
        pt: 'Aprenda com Especialistas',
        en: 'Learn from Specialists',
        es: 'Aprende con Especialistas',
        fr: 'Apprenez des Spécialistes'
      },
      description: {
        pt: 'Workshops práticos e cursos intensivos ministrados por profissionais com 30 anos de experiência. Formação profissional em tecnologias imersivas, IA e produção audiovisual.',
        en: 'Practical workshops and intensive courses taught by professionals with 30 years of experience. Professional training in immersive technologies, AI and audiovisual production.',
        es: 'Workshops prácticos y cursos intensivos impartidos por profesionales con 30 años de experiencia. Formación profesional en tecnologías inmersivas, IA y producción audiovisual.',
        fr: 'Workshops pratiques et cours intensifs dispensés par des professionnels avec 30 ans d\'expérience. Formation professionnelle en technologies immersives, IA et production audiovisuelle.'
      }
    },
    corporate: {
      title: {
        pt: 'Soluções para Empresas',
        en: 'Solutions for Companies',
        es: 'Soluciones para Empresas',
        fr: 'Solutions pour Entreprises'
      },
      description: {
        pt: 'Treinamento customizado in-company, consultoria especializada e capacitação de equipes. Desenvolvemos programas sob medida para grandes corporações, instituições e organizações.',
        en: 'Custom in-company training, specialized consulting and team development. We develop tailored programs for large corporations, institutions and organizations.',
        es: 'Entrenamiento personalizado in-company, consultoría especializada y capacitación de equipos. Desarrollamos programas a medida para grandes corporaciones, instituciones y organizaciones.',
        fr: 'Formation personnalisée en entreprise, conseil spécialisé et développement d\'équipes. Nous développons des programmes sur mesure pour grandes entreprises, institutions et organisations.'
      }
    }
  }

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/academy"
      />
      <main className="relative pt-6 md:pt-8 pb-24">
        {/* Star background on the side */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px]" 
          style={{ 
            opacity: 0.3,
            zIndex: -5
          }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* ═══════════════════════════════════════════════════════════════
              HERO SECTION
              ═══════════════════════════════════════════════════════════ */}
          {/* Prefixo Narrativo - APENAS ESTE ANIMA */}
          <div className="mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
              {lang === 'pt' ? 'COMPARTILHAMOS' : lang === 'es' ? 'COMPARTIMOS' : lang === 'fr' ? 'NOUS PARTAGEONS' : 'WE SHARE'}
            </span>
          </div>
          
          {/* Título - SEM animação */}
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl lg:text-6xl" style={{ color: 'var(--theme-text)' }}>
            {labels.hero.title[lang]}
          </h1>
          
          {/* Parágrafo - SEM animação */}
          <p className="mb-8 max-w-3xl text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {labels.hero.subtitle[lang]}
          </p>

          {/* Navegação Interna - Padrão Universal Azimut */}
          <InternalNavigation
              items={[
                {
                  id: 'research',
                  label: lang === 'pt' ? 'Pesquisa & Inovação' : lang === 'es' ? 'Investigación & Innovación' : lang === 'fr' ? 'Recherche & Innovation' : 'Research & Innovation',
                  href: `/academy/research`,
                  icon: '🔬'
                },
                {
                  id: 'courses',
                  label: lang === 'pt' ? 'Cursos & Workshops' : lang === 'es' ? 'Cursos & Workshops' : lang === 'fr' ? 'Cours & Workshops' : 'Courses & Workshops',
                  href: `/academy/courses`,
                  icon: '📚'
                },
                {
                  id: 'corporate',
                  label: lang === 'pt' ? 'Treinamento Corporativo' : lang === 'es' ? 'Entrenamiento Corporativo' : lang === 'fr' ? 'Formation d\'Entreprise' : 'Corporate Training',
                  href: `/academy/corporate`,
                  icon: '🏢'
                }
              ]}
              defaultActive={activeSection}
              lang={lang}
            />

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: PESQUISA & INOVAÇÃO
              ═══════════════════════════════════════════════════════════ */}
          {activeSection === 'research' && (
            <div id="research" className="space-y-12">
              <div>
                <h2 className="mb-4 font-handel text-2xl md:text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {labels.research.title[lang]}
                </h2>
                <p className="mb-8 max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {labels.research.description[lang]}
                </p>
              </div>

              {/* Projetos de Pesquisa */}
              {/* TODO: Lab items não estão no banco ainda - implementar quando necessário */}
              {((labItems && Array.isArray(labItems) && labItems.length > 0) ? labItems : []).length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {((labItems && Array.isArray(labItems)) ? labItems : []).map((item: any) => (
                    <article
                      key={item.slug}
                      className="group rounded-2xl border border-white/10 card-adaptive p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                    >
                      <div className="mb-3 inline-block rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.2em]" style={{ 
                        borderColor: 'rgba(var(--theme-accent-red-rgb), 0.8)',
                        backgroundColor: 'rgba(var(--theme-accent-red-rgb), 0.25)',
                        color: 'var(--theme-bg)' // Usa cor de fundo (branco no claro, escuro no dark)
                      }}>
                        {item.type === 'experiment' ? (lang === 'pt' ? 'Experimento' : lang === 'es' ? 'Experimento' : lang === 'fr' ? 'Expérience' : 'Experiment') : 
                         item.type === 'workshop' ? (lang === 'pt' ? 'Workshop' : lang === 'es' ? 'Workshop' : lang === 'fr' ? 'Atelier' : 'Workshop') :
                         (lang === 'pt' ? 'Mentoria' : lang === 'es' ? 'Mentoría' : lang === 'fr' ? 'Mentorat' : 'Mentoring')}
                      </div>
                      <h3 className="mb-3 font-sora text-xl text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-50 dark:text-slate-200">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-slate-800 dark:text-slate-400 italic">
                  {lang === 'pt' ? 'Conteúdo de pesquisa em desenvolvimento.' : 
                   lang === 'es' ? 'Contenido de investigación en desarrollo.' :
                   lang === 'fr' ? 'Contenu de recherche en développement.' :
                   'Research content in development.'}
                </p>
              )}

              {/* Áreas de Pesquisa */}
              <section className="mt-16">
                <h3 className="mb-6 font-handel text-xl uppercase tracking-[0.14em]" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? 'Áreas de Pesquisa' : lang === 'es' ? 'Áreas de Investigación' : lang === 'fr' ? 'Domaines de Recherche' : 'Research Areas'}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { pt: 'IA Generativa para Narrativa', en: 'Generative AI for Storytelling', es: 'IA Generativa para Narrativa', fr: 'IA Générative pour Récit' },
                    { pt: 'Cinematic VR & 360°', en: 'Cinematic VR & 360°', es: 'VR & 360° Cinematográfico', fr: 'VR Cinématographique & 360°' },
                    { pt: 'Sistemas Interativos', en: 'Interactive Systems', es: 'Sistemas Interactivos', fr: 'Systèmes Interactifs' },
                    { pt: 'Pipelines Híbridos (IA+Humano)', en: 'Hybrid Pipelines (AI+Human)', es: 'Pipelines Híbridos (IA+Humano)', fr: 'Pipelines Hybrides (IA+Humain)' },
                    { pt: 'Museografia Digital', en: 'Digital Museography', es: 'Museografía Digital', fr: 'Muséographie Numérique' },
                    { pt: 'Educação Imersiva', en: 'Immersive Education', es: 'Educación Inmersiva', fr: 'Éducation Immersive' }
                  ].map((area, idx) => (
                    <div 
                      key={idx}
                      className="rounded-xl border border-white/10 card-adaptive p-4 text-center backdrop-blur transition-all hover:border-azimut-red/50"
                    >
                      <span className="font-sora text-sm text-white">
                        {locale(area)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: CURSOS & WORKSHOPS
              ═══════════════════════════════════════════════════════════ */}
          {activeSection === 'courses' && (
            <div id="courses" className="space-y-12">
              <div>
                <h2 className="mb-4 font-handel text-2xl md:text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {labels.courses.title[lang]}
                </h2>
                <p className="mb-8 max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {labels.courses.description[lang]}
                </p>
              </div>

              {/* Workshops Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {((safeWorkshops && Array.isArray(safeWorkshops) && safeWorkshops.length > 0) ? safeWorkshops : []).map((workshop, idx) => (
                  <article
                    key={idx}
                    className="group rounded-2xl border border-white/10 card-adaptive p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                  >
                    <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                      <span className="rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.2em]" style={{ 
                        borderColor: 'rgba(var(--theme-accent-red-rgb), 0.8)',
                        backgroundColor: 'rgba(var(--theme-accent-red-rgb), 0.25)',
                        color: '#ffffff'
                      }}>
                        {locale(workshop.level)}
                      </span>
                      <span className="font-sora text-sm text-slate-800 dark:text-slate-400">
                        ⏱️ {workshop.duration}
                      </span>
                    </div>
                    <h3 className="mb-3 font-sora text-xl md:text-2xl text-white">
                      {locale(workshop.title)}
                    </h3>
                      <p className="text-sm md:text-base leading-relaxed text-slate-50 dark:text-slate-200 mb-4">
                        {locale(workshop.description)}
                      </p>
                    <p className="text-xs text-slate-800 dark:text-slate-400 italic">
                      👥 {locale(workshop.audience)}
                    </p>
                  </article>
                ))}
              </div>

              {/* CTA para contato */}
              <div className="mt-12 rounded-2xl border border-azimut-red/60 bg-azimut-red/10 p-8 text-center">
                <p className="mb-4 text-lg font-sora" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' 
                    ? 'Interessado em nossos cursos? Entre em contato para saber sobre próximas turmas.'
                    : lang === 'es'
                    ? '¿Interesado en nuestros cursos? Contáctanos para conocer las próximas clases.'
                    : lang === 'fr'
                    ? 'Intéressé par nos cours? Contactez-nous pour connaître les prochaines sessions.'
                    : 'Interested in our courses? Get in touch to learn about upcoming classes.'}
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.14em] transition-all hover:shadow-[0_0_30px_rgba(var(--theme-accent-red-rgb),0.5)]"
                  style={{ 
                    color: '#ffffff',
                    borderColor: 'rgba(var(--theme-accent-red-rgb), 0.9)',
                    backgroundColor: 'rgba(var(--theme-accent-red-rgb), 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--theme-accent-red-rgb), 0.45)'
                    e.currentTarget.style.borderColor = 'rgba(var(--theme-accent-red-rgb), 1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--theme-accent-red-rgb), 0.3)'
                    e.currentTarget.style.borderColor = 'rgba(var(--theme-accent-red-rgb), 0.9)'
                  }}
                >
                  {lang === 'pt' ? 'Solicitar Informações' : lang === 'es' ? 'Solicitar Información' : lang === 'fr' ? 'Demander des Informations' : 'Request Information'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: TREINAMENTO CORPORATIVO
              ═══════════════════════════════════════════════════════════ */}
          {activeSection === 'corporate' && (
            <div id="corporate" className="space-y-12">
              <div>
                <h2 className="mb-4 font-handel text-2xl md:text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {labels.corporate.title[lang]}
                </h2>
                <p className="mb-8 max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {labels.corporate.description[lang]}
                </p>
              </div>

              {/* Formatos de Treinamento Corporativo */}
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { 
                    title: { pt: 'In-Company', en: 'In-Company', es: 'In-Company', fr: 'En Entreprise' },
                    desc: { 
                      pt: 'Treinamentos customizados na sua empresa. Programas adaptados às necessidades específicas da sua equipe.',
                      en: 'Custom training at your company. Programs adapted to your team\'s specific needs.',
                      es: 'Entrenamientos personalizados en su empresa. Programas adaptados a las necesidades específicas de su equipo.',
                      fr: 'Formation personnalisée dans votre entreprise. Programmes adaptés aux besoins spécifiques de votre équipe.'
                    },
                    icon: '🏢'
                  },
                  { 
                    title: { pt: 'Consultoria Especializada', en: 'Specialized Consulting', es: 'Consultoría Especializada', fr: 'Conseil Spécialisé' },
                    desc: { 
                      pt: 'Acompanhamento em projetos específicos. Mentoria técnica e estratégica para equipes de inovação.',
                      en: 'Support for specific projects. Technical and strategic mentorship for innovation teams.',
                      es: 'Acompañamiento en proyectos específicos. Mentoría técnica y estratégica para equipos de innovación.',
                      fr: 'Accompagnement sur projets spécifiques. Mentorat technique et stratégique pour équipes d\'innovation.'
                    },
                    icon: '💼'
                  },
                  { 
                    title: { pt: 'Capacitação de Equipes', en: 'Team Development', es: 'Capacitación de Equipos', fr: 'Développement d\'Équipes' },
                    desc: { 
                      pt: 'Programas de formação contínua. Desenvolvimento de competências em tecnologias imersivas e IA.',
                      en: 'Continuous training programs. Development of skills in immersive technologies and AI.',
                      es: 'Programas de formación continua. Desarrollo de competencias en tecnologías inmersivas e IA.',
                      fr: 'Programmes de formation continue. Développement de compétences en technologies immersives et IA.'
                    },
                    icon: '👥'
                  }
                ].map((format, idx) => (
                  <div 
                    key={idx}
                    className="rounded-2xl border border-white/10 card-adaptive p-6 md:p-8 text-center backdrop-blur transition-all hover:border-azimut-red/50"
                  >
                    <div className="text-4xl mb-4">{format.icon}</div>
                    <h3 className="mb-3 font-sora text-lg md:text-xl text-white">
                      {locale(format.title)}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-50 dark:text-slate-300">
                      {locale(format.desc)}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA para contato corporativo */}
              <div className="mt-12 rounded-2xl border border-azimut-red/60 bg-azimut-red/10 p-8 text-center">
                <h3 className="mb-4 font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' 
                    ? 'Fale com Nossos Especialistas'
                    : lang === 'es'
                    ? 'Hable con Nuestros Especialistas'
                    : lang === 'fr'
                    ? 'Parlez à Nos Spécialistes'
                    : 'Talk to Our Specialists'}
                </h3>
                <p className="mb-6 text-lg font-sora" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' 
                    ? 'Desenvolvemos programas sob medida para sua empresa. Solicite uma proposta personalizada.'
                    : lang === 'es'
                    ? 'Desarrollamos programas a medida para su empresa. Solicite una propuesta personalizada.'
                    : lang === 'fr'
                    ? 'Nous développons des programmes sur mesure pour votre entreprise. Demandez une proposition personnalisée.'
                    : 'We develop tailored programs for your company. Request a personalized proposal.'}
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.14em] transition-all hover:shadow-[0_0_30px_rgba(var(--theme-accent-red-rgb),0.5)]"
                  style={{ 
                    color: '#ffffff',
                    borderColor: 'rgba(var(--theme-accent-red-rgb), 0.9)',
                    backgroundColor: 'rgba(var(--theme-accent-red-rgb), 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--theme-accent-red-rgb), 0.45)'
                    e.currentTarget.style.borderColor = 'rgba(var(--theme-accent-red-rgb), 1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--theme-accent-red-rgb), 0.3)'
                    e.currentTarget.style.borderColor = 'rgba(var(--theme-accent-red-rgb), 0.9)'
                  }}
                >
                  {lang === 'pt' ? 'Solicitar Proposta' : lang === 'es' ? 'Solicitar Propuesta' : lang === 'fr' ? 'Demander une Proposition' : 'Request Proposal'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Academy
