import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const FILES = [
  'add_gigradar_backup.sql',
  'add_gigradar_shift_shots.sql',
  'add_gigradar_verdict_review.sql',
];

async function run() {
  for (const file of FILES) {
    const filePath = path.join(__dirname, 'migrations', file);
    console.log(`\n📖 Aplicando: ${file}`);
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
      await pool.query(sql);
      console.log(`✅ ${file} aplicado com sucesso`);
    } catch (error: any) {
      console.error(`❌ ${file} falhou: ${error.message}`);
      throw error;
    }
  }

  console.log('\n📊 Tabelas GigRadar no banco agora:');
  const r = await pool.query(
    `SELECT tablename FROM pg_tables WHERE tablename LIKE 'GigRadar%' ORDER BY tablename`
  );
  r.rows.forEach((row) => console.log('  -', row.tablename));

  console.log('\n📊 Views GigRadar no banco agora:');
  const v = await pool.query(
    `SELECT viewname FROM pg_views WHERE viewname LIKE 'GigRadar%' ORDER BY viewname`
  );
  v.rows.forEach((row) => console.log('  -', row.viewname));
}

run()
  .catch((e) => {
    console.error('❌ Erro geral:', e.message);
    process.exit(1);
  })
  .finally(() => pool.end());
