-- Add URL manual fields (híbrido: Media OU URL)
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroBackgroundImageUrl" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "demoreelVideoUrl" TEXT;

-- Add comments
COMMENT ON COLUMN "Page"."heroBackgroundImageId" IS 'ID da Media (upload local) - PRIORIDADE 1';
COMMENT ON COLUMN "Page"."heroBackgroundImageUrl" IS 'URL manual (Unsplash, etc) - PRIORIDADE 2 (fallback)';
COMMENT ON COLUMN "Page"."demoreelVideoId" IS 'ID da Media (upload local) - PRIORIDADE 1';
COMMENT ON COLUMN "Page"."demoreelVideoUrl" IS 'URL manual (YouTube/Vimeo) - PRIORIDADE 2 (fallback)';
