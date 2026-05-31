import React, { useEffect, useRef } from 'react'
import type { Lang } from '../i18n'
import './StudioOverviewCard.css'

const BEARING_DEG = 326

const COPY: Record<
  Lang,
  {
    kicker: string
    manifestoBefore: string
    manifestoHighlight: string
    tags: [string, string, string]
    bearingLabel: string
    bearingFrom: string
    bearingTo: string
    headingLabel: string
    headingValues: string
  }
> = {
  pt: {
    kicker: 'Studio Azimut',
    manifestoBefore: 'Cada projeto começa com um ',
    manifestoHighlight: 'azimute.',
    tags: ['Imersivo', 'Interativo', 'Cinematográfico'],
    bearingLabel: 'AZIMUTE',
    bearingFrom: 'Brasil',
    bearingTo: 'Canadá',
    headingLabel: 'RUMO',
    headingValues: 'cinema · design · engenharia · pesquisa',
  },
  en: {
    kicker: 'Azimut Studio',
    manifestoBefore: 'Every project begins with a ',
    manifestoHighlight: 'bearing.',
    tags: ['Immersive', 'Interactive', 'Cinematic'],
    bearingLabel: 'BEARING',
    bearingFrom: 'Brazil',
    bearingTo: 'Canada',
    headingLabel: 'HEADING',
    headingValues: 'cinema · design · engineering · research',
  },
  es: {
    kicker: 'Estudio Azimut',
    manifestoBefore: 'Cada proyecto comienza con un ',
    manifestoHighlight: 'rumbo.',
    tags: ['Inmersivo', 'Interactivo', 'Cinematográfico'],
    bearingLabel: 'RUMBO',
    bearingFrom: 'Brasil',
    bearingTo: 'Canadá',
    headingLabel: 'RUMBO',
    headingValues: 'cine · diseño · ingeniería · investigación',
  },
  fr: {
    kicker: 'Studio Azimut',
    manifestoBefore: 'Chaque projet commence par un ',
    manifestoHighlight: 'cap.',
    tags: ['Immersif', 'Interactif', 'Cinématographique'],
    bearingLabel: 'CAP',
    bearingFrom: 'Brésil',
    bearingTo: 'Canada',
    headingLabel: 'CAP',
    headingValues: 'cinéma · design · ingénierie · recherche',
  },
}

interface Star {
  x: number
  y: number
  r: number
  a: number
  tw: number
  vx: number
}

interface StudioOverviewCardProps {
  lang: Lang
  /** Opcional: foto do backoffice como camada sutil atrás do canvas */
  backgroundImageUrl?: string | null
}

