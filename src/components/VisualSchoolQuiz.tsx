// ════════════════════════════════════════════════════════════
// VISUAL SCHOOL QUIZ - ULTRA VISUAL (TIPO INSTAGRAM STORIES)
// ════════════════════════════════════════════════════════════
// ZERO texto chato - SÓ visual + emojis + sons
// Target: 16-25 anos (Gen Z)
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { type Lang } from '../i18n'

interface VisualSchoolQuizProps {
  lang: Lang
  onComplete?: (result: 'vanarts' | 'vfs') => void
}

const VisualSchoolQuiz: React.FC<VisualSchoolQuizProps> = ({ lang, onComplete }) => {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ vanarts: 0, vfs: 0 })
  const [showResult, setShowResult] = useState(false)

  // Som de click (navegador suporta)
  const playSound = (type: 'click' | 'whoosh' | 'win') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    if (type === 'click') {
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } else if (type === 'whoosh') {
      oscillator.frequency.value = 400
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } else if (type === 'win') {
      oscillator.frequency.value = 1200
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const content: Record<Lang, any> = {
    pt: {
      yourVibeIs: 'Sua vibe é',
      viewDetails: '🎬 Ver Detalhes',
      redo: '🔄 Refazer',
      of: 'de',
      questions: [
        {
          emoji: '🎨',
          options: [
            { visual: '🎮', text: 'Games', subtitle: 'Fortnite, Last of Us', score: 'vanarts', gradient: 'from-purple-600 to-pink-600' },
            { visual: '🎬', text: 'Filmes', subtitle: 'Marvel, Netflix', score: 'vfs', gradient: 'from-red-600 to-orange-600' }
          ]
        },
        {
          emoji: '💻',
          options: [
            { visual: '🖥️', text: '3D Digital', subtitle: 'Maya, Houdini', score: 'vanarts', gradient: 'from-blue-600 to-cyan-600' },
            { visual: '📹', text: 'Câmera Real', subtitle: 'RED, Arri', score: 'vfs', gradient: 'from-yellow-600 to-red-600' }
          ]
        },
        {
          emoji: '🎯',
          options: [
            { visual: '🦸', text: 'Pixar/Marvel', subtitle: '95% emprego', score: 'vanarts', gradient: 'from-indigo-600 to-purple-600' },
            { visual: '🏆', text: 'Sundance/A24', subtitle: 'Festivais', score: 'vfs', gradient: 'from-amber-600 to-orange-600' }
          ]
        },
        {
          emoji: '💰',
          options: [
            { visual: '💵', text: '$42k', subtitle: 'Melhor custo', score: 'vanarts', gradient: 'from-green-600 to-emerald-600' },
            { visual: '💎', text: '$50k', subtitle: 'Premium', score: 'vfs', gradient: 'from-purple-600 to-pink-600' }
          ]
        },
        {
          emoji: '🤝',
          options: [
            { visual: '🤓', text: 'Nerds', subtitle: 'Gamers, cosplay', score: 'vanarts', gradient: 'from-blue-600 to-purple-600' },
            { visual: '🎭', text: 'Artistas', subtitle: 'Indie, cult', score: 'vfs', gradient: 'from-red-600 to-pink-600' }
          ]
        }
      ],
      results: {
        vanarts: {
          emoji: '🎮',
          title: 'VanArts',
          subtitle: 'Digital Creator',
          color: 'from-purple-600 to-pink-600',
          benefits: [
            { emoji: '🎨', text: 'Animação 3D Top' },
            { emoji: '💰', text: 'Melhor Custo' },
            { emoji: '🏆', text: '95% Emprego' },
            { emoji: '🤓', text: 'Vibe Geek' }
          ]
        },
        vfs: {
          emoji: '🎬',
          title: 'VFS',
          subtitle: 'Filmmaker',
          color: 'from-red-600 to-orange-600',
          benefits: [
            { emoji: '📹', text: 'Câmeras RED 8K' },
            { emoji: '🎭', text: 'Estúdios Reais' },
            { emoji: '🏆', text: 'Festivais' },
            { emoji: '🎨', text: 'Vibe Artsy' }
          ]
        }
      }
    },
    en: {
      yourVibeIs: 'Your vibe is',
      viewDetails: '🎬 View Details',
      redo: '🔄 Redo',
      of: 'of',
      questions: [
        {
          emoji: '🎨',
          options: [
            { visual: '🎮', text: 'Games', subtitle: 'Fortnite, Last of Us', score: 'vanarts', gradient: 'from-purple-600 to-pink-600' },
            { visual: '🎬', text: 'Films', subtitle: 'Marvel, Netflix', score: 'vfs', gradient: 'from-red-600 to-orange-600' }
          ]
        },
        {
          emoji: '💻',
          options: [
            { visual: '🖥️', text: '3D Digital', subtitle: 'Maya, Houdini', score: 'vanarts', gradient: 'from-blue-600 to-cyan-600' },
            { visual: '📹', text: 'Real Camera', subtitle: 'RED, Arri', score: 'vfs', gradient: 'from-yellow-600 to-red-600' }
          ]
        },
        {
          emoji: '🎯',
          options: [
            { visual: '🦸', text: 'Pixar/Marvel', subtitle: '95% employment', score: 'vanarts', gradient: 'from-indigo-600 to-purple-600' },
            { visual: '🏆', text: 'Sundance/A24', subtitle: 'Festivals', score: 'vfs', gradient: 'from-amber-600 to-orange-600' }
          ]
        },
        {
          emoji: '💰',
          options: [
            { visual: '💵', text: '$42k', subtitle: 'Best cost', score: 'vanarts', gradient: 'from-green-600 to-emerald-600' },
            { visual: '💎', text: '$50k', subtitle: 'Premium', score: 'vfs', gradient: 'from-purple-600 to-pink-600' }
          ]
        },
        {
          emoji: '🤝',
          options: [
            { visual: '🤓', text: 'Nerds', subtitle: 'Gamers, cosplay', score: 'vanarts', gradient: 'from-blue-600 to-purple-600' },
            { visual: '🎭', text: 'Artists', subtitle: 'Indie, cult', score: 'vfs', gradient: 'from-red-600 to-pink-600' }
          ]
        }
      ],
      results: {
        vanarts: {
          emoji: '🎮',
          title: 'VanArts',
          subtitle: 'Digital Creator',
          color: 'from-purple-600 to-pink-600',
          benefits: [
            { emoji: '🎨', text: 'Top 3D Animation' },
            { emoji: '💰', text: 'Best Cost' },
            { emoji: '🏆', text: '95% Employment' },
            { emoji: '🤓', text: 'Geek Vibe' }
          ]
        },
        vfs: {
          emoji: '🎬',
          title: 'VFS',
          subtitle: 'Filmmaker',
          color: 'from-red-600 to-orange-600',
          benefits: [
            { emoji: '📹', text: 'RED 8K Cameras' },
            { emoji: '🎭', text: 'Real Studios' },
            { emoji: '🏆', text: 'Festivals' },
            { emoji: '🎨', text: 'Artsy Vibe' }
          ]
        }
      }
    },
    es: {
      yourVibeIs: 'Tu vibra es',
      viewDetails: '🎬 Ver Detalles',
      redo: '🔄 Rehacer',
      of: 'de',
      questions: [
        {
          emoji: '🎨',
          options: [
            { visual: '🎮', text: 'Juegos', subtitle: 'Fortnite, Last of Us', score: 'vanarts', gradient: 'from-purple-600 to-pink-600' },
            { visual: '🎬', text: 'Películas', subtitle: 'Marvel, Netflix', score: 'vfs', gradient: 'from-red-600 to-orange-600' }
          ]
        },
        {
          emoji: '💻',
          options: [
            { visual: '🖥️', text: '3D Digital', subtitle: 'Maya, Houdini', score: 'vanarts', gradient: 'from-blue-600 to-cyan-600' },
            { visual: '📹', text: 'Cámara Real', subtitle: 'RED, Arri', score: 'vfs', gradient: 'from-yellow-600 to-red-600' }
          ]
        },
        {
          emoji: '🎯',
          options: [
            { visual: '🦸', text: 'Pixar/Marvel', subtitle: '95% empleo', score: 'vanarts', gradient: 'from-indigo-600 to-purple-600' },
            { visual: '🏆', text: 'Sundance/A24', subtitle: 'Festivales', score: 'vfs', gradient: 'from-amber-600 to-orange-600' }
          ]
        },
        {
          emoji: '💰',
          options: [
            { visual: '💵', text: '$42k', subtitle: 'Mejor costo', score: 'vanarts', gradient: 'from-green-600 to-emerald-600' },
            { visual: '💎', text: '$50k', subtitle: 'Premium', score: 'vfs', gradient: 'from-purple-600 to-pink-600' }
          ]
        },
        {
          emoji: '🤝',
          options: [
            { visual: '🤓', text: 'Nerds', subtitle: 'Gamers, cosplay', score: 'vanarts', gradient: 'from-blue-600 to-purple-600' },
            { visual: '🎭', text: 'Artistas', subtitle: 'Indie, cult', score: 'vfs', gradient: 'from-red-600 to-pink-600' }
          ]
        }
      ],
      results: {
        vanarts: {
          emoji: '🎮',
          title: 'VanArts',
          subtitle: 'Digital Creator',
          color: 'from-purple-600 to-pink-600',
          benefits: [
            { emoji: '🎨', text: 'Animación 3D Top' },
            { emoji: '💰', text: 'Mejor Costo' },
            { emoji: '🏆', text: '95% Empleo' },
            { emoji: '🤓', text: 'Vibra Geek' }
          ]
        },
        vfs: {
          emoji: '🎬',
          title: 'VFS',
          subtitle: 'Filmmaker',
          color: 'from-red-600 to-orange-600',
          benefits: [
            { emoji: '📹', text: 'Cámaras RED 8K' },
            { emoji: '🎭', text: 'Estudios Reales' },
            { emoji: '🏆', text: 'Festivales' },
            { emoji: '🎨', text: 'Vibra Artística' }
          ]
        }
      }
    },
    fr: {
      yourVibeIs: 'Votre vibe est',
      viewDetails: '🎬 Voir Détails',
      redo: '🔄 Refaire',
      of: 'sur',
      questions: [
        {
          emoji: '🎨',
          options: [
            { visual: '🎮', text: 'Jeux', subtitle: 'Fortnite, Last of Us', score: 'vanarts', gradient: 'from-purple-600 to-pink-600' },
            { visual: '🎬', text: 'Films', subtitle: 'Marvel, Netflix', score: 'vfs', gradient: 'from-red-600 to-orange-600' }
          ]
        },
        {
          emoji: '💻',
          options: [
            { visual: '🖥️', text: '3D Digital', subtitle: 'Maya, Houdini', score: 'vanarts', gradient: 'from-blue-600 to-cyan-600' },
            { visual: '📹', text: 'Caméra Réelle', subtitle: 'RED, Arri', score: 'vfs', gradient: 'from-yellow-600 to-red-600' }
          ]
        },
        {
          emoji: '🎯',
          options: [
            { visual: '🦸', text: 'Pixar/Marvel', subtitle: '95% emploi', score: 'vanarts', gradient: 'from-indigo-600 to-purple-600' },
            { visual: '🏆', text: 'Sundance/A24', subtitle: 'Festivals', score: 'vfs', gradient: 'from-amber-600 to-orange-600' }
          ]
        },
        {
          emoji: '💰',
          options: [
            { visual: '💵', text: '$42k', subtitle: 'Meilleur coût', score: 'vanarts', gradient: 'from-green-600 to-emerald-600' },
            { visual: '💎', text: '$50k', subtitle: 'Premium', score: 'vfs', gradient: 'from-purple-600 to-pink-600' }
          ]
        },
        {
          emoji: '🤝',
          options: [
            { visual: '🤓', text: 'Nerds', subtitle: 'Gamers, cosplay', score: 'vanarts', gradient: 'from-blue-600 to-purple-600' },
            { visual: '🎭', text: 'Artistes', subtitle: 'Indie, cult', score: 'vfs', gradient: 'from-red-600 to-pink-600' }
          ]
        }
      ],
      results: {
        vanarts: {
          emoji: '🎮',
          title: 'VanArts',
          subtitle: 'Digital Creator',
          color: 'from-purple-600 to-pink-600',
          benefits: [
            { emoji: '🎨', text: 'Animation 3D Top' },
            { emoji: '💰', text: 'Meilleur Coût' },
            { emoji: '🏆', text: '95% Emploi' },
            { emoji: '🤓', text: 'Vibe Geek' }
          ]
        },
        vfs: {
          emoji: '🎬',
          title: 'VFS',
          subtitle: 'Filmmaker',
          color: 'from-red-600 to-orange-600',
          benefits: [
            { emoji: '📹', text: 'Caméras RED 8K' },
            { emoji: '🎭', text: 'Studios Réels' },
            { emoji: '🏆', text: 'Festivals' },
            { emoji: '🎨', text: 'Vibe Artsy' }
          ]
        }
      }
    }
  }

  const t = content[lang] || content.pt
  const questions = t.questions
  const results = t.results

  const handleChoice = (scoreType: 'vanarts' | 'vfs') => {
    playSound('click')
    setScores({ ...scores, [scoreType]: scores[scoreType] + 1 })
    
    setTimeout(() => {
      if (step < questions.length - 1) {
        playSound('whoosh')
        setStep(step + 1)
      } else {
        playSound('win')
        setShowResult(true)
        if (onComplete) {
          const winner = scores.vanarts + (scoreType === 'vanarts' ? 1 : 0) > scores.vfs + (scoreType === 'vfs' ? 1 : 0) ? 'vanarts' : 'vfs'
          onComplete(winner)
        }
      }
    }, 300)
  }

  const winner = scores.vanarts > scores.vfs ? 'vanarts' : 'vfs'

  if (showResult) {
    const result = results[winner]
    return (
      <div className="relative min-h-[600px] rounded-3xl overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-20`} />
        
        <div className="relative z-10 p-8 md:p-12 text-center animate-fade-in">
          {/* Confetti Effect */}
          <div className="text-8xl mb-6 animate-bounce">
            {result.emoji}
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3 uppercase tracking-tight">
            {result.title}
          </h2>
          
          <p className="text-2xl text-white/80 mb-12">
            {t.yourVibeIs} {result.subtitle}!
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            {result.benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-2">{benefit.emoji}</div>
                <p className="text-white font-bold text-lg">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className={`px-8 py-4 bg-gradient-to-r ${result.color} hover:opacity-90 text-white text-xl font-bold rounded-full transition-all transform hover:scale-105 shadow-2xl`}
            >
              {t.viewDetails}
            </button>
            <button
              onClick={() => {
                setStep(0)
                setScores({ vanarts: 0, vfs: 0 })
                setShowResult(false)
              }}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-xl text-white text-xl font-bold rounded-full transition-all border border-white/30"
            >
              {t.redo}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  return (
    <div className="relative min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black p-8 md:p-12">
      {/* Progress Bar (Stories style) */}
      <div className="flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <div
              className={`h-full bg-white transition-all duration-300 ${
                i < step ? 'w-full' : i === step ? `w-[${progress}%]` : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Main Question */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-8xl mb-6 animate-bounce-slow">
          {currentQ.emoji}
        </div>
        <p className="text-2xl text-white/60 mb-2">
          {step + 1} {t.of} {questions.length}
        </p>
      </div>

      {/* Options - HUGE Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {currentQ.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleChoice(option.score as 'vanarts' | 'vfs')}
            className={`group relative overflow-hidden rounded-3xl p-8 md:p-12 
                       bg-gradient-to-br ${option.gradient} 
                       transform hover:scale-105 active:scale-95 
                       transition-all duration-300 
                       shadow-2xl hover:shadow-3xl
                       animate-fade-in`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            
            <div className="relative z-10 text-center">
              {/* Giant Emoji */}
              <div className="text-8xl md:text-9xl mb-4 transform group-hover:scale-110 transition-transform">
                {option.visual}
              </div>
              
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">
                {option.text}
              </h3>
              
              {/* Subtitle */}
              <p className="text-xl text-white/80">
                {option.subtitle}
              </p>
            </div>

            {/* Tap Indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <span className="text-2xl">👆</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default VisualSchoolQuiz
