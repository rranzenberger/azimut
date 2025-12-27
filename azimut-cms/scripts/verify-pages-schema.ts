/**
 * Script para verificar o schema da tabela Page
 * Usage: npx tsx scripts/verify-pages-schema.ts
 */

import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada!');
  process.exit(1);
}

async function verifySchema() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  
  try {
    console.log('🔍 Verificando schema da tabela Page...\n');
    
    const result = await pool.query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'Page'
      ORDER BY ordinal_position;
    `);
    
    if (result.rows.length === 0) {
      console.error('❌ Tabela Page não encontrada!');
      process.exit(1);
    }
    
    console.log('📊 Colunas da tabela Page:');
    console.table(result.rows);
    
    // Verificar se campos heroSlogan existem
    const hasHeroSlogan = result.rows.some(row => row.column_name === 'heroSloganPt');
    
    if (hasHeroSlogan) {
      console.log('\n✅ Campos heroSlogan encontrados!');
    } else {
      console.log('\n❌ Campos heroSlogan NÃO encontrados!');
      console.log('Execute a migration: npx tsx scripts/run-migration.ts migrations/fix-pages-schema.sql');
    }
    
    await pool.end();
  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

verifySchema();

