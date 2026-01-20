-- ═══════════════════════════════════════════════════════════════
-- PASSO 1: CRIAR TABELA CompanyHistory
-- ═══════════════════════════════════════════════════════════════
-- Execute este SQL PRIMEIRO no Neon SQL Editor
-- https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "CompanyHistory" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  
  -- Ano/Período
  "year" INTEGER NOT NULL,
  "yearEnd" INTEGER,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  
  -- Tipo de entrada
  "type" TEXT NOT NULL CHECK ("type" IN ('milestone', 'partnership', 'project', 'award', 'location', 'other')),
  
  -- Conteúdo (Multilíngue PT/EN/ES/FR)
  "titlePt" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleEs" TEXT,
  "titleFr" TEXT,
  
  "descriptionPt" TEXT,
  "descriptionEn" TEXT,
  "descriptionEs" TEXT,
  "descriptionFr" TEXT,
  
  -- Bullets (Array de strings em PostgreSQL)
  "bulletsPt" TEXT[],
  "bulletsEn" TEXT[],
  "bulletsEs" TEXT[],
  "bulletsFr" TEXT[],
  
  -- Metadados
  "icon" TEXT,
  "logoUrl" TEXT,
  "externalLink" TEXT,
  
  -- Flags
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX IF NOT EXISTS "CompanyHistory_year_idx" ON "CompanyHistory"("year");
CREATE INDEX IF NOT EXISTS "CompanyHistory_type_idx" ON "CompanyHistory"("type");
CREATE INDEX IF NOT EXISTS "CompanyHistory_isPublished_idx" ON "CompanyHistory"("isPublished");
CREATE INDEX IF NOT EXISTS "CompanyHistory_displayOrder_idx" ON "CompanyHistory"("displayOrder");
