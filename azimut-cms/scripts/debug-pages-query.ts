/**
 * Debug: Testar query direta de Pages
 * Usage: npx tsx azimut-cms/scripts/debug-pages-query.ts
 */

import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada!');
  process.exit(1);
}

async function debugQuery() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  
  try {
    console.log('🧪 Testando query direto no PostgreSQL...\n');
    
    // Query simples sem Prisma
    const result = await pool.query(`
      SELECT 
        id, name, slug, status, "heroSloganPt", "heroSloganEn", 
        "heroSloganEs", "heroSloganFr"
      FROM "Page"
      ORDER BY "createdAt" DESC
      LIMIT 5;
    `);
    
    console.log(`✅ Query executada com sucesso!`);
    console.log(`📊 ${result.rows.length} páginas encontradas:\n`);
    
    if (result.rows.length > 0) {
      console.table(result.rows);
    } else {
      console.log('⚠️ Nenhuma página encontrada no banco.');
    }
    
    await pool.end();
  } catch (error: any) {
    console.error('❌ Erro na query:', error.message);
    console.error(error);
    process.exit(1);
  }
}

debugQuery();

