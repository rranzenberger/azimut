# 🔐 Configuração de Carteira Web3 - Receber e Distribuir Crypto

## 🎯 OBJETIVO

Configurar sistema para:
1. ✅ Cliente conectar carteira (MetaMask, Ledger, etc.)
2. ✅ Receber pagamentos em crypto na carteira da empresa
3. ✅ Distribuir recompensas (NFTs, tokens) automaticamente quando cliente ganha

---

## ⚙️ CONFIGURAÇÃO NECESSÁRIA:

### **1. Variáveis de Ambiente (.env)**

Adicione no arquivo `azimut-cms/.env`:

```env
# Carteira da Empresa (para receber pagamentos e enviar recompensas)
COMPANY_WALLET_ADDRESS=0xSeuEnderecoDaCarteira
COMPANY_WALLET_PRIVATE_KEY=0xSuaChavePrivadaSegura

# RPC URL (Polygon recomendado para baixo custo)
RPC_URL=https://polygon-rpc.com
# Ou para testnet:
# RPC_URL=https://rpc-mumbai.maticvigil.com

# Contrato NFT (opcional - se tiver smart contract de NFTs)
NFT_CONTRACT_ADDRESS=0xEnderecoDoContratoNFT
```

### **2. Criar Carteira da Empresa**

**⚠️ IMPORTANTE: SEGURANÇA**

1. **Criar nova carteira MetaMask:**
   - Abra MetaMask
   - Crie uma nova conta (específica para a empresa)
   - Exporte a chave privada (Settings > Security & Privacy > Export Private Key)
   - **NUNCA compartilhe ou commite a chave privada no Git**

2. **Ou usar Ledger/Hardware Wallet:**
   - Mais seguro
   - Requer assinatura manual de transações

3. **Adicionar fundos:**
   - Envie ETH/MATIC para a carteira
   - Para Polygon: ~$10-20 é suficiente para muitas transações

### **3. Executar Migração do Banco**

```bash
cd azimut-cms
npx prisma db execute --file prisma/migrations/add-web3-tables.sql
```

Ou via SQL direto no PostgreSQL.

---

## 🔗 COMO FUNCIONA:

### **1. Cliente Conecta Carteira**

- Cliente clica em "Conectar Carteira"
- MetaMask/Ledger abre
- Cliente aprova conexão
- Endereço é salvo no banco

### **2. Receber Pagamentos**

Quando cliente faz pagamento:
- Cliente envia crypto para `COMPANY_WALLET_ADDRESS`
- Sistema registra no banco (tabela `Payment`)
- Status: PENDING → CONFIRMED

### **3. Distribuir Recompensas**

Quando cliente ganha (NFT, token, etc.):
- Sistema chama `/api/web3/rewards/distribute`
- Assina transação com `COMPANY_WALLET_PRIVATE_KEY`
- Envia NFT/token para carteira do cliente
- Registra no banco (tabela `Reward`)

---

## 📋 EXEMPLO DE USO:

### **Conectar Carteira (Frontend):**

```typescript
import { WalletConnect } from '@/components/WalletConnect'

<WalletConnect
  lang="pt"
  onConnect={(wallet) => {
    console.log('Conectado:', wallet.address)
  }}
/>
```

### **Receber Pagamento (API):**

```typescript
// Cliente envia pagamento
await fetch('/api/web3/payment/receive', {
  method: 'POST',
  body: JSON.stringify({
    amount: '0.1',
    currency: 'ETH',
    fromAddress: '0x...',
    txHash: '0x...',
  }),
})
```

### **Distribuir Recompensa (API):**

```typescript
// Cliente ganhou NFT
await fetch('/api/web3/rewards/distribute', {
  method: 'POST',
  body: JSON.stringify({
    toAddress: '0x...', // Carteira do cliente
    rewardType: 'NFT',
    nftId: '123',
    description: 'NFT de conquista',
  }),
})
```

---

## 🔒 SEGURANÇA:

### **✅ BOAS PRÁTICAS:**

1. **Chave Privada:**
   - ✅ Sempre em `.env` (nunca no código)
   - ✅ Adicionar `.env` no `.gitignore`
   - ✅ Usar variáveis de ambiente no Vercel
   - ✅ Considerar usar Hardware Wallet (Ledger)

2. **Validações:**
   - ✅ Validar endereços Ethereum
   - ✅ Verificar saldo antes de enviar
   - ✅ Limitar valores máximos
   - ✅ Rate limiting nas APIs

3. **Monitoramento:**
   - ✅ Logs de todas transações
   - ✅ Alertas para transações grandes
   - ✅ Dashboard de saldo

### **❌ NUNCA FAÇA:**

- ❌ Commitar chave privada no Git
- ❌ Compartilhar chave privada
- ❌ Usar mesma carteira para dev/prod
- ❌ Enviar sem validar endereço

---

## 🧪 TESTAR:

### **1. Testnet (Recomendado para testes):**

```env
RPC_URL=https://rpc-mumbai.maticvigil.com
```

- Use MATIC de testnet (grátis)
- Teste sem risco

### **2. Mainnet (Produção):**

```env
RPC_URL=https://polygon-rpc.com
```

- Use MATIC real
- Cuidado com valores

---

## 📊 TABELAS DO BANCO:

### **Wallet:**
- `address`: Endereço da carteira
- `chainId`: ID da blockchain (137 = Polygon)
- `lastConnectedAt`: Última conexão

### **Payment:**
- `fromAddress`: Quem pagou
- `toAddress`: Quem recebeu (empresa)
- `amount`: Valor
- `currency`: ETH, MATIC, USDT, etc.
- `txHash`: Hash da transação
- `status`: PENDING, CONFIRMED, FAILED

### **Reward:**
- `toAddress`: Quem recebeu recompensa
- `fromAddress`: Quem enviou (empresa)
- `rewardType`: NFT, TOKEN, ETH
- `amount`: Quantidade (se token/ETH)
- `nftId`: ID do NFT (se NFT)
- `txHash`: Hash da transação
- `status`: PENDING, SENT, FAILED

---

## ✅ STATUS:

- ✅ Componente WalletConnect criado
- ✅ API de conexão criada
- ✅ API de receber pagamentos criada
- ✅ API de distribuir recompensas criada
- ✅ Migração SQL criada
- ⚠️ **AÇÃO NECESSÁRIA:** Configurar `.env` com carteira da empresa

---

## 🚀 PRÓXIMOS PASSOS:

1. **Criar carteira MetaMask para empresa**
2. **Adicionar variáveis no `.env`**
3. **Executar migração SQL**
4. **Testar conexão de carteira**
5. **Testar recebimento de pagamento**
6. **Testar distribuição de recompensa**

**Pronto para usar!** 🎉
