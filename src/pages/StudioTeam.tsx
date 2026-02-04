import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import LangLink from '../components/LangLink'
import Breadcrumbs from '../components/Breadcrumbs'
import StudioSubNav from '../components/StudioSubNav'

interface StudioTeamProps {
  lang: Lang
}

const StudioTeam: React.FC<StudioTeamProps> = ({ lang }) => {
  const location = useLocation()
  
  // Scroll para o membro específico quando a página carrega com hash
  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) {
      // Pequeno delay para garantir que o DOM está renderizado
      setTimeout(() => {
        const element = document.getElementById(`member-${hash}`)
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.hash])

  const content = {
    pt: {
      title: 'Equipe',
      subtitle: 'Os diretores e especialistas por trás das experiências imersivas da Azimut',
      team: [
        {
          slug: 'ranz',
          name: 'Ranz Enberger',
          role: 'DIRETOR CRIATIVO & DE TECNOLOGIA',
          subtitle: 'Cineasta · Pesquisador · Curador',
          bio: 'Lidera direção criativa, tecnologia, storytelling imersivo, VR/XR, curadoria e pipelines com IA. Mestrado em Mídias Criativas (UFRJ-VF), pós em Análise de Sistemas. Iniciou pesquisa em IA para animação em 1997. Cidadão canadense com atuação global. Certificado em VFX (EUA/Canadá).',
          credentials: [
            'Direção Geral e Tecnologia na Montagem do Rio Museu Olímpico',
            'Curador VR, Festival de Gramado (2017-hoje)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Demo Artist Autodesk Discreet (1996-2008)',
            'Único contrato Canadá Autodesk na América do Sul',
            'Único Flame Trainer certificado no Brasil',
            'Professor pós-graduação em Mídias Criativas',
            '30+ anos em CG, VR/XR e IA para audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          slug: 'anick',
          name: 'Anick Couto',
          role: 'DIRETORA DE ARTE',
          subtitle: 'Designer Visual & de Experiência',
          bio: 'Responsável pela direção visual, design de personagens e ambientes, cenografia, concept art e estética de animação. Co-cria a linguagem visual de instalações imersivas, incluindo o universo Casa dos Duendes.',
          credentials: [
            'Liderança da Equipe de Arte na Montagem do Rio Museu Olímpico',
            'Designer Visual + Cenografia Digital',
            'Concept Art + Character Design',
            'Liderou equipe completa de arte (UI, grafismo, sinalização)',
            'Universo Casa dos Duendes (co-criação)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          slug: 'alberto',
          name: 'Alberto Moura',
          role: 'DIRETOR AUDIOVISUAL & OPERAÇÕES',
          subtitle: 'Educador · Estrategista Cultural',
          bio: 'Lidera produção criativa, coordenação de projetos, parcerias acadêmicas e estratégia cultural. Faz a ponte entre instituições, educação e experiência pública, com trajetória em ensino audiovisual e programas multimídia.',
          credentials: [
            'Diretor Audiovisual na Montagem do Rio Museu Olímpico',
            'Professor Universitário (graduação + pós)',
            'Ex-Coordenador de Curso de Audiovisual',
            'Fundador empresa de Digital Signage',
            'Estratégia Cultural + Parcerias Acadêmicas'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/alberto.jpg'
        }
      ],
      ctaText: 'Interessado em trabalhar conosco?'
    },
    en: {
      title: 'Team',
      subtitle: 'The directors and specialists behind Azimut\'s immersive experiences',
      team: [
        {
          slug: 'ranz',
          name: 'Ranz Enberger',
          role: 'CREATIVE & TECHNOLOGY DIRECTOR',
          subtitle: 'Filmmaker · Researcher · Curator',
          bio: 'Leads creative direction, technology, immersive storytelling, VR/XR, curatorship and AI-driven pipelines. Master\'s in Creative Media (UFRJ-VF), post-graduate in Systems Analysis. Started AI research for animation in 1997. Canadian citizen with global scope. Certified in VFX (USA/Canada).',
          credentials: [
            'General & Technology Direction at Rio Olympic Museum Setup',
            'VR Curator, Gramado Festival (2017-present)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Autodesk Discreet Demo Artist (1996-2008)',
            'Only Autodesk Canada contract in South America',
            'Only certified Flame Trainer in Brazil',
            'Post-graduate professor in Creative Media',
            '30+ years in CG, VR/XR and AI for audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          slug: 'anick',
          name: 'Anick Couto',
          role: 'ART DIRECTOR',
          subtitle: 'Visual & Experience Designer',
          bio: 'Responsible for visual direction, character and environment design, scenography, concept art and animation aesthetics. Co-creates the visual language of immersive installations, including the Casa dos Duendes universe.',
          credentials: [
            'Art Team Lead at Rio Olympic Museum Setup',
            'Visual Designer + Digital Scenography',
            'Concept Art + Character Design',
            'Led complete art team (UI, graphics, signage)',
            'Casa dos Duendes universe (co-creation)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          slug: 'alberto',
          name: 'Alberto Moura',
          role: 'AUDIOVISUAL & OPERATIONS DIRECTOR',
          subtitle: 'Educator · Cultural Strategist',
          bio: 'Leads audiovisual production, operations, project coordination, academic partnerships and cultural strategy. Bridges institutions, education and public experience, with trajectory in audiovisual teaching and multimedia programs.',
          credentials: [
            'Audiovisual Director at Rio Olympic Museum Setup',
            'University Professor (undergraduate + graduate)',
            'Ex-Audiovisual Course Coordinator',
            'Digital Signage company founder',
            'Cultural Strategy + Academic Partnerships'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/alberto.jpg'
        }
      ],
      ctaText: 'Interested in working with us?'
    },
    fr: {
      title: 'Équipe',
      subtitle: 'Les directeurs et spécialistes derrière les expériences immersives d\'Azimut',
      team: [
        {
          slug: 'ranz',
          name: 'Ranz Enberger',
          role: 'DIRECTEUR CRÉATIF & TECHNOLOGIQUE',
          subtitle: 'Cinéaste · Chercheur · Curateur',
          bio: 'Dirige la direction créative, la technologie, la narration immersive, VR/XR, la curation et les pipelines IA. Maîtrise en Médias Créatifs (UFRJ-VF), post-grad en Analyse de Systèmes. A commencé la recherche en IA pour l\'animation en 1997. Citoyen canadien avec portée mondiale. Certifié en VFX (USA/Canada).',
          credentials: [
            'Direction Générale et Technologie au Montage du Musée Olympique de Rio',
            'Curateur VR, Festival de Gramado (depuis 2017)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Demo Artist Autodesk Discreet (1996-2008)',
            'Seul contrat Canada Autodesk en Amérique du Sud',
            'Seul Flame Trainer certifié au Brésil',
            'Professeur post-graduation en Médias Créatifs',
            '30+ ans en CG, VR/XR et IA pour audiovisuel'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          slug: 'anick',
          name: 'Anick Couto',
          role: 'DIRECTRICE ARTISTIQUE',
          subtitle: 'Designer Visuel & d\'Expérience',
          bio: 'Responsable de la direction visuelle, du design de personnages et d\'environnements, de la scénographie, du concept art et de l\'esthétique d\'animation. Co-crée le langage visuel des installations immersives, y compris l\'univers Casa dos Duendes.',
          credentials: [
            'Responsable de l\'Équipe Artistique au Montage du Musée Olympique de Rio',
            'Designer Visuel + Scénographie Numérique',
            'Concept Art + Character Design',
            'A dirigé l\'équipe complète d\'art (UI, graphisme, signalisation)',
            'Univers Casa dos Duendes (co-création)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          slug: 'alberto',
          name: 'Alberto Moura',
          role: 'DIRECTEUR AUDIOVISUEL & OPÉRATIONS',
          subtitle: 'Éducateur · Stratège Culturel',
          bio: 'Dirige la production créative, la coordination de projets, les partenariats académiques et la stratégie culturelle. Fait le pont entre les institutions, l\'éducation et l\'expérience du public, avec une trajectoire dans l\'enseignement audiovisuel et les programmes multimédias.',
          credentials: [
            'Directeur Audiovisuel au Montage du Musée Olympique de Rio',
            'Professeur Universitaire (graduation + post)',
            'Ex-Coordinateur de Cours d\'Audiovisuel',
            'Fondateur entreprise de Digital Signage',
            'Stratégie Culturelle + Partenariats Académiques'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/alberto.jpg'
        }
      ],
      ctaText: 'Intéressé à travailler avec nous?'
    },
    es: {
      title: 'Equipo',
      subtitle: 'Los directores y especialistas detrás de las experiencias inmersivas de Azimut',
      team: [
        {
          slug: 'ranz',
          name: 'Ranz Enberger',
          role: 'DIRECTOR CREATIVO & DE TECNOLOGÍA',
          subtitle: 'Cineasta · Investigador · Curador',
          bio: 'Lidera dirección creativa, tecnología, storytelling inmersivo, VR/XR, curaduría y pipelines con IA. Maestría en Medios Creativos (UFRJ-VF), post-grado en Análisis de Sistemas. Comenzó investigación en IA para animación en 1997. Ciudadano canadiense con alcance global. Certificado en VFX (EE.UU./Canadá).',
          credentials: [
            'Dirección General y Tecnología en el Montaje del Rio Museo Olímpico',
            'Curador VR, Festival de Gramado (desde 2017)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Demo Artist Autodesk Discreet (1996-2008)',
            'Único contrato Canadá Autodesk en América del Sur',
            'Único Flame Trainer certificado en Brasil',
            'Profesor post-grado en Medios Creativos',
            '30+ años en CG, VR/XR e IA para audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          slug: 'anick',
          name: 'Anick Couto',
          role: 'DIRECTORA DE ARTE',
          subtitle: 'Diseñadora Visual & de Experiencia',
          bio: 'Responsable de la dirección visual, diseño de personajes y ambientes, escenografía, concept art y estética de animación. Co-crea el lenguaje visual de instalaciones inmersivas, incluyendo el universo Casa dos Duendes.',
          credentials: [
            'Líder del Equipo de Arte en el Montaje del Rio Museo Olímpico',
            'Diseñadora Visual + Escenografía Digital',
            'Concept Art + Character Design',
            'Lideró equipo completo de arte (UI, grafismo, señalización)',
            'Universo Casa dos Duendes (co-creación)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          slug: 'alberto',
          name: 'Alberto Moura',
          role: 'DIRECTOR AUDIOVISUAL & OPERACIONES',
          subtitle: 'Educador · Estratega Cultural',
          bio: 'Lidera producción creativa, coordinación de proyectos, alianzas académicas y estrategia cultural. Hace el puente entre instituciones, educación y experiencia pública, con trayectoria en enseñanza audiovisual y programas multimedia.',
          credentials: [
            'Director Audiovisual en el Montaje del Rio Museo Olímpico',
            'Profesor Universitario (graduación + post)',
            'Ex-Coordinador de Curso de Audiovisual',
            'Fundador empresa de Digital Signage',
            'Estrategia Cultural + Alianzas Académicas'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/alberto.jpg'
        }
      ],
      ctaText: '¿Interesado en trabajar con nosotros?'
    }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Studio - Azimut`}
        description={text.subtitle}
        path="/studio/equipe"
      />
      
      {/* Menu Secundário Studio - PADRONIZADO */}
      <StudioSubNav lang={lang} currentPage="equipe" />
      
      <main className="relative">
        {/* Espaçador para compensar header + submenu fixos */}
        <div style={{ height: '48px' }} />
        
        {/* Star Background - FIXA (FUNDO - atrás de tudo) */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-24 md:-right-40 md:h-[680px] md:w-[680px] opacity-50"
          style={{ zIndex: -10 }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs
              lang={lang}
              items={[
                { name: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home', url: `/${lang}` },
                { name: lang === 'pt' ? 'Estúdio' : lang === 'es' ? 'Estudio' : lang === 'fr' ? 'Studio' : 'Studio', url: `/${lang}/studio` },
                { name: text.title, url: `/${lang}/studio/equipe` }
              ]}
            />
          </div>

          {/* Hero */}
          <div className="mb-12">
            {/* Eyebrow com emoji */}
            <span className="section-eyebrow">
              <span>👥</span>
              {lang === 'pt' ? 'EQUIPE' : lang === 'es' ? 'EQUIPO' : lang === 'fr' ? 'ÉQUIPE' : 'TEAM'}
            </span>
            
            {/* Título grande */}
            <h1 className="section-title">
              {text.title}
            </h1>
            
            {/* Subtítulo */}
            <p className="body-large">
              {text.subtitle}
            </p>
          </div>

          {/* Team Members - Layout otimizado com melhor espaçamento */}
          <div className="space-y-8 md:space-y-10">
            {text.team.map((member, idx) => (
              <div 
                key={idx}
                id={`member-${member.slug}`}
                className="card-dark-fixed group relative rounded-2xl overflow-hidden transition-all duration-500 scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Foto - Larguras iguais para todos, enquadramento otimizado */}
                  <div 
                    className="team-photo relative shrink-0 overflow-hidden w-full md:w-[450px] lg:w-[500px] xl:w-[550px] aspect-[3/4]"
                    style={{
                      background: '#0a0f1a',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full"
                      style={member.name.includes('Alberto') ? {
                        objectFit: 'cover',
                        objectPosition: 'center 35%',
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transform: 'scale(1.25)',
                        transformOrigin: 'center center'
                      } : member.name.includes('Ranz') ? {
                        objectFit: 'cover',
                        objectPosition: 'center 30%',
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transform: 'scale(1.2)',
                        transformOrigin: 'center center'
                      } : {
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        width: '100%',
                        height: '100%',
                        display: 'block'
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

                  {/* Conteúdo - Espaçamento otimizado */}
                  <div className="flex-1 p-6 md:p-8 max-w-2xl flex flex-col justify-start pt-4 md:pt-6">
                    {/* Linha decorativa vermelha */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-azimut-red via-azimut-red/50 to-transparent"></div>
                    
                    {/* Nome GRANDE - 2 LINHAS: Nome branco + Sobrenome vermelho */}
                    <h3 className="mb-4 font-handel uppercase tracking-[0.04em] leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
                      <span className="text-white block">{member.name.split(' ')[0]}</span>
                      <span className="text-azimut-red block">{member.name.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    
                    {/* Role - CINZA CLARO para não competir com sobrenome vermelho */}
                    <p className="mb-3 font-sora text-[0.75rem] md:text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: '#a8a29e' }}>
                      {member.role}
                    </p>
                    
                    {/* Subtitle - Mais sutil */}
                    <p className="mb-5 font-sora text-[0.6rem] uppercase tracking-[0.12em] opacity-80" style={{ color: 'var(--theme-card-text, var(--theme-text-muted))' }}>
                      {member.subtitle}
                    </p>
                    
                    {/* Bio - Espaçamento melhorado */}
                    <p className="text-[0.9rem] leading-[1.75] mb-6" style={{ color: 'var(--theme-card-text, var(--theme-text-secondary))' }}>
                      {member.bio}
                    </p>

                    {/* Credenciais */}
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

                    {/* LinkedIn - Azul LinkedIn direto */}
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-link group inline-flex items-center gap-2 mt-4 text-[0.75rem] font-medium transition-all duration-300"
                    >
                      <svg 
                        className="w-5 h-5 transition-all duration-300 group-hover:scale-110" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="transition-all duration-300 group-hover:underline">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div 
            className="mt-8 rounded-2xl p-8 text-center" 
            style={{ 
              background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <p className="mb-5 text-[0.95rem] text-slate-200">
              {text.ctaText}
            </p>
            <LangLink
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-azimut-red bg-transparent px-8 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-azimut-red"
            >
              {lang === 'pt' ? 'Iniciar um Projeto' : lang === 'fr' ? 'Démarrer un Projet' : lang === 'es' ? 'Iniciar un Proyecto' : 'Start a Project'}
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioTeam
