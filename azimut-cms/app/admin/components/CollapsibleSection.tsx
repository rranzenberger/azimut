'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  borderColor?: string;
  bgColor?: string;
  children: ReactNode;
  /** controlled mode */
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

export default function CollapsibleSection({
  id,
  title,
  icon,
  defaultOpen = false,
  borderColor = 'rgba(255,255,255,0.08)',
  bgColor = 'rgba(255,255,255,0.03)',
  children,
  isOpen: controlledOpen,
  onToggle,
}: CollapsibleSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id);
    } else {
      setInternalOpen((v) => !v);
    }
  };

  useEffect(() => {
    if (open && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }, [open]);

  return (
    <div
      ref={ref}
      id={`secao-${id}`}
      style={{
        borderRadius: 12,
        border: `1px solid ${borderColor}`,
        background: bgColor,
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          background: open ? 'rgba(255,255,255,0.06)' : 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: 18,
          fontWeight: 600,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s ease',
        }}
      >
        <span>{icon ? `${icon} ` : ''}{title}</span>
        <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 400 }}>
          {open ? '▼ Fechar' : '▶ Abrir'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '4px 28px 28px 28px' }}>
          {children}
        </div>
      )}
    </div>
  );
}
