-- ═══════════════════════════════════════════════════════════════
-- AZIMUT CMS - Script de inicialização do banco de dados
-- ═══════════════════════════════════════════════════════════════
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/etkclzwowodislmickch/sql/new
-- ═══════════════════════════════════════════════════════════════

-- Enums
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');
CREATE TYPE "TagCategory" AS ENUM ('TECHNOLOGY', 'INDUSTRY', 'FORMAT', 'OTHER');
CREATE TYPE "ServiceStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "LeadType" AS ENUM ('CONTACT_FORM', 'BUDGET_INQUIRY');
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'WON', 'LOST');
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');
CREATE TYPE "ProjectInteractionType" AS ENUM ('VIEW', 'CLICK', 'LIKE', 'SHARE', 'CTA');

-- User table
CREATE TABLE "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password TEXT NOT NULL,
    role "Role" DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market table
CREATE TABLE "Market" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code TEXT UNIQUE NOT NULL,
    "labelPt" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "heroMessagePt" TEXT,
    "heroMessageEn" TEXT,
    priority INT DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media table
CREATE TABLE "Media" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type "MediaType" DEFAULT 'IMAGE',
    "originalUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "mediumUrl" TEXT,
    "largeUrl" TEXT,
    "webpUrl" TEXT,
    "avifUrl" TEXT,
    width INT,
    height INT,
    "sizeBytes" INT,
    "durationSeconds" INT,
    format TEXT,
    "contentType" TEXT,
    "altPt" TEXT,
    "altEn" TEXT,
    "altEs" TEXT,
    "altFr" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tag table
CREATE TABLE "Tag" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    "labelPt" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelEs" TEXT,
    "labelFr" TEXT,
    category "TagCategory" NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service table
