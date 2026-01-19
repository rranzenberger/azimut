ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionMobilePt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileFr" TEXT;

ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopPt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopFr" TEXT;

SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%'
ORDER BY column_name;
