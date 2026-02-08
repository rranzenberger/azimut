-- Legenda/info por mídia na galeria do projeto (ordem já existe)
-- Executar no Neon (ou banco do backoffice)

ALTER TABLE "ProjectMedia"
  ADD COLUMN IF NOT EXISTS "captionPt" TEXT,
  ADD COLUMN IF NOT EXISTS "captionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "captionEs" TEXT,
  ADD COLUMN IF NOT EXISTS "captionFr" TEXT;
