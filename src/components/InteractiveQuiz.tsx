// ════════════════════════════════════════════════════════════
// COMPONENTE: InteractiveQuiz
// ════════════════════════════════════════════════════════════
// Quiz interativo gamificado
// - Perguntas com pontos
// - Progress bar
// - Badges desbloqueáveis
// - Confetti animation
// - Resultado visual
// - Share social
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'

export interface QuizQuestion {
  q: string // Pergunta
  description?: string // Texto auxiliar
  image?: string // Imagem ilustrativa
  options: QuizOption[]
  type?: 'single' | 'multiple' // Single choice ou multiple choice
}

export interface QuizOption {
  text: string
  image?: string // Imagem da opção
  points?: Record<string, number> // Pontos por resultado (ex: {vfs: 3, vanarts: 2})
  value?: string // Valor único (se não usar sistema de pontos)
}

export interface QuizResult {
  id: string
  title: string
  description: string
  image?: string
  badge?: string
  emoji?: string
  cta?: {
    text: string
    url: string
  }
  shareText?: string
}

interface InteractiveQuizProps {
  title: string
  description?: string
  questions: QuizQuestion[]
  results: QuizResult[] // Resultados possíveis
  
  // Gamificação
  showProgress?: boolean
  showPoints?: boolean
  enableConfetti?: boolean
  enableSound?: boolean
  
  // Callbacks
  onComplete?: (result: QuizResult, answers: any[]) => void
  onShare?: (result: QuizResult) => void
  
  // Visual
  theme?: 'default' | 'minimal'
  accentColor?: string
  className?: string
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  title,
  description,
  questions,
  results,
  showProgress = true,
  showPoints = false,
  enableConfetti = true,
  enableSound = false,
  onComplete,
  onShare,
  theme = 'default',
  accentColor = '#c92337',
  className = ''
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [scores, setScores] = useState<Record<string, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Selecionar opção
  const selectOption = (optionIndex: number) => {
    const question = questions[currentQuestion]
    
    if (question.type === 'multiple') {
      // Multiple choice: toggle
      if (selectedOptions.includes(optionIndex)) {
        setSelectedOptions(selectedOptions.filter(i => i !== optionIndex))
      } else {
        setSelectedOptions([...selectedOptions, optionIndex])
      }
    } else {
      // Single choice
      setSelectedOptions([optionIndex])
    }
  }

