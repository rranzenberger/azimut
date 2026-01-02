/**
 * Script de Rollback - Kanban FASE 1 + 2
 * ⚠️ CUIDADO: Isso vai remover colunas e dados!
 * Use apenas se precisar voltar atrás completamente
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function rollback() {
  console.log('⚠️  ROLLBACK - Removendo mudanças do Kanban FASE 1+2\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚠️  ATENÇÃO: Isso vai remover:');
  console.log('   - Colunas: assignedToId, assignedAt, notes, lastContactAt');
  console.log('   - Índices relacionados');
  console.log('   - Foreign key para User');
  console.log('   - DADOS nessas colunas serão PERDIDOS!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // 1. Remover índices
    console.log('📊 Removendo índices...');
    const indexes = [
      'Lead_createdAt_idx',
      'Lead_assignedToId_idx',
      'Lead_priority_idx',
      'Lead_status_idx',
    ];

    for (const indexName of indexes) {
      try {
        await prisma.$executeRawUnsafe(`DROP INDEX IF EXISTS "${indexName}";`);
        console.log(`   ✅ Índice ${indexName} removido`);
      } catch (error: any) {
        console.log(`   ⚠️  Índice ${indexName} não existe ou erro: ${error.message}`);
      }
    }

    // 2. Remover foreign key
    console.log('\n🔗 Removendo foreign key...');
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Lead" DROP CONSTRAINT IF EXISTS "Lead_assignedToId_fkey";
      `);
      console.log('   ✅ Foreign key removida');
    } catch (error: any) {
      console.log(`   ⚠️  Erro ao remover foreign key: ${error.message}`);
    }

    // 3. Remover colunas
    console.log('\n🗑️  Removendo colunas...');
    const columns = [
      'lastContactAt',
      'notes',
      'assignedAt',
      'assignedToId',
    ];

    for (const columnName of columns) {
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "Lead" DROP COLUMN IF EXISTS "${columnName}";`);
        console.log(`   ✅ Coluna ${columnName} removida`);
      } catch (error: any) {
        console.log(`   ⚠️  Erro ao remover coluna ${columnName}: ${error.message}`);
      }
    }

    // 4. Mapear status de volta (opcional)
    console.log('\n🔄 Mapeando status de volta...');
    try {
      await prisma.$executeRawUnsafe(`
        UPDATE "Lead" SET "status" = 'IN_PROGRESS' 
        WHERE "status" = 'CONTACTED';
      `);
      console.log('   ✅ Status CONTACTED mapeado de volta para IN_PROGRESS');
    } catch (error: any) {
      console.log(`   ⚠️  Erro ao mapear status: ${error.message}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Rollback concluído!');
    console.log('\n⚠️  NOTA: Valores do enum (CONTACTED, PROPOSAL_SENT, NEGOTIATION)');
    console.log('   não foram removidos. Eles continuam no banco mas não serão usados.');
    console.log('   Para removê-los completamente, seria necessário dropar o tipo enum.');

  } catch (error: any) {
    console.error('\n❌ ERRO no rollback:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Confirmar antes de executar
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n⚠️  Você tem CERTEZA que quer fazer rollback? (digite "SIM" para confirmar): ', (answer: string) => {
  if (answer === 'SIM') {
    rollback()
      .then(() => {
        console.log('\n✅ Rollback executado com sucesso!');
        process.exit(0);
      })
      .catch((error) => {
        console.error('\n❌ Erro no rollback:', error);
        process.exit(1);
      });
  } else {
    console.log('\n❌ Rollback cancelado.');
    process.exit(0);
  }
  rl.close();
});

