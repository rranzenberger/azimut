'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function MonitorBadge() {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 30000); // Atualizar a cada 30s
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
      console.error('Erro ao buscar contagem:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || pendingCount === 0) {
    return null;
  }

  return (
    <Link
      href="/admin/blog/monitor?status=PENDING"
      className="relative inline-block"
    >
      <span className="relative">
        🤖 Monitoramento
        {pendingCount > 0 && (
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse border-2 border-white">
            {pendingCount}
          </span>
        )}
      </span>
    </Link>
  );
}
