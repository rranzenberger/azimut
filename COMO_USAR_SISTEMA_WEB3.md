# 🚀 COMO USAR O SISTEMA WEB3 - GUIA RÁPIDO

## ✅ TUDO PRONTO PARA USAR!

---

## 📋 CHECKLIST RÁPIDO:

### **1. Instalar Dependência:**
```bash
cd azimut-cms
npm install ethers
```

### **2. Criar Carteira MetaMask:**
- Instalar MetaMask
- Criar conta "Azimut Empresa"
- Exportar chave privada
- Adicionar Polygon Network
- Adicionar fundos (~$10-20 MATIC)

### **3. Configurar .env:**
```env
COMPANY_WALLET_ADDRESS=0xSeuEndereco
COMPANY_WALLET_PRIVATE_KEY=0xSuaChavePrivada
RPC_URL=https://polygon-rpc.com
STUDENT_REWARD_CONTRACT_ADDRESS=0x... (depois do deploy)
NFT_CONTRACT_ADDRESS=0x... (depois do deploy)
```

### **4. Executar Migrações SQL:**
```bash
cd azimut-cms
npx prisma db execute --file prisma/migrations/add-web3-tables.sql
npx prisma db execute --file prisma/migrations/add-student-reward-tables.sql
```

---

## 🎯 COMO USAR:

### **1. Cliente Conecta Carteira (Frontend):**
```
Acesse: https://azmt.com.br/pt/experience-preview
Clique em "Conectar Carteira"
MetaMask abre → Aprove → Conectado!
```

### **2. Registrar Projeto de Estudante (Backoffice):**
```
Acesse: /admin/web3/student-rewards
Preencha:
  - Endereço da carteira do estudante
  - Valor do projeto (ex: 0.5 MATIC)
  - Descrição
  - Método de pagamento
Clique: "Registrar Projeto"
```

### **3. Ver Status da Carteira (Backoffice):**
```
Acesse: /admin/web3/wallet-status
Veja:
  - Saldo atual
  - Recompensas enviadas
  - Pagamentos recebidos
  - Taxas estimadas
```

---

## 🎨 DEPLOY DOS CONTRATOS (OPCIONAL):

### **Smart Contract StudentReward:**
1. Acesse: https://remix.ethereum.org
2. Cole código de `contracts/StudentReward.sol`
3. Compile (Solidity 0.8.20)
4. Deploy na Polygon com:
   - `_companyWallet`: Sua carteira
   - `_rewardPercentage`: 500 (5%)
   - `_minProjectValue`: 10000000000000000 (0.01)
   - `_nftContract`: address(0) (ou endereço do NFT)

### **Smart Contract StudentNFT:**
1. Acesse: https://remix.ethereum.org
2. Cole código de `contracts/StudentNFT.sol`
3. Compile (Solidity 0.8.20)
4. Deploy na Polygon com:
   - `_name`: "Azimut Student NFT"
   - `_symbol`: "AZSTU"
   - `_baseURI`: "https://azmt.com.br/api/nft/"

---

## 💡 EXEMPLOS DE USO:

### **Exemplo 1: Cliente Conecta Carteira**
```
1. Cliente acessa /experience-preview
2. Clica "Conectar Carteira"
3. MetaMask abre
4. Cliente aprova
5. ✅ Conectado! Endereço salvo no banco
```

### **Exemplo 2: Estudante Contrata Projeto**
```
1. Estudante contrata portfólio ($1000)
2. Você acessa /admin/web3/student-rewards
3. Preenche formulário:
   - Endereço: 0x...
   - Valor: 0.5 MATIC
   - Descrição: "Portfólio estudante Canadá"
4. Clica "Registrar"
5. ✅ Estudante recebe:
   - 0.025 MATIC (5% de volta)
   - NFT exclusivo #123
```

---

## 🔗 LINKS ÚTEIS:

### **Frontend (Público):**
- `/pt/experience-preview` - Degustação com conexão de carteira

### **Backoffice:**
- `/admin/web3/wallet-status` - Status da carteira
- `/admin/web3/student-rewards` - Registrar projetos
- `/admin/marketing/preview` - Gerar previews

### **APIs:**
- `/api/web3/wallet/connect` - Conectar carteira
- `/api/web3/payment/receive` - Receber pagamento
- `/api/web3/rewards/distribute` - Distribuir recompensa
- `/api/web3/student-reward/register` - Registrar projeto estudante

---

## ⚠️ IMPORTANTE:

### **Antes de Usar em Produção:**
1. ✅ Teste em testnet primeiro (Mumbai)
2. ✅ Verifique saldo da carteira
3. ✅ Configure todos os `.env`
4. ✅ Execute migrações SQL
5. ✅ Teste com valores pequenos

### **Segurança:**
- ✅ Nunca compartilhe chave privada
- ✅ Nunca commite `.env` no Git
- ✅ Use carteira separada para empresa
- ✅ Teste antes de usar valores grandes

---

## 🎉 PRONTO!

**Tudo está implementado e pronto para usar!**

Basta:
1. Configurar carteira
2. Adicionar no `.env`
3. Executar migrações
4. Começar a usar!

**Dúvidas? Me avise!** 🚀
