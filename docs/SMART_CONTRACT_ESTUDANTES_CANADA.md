# 🎓 Smart Contract para Incentivar Estudantes no Canadá

## 🎯 CONCEITO

**Sistema de retorno automático em crypto para estudantes que contratam projetos da Azimut.**

Quando um estudante no Canadá contrata um projeto (ex: portfólio, site, VR), recebe automaticamente uma porcentagem de volta em crypto como incentivo.

---

## 💡 COMO FUNCIONA:

### **1. Estudante Contrata Projeto:**
- Estudante paga pelo projeto (ex: $1000)
- Pagamento pode ser em crypto ou tradicional

### **2. Sistema Registra no Smart Contract:**
- Projeto é registrado no blockchain
- Smart contract calcula recompensa automaticamente
- Exemplo: 5% de retorno = $50 em crypto

### **3. Recompensa Automática:**
- Smart contract envia crypto automaticamente para carteira do estudante
- Transparente e verificável no blockchain
- Incentiva mais contratações

---

## 📋 SMART CONTRACT: `StudentReward.sol`

### **Funcionalidades:**

1. **Registrar Projeto:**
   - Estudante envia pagamento para o contrato
   - Contrato calcula recompensa (ex: 5%)
   - Paga recompensa automaticamente
   - Transfere restante para carteira da empresa

2. **Registrar Projeto Externo:**
   - Para pagamentos tradicionais (cartão, PIX)
   - Registra no blockchain
   - Recompensa pode ser paga depois

3. **Configurável:**
   - Porcentagem de recompensa ajustável
   - Valor mínimo do projeto
   - Carteira da empresa atualizável

---

## ⚙️ CONFIGURAÇÃO:

### **1. Deploy do Contrato:**

```bash
# Opção 1: Remix IDE (Recomendado para começar)
# 1. Acesse https://remix.ethereum.org
# 2. Cole o código de contracts/StudentReward.sol
# 3. Compile (Solidity 0.8.20)
# 4. Deploy na Polygon com:
#    - _companyWallet: Endereço da carteira da empresa
#    - _rewardPercentage: 500 (5%)
#    - _minProjectValue: 10000000000000000 (0.01 ETH/MATIC)

# Opção 2: Hardhat (Avançado)
cd azimut-cms
npx hardhat compile
npx hardhat run scripts/deploy-student-reward.ts --network polygon
```

### **2. Configurar .env:**

```env
# Endereço do contrato deployado
STUDENT_REWARD_CONTRACT_ADDRESS=0xEnderecoDoContratoDeployado

# Contrato NFT (para mint automático)
NFT_CONTRACT_ADDRESS=0xEnderecoDoContratoNFT

# Carteira da empresa (já configurada)
COMPANY_WALLET_ADDRESS=0x...
COMPANY_WALLET_PRIVATE_KEY=0x...

# RPC URL
RPC_URL=https://polygon-rpc.com
```

### **3. Executar Migração:**

```bash
cd azimut-cms
npx prisma db execute --file prisma/migrations/add-student-reward-tables.sql
```

---

## 🚀 USO:

### **Registrar Projeto (API):**

```typescript
// Estudante contratou projeto de $1000
await fetch('/api/web3/student-reward/register', {
  method: 'POST',
  body: JSON.stringify({
    studentAddress: '0x...', // Carteira do estudante
    projectValue: '0.5', // 0.5 ETH/MATIC (equivalente a $1000)
    description: 'Portfólio para estudante no Canadá',
    paymentMethod: 'external', // Pagamento externo (cartão/PIX)
  }),
})

// Resposta:
// {
//   "success": true,
//   "project": {
//     "rewardAmount": "0.025", // 5% de retorno
//     ...
//   },
//   "message": "Estudante receberá 0.025 ETH/MATIC de recompensa"
// }
```

---

## 💰 EXEMPLO PRÁTICO:

### **Cenário: Estudante Contrata Portfólio**

1. **Estudante contrata:**
   - Projeto: Portfólio personalizado
   - Valor: $1000 (0.5 MATIC)
   - Pagamento: Cartão de crédito

2. **Sistema registra:**
   - Chama `/api/web3/student-reward/register`
   - Registra no smart contract
   - Calcula recompensa: 5% = $50 (0.025 MATIC)

3. **Recompensa automática:**
   - Smart contract envia 0.025 MATIC para carteira do estudante
   - **NFT exclusivo é mintado** automaticamente para carteira do estudante
   - Estudante recebe incentivo em crypto + NFT único
   - Transparente e verificável

4. **Resultado:**
   - ✅ Estudante feliz (recebeu crypto de volta)
   - ✅ Incentiva mais contratações
   - ✅ Marketing positivo (transparência blockchain)

---

## 🎯 VANTAGENS:

### **Para Estudantes:**
- ✅ Recebem crypto de volta
- ✅ Transparência total (blockchain)
- ✅ Incentivo para contratar mais

### **Para Azimut:**
- ✅ Diferencial competitivo
- ✅ Marketing positivo
- ✅ Engajamento com Web3
- ✅ Transparência aumenta confiança

### **Técnico:**
- ✅ Automatizado (smart contract)
- ✅ Sem intermediários
- ✅ Verificável publicamente
- ✅ Baixo custo (Polygon)

---

## 📊 PARÂMETROS CONFIGURÁVEIS:

### **Porcentagem de Recompensa:**
- Padrão: 5% (500 basis points)
- Ajustável via `setRewardPercentage()`
- Máximo: 100% (10000 basis points)

### **Valor Mínimo:**
- Padrão: 0.01 ETH/MATIC
- Ajustável via `setMinProjectValue()`
- Projetos abaixo não recebem recompensa

---

## 🔒 SEGURANÇA:

- ✅ Apenas owner pode atualizar parâmetros
- ✅ Validação de endereços
- ✅ Proteção contra reentrância
- ✅ Eventos para auditoria

---

## ✅ STATUS:

- ✅ Smart contract criado (`StudentReward.sol`)
- ✅ API de registro criada
- ✅ Migração SQL criada
- ⚠️ **AÇÃO:** Fazer deploy do contrato e configurar `.env`

---

## 🎨 NFT AUTOMÁTICO:

### **Contrato NFT: `StudentNFT.sol`**

- ✅ NFT exclusivo para cada estudante
- ✅ Mint automático quando recebe recompensa
- ✅ Metadados personalizados por projeto
- ✅ ERC-721 padrão (compatível com OpenSea, etc.)

### **Deploy do NFT:**

```bash
# 1. Deploy StudentNFT.sol na Polygon
# 2. Configure no StudentReward: setNFTContract(enderecoNFT)
# 3. Configure NFT_CONTRACT_ADDRESS no .env
```

---

## 🚀 PRÓXIMOS PASSOS:

1. **Deploy do contrato StudentReward** (Remix ou Hardhat)
2. **Deploy do contrato StudentNFT** (opcional, mas recomendado)
3. **Configurar `STUDENT_REWARD_CONTRACT_ADDRESS` e `NFT_CONTRACT_ADDRESS` no `.env`**
4. **Executar migração SQL**
5. **Testar com projeto piloto**
6. **Integrar no fluxo de vendas**

**Pronto para incentivar estudantes com crypto + NFT!** 🎉
