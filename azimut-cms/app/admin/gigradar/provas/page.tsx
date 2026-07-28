import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GIGRADAR, GigRadarEmpty, GigRadarError, GigRadarPageHeader } from '../theme';

export const revalidate = 0;

type Shot = {
  id: string;
  localName: string;
  tag: string | null;
  verdict: string | null;
  platform: string | null;
  rideLocalId: bigint | null;
  url: string | null;
  sizeBytes: number | null;
  redacted: boolean;
  ts: Date;
  expiresAt: Date;
};

/**
 * Provas em imagem — o print que foi pro OCR em cada oferta.
 *
 * É o que permite responder "por que o app leu errado?" olhando a tela real em vez de
 * adivinhar pelo log. Mas contém endereço de embarque e destino de passageiros: por isso
 * tem prazo de validade e some sozinho. Guardar print de terceiro por tempo indeterminado
 * não se justifica nem tecnicamente nem legalmente.
 */
const VERDICT_COR: Record<string, string> = {
  GREEN: GIGRADAR.green,
  YELLOW: GIGRADAR.orange,
  RED: GIGRADAR.red,
};

export default async function GigRadarProvasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let shots: Shot[] = [];
  let error: string | null = null;

  try {
    shots = await prisma.$queryRaw<Shot[]>`
      SELECT "id","localName","tag","verdict","platform","rideLocalId","url",
             "sizeBytes","redacted","ts","expiresAt"
      FROM "GigRadarShot" ORDER BY "ts" DESC LIMIT 200`;
  } catch (e: any) {
    error = e?.message || 'Erro ao consultar o Neon';
  }

  const agora = Date.now();
  const vencendo = shots.filter(
    (s) => new Date(s.expiresAt).getTime() - agora < 7 * 86_400_000
  ).length;
  const semRedacao = shots.filter((s) => !s.redacted).length;
  const totalMb = shots.reduce((s, x) => s + (x.sizeBytes ?? 0), 0) / 1_048_576;

  const cardBase = {
    background: GIGRADAR.cardBg,
    border: `1px solid ${GIGRADAR.cardBorder}`,
    borderRadius: 10,
    padding: '10px 14px',
  } as const;

  return (
    <div style={{ padding: 24 }}>
      <GigRadarPageHeader
        icon="📸"
        title="Provas em imagem"
        subtitle="O print que foi pro OCR em cada oferta. Serve pra entender por que o app leu certo ou errado — e some sozinho no prazo, porque contém endereço de passageiro."
      />

      {error && (
        <GigRadarError>
          {error} — aplique <code>migrations/add_gigradar_shift_shots.sql</code> no Neon.
        </GigRadarError>
      )}

      {shots.length > 0 && (
        <>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              ['Prints guardados', String(shots.length), GIGRADAR.purpleLight],
              ['Espaço', `${totalMb.toFixed(1)} MB`, GIGRADAR.purpleLight],
              ['Vencem em 7 dias', String(vencendo), GIGRADAR.orange],
              ['Sem endereço borrado', String(semRedacao), semRedacao > 0 ? GIGRADAR.red : GIGRADAR.green],
            ].map(([label, valor, cor]) => (
              <div key={label} style={{ ...cardBase, minWidth: 140 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: cor }}>{valor}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{label}</div>
              </div>
            ))}
          </div>

          {semRedacao > 0 && (
            <div
              style={{
                background: 'rgba(249,115,22,0.12)',
                border: '1px solid rgba(249,115,22,0.35)',
                color: GIGRADAR.orange,
                padding: '10px 14px',
                borderRadius: 8,
                marginBottom: 20,
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              {semRedacao} print(s) subiram com o endereço do passageiro visível. Enquanto for só o
              aparelho do Ranz em teste, é diagnóstico. Antes de ligar isso para os beta testers,
              borrar o endereço no app antes do envio — são dados de terceiros que não consentiram.
            </div>
          )}
        </>
      )}

      {!error && shots.length === 0 ? (
        <GigRadarEmpty>
          Nenhuma prova sincronizada. O app já captura o print de toda oferta no aparelho
          (<code>files/diag_shots</code>, 80 mais recentes) — falta só o envio.
        </GigRadarEmpty>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {shots.map((s) => {
            const diasPraVencer = Math.ceil((new Date(s.expiresAt).getTime() - agora) / 86_400_000);
            return (
              <div key={s.id} style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
                {s.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.url}
                    alt={s.tag || 'print da oferta'}
                    style={{ width: '100%', display: 'block', background: '#000' }}
                  />
                ) : (
                  <div
                    style={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4b5563',
                      fontSize: 12,
                    }}
                  >
                    imagem no banco
                  </div>
                )}
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                    {s.verdict && (
                      <span style={{ color: VERDICT_COR[s.verdict] ?? '#9ca3af', fontSize: 12, fontWeight: 600 }}>
                        {s.verdict}
                      </span>
                    )}
                    {s.tag && <span style={{ color: '#9ca3af', fontSize: 11 }}>{s.tag}</span>}
                    {!s.redacted && <span title="endereço visível">⚠️</span>}
                  </div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>
                    {new Date(s.ts).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  </div>
                  <div style={{ fontSize: 11, color: diasPraVencer <= 7 ? GIGRADAR.orange : '#4b5563' }}>
                    some em {diasPraVencer} dia(s)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