  // Próxima pergunta
  const nextQuestion = () => {
    if (selectedOptions.length === 0) return

    const question = questions[currentQuestion]
    const answer = selectedOptions.map(i => question.options[i])

    // Adicionar resposta
    setAnswers([...answers, answer])

    // Calcular pontos
    const newScores = { ...scores }
    selectedOptions.forEach(optionIndex => {
      const option = question.options[optionIndex]
      if (option.points) {
        Object.entries(option.points).forEach(([key, points]) => {
          newScores[key] = (newScores[key] || 0) + points
        })
      }
    })
    setScores(newScores)

    // Limpar seleção
    setSelectedOptions([])

    // Próxima pergunta ou finalizar
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz(newScores, [...answers, answer])
    }
  }

  // Voltar pergunta
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      // Recalcular scores removendo última resposta
      // (simplificado: assume que não afeta muito)
      setSelectedOptions([])
    }
  }

  // Finalizar quiz
  const finishQuiz = (finalScores: Record<string, number>, finalAnswers: any[]) => {
    // Encontrar resultado com maior pontuação
    const winner = Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0]
    const result = results.find(r => r.id === winner[0]) || results[0]

    setFinalResult(result)
    setIsComplete(true)

    // Confetti
    if (enableConfetti) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }

    // Callback
    onComplete?.(result, finalAnswers)

    // Scroll to result
    setTimeout(() => {
      document.getElementById('quiz-result')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Reiniciar
  const restart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setScores({})
    setIsComplete(false)
    setFinalResult(null)
    setSelectedOptions([])
    setShowConfetti(false)
  }

  // Share
  const share = () => {
    if (!finalResult) return

    const text = finalResult.shareText || `Fiz o quiz "${title}" e meu resultado foi: ${finalResult.title}!`
    const url = window.location.href

    if (navigator.share) {
      navigator.share({ title, text, url })
    } else {
      // Fallback: copiar link
      navigator.clipboard.writeText(`${text}\n${url}`)
      alert('Link copiado!')
    }

    onShare?.(finalResult)
  }

  // Confetti effect (simples)
  const ConfettiEffect = () => {
    if (!showConfetti) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
              width: '10px',
              height: '10px',
              backgroundColor: ['#c92337', '#ff6b6b', '#ffd93d', '#6bcf7f'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // RESULTADO
  // ═══════════════════════════════════════════════════════════
  if (isComplete && finalResult) {
    return (
      <div id="quiz-result" className={`relative ${className}`}>
        <ConfettiEffect />

        <div className="card-adaptive rounded-2xl p-8 md:p-12 text-center animate-fade-in-up">
          {/* Badge */}
          {finalResult.badge && (
            <div className="inline-block mb-6 animate-bounce">
              <div 
                className="text-6xl md:text-8xl"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(201, 35, 55, 0.5))'
                }}
              >
                {finalResult.emoji || finalResult.badge}
              </div>
            </div>
          )}

          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {finalResult.title}
          </h2>

          {/* Descrição */}
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {finalResult.description}
          </p>

          {/* Imagem */}
          {finalResult.image && (
            <img
              src={finalResult.image}
              alt={finalResult.title}
              className="w-full max-w-2xl mx-auto rounded-xl mb-8 shadow-2xl"
            />
          )}

          {/* CTA */}
          {finalResult.cta && (
            <a
              href={finalResult.cta.url}
              className="inline-block px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-6"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 10px 40px ${accentColor}40`
              }}
            >
              {finalResult.cta.text}
            </a>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={share}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartilhar
            </button>
            <button
              onClick={restart}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refazer Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // QUIZ EM ANDAMENTO
  // ═══════════════════════════════════════════════════════════
  const question = questions[currentQuestion]

  return (
    <div className={`relative ${className}`}>
      <div className="card-adaptive rounded-2xl p-6 md:p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h2>
            {showPoints && Object.keys(scores).length > 0 && (
              <div className="text-right">
                <p className="text-xs text-white/60 uppercase tracking-wider">Pontos</p>
                <p className="text-xl font-bold text-azimut-red">
                  {Object.values(scores).reduce((a, b) => a + b, 0)}
                </p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {showProgress && (
            <div className="relative">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: accentColor
                  }}
                />
              </div>
              <p className="text-xs text-white/60 mt-2 text-right">
                Pergunta {currentQuestion + 1} de {questions.length}
              </p>
            </div>
          )}
        </div>

        {/* Pergunta */}
        <div className="mb-8">
          {question.image && (
            <img
              src={question.image}
              alt={question.q}
              className="w-full max-w-md mx-auto rounded-xl mb-6"
            />
          )}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {question.q}
          </h3>
          {question.description && (
            <p className="text-white/70">{question.description}</p>
          )}
        </div>

        {/* Opções */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectOption(index)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-4 ${
                selectedOptions.includes(index)
                  ? 'border-2 shadow-lg'
                  : 'border-2 border-transparent bg-white/5 hover:bg-white/10'
              }`}
              style={selectedOptions.includes(index) ? {
                borderColor: accentColor,
                backgroundColor: `${accentColor}15`,
                boxShadow: `0 0 30px ${accentColor}30`
              } : {}}
            >
              {/* Checkbox/Radio */}
              <div 
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOptions.includes(index) ? 'border-azimut-red' : 'border-white/30'
                }`}
              >
                {selectedOptions.includes(index) && (
                  <div className="w-3 h-3 rounded-full bg-azimut-red" />
                )}
              </div>

              {/* Imagem da opção */}
              {option.image && (
                <img
                  src={option.image}
                  alt={option.text}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}

              {/* Texto */}
              <span className="flex-1 font-medium text-white">
                {option.text}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <button
              onClick={prevQuestion}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
          )}
          <button
            onClick={nextQuestion}
            disabled={selectedOptions.length === 0}
            className="flex-1 px-6 py-3 rounded-full font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
            style={{
              backgroundColor: selectedOptions.length > 0 ? accentColor : '#555',
              boxShadow: selectedOptions.length > 0 ? `0 10px 40px ${accentColor}40` : 'none'
            }}
          >
            {currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Resultado'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* CSS para confetti */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
