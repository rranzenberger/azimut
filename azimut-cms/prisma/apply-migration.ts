/**
 * Script para aplicar migration manualmente
 * Adiciona colunas heroSloganPt/En/Es/Fr na tabela Page
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Aplicando migration: add_hero_slogan_to_page...');
  
  try {
    // Verificar se as colunas já existem
    const result = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Page' 
      AND column_name IN ('heroSloganPt', 'heroSloganEn', 'heroSloganEs', 'heroSloganFr')
    `;
    
    const existingColumns = result.map(r => r.column_name);
    const columnsToAdd = ['heroSloganPt', 'heroSloganEn', 'heroSloganEs', 'heroSloganFr']
      .filter(col => !existingColumns.includes(col));
    
    if (columnsToAdd.length === 0) {
      console.log('✅ Colunas já existem no banco de dados.');
      return;
    }
    
    // Aplicar migration
    for (const column of columnsToAdd) {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Page" ADD COLUMN "${column}" TEXT;`);
      console.log(`✅ Coluna ${column} adicionada.`);
    }
    
    console.log('✅ Migration aplicada com sucesso!');
  } catch (error: any) {
    if (error.code === 'P2010' || error.message?.includes('already exists')) {
      console.log('✅ Colunas já existem no banco de dados.');
    } else {
      console.error('❌ Erro ao aplicar migration:', error);
      throw error;
    }
  }
}

main()
  .catch((e) => {
    console.error('Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

