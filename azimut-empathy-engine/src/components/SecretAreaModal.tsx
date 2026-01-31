import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { getGameLang } from '../i18n'
import type { Lang } from '../i18n'
import type { SplashTranslations } from '../i18n/splash'
import { isSecretUnlocked, setSecretUnlocked } from '../utils/secretArea'

export { isSecretUnlocked, setSecretUnlocked }

export interface SecretAreaModalProps {
  isOpen: boolean
  onClose: () => void
  /** Traduções (getSplashTranslations(getGameLang())) */
  t: SplashTranslations
}

function getBasePath(lang: Lang): string {
  return lang === 'pt' ? '' : `/${lang}`
}

export default function SecretAreaModal({ isOpen, onClose, t }: SecretAreaModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handle = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handle)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handle)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const lang = getGameLang()
  const base = getBasePath(lang)

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-area-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl p-0 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(165deg, #1a0a0a 0%, #2d1f0a 35%, #1a1520 70%, #0d0a12 100%)',
              border: '1px solid rgba(255, 193, 7, 0.35)',
              boxShadow: '0 0 60px rgba(255, 193, 7, 0.15), 0 24px 48px rgba(0,0,0,0.5)',
            }}
          >
            {/* Barra superior com glow */}
            <div
              className="h-1 w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.6), rgba(255, 215, 0, 0.8), rgba(255, 193, 7, 0.6), transparent)',
                boxShadow: '0 0 20px rgba(255, 193, 7, 0.4)',
              }}
            />
            <div className="p-6">
              <h2
                id="secret-area-title"
                className="font-display text-2xl font-black tracking-tight mb-1"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                }}
              >
                ✦ {t.secretAreaTitle}
              </h2>
              <p className="text-sm text-amber-200/90 mb-4">{t.secretAreaUnlocked}</p>
              <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
                {t.secretAreaProjects}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`${base}/#curriculum`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2))',
                    border: '1px solid rgba(255, 193, 7, 0.5)',
                    color: '#FFD700',
                  }}
                >
                  {t.seeCurriculum}
                </a>
                <a
                  href={`${base}/#what-we-do`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2))',
                    border: '1px solid rgba(255, 193, 7, 0.5)',
                    color: '#FFD700',
                  }}
                >
                  {t.seeSolutions}
                </a>
                <a
                  href={`${base}/#work`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2))',
                    border: '1px solid rgba(255, 193, 7, 0.5)',
                    color: '#FFD700',
                  }}
                >
                  {t.seeProjects}
                </a>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 w-full py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {t.secretAreaClose}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null
}
