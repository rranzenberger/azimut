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
  children?: React.ReactNode
}

export default function CompositionZone({
  id,
  selected,
  combos = [],
  onRemove,
  children,
}: CompositionZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id, data: { type: 'composition' } })

  const hasItems = selected.length > 0
  const hasCombos = combos.length > 0

  return (
    <motion.div
      ref={setNodeRef}
      className="relative overflow-hidden"
      style={{
        minHeight: 180,
        borderRadius: 20,
        padding: 2,
        background: isOver 
          ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(0, 245, 255, 0.4) 100%)'
          : hasCombos
          ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(168, 85, 247, 0.3) 100%)'
          : hasItems
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.06) 100%)',
        boxShadow: isOver 
          ? '0 0 60px rgba(0, 245, 255, 0.3), inset 0 0 30px rgba(0, 245, 255, 0.1)'
          : hasCombos
          ? '0 0 40px rgba(168, 85, 247, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      animate={isOver ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Inner container */}
      <div
        style={{
          borderRadius: 18,
          padding: '20px 24px',
          minHeight: 176,
          background: 'linear-gradient(145deg, rgba(13, 16, 21, 0.95) 0%, rgba(8, 10, 14, 0.98) 100%)',
          position: 'relative',
        }}
      >
        <ComboRays active={hasCombos} />
        
        {/* Header */}
        <div className="relative z-10 mb-4">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: isOver ? '#00F5FF' : hasCombos ? '#A855F7' : '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>{isOver ? '✨' : hasCombos ? '🔮' : '🎯'}</span>
              Zona de Composição
            </h3>
            <span style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: hasItems ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: hasItems ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: 11,
              fontWeight: 600,
              color: hasItems ? '#22C55E' : '#6B7280',
            }}>
              {selected.length} elemento{selected.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p style={{ 
            fontSize: 13, 
            color: '#6B7280',
            margin: 0,
          }}>
            {isOver 
              ? '🎯 Solte aqui para adicionar à composição!'
              : hasItems 
              ? 'Continue adicionando elementos para formar combos'
              : 'Arraste as tecnologias que vão conectar mundos'
            }
          </p>
        </div>

        {/* Items Grid */}
        <div className="relative z-10">
          {selected.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 20px',
              borderRadius: 12,
              border: '2px dashed rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
            }}>
              <span style={{ fontSize: 32, marginBottom: 12, opacity: 0.5 }}>🎴</span>
              <span style={{ fontSize: 13, color: '#6B7280' }}>
                Arraste cards aqui
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {selected.map((el) => (
                <motion.div
                  key={el.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: 'linear-gradient(145deg, rgba(28, 32, 40, 0.9) 0%, rgba(20, 23, 31, 0.95) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span style={{ fontSize: 16 }}>
                    {el.category === 'XR/VR' ? '🥽' : 
                     el.category === 'Cinema' ? '🎬' : 
                     el.category === 'Eventos' ? '🎪' : 
                     el.category === 'Academy' ? '🎓' : 
                     el.category === 'Cultura' ? '🏛️' : '✨'}
                  </span>
                  <div>
                    <div style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: 12, 
                      fontWeight: 600, 
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}>
                      {el.name}
                    </div>
                    <div style={{ 
                      fontFamily: 'var(--font-data)', 
                      fontSize: 10, 
                      color: '#FFD700',
                      fontWeight: 600,
                    }}>
                      +{el.points} pts
                    </div>
                  </div>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(el.id)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#EF4444',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'
                      }}
                      aria-label={`Remover ${el.name}`}
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {children}
      </div>
    </motion.div>
  )
}
