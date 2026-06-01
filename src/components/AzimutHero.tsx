import React, { useEffect, useRef } from 'react'
import { type Lang } from '../i18n'

/**
 * AzimutHero — bloco hero do Studio.
 * Visual gerado por código: starfield + instrumento de azimute (radar girando)
 * apontando o rumo Brasil -> Canadá. Sem foto de fundo: o componente É o fundo.
 *
 * USO:
 *   <AzimutHero lang="fr" />     // "en" | "pt" | "es" | "fr"
 *   <AzimutHero lang={siteLocale} accent="#c92337" />
 *
 * O idioma vem da rota (/:lang/studio) — ver useLanguageRoute / LangRouteWrapper.
 */

interface LangCopy {
  l1: string
  pre: string
  it: string
  tags: string[]
  r1l: string
  ca: string
  cb: string
  r2l: string
  r2: string
  r3l: string
  r3: string
  card: Record<number, string>
}

const LANGS: Record<Lang, LangCopy> = {
  en: { l1: 'Every project', pre: 'begins with a ', it: 'bearing.',
        tags: ['IMMERSIVE', 'INTERACTIVE', 'CINEMATIC'],
        r1l: 'BEARING', ca: 'Brazil ', cb: ' Canada · VR 360°',
        r2l: 'HEADING', r2: 'cinema · design · engineering · research',
        r3l: 'AI', r3: 'Generative Movies in Artificial Intelligence',
        card: { 0: 'N', 90: 'E', 180: 'S', 270: 'W' } },
  pt: { l1: 'Todo projeto começa', pre: 'com um ', it: 'rumo.',
        tags: ['IMERSIVO', 'INTERATIVO', 'CINEMATOGRÁFICO'],
        r1l: 'RUMO', ca: 'Brasil ', cb: ' Canadá · VR 360°',
        r2l: 'ROTA', r2: 'cinema · design · engenharia · pesquisa',
        r3l: 'IA', r3: 'Filmes Generativos em Inteligência Artificial',
        card: { 0: 'N', 90: 'L', 180: 'S', 270: 'O' } },
  es: { l1: 'Todo proyecto empieza', pre: 'con un ', it: 'rumbo.',
        tags: ['INMERSIVO', 'INTERACTIVO', 'CINEMATOGRÁFICO'],
        r1l: 'RUMBO', ca: 'Brasil ', cb: ' Canadá · VR 360°',
        r2l: 'RUTA', r2: 'cine · diseño · ingeniería · investigación',
        r3l: 'IA', r3: 'Películas Generativas en Inteligencia Artificial',
        card: { 0: 'N', 90: 'E', 180: 'S', 270: 'O' } },
  fr: { l1: 'Tout projet commence', pre: 'par un ', it: 'cap.',
        tags: ['IMMERSIF', 'INTERACTIF', 'CINÉMATIQUE'],
        r1l: 'CAP', ca: 'Brésil ', cb: ' Canada · VR 360°',
        r2l: 'ROUTE', r2: 'cinéma · design · ingénierie · recherche',
        r3l: 'IA', r3: 'Films Génératifs en Intelligence Artificielle',
        card: { 0: 'N', 90: 'E', 180: 'S', 270: 'O' } },
}

interface Star {
  x: number
  y: number
  r: number
  a: number
  tw: number
  vx: number
}

interface AzimutHeroProps {
  lang?: Lang
  accent?: string
}

