/**
 * Script para executar migrations no banco de dados
 * Usage: npx tsx scripts/run-migration.ts migrations/fix-pages-schema.sql
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Conexão direta com Postgres
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada!');
  process.exit(1);
}

async function runMigration(filePath: string) {
  try {
    console.log('📂 Lendo arquivo de migration:', filePath);
    const sql = readFileSync(join(process.cwd(), filePath), 'utf-8');
    
    console.log('🔗 Conectando ao banco de dados...');
    const { Pool } = await import('pg');
    const pool = new Pool({ connectionString: DATABASE_URL });
    
    console.log('🚀 Executando migration...');
    const result = await pool.query(sql);
    
    console.log('✅ Migration executada com sucesso!');
    if (result.rows && result.rows.length > 0) {
      console.log('\n📊 Resultado:');
      console.table(result.rows);
    }
    
    await pool.end();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erro ao executar migration:', error.message);
    console.error(error);
    process.exit(1);
  }
}

const migrationFile = process.argv[2];
if (!migrationFile) {
  console.error('❌ Uso: npx tsx scripts/run-migration.ts <caminho-do-arquivo.sql>');
  process.exit(1);
}

runMigration(migrationFile);

