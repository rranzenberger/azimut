-- ═══════════════════════════════════════════════════════════════
-- REMOVER DUPLICATAS DA TABELA CompanyHistory
-- Este script remove eventos duplicados mantendo apenas o mais antigo
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. VERIFICAR DUPLICATAS ANTES DE REMOVER
-- ═══════════════════════════════════════════════════════════════

-- Ver quantos eventos duplicados existem
SELECT 
  "year",
  "titlePt",
  COUNT(*) as quantidade_duplicados
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY "year", "titlePt"
HAVING COUNT(*) > 1
ORDER BY quantidade_duplicados DESC, "year" ASC;

-- ═══════════════════════════════════════════════════════════════
-- 2. REMOVER DUPLICATAS (MANTÉM O MAIS ANTIGO)
-- ═══════════════════════════════════════════════════════════════

-- Remove duplicatas mantendo apenas o registro mais antigo (menor createdAt)
DELETE FROM "CompanyHistory"
WHERE "id" IN (
  SELECT "id"
  FROM (
    SELECT 
      "id",
      ROW_NUMBER() OVER (
        PARTITION BY "year", "titlePt", "type"
        ORDER BY "createdAt" ASC
      ) as rn
    FROM "CompanyHistory"
    WHERE "isPublished" = true
  ) t
  WHERE rn > 1
);

-- ═══════════════════════════════════════════════════════════════
-- 3. VERIFICAR RESULTADO APÓS REMOÇÃO
-- ═══════════════════════════════════════════════════════════════

-- Contar total de eventos após limpeza
SELECT COUNT(*) as total_eventos_unicos
FROM "CompanyHistory"
WHERE "isPublished" = true;

-- Verificar se ainda há duplicatas (deve retornar 0 linhas)
SELECT 
  "year",
  "titlePt",
  COUNT(*) as quantidade
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY "year", "titlePt"
HAVING COUNT(*) > 1;

-- ═══════════════════════════════════════════════════════════════
-- 4. RESUMO FINAL
-- ═══════════════════════════════════════════════════════════════

SELECT 
  'Total de eventos únicos' as verificacao,
  COUNT(*) as valor
FROM "CompanyHistory"
WHERE "isPublished" = true;

SELECT 
  'Período completo' as verificacao,
  MIN("year") as ano_inicial,
  MAX("year") as ano_final,
  MAX("year") - MIN("year") as anos_de_historia
FROM "CompanyHistory"
WHERE "isPublished" = true;
