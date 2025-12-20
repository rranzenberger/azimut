'use client';

import Link from 'next/link';

export function NewProjectButton() {
  return (
    <Link
      href="/admin/projects/new"
      style={{
        padding: '14px 24px',
        borderRadius: 12,
        background: '#c92337',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: 15,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        whiteSpace: 'nowrap',
        transition: 'all 0.2s',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(201, 35, 55, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#b01e2f';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(201, 35, 55, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#c92337';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 35, 55, 0.2)';
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1, fontWeight: 700 }}>+</span>
      <span>Novo Projeto</span>
    </Link>
  );
}

