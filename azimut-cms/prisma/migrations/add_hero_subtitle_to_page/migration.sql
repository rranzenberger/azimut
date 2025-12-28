-- AlterTable: Adiciona campos heroSubtitle para Page
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroSubtitlePt" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroSubtitleEn" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroSubtitleEs" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroSubtitleFr" TEXT;


