/**
 * GameFooter — Rodapé global do jogo
 * Aparece em todas as telas para manter consistência
 */

import { getGameLang, getSplashTranslations } from '../../i18n'

export default function GameFooter() {
  const lang = getGameLang()
  const t = getSplashTranslations(lang)

  return (
    <footer 
      className="relative z-50 text-center py-1 flex-shrink-0 w-full"
      style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(5, 5, 8, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <p className="text-[9px] sm:text-[10px] font-medium" style={{ color: '#9CA3AF' }}>
        {t.footer}
      </p>
    </footer>
  )
}
