import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('🔍 Verificando dados no banco...\n');

    const pages = await prisma.page.count();
    console.log(`📄 Pages: ${pages}`);

    const projects = await prisma.project.count();
    console.log(`📁 Projects: ${projects}`);

    const services = await prisma.service.count();
    console.log(`🛠️ Services: ${services}`);

    const media = await prisma.media.count();
    console.log(`🖼️ Media: ${media}`);

    const tags = await prisma.tag.count();
    console.log(`🏷️ Tags: ${tags}`);

    console.log('\n📋 Detalhes:');
    const whatPage = await prisma.page.findUnique({
      where: { slug: 'what' }
    });
    console.log(`\n"what" page status: ${whatPage?.status || 'NÃO EXISTE'}`);

    if (services === 0) {
      console.log('\n⚠️ PROBLEMA: Nenhum Service no banco!');
      console.log('Precisa rodar script de popular services.');
    }

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