export default function StudioOverviewCard({ lang, backgroundImageUrl }: StudioOverviewCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const copy = COPY[lang]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let dpr = 1
    let stars: Star[] = []
    let t = 0
    let raf = 0

    function seed() {
      stars = []
      const n = Math.max(24, Math.round((W * H) / 9000))
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.3 + 0.2,
          a: Math.random() * 0.6 + 0.15,
          tw: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.04,
        })
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas!.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function drawInstrument() {
      const cx = W * 0.78
      const cy = H * 0.5
      const R = Math.min(W, H) * 0.34

      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6)
      g.addColorStop(0, 'rgba(201,35,55,0.10)')
      g.addColorStop(1, 'rgba(201,35,55,0)')
      ctx!.fillStyle = g
      ctx!.beginPath()
      ctx!.arc(cx, cy, R * 1.6, 0, 7)
      ctx!.fill()

      ctx!.lineWidth = 1
      ;[0.5, 0.74, 1].forEach((k, i) => {
        ctx!.strokeStyle = i === 2 ? 'rgba(201,35,55,0.45)' : 'rgba(255,255,255,0.10)'
        ctx!.beginPath()
        ctx!.arc(cx, cy, R * k, 0, 7)
        ctx!.stroke()
      })

      for (let d = 0; d < 360; d += 15) {
        const a = ((d - 90) * Math.PI) / 180
        const major = d % 90 === 0
        const r1 = R * (major ? 0.88 : 0.94)
        const r2 = R
        ctx!.strokeStyle = major ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.14)'
        ctx!.lineWidth = major ? 1.4 : 1
        ctx!.beginPath()
        ctx!.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
        ctx!.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2)
        ctx!.stroke()
      }

      ctx!.strokeStyle = 'rgba(255,255,255,0.07)'
      ctx!.lineWidth = 1
      ctx!.beginPath()
      ctx!.moveTo(cx - R, cy)
      ctx!.lineTo(cx + R, cy)
      ctx!.moveTo(cx, cy - R)
      ctx!.lineTo(cx, cy + R)
      ctx!.stroke()

      if (!reducedMotion) {
        const sweep = t * 0.006
        const sg = ctx!.createLinearGradient(
          cx,
          cy,
          cx + Math.cos(sweep) * R,
          cy + Math.sin(sweep) * R
        )
        sg.addColorStop(0, 'rgba(201,35,55,0)')
        sg.addColorStop(1, 'rgba(201,35,55,0.5)')
        ctx!.strokeStyle = sg
        ctx!.lineWidth = 1.5
        ctx!.beginPath()
        ctx!.moveTo(cx, cy)
        ctx!.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R)
        ctx!.stroke()
      }

      const bearing = ((BEARING_DEG - 90) * Math.PI) / 180
      ctx!.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx!.lineWidth = 2
      ctx!.beginPath()
      ctx!.moveTo(cx - Math.cos(bearing) * R * 0.4, cy - Math.sin(bearing) * R * 0.4)
      ctx!.lineTo(cx + Math.cos(bearing) * R, cy + Math.sin(bearing) * R)
      ctx!.stroke()

      const px = cx + Math.cos(bearing) * R
      const py = cy + Math.sin(bearing) * R
      const pulse = reducedMotion ? 3 : 3 + Math.sin(t * 0.04) * 1.5
      ctx!.fillStyle = '#ff5663'
      ctx!.shadowColor = '#c92337'
      ctx!.shadowBlur = 16
      ctx!.beginPath()
      ctx!.arc(px, py, pulse, 0, 7)
      ctx!.fill()
      ctx!.shadowBlur = 0

      ctx!.fillStyle = 'rgba(255,255,255,0.9)'
      ctx!.beginPath()
      ctx!.arc(cx, cy, 2.4, 0, 7)
      ctx!.fill()
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H)

      if (!reducedMotion) {
        stars.forEach((s) => {
          s.x += s.vx
          s.tw += 0.02
          if (s.x < 0) s.x = W
          if (s.x > W) s.x = 0
          const a = s.a * (0.6 + 0.4 * Math.sin(s.tw))
          ctx!.fillStyle = `rgba(220,228,255,${a})`
          ctx!.beginPath()
          ctx!.arc(s.x, s.y, s.r, 0, 7)
          ctx!.fill()
        })
      } else {
        stars.forEach((s) => {
          ctx!.fillStyle = `rgba(220,228,255,${s.a})`
          ctx!.beginPath()
          ctx!.arc(s.x, s.y, s.r, 0, 7)
          ctx!.fill()
        })
      }

      drawInstrument()

      const v = ctx!.createRadialGradient(W * 0.5, H * 0.5, H * 0.3, W * 0.5, H * 0.5, W * 0.75)
      v.addColorStop(0, 'rgba(0,0,0,0)')
      v.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx!.fillStyle = v
      ctx!.fillRect(0, 0, W, H)

      t++
      raf = requestAnimationFrame(frame)
    }

    resize()
    raf = requestAnimationFrame(frame)

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="studio-az-card mb-12" aria-label={copy.kicker}>
      {backgroundImageUrl ? (
        <img
          src={backgroundImageUrl}
          alt=""
          className="studio-az-card__bg-image"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <canvas ref={canvasRef} className="studio-az-card__canvas" aria-hidden />
      <div className="studio-az-card__content">
        <div className="studio-az-card__text">
          <div className="studio-az-card__kicker">
            <span className="studio-az-card__kicker-dot" aria-hidden />
            {copy.kicker}
          </div>
          <h2 className="studio-az-card__manifesto">
            {copy.manifestoBefore}
            <em>{copy.manifestoHighlight}</em>
          </h2>
          <div className="studio-az-card__tags">
            {copy.tags.map((tag, i) => (
              <span key={tag} className="studio-az-card__tag">
                {i > 0 ? <span className="studio-az-card__tag-dot" aria-hidden /> : null}
                {tag}
              </span>
            ))}
          </div>
          <div className="studio-az-card__readout">
            <b>{copy.bearingLabel}</b>
            {' '}
            {copy.bearingFrom}
            {' '}
            <span className="studio-az-card__readout-hl">→</span>
            {' '}
            {copy.bearingTo}
            {' '}
            · {BEARING_DEG}°
            <br />
            <b>{copy.headingLabel}</b>
            {' '}
            {copy.headingValues}
          </div>
        </div>
      </div>
    </div>
  )
}
