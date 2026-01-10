// ════════════════════════════════════════════════════════════
// AI WRITING ASSISTANT - Backoffice Helper
// ════════════════════════════════════════════════════════════
// Ajuda admin a escrever descrições, títulos, tags, etc.
// Usa DeepSeek (barato!) para sugestões rápidas
// ════════════════════════════════════════════════════════════

'use client'

import { useState } from 'react'

interface AIWritingAssistantProps {
  fieldName: string
  currentValue: string
  lang?: 'pt' | 'en' | 'es' | 'fr'
  type?: 'title' | 'description' | 'summary' | 'tags'
  onSuggestion: (suggestion: string) => void
}

export default function AIWritingAssistant({
  fieldName,
  currentValue,
  lang = 'pt',
  type = 'description',
  onSuggestion
}: AIWritingAssistantProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const generateSuggestions = async () => {
    setIsLoading(true)
    setShowSuggestions(true)

    try {
      // Chamar DeepSeek para gerar sugestões
      const response = await fetch('/api/ai/writing-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldName,
          currentValue,
          lang,
          type
        })
      })

      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('AI Writing Assistant error:', error)
      setSuggestions([
        'Erro ao gerar sugestões. Tente novamente.',
        'Se persistir, contate o suporte.'
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const applySuggestion = (suggestion: string) => {
    onSuggestion(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      {/* AI Button */}
      <button
        type="button"
        onClick={generateSuggestions}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
        title="AI Writing Assistant"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Gerando...</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>✨ IA</span>
          </>
        )}
      </button>

      {/* Suggestions Panel */}
      {showSuggestions && (
        <div className="absolute z-50 mt-2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span>✨</span>
              Sugestões da IA
            </h4>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => applySuggestion(suggestion)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
                    <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {suggestion}
                    </p>
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Powered by DeepSeek AI • Você pode editar as sugestões antes de aplicar
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
