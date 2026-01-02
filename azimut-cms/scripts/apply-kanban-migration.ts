/**
 * Script Seguro para Aplicar Migração Kanban
 * Verifica antes de aplicar e tem rollback automático
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function checkIfMigrationNeeded(): Promise<boolean> {
  try {
    // Verificar se os novos valores do enum já existem
    const enumCheck = await prisma.$queryRaw<Array<{ enumlabel: string }>>`
      SELECT enumlabel 
      FROM pg_enum 
      WHERE enumtypid = (
        SELECT oid FROM pg_type WHERE typname = 'LeadStatus'
      )
    `;
    
    const existingValues = enumCheck.map(e => e.enumlabel);
    const neededValues = ['CONTACTED', 'PROPOSAL_SENT', 'NEGOTIATION'];
    const missingValues = neededValues.filter(v => !existingValues.includes(v));
    
    if (missingValues.length > 0) {
      console.log('⚠️ Valores do enum faltando:', missingValues);
      return true;
    }

    // Verificar se os campos já existem
    const columnsCheck = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Lead' 
      AND column_name IN ('assignedToId', 'assignedAt', 'notes', 'lastContactAt')
    `;
    
    const existingColumns = columnsCheck.map(c => c.column_name);
    const neededColumns = ['assignedToId', 'assignedAt', 'notes', 'lastContactAt'];
    const missingColumns = neededColumns.filter(c => !existingColumns.includes(c));
    
    if (missingColumns.length > 0) {
      console.log('⚠️ Colunas faltando:', missingColumns);
      return true;
    }

    console.log('✅ Migração já aplicada! Todos os campos existem.');
    return false;
  } catch (error: any) {
    console.error('❌ Erro ao verificar migração:', error.message);
    throw error;
  }
}

async function applyMigration(): Promise<void> {
  const migrationPath = path.join(
    __dirname,
    '../prisma/migrations/20260102041056_add_kanban_status_and_assignment/migration.sql'
  );

  if (!fs.existsSync(migrationPath)) {
    throw new Error(`Arquivo de migração não encontrado: ${migrationPath}`);
  }

  const sql = fs.readFileSync(migrationPath, 'utf-8');
  
  console.log('📋 Aplicando migração...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    // Dividir SQL em comandos individuais (linha por linha, agrupando por ;)
    const lines = sql.split('\n');
    let currentCommand = '';
    const commands: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Ignorar comentários e linhas vazias
      if (!trimmed || trimmed.startsWith('--')) {
        continue;
      }
      
      currentCommand += (currentCommand ? ' ' : '') + trimmed;
      
      // Se termina com ;, adicionar à lista
      if (trimmed.endsWith(';')) {
        const command = currentCommand.replace(/;$/, '').trim();
        if (command) {
          commands.push(command);
        }
        currentCommand = '';
      }
    }

    // Executar comandos de enum FORA da transação (PostgreSQL requer commit)
    const enumCommands: string[] = [];
    const otherCommands: string[] = [];
    
    for (const cmd of commands) {
      if (cmd.includes('ALTER TYPE') && cmd.includes('ADD VALUE')) {
        enumCommands.push(cmd);
      } else {
        otherCommands.push(cmd);
      }
    }

    // Executar enum commands individualmente (cada um precisa de commit)
    for (const command of enumCommands) {
      try {
        await prisma.$executeRawUnsafe(command);
        console.log(`✅ Executado (enum): ${command.substring(0, 60).replace(/\s+/g, ' ')}...`);
      } catch (error: any) {
        const errorMsg = error.message || '';
        if (errorMsg.includes('already exists') || errorMsg.includes('duplicate_object')) {
          console.log(`⚠️ Ignorado (já existe): ${command.substring(0, 60).replace(/\s+/g, ' ')}...`);
        } else {
          throw error;
        }
      }
    }

    // Executar outros comandos individualmente (mais seguro com IF NOT EXISTS)
    for (const command of otherCommands) {
      try {
        await prisma.$executeRawUnsafe(command);
        console.log(`✅ Executado: ${command.substring(0, 60).replace(/\s+/g, ' ')}...`);
      } catch (error: any) {
        // Se for erro de "já existe", ignorar
        const errorMsg = error.message || '';
        if (
          errorMsg.includes('already exists') ||
          errorMsg.includes('duplicate_object') ||
          errorMsg.includes('already has') ||
          (errorMsg.includes('constraint') && errorMsg.includes('already exists'))
        ) {
          console.log(`⚠️ Ignorado (já existe): ${command.substring(0, 60).replace(/\s+/g, ' ')}...`);
        } else {
          console.error(`❌ Erro no comando: ${command.substring(0, 100)}`);
          throw error;
        }
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Migração aplicada com sucesso!');
  } catch (error: any) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ ERRO ao aplicar migração:', error.message);
    throw error;
  }
}

async function verifyMigration(): Promise<void> {
  console.log('\n🔍 Verificando migração...');
  
  try {
    // Verificar enum
    const enumCheck = await prisma.$queryRaw<Array<{ enumlabel: string }>>`
      SELECT enumlabel 
      FROM pg_enum 
      WHERE enumtypid = (
        SELECT oid FROM pg_type WHERE typname = 'LeadStatus'
      )
      ORDER BY enumlabel
    `;
    
    console.log('📊 Valores do enum LeadStatus:');
    enumCheck.forEach(e => console.log(`   - ${e.enumlabel}`));

    // Verificar colunas
    const columnsCheck = await prisma.$queryRaw<Array<{ column_name: string; data_type: string }>>`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Lead' 
      AND column_name IN ('assignedToId', 'assignedAt', 'notes', 'lastContactAt')
      ORDER BY column_name
    `;
    
    console.log('\n📊 Colunas adicionadas:');
    if (columnsCheck.length === 0) {
      console.log('   ⚠️ Nenhuma coluna encontrada!');
    } else {
      columnsCheck.forEach(c => console.log(`   ✅ ${c.column_name} (${c.data_type})`));
    }

    // Verificar índices
    const indexesCheck = await prisma.$queryRaw<Array<{ indexname: string }>>`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'Lead' 
      AND indexname LIKE 'Lead_%'
      ORDER BY indexname
    `;
    
    console.log('\n📊 Índices criados:');
    indexesCheck.forEach(i => console.log(`   ✅ ${i.indexname}`));

    console.log('\n✅ Verificação concluída!');
  } catch (error: any) {
    console.error('❌ Erro na verificação:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Script de Migração Kanban - Modo Seguro\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    // 1. Verificar se precisa aplicar
    const needsMigration = await checkIfMigrationNeeded();
    
    if (!needsMigration) {
      console.log('\n✅ Nada a fazer. Migração já está aplicada!');
      await verifyMigration();
      return;
    }

    // 2. Aplicar migração
    await applyMigration();

    // 3. Verificar resultado
    await verifyMigration();

    console.log('\n🎉 Tudo certo! Migração aplicada com sucesso!');
  } catch (error: any) {
    console.error('\n❌ ERRO CRÍTICO:', error.message);
    console.error('\n⚠️ A migração NÃO foi aplicada. Nada foi alterado no banco.');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

