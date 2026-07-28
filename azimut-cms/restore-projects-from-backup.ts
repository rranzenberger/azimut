import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Campos válidos do schema Project
const VALID_PROJECT_FIELDS = [
  'slug', 'title', 'shortTitle', 'summaryPt', 'summaryEn', 'summaryEs', 'summaryFr',
  'city', 'stateProvince', 'country', 'year', 'client', 'type', 'featured',
  'priorityHome', 'status', 'ctaLabelPt', 'ctaLabelEn', 'ctaUrl', 'descriptionEn',
  'descriptionEs', 'descriptionFr', 'descriptionPt', 'azimutContributions',
  'creditText', 'creditType', 'monitorEnabled', 'monitorKeywords', 'projectCategory',
  'workType', 'technologies', 'industry', 'azimutRole', 'duration', 'videoUrl',
  'videoShowreel', 'partnerLogos', 'currentCity', 'exhibitionStatus', 'hasDetailPage',
  'thumbnailUrl', 'seoTitlePt', 'seoTitleEn', 'seoTitleEs', 'seoTitleFr',
  'seoDescPt', 'seoDescEn', 'seoDescEs', 'seoDescFr', 'seoKeywords', 'month',
  'partnership', 'coproduction', 'yearStart', 'monthStart', 'yearEnd', 'monthEnd',
  'heroImageFit', 'heroImagePosition', 'isItinerant', 'exhibitionCities', 'externalLinks',
  'beforeAfterImages', 'awards', 'metrics'
];

function cleanProjectData(project: any): any {
  const cleaned: any = {};

  // Copiar apenas campos válidos
  for (const field of VALID_PROJECT_FIELDS) {
    if (field in project) {
      const value = project[field];
      // Se é um array ou objeto, deixar como está (Prisma vai serializar)
      cleaned[field] = value;
    }
  }

  return cleaned;
}

async function restoreProjectsFromBackup() {
  try {
    console.log('📖 Lendo backup JSON...');
    const backupPath = path.join(__dirname, 'backups', 'backup-2026-01-07.json');

    if (!fs.existsSync(backupPath)) {
      throw new Error(`Arquivo de backup não encontrado: ${backupPath}`);
    }

    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    if (!backupData.data?.projects) {
      throw new Error('Backup não contém campo "projects"');
    }

    const projects = backupData.data.projects;
    console.log(`\n🔄 Encontrados ${projects.length} projetos no backup`);
    console.log(`⏰ Backup de: ${backupData.timestamp}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const project of projects) {
      try {
        const cleanedData = cleanProjectData(project);

        await prisma.project.upsert({
          where: { slug: project.slug },
          update: cleanedData,
          create: cleanedData
        });
        successCount++;
        console.log(`✅ ${project.slug}`);
      } catch (error: any) {
        errorCount++;
        console.error(`⚠️ ${project.slug}: ${error.message.split('\n')[0]}`);
      }
    }

    const totalCount = await prisma.project.count();
    console.log(`\n📊 Resultado:`);
    console.log(`✅ Sucesso: ${successCount}/${projects.length}`);
    console.log(`⚠️ Erros: ${errorCount}/${projects.length}`);
    console.log(`📁 Total de projetos no banco: ${totalCount}`);

  } catch (error: any) {
    console.error('❌ Erro ao restaurar backup:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreProjectsFromBackup();
