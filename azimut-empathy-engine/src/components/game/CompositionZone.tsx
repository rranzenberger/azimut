import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import type { GameElement } from '../../types/game.types'
import type { Combo } from '../../types/game.types'
import ComboRays from './ComboRays'

export interface CompositionZoneProps {
  id: string
  selected: GameElement[]
  combos?: Combo[]
  onRemove?: (id: string) => void
  /** Power-up Trocar carta: true = clicar em carta devolve ao pool */
  isSwapMode?: boolean
  /** Sai do modo Trocar carta */
  onClearSwapMode?: () => void
  /** Mostrar glow vermelho (erro: soltou fora da zona) */
  showDropError?: boolean
  children?: React.ReactNode
}

export default function CompositionZone({
  id,
  selected,
  combos = [],
  onRemove,
  isSwapMode = false,
  onClearSwapMode,
  showDropError = false,
  translations,
  children,
}: CompositionZoneProps) {
  const t = translations ?? defaultTranslations
  const { setNodeRef, isOver } = useDroppable({ id, data: { type: 'composition' } })

  const hasItems = selected.length > 0
  const hasCombos = combos.length > 0

  const isError = showDropError && !isOver

  return (
    <motion.div
      ref={setNodeRef}
      className="relative overflow-hidden min-h-[88px] sm:min-h-[100px] md:min-h-[120px]"
      style={{
        borderRadius: 12,
        padding: 2,
        background: isError
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(239, 68, 68, 0.15) 50%, rgba(239, 68, 68, 0.35) 100%)'
          : isOver 
          ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(0, 245, 255, 0.4) 100%)'
          : hasCombos
          ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(168, 85, 247, 0.3) 100%)'
          : hasItems
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.06) 100%)',
        boxShadow: isError
          ? '0 0 40px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.15)'
          : isOver 
          ? '0 0 60px rgba(0, 245, 255, 0.3), 0 0 25px rgba(57, 255, 20, 0.2), inset 0 0 30px rgba(0, 245, 255, 0.1)'
          : hasCombos
          ? '0 0 40px rgba(168, 85, 247, 0.25), 0 0 25px rgba(57, 255, 20, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 0 20px rgba(168, 85, 247, 0.2), 0 0 25px rgba(57, 255, 20, 0.12), 0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      animate={isOver ? { scale: 1.01 } : isError ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Inner container — padding responsivo para mobile */}
      <div
        className="rounded-[10px] sm:rounded-[14px] px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 min-h-[64px] sm:min-h-[72px]"
        style={{
          background: 'linear-gradient(145deg, rgba(13, 16, 21, 0.95) 0%, rgba(8, 10, 14, 0.98) 100%)',
          position: 'relative',
        }}
      >
        <ComboRays active={hasCombos} />
        
        {/* Header compacto */}
        <div className="relative z-10 mb-1 sm:mb-2">
          <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
            <h3 className="font-display font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px]"
              style={{ color: isOver ? '#00F5FF' : hasCombos ? '#A855F7' : '#9CA3AF' }}
            >
              <span className="text-xs sm:text-sm">{isOver ? '✨' : hasCombos ? '🔮' : '🎯'}</span>
              {t.compositionZoneTitle}
            </h3>
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] font-semibold shrink-0"
              style={{
                background: hasItems ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: hasItems ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: hasItems ? '#22C55E' : '#6B7280',
              }}
            >
              {selected.length} {t.elementsLabel}
            </span>
          </div>
          <p className="text-[9px] sm:text-[11px] text-gray-500 m-0 leading-tight">
            {isSwapMode
              ? t.swapModeHint
              : isOver 
              ? t.dropHereHint
              : hasItems 
              ? t.continueAddingHint
              : t.dragTechnologiesHint
            }
          </p>
        </div>

        {/* Items Grid */}
        <div className="relative z-10">
          {selected.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-2 px-2 sm:py-3 sm:px-3 rounded-lg border-2 border-dashed border-white/10 bg-white/[0.02] min-h-[52px] sm:min-h-[64px]">
              <span className="text-lg sm:text-2xl mb-0.5 sm:mb-1.5 opacity-50">🎴</span>
              <span className="text-[9px] sm:text-[11px] text-gray-500 text-center">
                {t.dragCards}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
              {selected.map((el) => {
                const catIcon: Record<string, string> = {
                  'XR/VR': '🥽', 'Cinema': '🎬', 'Eventos': '🎪', 'Academy': '🎓', 'Cultura': '🏛️',
                  'Tech': '⚡', 'Marketing': '📣', 'Produção': '🎥', 'Web3': '🔗', 'VFX': '✨', 'IA': '🤖', 'Games': '🎮',
                }
                const icon = el.icon || catIcon[el.category] || '✨'
                const handleRemove = () => {
                  onRemove?.(el.id)
                  if (isSwapMode) onClearSwapMode?.()
                }
                return (
                <motion.div
                  key={el.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 md:px-2.5 md:py-2 rounded-md sm:rounded-lg min-w-0"
                  style={{
                    background: isSwapMode ? 'linear-gradient(145deg, rgba(59, 130, 246, 0.15) 0%, rgba(20, 23, 31, 0.95) 100%)' : 'linear-gradient(145deg, rgba(28, 32, 40, 0.9) 0%, rgba(20, 23, 31, 0.95) 100%)',
                    border: isSwapMode ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    cursor: isSwapMode ? 'pointer' : undefined,
                  }}
                  onClick={isSwapMode ? handleRemove : undefined}
                  role={isSwapMode ? 'button' : undefined}
                  aria-label={isSwapMode ? t.returnToPoolAria.replace('{name}', el.name) : undefined}
                >
                  <span className="text-[10px] sm:text-sm flex-shrink-0 leading-none">
                    {el.category === 'XR/VR' ? '🥽' : 
                     el.category === 'Cinema' ? '🎬' : 
                     el.category === 'Eventos' ? '🎪' : 
                     el.category === 'Academy' ? '🎓' : 
                     el.category === 'Cultura' ? '🏛️' : '✨'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-semibold uppercase tracking-wide text-[9px] sm:text-[11px] md:text-xs text-white truncate"
                      style={{ fontFamily: 'var(--font-display)' }}>
                      {el.name}
                    </div>
                    <div className="font-data text-[8px] sm:text-[10px] font-semibold text-amber-400"
                      style={{ fontFamily: 'var(--font-data)', color: '#FFD700' }}>
                      +{el.points} pts
                    </div>
                  </div>
                  {onRemove && !isSwapMode && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onRemove(el.id) }}
                      className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-xs sm:text-sm font-bold transition-colors bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/40"
                      aria-label={t.removeAria.replace('{name}', el.name)}
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              )
              })}
            </div>
          )}
        </div>

        {children}
      </div>
    </motion.div>
  )
}
