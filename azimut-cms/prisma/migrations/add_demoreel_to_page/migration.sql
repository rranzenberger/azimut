-- Add demoreel video fields to Page table
ALTER TABLE "Page" ADD COLUMN "demoreelVideo" TEXT;
ALTER TABLE "Page" ADD COLUMN "demoreelThumbnail" TEXT;
ALTER TABLE "Page" ADD COLUMN "heroBackgroundImage" TEXT;

-- Add comment for documentation
COMMENT ON COLUMN "Page"."demoreelVideo" IS 'URL do vídeo demoreel institucional (YouTube/Vimeo)';
COMMENT ON COLUMN "Page"."demoreelThumbnail" IS 'URL da thumbnail do demoreel (opcional)';
COMMENT ON COLUMN "Page"."heroBackgroundImage" IS 'URL da imagem de fundo do hero';
