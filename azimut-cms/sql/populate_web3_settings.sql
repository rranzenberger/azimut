-- Popular configuração Web3 na tabela Settings (carteira pública, rede, contratos).
-- NUNCA coloque chave privada aqui; use apenas variáveis de ambiente (Vercel) para COMPANY_WALLET_PRIVATE_KEY.
--
-- VARIÁVEL NFT_CONTRACT_ADDRESS (Vercel ou aqui):
-- O valor só existe DEPOIS de fazer o deploy do contrato NFT na Polygon.
-- Como descobrir o endereço:
--   1. Abra https://remix.ethereum.org
--   2. Cole o contrato azimut-cms/contracts/StudentNFT.sol e compile (0.8.20)
--   3. Deploy & Run → Injected Provider (MetaMask) → rede Polygon Mainnet
--   4. Preencha o construtor (_name, _symbol, _baseURI) e clique Deploy
--   5. Em "Deployed Contracts" aparece: StudentNFT at 0xAb12...Cd34
--   6. Esse 0xAb12...Cd34 é o valor para NFT_CONTRACT_ADDRESS (ou web3NftContractAddress abaixo)
-- Alternativa: se já deployou antes, veja em https://polygonscan.com na sua carteira → Contract Creation.

-- 1) Criar colunas se não existirem (PostgreSQL)
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "companyWalletAddress" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "companyWalletPrivateKeyEncrypted" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "web3RpcUrl" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "web3NftContractAddress" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "web3StudentRewardContractAddress" TEXT;

-- 2) Atualizar dados (substitua os valores pelos seus)
-- Para preencher o contrato NFT: depois do deploy no Remix, descomente a linha abaixo e coloque o endereço.
UPDATE "Settings"
SET
  "companyWalletAddress" = COALESCE(NULLIF(TRIM("companyWalletAddress"), ''), '0xd5B2Da856140810c34834be5CEB366Dd7857500e'),
  "web3RpcUrl" = COALESCE(NULLIF(TRIM("web3RpcUrl"), ''), 'https://polygon-rpc.com'),
  "web3NftContractAddress" = NULLIF(TRIM(COALESCE("web3NftContractAddress", '')), ''),
  "web3StudentRewardContractAddress" = NULLIF(TRIM(COALESCE("web3StudentRewardContractAddress", '')), ''),
  "updatedAt" = NOW()
WHERE "id" = 'singleton';

-- 3) Opcional: depois do deploy do NFT, defina o endereço aqui (substitua 0xSEU_CONTRATO_NFT pelo endereço real)
-- UPDATE "Settings" SET "web3NftContractAddress" = '0xSEU_CONTRATO_NFT', "updatedAt" = NOW() WHERE "id" = 'singleton';
