-- ============================================================
-- Adicionar colunas faltantes na tabela Service
-- Rodar no Neon Console (SQL Editor)
-- ============================================================

-- FAQs multilíngue
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "faqsPt" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "faqsEn" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "faqsEs" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "faqsFr" JSONB;

-- Descrição longa multilíngue (conteúdo da subpágina)
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescPt" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescEn" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescEs" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescFr" JSONB;

-- Entregáveis multilíngue
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesPt" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesEn" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesEs" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesFr" JSONB;

-- Processo multilíngue
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processPt" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processEn" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processEs" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processFr" JSONB;

-- Tecnologias (array de strings)
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "technologies" TEXT[] DEFAULT '{}';

-- Verificação
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Service' 
ORDER BY ordinal_position;
