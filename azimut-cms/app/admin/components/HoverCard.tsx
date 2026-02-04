'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface HoverCardProps {
  href: string;
  children: ReactNode;
}

export function HoverCard({ href, children }: HoverCardProps) {
  return (
    <Link
      href={href}
      style={{
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {children}
    </Link>
  );
}

interface HoverButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function HoverButton({ href, children, variant = 'primary' }: HoverButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <Link
      href={href}
      style={{
        padding: '10px 20px',
        backgroundColor: isPrimary ? '#ef4444' : 'transparent',
        color: isPrimary ? 'white' : '#ef4444',
        textDecoration: 'none',
        borderRadius: 6,
        fontWeight: 600,
        fontSize: 14,
        display: 'inline-block',
        transition: 'background-color 0.2s',
        border: isPrimary ? 'none' : '1px solid #ef4444',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isPrimary ? '#dc2626' : 'rgba(239, 68, 68, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isPrimary ? '#ef4444' : 'transparent';
      }}
    >
      {children}
    </Link>
  );
}
