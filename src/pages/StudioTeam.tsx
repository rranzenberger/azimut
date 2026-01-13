import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'

interface StudioTeamProps {
  lang: Lang
}

const StudioTeam: React.FC<StudioTeamProps> = ({ lang }) => {
  useUserTracking()
  // Estrela FIXA (sem parallax) - Padronizada com Studio principal

  const content = {
    pt: {
      title: 'Equipe',
      subtitle: 'Os diretores e especialistas por trás das experiências imersivas da Azimut',
      team: [
        {
          name: 'Ranz Enberger',
          role: 'DIRETOR CRIATIVO & DE TECNOLOGIA',
          subtitle: 'Cineasta · Pesquisador · Curador',
          bio: 'Lidera direção criativa, tecnologia, storytelling imersivo, VR/XR, curadoria e pipelines com IA. Diretor Geral no Rio Museu Olímpico. Mestrado em Mídias Criativas (UFRJ-VF), pós em Análise de Sistemas. Iniciou pesquisa em IA para animação em 1997. Cidadão canadense com atuação global. Certificado em VFX (EUA/Canadá).',
          credentials: [
            'Diretor de Tecnologia, Rio Museu Olímpico',
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
          name: 'Anick Couto',
          role: 'DIRETORA DE ARTE',
          subtitle: 'Designer Visual & de Experiência',
          bio: 'Responsável pela direção visual, design de personagens e ambientes, cenografia, concept art e estética de animação. Liderou toda a equipe de arte no Rio Museu Olímpico – UI, grafismo, textos de parede, sinalização e design. Co-cria a linguagem visual de instalações imersivas, incluindo o universo Casa dos Duendes.',
          credentials: [
            'Diretora de Arte, Rio Museu Olímpico',
            'Designer Visual + Cenografia Digital',
            'Concept Art + Character Design',
            'Liderou equipe completa de arte (UI, grafismo, sinalização)',
            'Universo Casa dos Duendes (co-criação)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
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
            '30+ years in CG, VR/XR and AI for audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          name: 'Anick Couto',
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
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'AUDIOVISUAL & OPERATIONS DIRECTOR',
          subtitle: 'Educator · Cultural Strategist',
          bio: 'Leads audiovisual production, operations, project coordination, academic partnerships and cultural strategy. Audiovisual Director at Rio Olympic Museum. Bridges institutions, education and public experience, with trajectory in audiovisual teaching and multimedia programs.',
          credentials: [
            'Audiovisual Director, Rio Olympic Museum',
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
          name: 'Ranz Enberger',
          role: 'DIRECTEUR CRÉATIF & TECHNOLOGIQUE',
          subtitle: 'Cinéaste · Chercheur · Curateur',
          bio: 'Dirige la direction créative, la technologie, la narration immersive, VR/XR, la curation et les pipelines IA. Directeur Général au Musée Olympique de Rio. Maîtrise en Médias Créatifs (UFRJ-VF), post-grad en Analyse de Systèmes. A commencé la recherche en IA pour l\'animation en 1997. Citoyen canadien avec portée mondiale. Certifié en VFX (USA/Canada).',
          credentials: [
            'Directeur de Technologie, Musée Olympique de Rio',
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
          name: 'Anick Couto',
          role: 'DIRECTRICE ARTISTIQUE',
          subtitle: 'Designer Visuel & d\'Expérience',
          bio: 'Responsable de la direction visuelle, du design de personnages et d\'environnements, de la scénographie, du concept art et de l\'esthétique d\'animation. A dirigé toute l\'équipe artistique du Musée Olympique de Rio – UI, graphisme, textes muraux, signalisation et design. Co-crée le langage visuel des installations immersives, y compris l\'univers Casa dos Duendes.',
          credentials: [
            'Directrice Artistique, Musée Olympique de Rio',
            'Designer Visuel + Scénographie Numérique',
            'Concept Art + Character Design',
            'A dirigé l\'équipe complète d\'art (UI, graphisme, signalisation)',
            'Univers Casa dos Duendes (co-création)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'DIRECTEUR AUDIOVISUEL & OPÉRATIONS',
          subtitle: 'Éducateur · Stratège Culturel',
          bio: 'Dirige la production créative, la coordination de projets, les partenariats académiques et la stratégie culturelle. Directeur Audiovisuel au Musée Olympique de Rio. Fait le pont entre les institutions, l\'éducation et l\'expérience du public, avec une trajectoire dans l\'enseignement audiovisuel et les programmes multimédias.',
          credentials: [
            'Directeur Audiovisuel, Musée Olympique de Rio',
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
          name: 'Ranz Enberger',
          role: 'DIRECTOR CREATIVO & DE TECNOLOGÍA',
          subtitle: 'Cineasta · Investigador · Curador',
          bio: 'Lidera dirección creativa, tecnología, storytelling inmersivo, VR/XR, curaduría y pipelines con IA. Director General en el Museo Olímpico de Río. Maestría en Medios Creativos (UFRJ-VF), post-grado en Análisis de Sistemas. Comenzó investigación en IA para animación en 1997. Ciudadano canadiense con alcance global. Certificado en VFX (EE.UU./Canadá).',
          credentials: [
            'Director de Tecnología, Museo Olímpico de Río',
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
          name: 'Anick Couto',
          role: 'DIRECTORA DE ARTE',
          subtitle: 'Diseñadora Visual & de Experiencia',
          bio: 'Responsable de la dirección visual, diseño de personajes y ambientes, escenografía, concept art y estética de animación. Lideró todo el equipo de arte del Museo Olímpico de Río – UI, grafismo, textos de pared, señalización y diseño. Co-crea el lenguaje visual de instalaciones inmersivas, incluyendo el universo Casa dos Duendes.',
          credentials: [
            'Directora de Arte, Museo Olímpico de Río',
            'Diseñadora Visual + Escenografía Digital',
            'Concept Art + Character Design',
            'Lideró equipo completo de arte (UI, grafismo, señalización)',
            'Universo Casa dos Duendes (co-creación)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'DIRECTOR AUDIOVISUAL & OPERACIONES',
          subtitle: 'Educador · Estratega Cultural',
          bio: 'Lidera producción creativa, coordinación de proyectos, alianzas académicas y estrategia cultural. Director Audiovisual en el Museo Olímpico de Río. Hace el puente entre instituciones, educación y experiencia pública, con trayectoria en enseñanza audiovisual y programas multimedia.',
          credentials: [
            'Director Audiovisual, Museo Olímpico de Río',
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
      
      <main className="relative py-16 md:py-20">
        {/* Star Background - FIXA (posição mais alta como Studio principal) */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-24 md:-right-40 md:h-[680px] md:w-[680px] opacity-0.3"
          style={{ zIndex: 0 }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-theme-text-secondary">
            <LangLink to="/" className="hover:text-azimut-red transition-colors">Home</LangLink>
            <span>›</span>
            <LangLink to="/studio" className="hover:text-azimut-red transition-colors">Studio</LangLink>
            <span>›</span>
            <span className="text-azimut-red font-medium">{text.title}</span>
          </nav>

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

          {/* Team Members - LAYOUT ORIGINAL (foto ao lado) */}
          <div className="space-y-6">
            {text.team.map((member, idx) => (
              <div 
                key={idx}
                className="card-dark-fixed group relative rounded-2xl overflow-hidden transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Foto - MAIS LARGA para não cortar */}
                  <div className="team-photo relative w-full md:w-[400px] lg:w-[450px] xl:w-[500px] shrink-0 aspect-[3/4]">
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center center' }}
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

                  {/* Conteúdo - MENOS ESPAÇO à direita */}
                  <div className="flex-1 p-5 md:p-6 max-w-2xl">
                    {/* Linha decorativa vermelha */}
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

                    {/* LinkedIn - Cinza → Azul LinkedIn no hover (ORIGINAL) */}
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
          </div>

          {/* CTA */}
          <div 
            className="mt-8 rounded-2xl p-8 text-center" 
            style={{ 
              background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <p className="mb-5 text-[0.95rem]" style={{ color: 'var(--theme-text-secondary)' }}>
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
