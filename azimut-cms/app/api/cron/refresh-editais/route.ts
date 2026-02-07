/**
 * Cron: Pesquisa editais em aberto via DeepSeek/Claude e grava sugestões
 * Vercel Cron chama com CRON_SECRET. Sugestões ficam com status ENVIADO para revisão humana.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';

const CRON_SECRET = process.env.CRON_SECRET;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
/** Se "true", novos editais já são criados como ABERTO e aparecem no site. Se false, ficam ENVIADO para revisão. */
const AUTO_APPROVE = process.env.EDITAIS_AUTO_APPROVE === 'true';

const PROMPT = `Você é um pesquisador de editais e chamadas para arte, cultura e setores criativos. Liste editais e chamadas ABERTAS (inscrições abertas ou rolling) em:

ÁREAS: arte, cultura, cinema, audiovisual, XR/VR, festivais, música, teatro, dança, museus, patrimônio, inovação criativa, educação cultural. Todos os setores: público e privado.

ESCOPO GEOGRÁFICO:
- BRASIL: todo o país (federal, estadual, municipal, de qualquer região).
- CANADÁ: nacional e provincial (todas as províncias).

TIPOS DE FONTE (incluir todos):
- Públicos: FEDERAL, ESTADUAL, MUNICIPAL (BR); NATIONAL, PROVINCIAL (CA).
- Privados e terceiro setor: PRIVADO, ONG, INSTITUTO.
- Festivais (editais de mostras, laboratórios, residências, coprodução).

Retorne APENAS um JSON válido, sem markdown, sem texto antes ou depois. Formato:
[
  {"name": "Nome do edital ou programa", "sourceUrl": "https://url-oficial.com", "country": "BR", "area": "Arte / Festivais", "type": "FEDERAL", "deadline": "31/12/2025 ou null"},
  ...
]

Regras:
- country: apenas "BR" ou "CA"
- type: um de FEDERAL, ESTADUAL, MUNICIPAL, PRIVADO, ONG, INSTITUTO, PROVINCIAL, NATIONAL
- sourceUrl: link oficial (obrigatório)
- deadline: DD/MM/YYYY ou null se rolling/contínuo
- area: resumo em poucas palavras (ex: Arte / Cultura, Festivais, Cinema, XR)
- Liste até 20 itens, variando Brasil e Canadá, públicos e privados, incluindo festivais`;

type AISuggestion = {
  name?: string;
  sourceUrl?: string;
  country?: string;
  area?: string;
  type?: string;
  deadline?: string | null;
};

async function callClaude(): Promise<string> {
  if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY not set');
  const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const model = 'claude-3-5-haiku-20241022';
  const msg = await anthropic.messages.create({
    model,
    max_tokens: 2000,
    messages: [{ role: 'user', content: PROMPT }],
  });
  const block = msg.content[0];
  return block.type === 'text' ? block.text : '';
}

async function callDeepSeek(): Promise<string> {
  if (!DEEPSEEK_API_KEY) throw new Error('DEEPSEEK_API_KEY not set');
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: PROMPT }],
      max_tokens: 2000,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

function parseJsonArray(text: string): AISuggestion[] {
  const cleaned = text.replace(/^[\s\S]*?\[/, '[').replace(/\][\s\S]*$/, ']');
  const parsed = JSON.parse(cleaned);
  return Array.isArray(parsed) ? parsed : [];
}

const VALID_TYPES = ['FEDERAL', 'ESTADUAL', 'MUNICIPAL', 'PRIVADO', 'ONG', 'INSTITUTO', 'PROVINCIAL', 'NATIONAL'];

type NormalizedEdital = {
  name: string;
  sourceUrl: string;
  country: string;
  area: string;
  type: string;
  deadline: string | null;
};

function normalize(s: AISuggestion): NormalizedEdital | null {
  const name = typeof s.name === 'string' ? s.name.trim() : '';
  const sourceUrl = typeof s.sourceUrl === 'string' ? s.sourceUrl.trim() : '';
  if (!name || !sourceUrl || !sourceUrl.startsWith('http')) return null;
  const country = (s.country === 'CA' || s.country === 'BR') ? s.country : 'BR';
  const type = VALID_TYPES.includes(s.type || '') ? s.type! : 'FEDERAL';
  const area = typeof s.area === 'string' ? s.area.trim() : 'Cultura';
  const deadline = s.deadline && typeof s.deadline === 'string' ? s.deadline.trim() : null;
  return { name, sourceUrl, country, area, type, deadline };
}

function parseDeadline(s: string | null): Date | null {
  if (!s) return null;
  const match = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!match) return null;
  const [, d, m, y] = match;
  const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
  return isNaN(date.getTime()) ? null : date;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let raw: string;
  let provider: string;

  try {
    if (ANTHROPIC_API_KEY) {
      raw = await callClaude();
      provider = 'claude';
    } else if (DEEPSEEK_API_KEY) {
      raw = await callDeepSeek();
      provider = 'deepseek';
    } else {
      return NextResponse.json(
        { error: 'Nenhuma chave de IA (ANTHROPIC_API_KEY ou DEEPSEEK_API_KEY) configurada' },
        { status: 500 }
      );
    }
  } catch (e: any) {
    console.error('Cron refresh-editais: IA falhou', e);
    return NextResponse.json(
      { error: 'Chamada à IA falhou', details: e?.message },
      { status: 500 }
    );
  }

  let suggestions: AISuggestion[];
  try {
    suggestions = parseJsonArray(raw);
  } catch (e) {
    console.error('Cron refresh-editais: parse JSON falhou', raw?.slice(0, 300));
    return NextResponse.json(
      { error: 'Resposta da IA não é JSON válido' },
      { status: 500 }
    );
  }

  const created: string[] = [];
  const updated: string[] = [];
  const errors: string[] = [];

  for (const s of suggestions) {
    const n = normalize(s);
    if (!n) {
      errors.push(`Item inválido: ${JSON.stringify(s).slice(0, 80)}`);
      continue;
    }

    try {
      const existing = await prisma.edital.findFirst({
        where: {
          OR: [
            { sourceUrl: n.sourceUrl },
            { name: { equals: n.name, mode: 'insensitive' } },
          ],
        },
      });

      const deadlineDate = parseDeadline(n.deadline || null);

      if (existing) {
        await prisma.edital.update({
          where: { id: existing.id },
          data: {
            lastChecked: new Date(),
            ...(deadlineDate && { deadline: deadlineDate }),
          },
        });
        updated.push(existing.name);
      } else {
        await prisma.edital.create({
          data: {
            name: n.name,
            source: `IA - ${provider}`,
            sourceUrl: n.sourceUrl,
            country: n.country,
            type: n.type as any,
            area: n.area,
            categories: [],
            requiredDocs: [],
            status: AUTO_APPROVE ? 'ABERTO' : 'ENVIADO', // ABERTO = já aparece no site; ENVIADO = revisão humana
            deadline: deadlineDate,
            relevanceScore: 50,
          },
        });
        created.push(n.name);
      }
    } catch (err: any) {
      errors.push(`${n.name}: ${err?.message || 'erro'}`);
    }
  }

  return NextResponse.json({
    ok: true,
    provider,
    autoApprove: AUTO_APPROVE,
    created: created.length,
    updated: updated.length,
    createdNames: created,
    updatedNames: updated,
    errors: errors.length ? errors : undefined,
  });
}
