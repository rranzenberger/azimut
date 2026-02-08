-- Enquadramento e posição da imagem de capa do projeto (cards + subpágina)
-- Executar no Neon (ou banco do backoffice) após atualizar o Prisma schema

ALTER TABLE "Project"
  ADD COLUMN IF NOT EXISTS "heroImageFit" TEXT,
  ADD COLUMN IF NOT EXISTS "heroImagePosition" TEXT;

-- Valores: heroImageFit = 'cover' | 'contain', heroImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right' ou '50% 30%'
