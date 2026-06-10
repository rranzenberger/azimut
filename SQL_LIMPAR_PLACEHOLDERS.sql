-- ════════════════════════════════════════════════════════════
-- LIMPEZA DE PLACEHOLDERS — Timeline (CompanyHistory)
-- Rodar no Neon Console (SQL Editor) do banco do CMS
-- Data: 2026-06-09
-- ════════════════════════════════════════════════════════════

-- PASSO 1 — VER o que será deletado (rode primeiro, confira o resultado!)
SELECT id, year, "titlePt", "titleEn", "titleEs"
FROM "CompanyHistory"
WHERE "titlePt" ILIKE '%Marco Exemplo%'
   OR "titleEn" ILIKE '%Marco Exemplo%'
   OR "titleEs" ILIKE '%Hito Ejemplo%'
   OR "titlePt" ILIKE '%Editar no Backoffice%';

-- PASSO 2 — DELETAR (só rode depois de conferir o SELECT acima)
DELETE FROM "CompanyHistory"
WHERE "titlePt" ILIKE '%Marco Exemplo%'
   OR "titleEn" ILIKE '%Marco Exemplo%'
   OR "titleEs" ILIKE '%Hito Ejemplo%'
   OR "titlePt" ILIKE '%Editar no Backoffice%';

-- PASSO 3 — VERIFICAR duplicatas restantes na timeline (opcional)
SELECT year, "titlePt", COUNT(*)
FROM "CompanyHistory"
GROUP BY year, "titlePt"
HAVING COUNT(*) > 1;

-- ════════════════════════════════════════════════════════════
-- BÔNUS — Case Museu Olímpico: conferir o slug e o estado atual
-- (a description nova você cola pelo admin do backoffice,
--  arquivo CASE_MUSEU_OLIMPICO_COPY.md — markdown agora renderiza)
-- ════════════════════════════════════════════════════════════
SELECT slug, "titlePt", LEFT("descriptionPt", 120) AS inicio_descricao
FROM "Project"
WHERE slug LIKE '%museu%' OR slug LIKE '%olimpic%';
