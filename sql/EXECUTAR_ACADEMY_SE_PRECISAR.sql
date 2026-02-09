-- ═══════════════════════════════════════════════════════════════
-- ACADEMY: execute no Neon SE as tabelas ainda não existirem
-- (Se você já roda "npx prisma migrate deploy" no backoffice, NÃO precisa rodar isto.)
-- ═══════════════════════════════════════════════════════════════

-- 1) Criar tabelas (equivalente à migration 20260209000000)
CREATE TABLE IF NOT EXISTS "AcademyCourse" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "order" INTEGER NOT NULL DEFAULT 0,
  "imageId" TEXT,
  "titlePt" TEXT, "titleEn" TEXT, "titleEs" TEXT, "titleFr" TEXT,
  "descriptionPt" TEXT, "descriptionEn" TEXT, "descriptionEs" TEXT, "descriptionFr" TEXT,
  "pricePt" TEXT, "priceEn" TEXT,
  "durationPt" TEXT, "durationEn" TEXT,
  "levelPt" TEXT, "levelEn" TEXT,
  "category" TEXT,
  "tags" TEXT[] DEFAULT '{}',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AcademyCourse_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "AcademyCourse_order_idx" ON "AcademyCourse"("order");

CREATE TABLE IF NOT EXISTS "AcademyPastEvent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "order" INTEGER NOT NULL DEFAULT 0,
  "mediaId" TEXT,
  "captionPt" TEXT, "captionEn" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AcademyPastEvent_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "AcademyPastEvent_order_idx" ON "AcademyPastEvent"("order");

-- 2) Permitir N slots (expandível como projetos) — remover unique em "order"
DROP INDEX IF EXISTS "AcademyPastEvent_order_key";

-- 3) Inserir 8 slots iniciais para Past Events (só se a tabela estiver vazia)
INSERT INTO "AcademyPastEvent" ("id", "order", "updatedAt")
SELECT gen_random_uuid()::text, n, NOW()
FROM generate_series(0, 7) AS n
WHERE NOT EXISTS (SELECT 1 FROM "AcademyPastEvent" LIMIT 1);

-- Cursos: crie pelo backoffice em /admin/academy/courses (botão "Criar 6 iniciais" ou "+ Adicionar curso").
