-- Migration: Add Editais and LeadEdital tables
-- Manual migration SQL

-- Create EditalType enum
CREATE TYPE "EditalType" AS ENUM ('FEDERAL', 'ESTADUAL', 'MUNICIPAL', 'PRIVADO', 'ONG', 'INSTITUTO');

-- Create EditalStatus enum
CREATE TYPE "EditalStatus" AS ENUM ('ABERTO', 'FECHADO', 'ENVIADO', 'GANHO', 'PERDIDO');

-- Create LeadEditalStatus enum
CREATE TYPE "LeadEditalStatus" AS ENUM ('PENDING', 'CONTACTED', 'EMAIL_SENT', 'CALL_SCHEDULED', 'PROPOSAL_SENT', 'WON', 'LOST');

-- Create Edital table
CREATE TABLE "Edital" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    type "EditalType" NOT NULL,
    area TEXT NOT NULL,
    "minValue" DOUBLE PRECISION,
    "maxValue" DOUBLE PRECISION,
    deadline TIMESTAMP,
    status "EditalStatus" DEFAULT 'ABERTO',
    description TEXT,
    requirements TEXT,
    "relevanceScore" INTEGER DEFAULT 0,
    "matchedServices" TEXT[],
    "matchedProjects" TEXT[],
    "contactEmail" TEXT,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "contactLinkedIn" TEXT,
    "scrapedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for Edital
CREATE INDEX "Edital_status_idx" ON "Edital"(status);
CREATE INDEX "Edital_deadline_idx" ON "Edital"(deadline);
CREATE INDEX "Edital_relevanceScore_idx" ON "Edital"("relevanceScore");

-- Create LeadEdital table
CREATE TABLE "LeadEdital" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "editalId" TEXT NOT NULL REFERENCES "Edital"(id) ON DELETE CASCADE,
    "leadId" TEXT NOT NULL REFERENCES "Lead"(id) ON DELETE CASCADE,
    "emailSent" BOOLEAN DEFAULT false,
    "emailSentAt" TIMESTAMP,
    "callScheduled" BOOLEAN DEFAULT false,
    "callScheduledAt" TIMESTAMP,
    "callLink" TEXT,
    "portfolioSent" BOOLEAN DEFAULT false,
    "portfolioSentAt" TIMESTAMP,
    "proposalSent" BOOLEAN DEFAULT false,
    "proposalSentAt" TIMESTAMP,
    status "LeadEditalStatus" DEFAULT 'PENDING',
    notes TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("editalId", "leadId")
);

-- Create indexes for LeadEdital
CREATE INDEX "LeadEdital_status_idx" ON "LeadEdital"(status);
CREATE INDEX "LeadEdital_editalId_idx" ON "LeadEdital"("editalId");
CREATE INDEX "LeadEdital_leadId_idx" ON "LeadEdital"("leadId");

