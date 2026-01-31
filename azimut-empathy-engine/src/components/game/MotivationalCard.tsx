import { motion, AnimatePresence } from 'framer-motion'

export interface MotivationalCardProps {
  /** Frase já resolvida no idioma atual (text + emoji) */
  phrase: { text: string; emoji: string } | null
  visible: boolean
  accentColor?: string
  /** overlay = centralizado em cima dos cards (mobile); sidebar = na coluna lateral (desktop), card mais alto */
  variant?: 'overlay' | 'sidebar'
}

const cardStyle = (accentColor: string) => ({
  background: `linear-gradient(145deg, ${accentColor}18 0%, rgba(0,0,0,0.4) 100%)`,
  borderColor: `${accentColor}50`,
  boxShadow: `0 0 40px ${accentColor}25, 0 8px 32px rgba(0,0,0,0.3)`,
})

/**
 * Card motivacional: overlay no mobile (centro); na lateral no desktop (coluna dedicada), card mais alto.
 */
export default function MotivationalCard({ phrase, visible, accentColor = '#A855F7', variant = 'overlay' }: MotivationalCardProps) {
  const isSidebar = variant === 'sidebar'

  const cardContent = phrase && (
    <div
      className={`rounded-2xl text-center shadow-xl backdrop-blur-md border ${isSidebar ? 'px-5 py-8 min-h-[140px] flex flex-col items-center justify-center' : 'px-6 py-4 max-w-md'}`}
      style={cardStyle(accentColor)}
    >
      <span className={`block aria-hidden ${isSidebar ? 'text-4xl sm:text-5xl mb-4' : 'text-3xl mb-2'}`}>
        {phrase.emoji}
      </span>
      <p
        className={`m-0 font-medium text-white ${isSidebar ? 'text-sm sm:text-base leading-snug' : ''}`}
        style={{
          fontFamily: 'var(--font-display)',
          ...(isSidebar ? { letterSpacing: '0.02em' } : { fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', letterSpacing: '0.02em' }),
        }}
      >
        {phrase.text}
      </p>
    </div>
  )

  if (isSidebar) {
    return (
      <AnimatePresence>
        {visible && cardContent && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none w-full flex items-center justify-center"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {visible && phrase && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-10"
          style={{ padding: '0 1rem' }}
        >
          {cardContent}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
