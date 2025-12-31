'use client';

import Link from 'next/link';

export function NewServiceButton() {
  return (
    <Link
      href="/admin/services/new"
      style={{
        padding: '12px 20px',
        borderRadius: 10,
        background: '#c92337',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 14,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#b01e2f';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#c92337';
      }}
    >
      <span>+</span>
      Novo Serviço
    </Link>
  );
}

