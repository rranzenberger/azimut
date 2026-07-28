import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { GigRadarLogo } from '../components/GigRadarLogo';
import { GIGRADAR, GigRadarCard, GigRadarEmpty, GigRadarError } from './theme';

export const revalidate = 0;

/**
 * Painel do GigRadar — área própria do app dentro do backoffice, separada do site.
 *
 * Lê o Neon por SQL cru de propósito: as tabelas do backup foram aplicadas direto no
 * SQL Editor (27/jul) e ainda não estão no schema.prisma, então `$queryRaw` deixa a
 * página funcionar antes do `prisma db pull`.
 */
export default async function GigRadarHubPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;
  if (!session) redirect('/login');

  let stats = {
    devices: 0,
    betaLeads: 0,
    logs: 0,
    expenses: 0,
    rides: 0,
    shifts: 0,
    lastSync: null as Date | null,
  };
  let error: string | null = null;

  try {
    const [devices, expenses, rides, shifts, lastSync, logs, betaLeads] = await Promise.all([
      prisma.$queryRaw<{ n: bigint }[]>`SELECT COUNT(*)::bigint AS n FROM "GigRadarDevice"`,
      prisma.$queryRaw<{ n: bigint }[]>`SELECT COUNT(*)::bigint AS n FROM "GigRadarExpense"`,
      prisma.$queryRaw<{ n: bigint }[]>`SELECT COUNT(*)::bigint AS n FROM "GigRadarRide"`,
      prisma.$queryRaw<{ n: bigint }[]>`SELECT COUNT(*)::bigint AS n FROM "GigRadarShift"`,
      prisma.$queryRaw<{ t: Date | null }[]>`SELECT MAX("createdAt") AS t FROM "GigRadarSync"`,
      prisma.$queryRaw<{ n: bigint }[]>`SELECT COUNT(*)::bigint AS n FROM "GigRadarLog"`,
      prisma.$queryRaw<{ n: bigint }[]>`SELECT COUNT(*)::bigint AS n FROM "Lead" WHERE "leadType"::text = 'GIGRADAR_BETA'`,
    ]);
    stats = {
      devices: Number(devices[0]?.n ?? 0),
      expenses: Number(expenses[0]?.n ?? 0),
      rides: Number(rides[0]?.n ?? 0),
      shifts: Number(shifts[0]?.n ?? 0),
      lastSync: lastSync[0]?.t ?? null,
      logs: Number(logs[0]?.n ?? 0),
      betaLeads: Number(betaLeads[0]?.n ?? 0),
    };
  } catch (e: any) {
    error = e?.message || 'Erro ao consultar o Neon';
  }

  const areas = [
    {
      href: '/admin/gigradar/backup',
      icon: '💾',
      title: 'Backup e sincronização',
      desc: 'O que o aparelho já subiu e há quanto tempo. É daqui que os dados voltam se o app for resetado.',
      badge: stats.lastSync ? new Date(stats.lastSync).toLocaleString('pt-BR') : 'nunca sincronizou',
      warn: !stats.lastSync,
    },
    {
      href: '/admin/gigradar/fuel',
      icon: '⛽',
      title: 'Combustível e custo por km',
      desc: 'Abastecimentos lançados, preço real por litro/m³ e o custo por km que alimenta o veredito.',
      badge: `${stats.expenses} lançamento(s)`,
      warn: stats.expenses === 0,
    },
    {
      href: '/admin/gigradar/contas',
      icon: '🧾',
      title: 'Contas — bruto e líquido',
      desc: 'Ganho bruto, gastos, custos fixos e o que sobra de verdade. É o líquido que o veredito defende.',
      badge: `${stats.shifts} turno(s)`,
      warn: false,
    },
    {
      href: '/admin/gigradar/mapa',
      icon: '🗺️',
      title: 'Mapa de risco e bons pontos',
      desc: 'Servidão, ladeira, sem retorno, área perigosa — e os bons: zonas que rendem e postos. Nosso diferencial.',
      badge: 'conhecimento de rua',
      warn: false,
    },
    {
      href: '/admin/gigradar/testers',
      icon: '👥',
      title: 'Beta testers',
      desc: 'Quem se cadastrou pela landing /gigradar. O código de liberação vai por WhatsApp.',
      badge: `${stats.betaLeads} cadastro(s)`,
      warn: false,
    },
    {
      href: '/admin/gigradar-logs',
      icon: '🧪',
      title: 'Logs de diagnóstico',
      desc: 'Logs enviados pelo botão "Enviar log" no app, já com resumo automático por IA.',
      badge: `${stats.logs} log(s)`,
      warn: false,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <GigRadarLogo size={32} />
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 }}>GigRadar</h1>
      </div>
      <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 14 }}>
        Área do app de motorista, separada do site. Os dados do aparelho sobem para cá para não
        depender de uma cópia única no telefone.
      </p>

      {error && (
        <GigRadarError>
          {error} — se as tabelas ainda não existem, aplique{' '}
          <code>migrations/add_gigradar_backup.sql</code> no Neon.
        </GigRadarError>
      )}

      {/* Resumo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          ['Aparelhos', stats.devices],
          ['Abastecimentos', stats.expenses],
          ['Corridas', stats.rides],
          ['Turnos', stats.shifts],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            style={{
              background: GIGRADAR.cardBg,
              border: `1px solid ${GIGRADAR.cardBorder}`,
              borderRadius: 12,
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: GIGRADAR.purpleLight }}>{String(value)}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{String(label)}</div>
          </div>
        ))}
      </div>

      {/* Submenus */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {areas.map((a) => (
          <Link key={a.href} href={a.href} style={{ textDecoration: 'none' }}>
            <GigRadarCard hover>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#e5e7eb' }}>{a.title}</span>
              </div>
              <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5, margin: '0 0 10px' }}>{a.desc}</p>
              <span
                style={{
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: a.warn ? 'rgba(249,115,22,0.15)' : 'rgba(139,92,246,0.15)',
                  border: `1px solid ${a.warn ? 'rgba(249,115,22,0.35)' : 'rgba(139,92,246,0.35)'}`,
                  color: a.warn ? GIGRADAR.orange : GIGRADAR.purpleLight,
                }}
              >
                {a.badge}
              </span>
            </GigRadarCard>
          </Link>
        ))}
      </div>

      {!error && stats.devices === 0 && (
        <GigRadarEmpty>
          Nenhum aparelho sincronizou ainda. As tabelas estão prontas no Neon, esperando o app
          enviar o primeiro lote.
        </GigRadarEmpty>
      )}
    </div>
  );
}
