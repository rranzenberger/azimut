'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function MonitorLink() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPendingCount = async () => {
    try {
      const res = await fetch('/api/admin/blog/monitor?status=PENDING&limit=1');
      if (res.ok) {
        const data = await res.json();
        setPendingCount(data.total || 0);
      }
    } catch (error) {
      // Silenciar erro
    }
  };

  const monitorTooltip = 'Sugestões de posts geradas por IA para aprovar ou descartar. O número indica pendências.';

  return (
    <Link
      href="/admin/blog/monitor"
      title={monitorTooltip}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '12px 16px',
        borderRadius: 10,
        textDecoration: 'none',
        fontSize: 15,
        fontWeight: 500,
        // Cor e estilo igual aos outros botões
        color: '#ffffff',
        background: pendingCount > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)',
        border: pendingCount > 0 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.2s ease',
        position: 'relative',
        animation: pendingCount > 0 ? 'pulse 2s infinite' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = pendingCount > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.borderColor = pendingCount > 0 ? 'rgba(239, 68, 68, 0.6)' : 'rgba(201, 35, 55, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = pendingCount > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = pendingCount > 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.08)';
      }}
    >
      <span>🤖 Monitoramento</span>
      {pendingCount > 0 && (
        <span
          style={{
            background: '#ef4444',
            color: '#fff',
            fontSize: 10,
            fontWeight: 'bold',
            padding: '3px 7px',
            borderRadius: 12,
            minWidth: 20,
            textAlign: 'center',
            // Animação removida para compatibilidade com Next.js App Router
          }}
        >
          {pendingCount > 99 ? '99+' : pendingCount}
        </span>
      )}
    </Link>
  );
}
