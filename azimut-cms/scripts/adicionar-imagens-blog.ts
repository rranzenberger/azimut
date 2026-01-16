// ════════════════════════════════════════════════════════════
// SCRIPT: Adicionar Imagens aos Posts do Blog
// ════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️  Adicionando imagens aos posts do blog...\n');

  const updates = [
    {
      slug: 'rio-museu-olimpico-montagem-instalacao',
      coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&q=80',
      coverImageAlt: 'Rio Olympic Museum: Immersive installation and interactive experience',
      name: 'Rio Museu Olímpico',
    },
    {
      slug: 'natal-rio-bonito-instalacao-imersiva',
      coverImageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&h=675&fit=crop&q=80',
      coverImageAlt: 'Natal Rio Bonito: Christmas lights and immersive street installation',
      name: 'Natal Rio Bonito',
    },
    {
      slug: 'vr-ar-experiencias-imersivas-azimut',
      coverImageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&h=675&fit=crop&q=80',
      coverImageAlt: 'VR and AR: Immersive technology creating future experiences',
      name: 'VR e AR',
    },
    {
      slug: 'por-tras-das-cenas-azimut-brasil-canada',
      coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop&q=80',
      coverImageAlt: 'Behind the Scenes: Team collaboration between Brazil and Canada',
      name: 'Por Trás das Cenas',
    },
  ];

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      // Verificar se post existe e se já tem imagem
      const existing = await prisma.blogPost.findUnique({
        where: { slug: update.slug },
        select: { id: true, slug: true, coverImageUrl: true, titlePt: true },
      });

      if (!existing) {
        console.log(`⚠️  Post não encontrado: ${update.slug}`);
        skippedCount++;
        continue;
      }

      if (existing.coverImageUrl) {
        console.log(`⏭️  Já tem imagem: ${existing.titlePt || update.name}`);
        skippedCount++;
        continue;
      }

      // Atualizar post
      await prisma.blogPost.update({
        where: { slug: update.slug },
        data: {
          coverImageUrl: update.coverImageUrl,
          coverImageAlt: update.coverImageAlt,
        },
      });

      console.log(`✅ Adicionada imagem: ${existing.titlePt || update.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${update.name}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log('📊 RESULTADO:');
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ⏭️  Pulados: ${skippedCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log('═'.repeat(50) + '\n');
}

main()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
