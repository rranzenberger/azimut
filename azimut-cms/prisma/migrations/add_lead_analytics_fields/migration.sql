-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "leadScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "organizationType" TEXT,
ADD COLUMN "estimatedValue" DOUBLE PRECISION,
ADD COLUMN "interestInGrants" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "country" TEXT,
ADD COLUMN "city" TEXT;

-- CreateIndex
CREATE INDEX "Lead_leadScore_idx" ON "Lead"("leadScore");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
