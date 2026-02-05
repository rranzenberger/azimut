# Como preencher NFT_CONTRACT_ADDRESS

A variável **NFT_CONTRACT_ADDRESS** (na Vercel ou no backoffice) precisa do **endereço do contrato** que emite o NFT. Esse endereço **só existe depois que você faz o deploy** do contrato na Polygon.

---

## Onde definir

- **Vercel:** Settings → Environment Variables → `NFT_CONTRACT_ADDRESS` (pode deixar vazio até ter o endereço).
- **Backoffice:** Aba **Carteira Web3** → campo **Contrato NFT** → Salvar (grava em `Settings` no banco).

O código usa primeiro o valor do banco (backoffice); se estiver vazio, usa a variável de ambiente (Vercel).

---

## Como descobrir o endereço do contrato

### Opção 1: Deploy novo no Remix (recomendado)

1. Abra **https://remix.ethereum.org**
2. **Onde colar o contrato:**
   - No painel **esquerdo**, abra **FILE EXPLORER** (ícone de pasta).
   - Clique em **"+ Create"** (ou botão de novo arquivo) e crie um arquivo chamado **`StudentNFT.sol`** (pode ser dentro da pasta `contracts` ou na raiz).
   - Clique no arquivo **StudentNFT.sol** para abri-lo no **editor central** (onde aparece "Welcome to Remix").
   - **Cole** todo o conteúdo de **`azimut-cms/contracts/StudentNFT.sol`** nesse editor.
3. **Compilar:** no menu superior, clique em **Compile** (ou abra o ícone do compilador Solidity no painel esquerdo), selecione a versão **0.8.20** e clique em **Compile StudentNFT.sol**.
4. Em **Deploy & run**:
   - Environment: **Injected Provider** (MetaMask)
   - Rede: **Polygon Mainnet**
   - Construtor: por exemplo  
     `_name`: `Azimut Student NFT`  
     `_symbol`: `AZSTUDENT`  
     `_baseURI`: `https://azimut.com.br/nft/`
5. Clique em **Deploy** e confirme na MetaMask
6. Em **Deployed Contracts** aparece algo como: **StudentNFT at 0x1234...abcd**
7. Esse **0x1234...abcd** (endereço completo) é o valor de **NFT_CONTRACT_ADDRESS**

### Opção 2: Contrato já deployado

- Acesse **https://polygonscan.com**
- Cole o endereço da **carteira** que fez o deploy
- Aba **Transactions** → procure transação do tipo **Contract Creation**
- Clique na transação → em **Created Contract** ou **Contract** está o endereço do contrato

---

## Depois de ter o endereço

1. **Vercel:** Environment Variables → edite `NFT_CONTRACT_ADDRESS` → valor: `0x...` (42 caracteres) → Save → **Redeploy**.
2. **Backoffice:** Carteira Web3 → Contrato NFT → cole o endereço → Salvar configuração.

Não é obrigatório preencher nos dois: banco ou Vercel já resolve. Redeploy na Vercel só é necessário se você alterar variáveis de ambiente.
