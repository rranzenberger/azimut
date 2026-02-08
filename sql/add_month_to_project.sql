-- Adicionar coluna "month" ao modelo Project
-- Mês do projeto (1-12, opcional)
-- Executar em: Neon Console → SQL Editor

ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "month" INTEGER;

-- Verificar resultado
SELECT id, title, year, month FROM "Project" ORDER BY year DESC NULLS LAST LIMIT 10;
