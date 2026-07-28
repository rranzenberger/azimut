import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GIGRADAR, GigRadarEmpty, GigRadarError, GigRadarPageHeader } from '../theme';

export const revalidate = 0;

type FuelStat = {
  deviceId: string;
  fuel_type: string;
  fills: bigint;
  total_spent: number;
  total_qty: number;
  unit_price: number | null;
  first_fill: Date;
  last_fill: Date;
};

type Expense = {
  type: string;
  value: number;
  qty: number | null;
  note: string | null;
  ts: Date;
};

/**
 * Combustível e custo por km — o número que decide se o veredito 🟢🟡🔴 é confiável.
 * Sem histórico de abastecimento o app cai para estimativa, e a precisão despenca.
 */
export default async function GigRadarFuelPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let fuelStats: FuelStat[] = [];
  let expenses: Expense[] = [];
  let error: string | null = null;

  try {
    fuelStats = await prisma.$queryRaw<FuelStat[]>`
      SELECT * FROM "GigRadarFuelStats" ORDER BY "deviceId", fuel_type
    `;
    expenses = await prisma.$queryRaw<Expense[]>`
      SELECT "type", "value", "qty", "note", "ts"
      FROM "GigRadarExpense" ORDER BY "ts" DESC LIMIT 100
    `;
  } catch (e: any) {
    error = e?.message || 'Erro ao consultar o Neon';
  }

  const brl = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

  return (
    <div style={{ padding: 24 }}>
      <GigRadarPageHeader
        icon="⛽"
        title="Combustível e custo por km"
        subtitle="Abastecimentos que o motorista lançou no app. O preço real por litro/m³ sai daqui — é o que separa um veredito preciso de um chute."
      />

      {error && (
        <GigRadarError>
          {error} — aplique <code>migrations/add_gigradar_backup.sql</code> no Neon.
        </GigRadarError>
      )}

      {/* Preço real por combustível */}
      {fuelStats.length > 0 && (
        <>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb', margin: '0 0 10px' }}>
            Preço real por combustível
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
              marginBottom: 28,
            }}
          >
            {fuelStats.map((f) => (
              <div
                key={`${f.deviceId}-${f.fuel_type}`}
                style={{
                  background: GIGRADAR.cardBg,
                  border: `1px solid ${GIGRADAR.cardBorder}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 15, color: '#e5e7eb', marginBottom: 8 }}>{f.fuel_type}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: GIGRADAR.purpleLight }}>
                  {f.unit_price != null ? brl(f.unit_price) : '—'}
                  <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 400 }}>
                    {' '}
                    / {f.fuel_type.includes('GNV') ? 'm³' : 'L'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, lineHeight: 1.6 }}>
                  {Number(f.fills)} abastecimento(s) · {brl(f.total_spent)} no total
                  <br />
                  último em {new Date(f.last_fill).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lançamentos */}
      <h2 style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb', margin: '0 0 10px' }}>
        Lançamentos {expenses.length > 0 && `(${expenses.length} mais recentes)`}
      </h2>

      {!error && expenses.length === 0 ? (
        <GigRadarEmpty>
          Nenhum abastecimento sincronizado ainda. Enquanto o app não envia, os lançamentos existem
          só no aparelho — que é exatamente o risco que esta área resolve.
        </GigRadarEmpty>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 520 }}>
            <thead>
              <tr style={{ color: '#9ca3af', textAlign: 'left' }}>
                {['Data', 'Tipo', 'Valor', 'Quantidade', 'Obs.'].map((h) => (
                  <th key={h} style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}`, fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i} style={{ color: '#d1d5db' }}>
                  <td style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}`, whiteSpace: 'nowrap' }}>
                    {new Date(e.ts).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}` }}>{e.type}</td>
                  <td style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}`, color: GIGRADAR.orange }}>
                    {brl(e.value)}
                  </td>
                  <td style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}` }}>
                    {e.qty ? e.qty.toFixed(2).replace('.', ',') : '—'}
                  </td>
                  <td style={{ padding: '8px 10px', borderBottom: `1px solid ${GIGRADAR.cardBorder}`, color: '#9ca3af' }}>
                    {e.note || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
