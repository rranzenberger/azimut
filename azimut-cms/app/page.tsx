export const metadata = {
  title: 'Azimut CMS',
  description: 'Painel administrativo do CMS Azimut',
};

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e18',
        color: '#d3cec3',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: 640,
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '32px 28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        }}
      >
        <h1 style={{ fontSize: '22px', margin: 0, marginBottom: 12 }}>
          Azimut CMS
        </h1>
        <p style={{ margin: 0, marginBottom: 12, lineHeight: 1.6 }}>
          Backend e APIs estão rodando em <code>/api/*</code>. O dashboard
          visual ainda não foi publicado neste ambiente. Use o seed padrão para
          criar o admin e testar endpoints.
        </p>
        <ul style={{ margin: '12px 0 0', paddingLeft: '18px', lineHeight: 1.6 }}>
          <li>
            Credenciais seed: <strong>admin@azimut.com.br</strong> /{' '}
            <strong>Azimut2025!</strong>
          </li>
          <li>
            Endpoint público de conteúdo: <code>/api/public/content</code>
          </li>
          <li>Tracking: <code>/api/track</code></li>
          <li>Leads: <code>/api/leads</code></li>
        </ul>
      </div>
    </main>
  );
}






















