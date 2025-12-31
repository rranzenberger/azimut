/**
 * Script para aplicar migration do Settings manualmente
 * Cria tabela Settings se não existir
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Aplicando migration: add_settings_model...');
  
  try {
    // Verificar se a tabela já existe
    const result = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Settings'
    `;
    
    if (result.length > 0) {
      console.log('✅ Tabela Settings já existe no banco de dados.');
      
      // Verificar se já tem registro
      const settings = await prisma.settings.findUnique({
        where: { id: 'singleton' },
      });
      
      if (settings) {
        console.log('✅ Registro Settings já existe.');
        return;
      } else {
        console.log('⚠️ Tabela existe mas não tem registro. Criando...');
        await prisma.settings.create({
          data: {
            id: 'singleton',
            siteName: 'Azimut',
            siteUrl: 'https://azmt.com.br',
            defaultLanguage: 'pt',
            defaultCountry: 'BR',
            timezone: 'America/Sao_Paulo',
          },
        });
        console.log('✅ Registro Settings criado com sucesso!');
        return;
      }
    }
    
    // Criar tabela
    console.log('📝 Criando tabela Settings...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "Settings" (
        "id" TEXT NOT NULL DEFAULT 'singleton',
        "siteName" TEXT DEFAULT 'Azimut',
        "siteUrl" TEXT DEFAULT 'https://azmt.com.br',
        "contactEmail" TEXT,
        "contactPhone" TEXT,
        "defaultMetaDescription" TEXT,
        "defaultKeywords" TEXT,
        "ogImageUrl" TEXT,
        "facebookUrl" TEXT,
        "instagramUrl" TEXT,
        "linkedinUrl" TEXT,
        "twitterUrl" TEXT,
        "youtubeUrl" TEXT,
        "kabbamApiKey" TEXT,
        "kabbamApiUrl" TEXT,
        "smtpHost" TEXT,
        "smtpPort" INTEGER,
        "smtpUser" TEXT,
        "smtpPassword" TEXT,
        "smtpFromEmail" TEXT,
        "deepseekApiKey" TEXT,
        "notificationEmail" TEXT,
        "defaultLanguage" TEXT DEFAULT 'pt',
        "defaultCountry" TEXT DEFAULT 'BR',
        "timezone" TEXT DEFAULT 'America/Sao_Paulo',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
      );
    `);
    
    console.log('✅ Tabela Settings criada.');
    
    // Inserir registro padrão
    console.log('📝 Inserindo registro padrão...');
    await prisma.settings.create({
      data: {
        id: 'singleton',
        siteName: 'Azimut',
        siteUrl: 'https://azmt.com.br',
        defaultLanguage: 'pt',
        defaultCountry: 'BR',
        timezone: 'America/Sao_Paulo',
      },
    });
    
    console.log('✅ Migration aplicada com sucesso!');
  } catch (error: any) {
    if (error.code === 'P2010' || error.message?.includes('already exists')) {
      console.log('✅ Tabela Settings já existe no banco de dados.');
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

