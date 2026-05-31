-- AlterTable: imagens do bloco Quem Somos (Studio/Overview) — 1 por idioma
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "overviewImagePtUrl" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "overviewImageEnUrl" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "overviewImageEsUrl" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "overviewImageFrUrl" TEXT;
