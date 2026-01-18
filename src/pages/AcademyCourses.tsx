// ════════════════════════════════════════════════════════════
// ACADEMY COURSES - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import { useUserTracking } from '../hooks/useUserTracking'
import CourseRecommender from '../components/CourseRecommender'
import AcademyQuickForm from '../components/AcademyQuickForm'

interface AcademyCoursesProps {
  lang: Lang
}

const AcademyCourses: React.FC<AcademyCoursesProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const content: Record<Lang, any> = {
    pt: {
      meta: {
        title: 'Cursos Azimut Academy - Formação Profissional',
        description: 'Cursos de VR, 360°, IA Generativa, Motion Design e produção audiovisual. 30 anos de experiência. Turmas pequenas, 100% prático.'
      },
      hero: {
        badge: '📚 Formação Profissional',
        title: 'Cursos & Treinamentos',
        subtitle: '30 anos de experiência em ensinar',
        description: 'Domine tecnologias imersivas, IA e produção audiovisual com quem está no mercado desde 1994. Turmas pequenas, 100% prático.'
      },
      categories: [
        { id: 'all', label: 'Todos' },
        { id: 'vr', label: 'VR & 360°' },
        { id: 'ai', label: 'IA Generativa' },
        { id: 'motion', label: 'Motion & 3D' },
        { id: 'game', label: 'Game Design' }
      ],
      courses: [
        {
          id: 'vr-cinema',
          category: 'vr',
          icon: '🥽',
          title: 'Produção VR & Cinema 360°',
          description: 'Criação completa de filmes em realidade virtual, desde a captação até a finalização.',
          duration: '40 horas',
          level: 'Intermediário',
          price: 'R$ 3.200',
          featured: true,
          tags: ['VR', 'Cinema', '360°', 'Unreal Engine']
        },
        {
          id: 'ai-marketing',
          category: 'ai',
          icon: '🤖',
          title: 'IA Generativa para Marketing',
          description: 'Domine Midjourney, Stable Diffusion, ChatGPT e ferramentas IA para criar campanhas.',
          duration: '24 horas',
          level: 'Iniciante',
          price: 'R$ 1.800',
          featured: true,
          tags: ['IA', 'Marketing', 'Midjourney', 'ChatGPT']
        },
        {
          id: 'motion-design',
          category: 'motion',
          icon: '🎬',
          title: 'Motion Design & 3D',
          description: 'After Effects, Cinema 4D e Blender para criar animações profissionais.',
          duration: '60 horas',
          level: 'Intermediário',
          price: 'R$ 4.500',
          tags: ['Motion', 'After Effects', '3D', 'Blender']
        },
        {
          id: 'game-vr',
          category: 'game',
          icon: '🎮',
          title: 'Game Design em VR',
          description: 'Crie jogos em realidade virtual com Unity e Unreal Engine.',
          duration: '50 horas',
          level: 'Avançado',
          price: 'R$ 4.000',
          tags: ['VR', 'Unity', 'Unreal', 'Game']
        },
        {
          id: 'unreal-engine',
          category: 'game',
          icon: '⚡',
          title: 'Unreal Engine para Audiovisual',
          description: 'Produção em tempo real, virtual production e ambientes interativos.',
          duration: '45 horas',
          level: 'Intermediário',
          price: 'R$ 3.800',
          featured: true,
          tags: ['Unreal', 'Real-time', 'Virtual Production']
        },
        {
          id: 'ai-video',
          category: 'ai',
          icon: '🎥',
          title: 'IA para Produção de Vídeo',
          description: 'Runway, Pika Labs, Sora e outras ferramentas de IA para vídeo.',
          duration: '20 horas',
          level: 'Iniciante',
          price: 'R$ 1.500',
          tags: ['IA', 'Vídeo', 'Runway', 'Automation']
        }
      ],
      gallery: {
        title: 'Trabalhos dos Alunos',
        subtitle: 'Veja o que nossos alunos criaram durante os cursos'
      },
      cta: {
        title: 'Pronto para Começar?',
        subtitle: 'Fale com nosso time e escolha o curso ideal para você',
        button: 'Falar com Consultor'
      }
    },
    en: {
      meta: {
        title: 'Azimut Academy Courses - Professional Training',
        description: 'VR, 360°, Generative AI, Motion Design and audiovisual production courses. 30 years of experience. Small classes, 100% hands-on.'
      },
      hero: {
        badge: '📚 Professional Training',
        title: 'Courses & Training',
        subtitle: '30 years of teaching experience',
        description: 'Master immersive technologies, AI and audiovisual production with industry experts since 1994. Small classes, 100% practical.'
      },
      categories: [
        { id: 'all', label: 'All' },
        { id: 'vr', label: 'VR & 360°' },
        { id: 'ai', label: 'Generative AI' },
        { id: 'motion', label: 'Motion & 3D' },
        { id: 'game', label: 'Game Design' }
      ],
      courses: [
        {
          id: 'vr-cinema',
          category: 'vr',
          icon: '🥽',
          title: 'VR Production & 360° Cinema',
          description: 'Complete VR filmmaking, from capture to post-production.',
          duration: '40 hours',
          level: 'Intermediate',
          price: 'CAD 800',
          featured: true,
          tags: ['VR', 'Cinema', '360°', 'Unreal Engine']
        },
        {
          id: 'ai-marketing',
          category: 'ai',
          icon: '🤖',
          title: 'Generative AI for Marketing',
          description: 'Master Midjourney, Stable Diffusion, ChatGPT and AI tools for campaigns.',
          duration: '24 hours',
          level: 'Beginner',
          price: 'CAD 450',
          featured: true,
          tags: ['AI', 'Marketing', 'Midjourney', 'ChatGPT']
        },
        {
          id: 'motion-design',
          category: 'motion',
          icon: '🎬',
          title: 'Motion Design & 3D',
          description: 'After Effects, Cinema 4D and Blender for professional animations.',
          duration: '60 hours',
          level: 'Intermediate',
          price: 'CAD 1,125',
          tags: ['Motion', 'After Effects', '3D', 'Blender']
        },
        {
          id: 'game-vr',
          category: 'game',
          icon: '🎮',
          title: 'VR Game Design',
          description: 'Create virtual reality games with Unity and Unreal Engine.',
          duration: '50 hours',
          level: 'Advanced',
          price: 'CAD 1,000',
          tags: ['VR', 'Unity', 'Unreal', 'Game']
        },
        {
          id: 'unreal-engine',
          category: 'game',
          icon: '⚡',
          title: 'Unreal Engine for Audiovisual',
          description: 'Real-time production, virtual production and interactive environments.',
          duration: '45 hours',
          level: 'Intermediate',
          price: 'CAD 950',
          featured: true,
          tags: ['Unreal', 'Real-time', 'Virtual Production']
        },
        {
          id: 'ai-video',
          category: 'ai',
          icon: '🎥',
          title: 'AI for Video Production',
          description: 'Runway, Pika Labs, Sora and other AI tools for video.',
          duration: '20 hours',
          level: 'Beginner',
          price: 'CAD 375',
          tags: ['AI', 'Video', 'Runway', 'Automation']
        }
      ],
      gallery: {
        title: 'Student Work',
        subtitle: 'See what our students created during the courses'
      },
      cta: {
        title: 'Ready to Start?',
        subtitle: 'Talk to our team and choose the ideal course for you',
        button: 'Talk to Consultant'
      }
    },
    es: {
      meta: {
        title: 'Cursos Azimut Academy - Formación Profesional',
        description: 'Cursos de VR, 360°, IA Generativa, Motion Design y producción audiovisual. 30 años de experiencia. Clases pequeñas, 100% práctico.'
      },
      hero: {
        badge: '📚 Formación Profesional',
        title: 'Cursos y Capacitación',
        subtitle: '30 años de experiencia enseñando',
        description: 'Domina tecnologías inmersivas, IA y producción audiovisual con quienes están en el mercado desde 1994. Clases pequeñas, 100% práctico.'
      },
      categories: [
        { id: 'all', label: 'Todos' },
        { id: 'vr', label: 'VR & 360°' },
        { id: 'ai', label: 'IA Generativa' },
        { id: 'motion', label: 'Motion & 3D' },
        { id: 'game', label: 'Game Design' }
      ],
      courses: [
        {
          id: 'vr-cinema',
          category: 'vr',
          icon: '🥽',
          title: 'Producción VR & Cine 360°',
          description: 'Creación completa de películas en realidad virtual, desde captura hasta finalización.',
          duration: '40 horas',
          level: 'Intermedio',
          price: 'USD 600',
          featured: true,
          tags: ['VR', 'Cinema', '360°', 'Unreal Engine']
        },
        {
          id: 'ai-marketing',
          category: 'ai',
          icon: '🤖',
          title: 'IA Generativa para Marketing',
          description: 'Domina Midjourney, Stable Diffusion, ChatGPT y herramientas IA para crear campañas.',
          duration: '24 horas',
          level: 'Principiante',
          price: 'USD 340',
          featured: true,
          tags: ['IA', 'Marketing', 'Midjourney', 'ChatGPT']
        },
        {
          id: 'motion-design',
          category: 'motion',
          icon: '🎬',
          title: 'Motion Design & 3D',
          description: 'After Effects, Cinema 4D y Blender para crear animaciones profesionales.',
          duration: '60 horas',
          level: 'Intermedio',
          price: 'USD 850',
          tags: ['Motion', 'After Effects', '3D', 'Blender']
        },
        {
          id: 'game-vr',
          category: 'game',
          icon: '🎮',
          title: 'Game Design en VR',
          description: 'Crea juegos en realidad virtual con Unity y Unreal Engine.',
          duration: '50 horas',
          level: 'Avanzado',
          price: 'USD 750',
          tags: ['VR', 'Unity', 'Unreal', 'Game']
        },
        {
          id: 'unreal-engine',
          category: 'game',
          icon: '⚡',
          title: 'Unreal Engine para Audiovisual',
          description: 'Producción en tiempo real, producción virtual y ambientes interactivos.',
          duration: '45 horas',
          level: 'Intermedio',
          price: 'USD 720',
          featured: true,
          tags: ['Unreal', 'Real-time', 'Virtual Production']
        },
        {
          id: 'ai-video',
          category: 'ai',
          icon: '🎥',
          title: 'IA para Producción de Video',
          description: 'Runway, Pika Labs, Sora y otras herramientas de IA para video.',
          duration: '20 horas',
          level: 'Principiante',
          price: 'USD 280',
          tags: ['IA', 'Video', 'Runway', 'Automation']
        }
      ],
      gallery: {
        title: 'Trabajos de Alumnos',
        subtitle: 'Mira lo que nuestros alumnos crearon durante los cursos'
      },
      cta: {
        title: '¿Listo para Comenzar?',
        subtitle: 'Habla con nuestro equipo y elige el curso ideal para ti',
        button: 'Hablar con Consultor'
      }
    },
    fr: {
      meta: {
        title: 'Cours Azimut Academy - Formation Professionnelle',
        description: 'Cours de VR, 360°, IA Générative, Motion Design et production audiovisuelle. 30 ans expérience. Petites classes, 100% pratique.'
      },
      hero: {
        badge: '📚 Formation Professionnelle',
        title: 'Cours et Formation',
        subtitle: '30 ans expérience enseignement',
        description: 'Maîtrisez les technologies immersives, IA et la production audiovisuelle avec des experts du secteur depuis 1994. Petites classes, 100% pratique.'
      },
      categories: [
        { id: 'all', label: 'Tous' },
        { id: 'vr', label: 'VR & 360°' },
        { id: 'ai', label: 'IA Générative' },
        { id: 'motion', label: 'Motion & 3D' },
        { id: 'game', label: 'Game Design' }
      ],
      courses: [
        {
          id: 'vr-cinema',
          category: 'vr',
          icon: '🥽',
          title: 'Production VR & Cinéma 360°',
          description: 'Création complète de films en réalité virtuelle, de la captation à la finalisation.',
          duration: '40 heures',
          level: 'Intermédiaire',
          price: 'CAD 800',
          featured: true,
          tags: ['VR', 'Cinéma', '360°', 'Unreal Engine']
        },
        {
          id: 'ai-marketing',
          category: 'ai',
          icon: '🤖',
          title: 'IA Générative pour Marketing',
          description: 'Maîtrisez Midjourney, Stable Diffusion, ChatGPT et outils IA pour campagnes.',
          duration: '24 heures',
          level: 'Débutant',
          price: 'CAD 450',
          featured: true,
          tags: ['IA', 'Marketing', 'Midjourney', 'ChatGPT']
        },
        {
          id: 'motion-design',
          category: 'motion',
          icon: '🎬',
          title: 'Motion Design & 3D',
          description: 'After Effects, Cinema 4D et Blender pour animations professionnelles.',
          duration: '60 heures',
          level: 'Intermédiaire',
          price: 'CAD 1.125',
          tags: ['Motion', 'After Effects', '3D', 'Blender']
        },
        {
          id: 'game-vr',
          category: 'game',
          icon: '🎮',
          title: 'Game Design en VR',
          description: 'Créez des jeux en réalité virtuelle avec Unity et Unreal Engine.',
          duration: '50 heures',
          level: 'Avancé',
          price: 'CAD 1.000',
          tags: ['VR', 'Unity', 'Unreal', 'Game']
        },
        {
          id: 'unreal-engine',
          category: 'game',
          icon: '⚡',
          title: 'Unreal Engine pour Audiovisuel',
          description: 'Production en temps réel, production virtuelle et environnements interactifs.',
          duration: '45 heures',
          level: 'Intermédiaire',
          price: 'CAD 950',
          featured: true,
          tags: ['Unreal', 'Real-time', 'Virtual Production']
        },
        {
          id: 'ai-video',
          category: 'ai',
          icon: '🎥',
          title: 'IA pour Production Vidéo',
          description: 'Runway, Pika Labs, Sora et autres outils IA pour vidéo.',
          duration: '20 heures',
          level: 'Débutant',
          price: 'CAD 375',
          tags: ['IA', 'Vidéo', 'Runway', 'Automation']
        }
      ],
      gallery: {
        title: 'Travaux des Étudiants',
        subtitle: 'Voyez ce que nos étudiants ont créé pendant les cours'
      },
      cta: {
        title: 'Prêt à Commencer?',
        subtitle: 'Parlez à notre équipe et choisissez le cours idéal pour vous',
        button: 'Parler avec un Consultant'
      }
    }
  }

  const t = content[lang] || content.pt
  const filteredCourses = selectedCategory === 'all' 
    ? t.courses 
    : t.courses.filter((c: any) => c.category === selectedCategory)

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>

      <div className="min-h-screen bg-theme-primary">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900 opacity-90" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
              <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white mb-6">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {t.hero.subtitle}
            </p>

            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="py-8 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {t.categories.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-semibold uppercase tracking-wider text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-azimut-red text-white shadow-lg shadow-azimut-red/50'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES GRID */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course: any) => (
                <div
                  key={course.id}
                  className={`card-adaptive rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                    course.featured 
                      ? 'border-azimut-red/50 shadow-lg shadow-azimut-red/20' 
                      : 'border-white/10 hover:border-azimut-red/30'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-black flex items-center justify-center">
                    <span className="text-8xl opacity-30">{course.icon}</span>
                    {course.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-azimut-red text-white text-xs font-bold uppercase rounded-full">
                          {lang === 'pt' ? 'Destaque' : lang === 'en' ? 'Featured' : lang === 'es' ? 'Destacado' : 'En Vedette'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {course.title}
                    </h3>

                    <p className="text-white/70 mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                      <span>⏱️ {course.duration}</span>
                      <span>📊 {course.level}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag: string) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-2xl font-handel text-azimut-red">
                        {course.price}
                      </span>
                      <Link
                        to={`/${lang}/contact`}
                        className="px-4 py-2 bg-azimut-red hover:bg-azimut-red/90 text-white text-sm font-semibold uppercase rounded-lg transition-all"
                      >
                        {lang === 'pt' ? 'Inscrever' : lang === 'en' ? 'Enroll' : lang === 'es' ? 'Inscribirse' : 'Inscrire'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY PLACEHOLDER */}
        <section className="py-20 bg-gradient-to-b from-transparent via-azimut-red/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
              {t.gallery.title}
            </h2>
            <p className="text-xl text-white/70 mb-12">
              {t.gallery.subtitle}
            </p>

            {/* PLACEHOLDER: Galeria de trabalhos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div 
                  key={i}
                  className="aspect-square bg-gradient-to-br from-slate-800 to-black rounded-lg border border-white/10 hover:border-azimut-red/50 transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
                >
                  <span className="text-4xl opacity-20">🎬</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-white/40 text-sm">
              📸 PLACEHOLDER: Backoffice → /admin/academy/gallery
            </p>
          </div>
        </section>

        {/* AI Course Recommender */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
                <span className="text-azimut-red text-sm font-semibold uppercase">
                  🤖 Recomendação IA
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {lang === 'pt' ? 'Qual curso é ideal para você?' : 'Which course is ideal for you?'}
              </h2>
              <p className="text-xl text-white/70">
                {lang === 'pt' ? 'Responda 5 perguntas e descubra os 3 melhores cursos para seu perfil' : 'Answer 5 questions and discover the 3 best courses for your profile'}
              </p>
            </div>

            <CourseRecommender lang={lang} />
          </div>
        </section>

        {/* Quick Form */}
        <section className="py-24 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AcademyQuickForm 
              lang={lang} 
              type="course"
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default AcademyCourses
