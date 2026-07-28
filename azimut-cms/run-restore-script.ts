import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function runSqlScript(filePath: string) {
  try {
    console.log(`📖 Lendo: ${path.basename(filePath)}`);
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log('🚀 Executando...');
    await pool.query(sql);

    console.log(`✅ ${path.basename(filePath)} executado!\n`);
  } catch (error: any) {
    console.error(`❌ Erro:`, error.message);
  }
}

async function restoreAll() {
  try {
    console.log('🔄 Iniciando restauração completa...\n');

    // Rodar scripts em ordem
    await runSqlScript('./scripts/POPULAR_TODAS_PAGINAS_DEFINITIVO.sql');
    await runSqlScript('./scripts/SYNC_SITE_BACKOFFICE_2026-01-20.sql');
    await runSqlScript('./scripts/POPULAR_SECTIONS_E_METADATA.sql');

    console.log('\n🎉 Restauração completa!');
    console.log('🚀 Faça redeploy no Vercel para ver as mudanças');

  } catch (error: any) {
    console.error('❌ Erro geral:', error.message);
  } finally {
    await pool.end();
  }
}

restoreAll();
