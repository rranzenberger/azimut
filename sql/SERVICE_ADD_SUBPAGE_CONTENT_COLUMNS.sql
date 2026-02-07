-- ═══════════════════════════════════════════════════════════════
-- Adicionar colunas de conteúdo da subpágina na tabela Service
-- (longDesc, deliverables, process, technologies) para edição no backoffice
-- ═══════════════════════════════════════════════════════════════
-- Executar após POPULAR_SERVICES_12_CURADOS.sql se usar banco já existente.
-- No Neon: rodar este script na aba SQL.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescPt"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescEn"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescEs"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescFr"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesPt" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesEn" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesEs" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesFr" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processPt"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processEn"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processEs"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processFr"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "technologies"  TEXT[] DEFAULT '{}';
