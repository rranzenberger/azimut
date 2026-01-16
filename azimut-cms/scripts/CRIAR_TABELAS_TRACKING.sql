-- ═══════════════════════════════════════════════════════════════
-- SCRIPT PARA CRIAR TABELAS DE TRACKING
-- Execute este script no Neon SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Enum para tipo de interação com projeto
DO $$ BEGIN
    CREATE TYPE "ProjectInteractionType" AS ENUM ('VIEW', 'CLICK', 'HOVER', 'LIKE', 'SHARE', 'VIDEO_PLAY', 'VIDEO_COMPLETE', 'DOWNLOAD');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Tabela VisitorSession (sessões de visitantes)
CREATE TABLE IF NOT EXISTS "VisitorSession" (
    "sessionId" TEXT PRIMARY KEY,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "language" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Campos de analytics avançado
    "visitorFingerprint" TEXT UNIQUE,
    "deviceType" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "screenResolution" TEXT,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "visitCount" INTEGER NOT NULL DEFAULT 1,
    "isReturning" BOOLEAN NOT NULL DEFAULT false,
    "isPWAInstalled" BOOLEAN NOT NULL DEFAULT false,
    "bounceRate" BOOLEAN NOT NULL DEFAULT false,
    "engagementScore" INTEGER NOT NULL DEFAULT 0,
    "conversionProbability" DOUBLE PRECISION
);

-- Índices para VisitorSession
CREATE INDEX IF NOT EXISTS "VisitorSession_visitorFingerprint_idx" ON "VisitorSession"("visitorFingerprint");
CREATE INDEX IF NOT EXISTS "VisitorSession_country_idx" ON "VisitorSession"("country");
CREATE INDEX IF NOT EXISTS "VisitorSession_isReturning_idx" ON "VisitorSession"("isReturning");
CREATE INDEX IF NOT EXISTS "VisitorSession_isPWAInstalled_idx" ON "VisitorSession"("isPWAInstalled");
CREATE INDEX IF NOT EXISTS "VisitorSession_createdAt_idx" ON "VisitorSession"("createdAt");
CREATE INDEX IF NOT EXISTS "VisitorSession_lastActivityAt_idx" ON "VisitorSession"("lastActivityAt");

-- 3. Tabela PageView (visualizações de página)
CREATE TABLE IF NOT EXISTS "PageView" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "sessionId" TEXT NOT NULL,
    "pageSlug" TEXT,
    "projectSlug" TEXT,
    "projectId" TEXT,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "scrollDepth" INTEGER NOT NULL DEFAULT 0,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "PageView_sessionId_fkey" FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Índice para PageView
CREATE INDEX IF NOT EXISTS "PageView_sessionId_idx" ON "PageView"("sessionId");
CREATE INDEX IF NOT EXISTS "PageView_pageSlug_idx" ON "PageView"("pageSlug");
CREATE INDEX IF NOT EXISTS "PageView_viewedAt_idx" ON "PageView"("viewedAt");

-- 4. Tabela ProjectInteraction (interações com projetos)
CREATE TABLE IF NOT EXISTS "ProjectInteraction" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "sessionId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "ProjectInteractionType" NOT NULL DEFAULT 'VIEW',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "ProjectInteraction_sessionId_fkey" FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectInteraction_projectId_fkey" FOREIGN KEY ("projectId") 
        REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Índice para ProjectInteraction
CREATE INDEX IF NOT EXISTS "ProjectInteraction_sessionId_idx" ON "ProjectInteraction"("sessionId");
CREATE INDEX IF NOT EXISTS "ProjectInteraction_projectId_idx" ON "ProjectInteraction"("projectId");

-- 5. Tabela InterestScore (scores de interesse calculados por IA)
CREATE TABLE IF NOT EXISTS "InterestScore" (
    "sessionId" TEXT PRIMARY KEY,
    "museumScore" INTEGER NOT NULL DEFAULT 0,
    "brandScore" INTEGER NOT NULL DEFAULT 0,
    "festivalScore" INTEGER NOT NULL DEFAULT 0,
    "cityScore" INTEGER NOT NULL DEFAULT 0,
    "educationScore" INTEGER NOT NULL DEFAULT 0,
    "researchScore" INTEGER NOT NULL DEFAULT 0,
    "vrScore" INTEGER NOT NULL DEFAULT 0,
    "aiScore" INTEGER NOT NULL DEFAULT 0,
    "installationScore" INTEGER NOT NULL DEFAULT 0,
    "conversionScore" INTEGER NOT NULL DEFAULT 0,
    "visitorType" TEXT,
    "recommendedProjects" JSONB,
    "suggestedAction" TEXT,
    "suggestedPage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "InterestScore_sessionId_fkey" FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 6. Tabela PWAInstall (instalações do PWA)
CREATE TABLE IF NOT EXISTS "PWAInstall" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
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
    
    CONSTRAINT "PWAInstall_sessionId_fkey" FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Índices para PWAInstall
CREATE INDEX IF NOT EXISTS "PWAInstall_sessionId_idx" ON "PWAInstall"("sessionId");
CREATE INDEX IF NOT EXISTS "PWAInstall_type_idx" ON "PWAInstall"("type");
CREATE INDEX IF NOT EXISTS "PWAInstall_country_idx" ON "PWAInstall"("country");
CREATE INDEX IF NOT EXISTS "PWAInstall_createdAt_idx" ON "PWAInstall"("createdAt");

-- 7. Tabela VisitorBehavior (comportamentos do visitante)
CREATE TABLE IF NOT EXISTS "VisitorBehavior" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "sessionId" TEXT NOT NULL,
    "behaviorType" TEXT NOT NULL,
    "element" TEXT,
    "elementType" TEXT,
    "pageSlug" TEXT,
    "value" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "VisitorBehavior_sessionId_fkey" FOREIGN KEY ("sessionId") 
        REFERENCES "VisitorSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Índices para VisitorBehavior
CREATE INDEX IF NOT EXISTS "VisitorBehavior_sessionId_idx" ON "VisitorBehavior"("sessionId");
CREATE INDEX IF NOT EXISTS "VisitorBehavior_behaviorType_idx" ON "VisitorBehavior"("behaviorType");
CREATE INDEX IF NOT EXISTS "VisitorBehavior_pageSlug_idx" ON "VisitorBehavior"("pageSlug");
CREATE INDEX IF NOT EXISTS "VisitorBehavior_timestamp_idx" ON "VisitorBehavior"("timestamp");

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO: Listar tabelas criadas
-- ═══════════════════════════════════════════════════════════════
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('VisitorSession', 'PageView', 'ProjectInteraction', 'InterestScore', 'PWAInstall', 'VisitorBehavior')
ORDER BY table_name;
