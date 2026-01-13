import React, { useState } from 'react'
import { type Lang } from '../i18n'

interface WhatsAppWidgetProps {
  lang: Lang
  phone?: string
  message?: string
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ 
  lang, 
  phone = '+5521999999999',
  message 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const content = {
    pt: {
      title: 'Fale conosco',
      subtitle: 'Resposta rápida via WhatsApp',
      button: 'Iniciar conversa',
      defaultMessage: 'Olá! Vim pelo site e gostaria de mais informações sobre',
      academy: '📚 Azimut Academy',
      projects: '🎬 Produção de Projetos',
      studio: '🎥 Estúdio e Equipamentos',
      other: '💡 Outros serviços',
    },
    en: {
      title: 'Contact us',
      subtitle: 'Quick response via WhatsApp',
      button: 'Start conversation',
      defaultMessage: 'Hello! I came from the website and would like more information about',
      academy: '📚 Azimut Academy',
      projects: '🎬 Project Production',
      studio: '🎥 Studio and Equipment',
      other: '💡 Other services',
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Respuesta rápida por WhatsApp',
      button: 'Iniciar conversación',
      defaultMessage: 'Hola! Vine del sitio web y me gustaría más información sobre',
      academy: '📚 Azimut Academy',
      projects: '🎬 Producción de Proyectos',
      studio: '🎥 Estudio y Equipos',
      other: '💡 Otros servicios',
    },
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Réponse rapide via WhatsApp',
      button: 'Démarrer la conversation',
      defaultMessage: 'Bonjour! Je viens du site et je souhaite plus d\'informations sur',
      academy: '📚 Azimut Academy',
      projects: '🎬 Production de Projets',
      studio: '🎥 Studio et Équipement',
      other: '💡 Autres services',
    },
  }

  const t = content[lang] || content.pt

  const openWhatsApp = (topic?: string) => {
    const baseMessage = message || t.defaultMessage
    const fullMessage = topic 
      ? `${baseMessage} ${topic}` 
      : baseMessage
    
    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[50] flex flex-col items-end gap-3">
      {/* Menu expandido */}
      {isExpanded && (
        <div className="animate-slide-up bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 w-72 border border-slate-200 dark:border-slate-700">
          <div className="mb-3">
            <h3 className="font-handel text-lg text-slate-900 dark:text-white mb-1">
              {t.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => openWhatsApp(t.academy)}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-azimut-red/10 dark:hover:bg-azimut-red/20 transition-colors duration-200 text-sm"
            >
              <span className="text-slate-900 dark:text-white">{t.academy}</span>
            </button>

            <button
              onClick={() => openWhatsApp(t.projects)}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-azimut-red/10 dark:hover:bg-azimut-red/20 transition-colors duration-200 text-sm"
            >
              <span className="text-slate-900 dark:text-white">{t.projects}</span>
            </button>

            <button
              onClick={() => openWhatsApp(t.studio)}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-azimut-red/10 dark:hover:bg-azimut-red/20 transition-colors duration-200 text-sm"
            >
              <span className="text-slate-900 dark:text-white">{t.studio}</span>
            </button>

            <button
              onClick={() => openWhatsApp(t.other)}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-azimut-red/10 dark:hover:bg-azimut-red/20 transition-colors duration-200 text-sm"
            >
              <span className="text-slate-900 dark:text-white">{t.other}</span>
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className="mt-3 w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            ✕ Fechar
          </button>
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative bg-[#25D366] hover:bg-[#20BA59] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        
        {/* WhatsApp icon */}
        <svg
          className="w-8 h-8 relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>
    </div>
  )
}

export default WhatsAppWidget
