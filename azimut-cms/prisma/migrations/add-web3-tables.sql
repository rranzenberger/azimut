-- Tabelas para Web3: Carteiras, Pagamentos e Recompensas

-- Tabela de Carteiras Conectadas
CREATE TABLE IF NOT EXISTS "Wallet" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "address" TEXT NOT NULL UNIQUE,
  "chainId" INTEGER NOT NULL DEFAULT 137,
  "lastConnectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "Wallet_address_idx" ON "Wallet"("address");

-- Tabela de Pagamentos Recebidos
CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "fromAddress" TEXT NOT NULL,
  "toAddress" TEXT NOT NULL,
  "amount" DECIMAL(65,30) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'ETH',
  "txHash" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "Payment_fromAddress_idx" ON "Payment"("fromAddress");
CREATE INDEX IF NOT EXISTS "Payment_toAddress_idx" ON "Payment"("toAddress");
CREATE INDEX IF NOT EXISTS "Payment_txHash_idx" ON "Payment"("txHash");

-- Tabela de Recompensas Distribuídas
CREATE TABLE IF NOT EXISTS "Reward" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "toAddress" TEXT NOT NULL,
  "fromAddress" TEXT NOT NULL,
  "rewardType" TEXT NOT NULL,
  "amount" DECIMAL(65,30),
  "nftId" TEXT,
  "txHash" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "Reward_toAddress_idx" ON "Reward"("toAddress");
CREATE INDEX IF NOT EXISTS "Reward_fromAddress_idx" ON "Reward"("fromAddress");
CREATE INDEX IF NOT EXISTS "Reward_txHash_idx" ON "Reward"("txHash");
