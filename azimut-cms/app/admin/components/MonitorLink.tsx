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

  return (
    <Link
      href="/admin/blog/monitor"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        borderRadius: 8,
        textDecoration: 'none',
        color: pendingCount > 0 ? '#ef4444' : '#a0a0a0',
        background: pendingCount > 0 ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
        border: pendingCount > 0 ? '1px solid rgba(239, 68, 68, 0.3)' : 'none',
        position: 'relative',
        animation: pendingCount > 0 ? 'pulse 2s infinite' : 'none',
      }}
    >
      <span>🤖 Monitoramento</span>
      {pendingCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: '#ef4444',
            color: '#fff',
            fontSize: 10,
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: 10,
            minWidth: 18,
            textAlign: 'center',
            animation: 'bounce 1s infinite',
          }}
        >
          {pendingCount > 99 ? '99+' : pendingCount}
        </span>
      )}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </Link>
  );
}
