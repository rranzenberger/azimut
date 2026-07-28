import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { servicesData } from '../src/data/servicesData';

const prisma = new PrismaClient();

async function restoreServices() {
  try {
    console.log('🔄 Restaurando serviços...\n');

    for (const service of servicesData) {
      const serviceData: any = {
        id: service.id,
        slug: service.slug,
        icon: service.icon,
        titlePt: service.titlePt,
        titleEn: service.titleEn,
        titleFr: service.titleFr,
        titleEs: service.titleEs,
        // Descrição curta vai como descriptionPt (o schema não tem shortDescPt)
        descriptionPt: (service as any).shortDescPt || '',
        descriptionEn: (service as any).shortDescEn || '',
        descriptionFr: (service as any).shortDescFr || '',
        descriptionEs: (service as any).shortDescEs || '',
        // Descrições longas são arrays e vão como JSON
        longDescPt: service.longDescPt,
        longDescEn: service.longDescEn,
        longDescFr: service.longDescFr,
        longDescEs: service.longDescEs,
        // Entregas vão como JSON
        deliverablesPt: service.deliverablesPt,
        deliverablesEn: service.deliverablesEn,
        deliverablesFr: service.deliverablesFr,
        deliverablesEs: service.deliverablesEs,
        // Processo vão como JSON
        processPt: service.processPt,
        processEn: service.processEn,
        processFr: service.processFr,
        processEs: service.processEs,
        // Tecnologias
        technologies: service.technologies,
        // Categorias de projetos vão como segments
        segments: service.projectCategories
      };

      await prisma.service.upsert({
        where: { slug: service.slug },
        update: serviceData,
        create: serviceData
      });
      console.log(`✅ ${service.slug}`);
    }

    const count = await prisma.service.count();
    console.log(`\n🎉 ${count} serviços restaurados com sucesso!`);

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreServices();
