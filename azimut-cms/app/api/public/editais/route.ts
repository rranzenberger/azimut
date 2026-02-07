/**
 * API Pública: Editais (Oportunidades Ativas)
 * GET sem autenticação - retorna editais ABERTOS para o site
 * Formato compatível com o componente OportunidadesAtivas
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

const SITE_COUNTRIES = ['BR', 'CA', 'EU', 'US', 'INTL'] as const;
type SiteCountry = typeof SITE_COUNTRIES[number];

function mapCountry(c: string): SiteCountry {
  const u = c?.toUpperCase().trim();
  if (SITE_COUNTRIES.includes(u as SiteCountry)) return u as SiteCountry;
  if (u === 'CANADA' || u === 'CA') return 'CA';
  if (u === 'BRASIL' || u === 'BRAZIL') return 'BR';
  if (u === 'EUROPA' || u === 'EUROPE') return 'EU';
  if (u === 'EUA' || u === 'USA') return 'US';
  return 'INTL';
}

function mapStatus(s: string): 'open' | 'upcoming' | 'closed' {
  const u = s?.toUpperCase();
  if (u === 'ABERTO') return 'open';
  if (u === 'FECHADO' || u === 'GANHO' || u === 'PERDIDO') return 'closed';
  return 'upcoming'; // ENVIADO etc
}

function inferDisplayType(area: string, categories: string[]): 'cultural' | 'film' | 'xr' | 'innovation' | 'education' | 'brand' {
  const text = `${(area || '').toLowerCase()} ${(categories || []).join(' ').toLowerCase()}`;
  if (/\b(xr|vr|ar|imersiv|360)\b/.test(text)) return 'xr';
  if (/\b(cinema|filme|film|audiovisual)\b/.test(text)) return 'film';
  if (/\b(educa|curso|training)\b/.test(text)) return 'education';
  if (/\b(inova|tech|tecnologia)\b/.test(text)) return 'innovation';
  if (/\b(marca|brand|ativa)\b/.test(text)) return 'brand';
  return 'cultural';
}

function inferEligibility(eligibility: string | null): 'individual' | 'micro' | 'company' | 'coproduction' {
  const e = (eligibility || '').toLowerCase();
  if (/\b(individual|pessoa)\b/.test(e)) return 'individual';
  if (/\b(micro|mei)\b/.test(e)) return 'micro';
  if (/\b(coprodu|co-prod)\b/.test(e)) return 'coproduction';
  return 'company';
}

function inferFundingType(categories: string[]): 'grant' | 'matching' | 'tax_incentive' {
  const text = (categories || []).join(' ').toLowerCase();
  if (/\b(incentivo|fiscal|rouanet|lei)\b/.test(text)) return 'tax_incentive';
  if (/\b(matching|contrapartida)\b/.test(text)) return 'matching';
  return 'grant';
}

function formatDeadline(d: Date | null): string {
  if (!d) return 'Chamada contínua';
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status'); // optional: open, upcoming, all
    const countryFilter = searchParams.get('country'); // optional: BR, CA, etc.
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);

    const where: { status?: any; country?: string } = {};
    // Por padrão mostrar ABERTO e ENVIADO (open + upcoming)
    if (!statusFilter || statusFilter === 'open') {
      where.status = { in: ['ABERTO'] };
    } else if (statusFilter === 'upcoming') {
      where.status = { in: ['ENVIADO'] };
    } else if (statusFilter === 'all') {
      where.status = { in: ['ABERTO', 'ENVIADO', 'FECHADO'] };
    } else {
      where.status = { in: ['ABERTO', 'ENVIADO'] };
    }
    if (countryFilter && countryFilter !== 'ALL') {
      where.country = countryFilter.toUpperCase();
    }

    const editais = await prisma.edital.findMany({
      where,
      orderBy: [
        { relevanceScore: 'desc' },
        { deadline: 'asc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    const opportunities = editais.map((e) => ({
      id: e.id,
      name: e.name,
      country: mapCountry(e.country),
      type: inferDisplayType(e.area, e.categories),
      area: e.area,
      eligibility: inferEligibility(e.eligibility),
      fundingType: inferFundingType(e.categories),
      deadline: e.deadline ? formatDeadline(e.deadline) : (e.applicationDeadline ? formatDeadline(e.applicationDeadline) : 'Chamada contínua'),
      status: mapStatus(e.status),
      sourceUrl: e.sourceUrl,
    }));

    return NextResponse.json(
      { opportunities },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Public editais API error:', error);
    return NextResponse.json(
      { opportunities: [] },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
