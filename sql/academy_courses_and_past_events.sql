-- Academy: tabelas para cards de Cursos (6) e Past Events (8 slots)
-- Execute após rodar: npx prisma migrate dev (ou aplique manualmente em produção)

-- AcademyCourse: 6 cards da página Cursos (imagem, título, descrição, preço, etc.)
CREATE TABLE IF NOT EXISTS "AcademyCourse" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "order" INTEGER NOT NULL DEFAULT 0,
  "imageId" TEXT,
  "titlePt" TEXT,
  "titleEn" TEXT,
  "titleEs" TEXT,
  "titleFr" TEXT,
  "descriptionPt" TEXT,
  "descriptionEn" TEXT,
  "descriptionEs" TEXT,
  "descriptionFr" TEXT,
  "pricePt" TEXT,
  "priceEn" TEXT,
  "durationPt" TEXT,
  "durationEn" TEXT,
  "levelPt" TEXT,
  "levelEn" TEXT,
  "category" TEXT,
  "tags" TEXT[] DEFAULT '{}',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AcademyCourse_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "AcademyCourse_order_idx" ON "AcademyCourse"("order");

-- AcademyPastEvent: 8 slots da galeria Past Events (Workshops)
CREATE TABLE IF NOT EXISTS "AcademyPastEvent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "order" INTEGER NOT NULL DEFAULT 0,
  "mediaId" TEXT,
  "captionPt" TEXT,
  "captionEn" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AcademyPastEvent_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "AcademyPastEvent_order_key" ON "AcademyPastEvent"("order");
CREATE INDEX IF NOT EXISTS "AcademyPastEvent_order_idx" ON "AcademyPastEvent"("order");

-- Inserir 8 slots para AcademyPastEvent (order 0..7) — mediaId NULL = placeholder
INSERT INTO "AcademyPastEvent" ("id", "order", "captionPt", "captionEn", "updatedAt")
SELECT gen_random_uuid()::text, n, 'Evento ' || (n+1), 'Event ' || (n+1), NOW()
FROM generate_series(0, 7) AS n
ON CONFLICT ("order") DO NOTHING;

-- AcademyCourse: criar os 6 cards pelo backoffice (/admin/academy/courses) ou rodar seed do Prisma.
