'use client';

import { usePathname, useRouter } from 'next/navigation';

export function AdminLink({
  href,
  label,
  disabled,
}: {
  href: string;
  label: string;
  disabled?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '12px 16px',
        borderRadius: 12,
        background: isActive ? 'rgba(201,35,55,0.12)' : 'rgba(255,255,255,0.03)',
        border: isActive
          ? '1px solid rgba(201,35,55,0.35)'
          : '1px solid rgba(255,255,255,0.06)',
        color: disabled ? '#8f8ba2' : isActive ? '#fca5a5' : '#e8e6f2',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: 'none',
        fontSize: 15,
        opacity: disabled ? 0.5 : 1,
        display: 'block',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.transform = 'translateX(2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.transform = 'translateX(0)';
        }
      }}
    >
      {label}
    </div>
  );
}
