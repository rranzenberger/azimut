-- ═══════════════════════════════════════════════════════════════
-- CORRIGIR MUSEU OLÍMPICO: 2023-2025 (não 2015-2017)
-- ═══════════════════════════════════════════════════════════════
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- Ver registro atual do Museu Olímpico
SELECT id, year, "yearEnd", "titlePt", "descriptionPt" 
FROM "CompanyHistory" 
WHERE "titlePt" LIKE '%Museu Ol%' OR "titlePt" LIKE '%Olympic Museum%';

-- Corrigir o ano e período
UPDATE "CompanyHistory"
SET 
  year = 2023,
  "yearEnd" = 2025,
  "descriptionPt" = 'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro - pós Olimpíadas 2016.',
  "descriptionEn" = 'General Technology Director for the Olympic Museum of Rio de Janeiro - post 2016 Olympics.'
WHERE "titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%';

-- Verificar resultado
SELECT id, year, "yearEnd", "titlePt", "descriptionPt" 
FROM "CompanyHistory" 
WHERE "titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%';

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! Museu Olímpico corrigido: 2023-2025
-- ═══════════════════════════════════════════════════════════════
