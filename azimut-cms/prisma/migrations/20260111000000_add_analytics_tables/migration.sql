-- AlterTable: Adicionar campos novos em VisitorSession
ALTER TABLE "VisitorSession" 
ADD COLUMN IF NOT EXISTS "visitorFingerprint" TEXT,
ADD COLUMN IF NOT EXISTS "deviceType" TEXT,
ADD COLUMN IF NOT EXISTS "browser" TEXT,
ADD COLUMN IF NOT EXISTS "os" TEXT,
ADD COLUMN IF NOT EXISTS "screenResolution" TEXT,
ADD COLUMN IF NOT EXISTS "referrer" TEXT,
ADD COLUMN IF NOT EXISTS "utmSource" TEXT,
ADD COLUMN IF NOT EXISTS "utmMedium" TEXT,
ADD COLUMN IF NOT EXISTS "utmCampaign" TEXT,
ADD COLUMN IF NOT EXISTS "visitCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS "isReturning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "isPWAInstalled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "bounceRate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "engagementScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "conversionProbability" DOUBLE PRECISION;

-- CreateIndex: visitorFingerprint (unique)
CREATE UNIQUE INDEX IF NOT EXISTS "VisitorSession_visitorFingerprint_key" ON "VisitorSession"("visitorFingerprint");

-- CreateIndex: visitorFingerprint (index)
CREATE INDEX IF NOT EXISTS "VisitorSession_visitorFingerprint_idx" ON "VisitorSession"("visitorFingerprint");

-- CreateIndex: isReturning
CREATE INDEX IF NOT EXISTS "VisitorSession_isReturning_idx" ON "VisitorSession"("isReturning");

-- CreateIndex: isPWAInstalled
CREATE INDEX IF NOT EXISTS "VisitorSession_isPWAInstalled_idx" ON "VisitorSession"("isPWAInstalled");

-- CreateTable: PWAInstall
CREATE TABLE IF NOT EXISTS "PWAInstall" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "platform" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "deviceType" TEXT,
    "outcome" TEXT,
    "country" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PWAInstall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: sessionId
CREATE INDEX IF NOT EXISTS "PWAInstall_sessionId_idx" ON "PWAInstall"("sessionId");

-- CreateIndex: type
CREATE INDEX IF NOT EXISTS "PWAInstall_type_idx" ON "PWAInstall"("type");

-- CreateIndex: country
CREATE INDEX IF NOT EXISTS "PWAInstall_country_idx" ON "PWAInstall"("country");

-- CreateIndex: createdAt
CREATE INDEX IF NOT EXISTS "PWAInstall_createdAt_idx" ON "PWAInstall"("createdAt");

-- CreateTable: VisitorBehavior
CREATE TABLE IF NOT EXISTS "VisitorBehavior" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "behaviorType" TEXT NOT NULL,
    "element" TEXT,
    "elementType" TEXT,
    "pageSlug" TEXT,
    "value" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorBehavior_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: sessionId
CREATE INDEX IF NOT EXISTS "VisitorBehavior_sessionId_idx" ON "VisitorBehavior"("sessionId");

-- CreateIndex: behaviorType
CREATE INDEX IF NOT EXISTS "VisitorBehavior_behaviorType_idx" ON "VisitorBehavior"("behaviorType");

-- CreateIndex: pageSlug
CREATE INDEX IF NOT EXISTS "VisitorBehavior_pageSlug_idx" ON "VisitorBehavior"("pageSlug");

-- CreateIndex: timestamp
CREATE INDEX IF NOT EXISTS "VisitorBehavior_timestamp_idx" ON "VisitorBehavior"("timestamp");

-- AddForeignKey: PWAInstall -> VisitorSession
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'PWAInstall_sessionId_fkey'
    ) THEN
        ALTER TABLE "PWAInstall" 
        ADD CONSTRAINT "PWAInstall_sessionId_fkey" 
        FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey: VisitorBehavior -> VisitorSession
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'VisitorBehavior_sessionId_fkey'
    ) THEN
        ALTER TABLE "VisitorBehavior" 
        ADD CONSTRAINT "VisitorBehavior_sessionId_fkey" 
        FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;
