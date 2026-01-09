// ════════════════════════════════════════════════════════════
// COURSE RECOMMENDER - IA QUICK WIN #2
// ════════════════════════════════════════════════════════════
// Recomendador inteligente de cursos baseado no perfil do usuário
// Analisa 5 fatores + sugere Top 3 cursos + roadmap personalizado
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface CourseRecommenderProps {
  lang: Lang
  onComplete?: (result: RecommendationResult) => void
}

interface RecommendationResult {
  topCourses: Course[]
  roadmap: string[]
  reason: string
  nextSteps: string[]
}

interface Course {
  id: string
  title: string
  match: number
  duration: string
  price: string
  why: string
  icon: string
}

const CourseRecommender: React.FC<CourseRecommenderProps> = ({ lang, onComplete }) => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<RecommendationResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const content: Record<Lang, any> = {
    pt: {
      title: 'Qual curso é ideal para você?',
      subtitle: 'Responda 5 perguntas e descubra os 3 melhores cursos para seu perfil',
      
      questions: [
        {
          id: 'experience',
          question: 'Qual seu nível de experiência?',
          options: [
            { value: 'zero', label: '🌱 Zero (nunca trabalhei com isso)', areas: ['ai', 'vr'] },
            { value: 'beginner', label: '📚 Iniciante (fiz alguns tutoriais)', areas: ['ai', 'motion', 'vr'] },
            { value: 'intermediate', label: '💼 Intermediário (trabalho freelance)', areas: ['motion', 'vr', 'game'] },
            { value: 'advanced', label: '🏆 Avançado (profissional ativo)', areas: ['game', 'unreal'] }
          ]
        },
        {
          id: 'goal',
          question: 'Qual seu objetivo principal?',
          options: [
            { value: 'job', label: '💼 Conseguir emprego na área', areas: ['motion', 'vr', 'game'] },
            { value: 'freelance', label: '🎨 Trabalhar como freelancer', areas: ['ai', 'motion'] },
            { value: 'career-change', label: '🔄 Mudar de carreira', areas: ['ai', 'vr'] },
            { value: 'level-up', label: '📈 Evoluir habilidades atuais', areas: ['unreal', 'game', 'ai-video'] }
          ]
        },
        {
          id: 'time',
          question: 'Quanto tempo você tem disponível?',
          options: [
            { value: 'part-time', label: '⏰ 2-4 horas/semana (trabalho/estudo)', areas: ['ai', 'ai-video'] },
            { value: 'weekends', label: '📅 Finais de semana livres', areas: ['motion', 'vr'] },
            { value: 'full-time', label: '🚀 Tempo integral (dedicação total)', areas: ['vr', 'game', 'unreal'] }
          ]
        },
        {
          id: 'budget',
          question: 'Qual seu orçamento para investir?',
          options: [
            { value: 'low', label: '💵 Até R$ 2.000 (mais acessível)', areas: ['ai', 'ai-video'] },
            { value: 'medium', label: '💰 R$ 2.000-4.000 (investimento médio)', areas: ['motion', 'vr'] },
            { value: 'high', label: '💎 Acima de R$ 4.000 (investimento alto)', areas: ['game', 'unreal'] }
          ]
        },
        {
          id: 'interest',
          question: 'O que te interessa mais?',
          options: [
            { value: 'ai', label: '🤖 IA e Automação (futuro agora)', areas: ['ai', 'ai-video'] },
            { value: 'creative', label: '🎨 Criação Visual (motion, animação)', areas: ['motion', 'vr'] },
            { value: 'technical', label: '⚙️ Técnico (programação, engines)', areas: ['game', 'unreal'] },
            { value: 'immersive', label: '🥽 Experiências Imersivas (VR, 360)', areas: ['vr', 'game'] }
          ]
        }
      ],

      courses: {
        'ai': {
          id: 'ai-marketing',
          title: 'IA Generativa para Marketing',
          duration: '24 horas',
          price: 'R$ 1.800',
          icon: '🤖',
          description: 'Domine Midjourney, ChatGPT, Stable Diffusion para criar campanhas'
        },
        'ai-video': {
          id: 'ai-video',
          title: 'IA para Produção de Vídeo',
          duration: '20 horas',
          price: 'R$ 1.500',
          icon: '🎥',
          description: 'Runway, Pika Labs, Sora para criar vídeos com IA'
        },
        'motion': {
          id: 'motion-design',
          title: 'Motion Design & 3D',
          duration: '60 horas',
          price: 'R$ 4.500',
          icon: '🎬',
          description: 'After Effects, Cinema 4D, Blender para animações profissionais'
        },
        'vr': {
          id: 'vr-cinema',
          title: 'Produção VR & Cinema 360°',
          duration: '40 horas',
          price: 'R$ 3.200',
          icon: '🥽',
          description: 'Criação completa de filmes em realidade virtual'
        },
        'game': {
          id: 'game-vr',
          title: 'Game Design em VR',
          duration: '50 horas',
          price: 'R$ 4.000',
          icon: '🎮',
          description: 'Crie jogos em realidade virtual com Unity e Unreal'
        },
        'unreal': {
          id: 'unreal-engine',
          title: 'Unreal Engine para Audiovisual',
          duration: '45 horas',
          price: 'R$ 3.800',
          icon: '⚡',
          description: 'Produção em tempo real, virtual production'
        }
      },

      result: {
        title: 'Cursos Recomendados para Você',
        subtitle: 'Baseado no seu perfil, estes são os cursos ideais',
        match: 'Match',
        why: 'Por que este curso?',
        roadmap: 'Seu Roadmap Personalizado',
        nextSteps: 'Próximos Passos',
        cta: 'Ver Detalhes do Curso',
        ctaAll: 'Falar com Consultor'
      }
    },
    en: {
      title: 'Which course is ideal for you?',
      subtitle: 'Answer 5 questions and discover the 3 best courses for your profile',
      
      questions: [
        {
          id: 'experience',
          question: 'What is your experience level?',
          options: [
            { value: 'zero', label: '🌱 Zero (never worked with this)', areas: ['ai', 'vr'] },
            { value: 'beginner', label: '📚 Beginner (did some tutorials)', areas: ['ai', 'motion', 'vr'] },
            { value: 'intermediate', label: '💼 Intermediate (freelance work)', areas: ['motion', 'vr', 'game'] },
            { value: 'advanced', label: '🏆 Advanced (active professional)', areas: ['game', 'unreal'] }
          ]
        },
        {
          id: 'goal',
          question: 'What is your main goal?',
          options: [
            { value: 'job', label: '💼 Get a job in the field', areas: ['motion', 'vr', 'game'] },
            { value: 'freelance', label: '🎨 Work as freelancer', areas: ['ai', 'motion'] },
            { value: 'career-change', label: '🔄 Career change', areas: ['ai', 'vr'] },
            { value: 'level-up', label: '📈 Level up current skills', areas: ['unreal', 'game', 'ai-video'] }
          ]
        },
        {
          id: 'time',
          question: 'How much time do you have available?',
          options: [
            { value: 'part-time', label: '⏰ 2-4 hours/week (work/study)', areas: ['ai', 'ai-video'] },
            { value: 'weekends', label: '📅 Weekends free', areas: ['motion', 'vr'] },
            { value: 'full-time', label: '🚀 Full-time (total dedication)', areas: ['vr', 'game', 'unreal'] }
          ]
        },
        {
          id: 'budget',
          question: 'What is your budget?',
          options: [
            { value: 'low', label: '💵 Up to USD 400 (more accessible)', areas: ['ai', 'ai-video'] },
            { value: 'medium', label: '💰 USD 400-800 (medium investment)', areas: ['motion', 'vr'] },
            { value: 'high', label: '💎 Above USD 800 (high investment)', areas: ['game', 'unreal'] }
          ]
        },
        {
          id: 'interest',
          question: 'What interests you most?',
          options: [
            { value: 'ai', label: '🤖 AI & Automation (future now)', areas: ['ai', 'ai-video'] },
            { value: 'creative', label: '🎨 Visual Creation (motion, animation)', areas: ['motion', 'vr'] },
            { value: 'technical', label: '⚙️ Technical (programming, engines)', areas: ['game', 'unreal'] },
            { value: 'immersive', label: '🥽 Immersive Experiences (VR, 360)', areas: ['vr', 'game'] }
          ]
        }
      ],

      courses: {
        'ai': {
          id: 'ai-marketing',
          title: 'Generative AI for Marketing',
          duration: '24 hours',
          price: 'USD 360',
          icon: '🤖',
          description: 'Master Midjourney, ChatGPT, Stable Diffusion for campaigns'
        },
        'ai-video': {
          id: 'ai-video',
          title: 'AI for Video Production',
          duration: '20 hours',
          price: 'USD 300',
          icon: '🎥',
          description: 'Runway, Pika Labs, Sora to create videos with AI'
        },
        'motion': {
          id: 'motion-design',
          title: 'Motion Design & 3D',
          duration: '60 hours',
          price: 'USD 900',
          icon: '🎬',
          description: 'After Effects, Cinema 4D, Blender for professional animations'
        },
        'vr': {
          id: 'vr-cinema',
          title: 'VR Production & 360° Cinema',
          duration: '40 hours',
          price: 'USD 640',
          icon: '🥽',
          description: 'Complete VR filmmaking'
        },
        'game': {
          id: 'game-vr',
          title: 'VR Game Design',
          duration: '50 hours',
          price: 'USD 800',
          icon: '🎮',
          description: 'Create VR games with Unity and Unreal'
        },
        'unreal': {
          id: 'unreal-engine',
          title: 'Unreal Engine for Audiovisual',
          duration: '45 hours',
          price: 'USD 760',
          icon: '⚡',
          description: 'Real-time production, virtual production'
        }
      },

      result: {
        title: 'Recommended Courses for You',
        subtitle: 'Based on your profile, these are the ideal courses',
        match: 'Match',
        why: 'Why this course?',
        roadmap: 'Your Personalized Roadmap',
        nextSteps: 'Next Steps',
        cta: 'View Course Details',
        ctaAll: 'Talk to Consultant'
      }
    },
    es: content.pt, // TODO: Traduzir
    fr: content.pt  // TODO: Traduzir
  }

  const t = content[lang] || content.pt

  const calculateRecommendations = (): RecommendationResult => {
    // Contagem de áreas mencionadas
    const areaCounts: Record<string, number> = {}
    
    t.questions.forEach((q: any) => {
      const answer = answers[q.id]
      if (answer) {
        const option = q.options.find((o: any) => o.value === answer)
        if (option && option.areas) {
          option.areas.forEach((area: string) => {
            areaCounts[area] = (areaCounts[area] || 0) + 1
          })
        }
      }
    })

    // Ordenar áreas por contagem
    const sortedAreas = Object.entries(areaCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([area]) => area)

    // Pegar top 3 cursos
    const topCourses: Course[] = sortedAreas.map((area, idx) => {
      const course = t.courses[area]
      const matchPercentage = 100 - (idx * 15) // 100%, 85%, 70%
      
      let why = ''
      if (answers.experience === 'zero' || answers.experience === 'beginner') {
        why = lang === 'pt' ? 'Perfeito para iniciantes como você' : 'Perfect for beginners like you'
      } else if (answers.goal === 'freelance') {
        why = lang === 'pt' ? 'Alta demanda para freelancers' : 'High demand for freelancers'
      } else {
        why = lang === 'pt' ? 'Alinha com seus objetivos profissionais' : 'Aligns with your professional goals'
      }

      return {
        id: course.id,
        title: course.title,
        match: matchPercentage,
        duration: course.duration,
        price: course.price,
        why,
        icon: course.icon
      }
    })

    // Roadmap personalizado
    const roadmap: string[] = []
    if (answers.experience === 'zero') {
      roadmap.push(lang === 'pt' ? '1. Comece com fundamentos básicos' : '1. Start with basic fundamentals')
      roadmap.push(lang === 'pt' ? '2. Pratique com projetos pessoais' : '2. Practice with personal projects')
      roadmap.push(lang === 'pt' ? '3. Monte seu portfólio' : '3. Build your portfolio')
    } else if (answers.experience === 'beginner') {
      roadmap.push(lang === 'pt' ? '1. Aprimore suas habilidades' : '1. Improve your skills')
      roadmap.push(lang === 'pt' ? '2. Faça projetos para clientes reais' : '2. Do projects for real clients')
      roadmap.push(lang === 'pt' ? '3. Especialize-se em um nicho' : '3. Specialize in a niche')
    } else {
      roadmap.push(lang === 'pt' ? '1. Domine ferramentas profissionais' : '1. Master professional tools')
      roadmap.push(lang === 'pt' ? '2. Construa rede de contatos' : '2. Build professional network')
      roadmap.push(lang === 'pt' ? '3. Busque clientes premium' : '3. Seek premium clients')
    }

    const nextSteps: string[] = [
      lang === 'pt' ? 'Fale com nosso consultor para detalhes' : 'Talk to our consultant for details',
      lang === 'pt' ? 'Veja o programa completo dos cursos' : 'See the complete course program',
      lang === 'pt' ? 'Solicite condições especiais de pagamento' : 'Request special payment conditions'
    ]

    return {
      topCourses,
      roadmap,
      reason: lang === 'pt' ? 
        'Baseado no seu perfil e objetivos' : 
        'Based on your profile and goals',
      nextSteps
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
    if (step < t.questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(async () => {
        const recommendations = calculateRecommendations()
        setResult(recommendations)
        setShowResult(true)
        
        // Salvar resultado no localStorage para pré-preencher formulário
        localStorage.setItem('courseRecommendation', JSON.stringify({
          ...recommendations,
          answers,
          completedAt: new Date().toISOString()
        }))
        
        // Chamar callback se fornecido
        if (onComplete) {
          onComplete(recommendations)
        }

        // Salvar no CRM (não bloqueia a exibição do resultado)
        try {
          const sessionId = localStorage.getItem('sessionId') || `session_${Date.now()}`
          
          await ApiService.submitCourseRecommendation({
            sessionId,
            ...answers,
            course1Id: recommendations.topCourses[0]?.id || 'unknown',
            course1Match: recommendations.topCourses[0]?.match || 0,
            course2Id: recommendations.topCourses[1]?.id || 'unknown',
            course2Match: recommendations.topCourses[1]?.match || 0,
            course3Id: recommendations.topCourses[2]?.id || 'unknown',
            course3Match: recommendations.topCourses[2]?.match || 0,
            lang
          })
          
          console.log('✅ Recomendação salva no CRM')
        } catch (error) {
          console.warn('⚠️ Erro ao salvar Recomendação (não-crítico):', error)
          // Não exibir erro para o usuário - é não-crítico
        }
      }, 300)
    }
  }

  const currentQ = t.questions[step]

  if (showResult && result) {
    return (
      <div className="card-adaptive rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
            <span className="text-azimut-red text-sm font-semibold uppercase">
              {t.result.title}
            </span>
          </div>
          <p className="text-xl text-white/70">{t.result.subtitle}</p>
        </div>

        {/* Top 3 Courses */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {result.topCourses.map((course, idx) => (
            <div 
              key={course.id}
              className="card-adaptive rounded-xl p-6 border border-white/10 hover:border-azimut-red/50 transition-all hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{course.icon}</span>
                <div className="text-right">
                  <div className="text-3xl font-handel text-azimut-red">{course.match}%</div>
                  <div className="text-xs text-white/60 uppercase">{t.result.match}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                <span>⏱️ {course.duration}</span>
              </div>

              <div className="mb-4 p-3 bg-white/5 rounded-lg">
                <div className="text-xs text-white/60 mb-1">{t.result.why}</div>
                <div className="text-sm text-white/80">{course.why}</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-2xl font-handel text-azimut-red">{course.price}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  idx === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  idx === 1 ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {idx === 0 ? '#1' : idx === 1 ? '#2' : '#3'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">{t.result.roadmap}</h3>
          <div className="space-y-3">
            {result.roadmap.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-azimut-red/20 flex items-center justify-center text-azimut-red font-bold">
                  {idx + 1}
                </div>
                <span className="text-white/80 pt-1">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">{t.result.nextSteps}</h3>
          <div className="space-y-3">
            {result.nextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <span className="text-azimut-red text-xl">✓</span>
                <span className="text-white/80">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-azimut-red hover:bg-azimut-red/90 text-white text-lg font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-azimut-red/50"
          >
            {t.result.ctaAll}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="card-adaptive rounded-2xl p-6 md:p-10 border border-white/10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">
            {lang === 'pt' ? 'Pergunta' : 'Question'} {step + 1}/{t.questions.length}
          </span>
          <span className="text-sm font-semibold text-azimut-red">
            {Math.round(((step + 1) / t.questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-azimut-red to-red-400 transition-all duration-500"
            style={{ width: `${((step + 1) / t.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {currentQ.question}
        </h3>

        <div className="grid gap-4">
          {currentQ.options.map((option: any) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className="text-left p-5 rounded-xl transition-all border-2 border-white/10 bg-white/5 text-white/80 hover:border-azimut-red/50 hover:bg-azimut-red/10 hover:text-white hover:scale-[1.02]"
            >
              <span className="text-lg">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseRecommender
