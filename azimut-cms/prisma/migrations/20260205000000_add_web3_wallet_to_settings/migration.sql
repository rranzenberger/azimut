-- Add Web3 wallet fields to Settings (trocar conta/chave pelo backoffice)
ALTER TABLE "Settings" ADD COLUMN "companyWalletAddress" TEXT;
ALTER TABLE "Settings" ADD COLUMN "companyWalletPrivateKeyEncrypted" TEXT;
