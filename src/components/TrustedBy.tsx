import React from 'react'
import { type Lang } from '../i18n'

interface TrustedByProps {
  lang: Lang
}

// Clientes e parceiros reais da Azimut. Quando houver logos (PNG/SVG transparente),
// trocar os spans por <img> mantendo o mesmo carrossel.
const NAMES = [
  'Prefeitura do Rio',
  'Rio Museu Olímpico',
  'Festival de Gramado',
  'Autodesk',
  'TV Globo',
  'YDreams',
  'Hoplon',
  'XRBR',
  'SENAC',
  'Flamengo',
  'VFS · Vancouver Film School',
  'VanArts',
]

const TITLE: Record<Lang, string> = {
  pt: 'Confiam na Azimut',
  en: 'Trusted by',
  es: 'Confían en Azimut',
  fr: 'Ils nous font confiance',
}

const TrustedBy: React.FC<TrustedByProps> = ({ lang }) => {
  // Duplicar a lista para o loop infinito do carrossel
  const loop = [...NAMES, ...NAMES]
  return (
    <section aria-label={TITLE[lang]} className="relative py-10 md:py-14 overflow-hidden">
      <p className="mb-6 text-center font-sora text-[0.65rem] md:text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--theme-text-muted)' }}>
        {TITLE[lang]}
      </p>
      <div className="trustedby-mask relative">
        <div className="trustedby-track flex items-center gap-10 md:gap-14 whitespace-nowrap">
          {loop.map((name, i) => (
            <span
              key={i}
              className="font-handel text-sm md:text-base uppercase tracking-[0.18em] opacity-50 hover:opacity-100 transition-opacity shrink-0"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .trustedby-mask {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .trustedby-track {
          width: max-content;
          animation: trustedby-scroll 45s linear infinite;
        }
        .trustedby-mask:hover .trustedby-track { animation-play-state: paused; }
        @keyframes trustedby-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trustedby-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default TrustedBy
