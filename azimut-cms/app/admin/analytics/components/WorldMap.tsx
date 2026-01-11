'use client'

import { useMemo } from 'react'

interface WorldMapProps {
  data: Record<string, number>
}

// Coordenadas simplificadas dos países (centro aproximado)
const countryCoords: Record<string, { x: number; y: number; name: string }> = {
  BR: { x: 310, y: 280, name: 'Brasil' },
  CA: { x: 180, y: 100, name: 'Canadá' },
  US: { x: 180, y: 150, name: 'Estados Unidos' },
  MX: { x: 160, y: 180, name: 'México' },
  AR: { x: 295, y: 340, name: 'Argentina' },
  CL: { x: 280, y: 330, name: 'Chile' },
  CO: { x: 270, y: 220, name: 'Colômbia' },
  PE: { x: 265, y: 255, name: 'Peru' },
  PT: { x: 425, y: 155, name: 'Portugal' },
  ES: { x: 435, y: 155, name: 'Espanha' },
  FR: { x: 450, y: 135, name: 'França' },
  GB: { x: 445, y: 115, name: 'Reino Unido' },
  DE: { x: 470, y: 125, name: 'Alemanha' },
  IT: { x: 475, y: 150, name: 'Itália' },
  NL: { x: 460, y: 115, name: 'Holanda' },
  BE: { x: 455, y: 120, name: 'Bélgica' },
  CH: { x: 465, y: 135, name: 'Suíça' },
  AU: { x: 720, y: 310, name: 'Austrália' },
  JP: { x: 730, y: 155, name: 'Japão' },
  CN: { x: 650, y: 160, name: 'China' },
  IN: { x: 600, y: 195, name: 'Índia' },
  KR: { x: 710, y: 155, name: 'Coreia do Sul' },
  RU: { x: 580, y: 90, name: 'Rússia' },
  ZA: { x: 510, y: 320, name: 'África do Sul' },
  NG: { x: 470, y: 230, name: 'Nigéria' },
  EG: { x: 515, y: 185, name: 'Egito' },
  AE: { x: 560, y: 190, name: 'Emirados Árabes' },
  SA: { x: 545, y: 195, name: 'Arábia Saudita' },
  IL: { x: 525, y: 170, name: 'Israel' },
  TR: { x: 520, y: 150, name: 'Turquia' },
  PL: { x: 485, y: 120, name: 'Polônia' },
  SE: { x: 480, y: 85, name: 'Suécia' },
  NO: { x: 465, y: 75, name: 'Noruega' },
  FI: { x: 505, y: 70, name: 'Finlândia' },
  DK: { x: 470, y: 100, name: 'Dinamarca' },
  IE: { x: 430, y: 110, name: 'Irlanda' },
  AT: { x: 480, y: 135, name: 'Áustria' },
  CZ: { x: 480, y: 125, name: 'República Tcheca' },
  HU: { x: 490, y: 135, name: 'Hungria' },
  RO: { x: 505, y: 140, name: 'Romênia' },
  GR: { x: 500, y: 155, name: 'Grécia' },
  NZ: { x: 770, y: 350, name: 'Nova Zelândia' },
  SG: { x: 660, y: 230, name: 'Singapura' },
  TH: { x: 650, y: 210, name: 'Tailândia' },
  MY: { x: 660, y: 225, name: 'Malásia' },
  ID: { x: 685, y: 250, name: 'Indonésia' },
  PH: { x: 700, y: 205, name: 'Filipinas' },
  VN: { x: 665, y: 200, name: 'Vietnã' },
}

const countryFlags: Record<string, string> = {
  BR: '🇧🇷', CA: '🇨🇦', US: '🇺🇸', FR: '🇫🇷', ES: '🇪🇸', PT: '🇵🇹',
  IT: '🇮🇹', DE: '🇩🇪', GB: '🇬🇧', AR: '🇦🇷', MX: '🇲🇽', CL: '🇨🇱',
  CO: '🇨🇴', AU: '🇦🇺', JP: '🇯🇵', CN: '🇨🇳', IN: '🇮🇳', KR: '🇰🇷',
}

export default function WorldMap({ data }: WorldMapProps) {
  const maxCount = useMemo(() => Math.max(...Object.values(data), 1), [data])
  
  const circles = useMemo(() => {
    return Object.entries(data)
      .filter(([code]) => countryCoords[code])
      .map(([code, count]) => {
        const coords = countryCoords[code]
        const size = Math.max(8, Math.min(40, (count / maxCount) * 40))
        return {
          code,
          ...coords,
          count,
          size,
        }
      })
      .sort((a, b) => b.count - a.count)
  }, [data, maxCount])

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
    }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
        🌍 Mapa de Visitantes
      </h2>

      {/* Map Container */}
      <div style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: '100%' }}>
          {/* Fundo do mapa simplificado */}
          <rect x="0" y="0" width="800" height="400" fill="#0a0e18" />
          
          {/* Continentes simplificados */}
          {/* América do Norte */}
          <ellipse cx="180" cy="130" rx="100" ry="80" fill="rgba(59, 130, 246, 0.1)" />
          {/* América do Sul */}
          <ellipse cx="290" cy="280" rx="60" ry="100" fill="rgba(59, 130, 246, 0.1)" />
          {/* Europa */}
          <ellipse cx="470" cy="130" rx="70" ry="50" fill="rgba(59, 130, 246, 0.1)" />
          {/* África */}
          <ellipse cx="490" cy="250" rx="60" ry="80" fill="rgba(59, 130, 246, 0.1)" />
          {/* Ásia */}
          <ellipse cx="620" cy="160" rx="120" ry="80" fill="rgba(59, 130, 246, 0.1)" />
          {/* Oceania */}
          <ellipse cx="720" cy="310" rx="60" ry="50" fill="rgba(59, 130, 246, 0.1)" />

          {/* Grid lines */}
          {[100, 200, 300].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.03)" strokeDasharray="5,5" />
          ))}
          {[200, 400, 600].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="rgba(255,255,255,0.03)" strokeDasharray="5,5" />
          ))}

          {/* Círculos dos países */}
          {circles.map((c, i) => (
            <g key={c.code}>
              {/* Glow effect */}
              <circle
                cx={c.x}
                cy={c.y}
                r={c.size + 4}
                fill="none"
                stroke={`rgba(34, 197, 94, ${0.3 * (c.count / maxCount)})`}
                strokeWidth="2"
              />
              {/* Main circle */}
              <circle
                cx={c.x}
                cy={c.y}
                r={c.size}
                fill={`rgba(34, 197, 94, ${0.4 + (c.count / maxCount) * 0.4})`}
                stroke="#22c55e"
                strokeWidth="1"
              />
              {/* Count label */}
              <text
                x={c.x}
                y={c.y + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize={c.size > 15 ? 12 : 10}
                fontWeight="bold"
              >
                {c.count}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 16,
        paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {circles.slice(0, 8).map(c => (
          <div key={c.code} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.05)',
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 13,
          }}>
            <span>{countryFlags[c.code] || '🌍'}</span>
            <span style={{ color: '#d3cec3' }}>{c.name}</span>
            <span style={{ color: '#22c55e', fontWeight: 600 }}>{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
