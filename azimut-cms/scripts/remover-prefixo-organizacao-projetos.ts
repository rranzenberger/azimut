/**
 * Remove o prefixo "Organização - " (e equivalentes em EN/ES/FR) dos títulos dos projetos.
 * Uso: npx tsx scripts/remover-prefixo-organizacao-projetos.ts
 *
 * Requer DATABASE_URL no .env (mesmo do backoffice).
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PREFIX_REGEX = /^(Organização|Organization|Organización|Organisation) - \s*/i;

function stripPrefix(s: string | null): string | null {
  if (s == null || s === '') return s;
  const trimmed = s.replace(PREFIX_REGEX, '').trim();
  return trimmed === '' ? s : trimmed;
}

async function main() {
  console.log('Buscando projetos que começam com "Organização - " (ou equivalentes)...\n');

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      shortTitle: true,
      seoTitlePt: true,
      seoTitleEn: true,
      seoTitleEs: true,
      seoTitleFr: true,
    },
  });

  const toUpdate = projects.filter(
    (p) =>
      PREFIX_REGEX.test(p.title) ||
      (p.shortTitle != null && PREFIX_REGEX.test(p.shortTitle)) ||
      (p.seoTitlePt != null && PREFIX_REGEX.test(p.seoTitlePt)) ||
      (p.seoTitleEn != null && PREFIX_REGEX.test(p.seoTitleEn)) ||
      (p.seoTitleEs != null && PREFIX_REGEX.test(p.seoTitleEs)) ||
      (p.seoTitleFr != null && PREFIX_REGEX.test(p.seoTitleFr))
  );

  if (toUpdate.length === 0) {
    console.log('Nenhum projeto com esse prefixo encontrado.');
    return;
  }

  console.log(`Encontrados ${toUpdate.length} projeto(s). Atualizando...\n`);

  for (const p of toUpdate) {
    const newTitle = stripPrefix(p.title);
    const newShortTitle = p.shortTitle ? stripPrefix(p.shortTitle) : p.shortTitle;
    const newSeoTitlePt = p.seoTitlePt ? stripPrefix(p.seoTitlePt) : p.seoTitlePt;
    const newSeoTitleEn = p.seoTitleEn ? stripPrefix(p.seoTitleEn) : p.seoTitleEn;
    const newSeoTitleEs = p.seoTitleEs ? stripPrefix(p.seoTitleEs) : p.seoTitleEs;
    const newSeoTitleFr = p.seoTitleFr ? stripPrefix(p.seoTitleFr) : p.seoTitleFr;

    const changed =
      newTitle !== p.title ||
      newShortTitle !== p.shortTitle ||
      newSeoTitlePt !== p.seoTitlePt ||
      newSeoTitleEn !== p.seoTitleEn ||
      newSeoTitleEs !== p.seoTitleEs ||
      newSeoTitleFr !== p.seoTitleFr;

    if (!changed) continue;

    await prisma.project.update({
      where: { id: p.id },
      data: {
        title: newTitle ?? p.title,
        shortTitle: newShortTitle ?? undefined,
        seoTitlePt: newSeoTitlePt ?? undefined,
        seoTitleEn: newSeoTitleEn ?? undefined,
        seoTitleEs: newSeoTitleEs ?? undefined,
        seoTitleFr: newSeoTitleFr ?? undefined,
      },
    });

    console.log(`  [OK] ${p.slug}`);
    console.log(`       Antes: ${p.title}`);
    console.log(`       Depois: ${newTitle}\n`);
  }

  console.log(`Concluído: ${toUpdate.length} projeto(s) atualizado(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
