# Deploy do StudentNFT na Polygon — Passo a passo

Guia para fazer o deploy do contrato `StudentNFT.sol` na rede Polygon usando Remix e MetaMask.

---

## Parte 1: Remix e contrato

### Passo 1 — Abrir o Remix
1. Abra no navegador: **https://remix.ethereum.org**
2. Espere carregar (pode aparecer "Loading...").

### Passo 2 — Abrir o File Explorer
1. Na **barra esquerda** do Remix, clique no **primeiro ícone** (pasta = File Explorer).
2. O painel de arquivos abre à esquerda.

### Passo 3 — Criar o arquivo do contrato
1. No painel File Explorer, clique em **"+ Create"** (ou no ícone de novo arquivo).
2. Digite o nome: **`StudentNFT.sol`** e pressione Enter.
3. O arquivo abre no **editor central** (área grande do meio).

### Passo 4 — Colar o código
1. No seu projeto (Cursor), abra: **`azimut-cms/contracts/StudentNFT.sol`**.
2. Selecione **todo** o conteúdo (Ctrl+A) e copie (Ctrl+C).
3. Volte ao Remix, clique dentro do editor do **StudentNFT.sol**.
4. Cole o código (Ctrl+V), substituindo qualquer conteúdo que já exista.
5. Salve se aparecer indicador de alteração (Ctrl+S).

### Passo 5 — Compilar
1. Na barra esquerda, clique no ícone **Solidity Compiler** (segundo ícone).
2. No painel que abrir:
   - Em **COMPILER**, no dropdown, selecione **0.8.20** (não use 0.8.31).
   - Clique no botão **"Compile StudentNFT.sol"**.
3. Espere aparecer o **✓ verde** no ícone do compilador (compilação OK).
4. Se aparecer erro, confira se a versão é 0.8.20 e se o código foi colado por completo.

---

## Parte 2: Conectar à Polygon e fazer o deploy

### Passo 6 — MetaMask na rede Polygon
1. Abra a extensão **MetaMask** no navegador.
2. No **topo**, onde mostra a rede (ex.: "Ethereum Mainnet"), clique para abrir o menu.
3. Selecione **Polygon** (ou "Polygon Mainnet").
4. Confirme que a conta que tem POL é a que você vai usar (ex.: Account 1).

### Passo 7 — Conectar o Remix à MetaMask
1. No Remix, na barra esquerda, clique no ícone **Deploy & Run Transactions** (foguete / terceiro ícone).
2. No topo do painel, em **ENVIRONMENT**, clique no dropdown (onde pode estar "Remix VM (Osaka)").
3. Selecione **"Browser extension"** (não use "WalletConnect" nem "Remix VM").
4. A MetaMask abre um pop-up pedindo para conectar ao Remix: clique em **Conectar** (ou "Connect").
5. Depois de conectar, no Remix deve aparecer:
   - Sua conta (ex.: `0x213...48bAb`) e o saldo em **POL** (não mais "ETH").
   - A rede deve ser **Polygon** (ou "Chain 137"). Se ainda mostrar "Main (1)", troque a rede na MetaMask para Polygon e, se precisar, reconecte no Remix.

### Passo 8 — Selecionar o contrato para deploy
1. No mesmo painel "Deploy & Run Transactions", role até a seção **CONTRACT**.
2. No dropdown ao lado de "Contract", selecione **StudentNFT** (ou "IERC721 - StudentNFT.sol", o contrato principal).
3. Abaixo devem aparecer **três campos** para os argumentos do construtor.

### Passo 9 — Preencher os argumentos do construtor
Preencha os três campos na ordem:

| Campo        | O que é        | Exemplo (pode usar)           |
|-------------|----------------|-------------------------------|
| **\_name**  | Nome do NFT    | `Azimut Student`              |
| **\_symbol**| Símbolo (ticker)| `AZST`                        |
| **\_baseURI**| URL base dos metadados | `https://azimut.com/nft/` |

- Use aspas nos textos (ex.: `"Azimut Student"`).
- Para **\_baseURI**, use uma URL que você controla; pode mudar depois com a função `setBaseURI` no contrato.

### Passo 10 — Fazer o deploy
1. Clique no botão laranja **Deploy** (abaixo dos campos).
2. A MetaMask abre pedindo para **confirmar** a transação:
   - Veja o valor de gas (em POL).
   - Clique em **Confirmar** (ou "Confirm").
3. Aguarde a confirmação na rede (alguns segundos). No Remix pode aparecer um log "creation of StudentNFT pending..." e depois "success".

### Passo 11 — Copiar o endereço do contrato
1. No Remix, na mesma aba "Deploy & Run Transactions", role até **"Deployed Contracts"** (ou "Contracts").
2. Deve aparecer uma caixa com **StudentNFT** e um endereço (ex.: `0x1234...abcd`).
3. Clique na **setinha** ao lado para expandir e ver as funções.
4. **Clique no ícone de copiar** ao lado do endereço do contrato (ou selecione e copie o endereço).
5. Guarde esse endereço num bloco de notas — você vai usar no backoffice.

---

## Parte 3: Configurar no backoffice

### Passo 12 — Colocar o endereço no backoffice
1. Acesse o backoffice (ex.: **https://azimut-backoffice.vercel.app**).
2. Faça login e vá em **Configurações** (ou o menu onde está a parte Web3).
3. Abra a seção **Carteira Web3** (ou "Web3 / NFT").
4. No campo **"Endereço do contrato NFT"** (ou "web3NftContractAddress"), **cole o endereço** que você copiou no Passo 11.
5. Salve as configurações.

Se o backoffice usar variáveis de ambiente (Vercel), adicione ou edite:
- **NFT_CONTRACT_ADDRESS** = `0x...` (o endereço do contrato)
e faça um novo deploy do backoffice.

---

## Resumo rápido

| # | O que fazer |
|---|-------------|
| 1 | Abrir remix.ethereum.org |
| 2 | File Explorer → criar `StudentNFT.sol` |
| 3 | Colar código do `azimut-cms/contracts/StudentNFT.sol` |
| 4 | Compilar com versão 0.8.20 |
| 5 | MetaMask em rede Polygon |
| 6 | Remix: ENVIRONMENT = Browser extension, conectar MetaMask |
| 7 | CONTRACT = StudentNFT, preencher _name, _symbol, _baseURI |
| 8 | Clicar Deploy e confirmar na MetaMask |
| 9 | Copiar endereço em "Deployed Contracts" |
| 10 | Colar no backoffice em "Endereço do contrato NFT" |

Se em algum passo der erro (rede errada, "no contract", transação falhou), anote a mensagem e o número do passo para ajustar.
