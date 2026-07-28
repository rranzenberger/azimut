/**
 * Paleta e blocos reaproveitados pelas páginas do GigRadar no backoffice.
 * Roxo + laranja são as cores do app (Theme.GigRadar.Orange), o que dá à área
 * uma identidade própria dentro do painel da Azimut sem destoar do escuro.
 */
export const GIGRADAR = {
  purple: '#8B5CF6',
  purpleLight: '#C4B5FD',
  orange: '#FDBA74',
  green: '#86EFAC',
  red: '#FCA5A5',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.1)',
} as const;

export function GigRadarCard({
  children,
  hover = false,
}: {
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      style={{
        background: GIGRADAR.cardBg,
        border: `1px solid ${GIGRADAR.cardBorder}`,
        borderRadius: 12,
        padding: 16,
        height: '100%',
        transition: hover ? 'border-color 0.15s ease, background 0.15s ease' : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function GigRadarError({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(239,68,68,0.15)',
        border: '1px solid rgba(239,68,68,0.35)',
        color: GIGRADAR.red,
        padding: '12px 16px',
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}

export function GigRadarEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: '#9ca3af',
        padding: 32,
        textAlign: 'center',
        border: '1px dashed rgba(255,255,255,0.15)',
        borderRadius: 12,
        marginTop: 16,
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

/** Cabeçalho padrão das subpáginas, com voltar pro painel. */
export function GigRadarPageHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <a
        href="/admin/gigradar"
        style={{ fontSize: 12, color: GIGRADAR.purpleLight, textDecoration: 'none' }}
      >
        ← Painel GigRadar
      </a>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '8px 0 4px' }}>
        {icon} {title}
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: 20, fontSize: 14 }}>{subtitle}</p>
    </>
  );
}
