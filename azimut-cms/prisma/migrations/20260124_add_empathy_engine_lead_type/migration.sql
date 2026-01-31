-- AlterEnum
-- Add EMPATHY_ENGINE to LeadType enum (leads do jogo Empathy Engine)
ALTER TYPE "LeadType" ADD VALUE IF NOT EXISTS 'EMPATHY_ENGINE';
