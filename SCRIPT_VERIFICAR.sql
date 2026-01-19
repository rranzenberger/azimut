-- Verificar se as colunas foram criadas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%'
ORDER BY column_name;

-- Verificar dados da página Vancouver
SELECT 
  slug,
  name,
  "heroSloganPt",
  "heroSubtitlePt",
  "heroDescriptionMobilePt" AS "Mobile_PT",
  "heroDescriptionDesktopPt" AS "Desktop_PT",
  "heroDescriptionMobileEn" AS "Mobile_EN",
  "heroDescriptionDesktopEn" AS "Desktop_EN",
  "updatedAt"
FROM "Page"
WHERE slug = 'vancouver';

-- Contar quantas colunas mobile/desktop existem
SELECT 
  COUNT(*) as total_colunas
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%';
