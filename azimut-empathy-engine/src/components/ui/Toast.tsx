import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ToastProps {
  message: string
  variant?: 'success' | 'error' | 'info'
  visible: boolean
  onClose: () => void
  duration?: number
}

const variantClass = {
  success: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
  error: 'bg-red-500/20 border-red-400/40 text-red-200',
  info: 'bg-bg-mid border-white/20 text-[var(--text-secondary)]',
}

export default function Toast({
  message,
  variant = 'info',
  visible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!visible || duration <= 0) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [visible, duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl border backdrop-blur-sm shadow-lg ${variantClass[variant]}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
