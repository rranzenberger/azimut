import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GIGRADAR, GigRadarEmpty, GigRadarError, GigRadarPageHeader } from '../theme';

export const revalidate = 0;

type Place = {
  localId: bigint;
  name: string;
  reason: string | null;
  lat: number | null;
  lng: number | null;
  radius: number | null;
  ts: Date | null;
};
type Risk = {
  localId: bigint;
  type: string | null;
  note: string | null;
  lat: number | null;
  lng: number | null;
  expiresTs: Date | null;
};
type Zone = { cell: string; label: string | null; score: number | null; samples: number | null; avgValue: number | null };
type Station = { name: string; fuelType: string | null; price: number | null; favorite: boolean; lat: number | null; lng: number | null };

/**
 * Mapa de risco e de bons pontos — o diferencial do GigRadar sobre Gridwise/Solo.
 * Nenhum concorrente sabe que aquela rua é servidão que arranha o carro, que aquele
 * ponto não tem retorno, ou que aquela rodoviária costuma render. Esse conhecimento
 * é do motorista, e é o que faz o veredito ser real em vez de só matemática.
 *
 * As categorias abaixo são as mesmas do app (PlacesActivity / strings.xml).
 */
const CATEGORIAS: Record<string, { icon: string; cor: string }> = {
  'Ladeira íngreme': { icon: '⛰️', cor: GIGRADAR.orange },
  'Sem retorno': { icon: '↩️', cor: GIGRADAR.orange },
  'Areia/terra': { icon: '🏜️', cor: GIGRADAR.orange },
  Perigoso: { icon: '🚨', cor: GIGRADAR.red },
  'Mercado/restaurante lento': { icon: '🛒', cor: GIGRADAR.purpleLight },
  Outro: { icon: '📍', cor: '#9ca3af' },
};

function catDe(reason: string | null) {
  if (!reason) return CATEGORIAS.Outro;
  for (const [nome, cfg] of Object.entries(CATEGORIAS)) {
    if (reason.includes(nome)) return cfg;
  }
  return CATEGORIAS.Outro;
}

const mapsUrl = (lat: number | null, lng: number | null) =>
  lat != null && lng != null ? `https://www.google.com/maps?q=${lat},${lng}` : null;

