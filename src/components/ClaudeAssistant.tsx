// ════════════════════════════════════════════════════════════
// CLAUDE ASSISTANT - CHATBOT IA DE ALTA PERFORMANCE
// ════════════════════════════════════════════════════════════
// Assistente virtual inteligente que:
// - Qualifica leads automaticamente
// - Recomenda projetos/serviços
// - Agenda consultas
// - Responde perguntas em PT/EN/ES/FR
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'
import { type Lang } from '../i18n'
import { useUserProfileDetection, getUserInsights, trackInteraction } from '../hooks/useUserProfileDetection'
// 🆕 FASE 2: Detecção de Intenção para personalizar assistente
import { useIntentionDetection } from '../hooks/useIntentionDetection'
import { logger } from '@/utils/logger'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  aiModel?: 'claude' | 'deepseek'
}

interface ClaudeAssistantProps {
  lang: Lang
}

const ClaudeAssistant: React.FC<ClaudeAssistantProps> = ({ lang }) => {
  // ✅ FASE 2: Detecção automática de perfil! 🎯
  // REATIVADO - Sistema robusto implementado, não causa erro #310
  const userProfile = useUserProfileDetection(lang)
  // 🆕 FASE 2: Detecção de Intenção para personalizar respostas
  const { intention } = useIntentionDetection()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Detectar tema (dark/light)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(currentTheme === 'light' ? 'light' : 'dark')
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
      setTheme(newTheme === 'light' ? 'light' : 'dark')
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => observer.disconnect()
  }, [])

  // 🆕 Personalizar saudação baseada em intenção detectada
  const getPersonalizedGreeting = (): string => {
    if (intention && intention.confidence > 0.7) {
      if (intention.intention === 'interested_in_museums') {
        return lang === 'pt' 
          ? 'Olá! 👋 Vejo que você tem interesse em museus e exposições. Como posso ajudar com seu projeto cultural?'
          : lang === 'en'
          ? 'Hello! 👋 I see you\'re interested in museums and exhibitions. How can I help with your cultural project?'
          : lang === 'es'
          ? '¡Hola! 👋 Veo que tienes interés en museos y exposiciones. ¿Cómo puedo ayudar con tu proyecto cultural?'
          : 'Bonjour! 👋 Je vois que vous vous intéressez aux musées et expositions. Comment puis-je vous aider avec votre projet culturel?'
      } else if (intention.intention === 'interested_in_vr') {
        return lang === 'pt'
          ? 'Olá! 👋 Vejo que você tem interesse em VR e realidade virtual. Que tipo de experiência imersiva você busca?'
          : lang === 'en'
          ? 'Hello! 👋 I see you\'re interested in VR and virtual reality. What kind of immersive experience are you looking for?'
          : lang === 'es'
          ? '¡Hola! 👋 Veo que tienes interés en VR y realidad virtual. ¿Qué tipo de experiencia inmersiva buscas?'
          : 'Bonjour! 👋 Je vois que vous vous intéressez à la VR et à la réalité virtuelle. Quel type d\'expérience immersive recherchez-vous?'
      } else if (intention.intention === 'hot_lead') {
        return lang === 'pt'
          ? 'Olá! 👋 Vejo que você está explorando bastante nosso trabalho. Vamos conversar sobre seu projeto?'
          : lang === 'en'
          ? 'Hello! 👋 I see you\'ve been exploring our work. Shall we talk about your project?'
          : lang === 'es'
          ? '¡Hola! 👋 Veo que has estado explorando nuestro trabajo. ¿Hablemos de tu proyecto?'
          : 'Bonjour! 👋 Je vois que vous avez exploré notre travail. Parlons de votre projet?'
      }
    }
    // Saudação padrão
    return lang === 'pt'
      ? 'Olá! 👋 Sou o assistente virtual da Azimut. Como posso te ajudar hoje?'
      : lang === 'en'
      ? 'Hello! 👋 I\'m Azimut\'s virtual assistant. How can I help you today?'
      : lang === 'es'
      ? '¡Hola! 👋 Soy el asistente virtual de Azimut. ¿Cómo puedo ayudarte hoy?'
      : 'Bonjour! 👋 Je suis l\'assistant virtuel d\'Azimut. Comment puis-je vous aider?'
  }

  const content: Record<Lang, any> = {
    pt: {
      title: '💬 Assistente Azimut',
      subtitle: 'Estou aqui para ajudar!',
      placeholder: 'Digite sua mensagem...',
      send: '✓',
      greeting: getPersonalizedGreeting(),
      examples: [
        '💼 Quero criar um projeto',
        '🎓 Estudar em Vancouver',
        '💰 Solicitar orçamento',
        '❓ Tenho uma dúvida'
      ]
    },
    en: {
      title: '💬 Azimut Assistant',
      subtitle: 'I\'m here to help!',
      placeholder: 'Type your message...',
      send: '✓',
      greeting: getPersonalizedGreeting(),
      examples: [
        '💼 Start a project',
        '🎓 Study in Vancouver',
        '💰 Request a quote',
        '❓ I have a question'
      ]
    },
    es: {
      title: '💬 Asistente Azimut',
      subtitle: '¡Estoy aquí para ayudar!',
      placeholder: 'Escribe tu mensaje...',
      send: '✓',
      greeting: getPersonalizedGreeting(),
      examples: [
        '💼 Crear un proyecto',
        '🎓 Estudiar en Vancouver',
        '💰 Solicitar presupuesto',
        '❓ Tengo una pregunta'
      ]
    },
    fr: {
      title: '💬 Assistant Azimut',
      subtitle: 'Je suis là pour vous aider!',
      placeholder: 'Tapez votre message...',
      send: '✓',
      greeting: 'Bonjour! 👋 Je suis l\'assistant virtuel d\'Azimut. Comment puis-je vous aider aujourd\'hui?',
      examples: [
        '💼 Créer un projet',
        '🎓 Étudier à Vancouver',
        '💰 Demander un devis',
        '❓ J\'ai une question'
      ]
    }
  }

  const t = content[lang] || content.pt

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // FASE 2: Greeting PERSONALIZADA baseada no perfil! 🎯
  useEffect(() => {
    if (isOpen && !hasGreeted && messages.length === 0) {
      // Pegar insights personalizados
      const insights = getUserInsights(userProfile, lang)
      const personalizedGreeting = `${t.greeting}\n\n${insights[0]}`
      
      setMessages([{
        role: 'assistant',
        content: personalizedGreeting,
        timestamp: new Date()
      }])
      setHasGreeted(true)
      
    }
  }, [isOpen, hasGreeted, messages.length, t.greeting, userProfile, lang])

  // Exit intent detection (show assistant when user tries to leave)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen && !hasGreeted) {
        setTimeout(() => setIsOpen(true), 500)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [isOpen, hasGreeted])

  // Auto-open after 15 seconds
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 15000)
      return () => clearTimeout(timer)
    }
  }, [hasGreeted])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    // Track interaction (FASE 2)
    trackInteraction('click', 'chatbot_send_message')

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // FASE 2: Enviar contexto de perfil completo! 🎯
      const response = await fetch('/api/chat/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          lang,
          context: {
            page: window.location.pathname,
            previousMessages: messages.slice(-5), // Last 5 messages for context
            // FASE 2: Dados de perfil!
            userProfile: {
              type: userProfile.profile,
              confidence: userProfile.confidence,
              interests: userProfile.interests,
              budget: userProfile.likelyBudget,
              conversionProb: userProfile.conversionProbability
            },
            // 🆕 FASE 2: Intenção detectada para personalizar respostas
            detectedIntention: intention ? {
              intention: intention.intention,
              confidence: intention.confidence,
              visitorType: intention.visitorType,
              recommendedCategory: intention.recommendedCategory,
              personalizedCTA: intention.personalizedCTA
            } : null
          }
        })
      })

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        aiModel: data.aiModel || 'deepseek' // FASE 2: Badge de IA
      }
      setMessages(prev => [...prev, assistantMessage])

      // If lead data was captured, save it
      if (data.leadData) {
        await fetch('/api/leads/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data.leadData,
            source: 'claude_assistant',
            userProfile: userProfile.profile,
            chatTranscript: [...messages, userMessage, assistantMessage]
          })
        })
      }
    } catch (error) {
      logger.error(error instanceof Error ? error : new Error(String(error)), { 
        action: 'sendMessage',
        component: 'ClaudeAssistant'
      })
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: lang === 'pt' 
          ? 'Desculpe, houve um erro. Por favor, tente novamente ou entre em contato conosco diretamente.' 
          : 'Sorry, there was an error. Please try again or contact us directly.',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    sendMessage(action)
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[51] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-azimut-red to-red-700 shadow-2xl hover:shadow-azimut-red/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Open assistant"
        >
          <span className="text-3xl animate-bounce">💬</span>
          
          {/* Notification badge */}
          {!hasGreeted && (
            <span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 animate-pulse" 
              style={{ borderColor: theme === 'light' ? '#f5f1e8' : '#ffffff' }}
            />
          )}

          {/* Tooltip - Adaptativo ao tema */}
          <div 
            className={`absolute right-full mr-3 px-4 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
              theme === 'dark' 
                ? 'bg-gray-900 text-white' 
                : 'bg-[#1e1c1a] text-[#f5f1e8]'
            }`}
          >
            {t.subtitle}
          </div>
        </button>
      )}

      {/* Chat Window - Premium: fundo distinto do site (escuro=slate, claro=bege suave) */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[51] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[50vh] sm:h-[500px] max-h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border animate-fade-in shadow-lg"
          style={{
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ece8e0', // Azul slate-800 (como estava antes)
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#d4cfc4',
            borderWidth: '1px'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-azimut-red to-red-700 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-bold text-xs leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</h3>
                <p className="text-white/80 text-[10px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              aria-label="Close assistant"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-azimut-red text-white'
                      : theme === 'dark'
                        ? 'text-white'
                        : 'text-[#1e1c1a] border'
                  }`}
                  style={msg.role === 'user' ? undefined : theme === 'dark' 
                    ? { background: 'rgba(255,255,255,0.14)', border: 'none' } // Como estava antes
                    : { background: '#fefcf8', borderColor: '#e2ddd4' } // Mais claro no tema claro
                  }
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className={`text-xs ${theme === 'dark' ? 'text-white/65' : 'text-slate-500'}`}>
                      {msg.timestamp.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {/* FASE 2: Badge de IA 🎯 - Adaptativo ao tema */}
                    {msg.role === 'assistant' && msg.aiModel && (
                      <span 
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          msg.aiModel === 'claude' 
                            ? theme === 'dark'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                              : 'bg-purple-100 text-purple-700 border border-purple-300'
                            : theme === 'dark'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                              : 'bg-blue-100 text-blue-700 border border-blue-300'
                        }`}
                      >
                        {msg.aiModel === 'claude' ? '🧠 Claude' : '⚡ DeepSeek'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className={`rounded-2xl px-4 py-3 ${theme === 'dark' ? '' : 'border'}`}
                  style={theme === 'dark' 
                    ? { background: 'rgba(255,255,255,0.10)' } // Como estava antes
                    : { background: '#fefcf8', borderColor: '#e2ddd4' } // Mais claro no tema claro
                  }
                >
                  <div className="flex gap-2">
                    <span className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-white/60' : 'bg-azimut-red'}`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-white/60' : 'bg-azimut-red'}`} style={{ animationDelay: '150ms' }} />
                    <span className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-white/60' : 'bg-azimut-red'}`} style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions (show on first message) - Pills mais claras que o fundo */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className={`text-xs text-center mb-2 font-medium ${theme === 'dark' ? 'text-white/75' : 'text-slate-700'}`}>
                  {lang === 'pt' ? 'Ou escolha uma opção:' : 'Or choose an option:'}
                </p>
                {t.examples.map((example: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(example)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'
                    }`}
                    style={theme === 'dark' 
                      ? { background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.1)' } // Como estava antes
                      : { background: '#fefcf8', border: '1px solid #e2ddd4' } // Mais claro no tema claro
                    }
                    onMouseEnter={(e) => {
                      if (theme === 'dark') {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                      } else {
                        e.currentTarget.style.background = '#fefcf8'
                        e.currentTarget.style.borderColor = 'rgba(201,35,55,0.35)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (theme === 'dark') {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.13)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      } else {
                        e.currentTarget.style.background = '#fefcf8'
                        e.currentTarget.style.borderColor = '#e2ddd4'
                      }
                    }}
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input - área mais clara que o fundo (premium) */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="p-4 border-t"
            style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#d4cfc4' }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-azimut-red focus:ring-offset-0 ${theme === 'dark' ? 'placeholder-white/50' : 'placeholder-slate-500'}`}
                style={theme === 'dark' 
                  ? { background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } // Como estava antes
                  : { background: '#fefcf8', color: '#1e1c1a', border: '1px solid #e2ddd4' } // Mais claro no tema claro
                }
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 flex items-center justify-center bg-azimut-red hover:bg-azimut-red/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white text-xl font-bold transition-colors flex-shrink-0"
                title={t.send === '✓' ? (lang === 'pt' ? 'Enviar' : lang === 'es' ? 'Enviar' : lang === 'fr' ? 'Envoyer' : 'Send') : t.send}
              >
                {t.send}
              </button>
            </div>
          </form>

          {/* Powered by */}
          <div className="px-4 py-2 text-center">
            <p className={`text-xs ${theme === 'dark' ? 'text-white/45' : 'text-slate-500'}`}>
              Powered by Claude AI • Azimut
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ClaudeAssistant
