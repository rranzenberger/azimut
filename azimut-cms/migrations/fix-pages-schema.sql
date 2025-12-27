-- ═══════════════════════════════════════════════════════════════
-- MIGRATION: Fix Pages Schema
-- Data: 2025-12-27
-- Descrição: Adiciona campos heroSlogan à tabela Page
-- ═══════════════════════════════════════════════════════════════

-- Adicionar colunas heroSlogan se não existirem
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroSloganPt" TEXT,
ADD COLUMN IF NOT EXISTS "heroSloganEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroSloganEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroSloganFr" TEXT;

-- Verificar se as colunas foram criadas corretamente
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Page'
ORDER BY ordinal_position;

