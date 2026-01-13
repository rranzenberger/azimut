import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'

interface StudioDiferenciaisProps {
  lang: Lang
}

const StudioDiferenciais: React.FC<StudioDiferenciaisProps> = ({ lang }) => {
  useUserTracking()
  // Estrela FIXA (sem parallax) - Padronizada com Studio principal

  const content = {
    pt: {
      title: 'O Que Nos Torna Únicos',
      subtitle: 'Nossa combinação especial',
      heritage: {
        title: 'Desde 1996 | Brasil-Canadá',
        body: 'Unimos arte, tecnologia e educação em projetos pioneiros. Do primeiro centro de treinamento Autodesk da América do Sul à direção técnica do Rio Museu Olímpico, criamos experiências imersivas entre Brasil e Canadá.',
        stats: [
          { label: 'Desde', value: '1996' },
          { label: 'Autodesk', value: '1996-2018' },
          { label: 'Rio Museum', value: 'Atual' },
          { label: 'Gramado', value: '2017' },
          { label: 'Binacional', value: 'BR-CA' }
        ]
      },
      unique: {
        title: 'O que nos torna únicos',
        items: [
          'Pesquisa acadêmica + Produção comercial (raramente encontradas juntas)',
          'Educação (formamos centenas) + Curadoria de festivais (Gramado VR desde 2017)',
          'Arquitetura/BIM + Cinema/VFX + VR/XR/IA (expertise técnica ampla)',
          'Time com 30 anos de bagagem internacional (desde 1996)',
          'Operação binacional Brasil-Canadá (conectando ecossistemas criativos)',
          'Não somos apenas um estúdio. Somos um ecossistema que integra conhecimento, criação e transformação.'
        ]
      },
      vision: {
        title: 'Visão',
        body: 'Ser referência global em experiências imersivas, interativas e cinematográficas que unem arte, tecnologia e narrativa, transformando espaços culturais, marcas e cidades em ambientes de conexão e descoberta.'
      },
      mission: {
        title: 'Missão',
        body: 'Criar experiências imersivas de ponta a ponta que conectam pessoas, histórias e espaços através de tecnologia criativa, design cinematográfico e narrativas envolventes, sempre em colaboração com instituições, marcas e comunidades.\n\nTransformamos conceitos em jornadas memoráveis que ressoam emocional e culturalmente — operando na interseção entre arte, tecnologia e conexão humana, construindo pontes entre os ecossistemas criativos do Brasil e do Canadá.'
      },
      values: {
        title: 'Valores',
        items: [
          {
            title: 'Inovação Contínua',
            description: 'Exploramos fronteiras tecnológicas e artísticas, sempre em busca de novas formas de contar histórias e criar conexões.'
          },
          {
            title: 'Excelência Técnica',
            description: '30 anos de expertise em CG, VFX, VR/XR e IA aplicada ao audiovisual, com certificações internacionais e formação de profissionais.'
          },
          {
            title: 'Colaboração',
            description: 'Acreditamos em cocriação com artistas, instituições, marcas e comunidades, construindo projetos em rede.'
          },
          {
            title: 'Impacto Cultural',
            description: 'Geramos transformação real através da cultura, educação e inclusão, conectando ecossistemas criativos entre Brasil e Canadá.'
          }
        ]
      },
      pillars: [
        {
          icon: '🎨',
          title: 'Arte e Estética Imersiva',
          body: 'Criamos experiências visuais e sonoras que capturam e transportam o público, misturando arte contemporânea, design interativo e ambientações sensoriais.'
        },
        {
          icon: '🧠',
          title: 'Tecnologia Criativa',
          body: 'Exploramos as fronteiras da tecnologia para contar histórias de forma interativa — usando XR, IA, projeções, sensores, instalações reativas e mais.'
        },
        {
          icon: '🎥',
          title: 'Narrativa Cinematográfica',
          body: 'Nosso diferencial é o storytelling sofisticado com linguagem de cinema, roteiros autorais, ritmo, emoção e direção de arte envolvente.'
        },
        {
          icon: '🌍',
          title: 'Impacto Cultural e Social',
          body: 'Geramos transformação real por meio da cultura, colaborando com comunidades, museus, territórios criativos e iniciativas de educação e inclusão.'
        },
        {
          icon: '🌐',
          title: 'Atuação Binacional (Brasil–Canadá)',
          body: 'Conectamos ecossistemas criativos entre América do Sul e América do Norte — em projetos, editais, festivais e parcerias institucionais.'
        },
        {
          icon: '🤝',
          title: 'Modelo de Cocriação',
          body: 'Desenvolvemos projetos em rede, com artistas, marcas, estúdios e instituições públicas/privadas, usando metodologias ágeis e colaborativas.'
        }
      ]
    },
    fr: {
      title: 'Ce Qui Nous Rend Uniques',
      subtitle: 'Notre combinaison spéciale',
      heritage: {
        title: '30 Ans d\'Innovation',
        body: 'Depuis 1996, nous avons fusionné art, technologie et éducation dans des projets pionniers. Du premier centre de formation Autodesk d\'Amérique du Sud à la direction technique du Musée Olympique de Rio, notre parcours reflète 30 ans d\'innovation.',
        stats: [
          { label: 'Depuis', value: '1996' },
          { label: 'Autodesk', value: '1996-2018' },
          { label: 'Musée Rio', value: 'Actuel' },
          { label: 'Gramado', value: '2017' },
          { label: 'Binational', value: 'BR-CA' }
        ]
      },
      unique: {
        title: 'Ce qui nous rend uniques',
        items: [
          'Recherche académique + Production commerciale',
          'Éducation (nous avons formé des centaines) + Curation de festivals',
          'Architecture/BIM + Cinéma/VFX + VR/XR/IA',
          'Équipe avec 30 ans d\'expérience internationale',
          'Opération binationale Brésil-Canada',
          'Nous ne sommes pas seulement un studio. Nous sommes un écosystème complet.'
        ]
      },
      vision: {
        title: 'Vision',
        body: 'Être une référence mondiale en expériences immersives, interactives et cinématographiques qui unissent art, technologie et narration, transformant les espaces culturels, marques et villes en environnements de connexion et découverte.'
      },
      mission: {
        title: 'Mission',
        body: 'Créer des expériences immersives de pointe qui connectent les gens, les histoires et les espaces grâce à la technologie créative, au design cinématographique et aux narrations engageantes.\n\nNous transformons les concepts en parcours mémorables qui résonnent émotionnellement et culturellement — opérant à l\'intersection de l\'art, de la technologie et de la connexion humaine.'
      },
      values: {
        title: 'Valeurs',
        items: [
          {
            title: 'Innovation Continue',
            description: 'Nous explorons les frontières technologiques et artistiques, toujours à la recherche de nouvelles façons de raconter des histoires.'
          },
          {
            title: 'Excellence Technique',
            description: '30 ans d\'expertise en CG, VFX, VR/XR et IA appliquée à l\'audiovisuel, avec certifications internationales.'
          },
          {
            title: 'Collaboration',
            description: 'Nous croyons en la co-création avec les artistes, institutions, marques et communautés.'
          },
          {
            title: 'Impact Culturel',
            description: 'Nous générons une transformation réelle grâce à la culture, l\'éducation et l\'inclusion.'
          }
        ]
      },
      pillars: [
        {
          icon: '🎨',
          title: 'Art & Esthétique Immersive',
          body: 'Nous créons des expériences visuelles et sonores qui capturent et transportent le public.'
        },
        {
          icon: '🧠',
          title: 'Technologie Créative',
          body: 'Nous explorons les frontières de la technologie pour raconter des histoires de manière interactive.'
        },
        {
          icon: '🎥',
          title: 'Narration Cinématographique',
          body: 'Notre différenciateur est le storytelling sophistiqué avec langage cinématographique.'
        },
        {
          icon: '🌍',
          title: 'Impact Culturel & Social',
          body: 'Nous générons une transformation réelle grâce à la culture et aux communautés.'
        },
        {
          icon: '🌐',
          title: 'Opération Binationale',
          body: 'Nous connectons les écosystèmes créatifs entre Amérique du Sud et Amérique du Nord.'
        },
        {
          icon: '🤝',
          title: 'Modèle de Co-création',
          body: 'Nous développons des projets en réseau avec méthodologies agiles et collaboratives.'
        }
      ]
    },
    es: {
      title: 'Lo Que Nos Hace Únicos',
      subtitle: 'Nuestra combinación especial',
      heritage: {
        title: '30 Años de Innovación',
        body: 'Desde 1996, hemos fusionado arte, tecnología y educación en proyectos pioneros. Del primer centro de formación Autodesk de América del Sur a la dirección técnica del Museo Olímpico de Río, nuestro recorrido refleja 30 años de innovación.',
        stats: [
          { label: 'Desde', value: '1996' },
          { label: 'Autodesk', value: '1996-2018' },
          { label: 'Museo Río', value: 'Actual' },
          { label: 'Gramado', value: '2017' },
          { label: 'Binacional', value: 'BR-CA' }
        ]
      },
      unique: {
        title: 'Lo que nos hace únicos',
        items: [
          'Investigación académica + Producción comercial',
          'Educación (formamos cientos) + Curaduría de festivales',
          'Arquitectura/BIM + Cine/VFX + VR/XR/IA',
          'Equipo con 30 años de experiencia internacional',
          'Operación binacional Brasil-Canadá',
          'No somos solo un estudio. Somos un ecosistema completo.'
        ]
      },
      vision: {
        title: 'Visión',
        body: 'Ser referencia mundial en experiencias inmersivas, interactivas y cinematográficas que unen arte, tecnología y narrativa, transformando espacios culturales, marcas y ciudades en ambientes de conexión y descubrimiento.'
      },
      mission: {
        title: 'Misión',
        body: 'Crear experiencias inmersivas de punta que conecten personas, historias y espacios a través de tecnología creativa, diseño cinematográfico y narrativas envolventes.\n\nTransformamos conceptos en jornadas memorables que resuenan emocional y culturalmente — operando en la intersección entre arte, tecnología y conexión humana.'
      },
      values: {
        title: 'Valores',
        items: [
          {
            title: 'Innovación Continua',
            description: 'Exploramos fronteras tecnológicas y artísticas, siempre buscando nuevas formas de contar historias.'
          },
          {
            title: 'Excelencia Técnica',
            description: '30 años de experiencia en CG, VFX, VR/XR e IA aplicada al audiovisual, con certificaciones internacionales.'
          },
          {
            title: 'Colaboración',
            description: 'Creemos en la co-creación con artistas, instituciones, marcas y comunidades.'
          },
          {
            title: 'Impacto Cultural',
            description: 'Generamos transformación real a través de la cultura, educación e inclusión.'
          }
        ]
      },
      pillars: [
        {
          icon: '🎨',
          title: 'Arte & Estética Inmersiva',
          body: 'Creamos experiencias visuales y sonoras que capturan y transportan al público.'
        },
        {
          icon: '🧠',
          title: 'Tecnología Creativa',
          body: 'Exploramos las fronteras de la tecnología para contar historias de forma interactiva.'
        },
        {
          icon: '🎥',
          title: 'Narrativa Cinematográfica',
          body: 'Nuestro diferencial es el storytelling sofisticado con lenguaje cinematográfico.'
        },
        {
          icon: '🌍',
          title: 'Impacto Cultural & Social',
          body: 'Generamos transformación real a través de la cultura y las comunidades.'
        },
        {
          icon: '🌐',
          title: 'Operación Binacional',
          body: 'Conectamos ecosistemas creativos entre América del Sur y América del Norte.'
        },
        {
          icon: '🤝',
          title: 'Modelo de Co-creación',
          body: 'Desarrollamos proyectos en red con metodologías ágiles y colaborativas.'
        }
      ]
    },
    en: {
      title: 'What Makes Us Unique',
      subtitle: 'Our special combination',
      heritage: {
        title: 'Since 1996 | Brazil-Canada',
        body: 'We blend art, technology and education in pioneering projects. From South America\'s first Autodesk training center to Rio Olympic Museum\'s technical direction, we create immersive experiences between Brazil and Canada.',
        stats: [
          { label: 'Since', value: '1996' },
          { label: 'Autodesk', value: '1996-2018' },
          { label: 'Rio Museum', value: 'Current' },
          { label: 'Gramado', value: '2017' },
          { label: 'Binational', value: 'BR-CA' }
        ]
      },
      unique: {
        title: 'What makes us unique',
        items: [
          'Academic research + Commercial production (rarely found together)',
          'Education (we trained hundreds) + Festival curation (Gramado VR since 2017)',
          'Architecture/BIM + Cinema/VFX + VR/XR/AI (broad technical expertise)',
          'Team with 30 years of international experience (since 1996)',
          'Binational operation Brazil-Canada (connecting creative ecosystems)',
          'We\'re not just a studio. We\'re an ecosystem that integrates knowledge, creation and transformation.'
        ]
      },
      vision: {
        title: 'Vision',
        body: 'To be a global reference in immersive, interactive and cinematic experiences that unite art, technology and narrative, transforming cultural spaces, brands and cities into environments of connection and discovery.'
      },
      mission: {
        title: 'Mission',
        body: 'Create cutting-edge immersive experiences end-to-end that connect people, stories and spaces through creative technology, cinematic design and engaging narratives, always in collaboration with institutions, brands and communities.\n\nWe transform concepts into memorable journeys that resonate emotionally and culturally — operating at the intersection of art, technology and human connection, bridging creative ecosystems between Brazil and Canada.'
      },
      values: {
        title: 'Values',
        items: [
          {
            title: 'Continuous Innovation',
            description: 'We explore technological and artistic frontiers, always seeking new ways to tell stories and create connections.'
          },
          {
            title: 'Technical Excellence',
            description: '30 years of expertise in CG, VFX, VR/XR and AI applied to audiovisual, with international certifications and professional training.'
          },
          {
            title: 'Collaboration',
            description: 'We believe in co-creation with artists, institutions, brands and communities, building projects in network.'
          },
          {
            title: 'Cultural Impact',
            description: 'We generate real transformation through culture, education and inclusion, connecting creative ecosystems between Brazil and Canada.'
          }
        ]
      },
      pillars: [
        {
          icon: '🎨',
          title: 'Immersive Art & Aesthetics',
          body: 'We create visual and sound experiences that capture and transport audiences, blending contemporary art, interactive design and sensory environments.'
        },
        {
          icon: '🧠',
          title: 'Creative Technology',
          body: 'We explore technology frontiers to tell stories interactively — using XR, AI, projections, sensors, reactive installations and more.'
        },
        {
          icon: '🎥',
          title: 'Cinematic Narrative',
          body: 'Our differentiator is sophisticated storytelling with cinematic language, original scripts, rhythm, emotion and engaging art direction.'
        },
        {
          icon: '🌍',
          title: 'Cultural & Social Impact',
          body: 'We generate real transformation through culture, collaborating with communities, museums, creative territories and education and inclusion initiatives.'
        },
        {
          icon: '🌐',
          title: 'Binational Operation (Brazil–Canada)',
          body: 'We connect creative ecosystems between South and North America — in projects, grants, festivals and institutional partnerships.'
        },
        {
          icon: '🤝',
          title: 'Co-creation Model',
          body: 'We develop projects in network, with artists, brands, studios and public/private institutions, using agile and collaborative methodologies.'
        }
      ]
    }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Studio - Azimut`}
        description={text.subtitle}
        path="/studio/diferenciais"
      />
      
      <main className="relative py-16 md:py-20">
        {/* Star Background - FIXA (posição correta como Studio principal) */}
        <div 
          className="pointer-events-none fixed top-32 -right-28 h-[520px] w-[520px] md:top-40 md:-right-40 md:h-[680px] md:w-[680px] opacity-0.3"
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
          <div className="mb-16">
            {/* Eyebrow com emoji */}
            <span className="section-eyebrow">
              <span>⚡</span>
              {lang === 'pt' ? 'DIFERENCIAIS' : lang === 'es' ? 'DIFERENCIALES' : lang === 'fr' ? 'DIFFÉRENCIATION' : 'WHAT MAKES US UNIQUE'}
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

          {/* Heritage */}
          <section className="mb-20">
            <div className="p-8 rounded-lg bg-gradient-to-r from-azimut-red/20 to-transparent border-l-4 border-azimut-red mb-8">
              <h2 className="text-2xl md:text-3xl font-handel uppercase tracking-wide text-azimut-red mb-4">
                {text.heritage.title}
              </h2>
              <p className="text-lg leading-relaxed text-white">
                {text.heritage.body}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {text.heritage.stats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-slate-900/50 border border-azimut-red/20 hover:border-azimut-red/40 transition-all group">
                  <div className="font-handel text-4xl md:text-5xl text-azimut-red mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-theme-text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Unique Items */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text">
              {text.unique.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {text.unique.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-6 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 border border-transparent hover:border-azimut-red/30 transition-all group">
                  <svg className="w-6 h-6 text-azimut-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-theme-text-secondary group-hover:text-theme-text transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Visão - DESTAQUE */}
          <section className="mb-20">
            <div className="p-10 rounded-lg bg-gradient-to-br from-azimut-red/20 to-slate-900/50 border-2 border-azimut-red shadow-2xl">
              <h2 className="text-3xl font-handel uppercase text-azimut-red mb-6 flex items-center gap-3">
                <span className="text-4xl">👁️</span>
                {text.vision.title}
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-white">
                {text.vision.body}
              </p>
            </div>
          </section>

          {/* Missão + Valores Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Missão */}
            <div className="p-8 rounded-lg bg-slate-900/50 border border-azimut-red/20">
              <h2 className="text-2xl font-handel uppercase text-azimut-red mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                {text.mission.title}
              </h2>
              <p className="text-theme-text-secondary leading-relaxed whitespace-pre-line">
                {text.mission.body}
              </p>
            </div>

            {/* Valores */}
            <div className="p-8 rounded-lg bg-slate-900/50 border border-azimut-red/20">
              <h2 className="text-2xl font-handel uppercase text-azimut-red mb-6 flex items-center gap-3">
                <span className="text-3xl">💎</span>
                {text.values.title}
              </h2>
              <div className="space-y-4">
                {text.values.items.map((value, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-white mb-1">{value.title}</h4>
                    <p className="text-sm text-theme-text-secondary">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillars - 6 Cards */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text text-center">
              {lang === 'pt' ? 'Nossos Pilares' : 'Our Pillars'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {text.pillars.map((pillar, i) => (
                <div key={i} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/50 transition-all group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-sm text-theme-text-secondary leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <LangLink
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase hover:bg-azimut-red/90 transition-all shadow-xl"
              >
                {lang === 'pt' ? 'Trabalhe Conosco' : 'Work With Us'}
                <span className="text-2xl">→</span>
              </LangLink>
              <LangLink
                to="/studio"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all font-semibold"
              >
                <span>←</span>
                {lang === 'pt' ? 'Voltar para Studio' : 'Back to Studio'}
              </LangLink>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioDiferenciais
