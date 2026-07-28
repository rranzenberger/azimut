import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function restoreBackup() {
  try {
    console.log('📖 Lendo script SQL...');
    const sql = fs.readFileSync('./scripts/SYNC_SITE_BACKOFFICE_2026-01-20.sql', 'utf8');

    console.log('🔌 Conectando ao banco...');
    console.log(`Host: ${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]}`);

    console.log('🚀 Executando script SQL...');
    const result = await pool.query(sql);

    console.log('✅ Script executado com sucesso!');

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

restoreBackup();
