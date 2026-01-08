import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
// MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
import { useAzimutContent } from '../hooks/useAzimutContent'
import { usePersonalizedContent } from '../hooks/usePersonalizedContent'
import { VideoPlayer } from '../components/VideoPlayer'
import { AnimatedLogo } from '../components/AnimatedLogo'

interface HomeProps {
  lang: Lang
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  useUserTracking()
  
  // MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
  // Tenta buscar do backoffice, mas sempre tem fallback estático seguro
  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useAzimutContent({ 
    page: 'home',
    lang // Passar idioma para backoffice
  })
  
  // Personalização de IA (opcional - não bloqueia se falhar)
  const {
    profile,
    recommendedProjects: personalizedProjects,
    heroMessage: personalizedHeroMessage,
    heroSubtitle: personalizedHeroSubtitle,
    ctaText: personalizedCtaText,
    ctaLink: personalizedCtaLink,
    shouldShowEditais,
    loading: personalizationLoading,
  } = usePersonalizedContent()
  
  // ESTRATÉGIA CORRIGIDA: i18n.ts → Personalizado → Backoffice
  // Priorizar i18n.ts (sempre correto por idioma) sobre backoffice (que pode estar desatualizado)
  const heroSlogan = t(lang, 'heroTitle') || personalizedHeroMessage || cmsContent?.page?.heroSlogan
  const heroSubtitle = t(lang, 'heroSubtitle') || personalizedHeroSubtitle || cmsContent?.page?.heroSubtitle
  