export default function AzimutHero({ lang = 'pt', accent = '#e23744' }: AzimutHeroProps) {
  const L = LANGS[lang] || LANGS.en
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // injeta as fontes uma vez (em produção, prefira colocar no <head> do site)
  useEffect(() => {
    const id = 'azimut-fonts'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,500&family=Space+Mono:wght@400;700&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, dpr = 1, stars: Star[] = [], t = 0, raf = 0

    const seed = () => {
      stars = []
      const n = Math.round((W * H) / 9000)
      for (let i = 0; i < n; i++)
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 0.55 + 0.12,
          tw: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.04,
        })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = wrap.getBoundingClientRect()
      W = r.width; H = r.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const hexToRgb = (h: string) => {
      const m = h.replace('#', '')
      return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)]
    }
    const [ar, ag, ab] = hexToRgb(accent)
    const acc = (o: number) => `rgba(${ar},${ag},${ab},${o})`

    const instrument = () => {
      const cx = W * 0.78, cy = H * 0.5, R = Math.min(W, H) * 0.34

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6)
      g.addColorStop(0, acc(0.1)); g.addColorStop(1, acc(0))
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.6, 0, 7); ctx.fill()

      ;[0.5, 0.74, 1].forEach((k, i) => {
        ctx.strokeStyle = i === 2 ? acc(0.45) : 'rgba(255,255,255,.10)'
        ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R * k, 0, 7); ctx.stroke()
      })

      for (let d = 0; d < 360; d += 15) {
        const a = ((d - 90) * Math.PI) / 180, major = d % 90 === 0
        const r1 = R * (major ? 0.88 : 0.94)
        ctx.strokeStyle = major ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.14)'
        ctx.lineWidth = major ? 1.4 : 1
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R)
        ctx.stroke()
      }

      ctx.fillStyle = 'rgba(138,147,173,.8)'
      ctx.font = "600 13px 'Space Mono', monospace"
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      Object.entries(L.card).forEach(([deg, lab]) => {
        const a = ((+deg - 90) * Math.PI) / 180
        ctx.fillText(lab, cx + Math.cos(a) * R * 1.12, cy + Math.sin(a) * R * 1.12)
      })

      ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy)
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke()

      // radar girando
      const sweep = t * 0.006
      const sg = ctx.createLinearGradient(cx, cy, cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R)
      sg.addColorStop(0, acc(0)); sg.addColorStop(1, acc(0.5))
      ctx.strokeStyle = sg; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R); ctx.stroke()

      // agulha fixa na diagonal (rumo Brasil -> Canadá), decorativa
      const b = ((326 - 90) * Math.PI) / 180
      ctx.strokeStyle = 'rgba(238,241,248,.9)'; ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx - Math.cos(b) * R * 0.4, cy - Math.sin(b) * R * 0.4)
      ctx.lineTo(cx + Math.cos(b) * R, cy + Math.sin(b) * R); ctx.stroke()

      const px = cx + Math.cos(b) * R, py = cy + Math.sin(b) * R
      const pulse = 3 + Math.sin(t * 0.04) * 1.5
      ctx.shadowColor = accent; ctx.shadowBlur = 16
      ctx.fillStyle = '#ff5663'
      ctx.beginPath(); ctx.arc(px, py, pulse, 0, 7); ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = 'rgba(255,255,255,.9)'
      ctx.beginPath(); ctx.arc(cx, cy, 2.4, 0, 7); ctx.fill()
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      stars.forEach((s) => {
        s.x += s.vx; s.tw += 0.02
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0
        const a = s.a * (0.6 + 0.4 * Math.sin(s.tw))
        ctx.fillStyle = `rgba(220,228,255,${a})`
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill()
      })
      instrument()
      const v = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.3, W * 0.5, H * 0.5, W * 0.75)
      v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)')
      ctx.fillStyle = v; ctx.fillRect(0, 0, W, H)
      t++; raf = requestAnimationFrame(frame)
    }

    resize()
    frame()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [lang, accent])

  return (
    <div ref={wrapRef} className="azimut-hero">
      <style>{`
        .azimut-hero{
          position:relative; width:100%; aspect-ratio:16/7; min-height:360px;
          border-radius:24px; overflow:hidden;
          background:linear-gradient(160deg,#11172b,#0c1020 70%);
          border:1px solid rgba(255,255,255,.07);
          box-shadow:0 40px 120px -40px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.04);
          font-family:'Archivo','Helvetica Neue',sans-serif;
        }
        .azimut-hero::before{
          content:""; position:absolute; left:50%; top:0; transform:translateX(-50%);
          width:64px; height:3px; border-radius:0 0 4px 4px;
          background:linear-gradient(90deg,transparent,${accent},transparent);
          box-shadow:0 0 18px 2px ${accent}99; z-index:3;
        }
        .azimut-hero canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
        .ah-content{ position:absolute; inset:0; z-index:2; display:flex; align-items:center;
          padding:clamp(28px,5vw,72px); }
        .ah-text{ max-width:560px; }
        .ah-kicker{ font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.32em;
          text-transform:uppercase; color:#ff5663; display:flex; align-items:center; gap:10px;
          opacity:0; animation:ah-rise .8s .1s forwards cubic-bezier(.2,.7,.2,1); }
        .ah-kicker .d{ width:5px; height:5px; border-radius:50%; background:${accent}; box-shadow:0 0 10px ${accent}; }
        .ah-manifesto{ font-family:'Fraunces',Georgia,serif; font-weight:300; font-size:clamp(30px,4.4vw,56px);
          line-height:1.04; letter-spacing:-.01em; color:#eef1f8; margin:22px 0 26px;
          opacity:0; animation:ah-rise .9s .25s forwards cubic-bezier(.2,.7,.2,1); }
        .ah-manifesto em{ font-style:italic; color:#ff5663; font-weight:400; }
        .ah-tags{ font-family:'Space Mono',monospace; font-size:12.5px; letter-spacing:.18em;
          text-transform:uppercase; color:#8a93ad; display:flex; align-items:center; gap:14px; flex-wrap:wrap;
          opacity:0; animation:ah-rise .9s .42s forwards cubic-bezier(.2,.7,.2,1); }
        .ah-tags span{ display:flex; align-items:center; gap:14px; }
        .ah-tags i{ width:4px; height:4px; border-radius:50%; background:${accent}; }
        .ah-readout{ margin-top:30px; font-family:'Space Mono',monospace; font-size:11.5px;
          letter-spacing:.14em; color:#8a93ad; border-left:2px solid ${accent}80; padding-left:14px;
          line-height:1.9; opacity:0; animation:ah-rise .9s .6s forwards cubic-bezier(.2,.7,.2,1); }
        .ah-readout b{ color:#eef1f8; font-weight:700; }
        .ah-readout .hl{ color:#ff5663; }
        @keyframes ah-rise{ from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:none;} }
        @media(max-width:720px){
          .azimut-hero{ aspect-ratio:auto; min-height:520px; }
          .ah-content{ align-items:flex-end; padding-bottom:48px; }
        }
        @media(prefers-reduced-motion:reduce){ .azimut-hero canvas{ opacity:.9; } }
        /* Tema claro: fundo marrom escuro (igual aos cards). Tema escuro mantém o navy. */
        [data-theme="light"] .azimut-hero{ background:linear-gradient(160deg,#1c1712,#0d0907 70%); }
        /* O hero é sempre escuro: força as cores do texto p/ não sumir no tema claro */
        .azimut-hero .ah-kicker{ color:#ff5663 !important; }
        .azimut-hero .ah-manifesto{ color:#eef1f8 !important; }
        .azimut-hero .ah-manifesto em{ color:#ff5663 !important; }
        .azimut-hero .ah-tags{ color:#8a93ad !important; }
        .azimut-hero .ah-readout{ color:#8a93ad !important; }
        .azimut-hero .ah-readout b{ color:#eef1f8 !important; }
        .azimut-hero .ah-readout .hl{ color:#ff5663 !important; }
      `}</style>

      <canvas ref={canvasRef} />

      <div className="ah-content">
        <div className="ah-text">
          <div className="ah-kicker"><span className="d" /> Azimut Studio</div>
          <h1 className="ah-manifesto">
            {L.l1}<br />{L.pre}<em>{L.it}</em>
          </h1>
          <div className="ah-tags">
            {L.tags.map((tg) => (<span key={tg}><i />{tg}</span>))}
          </div>
          <div className="ah-readout">
            <b>{L.r1l}</b>&nbsp;&nbsp;{L.ca}<span className="hl">→</span>{L.cb}<br />
            <b>{L.r2l}</b>&nbsp;&nbsp;{L.r2}<br />
            <b>{L.r3l}</b>&nbsp;&nbsp;<span className="hl">{L.r3}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
