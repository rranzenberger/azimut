import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GIGRADAR, GigRadarEmpty, GigRadarError, GigRadarPageHeader } from '../theme';

export const revalidate = 0;

type Earning = { day: Date; gross: number; hours: number };
type CostItem = { name: string; value: number; period: string; enabled: boolean };
type ExpenseByType = { type: string; total: number };
type Payout = { platform: string; expected: number | null; amount: number; ts: Date };

/**
 * Contabilidade real — bruto, gastos, custos fixos e o líquido que sobra.
 *
 * O número que importa pro motorista não é o que a Uber mostra (bruto): é o que sobra
 * depois do combustível, do aluguel e do desgaste. É esse líquido que o veredito do app
 * defende, e é aqui que se confere se a conta fecha.
 */

/** Normaliza qualquer periodicidade para custo semanal. */
const PARA_SEMANA: Record<string, number> = {
  diaria: 7,
  semanal: 1,
  mensal: 1 / 4.345, // 52 semanas / 12 meses
  anual: 1 / 52.18,
};

export default async function GigRadarContasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let earnings: Earning[] = [];
  let costItems: CostItem[] = [];
  let expensesByType: ExpenseByType[] = [];
  let payouts: Payout[] = [];
  let error: string | null = null;

  const DIAS = 30;

  try {
    [earnings, costItems, expensesByType, payouts] = await Promise.all([
      prisma.$queryRaw<Earning[]>`
        SELECT "day","gross","hours" FROM "GigRadarEarning"
        WHERE "day" >= CURRENT_DATE - ${DIAS}::int ORDER BY "day" DESC`,
      prisma.$queryRaw<CostItem[]>`
        SELECT "name","value","period","enabled" FROM "GigRadarCostItem"
        WHERE "enabled" = TRUE ORDER BY "ord"`,
      prisma.$queryRaw<ExpenseByType[]>`
        SELECT "type", SUM("value")::float AS total FROM "GigRadarExpense"
        WHERE "ts" >= NOW() - INTERVAL '30 days'
        GROUP BY "type" ORDER BY SUM("value") DESC`,
      prisma.$queryRaw<Payout[]>`
        SELECT "platform","expected","amount","ts" FROM "GigRadarPayout"
        ORDER BY "ts" DESC LIMIT 12`,
    ]);
  } catch (e: any) {
    error = e?.message || 'Erro ao consultar o Neon';
  }

  const brl = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

  const bruto = earnings.reduce((s, e) => s + e.gross, 0);
  const horas = earnings.reduce((s, e) => s + e.hours, 0);
  const gastos = expensesByType.reduce((s, e) => s + e.total, 0);
  const fixosSemana = costItems.reduce((s, c) => s + c.value * (PARA_SEMANA[c.period] ?? 0), 0);
  const fixosPeriodo = (fixosSemana / 7) * DIAS;
  const liquido = bruto - gastos - fixosPeriodo;
  const porHora = horas > 0 ? liquido / horas : null;
  const semDados = bruto === 0 && gastos === 0 && costItems.length === 0;

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
        icon="🧾"
        title="Contas — bruto, gastos e líquido"
        subtitle={`Últimos ${DIAS} dias. O bruto é o que a plataforma mostra; o líquido é o que sobra depois de combustível, aluguel e o resto — é esse que paga a conta.`}
      />

      {error && (
        <GigRadarError>
          {error} — aplique <code>migrations/add_gigradar_backup.sql</code> no Neon.
        </GigRadarError>
      )}

      {!error && semDados ? (
        <GigRadarEmpty>
          Nenhum dado financeiro sincronizado ainda. Assim que o app enviar ganhos e gastos, o
          balanço aparece aqui.
        </GigRadarEmpty>
      ) : (
        <>
          {/* Balanço */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 28 }}>
            {[
              ['Bruto', bruto, GIGRADAR.purpleLight, 'o que a plataforma mostrou'],
              ['Combustível e gastos', -gastos, GIGRADAR.orange, 'lançados no app'],
              ['Custos fixos', -fixosPeriodo, GIGRADAR.orange, `${brl(fixosSemana)}/semana`],
              [
                'Líquido',
                liquido,
                liquido >= 0 ? GIGRADAR.green : GIGRADAR.red,
                porHora != null ? `${brl(porHora)}/hora real` : 'sem horas registradas',
              ],
            ].map(([label, valor, cor, nota]) => (
              <div key={String(label)} style={cardBase}>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{String(label)}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: String(cor) }}>{brl(Number(valor))}</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{String(nota)}</div>
              </div>
            ))}
          </div>

          {/* Gastos por tipo */}
          {expensesByType.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h2 style={h2}>Para onde foi o dinheiro</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {expensesByType.map((e) => (
                  <div key={e.type} style={{ ...cardBase, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ color: '#e5e7eb', fontSize: 13 }}>{e.type}</span>
                    <span style={{ marginLeft: 'auto', color: GIGRADAR.orange, fontSize: 14, fontWeight: 600 }}>
                      {brl(e.total)}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: 11, minWidth: 44, textAlign: 'right' }}>
                      {gastos > 0 ? `${Math.round((e.total / gastos) * 100)}%` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custos fixos ligados */}
          {costItems.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h2 style={h2}>Custos fixos ligados ({brl(fixosSemana)}/semana)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {costItems.map((c) => (
                  <div key={c.name} style={{ ...cardBase, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ color: '#e5e7eb', fontSize: 13 }}>{c.name}</span>
                    <span style={{ color: '#6b7280', fontSize: 11 }}>{c.period}</span>
                    <span style={{ marginLeft: 'auto', color: '#d1d5db', fontSize: 13 }}>{brl(c.value)}</span>
                    <span style={{ color: '#6b7280', fontSize: 11, minWidth: 90, textAlign: 'right' }}>
                      = {brl(c.value * (PARA_SEMANA[c.period] ?? 0))}/sem
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Repasses: prometido x recebido */}
          {payouts.length > 0 && (
            <div>
              <h2 style={h2}>Repasses — prometido × recebido</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {payouts.map((p, i) => {
                  const dif = p.expected != null ? p.amount - p.expected : null;
                  return (
                    <div key={i} style={{ ...cardBase, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: '#e5e7eb', fontSize: 13 }}>{p.platform}</span>
                      <span style={{ color: '#9ca3af', fontSize: 12 }}>
                        {new Date(p.ts).toLocaleDateString('pt-BR')}
                      </span>
                      {p.expected != null && (
                        <span style={{ color: '#6b7280', fontSize: 12 }}>prometido {brl(p.expected)}</span>
                      )}
                      <span style={{ marginLeft: 'auto', color: '#d1d5db', fontSize: 13 }}>{brl(p.amount)}</span>
                      {dif != null && Math.abs(dif) >= 0.01 && (
                        <span style={{ color: dif < 0 ? GIGRADAR.red : GIGRADAR.green, fontSize: 12, minWidth: 70, textAlign: 'right' }}>
                          {dif > 0 ? '+' : ''}
                          {brl(dif)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