  // Fallback: Projetos padrão quando backoffice está vazio
  const defaultProjects = useMemo(() => [
    {
      slug: 'museu-olimpico-rio',
      title: lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum',
      shortTitle: lang === 'pt' ? 'Experiência Imersiva Olímpica' : lang === 'es' ? 'Experiencia Inmersiva Olímpica' : lang === 'fr' ? 'Expérience Immersive Olympique' : 'Olympic Immersive Experience',
      summary: lang === 'pt' ? 'Direção geral e curadoria de conteúdo para o Museu Olímpico do Rio. Uma experiência imersiva que celebra a história olímpica através de instalações audiovisuais interativas e narrativas cinematográficas.' : lang === 'es' ? 'Dirección general y curaduría de contenido para el Museo Olímpico de Río. Una experiencia inmersiva que celebra la historia olímpica a través de instalaciones audiovisuales interactivas y narrativas cinematográficas.' : lang === 'fr' ? 'Direction générale et curation de contenu pour le Musée Olympique de Rio. Une expérience immersive qui célèbre l\'histoire olympique à travers des installations audiovisuelles interactives et des récits cinématographiques.' : 'General direction and content curation for the Rio Olympic Museum. An immersive experience that celebrates Olympic history through interactive audiovisual installations and cinematic narratives.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2025,
      tags: [lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive', lang === 'pt' ? 'Institucional' : lang === 'es' ? 'Institucional' : lang === 'fr' ? 'Institutionnel' : 'Institutional', lang === 'pt' ? 'Museu' : lang === 'es' ? 'Museo' : lang === 'fr' ? 'Musée' : 'Museum'],
      heroImage: {
        type: 'VIDEO',
        // VÍDEO OFICIAL: Museu Olímpico do Rio (YouTube)
        original: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        thumbnail: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
        alt: lang === 'pt' ? 'Vídeo Museu Olímpico Rio' : lang === 'es' ? 'Video Museo Olímpico Río' : 'Rio Olympic Museum Video'
      },
    },
    {
      slug: 'projeto-sugestao-1',
      title: lang === 'pt' ? 'Exposição Digital' : lang === 'es' ? 'Exposición Digital' : lang === 'fr' ? 'Exposition Numérique' : 'Digital Exhibition',
      shortTitle: lang === 'pt' ? 'Narrativa Espacial' : lang === 'es' ? 'Narrativa Espacial' : lang === 'fr' ? 'Narration Spatiale' : 'Spatial Narrative',
      summary: lang === 'pt' ? 'Uma exposição que utiliza realidade aumentada e projeções mapeadas para contar histórias através do espaço físico.' : lang === 'es' ? 'Una exposición que utiliza realidad aumentada y proyecciones mapeadas para contar historias a través del espacio físico.' : lang === 'fr' ? 'Une exposition qui utilise la réalité augmentée et les projections mappées pour raconter des histoires à travers l\'espace physique.' : 'An exhibition that uses augmented reality and mapped projections to tell stories through physical space.',
      city: lang === 'pt' ? 'Montreal' : 'Montreal',
      country: lang === 'pt' ? 'Canadá' : lang === 'es' ? 'Canadá' : lang === 'fr' ? 'Canada' : 'Canada',
      tags: [lang === 'pt' ? 'AR' : 'AR', lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education'],
      heroImage: null,
    },
    {
      slug: 'projeto-sugestao-2',
      title: lang === 'pt' ? 'Filme VR 360°' : lang === 'es' ? 'Película VR 360°' : lang === 'fr' ? 'Film VR 360°' : '360° VR Film',
      shortTitle: lang === 'pt' ? 'Experiência Virtual' : lang === 'es' ? 'Experiencia Virtual' : lang === 'fr' ? 'Expérience Virtuelle' : 'Virtual Experience',
      summary: lang === 'pt' ? 'Um filme de realidade virtual que transporta o espectador para diferentes locais e momentos históricos.' : lang === 'es' ? 'Una película de realidad virtual que transporta al espectador a diferentes lugares y momentos históricos.' : lang === 'fr' ? 'Un film de réalité virtuelle qui transporte le spectateur vers différents lieux et moments historiques.' : 'A virtual reality film that transports the viewer to different locations and historical moments.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : lang === 'fr' ? 'Rio de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      tags: [lang === 'pt' ? 'VR' : 'VR', lang === 'pt' ? '360°' : '360°', lang === 'pt' ? 'Cinema' : lang === 'es' ? 'Cine' : lang === 'fr' ? 'Cinéma' : 'Cinema'],
      heroImage: null,
    },
  ], [lang])
  
  // Tracking de página (não bloqueia renderização)
  useEffect(() => {
    try {
      const cleanup = trackPageView('home')
      return cleanup
    } catch (error) {
      // Se tracking falhar, não quebrar renderização
      console.warn('Tracking error:', error)
      return () => {} // Cleanup vazio
    }
  }, [])
  
  // Projetos: Personalizados por IA OU do backoffice OU padrão (fallback)
  // MIGRAÇÃO GRADUAL: Prioridade Backoffice → Personalização IA → Estático
  // SEMPRE tem fallback - nunca quebra!
  const projects = useMemo(() => {
    // 1º: Tentar projetos personalizados por IA (se disponível)
    if (personalizedProjects && Array.isArray(personalizedProjects) && personalizedProjects.length > 0) {
      console.log('✅ Usando projetos personalizados por IA');
      return personalizedProjects;
    } 
    // 2º: Tentar projetos do backoffice (se disponível)
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      console.log('✅ Usando projetos do backoffice');
      return cmsContent.highlightProjects;
    }
    // 3º: Fallback estático (SEMPRE funciona)
    console.log('⚠️ Usando projetos estáticos (fallback) - Preencher no backoffice!');
    return defaultProjects;
  }, [personalizedProjects, cmsContent?.highlightProjects, defaultProjects]);
  
  // Projetos recomendados (primeiros 3) - SEMPRE tem pelo menos os padrões
  // Garantir que sempre seja um array válido com pelo menos 3 itens
  const recommended = useMemo(() => {
    const projs = projects && Array.isArray(projects) && projects.length > 0 
      ? projects 
      : defaultProjects;
    // Garantir que sempre retorna pelo menos 3 itens
    return projs.slice(0, Math.max(3, projs.length));
  }, [projects, defaultProjects]);
  
  useEffect(() => {
    // Detectar tema do documento
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(currentTheme === 'light' ? 'light' : 'dark')
    
    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
      setTheme(newTheme === 'light' ? 'light' : 'dark')
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => observer.disconnect()
  }, [])

  const seo = seoData.home[lang]

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/"
      />
      <main className="relative">
        {/* Estrela de fundo - HOME: Equilíbrio entre visibilidade e não competir com logo animada */}
        <div
          className="pointer-events-none fixed -right-28 -bottom-[10rem] h-[520px] w-[520px] md:-right-40 md:-bottom-[12rem] md:h-[680px] md:w-[680px] opacity-30"
          style={{
            zIndex: -5,
            backgroundImage: 'url(/logo-azimut-star.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* HERO WORLD-CLASS 2026 - 85vh + Stats Cards Flutuantes */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden film-grain py-8">
          {/* Background: Imagem do Backoffice (heroBackgroundImage) ou Featured Project */}
          {(() => {
            // PRIORIDADE 1: Imagem do backoffice (page.heroBackgroundImage)
            const heroBackgroundImage = cmsContent?.page?.heroBackgroundImage
            
            // PRIORIDADE 2: Projeto Featured
            const featured = recommended[0] || defaultProjects[0]
            const featuredImage = featured?.heroImage?.large || featured?.heroImage?.medium || featured?.heroImage?.original
            
            // FALLBACK 3: Placeholder
            const backgroundImage = heroBackgroundImage || featuredImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
            
            return (
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={backgroundImage}
                  alt=""
                  className="w-full h-full object-cover opacity-20"
                  loading="eager"
                />
              </div>
            )
          })()}
          
          {/* Gradiente Direcional: Azul Opaco (esquerda) → Preto Transparente (direita) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 via-60% to-transparent" />
          
          {/* Gradiente Vertical: Escurece embaixo */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
          
          {/* ═══════════════════════════════════════════════════════════════
              HERO REORGANIZADO: Texto | Logo (linha 1), 5 Cards (linha 2), 3 Cards (linha 3)
              ══════════════════════════════════════════════════════════════ */}
          
          {/* DESKTOP: Container único com TODAS as seções - ESPAÇAMENTO COMPACTO */}
          <div className="relative z-10 hidden lg:block px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px] w-full space-y-3">
            
            {/* LINHA 1: Hero - Texto + Logo Lado a Lado */}
            <div className="grid grid-cols-[55%_45%] gap-8 items-start">
              {/* Coluna Esquerda: Conteúdo Texto */}
              <div className="space-y-4">
              {/* Badge AZIMUT */}
              <div className="inline-flex items-center gap-2 font-sora text-[0.75rem] uppercase tracking-[0.3em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <img 
                  src="/estela6-clara.svg" 
                  alt="" 
                  className="w-4 h-4"
                />
                <span className="text-azimut-red font-semibold">AZIMUT</span>
                <span className="!text-white/40">•</span>
                <span className="!text-white/60 text-[0.7rem]">SINCE 1996</span>
              </div>
                
                {/* Título em 3 LINHAS - MULTILÍNGUE */}
                <h1 className="font-handel uppercase !text-white animate-fade-in-up opacity-0" style={{ 
                  fontSize: 'clamp(3rem, 5.5vw, 5.8rem)',
                  lineHeight: '1.1',
                  letterSpacing: '0.08em',
                  animationDelay: '0.2s'
                }}>
                  {(() => {
                    const words = heroSlogan.split(' ');
                    const lastWord = words.pop();
                    return (
                      <>
                        {lang === 'pt' && (
                          <>
                            EXPERIÊNCIAS<br />
                            QUE CONECTAM<br />
                            <span className="text-azimut-red">MUNDOS</span>
                          </>
                        )}
                        {lang === 'en' && (
                          <>
                            EXPERIENCES<br />
                            THAT CONNECT<br />
                            <span className="text-azimut-red">WORLDS</span>
                          </>
                        )}
                        {lang === 'fr' && (
                          <>
                            EXPÉRIENCES<br />
                            QUI CONNECTENT<br />
                            <span className="text-azimut-red">LES MONDES</span>
                          </>
                        )}
                        {lang === 'es' && (
                          <>
                            EXPERIENCIAS<br />
                            QUE CONECTAN<br />
                            <span className="text-azimut-red">MUNDOS</span>
                          </>
                        )}
                      </>
                    );
                  })()}
                </h1>
                  
                {/* Subtítulo COMPACTO */}
                <p className="max-w-xl text-[0.95rem] leading-relaxed animate-fade-in-up opacity-0 !text-white/90" style={{ animationDelay: '0.3s' }}>
                  {heroSubtitle.split('.')[0]}.
                </p>
              </div>
              
              {/* Coluna Direita: Logo 3D Animada (alinhamento fino) */}
              <div className="flex justify-center" style={{ alignItems: 'flex-start' }}>
                <div className="w-full max-w-[1400px] aspect-square -mt-30">
                  <AnimatedLogo />
                </div>
              </div>
            </div>
            
            {/* LINHA 2: 5 Cards Horizontais (SUBIDOS - SEM GAP VAZIO) */}
            <div className="grid grid-cols-5 gap-4 -mt-24">
              {/* Cinema & AV */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3" style={{ background: 'rgba(26, 31, 46, 0.85)' }}>
                <span className="block text-3xl flex-shrink-0">🎬</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-bold text-slate-100 group-hover:text-azimut-red transition-colors leading-tight break-words">
                    {lang === 'pt' ? 'Cinema & AV' : lang === 'es' ? 'Cine & AV' : lang === 'fr' ? 'Cinéma & AV' : 'Cinema & AV'}
                  </span>
                  <span className="block text-[0.55rem] text-slate-400 uppercase tracking-wide mt-0.5">
                    {lang === 'pt' ? 'Audiovisual' : lang === 'es' ? 'Audiovisual' : lang === 'fr' ? 'Audiovisuel' : 'Audiovisual'}
                  </span>
                </div>
              </div>

              {/* XR/VR/AR */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3" style={{ background: 'rgba(26, 31, 46, 0.85)' }}>
                <span className="block text-3xl flex-shrink-0">🥽</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-bold text-slate-100 group-hover:text-azimut-red transition-colors leading-tight break-words">XR/VR/AR</span>
                  <span className="block text-[0.55rem] text-slate-400 uppercase tracking-wide mt-0.5">
                    {lang === 'pt' ? 'Imersivo' : lang === 'es' ? 'Inmersivo' : lang === 'fr' ? 'Immersif' : 'Immersive'}
                  </span>
                </div>
              </div>

              {/* Exposições & Museus */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3" style={{ background: 'rgba(26, 31, 46, 0.85)' }}>
                <span className="block text-3xl flex-shrink-0">🏛️</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-bold text-slate-100 group-hover:text-azimut-red transition-colors leading-tight break-words">
                    {lang === 'pt' ? 'Exposições' : lang === 'es' ? 'Exposiciones' : lang === 'fr' ? 'Expositions' : 'Exhibitions'}
                  </span>
                  <span className="block text-[0.55rem] text-slate-400 uppercase tracking-wide mt-0.5">
                    {lang === 'pt' ? '& Museus' : lang === 'es' ? '& Museos' : lang === 'fr' ? '& Musées' : '& Museums'}
                  </span>
                </div>
              </div>

              {/* IA & Tech */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3" style={{ background: 'rgba(26, 31, 46, 0.85)' }}>
                <span className="block text-3xl flex-shrink-0">🧠</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-bold text-slate-100 group-hover:text-azimut-red transition-colors leading-tight break-words">IA & Tech</span>
                  <span className="block text-[0.55rem] text-slate-400 uppercase tracking-wide mt-0.5">
                    {lang === 'pt' ? 'Interativo' : lang === 'es' ? 'Interactivo' : lang === 'fr' ? 'Interactif' : 'Interactive'}
                  </span>
                </div>
              </div>

              {/* Educação */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/30 rounded-xl hover:border-azimut-red transition-all duration-300 group flex flex-row items-center gap-2 p-3" style={{ background: 'rgba(26, 31, 46, 0.85)' }}>
                <span className="block text-3xl flex-shrink-0">🎓</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-bold text-slate-100 group-hover:text-azimut-red transition-colors leading-tight break-words">
                    {lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education'}
                  </span>
                  <span className="block text-[0.55rem] text-slate-400 uppercase tracking-wide mt-0.5">
                    {lang === 'pt' ? 'Academia' : lang === 'es' ? 'Academia' : lang === 'fr' ? 'Académie' : 'Academy'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* LINHA 3: 3 Cards de Credibilidade VERMELHOS (ABAIXO DOS 5 CARDS - SEM TREPAR) */}
            <div className="grid grid-cols-3 gap-4">
              {/* Rio Museu Olímpico */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/50 p-4 rounded-lg hover:border-azimut-red transition-all duration-300 group" style={{ background: 'rgba(201, 35, 55, 0.15)' }}>
                <span className="block text-sm font-semibold text-azimut-red group-hover:text-red-400 transition-colors break-words">Rio Museum</span>
                <span className="block text-[0.55rem] text-slate-300 uppercase tracking-wider mt-1 leading-tight">
                  {lang === 'pt' ? 'Direção Geral · Tecnologia · Arte Audiovisual' : lang === 'es' ? 'Dirección General · Tecnología · Arte Audiovisual' : lang === 'fr' ? 'Direction Générale · Technologie · Art Audiovisuel' : 'General Direction · Technology · Audiovisual Art'}
                </span>
              </div>

              {/* Gramado VR */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/50 p-4 rounded-lg hover:border-azimut-red transition-all duration-300 group" style={{ background: 'rgba(201, 35, 55, 0.15)' }}>
                <span className="block text-sm font-semibold text-azimut-red group-hover:text-red-400 transition-colors break-words">
                  {lang === 'pt' ? 'Festival de Gramado' : lang === 'es' ? 'Festival de Gramado' : lang === 'fr' ? 'Festival de Gramado' : 'Gramado Festival'}
                </span>
                <span className="block text-[0.55rem] text-slate-300 uppercase tracking-wider mt-1">
                  {lang === 'pt' ? 'VR desde 2017' : lang === 'es' ? 'VR desde 2017' : lang === 'fr' ? 'VR depuis 2017' : 'VR since 2017'}
                </span>
              </div>

              {/* BR ↔ CA */}
              <div className="glass-panel backdrop-blur-xl border border-azimut-red/50 p-4 rounded-lg hover:border-azimut-red transition-all duration-300 group" style={{ background: 'rgba(201, 35, 55, 0.15)' }}>
                <span className="block text-sm font-semibold text-azimut-red group-hover:text-red-400 transition-colors break-words">Brasil ↔ Canadá</span>
                <span className="block text-[0.55rem] text-slate-300 uppercase tracking-wider mt-1">
                  {lang === 'pt' ? 'Binacional' : lang === 'es' ? 'Binacional' : lang === 'fr' ? 'Binational' : 'Binational'}
                </span>
              </div>
            </div>
            
          </div>
          
          {/* MOBILE/TABLET: Watermark Central + Texto Sobre */}
          <div className="relative z-10 lg:hidden flex flex-col justify-center h-full px-4 sm:px-6 mx-auto max-w-7xl">
            {/* Logo como Watermark (fundo) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]">
                <AnimatedLogo />
              </div>
            </div>
            
            {/* Conteúdo Texto (frente) */}
            <div className="relative z-10 max-w-4xl text-center mx-auto space-y-8">
              {/* Badge AZIMUT */}
              <div className="inline-flex items-center gap-2 font-sora text-[0.7rem] uppercase tracking-[0.3em] animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <img 
                  src="/estela6-clara.svg" 
                  alt="" 
                  className="w-3 h-3"
                />
                <span className="text-azimut-red font-semibold">AZIMUT</span>
                <span className="!text-white/40">•</span>
                <span className="!text-white/60 text-[0.65rem]">SINCE 1996</span>
              </div>
              
              {/* Título */}
              <h1 className="font-handel uppercase !text-white animate-fade-in-up opacity-0" style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                lineHeight: '1.1',
                letterSpacing: '0.12em',
                animationDelay: '0.2s'
              }}>
                {heroSlogan.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === heroSlogan.split(' ').length - 1 ? (
                      <span className="text-azimut-red">{word}</span>
                    ) : (
                      `${word} `
                    )}
                  </span>
                ))}
              </h1>
              
              {/* Subtítulo */}
              <p className="max-w-2xl mx-auto text-[1rem] leading-relaxed animate-fade-in-up opacity-0 !text-white/90" style={{ animationDelay: '0.3s' }}>
                {heroSubtitle.split('.')[0]}.
              </p>
              
              {/* Stats Cards - SEM PAÍSES! */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
                <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 p-4 sm:p-6 rounded-xl hover:border-azimut-red hover:bg-black/70 transition-all duration-300 group">
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-azimut-red group-hover:text-red-400 transition-colors">100+</span>
                  <span className="block text-[0.65rem] sm:text-xs text-white/60 uppercase tracking-widest mt-1">
                    {lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : 'Projects'}
                  </span>
                </div>
                <div className="glass-panel backdrop-blur-xl bg-black/60 border border-azimut-red/30 p-4 sm:p-6 rounded-xl hover:border-azimut-red hover:bg-black/70 transition-all duration-300 group">
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-azimut-red group-hover:text-red-400 transition-colors">1996</span>
                  <span className="block text-[0.65rem] sm:text-xs text-white/60 uppercase tracking-widest mt-1">
                    {lang === 'pt' ? 'Desde' : lang === 'es' ? 'Desde' : lang === 'fr' ? 'Depuis' : 'Since'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            DEMOREEL FULLSCREEN - Vídeo Institucional HERO
            Inspiração: Apple, Tesla, Sites Premium 2026
            ══════════════════════════════════════════════════════════════ */}
        <section className="relative h-screen w-full overflow-hidden">
          {(() => {
            // Buscar do backoffice (demoreelVideo) ou fallback para featured project
            const demoreelVideo = cmsContent?.page?.demoreelVideo
            const featured = recommended[0] || defaultProjects[0]
            const fallbackVideo = featured?.heroImage?.type === 'VIDEO' ? featured.heroImage.original : null
            const videoUrl = demoreelVideo || fallbackVideo || 'https://www.youtube.com/watch?v=1Pcoi_E9SXI'
            const thumbnailUrl = featured?.heroImage?.thumbnail || 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg'
            
            return (
              <>
                {/* Vídeo Fullscreen */}
                <div className="absolute inset-0 w-full h-full">
                  <VideoPlayer
                    videoUrl={videoUrl}
                    thumbnailUrl={thumbnailUrl}
                    alt={lang === 'pt' ? 'Demoreel Azimut' : lang === 'es' ? 'Demoreel Azimut' : lang === 'fr' ? 'Démoreel Azimut' : 'Azimut Demoreel'}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay escuro sutil */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Texto minimal centralizado */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <h2 className="font-sora text-xs md:text-sm uppercase tracking-[0.3em] text-white/90 mb-2 drop-shadow-2xl">
                      {lang === 'pt' ? 'Assista Nosso Trabalho' : lang === 'es' ? 'Ve Nuestro Trabajo' : lang === 'fr' ? 'Regardez Notre Travail' : 'Watch Our Work'}
                    </h2>
                    <div className="h-[1px] w-12 bg-white/50 mx-auto" />
                  </div>
                </div>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                  <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="font-sora text-[0.65rem] uppercase tracking-[0.2em]">
                      {lang === 'pt' ? 'Rolar' : lang === 'es' ? 'Desplazar' : lang === 'fr' ? 'Défiler' : 'Scroll'}
                    </span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </>
            )
          })()}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CREDIBILIDADE VISUAL - Timeline + Logos Placeholder
            Inspiração: Sites Premium 2026 (Inversa/Cartier/Omega)
            ══════════════════════════════════════════════════════════════ */}
        <section className="py-8 md:py-10 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className="font-sora text-xs uppercase tracking-[0.24em] mb-3 text-slate-400">
                {lang === 'pt' ? 'TECNOLOGIA CRIATIVA' : lang === 'es' ? 'TECNOLOGÍA CREATIVA' : lang === 'fr' ? 'TECHNOLOGIE CRÉATIVE' : 'CREATIVE TECHNOLOGY'}
              </h3>
              <p className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed text-slate-300">
                {lang === 'pt' 
                  ? 'Criamos experiências imersivas, interativas e cinematográficas para cultura, marcas e cidades. Da curadoria e consultoria em festivais à direção técnica de museus, navegamos entre cinema, design, engenharia, educação e pesquisa — buscando formatos que sejam ao mesmo tempo precisos e poéticos.' 
                  : lang === 'es' 
                  ? 'Creamos experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y ciudades. De la curaduría y consultoría en festivales a la dirección técnica de museos, navegamos entre cine, diseño, ingeniería, educación e investigación — buscando formatos que sean al mismo tiempo precisos y poéticos.'
                  : lang === 'fr'
                  ? 'Nous créons des expériences immersives, interactives et cinématographiques pour la culture, les marques et les villes. De la curation et du conseil en festivals à la direction technique de musées, nous naviguons entre cinéma, design, ingénierie, éducation et recherche — cherchant des formats à la fois précis et poétiques.'
                  : 'We create immersive, interactive and cinematic experiences for culture, brands and cities. From curation and consulting in festivals to museum technical direction, we navigate between cinema, design, engineering, education and research — seeking formats that are both precise and poetic.'}
              </p>
            </div>
            
            {/* Grid de Soluções COMPLETO - Baseado nos dados reais do site */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-6">
              {/* Integração Audiovisual */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">📽️</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Cinema & AV' : lang === 'es' ? 'Cine & AV' : lang === 'fr' ? 'Cinéma & AV' : 'Cinema & AV'}
                  </div>
                </div>
              </div>
              
              {/* VR/XR */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🥽</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🌐</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'VR/XR' : 'VR/XR'}
                  </div>
                </div>
              </div>
              
              {/* IA */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🤖</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🧠</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'IA Criativa' : lang === 'es' ? 'IA Creativa' : lang === 'fr' ? 'IA Créative' : 'Creative AI'}
                  </div>
                </div>
              </div>
              
              {/* Motion Design */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎨</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">✨</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Motion Design' : 'Motion Design'}
                  </div>
                </div>
              </div>
              
              {/* Curadoria & Consultoria - GRAMADO VR desde 2017 */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎭</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Curadoria & Consultoria' : lang === 'es' ? 'Curaduría & Consultoría' : lang === 'fr' ? 'Curation & Conseil' : 'Curation & Consulting'}
                  </div>
                </div>
              </div>
              
              {/* Festivais - Gramado, FAM, Rio2C */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎪</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎫</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Festivais' : lang === 'es' ? 'Festivales' : lang === 'fr' ? 'Festivals' : 'Festivals'}
                  </div>
                </div>
              </div>
              
              {/* Academia & Pesquisa */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">📚</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔬</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Pesquisa' : lang === 'es' ? 'Investigación' : lang === 'fr' ? 'Recherche' : 'Research'}
                  </div>
                </div>
              </div>
              
              {/* Treinamentos - Centenas formados */}
              <div className="glass-panel card-adaptive rounded-xl p-4 md:p-5 border border-white/10 hover:border-azimut-red/50 transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">🎓</div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👨‍🏫</div>
                  <div className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wide font-semibold leading-tight">
                    {lang === 'pt' ? 'Treinamentos' : lang === 'es' ? 'Formación' : lang === 'fr' ? 'Formation' : 'Training'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pills Expertise - Foco no REAL: Cultura + Tecnologia + Educação */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="pill-adaptive rounded-full border border-azimut-red/30 bg-azimut-red/5 px-4 py-2 font-sora text-[0.7rem] uppercase tracking-[0.2em] hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-105">
                <span className="mr-2 opacity-60">🎯</span> {lang === 'pt' ? 'Gramado VR (2017+)' : lang === 'es' ? 'Gramado VR (2017+)' : lang === 'fr' ? 'Gramado VR (2017+)' : 'Gramado VR (2017+)'}
              </span>
              <span className="pill-adaptive rounded-full border border-azimut-red/30 bg-azimut-red/5 px-4 py-2 font-sora text-[0.7rem] uppercase tracking-[0.2em] hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-105">
                <span className="mr-2 opacity-60">🏛️</span> {lang === 'pt' ? 'Rio Museu Olímpico' : lang === 'es' ? 'Museo Olímpico Río' : lang === 'fr' ? 'Musée Olympique Rio' : 'Rio Olympic Museum'}
              </span>
              <span className="pill-adaptive rounded-full border border-azimut-red/30 bg-azimut-red/5 px-4 py-2 font-sora text-[0.7rem] uppercase tracking-[0.2em] hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-105">
                <span className="mr-2 opacity-60">⚡</span> {lang === 'pt' ? 'Autodesk (1996-2018)' : lang === 'es' ? 'Autodesk (1996-2018)' : lang === 'fr' ? 'Autodesk (1996-2018)' : 'Autodesk (1996-2018)'}
              </span>
              <span className="pill-adaptive rounded-full border border-azimut-red/30 bg-azimut-red/5 px-4 py-2 font-sora text-[0.7rem] uppercase tracking-[0.2em] hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-105">
                <span className="mr-2 opacity-60">🎓</span> {lang === 'pt' ? 'Centenas Formados' : lang === 'es' ? 'Cientos Formados' : lang === 'fr' ? 'Des Centaines Formés' : 'Hundreds Trained'}
              </span>
              <span className="pill-adaptive rounded-full border border-azimut-red/30 bg-azimut-red/5 px-4 py-2 font-sora text-[0.7rem] uppercase tracking-[0.2em] hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-105">
                <span className="mr-2 opacity-60">🌐</span> {lang === 'pt' ? 'Brasil ↔ Canadá' : lang === 'es' ? 'Brasil ↔ Canadá' : lang === 'fr' ? 'Brésil ↔ Canada' : 'Brazil ↔ Canada'}
              </span>
              <span className="pill-adaptive rounded-full border border-azimut-red/30 bg-azimut-red/5 px-4 py-2 font-sora text-[0.7rem] uppercase tracking-[0.2em] hover:border-azimut-red hover:bg-azimut-red/15 transition-all duration-300 hover:scale-105">
                <span className="mr-2 opacity-60">🔬</span> {lang === 'pt' ? 'Pesquisa IA (1997+)' : lang === 'es' ? 'Investigación IA (1997+)' : lang === 'fr' ? 'Recherche IA (1997+)' : 'AI Research (1997+)'}
              </span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PROJETO FEATURED - Card Grande (Museu Olímpico ou do Backoffice)
            ══════════════════════════════════════════════════════════════ */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-black/40 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {(() => {
              const featured = recommended[0] || defaultProjects[0]
              const hasVideo = featured?.heroImage?.type === 'VIDEO' && featured?.heroImage?.original
              
              return (
                <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10">
                  {/* Vídeo/Imagem Player */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    {hasVideo ? (
                      <VideoPlayer
                        videoUrl={featured.heroImage.original}
                        thumbnailUrl={featured.heroImage.thumbnail || featured.heroImage.large}
                        alt={featured.heroImage?.alt || featured.title}
                        className="w-full h-full"
                      />
                    ) : featured?.heroImage?.large || featured?.heroImage?.medium ? (
                      <img
                        src={featured.heroImage?.large || featured.heroImage?.medium}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-azimut-red/10 via-slate-900 to-slate-950 flex items-center justify-center">
                        <div className="text-center p-6">
                          <h3 className="font-handel text-3xl uppercase tracking-[0.12em] text-white">
                            {featured.title}
                          </h3>
                          <p className="mt-2 text-slate-400 text-sm">
                            {lang === 'pt' ? 'Projeto em Destaque' : lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Info do Projeto */}
                  <div className="p-4 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {/* Tags */}
                      {featured.tags && featured.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 rounded-full bg-azimut-red/10 border border-azimut-red/30 font-sora text-[0.65rem] uppercase tracking-wider text-azimut-red"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Localização */}
                      {(featured.city || featured.country) && (
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          📍 {[featured.city, featured.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                    
                    <h3 className="font-handel text-xl md:text-2xl uppercase tracking-[0.08em] text-white mt-3 mb-2">
                      {featured.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {featured.summary || featured.shortTitle}
                    </p>
                    
                    {/* CTAs */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/work/${featured.slug}`}
                        className="inline-flex items-center justify-center rounded-lg bg-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90"
                      >
                        {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                      </Link>
                      <Link
                        to="/contact?interest=similar"
                        className="inline-flex items-center justify-center rounded-lg border border-azimut-red px-4 py-2 font-sora text-xs uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/10"
                      >
                        {lang === 'pt' ? 'Projeto Similar' : lang === 'es' ? 'Proyecto Similar' : 'Similar Project'}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PROJETOS - GRID VISUAL 3x3 (Super impactante!) */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-black/20 dark:to-black/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Título */}
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.12em] mb-3">
                {lang === 'pt' ? 'Projetos em Destaque' : lang === 'es' ? 'Proyectos Destacados' : lang === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
              </h2>
              <p className="text-sm md:text-base text-slate-300">
                {lang === 'pt' ? 'Uma seleção dos nossos trabalhos mais emblemáticos' : lang === 'es' ? 'Una selección de nuestros trabajos más emblemáticos' : 'A selection of our most iconic work'}
              </p>
            </div>

            {/* Grid 3x3 - Híbrido: Fundo preto HOME + Elementos Work */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.slice(0, 9).map((project, index) => (
                <article
                  key={project.slug}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-500 hover:scale-[1.02] hover:border-azimut-red/60 hover:shadow-[0_30px_80px_rgba(201,35,55,0.5)]"
                  onClick={() => {
                    window.location.href = `/${lang}/work/${project.slug}`
                  }}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    cursor: 'pointer'
                  }}
                >
                  {/* Imagem de fundo */}
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={index < 6 ? 'eager' : 'lazy'}
                      />
                      {/* Overlay gradiente PRETO (HOME style) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-azimut-red/20"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
                      <div className="text-center p-4">
                        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-azimut-red/30 bg-azimut-red/10 backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:border-azimut-red/60">
                          <svg className="h-6 w-6 text-azimut-red transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Conteúdo - posição absoluta sobre a imagem */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* Título */}
                    <h3 className="mb-2 font-handel text-xl md:text-2xl uppercase tracking-wide !text-white group-hover:!text-azimut-red transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    {/* Localização (se existir) */}
                    {(project.city || project.country) && (
                      <p className="text-xs !text-white/70 mb-3">
                        📍 {[project.city, project.country].filter(Boolean).join(', ')}
                      </p>
                    )}
                    
                    {/* Tags + Year */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-[0.68rem]">
                          {project.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="rounded-full border border-white/20 bg-black/40 backdrop-blur px-2.5 py-1 !text-white/80 transition-all duration-300 group-hover:border-azimut-red/60 group-hover:bg-azimut-red/20 group-hover:!text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.year && (
                        <span className="text-xs !text-white/60 font-medium bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
                          {project.year}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Glow border no hover */}
                  <div className="absolute inset-0 border-2 border-azimut-red rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
                </article>
              ))}
            </div>

            {/* CTA - Ver Todos os Projetos */}
            <div className="mt-12 text-center">
              <Link
                to={`/${lang}/work`}
                className="inline-flex items-center gap-3 bg-azimut-red hover:bg-azimut-red/90 text-white font-handel uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(201,35,55,0.4)] text-sm md:text-base"
              >
                <span>{lang === 'pt' ? 'Ver Todos os Projetos' : lang === 'es' ? 'Ver Todos los Proyectos' : lang === 'fr' ? 'Voir Tous les Projets' : 'View All Projects'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* SOBRE - Card Lateral (Conteúdo Preservado) */}
        <section className="py-10 md:py-12">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Texto Esquerdo - COM IMAGEM DE FUNDO (Placeholder) */}
              <div className="glass-panel card-adaptive rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] group relative">
                {/* PLACEHOLDER: Imagem de fundo sutil (substituir no backoffice) */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/20 via-transparent to-transparent" />
                  {/* Ícone placeholder (será substituído por foto da equipe/estúdio no backoffice) */}
                  <div className="absolute bottom-4 right-4 text-8xl opacity-20">
                    🎬
                  </div>
                </div>
                
                {/* Conteúdo (sempre legível) */}
                <div className="relative z-10 p-6 md:p-8">
                  <h2 className="mb-4 font-handel text-3xl md:text-4xl uppercase tracking-[0.12em]">
                    {t(lang, 'cardTitle')}
                  </h2>
                  <p className="mb-6 text-base md:text-lg leading-relaxed text-slate-300">
                    {t(lang, 'cardBody')}
                  </p>
                  
                  {/* Pillars */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {(Array.isArray(cmsContent?.page?.pillars) && cmsContent.page.pillars.length > 0
                      ? cmsContent.page.pillars 
                      : [
                          lang === 'pt' ? 'Museus & Cultura' : lang === 'es' ? 'Museos & Cultura' : lang === 'fr' ? 'Musées & Culture' : 'Museums & Culture',
                          lang === 'pt' ? 'Marcas & Eventos' : lang === 'es' ? 'Marcas & Eventos' : lang === 'fr' ? 'Marques & Événements' : 'Brands & Events',
                          lang === 'pt' ? 'Educação & Pesquisa' : lang === 'es' ? 'Educación & Investigación' : lang === 'fr' ? 'Éducation & Recherche' : 'Education & Research'
                        ]
                    ).filter(Boolean).map((pillar: string, index: number) => (
                      <span 
                        key={index}
                        className="pill-adaptive rounded-full border px-4 py-2 font-sora text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.18em] transition-all duration-300 hover:border-azimut-red/50 hover:bg-azimut-red/10 hover:scale-105"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-slate-400">
                    📍 {t(lang, 'cities')}
                  </p>
                </div>
              </div>
              
              {/* Card Direito - Tags */}
              <div 
                className="glass-panel backdrop-blur-xl card-dark-fixed relative rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_32px_80px_rgba(201,35,55,0.3)] transition-all duration-500 hover:scale-[1.02]" 
                style={{ 
                  background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="mb-4 font-sora text-sm uppercase tracking-[0.24em] text-white/70">
                  {lang === 'pt' ? 'Especialidades' : lang === 'es' ? 'Especialidades' : lang === 'fr' ? 'Spécialités' : 'Expertise'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white hover:border-azimut-red hover:bg-azimut-red/10 transition-all duration-300">
                    {t(lang, 'tag1')}
                  </span>
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white hover:border-azimut-red hover:bg-azimut-red/10 transition-all duration-300">
                    {t(lang, 'tag2')}
                  </span>
                  <span className="pill-adaptive rounded-full border border-white/20 px-4 py-2 font-sora text-[0.75rem] uppercase tracking-[0.18em] text-white hover:border-azimut-red hover:bg-azimut-red/10 transition-all duration-300">
                    {t(lang, 'tag3')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossas Soluções - Grid Visual COMPACTO */}
        <section className="py-10 md:py-12 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em] mb-4">
                {lang === 'pt' ? 'O que criamos' : lang === 'es' ? 'Qué creamos' : lang === 'fr' ? 'Ce que nous créons' : 'What we create'}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                {lang === 'pt' ? 'Soluções completas para transformar ideias em experiências memoráveis' : lang === 'es' ? 'Soluciones completas para transformar ideas en experiencias memorables' : lang === 'fr' ? 'Solutions complètes pour transformer les idées en expériences mémorables' : 'Complete solutions to transform ideas into memorable experiences'}
              </p>
            </div>
            
            {/* MIGRAÇÃO GRADUAL: Backoffice → Estático */}
            {(Array.isArray(cmsContent?.services) && cmsContent.services.length > 0) ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cmsContent.services.slice(0, 6).map((service: any, index: number) => (
                  <article
                    key={service.slug}
                    className="group relative rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.05] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => window.location.href = `/what#${service.slug}`}
                  >
                    {/* Glow Effect no Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Ícone GRANDE */}
                    {service.icon && (
                      <div className="mb-6 text-6xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {service.icon}
                      </div>
                    )}
                    
                    <h3 className="mb-3 font-handel text-lg md:text-xl uppercase tracking-wide text-white group-hover:text-azimut-red transition-colors duration-300 line-clamp-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-200 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    {/* Indicador "Ver Mais" */}
                    <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-azimut-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>{lang === 'pt' ? 'Saiba Mais' : lang === 'es' ? 'Saber Más' : lang === 'fr' ? 'En Savoir Plus' : 'Learn More'}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Fallback estático - mostra quando backoffice não tem conteúdo */
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    slug: 'cinema-audiovisual',
                    title: lang === 'pt' ? 'Cinema & Audiovisual' : lang === 'es' ? 'Cine & Audiovisual' : lang === 'fr' ? 'Cinéma & Audiovisuel' : 'Cinema & Audiovisual',
                    description: lang === 'pt' ? 'Narrativas cinematográficas de alta qualidade que emocionam e engajam' : lang === 'es' ? 'Narrativas cinematográficas de alta calidad que emocionan y engajan' : lang === 'fr' ? 'Récits cinématographiques de haute qualité qui émeuvent et engagent' : 'High-quality cinematic narratives that move and engage',
                    icon: '🎬'
                  },
                  { 
                    slug: 'animacao-2d-3d',
                    title: lang === 'pt' ? 'Animação 2D/3D' : lang === 'es' ? 'Animación 2D/3D' : lang === 'fr' ? 'Animation 2D/3D' : '2D/3D Animation',
                    description: lang === 'pt' ? 'Personagens e mundos animados que dão vida às suas histórias' : lang === 'es' ? 'Personajes y mundos animados que dan vida a tus historias' : lang === 'fr' ? 'Personnages et mondes animés qui donnent vie à vos histoires' : 'Animated characters and worlds that bring your stories to life',
                    icon: '🎨'
                  },
                  { 
                    slug: 'xr-interatividade',
                    title: lang === 'pt' ? 'XR / Interatividade' : lang === 'es' ? 'XR / Interactivo' : lang === 'fr' ? 'XR / Interactif' : 'XR / Interactive',
                    description: lang === 'pt' ? 'Experiências imersivas VR/AR que transportam o público para novos mundos' : lang === 'es' ? 'Experiencias inmersivas VR/AR que transportan al público a nuevos mundos' : lang === 'fr' ? 'Expériences immersives VR/AR qui transportent le public vers de nouveaux mondes' : 'Immersive VR/AR experiences that transport audiences to new worlds',
                    icon: '🥽'
                  },
                  { 
                    slug: 'ia-criativa',
                    title: lang === 'pt' ? 'IA Criativa' : lang === 'es' ? 'IA Creativa' : lang === 'fr' ? 'IA Créative' : 'Creative AI',
                    description: lang === 'pt' ? 'Pipelines com inteligência artificial para acelerar e potencializar a criação' : lang === 'es' ? 'Pipelines con inteligencia artificial para acelerar y potenciar la creación' : lang === 'fr' ? 'Pipelines avec intelligence artificielle pour accélérer et renforcer la création' : 'AI-powered pipelines to accelerate and enhance creation',
                    icon: '🤖'
                  },
                  { 
                    slug: 'educacao-formacao',
                    title: lang === 'pt' ? 'Educação & Formação' : lang === 'es' ? 'Educación & Formación' : lang === 'fr' ? 'Éducation & Formation' : 'Education & Training',
                    description: lang === 'pt' ? 'Workshops e mentorias especializadas para desenvolver talentos criativos' : lang === 'es' ? 'Workshops y mentorías especializadas para desarrollar talentos creativos' : lang === 'fr' ? 'Ateliers et mentorats spécialisés pour développer les talents créatifs' : 'Specialized workshops and mentoring to develop creative talents',
                    icon: '📚'
                  },
                  { 
                    slug: 'consultoria-estrategia',
                    title: lang === 'pt' ? 'Consultoria & Estratégia' : lang === 'es' ? 'Consultoría & Estrategia' : lang === 'fr' ? 'Conseil & Stratégie' : 'Consulting & Strategy',
                    description: lang === 'pt' ? 'Acompanhamento estratégico de projetos end-to-end com foco em resultados' : lang === 'es' ? 'Acompañamiento estratégico de proyectos end-to-end con foco en resultados' : lang === 'fr' ? 'Accompagnement stratégique de projets end-to-end axé sur les résultats' : 'Strategic end-to-end project support focused on results',
                    icon: '💡'
                  }
                ].map((service: any, index: number) => (
                  <article
                    key={service.slug}
                    className="group relative rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.05] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => window.location.href = `/what#${service.slug}`}
                  >
                    {/* Glow Effect no Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Ícone GRANDE */}
                    {service.icon && (
                      <div className="mb-6 text-6xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                        {service.icon}
                      </div>
                    )}
                    
                    <h3 className="mb-3 font-handel text-lg md:text-xl uppercase tracking-wide text-white group-hover:text-azimut-red transition-colors duration-300 relative z-10 line-clamp-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-200 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300 relative z-10">
                      {service.description}
                    </p>
                    
                    {/* Indicador "Ver Mais" */}
                    <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-azimut-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10">
                      <span>{lang === 'pt' ? 'Saiba Mais' : lang === 'es' ? 'Saber Más' : lang === 'fr' ? 'En Savoir Plus' : 'Learn More'}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {/* CTA Final */}
            <div className="mt-12 text-center">
              <Link
                to="/what"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-azimut-red px-8 py-4 font-sora text-sm uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-azimut-red/90 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{lang === 'pt' ? 'Explorar Todas as Soluções' : lang === 'es' ? 'Explorar Todas las Soluciones' : lang === 'fr' ? 'Explorer Toutes les Solutions' : 'Explore All Solutions'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default Home

