import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GIGRADAR, GigRadarEmpty, GigRadarError, GigRadarPageHeader } from '../theme';

export const revalidate = 0;

/**
 * Beta testers do GigRadar — os cadastros da landing /gigradar, dentro da área do app
 * em vez de diluídos na lista geral de leads do site. São públicos diferentes: aqui é
 * motorista querendo testar o app, não cliente procurando a Azimut.
 *
 * Cruza cada cadastro com os aparelhos que já sincronizaram, pelo contato — assim dá
 * pra ver quem se cadastrou mas nunca chegou a rodar o app.
 */
export default async function GigRadarTestersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let leads: any[] = [];
  let devicesByContact = new Map<string, { appVersion: string | null; lastSeenAt: Date }>();
  let error: string | null = null;

  try {
    leads = await prisma.lead.findMany({
      where: { leadType: 'GIGRADAR_BETA' as any },
      orderBy: { createdAt: 'desc' },
      take: 300,
    });
  } catch (e: any) {
    error = e?.message || 'Erro ao buscar cadastros';
  }

  // Aparelhos são opcionais: se a tabela ainda não recebeu nada, a página segue funcionando.
  type DeviceRow = { contact: string | null; appVersion: string | null; lastSeenAt: Date };
  try {
    const devices = await prisma.$queryRaw<
      DeviceRow[]
    >`SELECT "contact", "appVersion", "lastSeenAt" FROM "GigRadarDevice" WHERE "contact" IS NOT NULL`;
    devicesByContact = new Map(
      devices
        .filter((d: DeviceRow) => d.contact)
        .map((d: DeviceRow): [string, { appVersion: string | null; lastSeenAt: Date }] => [
          d.contact!.trim().toLowerCase(),
          { appVersion: d.appVersion, lastSeenAt: d.lastSeenAt },
        ])
    );
  } catch {
    // sem aparelhos sincronizados ainda — não é erro
  }

  const ativo = (lead: any) => {
    const chaves = [lead.email, lead.phone].filter(Boolean).map((c: string) => c.trim().toLowerCase());
    for (const k of chaves) {
      const d = devicesByContact.get(k);
      if (d) return d;
    }
    return null;
  };

  const comApp = leads.filter((l) => ativo(l)).length;

  return (
    <div style={{ padding: 24 }}>
      <GigRadarPageHeader
        icon="👥"
        title="Beta testers"
        subtitle="Cadastros da landing /gigradar. O código de liberação vai por WhatsApp — o deviceId do testador não chega por aqui."
      />

      {error && <GigRadarError>{error}</GigRadarError>}

      {leads.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            ['Cadastros', leads.length, GIGRADAR.purpleLight],
            ['Já rodaram o app', comApp, GIGRADAR.green],
            ['Sem sinal ainda', leads.length - comApp, GIGRADAR.orange],
          ].map(([label, value, color]) => (
            <div
              key={String(label)}
              style={{
                background: GIGRADAR.cardBg,
                border: `1px solid ${GIGRADAR.cardBorder}`,
                borderRadius: 12,
                padding: '12px 18px',
                minWidth: 130,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700, color: String(color) }}>{String(value)}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{String(label)}</div>
            </div>
          ))}
        </div>
      )}

      {!error && leads.length === 0 ? (
        <GigRadarEmpty>
          Nenhum cadastro de beta ainda. Quem preencher o formulário em{' '}
          <strong>azimut.com.br/gigradar</strong> aparece aqui.
        </GigRadarEmpty>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 720 }}>
            <thead>
              <tr style={{ color: '#9ca3af', textAlign: 'left' }}>
                {['Cadastro', 'Nome', 'Contato', 'Cidade', 'App', 'Status'].map((h) => (
                  <th
                    key={h}
                    style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}`, fontWeight: 500 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => {
                const d = ativo(l);
                const td = {
                  padding: '8px 10px',
                  borderBottom: `1px solid ${GIGRADAR.cardBorder}`,
                } as const;
                return (
                  <tr key={l.id} style={{ color: '#d1d5db' }}>
                    <td style={{ ...td, whiteSpace: 'nowrap', color: '#9ca3af' }}>
                      {new Date(l.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td style={{ ...td, color: '#e5e7eb' }}>{l.name}</td>
                    <td style={td}>
                      <div>{l.email}</div>
                      {l.phone && <div style={{ color: '#9ca3af', fontSize: 12 }}>{l.phone}</div>}
                    </td>
                    <td style={{ ...td, color: '#9ca3af' }}>{l.city || '—'}</td>
                    <td style={td}>
                      {d ? (
                        <span
                          style={{
                            background: 'rgba(34,197,94,0.15)',
                            border: '1px solid rgba(34,197,94,0.35)',
                            color: GIGRADAR.green,
                            padding: '2px 8px',
                            borderRadius: 999,
                            fontSize: 11,
                          }}
                        >
                          v{d.appVersion || '?'}
                        </span>
                      ) : (
                        <span style={{ color: '#6b7280', fontSize: 12 }}>sem sinal</span>
                      )}
                    </td>
                    <td style={{ ...td, color: '#9ca3af', fontSize: 12 }}>{l.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
