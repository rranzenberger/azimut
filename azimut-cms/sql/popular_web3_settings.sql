-- Popular configuração Web3 na tabela Settings (carteira pública, rede Polygon, contratos).
-- Execute no banco (Neon ou local) após rodar a migration que adiciona as colunas.
-- Substitua os valores pelos seus; NUNCA coloque chave privada aqui.
--
-- COMO DESCOBRIR O ENDEREÇO DO CONTRATO NFT:
-- 1) Deploy no Remix (remix.ethereum.org) com o contrato StudentNFT.sol na rede Polygon.
-- 2) Após o deploy, em "Deployed Contracts" aparece "StudentNFT at 0x...". Copie esse 0x...
-- 3) Ou em polygonscan.com: sua carteira → Transactions → Contract Creation → endereço do contrato.
-- Ver também: docs/COMO_OBTER_ENDERECO_CONTRATO_NFT.md

-- Garantir que a tabela Settings existe e tem o registro singleton
INSERT INTO "Settings" ("id", "siteName", "siteUrl", "defaultLanguage", "defaultCountry", "timezone", "createdAt", "updatedAt")
VALUES ('singleton', 'Azimut', 'https://azmt.com.br', 'pt', 'BR', 'America/Sao_Paulo', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Atualizar Web3: carteira, RPC e contratos (preencha os 0x... após fazer deploy dos contratos)
UPDATE "Settings"
SET
  "companyWalletAddress" = '0xd5B2Da856140810c34834be5CEB366Dd7857500e',
  "web3RpcUrl" = 'https://polygon-rpc.com',
  "web3NftContractAddress" = NULL,
  "web3StudentRewardContractAddress" = NULL,
  "updatedAt" = NOW()
WHERE "id" = 'singleton';

-- Depois do deploy do contrato NFT no Remix/Polygon, preencha o endereço aqui e execute só este UPDATE:
-- UPDATE "Settings"
-- SET
--   "web3NftContractAddress" = '0xENDERECO_DO_CONTRATO_NFT_APOS_DEPLOY',
--   "updatedAt" = NOW()
-- WHERE "id" = 'singleton';

-- Opcional: contrato Student Reward (se já tiver feito deploy)
-- UPDATE "Settings"
-- SET
--   "web3StudentRewardContractAddress" = '0xENDERECO_DO_CONTRATO_STUDENT_REWARD',
--   "updatedAt" = NOW()
-- WHERE "id" = 'singleton';
