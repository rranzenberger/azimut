-- CreateTable: Press (imprensa)
CREATE TABLE IF NOT EXISTS "Press" (
    "id" TEXT NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "summaryPt" TEXT,
    "summaryEn" TEXT,
    "summaryEs" TEXT,
    "summaryFr" TEXT,
    "url" TEXT,
    "publishedAt" TIMESTAMP(3),
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Press_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Press_isPublished_idx" ON "Press"("isPublished");
CREATE INDEX IF NOT EXISTS "Press_publishedAt_idx" ON "Press"("publishedAt");
CREATE INDEX IF NOT EXISTS "Press_displayOrder_idx" ON "Press"("displayOrder");

-- CreateTable: Publication (research)
CREATE TABLE IF NOT EXISTS "Publication" (
    "id" TEXT NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "authors" TEXT,
    "url" TEXT,
    "year" INTEGER,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Publication_isPublished_idx" ON "Publication"("isPublished");
CREATE INDEX IF NOT EXISTS "Publication_year_idx" ON "Publication"("year");
CREATE INDEX IF NOT EXISTS "Publication_displayOrder_idx" ON "Publication"("displayOrder");
