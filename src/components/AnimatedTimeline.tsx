// ════════════════════════════════════════════════════════════
// COMPONENTE: AnimatedTimeline
// ════════════════════════════════════════════════════════════
// Timeline animada com GSAP ScrollTrigger
// - Steps verticais/horizontais
// - Ícones + texto + imagem opcional
// - Animação smooth no scroll
// - Barra de progresso
// ════════════════════════════════════════════════════════════

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar plugin GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface TimelineStep {
  number?: number
  icon?: string | React.ReactNode // emoji ou JSX
  title: string
  description: string
  image?: string
  date?: string
  badge?: string
  link?: {
    text: string
    url: string
  }
}

interface AnimatedTimelineProps {
  steps: TimelineStep[]
  layout?: 'vertical' | 'horizontal'
  lineColor?: string
  activeColor?: string
  className?: string
  animationDuration?: number
  animationDelay?: number
}

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({
  steps,
  layout = 'vertical',
  lineColor = 'white/20',
  activeColor = '#c92337',
  className = '',
  animationDuration = 0.6,
  animationDelay = 0.1
}) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!timelineRef.current) return

    const ctx = gsap.context(() => {
      // Animar cada step
      stepsRef.current.forEach((step, index) => {
        if (!step) return

        gsap.fromTo(
          step,
          {
            opacity: 0,
            y: layout === 'vertical' ? 50 : 0,
            x: layout === 'horizontal' ? 50 : 0,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: animationDuration,
            delay: index * animationDelay,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Animar o círculo/ícone
        const circle = step.querySelector('.timeline-circle')
        if (circle) {
          gsap.fromTo(
            circle,
            {
              scale: 0,
              backgroundColor: `rgba(255, 255, 255, 0.1)`
            },
            {
              scale: 1,
              backgroundColor: activeColor,
              duration: 0.4,
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })
    }, timelineRef)

    return () => ctx.revert()
  }, [steps, layout, animationDuration, animationDelay, activeColor])

  if (layout === 'horizontal') {
    // Layout horizontal (mobile scroll horizontal)
    return (
      <div 
        ref={timelineRef}
        className={`relative ${className}`}
      >
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => stepsRef.current[index] = el}
              className="flex-shrink-0 w-80 snap-center"
            >
              <div className="card-adaptive rounded-xl p-6 h-full">
                {/* Number/Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="timeline-circle w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: activeColor }}
                  >
                    {typeof step.icon === 'string' ? (
                      <span className="text-2xl">{step.icon}</span>
                    ) : step.icon ? (
                      step.icon
                    ) : (
                      step.number || index + 1
                    )}
                  </div>
                  {step.date && (
                    <span className="text-sm text-white/60 font-mono">{step.date}</span>
                  )}
                </div>

                {/* Badge */}
                {step.badge && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red text-white rounded-full mb-3">
                    {step.badge}
                  </span>
                )}

                {/* Image */}
                {step.image && (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/70 mb-4">{step.description}</p>

                {/* Link */}
                {step.link && (
                  <a
                    href={step.link.url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-azimut-red hover:text-azimut-red/80 transition-colors"
                  >
                    {step.link.text}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Layout vertical (default)
  return (
    <div 
      ref={timelineRef}
      className={`relative ${className}`}
    >
      {/* Linha vertical */}
      <div 
        className="absolute left-6 top-0 bottom-0 w-[2px]"
        style={{ 
          background: `linear-gradient(to bottom, transparent, rgba(${lineColor.replace('white/', '255,255,255,')}), transparent)` 
        }}
      />

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => stepsRef.current[index] = el}
            className="relative flex gap-6"
          >
            {/* Círculo + ícone */}
            <div className="flex-shrink-0 relative z-10">
              <div 
                className="timeline-circle w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ backgroundColor: activeColor }}
              >
                {typeof step.icon === 'string' ? (
                  <span className="text-2xl">{step.icon}</span>
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span className="text-lg">{step.number || index + 1}</span>
                )}
              </div>
              
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{ backgroundColor: activeColor }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="card-adaptive rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {step.badge && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red text-white rounded-full mb-2">
                        {step.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  {step.date && (
                    <span className="text-sm text-white/60 font-mono">{step.date}</span>
                  )}
                </div>

                {/* Image */}
                {step.image && (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Description */}
                <p className="text-white/70 mb-4">{step.description}</p>

                {/* Link */}
                {step.link && (
                  <a
                    href={step.link.url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-azimut-red hover:text-azimut-red/80 transition-colors group"
                  >
                    {step.link.text}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// CSS helper para hide scrollbar
const style = `
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`

// Inject style
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style')
  styleTag.innerHTML = style
  document.head.appendChild(styleTag)
}
