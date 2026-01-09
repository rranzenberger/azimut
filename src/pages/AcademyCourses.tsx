// ════════════════════════════════════════════════════════════
// ACADEMY COURSES - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════
// Página de Cursos & Workshops com estrutura visual completa
// Placeholders para imagens/vídeos que virão do backoffice
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import { VideoCard } from '../components/VideoCard'
import { ImageGallery } from '../components/ImageGallery'
import { useUserTracking } from '../hooks/useUserTracking'

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  audience: string
  syllabus?: string
  thumbnail: string
  videoPreview?: string
  icon: string
  featured?: boolean
  tags: string[]
}

interface AcademyCoursesProps {
  lang: Lang
}

const AcademyCourses: React.FC<AcademyCoursesProps> = ({ lang }) => {
  useUserTracking()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // ═══════════════════════════════════════════════════════════
  // CONTENT BY LANGUAGE
  // ═══════════════════════════════════════════════════════════
  const content = {
    pt: {
      hero: {
        badge: '📚 Formação Profissional',
        title: 'Cursos & Workshops',
        subtitle: '30 anos de experiência em ensinar',
        description: 'Domine tecnologias imersivas, IA e produção audiovisual com quem está no mercado desde 1994. Turmas pequenas, 100% prático.'
      },

      categories: [
        { id: 'all', label: 'Todos' },
        { id: 'vr', label: 'VR & 360°' },
        { id: 'ai', label: 'IA Generativa' },
        { id: 'motion', label: 'Motion & Animação' },
        { id: 'interactive', label: 'Interativo' }
      ],

      courses: [
        {
          id: 'vr-cinema',
          title: 'VR Cinematográfico: Do Conceito à Tela',
          description: 'Aprenda a criar filmes imersivos em 360°. Domine linguagem cinematográfica para VR, direção de câmera, narrativa espacial e pós-produção profissional. Hands-on com equipamentos profissionais.',
          duration: '16 horas',
          level: 'Intermediário',
          audience: 'Cineastas, produtores, criadores de conteúdo',
          syllabus: '/syllabus/vr-cinema.pdf',
          thumbnail: '/courses/vr-cinema-thumb.jpg', // PLACEHOLDER
          videoPreview: '', // TODO: YouTube URL
          icon: '🎥',
          featured: true,
          tags: ['vr', '360', 'cinema']
        },
        {
          id: 'ia-generativa',
          title: 'IA Generativa para Produção Audiovisual',
          description: 'Pipelines completos de IA aplicados a roteiro, storyboard, animação, VFX e finalização. Ferramentas práticas: ChatGPT, Midjourney, Runway, Stable Diffusion, ComfyUI.',
          duration: '12 horas',
          level: 'Avançado',
          audience: 'Profissionais de audiovisual, VFX, animação',
          thumbnail: '/courses/ia-generativa-thumb.jpg', // PLACEHOLDER
          videoPreview: '',
          icon: '🤖',
          featured: true,
          tags: ['ai', 'vfx', 'animation']
        },
        {
          id: 'instalacoes',
          title: 'Instalações Interativas para Museus e Eventos',
          description: 'Desenvolva experiências interativas imersivas. Aprenda sensores, projeções mapeadas, interfaces físicas e integração com conteúdo audiovisual. Arduino, TouchDesigner, Unity.',
          duration: '20 horas',
          level: 'Intermediário',
          audience: 'Museólogos, produtores culturais, artistas',
          thumbnail: '/courses/instalacoes-thumb.jpg', // PLACEHOLDER
          videoPreview: '',
          icon: '🎨',
          tags: ['interactive', 'museums']
        },
        {
          id: 'motion-design',
          title: 'Motion Design & Animação para Projetos Imersivos',
          description: 'Técnicas profissionais de motion graphics, animação 2D/3D e composição para projetos imersivos. After Effects, Cinema 4D, Blender. Renderização otimizada para VR.',
          duration: '24 horas',
          level: 'Básico a Intermediário',
          audience: 'Designers, animadores, criadores',
          thumbnail: '/courses/motion-design-thumb.jpg', // PLACEHOLDER
          videoPreview: '',
          icon: '✨',
          tags: ['motion', 'animation', '3d']
        },
        {
          id: 'vfx-compositing',
          title: 'VFX & Compositing Avançado',
          description: 'Técnicas de composição, chroma key, tracking 3D, rotoscopia e integração de CG. Nuke, After Effects, Mocha. Workflow profissional para cinema e TV.',
          duration: '20 horas',
          level: 'Avançado',
          audience: 'Profissionais de VFX e pós-produção',
          thumbnail: '/courses/vfx-compositing-thumb.jpg', // PLACEHOLDER
          videoPreview: '',
          icon: '💥',
          tags: ['vfx', 'compositing']
        },
        {
          id: 'game-vr',
          title: 'Desenvolvimento de Games em VR',
          description: 'Crie jogos e experiências em realidade virtual. Unity, Unreal Engine, interação gestual, física VR, otimização de performance. Quest 2, PSVR2, PC VR.',
          duration: '28 horas',
          level: 'Intermediário a Avançado',
          audience: 'Desenvolvedores, game designers',
          thumbnail: '/courses/game-vr-thumb.jpg', // PLACEHOLDER
          videoPreview: '',
          icon: '🎮',
          featured: true,
          tags: ['vr', 'game', 'unity']
        }
      ] as Course[],

      features: {
        title: 'Por que estudar com a Azimut?',
        items: [
          {
            icon: '👥',
            title: 'Turmas Pequenas',
            description: 'Até 12 alunos por turma. Acompanhamento individual.'
          },
          {
            icon: '🔬',
            title: '100% Hands-On',
            description: 'Aprenda fazendo. Projetos reais desde o primeiro dia.'
          },
          {
            icon: '🏆',
            title: 'Certificado',
            description: 'Certificado de conclusão reconhecido pelo mercado.'
          },
          {
            icon: '💼',
            title: 'Network',
            description: 'Conecte-se com profissionais e empresas do setor.'
          },
          {
            icon: '📚',
            title: 'Material Incluso',
            description: 'Apostilas, assets e recursos para continuar praticando.'
          },
          {
            icon: '🎯',
            title: 'Mentoria',
            description: 'Suporte dos instrutores após conclusão do curso.'
          }
        ]
      },

      studentWork: {
        title: 'Trabalhos dos Alunos',
        subtitle: 'Veja o que nossos alunos criaram durante os cursos',
        cta: 'Ver Portfolio Completo'
      },

      classDemos: {
        title: 'Veja Como São as Aulas',
        subtitle: 'Trechos de aulas e explicações dos instrutores'
      },

      cta: {
        title: 'Pronto para Começar?',
        subtitle: 'Solicite informações sobre a próxima turma',
        button: 'Solicitar Informações',
        info: 'Próximas turmas: Consulte disponibilidade'
      }
    },
    // ... (outras línguas)
  }

  const t = content[lang] || content.pt

  // Filter courses by category
  const filteredCourses = selectedCategory === 'all'
    ? t.courses
    : t.courses.filter(c => c.tags.includes(selectedCategory))

  return (
    <>
      <Helmet>
        <title>{t.hero.title} | Azimut Academy</title>
        <meta name="description" content={t.hero.description} />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Hero image ou video
            Backoffice: /admin/academy/courses → "Hero Image"
            ═══════════════════════════════════════════════════════ */}
        <section className="relative py-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
                <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                  {t.hero.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white mb-6">
                {t.hero.title}
              </h1>

              <p className="text-2xl text-white/90 mb-4">
                {t.hero.subtitle}
              </p>

              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {t.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CATEGORY FILTERS
            ═══════════════════════════════════════════════════════ */}
        <section className="py-8 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {t.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-azimut-red text-white shadow-lg shadow-azimut-red/30'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            COURSES GRID
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Thumbnails dos cursos
            Backoffice: /admin/academy/courses/list → cada curso
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <article
                  key={course.id}
                  className={`group card-adaptive rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-azimut-red/20 hover:-translate-y-2 ${
                    course.featured ? 'border-azimut-red/50' : 'border-white/10'
                  }`}
                >
                  {/* Thumbnail (PLACEHOLDER) */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-30">{course.icon}</span>
                    </div>
                    {/* TODO: Imagem real do backoffice */}
                    {/* <img src={course.thumbnail} alt={course.title} /> */}

                    {/* Featured badge */}
                    {course.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-azimut-red text-white text-xs font-bold uppercase rounded-full">
                        Destaque
                      </div>
                    )}

                    {/* Level badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 text-white text-xs font-semibold rounded-full">
                      {course.level}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{course.icon}</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-azimut-red transition-colors">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Info */}
                    <div className="space-y-2 text-xs text-white/60 mb-4">
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>{course.audience}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 bg-azimut-red/20 border border-azimut-red/50 text-azimut-red font-semibold rounded-lg hover:bg-azimut-red hover:text-white transition-all">
                      Saiba Mais →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FEATURES
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white text-center mb-12">
              {t.features.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.features.items.map((feature, i) => (
                <div key={i} className="card-adaptive p-6 rounded-xl border border-white/10 text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STUDENT WORK GALLERY
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Trabalhos dos alunos
            Backoffice: /admin/academy/courses/student-work
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.studentWork.title}
              </h2>
              <p className="text-lg text-white/70">
                {t.studentWork.subtitle}
              </p>
            </div>

            {/* Image Gallery (PLACEHOLDER) */}
            <div className="mb-8">
              <p className="text-center text-white/60 text-sm mb-6">
                📌 <strong>PLACEHOLDER:</strong> Galeria de trabalhos virá do backoffice
              </p>
              {/* <ImageGallery images={studentWorkImages} /> */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                    <span className="text-4xl opacity-30">🎨</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="px-8 py-3 bg-azimut-red text-white font-semibold rounded-lg hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-azimut-red/50">
                {t.studentWork.cta} →
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CLASS DEMOS VIDEOS
            ═══════════════════════════════════════════════════════════
            📹 PLACEHOLDER: Vídeos de trechos de aula
            Backoffice: /admin/academy/courses/videos → Categoria: Class Demo
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.classDemos.title}
              </h2>
              <p className="text-lg text-white/70">
                {t.classDemos.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Placeholder Video Cards */}
              {[1,2,3,4].map(i => (
                <div key={i} className="card-adaptive rounded-xl p-4 border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-6xl opacity-30">▶️</span>
                  </div>
                  <h4 className="text-white font-semibold mb-1">Aula Demo {i}</h4>
                  <p className="text-white/60 text-sm">Adicionar vídeo no backoffice</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/courses/videos → Categoria "Class Demo"
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA FINAL
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.cta.subtitle}
            </p>
            <button className="px-8 py-4 bg-azimut-red text-white font-semibold rounded-lg hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-azimut-red/50 hover:scale-105">
              {t.cta.button} →
            </button>
            <p className="text-white/50 text-sm mt-4">
              {t.cta.info}
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default AcademyCourses
