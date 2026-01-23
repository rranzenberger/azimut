import React from 'react'
import LangLink from './LangLink'
import type { Lang } from '../i18n'

interface PageNavigationCTAsProps {
  lang: Lang
  primary: {
    label: string
    href: string
    icon?: string
  }
  secondary: {
    label: string
    href: string
    icon?: string
  }
}

/**
 * Componente de CTAs de Navegação
 * 100% isolado - não depende de backoffice
 * Adicionado no final de cada página para melhorar navegação mobile
 */
export const PageNavigationCTAs: React.FC<PageNavigationCTAsProps> = ({
  lang,
  primary,
  secondary
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Botão Primário */}
          <LangLink
            to={primary.href}
            className="group relative flex items-center justify-center gap-3 rounded-xl border-2 border-azimut-red bg-azimut-red px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(201,35,55,0.4)]"
          >
            {primary.icon && <span className="text-xl">{primary.icon}</span>}
            <span>{primary.label}</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LangLink>

          {/* Botão Secundário */}
          <LangLink
            to={secondary.href}
            className="group flex items-center justify-center gap-3 rounded-xl border-2 border-azimut-red/60 bg-transparent px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-azimut-red transition-all duration-300 hover:border-azimut-red hover:bg-azimut-red/10"
          >
            {secondary.icon && <span className="text-xl">{secondary.icon}</span>}
            <span>{secondary.label}</span>
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </LangLink>
        </div>
      </div>
    </section>
  )
}
