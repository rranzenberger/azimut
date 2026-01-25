// ════════════════════════════════════════════════════════════
// ACADEMY CORPORATE - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import { useUserTracking } from '../hooks/useUserTracking'
import { useTheme } from '../contexts/ThemeContext'
import { PageFooterNavigation } from '../components/PageFooterNavigation'
import AcademySubNav from '../components/AcademySubNav'

interface AcademyCorporateProps {
  lang: Lang
}

const AcademyCorporate: React.FC<AcademyCorporateProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()
  const { theme } = useTheme()

  const content: Record<Lang, any> = {
    pt: {
      meta: {
        title: 'Azimut Academy Corporate - Treinamento Empresarial',
        description: 'Treinamentos corporativos customizados em VR, IA e produção audiovisual. Para empresas, governo, ONGs, SESC, SENAC e universidades.'
      },
      hero: {
        badge: '🏢 Treinamento Corporativo',
        title: 'Soluções B2B',
        subtitle: 'Treinamento customizado para sua equipe',
        description: 'Capacitamos empresas, governos, ONGs e instituições de ensino com treinamentos sob medida em tecnologias imersivas e produção audiovisual.'
      },
      clients: {
        title: 'Nossos Clientes',
        subtitle: 'Empresas e instituições que confiam na Azimut',
        categories: [
          {
            id: 'corporate',
            title: 'Empresas',
            logos: ['Google', 'Globo', 'Tech Startups', 'Agências Criativas']
          },
          {
            id: 'government',
            title: 'Governo & Cultura',
            logos: ['Secretarias de Cultura', 'ONGs', 'OSCIPs', 'Governos Estaduais']
          },
          {
            id: 'education',
            title: 'Educação',
            logos: ['SESC', 'SENAC', 'Universidades', 'Escolas Premium']
          }
        ]
      },
      formats: [
        {
          id: 'onsite',
          icon: '🏢',
          title: 'In-Company',
          description: 'Treinamento na sua empresa, com equipamentos e professores no local.',
          duration: '1-5 dias',
          ideal: 'Equipes de 8-20 pessoas'
        },
        {
          id: 'online',
          icon: '💻',
          title: 'Online ao Vivo',
          description: 'Workshops online interativos via Zoom/Teams, com projetos práticos.',
          duration: '2-8 horas por dia',
          ideal: 'Times remotos ou distribuídos'
        },
        {
          id: 'hybrid',
          icon: '🔄',
          title: 'Híbrido',
          description: 'Combinação de aulas online + imersão presencial para projetos finais.',
          duration: 'Customizado',
          ideal: 'Projetos complexos'
        },
        {
          id: 'consulting',
          icon: '🎯',
          title: 'Consultoria',
          description: 'Consultoria técnica para projetos específicos, com suporte contínuo.',
          duration: 'Por demanda',
          ideal: 'Projetos de longo prazo'
        }
      ],
      topics: {
        title: 'Temas Disponíveis',
        list: [
          {
            category: 'VR & Imersivo',
            items: ['Produção de Filmes 360°', 'Game Design em VR', 'Tour Virtual Interativo', 'Treinamento Imersivo']
          },
          {
            category: 'IA Generativa',
            items: ['IA para Marketing', 'Automação com ChatGPT', 'Criação de Imagens IA', 'Vídeo Generativo']
          },
          {
            category: 'Audiovisual',
            items: ['Produção de Vídeo', 'Motion Design', 'Transmissão ao Vivo', 'Pós-Produção']
          },
          {
            category: 'Tech & Dev',
            items: ['Unreal Engine', 'Unity para XR', 'WebGL Interativo', 'Virtual Production']
          }
        ]
      },
      cases: {
        title: 'Cases de Sucesso',
        subtitle: 'Veja alguns dos projetos e parcerias que realizamos',
        examples: [
          {
            id: 'sesc',
            client: 'SESC',
            project: 'Workshop de VR para Educadores',
            result: '60+ professores capacitados',
            testimonial: 'Conteúdo de altíssima qualidade, professores experientes e didáticos.'
          },
          {
            id: 'startup',
            client: 'Tech Startup',
            project: 'Treinamento Unreal Engine',
            result: 'Equipe produzindo em tempo real',
            testimonial: 'A Azimut nos ajudou a dar o salto tecnológico que precisávamos.'
          },
          {
            id: 'gov',
            client: 'Secretaria de Cultura',
            project: 'Curso de Produção Audiovisual',
            result: '40 produtores certificados',
            testimonial: 'Parceria essencial para democratizar o acesso à tecnologia audiovisual.'
          }
        ]
      },
      partnerships: {
        title: 'Parcerias Institucionais',
        items: [
          { name: 'SESC', description: 'Workshops e cursos regulares' },
          { name: 'SENAC', description: 'Formação profissional customizada' },
          { name: 'Universidades', description: 'Palestras e workshops para alunos' },
          { name: 'UFRJ/ECO', description: 'Pesquisadores associados' }
        ]
      },
      cta: {
        title: 'Vamos Treinar Sua Equipe?',
        subtitle: 'Solicite uma proposta customizada para sua empresa ou instituição',
        button: 'Solicitar Proposta'
      }
    },
    en: {
      meta: {
        title: 'Azimut Academy Corporate - Corporate Training',
        description: 'Customized corporate training in VR, AI and audiovisual production. For companies, government, NGOs, SESC, SENAC and universities.'
      },
      hero: {
        badge: '🏢 Corporate Training',
        title: 'B2B Solutions',
        subtitle: 'Customized training for your team',
        description: 'We train companies, governments, NGOs and educational institutions with tailor-made training in immersive technologies and audiovisual production.'
      },
      clients: {
        title: 'Our Clients',
        subtitle: 'Companies and institutions that trust Azimut',
        categories: [
          {
            id: 'corporate',
            title: 'Companies',
            logos: ['Google', 'Globo', 'Tech Startups', 'Creative Agencies']
          },
          {
            id: 'government',
            title: 'Government & Culture',
            logos: ['Departments of Culture', 'NGOs', 'OSCIPs', 'State Governments']
          },
          {
            id: 'education',
            title: 'Education',
            logos: ['SESC', 'SENAC', 'Universities', 'Premium Schools']
          }
        ]
      },
      formats: [
        {
          id: 'onsite',
          icon: '🏢',
          title: 'In-Company',
          description: 'Training at your company, with equipment and instructors on-site.',
          duration: '1-5 days',
          ideal: 'Teams of 8-20 people'
        },
        {
          id: 'online',
          icon: '💻',
          title: 'Live Online',
          description: 'Interactive online workshops via Zoom/Teams, with practical projects.',
          duration: '2-8 hours per day',
          ideal: 'Remote or distributed teams'
        },
        {
          id: 'hybrid',
          icon: '🔄',
          title: 'Hybrid',
          description: 'Combination of online classes + in-person immersion for final projects.',
          duration: 'Customized',
          ideal: 'Complex projects'
        },
        {
          id: 'consulting',
          icon: '🎯',
          title: 'Consulting',
          description: 'Technical consulting for specific projects, with ongoing support.',
          duration: 'On demand',
          ideal: 'Long-term projects'
        }
      ],
      topics: {
        title: 'Available Topics',
        list: [
          {
            category: 'VR & Immersive',
            items: ['360° Film Production', 'VR Game Design', 'Interactive Virtual Tour', 'Immersive Training']
          },
          {
            category: 'Generative AI',
            items: ['AI for Marketing', 'ChatGPT Automation', 'AI Image Creation', 'Generative Video']
          },
          {
            category: 'Audiovisual',
            items: ['Video Production', 'Motion Design', 'Live Streaming', 'Post-Production']
          },
          {
            category: 'Tech & Dev',
            items: ['Unreal Engine', 'Unity for XR', 'Interactive WebGL', 'Virtual Production']
          }
        ]
      },
      cases: {
        title: 'Success Cases',
        subtitle: 'See some of the projects and partnerships we\'ve accomplished',
        examples: [
          {
            id: 'sesc',
            client: 'SESC',
            project: 'VR Workshop for Educators',
            result: '60+ teachers trained',
            testimonial: 'Highest quality content, experienced and didactic instructors.'
          },
          {
            id: 'startup',
            client: 'Tech Startup',
            project: 'Unreal Engine Training',
            result: 'Team producing in real-time',
            testimonial: 'Azimut helped us take the technological leap we needed.'
          },
          {
            id: 'gov',
            client: 'Department of Culture',
            project: 'Audiovisual Production Course',
            result: '40 certified producers',
            testimonial: 'Essential partnership to democratize access to audiovisual technology.'
          }
        ]
      },
      partnerships: {
        title: 'Institutional Partnerships',
        items: [
          { name: 'SESC', description: 'Workshops and regular courses' },
          { name: 'SENAC', description: 'Customized professional training' },
          { name: 'Universities', description: 'Lectures and workshops for students' },
          { name: 'UFRJ/ECO', description: 'Associate researchers' }
        ]
      },
      cta: {
        title: 'Let\'s Train Your Team?',
        subtitle: 'Request a customized proposal for your company or institution',
        button: 'Request Proposal'
      }
    },
    es: {
      meta: {
        title: 'Azimut Academy Corporate - Capacitación Empresarial',
        description: 'Capacitación corporativa personalizada en VR, IA y producción audiovisual. Para empresas, gobierno, ONGs, SESC, SENAC y universidades.'
      },
      hero: {
        badge: '🏢 Capacitación Corporativa',
        title: 'Soluciones B2B',
        subtitle: 'Capacitación personalizada para tu equipo',
        description: 'Capacitamos empresas, gobiernos, ONGs e instituciones educativas con entrenamiento a medida en tecnologías inmersivas y producción audiovisual.'
      },
      clients: {
        title: 'Nuestros Clientes',
        subtitle: 'Empresas e instituciones que confían en Azimut',
        categories: [
          {
            id: 'corporate',
            title: 'Empresas',
            logos: ['Google', 'Globo', 'Tech Startups', 'Agencias Creativas']
          },
          {
            id: 'government',
            title: 'Gobierno & Cultura',
            logos: ['Secretarías de Cultura', 'ONGs', 'OSCIPs', 'Gobiernos Estatales']
          },
          {
            id: 'education',
            title: 'Educación',
            logos: ['SESC', 'SENAC', 'Universidades', 'Escuelas Premium']
          }
        ]
      },
      formats: [
        {
          id: 'onsite',
          icon: '🏢',
          title: 'In-Company',
          description: 'Capacitación en tu empresa, con equipos e instructores en el lugar.',
          duration: '1-5 días',
          ideal: 'Equipos de 8-20 personas'
        },
        {
          id: 'online',
          icon: '💻',
          title: 'Online en Vivo',
          description: 'Workshops online interactivos vía Zoom/Teams, con proyectos prácticos.',
          duration: '2-8 horas por día',
          ideal: 'Equipos remotos o distribuidos'
        },
        {
          id: 'hybrid',
          icon: '🔄',
          title: 'Híbrido',
          description: 'Combinación de clases online + inmersión presencial para proyectos finales.',
          duration: 'Personalizado',
          ideal: 'Proyectos complejos'
        },
        {
          id: 'consulting',
          icon: '🎯',
          title: 'Consultoría',
          description: 'Consultoría técnica para proyectos específicos, con soporte continuo.',
          duration: 'Bajo demanda',
          ideal: 'Proyectos a largo plazo'
        }
      ],
      topics: {
        title: 'Temas Disponibles',
        list: [
          {
            category: 'VR & Inmersivo',
            items: ['Producción de Películas 360°', 'Game Design en VR', 'Tour Virtual Interactivo', 'Capacitación Inmersiva']
          },
          {
            category: 'IA Generativa',
            items: ['IA para Marketing', 'Automatización con ChatGPT', 'Creación de Imágenes IA', 'Video Generativo']
          },
          {
            category: 'Audiovisual',
            items: ['Producción de Video', 'Motion Design', 'Transmisión en Vivo', 'Post-Producción']
          },
          {
            category: 'Tech & Dev',
            items: ['Unreal Engine', 'Unity para XR', 'WebGL Interactivo', 'Virtual Production']
          }
        ]
      },
      cases: {
        title: 'Casos de Éxito',
        subtitle: 'Mira algunos de los proyectos y alianzas que realizamos',
        examples: [
          {
            id: 'sesc',
            client: 'SESC',
            project: 'Workshop de VR para Educadores',
            result: '60+ profesores capacitados',
            testimonial: 'Contenido de altísima calidad, instructores experimentados y didácticos.'
          },
          {
            id: 'startup',
            client: 'Tech Startup',
            project: 'Capacitación Unreal Engine',
            result: 'Equipo produciendo en tiempo real',
            testimonial: 'Azimut nos ayudó a dar el salto tecnológico que necesitábamos.'
          },
          {
            id: 'gov',
            client: 'Secretaría de Cultura',
            project: 'Curso de Producción Audiovisual',
            result: '40 productores certificados',
            testimonial: 'Alianza esencial para democratizar el acceso a la tecnología audiovisual.'
          }
        ]
      },
      partnerships: {
        title: 'Alianzas Institucionales',
        items: [
          { name: 'SESC', description: 'Workshops y cursos regulares' },
          { name: 'SENAC', description: 'Formación profesional personalizada' },
          { name: 'Universidades', description: 'Conferencias y workshops para alumnos' },
          { name: 'UFRJ/ECO', description: 'Investigadores asociados' }
        ]
      },
      cta: {
        title: '¿Vamos a Capacitar a Tu Equipo?',
        subtitle: 'Solicita una propuesta personalizada para tu empresa o institución',
        button: 'Solicitar Propuesta'
      }
    },
    fr: {
      meta: {
        title: 'Azimut Academy Corporate - Formation d\'Entreprise',
        description: 'Formation corporative personnalisée en VR, IA et production audiovisuelle. Pour entreprises, gouvernement, ONG, SESC, SENAC et universités.'
      },
      hero: {
        badge: '🏢 Formation d\'Entreprise',
        title: 'Solutions B2B',
        subtitle: 'Formation personnalisée pour votre équipe',
        description: 'Nous formons entreprises, gouvernements, ONG et institutions éducatives avec une formation sur mesure en technologies immersives et production audiovisuelle.'
      },
      clients: {
        title: 'Nos Clients',
        subtitle: 'Entreprises et institutions qui font confiance à Azimut',
        categories: [
          {
            id: 'corporate',
            title: 'Entreprises',
            logos: ['Google', 'Globo', 'Tech Startups', 'Agences Créatives']
          },
          {
            id: 'government',
            title: 'Gouvernement & Culture',
            logos: ['Départements de Culture', 'ONG', 'OSCIPs', 'Gouvernements d\'État']
          },
          {
            id: 'education',
            title: 'Éducation',
            logos: ['SESC', 'SENAC', 'Universités', 'Écoles Premium']
          }
        ]
      },
      formats: [
        {
          id: 'onsite',
          icon: '🏢',
          title: 'In-Company',
          description: 'Formation dans votre entreprise, avec équipements et instructeurs sur place.',
          duration: '1-5 jours',
          ideal: 'Équipes de 8-20 personnes'
        },
        {
          id: 'online',
          icon: '💻',
          title: 'En Ligne en Direct',
          description: 'Workshops en ligne interactifs via Zoom/Teams, avec projets pratiques.',
          duration: '2-8 heures par jour',
          ideal: 'Équipes à distance ou distribuées'
        },
        {
          id: 'hybrid',
          icon: '🔄',
          title: 'Hybride',
          description: 'Combinaison de cours en ligne + immersion en personne pour projets finaux.',
          duration: 'Personnalisé',
          ideal: 'Projets complexes'
        },
        {
          id: 'consulting',
          icon: '🎯',
          title: 'Consulting',
          description: 'Consulting technique pour projets spécifiques, avec support continu.',
          duration: 'À la demande',
          ideal: 'Projets à long terme'
        }
      ],
      topics: {
        title: 'Sujets Disponibles',
        list: [
          {
            category: 'VR & Immersif',
            items: ['Production de Films 360°', 'Game Design en VR', 'Tour Virtuel Interactif', 'Formation Immersive']
          },
          {
            category: 'IA Générative',
            items: ['IA pour Marketing', 'Automatisation avec ChatGPT', 'Création d\'Images IA', 'Vidéo Générative']
          },
          {
            category: 'Audiovisuel',
            items: ['Production Vidéo', 'Motion Design', 'Streaming en Direct', 'Post-Production']
          },
          {
            category: 'Tech & Dev',
            items: ['Unreal Engine', 'Unity pour XR', 'WebGL Interactif', 'Virtual Production']
          }
        ]
      },
      cases: {
        title: 'Cas de Succès',
        subtitle: 'Voyez quelques projets et partenariats que nous avons réalisés',
        examples: [
          {
            id: 'sesc',
            client: 'SESC',
            project: 'Workshop de VR pour Éducateurs',
            result: '60+ enseignants formés',
            testimonial: 'Contenu de très haute qualité, instructeurs expérimentés et didactiques.'
          },
          {
            id: 'startup',
            client: 'Tech Startup',
            project: 'Formation Unreal Engine',
            result: 'Équipe produisant en temps réel',
            testimonial: 'Azimut nous a aidés à faire le bond technologique dont nous avions besoin.'
          },
          {
            id: 'gov',
            client: 'Département de Culture',
            project: 'Cours de Production Audiovisuelle',
            result: '40 producteurs certifiés',
            testimonial: 'Partenariat essentiel pour démocratiser l\'accès à la technologie audiovisuelle.'
          }
        ]
      },
      partnerships: {
        title: 'Partenariats Institutionnels',
        items: [
          { name: 'SESC', description: 'Workshops et cours réguliers' },
          { name: 'SENAC', description: 'Formation professionnelle personnalisée' },
          { name: 'Universités', description: 'Conférences et workshops pour étudiants' },
          { name: 'UFRJ/ECO', description: 'Chercheurs associés' }
        ]
      },
      cta: {
        title: 'Former Votre Équipe?',
        subtitle: 'Demandez une proposition personnalisée pour votre entreprise ou institution',
        button: 'Demander une Proposition'
      }
    }
  }

  const t = content[lang] || content.pt

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>

      {/* Menu Secundário Academy */}
      <AcademySubNav lang={lang} currentPage="corporate" />

      <div className="min-h-screen bg-theme-primary">
        {/* Espaçador para compensar header + submenu fixos (PADRONIZADO) */}
        <div style={{ height: '48px' }} />
        
        {/* HERO - Compacto */}
        <section 
          className="relative min-h-[45vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background com Curadoria de Arte Premium */}
          <div className="absolute inset-0">
            {/* Tema Escuro: Overlay cinematográfico balanceado */}
            {theme === 'dark' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(
                      ellipse 140% 120% at 50% 45%,
                      transparent 0%,
                      transparent 35%,
                      rgba(0, 0, 0, 0.2) 60%,
                      rgba(0, 0, 0, 0.5) 85%,
                      rgba(0, 0, 0, 0.75) 100%
                    )`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/5 via-transparent to-transparent" />
              </>
            )}
            
            {/* Tema Claro: Overlay equilibrado com vinheta artística */}
            {theme === 'light' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1e8]/40 via-[#e8e5df]/35 to-[#d3cec3]/45" />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(
                      ellipse 150% 130% at 50% 50%,
                      transparent 0%,
                      transparent 45%,
                      rgba(30, 28, 26, 0.25) 70%,
                      rgba(20, 18, 16, 0.45) 85%,
                      rgba(10, 8, 6, 0.65) 100%
                    )`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e1c1a]/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-slate-900/15" />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(
                      circle at 50% 50%,
                      transparent 30%,
                      rgba(0, 0, 0, 0.1) 60%,
                      rgba(0, 0, 0, 0.3) 100%
                    )`
                  }}
                />
              </>
            )}
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
              <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
            </div>

            {/* Título - Cores adaptativas por tema */}
            <h1 
              className="text-5xl md:text-7xl font-handel uppercase tracking-wider mb-6"
              style={{ 
                color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                textShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {t.hero.title}
            </h1>

            {/* Subtítulo - Cores adaptativas por tema */}
            <p 
              className="text-xl md:text-2xl mb-4"
              style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#e8e5df',
                textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Descrição - Cores adaptativas por tema */}
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#d3cec3',
                textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)' : '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* CLIENTS (Logos) */}
        <section className="py-20 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`text-3xl md:text-4xl font-handel uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>
              {t.clients.title}
            </h2>
            <p className={`text-lg mb-12 ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>{t.clients.subtitle}</p>

            <div className="grid md:grid-cols-3 gap-8">
              {t.clients.categories.map((cat: any) => (
                <div key={cat.id} className="card-adaptive rounded-xl p-8 border border-white/10">
                  <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{cat.title}</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {cat.logos.map((logo: string) => (
                      <div 
                        key={logo}
                        className={`px-4 py-2 bg-white/5 text-sm rounded hover:bg-white/10 transition-all ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}
                      >
                        {logo}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className={`mt-8 text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-600'}`}>
              🏢 PLACEHOLDER: Logos reais → Backoffice /admin/academy/clients
            </p>
          </div>
        </section>

        {/* FORMATS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.formats.map((format: any) => (
                <div 
                  key={format.id}
                  className="card-adaptive rounded-xl p-6 border border-white/10 hover:border-azimut-red/50 transition-all hover:scale-105"
                >
                  <div className="text-5xl mb-4">{format.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{format.title}</h3>
                  <p className="text-azimut-red text-sm font-semibold mb-3">{format.duration}</p>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>{format.description}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-white/50' : 'text-on-dark-tertiary'}`}>Ideal: {format.ideal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOPICS */}
        <section className="py-20 bg-gradient-to-b from-transparent via-azimut-red/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white">
                {t.topics.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.topics.list.map((topic: any) => (
                <div 
                  key={topic.category}
                  className="card-adaptive rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-bold text-azimut-red mb-4">{topic.category}</h3>
                  <ul className="space-y-2">
                    {topic.items.map((item: string) => (
                      <li key={item} className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-azimut-red mt-1">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.cases.title}
              </h2>
              <p className="text-xl text-white/70">{t.cases.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.cases.examples.map((caseItem: any) => (
                <div 
                  key={caseItem.id}
                  className="card-adaptive rounded-2xl p-8 border border-white/10 hover:border-azimut-red/50 transition-all"
                >
                  <div className="text-azimut-red font-bold text-lg mb-2">{caseItem.client}</div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{caseItem.project}</h3>
                  <div className="text-green-400 text-sm font-semibold mb-4">✓ {caseItem.result}</div>
                  <p className={`text-sm italic ${theme === 'dark' ? 'text-white/60' : 'text-on-dark-tertiary'}`}>"{caseItem.testimonial}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section className="py-20 pb-12 bg-gradient-to-b from-transparent via-azimut-red/5 to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-handel uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>
                {t.partnerships.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.partnerships.items.map((partner: any) => (
                <div 
                  key={partner.name}
                  className="card-adaptive rounded-xl p-6 border border-white/10 flex items-center gap-4"
                >
                  <div className="text-3xl">🤝</div>
                  <div>
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{partner.name}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-on-dark-secondary'}`}>{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navegação Final - Curada e Organizada (dentro de card, gap reduzido) */}
        <PageFooterNavigation
          lang={lang}
          compact={true}
          mainCta={{
            title: t.cta.title,
            description: t.cta.subtitle,
            buttonText: t.cta.button,
            buttonHref: `/contact`
          }}
          navigation={{
            previous: {
              label: lang === 'pt' ? 'Conhecer Estúdio' : lang === 'es' ? 'Conocer Estudio' : lang === 'fr' ? 'Découvrir Studio' : 'Meet Studio',
              href: '/studio',
              icon: '🏛️'
            },
            next: {
              label: lang === 'pt' ? 'Ver Cursos' : lang === 'es' ? 'Ver Cursos' : lang === 'fr' ? 'Voir Cours' : 'View Courses',
              href: '/what/educacao-treinamento',
              icon: '🎓'
            }
          }}
        />
      </div>
    </>
  )
}

export default AcademyCorporate
