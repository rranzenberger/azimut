import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function restoreFromJsonBackup() {
  try {
    console.log('📖 Lendo backup JSON...');
    const backupData = JSON.parse(
      fs.readFileSync('./backups/backup-2026-01-07.json', 'utf8')
    );

    console.log(`⏰ Backup de: ${backupData.timestamp}`);
    console.log(`📊 Versão: ${backupData.version}`);

    // Restaurar Pages
    if (backupData.data.pages) {
      console.log(`🔄 Restaurando ${backupData.data.pages.length} páginas...`);
      for (const page of backupData.data.pages) {
        try {
          await prisma.page.update({
            where: { slug: page.slug },
            data: page
          });
        } catch (e) {
          await prisma.page.create({ data: page });
        }
      }
      console.log('✅ Páginas restauradas!');
    }

    // Restaurar Projects
    if (backupData.data.projects) {
      console.log(`🔄 Restaurando ${backupData.data.projects.length} projetos...`);
      for (const project of backupData.data.projects) {
        await prisma.project.upsert({
          where: { id: project.id },
          update: project,
          create: project
        });
      }
      console.log('✅ Projetos restaurados!');
    }

    // Restaurar Media
    if (backupData.data.media) {
      console.log(`🔄 Restaurando ${backupData.data.media.length} mídias...`);
      for (const item of backupData.data.media) {
        await prisma.media.upsert({
          where: { id: item.id },
          update: item,
          create: item
        });
      }
      console.log('✅ Mídias restauradas!');
    }

    console.log('\n🎉 Backup restaurado com sucesso!');
    console.log('🚀 Faça redeploy no Vercel para atualizar o site');

  } catch (error: any) {
    console.error('❌ Erro ao restaurar backup:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreFromJsonBackup();
