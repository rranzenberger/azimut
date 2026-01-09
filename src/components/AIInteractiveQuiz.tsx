import React, { useState } from 'react'
import { type Lang } from '../i18n'

interface AIInteractiveQuizProps {
  lang: Lang
  onComplete: (formData: any, recommendation: any) => void
  className?: string
}

const AIInteractiveQuiz: React.FC<AIInteractiveQuizProps> = ({
  lang,
  onComplete,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const questions: Record<Lang, any> = {
    pt: [
      {
        id: 'objective',
        question: 'Qual o principal objetivo do seu projeto?',
        options: [
          { value: 'educar', label: '🎓 Educar e informar público' },
          { value: 'engajar', label: '✨ Engajar e entreter visitantes' },
          { value: 'treinar', label: '💼 Treinar equipe/funcionários' },
          { value: 'promover', label: '📣 Promover marca/produto' },
          { value: 'preservar', label: '🏛️ Preservar memória/cultura' }
        ]
      },
      {
        id: 'audience',
        question: 'Quem é o público-alvo principal?',
        options: [
          { value: 'escolar', label: '👨‍🎓 Estudantes (escolas/universidades)' },
          { value: 'geral', label: '👥 Público geral (todas idades)' },
          { value: 'corporativo', label: '💼 Profissionais/Corporativo' },
          { value: 'especializado', label: '🔬 Público especializado' },
          { value: 'turistas', label: '✈️ Turistas/Visitantes' }
        ]
      },
      {
        id: 'experience',
        question: 'Que tipo de experiência você imagina?',
        options: [
          { value: 'fisica', label: '🏛️ Instalação física/museu' },
          { value: 'digital', label: '📱 Aplicativo/Plataforma digital' },
          { value: 'vr', label: '🥽 Realidade Virtual (VR)' },
          { value: 'ar', label: '📲 Realidade Aumentada (AR)' },
          { value: 'hibrido', label: '🔄 Híbrido (físico + digital)' }
        ]
      },
      {
        id: 'scale',
        question: 'Qual a escala do projeto?',
        options: [
          { value: 'pequeno', label: '📦 Pequeno (1 sala / app simples)' },
          { value: 'medio', label: '🏢 Médio (múltiplas áreas / app completo)' },
          { value: 'grande', label: '🏛️ Grande (museu completo / plataforma complexa)' },
          { value: 'nao-sei', label: '🤷 Ainda não sei' }
        ]
      },
      {
        id: 'timeline-need',
        question: 'Qual a urgência do projeto?',
        options: [
          { value: 'urgente', label: '⚡ Urgente (< 3 meses)' },
          { value: 'normal', label: '📅 Normal (3-6 meses)' },
          { value: 'planejado', label: '🗓️ Planejado (6-12 meses)' },
          { value: 'longo-prazo', label: '📆 Longo prazo (12+ meses)' },
          { value: 'flexivel', label: '🤷 Flexível' }
        ]
      },
      {
        id: 'budget-idea',
        question: 'Tem ideia de orçamento disponível?',
        options: [
          { value: 'baixo', label: '💰 Até R$ 100k' },
          { value: 'medio', label: '💰💰 R$ 100k - R$ 300k' },
          { value: 'alto', label: '💰💰💰 R$ 300k - R$ 1M' },
          { value: 'muito-alto', label: '💰💰💰💰 Acima de R$ 1M' },
          { value: 'grant', label: '🎯 Preciso de grant/edital' },
          { value: 'indefinido', label: '🤷 Ainda não definido' }
        ]
      }
    ],
    en: [
      {
        id: 'objective',
        question: 'What is the main objective of your project?',
        options: [
          { value: 'educar', label: '🎓 Educate and inform audience' },
          { value: 'engajar', label: '✨ Engage and entertain visitors' },
          { value: 'treinar', label: '💼 Train team/employees' },
          { value: 'promover', label: '📣 Promote brand/product' },
          { value: 'preservar', label: '🏛️ Preserve memory/culture' }
        ]
      },
      {
        id: 'audience',
        question: 'Who is the main target audience?',
        options: [
          { value: 'escolar', label: '👨‍🎓 Students (schools/universities)' },
          { value: 'geral', label: '👥 General public (all ages)' },
          { value: 'corporativo', label: '💼 Professionals/Corporate' },
          { value: 'especializado', label: '🔬 Specialized audience' },
          { value: 'turistas', label: '✈️ Tourists/Visitors' }
        ]
      },
      {
        id: 'experience',
        question: 'What type of experience do you envision?',
        options: [
          { value: 'fisica', label: '🏛️ Physical installation/museum' },
          { value: 'digital', label: '📱 App/Digital platform' },
          { value: 'vr', label: '🥽 Virtual Reality (VR)' },
          { value: 'ar', label: '📲 Augmented Reality (AR)' },
          { value: 'hibrido', label: '🔄 Hybrid (physical + digital)' }
        ]
      },
      {
        id: 'scale',
        question: 'What is the project scale?',
        options: [
          { value: 'pequeno', label: '📦 Small (1 room / simple app)' },
          { value: 'medio', label: '🏢 Medium (multiple areas / complete app)' },
          { value: 'grande', label: '🏛️ Large (full museum / complex platform)' },
          { value: 'nao-sei', label: '🤷 Not sure yet' }
        ]
      },
      {
        id: 'timeline-need',
        question: 'What is the project urgency?',
        options: [
          { value: 'urgente', label: '⚡ Urgent (< 3 months)' },
          { value: 'normal', label: '📅 Normal (3-6 months)' },
          { value: 'planejado', label: '🗓️ Planned (6-12 months)' },
          { value: 'longo-prazo', label: '📆 Long term (12+ months)' },
          { value: 'flexivel', label: '🤷 Flexible' }
        ]
      },
      {
        id: 'budget-idea',
        question: 'Do you have a budget idea?',
        options: [
          { value: 'baixo', label: '💰 Up to $50k' },
          { value: 'medio', label: '💰💰 $50k - $150k' },
          { value: 'alto', label: '💰💰💰 $150k - $500k' },
          { value: 'muito-alto', label: '💰💰💰💰 Above $500k' },
          { value: 'grant', label: '🎯 Need grant/funding' },
          { value: 'indefinido', label: '🤷 Not defined yet' }
        ]
      }
    ],
    es: [
      {
        id: 'objective',
        question: '¿Cuál es el objetivo principal de su proyecto?',
        options: [
          { value: 'educar', label: '🎓 Educar e informar al público' },
          { value: 'engajar', label: '✨ Involucrar y entretener visitantes' },
          { value: 'treinar', label: '💼 Entrenar equipo/empleados' },
          { value: 'promover', label: '📣 Promover marca/producto' },
          { value: 'preservar', label: '🏛️ Preservar memoria/cultura' }
        ]
      },
      // ... (similar structure for other questions in Spanish)
    ],
    fr: [
      {
        id: 'objective',
        question: 'Quel est l\'objectif principal de votre projet?',
        options: [
          { value: 'educar', label: '🎓 Éduquer et informer le public' },
          { value: 'engajar', label: '✨ Engager et divertir les visiteurs' },
          { value: 'treinar', label: '💼 Former l\'équipe/employés' },
          { value: 'promover', label: '📣 Promouvoir marque/produit' },
          { value: 'preservar', label: '🏛️ Préserver mémoire/culture' }
        ]
      },
      // ... (similar structure for other questions in French)
    ]
  }

  const texts: Record<Lang, any> = {
    pt: {
      title: 'Descubra a Solução Ideal',
      subtitle: 'Responda algumas perguntas e vamos sugerir a melhor solução para você',
      next: 'Próximo',
      back: 'Voltar',
      analyzing: 'Analisando suas respostas...',
      resultTitle: 'Solução Recomendada para Você',
      why: 'Por que esta solução?',
      features: 'Principais características',
      fillForm: 'Preencher Formulário Automaticamente',
      nextSteps: 'Próximos Passos'
    },
    en: {
      title: 'Discover the Ideal Solution',
      subtitle: 'Answer a few questions and we\'ll suggest the best solution for you',
      next: 'Next',
      back: 'Back',
      analyzing: 'Analyzing your answers...',
      resultTitle: 'Recommended Solution for You',
      why: 'Why this solution?',
      features: 'Key features',
      fillForm: 'Fill Form Automatically',
      nextSteps: 'Next Steps'
    },
    es: {
      title: 'Descubra la Solución Ideal',
      subtitle: 'Responda algunas preguntas y sugeriremos la mejor solución para usted',
      next: 'Siguiente',
      back: 'Volver',
      analyzing: 'Analizando sus respuestas...',
      resultTitle: 'Solución Recomendada para Usted',
      why: '¿Por qué esta solución?',
      features: 'Características principales',
      fillForm: 'Completar Formulario Automáticamente',
      nextSteps: 'Próximos Pasos'
    },
    fr: {
      title: 'Découvrez la Solution Idéale',
      subtitle: 'Répondez à quelques questions et nous suggérerons la meilleure solution pour vous',
      next: 'Suivant',
      back: 'Retour',
      analyzing: 'Analyse de vos réponses...',
      resultTitle: 'Solution Recommandée pour Vous',
      why: 'Pourquoi cette solution?',
      features: 'Caractéristiques clés',
      fillForm: 'Remplir le Formulaire Automatiquement',
      nextSteps: 'Prochaines Étapes'
    }
  }

  const t = texts[lang]
  const quizQuestions = questions[lang] || questions.pt

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      submitQuiz()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const submitQuiz = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('https://backoffice.azmt.com.br/api/ai/quiz-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, language: lang })
      })

      if (!response.ok) throw new Error('Failed to analyze')

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error analyzing quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  if (result && result.success) {
    return (
      <div className={`animate-fade-in ${className}`}>
        <div className="p-8 rounded-2xl border border-azimut-red/30 bg-gradient-to-br from-azimut-red/10 via-azimut-red/5 to-transparent backdrop-blur-sm">
          {/* Resultado */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-3xl font-handel uppercase tracking-wider text-white mb-2">
              {result.recommendation.title}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {result.recommendation.description}
            </p>
          </div>

          {/* Por que esta solução? */}
          {result.whyThisSolution && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm font-semibold text-azimut-red mb-2">
                💡 {t.why}
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                {result.whyThisSolution}
              </p>
            </div>
          )}

          {/* Features principais */}
          {result.recommendation.keyFeatures && result.recommendation.keyFeatures.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-white/90 mb-2">
                ✨ {t.features}:
              </p>
              <ul className="space-y-2">
                {result.recommendation.keyFeatures.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-azimut-red mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Orçamento e Timeline */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {result.recommendation.estimatedBudget && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-xs text-white/50 mb-1">Orçamento Estimado</p>
                <p className="text-lg font-semibold text-azimut-red">
                  {result.recommendation.estimatedBudget}
                </p>
              </div>
            )}
            {result.recommendation.estimatedTimeline && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-xs text-white/50 mb-1">Prazo Estimado</p>
                <p className="text-lg font-semibold text-azimut-red">
                  {result.recommendation.estimatedTimeline}
                </p>
              </div>
            )}
          </div>

          {/* Próximos passos */}
          {result.nextSteps && result.nextSteps.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-white/90 mb-2">
                🎯 {t.nextSteps}:
              </p>
              <ol className="space-y-1">
                {result.nextSteps.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-azimut-red">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Botão para preencher formulário */}
          <button
            onClick={() => onComplete(result.formData, result.recommendation)}
            className="mt-8 w-full px-6 py-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>{t.fillForm}</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="inline-block w-16 h-16 border-4 border-azimut-red/30 border-t-azimut-red rounded-full animate-spin mb-4"></div>
        <p className="text-white/70">{t.analyzing}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="p-6 md:p-8 rounded-2xl border border-white/10 card-adaptive">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-handel uppercase tracking-wider text-white mb-2">
            {t.title}
          </h3>
          <p className="text-white/70 text-sm">
            {t.subtitle}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-white/50 mb-2">
            <span>Pergunta {currentStep + 1} de {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-azimut-red to-red-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pergunta atual */}
        <div className="mb-8 animate-fade-in">
          <h4 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h4>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option: any) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`w-full p-4 rounded-lg border transition-all duration-300 text-left flex items-center gap-3 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-azimut-red bg-azimut-red/10 text-white'
                    : 'border-white/10 hover:border-white/30 text-white/80 hover:text-white'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-azimut-red bg-azimut-red'
                    : 'border-white/30'
                }`}>
                  {answers[currentQuestion.id] === option.value && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-lg transition-all"
            >
              {t.back}
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              answers[currentQuestion.id]
                ? 'bg-azimut-red hover:bg-azimut-red/90 text-white'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {currentStep < quizQuestions.length - 1 ? t.next : t.analyzing}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIInteractiveQuiz
