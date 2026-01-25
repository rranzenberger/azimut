// ════════════════════════════════════════════════════════════
// SEARCH MODAL - Sistema de Busca Premium
// ════════════════════════════════════════════════════════════
// Componente isolado - não mexe em rotas ou páginas existentes
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LangLink from './LangLink'
import { type Lang } from '../i18n'
import { useSearch } from '../hooks/useSearch'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  theme?: 'dark' | 'light'
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  lang,
  theme = 'dark' 
}) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { results, loading } = useSearch(query, lang)

  // Focar no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // Navegação com teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelectResult(results[selectedIndex])
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, results, selectedIndex])

  const handleSelectResult = (result: any) => {
    navigate(result.path)
    onClose()
    setQuery('')
    setSelectedIndex(0)
  }

  if (!isOpen) return null

  const translations = {
    pt: {
      placeholder: 'Buscar projetos, serviços, páginas...',
      noResults: 'Nenhum resultado encontrado',
      projects: 'Projetos',
      services: 'Serviços',
      pages: 'Páginas',
      blog: 'Blog'
    },
    en: {
      placeholder: 'Search projects, services, pages...',
      noResults: 'No results found',
      projects: 'Projects',
      services: 'Services',
      pages: 'Pages',
      blog: 'Blog'
    },
    es: {
      placeholder: 'Buscar proyectos, servicios, páginas...',
      noResults: 'No se encontraron resultados',
      projects: 'Proyectos',
      services: 'Servicios',
      pages: 'Páginas',
      blog: 'Blog'
    },
    fr: {
      placeholder: 'Rechercher projets, services, pages...',
      noResults: 'Aucun résultat trouvé',
      projects: 'Projets',
      services: 'Services',
      pages: 'Pages',
      blog: 'Blog'
    }
  }

  const t = translations[lang]

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-x-4 top-20 z-[9999] mx-auto max-w-2xl"
        style={{
          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          borderRadius: '16px',
          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: theme === 'dark' 
            ? '0 20px 60px rgba(0,0,0,0.5)' 
            : '0 20px 60px rgba(0,0,0,0.15)',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="p-4 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3">
            <svg 
              className="w-5 h-5 shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent outline-none"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#1e293b',
                fontSize: '1rem'
              }}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus()
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                aria-label="Clear"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="p-8 text-center" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              {lang === 'pt' ? 'Buscando...' : lang === 'es' ? 'Buscando...' : lang === 'fr' ? 'Recherche...' : 'Searching...'}
            </div>
          ) : query && results.length === 0 ? (
            <div className="p-8 text-center" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              {t.noResults}
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((result, index) => (
                <LangLink
                  key={result.path}
                  to={result.path}
                  onClick={() => {
                    onClose()
                    setQuery('')
                    setSelectedIndex(0)
                  }}
                  className="block p-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: selectedIndex === index
                      ? (theme === 'dark' ? 'rgba(201, 35, 55, 0.15)' : 'rgba(201, 35, 55, 0.1)')
                      : 'transparent',
                    color: theme === 'dark' ? '#cbd5e1' : '#1e293b',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-1.5 rounded shrink-0"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                      }}
                    >
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{result.title}</div>
                      {result.description && (
                        <div 
                          className="text-sm mt-1 line-clamp-2"
                          style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}
                        >
                          {result.description}
                        </div>
                      )}
                      <div 
                        className="text-xs mt-1"
                        style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}
                      >
                        {result.category}
                      </div>
                    </div>
                  </div>
                </LangLink>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className="p-3 border-t text-xs text-center"
          style={{ 
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: theme === 'dark' ? '#64748b' : '#94a3b8'
          }}
        >
          {lang === 'pt' 
            ? 'Use ↑↓ para navegar, Enter para selecionar, Esc para fechar'
            : lang === 'es'
            ? 'Use ↑↓ para navegar, Enter para seleccionar, Esc para cerrar'
            : lang === 'fr'
            ? 'Utilisez ↑↓ pour naviguer, Entrée pour sélectionner, Esc pour fermer'
            : 'Use ↑↓ to navigate, Enter to select, Esc to close'}
        </div>
      </div>
    </>
  )
}

export default SearchModal
