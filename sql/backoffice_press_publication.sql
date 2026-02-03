-- =============================================================================
-- Backoffice: tabelas Press (Imprensa) e Publication (Research & Lab)
-- Banco: PostgreSQL (Neon / mesmo do azimut-cms)
-- Uso: executar no banco do backoffice se ainda não rodou prisma migrate deploy
--
-- IMPORTANTE NO NEON SQL EDITOR:
-- Use o botão "Run" (Executar). NÃO use "Explain" nem "Analyze".
-- O Explain adiciona EXPLAIN na frente do SQL; EXPLAIN não pode ser usado
-- com CREATE TABLE (DDL), por isso dá erro de sintaxe.
--
-- O backoffice já está pronto (CRUD e APIs). Basta criar as tabelas.
-- Ver: docs/BACKOFFICE_PAGINAS_ESTATICAS_E_SQL.md
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) Tabela Press (área de imprensa: releases, notas, matérias)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Press" (
    "id" TEXT NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "summaryPt" TEXT,
    "summaryEn" TEXT,
    "summaryEs" TEXT,
    "summaryFr" TEXT,
    "url" TEXT,
    "publishedAt" TIMESTAMP(3),
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Press_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Press_isPublished_idx" ON "Press"("isPublished");
CREATE INDEX IF NOT EXISTS "Press_publishedAt_idx" ON "Press"("publishedAt");
CREATE INDEX IF NOT EXISTS "Press_displayOrder_idx" ON "Press"("displayOrder");

-- -----------------------------------------------------------------------------
-- 2) Tabela Publication (Research & Lab: artigos, apresentações, papers)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Publication" (
    "id" TEXT NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "authors" TEXT,
    "url" TEXT,
    "year" INTEGER,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Publication_isPublished_idx" ON "Publication"("isPublished");
CREATE INDEX IF NOT EXISTS "Publication_year_idx" ON "Publication"("year");
CREATE INDEX IF NOT EXISTS "Publication_displayOrder_idx" ON "Publication"("displayOrder");
