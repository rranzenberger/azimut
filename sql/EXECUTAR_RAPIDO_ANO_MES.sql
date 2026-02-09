-- RÁPIDO: Garantir ano + mês em Project (Neon → SQL Editor)
-- Não altera dados; só garante que a coluna "month" existe.

ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "month" INTEGER;

-- Conferir (opcional)
SELECT id, title, "year", month FROM "Project" ORDER BY "year" DESC NULLS LAST LIMIT 5;
