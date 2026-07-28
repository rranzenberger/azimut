import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GIGRADAR, GigRadarEmpty, GigRadarError, GigRadarPageHeader } from '../theme';

export const revalidate = 0;

type Shift = {
  localId: bigint;
  startedAt: Date;
  endedAt: Date | null;
  hours: number | null;
  km: number | null;
  offers: number | null;
  accepted: number | null;
  gross: number | null;
  bruto_por_hora: number | null;
  pct_aceite: number | null;
  idleMin: number | null;
  runMin: number | null;
  pct_parado: number | null;
  obdConnected: boolean | null;
  obdSamples: number | null;
  avgSpeedKmh: number | null;
  prints: bigint;
};

type Accuracy = {
  platform: string;
  ofertas: bigint;
  conferidas: bigint;
  acertou: bigint;
  falso_ruim: bigint;
  falso_bom: bigint;
  nao_apareceu: bigint;
  so_falou: bigint;
  pct_acerto: number | null;
  perdido_falso_ruim: number;
};

/**
 * Turnos e acerto do veredito — a prova de que o app funciona.
 *
 * FALSO_RUIM é o erro que custa dinheiro: o app disse RED, o motorista obedeceu, e a corrida
 * era boa. FALSO_BOM é o que custa confiança. Enquanto esses dois números não forem baixos,
 * não dá pra dizer que o veredito está pronto pra vender.
 */
export default async function GigRadarTurnosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let shifts: Shift[] = [];
  let accuracy: Accuracy[] = [];
  let error: string | null = null;
  let semTabelas = false;

  try {
    shifts = await prisma.$queryRaw<Shift[]>`
      SELECT * FROM "GigRadarShiftSummary" ORDER BY "startedAt" DESC LIMIT 60`;
  } catch (e: any) {
    // A view só existe depois de add_gigradar_shift_shots.sql
    semTabelas = true;
    error = e?.message || 'Erro ao consultar o Neon';
  }

  try {
    accuracy = await prisma.$queryRaw<Accuracy[]>`
      SELECT * FROM "GigRadarVerdictAccuracy" ORDER BY ofertas DESC`;
  } catch {
    // view de acerto vem de add_gigradar_verdict_review.sql
  }

  const brl = (n: number | null) => (n == null ? '—' : `R$ ${n.toFixed(2).replace('.', ',')}`);
  const cardBase = {
    background: GIGRADAR.cardBg,
    border: `1px solid ${GIGRADAR.cardBorder}`,
    borderRadius: 12,
    padding: 16,
  } as const;
  const h2 = { fontSize: 14, fontWeight: 600, color: '#e5e7eb', margin: '0 0 10px' } as const;

  return (
    <div style={{ padding: 24 }}>
      <GigRadarPageHeader
        icon="🕐"
        title="Turnos e acerto do veredito"
        subtitle="Cada turno fechado, com o que rendeu, o que o OBD viu e quantas provas ficaram guardadas. Abaixo, o placar do 🟢🟡🔴 por plataforma."
      />

      {error && semTabelas && (
        <GigRadarError>
          {error} — aplique <code>migrations/add_gigradar_shift_shots.sql</code> e{' '}
          <code>migrations/add_gigradar_verdict_review.sql</code> no Neon.
        </GigRadarError>
      )}

      {/* Placar do veredito */}
      {accuracy.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={h2}>Placar do veredito por plataforma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {accuracy.map((a) => (
              <div key={a.platform} style={cardBase}>
                <div style={{ fontSize: 15, color: '#e5e7eb', fontWeight: 600, marginBottom: 8 }}>
                  {a.platform}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: a.pct_acerto != null && a.pct_acerto >= 80 ? GIGRADAR.green : GIGRADAR.orange }}>
                  {a.pct_acerto != null ? `${a.pct_acerto}%` : '—'}
                  <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 400 }}> de acerto</span>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', margin: '2px 0 10px' }}>
                  {Number(a.conferidas)} conferida(s) de {Number(a.ofertas)} oferta(s)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: GIGRADAR.red }}>Falso ruim (perdeu corrida boa)</span>
                    <strong style={{ color: GIGRADAR.red }}>{Number(a.falso_ruim)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: GIGRADAR.orange }}>Falso bom (aceitou ruim)</span>
                    <strong style={{ color: GIGRADAR.orange }}>{Number(a.falso_bom)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9ca3af' }}>Não apareceu o card</span>
                    <strong style={{ color: '#9ca3af' }}>{Number(a.nao_apareceu)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9ca3af' }}>Só falou por voz</span>
                    <strong style={{ color: '#9ca3af' }}>{Number(a.so_falou)}</strong>
                  </div>
                </div>
                {a.perdido_falso_ruim > 0 && (
                  <div style={{ marginTop: 10, fontSize: 12, color: GIGRADAR.red }}>
                    Deixado na mesa por RED errado: <strong>{brl(a.perdido_falso_ruim)}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Turnos */}
      <h2 style={h2}>Turnos {shifts.length > 0 && `(${shifts.length})`}</h2>
      {!semTabelas && shifts.length === 0 ? (
        <GigRadarEmpty>
          Nenhum turno sincronizado ainda. Ao encerrar o turno no app, o resumo sobe pra cá com o
          que rendeu e o que o OBD registrou.
        </GigRadarEmpty>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shifts.map((s) => (
            <div key={String(s.localId)} style={cardBase}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                <span style={{ color: '#e5e7eb', fontSize: 14, fontWeight: 600 }}>
                  {new Date(s.startedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  {s.endedAt && ` → ${new Date(s.endedAt).toLocaleTimeString('pt-BR', { timeStyle: 'short' })}`}
                </span>
                {s.hours != null && (
                  <span style={{ color: '#9ca3af', fontSize: 12 }}>{s.hours.toFixed(1)}h</span>
                )}
                {s.obdConnected && (
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
                    OBD {s.obdSamples ?? 0} leituras
                  </span>
                )}
                {Number(s.prints) > 0 && (
                  <span style={{ color: GIGRADAR.purpleLight, fontSize: 12 }}>📸 {Number(s.prints)} prints</span>
                )}
                <span style={{ marginLeft: 'auto', color: GIGRADAR.green, fontSize: 16, fontWeight: 700 }}>
                  {brl(s.gross)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 12, color: '#9ca3af' }}>
                {s.bruto_por_hora != null && (
                  <span>
                    <strong style={{ color: GIGRADAR.purpleLight }}>{brl(s.bruto_por_hora)}</strong>/hora
                  </span>
                )}
                {s.offers != null && (
                  <span>
                    <strong style={{ color: GIGRADAR.purpleLight }}>{s.offers}</strong> ofertas
                    {s.pct_aceite != null && ` · ${s.pct_aceite}% aceite`}
                  </span>
                )}
                {s.km != null && (
                  <span>
                    <strong style={{ color: GIGRADAR.purpleLight }}>{s.km.toFixed(0)}</strong> km
                  </span>
                )}
                {s.pct_parado != null && (
                  <span>
                    <strong style={{ color: s.pct_parado > 40 ? GIGRADAR.orange : GIGRADAR.purpleLight }}>
                      {s.pct_parado}%
                    </strong>{' '}
                    parado
                  </span>
                )}
                {s.avgSpeedKmh != null && <span>média {s.avgSpeedKmh.toFixed(0)} km/h</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
