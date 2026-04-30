/**
 * Normaliza nomes de videos do demoreel na biblioteca de midias.
 * Uso: npx tsx scripts/normalizar-demoreel-videos.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getFileNameFromUrl(url: string): string {
  try {
    const noQuery = url.split('?')[0];
    const last = noQuery.split('/').pop() || 'video';
    return decodeURIComponent(last).trim() || 'video';
  } catch {
    return 'video';
  }
}

function shouldRename(altPt: string | null): boolean {
  if (!altPt) return true;
  const normalized = altPt.trim().toLowerCase();
  return (
    normalized === '' ||
    normalized === 'vídeo' ||
    normalized === 'video' ||
    normalized === 'vídeo home' ||
    normalized === 'video home' ||
    normalized === 'vídeo page' ||
    normalized === 'video page' ||
    normalized === 'vídeo hero' ||
    normalized === 'video hero'
  );
}

async function main() {
  console.log('Buscando videos de demoreel para normalizar nomes...\n');

  const videos = await prisma.media.findMany({
    where: {
      type: 'VIDEO',
      OR: [
        { imageType: 'demoreel' },
        { sectionSlug: 'hero' },
        { pageSlug: 'home' },
      ],
    },
    select: {
      id: true,
      originalUrl: true,
      altPt: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (videos.length === 0) {
    console.log('Nenhum video de demoreel encontrado.');
    return;
  }

  let renamed = 0;
  for (const media of videos) {
    if (!shouldRename(media.altPt)) continue;
    const filename = getFileNameFromUrl(media.originalUrl);
    const date = media.createdAt.toISOString().slice(0, 10);
    const newAlt = `Demoreel ${date} - ${filename}`;

    await prisma.media.update({
      where: { id: media.id },
      data: { altPt: newAlt },
    });

    renamed += 1;
    console.log(`[OK] ${media.id} -> ${newAlt}`);
  }

  console.log(`\nConcluido. ${renamed} video(s) renomeado(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
