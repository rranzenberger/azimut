-- CreateTable
CREATE TABLE "AcademyCourse" (
    "id" TEXT NOT NULL,
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
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyPastEvent" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "mediaId" TEXT,
    "captionPt" TEXT,
    "captionEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyPastEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AcademyCourse_order_idx" ON "AcademyCourse"("order");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyPastEvent_order_key" ON "AcademyPastEvent"("order");

-- CreateIndex
CREATE INDEX "AcademyPastEvent_order_idx" ON "AcademyPastEvent"("order");

-- AddForeignKey
ALTER TABLE "AcademyCourse" ADD CONSTRAINT "AcademyCourse_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyPastEvent" ADD CONSTRAINT "AcademyPastEvent_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
