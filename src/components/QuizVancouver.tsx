// ════════════════════════════════════════════════════════════
// QUIZ VANCOUVER - IA QUICK WIN #1
// ════════════════════════════════════════════════════════════
// Quiz interativo para avaliar prontidão do aluno para Vancouver
// Score 0-100 + recomendações personalizadas + lead capture
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface QuizVancouverProps {
  lang: Lang
  onComplete?: (result: QuizResult) => void
}

interface QuizResult {
  score: number
  profile: string
  recommendations: string[]
  readiness: 'low' | 'medium' | 'high'
  bestSchool: 'VFS' | 'VanArts'
  estimatedBudget: string
}

interface Question {
  id: string
  question: string
  options: { value: string; label: string; points: number }[]
}

const QuizVancouver: React.FC<QuizVancouverProps> = ({ lang, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const content: Record<Lang, any> = {
    pt: {
      title: 'Você está pronto para Vancouver?',
      subtitle: 'Descubra em 2 minutos seu nível de prontidão e a escola ideal',
      cta: 'Começar Quiz',
      next: 'Próxima',
      back: 'Voltar',
      submit: 'Ver Resultado',
      progress: 'Pergunta {current} de {total}',
      
      questions: [
        {
          id: 'experience',
          question: 'Qual seu nível de experiência na área de mídia/audiovisual?',
          options: [
            { value: 'none', label: '🌱 Nenhuma experiência', points: 20 },
            { value: 'beginner', label: '📚 Estudante/Iniciante (cursos básicos)', points: 40 },
            { value: 'intermediate', label: '🎬 Intermediário (alguns projetos)', points: 70 },
            { value: 'advanced', label: '🏆 Profissional ativo (portfólio sólido)', points: 100 }
          ]
        },
        {
          id: 'english',
          question: 'Qual seu nível de inglês atual?',
          options: [
            { value: 'basic', label: '🔤 Básico (preciso estudar muito)', points: 20 },
            { value: 'intermediate', label: '📖 Intermediário (consigo me comunicar)', points: 50 },
            { value: 'advanced', label: '💬 Avançado (fluente para conversação)', points: 80 },
            { value: 'native', label: '🎯 Fluente/Nativo', points: 100 }
          ]
        },
        {
          id: 'goal',
          question: 'Qual seu principal objetivo?',
          options: [
            { value: 'career-change', label: '🔄 Mudar de carreira completamente', points: 60 },
            { value: 'skill-up', label: '📈 Aprimorar skills e subir de nível', points: 80 },
            { value: 'portfolio', label: '🎨 Criar portfólio internacional', points: 90 },
            { value: 'immigration', label: '🇨🇦 Imigrar para o Canadá', points: 100 }
          ]
        },
        {
          id: 'area',
          question: 'Qual área te interessa mais?',
          options: [
            { value: 'animation', label: '🎭 Animação 2D/3D', points: 85 },
            { value: 'vfx', label: '✨ VFX e Efeitos Visuais', points: 90 },
            { value: 'game', label: '🎮 Game Design/Development', points: 95 },
            { value: 'film', label: '🎬 Produção de Cinema/TV', points: 80 }
          ]
        },
        {
          id: 'budget',
          question: 'Qual seu orçamento total aproximado (tuition + vida)?',
          options: [
            { value: 'low', label: '💵 Até CAD 25.000 (apertado)', points: 30 },
            { value: 'medium', label: '💰 CAD 25.000-40.000 (confortável)', points: 70 },
            { value: 'high', label: '💎 CAD 40.000-60.000 (tranquilo)', points: 90 },
            { value: 'very-high', label: '🏆 Acima de CAD 60.000 (sem preocupação)', points: 100 }
          ]
        },
        {
          id: 'timeline',
          question: 'Quando você pretende começar?',
          options: [
            { value: 'asap', label: '⚡ O mais rápido possível (2-4 meses)', points: 100 },
            { value: 'soon', label: '📅 Em breve (4-8 meses)', points: 80 },
            { value: 'planning', label: '🗓️ Estou planejando (8-12 meses)', points: 60 },
            { value: 'researching', label: '🔍 Apenas pesquisando (1+ ano)', points: 40 }
          ]
        },
        {
          id: 'portfolio',
          question: 'Você tem portfólio/trabalhos para mostrar?',
          options: [
            { value: 'none', label: '❌ Não tenho nada ainda', points: 20 },
            { value: 'basic', label: '📝 Alguns exercícios de cursos', points: 50 },
            { value: 'good', label: '🎨 Portfólio decente (5-10 projetos)', points: 80 },
            { value: 'professional', label: '🏆 Portfólio profissional (clientes reais)', points: 100 }
          ]
        },
        {
          id: 'software',
          question: 'Conhecimento em software da área?',
          options: [
            { value: 'none', label: '❌ Nunca usei', points: 20 },
            { value: 'basic', label: '📚 Básico (tutoriais, YouTube)', points: 50 },
            { value: 'intermediate', label: '💻 Intermediário (uso regularmente)', points: 80 },
            { value: 'advanced', label: '🎯 Avançado (domínio profissional)', points: 100 }
          ]
        },
        {
          id: 'commitment',
          question: 'Qual seu nível de comprometimento?',
          options: [
            { value: 'exploring', label: '🔍 Apenas explorando opções', points: 30 },
            { value: 'serious', label: '🎯 Sério, mas preciso de orientação', points: 70 },
            { value: 'decided', label: '✅ Já decidi, só falta escolher escola', points: 90 },
            { value: 'ready', label: '🚀 Pronto para aplicar AGORA', points: 100 }
          ]
        },
        {
          id: 'support',
          question: 'Você tem suporte familiar/financeiro?',
          options: [
            { value: 'self', label: '👤 Vou sozinho, sem ajuda', points: 40 },
            { value: 'partial', label: '🤝 Ajuda parcial da família', points: 70 },
            { value: 'full', label: '👨‍👩‍👧 Família apoia 100%', points: 90 },
            { value: 'sponsored', label: '🏢 Empresa/bolsa vai patrocinar', points: 100 }
          ]
        }
      ],

      result: {
        title: 'Seu Resultado',
        score: 'Pontuação',
        profile: 'Seu Perfil',
        readiness: 'Nível de Prontidão',
        school: 'Escola Recomendada',
        budget: 'Orçamento Estimado',
        recommendations: 'Recomendações Personalizadas',
        cta: 'Falar com Consultor',
        
        readinessLevels: {
          low: {
            label: 'Preparação Necessária',
            color: 'yellow',
            message: 'Você precisa se preparar mais antes de aplicar'
          },
          medium: {
            label: 'Boas Chances',
            color: 'blue',
            message: 'Você tem boas chances, mas precisa fortalecer alguns pontos'
          },
          high: {
            label: 'Pronto para Aplicar!',
            color: 'green',
            message: 'Você está pronto! É hora de aplicar!'
          }
        }
      }
    },
    en: {
      title: 'Are you ready for Vancouver?',
      subtitle: 'Find out in 2 minutes your readiness level and ideal school',
      cta: 'Start Quiz',
      next: 'Next',
      back: 'Back',
      submit: 'See Result',
      progress: 'Question {current} of {total}',
      
      questions: [
        {
          id: 'experience',
          question: 'What is your experience level in media/audiovisual?',
          options: [
            { value: 'none', label: '🌱 No experience', points: 20 },
            { value: 'beginner', label: '📚 Student/Beginner (basic courses)', points: 40 },
            { value: 'intermediate', label: '🎬 Intermediate (some projects)', points: 70 },
            { value: 'advanced', label: '🏆 Active professional (solid portfolio)', points: 100 }
          ]
        },
        {
          id: 'english',
          question: 'What is your current English level?',
          options: [
            { value: 'basic', label: '🔤 Basic (need to study a lot)', points: 20 },
            { value: 'intermediate', label: '📖 Intermediate (can communicate)', points: 50 },
            { value: 'advanced', label: '💬 Advanced (fluent conversation)', points: 80 },
            { value: 'native', label: '🎯 Fluent/Native', points: 100 }
          ]
        },
        {
          id: 'goal',
          question: 'What is your main goal?',
          options: [
            { value: 'career-change', label: '🔄 Complete career change', points: 60 },
            { value: 'skill-up', label: '📈 Level up skills', points: 80 },
            { value: 'portfolio', label: '🎨 Build international portfolio', points: 90 },
            { value: 'immigration', label: '🇨🇦 Immigrate to Canada', points: 100 }
          ]
        },
        {
          id: 'area',
          question: 'Which area interests you most?',
          options: [
            { value: 'animation', label: '🎭 2D/3D Animation', points: 85 },
            { value: 'vfx', label: '✨ VFX and Visual Effects', points: 90 },
            { value: 'game', label: '🎮 Game Design/Development', points: 95 },
            { value: 'film', label: '🎬 Film/TV Production', points: 80 }
          ]
        },
        {
          id: 'budget',
          question: 'What is your total approximate budget (tuition + living)?',
          options: [
            { value: 'low', label: '💵 Up to CAD 25,000 (tight)', points: 30 },
            { value: 'medium', label: '💰 CAD 25,000-40,000 (comfortable)', points: 70 },
            { value: 'high', label: '💎 CAD 40,000-60,000 (comfortable)', points: 90 },
            { value: 'very-high', label: '🏆 Above CAD 60,000 (no worries)', points: 100 }
          ]
        },
        {
          id: 'timeline',
          question: 'When do you plan to start?',
          options: [
            { value: 'asap', label: '⚡ ASAP (2-4 months)', points: 100 },
            { value: 'soon', label: '📅 Soon (4-8 months)', points: 80 },
            { value: 'planning', label: '🗓️ Planning (8-12 months)', points: 60 },
            { value: 'researching', label: '🔍 Just researching (1+ year)', points: 40 }
          ]
        },
        {
          id: 'portfolio',
          question: 'Do you have a portfolio/work to show?',
          options: [
            { value: 'none', label: '❌ Nothing yet', points: 20 },
            { value: 'basic', label: '📝 Some course exercises', points: 50 },
            { value: 'good', label: '🎨 Decent portfolio (5-10 projects)', points: 80 },
            { value: 'professional', label: '🏆 Professional portfolio (real clients)', points: 100 }
          ]
        },
        {
          id: 'software',
          question: 'Software knowledge in the field?',
          options: [
            { value: 'none', label: '❌ Never used', points: 20 },
            { value: 'basic', label: '📚 Basic (tutorials, YouTube)', points: 50 },
            { value: 'intermediate', label: '💻 Intermediate (regular use)', points: 80 },
            { value: 'advanced', label: '🎯 Advanced (professional mastery)', points: 100 }
          ]
        },
        {
          id: 'commitment',
          question: 'What is your commitment level?',
          options: [
            { value: 'exploring', label: '🔍 Just exploring options', points: 30 },
            { value: 'serious', label: '🎯 Serious, but need guidance', points: 70 },
            { value: 'decided', label: '✅ Decided, just need to choose school', points: 90 },
            { value: 'ready', label: '🚀 Ready to apply NOW', points: 100 }
          ]
        },
        {
          id: 'support',
          question: 'Do you have family/financial support?',
          options: [
            { value: 'self', label: '👤 Going alone, no help', points: 40 },
            { value: 'partial', label: '🤝 Partial family help', points: 70 },
            { value: 'full', label: '👨‍👩‍👧 Family 100% supportive', points: 90 },
            { value: 'sponsored', label: '🏢 Company/scholarship sponsoring', points: 100 }
          ]
        }
      ],

      result: {
        title: 'Your Result',
        score: 'Score',
        profile: 'Your Profile',
        readiness: 'Readiness Level',
        school: 'Recommended School',
        budget: 'Estimated Budget',
        recommendations: 'Personalized Recommendations',
        cta: 'Talk to Consultant',
        
        readinessLevels: {
          low: {
            label: 'Preparation Needed',
            color: 'yellow',
            message: 'You need more preparation before applying'
          },
          medium: {
            label: 'Good Chances',
            color: 'blue',
            message: 'You have good chances, but need to strengthen some points'
          },
          high: {
            label: 'Ready to Apply!',
            color: 'green',
            message: 'You are ready! Time to apply!'
          }
        }
      }
    },
    es: content.pt, // TODO: Traduzir
    fr: content.pt  // TODO: Traduzir
  }

  const t = content[lang] || content.pt
  const totalQuestions = t.questions.length

  const calculateResult = (): QuizResult => {
    let totalPoints = 0
    let maxPoints = 0

    t.questions.forEach((q: Question) => {
      const answer = answers[q.id]
      if (answer) {
        const option = q.options.find(o => o.value === answer)
        if (option) {
          totalPoints += option.points
        }
      }
      maxPoints += 100
    })

    const score = Math.round((totalPoints / maxPoints) * 100)
    
    let readiness: 'low' | 'medium' | 'high'
    if (score < 50) readiness = 'low'
    else if (score < 75) readiness = 'medium'
    else readiness = 'high'

    // Lógica simplificada (na versão real, usaríamos IA)
    const bestSchool = answers.area === 'animation' ? 'VanArts' : 'VFS'
    const estimatedBudget = answers.budget === 'low' ? 'CAD 25.000-30.000' : 
                           answers.budget === 'medium' ? 'CAD 35.000-45.000' : 
                           'CAD 50.000-65.000'

    const recommendations: string[] = []
    
    if (score < 50) {
      recommendations.push('Fortaleça seu inglês antes de aplicar')
      recommendations.push('Construa um portfólio básico')
      recommendations.push('Faça cursos preparatórios online')
    } else if (score < 75) {
      recommendations.push('Melhore seu portfólio com mais projetos')
      recommendations.push('Pratique inglês técnico da área')
      recommendations.push('Pesquise sobre vistos e documentação')
    } else {
      recommendations.push('Você está pronto! Aplique agora')
      recommendations.push('Prepare documentos para visto de estudante')
      recommendations.push('Entre em contato para consultoria detalhada')
    }

    return {
      score,
      profile: readiness === 'low' ? 'Iniciante' : readiness === 'medium' ? 'Intermediário' : 'Pronto',
      recommendations,
      readiness,
      bestSchool,
      estimatedBudget
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    const quizResult = calculateResult()
    setResult(quizResult)
    setShowResult(true)
    
    // Chamar callback se fornecido
    if (onComplete) {
      onComplete(quizResult)
    }

    // Salvar no CRM (não bloqueia a exibição do resultado)
    try {
      const sessionId = localStorage.getItem('sessionId') || `session_${Date.now()}`
      
      await ApiService.submitQuizVancouver({
        sessionId,
        ...answers,
        score: quizResult.score,
        readiness: quizResult.readiness,
        bestSchool: quizResult.bestSchool,
        estimatedBudget: quizResult.estimatedBudget,
        lang
      })
      
      console.log('✅ Quiz salvo no CRM')
    } catch (error) {
      console.warn('⚠️ Erro ao salvar Quiz (não-crítico):', error)
      // Não exibir erro para o usuário - é não-crítico
    }
  }

  const currentQ = t.questions[currentQuestion]
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const currentAnswer = answers[currentQ.id]

  if (showResult && result) {
    const readinessInfo = t.result.readinessLevels[result.readiness]
    
    return (
      <div className="card-adaptive rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
            <span className="text-azimut-red text-sm font-semibold uppercase">
              {t.result.title}
            </span>
          </div>
          
          <div className="text-8xl md:text-9xl font-handel text-azimut-red mb-4">
            {result.score}
          </div>
          
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold mb-8 ${
            result.readiness === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
            result.readiness === 'medium' ? 'bg-blue-500/20 text-blue-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {readinessInfo.label}
          </div>

          <p className="text-xl text-white/70 mb-12">
            {readinessInfo.message}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/5 rounded-xl">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-sm text-white/60 mb-1">{t.result.school}</div>
            <div className="text-xl font-bold text-white">{result.bestSchool}</div>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-xl">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm text-white/60 mb-1">{t.result.budget}</div>
            <div className="text-xl font-bold text-white">{result.estimatedBudget}</div>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-xl">
            <div className="text-3xl mb-2">👤</div>
            <div className="text-sm text-white/60 mb-1">{t.result.profile}</div>
            <div className="text-xl font-bold text-white">{result.profile}</div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">{t.result.recommendations}</h3>
          <div className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <span className="text-azimut-red text-xl">✓</span>
                <span className="text-white/80">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-azimut-red hover:bg-azimut-red/90 text-white text-lg font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-azimut-red/50"
          >
            {t.result.cta}
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
            {t.progress.replace('{current}', (currentQuestion + 1).toString()).replace('{total}', totalQuestions.toString())}
          </span>
          <span className="text-sm font-semibold text-azimut-red">
            {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-azimut-red to-red-400 transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className={`w-full text-left p-5 rounded-xl transition-all border-2 ${
                currentAnswer === option.value
                  ? 'border-azimut-red bg-azimut-red/10 text-white scale-[1.02]'
                  : 'border-white/10 bg-white/5 text-white/80 hover:border-azimut-red/50 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className="px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-white"
        >
          {t.back}
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!currentAnswer}
            className="px-10 py-4 rounded-lg font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-azimut-red hover:bg-azimut-red/90 text-white hover:scale-105"
          >
            {t.submit}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="px-10 py-4 rounded-lg font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-azimut-red hover:bg-azimut-red/90 text-white hover:scale-105"
          >
            {t.next}
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizVancouver
