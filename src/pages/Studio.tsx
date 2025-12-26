import React, { useState } from 'react'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { studioContent } from '../data/studioContent'
import { useUserTracking } from '../hooks/useUserTracking'
import CredibilidadeEditais from '../components/CredibilidadeEditais'

interface StudioProps {
  lang: Lang
}

// Dados da equipe com fotos
const teamData = {
  en: {
    pageLabel: 'ABOUT',
    pageTitle: 'Studio & Team',
    studioDescription: `Azimut is a creative-technology studio dedicated to immersive, interactive and cinematic experiences across culture, brands and cities. We design projects end-to-end – from concept and research to technical direction, content, deployment and audience experience.

With roots in Brazil and Canada, our practice moves between cinema, design, engineering, education and research. We navigate museums, public installations, festivals, branded activations and experimental labs, searching for formats that feel both precise and poetic.`,
    credentialsTitle: 'Credentials',
    credentials: [
      'Founding members of XRBR Association (Brazilian XR Association)',
      'Master\'s in Creative Media (UFRJ) & Technology in Education',
      'VR Film Curatorship at Festival de Cinema de Gramado since 2017',
      'Technical Direction at Rio Olympic Museum',
      'International operations: Brazil ↔ Canada'
    ],
    areasTitle: 'Areas of Practice',
    areas: [
      'Immersive Installations', 'Museums & Exhibitions', 'Brand Activations',
      'Motion Design', 'Animation 2D/3D', 'VR/XR/AR', 'AI Pipelines',
      'Film Editing', 'Visual FX', 'UI/UX Design'
    ],
    team: [
      {
        name: 'Ranz Enberger',
        role: 'CREATIVE & TECHNOLOGY DIRECTOR',
        subtitle: 'Filmmaker · Researcher · Curator',
        bio: 'Leads creative direction, technology, immersive storytelling, VR/XR, curatorship and AI-driven pipelines. General Director at Rio Olympic Museum. Master\'s in Creative Media (UFRJ-VF), post-graduate in Systems Analysis. Started AI research for animation in 1997. Canadian citizen with global scope. Certified in VFX (USA/Canada).',
        credentials: [
          'Technology Director, Rio Olympic Museum',
          'VR Curator, Gramado Festival (2017-present)',
          'Ex-Application Engineer & Training Specialist Autodesk',
          'Autodesk Discreet Demo Artist (1996-2008)',
          'Only Autodesk Canada contract in South America',
          'Only certified Flame Trainer in Brazil',
          'Post-graduate professor in Creative Media',
          '30 years in CG, VR/XR and AI for audiovisual'
        ],
        photo: '/Ranz.jpeg',
        linkedin: 'https://ca.linkedin.com/in/ranzenberger'
      },
      {
        name: 'Anick',
        role: 'ART DIRECTOR',
        subtitle: 'Visual & Experience Designer',
        bio: 'Responsible for visual direction, character and environment design, scenography, concept art and animation aesthetics. Led the entire art team at Rio Olympic Museum – UI, graphics, wall texts, signage, and design. Co-creates the visual language of immersive installations, including the Casa dos Duendes universe.',
        credentials: [
          'Art Director, Rio Olympic Museum',
          'Visual Designer + Digital Scenography',
          'Concept Art + Character Design',
          'Led complete art team (UI, graphics, signage)',
          'Casa dos Duendes universe (co-creation)'
        ],
        photo: '/anick.jpg',
        linkedin: 'https://br.linkedin.com/in/anickcouto'
      },
      {
        name: 'Alberto Moura',
        role: 'AUDIOVISUAL & OPERATIONS DIRECTOR',
        subtitle: 'Educator · Cultural Strategist',
        bio: 'Leads audiovisual production, operations, project coordination, academic partnerships and cultural strategy. Audiovisual Director at Rio Olympic Museum. Bridges institutions, education and public experience, with a trajectory in audiovisual teaching and multimedia programs.',
        credentials: [
          'Audiovisual Director, Rio Olympic Museum',
          'University Professor (undergraduate + graduate)',
          'Ex-Audiovisual Course Coordinator',
          'Digital Signage company founder',
          'Cultural Strategy + Academic Partnerships'
        ],
        photo: '/alberto.jpg',
        linkedin: 'https://br.linkedin.com/in/albertomoura3d'
      }
    ],
    ctaText: 'Interested in working with us?',
    ctaButton: 'Start a Project'
  },
  fr: {
    pageLabel: 'À PROPOS',
    pageTitle: 'Studio & Équipe',
    studioDescription: `Azimut est un studio créatif-technologique dédié aux expériences immersives, interactives et cinématographiques pour la culture, les marques et les villes. Nous concevons des projets de bout en bout – du concept et de la recherche à la direction technique, au contenu, au déploiement et à l'expérience du public.

Avec des racines au Brésil et au Canada, notre pratique évolue entre le cinéma, le design, l'ingénierie, l'éducation et la recherche.`,
    credentialsTitle: 'Crédentials',
    credentials: [
      'Membres fondateurs de l\'Association XRBR',
      'Master en Médias Créatifs (UFRJ) & Technologie Éducative',
      'Curation de Films VR au Festival de Gramado depuis 2017',
      'Direction Technique au Musée Olympique de Rio',
      'Opérations internationales: Brésil ↔ Canada'
    ],
    areasTitle: 'Domaines de pratique',
    areas: [
      'Installations immersives', 'Musées & Expositions', 'Activations de marque',
      'Motion Design', 'Animation 2D/3D', 'VR/XR/AR', 'Pipelines IA',
      'Montage', 'Effets Visuels', 'Design UI/UX'
    ],
    team: [
      {
        name: 'Ranz Enberger',
        role: 'DIRECTEUR CRÉATIF & TECHNOLOGIQUE',
        subtitle: 'Cinéaste · Chercheur · Curateur',
        bio: 'Dirige la direction créative, la technologie, la narration immersive, VR/XR, la curation et les pipelines IA. Directeur Général au Musée Olympique de Rio. Citoyen canadien.',
        credentials: [
          'Directeur de Technologie, Musée Olympique de Rio',
          'Curateur VR, Festival de Gramado (depuis 2017)',
          'Ex-Application Engineer & Training Specialist Autodesk',
          'Demo Artist Autodesk Discreet (1996-2008)',
          'Seul contrat Canada Autodesk en Amérique du Sud',
          'Seul Flame Trainer certifié au Brésil',
          'Professeur en médias créatifs (pós-graduação)',
          '30 ans en CG, VR/XR et IA pour audiovisuel'
        ],
        photo: '/Ranz.jpeg',
        linkedin: 'https://ca.linkedin.com/in/ranzenberger'
      },
      {
        name: 'Anick',
        role: 'DIRECTRICE ARTISTIQUE',
        subtitle: 'Designer Visuel & Expérience',
        bio: 'Responsable de la direction visuelle, du design de personnages et d\'environnements, de la scénographie. A dirigé toute l\'équipe artistique du Musée Olympique de Rio.',
        credentials: [
          'Directrice Artistique, Musée Olympique de Rio',
          'Designer Visuel + Scénographie Numérique',
          'Concept Art + Character Design',
          'A dirigé toute l\'équipe artistique (UI, graphisme, signalisation)',
          'Univers Casa dos Duendes (co-création)'
        ],
        photo: '/anick.jpg',
        linkedin: 'https://br.linkedin.com/in/anickcouto'
      },
      {
        name: 'Alberto Moura',
        role: 'DIRECTEUR AUDIOVISUEL & OPÉRATIONS',
        subtitle: 'Éducateur · Stratège Culturel',
        bio: 'Dirige la production créative, la coordination de projets, les partenariats académiques. Directeur Audiovisuel au Musée Olympique de Rio.',
        credentials: [
          'Directeur Audiovisuel, Musée Olympique de Rio',
          'Professeur Universitaire (graduation + pós)',
          'Ex-Coordinateur de Cours d\'Audiovisuel',
          'Fondateur entreprise de Digital Signage',
          'Stratégie Culturelle + Partenariats Académiques'
        ],
        photo: '/alberto.jpg',
        linkedin: 'https://br.linkedin.com/in/albertomoura3d'
      }
    ],
    ctaText: 'Intéressé à travailler avec nous?',
    ctaButton: 'Commencer un projet'
  },
  pt: {
    pageLabel: 'SOBRE',
    pageTitle: 'Estúdio & Equipe',
    studioDescription: `Azimut é um estúdio de tecnologia criativa dedicado a experiências imersivas, interativas e cinematográficas para cultura, marcas e cidades. Desenvolvemos projetos de ponta a ponta – do conceito e pesquisa à direção técnica, conteúdo, implantação e experiência do público.

Com raízes no Brasil e no Canadá, nossa prática transita entre cinema, design, engenharia, educação e pesquisa. Navegamos por museus, instalações públicas, festivais, ativações de marca e laboratórios experimentais, buscando formatos que sejam ao mesmo tempo precisos e poéticos.`,
    credentialsTitle: 'Credenciais',
    credentials: [
      'Membros fundadores da Associação XRBR (Realidade Estendida Brasil)',
      'Mestrado em Mídias Criativas (UFRJ) & Tecnologia na Educação',
      'Curadoria de Filmes VR no Festival de Cinema de Gramado desde 2017',
      'Direção Técnica no Rio Museu Olímpico',
      'Operações internacionais: Brasil ↔ Canadá'
    ],
    areasTitle: 'Áreas de Atuação',
    areas: [
      'Instalações Imersivas', 'Museus & Exposições', 'Ativações de Marca',
      'Motion Design', 'Animação 2D/3D', 'VR/XR/AR', 'Pipelines IA',
      'Edição', 'Efeitos Visuais', 'Design UI/UX'
    ],
    team: [
      {
        name: 'Ranz Enberger',
        role: 'DIRETOR CRIATIVO & DE TECNOLOGIA',
        subtitle: 'Cineasta · Pesquisador · Curador',
        bio: 'Lidera direção criativa, tecnologia, storytelling imersivo, VR/XR, curadoria e pipelines com IA. Diretor Geral no Rio Museu Olímpico. Mestrado em Mídias Criativas (UFRJ-VF), pós em Análise de Sistemas. Iniciou pesquisa em IA para animação em 1997. Cidadão canadense com atuação global. Cursos de FX nos EUA/Canadá.',
        credentials: [
          'Diretor de Tecnologia, Rio Museu Olímpico',
          'Curador VR, Festival de Gramado (2017-hoje)',
          'Ex-Application Engineer & Training Specialist Autodesk',
          'Demo Artist Autodesk Discreet (1996-2008)',
          'Único contrato Canadá Autodesk na América do Sul',
          'Único Flame Trainer certificado no Brasil',
          'Professor pós-graduação em Mídias Criativas',
          '30 anos em CG, VR/XR e IA para audiovisual'
        ],
        photo: '/Ranz.jpeg',
        linkedin: 'https://ca.linkedin.com/in/ranzenberger'
      },
      {
        name: 'Anick',
        role: 'DIRETORA DE ARTE',
        subtitle: 'Designer Visual & de Experiência',
        bio: 'Responsável pela direção visual, design de personagens e ambientes, cenografia, concept art e estética de animação. Liderou toda a equipe de arte do Rio Museu Olímpico – UI, grafismo, textos de parede, sinalização e design. Co-cria a linguagem visual de instalações imersivas, incluindo o universo Casa dos Duendes.',
        credentials: [
          'Diretora de Arte, Rio Museu Olímpico',
          'Designer Visual + Cenografia Digital',
          'Concept Art + Character Design',
          'Liderou equipe completa de arte (UI, grafismo, sinalização)',
          'Universo Casa dos Duendes (co-criação)'
        ],
        photo: '/anick.jpg',
        linkedin: 'https://br.linkedin.com/in/anickcouto'
      },
      {
        name: 'Alberto Moura',
        role: 'DIRETOR AUDIOVISUAL & OPERAÇÕES',
        subtitle: 'Educador · Estrategista Cultural',
        bio: 'Lidera produção criativa, coordenação de projetos, parcerias acadêmicas e estratégia cultural. Diretor Audiovisual no Rio Museu Olímpico. Faz a ponte entre instituições, educação e experiência pública, com trajetória em ensino audiovisual e programas multimídia.',
        credentials: [
          'Diretor Audiovisual, Rio Museu Olímpico',
          'Professor Universitário (graduação + pós)',
          'Ex-Coordenador de Curso de Audiovisual',
          'Fundador empresa de Digital Signage',
          'Estratégia Cultural + Parcerias Acadêmicas'
        ],
        photo: '/alberto.jpg',
        linkedin: 'https://br.linkedin.com/in/albertomoura3d'
      }
    ],
    ctaText: 'Interessado em trabalhar conosco?',
    ctaButton: 'Iniciar um Projeto'
  },
  es: {
    pageLabel: 'ACERCA',
    pageTitle: 'Estudio & Equipo',
    studioDescription: `Azimut es un estudio de tecnología creativa dedicado a experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y ciudades. Diseñamos proyectos de principio a fin – desde el concepto e investigación hasta la dirección técnica, contenido, implementación y experiencia del público.

Con raíces en Brasil y Canadá, nuestra práctica se mueve entre el cine, el diseño, la ingeniería, la educación y la investigación.`,
    credentialsTitle: 'Credenciales',
    credentials: [
      'Miembros fundadores de la Asociación XRBR',
      'Maestría en Medios Creativos (UFRJ) & Tecnología Educativa',
      'Curaduría de Películas VR en Festival de Gramado desde 2017',
      'Dirección Técnica en Museo Olímpico de Río',
      'Operaciones internacionales: Brasil ↔ Canadá'
    ],
    areasTitle: 'Áreas de práctica',
    areas: [
      'Instalaciones inmersivas', 'Museos & Exposiciones', 'Activaciones de marca',
      'Motion Design', 'Animación 2D/3D', 'VR/XR/AR', 'Pipelines IA',
      'Edición', 'Efectos Visuales', 'Diseño UI/UX'
    ],
    team: [
      {
        name: 'Ranz Enberger',
        role: 'DIRECTOR CREATIVO & DE TECNOLOGÍA',
        subtitle: 'Cineasta · Investigador · Curador',
        bio: 'Lidera dirección creativa, tecnología, storytelling inmersivo, VR/XR, curaduría y pipelines con IA. Director General en Museo Olímpico de Río. Ciudadano canadiense.',
        credentials: [
          'Director de Tecnología, Museo Olímpico de Río',
          'Curador VR, Festival de Gramado (desde 2017)',
          'Ex-Application Engineer & Training Specialist Autodesk',
          'Demo Artist Autodesk Discreet (1996-2008)',
          'Único contrato Canadá Autodesk en América del Sur',
          'Único Flame Trainer certificado en Brasil',
          'Profesor pós-graduação en Medios Creativos',
          '30 años en CG, VR/XR e IA para audiovisual'
        ],
        photo: '/Ranz.jpeg',
        linkedin: 'https://ca.linkedin.com/in/ranzenberger'
      },
      {
        name: 'Anick',
        role: 'DIRECTORA DE ARTE',
        subtitle: 'Diseñadora Visual & de Experiencia',
        bio: 'Responsable de la dirección visual, diseño de personajes y ambientes, escenografía. Lideró todo el equipo de arte del Museo Olímpico de Río.',
        credentials: [
          'Directora de Arte, Museo Olímpico de Río',
          'Diseñadora Visual + Escenografía Digital',
          'Concept Art + Character Design',
          'Lideró equipo completo de arte (UI, grafismo, señalización)',
          'Universo Casa dos Duendes (co-creación)'
        ],
        photo: '/anick.jpg',
        linkedin: 'https://br.linkedin.com/in/anickcouto'
      },
      {
        name: 'Alberto Moura',
        role: 'DIRECTOR AUDIOVISUAL & OPERACIONES',
        subtitle: 'Educador · Estratega Cultural',
        bio: 'Lidera producción creativa, coordinación de proyectos, alianzas académicas. Director Audiovisual en Museo Olímpico de Río.',
        credentials: [
          'Director Audiovisual, Museo Olímpico de Río',
          'Profesor Universitario (graduación + pós)',
          'Ex-Coordinador de Curso de Audiovisual',
          'Fundador empresa de Digital Signage',
          'Estrategia Cultural + Alianzas Académicas'
        ],
        photo: '/alberto.jpg',
        linkedin: 'https://br.linkedin.com/in/albertomoura3d'
      }
    ],
    ctaText: '¿Interesado en trabajar con nosotros?',
    ctaButton: 'Iniciar un proyecto'
  }
}

