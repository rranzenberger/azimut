'use client';

import { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3001/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  lang?: 'pt' | 'en' | 'es' | 'fr';
}

export default function Chatbot({ lang = 'pt' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: lang === 'pt' 
        ? 'Olá! Sou o assistente virtual da Azimut. Como posso ajudar você hoje?'
        : lang === 'en'
        ? "Hello! I'm Azimut's virtual assistant. How can I help you today?"
        : lang === 'es'
        ? '¡Hola! Soy el asistente virtual de Azimut. ¿Cómo puedo ayudarte hoy?'
        : "Bonjour! Je suis l'assistant virtuel d'Azimut. Comment puis-je vous aider?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          lang,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: lang === 'pt'
          ? 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
          : 'Sorry, an error occurred. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickQuestions = [
    { pt: 'Quais serviços vocês oferecem?', en: 'What services do you offer?', es: '¿Qué servicios ofrecen?', fr: 'Quels services offrez-vous?' },
    { pt: 'Trabalham com museus?', en: 'Do you work with museums?', es: '¿Trabajan con museos?', fr: 'Travaillez-vous avec des musées?' },
    { pt: 'Como funciona a Lei Rouanet?', en: 'How does Rouanet Law work?', es: '¿Cómo funciona la Ley Rouanet?', fr: 'Comment fonctionne la loi Rouanet?' },
    { pt: 'Ver projetos realizados', en: 'See completed projects', es: 'Ver proyectos realizados', fr: 'Voir les projets réalisés' },
  ];

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#c92337',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(201, 35, 55, 0.4)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Abrir chat"
      >
        💬
      </button>

      {/* Janela do Chat */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '600px',
            maxHeight: 'calc(100vh - 140px)',
            background: '#1a1f2e',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              background: '#c92337',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                {lang === 'pt' ? 'Assistente Azimut' : lang === 'en' ? 'Azimut Assistant' : lang === 'es' ? 'Asistente Azimut' : "Assistant Azimut"}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                {lang === 'pt' ? 'Como posso ajudar?' : lang === 'en' ? 'How can I help?' : lang === 'es' ? '¿Cómo puedo ayudar?' : 'Comment puis-je aider?'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '4px',
              }}
              aria-label="Fechar chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: message.role === 'user' 
                      ? '#c92337' 
                      : 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  {lang === 'pt' ? 'Digitando...' : lang === 'en' ? 'Typing...' : lang === 'es' ? 'Escribiendo...' : 'Tapez...'}
                  <span style={{ marginLeft: '8px' }}>⏳</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#9ca3af' }}>
                {lang === 'pt' ? 'Perguntas rápidas:' : lang === 'en' ? 'Quick questions:' : lang === 'es' ? 'Preguntas rápidas:' : 'Questions rapides:'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {quickQuestions.slice(0, 2).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q[lang] || q.pt)}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(201, 35, 55, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    {q[lang] || q.pt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'pt' ? 'Digite sua mensagem...' : lang === 'en' ? 'Type your message...' : lang === 'es' ? 'Escribe tu mensaje...' : 'Tapez votre message...'}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  padding: '12px 20px',
                  background: isLoading || !input.trim() ? 'rgba(201, 35, 55, 0.5)' : '#c92337',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                {lang === 'pt' ? 'Enviar' : lang === 'en' ? 'Send' : lang === 'es' ? 'Enviar' : 'Envoyer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

