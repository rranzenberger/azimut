-- Tabela para Projetos de Estudantes (Canadá)
-- Integração com smart contract StudentReward

CREATE TABLE IF NOT EXISTS "StudentProject" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "studentAddress" TEXT NOT NULL,
  "projectValue" DECIMAL(65,30) NOT NULL,
  "rewardAmount" DECIMAL(65,30),
  "description" TEXT,
  "txHash" TEXT,
  "contractAddress" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'REGISTERED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "StudentProject_studentAddress_idx" ON "StudentProject"("studentAddress");
CREATE INDEX IF NOT EXISTS "StudentProject_txHash_idx" ON "StudentProject"("txHash");
CREATE INDEX IF NOT EXISTS "StudentProject_contractAddress_idx" ON "StudentProject"("contractAddress");