const Studio: React.FC<StudioProps> = ({ lang }) => {
  useUserTracking()
  const seo = seoData.studio[lang]
  const content = teamData[lang]
  const studio = studioContent[lang === 'fr' ? 'en' : lang] || studioContent.en
  const [timelineExpanded, setTimelineExpanded] = useState(false)

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/studio"
      />
      <main className="relative py-12 md:py-16">
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

        <div className="mx-auto max-w-6xl px-6">
          {/* ═══════════════════════════════════════════════════════════════
              HERO SECTION - IMPACTANTE
              ═══════════════════════════════════════════════════════════ */}
          <div className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="mb-2 block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
              {content.pageLabel}
            </span>
            <h1 className="mb-6 font-handel text-4xl uppercase tracking-[0.12em] md:text-5xl lg:text-6xl" style={{ color: 'var(--theme-text)' }}>
              {content.pageTitle}
            </h1>
            
            {/* Hero Message - Destaque Único */}
            <div className="card-dark-fixed rounded-2xl p-6 md:p-8 mb-8 border-l-4" style={{ borderLeftColor: '#c92337' }}>
              <p className="mb-4 font-handel text-xl md:text-2xl uppercase tracking-[0.08em] text-azimut-red">
                {lang === 'pt' 
                  ? 'Após 30 anos, descobrimos que nossa combinação é única:'
                  : lang === 'es'
                  ? 'Tras 30 años, descubrimos que nuestra combinación es única:'
                  : lang === 'fr'
                  ? 'Après 30 ans, nous avons découvert que notre combinaison est unique:'
                  : 'After 30 years, we discovered our combination is unique:'}
              </p>
              <p className="mb-6 text-sm md:text-base leading-relaxed" style={{ color: 'var(--theme-card-text, var(--theme-text-secondary))' }}>
                {lang === 'pt' 
                  ? 'Não encontramos outro estúdio no mundo que integre curadoria de festivais, produção comercial, educação e pesquisa da forma como fazemos. Isso nos permite criar projetos que outros não conseguem.'
                  : lang === 'es'
                  ? 'No encontramos otro estudio en el mundo que integre curaduría de festivales, producción comercial, educación e investigación como lo hacemos. Esto nos permite crear proyectos que otros no pueden.'
                  : lang === 'fr'
                  ? 'Nous n\'avons pas trouvé d\'autre studio au monde qui intègre curation de festivals, production commerciale, éducation et recherche comme nous le faisons. Cela nous permet de créer des projets que d\'autres ne peuvent pas.'
                  : 'We haven\'t found another studio in the world that integrates festival curation, commercial production, education and research the way we do. This allows us to create projects others cannot.'}
              </p>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4">
                {[
                  { pt: 'Curadoria', en: 'Curation', es: 'Curaduría', fr: 'Curation' },
                  { pt: 'Tecnologia', en: 'Technology', es: 'Tecnología', fr: 'Technologie' },
                  { pt: 'Audiovisual', en: 'Audiovisual', es: 'Audiovisual', fr: 'Audiovisuel' },
                  { pt: 'Imersividade', en: 'Immersivity', es: 'Inmersividad', fr: 'Immersion' },
                  { pt: 'Academia', en: 'Academy', es: 'Academia', fr: 'Académie' },
                  { pt: 'Binacional', en: 'Binational', es: 'Binacional', fr: 'Binational' }
                ].map((item, idx) => {
                  const locale = (entry: { pt: string; en: string; es: string; fr?: string }) => {
                    if (lang === 'fr') return entry.fr || entry.en
                    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
                  }
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-azimut-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sora text-sm" style={{ color: 'var(--theme-card-text, var(--theme-text-secondary))' }}>
                        {locale(item)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: 30 ANOS DE INOVAÇÃO - MELHORADA COM GRÁFICOS
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
            <div className="card-dark-fixed rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-azimut-red"></div>
                <h2 className="font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-card-text, #d3cec3)' }}>
                  {studio.heritage.title}
                </h2>
              </div>
              <div className="prose prose-invert max-w-none mb-8">
                {studio.heritage.body.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-[0.95rem] leading-[1.8]" style={{ color: 'var(--theme-card-text, var(--theme-text-secondary))' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Estatísticas em Grid Melhorado */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-8 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                {studio.heritage.stats.map((stat, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="font-handel text-3xl md:text-4xl lg:text-5xl text-azimut-red mb-2 transition-transform group-hover:scale-110">
                      {stat.value}
                    </div>
                    <div className="font-sora text-[0.7rem] uppercase tracking-[0.1em] leading-tight" style={{ color: 'var(--theme-card-text, var(--theme-text-muted))' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Badge de Credibilidade */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <span className="mb-3 block font-sora text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: 'var(--theme-card-text, var(--theme-text-muted))' }}>
                  {lang === 'pt' ? 'Credenciais:' : lang === 'es' ? 'Credenciales:' : lang === 'fr' ? 'Références:' : 'Credentials:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { pt: 'Rio Museum', en: 'Rio Museum', es: 'Museo Río', fr: 'Musée Rio' },
                    { pt: 'Gramado VR', en: 'Gramado VR', es: 'Gramado VR', fr: 'Gramado VR' },
                    { pt: 'Autodesk', en: 'Autodesk', es: 'Autodesk', fr: 'Autodesk' },
                    { pt: 'XRBR', en: 'XRBR', es: 'XRBR', fr: 'XRBR' }
                  ].map((badge, idx) => {
                    const locale = (entry: { pt: string; en: string; es: string; fr?: string }) => {
                      if (lang === 'fr') return entry.fr || entry.en
                      return entry[lang as 'pt' | 'en' | 'es'] || entry.en
                    }
                    return (
                      <span 
                        key={idx}
                        className="inline-block rounded-full px-3 py-1.5 font-sora text-[0.65rem] uppercase tracking-[0.12em] border whitespace-nowrap"
                        style={{ 
                          borderColor: 'rgba(201, 35, 55, 0.5)',
                          backgroundColor: 'rgba(201, 35, 55, 0.1)',
                          color: '#d3cec3' /* Creme da logo - elegante e com contraste */
                        }}
                      >
                        {locale(badge)}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Bloco de credibilidade (histórico/credenciais) - mostra o que já fizemos */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.18s', animationFillMode: 'forwards' }}>
            <CredibilidadeEditais lang={lang} />
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: O QUE NOS TORNA ÚNICOS
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
              {studio.unique.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {studio.unique.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="card-dark-alt-adaptive flex items-start gap-3 p-4 rounded-xl"
                >
                  <svg className="w-5 h-5 text-azimut-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[0.9rem] leading-relaxed" style={{ color: '#d3cec3' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: VISÃO, MISSÃO E VALORES
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Visão */}
              <div className="lg:col-span-1">
                <h3 className="mb-3 font-handel text-xl uppercase tracking-[0.1em] text-azimut-red">
                  {studio.vision.title}
                </h3>
                <p className="text-[0.9rem] leading-relaxed" style={{ color: '#d3cec3' }}>
                  {studio.vision.body}
                </p>
              </div>
              {/* Missão */}
              <div className="lg:col-span-1">
                <h3 className="mb-3 font-handel text-xl uppercase tracking-[0.1em] text-azimut-red">
                  {studio.mission.title}
                </h3>
                <p className="text-[0.9rem] leading-relaxed" style={{ color: '#d3cec3' }}>
                  {studio.mission.body}
                </p>
              </div>
              {/* Valores */}
              <div className="lg:col-span-1">
                <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.1em] text-azimut-red">
                  {studio.values.title}
                </h3>
                <div className="space-y-3">
                  {studio.values.items.map((value, idx) => (
                    <div key={idx}>
                      <h4 className="mb-1 font-sora text-[0.8rem] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
                        {value.title}
                      </h4>
                      <p className="text-[0.85rem] leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: PILARES DA AZIMUT
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <h2 className="mb-8 font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
              🚀 Pilares da Azimut
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studio.pillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="card-dark-fixed rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="text-4xl mb-3">{pillar.icon}</div>
                  <h3 className="mb-2 font-handel text-lg uppercase tracking-[0.08em]" style={{ color: 'var(--theme-card-text, #d3cec3)' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: ESTRATÉGIA & POSICIONAMENTO
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
            <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
              🧭 {studio.strategy.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {studio.strategy.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="card-dark-alt-adaptive p-5 rounded-xl"
                >
                  <h4 className="mb-2 font-sora text-[0.9rem] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
                    {item.title}
                  </h4>
                  <p className="text-[0.85rem] leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: MODELO DE COCRIAÇÃO
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="card-dark-adaptive rounded-2xl p-6 md:p-8">
              <h2 className="mb-4 font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
                🤝 {studio.cocreation.title}
              </h2>
              <p className="text-[0.95rem] leading-[1.8] max-w-3xl" style={{ color: 'var(--theme-text-secondary)' }}>
                {studio.cocreation.body}
              </p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: NOSSA JORNADA (TIMELINE EXPANDÍVEL)
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}>
            <div className="card-dark-adaptive rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
                  🕰️ Nossa Jornada
                </h2>
                <button
                  onClick={() => setTimelineExpanded(!timelineExpanded)}
                  className="font-sora text-[0.75rem] uppercase tracking-[0.1em] text-azimut-red hover:text-azimut-red/80 transition-colors"
                >
                  {timelineExpanded ? 'Ocultar' : 'Ver completa'}
                </button>
              </div>
              <div className={`space-y-6 ${timelineExpanded ? 'block' : 'hidden md:block'}`}>
                {studio.timeline.map((period, idx) => (
                  <div key={idx} className="border-l-2 border-azimut-red pl-6 pb-6 last:pb-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-handel text-lg uppercase tracking-[0.1em] text-azimut-red">
                        {period.period}
                      </span>
                      <span className="font-sora text-[0.85rem] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
                        {period.title}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {period.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-[0.85rem]" style={{ color: 'var(--theme-text-secondary)' }}>
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azimut-red shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {!timelineExpanded && (
                <div className="md:hidden text-center mt-4">
                  <button
                    onClick={() => setTimelineExpanded(true)}
                    className="font-sora text-[0.75rem] uppercase tracking-[0.1em] text-azimut-red hover:text-azimut-red/80 transition-colors"
                  >
                    Ver timeline completa →
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: DESCRIÇÃO DO ESTÚDIO + CREDENCIAIS + ÁREAS
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="max-w-3xl">
              <div className="prose prose-invert max-w-none">
                {content.studioDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 text-[0.95rem] leading-[1.8]" style={{ color: 'var(--theme-text-secondary)' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Mensagem sobre unicidade - tom humilde mas impactante */}
              <div className="mt-8 pt-8 border-t rounded-xl p-6" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'rgba(201, 35, 55, 0.05)' }}>
                <p className="text-[0.9rem] leading-relaxed italic" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' 
                    ? 'Após 30 anos explorando diferentes caminhos, descobrimos que nossa combinação de curadoria, produção, educação e pesquisa é algo que não encontramos em nenhum outro estúdio. Não é sobre ser melhor, é sobre ser diferente – e essa diferença nos permite criar projetos únicos.'
                    : lang === 'es'
                    ? 'Tras 30 años explorando diferentes caminos, descubrimos que nuestra combinación de curaduría, producción, educación e investigación es algo que no encontramos en ningún otro estudio. No se trata de ser mejor, se trata de ser diferente – y esa diferencia nos permite crear proyectos únicos.'
                    : lang === 'fr'
                    ? 'Après 30 ans à explorer différents chemins, nous avons découvert que notre combinaison de curation, production, éducation et recherche est quelque chose que nous ne trouvons dans aucun autre studio. Il ne s\'agit pas d\'être meilleur, il s\'agit d\'être différent – et cette différence nous permet de créer des projets uniques.'
                    : 'After 30 years exploring different paths, we discovered our combination of curation, production, education and research is something we haven\'t found in any other studio. It\'s not about being better, it\'s about being different – and that difference allows us to create unique projects.'}
                </p>
              </div>

              {/* Credenciais */}
              <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                <h3 className="mb-4 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
                  {content.credentialsTitle}
                </h3>
                <ul className="space-y-2">
                  {content.credentials.map((cred, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[0.85rem]" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azimut-red shrink-0"></span>
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Áreas de atuação */}
              <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                <h3 className="mb-4 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text-muted)' }}>
                  {content.areasTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {content.areas.map((area, idx) => (
                    <span 
                      key={idx}
                      className="rounded-full px-3 py-1.5 font-sora text-[0.68rem] uppercase tracking-[0.12em]"
                      style={{ 
                        background: 'linear-gradient(135deg, #1a1f2e 0%, #252a38 100%)', 
                        border: '1px solid rgba(201, 35, 55, 0.6)',
                        color: '#d3cec3'
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: EQUIPE
              ═══════════════════════════════════════════════════════════ */}
          <section className="mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
            <h2 className="mb-8 font-handel text-2xl uppercase tracking-[0.12em] md:text-3xl" style={{ color: 'var(--theme-text)' }}>
              Equipe
            </h2>
            <div className="space-y-6">
              {content.team.map((member, idx) => (
                <div 
                  key={idx}
                  className="card-dark-fixed group relative rounded-2xl overflow-hidden transition-all duration-500 animate-fade-in-up opacity-0"
                  style={{ 
                    animationDelay: `${0.3 + idx * 0.15}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Foto - Proporção 3:4 (~412x549) */}
                    <div className="team-photo relative w-full md:w-[280px] lg:w-[320px] xl:w-[360px] shrink-0 aspect-[3/4]">
                      <img 
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 15%' }}
                        onError={(e) => {
                          // Fallback: fundo escuro com estrela no canto
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)'
                          }
                          e.currentTarget.src = '/logo-azimut-star.svg'
                          e.currentTarget.className = 'absolute bottom-4 right-4 w-12 h-12 object-contain opacity-20'
                          e.currentTarget.style.filter = 'none'
                          e.currentTarget.style.objectPosition = 'center'
                        }}
                      />
                    </div>

                    {/* Conteúdo - sempre texto claro no fundo escuro */}
                    <div className="flex-1 p-6 md:p-8">
                      {/* Linha de destaque */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-azimut-red via-azimut-red/50 to-transparent"></div>
                      
                      <h3 className="mb-1 font-handel text-xl tracking-[0.08em] md:text-2xl" style={{ color: 'var(--theme-card-text, #d3cec3)' }}>
                        {member.name}
                      </h3>
                      <p className="mb-1 font-sora text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-azimut-red">
                        {member.role}
                      </p>
                      <p className="mb-4 font-sora text-[0.6rem] uppercase tracking-[0.12em]" style={{ color: 'var(--theme-card-text, var(--theme-text-muted))' }}>
                        {member.subtitle}
                      </p>
                      <p className="text-[0.85rem] leading-[1.7] mb-4" style={{ color: 'var(--theme-card-text, var(--theme-text-secondary))' }}>
                        {member.bio}
                      </p>

                      {/* Credenciais expandidas */}
                      {member.credentials && member.credentials.length > 0 && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                          <h4 className="mb-3 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-azimut-red">
                            {lang === 'pt' ? 'Credenciais' : lang === 'es' ? 'Credenciales' : lang === 'fr' ? 'Crédentials' : 'Credentials'}
                          </h4>
                          <ul className="space-y-1.5">
                            {member.credentials.map((cred, credIdx) => (
                              <li key={credIdx} className="flex items-start gap-2 text-[0.8rem]" style={{ color: 'var(--theme-card-text, var(--theme-text-secondary))' }}>
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-azimut-red shrink-0"></span>
                                {cred}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* LinkedIn - Cinza → Azul LinkedIn no hover */}
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 mt-4 text-[0.75rem] font-medium transition-all duration-300 hover:text-[#0A66C2]"
                        style={{ color: 'var(--theme-card-text, var(--theme-text-muted))' }}
                      >
                        <svg 
                          className="w-5 h-5 transition-colors duration-300 group-hover:text-[#0A66C2]" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="transition-colors duration-300 group-hover:text-[#0A66C2]">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA para contato */}
              <div 
                className="mt-8 rounded-2xl p-8 text-center animate-fade-in-up opacity-0" 
                style={{ 
                  animationDelay: '0.8s',
                  animationFillMode: 'forwards',
                  background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <p className="mb-5 text-[0.95rem]" style={{ color: 'var(--theme-text-secondary)' }}>
                  {content.ctaText}
                </p>
                <a 
                  href="/contact"
                  className="cta-glow inline-flex items-center gap-2 rounded-xl border border-azimut-red/80 px-6 py-3 font-sora text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-all hover:bg-azimut-red/20"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {content.ctaButton}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Studio
