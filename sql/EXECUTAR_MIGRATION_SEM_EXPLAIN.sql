-- ═══════════════════════════════════════════════════════════════
-- MIGRATION: TeamMembers e Credentials
-- ═══════════════════════════════════════════════════════════════
-- VERSÃO SEM BEGIN/COMMIT para usar com EXPLAIN se necessário
-- ═══════════════════════════════════════════════════════════════
-- NOTA: Esta versão NÃO usa transação (BEGIN/COMMIT)
-- Use esta versão apenas se precisar usar EXPLAIN no editor SQL
-- Para execução normal, use o arquivo completo com BEGIN/COMMIT
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. Criar tabela TeamMembers
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "TeamMembers" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  
  -- Identificação
  "slug" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  
  -- Cargo e Credencial
  "rolePt" TEXT NOT NULL,
  "roleEn" TEXT NOT NULL,
  "roleEs" TEXT,
  "roleFr" TEXT,
  "credentialPt" TEXT,
  "credentialEn" TEXT,
  "credentialEs" TEXT,
  "credentialFr" TEXT,
  
  -- Bio (Multilíngue PT/EN/ES/FR)
  "bioPt" TEXT,
  "bioEn" TEXT,
  "bioEs" TEXT,
  "bioFr" TEXT,
  
  -- Foto
  "photoUrl" TEXT,
  "photoMediaId" TEXT,
  
  -- Ordem de exibição
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  
  -- Status
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- 2. Criar tabela Credentials
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "Credentials" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  
  -- Ordem de exibição
  "order" INTEGER NOT NULL DEFAULT 0,
  
  -- Ícone (emoji)
  "icon" TEXT,
  
  -- Texto (Multilíngue PT/EN/ES/FR)
  "textPt" TEXT NOT NULL,
  "textEn" TEXT NOT NULL,
  "textEs" TEXT,
  "textFr" TEXT,
  
  -- Status
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- 3. Criar índices
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS "TeamMembers_slug_idx" ON "TeamMembers"("slug");
CREATE INDEX IF NOT EXISTS "TeamMembers_isPublished_idx" ON "TeamMembers"("isPublished");
CREATE INDEX IF NOT EXISTS "TeamMembers_displayOrder_idx" ON "TeamMembers"("displayOrder");

CREATE INDEX IF NOT EXISTS "Credentials_order_idx" ON "Credentials"("order");
CREATE INDEX IF NOT EXISTS "Credentials_isPublished_idx" ON "Credentials"("isPublished");
