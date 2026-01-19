-- ═══════════════════════════════════════════════════════════════
-- SCRIPT DE VERIFICAÇÃO COMPLETA
-- ═══════════════════════════════════════════════════════════════

-- 1. Verificar se as 8 colunas foram criadas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%'
ORDER BY column_name;

-- 2. Verificar dados da página Vancouver (todos os campos)
SELECT 
  slug,
  name,
  "heroSloganPt",
  "heroSubtitlePt",
  "heroDescriptionMobilePt" AS "Mobile_PT",
  "heroDescriptionMobileEn" AS "Mobile_EN",
  "heroDescriptionMobileEs" AS "Mobile_ES",
  "heroDescriptionMobileFr" AS "Mobile_FR",
  "heroDescriptionDesktopPt" AS "Desktop_PT",
  "heroDescriptionDesktopEn" AS "Desktop_EN",
  "heroDescriptionDesktopEs" AS "Desktop_ES",
  "heroDescriptionDesktopFr" AS "Desktop_FR",
  "updatedAt"
FROM "Page"
WHERE slug = 'vancouver';

-- 3. Contar total de colunas mobile/desktop
SELECT 
  COUNT(*) as total_colunas_criadas
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%';

-- 4. Verificar se todos os campos estão preenchidos
SELECT 
  CASE 
    WHEN "heroDescriptionMobilePt" IS NOT NULL THEN 'OK' 
    ELSE 'VAZIO' 
  END AS mobile_pt,
  CASE 
    WHEN "heroDescriptionDesktopPt" IS NOT NULL THEN 'OK' 
    ELSE 'VAZIO' 
  END AS desktop_pt,
  CASE 
    WHEN "heroDescriptionMobileEn" IS NOT NULL THEN 'OK' 
    ELSE 'VAZIO' 
  END AS mobile_en,
  CASE 
    WHEN "heroDescriptionDesktopEn" IS NOT NULL THEN 'OK' 
    ELSE 'VAZIO' 
  END AS desktop_en
FROM "Page"
WHERE slug = 'vancouver';
