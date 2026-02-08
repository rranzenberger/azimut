-- Data de início e data de término (projeto longo)
-- Ordenação na listagem: pela data de término (yearEnd, monthEnd); se não tiver, usa year/month.
-- Executar no Neon: SQL Editor → Run (tabela "Project").

ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "yearStart" INTEGER;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "monthStart" INTEGER;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "yearEnd" INTEGER;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "monthEnd" INTEGER;

-- Opcional: copiar ano/mês atuais para data de término (para projetos que já existem)
-- UPDATE "Project" SET "yearEnd" = year, "monthEnd" = month WHERE "yearEnd" IS NULL AND year IS NOT NULL;
