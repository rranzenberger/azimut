-- Campos: ano, mês, cliente/corporação, parceria, coprodução
-- Executar no Neon: SQL Editor → Run (não usar Explain)
-- Project já tem: year, client. Adicionamos: month, partnership, coproduction.

-- 1) Mês (1-12, opcional)
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "month" INTEGER;

-- 2) Parceria (texto livre)
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "partnership" TEXT;

-- 3) Coprodução (texto livre)
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "coproduction" TEXT;

-- Verificar colunas
SELECT id, title, year, month, client, partnership, coproduction
FROM "Project"
ORDER BY year DESC NULLS LAST
LIMIT 5;
