-- DropColumn campos antigos (texto)
ALTER TABLE "Page" DROP COLUMN IF EXISTS "demoreelVideo";
ALTER TABLE "Page" DROP COLUMN IF EXISTS "demoreelThumbnail";
ALTER TABLE "Page" DROP COLUMN IF EXISTS "heroBackgroundImage";

-- AddColumn campos novos (relação com Media)
ALTER TABLE "Page" ADD COLUMN "heroBackgroundImageId" TEXT;
ALTER TABLE "Page" ADD COLUMN "demoreelVideoId" TEXT;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_heroBackgroundImageId_fkey" FOREIGN KEY ("heroBackgroundImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Page" ADD CONSTRAINT "Page_demoreelVideoId_fkey" FOREIGN KEY ("demoreelVideoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "Page_heroBackgroundImageId_idx" ON "Page"("heroBackgroundImageId");
CREATE INDEX "Page_demoreelVideoId_idx" ON "Page"("demoreelVideoId");

-- Add comments
COMMENT ON COLUMN "Page"."heroBackgroundImageId" IS 'ID da Media usada como background do hero';
COMMENT ON COLUMN "Page"."demoreelVideoId" IS 'ID da Media usada como vídeo demoreel institucional';
