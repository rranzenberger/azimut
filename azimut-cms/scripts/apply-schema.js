#!/usr/bin/env node
/**
 * Script para aplicar schema do Prisma no banco Neon
 * Roda: node azimut-cms/scripts/apply-schema.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🗄️  Aplicando schema do Prisma no banco Neon...\n');

try {
  // Ir para pasta do CMS
  process.chdir(path.join(__dirname, '..'));
  
  console.log('📍 Pasta atual:', process.cwd());
  console.log('📦 Executando: npx prisma db push\n');
  
  // Executar prisma db push (cria tabelas sem migrations)
  execSync('npx prisma db push --accept-data-loss', {
    stdio: 'inherit',
    env: process.env
  });
  
  console.log('\n✅ Schema aplicado com sucesso!');
  console.log('\n🌱 Agora execute o seed:');
  console.log('   node azimut-cms/scripts/run-seed.js');
  console.log('   ou acesse: https://backoffice.azmt.com.br/api/admin/setup\n');
  
} catch (error) {
  console.error('\n❌ Erro ao aplicar schema:', error.message);
  process.exit(1);
}

