-- AlterEnum: Adicionar novos valores ao LeadStatus
-- PostgreSQL requer que adicionemos os valores um por vez
-- Nota: Se já existir, vai dar erro mas o script vai ignorar
ALTER TYPE "LeadStatus" ADD VALUE 'CONTACTED';
ALTER TYPE "LeadStatus" ADD VALUE 'PROPOSAL_SENT';
ALTER TYPE "LeadStatus" ADD VALUE 'NEGOTIATION';

-- Mapear status antigos para novos (IN_PROGRESS -> CONTACTED)
UPDATE "Lead" SET "status" = 'CONTACTED' WHERE "status" = 'IN_PROGRESS';

-- AlterTable: Adicionar campos de atribuição ao Lead
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "assignedToId" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "assignedAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "notes" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "lastContactAt" TIMESTAMP(3);

-- AddForeignKey: Relacionamento com User (antes dos índices)
-- Nota: Se já existir, vai dar erro mas o script vai ignorar
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" 
  FOREIGN KEY ("assignedToId") REFERENCES "User"("id") 
  ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex: Índices para performance (depois de criar colunas)
CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status");
CREATE INDEX IF NOT EXISTS "Lead_priority_idx" ON "Lead"("priority");
CREATE INDEX IF NOT EXISTS "Lead_assignedToId_idx" ON "Lead"("assignedToId");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");

