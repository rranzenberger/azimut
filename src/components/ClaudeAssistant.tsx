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
  // FASE 2: Detecção automática de perfil! 🎯
  // Temporariamente desabilitado até resolver erro
  const userProfile = {
    profile: 'unknown' as const,
    confidence: 0,
    interests: [],
    likelyBudget: 'unknown' as const,
    conversionProbability: 0,
    recommendedContent: []
  }
  // const userProfile = useUserProfileDetection(lang)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const content: Record<Lang, any> = {
    pt: {
      title: '💬 Assistente Azimut',
      subtitle: 'Estou aqui para ajudar!',
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      greeting: 'Olá! 👋 Sou o assistente virtual da Azimut. Como posso te ajudar hoje?',
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
      send: 'Send',
      greeting: 'Hello! 👋 I\'m Azimut\'s virtual assistant. How can I help you today?',
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
      send: 'Enviar',
      greeting: '¡Hola! 👋 Soy el asistente virtual de Azimut. ¿Cómo puedo ayudarte hoy?',
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
      send: 'Envoyer',
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
      
      // Log para analytics
      console.log(`🎯 Chatbot opened - Profile: ${userProfile.profile} (${userProfile.confidence}% confidence)`)
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
            }
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

      // Log AI usage for debugging
      if (data.aiModel) {
        console.log(`💬 AI Used: ${data.aiModel}`, {
          costSaved: data.costSaved,
          userProfile: userProfile.profile,
          confidence: userProfile.confidence
        })
      }

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
      console.error('Error sending message:', error)
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
          className="fixed bottom-[168px] right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-azimut-red to-red-700 shadow-2xl hover:shadow-azimut-red/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Open assistant"
        >
          <span className="text-3xl animate-bounce">💬</span>
          
          {/* Notification badge */}
          {!hasGreeted && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          )}

          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {t.subtitle}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[168px] right-6 z-50 w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden card-adaptive border border-white/10 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-azimut-red to-red-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{t.title}</h3>
                <p className="text-white/80 text-xs">{t.subtitle}</p>
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
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-xs opacity-60">
                      {msg.timestamp.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {/* FASE 2: Badge de IA 🎯 */}
                    {msg.role === 'assistant' && msg.aiModel && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        msg.aiModel === 'claude' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      }`}>
                        {msg.aiModel === 'claude' ? '🧠 Claude' : '⚡ DeepSeek'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions (show on first message) */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-white/60 text-xs text-center mb-2">
                  {lang === 'pt' ? 'Ou escolha uma opção:' : 'Or choose an option:'}
                </p>
                {t.examples.map((example: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(example)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="p-4 border-t border-white/10"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-azimut-red"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-azimut-red hover:bg-azimut-red/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-colors"
              >
                {t.send}
              </button>
            </div>
          </form>

          {/* Powered by */}
          <div className="px-4 py-2 text-center">
            <p className="text-white/40 text-xs">
              Powered by Claude AI • Azimut
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ClaudeAssistant
