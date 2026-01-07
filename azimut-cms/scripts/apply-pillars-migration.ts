import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function applyPillarsMigration() {
  console.log('🔄 Aplicando migration: add_pillars_to_page...')
  
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Page" 
      ADD COLUMN IF NOT EXISTS "pillar1Pt" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar1En" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar1Es" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar1Fr" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar2Pt" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar2En" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar2Es" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar2Fr" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar3Pt" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar3En" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar3Es" TEXT,
      ADD COLUMN IF NOT EXISTS "pillar3Fr" TEXT
    `)
    
    console.log('✅ Pillars adicionados com sucesso!')
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.code === 'P2010') {
      console.log('✅ Colunas Pillars já existem.')
    } else {
      console.error('❌ Erro:', error)
      throw error
    }
  } finally {
    await prisma.$disconnect()
  }
}

applyPillarsMigration()

