import React from 'react'
import LangLink from './LangLink'
import type { Lang } from '../i18n'
import { useTheme } from '../contexts/ThemeContext'

interface PageFooterNavigationProps {
  lang: Lang
  // CTA Principal (opcional - pode ser omitido se não quiser)
  mainCta?: {
    title: string
    description: string
    buttonText: string
    buttonHref: string
  }
  // Navegação contextual (2 botões lado a lado)
  navigation: {
    previous?: {
      label: string
      href: string
      icon?: string
    }
    next?: {
      label: string
      href: string
      icon?: string
    }
  }
  // Tamanhos menores de fonte (especialmente para Academy)
  compact?: boolean
}

/**
 * Componente de Navegação Final de Página - Curado e Organizado
 * 
 * Layout:
 * - CTA Principal (opcional): Card grande com texto e botão
 * - Navegação Contextual: 2 botões lado a lado (anterior/seguinte ou relacionados)
 * 
 * Inspirado no padrão de Work (anterior/seguinte) mas adaptado para navegação entre páginas principais
 */
export const PageFooterNavigation: React.FC<PageFooterNavigationProps> = ({
  lang,
  mainCta,
  navigation,
  compact = false
}) => {
  const { theme } = useTheme()

  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* CTA Principal (opcional) - Estilo Hero Premium com Gradiente Sutil */}
        {mainCta && (
          <div className="mb-8 text-center">
            <div 
              className="relative mx-auto rounded-2xl border overflow-hidden p-8 md:p-12"
              style={{
                maxWidth: '100%',
                width: '100%',
                minHeight: '300px',
                border: '1px solid rgba(201, 35, 55, 0.4)',
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 50%, #0a0f1a 100%)'
                  : 'linear-gradient(135deg, rgba(42, 38, 34, 0.95) 0%, rgba(30, 28, 26, 0.9) 30%, rgba(26, 24, 21, 0.85) 60%, rgba(30, 28, 26, 0.9) 100%)',
                boxShadow: theme === 'dark' 
                  ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 24px rgba(201, 35, 55, 0.1)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px rgba(201, 35, 55, 0.08)'
              }}
            >
              {/* Overlay gradiente premium para profundidade (tema claro) */}
              <div 
                className="absolute inset-0"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(201, 35, 55, 0.05) 0%, transparent 30%, rgba(201, 35, 55, 0.03) 70%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.3) 100%)'
                }}
              />
              
              {/* Glow sutil vermelho (tema claro) */}
              {theme === 'light' && (
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(ellipse at center top, rgba(201, 35, 55, 0.15) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />
              )}
              
              {/* Conteúdo */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full">
                <h2 
                  className={`mb-4 font-handel uppercase tracking-[0.08em] ${compact ? 'text-5xl md:text-6xl' : 'text-2xl md:text-3xl'}`}
                  style={{ 
                    color: '#ffffff',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {mainCta.title}
                </h2>
                <p 
                  className={`mb-8 leading-relaxed max-w-3xl ${compact ? 'text-xl md:text-2xl' : 'text-lg'}`}
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {mainCta.description}
                </p>
                
                {/* Linha vermelha elegante (como hero) */}
                <div 
                  className="mb-8"
                  style={{ 
                    width: '100%',
                    maxWidth: '600px',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(201, 35, 55, 0.3) 15%, #c92337 30%, #e84858 50%, #c92337 70%, rgba(201, 35, 55, 0.3) 85%, transparent 100%)',
                    boxShadow: '0 0 12px rgba(201, 35, 55, 0.5), 0 0 20px rgba(232, 72, 88, 0.25)',
                    borderRadius: '2px'
                  }}
                />
                
                <LangLink
                  to={mainCta.buttonHref}
                  className={`group relative inline-flex items-center gap-3 rounded-xl bg-azimut-red font-sora font-bold uppercase tracking-wider text-white transition-all hover:bg-azimut-red/90 hover:scale-105 hover:shadow-[0_20px_50px_rgba(201,35,55,0.4)] ${compact ? 'px-12 py-6 text-xl' : 'px-10 py-5 text-lg'}`}
                >
                  {mainCta.buttonText}
                  <span className={`transition-transform group-hover:translate-x-1 ${compact ? 'text-2xl' : 'text-xl'}`}>→</span>
                </LangLink>
              </div>
            </div>
          </div>
        )}

        {/* Navegação Contextual - 2 Botões Lado a Lado - Padrão original (marrom como Studio) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Botão Anterior/Esquerda - Marrom semi-transparente como Studio */}
          {navigation.previous && (
            <LangLink
              to={navigation.previous.href}
              className="group flex flex-1 items-center justify-center gap-3 rounded-xl border px-8 py-5 font-sora text-base font-semibold uppercase tracking-[0.1em] transition-all hover:scale-105 backdrop-blur-sm"
              style={{ 
                borderColor: theme === 'dark' ? 'rgba(201, 35, 55, 0.4)' : 'rgba(201, 35, 55, 0.4)',
                backgroundColor: theme === 'dark' 
                  ? 'rgba(15, 23, 42, 0.5)'
                  : 'rgba(30, 28, 26, 0.3)',
                color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                boxShadow: theme === 'dark' 
                  ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                  : '0 4px 16px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c92337'
                e.currentTarget.style.backgroundColor = theme === 'dark' 
                  ? 'rgba(201, 35, 55, 0.15)'
                  : 'rgba(30, 28, 26, 0.5)'
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 8px 24px rgba(201, 35, 55, 0.3)'
                  : '0 8px 24px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(201, 35, 55, 0.4)' : 'rgba(201, 35, 55, 0.4)'
                e.currentTarget.style.backgroundColor = theme === 'dark' 
                  ? 'rgba(15, 23, 42, 0.5)'
                  : 'rgba(30, 28, 26, 0.3)'
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                  : '0 4px 16px rgba(0, 0, 0, 0.08)'
              }}
            >
              {navigation.previous.icon && navigation.previous.icon !== '←' ? (
                <span className="text-xl">{navigation.previous.icon}</span>
              ) : (
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              )}
              <span>{navigation.previous.label}</span>
            </LangLink>
          )}

          {/* Botão Seguinte/Direita - Vermelho padrão */}
          {navigation.next && (
            <LangLink
              to={navigation.next.href}
              className="group flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-azimut-red bg-azimut-red px-8 py-5 font-sora text-base font-semibold uppercase tracking-[0.1em] text-white transition-all hover:scale-105 hover:bg-azimut-red/90 hover:shadow-[0_8px_24px_rgba(201,35,55,0.4)]"
            >
              <span>{navigation.next.label}</span>
              {navigation.next.icon && <span className="text-xl">{navigation.next.icon}</span>}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </LangLink>
          )}
        </div>
        {/* Versão para debug de deploy */}
        <p className="mt-8 text-center text-[10px] text-white/20">site v2.1-31jan</p>
      </div>
    </section>
  )
}
