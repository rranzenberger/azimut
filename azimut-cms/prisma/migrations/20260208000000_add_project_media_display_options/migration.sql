-- Posição e escala por item da galeria (enquadramento, posição no quadro, zoom)
ALTER TABLE "ProjectMedia" ADD COLUMN IF NOT EXISTS "displayFit" TEXT;
ALTER TABLE "ProjectMedia" ADD COLUMN IF NOT EXISTS "displayPosition" TEXT;
ALTER TABLE "ProjectMedia" ADD COLUMN IF NOT EXISTS "displayScale" DOUBLE PRECISION;

COMMENT ON COLUMN "ProjectMedia"."displayFit" IS 'contain | cover - como a imagem preenche o quadro';
COMMENT ON COLUMN "ProjectMedia"."displayPosition" IS 'center | top | bottom | left | right | top left | ... - onde ancorar a imagem';
COMMENT ON COLUMN "ProjectMedia"."displayScale" IS '0.8 a 1.2 (80%-120%) - zoom no quadro';
