-- Adicionar campos de descrição completa aos projetos
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "descriptionPt" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "descriptionEs" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "descriptionFr" TEXT;

-- Criar tabela ProjectMedia para galeria de mídias
CREATE TABLE IF NOT EXISTS "ProjectMedia" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMedia_pkey" PRIMARY KEY ("id")
);

-- Criar índices e constraints
CREATE UNIQUE INDEX IF NOT EXISTS "ProjectMedia_projectId_mediaId_key" ON "ProjectMedia"("projectId", "mediaId");
CREATE INDEX IF NOT EXISTS "ProjectMedia_projectId_order_idx" ON "ProjectMedia"("projectId", "order");

-- Adicionar foreign keys
ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

