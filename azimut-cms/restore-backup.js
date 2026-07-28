const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function restoreBackup() {
  try {
    console.log('📖 Lendo script SQL...');
    const sql = fs.readFileSync('./scripts/SYNC_SITE_BACKOFFICE_2026-01-20.sql', 'utf8');

    console.log('🚀 Executando script SQL...');
    const result = await pool.query(sql);

    console.log('✅ Script executado com sucesso!');
    console.log(`Linhas afetadas: ${result.rowCount}`);

  } catch (error) {
    console.error('❌ Erro ao executar script:');
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

restoreBackup();
