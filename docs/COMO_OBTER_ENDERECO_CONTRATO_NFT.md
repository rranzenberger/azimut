# Como descobrir o endereço do contrato NFT (para NFT_CONTRACT_ADDRESS)

O valor de **NFT_CONTRACT_ADDRESS** só existe **depois que você faz o deploy** do contrato do NFT na rede Polygon. O endereço é gerado no momento do deploy.

---

## Opção 1: Deploy no Remix (recomendado)

1. Abra **https://remix.ethereum.org**
2. Crie um arquivo (ex.: `StudentNFT.sol`) e cole o conteúdo de **`azimut-cms/contracts/StudentNFT.sol`**
3. Compile: aba **Solidity Compiler**, versão **0.8.20**
4. Aba **Deploy & run**:
   - Environment: **Injected Provider** (MetaMask)
   - Conecte o MetaMask e selecione a rede **Polygon Mainnet**
   - No construtor preencha, por exemplo:
     - `_name`: `Azimut Student NFT`
     - `_symbol`: `AZSTUDENT`
     - `_baseURI`: `https://azimut.com.br/nft/`
5. Clique em **Deploy** e confirme na MetaMask
6. Depois do deploy, em **Deployed Contracts** aparece:
   - **StudentNFT at 0xAb12Cd34Ef56...**
7. Clique na setinha ao lado para expandir; o **endereço completo** (0x + 40 caracteres) está logo abaixo. **Copie esse valor** — é o que você coloca em **NFT_CONTRACT_ADDRESS**

---

## Opção 2: Já deployou antes — achar no Polygonscan

1. Abra **https://polygonscan.com**
2. No campo de busca, digite o **endereço da sua carteira** (a que usou para fazer o deploy)
3. Aba **Contract** (ou **Transactions**)
4. Em **Transactions**, procure uma do tipo **Contract Creation**
5. Entre na transação e veja **Created Contract:** — esse é o endereço do contrato
6. Use esse endereço como valor de **NFT_CONTRACT_ADDRESS**

---

## Onde colocar o valor

- **Vercel:** Settings → Environment Variables → `NFT_CONTRACT_ADDRESS` = `0x...` (o endereço que você copiou)
- **Backoffice:** Aba **Carteira Web3** → campo **Contrato NFT** → Salvar configuração
- **Banco (SQL):** use o script `sql/popular_web3_settings.sql` ou o `UPDATE` abaixo

Depois de preencher, faça **Redeploy** na Vercel (se alterou variável de ambiente).
