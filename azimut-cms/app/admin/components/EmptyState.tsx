'use client';

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: string;
}) {
  return (
    <div
      style={{
        padding: '48px 32px',
        textAlign: 'center',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: 48,
            marginBottom: 16,
            opacity: 0.5,
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          margin: 0,
          fontSize: 18,
          fontWeight: 600,
          color: '#c0bccf',
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            margin: 0,
            color: '#8f8ba2',
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}




















