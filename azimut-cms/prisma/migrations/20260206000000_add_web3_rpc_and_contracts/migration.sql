-- Web3: RPC URL e endereços dos contratos (editáveis no backoffice)
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "web3RpcUrl" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "web3NftContractAddress" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "web3StudentRewardContractAddress" TEXT;
