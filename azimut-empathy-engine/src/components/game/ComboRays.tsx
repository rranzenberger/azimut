import { useSettingsStore } from '../../stores/settingsStore'

export interface ComboRaysProps {
  active: boolean
  count?: number
  className?: string
}

export default function ComboRays({ active, count = 12, className = '' }: ComboRaysProps) {
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  if (!active || reducedMotion) return null

  const rays = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360
    const rad = (angle * Math.PI) / 180
    return { x: 50 + 50 * Math.cos(rad), y: 50 + 50 * Math.sin(rad) }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none rounded-2xl ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="combo-ray-grad" x1="50" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-purple-epic)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-purple-epic)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {rays.map((r, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={String(r.x)}
          y2={String(r.y)}
          stroke="url(#combo-ray-grad)"
          strokeWidth="1.2"
          className="animate-combo-ray"
        />
      ))}
    </svg>
  )
}
