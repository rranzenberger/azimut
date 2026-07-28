import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

/**
 * Remove campos de relação (objetos aninhados / arrays de objetos) que o Prisma
 * não aceita num create/update simples. Mantém escalares e arrays de escalares.
 */
function stripRelations(row: any): any {
  const out: any = {};
  for (const [key, value] of Object.entries(row)) {
    if (value === null || value === undefined) {
      out[key] = value;
      continue;
    }
    if (Array.isArray(value)) {
      // array de objetos = relação; array de strings/números = campo escalar
      if (value.length > 0 && typeof value[0] === 'object') continue;
      out[key] = value;
      continue;
    }
    if (typeof value === 'object') continue; // objeto aninhado = relação
    out[key] = value;
  }
  return out;
}

async function restoreTable(
  label: string,
  rows: any[],
  uniqueKey: string,
  upsert: (where: any, data: any) => Promise<any>
) {
  console.log(`\n🔄 ${label}: ${rows.length} registros no backup`);
  let ok = 0;
  let fail = 0;

  for (const row of rows) {
    const data = stripRelations(row);
    try {
      await upsert({ [uniqueKey]: row[uniqueKey] }, data);
      ok++;
    } catch (error: any) {
      fail++;
      console.error(`   ⚠️ ${row[uniqueKey]}: ${error.message.split('\n')[0]}`);
    }
  }

  console.log(`   ✅ ${ok} restaurados${fail ? ` | ⚠️ ${fail} falharam` : ''}`);
  return { ok, fail };
}

async function main() {
  const backupPath = path.join(__dirname, 'backups', 'backup-2026-01-07.json');
  console.log('📖 Lendo backup de 07/jan/2026...');
  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  const d = backup.data;

  // TAGS — chave única: slug
  if (d.tags?.length) {
    await restoreTable('Tags', d.tags, 'slug', (where, data) =>
      prisma.tag.upsert({ where, update: data, create: data })
    );
  }

  // MARKETS — chave única: code
  if (d.markets?.length) {
    await restoreTable('Markets', d.markets, 'code', (where, data) =>
      prisma.market.upsert({ where, update: data, create: data })
    );
  }

  // LEADS — chave única: id (email não é unique no schema)
  // assignedToId/prospeccaoId apontam pra User/ProspeccaoAtiva que não restauramos:
  // zerar essas FKs em vez de falhar o registro inteiro.
  if (d.leads?.length) {
    const cleanedLeads = d.leads.map((lead: any) => ({
      ...lead,
      assignedToId: null,
      assignedAt: null,
      prospeccaoId: null,
    }));
    await restoreTable('Leads', cleanedLeads, 'id', (where, data) =>
      prisma.lead.upsert({ where, update: data, create: data })
    );
  }

  // SETTINGS — singleton
  if (d.settings) {
    const rows = Array.isArray(d.settings) ? d.settings : [d.settings];
    await restoreTable('Settings', rows, 'id', (where, data) =>
      prisma.settings.upsert({ where, update: data, create: data })
    );
  }

  // Contagem final
  console.log('\n📊 Estado final do banco:');
  console.log(`   📄 Pages:    ${await prisma.page.count()}`);
  console.log(`   📁 Projects: ${await prisma.project.count()}`);
  console.log(`   🛠️ Services: ${await prisma.service.count()}`);
  console.log(`   🏷️ Tags:     ${await prisma.tag.count()}`);
  console.log(`   🌍 Markets:  ${await prisma.market.count()}`);
  console.log(`   👤 Leads:    ${await prisma.lead.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro geral:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
