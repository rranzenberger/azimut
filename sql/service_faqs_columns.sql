-- =============================================================================
-- Adicionar colunas de FAQ na tabela Service (backoffice)
-- Banco: PostgreSQL (Neon / mesmo do azimut-cms)
--
-- NO NEON: use apenas o botão "Run". Ver: docs/NEON_SQL_EDITOR.md
-- =============================================================================

ALTER TABLE "Service"
  ADD COLUMN IF NOT EXISTS "faqsPt" JSONB,
  ADD COLUMN IF NOT EXISTS "faqsEn" JSONB,
  ADD COLUMN IF NOT EXISTS "faqsEs" JSONB,
  ADD COLUMN IF NOT EXISTS "faqsFr" JSONB;

-- Formato esperado por item: { "question": "Pergunta?", "answer": "Resposta." }
-- Exemplo: [{"question":"Quanto custa?","answer":"Depende do projeto."}]
