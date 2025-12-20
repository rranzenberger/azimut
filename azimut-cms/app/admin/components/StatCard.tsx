'use client';

import { useState } from 'react';

export function StatCard({ label, value }: { label: string; value: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        padding: '24px 20px',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        background: isHovered
          ? 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
        transition: 'all 0.2s',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ color: '#c0bccf', fontSize: 15, marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1, letterSpacing: '-1px' }}>{value}</div>
    </div>
  );
}