CREATE TABLE "Service" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "descriptionPt" TEXT,
    "descriptionEn" TEXT,
    "descriptionEs" TEXT,
    "descriptionFr" TEXT,
    icon TEXT,
    status "ServiceStatus" DEFAULT 'PUBLISHED',
    priority INT DEFAULT 0,
    segments TEXT[],
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project table
CREATE TABLE "Project" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    "shortTitle" TEXT,
    "summaryPt" TEXT,
    "summaryEn" TEXT,
    "summaryEs" TEXT,
    "summaryFr" TEXT,
    city TEXT,
    "stateProvince" TEXT,
    country TEXT,
    year INT,
    client TEXT,
    type TEXT,
    featured BOOLEAN DEFAULT FALSE,
    "priorityHome" INT DEFAULT 0,
    status "ProjectStatus" DEFAULT 'DRAFT',
    "ctaLabelPt" TEXT,
    "ctaLabelEn" TEXT,
    "ctaUrl" TEXT,
    "heroImageId" TEXT UNIQUE REFERENCES "Media"(id),
    "marketId" TEXT REFERENCES "Market"(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page table
CREATE TABLE "Page" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    "seoTitlePt" TEXT,
    "seoTitleEn" TEXT,
    "seoDescPt" TEXT,
    "seoDescEn" TEXT,
    status "PageStatus" DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Section table
CREATE TABLE "Section" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "pageId" TEXT NOT NULL REFERENCES "Page"(id),
    "order" INT DEFAULT 0,
    type TEXT NOT NULL,
    layout TEXT,
    "titlePt" TEXT,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "bodyPt" TEXT,
    "bodyEn" TEXT,
    "bodyEs" TEXT,
    "bodyFr" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VisitorSession table
CREATE TABLE "VisitorSession" (
    "sessionId" TEXT PRIMARY KEY,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    language TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    duration INT DEFAULT 0,
    "lastActivityAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PageView table
CREATE TABLE "PageView" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionId" TEXT NOT NULL REFERENCES "VisitorSession"("sessionId"),
    "pageSlug" TEXT,
    "projectSlug" TEXT,
    "projectId" TEXT REFERENCES "Project"(id),
    "timeSpent" INT DEFAULT 0,
    "scrollDepth" INT DEFAULT 0,
    "viewedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ProjectInteraction table
CREATE TABLE "ProjectInteraction" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionId" TEXT NOT NULL REFERENCES "VisitorSession"("sessionId"),
    "projectId" TEXT NOT NULL REFERENCES "Project"(id),
    type "ProjectInteractionType" DEFAULT 'VIEW',
    metadata JSONB NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- InterestScore table
CREATE TABLE "InterestScore" (
    "sessionId" TEXT PRIMARY KEY REFERENCES "VisitorSession"("sessionId"),
    "museumScore" INT DEFAULT 0,
    "brandScore" INT DEFAULT 0,
    "festivalScore" INT DEFAULT 0,
    "cityScore" INT DEFAULT 0,
    "educationScore" INT DEFAULT 0,
    "researchScore" INT DEFAULT 0,
    "vrScore" INT DEFAULT 0,
    "aiScore" INT DEFAULT 0,
    "installationScore" INT DEFAULT 0,
    "conversionScore" INT DEFAULT 0,
    "visitorType" TEXT,
    "recommendedProjects" JSONB,
    "suggestedAction" TEXT,
    "suggestedPage" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lead table
CREATE TABLE "Lead" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    position TEXT,
    "leadType" "LeadType" DEFAULT 'CONTACT_FORM',
    "projectType" TEXT,
    budget TEXT,
    timeline TEXT,
    description TEXT,
    "sourceUrl" TEXT,
    referrer TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    status "LeadStatus" DEFAULT 'NEW',
    priority "LeadPriority" DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Many-to-Many junction tables
CREATE TABLE "_ProjectToTag" (
    "A" TEXT NOT NULL REFERENCES "Project"(id),
    "B" TEXT NOT NULL REFERENCES "Tag"(id),
    PRIMARY KEY ("A", "B")
);

CREATE TABLE "_ProjectToService" (
    "A" TEXT NOT NULL REFERENCES "Project"(id),
    "B" TEXT NOT NULL REFERENCES "Service"(id),
    PRIMARY KEY ("A", "B")
);

CREATE TABLE "_SectionProjects" (
    "A" TEXT NOT NULL REFERENCES "Section"(id),
    "B" TEXT NOT NULL REFERENCES "Project"(id),
    PRIMARY KEY ("A", "B")
);

-- Foreign key constraint for VisitorSession -> Lead
ALTER TABLE "VisitorSession" ADD CONSTRAINT "VisitorSession_leadId_fkey" 
    FOREIGN KEY ("leadId") REFERENCES "Lead"(id);

-- Indexes for better performance
CREATE INDEX "User_email_idx" ON "User"(email);
CREATE INDEX "Project_slug_idx" ON "Project"(slug);
CREATE INDEX "Project_status_idx" ON "Project"(status);
CREATE INDEX "Page_slug_idx" ON "Page"(slug);
CREATE INDEX "Lead_email_idx" ON "Lead"(email);
CREATE INDEX "Lead_status_idx" ON "Lead"(status);
CREATE INDEX "VisitorSession_sessionId_idx" ON "VisitorSession"("sessionId");

-- Inserir usuário admin padrão (senha: Azimut2025!)
-- Hash bcrypt da senha "Azimut2025!"
INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,
    'admin@azimut.com.br',
    'Admin Azimut',
    '$2a$10$rJ8YqJ7QXJ8YqJ7QXJ8YqOuYvJ7QXJ8YqJ7QXJ8YqJ7QXJ8YqJ7QX',
    'SUPER_ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- FIM DO SCRIPT
-- ═══════════════════════════════════════════════════════════════





-- AZIMUT CMS - Script de inicialização do banco de dados
-- ═══════════════════════════════════════════════════════════════
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/etkclzwowodislmickch/sql/new
-- ═══════════════════════════════════════════════════════════════

-- Enums
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');
CREATE TYPE "TagCategory" AS ENUM ('TECHNOLOGY', 'INDUSTRY', 'FORMAT', 'OTHER');
CREATE TYPE "ServiceStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "LeadType" AS ENUM ('CONTACT_FORM', 'BUDGET_INQUIRY');
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'WON', 'LOST');
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');
CREATE TYPE "ProjectInteractionType" AS ENUM ('VIEW', 'CLICK', 'LIKE', 'SHARE', 'CTA');

-- User table
CREATE TABLE "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password TEXT NOT NULL,
    role "Role" DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market table
CREATE TABLE "Market" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code TEXT UNIQUE NOT NULL,
    "labelPt" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "heroMessagePt" TEXT,
    "heroMessageEn" TEXT,
    priority INT DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media table
CREATE TABLE "Media" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type "MediaType" DEFAULT 'IMAGE',
    "originalUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "mediumUrl" TEXT,
    "largeUrl" TEXT,
    "webpUrl" TEXT,
    "avifUrl" TEXT,
    width INT,
    height INT,
    "sizeBytes" INT,
    "durationSeconds" INT,
    format TEXT,
    "contentType" TEXT,
    "altPt" TEXT,
    "altEn" TEXT,
    "altEs" TEXT,
    "altFr" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tag table
CREATE TABLE "Tag" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    "labelPt" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelEs" TEXT,
    "labelFr" TEXT,
    category "TagCategory" NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service table
CREATE TABLE "Service" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "descriptionPt" TEXT,
    "descriptionEn" TEXT,
    "descriptionEs" TEXT,
    "descriptionFr" TEXT,
    icon TEXT,
    status "ServiceStatus" DEFAULT 'PUBLISHED',
    priority INT DEFAULT 0,
    segments TEXT[],
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project table
CREATE TABLE "Project" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    "shortTitle" TEXT,
    "summaryPt" TEXT,
    "summaryEn" TEXT,
    "summaryEs" TEXT,
    "summaryFr" TEXT,
    city TEXT,
    "stateProvince" TEXT,
    country TEXT,
    year INT,
    client TEXT,
    type TEXT,
    featured BOOLEAN DEFAULT FALSE,
    "priorityHome" INT DEFAULT 0,
    status "ProjectStatus" DEFAULT 'DRAFT',
    "ctaLabelPt" TEXT,
    "ctaLabelEn" TEXT,
    "ctaUrl" TEXT,
    "heroImageId" TEXT UNIQUE REFERENCES "Media"(id),
    "marketId" TEXT REFERENCES "Market"(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page table
CREATE TABLE "Page" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    "seoTitlePt" TEXT,
    "seoTitleEn" TEXT,
    "seoDescPt" TEXT,
    "seoDescEn" TEXT,
    status "PageStatus" DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Section table
CREATE TABLE "Section" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "pageId" TEXT NOT NULL REFERENCES "Page"(id),
    "order" INT DEFAULT 0,
    type TEXT NOT NULL,
    layout TEXT,
    "titlePt" TEXT,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "bodyPt" TEXT,
    "bodyEn" TEXT,
    "bodyEs" TEXT,
    "bodyFr" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VisitorSession table
CREATE TABLE "VisitorSession" (
    "sessionId" TEXT PRIMARY KEY,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    language TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    duration INT DEFAULT 0,
    "lastActivityAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PageView table
CREATE TABLE "PageView" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionId" TEXT NOT NULL REFERENCES "VisitorSession"("sessionId"),
    "pageSlug" TEXT,
    "projectSlug" TEXT,
    "projectId" TEXT REFERENCES "Project"(id),
    "timeSpent" INT DEFAULT 0,
    "scrollDepth" INT DEFAULT 0,
    "viewedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ProjectInteraction table
CREATE TABLE "ProjectInteraction" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionId" TEXT NOT NULL REFERENCES "VisitorSession"("sessionId"),
    "projectId" TEXT NOT NULL REFERENCES "Project"(id),
    type "ProjectInteractionType" DEFAULT 'VIEW',
    metadata JSONB NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- InterestScore table
CREATE TABLE "InterestScore" (
    "sessionId" TEXT PRIMARY KEY REFERENCES "VisitorSession"("sessionId"),
    "museumScore" INT DEFAULT 0,
    "brandScore" INT DEFAULT 0,
    "festivalScore" INT DEFAULT 0,
    "cityScore" INT DEFAULT 0,
    "educationScore" INT DEFAULT 0,
    "researchScore" INT DEFAULT 0,
    "vrScore" INT DEFAULT 0,
    "aiScore" INT DEFAULT 0,
    "installationScore" INT DEFAULT 0,
    "conversionScore" INT DEFAULT 0,
    "visitorType" TEXT,
    "recommendedProjects" JSONB,
    "suggestedAction" TEXT,
    "suggestedPage" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lead table
CREATE TABLE "Lead" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    position TEXT,
    "leadType" "LeadType" DEFAULT 'CONTACT_FORM',
    "projectType" TEXT,
    budget TEXT,
    timeline TEXT,
    description TEXT,
    "sourceUrl" TEXT,
    referrer TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    status "LeadStatus" DEFAULT 'NEW',
    priority "LeadPriority" DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Many-to-Many junction tables
CREATE TABLE "_ProjectToTag" (
    "A" TEXT NOT NULL REFERENCES "Project"(id),
    "B" TEXT NOT NULL REFERENCES "Tag"(id),
    PRIMARY KEY ("A", "B")
);

CREATE TABLE "_ProjectToService" (
    "A" TEXT NOT NULL REFERENCES "Project"(id),
    "B" TEXT NOT NULL REFERENCES "Service"(id),
    PRIMARY KEY ("A", "B")
);

CREATE TABLE "_SectionProjects" (
    "A" TEXT NOT NULL REFERENCES "Section"(id),
    "B" TEXT NOT NULL REFERENCES "Project"(id),
    PRIMARY KEY ("A", "B")
);

-- Foreign key constraint for VisitorSession -> Lead
ALTER TABLE "VisitorSession" ADD CONSTRAINT "VisitorSession_leadId_fkey" 
    FOREIGN KEY ("leadId") REFERENCES "Lead"(id);

-- Indexes for better performance
CREATE INDEX "User_email_idx" ON "User"(email);
CREATE INDEX "Project_slug_idx" ON "Project"(slug);
CREATE INDEX "Project_status_idx" ON "Project"(status);
CREATE INDEX "Page_slug_idx" ON "Page"(slug);
CREATE INDEX "Lead_email_idx" ON "Lead"(email);
CREATE INDEX "Lead_status_idx" ON "Lead"(status);
CREATE INDEX "VisitorSession_sessionId_idx" ON "VisitorSession"("sessionId");

-- Inserir usuário admin padrão (senha: Azimut2025!)
-- Hash bcrypt da senha "Azimut2025!"
INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,
    'admin@azimut.com.br',
    'Admin Azimut',
    '$2a$10$rJ8YqJ7QXJ8YqJ7QXJ8YqOuYvJ7QXJ8YqJ7QXJ8YqJ7QXJ8YqJ7QX',
    'SUPER_ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════
-- FIM DO SCRIPT
-- ═══════════════════════════════════════════════════════════════












