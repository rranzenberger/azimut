import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const revalidate = 0;

export default async function GigRadarLogsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let logs: any[] = [];
  let error: string | null = null;

  try {
    logs = await prisma.gigRadarLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  } catch (e: any) {
    error = e?.message || 'Erro ao buscar logs';
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', color: '#fff' }}>
        🧪 GigRadar — Logs de beta testers
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: '20px', fontSize: '14px' }}>
        Logs enviados pelo botão "Enviar log" no app (fase beta). {logs.length} registro(s) mais recente(s).
      </p>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
          {error} — se a tabela ainda não existe, aplique a migração <code>migrations/add_gigradar_log.sql</code> no Neon.
        </div>
      )}

      {!error && logs.length === 0 && (
        <div style={{ color: '#9ca3af', padding: '32px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '12px' }}>
          Nenhum log recebido ainda.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {logs.map((log) => (
          <details
            key={log.id}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '12px 16px',
            }}
          >
            <summary style={{ cursor: 'pointer', color: '#e5e7eb', fontSize: '13px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#93c5fd', fontFamily: 'monospace' }}>{log.deviceId.slice(0, 16)}…</span>
              {log.contact && <span style={{ color: '#c4b5fd' }}>{log.contact}</span>}
              {log.appVersion && (
                <span style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)', color: '#86efac', padding: '2px 8px', borderRadius: '999px', fontSize: '11px' }}>
                  v{log.appVersion}
                </span>
              )}
              <span style={{ marginLeft: 'auto', color: '#9ca3af', fontSize: '12px' }}>
                {new Date(log.createdAt).toLocaleString('pt-BR')}
              </span>
            </summary>
            {log.aiSummary && (
              <div style={{ marginTop: '10px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '10px 12px' }}>
                <span style={{ color: '#c4b5fd', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>🤖 Resumo IA</span>
                <p style={{ marginTop: '4px', color: '#e5e7eb', fontSize: '13px', lineHeight: 1.5 }}>{log.aiSummary}</p>
              </div>
            )}
            <pre style={{ marginTop: '10px', whiteSpace: 'pre-wrap', color: '#d1d5db', fontSize: '12px', lineHeight: 1.5, fontFamily: 'monospace' }}>
              {log.logText}
            </pre>
          </details>
        ))}
      </div>
    </div>
  );
}
