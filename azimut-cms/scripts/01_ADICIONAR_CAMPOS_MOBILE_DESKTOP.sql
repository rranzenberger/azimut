-- ═══════════════════════════════════════════════════════════════════════════
-- SCRIPT 1: ADICIONAR CAMPOS MOBILE/DESKTOP NA TABELA PAGE
-- ═══════════════════════════════════════════════════════════════════════════
-- Execute este script PRIMEIRO no Neon Console
-- Vercel → Storage → Neon → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- Adicionar campos para Hero Description MOBILE (texto curto)
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionMobilePt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileFr" TEXT;

-- Adicionar campos para Hero Description DESKTOP (texto completo)
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopPt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopFr" TEXT;

-- Verificar se as colunas foram criadas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%'
ORDER BY column_name;

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ SCRIPT 1 CONCLUÍDO
-- ═══════════════════════════════════════════════════════════════════════════
-- Próximo passo: Execute o script 02_POPULAR_VANCOUVER_MOBILE_DESKTOP.sql
-- ═══════════════════════════════════════════════════════════════════════════
