const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function checkAdmin() {
  try {
    console.log('🔍 Conectando ao banco...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    const users = await prisma.user.findMany();
    console.log('\n✅ Conexão OK!');
    console.log(`📊 Total de usuários no banco: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\n👥 Usuários encontrados:');
      users.forEach(user => {
        console.log(`  - ${user.email} (ID: ${user.id})`);
      });
    } else {
      console.log('\n⚠️ BANCO VAZIO! Nenhum usuário encontrado!');
    }
    
  } catch (error) {
    console.error('\n❌ ERRO ao conectar:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();