export default async function GigRadarMapaPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let places: Place[] = [];
  let risks: Risk[] = [];
  let zones: Zone[] = [];
  let stations: Station[] = [];
  let error: string | null = null;

  try {
    [places, risks, zones, stations] = await Promise.all([
      prisma.$queryRaw<Place[]>`
        SELECT "localId","name","reason","lat","lng","radius","ts"
        FROM "GigRadarPlace" ORDER BY "ts" DESC NULLS LAST`,
      prisma.$queryRaw<Risk[]>`
        SELECT "localId","type","note","lat","lng","expiresTs"
        FROM "GigRadarRisk" WHERE "expiresTs" IS NULL OR "expiresTs" > NOW()
        ORDER BY "createdTs" DESC NULLS LAST`,
      prisma.$queryRaw<Zone[]>`
        SELECT "cell","label","score","samples","avgValue"
        FROM "GigRadarZone" ORDER BY "score" DESC NULLS LAST LIMIT 40`,
      prisma.$queryRaw<Station[]>`
        SELECT "name","fuelType","price","favorite","lat","lng"
        FROM "GigRadarStation" ORDER BY "favorite" DESC, "price" ASC NULLS LAST`,
    ]);
  } catch (e: any) {
    error = e?.message || 'Erro ao consultar o Neon';
  }

  // Quantos locais por categoria — mostra onde está concentrado o conhecimento do motorista
  const porCategoria = new Map<string, number>();
  for (const p of places) {
    for (const nome of Object.keys(CATEGORIAS)) {
      if (p.reason?.includes(nome)) porCategoria.set(nome, (porCategoria.get(nome) ?? 0) + 1);
    }
  }

  const bloco = { marginBottom: 28 } as const;
  const h2 = { fontSize: 14, fontWeight: 600, color: '#e5e7eb', margin: '0 0 10px' } as const;
  const cardBase = {
    background: GIGRADAR.cardBg,
    border: `1px solid ${GIGRADAR.cardBorder}`,
    borderRadius: 10,
    padding: '10px 14px',
  } as const;

  return (
    <div style={{ padding: 24 }}>
      <GigRadarPageHeader
        icon="🗺️"
        title="Mapa de risco e bons pontos"
        subtitle="O que o motorista aprendeu na rua: servidão que arranha, ladeira, ponto sem retorno, comunidade a evitar — e também os bons: postos e pontos que rendem. É isso que nenhum concorrente tem."
      />

      {error && (
        <GigRadarError>
          {error} — aplique <code>migrations/add_gigradar_backup.sql</code> no Neon.
        </GigRadarError>
      )}

      {/* Resumo por categoria */}
      {porCategoria.size > 0 && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', ...bloco }}>
          {Object.entries(CATEGORIAS).map(([nome, cfg]) => {
            const n = porCategoria.get(nome) ?? 0;
            if (n === 0) return null;
            return (
              <div key={nome} style={{ ...cardBase, minWidth: 120 }}>
                <div style={{ fontSize: 20 }}>{cfg.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: cfg.cor }}>{n}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{nome}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Locais a evitar */}
      <div style={bloco}>
        <h2 style={h2}>📍 Locais a evitar {places.length > 0 && `(${places.length})`}</h2>
        {places.length === 0 ? (
          <GigRadarEmpty>
            Nenhum local sincronizado. Este banco já foi apagado uma vez no aparelho por uma
            migração destrutiva (corrigida em 27/jul) — por isso ele precisa viver aqui também.
          </GigRadarEmpty>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {places.map((p) => {
              const cfg = catDe(p.reason);
              const url = mapsUrl(p.lat, p.lng);
              return (
                <div key={String(p.localId)} style={{ ...cardBase, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16 }}>{cfg.icon}</span>
                  <span style={{ color: '#e5e7eb', fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                  <span style={{ color: cfg.cor, fontSize: 12 }}>{p.reason || '—'}</span>
                  {p.radius != null && (
                    <span style={{ color: '#6b7280', fontSize: 11 }}>raio {Math.round(p.radius)} m</span>
                  )}
                  {url && (
                    <a href={url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', fontSize: 12, color: GIGRADAR.purpleLight, textDecoration: 'none' }}>
                      ver no mapa ↗
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Riscos temporários */}
      {risks.length > 0 && (
        <div style={bloco}>
          <h2 style={h2}>⚠️ Riscos temporários ativos ({risks.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {risks.map((r) => {
              const url = mapsUrl(r.lat, r.lng);
              return (
                <div key={String(r.localId)} style={{ ...cardBase, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ color: GIGRADAR.orange, fontSize: 13 }}>{r.type || 'risco'}</span>
                  {r.note && <span style={{ color: '#9ca3af', fontSize: 12 }}>{r.note}</span>}
                  {r.expiresTs && (
                    <span style={{ color: '#6b7280', fontSize: 11 }}>
                      expira {new Date(r.expiresTs).toLocaleString('pt-BR')}
                    </span>
                  )}
                  {url && (
                    <a href={url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', fontSize: 12, color: GIGRADAR.purpleLight, textDecoration: 'none' }}>
                      ver no mapa ↗
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Zonas aprendidas */}
      <div style={bloco}>
        <h2 style={h2}>🟢 Zonas que rendem {zones.length > 0 && `(top ${zones.length})`}</h2>
        {zones.length === 0 ? (
          <GigRadarEmpty>Nenhuma zona sincronizada ainda.</GigRadarEmpty>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {zones.map((z) => (
              <div key={z.cell} style={{ ...cardBase, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ color: '#e5e7eb', fontSize: 13 }}>{z.label || z.cell}</span>
                {z.score != null && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: z.score >= 0.6 ? 'rgba(34,197,94,0.15)' : 'rgba(249,115,22,0.15)',
                      border: `1px solid ${z.score >= 0.6 ? 'rgba(34,197,94,0.35)' : 'rgba(249,115,22,0.35)'}`,
                      color: z.score >= 0.6 ? GIGRADAR.green : GIGRADAR.orange,
                    }}
                  >
                    score {z.score.toFixed(2)}
                  </span>
                )}
                {z.avgValue != null && (
                  <span style={{ color: '#9ca3af', fontSize: 12 }}>
                    média R$ {z.avgValue.toFixed(2).replace('.', ',')}
                  </span>
                )}
                {z.samples != null && <span style={{ color: '#6b7280', fontSize: 11 }}>{z.samples} oferta(s)</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Postos */}
      <div style={bloco}>
        <h2 style={h2}>⛽ Postos {stations.length > 0 && `(${stations.length})`}</h2>
        {stations.length === 0 ? (
          <GigRadarEmpty>Nenhum posto sincronizado ainda.</GigRadarEmpty>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stations.map((s, i) => {
              const url = mapsUrl(s.lat, s.lng);
              return (
                <div key={i} style={{ ...cardBase, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  {s.favorite && <span title="Preferido">⭐</span>}
                  <span style={{ color: '#e5e7eb', fontSize: 13 }}>{s.name}</span>
                  {s.fuelType && <span style={{ color: '#9ca3af', fontSize: 12 }}>{s.fuelType}</span>}
                  {s.price != null && (
                    <span style={{ color: GIGRADAR.orange, fontSize: 13 }}>
                      R$ {s.price.toFixed(3).replace('.', ',')}
                    </span>
                  )}
                  {url && (
                    <a href={url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', fontSize: 12, color: GIGRADAR.purpleLight, textDecoration: 'none' }}>
                      ver no mapa ↗
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
