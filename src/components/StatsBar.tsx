import React, { useEffect, useRef, useState } from 'react'
import { type Lang } from '../i18n'

interface StatsBarProps {
  lang: Lang
}

interface Stat {
  value: number
  prefix?: string
  suffix?: string
  label: Record<Lang, string>
}

// Números verificados (fontes oficiais, jun/2026) — Rio Museu Olímpico + trajetória Azimut
const STATS: Stat[] = [
  { value: 30, suffix: '', label: { pt: 'anos de trajetória', en: 'years of track record', es: 'años de trayectoria', fr: 'ans de parcours' } },
  { value: 80, suffix: '+', label: { pt: 'experiências no Museu Olímpico', en: 'experiences at the Olympic Museum', es: 'experiencias en el Museo Olímpico', fr: 'expériences au Musée Olympique' } },
  { value: 20, suffix: ' mil+', label: { pt: 'visitantes no Museu', en: 'thousand+ museum visitors', es: 'mil+ visitantes en el Museo', fr: 'mille+ visiteurs au Musée' } },
  { value: 13, suffix: '+', label: { pt: 'empresas coordenadas', en: 'companies coordinated', es: 'empresas coordinadas', fr: 'entreprises coordonnées' } },
]

function useCountUp(target: number, start: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1)
      // ease-out cúbico
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, durationMs])
  return value
}

const StatItem: React.FC<{ stat: Stat; lang: Lang; start: boolean }> = ({ stat, lang, start }) => {
  const n = useCountUp(stat.value, start)
  return (
    <div className="flex flex-col items-center text-center px-2">
      <span className="font-handel text-3xl md:text-5xl tracking-wide text-azimut-red">
        {stat.prefix}{n}{stat.suffix}
      </span>
      <span className="mt-1 font-sora text-[0.6rem] md:text-xs uppercase tracking-[0.18em] max-w-[160px]" style={{ color: 'var(--theme-text-secondary)' }}>
        {stat.label[lang]}
      </span>
    </div>
  )
}

const StatsBar: React.FC<StatsBarProps> = ({ lang }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Respeita prefers-reduced-motion: mostra os números direto
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} aria-label="Azimut em números" className="py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
        {STATS.map((s, i) => (
          <StatItem key={i} stat={s} lang={lang} start={visible} />
        ))}
      </div>
    </section>
  )
}

export default StatsBar
